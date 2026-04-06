"""
FitMatch — Social API Routes
"""

from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict

from app.core.auth import get_optional_user
from app.services.social_service import SocialService, get_social_service

router = APIRouter(prefix="/social", tags=["Social"])


class FollowRequest(BaseModel):
    target_user_id: str
    follow: bool


@router.post("/follow")
async def toggle_follow(
    request: FollowRequest,
    user: dict | None = Depends(get_optional_user),
    social_service: SocialService = Depends(get_social_service),
):
    """Follow or unfollow another user."""
    user_id = user.get("sub", "anonymous") if user else "anonymous"
    
    if request.target_user_id == user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot follow yourself"
        )
        
    if request.follow:
        await social_service.follow_user(user_id, request.target_user_id)
    else:
        await social_service.unfollow_user(user_id, request.target_user_id)
        
    return {"status": "ok", "following": request.follow}


@router.get("/trending", response_model=List[Dict[str, str | int]])
async def get_trending_aesthetics(
    limit: int = 5,
    social_service: SocialService = Depends(get_social_service),
):
    """Retrieve the top globally trending aesthetics."""
    trending = social_service.get_trending_aesthetics(limit)
    return [{"tag": tag, "score": score} for tag, score in trending]
