from google import genai

client = genai.Client()


def generate_movie_idea(prompt: str):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text