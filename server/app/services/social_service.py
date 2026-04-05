"""
FitMatch — Social Service
In-memory social features: Follows, Trending Metrics.
"""

from collections import Counter
from typing import Dict, List, Tuple

class SocialService:
    """
    In-memory tracking of social features.
    For trending, we track global aesthetic popularity when users interact.
    """

    def __init__(self):
        # user_id -> set of followed user_ids
        self._follows: Dict[str, set] = {}
        
        # global tag tracking for trending
        self._global_tags_counter = Counter()
        
        # Add some initial trending data so it's not empty
        self._global_tags_counter.update({
            "Streetwear": 120,
            "Old Money": 95,
            "Minimalist": 80,
            "Y2K": 45,
            "Athleisure": 30
        })

    def follow_user(self, user_id: str, target_user_id: str) -> bool:
        if user_id not in self._follows:
            self._follows[user_id] = set()
        self._follows[user_id].add(target_user_id)
        return True

    def unfollow_user(self, user_id: str, target_user_id: str) -> bool:
        if user_id in self._follows and target_user_id in self._follows[user_id]:
            self._follows[user_id].remove(target_user_id)
            return True
        return False

    def get_following_count(self, user_id: str) -> int:
        return len(self._follows.get(user_id, set()))

    def get_followers_count(self, user_id: str) -> int:
        return sum(1 for follows in self._follows.values() if user_id in follows)

    def record_global_interaction(self, tags: List[str]):
        """Called when a user likes/saves an item to boost its aesthetic."""
        for tag in tags:
            self._global_tags_counter[tag] += 1

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
