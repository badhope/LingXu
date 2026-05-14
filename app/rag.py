"""
RAG (Retrieval-Augmented Generation) 模块
使用 TF-IDF + 余弦相似度实现轻量级文档检索
"""
import os
import re
import math
import json
from collections import Counter
from typing import List, Dict, Tuple, Optional
from pathlib import Path


class SimpleTokenizer:
    """简单的中英文分词器"""

    @staticmethod
    def tokenize(text: str) -> List[str]:
        # 英文按空格分词，中文按字符分词
        tokens = []
        # 提取英文单词
        english_words = re.findall(r'[a-zA-Z]+', text.lower())
        tokens.extend(english_words)
        # 提取中文（按单字或双字组合）
        chinese_chars = re.findall(r'[\u4e00-\u9fff]+', text)
        for segment in chinese_chars:
            if len(segment) == 1:
                tokens.append(segment)
            else:
                # 双字组合（bigram）
                for i in range(len(segment) - 1):
                    tokens.append(segment[i:i+2])
                # 也保留单字
                tokens.extend(list(segment))
        return tokens


class TFIDFRetriever:
    """基于 TF-IDF 的文档检索器"""

    def __init__(self):
        self.documents: Dict[str, List[str]] = {}  # doc_id -> [chunks]
        self.doc_metadata: Dict[str, dict] = {}  # doc_id -> metadata
        self.vocabulary: Dict[str, int] = {}  # term -> index
        self.idf: Dict[str, float] = {}  # term -> idf score
        self.doc_vectors: Dict[str, Dict[str, float]] = {}  # doc_id -> {term: tfidf}
        self.chunk_size = 500  # 每个文档片段的字符数
        self.chunk_overlap = 50  # 片段之间的重叠字符数

    def add_document(self, doc_id: str, content: str, metadata: dict = None):
        """添加文档到检索库"""
        if metadata is None:
            metadata = {}
        self.doc_metadata[doc_id] = metadata

        # 分块
        chunks = self._chunk_text(content)
        self.documents[doc_id] = chunks

        # 重建索引
        self._build_index()

    def remove_document(self, doc_id: str):
        """从检索库中移除文档"""
        if doc_id in self.documents:
            del self.documents[doc_id]
        if doc_id in self.doc_metadata:
            del self.doc_metadata[doc_id]
        # 重建索引
        self._build_index()

    def search(self, query: str, top_k: int = 5, min_score: float = 0.1) -> List[Dict]:
        """搜索相关文档片段"""
        if not self.doc_vectors:
            return []

        query_tokens = SimpleTokenizer.tokenize(query)
        query_vector = self._compute_tf(query_tokens)

        results = []
        for doc_id, chunks in self.documents.items():
            for i, chunk in enumerate(chunks):
                chunk_tokens = SimpleTokenizer.tokenize(chunk)
                chunk_vector = self._compute_tf(chunk_tokens)
                score = self._cosine_similarity(query_vector, chunk_vector)
                if score >= min_score:
                    results.append({
                        "doc_id": doc_id,
                        "chunk_index": i,
                        "content": chunk,
                        "score": round(score, 4),
                        "metadata": self.doc_metadata.get(doc_id, {})
                    })

        # 按分数排序
        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:top_k]

    def _chunk_text(self, text: str) -> List[str]:
        """将文本分成重叠的片段"""
        if not text or not text.strip():
            return []

        text = text.strip()
        chunks = []
        start = 0
        while start < len(text):
            end = start + self.chunk_size
            chunk = text[start:end]
            if chunk.strip():
                chunks.append(chunk)
            start = end - self.chunk_overlap
            if start >= len(text):
                break

        return chunks if chunks else [text] if text else []

    def _build_index(self):
        """构建 TF-IDF 索引"""
        # 收集所有文档频率
        all_tokens = set()
        doc_count = 0
        doc_freq = Counter()  # term -> 出现在多少个文档中

        for doc_id, chunks in self.documents.items():
            doc_count += 1
            doc_tokens = set()
            for chunk in chunks:
                tokens = SimpleTokenizer.tokenize(chunk)
                doc_tokens.update(tokens)
                all_tokens.update(tokens)
            for token in doc_tokens:
                doc_freq[token] += 1

        # 计算 IDF
        self.idf = {}
        for term in all_tokens:
            self.idf[term] = math.log((doc_count + 1) / (doc_freq[term] + 1)) + 1

        # 构建词汇表
        self.vocabulary = {term: idx for idx, term in enumerate(sorted(all_tokens))}

        # 计算每个文档的 TF-IDF 向量
        self.doc_vectors = {}
        for doc_id, chunks in self.documents.items():
            all_doc_tokens = []
            for chunk in chunks:
                all_doc_tokens.extend(SimpleTokenizer.tokenize(chunk))
            self.doc_vectors[doc_id] = self._compute_tf(all_doc_tokens)

    def _compute_tf(self, tokens: List[str]) -> Dict[str, float]:
        """计算 TF-IDF 向量"""
        tf = Counter(tokens)
        total = len(tokens) if tokens else 1
        tfidf = {}
        for term, count in tf.items():
            tfidf[term] = (count / total) * self.idf.get(term, 0)
        return tfidf

    def _cosine_similarity(self, vec1: Dict[str, float], vec2: Dict[str, float]) -> float:
        """计算余弦相似度"""
        if not vec1 or not vec2:
            return 0.0

        # 点积
        dot_product = sum(vec1.get(term, 0) * vec2.get(term, 0) for term in set(vec1) & set(vec2))

        # 模
        norm1 = math.sqrt(sum(v ** 2 for v in vec1.values()))
        norm2 = math.sqrt(sum(v ** 2 for v in vec2.values()))

        if norm1 == 0 or norm2 == 0:
            return 0.0

        return dot_product / (norm1 * norm2)

    def get_stats(self) -> dict:
        """获取检索库统计信息"""
        total_chunks = sum(len(chunks) for chunks in self.documents.values())
        return {
            "total_documents": len(self.documents),
            "total_chunks": total_chunks,
            "vocabulary_size": len(self.vocabulary),
            "documents": {doc_id: {"chunks": len(chunks), "metadata": meta}
                         for doc_id, chunks, meta in [(d, c, self.doc_metadata.get(d, {}))
                                                       for d, c in self.documents.items()]}
        }


# 全局检索器实例
retriever = TFIDFRetriever()
