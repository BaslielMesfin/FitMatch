"""
FitMatch — Discovery API Routes
Handles the Pinterest-style discovery feed and item interactions.
"""

from fastapi import APIRouter, Depends, Query

from app.core.auth import get_optional_user
from app.models.schemas import DiscoveryResponse, ItemResponse, LikeRequest
from app.services.search_service import BaseSearchProvider, get_search_service
from app.services.taste_service import TasteService, get_taste_service

router = APIRouter(prefix="/discovery", tags=["Discovery"])

ROTATION_QUERIES = [
    "trending fashion clothing outfits",
    "designer tops jackets bottoms",
    "casual streetwear hoodies pants",
    "luxury wardrobe essentials dresses",
    "modern minimalist fashion clothing",
]


@router.get("/feed", response_model=DiscoveryResponse)
async def get_discovery_feed(
    aesthetic: str | None = Query(None, description="Filter by aesthetic tag"),
    brand: str | None = Query(None, description="Filter by brand"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=50),
    user: dict | None = Depends(get_optional_user),
    search_service: BaseSearchProvider = Depends(get_search_service),
):
    """
    Get the personalized discovery feed.
    Uses query rotation for pagination to keep results fresh.
    """
    if aesthetic:
        query = f"{aesthetic} clothing outfits fashion"
    else:
        idx = (page - 1) % len(ROTATION_QUERIES)
        query = ROTATION_QUERIES[idx]

    brands = [brand] if brand else None

    items = await search_service.search_products(
        query=query,
        brands=brands,
        max_results=limit,
    )

    return DiscoveryResponse(
        items=items,
        total=len(items),
        has_more=len(items) >= limit,
    )


@router.post("/like")
async def like_item(
    request: LikeRequest,
    user: dict | None = Depends(get_optional_user),
    taste_service: TasteService = Depends(get_taste_service),
):
    """
    Like or unlike an item. Updates the user's taste profile.
    """
    from app.services.social_service import get_social_service
    user_id = user.get("sub", "anonymous") if user else "anonymous"

    item_dict = {
        "id": request.item_id,
        "aesthetic_tags": request.aesthetic_tags,
        "brand": request.brand
    }

    if request.liked:
        await taste_service.record_like(user_id, item_dict)
        if request.aesthetic_tags:
            await get_social_service().record_global_interaction(request.aesthetic_tags)
    else:
        await taste_service.record_dislike(user_id, item_dict)

    return {"status": "ok", "liked": request.liked}


@router.get("/taste-profile")
async def get_user_taste(
    user: dict | None = Depends(get_optional_user),
    taste_service: TasteService = Depends(get_taste_service),
):
    """Get the current user's taste profile."""
    user_id = user.get("sub", "anonymous") if user else "anonymous"
    profile = await taste_service.get_profile(user_id)
    top = await taste_service.get_top_aesthetics(user_id)

    return {
        "top_aesthetics": [{"name": name, "score": round(score, 2)} for name, score in top],
        "preferred_brands": profile["preferred_brands"],
        "interaction_count": profile["interaction_count"],
    }
