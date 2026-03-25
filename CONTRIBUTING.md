# Contributing to LingXu

感谢您有兴趣为灵墟项目做出贡献！🙏

## 📜 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [Pull Request 流程](#pull-request-流程)

---

## 行为准则

本项目采用贡献者公约作为行为准则。参与此项目即表示您同意遵守其条款。请阅读 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) 了解详情。

---

## 如何贡献

### 报告 Bug

如果您发现了 bug，请通过 [GitHub Issues](https://github.com/badhope/LingXu/issues/new?template=bug_report.md) 提交报告。

提交 Bug 报告时，请包含：

- **清晰的标题**：简明扼要地描述问题
- **复现步骤**：详细的步骤让我们能够重现问题
- **预期行为**：您期望发生什么
- **实际行为**：实际发生了什么
- **截图**：如果适用，添加截图帮助解释问题
- **环境信息**：操作系统、浏览器版本、Node.js 版本等

### 提出新功能

如果您有新功能的想法，请通过 [GitHub Issues](https://github.com/badhope/LingXu/issues/new?template=feature_request.md) 提交请求。

提交功能请求时，请包含：

- **清晰的标题**：简明扼要地描述功能
- **功能描述**：详细描述您希望实现的功能
- **使用场景**：描述这个功能解决什么问题
- **替代方案**：描述您考虑过的替代方案

### 改进文档

文档改进包括：

- 修正拼写错误或语法错误
- 添加缺失的文档
- 改进现有文档的清晰度
- 翻译文档到其他语言

---

## 开发流程

### 1. Fork 仓库

点击页面右上角的 "Fork" 按钮，将仓库 fork 到您的账户。

### 2. 克隆仓库

```bash
git clone https://github.com/YOUR_USERNAME/LingXu.git
cd LingXu
```

### 3. 安装依赖

```bash
npm install
```

### 4. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

分支命名规范：
- `feature/` - 新功能
- `fix/` - Bug 修复
- `docs/` - 文档改进
- `style/` - 代码格式调整
- `refactor/` - 代码重构
- `test/` - 测试相关

### 5. 进行开发

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:4321
```

### 6. 运行检查

```bash
# TypeScript 类型检查
npm run typecheck

# ESLint 检查
npm run lint

# 构建测试
npm run build
```

### 7. 提交更改

```bash
git add .
git commit -m "feat: 添加新功能描述"
```

### 8. 推送分支

```bash
git push origin feature/your-feature-name
```

### 9. 创建 Pull Request

在 GitHub 上创建 Pull Request，填写 PR 模板中的必要信息。

---

## 代码规范

### TypeScript

- 使用 TypeScript 编写所有代码
- 为所有函数和组件添加类型注解
- 避免使用 `any` 类型，除非确实必要

### Astro 组件

- 使用 Astro 的组件架构
- 组件命名使用 PascalCase
- 每个 `.astro` 文件包含组件的 HTML、CSS 和 JavaScript

### CSS/Tailwind

- 优先使用 Tailwind CSS 工具类
- 自定义样式放在组件的 `<style>` 标签中
- 使用 CSS 变量管理主题颜色

### 文件命名

- 组件文件：`PascalCase.astro`
- 页面文件：`kebab-case.astro`
- 工具函数：`camelCase.ts`
- 样式文件：`kebab-case.css`

---

## 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响代码运行的变动） |
| `refactor` | 重构（既不是新增功能，也不是修改 bug） |
| `perf` | 性能优化 |
| `test` | 增加测试 |
| `chore` | 构建过程或辅助工具的变动 |
| `revert` | 回滚 |
| `ci` | CI 配置文件和脚本的变动 |

### 示例

```bash
feat: 添加易经占卜功能
fix: 修复太极动画不旋转的问题
docs: 更新 README 安装说明
style: 格式化代码
refactor: 重构状态管理逻辑
```

---

## Pull Request 流程

### PR 检查清单

在提交 PR 之前，请确保：

- [ ] 代码通过所有测试
- [ ] 代码通过 ESLint 检查
- [ ] 代码通过 TypeScript 类型检查
- [ ] 代码能够成功构建
- [ ] 提交信息符合规范
- [ ] 更新了相关文档

### PR 审核流程

1. **自动检查**：CI 自动运行测试和检查
2. **代码审核**：维护者会审核您的代码
3. **反馈修改**：根据反馈进行必要的修改
4. **合并**：审核通过后合并到主分支

### PR 标题规范

PR 标题应遵循与提交信息相同的规范：

```
feat: 添加新功能
fix: 修复某个问题
docs: 更新文档
```

---

## 获取帮助

如果您有任何问题，可以：

- 在 [GitHub Issues](https://github.com/badhope/LingXu/issues) 中提问
- 查看 [项目文档](docs/)

---

再次感谢您的贡献！🙏

*愿见者得度，闻者觉悟*
