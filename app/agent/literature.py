from typing import List, Optional

from app.agent.base import BaseAgent
from app.tool.literature_assistant import LiteratureAssistantTool
from app.prompt.literature import LITERATURE_SUMMARY_SYSTEM_PROMPT


class LiteratureAgent(BaseAgent):
    name: str = "LiteratureAgent"
    description: str = "论文助手智能体 - 专注于学术文献分析、摘要生成和研究辅助"
    
    system_prompt: str = """
你是一位专业的学术论文助手，精通学术文献分析和研究辅助。

## 核心能力
- 📚 文献摘要生成：从长篇学术论文中提炼核心内容
- 🔍 关键信息提取：识别研究目的、方法、结果和结论
- 📖 术语解释：解释复杂的学术术语和专业概念
- 📊 文献检索：在知识库中搜索相关学术文献

## 工作流程
1. 分析用户请求，确定所需操作类型
2. 如果需要搜索文献，先检索知识库
3. 执行相应的分析任务
4. 提供结构化、专业的输出

## 输出要求
- 使用清晰、专业的学术语言
- 提供结构化的回复格式
- 确保信息准确、完整
"""

    def __init__(self, **kwargs):
        super().__init__(
            name=LiteratureAgent.name,
            description=LiteratureAgent.description,
            system_prompt=LiteratureAgent.system_prompt,
            **kwargs
        )
        self.tool = LiteratureAssistantTool()

    async def step(self) -> str:
        """执行论文助手的单步操作"""
        if self.current_step == 0:
            return await self._analyze_request()
        else:
            return await self._process_results()

    async def _analyze_request(self) -> str:
        """分析用户请求并执行相应操作"""
        if not self.memory.messages:
            return "等待用户输入..."
        
        last_message = self.memory.messages[-1]
        if last_message.role != "user":
            return "等待用户输入..."
        
        user_request = last_message.content
        
        if "摘要" in user_request or "总结" in user_request or "summarize" in user_request.lower():
            return await self._handle_summarize(user_request)
        elif "提取" in user_request or "关键" in user_request or "findings" in user_request.lower():
            return await self._handle_extract(user_request)
        elif "解释" in user_request or "术语" in user_request or "define" in user_request.lower():
            return await self._handle_explain(user_request)
        elif "搜索" in user_request or "查找" in user_request or "search" in user_request.lower():
            return await self._handle_search(user_request)
        else:
            return await self._handle_general(user_request)

    async def _handle_summarize(self, request: str) -> str:
        """处理摘要生成请求"""
        content_start = request.find("```")
        if content_start != -1:
            content_end = request.find("```", content_start + 3)
            if content_end != -1:
                content = request[content_start + 3:content_end].strip()
                result = await self.tool.execute(action="summarize", content=content)
                self.update_memory("assistant", f"📚 文献摘要已生成：\n{result.output}")
                return f"已生成文献摘要"
        return "请提供需要摘要的论文内容，使用```包裹"

    async def _handle_extract(self, request: str) -> str:
        """处理关键发现提取请求"""
        content_start = request.find("```")
        if content_start != -1:
            content_end = request.find("```", content_start + 3)
            if content_end != -1:
                content = request[content_start + 3:content_end].strip()
                result = await self.tool.execute(action="extract_key_findings", content=content)
                self.update_memory("assistant", f"🔍 关键发现已提取：\n{result.output}")
                return f"已提取关键发现"
        return "请提供需要分析的论文内容，使用```包裹"

    async def _handle_explain(self, request: str) -> str:
        """处理术语解释请求"""
        import re
        term_match = re.search(r'["\']([^"\']+)["\']|术语[\s：:]+([^\s，,。.]+)', request)
        if term_match:
            term = term_match.group(1) or term_match.group(2)
            result = await self.tool.execute(action="explain_term", term=term)
            self.update_memory("assistant", f"📖 术语解释：\n{result.output}")
            return f"已解释术语: {term}"
        return "请指定需要解释的术语，如：解释'深度学习'"

    async def _handle_search(self, request: str) -> str:
        """处理文献搜索请求"""
        import re
        query_match = re.search(r'搜索[\s：:]+([^\s，,。.]+)', request)
        if query_match:
            query = query_match.group(1)
            result = await self.tool.execute(action="search_literature", query=query)
            self.update_memory("assistant", f"🔎 搜索结果：\n{result.output}")
            return f"已搜索文献: {query}"
        return "请指定搜索关键词，如：搜索'人工智能'"

    async def _handle_general(self, request: str) -> str:
        """处理通用请求"""
        response = await self.llm.chat(
            messages=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": request}
            ]
        )
        self.update_memory("assistant", response)
        return "已完成分析"

    async def _process_results(self) -> str:
        """处理后续步骤"""
        return "任务已完成"