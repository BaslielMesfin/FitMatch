from supabase import create_client, Client
from app.core.config import get_settings

_supabase: Client | None = None

def get_supabase() -> Client:
    """Singleton Supabase client for backend operations."""
    global _supabase
    if _supabase is None:
        settings = get_settings()
        _supabase = create_client(settings.supabase_url, settings.supabase_anon_key)
    return _supabase
