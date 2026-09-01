import os

from dotenv import load_dotenv
from fastapi import HTTPException, Request
from clerk_backend_api import Clerk
from clerk_backend_api import AuthenticateRequestOptions
from types import SimpleNamespace

load_dotenv()

CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")

if not CLERK_SECRET_KEY:
    raise RuntimeError("CLERK_SECRET_KEY is not configured")

clerk = Clerk(
    bearer_auth=CLERK_SECRET_KEY
)

async def get_current_user(request: Request):
    try:

        request_state = clerk.authenticate_request(
            request,
            AuthenticateRequestOptions(
                authorized_parties=[
                    "http://localhost:5173",
                    "http://127.0.0.1:5173",
                ],
                accepts_token=["session_token"],
            )
        )

        if not request_state.is_signed_in:
            raise HTTPException(
                status_code=401,
                detail="User is not authenticated",
            )

        user_id = request_state.payload.get("sub")

        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="User ID not found",
            )

        return SimpleNamespace(
            user_id=user_id
        )

    except HTTPException:
        raise

    except Exception as e:
        print("Clerk authentication error:", e)

        raise HTTPException(
            status_code=401,
            detail="Invalid authentication token",
        )