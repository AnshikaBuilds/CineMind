from google import genai

from app.schemas.blueprint import ProductionOutput, MasterPlan


client = genai.Client()


def run_production_agent(
    title: str,
    genre: str,
    master_plan: MasterPlan,
    storyboard
) -> ProductionOutput:

    prompt = f"""
You are the Production Agent working under the CineMind Master Director.

MOVIE:
{title}

GENRE:
{genre}

MASTER DIRECTOR PRODUCTION FOCUS:
{master_plan.production_focus}

STORYBOARD:
{storyboard.model_dump_json()}

Create a practical production plan.

Include:

- important locations
- important props
- cinematography
- lighting

Keep it concise and production-oriented.
"""

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        input=prompt,
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": ProductionOutput.model_json_schema()
        },
        generation_config={
            "thinking_level": "low",
            "max_output_tokens": 1200,
        }
    )

    return ProductionOutput.model_validate_json(
        interaction.output_text
    )