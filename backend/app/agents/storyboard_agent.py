from google import genai

from app.schemas.blueprint import StoryboardOutput, MasterPlan


client = genai.Client()


def run_storyboard_agent(
    title: str,
    genre: str,
    master_plan: MasterPlan,
    story,
    characters
) -> StoryboardOutput:

    prompt = f"""
You are the Storyboard Agent working under the CineMind Master Director.

MOVIE:
{title}

GENRE:
{genre}

MASTER DIRECTOR VISUAL FOCUS:
{master_plan.visual_focus}

STORY:
{story.model_dump_json()}

CHARACTERS:
{characters.model_dump_json()}

Create exactly 5 important cinematic scenes.

For each scene provide:
- scene number
- short title
- concise description
- concise visual direction

IMPORTANT:
- Keep every description short.
- Keep every visual direction short.
- Use 2-3 sentences maximum for each.
- Do not add unnecessary details.
- Do not add explanations outside the JSON.
- Return only valid JSON matching the provided schema.
"""

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        input=prompt,
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": StoryboardOutput.model_json_schema()
        },
        generation_config={
            "thinking_level": "low",
            "max_output_tokens": 2200,
        }
    )

    return StoryboardOutput.model_validate_json(
        interaction.output_text
    )