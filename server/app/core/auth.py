"""
FitMatch Server — JWT Authentication Dependency
Verifies Supabase JWT tokens on protected routes.
Follows Single Responsibility Principle (SOLID "S"):
this module ONLY handles auth verification.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer


from app.core.config import Settings, get_settings

security = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
    settings: Settings = Depends(get_settings),
) -> dict:
    """
    Verify the JWT token from Supabase Auth.
    Returns the decoded token payload containing user info.
    If no token is provided or it's invalid, raises 401.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials

    if settings.debug and not settings.supabase_url:
        # In development mode without Supabase, return a mock user
        return {
            "sub": "mock-user-id",
            "email": "demo@fitmatch.app",
            "role": "authenticated",
        }

    from app.core.supabase import get_supabase
    supabase = get_supabase()

    try:
        user_response = supabase.auth.get_user(token)
        if not user_response or not user_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        # Reconstruct the payload to match what the rest of the app expects
        return {
            "sub": user_response.user.id,
            "email": user_response.user.email,
            "user_metadata": user_response.user.user_metadata,
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token verification failed: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_optional_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
    settings: Settings = Depends(get_settings),
) -> dict | None:
    """
    Optional auth — returns None if no token provided.
    Useful for public endpoints that behave differently when authenticated.
    """
    if not credentials:
        return None
    try:
        return await get_current_user(credentials, settings)
    except HTTPException:
        return None
