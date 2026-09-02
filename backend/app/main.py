from fastapi import FastAPI, Depends
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.auth.clerk import get_current_user

from app.database.database import Base, engine

from app.models.project import Project

from app.api.routes.home import router as home_router
from app.api.routes.projects import router as project_router

from app.api.routes.auth_test import router as auth_router

# --------------------------------------------------
# DATABASE
# --------------------------------------------------

Base.metadata.create_all(bind=engine)


# --------------------------------------------------
# APP
# --------------------------------------------------

app = FastAPI(
    title="CineMind API",
    version="2.0.0"
)

# --------------------------------------------------
# GENERATED IMAGES
# --------------------------------------------------

GENERATED_IMAGES_DIR = Path("generated_images")

GENERATED_IMAGES_DIR.mkdir(
    exist_ok=True
)

app.mount(
    "/generated-images",
    StaticFiles(directory=GENERATED_IMAGES_DIR),
    name="generated-images"
)

# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://cine-mind-kohl.vercel.app",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# --------------------------------------------------
# ROUTES
# --------------------------------------------------

app.include_router(home_router)

app.include_router(project_router)

@app.get("/auth/me")
async def get_me(user=Depends(get_current_user)):
    return {
        "authenticated": True,
        "user_id": user.get("sub"),
        "message": "Clerk authentication is working!"
    }

app.include_router(auth_router)