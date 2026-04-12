from supabase import create_client, Client
from app.core.config import get_settings

_supabase: Client | None = None

def get_supabase() -> Client:
    """Singleton Supabase client for backend operations."""
    global _supabase
    if _supabase is None:
        settings = get_settings()
        key = settings.supabase_service_role_key or settings.supabase_anon_key
        if settings.supabase_service_role_key:
            print("DEBUG: initialized supabase-py with SERVICE ROLE KEY")
        else:
            print("DEBUG: initialized supabase-py with ANON KEY")
        _supabase = create_client(settings.supabase_url, key)
    return _supabase
