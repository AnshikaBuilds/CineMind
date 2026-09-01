from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "Welcome to CineMind Backend!"
    }


@router.get("/health")
def health():
    return {
        "status": "Backend is running"
    }