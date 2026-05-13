class ToolError(Exception):
    """Raised when a tool encounters an error."""

    def __init__(self, message):
        self.message = message


class DataAgentError(Exception):
    """Base exception for all DataAgent errors"""


class TokenLimitExceeded(DataAgentError):
    """Exception raised when the token limit is exceeded"""
