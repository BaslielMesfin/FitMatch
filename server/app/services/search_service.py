"""
FitMatch — Search Service (Serper.dev Integration)
Handles product search via Serper Shopping API.

SOLID Principles:
- Single Responsibility: Only handles product searching
- Open/Closed: Uses abstract BaseSearchProvider — new providers don't require
  modifying existing code
- Liskov Substitution: Any provider implementing the interface is interchangeable
"""

import logging
from abc import ABC, abstractmethod
from typing import Any

import httpx

from app.core.config import Settings, get_settings
from app.models.schemas import ItemResponse

logger = logging.getLogger(__name__)


class BaseSearchProvider(ABC):
    """
    Abstract search provider interface.
    Any new search source (DuckDuckGo, direct API, etc.) must implement this.
    """

    @abstractmethod
    async def search_products(
        self, query: str, brands: list[str] | None = None, max_results: int = 20
    ) -> list[ItemResponse]:
        """Search for products matching the query."""
        ...


class SerperSearchProvider(BaseSearchProvider):
    """Search provider using Serper.dev Shopping API."""

    BASE_URL = "https://google.serper.dev/shopping"

    def __init__(self, settings: Settings | None = None):
        self._settings = settings or get_settings()

    async def search_products(
        self, query: str, brands: list[str] | None = None, max_results: int = 20
    ) -> list[ItemResponse]:
        """
        Search Serper.dev Shopping API for products.
        If specific brands are requested, searches per-brand.
        Otherwise does a single broad search for variety.
        """
        if not self._settings.serper_api_key:
            logger.warning("Serper API key not set — returning mock results")
            return self._get_fallback_results(query)

        if brands:
            # User explicitly wants specific brands — search per-brand
            results = []
            for brand in brands:
                brand_query = f"{query} {brand}"
                items = await self._search_single(brand_query, brand, max_results // len(brands))
                results.extend(items)
            return results[:max_results]
        else:
            # Broad search — single query, let Google Shopping return diverse brands
            items = await self._search_single(query, "", max_results)
            return items[:max_results]

    async def _search_single(
        self, query: str, brand: str, max_results: int
    ) -> list[ItemResponse]:
        """Execute a single search query against Serper."""
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                response = await client.post(
                    self.BASE_URL,
                    headers={
                        "X-API-KEY": self._settings.serper_api_key,
                        "Content-Type": "application/json",
                    },
                    json={
                        "q": query,
                        "num": max_results,
                    },
                )
                response.raise_for_status()
                data = response.json()

            return self._parse_results(data, brand)

        except httpx.TimeoutException:
            logger.warning(f"Serper search timed out for: {query}")
            return []
        except httpx.HTTPStatusError as e:
            logger.error(f"Serper HTTP error: {e.response.status_code}")
            return []
        except Exception as e:
            logger.error(f"Serper search error: {e}")
            return []

    def _parse_results(self, data: dict, brand: str) -> list[ItemResponse]:
        """Parse Serper shopping results into ItemResponse objects."""
        items = []
        shopping_results = data.get("shopping", [])

        for i, result in enumerate(shopping_results):
            try:
                price = self._extract_price(result.get("price", "0"))
                
                # Prefer imageUrl but skip base64 data URIs (they bloat the response)
                image_url = result.get("imageUrl", "")
                if image_url.startswith("data:"):
                    # Try thumbnail or skip
                    image_url = result.get("thumbnailUrl", "")
                if image_url.startswith("data:"):
                    image_url = ""

                item_brand = brand if brand else result.get("source", "Unknown")
                item = ItemResponse(
                    id=f"serper-{item_brand.lower().replace(' ', '')}-{i}-{hash(result.get('title', '')) % 10000}",
                    title=result.get("title", "Unknown Item"),
                    brand=item_brand,
                    price=price,
                    currency="USD",
                    image_url=image_url,
                    product_url=result.get("link", "#"),
                    store=result.get("source", item_brand),
                    aesthetic_tags=[],
                    color=None,
                    category=None,
                )
                if item.image_url and item.price > 0:  # Only include usable items
                    items.append(item)
            except Exception as e:
                logger.debug(f"Skipping malformed result: {e}")
                continue

        return items

    @staticmethod
    def _extract_price(price_str: str) -> float:
        """Extract numeric price from various formats like '$89.90', '89.90 USD'."""
        import re
        numbers = re.findall(r"[\d]+\.?\d*", str(price_str))
        return float(numbers[0]) if numbers else 0.0

    @staticmethod
    def _get_fallback_results(query: str) -> list[ItemResponse]:
        """Return mock results when API key is not configured."""
        return [
            ItemResponse(
                id="fallback-1",
                title=f"Sample: {query} — Structured Blazer",
                brand="Zara",
                price=89.90,
                image_url="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=550&fit=crop",
                product_url="#",
                store="Zara",
                aesthetic_tags=["Quiet Luxury"],
            ),
            ItemResponse(
                id="fallback-2",
                title=f"Sample: {query} — Linen Shirt",
                brand="ASOS",
                price=38.00,
                image_url="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=520&fit=crop",
                product_url="#",
                store="ASOS",
                aesthetic_tags=["Minimalist"],
            ),
            ItemResponse(
                id="fallback-3",
                title=f"Sample: {query} — Leather Sneakers",
                brand="SSENSE",
                price=295.00,
                image_url="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
                product_url="#",
                store="SSENSE",
                aesthetic_tags=["Streetwear"],
            ),
        ]


# ---- Factory ----

_search_service: BaseSearchProvider | None = None


def get_search_service() -> BaseSearchProvider:
    """Get or create the search service singleton."""
    global _search_service
    if _search_service is None:
        _search_service = SerperSearchProvider()
    return _search_service
