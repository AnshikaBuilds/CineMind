from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_screenplay(
    title: str,
    genre: str,
    description: str,
    blueprint: str
):

    prompt = f"""
You are the Screenwriter Agent of CineMind,
an AI-powered movie production studio.

Create a professional movie screenplay based on the
following project.

TITLE:
{title}

GENRE:
{genre}

DESCRIPTION:
{description}

DIRECTOR BLUEPRINT:
{blueprint}

Create the screenplay with:

1. Opening
2. Act I
3. Act II
4. Act III
5. Major scenes
6. Character dialogue
7. Scene descriptions
8. Ending

Write it in a cinematic screenplay style.

Make the story coherent and connected to the
Director Agent's blueprint.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config={
            "max_output_tokens": 4000,
            "temperature": 0.8,
        }
    )

    return response.text