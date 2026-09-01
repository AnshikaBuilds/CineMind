import os

from dotenv import load_dotenv
from google import genai

from app.schemas.blueprint import CharacterOutput, MasterPlan, StoryOutput

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def run_character_agent(
    title: str,
    genre: str,
    master_plan: MasterPlan,
    story: StoryOutput
) -> CharacterOutput:

    prompt = f"""
You are the Character Agent working under the CineMind Master Director.

MOVIE:
{title}

GENRE:
{genre}

MASTER DIRECTOR CHARACTER FOCUS:
{master_plan.character_focus}

STORY:
{story.model_dump_json()}

Create the main characters for this movie.

For every character provide:

- name
- role
- description

Create 4 to 6 important characters.

Character descriptions should be detailed enough
to guide the later Storyboard and Production Agents.

IMPORTANT:
Return ONLY valid JSON.
Do not include markdown.
Do not include ```json.
Do not include explanations outside the JSON.
"""

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        input=prompt,
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": CharacterOutput.model_json_schema()
        },
        generation_config={
            "thinking_level": "low",
            "max_output_tokens": 1500,
        }
    )

    if not interaction.output_text:
        raise RuntimeError("Character Agent returned no output.")

    return CharacterOutput.model_validate_json(
        interaction.output_text
    )