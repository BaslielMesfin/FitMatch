"""
FitMatch — Social Service
Persistent social features using Supabase: Follows, Trending Metrics.
"""

from collections import Counter
from typing import List, Tuple
from app.core.supabase import get_supabase

class SocialService:
    """
    Persistent tracking of social features.
    """

    def __init__(self):
        self.supabase = get_supabase()
        # In-memory counter for trending aesthetics to avoid too many DB hits
        # We can periodically flush this or just use it as a real-time buffer
        self._global_tags_counter = Counter({
            "Streetwear": 120,
            "Old Money": 95,
            "Minimalist": 80,
            "Y2K": 45,
            "Athleisure": 30
        })

    async def follow_user(self, user_id: str, target_user_id: str) -> bool:
        """Create a follow relationship in Supabase."""
        try:
            self.supabase.table("follows").upsert({
                "follower_id": user_id,
                "following_id": target_user_id
            }).execute()
            return True
        except Exception:
            return False

    async def unfollow_user(self, user_id: str, target_user_id: str) -> bool:
        """Delete a follow relationship in Supabase."""
        try:
            self.supabase.table("follows") \
                .delete() \
                .eq("follower_id", user_id) \
                .eq("following_id", target_user_id) \
                .execute()
            return True
        except Exception:
            return False

    async def get_following_count(self, user_id: str) -> int:
        """Count users that this user follows."""
        res = self.supabase.table("follows") \
            .select("following_id", count="exact") \
            .eq("follower_id", user_id) \
            .execute()
        return res.count if res.count is not None else 0

    async def get_followers_count(self, user_id: str) -> int:
        """Count users that follow this user."""
        res = self.supabase.table("follows") \
            .select("follower_id", count="exact") \
            .eq("following_id", user_id) \
            .execute()
        return res.count if res.count is not None else 0

    async def record_global_interaction(self, tags: List[str]):
        """Called when a user likes/saves an item to boost its aesthetic."""
        for tag in tags:
            self._global_tags_counter[tag] += 1
        
        # In a real app, we might also log this to a 'trends' table in Supabase
        # to track trends over time.

    def get_trending_aesthetics(self, limit: int = 5) -> List[Tuple[str, int]]:
        """Return the top globally tending aesthetics."""
        return self._global_tags_counter.most_common(limit)


# ---- Singleton ----

_social_service: SocialService | None = None

def get_social_service() -> SocialService:
    global _social_service
    if _social_service is None:
        _social_service = SocialService()
    return _social_service
