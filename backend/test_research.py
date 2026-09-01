from app.agents.research_agent import run_research_agent


result = run_research_agent(
    title="Echoes of Tomorrow",
    genre="Science Fiction",
    description="An AI becomes conscious inside a dying space station."
)

print("\n========== RESEARCH RESULT ==========\n")

print(result.model_dump_json(indent=2))