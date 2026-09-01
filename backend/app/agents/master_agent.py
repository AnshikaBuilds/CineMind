import os

from dotenv import load_dotenv
from google import genai
from app.schemas.blueprint import MasterPlan


load_dotenv()


api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY was not found in .env")


client = genai.Client(api_key=api_key)

def create_master_plan(
    title: str,
    genre: str,
    description: str
) -> MasterPlan:

    prompt = f"""
You are the Master Director Agent of CineMind.

You are responsible for orchestrating a complete
AI movie production.

PROJECT

Title:
{title}

Genre:
{genre}

Description:
{description}

Create a concise production plan for the specialized
CineMind agents.

The specialized agents are:

1. Story Agent
2. Character Agent
3. Storyboard Agent
4. Production Agent
5. Marketing Agent
6. Music Agent

Define what each agent should focus on.

Make the plan specific to this movie.

Do not write the actual movie blueprint.
Only create the orchestration plan.
"""

    interaction = client.interactions.create(
        model="gemini-3.5-flash",
        input=prompt,
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": MasterPlan.model_json_schema()
        },
        generation_config={
            "thinking_level": "low",
            "max_output_tokens": 1200,
        }
    )

    return MasterPlan.model_validate_json(
        interaction.output_text
    )