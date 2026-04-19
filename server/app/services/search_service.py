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

            return self._parse_results(data, brand, query)

        except httpx.TimeoutException:
            logger.warning(f"Serper search timed out for: {query}")
            return []
        except httpx.HTTPStatusError as e:
            logger.error(f"Serper HTTP error: {e.response.status_code}")
            return []
        except Exception as e:
            logger.error(f"Serper search error: {e}")
            return []

    def _extract_merchant_url(self, result: dict) -> str:
        """
        Build a placeholder URL for feed items.
        The actual direct link is resolved lazily when the user clicks 'Shop'.
        For now, store enough info for the resolve endpoint to find the real link.
        """
        source = result.get("source", "")
        title = result.get("title", "")
        link = result.get("link", "")

        # Use source + title to build a fallback Google search (in case resolve fails)
        if source and title:
            import urllib.parse
            search_query = urllib.parse.quote(f"{title} {source}")
            return f"https://www.google.com/search?q={search_query}&udm=28"

        return link or "#"

    async def resolve_product_link(self, title: str, source: str) -> str:
        """
        Use Serper Web Search API to find the direct merchant URL for a product.
        Called lazily when user clicks 'Shop' — avoids burning credits on feed load.
        """
        if not self._settings.serper_api_key:
            return f"https://www.google.com/search?q={title.replace(' ', '+')}+{source.replace(' ', '+')}"

        try:
            search_query = f"{title} {source} buy"
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    "https://google.serper.dev/search",
                    headers={
                        "X-API-KEY": self._settings.serper_api_key,
                        "Content-Type": "application/json",
                    },
                    json={"q": search_query, "num": 3},
                )
                response.raise_for_status()
                data = response.json()

            organic = data.get("organic", [])
            if organic:
                # Return the first organic result link — usually the direct merchant page
                return organic[0].get("link", "#")

            return f"https://www.google.com/search?q={search_query.replace(' ', '+')}"

        except Exception as e:
            logger.error(f"Failed to resolve product link: {e}")
            return f"https://www.google.com/search?q={title.replace(' ', '+')}+{source.replace(' ', '+')}"

    def _parse_results(self, data: dict, brand: str, query: str = "") -> list[ItemResponse]:
        """Parse Serper shopping results into ItemResponse objects."""
        items = []
        shopping_results = data.get("shopping", [])

        # Infer aesthetic context from the search query
        categories = ["Streetwear", "Old Money", "Minimalist", "Y2K", "Dark Academia", "Light Academia", "Coastal Grandmother", "Quiet Luxury", "Gorpcore", "Coquette", "Bohemian", "Preppy", "Grunge", "Athleisure", "Cottagecore", "Cyberpunk", "Avant-Garde", "Techwear", "Vintage", "Skater", "Soft Girl", "E-Girl", "Indie Sleaze", "Acubi", "Balletcore", "Fairycore", "Eclectic Grandpa", "Opium", "Normcore", "Goth", "Business Casual", "Smart Casual", "High Fashion"]
        detected_tags = [cat for cat in categories if cat.lower() in query.lower()]

        for i, result in enumerate(shopping_results):
            try:
                price = self._extract_price(result.get("price", "0"))
                
                # Prefer imageUrl but skip base64 data URIs (they bloat the response)
                image_url = result.get("imageUrl", "")
                if image_url.startswith("data:"):
                    image_url = result.get("thumbnailUrl", "")
                if image_url.startswith("data:"):
                    image_url = ""

                item_brand = brand if brand else result.get("source", "Unknown")
                merchant_url = self._extract_merchant_url(result)
                
                item = ItemResponse(
                    id=f"serper-{item_brand.lower().replace(' ', '')}-{i}-{hash(result.get('title', '')) % 10000}",
                    title=result.get("title", "Unknown Item"),
                    brand=item_brand,
                    price=price,
                    currency="USD",
                    image_url=image_url,
                    product_url=merchant_url,
                    store=result.get("source", item_brand),
                    aesthetic_tags=detected_tags,
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
        """Return mock results intelligently tailored to gender and aesthetic when API is down."""
        items = []
        brands = ["Zara", "ASOS", "SSENSE", "H&M", "Uniqlo", "Aritzia"]
        
        is_mens = "menswear" in query.lower()
        
        # Gender-specific photography
        mens_images = [
            "https://images.unsplash.com/photo-1617137968427-85924c800a22",
            "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8",
            "https://images.unsplash.com/photo-1516826957135-700ede19c111",
            "https://images.unsplash.com/photo-1507680430567-4d5ea6f0e1bf",
            "https://images.unsplash.com/photo-1489987707023-afc232dce9f2",
            "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1",
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8",
            "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
            "https://images.unsplash.com/photo-1559582930-d013746ce09d",
        ]
        
        womens_images = [
            "https://images.unsplash.com/photo-1554412933-514a83d2f3c8",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae",
            "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5",
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
            "https://images.unsplash.com/photo-1581044777550-4cfa60707c03",
            "https://images.unsplash.com/photo-1539109139133-e4a851b50186",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
            "https://images.unsplash.com/photo-1550639525-c97d455acf70",
            "https://images.unsplash.com/photo-1518049362265-f5b249d01f52",
        ]
        
        images = mens_images if is_mens else womens_images
        
        for i in range(10):
            # Seed the layout logic to vary based on page and index to reduce duplicate spam
            seed = (page * 17) + (i * 3)
            idx = seed % len(images)
            brand = brands[seed % len(brands)]
            
            # Format a clean title from the raw query
            aesthetic_title = query.lower().replace("menswear", "").replace("womenswear", "").strip().title()
            if not aesthetic_title:
                aesthetic_title = "Trending Style"
                
            items.append(
                ItemResponse(
                    id=f"fallback-{page}-{i}-{seed}",
                    title=f"{aesthetic_title} — {brand} Selection",
                    brand=brand,
                    price=float(30 + (seed % 100)),
                    image_url=f"{images[idx]}?w=400&h=600&fit=crop&q={seed}",
                    product_url=f"https://www.{brand.lower().replace(' ', '')}.com",
                    store=brand,
                    aesthetic_tags=[aesthetic_title.split()[0]]
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
