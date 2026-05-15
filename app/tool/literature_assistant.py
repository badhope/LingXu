import json
from typing import Any, Dict, Optional

from app.tool.base import BaseTool, ToolResult
from app.prompt.literature import (
    LITERATURE_SUMMARY_SYSTEM_PROMPT,
    LITERATURE_USER_PROMPT,
    KEY_FINDINGS_EXTRACTION_PROMPT,
    TERM_EXPLANATION_PROMPT,
)
from app.llm import LLM
from app.rag import retriever


class LiteratureAssistantTool(BaseTool):
    name: str = "literature_assistant"
    description: str = "论文助手工具 - 用于学术文献分析、摘要生成、关键词提取和术语解释"
    parameters: Optional[dict] = {
        "type": "object",
        "properties": {
            "action": {
                "type": "string",
                "description": "执行的操作类型",
                "enum": ["summarize", "extract_key_findings", "explain_term", "search_literature"]
            },
            "content": {
                "type": "string",
                "description": "论文内容或查询文本"
            },
            "term": {
                "type": "string",
                "description": "需要解释的学术术语（仅用于explain_term操作）"
            },
            "query": {
                "type": "string",
                "description": "搜索查询（仅用于search_literature操作）"
            }
        },
        "required": ["action"]
    }

    def __init__(self):
        super().__init__(
            name=LiteratureAssistantTool.name,
            description=LiteratureAssistantTool.description,
            parameters=LiteratureAssistantTool.parameters
        )
        self.llm = LLM()

    async def execute(self, **kwargs) -> ToolResult:
        action = kwargs.get("action")
        
        try:
            if action == "summarize":
                return await self._summarize_literature(kwargs.get("content", ""))
            elif action == "extract_key_findings":
                return await self._extract_key_findings(kwargs.get("content", ""))
            elif action == "explain_term":
                return await self._explain_term(kwargs.get("term", ""))
            elif action == "search_literature":
                return await self._search_literature(kwargs.get("query", ""))
            else:
                return self.fail_response(f"未知操作类型: {action}")
        except Exception as e:
            return self.fail_response(f"执行失败: {str(e)}")

    async def _summarize_literature(self, content: str) -> ToolResult:
        if not content:
            return self.fail_response("论文内容不能为空")
        
        prompt = LITERATURE_USER_PROMPT.format(literature_content=content)
        response = await self.llm.chat(
            messages=[
                {"role": "system", "content": LITERATURE_SUMMARY_SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ]
        )
        return self.success_response(response)

    async def _extract_key_findings(self, content: str) -> ToolResult:
        if not content:
            return self.fail_response("论文内容不能为空")
        
        prompt = KEY_FINDINGS_EXTRACTION_PROMPT.format(literature_content=content)
        response = await self.llm.chat(
            messages=[
                {"role": "system", "content": "你是一位学术文献分析专家，擅长提取关键发现。"},
                {"role": "user", "content": prompt}
            ]
        )
        return self.success_response(response)

    async def _explain_term(self, term: str) -> ToolResult:
        if not term:
            return self.fail_response("术语不能为空")
        
        prompt = TERM_EXPLANATION_PROMPT.format(term=term)
        response = await self.llm.chat(
            messages=[
                {"role": "system", "content": "你是一位学术术语解释专家。"},
                {"role": "user", "content": prompt}
            ]
        )
        return self.success_response(response)

    async def _search_literature(self, query: str) -> ToolResult:
        if not query:
            return self.fail_response("搜索查询不能为空")
        
        results = retriever.search(query, top_k=5)
        if not results:
            return self.success_response("未找到相关文献")
        
        formatted_results = []
        for i, result in enumerate(results, 1):
            formatted_results.append({
                "序号": i,
                "文档ID": result["doc_id"],
                "相关性分数": result["score"],
                "内容片段": result["content"][:200] + "..." if len(result["content"]) > 200 else result["content"],
                "元数据": result["metadata"]
            })
        
        return self.success_response(json.dumps(formatted_results, ensure_ascii=False, indent=2))