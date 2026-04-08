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
        self, query: str, brands: list[str] | None = None, max_results: int = 20, page: int = 1
    ) -> list[ItemResponse]:
        """Search for products matching the query."""
        ...


class SerperSearchProvider(BaseSearchProvider):
    """Search provider using Serper.dev Shopping API."""

    BASE_URL = "https://google.serper.dev/shopping"

    def __init__(self, settings: Settings | None = None):
        self._settings = settings or get_settings()

    async def search_products(
        self, query: str, brands: list[str] | None = None, max_results: int = 20, page: int = 1
    ) -> list[ItemResponse]:
        """
        Search Serper.dev Shopping API for products.
        If specific brands are requested, searches per-brand.
        Otherwise does a single broad search for variety.
        """
        if not self._settings.serper_api_key:
            logger.warning("Serper API key not set — returning mock results")
            return self._get_fallback_results(query, page)

        if brands:
            # User explicitly wants specific brands — search per-brand
            results = []
            for brand in brands:
                brand_query = f"{query} {brand}"
                items = await self._search_single(brand_query, brand, max_results // len(brands), page=page)
                results.extend(items)
            return results[:max_results]
        else:
            # Broad search — single query, let Google Shopping return diverse brands
            items = await self._search_single(query, "", max_results, page=page)
            return items[:max_results]

    async def _search_single(
        self, query: str, brand: str, max_results: int, page: int = 1
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
                        "start": (page - 1) * max_results + 1
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
    def _get_fallback_results(query: str, page: int = 1) -> list[ItemResponse]:
        """Return mock results when API key is not configured."""
        # Use page to vary the IDs and titles slightly
        items = []
        brands = ["Zara", "ASOS", "SSENSE", "H&M", "Uniqlo", "Aritzia"]
        
        # High-quality Unsplash fashion placeholders that match different vibes
        images = [
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35", # Blazer
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c", # Shirt
            "https://images.unsplash.com/photo-1549298916-b41d501d3772", # Sneaker
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", # Yellow set
            "https://images.unsplash.com/photo-1539109139133-e4a851b50186", # Streetwear
            "https://images.unsplash.com/photo-1581044777550-4cfa60707c03", # Minimalist
            "https://images.unsplash.com/photo-1554412933-514a83d2f3c8", # Dress
            "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3", # Techwear
            "https://images.unsplash.com/photo-1509631179647-0177331693ae", # Pink
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105", # Knit
        ]
        
        for i in range(10):
            idx = (i + (page - 1) * 10) % len(images)
            brand = brands[i % len(brands)]
            items.append(
                ItemResponse(
                    id=f"fallback-{page}-{i}",
                    title=f"{query.title()} — {brand} Selection {i+1}",
                    brand=brand,
                    price=float(20 + (i * 15)),
                    image_url=f"{images[idx]}?w=400&h=600&fit=crop",
                    product_url="#",
                    store=brand,
                    aesthetic_tags=[query.split()[0].title()] if query else []
                )
            )
        return items


# ---- Factory ----

_search_service: BaseSearchProvider | None = None


def get_search_service() -> BaseSearchProvider:
    """Get or create the search service singleton."""
    global _search_service
    if _search_service is None:
        _search_service = SerperSearchProvider()
    return _search_service
