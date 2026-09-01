import os

from dotenv import load_dotenv
from google import genai

from app.schemas.blueprint import (
    MarketingOutput,
    MasterPlan,
    StoryOutput,
)

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def run_marketing_agent(
    title: str,
    genre: str,
    master_plan: MasterPlan,
    story: StoryOutput
) -> MarketingOutput:

    prompt = f"""
You are the Marketing Agent working under the CineMind Master Director.

MOVIE:
{title}

GENRE:
{genre}

MASTER DIRECTOR MARKETING FOCUS:
{master_plan.marketing_focus}

STORY:
{story.model_dump_json()}

Create a cinematic marketing strategy.

Include:

- tagline
- target audience
- poster concept
- campaign strategy

Keep it concise, compelling, and suitable
for a professional movie-production platform.
"""

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        input=prompt,
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": MarketingOutput.model_json_schema()
        },
        generation_config={
            "thinking_level": "low",
            "max_output_tokens": 1100,
        }
    )

    return MarketingOutput.model_validate_json(
        interaction.output_text
    )
