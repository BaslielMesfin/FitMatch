"""
FitMatch — Supabase Client
Singleton client for backend database operations.

Security note: The service role key bypasses RLS. This is intentional for
server-side operations where the backend needs to read/write across users
(e.g., taste profiles, boards). Never expose this key to the frontend.
"""

from supabase import create_client, Client
from app.core.config import get_settings

_supabase: Client | None = None


def get_supabase() -> Client:
    """Singleton Supabase client using the service role key for backend ops."""
    global _supabase
    if _supabase is None:
        settings = get_settings()
        key = settings.supabase_service_role_key or settings.supabase_anon_key
        _supabase = create_client(settings.supabase_url, key)
    return _supabase
