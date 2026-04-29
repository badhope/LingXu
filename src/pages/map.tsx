'use client'

import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'
import styles from './map.module.scss'

interface SitePage {
  name: string
  module: string
  moduleIcon: string
  category: string
  path: string
  description: string
  tags: string[]
}

const ALL_PAGES: SitePage[] = [
  // 法器阁
  { name: '法器阁', module: '法器', moduleIcon: '🏛️', category: '模块首页', path: '/tools', description: '九大上古玄门道器，交互式沉浸式修真工具', tags: ['工具', '法器', '互动'] },
  { name: '风水罗盘', module: '法器', moduleIcon: '🏛️', category: '工具', path: '/tools/luopan', description: '专业风水罗盘，物理惯性阻尼旋转', tags: ['罗盘', '风水', '堪舆'] },
  { name: '八卦占卜', module: '法器', moduleIcon: '🏛️', category: '工具', path: '/tools/bagua', description: '三枚铜钱起卦，文王六十四卦', tags: ['占卜', '铜钱', '卦象'] },
  { name: '六爻断事', module: '法器', moduleIcon: '🏛️', category: '工具', path: '/tools/liuyao', description: '纳甲装卦，六亲六神世应', tags: ['六爻', '纳甲', '断事'] },
  { name: '天时历法', module: '法器', moduleIcon: '🏛️', category: '工具', path: '/tools/calendar', description: '通胜黄历，实时月相，择吉避凶', tags: ['黄历', '月相', '择吉'] },
  { name: '八字命理', module: '法器', moduleIcon: '🏛️', category: '工具', path: '/tools/bazi', description: '四柱排盘，五行分布，大运走势', tags: ['八字', '四柱', '命理'] },
  { name: '星象观测', module: '法器', moduleIcon: '🏛️', category: '工具', path: '/tools/xingxiu', description: '三垣四象，二十八宿，本命星宿', tags: ['星象', '星宿', '占星'] },
  { name: '符箓道法', module: '法器', moduleIcon: '🏛️', category: '工具', path: '/tools/fulu', description: '朱砂画符，咒语存思，手决图典', tags: ['符箓', '咒语', '道法'] },
  { name: '丹药养生', module: '法器', moduleIcon: '🏛️', category: '工具', path: '/tools/liandan', description: '九转炼丹，文武火候，十二本草', tags: ['炼丹', '本草', '养生'] },
  { name: '阵法大全', module: '法器', moduleIcon: '🏛️', category: '工具', path: '/tools/zhenfa', description: '十大古阵，八卦八门，阵图发动', tags: ['阵法', '八门', '推演'] },

  // 天时模块
  { name: '天时殿', module: '天时', moduleIcon: '⭐', category: '模块首页', path: '/tian/index', description: '观天象，知天命，探索天星运行之奥秘', tags: ['天文', '星象', '运势'] },
  { name: '二十八星宿', module: '天时', moduleIcon: '⭐', category: '天象', path: '/tian/xingxiu', description: '三垣四象二十八宿，天星对应人间祸福', tags: ['星宿', '四象', '天文'] },
  { name: '每日运势', module: '天时', moduleIcon: '⭐', category: '运势', path: '/tian/yunshi', description: '流年大运五行生克，趋吉避凶把握时机', tags: ['运势', '流年', '改运'] },
  { name: '二十四节气', module: '天时', moduleIcon: '⭐', category: '历法', path: '/tian/jieqi', description: '天地气机流转，二十四节气转换', tags: ['节气', '历法', '农时'] },
  { name: '寻时择日', module: '天时', moduleIcon: '⭐', category: '择吉', path: '/tian/xunshi', description: '黄道吉日选择，万事皆宜之时', tags: ['择日', '黄道', '吉凶'] },
  { name: '铜钱占卜', module: '天时', moduleIcon: '⭐', category: '占卜', path: '/tian/zhanbu', description: '六爻铜钱起卦，断吉凶祸福', tags: ['占卜', '六爻', '预测'] },

  // 地理模块
  { name: '地理阁', module: '地理', moduleIcon: '🗺️', category: '模块首页', path: '/di/index', description: '山河大地，龙脉风水，藏风聚气之绝学', tags: ['风水', '龙脉', '地理'] },
  { name: '风水绝学', module: '地理', moduleIcon: '🗺️', category: '风水', path: '/di/fengshui', description: '峦头理气形理兼备，阳宅阴宅风水大全', tags: ['风水', '阳宅', '形煞'] },
  { name: '寻龙点穴', module: '地理', moduleIcon: '🗺️', category: '龙脉', path: '/di/longmai', description: '千里寻龙，万里点穴，龙脉真诀', tags: ['龙脉', '点穴', '峦头'] },
  { name: '罗经奥义', module: '地理', moduleIcon: '🗺️', category: '工具', path: '/di/luopan', description: '罗盘层层奥秘，二十四山分金', tags: ['罗盘', '罗经', '分金'] },
  { name: '天下地理', module: '地理', moduleIcon: '🗺️', category: '堪舆', path: '/di/dili', description: '中华大地名山大川，风水宝地分布图', tags: ['地理', '名山', '胜地'] },

  // 玄学模块
  { name: '玄妙观', module: '玄学', moduleIcon: '🔮', category: '模块首页', path: '/xuan/index', description: '易经八卦，八字命理，奇门遁甲之术', tags: ['玄学', '术数', '预测'] },
  { name: '易经六十四卦', module: '玄学', moduleIcon: '🔮', category: '易经', path: '/xuan/yijing', description: '群经之首，大道之源，六十四卦详解', tags: ['易经', '八卦', '卦象'] },
  { name: '八字命理', module: '玄学', moduleIcon: '🔮', category: '命理', path: '/xuan/bazi', description: '四柱八字，天干地支，命理解析', tags: ['八字', '四柱', '命理'] },
  { name: '六爻断事', module: '玄学', moduleIcon: '🔮', category: '占卜', path: '/xuan/liuyao', description: '纳甲筮法，六爻神机，断事如神', tags: ['六爻', '纳甲', '断事'] },
  { name: '符箓咒语', module: '玄学', moduleIcon: '🔮', category: '道法', path: '/xuan/fulu', description: '道教符咒，驱邪避凶，祈福消灾', tags: ['符箓', '咒语', '道法'] },

  // 修真模块
  { name: '修真界', module: '修真', moduleIcon: '🐉', category: '模块首页', path: '/huang-lost/index', description: '失落的修真文明，金丹大道功法秘籍', tags: ['修真', '功法', '金丹'] },
  { name: '修真功法', module: '洪荒', moduleIcon: '🐉', category: '修炼', path: '/huang-lost/gongfa', description: '炼精化气炼气化神，金丹大道功法', tags: ['功法', '修炼', '金丹'] },
  { name: '上古法宝', module: '洪荒', moduleIcon: '🐉', category: '法宝', path: '/huang-lost/fabao', description: '先天灵宝后天法宝，神器排行榜', tags: ['法宝', '灵宝', '神器'] },
  { name: '金丹神丹', module: '洪荒', moduleIcon: '🐉', category: '丹药', path: '/huang-lost/danyao', description: '九转金丹，长生不老，丹药大全', tags: ['丹药', '金丹', '炼丹'] },
  { name: '秘境密事', module: '洪荒', moduleIcon: '🐉', category: '秘闻', path: '/huang-lost/mishi', description: '上古秘闻，洪荒轶事，仙界旧事', tags: ['秘闻', '轶事', '旧事'] },

  // 历史模块
  { name: '春秋阁', module: '历史', moduleIcon: '📜', category: '模块首页', path: '/lishi/index', description: '华夏五千年，历史长河中的璀璨星辰', tags: ['历史', '华夏', '文明'] },
  { name: '朝代更迭', module: '历史', moduleIcon: '📜', category: '朝代', path: '/lishi/chaodai', description: '夏商周秦汉，唐宋元明清，气数兴衰', tags: ['朝代', '兴衰', '更替'] },
  { name: '秘闻杂记', module: '历史', moduleIcon: '📜', category: '秘闻', path: '/lishi/mixin', description: '正史不载的野史秘闻，宫闱秘事', tags: ['秘闻', '野史', '杂记'] },
  { name: '历史人物', module: '历史', moduleIcon: '📜', category: '人物', path: '/lishi/renwu', description: '帝王将相，英雄豪杰，才子佳人', tags: ['人物', '将相', '豪杰'] },
  { name: '古籍文献', module: '历史', moduleIcon: '📜', category: '典籍', path: '/lishi/wenxian', description: '四书五经，诸子百家，典籍宝库', tags: ['古籍', '经典', '文献'] },

  // 空间模块
  { name: '太虚境', module: '空间', moduleIcon: '🌌', category: '模块首页', path: '/yu/index', description: '三维空间，多维宇宙，三千世界奥秘', tags: ['空间', '宇宙', '维度'] },
  { name: '三十三重天', module: '空间', moduleIcon: '🌌', category: '三界', path: '/yu/sanjie', description: '三界六道，天人地三界结构详解', tags: ['三界', '六道', '诸天'] },
  { name: '洞天福地', module: '空间', moduleIcon: '🌌', category: '秘境', path: '/yu/dongtian', description: '三十六洞天，七十二福地，修真圣地', tags: ['洞天', '福地', '圣地'] },
  { name: '小千世界', module: '空间', moduleIcon: '🌌', category: '世界', path: '/yu/mijie', description: '芥子纳须弥，小千世界，掌中乾坤', tags: ['世界', '秘境', '小千'] },
  { name: '维度奥秘', module: '空间', moduleIcon: '🌌', category: '维度', path: '/yu/weidu', description: '高维空间，平行宇宙，时空奥秘', tags: ['维度', '平行', '时空'] },

  // 宙宇模块
  { name: '宙宇殿', module: '宙宇', moduleIcon: '⏳', category: '模块首页', path: '/zhou/index', description: '时间长河，因果轮回，宇宙终极奥秘', tags: ['时间', '因果', '轮回'] },
  { name: '时光穿梭', module: '宙宇', moduleIcon: '⏳', category: '时间', path: '/zhou/shiguang', description: '过去现在未来，时间长河逆流', tags: ['时间', '穿越', '时空'] },
  { name: '三世因果', module: '宙宇', moduleIcon: '⏳', category: '因果', path: '/zhou/yinguo', description: '善有善报恶有恶报，因果循环', tags: ['因果', '报应', '善恶'] },
  { name: '六道轮回', module: '宙宇', moduleIcon: '⏳', category: '轮回', path: '/zhou/lunhui', description: '生死轮回，业力牵引，转世投胎', tags: ['轮回', '生死', '转世'] },
  { name: '大预言术', module: '宙宇', moduleIcon: '⏳', category: '预言', path: '/zhou/yuce', description: '推背图，烧饼歌，古今预言大全', tags: ['预言', '推背图', '未来'] },

  // 山海模块
  { name: '山海阁', module: '山海', moduleIcon: '👹', category: '模块首页', path: '/hong/index', description: '山海经异兽，上古神魔，洪荒众生谱', tags: ['山海经', '神魔', '异兽'] },
  { name: '神兽图鉴', module: '洪荒', moduleIcon: '👹', category: '神兽', path: '/hong/shenshou', description: '龙生九子，四灵四凶，神兽大全', tags: ['神兽', '四灵', '瑞兽'] },
  { name: '妖魔谱', module: '洪荒', moduleIcon: '👹', category: '妖魔', path: '/hong/yaomo', description: '妖魔鬼怪，精怪异兽，万妖谱', tags: ['妖魔', '精怪', '鬼怪'] },
  { name: '上古传说', module: '洪荒', moduleIcon: '👹', category: '传说', path: '/hong/chuanshuo', description: '盘古开天，女娲补天，上古神话', tags: ['神话', '传说', '上古'] },
  { name: '洪荒奇书', module: '洪荒', moduleIcon: '👹', category: '典籍', path: '/hong/tushu', description: '山海经，封神榜，洪荒典籍', tags: ['奇书', '典籍', '秘籍'] },

  // 全站页面
  { name: '档案馆首页', module: '全局', moduleIcon: '🏠', category: '入口', path: '/home', description: '灵墟档案馆主入口，末法时代修真资料库', tags: ['首页', '入口', '档案馆'] },
  { name: '关于灵墟', module: '全局', moduleIcon: '🏠', category: '入口', path: '/about', description: '关于灵墟档案馆的一切', tags: ['关于', '介绍', '说明'] },
  { name: '全站地图', module: '全局', moduleIcon: '🗺️', category: '入口', path: '/map', description: '您现在所在的位置，全站导航中心', tags: ['地图', '导航', '索引'] },
]

const MODULE_COLORS: Record<string, string> = {
  '法器': '#c9a227',
  '天时': '#f0c040',
  '地理': '#22c55e',
  '玄学': '#a855f7',
  '修真': '#f97316',
  '历史': '#64748b',
  '空间': '#06b6d4',
  '宙宇': '#ec4899',
  '山海': '#ef4444',
  '全局': '#c9a227',
}

export default function SiteMapPage() {
  const [filtered, setFiltered] = useState(ALL_PAGES)

  const handleFilter = useCallback((data: typeof ALL_PAGES) => {
    setFiltered(data)
  }, [])

  return (
    <SubPageTemplate title="全站地图" colorRgb="139, 92, 246">
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.title}
          >
            🗺️ 灵墟档案馆 · 全站地图
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.subtitle}
          >
            八大模块 · {ALL_PAGES.length} 个修真知识库 · 一键直达
          </motion.p>
        </div>

        {/* 🔍 超级搜索筛选 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.filterWrapper}
        >
          <FilterBar
            data={ALL_PAGES}
            searchKeys={['name', 'module', 'category', 'description', 'tags']}
            filterOptions={[
              { key: 'module', label: '模块', allLabel: '全部模块' },
              { key: 'category', label: '分类', allLabel: '全部分类' },
            ]}
            onFiltered={handleFilter}
            placeholder="🔮 搜索页面名称、模块、标签、描述..."
          />
          <div className={styles.resultCount}>
            共找到 <span style={{ color: '#c9a227', fontWeight: 'bold' }}>{filtered.length}</span> / {ALL_PAGES.length} 个页面
          </div>
        </motion.div>

        {/* 📦 页面卡片网格 */}
        <div className={styles.grid}>
          {filtered.map((page, index) => (
            <motion.div
              key={page.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.01 * index }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <Link href={page.path} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.moduleIcon}>{page.moduleIcon}</span>
                  <span
                    className={styles.moduleBadge}
                    style={{
                      background: `${MODULE_COLORS[page.module]}20`,
                      color: MODULE_COLORS[page.module],
                    }}
                  >
                    {page.module}
                  </span>
                </div>

                <h3 className={styles.pageName}>{page.name}</h3>

                <p className={styles.pageDesc}>{page.description}</p>

                <div className={styles.tags}>
                  {page.tags.slice(0, 3).map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.categoryBadge}>{page.category}</span>
                  <span className={styles.goBtn}>进入 →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={styles.emptyState}>
            <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔮</span>
            <p>没有找到符合条件的页面...</p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>
              试试其他关键词，或者清除筛选条件
            </p>
          </div>
        )}
      </div>
    </SubPageTemplate>
  )
}
