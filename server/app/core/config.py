"""
FitMatch Server — Core Configuration
Uses Pydantic Settings for type-safe, validated environment variables.
Follows the Dependency Inversion Principle (SOLID "D"):
all services depend on this config interface, not on raw env vars.
"""

import os
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # --- API Keys ---
    gemini_api_key: str = ""
    serper_api_key: str = ""

    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""

    # --- Server ---
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000"
    debug: bool = True

    # --- Defaults ---
    target_brands: list[str] = ["Zara", "ASOS", "SSENSE", "H&M", "Uniqlo", "Urban Outfitters", "Aritzia"]
    max_search_results: int = 20

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), ".env"),
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )


@lru_cache()
def get_settings() -> Settings:
    """Cached settings singleton — only reads .env once."""
    return Settings()
