"""
FitMatch — Pydantic Schemas
Request/Response models for type-safe API contracts.
"""

from pydantic import BaseModel, Field


# ---- Items ----

class ItemResponse(BaseModel):
    """A single fashion item returned from search."""
    id: str
    title: str
    brand: str
    price: float
    currency: str = "USD"
    image_url: str
    product_url: str
    store: str
    aesthetic_tags: list[str] = []
    color: str | None = None
    category: str | None = None


class DiscoveryResponse(BaseModel):
    """Paginated discovery feed response."""
    items: list[ItemResponse]
    total: int
    has_more: bool = False


# ---- Chat ----

class ChatMessageRequest(BaseModel):
    """User message to the AI Stylist."""
    message: str = Field(..., min_length=1, max_length=1000)
    image_base64: str | None = None  # Optional base64-encoded image


class ChatMessageResponse(BaseModel):
    """AI Stylist response with optional product suggestions."""
    reply: str
    suggested_items: list[ItemResponse] = []
    aesthetic_detected: str | None = None


# ---- Search ----

class SearchRequest(BaseModel):
    """Search query with optional filters."""
    query: str = Field(..., min_length=1, max_length=500)
    brands: list[str] | None = None
    max_price: float | None = None
    aesthetic: str | None = None


# ---- Boards ----

class BoardCreate(BaseModel):
    """Create a new board."""
    name: str = Field(..., min_length=1, max_length=100)
    description: str | None = None


class BoardResponse(BaseModel):
    """A user's board."""
    id: str
    name: str
    description: str | None = None
    item_count: int = 0
    cover_images: list[str] = []


# ---- Taste Profile ----

class TasteProfile(BaseModel):
    """User's aesthetic preference vector."""
    aesthetics: dict[str, float] = {}  # e.g., {"Old Money": 0.85, "Streetwear": 0.35}
    preferred_brands: list[str] = []
    price_range: tuple[float, float] = (0, 500)


# ---- Like ----

class LikeRequest(BaseModel):
    """Like or unlike an item."""
    item_id: str
    liked: bool = True
    aesthetic_tags: list[str] = []
    brand: str | None = None


# ---- Board Item Add ----

class BoardItemAddRequest(BaseModel):
    """Add an item to a board."""
    item: ItemResponse
