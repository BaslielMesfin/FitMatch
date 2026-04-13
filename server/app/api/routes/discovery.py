"""
FitMatch — Discovery API Routes
Handles the Pinterest-style discovery feed and item interactions.
"""

from fastapi import APIRouter, Depends, Query, Request

from app.core.auth import get_optional_user
from app.models.schemas import DiscoveryResponse, ItemResponse, LikeRequest, OnboardRequest
from app.services.search_service import BaseSearchProvider, get_search_service
from app.services.taste_service import TasteService, get_taste_service
from app.services.social_service import SocialService, get_social_service

router = APIRouter(prefix="/discovery", tags=["Discovery"])

from app.core.rate_limit import limiter

ROTATION_QUERIES = [
    "casual streetwear hoodies pants",
    "old money luxury wardrobe essentials",
    "modern minimalist fashion clothing",
    "y2k vintage aesthetic outfits",
    "gorpcore outdoor utility fashion",
    "dark academia blazers trousers aesthetics",
    "preppy chic polo fashion",
    "avant-garde structural designer clothes",
    "indie sleaze grunge fashion",
    "business casual smart trousers blazers"
]

# Gender-specific rotation queries to avoid cross-gender results
MENSWEAR_QUERIES = [
    "mens streetwear hoodies joggers",
    "mens old money polo chinos",
    "mens minimalist wardrobe essentials",
    "mens workwear boots jackets",
    "mens smart casual blazer trousers",
    "mens y2k vintage oversized shirts",
    "mens dark academia sweaters",
    "mens athleisure sneakers shorts",
]

WOMENSWEAR_QUERIES = [
    "womens streetwear cargo pants crop tops",
    "womens old money quiet luxury outfit",
    "womens minimalist wardrobe capsule",
    "womens y2k mini skirts tops",
    "womens dark academia plaid skirts blazers",
    "womens coastal grandmother linen outfits",
    "womens balletcore soft aesthetic",
    "womens business casual blouse trousers",
]


@router.get("/feed", response_model=DiscoveryResponse)
@limiter.limit("30/minute")
async def get_discovery_feed(
    request: Request,
    aesthetic: str | None = Query(None, description="Filter by aesthetic tag"),
    brand: str | None = Query(None, description="Filter by brand"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=50),
    user: dict | None = Depends(get_optional_user),
    search_service: BaseSearchProvider = Depends(get_search_service),
    taste_service: TasteService = Depends(get_taste_service),
):
    """
    Get the personalized discovery feed.
    Prioritizes user taste profile and gender if authenticated.
    """
    user_id = user.get("sub") if user else None
    
    # Detect gender early for query selection
    gender = None
    if user:
        metadata = user.get("user_metadata", {})
        gender = metadata.get("gender")

    # 1. Determine the core query
    if aesthetic:
        gender_term = ""
        if gender:
            gender_term = "mens " if gender.lower() == "male" else "womens "
        query = f"{gender_term}{aesthetic} fashion clothing"
    elif user_id:
        # Personalized rotation: Mix their top aesthetics with fresh generic styles
        top_aesthetics = await taste_service.get_top_aesthetics(user_id, top_n=2)
        if top_aesthetics and page % 2 != 0:
            # Odd pages: show their personal style
            idx = (page // 2) % len(top_aesthetics)
            gender_term = ""
            if gender:
                gender_term = "mens " if gender.lower() == "male" else "womens "
            query = f"{gender_term}{top_aesthetics[idx][0]} fashion clothing"
        else:
            # Even pages (or no taste profile yet): use gender-specific rotation
            if gender and gender.lower() == "male":
                idx = (page - 1) % len(MENSWEAR_QUERIES)
                query = MENSWEAR_QUERIES[idx]
            elif gender and gender.lower() == "female":
                idx = (page - 1) % len(WOMENSWEAR_QUERIES)
                query = WOMENSWEAR_QUERIES[idx]
            else:
                idx = (page - 1) % len(ROTATION_QUERIES)
                query = ROTATION_QUERIES[idx]
    else:
        idx = (page - 1) % len(ROTATION_QUERIES)
        query = ROTATION_QUERIES[idx]

    brands = [brand] if brand else None

    items = await search_service.search_products(
        query=query,
        brands=brands,
        max_results=limit,
        page=page,
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
    social_service: SocialService = Depends(get_social_service),
):
    """Get the current user's taste profile."""
    user_id = user.get("sub", "anonymous") if user else "anonymous"
    profile = await taste_service.get_profile(user_id)
    top = await taste_service.get_top_aesthetics(user_id)
    
    followers = await social_service.get_followers_count(user_id) if user_id != "anonymous" else 0
    following = await social_service.get_following_count(user_id) if user_id != "anonymous" else 0

    return {
        "top_aesthetics": [{"name": name, "score": round(score, 2)} for name, score in top],
        "preferred_brands": profile["preferred_brands"],
        "interaction_count": profile["interaction_count"],
        "followers_count": followers,
        "following_count": following,
    }


@router.post("/initialize-taste")
async def initialize_taste(
    request: OnboardRequest,
    user: dict | None = Depends(get_optional_user),
    taste_service: TasteService = Depends(get_taste_service),
):
    """Prime the user's taste profile from onboarding data."""
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
        
    user_id = user.get("sub")
    await taste_service.initialize_profile(user_id, request.aesthetics)
    
    return {"status": "ok", "message": "Taste profile initialized"}
