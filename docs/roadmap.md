# Roadmap Documentation

## Version Overview

| Version | Focus | Status |
|---------|-------|--------|
| V2.0.0 | System Migration - Eight Modules | ✅ Complete |
| V2.1.0 | Module Pages Completion | Planned |
| V2.2.0 | Interactive Features | Planned |

---

## V2.0.0 - System Migration (Current)

### Completed Features

- [x] Migrated to Eight Module System (天地玄黄，宇宙洪荒)
- [x] Removed legacy content collections (archive, medicine, myth, dharma, realms)
- [x] Updated navigation to new module structure
- [x] Updated Header component
- [x] Updated README documentation
- [x] Module configuration system in `modules.ts`

### Current Module Structure

```
src/pages/
├── tian/          # 天 - Celestial: calendar, bazi, stars, solar-terms, daily-quote
├── di/            # 地 - Geography: compass, caves, fengshui, geography, directions
├── xuan/          # 玄 - Esoteric: yijing, destiny, talismans, formations, classics
├── huang/         # 黄 - History: scrolls, era-convert, figures, events, secrets
├── yu/            # 宇 - Space: world-map, layers, realms, directions-world
├── zhou/          # 宙 - Time: reincarnation, calendar-system, eras, timeline
├── hong/          # 洪 - Primordial: divine-beasts, evil-beasts, birth-match, deity-tree, auspicious
└── huang-lost/   # 荒 - Lost: techniques, medicine, artifacts, charms, ruins
```

### Implemented Pages

| Module | Implemented | Total Submodules |
|--------|-------------|------------------|
| 天 | 1 (calendar) | 5 |
| 地 | 1 (compass) | 5 |
| 玄 | 1 (yijing) | 5 |
| 黄 | 0 | 5 |
| 宇 | 0 | 4 |
| 宙 | 0 | 4 |
| 洪 | 0 | 5 |
| 荒 | 1 (cultivation) | 5 |
| **Total** | **4** | **38** |

---

## V2.1.0 - Module Pages Completion

### Goals

Complete all submodule pages across the eight modules.

### Priority Tasks

#### High Priority
- [ ] `/tian/bazi` - 八字排盘
- [ ] `/tian/stars` - 星辰运行
- [ ] `/tian/solar-terms` - 节气养生
- [ ] `/tian/daily-quote` - 每日吉言
- [ ] `/di/caves` - 洞天福地
- [ ] `/di/fengshui` - 风水堪舆
- [ ] `/xuan/destiny` - 命理推演
- [ ] `/xuan/talismans` - 符箓识别

#### Medium Priority
- [ ] `/huang/scrolls` - 历史卷轴
- [ ] `/huang/figures` - 人物谱
- [ ] `/yu/layers` - 空间层级
- [ ] `/zhou/reincarnation` - 轮回查询
- [ ] `/hong/divine-beasts` - 神兽图鉴
- [ ] `/huang-lost/techniques` - 失传功法

#### Low Priority
- [ ] `/huang/era-convert` - 纪年转换
- [ ] `/huang/events` - 大事件
- [ ] `/huang/secrets` - 秘辛档案
- [ ] `/yu/world-map` - 世界地图
- [ ] `/yu/realms` - 界域详情
- [ ] `/zhou/calendar-system` - 纪年系统
- [ ] `/zhou/eras` - 时代划分
- [ ] `/zhou/timeline` - 时间线
- [ ] `/hong/evil-beasts` - 凶兽异志
- [ ] `/hong/birth-match` - 出生匹配
- [ ] `/hong/deity-tree` - 神系谱图
- [ ] `/hong/auspicious` - 祥瑞之兽
- [ ] `/huang-lost/medicine` - 远古药方
- [ ] `/huang-lost/artifacts` - 失落神器
- [ ] `/huang-lost/charms` - 古物法器
- [ ] `/huang-lost/ruins` - 文明遗迹

---

## V2.2.0 - Interactive Features

### Goals

Add interactive elements to enhance user engagement.

### Feature Ideas

- [ ] Interactive Yijing divination
- [ ] Bazi fortune calculator
- [ ] Fengshui compass simulator
- [ ] Reincarnation query system
- [ ] Divine beast birth matching
- [ ] Era conversion tool
