import os
from dotenv import load_dotenv
from google import genai

from app.utils.gemini_retry import retry_gemini_call

from app.schemas.blueprint import (
    StoryOutput,
    MasterPlan,
    ResearchOutput,
)

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def run_story_agent(
    title: str,
    genre: str,
    description: str,
    master_plan: MasterPlan,
    research: ResearchOutput
) -> StoryOutput:

    prompt = f"""
You are the Story Agent working under the CineMind Master Director.

MOVIE

Title:
{title}

Genre:
{genre}

Description:
{description}

MASTER DIRECTOR STORY FOCUS:
{master_plan.story_focus}

RESEARCH INSIGHTS:
{research.model_dump_json()}

Use the research insights only as creative guidance.

Do not copy existing movies.

Create a cinematic, original and specific story foundation.

Include:

- logline
- theme
- tone
- main conflict
- three-act structure

IMPORTANT OUTPUT RULES:

1. Return ONLY valid JSON.
2. Do not use markdown.
3. Do not use ```json.
4. Keep every field concise.
5. Keep each act concise.
6. Do not add any fields that are not in the required schema.
7. Make sure every JSON string is completely closed.
8. Make sure the final response ends with a valid closing.
"""

    interaction = retry_gemini_call(
        lambda: client.interactions.create(
            model="gemini-3.5-flash",
            input=prompt,
            response_format={
                "type": "text",
                "mime_type": "application/json",
                "schema": StoryOutput.model_json_schema()
            },
            generation_config={
                "thinking_level": "low",
                "max_output_tokens": 2200,
            }
        )
    )

    output_text = interaction.output_text.strip()

    print("\n========== STORY AGENT OUTPUT ==========")
    print(output_text)
    print("=========================================\n")

    try:
        return StoryOutput.model_validate_json(output_text)

    except Exception as error:
        print("\n========== STORY JSON ERROR ==========")
        print(error)
        print("\nRAW STORY OUTPUT:")
        print(output_text)
        print("======================================\n")

        raise