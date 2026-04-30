# CHANGELOG - 灵墟版本历史

## v3.1.0 - 2026-04-30

### 🎯 核心修复

**彻底解决黑屏 + 服务不可用问题**

- ✅ **修复 SSR 黑屏** - Framer Motion `initial={false}` 解决 opacity:0 默认渲染问题
- ✅ **修复部署路径问题** - 自适应 `basePath` 配置，Netlify/GitHub Pages 双支持
- ✅ **修复 JS 阻塞问题** - 渐进增强，JS不加载内容也可见

### 🚀 部署优化

- ✅ **新增 Netlify 支持** - `netlify.toml` 零配置一键部署
- ✅ **新增 Apache 支持** - `.htaccess` 兼容虚拟主机
- ✅ **SPA 路由重定向** - `_redirects` 规则兼容所有主流平台
- ✅ **缓存策略优化** - JS/CSS 一年永久缓存 + immutable

### 🛠️ 代码质量

- ✅ 修复 5 个空 catch 块异常吞噬问题
- ✅ Button 组件 TypeScript 类型安全修复
- ✅ 解决 eslint-utils 依赖版本冲突
- ✅ SCSS 路径别名兼容性修复

### 📚 文档更新

- ✅ README.md 完整更新到 v15 技术栈
- ✅ DEPLOY.md 全平台 7 种部署方式详细指南
- ✅ 111 页面全功能构建验证

---

## v3.0.0 - 2026-04-22

### ✨ 重大升级

- Next.js 14 → 15 升级
- Tailwind CSS 4 引入
- 页面扩展到 111 个
- 修真系统模块完善

---

> 修行路上，与君共勉 ✨
