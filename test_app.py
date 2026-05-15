"""
DATA-AI Web 应用探索性测试
测试界面功能、UX 问题和交互问题
"""

import time

from playwright.sync_api import sync_playwright


def test_data_ai_app():
    """探索性测试 DATA-AI 应用"""
    issues_found = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        print("=" * 60)
        print("开始探索 DATA-AI Web 应用")
        print("=" * 60)

        # 1. 导航到主页
        print("\n[1] 导航到主页...")
        page.goto("http://localhost:8000")
        page.wait_for_load_state("networkidle")
        page.screenshot(
            path="./dogfood-output/screenshots/01_homepage.png", full_page=True
        )
        print("✓ 主页截图已保存")

        # 2. 检查页面结构
        print("\n[2] 检查页面结构...")
        try:
            # 检查主要元素
            header = page.locator("header, .header, nav, .navbar").first
            if header.is_visible():
                print("✓ 找到顶部导航栏")

            # 检查侧边栏
            sidebar = page.locator('aside, .sidebar, [class*="side"]').first
            if sidebar.is_visible():
                print("✓ 找到侧边栏")
            else:
                print("⚠ 未找到侧边栏")

        except Exception as e:
            print(f"❌ 检查页面结构时出错: {e}")
            issues_found.append(f"页面结构检查失败: {e}")

        # 3. 截图当前状态
        page.screenshot(path="./dogfood-output/screenshots/02_initial_state.png")
        print("✓ 初始状态截图已保存")

        # 4. 尝试查找聊天输入框
        print("\n[3] 检查聊天界面...")
        try:
            input_box = page.locator(
                'input[type="text"], textarea, [contenteditable]'
            ).first
            if input_box.is_visible():
                print("✓ 找到输入框")
                # 尝试输入测试消息
                input_box.fill("你好")
                page.screenshot(path="./dogfood-output/screenshots/03_input_test.png")
                print("✓ 输入测试后截图")
        except Exception as e:
            print(f"❌ 查找输入框时出错: {e}")
            issues_found.append(f"输入框查找失败: {e}")

        # 5. 检查所有按钮和可点击元素
        print("\n[4] 列出所有可点击元素...")
        try:
            buttons = page.locator("button").all()
            print(f"找到 {len(buttons)} 个按钮")
            for i, btn in enumerate(buttons[:10]):  # 只显示前10个
                try:
                    text = btn.inner_text()[:30]
                    print(f"  按钮 {i+1}: {text}")
                except:
                    print(f"  按钮 {i+1}: (无法获取文本)")

            links = page.locator("a").all()
            print(f"找到 {len(links)} 个链接")

        except Exception as e:
            print(f"❌ 列出元素时出错: {e}")

        # 6. 检查侧边栏或菜单
        print("\n[5] 检查侧边栏/菜单...")
        try:
            menu_items = page.locator(
                '[class*="menu"], [class*="nav"], [class*="sidebar"]'
            ).all()
            print(f"找到 {len(menu_items)} 个菜单相关元素")

            # 尝试展开菜单
            for menu in menu_items[:3]:
                try:
                    if menu.is_visible():
                        menu.click()
                        time.sleep(0.5)
                        page.screenshot(
                            path=f"./dogfood-output/screenshots/04_menu_click.png"
                        )
                        print("✓ 菜单点击后截图")
                        break
                except:
                    pass
        except Exception as e:
            print(f"❌ 检查菜单时出错: {e}")

        # 7. 尝试点击所有按钮看看会发生什么
        print("\n[6] 测试按钮交互...")
        try:
            for i, btn in enumerate(page.locator("button").all()[:5]):
                try:
                    btn_text = btn.inner_text()[:20]
                    btn.click()
                    time.sleep(1)
                    page.screenshot(
                        path=f"./dogfood-output/screenshots/05_button_{i+1}.png"
                    )
                    print(f"✓ 点击按钮 {i+1} ({btn_text}) 后截图")
                except Exception as e:
                    print(f"❌ 点击按钮 {i+1} 失败: {e}")
        except Exception as e:
            print(f"❌ 测试按钮交互时出错: {e}")

        # 8. 检查控制面板/设置界面
        print("\n[7] 检查设置界面...")
        try:
            settings_icon = page.locator(
                '[class*="setting"], [class*="config"], [class*="gear"]'
            ).first
            if settings_icon.is_visible():
                settings_icon.click()
                page.wait_for_timeout(1000)
                page.screenshot(path="./dogfood-output/screenshots/06_settings.png")
                print("✓ 设置界面截图")
        except Exception as e:
            print(f"⚠ 未找到设置图标: {e}")

        # 9. 检查模态框或弹窗
        print("\n[8] 检查模态框...")
        try:
            modals = page.locator(
                '[class*="modal"], [class*="dialog"], [class*="popup"]'
            ).all()
            print(f"找到 {len(modals)} 个模态框元素")
        except Exception as e:
            print(f"❌ 检查模态框时出错: {e}")

        # 10. 检查浏览器控制台错误
        print("\n[9] 检查控制台错误...")
        page.on(
            "console",
            lambda msg: (
                print(f"控制台消息: {msg.text}") if msg.type == "error" else None
            ),
        )

        # 11. 测试 WebSocket 连接
        print("\n[10] 测试 WebSocket 连接...")
        try:
            ws_connected = page.evaluate(
                """() => {
                return new Promise((resolve) => {
                    const ws = new WebSocket('ws://localhost:8000/ws');
                    ws.onopen = () => { ws.close(); resolve(true); };
                    ws.onerror = () => resolve(false);
                    setTimeout(() => resolve(false), 3000);
                });
            }"""
            )
            if ws_connected:
                print("✓ WebSocket 连接成功")
            else:
                print("⚠ WebSocket 连接失败")
                issues_found.append("WebSocket 连接失败")
        except Exception as e:
            print(f"❌ WebSocket 测试时出错: {e}")

        # 12. 最终截图
        page.screenshot(path="./dogfood-output/screenshots/07_final_state.png")
        print("\n✓ 最终状态截图已保存")

        # 13. 检查是否有无法关闭的元素
        print("\n[13] 检查是否有卡住无法关闭的元素...")
        try:
            # 尝试按 ESC 键
            page.keyboard.press("Escape")
            page.wait_for_timeout(500)
            page.screenshot(path="./dogfood-output/screenshots/08_after_esc.png")

            # 检查是否有任何遮罩层
            overlays = page.locator(
                '[class*="overlay"], [class*="backdrop"], [class*="mask"]'
            ).all()
            if overlays:
                for overlay in overlays:
                    if overlay.is_visible():
                        print(f"⚠ 发现可见的遮罩层: {overlay.get_attribute('class')}")
                        issues_found.append("发现无法关闭的遮罩层")
        except Exception as e:
            print(f"❌ 检查遮罩层时出错: {e}")

        browser.close()

    # 总结
    print("\n" + "=" * 60)
    print("测试完成!")
    print("=" * 60)
    if issues_found:
        print("\n发现的问题:")
        for i, issue in enumerate(issues_found, 1):
            print(f"{i}. {issue}")
    else:
        print("\n未发现明显问题")

    return issues_found


if __name__ == "__main__":
    test_data_ai_app()
