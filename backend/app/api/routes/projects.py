import json

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.schemas.project import ProjectCreate, ProjectResponse
from app.models.project import Project
from app.dependencies.db import get_db
from app.services.movie_generation import generate_movie
from app.auth.clerk import get_current_user


router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


# --------------------------------------------------
# CREATE PROJECT
# --------------------------------------------------

@router.post(
    "/",
    response_model=ProjectResponse
)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    new_project = Project(
        user_id=current_user.user_id,
        title=project.title,
        genre=project.genre,
        description=project.description
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


# --------------------------------------------------
# GET ALL PROJECTS
# --------------------------------------------------

@router.get(
    "/",
    response_model=list[ProjectResponse]
)
def get_projects(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return (
        db.query(Project)
        .filter(Project.user_id == current_user.user_id)
        .all()
    )


# --------------------------------------------------
# GET ONE PROJECT
# --------------------------------------------------

@router.get(
    "/{project_id}",
    response_model=ProjectResponse
)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    project = (
        db.query(Project)
        .filter(
            Project.id == project_id,
            Project.user_id == current_user.user_id
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return project


# --------------------------------------------------
# STREAM MOVIE GENERATION
# --------------------------------------------------

@router.get(
    "/{project_id}/generate-stream"
)
def generate_stream(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    project = (
        db.query(Project)
        .filter(
            Project.id == project_id,
            Project.user_id == current_user.user_id
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    # ----------------------------------------------
    # Already generated
    # ----------------------------------------------

    if project.blueprint:

        def existing_result():

            yield (
                "data: "
                + json.dumps({
                    "agent": "master",
                    "status": "finished",
                    "data": project.blueprint
                })
                + "\n\n"
            )

            # IMPORTANT:
            # The frontend expects a saved event before navigating.
            yield (
                "data: "
                + json.dumps({
                    "agent": "system",
                    "status": "saved",
                    "project_id": project.id
                })
                + "\n\n"
            )

        return StreamingResponse(
            existing_result(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no"
            }
        )

    # ----------------------------------------------
    # Generation stream
    # ----------------------------------------------

    def event_stream():

        final_blueprint = None

        try:

            print(
                f"[CineMind] Starting generation for project {project.id}"
            )

            for event in generate_movie(
                project.title,
                project.genre,
                project.description
            ):

                print(
                    "[CineMind] EVENT:",
                    event.get("agent"),
                    event.get("status")
                )

                # Send event to frontend
                yield (
                    "data: "
                    + json.dumps(event)
                    + "\n\n"
                )

                # ----------------------------------
                # Capture ONLY final master result
                # ----------------------------------

                if (
                    event.get("status") == "finished"
                    and event.get("agent") == "master"
                ):

                    final_blueprint = event.get("data")

                    print(
                        "[CineMind] Final blueprint received."
                    )

            # --------------------------------------
            # Make sure final result actually exists
            # --------------------------------------

            if final_blueprint is None:

                raise RuntimeError(
                    "Movie generation completed, but no final blueprint "
                    "was returned by the Master Agent."
                )

            # --------------------------------------
            # Save final result
            # --------------------------------------

            print(
                f"[CineMind] Saving blueprint for project {project.id}..."
            )

            project.blueprint = final_blueprint

            db.commit()
            db.refresh(project)

            print(
                f"[CineMind] Blueprint saved successfully "
                f"for project {project.id}."
            )

            # --------------------------------------
            # Tell frontend that saving is complete
            # --------------------------------------

            saved_event = {
                "agent": "system",
                "status": "saved",
                "project_id": project.id
            }

            print(
                "[CineMind] Sending SAVED event:",
                saved_event
            )

            yield (
                "data: "
                + json.dumps(saved_event)
                + "\n\n"
            )

        except Exception as error:

            print(
                "[CineMind] GENERATION/SAVE ERROR:",
                repr(error)
            )

            db.rollback()

            yield (
                "data: "
                + json.dumps({
                    "agent": "system",
                    "status": "error",
                    "message": str(error)
                })
                + "\n\n"
            )

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )