import os

from fastapi import HTTPException, Request
from clerk_backend_api import Clerk
from clerk_backend_api.security import authenticate_request
from clerk_backend_api.security.types import AuthenticateRequestOptions

from dotenv import load_dotenv

load_dotenv()


clerk = Clerk(
    bearer_auth=os.getenv("CLERK_SECRET_KEY")
)


async def get_current_user(request: Request):

    request_state = clerk.authenticate_request(
        request,
        AuthenticateRequestOptions(
            authorized_parties=[
                "http://localhost:5173"
            ]
        )
    )

    if not request_state.is_signed_in:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )

    return request_state.payload