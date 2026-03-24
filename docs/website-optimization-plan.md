# 网站质量保证与优化计划文档

> 生成时间: 2026-03-24
> 状态: 待执行

---

## 一、问题总览

### 1.1 严重问题（必须立即修复）

#### 问题 A: BasePath 配置冲突 ⚠️ CRITICAL

**冲突详情**:

| 配置文件 | base 值 | 实际输出路径 |
|----------|---------|--------------|
| `astro.config.mjs` | `/` | `/tian`, `/di` |
| `src/lib/constants.ts` | `/LingXu` | `/LingXu/tian` |
| `src/data/modules.ts` | `/LingXu` | `/LingXu/tian` |
| `src/pages/home.astro` | `withBase('/tian')` | `/LingXu/tian` |

**影响**:
- 本地开发 (`npm run dev`): 使用 `/` 前缀 → 正常
- GitHub Pages 部署 (`/LingXu`): 链接生成 `/LingXu/tian` 但页面在 `/tian` → **404错误**
- 当前 `astro.config.mjs` 设置 `base: '/'` 与代码中硬编码的 `/LingXu` 冲突

**根本原因**: `astro.config.mjs` 的 `base` 只影响**构建输出的目录结构**，不影响页面路由。但代码中 `withBase()` 使用的是 `constants.ts` 中的 `/LingXu`，导致链接与实际页面不匹配。

---

#### 问题 B: Footer 导航链接全部指向不存在的页面 ⚠️ CRITICAL

**位置**: `src/components/layout/Footer.astro`

**无效链接**:

| 链接 | 指向 | 状态 |
|------|------|------|
| 档案馆 | `/archive` | ❌ 不存在 |
| 典籍 | `/medicine` | ❌ 不存在 |
| 神话 | `/myth` | ❌ 不存在 |
| 法脉 | `/dharma` | ❌ 不存在 |
| 境界 | `/realms` | ❌ 不存在 |
| 项目缘起 | `/about` | ❌ 不存在 |

**受影响范围**: 所有页面底部 Footer 导航

---

#### 问题 C: search.astro 搜索结果链接错误 ⚠️ CRITICAL

**位置**: `src/pages/search.astro` 第 270 行

**问题代码**:
```javascript
<a href="/${item.module}" class="result-item">
```

**问题**: 硬编码 `/` 前缀，没有使用 `withBase()`，导致搜索结果链接与 basePath 配置不匹配。

---

#### 问题 D: 404.astro 和 500.astro 错误页面包含无效链接 ⚠️ CRITICAL

**位置**:
- `src/pages/404.astro`
- `src/pages/500.astro`

**无效链接**: Footer 部分包含 `/archive`, `/medicine`, `/myth`, `/dharma`, `/realms`, `/about` 全部不存在

---

#### 问题 E: modules.ts 中子模块链接全部指向不存在的页面 ⚠️ CRITICAL

**原因**: `modules.ts` 中定义的 subModules.href 指向的页面文件不存在

**受影响模块**:

| 模块 | subModule | href | 状态 |
|------|-----------|------|------|
| tian | daily-quote | `/tian/daily-quote` | ✅ 已存在 |
| di | geography | `/di/geography` | ❌ 缺失 |
| di | directions | `/di/directions` | ❌ 缺失 |
| xuan | (全部) | - | ✅ 全部存在 |
| huang | scrolls | `/huang/scrolls` | ❌ 缺失 |
| huang | era-convert | `/huang/era-convert` | ❌ 缺失 |
| huang | figures | `/huang/figures` | ❌ 缺失 |
| huang | events | `/huang/events` | ❌ 缺失 |
| huang | secrets | `/huang/secrets` | ❌ 缺失 |
| yu | world-map | `/yu/world-map` | ❌ 缺失 |
| yu | layers | `/yu/layers` | ❌ 缺失 |
| yu | realms | `/yu/realms` | ❌ 缺失 |
| yu | directions-world | `/yu/directions-world` | ❌ 缺失 |
| zhou | reincarnation | `/zhou/reincarnation` | ❌ 缺失 |
| zhou | calendar-system | `/zhou/calendar-system` | ❌ 缺失 |
| zhou | eras | `/zhou/eras` | ❌ 缺失 |
| zhou | timeline | `/zhou/timeline` | ❌ 缺失 |
| hong | divine-beasts | `/hong/divine-beasts` | ❌ 缺失 |
| hong | evil-beasts | `/hong/evil-beasts` | ❌ 缺失 |
| hong | birth-match | `/hong/birth-match` | ❌ 缺失 |
| hong | deity-tree | `/hong/deity-tree` | ❌ 缺失 |
| hong | auspicious | `/hong/auspicious` | ❌ 缺失 |
| huang-lost | techniques | `/huang-lost/techniques` | ❌ 缺失 |
| huang-lost | medicine | `/huang-lost/medicine` | ❌ 缺失 |
| huang-lost | artifacts | `/huang-lost/artifacts` | ❌ 缺失 |
| huang-lost | charms | `/huang-lost/charms` | ❌ 缺失 |
| huang-lost | ruins | `/huang-lost/ruins` | ❌ 缺失 |

**总计**: 28个缺失页面

---

#### 问题 F: ModuleLayout 侧边栏显示不存在的链接 ⚠️ CRITICAL

**原因**: `ModuleLayout.astro` 使用 `modules.ts` 中的 `subModules` 数据生成侧边栏导航

**表现**: 侧边栏显示的链接全部是 404

---

### 1.2 中等问题（应尽快修复）

#### 问题 G: navigation.ts 包含废弃的导航配置

**位置**: `src/data/navigation.ts`

```typescript
{ label: '档案馆', href: '/archive', description: '...' },
{ label: '典籍', href: '/medicine', description: '...' },
{ label: '神话', href: '/myth', description: '...' },
{ label: '法门', href: '/dharma', description: '...' },
{ label: '境界', href: '/realms', description: '...' },
```

**问题**: 这些链接指向的页面不存在，`NAV_ITEMS` 数组可能已废弃但未被清理

**影响组件**:
- `Footer.astro` 使用 `NAV_ITEMS` 渲染底部导航
- `SectionNav.astro` 使用 `NAV_ITEMS` 渲染章节导航

---

#### 问题 H: 模块定义重复

**位置**:
1. `src/data/modules.ts` - 定义 `MODULES` 数组（含 href, subModules）
2. `src/pages/home.astro` - 重复定义 `MODULES` 数组
3. `src/data/navigation.ts` - 定义 `NAV_ITEMS_V2`

**问题**: 数据重复定义，维护困难，可能导致不一致

---

#### 问题 I: 导入路径不一致

**混用路径别名和相对路径**:

| 文件 | 导入方式 |
|------|----------|
| `Header.astro` | `from '@lib/constants'` |
| `home.astro` | `from '../lib/constants'` |
| `intro.astro` | `from '../lib/constants'` |
| `BaseLayout.astro` | `from '@lib/constants'` |

**问题**: 代码风格不一致，但功能正常

---

#### 问题 J: home.astro 使用相对路径导入 utils

```javascript
import { withBase } from '../lib/utils';
```

**问题**: 应该使用 `@lib/utils` path alias

---

### 1.3 低优先级问题

#### 问题 K: intro.astro 未使用 BaseLayout

`intro.astro` 手动实现了类似 BaseLayout 的功能，造成代码重复。

---

#### 问题 L: 部分模块首页内容较少

| 模块 | 首页 | 内容状态 |
|------|------|----------|
| huang | `/huang` | 有介绍和时代划分，但无详细功能页面 |
| hong | `/hong` | 有介绍和神兽展示，但无详细功能页面 |
| yu | `/yu` | 有介绍和各界简介，但无详细功能页面 |
| zhou | `/zhou` | 有介绍和知识卡片，但无详细功能页面 |
| huang-lost | `/huang-lost` | 有介绍和隐秘等级，但无详细功能页面 |

---

## 二、分阶段执行计划

### 阶段零：修复严重配置问题（紧急）

#### 任务 0.1: 统一 BasePath 配置
**文件**: `src/lib/constants.ts`, `src/data/modules.ts`, `astro.config.mjs`

**修改方案**:

修改 `astro.config.mjs`:
```javascript
base: '/',  // 保持为 /
output: 'static',
```

修改 `src/lib/constants.ts`:
```typescript
base: '/',  // 改为 /
url: 'https://badhope.github.io/LingXu',  // 保持原 URL
```

修改 `src/data/modules.ts`:
```typescript
const BASE_PATH = '/';  // 改为 /
```

**验证**: 构建后检查所有链接前缀是否为 `/`

---

#### 任务 0.2: 修复 Footer 导航链接
**文件**: `src/components/layout/Footer.astro`

**方案**: 删除无效链接或使用现有模块链接替代

```astro
<!-- 修改前 -->
<li><a href={`${basePath}/archive`} class="...">档案馆</a></li>

<!-- 修改后: 使用已有模块链接或删除 -->
<li><a href={withBase('/huang')} class="...">典籍</a></li>  <!-- 或删除 -->
```

---

#### 任务 0.3: 修复 search.astro 搜索结果链接
**文件**: `src/pages/search.astro`

**修改**:
```javascript
// 修改前
<a href="/${item.module}" class="result-item">

// 修改后
<a href={withBase(`/${item.module}`)} class="result-item">
```

---

#### 任务 0.4: 修复 404.astro 和 500.astro 无效链接
**文件**: `src/pages/404.astro`, `src/pages/500.astro`

**修改**: Footer 部分删除无效链接或使用有效链接替代

---

#### 任务 0.5: 清理或更新 navigation.ts
**文件**: `src/data/navigation.ts`

**方案**: 删除废弃的 `/archive`, `/medicine`, `/myth`, `/dharma`, `/realms` 条目，或更新为有效链接

---

#### 任务 0.6: 统一导入路径
**文件**: `src/pages/home.astro`, `src/pages/intro.astro`

**修改**:
```astro
// home.astro
import { withBase } from '@lib/utils';
import { SITE_CONFIG } from '@lib/constants';

// intro.astro
import { SITE_CONFIG } from '@lib/constants';
```

---

#### 任务 0.7: 删除重复的模块定义
**文件**: `src/pages/home.astro`

**修改**: 复用 `modules.ts` 中的 `MODULES` 数据

```astro
---
import { MODULES } from '@data/modules';
---
```

---

### 阶段一：修复跳转问题（紧急）

#### 任务 1.1-1.6: 修复各模块首页无效链接

| 任务 | 文件 | 操作 |
|------|------|------|
| 1.1 | `src/pages/di/index.astro` | 删除 `/di/geography` 和 `/di/directions` 链接 |
| 1.2 | `src/pages/hong/index.astro` | 删除全部5个无效链接，保留介绍内容 |
| 1.3 | `src/pages/huang/index.astro` | 删除全部5个无效链接，保留介绍内容 |
| 1.4 | `src/pages/yu/index.astro` | 删除全部4个无效链接，保留介绍内容 |
| 1.5 | `src/pages/zhou/index.astro` | 删除全部4个无效链接，保留介绍内容 |
| 1.6 | `src/pages/huang-lost/index.astro` | 删除全部5个无效链接，保留介绍内容 |

---

### 阶段二：创建核心缺失页面（高优先级）

#### 任务 2.1-2.12: 创建核心页面

| 任务 | 页面 | 预估工时 |
|------|------|----------|
| 2.1 | `/di/geography.astro` | 30min |
| 2.2 | `/di/directions.astro` | 30min |
| 2.3 | `/hong/divine-beasts.astro` | 45min |
| 2.4 | `/hong/evil-beasts.astro` | 45min |
| 2.5 | `/huang/scrolls.astro` | 60min |
| 2.6 | `/huang/era-convert.astro` | 45min |
| 2.7 | `/zhou/reincarnation.astro` | 60min |
| 2.8 | `/zhou/calendar-system.astro` | 45min |
| 2.9 | `/yu/world-map.astro` | 60min |
| 2.10 | `/yu/layers.astro` | 45min |
| 2.11 | `/huang-lost/techniques.astro` | 60min |
| 2.12 | `/huang-lost/medicine.astro` | 45min |

---

### 阶段三：创建次要缺失页面（中优先级）

#### 任务 3.1-3.13: 创建次要页面

| 任务 | 页面 | 预估工时 |
|------|------|----------|
| 3.1 | `/hong/birth-match.astro` | 60min |
| 3.2 | `/hong/deity-tree.astro` | 45min |
| 3.3 | `/hong/auspicious.astro` | 30min |
| 3.4 | `/huang/figures.astro` | 60min |
| 3.5 | `/huang/events.astro` | 60min |
| 3.6 | `/huang/secrets.astro` | 45min |
| 3.7 | `/yu/realms.astro` | 45min |
| 3.8 | `/yu/directions-world.astro` | 30min |
| 3.9 | `/zhou/eras.astro` | 45min |
| 3.10 | `/zhou/timeline.astro` | 60min |
| 3.11 | `/huang-lost/artifacts.astro` | 45min |
| 3.12 | `/huang-lost/charms.astro` | 45min |
| 3.13 | `/huang-lost/ruins.astro` | 60min |

---

### 阶段四：视觉统一与组件抽象

#### 任务 4.1: 创建 FeatureCard 组件
**文件**: `src/components/ui/FeatureCard.astro`

---

#### 任务 4.2: 创建 KnowledgeCard 组件
**文件**: `src/components/ui/KnowledgeCard.astro`

---

#### 任务 4.3-4.8: 统一各模块首页样式

| 任务 | 文件 |
|------|------|
| 4.3 | `src/pages/di/index.astro` |
| 4.4 | `src/pages/hong/index.astro` |
| 4.5 | `src/pages/huang/index.astro` |
| 4.6 | `src/pages/yu/index.astro` |
| 4.7 | `src/pages/zhou/index.astro` |
| 4.8 | `src/pages/huang-lost/index.astro` |

---

### 阶段五：验证与测试

#### 任务 5.1: 构建验证
```bash
npm run build
```

---

#### 任务 5.2: 链接检查
验证所有模块首页和侧边栏的链接都指向存在的页面

---

#### 任务 5.3: 部署测试
在 GitHub Pages 环境验证 `/LingXu` 前缀的链接

---

## 三、问题汇总表

| 问题编号 | 严重程度 | 问题描述 | 涉及文件 | 修复方案 |
|----------|----------|----------|----------|----------|
| A | CRITICAL | BasePath 配置冲突 | constants.ts, modules.ts, astro.config.mjs | 统一为 `/` |
| B | CRITICAL | Footer 导航链接无效 | Footer.astro | 删除或替换为有效链接 |
| C | CRITICAL | search 结果链接错误 | search.astro | 使用 withBase() |
| D | CRITICAL | 错误页面包含无效链接 | 404.astro, 500.astro | 删除无效链接 |
| E | CRITICAL | 28个子模块链接404 | modules.ts | 创建页面或删除链接 |
| F | CRITICAL | 侧边栏导航全部404 | ModuleLayout.astro | 创建页面或修复数据 |
| G | 中等 | navigation.ts 废弃配置 | navigation.ts | 清理废弃条目 |
| H | 中等 | 模块定义重复 | home.astro, modules.ts | 复用 modules.ts |
| I | 低 | 导入路径不一致 | 多个文件 | 统一使用 path alias |
| J | 低 | home.astro 导入方式 | home.astro | 改用 path alias |

---

## 四、风险评估

### 高风险
| 风险 | 描述 | 影响 |
|------|------|------|
| BasePath 配置错误 | 修改后导致所有链接失效 | 致命 |
| 大量页面创建 | 28个页面需要内容创作 | 进度延迟 |

### 中风险
| 风险 | 描述 | 影响 |
|------|------|------|
| 样式不一致 | 组件替换可能破坏现有样式 | 需返工 |
| 内容质量 | 大量原创内容可能质量参差 | 需审核 |

### 低风险
| 风险 | 描述 | 影响 |
|------|------|------|
| 代码冲突 | 多人协作时的 git 冲突 | 可解决 |

---

## 五、执行顺序建议

```
阶段零 (紧急 - 2-3小时)
    ↓
阶段一 (紧急 - 30分钟)
    ↓
阶段二 (高优先级 - 9小时)
    ↓
阶段三 (中优先级 - 10.5小时)
    ↓
阶段四 (中优先级 - 4小时)
    ↓
阶段五 (低优先级 - 1小时)
```

**总计**: ~27-28小时工作量

---

## 六、当前状态

- [x] 问题诊断完成（全面）
- [x] 计划文档创建
- [ ] 等待用户确认执行

---

## 七、新发现的细节问题汇总

### 7.1 Footer 导航问题
Footer 中硬编码了 6 个不存在的页面链接（archive, medicine, myth, dharma, realms, about）

### 7.2 search.astro 搜索结果链接
搜索结果点击后会跳转到错误的链接（缺少 basePath 前缀）

### 7.3 错误页面 Footer
404.astro 和 500.astro 复用了 Footer 组件，导致同样的无效链接问题

### 7.4 navigation.ts 废弃数据
NAV_ITEMS 数组包含指向不存在页面的链接，可能已废弃但未清理

### 7.5 withBase() 逻辑问题
utils.ts 中的 withBase() 函数在 path 已包含 base 时会直接返回，可能导致双重前缀问题

---

## 八、附录

### A. 现有页面清单（完整）

**存在的子页面**:
- `/di/compass.astro` ✅
- `/di/caves.astro` ✅
- `/di/fengshui.astro` ✅
- `/tian/calendar.astro` ✅
- `/tian/bazi.astro` ✅
- `/tian/stars.astro` ✅
- `/tian/solar-terms.astro` ✅
- `/tian/daily-quote.astro` ✅
- `/xuan/yijing.astro` ✅
- `/xuan/classics.astro` ✅
- `/xuan/formations.astro` ✅
- `/xuan/talismans.astro` ✅
- `/xuan/destiny.astro` ✅
- `/huang-lost/cultivation.astro` ✅

**存在的主页面**:
- `/home.astro` ✅
- `/index.astro` ✅
- `/intro.astro` ✅
- `/search.astro` ✅
- `/profile.astro` ✅
- `/bookmarks.astro` ✅
- `/404.astro` ✅
- `/500.astro` ✅

---

### B. 缺失页面清单（按优先级）

**高优先级 (12个)**:
1. `/di/geography.astro`
2. `/di/directions.astro`
3. `/hong/divine-beasts.astro`
4. `/hong/evil-beasts.astro`
5. `/huang/scrolls.astro`
6. `/huang/era-convert.astro`
7. `/zhou/reincarnation.astro`
8. `/zhou/calendar-system.astro`
9. `/yu/world-map.astro`
10. `/yu/layers.astro`
11. `/huang-lost/techniques.astro`
12. `/huang-lost/medicine.astro`

**中优先级 (13个)**:
13. `/hong/birth-match.astro`
14. `/hong/deity-tree.astro`
15. `/hong/auspicious.astro`
16. `/huang/figures.astro`
17. `/huang/events.astro`
18. `/huang/secrets.astro`
19. `/yu/realms.astro`
20. `/yu/directions-world.astro`
21. `/zhou/eras.astro`
22. `/zhou/timeline.astro`
23. `/huang-lost/artifacts.astro`
24. `/huang-lost/charms.astro`
25. `/huang-lost/ruins.astro`

**不存在的 Footer 链接 (6个)**:
26. `/archive.astro`
27. `/medicine.astro`
28. `/myth.astro`
29. `/dharma.astro`
30. `/realms.astro`
31. `/about.astro`
