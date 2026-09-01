from sqlalchemy import Column, Integer, String, JSON

from app.database.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    # Clerk user ID
    user_id = Column(String, nullable=False, index=True)

    title = Column(String, nullable=False)

    genre = Column(String, nullable=False)

    description = Column(String, nullable=False)

    # Stores the complete generated movie data
    blueprint = Column(JSON, nullable=True)