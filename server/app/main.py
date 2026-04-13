"""
FitMatch Server — Main Application Entry Point
FastAPI app initialization with CORS, rate limiting, routers, and health check.
"""

import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.core.config import get_settings
from app.core.rate_limit import limiter
from app.api.routes import discovery, chat, search, boards, social

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)



# ---- App Factory ----

def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    settings = get_settings()

    app = FastAPI(
        title="FitMatch API",
        description="AI-powered fashion discovery and styling engine",
        version="0.1.0",
        docs_url="/api/docs" if settings.debug else None,
        redoc_url="/api/redoc" if settings.debug else None,
    )

    # Attach rate limiter
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

    # ---- CORS ----
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ---- Routers ----
    app.include_router(discovery.router, prefix="/api")
    app.include_router(chat.router, prefix="/api")
    app.include_router(search.router, prefix="/api")
    app.include_router(boards.router, prefix="/api")
    app.include_router(social.router, prefix="/api")

    # ---- Health Check ----
    from app.core.supabase import get_supabase
    @app.get("/api/health")
    async def health_check():
        db_status = "offline"
        try:
            # Simple ping to test DB connection
            supabase = get_supabase()
            supabase.table("taste_profiles").select("count", count="exact").limit(1).execute()
            db_status = "connected"
        except Exception as e:
            logger.error(f"Health check DB error: {e}")
            db_status = "error"

        return {
            "status": "healthy" if db_status == "connected" else "degraded",
            "app": "FitMatch API",
            "version": "0.1.0",
            "db_status": db_status,
            "ai_configured": bool(settings.gemini_api_key),
            "search_configured": bool(settings.serper_api_key),
        }

    # ---- Startup Event ----
    @app.on_event("startup")
    async def startup():
        logger.info("FitMatch API starting up...")
        logger.info(f"   CORS origins: {settings.cors_origin_list}")
        logger.info(f"   Gemini API: {'configured' if settings.gemini_api_key else 'not set'}")
        logger.info(f"   Serper API: {'configured' if settings.serper_api_key else 'not set'}")
        logger.info(f"   Target brands: {settings.target_brands}")
        logger.info(f"   Rate limiting: active (default 60/min, chat 5/min)")
        logger.info("   Docs: http://localhost:8000/api/docs")

    return app


# Create the app instance
app = create_app()
