# 灵墟 Agent 工具集

这是项目专属的 AI Agent 工具文件夹，用于项目质量检查、构建部署、代码审计等自动化任务。

## 📁 目录结构

```
agent/
├── quality-check.mjs      # 代码质量检查工具
├── build-deploy.mjs       # 构建部署工具
├── audit-report.mjs       # 项目审计报告生成
├── prompt.md              # Agent 系统提示词
└── README.md              # 本文件
```

## 🚀 快速使用

### 1. 质量检查
```bash
node agent/quality-check.mjs
```

自动运行：
- TypeScript 类型检查
- ESLint 代码检查
- 构建完整性验证
- 依赖安全审计

### 2. 构建部署
```bash
node agent/build-deploy.mjs
```

自动完成：
- 清理旧构建
- 生产环境构建
- 静态资源优化
- out 目录准备

### 3. 生成审计报告
```bash
node agent/audit-report.mjs
```

生成完整的项目健康度报告

## 🎯 Agent 能力清单

### 🔍 代码分析
- ✅ TypeScript 类型覆盖率检查
- ✅ 代码复杂度分析
- ✅ 坏味道检测
- ✅ 性能瓶颈识别

### 📦 构建优化
- ✅ Bundle 大小分析
- ✅ 代码分割建议
- ✅ Tree Shaking 验证
- ✅ 资源压缩建议

### 🚀 部署辅助
- ✅ GitHub Pages 配置检查
- ✅ 静态导出验证
- ✅ basePath 兼容性检测
- ✅ 404 页面配置

### 📊 质量监控
- ✅ 健康度评分计算
- ✅ 技术债务追踪
- ✅ 测试覆盖率分析
- ✅ 安全漏洞扫描

## 💡 Agent 使用建议

1. **提交代码前**：运行 `quality-check.mjs` 确保质量达标
2. **部署前**：运行 `build-deploy.mjs` 验证构建完整性
3. **每周**：运行 `audit-report.mjs` 生成健康度报告
4. **重构前**：使用 Agent 分析代码复杂度和依赖

## 🔧 配置说明

所有工具都可以通过命令行参数或环境变量配置：

```bash
# 仅运行 TypeScript 检查
node agent/quality-check.mjs --tsc-only

# 跳过依赖安全检查
node agent/quality-check.mjs --skip-audit

# 自定义输出目录
node agent/build-deploy.mjs --out=dist
```
