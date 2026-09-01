import os

from dotenv import load_dotenv
from parallel import Parallel
from google import genai

from app.schemas.blueprint import ResearchOutput


load_dotenv()


# ==================================================
# CLIENTS
# ==================================================

parallel_client = Parallel(
    api_key=os.getenv("PARALLEL_API_KEY")
)

gemini_client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


# ==================================================
# RESEARCH AGENT
# ==================================================

def run_research_agent(
    title: str,
    genre: str,
    description: str
) -> ResearchOutput:

    # --------------------------------------------------
    # 1. SEARCH THE WEB USING PARALLEL
    # --------------------------------------------------

    search = parallel_client.search(
        objective=f"""
Research the current film and entertainment landscape
relevant to this CineMind movie project.

Movie:
{title}

Genre:
{genre}

Description:
{description}

Find useful information about:

1. Current trends in this genre
2. Similar or comparable movies
3. Audience interests and expectations
4. Creative references that could inspire the project

Prioritize reliable and relevant sources.
Focus on information that can actually help
a filmmaker develop this movie.
""",
        search_queries=[
            f"{genre} movie trends 2026",
            f"best {genre} movies similar themes",
            f"{genre} movie audience trends"
        ],
        max_chars_total=12000
    )

    # --------------------------------------------------
    # 2. PREPARE SEARCH RESULTS
    # --------------------------------------------------

    research_context = []

    for result in search.results:

        excerpts = "\n".join(result.excerpts)

        research_context.append(
            f"""
        TITLE: {result.title}

        URL: {result.url}

        CONTENT:
        {excerpts}
        """
        )

    research_text = "\n".join(research_context)

    # --------------------------------------------------
    # 3. GEMINI ANALYZES THE RESEARCH
    # --------------------------------------------------

    prompt = f"""
You are the CineMind Research Agent.

You have received real-world web research from
Parallel Search.

MOVIE:

Title:
{title}

Genre:
{genre}

Description:
{description}

WEB RESEARCH:

{research_text}

Analyze the research and create structured insights
that can help the CineMind movie-production agents.

Return:

- genre_trends
- similar_movies
- audience_insights
- creative_references
- sources

Keep the insights concise and useful.

Return no more than:
- 4 genre trends
- 4 similar movies
- 4 audience insights
- 4 creative references
- 8 sources

Each item should be short.

For sources, return only the source URLs from the
provided research.

Do not invent facts that are not supported by
the provided research.

Return ONLY valid JSON.
Do not include markdown.
Do not include ```json.
Do not include explanations outside the JSON.
"""

    interaction = gemini_client.interactions.create(
        model="gemini-3.5-flash",
        input=prompt,
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": ResearchOutput.model_json_schema()
        },
        generation_config={
            "thinking_level": "low",
            "max_output_tokens": 3000,
        }
    )

    if not interaction.output_text:
        raise RuntimeError(
            "Research Agent returned no output."
        )

    return ResearchOutput.model_validate_json(
        interaction.output_text
    )