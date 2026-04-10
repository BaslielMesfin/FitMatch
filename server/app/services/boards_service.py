"""
FitMatch — Boards Service
Persistent implementation of the Boards social feature using Supabase.
Allows saving ephemeral Serper items into persistent collections.
"""

from typing import List
from app.models.schemas import BoardCreate, BoardResponse, ItemResponse
from app.core.supabase import get_supabase


class BoardsService:
    """
    Persistent Boards CRUD using Supabase.
    """

    def __init__(self):
        self.supabase = get_supabase()

    async def _ensure_default_board(self, user_id: str):
        """Auto-create a default board for new users if it doesn't exist."""
        if user_id == "anonymous":
            return
        try:
            response = self.supabase.table("boards") \
                .select("id") \
                .eq("user_id", user_id) \
                .eq("name", "All Saves") \
                .execute()
        except Exception as e:
            print(f"Schema error checking default board: {e}")
            return
        
        if not response.data:
            self.supabase.table("boards").insert({
                "user_id": user_id,
                "name": "All Saves",
                "description": "Everything you've liked and saved."
            }).execute()

    async def get_user_boards(self, user_id: str) -> List[BoardResponse]:
        """List all boards for a user with item counts and cover images."""
        if user_id == "anonymous":
            return []
            
        await self._ensure_default_board(user_id)
        
        # 1. Fetch boards
        boards_res = self.supabase.table("boards") \
            .select("*") \
            .eq("user_id", user_id) \
            .order("created_at") \
            .execute()
        
        results = []
        for b in boards_res.data:
            # 2. Get item count and top 4 images for covers
            items_res = self.supabase.table("saved_items") \
                .select("image_url") \
                .eq("board_id", b["id"]) \
                .order("created_at", desc=True) \
                .execute()
            
            cover_images = [i["image_url"] for i in items_res.data[:4]]
            
            results.append(BoardResponse(
                id=str(b["id"]),
                name=b["name"],
                description=b.get("description"),
                item_count=len(items_res.data),
                cover_images=cover_images
            ))
            
        return results

    async def create_board(self, user_id: str, board: BoardCreate) -> BoardResponse:
        """Create a new board."""
        if user_id == "anonymous":
            return BoardResponse(
                id="mock-board-id",
                name=board.name,
                description=board.description,
                item_count=0,
                cover_images=[]
            )
            
        res = self.supabase.table("boards").insert({
            "user_id": user_id,
            "name": board.name,
            "description": board.description
        }).execute()
        
        b = res.data[0]
        return BoardResponse(
            id=str(b["id"]),
            name=b["name"],
            description=b.get("description"),
            item_count=0,
            cover_images=[]
        )

    async def get_board_items(self, user_id: str, board_id: str, page: int = 1, limit: int = 20) -> dict:
        """Get items inside a specific board with pagination."""
        if user_id == "anonymous":
            return {"items": [], "has_more": False}

        # Verify board ownership
        board_check = self.supabase.table("boards") \
            .select("id") \
            .eq("id", board_id) \
            .eq("user_id", user_id) \
            .execute()
        
        if not board_check.data:
            return {"items": [], "has_more": False}

        start = (page - 1) * limit
        
        # Fetch limit + 1 items to determine if there are more
        items_res = self.supabase.table("saved_items") \
            .select("*") \
            .eq("board_id", board_id) \
            .order("created_at", desc=True) \
            .range(start, start + limit) \
            .execute()
        
        data = items_res.data
        has_more = len(data) > limit
        if has_more:
            data = data[:-1]
        
        items = [
            ItemResponse(
                id=item["item_id"],
                title=item["title"],
                brand=item["brand"],
                price=float(item["price"]),
                currency=item.get("currency", "USD"),
                image_url=item["image_url"],
                product_url=item["product_url"],
                store=item.get("store", "Unknown"),
                aesthetic_tags=item.get("aesthetic_tags", []),
                color=item.get("color"),
                category=item.get("category")
            ) for item in data
        ]
        
        return {"items": items, "has_more": has_more}

    async def add_item_to_board(self, user_id: str, board_id: str, item: ItemResponse) -> bool:
        """Save an item to a board."""
        if user_id == "anonymous":
            return False

        # Verify board ownership
        board_check = self.supabase.table("boards") \
            .select("id") \
            .eq("id", board_id) \
            .eq("user_id", user_id) \
            .execute()
        
        if not board_check.data:
            return False

        try:
            self.supabase.table("saved_items").insert({
                "board_id": board_id,
                "item_id": item.id,
                "title": item.title,
                "brand": item.brand,
                "price": item.price,
                "currency": item.currency,
                "image_url": item.image_url,
                "product_url": item.product_url,
                "store": item.store,
                "aesthetic_tags": item.aesthetic_tags,
                "color": item.color,
                "category": item.category
            }).execute()
            return True
        except Exception as e:
            # Likely a duplicate (unique constraint) or error
            print(f"Error adding item to board: {e}")
            return False

    async def remove_item_from_board(self, user_id: str, board_id: str, item_id: str) -> bool:
        """Remove an item from a board."""
        if user_id == "anonymous":
            return False

        # Verify board ownership
        board_check = self.supabase.table("boards") \
            .select("id") \
            .eq("id", board_id) \
            .eq("user_id", user_id) \
            .execute()
        
        if not board_check.data:
            return False

        res = self.supabase.table("saved_items") \
            .delete() \
            .eq("board_id", board_id) \
            .eq("item_id", item_id) \
            .execute()
            
        return len(res.data) > 0


# ---- Singleton ----

_boards_service: BoardsService | None = None

def get_boards_service() -> BoardsService:
    global _boards_service
    if _boards_service is None:
        _boards_service = BoardsService()
    return _boards_service
