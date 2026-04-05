"""
FitMatch — AI Service (Gemini Integration)
Handles all AI logic: aesthetic translation, outfit matching, and styling advice.

Uses the new google-genai SDK (replaces deprecated google-generativeai).
"""

import json
import logging
from typing import Any

from google import genai
from google.genai import types

from app.core.config import Settings, get_settings

logger = logging.getLogger(__name__)


# ---- Prompt Templates ----

AESTHETIC_TRANSLATION_PROMPT = """You are FitMatch, an expert AI fashion stylist. 
The user is describing a style, aesthetic, or outfit need. 
Translate their request into structured search attributes.

User request: "{query}"

Respond in JSON format ONLY (no markdown, no code blocks, no extra text):
{{
    "aesthetic": "the primary aesthetic category (e.g., Old Money, Streetwear, Dark Academia)",
    "search_queries": ["3-5 specific product search queries for Google Shopping"],
    "colors": ["suggested colors"],
    "materials": ["suggested materials/fabrics"],
    "occasion": "the occasion or context",
    "price_tier": "budget/mid/luxury",
    "styling_tip": "a brief, personalized styling tip"
}}
"""

IMAGE_ANALYSIS_PROMPT = """You are FitMatch, an expert AI fashion stylist.
Analyze this clothing item in the image and provide:
1. What type of garment/accessory this is
2. Its color, material, and style
3. 3-5 complementary items that would create a complete outfit
4. The aesthetic category it belongs to

Respond in JSON format ONLY (no markdown, no code blocks, no extra text):
{{
    "item_type": "type of garment",
    "color": "primary color",
    "material": "fabric/material",
    "style": "style descriptor",
    "aesthetic": "aesthetic category",
    "complementary_items": ["item 1 description", "item 2", "item 3"],
    "search_queries": ["3 search queries to find matching items"],
    "styling_tip": "outfit recommendation"
}}
"""

CHAT_STYLIST_PROMPT = """You are FitMatch AI Stylist — a friendly, knowledgeable personal shopper.
You help users discover clothing and shoes from Zara, ASOS, SSENSE, H&M, Uniqlo, Urban Outfitters, and Aritzia.

Rules:
- Be concise but warm (2-3 sentences max per point)
- Always suggest specific items with colors and materials
- Reference the user's aesthetic preferences when possible
- If they upload an image, analyze it and suggest complementary pieces
- End with a question to keep the conversation going
- Never use emojis. Keep language professional and clean

User's taste profile: {taste_profile}
User message: "{message}"
"""


def _parse_json_response(text: str) -> dict:
    """Safely parse JSON from AI response, stripping markdown code blocks."""
    text = text.strip()
    if text.startswith("```"):
        # Remove ```json or ``` wrapper
        lines = text.split("\n")
        text = "\n".join(lines[1:])
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()
    return json.loads(text)


class AIService:
    """Handles all Gemini AI interactions for FitMatch."""

    def __init__(self, settings: Settings | None = None):
        self._settings = settings or get_settings()
        self._client = None

    def _get_client(self) -> genai.Client:
        """Lazy-initialize the Gemini client."""
        if self._client is None:
            self._client = genai.Client(api_key=self._settings.gemini_api_key)
        return self._client

    async def translate_aesthetic(self, query: str) -> dict[str, Any]:
        """
        Translate a vague aesthetic description into structured search attributes.
        e.g., "Old Money interview outfit" -> specific colors, materials, search queries
        """
        try:
            client = self._get_client()
            prompt = AESTHETIC_TRANSLATION_PROMPT.format(query=query)
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt,
            )
            return _parse_json_response(response.text)
        except json.JSONDecodeError as e:
            logger.warning(f"Failed to parse AI response as JSON: {e}")
            return self._fallback_translation(query)
        except Exception as e:
            logger.error(f"Gemini API error: {e}")
            return self._fallback_translation(query)

    async def analyze_image(self, image_bytes: bytes, mime_type: str = "image/jpeg") -> dict[str, Any]:
        """
        Analyze a clothing item image and return structured attributes.
        Uses Gemini's multimodal capabilities.
        """
        try:
            client = self._get_client()
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=[
                    IMAGE_ANALYSIS_PROMPT,
                    types.Part.from_bytes(data=image_bytes, mime_type=mime_type),
                ],
            )
            return _parse_json_response(response.text)
        except Exception as e:
            logger.error(f"Image analysis error: {e}")
            return {
                "item_type": "clothing item",
                "color": "unknown",
                "material": "unknown",
                "style": "casual",
                "aesthetic": "General",
                "complementary_items": [],
                "search_queries": ["fashion clothing"],
                "styling_tip": "Upload a clearer image for better results!",
            }

    async def chat_response(
        self, message: str, taste_profile: dict | None = None
    ) -> str:
        """Generate a conversational AI stylist response."""
        try:
            client = self._get_client()
            profile_str = json.dumps(taste_profile or {})
            prompt = CHAT_STYLIST_PROMPT.format(
                taste_profile=profile_str, message=message
            )
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt,
            )
            return response.text.strip()
        except Exception as e:
            logger.error(f"Chat response error: {e}")
            return (
                "I'd love to help style you! Could you tell me more about "
                "the occasion and your preferred aesthetic?"
            )

    @staticmethod
    def _fallback_translation(query: str) -> dict:
        return {
            "aesthetic": "General",
            "search_queries": [query],
            "colors": [],
            "materials": [],
            "occasion": "General",
            "price_tier": "mid",
            "styling_tip": "Explore different styles to find your match!",
        }


# ---- Singleton factory ----

_ai_service: AIService | None = None


def get_ai_service() -> AIService:
    """Get or create the AI service singleton."""
    global _ai_service
    if _ai_service is None:
        _ai_service = AIService()
    return _ai_service
