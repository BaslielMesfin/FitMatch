"""
FitMatch — Boards API Routes
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status

from app.core.auth import get_optional_user
from app.models.schemas import BoardCreate, BoardResponse, ItemResponse, BoardItemAddRequest
from app.services.boards_service import BoardsService, get_boards_service

router = APIRouter(prefix="/boards", tags=["Boards"])


@router.get("/", response_model=List[BoardResponse])
async def list_boards(
    user: dict | None = Depends(get_optional_user),
    boards_service: BoardsService = Depends(get_boards_service),
):
    """List all boards for the current user."""
    user_id = user.get("sub", "anonymous") if user else "anonymous"
    return await boards_service.get_user_boards(user_id)


@router.post("/", response_model=BoardResponse)
async def create_board(
    request: BoardCreate,
    user: dict | None = Depends(get_optional_user),
    boards_service: BoardsService = Depends(get_boards_service),
):
    """Create a new board."""
    user_id = user.get("sub", "anonymous") if user else "anonymous"
    return await boards_service.create_board(user_id, request)


@router.get("/{board_id}/items", response_model=List[ItemResponse])
async def get_board_items(
    board_id: str,
    user: dict | None = Depends(get_optional_user),
    boards_service: BoardsService = Depends(get_boards_service),
):
    """List all items saved in a specific board."""
    user_id = user.get("sub", "anonymous") if user else "anonymous"
    return await boards_service.get_board_items(user_id, board_id)


@router.post("/{board_id}/items")
async def add_item_to_board(
    board_id: str,
    request: BoardItemAddRequest,
    user: dict | None = Depends(get_optional_user),
    boards_service: BoardsService = Depends(get_boards_service),
):
    """Save an item (from Serper search results) to a board."""
    user_id = user.get("sub", "anonymous") if user else "anonymous"
    success = await boards_service.add_item_to_board(user_id, board_id, request.item)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Board not found"
        )
    return {"status": "ok", "message": "Item added to board"}


@router.delete("/{board_id}/items/{item_id}")
async def remove_item_from_board(
    board_id: str,
    item_id: str,
    user: dict | None = Depends(get_optional_user),
    boards_service: BoardsService = Depends(get_boards_service),
):
    """Remove an item from a board."""
    user_id = user.get("sub", "anonymous") if user else "anonymous"
    success = await boards_service.remove_item_from_board(user_id, board_id, item_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Item or board not found"
        )
    return {"status": "ok", "message": "Item removed from board"}
