#!/bin/bash

echo "========================================"
echo "🚀 灵墟档案馆 - 自动部署脚本"
echo "========================================"

echo ""
echo "📥 1. 拉取最新代码..."
git pull origin main

echo ""
echo "📦 2. 安装依赖..."
npm install

echo ""
echo "🔍 3. 代码检查..."
npm run lint

echo ""
echo "🏗️  4. 构建生产版本..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 构建成功！"
    
    echo ""
    echo "🔄 5. 重启 PM2 服务..."
    pm2 reload lingxu
    
    echo ""
    echo "========================================"
    echo "🎉 部署完成！访问：你的二级域名"
    echo "========================================"
else
    echo ""
    echo "❌ 构建失败！部署中止！"
    exit 1
fi
