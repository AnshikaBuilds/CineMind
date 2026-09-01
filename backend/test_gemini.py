from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.6-flash",
    input="Give me one creative sci-fi movie idea in one sentence."
)

print(interaction.output_text)