# LingXu

一个基于 Astro 构建的静态网站项目，可正常本地开发、构建，并兼容 GitHub Pages 部署。

## 已修复内容

- 补齐项目依赖，确保可安装、可构建
- 增加 Astro 严格类型检查配置
- 修正 Astro 配置，使其兼容本地开发与 GitHub Pages 子路径部署
- 校验页面路由与核心页面可正常参与构建

## 开发

```bash
npm install
npm run dev
```

本地开发地址：`http://localhost:4321`

## 构建

```bash
npm run build
```

构建输出目录：`dist/`

## GitHub Pages 部署说明

当前配置在 GitHub Actions 环境下会自动使用：

- `site`: `https://x1882.github.io`
- `base`: `/LingXu`

因此部署到 GitHub Pages 仓库页时，静态资源与站内链接可正确解析。

如果你后续更换仓库名或域名，只需要同步修改 `astro.config.mjs` 中的 `site` / `base` 逻辑。
