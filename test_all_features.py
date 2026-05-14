#!/usr/bin/env python3
"""
DATA-AI 全功能测试脚本
测试所有代理、工具和功能模块
"""
import asyncio
import sys
import os
import importlib

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


def test_import(module_path, class_name, description):
    try:
        module = importlib.import_module(module_path)
        cls = getattr(module, class_name)
        print(f"  ✅ {description}: {module_path}.{class_name}")
        return True
    except Exception as e:
        print(f"  ❌ {description}: {module_path}.{class_name} - {e}")
        return False


async def test_all():
    print("=" * 70)
    print("🚀 DATA-AI 全功能测试")
    print("=" * 70)

    results = {}

    # ========== 1. 代理模块测试 ==========
    print("\n📋 1. 代理模块导入测试")
    print("-" * 50)
    agent_results = {}
    agents = [
        ("app.agent.data", "Data", "Data 通用代理"),
        ("app.agent.browser", "BrowserAgent", "浏览器代理"),
        ("app.agent.swe", "SWEAgent", "SWE 软件工程代理"),
        ("app.agent.data_analysis", "DataAnalysis", "数据分析代理"),
        ("app.agent.sandbox_agent", "SandboxData", "沙箱代理"),
        ("app.agent.toolcall", "ToolCallAgent", "工具调用代理"),
        ("app.agent.react", "ReActAgent", "ReAct 代理"),
        ("app.agent.mcp", "MCPAgent", "MCP 代理"),
        ("app.agent.base", "BaseAgent", "基础代理"),
    ]
    for module_path, class_name, desc in agents:
        agent_results[desc] = test_import(module_path, class_name, desc)
    results["代理模块"] = all(agent_results.values())

    # ========== 2. 核心工具测试 ==========
    print("\n📋 2. 核心工具导入测试")
    print("-" * 50)
    tool_results = {}
    tools = [
        ("app.tool.bash", "Bash", "Bash 命令执行"),
        ("app.tool.python_execute", "PythonExecute", "Python 代码执行"),
        ("app.tool.str_replace_editor", "StrReplaceEditor", "文件编辑器"),
        ("app.tool.web_search", "WebSearch", "网络搜索"),
        ("app.tool.browser_use_tool", "BrowserUseTool", "浏览器自动化"),
        ("app.tool.crawl4ai", "Crawl4aiTool", "网页爬取"),
        ("app.tool.planning", "PlanningTool", "任务规划"),
        ("app.tool.ask_human", "AskHuman", "人工协助"),
        ("app.tool.terminate", "Terminate", "终止工具"),
        ("app.tool.create_chat_completion", "CreateChatCompletion", "聊天补全"),
        ("app.tool.mcp", "MCPClients", "MCP 客户端"),
        ("app.tool.tool_collection", "ToolCollection", "工具集合"),
        ("app.tool.file_operators", "LocalFileOperator", "本地文件操作"),
        ("app.tool.computer_use_tool", "ComputerUseTool", "桌面自动化"),
    ]
    for module_path, class_name, desc in tools:
        tool_results[desc] = test_import(module_path, class_name, desc)
    results["核心工具"] = all(tool_results.values())

    # ========== 3. 图表可视化工具测试 ==========
    print("\n📋 3. 图表可视化工具测试")
    print("-" * 50)
    chart_results = {}
    chart_tools = [
        ("app.tool.chart_visualization.data_visualization", "DataVisualization", "数据可视化"),
        ("app.tool.chart_visualization.chart_prepare", "VisualizationPrepare", "可视化准备"),
        ("app.tool.chart_visualization.python_execute", "NormalPythonExecute", "Python执行(图表)"),
    ]
    for module_path, class_name, desc in chart_tools:
        chart_results[desc] = test_import(module_path, class_name, desc)
    results["图表可视化"] = all(chart_results.values())

    # ========== 4. 搜索引擎测试 ==========
    print("\n📋 4. 搜索引擎测试")
    print("-" * 50)
    search_results = {}
    search_engines = [
        ("app.tool.search.baidu_search", "BaiduSearchEngine", "百度搜索"),
        ("app.tool.search.duckduckgo_search", "DuckDuckGoSearchEngine", "DuckDuckGo搜索"),
        ("app.tool.search.bing_search", "BingSearchEngine", "Bing搜索"),
        ("app.tool.search.google_search", "GoogleSearchEngine", "Google搜索"),
    ]
    for module_path, class_name, desc in search_engines:
        search_results[desc] = test_import(module_path, class_name, desc)
    results["搜索引擎"] = all(search_results.values())

    # ========== 5. 沙箱工具测试 ==========
    print("\n📋 5. 沙箱工具测试")
    print("-" * 50)
    sandbox_results = {}
    sandbox_tools = [
        ("app.tool.sandbox.sb_browser_tool", "SandboxBrowserTool", "沙箱浏览器"),
        ("app.tool.sandbox.sb_files_tool", "SandboxFilesTool", "沙箱文件操作"),
        ("app.tool.sandbox.sb_shell_tool", "SandboxShellTool", "沙箱Shell"),
        ("app.tool.sandbox.sb_vision_tool", "SandboxVisionTool", "沙箱视觉"),
    ]
    for module_path, class_name, desc in sandbox_tools:
        sandbox_results[desc] = test_import(module_path, class_name, desc)
    results["沙箱工具"] = all(sandbox_results.values())

    # ========== 6. Prompt 模块测试 ==========
    print("\n📋 6. Prompt 模块测试")
    print("-" * 50)
    prompt_results = {}
    prompts = [
        ("app.prompt.data", "SYSTEM_PROMPT", "Data 系统提示"),
        ("app.prompt.data", "NEXT_STEP_PROMPT", "Data 下一步提示"),
        ("app.prompt.browser", "SYSTEM_PROMPT", "浏览器系统提示"),
        ("app.prompt.swe", "SYSTEM_PROMPT", "SWE 系统提示"),
        ("app.prompt.planning", "PLANNING_SYSTEM_PROMPT", "规划系统提示"),
        ("app.prompt.toolcall", "SYSTEM_PROMPT", "工具调用系统提示"),
    ]
    for module_path, attr_name, desc in prompts:
        try:
            module = importlib.import_module(module_path)
            attr = getattr(module, attr_name)
            print(f"  ✅ {desc}: {module_path}.{attr_name}")
            prompt_results[desc] = True
        except Exception as e:
            print(f"  ❌ {desc}: {module_path}.{attr_name} - {e}")
            prompt_results[desc] = False
    results["Prompt模块"] = all(prompt_results.values())

    # ========== 7. Flow 模块测试 ==========
    print("\n📋 7. Flow 模块测试")
    print("-" * 50)
    flow_results = {}
    flows = [
        ("app.flow.base", "BaseFlow", "基础流程"),
        ("app.flow.flow_factory", "FlowFactory", "流程工厂"),
        ("app.flow.planning", "PlanningFlow", "规划流程"),
    ]
    for module_path, class_name, desc in flows:
        flow_results[desc] = test_import(module_path, class_name, desc)
    results["Flow模块"] = all(flow_results.values())

    # ========== 8. 实际功能测试 ==========
    print("\n📋 8. 实际功能测试")
    print("-" * 50)

    # 8.1 LLM 连接测试
    print("\n  🔹 8.1 LLM 连接测试")
    try:
        from app.llm import LLM
        llm = LLM()
        messages = [{"role": "user", "content": "你好，请用5个字回复"}]
        response = await llm.ask(messages)
        print(f"  ✅ LLM 连接正常: {response[:50]}...")
        results["LLM连接"] = True
    except Exception as e:
        print(f"  ❌ LLM 连接失败: {e}")
        results["LLM连接"] = False

    # 8.2 Bash 执行测试
    print("\n  🔹 8.2 Bash 执行测试")
    try:
        from app.tool.bash import Bash
        bash = Bash()
        result = await bash.execute(command="echo 'DATA-AI OK'")
        print(f"  ✅ Bash 执行正常: {result}")
        results["Bash执行"] = True
    except Exception as e:
        print(f"  ❌ Bash 执行失败: {e}")
        results["Bash执行"] = False

    # 8.3 Python 执行测试
    print("\n  🔹 8.3 Python 执行测试")
    try:
        from app.tool.python_execute import PythonExecute
        py = PythonExecute()
        result = await py.execute(code="print('DATA-AI Python OK'); print(2+3)")
        print(f"  ✅ Python 执行正常: {result}")
        results["Python执行"] = True
    except Exception as e:
        print(f"  ❌ Python 执行失败: {e}")
        results["Python执行"] = False

    # 8.4 文件编辑测试
    print("\n  🔹 8.4 文件编辑测试")
    try:
        from app.tool.str_replace_editor import StrReplaceEditor
        import tempfile
        with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as f:
            test_file = f.name
            f.write("Hello World!\n")
        editor = StrReplaceEditor()
        result = await editor.execute(command="view", path=test_file)
        result = await editor.execute(command="str_replace", path=test_file, old_str="Hello World!", new_str="Hello DATA-AI!")
        print(f"  ✅ 文件编辑正常")
        os.unlink(test_file)
        results["文件编辑"] = True
    except Exception as e:
        print(f"  ❌ 文件编辑失败: {e}")
        results["文件编辑"] = False

    # 8.5 网络搜索测试 (百度)
    print("\n  🔹 8.5 网络搜索测试")
    try:
        from app.tool.search.baidu_search import BaiduSearchEngine
        baidu = BaiduSearchEngine()
        search_results_list = list(baidu.perform_search("DATA-AI", num_results=2))
        if search_results_list:
            print(f"  ✅ 百度搜索正常，获取 {len(search_results_list)} 条结果")
            results["网络搜索"] = True
        else:
            print(f"  ⚠️ 百度搜索返回空结果")
            results["网络搜索"] = False
    except Exception as e:
        print(f"  ❌ 网络搜索失败: {e}")
        results["网络搜索"] = False

    # 8.6 Planning 工具测试
    print("\n  🔹 8.6 任务规划测试")
    try:
        from app.tool.planning import PlanningTool
        planning = PlanningTool()
        result = await planning.execute(
            command="create",
            plan_id="test_plan",
            title="测试计划",
            steps=["步骤1", "步骤2", "步骤3"]
        )
        print(f"  ✅ 任务规划正常")
        results["任务规划"] = True
    except Exception as e:
        print(f"  ❌ 任务规划失败: {e}")
        results["任务规划"] = False

    # 8.7 Crawl4AI 测试
    print("\n  🔹 8.7 网页爬取测试")
    try:
        from app.tool.crawl4ai import Crawl4aiTool
        crawler = Crawl4aiTool()
        print(f"  ✅ Crawl4AI 导入正常（运行需要浏览器环境）")
        results["网页爬取"] = True
    except Exception as e:
        print(f"  ❌ Crawl4AI 导入失败: {e}")
        results["网页爬取"] = False

    # 8.8 BrowserUse 测试
    print("\n  🔹 8.8 浏览器自动化测试")
    try:
        from app.tool.browser_use_tool import BrowserUseTool
        browser = BrowserUseTool()
        print(f"  ✅ BrowserUse 导入正常（运行需要浏览器环境）")
        results["浏览器自动化"] = True
    except Exception as e:
        print(f"  ❌ BrowserUse 导入失败: {e}")
        results["浏览器自动化"] = False

    # 8.9 Chart Visualization 测试
    print("\n  🔹 8.9 图表可视化测试")
    try:
        from app.tool.chart_visualization.data_visualization import DataVisualization
        from app.tool.chart_visualization.chart_prepare import VisualizationPrepare
        print(f"  ✅ 图表可视化导入正常（运行需要 Node.js 环境）")
        results["图表可视化"] = True
    except Exception as e:
        print(f"  ❌ 图表可视化导入失败: {e}")
        results["图表可视化"] = False

    # 8.10 Data 代理实际运行测试
    print("\n  🔹 8.10 Data 代理运行测试")
    try:
        from app.agent.data import Data
        agent = await Data.create()
        print(f"  ✅ Data 代理创建成功")
        await agent.cleanup()
        results["Data代理运行"] = True
    except Exception as e:
        print(f"  ❌ Data 代理运行失败: {e}")
        results["Data代理运行"] = False

    # ========== 9. 名称引用检查 ==========
    print("\n📋 9. 旧名称残留检查")
    print("-" * 50)
    name_issues = []
    check_dirs = ["app", "main.py", "web_app.py", "sandbox_main.py", "run_flow.py", "setup.py"]
    for check_dir in check_dirs:
        check_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), check_dir)
        if os.path.isfile(check_path):
            with open(check_path, 'r', encoding='utf-8', errors='ignore') as f:
                for i, line in enumerate(f, 1):
                    if 'manus' in line.lower() and 'update_names' not in check_dir:
                        if '# from app.agent.manus' not in line:
                            name_issues.append(f"{check_dir}:{i}: {line.strip()}")
        elif os.path.isdir(check_path):
            for root, dirs, files in os.walk(check_path):
                dirs[:] = [d for d in dirs if d not in ('__pycache__', 'node_modules', '.git')]
                for fname in files:
                    if fname.endswith('.py'):
                        fpath = os.path.join(root, fname)
                        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                            for i, line in enumerate(f, 1):
                                if 'manus' in line.lower():
                                    rel = os.path.relpath(fpath, os.path.dirname(os.path.abspath(__file__)))
                                    name_issues.append(f"{rel}:{i}: {line.strip()}")

    if name_issues:
        print(f"  ⚠️ 发现 {len(name_issues)} 处可能的旧名称引用:")
        for issue in name_issues[:10]:
            print(f"    {issue}")
        if len(name_issues) > 10:
            print(f"    ... 还有 {len(name_issues) - 10} 处")
        results["名称检查"] = False
    else:
        print(f"  ✅ 未发现旧名称残留")
        results["名称检查"] = True

    # ========== 总结 ==========
    print("\n" + "=" * 70)
    print("📊 测试总结")
    print("=" * 70)

    total = len(results)
    passed = sum(1 for v in results.values() if v)
    failed = total - passed

    for name, result in results.items():
        status = "✅ 通过" if result else "❌ 失败"
        print(f"  {name:20s}: {status}")

    print(f"\n  总计: {passed}/{total} 通过, {failed} 失败")
    print("=" * 70)

    return failed == 0


if __name__ == "__main__":
    success = asyncio.run(test_all())
    sys.exit(0 if success else 1)
