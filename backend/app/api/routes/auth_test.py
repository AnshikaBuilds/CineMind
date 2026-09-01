from fastapi import APIRouter, Depends

from app.auth.clerk import get_current_user


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.get("/me")
async def get_me(
    auth=Depends(get_current_user)
):
    return {
        "authenticated": True,
        "user_id": auth.payload.get("sub"),
        "session_id": auth.payload.get("sid"),
    }