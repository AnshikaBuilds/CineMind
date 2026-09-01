from app.database.database import Base, engine

# Import all models here
from app.models.project import Project

Base.metadata.create_all(bind=engine)

print("✅ Database and tables created successfully!")