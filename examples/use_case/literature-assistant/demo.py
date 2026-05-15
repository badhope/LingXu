import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.agent.literature import LiteratureAgent
from app.rag import retriever
from examples.use_case.literature_assistant.sample_papers import load_sample_papers


async def run_demo():
    print("=" * 60)
    print("🎓 论文助手演示")
    print("=" * 60)
    
    print("\n1️⃣ 初始化知识库...")
    load_sample_papers(retriever)
    stats = retriever.get_stats()
    print(f"   - 知识库已加载 {stats['total_documents']} 篇论文")
    print(f"   - 共 {stats['total_chunks']} 个文档片段")
    print(f"   - 词汇表大小: {stats['vocabulary_size']}")
    
    print("\n2️⃣ 创建论文助手智能体...")
    agent = LiteratureAgent()
    print("   - 智能体创建成功")
    
    print("\n" + "=" * 60)
    print("📝 演示1: 搜索知识库")
    print("=" * 60)
    result = await agent.run("搜索Transformer")
    print(result)
    
    print("\n" + "=" * 60)
    print("📝 演示2: 解释学术术语")
    print("=" * 60)
    result = await agent.run("解释'注意力机制'")
    print(result)
    
    print("\n" + "=" * 60)
    print("📝 演示3: 生成文献摘要")
    print("=" * 60)
    sample_content = """
标题：深度学习在自然语言处理中的应用
作者：张三, 李四
发表期刊：计算机学报
发表时间：2023年

摘要：
本研究探讨了深度学习技术在自然语言处理领域的最新进展。通过对比传统机器学习方法与深度学习方法在多个NLP任务上的表现，我们发现深度学习模型在文本分类、情感分析和机器翻译等任务上均展现出显著优势。

研究方法：
1. 使用Transformer架构作为基础模型
2. 在多个公开数据集上进行实验
3. 对比不同预训练模型的性能

主要结果：
- 在文本分类任务上准确率达到95.2%
- 在情感分析任务上F1分数达到92.8%
- 机器翻译质量提升了15%

核心结论：
深度学习已成为自然语言处理的主流方法，未来研究应关注模型效率和可解释性。
"""
    result = await agent.run(f"生成以下论文的摘要：\n```\n{sample_content}\n```")
    print(result)
    
    print("\n" + "=" * 60)
    print("🎉 演示完成!")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(run_demo())