from concurrent.futures import ThreadPoolExecutor, as_completed

from app.agents.master_agent import create_master_plan

from app.agents.research_agent import run_research_agent
from app.agents.story_agent import run_story_agent
from app.agents.character_agent import run_character_agent
from app.agents.storyboard_agent import run_storyboard_agent
from app.agents.production_agent import run_production_agent
from app.agents.marketing_agent import run_marketing_agent
from app.agents.music_agent import run_music_agent


def generate_movie(
    title: str,
    genre: str,
    description: str
):
    """
    CineMind Master Production Pipeline

    Workflow:

        Master Director
              ↓
           Story Agent
              ↓
       ┌──────┼──────┐
       ↓      ↓      ↓
    Character Marketing Music
       └──────┼──────┘
              ↓
        Storyboard Agent
              ↓
        Production Agent
              ↓
        Final Production
    """

    # =====================================================
    # 1. MASTER DIRECTOR
    # =====================================================

    master_plan = create_master_plan(
        title,
        genre,
        description
    )

    yield {
        "agent": "master",
        "status": "completed",
        "message": "Master Director created the production plan.",
        "data": master_plan.model_dump()
    }

    # =====================================================
    # 2. RESEARCH AGENT
    # =====================================================

    research = run_research_agent(
        title,
        genre,
        description
    )

    yield {
    "agent": "research",
    "status": "completed",
    "message": "Research Agent gathered industry insights using Parallel.",
    "data": research.model_dump()
     }

    # =====================================================
    # 2. STORY AGENT
    # =====================================================

    story = run_story_agent(
        title,
        genre,
        description,
        master_plan,
        research
    )

    yield {
        "agent": "story",
        "status": "completed",
        "message": "Story Agent completed the story foundation.",
        "data": story.model_dump()
    }

    # =====================================================
    # 3. PARALLEL SPECIALIST AGENTS
    # =====================================================

    results = {}

    with ThreadPoolExecutor(max_workers=3) as executor:

        futures = {
            executor.submit(
                run_character_agent,
                title,
                genre,
                #description,
                master_plan,
                story
            ): "characters",

            executor.submit(
                run_marketing_agent,
                title,
                genre,
                master_plan,
                story
            ): "marketing",

            executor.submit(
                run_music_agent,
                title,
                genre,
                master_plan,
                story
            ): "music",
        }

        for future in as_completed(futures):

            agent_name = futures[future]

            try:
                result = future.result()

                results[agent_name] = result

                yield {
                    "agent": agent_name,
                    "status": "completed",
                    "message": f"{agent_name.title()} Agent completed.",
                    "data": result.model_dump()
                }

            except Exception as error:

                yield {
                    "agent": agent_name,
                    "status": "error",
                    "message": f"{agent_name.title()} Agent failed.",
                    "error": str(error)
                }

                raise

    characters = results["characters"]
    marketing = results["marketing"]
    music = results["music"]

    # =====================================================
    # 4. STORYBOARD AGENT
    # =====================================================

    storyboard = run_storyboard_agent(
        title,
        genre,
        master_plan,
        story,
        characters
    )

    yield {
        "agent": "storyboard",
        "status": "completed",
        "message": "Storyboard Agent completed the cinematic scenes.",
        "data": storyboard.model_dump()
    }

    # =====================================================
    # 5. PRODUCTION AGENT
    # =====================================================

    production = run_production_agent(
        title,
        genre,
        master_plan,
        storyboard
    )

    yield {
        "agent": "production",
        "status": "completed",
        "message": "Production Agent completed the production plan.",
        "data": production.model_dump()
    }

    # =====================================================
    # 6. FINAL PRODUCTION PACKAGE
    # =====================================================

    final_result = {
        "master_plan": master_plan.model_dump(),
        "research": research.model_dump(),
        "story": story.model_dump(),
        "characters": characters.model_dump(),
        "storyboard": storyboard.model_dump(),
        "production": production.model_dump(),
        "marketing": marketing.model_dump(),
        "music": music.model_dump(),
    }

    yield {
        "agent": "master",
        "status": "finished",
        "message": "CineMind production completed.",
        "data": final_result
    }