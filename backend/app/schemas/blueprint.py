from typing import List

from pydantic import BaseModel


# ==================================================
# CHARACTER
# ==================================================

class Character(BaseModel):
    name: str
    role: str
    description: str


# ==================================================
# STORY
# ==================================================

class StoryStructure(BaseModel):
    act_1: str
    act_2: str
    act_3: str


class StoryOutput(BaseModel):
    logline: str
    theme: str
    tone: str
    main_conflict: str
    story_structure: StoryStructure


# ==================================================
# CHARACTER AGENT OUTPUT
# ==================================================

class CharacterOutput(BaseModel):
    characters: List[Character]


# ==================================================
# STORYBOARD
# ==================================================

class StoryboardScene(BaseModel):
    scene_number: int
    title: str
    description: str
    visual_direction: str


class StoryboardOutput(BaseModel):
    scenes: List[StoryboardScene]


# ==================================================
# PRODUCTION
# ==================================================

class ProductionOutput(BaseModel):
    locations: List[str]
    props: List[str]
    cinematography: str
    lighting: str


# ==================================================
# MARKETING
# ==================================================

class MarketingOutput(BaseModel):
    tagline: str
    target_audience: str
    poster_concept: str
    campaign_strategy: str


# ==================================================
# MUSIC
# ==================================================

class MusicOutput(BaseModel):
    musical_style: str
    mood: str
    instruments: List[str]
    soundtrack_direction: str


# ==================================================
# MASTER DIRECTOR
# ==================================================

class MasterPlan(BaseModel):
    project_direction: str
    story_focus: str
    character_focus: str
    visual_focus: str
    production_focus: str
    marketing_focus: str
    music_focus: str

# ==================================================
# RESEARCH
# ==================================================

class ResearchOutput(BaseModel):
    genre_trends: List[str]
    similar_movies: List[str]
    audience_insights: List[str]
    creative_references: List[str]
    sources: List[str]


# ==================================================
# FINAL MOVIE BLUEPRINT
# ==================================================

class MovieBlueprint(BaseModel):
    master_plan: MasterPlan
    research: ResearchOutput
    story: StoryOutput
    characters: CharacterOutput
    storyboard: StoryboardOutput
    production: ProductionOutput
    marketing: MarketingOutput
    music: MusicOutput