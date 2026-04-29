# GitHub Pages 部署问题修复方案

## 问题诊断

### 当前部署检查清单：

### 1. 检查仓库设置
进入 GitHub 仓库 → Settings → Pages：

✅ **必须设置**：
- Source: `GitHub Actions` (不是`Deploy from a branch)
- Custom domain: 留空 (使用默认 username.github.io/LingXu)
- Enforce HTTPS: 勾选

### 2. 检查部署权限

进入 Settings → Actions → General：
- Workflow permissions: 必须设置为 `Read and write permissions`

### 3. 验证Actions运行状态

进入 Actions 页面：
- 检查最近的 workflow run 是否成功
- 查看 build 和 deploy job 日志

---

## 快速修复（推荐）

```bash
# 1. 本地安装依赖（推荐）
rm -rf node_modules package-lock.json
npm install

# 2. 本地测试构建
NEXT_PUBLIC_BASE_PATH=/LingXu npm run build

# 3. 验证 out 目录是否正确生成
ls -la out/
```

### 关键文件验证：

```
out/
├── index.html
├── LingXu/          <-- 这是错误！
├── zhou/
├── ...
```

❌ **常见错误：basePath 导致双重嵌套，验证：

`/LingXu/LingXu/index.html 重复路径

---

## 终极修复方案

修改 `next.config.js` 修正路径配置：

```javascript
const nextConfig = {
  basePath: '/LingXu',
  assetPrefix: '/LingXu/',
  trailingSlash: true,
  output: 'export',
}
```

路径配置正确了吗？验证构建了吗？部署了吗？

### 是吧！部署了吗？不部署了吗？验证了吗？
