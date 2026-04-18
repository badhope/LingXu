# 🚀 灵墟档案馆 - 自有服务器部署手册

## 🎯 最简单：PM2 手动部署（推荐！）

### 服务器首次部署

```bash
# 1. 服务器上安装 Node.js 20
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs

# 2. 安装 PM2 进程管理器
npm install -g pm2

# 3. 克隆代码到服务器
cd /www
git clone https://github.com/你的用户名/LingXu.git
cd LingXu

# 4. 安装依赖 + 构建
npm install
npm run build

# 5. 启动服务
pm2 start npm --name "lingxu" -- start
pm2 save
pm2 startup
```

### ✅ 以后每次更新代码（一键解决！）

**这就是你网站没更新的原因！** 每次git push后，必须在服务器上执行：

```bash
cd /www/LingXu
./deploy.sh
```

或者手动执行：
```bash
cd /www/LingXu
git pull
npm install
npm run build
pm2 reload lingxu
```

---

## 🔄 Nginx 反向代理配置（二级域名）

在服务器 `/etc/nginx/conf.d/lingxu.conf` 创建：

```nginx
server {
    listen 80;
    server_name lingxu.yourdomain.com;  # 改成你的二级域名

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

然后重载 Nginx：
```bash
nginx -t && nginx -s reload
```

---

## 📋 部署检查清单

| 步骤 | 命令 | 必须做！ |
|------|------|---------|
| 1. 拉取最新代码 | `git pull` | ✅ 每次必须！ |
| 2. 安装新依赖 | `npm install` | ✅ 有package.json变更必须 |
| 3. 构建 | `npm run build` | ✅ 每次必须！ |
| 4. 重启服务 | `pm2 reload lingxu` | ✅ 每次必须！ |
| 5. 清浏览器缓存 | `Ctrl + Shift + R` | ✅ 每次验证必须！ |

---

## ❌ 最常见的3个错误

**1. ❌ 只git push，服务器没拉取**
> ✅ 解决：登录服务器 `cd /www/LingXu && git pull`

**2. ❌ 拉了代码但没重新构建**
> ✅ 解决：`npm run build` 这个必须有！Next.js是编译型框架！

**3. ❌ 构建了但没重启PM2**
> ✅ 解决：`pm2 reload lingxu`

---

## 🔍 问题排查

```bash
# 看服务运行状态
pm2 status
pm2 logs lingxu

# 看端口是否监听
netstat -tlnp | grep 3000

# 手动测试
curl http://127.0.0.1:3000
```
