class ToolError(Exception):
    """Raised when a tool encounters an error."""

    def __init__(self, message):
        self.message = message


class DATA-AIError(Exception):
    """Base exception for all DATA-AI errors"""


class TokenLimitExceeded(DATA-AIError):
    """Exception raised when the token limit is exceeded"""
