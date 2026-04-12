"""
FitMatch — Chat API Routes
Handles the AI Stylist multimodal chat interface.
"""

import base64
import json
import logging

from fastapi import APIRouter, Depends, UploadFile, File, Form
from fastapi.responses import StreamingResponse

from app.core.auth import get_optional_user
from app.models.schemas import ChatMessageRequest, ChatMessageResponse
from app.services.ai_service import AIService, get_ai_service
from app.services.search_service import BaseSearchProvider, get_search_service
from app.services.taste_service import TasteService, get_taste_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["AI Stylist"])


@router.post("/message", response_model=ChatMessageResponse)
async def send_message(
    request: ChatMessageRequest,
    user: dict | None = Depends(get_optional_user),
    ai_service: AIService = Depends(get_ai_service),
    search_service: BaseSearchProvider = Depends(get_search_service),
    taste_service: TasteService = Depends(get_taste_service),
):
    """
    Send a text message to the AI Stylist.
    The AI will respond with styling advice and search for matching products.
    """
    user_id = user.get("sub", "anonymous") if user else "anonymous"
    user_metadata = user.get("user_metadata", {}) if user else {}
    taste_profile = await taste_service.get_profile(user_id)
    
    chat_context = {
        "demographics_and_fit": user_metadata,
        "style_dna": taste_profile.get("aesthetics", {})
    }

    # Step 1: Get AI response
    reply = await ai_service.chat_response(
        message=request.message,
        taste_profile=chat_context,
    )

    # Step 2: Translate the user's request into search queries
    translation = await ai_service.translate_aesthetic(request.message)

    # Step 3: Search for matching products
    suggested_items = []
    for query in translation.get("search_queries", [])[:3]:
        items = await search_service.search_products(query=query, max_results=4)
        suggested_items.extend(items)

    return ChatMessageResponse(
        reply=reply,
        suggested_items=suggested_items[:6],
        aesthetic_detected=translation.get("aesthetic"),
    )


@router.post("/stream")
async def stream_message(
    request: ChatMessageRequest,
    user: dict | None = Depends(get_optional_user),
    ai_service: AIService = Depends(get_ai_service),
    search_service: BaseSearchProvider = Depends(get_search_service),
    taste_service: TasteService = Depends(get_taste_service),
):
    """
    Stream the AI stylist reply text in real-time, then append product results 
    as a JSON payload after a delimiter.
    """
    user_id = user.get("sub", "anonymous") if user else "anonymous"
    user_metadata = user.get("user_metadata", {}) if user else {}
    taste_profile = await taste_service.get_profile(user_id)

    chat_context = {
        "demographics_and_fit": user_metadata,
        "style_dna": taste_profile.get("aesthetics", {}),
    }

    async def event_generator():
        # Phase 1: Stream the AI text reply chunk by chunk
        full_reply = ""
        async for chunk in ai_service.chat_response_stream(
            message=request.message,
            taste_profile=chat_context,
        ):
            full_reply += chunk
            yield chunk

        # Phase 2: Search for matching products (non-streamed, appended at end)
        try:
            translation = await ai_service.translate_aesthetic(request.message)
            suggested_items = []
            for query in translation.get("search_queries", [])[:3]:
                items = await search_service.search_products(query=query, max_results=4)
                suggested_items.extend(items)

            # Send a special delimiter followed by JSON metadata
            payload = {
                "suggested_items": [item.model_dump() if hasattr(item, 'model_dump') else item.__dict__ for item in suggested_items[:6]],
                "aesthetic_detected": translation.get("aesthetic"),
            }
            yield "\n__FITMATCH_META__\n"
            yield json.dumps(payload)
        except Exception as e:
            logger.error(f"Stream search error: {e}")
            yield "\n__FITMATCH_META__\n"
            yield json.dumps({"suggested_items": [], "aesthetic_detected": None})

    return StreamingResponse(event_generator(), media_type="text/plain")


@router.post("/upload", response_model=ChatMessageResponse)
async def upload_image(
    file: UploadFile = File(...),
    message: str = Form(default="What goes with this?"),
    user: dict | None = Depends(get_optional_user),
    ai_service: AIService = Depends(get_ai_service),
    search_service: BaseSearchProvider = Depends(get_search_service),
):
    """
    Upload an image of a clothing item for AI analysis.
    The AI will identify the item and suggest complementary pieces.
    """
    # Read the uploaded image
    image_bytes = await file.read()

    # Step 1: Analyze the image
    analysis = await ai_service.analyze_image(image_bytes)

    # Step 2: Build a response
    reply = (
        f"I can see a **{analysis.get('color', '')} {analysis.get('item_type', 'item')}** "
        f"in {analysis.get('material', 'a nice fabric')}! "
        f"This has a strong **{analysis.get('aesthetic', 'classic')}** vibe.\n\n"
        f"Styling tip: {analysis.get('styling_tip', 'Try pairing with neutral tones!')}\n\n"
        f"Here are some pieces that would complete the look:"
    )

    # Step 3: Search for complementary items
    suggested_items = []
    for query in analysis.get("search_queries", [])[:3]:
        items = await search_service.search_products(query=query, max_results=3)
        suggested_items.extend(items)

    return ChatMessageResponse(
        reply=reply,
        suggested_items=suggested_items[:6],
        aesthetic_detected=analysis.get("aesthetic"),
    )
