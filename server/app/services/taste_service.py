"""
FitMatch — Taste Service
Persistent taste profiles using Supabase.
Manages user taste profiles based on likes and interactions.
"""

import logging
from typing import List, Tuple
from app.core.supabase import get_supabase

logger = logging.getLogger(__name__)

AESTHETIC_CATEGORIES = [
    "Old Money", "Streetwear", "Minimalist", "Y2K", "Dark Academia",
    "Coastal Grandmother", "Quiet Luxury", "Gorpcore", "Coquette",
    "Bohemian", "Preppy", "Grunge", "Athleisure", "Cottagecore"
]


class TasteService:
    """Manages and evolves user taste profiles in Supabase."""

    def __init__(self):
        self.supabase = get_supabase()

    async def get_profile(self, user_id: str) -> dict:
        """Get the current taste profile for a user from Supabase."""
        default_profile = {
            "user_id": user_id,
            "aesthetics": {tag: 0.0 for tag in AESTHETIC_CATEGORIES},
            "preferred_brands": [],
            "liked_items": [],
            "interaction_count": 0
        }
        if user_id == "anonymous":
            return default_profile

        res = self.supabase.table("taste_profiles") \
            .select("*") \
            .eq("user_id", user_id) \
            .execute()
        
        if not res.data:
            # Create a default profile if it doesn't exist
            default_profile = {
                "user_id": user_id,
                "aesthetics": {tag: 0.0 for tag in AESTHETIC_CATEGORIES},
                "preferred_brands": [],
                "liked_items": [],
                "interaction_count": 0
            }
            try:
                # Use upsert to avoid race conditions
                ins_res = self.supabase.table("taste_profiles").upsert(default_profile).execute()
                return ins_res.data[0] if ins_res.data else default_profile
            except Exception as e:
                logger.error(f"Error creating taste profile for {user_id}: {e}")
                return default_profile
        
        return res.data[0]

    async def record_like(self, user_id: str, item: dict) -> dict:
        """Record a like and update the persistent taste profile."""
        profile = await self.get_profile(user_id)
        
        # 1. Update aesthetic weights
        aesthetics = profile.get("aesthetics", {})
        for tag in item.get("aesthetic_tags", []):
            if tag in aesthetics:
                current = float(aesthetics[tag])
                aesthetics[tag] = min(1.0, current * 0.9 + 0.1)

        # 2. Update brands
        brand = item.get("brand")
        preferred_brands = list(profile.get("preferred_brands", []))
        if brand and brand not in preferred_brands:
            preferred_brands.append(brand)

        # 3. Update liked items and count
        liked_items = list(profile.get("liked_items", []))
        liked_items.append(item.get("id", ""))
        
        updated_profile = {
            "user_id": user_id,
            "aesthetics": aesthetics,
            "preferred_brands": preferred_brands,
            "liked_items": liked_items,
            "interaction_count": profile.get("interaction_count", 0) + 1
        }

        if user_id != "anonymous":
            try:
                self.supabase.table("taste_profiles").upsert(updated_profile).execute()
            except Exception:
                pass
        return updated_profile

    async def record_dislike(self, user_id: str, item: dict) -> dict:
        """Record a dislike — slightly decrease aesthetic weights."""
        profile = await self.get_profile(user_id)
        
        aesthetics = profile.get("aesthetics", {})
        for tag in item.get("aesthetic_tags", []):
            if tag in aesthetics:
                current = float(aesthetics[tag])
                aesthetics[tag] = max(0.0, current * 0.95 - 0.02)

        updated_profile = {
            "user_id": user_id,
            "aesthetics": aesthetics,
            "interaction_count": profile.get("interaction_count", 0) + 1
        }

        if user_id != "anonymous":
            try:
                self.supabase.table("taste_profiles").upsert(updated_profile).execute()
            except Exception:
                pass
        return updated_profile

    async def get_top_aesthetics(self, user_id: str, top_n: int = 4) -> list[tuple[str, float]]:
        """Get the user's top N aesthetic preferences."""
        profile = await self.get_profile(user_id)
        aesthetics = profile.get("aesthetics", {})
        
        sorted_aesthetics = sorted(
            [(k, v) for k, v in aesthetics.items() if float(v) > 0],
            key=lambda x: x[1],
            reverse=True,
        )
        return sorted_aesthetics[:top_n]

    async def get_discovery_weights(self, user_id: str) -> dict[str, float]:
        """Get weights for the discovery feed algorithm."""
        profile = await self.get_profile(user_id)
        aesthetics = profile.get("aesthetics", {})
        
        total = sum(float(v) for v in aesthetics.values()) or 1.0
        return {
            tag: float(weight) / total
            for tag, weight in aesthetics.items()
            if float(weight) > 0
        }

    async def initialize_profile(self, user_id: str, aesthetics_list: List[str]):
        """Prime the taste profile with onboarding aesthetics."""
        profile = await self.get_profile(user_id)
        current_weights = profile.get("aesthetics", {tag: 0.0 for tag in AESTHETIC_CATEGORIES})
        
        # Set selected aesthetics to 0.7 (strong starting signal)
        for name in aesthetics_list:
            if name in current_weights:
                current_weights[name] = 0.7
                
        updated_profile = {
            "user_id": user_id,
            "aesthetics": current_weights,
            "interaction_count": 1 # Count as first interaction
        }
        
        if user_id != "anonymous":
            try:
                self.supabase.table("taste_profiles").upsert(updated_profile).execute()
            except Exception:
                pass
        return updated_profile


# ---- Singleton ----

_taste_service: TasteService | None = None

def get_taste_service() -> TasteService:
    global _taste_service
    if _taste_service is None:
        _taste_service = TasteService()
    return _taste_service
