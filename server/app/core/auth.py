"""
FitMatch Server — JWT Authentication Dependency
Verifies Supabase JWT tokens on protected routes.
Follows Single Responsibility Principle (SOLID "S"):
this module ONLY handles auth verification.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

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

    if not settings.supabase_jwt_secret:
        # In development mode without Supabase, return a mock user
        if settings.debug:
            return {
                "sub": "mock-user-id",
                "email": "demo@fitmatch.app",
                "role": "authenticated",
            }
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="JWT secret not configured",
        )

    try:
        payload = jwt.decode(
            token,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            options={
                "verify_aud": False,  # Supabase JWTs use "authenticated" role, not standard aud
            },
        )
        if not payload or "sub" not in payload:
            raise JWTError("Invalid token payload")
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token verification failed",
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
