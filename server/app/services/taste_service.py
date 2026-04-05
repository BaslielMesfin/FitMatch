"""
FitMatch — Taste Service
Manages user taste profiles based on likes and interactions.

This is the "Intelligence Engine" — it learns from every like, save,
and chat interaction to build a user's aesthetic DNA.
"""

import logging
from collections import defaultdict

logger = logging.getLogger(__name__)

# In-memory taste profiles (will move to Supabase in production)
_taste_profiles: dict[str, dict] = {}

# Aesthetic weight decay — more recent interactions matter more
AESTHETIC_CATEGORIES = [
    "Old Money", "Streetwear", "Minimalist", "Y2K", "Dark Academia",
    "Coastal Grandmother", "Quiet Luxury", "Gorpcore", "Coquette",
    "Bohemian", "Preppy", "Grunge", "Athleisure", "Cottagecore"
]


class TasteService:
    """Manages and evolves user taste profiles."""

    def get_profile(self, user_id: str) -> dict:
        """Get the current taste profile for a user."""
        if user_id not in _taste_profiles:
            _taste_profiles[user_id] = {
                "aesthetics": {tag: 0.0 for tag in AESTHETIC_CATEGORIES},
                "preferred_brands": [],
                "liked_items": [],
                "interaction_count": 0,
            }
        return _taste_profiles[user_id]

    def record_like(self, user_id: str, item: dict) -> dict:
        """
        Record a like and update the taste profile.
        Each like slightly increases the weight of the item's aesthetic tags.
        """
        profile = self.get_profile(user_id)
        
        # Increase aesthetic weights for liked item's tags
        for tag in item.get("aesthetic_tags", []):
            if tag in profile["aesthetics"]:
                current = profile["aesthetics"][tag]
                # Exponential moving average: new = old * 0.9 + 0.1
                profile["aesthetics"][tag] = min(1.0, current * 0.9 + 0.1)

        # Track brand preference
        brand = item.get("brand")
        if brand and brand not in profile["preferred_brands"]:
            profile["preferred_brands"].append(brand)

        # Track liked item
        profile["liked_items"].append(item.get("id", ""))
        profile["interaction_count"] += 1

        logger.info(f"User {user_id} taste updated. Interactions: {profile['interaction_count']}")
        return profile

    def record_dislike(self, user_id: str, item: dict) -> dict:
        """
        Record a dislike — slightly decrease aesthetic weights.
        """
        profile = self.get_profile(user_id)

        for tag in item.get("aesthetic_tags", []):
            if tag in profile["aesthetics"]:
                current = profile["aesthetics"][tag]
                profile["aesthetics"][tag] = max(0.0, current * 0.95 - 0.02)

        profile["interaction_count"] += 1
        return profile

    def get_top_aesthetics(self, user_id: str, top_n: int = 4) -> list[tuple[str, float]]:
        """Get the user's top N aesthetic preferences."""
        profile = self.get_profile(user_id)
        sorted_aesthetics = sorted(
            profile["aesthetics"].items(),
            key=lambda x: x[1],
            reverse=True,
        )
        return sorted_aesthetics[:top_n]

    def get_discovery_weights(self, user_id: str) -> dict[str, float]:
        """
        Get weights for the discovery feed algorithm.
        Higher-weighted aesthetics appear more frequently.
        """
        profile = self.get_profile(user_id)
        total = sum(profile["aesthetics"].values()) or 1.0
        return {
            tag: weight / total
            for tag, weight in profile["aesthetics"].items()
            if weight > 0
        }


# ---- Singleton ----

_taste_service: TasteService | None = None


def get_taste_service() -> TasteService:
    global _taste_service
    if _taste_service is None:
        _taste_service = TasteService()
    return _taste_service
