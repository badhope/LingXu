class DATAAIError(Exception):
    """基础异常类"""
    def __init__(self, message: str, error_code: str = "UNKNOWN", retryable: bool = False):
        self.message = message
        self.error_code = error_code
        self.retryable = retryable
        super().__init__(self.message)


class ToolError(DATAAIError):
    """工具执行错误"""
    def __init__(self, message: str, tool_name: str = "", retryable: bool = False):
        self.tool_name = tool_name
        super().__init__(message, error_code="TOOL_ERROR", retryable=retryable)


class TokenLimitExceeded(DATAAIError):
    """Token 超限"""
    def __init__(self, message: str = "Token limit exceeded"):
        super().__init__(message, error_code="TOKEN_LIMIT", retryable=False)


class LLMConnectionError(DATAAIError):
    """LLM API 连接失败"""
    def __init__(self, message: str, provider: str = ""):
        self.provider = provider
        super().__init__(message, error_code="LLM_CONNECTION", retryable=True)


class LLMResponseError(DATAAIError):
    """LLM 返回无效响应"""
    def __init__(self, message: str):
        super().__init__(message, error_code="LLM_RESPONSE", retryable=True)


class RateLimitError(DATAAIError):
    """速率限制"""
    def __init__(self, message: str = "Rate limit exceeded", retry_after: float = 0):
        self.retry_after = retry_after
        super().__init__(message, error_code="RATE_LIMIT", retryable=True)


class ModelNotSupportedError(DATAAIError):
    """模型不支持某功能"""
    def __init__(self, message: str, model: str = "", feature: str = ""):
        self.model = model
        self.feature = feature
        super().__init__(message, error_code="MODEL_NOT_SUPPORTED", retryable=False)


class ConfigError(DATAAIError):
    """配置错误"""
    def __init__(self, message: str):
        super().__init__(message, error_code="CONFIG_ERROR", retryable=False)


class BrowserError(DATAAIError):
    """浏览器操作错误"""
    def __init__(self, message: str):
        super().__init__(message, error_code="BROWSER_ERROR", retryable=True)


class SandboxError(DATAAIError):
    """沙箱执行错误"""
    def __init__(self, message: str):
        super().__init__(message, error_code="SANDBOX_ERROR", retryable=False)


class MCPServerError(DATAAIError):
    """MCP 服务器错误"""
    def __init__(self, message: str, server_name: str = ""):
        self.server_name = server_name
        super().__init__(message, error_code="MCP_SERVER_ERROR", retryable=True)


class TimeoutError(DATAAIError):
    """超时"""
    def __init__(self, message: str = "Operation timed out"):
        super().__init__(message, error_code="TIMEOUT", retryable=True)
