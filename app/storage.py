"""
DATA-AI 持久化存储模块
使用 SQLite 实现服务端数据持久化，替代内存字典存储。
支持：对话历史、用户反馈、设置缓存。
"""

import json
import sqlite3
import threading
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

# 数据库文件路径
DB_DIR = Path(__file__).parent / "data"
DB_PATH = DB_DIR / "data_ai.db"

# 线程锁，确保线程安全
_lock = threading.Lock()


def _get_conn() -> sqlite3.Connection:
    """获取数据库连接"""
    DB_DIR.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(DB_PATH), check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def init_db():
    """初始化数据库表结构"""
    conn = _get_conn()
    try:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS conversations (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL DEFAULT '新对话',
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                conversation_id TEXT NOT NULL,
                role TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conversation_id);

            CREATE TABLE IF NOT EXISTS feedbacks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                message_id TEXT NOT NULL,
                conversation_id TEXT,
                feedback_type TEXT NOT NULL,
                comment TEXT DEFAULT '',
                created_at TEXT NOT NULL
            );

            CREATE INDEX IF NOT EXISTS idx_feedbacks_msg ON feedbacks(message_id);

            CREATE TABLE IF NOT EXISTS user_preferences (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );

            -- 记忆系统表
            CREATE TABLE IF NOT EXISTS memories (
                id TEXT PRIMARY KEY,
                type TEXT NOT NULL DEFAULT 'long_term',
                key TEXT,
                content TEXT NOT NULL,
                metadata TEXT DEFAULT '{}',
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                expires_at TEXT
            );

            CREATE INDEX IF NOT EXISTS idx_memories_type ON memories(type);
            CREATE INDEX IF NOT EXISTS idx_memories_key ON memories(key);

            -- 系统日志表
            CREATE TABLE IF NOT EXISTS system_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                level TEXT NOT NULL DEFAULT 'info',
                source TEXT NOT NULL,
                message TEXT NOT NULL,
                details TEXT DEFAULT '{}',
                conversation_id TEXT,
                created_at TEXT NOT NULL
            );

            CREATE INDEX IF NOT EXISTS idx_logs_level ON system_logs(level);
            CREATE INDEX IF NOT EXISTS idx_logs_source ON system_logs(source);
            CREATE INDEX IF NOT EXISTS idx_logs_conv ON system_logs(conversation_id);
            CREATE INDEX IF NOT EXISTS idx_logs_time ON system_logs(created_at);

            -- 搜索引擎设置表
            CREATE TABLE IF NOT EXISTS search_settings (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                engine TEXT NOT NULL DEFAULT 'duckduckgo',
                results_count INTEGER DEFAULT 5,
                timeout INTEGER DEFAULT 30,
                safe_search TEXT DEFAULT 'moderate',
                language TEXT DEFAULT 'auto',
                api_keys TEXT DEFAULT '{}',
                custom_engines TEXT DEFAULT '[]',
                updated_at TEXT NOT NULL
            );

            -- 初始化默认搜索设置
            INSERT OR IGNORE INTO search_settings (id, engine, updated_at) 
            VALUES (1, 'duckduckgo', datetime('now'));
        """)
        conn.commit()
    finally:
        conn.close()


# ==================== 对话管理 ====================

def create_conversation(conv_id: Optional[str] = None, title: str = "新对话") -> Dict[str, Any]:
    """创建新对话"""
    if not conv_id:
        conv_id = str(uuid.uuid4())
    now = datetime.now().isoformat()
    with _lock:
        conn = _get_conn()
        try:
            conn.execute(
                "INSERT OR REPLACE INTO conversations (id, title, created_at, updated_at) VALUES (?, ?, ?, ?)",
                (conv_id, title, now, now),
            )
            conn.commit()
        finally:
            conn.close()
    return get_conversation(conv_id)


def get_conversation(conv_id: str) -> Optional[Dict[str, Any]]:
    """获取单个对话及其消息"""
    with _lock:
        conn = _get_conn()
        try:
            row = conn.execute("SELECT * FROM conversations WHERE id = ?", (conv_id,)).fetchone()
            if not row:
                return None
            messages = conn.execute(
                "SELECT role, content, created_at FROM messages WHERE conversation_id = ? ORDER BY id ASC",
                (conv_id,),
            ).fetchall()
            return {
                "id": row["id"],
                "title": row["title"],
                "created_at": row["created_at"],
                "updated_at": row["updated_at"],
                "messages": [{"role": m["role"], "content": m["content"]} for m in messages],
            }
        finally:
            conn.close()


def list_conversations() -> List[Dict[str, Any]]:
    """列出所有对话（不含消息）"""
    with _lock:
        conn = _get_conn()
        try:
            rows = conn.execute(
                "SELECT id, title, created_at, updated_at FROM conversations ORDER BY updated_at DESC"
            ).fetchall()
            return [dict(r) for r in rows]
        finally:
            conn.close()


def search_conversations(query: str) -> List[Dict[str, Any]]:
    """搜索对话（匹配标题或消息内容）"""
    with _lock:
        conn = _get_conn()
        try:
            keyword = f"%{query}%"
            # 搜索标题匹配的对话
            rows = conn.execute(
                "SELECT DISTINCT c.id, c.title, c.created_at, c.updated_at "
                "FROM conversations c "
                "LEFT JOIN messages m ON c.id = m.conversation_id "
                "WHERE c.title LIKE ? OR m.content LIKE ? "
                "ORDER BY c.updated_at DESC",
                (keyword, keyword),
            ).fetchall()
            return [dict(r) for r in rows]
        finally:
            conn.close()


def update_conversation_title(conv_id: str, title: str):
    """更新对话标题"""
    now = datetime.now().isoformat()
    with _lock:
        conn = _get_conn()
        try:
            conn.execute(
                "UPDATE conversations SET title = ?, updated_at = ? WHERE id = ?",
                (title, now, conv_id),
            )
            conn.commit()
        finally:
            conn.close()


def delete_conversation(conv_id: str) -> bool:
    """删除对话及其消息"""
    with _lock:
        conn = _get_conn()
        try:
            cursor = conn.execute("DELETE FROM conversations WHERE id = ?", (conv_id,))
            conn.commit()
            return cursor.rowcount > 0
        finally:
            conn.close()


def clear_conversation_messages(conv_id: str) -> bool:
    """清空对话的所有消息（保留对话本身）"""
    now = datetime.now().isoformat()
    with _lock:
        conn = _get_conn()
        try:
            cursor = conn.execute("DELETE FROM messages WHERE conversation_id = ?", (conv_id,))
            conn.execute(
                "UPDATE conversations SET updated_at = ? WHERE id = ?",
                (now, conv_id),
            )
            conn.commit()
            return cursor.rowcount > 0
        finally:
            conn.close()


def add_message(conv_id: str, role: str, content: str) -> bool:
    """向对话添加消息"""
    now = datetime.now().isoformat()
    with _lock:
        conn = _get_conn()
        try:
            # 检查对话是否存在
            row = conn.execute("SELECT id FROM conversations WHERE id = ?", (conv_id,)).fetchone()
            if not row:
                return False
            conn.execute(
                "INSERT INTO messages (conversation_id, role, content, created_at) VALUES (?, ?, ?, ?)",
                (conv_id, role, content, now),
            )
            conn.execute(
                "UPDATE conversations SET updated_at = ? WHERE id = ?",
                (now, conv_id),
            )
            conn.commit()
            return True
        finally:
            conn.close()


def get_conversation_messages(conv_id: str, limit: int = 50) -> List[Dict[str, str]]:
    """获取对话的最近N条消息"""
    with _lock:
        conn = _get_conn()
        try:
            rows = conn.execute(
                "SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY id DESC LIMIT ?",
                (conv_id, limit),
            ).fetchall()
            return [{"role": r["role"], "content": r["content"]} for r in reversed(rows)]
        finally:
            conn.close()


# ==================== 用户反馈 ====================

def add_feedback(message_id: str, feedback_type: str, comment: str = "", conversation_id: str = ""):
    """添加用户反馈"""
    now = datetime.now().isoformat()
    with _lock:
        conn = _get_conn()
        try:
            conn.execute(
                "INSERT INTO feedbacks (message_id, conversation_id, feedback_type, comment, created_at) VALUES (?, ?, ?, ?, ?)",
                (message_id, conversation_id, feedback_type, comment, now),
            )
            conn.commit()
        finally:
            conn.close()


def get_feedback_stats() -> Dict[str, int]:
    """获取反馈统计"""
    with _lock:
        conn = _get_conn()
        try:
            total = conn.execute("SELECT COUNT(*) FROM feedbacks").fetchone()[0]
            positive = conn.execute("SELECT COUNT(*) FROM feedbacks WHERE feedback_type = 'up'").fetchone()[0]
            negative = conn.execute("SELECT COUNT(*) FROM feedbacks WHERE feedback_type = 'down'").fetchone()[0]
            return {"total": total, "positive": positive, "negative": negative}
        finally:
            conn.close()


# ==================== 使用统计 ====================

def get_usage_stats() -> Dict[str, Any]:
    """获取用户使用统计"""
    with _lock:
        conn = _get_conn()
        try:
            # 对话统计
            conv_count = conn.execute("SELECT COUNT(*) FROM conversations").fetchone()[0]
            msg_count = conn.execute("SELECT COUNT(*) FROM messages").fetchone()[0]
            user_msg_count = conn.execute("SELECT COUNT(*) FROM messages WHERE role = 'user'").fetchone()[0]
            assistant_msg_count = conn.execute("SELECT COUNT(*) FROM messages WHERE role = 'assistant'").fetchone()[0]

            # 反馈统计
            feedback_stats = conn.execute(
                "SELECT feedback_type, COUNT(*) FROM feedbacks GROUP BY feedback_type"
            ).fetchall()
            feedback_dict = {row[0]: row[1] for row in feedback_stats}

            # 最近活动
            recent_convs = conn.execute(
                "SELECT id, title, updated_at FROM conversations ORDER BY updated_at DESC LIMIT 5"
            ).fetchall()

            # 每日消息趋势（最近7天）
            daily_stats = conn.execute("""
                SELECT DATE(created_at) as day, COUNT(*) as count
                FROM messages
                WHERE created_at >= DATE('now', '-7 days')
                GROUP BY day
                ORDER BY day
            """).fetchall()

            return {
                "conversations": {
                    "total": conv_count,
                    "today": conn.execute(
                        "SELECT COUNT(*) FROM conversations WHERE DATE(updated_at) = DATE('now')"
                    ).fetchone()[0]
                },
                "messages": {
                    "total": msg_count,
                    "user": user_msg_count,
                    "assistant": assistant_msg_count,
                    "today": conn.execute(
                        "SELECT COUNT(*) FROM messages WHERE DATE(created_at) = DATE('now')"
                    ).fetchone()[0]
                },
                "feedback": {
                    "total": sum(feedback_dict.values()),
                    "positive": feedback_dict.get("up", 0),
                    "negative": feedback_dict.get("down", 0)
                },
                "recent_conversations": [
                    {"id": r[0], "title": r[1], "updated_at": r[2]} for r in recent_convs
                ],
                "daily_trend": [
                    {"date": r[0], "count": r[1]} for r in daily_stats
                ]
            }
        finally:
            conn.close()


# ==================== 用户偏好 ====================

def set_preference(key: str, value: str):
    """设置用户偏好"""
    now = datetime.now().isoformat()
    with _lock:
        conn = _get_conn()
        try:
            conn.execute(
                "INSERT OR REPLACE INTO user_preferences (key, value, updated_at) VALUES (?, ?, ?)",
                (key, json.dumps(value, ensure_ascii=False), now),
            )
            conn.commit()
        finally:
            conn.close()


def get_preference(key: str, default: Any = None) -> Any:
    """获取用户偏好"""
    with _lock:
        conn = _get_conn()
        try:
            row = conn.execute("SELECT value FROM user_preferences WHERE key = ?", (key,)).fetchone()
            if row:
                return json.loads(row["value"])
            return default
        finally:
            conn.close()


# ==================== 从内存迁移 ====================

def migrate_from_memory(memory_conversations: Dict[str, dict]):
    """从内存字典迁移数据到SQLite（一次性操作）"""
    migrated = 0
    with _lock:
        conn = _get_conn()
        try:
            for conv_id, conv_data in memory_conversations.items():
                now = datetime.now().isoformat()
                conn.execute(
                    "INSERT OR REPLACE INTO conversations (id, title, created_at, updated_at) VALUES (?, ?, ?, ?)",
                    (
                        conv_id,
                        conv_data.get("title", "新对话"),
                        conv_data.get("created_at", now),
                        conv_data.get("updated_at", now),
                    ),
                )
                # 迁移消息
                for msg in conv_data.get("messages", []):
                    role = msg.get("role", "user")
                    content = msg.get("content", "")
                    msg_time = msg.get("created_at", now)
                    conn.execute(
                        "INSERT INTO messages (conversation_id, role, content, created_at) VALUES (?, ?, ?, ?)",
                        (conv_id, role, content, msg_time),
                    )
                migrated += 1
            conn.commit()
        finally:
            conn.close()
    return migrated


# ==================== 数据库备份 ====================

import shutil


def backup_database(backup_dir: Optional[Path] = None) -> Path:
    """备份数据库到指定目录"""
    if backup_dir is None:
        backup_dir = DB_DIR / "backups"
    backup_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = backup_dir / f"data_ai_backup_{timestamp}.db"

    # 确保所有数据写入
    with _lock:
        conn = _get_conn()
        try:
            conn.execute("PRAGMA wal_checkpoint(FULL)")
        finally:
            conn.close()

    # 复制数据库文件
    shutil.copy2(str(DB_PATH), str(backup_path))

    # 清理旧备份（保留最近10个）
    backups = sorted(backup_dir.glob("data_ai_backup_*.db"), key=lambda p: p.stat().st_mtime)
    for old_backup in backups[:-10]:
        old_backup.unlink()

    return backup_path


def export_to_json(export_path: Optional[Path] = None) -> Path:
    """导出所有数据为JSON格式"""
    if export_path is None:
        export_path = DB_DIR / f"export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

    with _lock:
        conn = _get_conn()
        try:
            data = {
                "conversations": [],
                "feedbacks": [],
                "preferences": {},
                "exported_at": datetime.now().isoformat(),
            }

            # 导出对话
            convs = conn.execute("SELECT * FROM conversations ORDER BY updated_at DESC").fetchall()
            for c in convs:
                conv = dict(c)
                messages = conn.execute(
                    "SELECT role, content, created_at FROM messages WHERE conversation_id = ? ORDER BY id",
                    (c["id"],),
                ).fetchall()
                conv["messages"] = [dict(m) for m in messages]
                data["conversations"].append(conv)

            # 导出反馈
            feedbacks = conn.execute("SELECT * FROM feedbacks ORDER BY created_at DESC").fetchall()
            data["feedbacks"] = [dict(f) for f in feedbacks]

            # 导出偏好
            prefs = conn.execute("SELECT * FROM user_preferences").fetchall()
            for p in prefs:
                data["preferences"][p["key"]] = json.loads(p["value"])

            with open(export_path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

            return export_path
        finally:
            conn.close()


def import_from_json(import_path: Path) -> Dict[str, int]:
    """从JSON文件导入数据"""
    with open(import_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    stats = {"conversations": 0, "messages": 0, "feedbacks": 0, "preferences": 0}

    with _lock:
        conn = _get_conn()
        try:
            # 导入对话
            for conv in data.get("conversations", []):
                conn.execute(
                    "INSERT OR REPLACE INTO conversations (id, title, created_at, updated_at) VALUES (?, ?, ?, ?)",
                    (conv["id"], conv.get("title", "新对话"), conv.get("created_at", datetime.now().isoformat()), conv.get("updated_at", datetime.now().isoformat())),
                )
                stats["conversations"] += 1

                # 导入消息
                for msg in conv.get("messages", []):
                    conn.execute(
                        "INSERT INTO messages (conversation_id, role, content, created_at) VALUES (?, ?, ?, ?)",
                        (conv["id"], msg.get("role", "user"), msg.get("content", ""), msg.get("created_at", datetime.now().isoformat())),
                    )
                    stats["messages"] += 1

            # 导入反馈
            for fb in data.get("feedbacks", []):
                conn.execute(
                    "INSERT INTO feedbacks (message_id, conversation_id, feedback_type, comment, created_at) VALUES (?, ?, ?, ?, ?)",
                    (fb.get("message_id", ""), fb.get("conversation_id", ""), fb.get("feedback_type", "up"), fb.get("comment", ""), fb.get("created_at", datetime.now().isoformat())),
                )
                stats["feedbacks"] += 1

            # 导入偏好
            for key, value in data.get("preferences", {}).items():
                conn.execute(
                    "INSERT OR REPLACE INTO user_preferences (key, value, updated_at) VALUES (?, ?, ?)",
                    (key, json.dumps(value, ensure_ascii=False), datetime.now().isoformat()),
                )
                stats["preferences"] += 1

            conn.commit()
        finally:
            conn.close()

    return stats


# ==================== 分享功能 ====================

import hashlib
import time

# 分享链接存储（简单实现，生产环境应使用数据库表）
_shared_conversations: Dict[str, Dict[str, Any]] = {}


def create_share_link(conv_id: str, expire_hours: int = 24) -> Dict[str, Any]:
    """创建分享链接"""
    conv = get_conversation(conv_id)
    if not conv:
        return {"error": "对话不存在"}

    # 生成唯一分享ID
    share_id = hashlib.md5(f"{conv_id}:{time.time()}".encode()).hexdigest()[:12]

    # 存储分享数据
    _shared_conversations[share_id] = {
        "conversation": conv,
        "created_at": datetime.now().isoformat(),
        "expire_at": datetime.now().timestamp() + expire_hours * 3600,
    }

    return {
        "share_id": share_id,
        "share_url": f"/share/{share_id}",
        "expire_hours": expire_hours,
    }


def get_shared_conversation(share_id: str) -> Optional[Dict[str, Any]]:
    """获取分享的对话"""
    share_data = _shared_conversations.get(share_id)
    if not share_data:
        return None

    # 检查是否过期
    if time.time() > share_data["expire_at"]:
        del _shared_conversations[share_id]
        return None

    return share_data["conversation"]


# 启动时自动初始化
init_db()


# ==================== 记忆系统 ====================

def create_memory(
    memory_type: str = "long_term",
    key: Optional[str] = None,
    content: str = "",
    metadata: Optional[Dict] = None,
    expires_at: Optional[str] = None
) -> Dict[str, Any]:
    """创建新记忆"""
    memory_id = str(uuid.uuid4())
    now = datetime.now().isoformat()
    with _lock:
        conn = _get_conn()
        try:
            conn.execute(
                "INSERT INTO memories (id, type, key, content, metadata, created_at, updated_at, expires_at) "
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (memory_id, memory_type, key, content, json.dumps(metadata or {}, ensure_ascii=False), now, now, expires_at),
            )
            conn.commit()
        finally:
            conn.close()
    return get_memory(memory_id)


def get_memory(memory_id: str) -> Optional[Dict[str, Any]]:
    """获取单个记忆"""
    with _lock:
        conn = _get_conn()
        try:
            row = conn.execute("SELECT * FROM memories WHERE id = ?", (memory_id,)).fetchone()
            if not row:
                return None
            return {
                "id": row["id"],
                "type": row["type"],
                "key": row["key"],
                "content": row["content"],
                "metadata": json.loads(row["metadata"]) if row["metadata"] else {},
                "created_at": row["created_at"],
                "updated_at": row["updated_at"],
                "expires_at": row["expires_at"],
            }
        finally:
            conn.close()


def list_memories(memory_type: Optional[str] = None, key: Optional[str] = None) -> List[Dict[str, Any]]:
    """列出记忆，可按类型或键筛选"""
    with _lock:
        conn = _get_conn()
        try:
            query = "SELECT * FROM memories WHERE 1=1"
            params = []
            
            # 过滤已过期的记忆
            query += " AND (expires_at IS NULL OR expires_at > datetime('now'))"
            
            if memory_type:
                query += " AND type = ?"
                params.append(memory_type)
            if key:
                query += " AND key = ?"
                params.append(key)
            
            query += " ORDER BY updated_at DESC"
            
            rows = conn.execute(query, params).fetchall()
            return [
                {
                    "id": r["id"],
                    "type": r["type"],
                    "key": r["key"],
                    "content": r["content"],
                    "metadata": json.loads(r["metadata"]) if r["metadata"] else {},
                    "created_at": r["created_at"],
                    "updated_at": r["updated_at"],
                    "expires_at": r["expires_at"],
                }
                for r in rows
            ]
        finally:
            conn.close()


def update_memory(memory_id: str, content: Optional[str] = None, metadata: Optional[Dict] = None) -> Optional[Dict[str, Any]]:
    """更新记忆内容"""
    now = datetime.now().isoformat()
    with _lock:
        conn = _get_conn()
        try:
            memory = get_memory(memory_id)
            if not memory:
                return None
            
            new_content = content if content is not None else memory["content"]
            new_metadata = metadata if metadata is not None else memory["metadata"]
            
            conn.execute(
                "UPDATE memories SET content = ?, metadata = ?, updated_at = ? WHERE id = ?",
                (new_content, json.dumps(new_metadata, ensure_ascii=False), now, memory_id),
            )
            conn.commit()
        finally:
            conn.close()
    return get_memory(memory_id)


def delete_memory(memory_id: str) -> bool:
    """删除记忆"""
    with _lock:
        conn = _get_conn()
        try:
            cursor = conn.execute("DELETE FROM memories WHERE id = ?", (memory_id,))
            conn.commit()
            return cursor.rowcount > 0
        finally:
            conn.close()


def search_memories(query: str, memory_type: Optional[str] = None) -> List[Dict[str, Any]]:
    """搜索记忆内容"""
    with _lock:
        conn = _get_conn()
        try:
            keyword = f"%{query}%"
            sql = "SELECT * FROM memories WHERE (content LIKE ? OR key LIKE ?)"
            params = [keyword, keyword]
            
            # 过滤已过期的记忆
            sql += " AND (expires_at IS NULL OR expires_at > datetime('now'))"
            
            if memory_type:
                sql += " AND type = ?"
                params.append(memory_type)
            
            sql += " ORDER BY updated_at DESC LIMIT 50"
            
            rows = conn.execute(sql, params).fetchall()
            return [
                {
                    "id": r["id"],
                    "type": r["type"],
                    "key": r["key"],
                    "content": r["content"],
                    "metadata": json.loads(r["metadata"]) if r["metadata"] else {},
                    "created_at": r["created_at"],
                    "updated_at": r["updated_at"],
                }
                for r in rows
            ]
        finally:
            conn.close()


def get_memory_stats() -> Dict[str, Any]:
    """获取记忆系统统计"""
    with _lock:
        conn = _get_conn()
        try:
            total = conn.execute("SELECT COUNT(*) FROM memories").fetchone()[0]
            long_term = conn.execute("SELECT COUNT(*) FROM memories WHERE type = 'long_term'").fetchone()[0]
            short_term = conn.execute("SELECT COUNT(*) FROM memories WHERE type = 'short_term'").fetchone()[0]
            context = conn.execute("SELECT COUNT(*) FROM memories WHERE type = 'context'").fetchone()[0]
            
            # 清理过期记忆
            conn.execute("DELETE FROM memories WHERE expires_at IS NOT NULL AND expires_at < datetime('now')")
            conn.commit()
            
            return {
                "total": total,
                "by_type": {
                    "long_term": long_term,
                    "short_term": short_term,
                    "context": context,
                }
            }
        finally:
            conn.close()


# ==================== 系统日志 ====================

def add_log(
    level: str = "info",
    source: str = "system",
    message: str = "",
    details: Optional[Dict] = None,
    conversation_id: Optional[str] = None
) -> int:
    """添加系统日志"""
    now = datetime.now().isoformat()
    with _lock:
        conn = _get_conn()
        try:
            cursor = conn.execute(
                "INSERT INTO system_logs (level, source, message, details, conversation_id, created_at) "
                "VALUES (?, ?, ?, ?, ?, ?)",
                (level, source, message, json.dumps(details or {}, ensure_ascii=False), conversation_id, now),
            )
            conn.commit()
            return cursor.lastrowid
        finally:
            conn.close()


def get_logs(
    level: Optional[str] = None,
    source: Optional[str] = None,
    conversation_id: Optional[str] = None,
    limit: int = 100,
    offset: int = 0
) -> List[Dict[str, Any]]:
    """获取日志列表"""
    with _lock:
        conn = _get_conn()
        try:
            query = "SELECT * FROM system_logs WHERE 1=1"
            params = []
            
            if level:
                query += " AND level = ?"
                params.append(level)
            if source:
                query += " AND source = ?"
                params.append(source)
            if conversation_id:
                query += " AND conversation_id = ?"
                params.append(conversation_id)
            
            query += " ORDER BY id DESC LIMIT ? OFFSET ?"
            params.extend([limit, offset])
            
            rows = conn.execute(query, params).fetchall()
            return [
                {
                    "id": r["id"],
                    "level": r["level"],
                    "source": r["source"],
                    "message": r["message"],
                    "details": json.loads(r["details"]) if r["details"] else {},
                    "conversation_id": r["conversation_id"],
                    "created_at": r["created_at"],
                }
                for r in rows
            ]
        finally:
            conn.close()


def get_log_stats() -> Dict[str, Any]:
    """获取日志统计"""
    with _lock:
        conn = _get_conn()
        try:
            total = conn.execute("SELECT COUNT(*) FROM system_logs").fetchone()[0]
            
            # 按级别统计
            level_stats = conn.execute(
                "SELECT level, COUNT(*) as count FROM system_logs GROUP BY level"
            ).fetchall()
            
            # 按来源统计
            source_stats = conn.execute(
                "SELECT source, COUNT(*) as count FROM system_logs GROUP BY source ORDER BY count DESC LIMIT 10"
            ).fetchall()
            
            # 最近日志
            recent = conn.execute(
                "SELECT id, level, source, message, created_at FROM system_logs ORDER BY id DESC LIMIT 10"
            ).fetchall()
            
            return {
                "total": total,
                "by_level": {r[0]: r[1] for r in level_stats},
                "by_source": {r[0]: r[1] for r in source_stats},
                "recent": [dict(r) for r in recent],
            }
        finally:
            conn.close()


def clear_logs(before_date: Optional[str] = None, level: Optional[str] = None) -> int:
    """清理日志"""
    with _lock:
        conn = _get_conn()
        try:
            if before_date:
                cursor = conn.execute("DELETE FROM system_logs WHERE created_at < ?", (before_date,))
            elif level:
                cursor = conn.execute("DELETE FROM system_logs WHERE level = ?", (level,))
            else:
                cursor = conn.execute("DELETE FROM system_logs")
            conn.commit()
            return cursor.rowcount
        finally:
            conn.close()


# ==================== 搜索引擎设置 ====================

def get_search_settings() -> Dict[str, Any]:
    """获取搜索引擎设置"""
    with _lock:
        conn = _get_conn()
        try:
            row = conn.execute("SELECT * FROM search_settings WHERE id = 1").fetchone()
            if not row:
                return {
                    "engine": "duckduckgo",
                    "results_count": 5,
                    "timeout": 30,
                    "safe_search": "moderate",
                    "language": "auto",
                    "api_keys": {},
                    "custom_engines": [],
                }
            return {
                "engine": row["engine"],
                "results_count": row["results_count"],
                "timeout": row["timeout"],
                "safe_search": row["safe_search"],
                "language": row["language"],
                "api_keys": json.loads(row["api_keys"]) if row["api_keys"] else {},
                "custom_engines": json.loads(row["custom_engines"]) if row["custom_engines"] else [],
                "updated_at": row["updated_at"],
            }
        finally:
            conn.close()


def update_search_settings(settings: Dict[str, Any]) -> Dict[str, Any]:
    """更新搜索引擎设置"""
    now = datetime.now().isoformat()
    with _lock:
        conn = _get_conn()
        try:
            conn.execute(
                "UPDATE search_settings SET "
                "engine = ?, results_count = ?, timeout = ?, safe_search = ?, language = ?, "
                "api_keys = ?, custom_engines = ?, updated_at = ? "
                "WHERE id = 1",
                (
                    settings.get("engine", "duckduckgo"),
                    settings.get("results_count", 5),
                    settings.get("timeout", 30),
                    settings.get("safe_search", "moderate"),
                    settings.get("language", "auto"),
                    json.dumps(settings.get("api_keys", {}), ensure_ascii=False),
                    json.dumps(settings.get("custom_engines", []), ensure_ascii=False),
                    now,
                ),
            )
            conn.commit()
        finally:
            conn.close()
    return get_search_settings()


def add_custom_search_engine(engine: Dict[str, Any]) -> List[Dict[str, Any]]:
    """添加自定义搜索引擎"""
    settings = get_search_settings()
    custom_engines = settings.get("custom_engines", [])
    
    # 检查是否已存在
    engine_id = engine.get("id", str(uuid.uuid4()))
    existing = next((e for e in custom_engines if e.get("id") == engine_id), None)
    
    if existing:
        existing.update(engine)
    else:
        engine["id"] = engine_id
        custom_engines.append(engine)
    
    update_search_settings({**settings, "custom_engines": custom_engines})
    return custom_engines


def remove_custom_search_engine(engine_id: str) -> List[Dict[str, Any]]:
    """删除自定义搜索引擎"""
    settings = get_search_settings()
    custom_engines = settings.get("custom_engines", [])
    custom_engines = [e for e in custom_engines if e.get("id") != engine_id]
    update_search_settings({**settings, "custom_engines": custom_engines})
    return custom_engines
