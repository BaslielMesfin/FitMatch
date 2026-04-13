"""
FitMatch — Rate Limiter Configuration
Centralized rate limiter instance to avoid circular imports.
"""

from slowapi import Limiter
from slowapi.util import get_remote_address

# Global rate limiter — keyed by client IP address
limiter = Limiter(key_func=get_remote_address, default_limits=["60/minute"])
