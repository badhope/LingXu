# 灵墟 - 完整部署指南

本文档涵盖所有主流平台部署方式。

---

## 🎯 部署方式总览

| 平台 | 难度 | 推荐 | 时间 |
|------|------|------|------|
| **Netlify** | 🟢 极简单 | ⭐⭐⭐⭐⭐ | 1 分钟 |
| **Vercel** | 🟢 极简单 | ⭐⭐⭐⭐ | 1 分钟 |
| **Cloudflare Pages** | 🟢 极简单 | ⭐⭐⭐⭐ | 2 分钟 |
| **GitHub Pages** | 🟡 简单 | ⭐⭐⭐ | 3 分钟 |
| **Nginx** | 🟡 中等 | ⭐⭐⭐ | 5 分钟 |
| **Apache/虚拟主机** | 🟡 中等 | ⭐⭐ | 5 分钟 |
| **阿里云/腾讯云 OSS** | 🟠 较复杂 | ⭐⭐ | 10 分钟 |

---

## 🚀 方式一：Netlify 一键部署（强烈推荐）

### 步骤

1. **Fork 本仓库** 到你的 GitHub

2. 打开 [Netlify 官网](https://app.netlify.com) 注册登录

3. 点击 **Add new site** → **Import an existing project**

4. 选择你 Fork 的仓库，然后点击 **Deploy site**

5. ✅ **完成！** 2 分钟后你的网站就上线了

### 特性

- ✅ 自动 HTTPS 证书
- ✅ 全球 CDN 加速
- ✅ Git 推送自动更新
- ✅ SPA 路由原生支持
- ✅ 一键回滚任意版本
- ✅ PR 自动部署预览

---

## 🌐 方式二：静态资源直接上传

所有平台通用方式：

1. 本地构建：
```bash
npm run build
```

2. 将 `out/` 目录所有文件上传到网站根目录。

**就这么简单！**

---

## 📦 构建产物说明

`out/` 目录包含以下部署适配文件：

| 文件 | 作用 |
|------|------|
| `_redirects` | Netlify/Cloudflare SPA 路由 |
| `.htaccess` | Apache 虚拟主机路由 + 缓存 |
| `404.html` | GitHub Pages SPA 路由回退 |
| `.nojekyll` | GitHub Pages 不忽略 _next 目录 |

---

## 🔧 方式三：Nginx 独立服务器

### Nginx 配置文件

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL 证书配置 (certbot 自动生成)
    # ssl_certificate /etc/letsencrypt/live/...;
    # ssl_certificate_key /etc/letsencrypt/live/...;

    root /var/www/lingxu/out;
    index index.html;

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;

    # SPA 路由 - 最关键配置
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 永久缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;
    }

    # 安全头
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
}
```

---

## ⚙️ 方式四：GitHub Pages

### 构建命令

```bash
# Windows
$env:NEXT_PUBLIC_BASE_PATH='/LingXu'
npm run build
```

```bash
# macOS/Linux
NEXT_PUBLIC_BASE_PATH=/LingXu npm run build
```

### 注意事项

- 仓库名必须是 `LingXu`（大小写敏感）
- 构建完成后将 `out/` 目录内容推送到 `gh-pages` 分支

---

## ✅ 部署后验证清单

部署后必做检查：

1. ✅ **首页可见性** - 背景和文字正常显示，无黑屏
2. ✅ **资源加载** - F12 Network 面板无 404
3. ✅ **控制台** - Console 面板无红色报错
4. ✅ **路由测试** - 进入子页面后刷新不 404
5. ✅ **移动端** - 手机访问显示正常
6. ✅ **动画效果** - 点击"踏入灵墟"动画正常

---

## ❓ 常见问题

### Q: 部署后黑屏？
**A:** 已修复！`initial={false}` 确保 SSR 默认 opacity: 1

### Q: 子页面刷新 404？
**A:** Netlify 已配置，Nginx 需要加 `try_files` 配置

### Q: JS/CSS 404？
**A:** GitHub Pages 需要设置 `NEXT_PUBLIC_BASE_PATH` 环境变量

### Q: 构建失败？
**A:** 运行 `npm run lint && npm run typecheck` 先做本地检查

---

## 🎉 部署完成

你的灵墟档案馆已经上线！

> 道阻且长，行则将至
