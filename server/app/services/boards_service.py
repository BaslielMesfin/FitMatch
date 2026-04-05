"""
FitMatch — Boards Service
In-memory implementation of the Boards social feature.
Allows saving ephemeral Serper items into collections.
"""

import uuid
from typing import Dict, List

from app.models.schemas import BoardCreate, BoardResponse, ItemResponse


class BoardsService:
    """
    In-memory Boards CRUD.
    Structure:
    _db = {
        "user_id": {
            "board_id": {
                "info": BoardResponse,
                "items": [ItemResponse, ...]
            }
        }
    }
    """

    def __init__(self):
        # type: Dict[str, Dict[str, dict]]
        self._db = {}

    def _ensure_user(self, user_id: str):
        if user_id not in self._db:
            self._db[user_id] = {}
            # Auto-create a default board for new users
            default_id = str(uuid.uuid4())
            self._db[user_id][default_id] = {
                "info": BoardResponse(
                    id=default_id,
                    name="All Saves",
                    description="Everything you've liked and saved.",
                    item_count=0,
                    cover_images=[]
                ),
                "items": []
            }

    def get_user_boards(self, user_id: str) -> List[BoardResponse]:
        """List all boards for a user."""
        self._ensure_user(user_id)
        return [board_data["info"] for board_data in self._db[user_id].values()]

    def create_board(self, user_id: str, board: BoardCreate) -> BoardResponse:
        """Create a new board."""
        self._ensure_user(user_id)
        board_id = str(uuid.uuid4())
        
        new_board = BoardResponse(
            id=board_id,
            name=board.name,
            description=board.description,
            item_count=0,
            cover_images=[]
        )
        
        self._db[user_id][board_id] = {
            "info": new_board,
            "items": []
        }
        
        return new_board

    def get_board_items(self, user_id: str, board_id: str) -> List[ItemResponse]:
        """Get items inside a specific board."""
        self._ensure_user(user_id)
        if board_id not in self._db[user_id]:
            return []
        
        return self._db[user_id][board_id]["items"]

    def add_item_to_board(self, user_id: str, board_id: str, item: ItemResponse) -> bool:
        """
        Save an item to a board. 
        Updates board cover images and item count.
        """
        self._ensure_user(user_id)
        if board_id not in self._db[user_id]:
            return False

        board_record = self._db[user_id][board_id]
        
        # Check if already exists
        if any(i.id == item.id for i in board_record["items"]):
            return True

        board_record["items"].append(item)
        
        # Update metadata (max 4 cover images)
        info = board_record["info"]
        info.item_count = len(board_record["items"])
        if item.image_url and item.image_url not in info.cover_images:
            info.cover_images.insert(0, item.image_url)
            info.cover_images = info.cover_images[:4]
            
        return True

    def remove_item_from_board(self, user_id: str, board_id: str, item_id: str) -> bool:
        """Remove an item from a board."""
        self._ensure_user(user_id)
        if board_id not in self._db[user_id]:
            return False

        board_record = self._db[user_id][board_id]
        original_count = len(board_record["items"])
        
        board_record["items"] = [i for i in board_record["items"] if i.id != item_id]
        
        if len(board_record["items"]) < original_count:
            # Update metadata
            info = board_record["info"]
            info.item_count = len(board_record["items"])
            # Rebuild cover images
            info.cover_images = [i.image_url for i in board_record["items"] if i.image_url][:4]
            return True
            
        return False


# ---- Singleton ----

_boards_service: BoardsService | None = None

def get_boards_service() -> BoardsService:
    global _boards_service
    if _boards_service is None:
        _boards_service = BoardsService()
    return _boards_service
