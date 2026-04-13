"""
FitMatch — Search API Routes
Handles direct product search with brand and aesthetic filters.
"""

from fastapi import APIRouter, Depends, Query, Request

from app.core.auth import get_optional_user
from app.models.schemas import SearchRequest, DiscoveryResponse
from app.services.ai_service import AIService, get_ai_service
from app.services.search_service import BaseSearchProvider, get_search_service

router = APIRouter(prefix="/search", tags=["Search"])

from app.core.rate_limit import limiter


@router.post("/", response_model=DiscoveryResponse)
@limiter.limit("20/minute")
async def search_products(
    request: Request,
    body: SearchRequest,
    ai_service: AIService = Depends(get_ai_service),
    search_service: BaseSearchProvider = Depends(get_search_service),
):
    """
    AI-powered product search.
    The AI first translates the query into structured attributes,
    then searches for matching products.
    """
    # Step 1: Use AI to understand the query
    translation = await ai_service.translate_aesthetic(body.query)

    # Step 2: Use translated search queries for better results
    all_items = []
    search_queries = translation.get("search_queries", [body.query])

    for query in search_queries[:3]:
        items = await search_service.search_products(
            query=query,
            brands=body.brands,
            max_results=8,
        )
        all_items.extend(items)

    # Deduplicate by title
    seen_titles = set()
    unique_items = []
    for item in all_items:
        if item.title not in seen_titles:
            seen_titles.add(item.title)
            # Add the detected aesthetic as a tag
            aesthetic = translation.get("aesthetic")
            if aesthetic and aesthetic not in item.aesthetic_tags:
                item.aesthetic_tags.append(aesthetic)
            unique_items.append(item)

    return DiscoveryResponse(
        items=unique_items[:20],
        total=len(unique_items),
        has_more=False,
    )


@router.get("/quick", response_model=DiscoveryResponse)
@limiter.limit("20/minute")
async def quick_search(
    request: Request,
    q: str = Query(..., min_length=1, description="Search query"),
    brand: str | None = Query(None, description="Filter by brand"),
    search_service: BaseSearchProvider = Depends(get_search_service),
):
    """
    Quick search without AI translation.
    Faster but less intelligent — good for direct brand/product searches.
    """
    brands = [brand] if brand else None
    items = await search_service.search_products(
        query=q,
        brands=brands,
        max_results=20,
    )

    return DiscoveryResponse(
        items=items,
        total=len(items),
        has_more=False,
    )
