"""Simple Chainlit frontend for DataAgent - Test Version"""

import chainlit as cl
import asyncio


@cl.on_chat_start
async def on_chat_start():
    """Initialize chat session."""
    print("DEBUG: on_chat_start called")
    
    try:
        # Send simple welcome message first
        await cl.Message(
            content="""👋 你好！我是 **Data**，您的智能助手。

我可以帮您处理各种任务：
- 🔍 网页搜索
- 📄 文件读写  
- 📂 目录浏览

有什么可以帮您的吗？
"""
        ).send()
        print("DEBUG: Welcome message sent")
        
        # Try to create agent in background
        try:
            from app.agent.data import Data
            print("DEBUG: Importing Data successful")
            
            agent = await Data.create()
            cl.user_session.set("agent", agent)
            print("DEBUG: Agent created successfully")
            
            await cl.Message(
                content="✅ 系统初始化完成！可以开始对话了。"
            ).send()
            
        except Exception as e:
            print(f"DEBUG: Agent creation failed: {e}")
            await cl.Message(
                content=f"⚠️ 部分功能不可用\n\n错误：{str(e)[:100]}\n\n基础功能仍可使用。"
            ).send()
            
    except Exception as e:
        print(f"DEBUG: Fatal error: {e}")
        await cl.Message(content=f"❌ 初始化失败: {str(e)}").send()


@cl.on_message
async def on_message(message: cl.Message):
    """Handle incoming user messages."""
    print(f"DEBUG: Received message: {message.content[:50]}")
    
    agent = cl.user_session.get("agent")
    
    if agent:
        try:
            await agent.run(message.content)
            
            if agent.memory and agent.memory.messages:
                last_msg = agent.memory.messages[-1]
                if hasattr(last_msg, 'content') and last_msg.content:
                    await cl.Message(content=last_msg.content).send()
                else:
                    await cl.Message(content="✅ 任务已完成！").send()
            else:
                await cl.Message(content="✅ 任务已完成！").send()
                
        except Exception as e:
            print(f"DEBUG: Agent run error: {e}")
            await cl.Message(content=f"❌ 处理失败: {str(e)[:150]}").send()
    else:
        await cl.Message(content=f"您说：{message.content}\n\n我已收到您的消息！").send()


@cl.on_chat_end
async def on_chat_end():
    """Clean up when chat session ends."""
    agent = cl.user_session.get("agent")
    if agent:
        await agent.cleanup()
    print("DEBUG: Chat session ended")
