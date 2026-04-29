# 灵墟 - GitHub Pages 部署指南

## 🚀 快速部署

### 方式一：自动部署（推荐）

只需推送到 main 分支，GitHub Actions 自动完成：

```bash
git add .
git commit -m "deploy: 自动构建部署"
git push origin main
```

✅ 自动执行：质量检查 → 构建 → 部署

### 方式二：手动部署

```bash
# 1. 运行完整质量检查
node agent/quality-check.mjs

# 2. 构建并准备部署文件
node agent/build-deploy.mjs

# 3. 推送到 gh-pages 分支
npx gh-pages -d out -t true
```

---

## ⚙️ GitHub Pages 设置

### 1. 仓库设置

1. 进入仓库 → Settings → Pages
2. Source: **GitHub Actions** (推荐)
3. 自定义域名（可选）: 留空使用默认

### 2. 访问地址

部署成功后访问：
```
https://<你的用户名>.github.io/LingXu/
```

---

## 📁 部署文件清单

### ✅ 需要提交的文件

```
.
├── src/                    # 所有源代码
├── public/                 # 静态资源
│   ├── manifest.json       # PWA 配置
│   ├── icons/              # PWA 图标
│   └── ...
├── agent/                  # Agent 工具文件夹 ✨
│   ├── README.md           # Agent 说明
│   ├── quality-check.mjs   # 质量检查脚本
│   ├── build-deploy.mjs    # 构建部署脚本
│   └── prompt.md           # Agent 系统提示词
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions 工作流
├── next.config.js          # 已配置静态导出
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

### ❌ 自动忽略的文件

```
node_modules/
.next/
out/
.trae/
package-lock.json
.env*
*.log
```

---

## 🛠️ Agent 工具使用

### 代码质量检查
```bash
# 完整检查
node agent/quality-check.mjs

# 仅 TypeScript
node agent/quality-check.mjs --tsc-only

# 静默模式
node agent/quality-check.mjs --quiet
```

### 构建部署准备
```bash
node agent/build-deploy.mjs

# 自定义 basePath
node agent/build-deploy.mjs --base=/my-repo
```

---

## 🔍 部署验证清单

部署前请确认：

- [ ] 运行 `node agent/quality-check.mjs` 全绿通过
- [ ] `next.config.js` 中 `output: 'export'` 已配置
- [ ] `basePath: '/LingXu'` 与仓库名一致
- [ ] 所有图片使用 `unoptimized` 模式
- [ ] 无服务器端 API 路由
- [ ] 98个页面全部构建成功

---

## 🐛 常见问题

### 问题1：页面 404
**原因**: SPA 客户端路由问题

**解决**: 已在工作流中自动创建 `404.html` 副本

---

### 问题2：资源路径错误
**原因**: basePath 配置不一致

**解决**: 确保构建时设置：
```bash
NEXT_PUBLIC_BASE_PATH='/LingXu' npm run build
```

---

### 问题3：样式丢失
**原因**: Jekyll 忽略下划线开头的文件

**解决**: 已自动创建 `.nojekyll` 文件禁用 Jekyll

---

### 问题4：构建失败
**运行**:
```bash
# 查看详细错误
npx tsc --noEmit
npm run build
```

---

## 📊 部署后的检查清单

部署成功后验证：

- [ ] 首页正常加载
- [ ] 所有模块链接可跳转
- [ ] 图片/样式加载正常
- [ ] 控制台无报错
- [ ] 移动端适配正常
- [ ] PWA 可安装提示

---

## 💡 最佳实践

1. **提交前必做**: `node agent/quality-check.mjs`
2. **每周**: 运行一次完整审计
3. **大改动**: 先本地 build 验证
4. **小修复**: 直接推，CI 帮忙把关

---

## 🔧 项目配置速览

```javascript
// next.config.js - 关键配置
{
  output: 'export',              // 静态导出必需
  basePath: '/LingXu',           // 仓库名
  trailingSlash: true,           // GitHub Pages 兼容
  images: { unoptimized: true }, // 图片不使用 Next.js 优化
}
```

---

**祝你部署顺利！✨**

如有问题，运行 `node agent/quality-check.mjs` 检查项目状态。
