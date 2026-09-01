import os

from dotenv import load_dotenv
from google import genai

from app.schemas.blueprint import (
    MusicOutput,
    MasterPlan,
    StoryOutput
)


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def run_music_agent(
    title: str,
    genre: str,
    master_plan: MasterPlan,
    story: StoryOutput
) -> MusicOutput:

    prompt = f"""
You are the Music & Sound Agent working under the CineMind Master Director.

MOVIE:
{title}

GENRE:
{genre}

MASTER DIRECTOR MUSIC FOCUS:
{master_plan.music_focus}

STORY:
{story.model_dump_json()}

Create the musical identity of the movie.

Provide:
- musical style
- mood
- instruments
- soundtrack direction

IMPORTANT:
- Keep every field concise.
- Make the response production-ready.
- Return ONLY JSON matching the provided schema.
- Do not include markdown.
- Do not include explanations outside the JSON.
"""

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        input=prompt,
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": MusicOutput.model_json_schema()
        },
        generation_config={
            "thinking_level": "low",
            "max_output_tokens": 1000,
        }
    )

    print("========== MUSIC RESPONSE ==========")
    print("OUTPUT TEXT:", repr(interaction.output_text))
    print("====================================")

    if not interaction.output_text:
        raise RuntimeError(
            "Music Agent returned an empty response from Gemini."
        )

    return MusicOutput.model_validate_json(
        interaction.output_text
    )