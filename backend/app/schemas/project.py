from typing import Optional, Any

from pydantic import BaseModel, ConfigDict


class ProjectCreate(BaseModel):
    title: str
    genre: str
    description: str


class ProjectResponse(ProjectCreate):
    id: int
    blueprint: Optional[Any] = None

    model_config = ConfigDict(from_attributes=True)