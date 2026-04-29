'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './ToolsHall.module.scss'

const TOOLS = [
  {
    id: 'luopan',
    name: '风水罗盘',
    icon: '🧭',
    description: '三合三元八宅合一，杨救贫真传罗经。专业级二十四山多层圈层，支持物理惯性阻尼旋转',
    history: '源自黄帝指南车，经九天玄女授术，传至唐末杨筠松化为三盘三针，为堪舆家至尊法器',
    color: '#d4af37',
    glow: 'rgba(212, 175, 55, 0.4)',
    path: '/tools/luopan',
    status: 'ready',
    features: ['8层专业圈层', '惯性旋转', '坐向自动计算'],
  },
  {
    id: 'bagua',
    name: '八卦占卜',
    icon: '🪙',
    description: '文王金钱卦，京房纳甲嫡传。三枚乾隆通宝通灵起卦，解六十四卦三百八十四爻天机',
    history: '肇始于伏羲画卦，周文王囚羑里而演易，孔子作十翼以明道，乃五经之首，大道之源',
    color: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.4)',
    path: '/tools/bagua',
    status: 'ready',
    features: ['三枚铜钱动画', '变爻高亮', '卦辞详解'],
  },
  {
    id: 'liuyao',
    name: '六爻断事',
    icon: '⚡',
    description: '京房纳甲，火珠林正法。六亲六神世应装配，旺衰休囚死一目了然',
    history: '汉京房创纳甲筮法，以六十四卦配六十甲子，装六亲配六神，断吉凶如观掌纹',
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.4)',
    path: '/tools/liuyao',
    status: 'ready',
    features: ['纳甲装卦', '六亲六神', '用神选择'],
  },
  {
    id: 'calendar',
    name: '天时历法',
    icon: '🌙',
    description: '颛顼通胜黄历，董公择日要诀。二十四节气、月相演示、真太阳时精密换算',
    history: '羲和占日，常仪占月，观象授时四千六百余年。择吉避凶，顺天应人',
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.4)',
    path: '/tools/calendar',
    status: 'ready',
    features: ['通胜黄历', '实时月相', '十二神择吉'],
  },
  {
    id: 'bazi',
    name: '八字命理',
    icon: '📊',
    description: '徐子平四柱命理，滴天髓真诠。十神配置、大运流年、五行强弱雷达可视化',
    history: '起于李虚中三柱，成于徐子平四柱，以年月日时四柱天干地支，推论人一生吉凶祸福',
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)',
    path: '/tools/bazi',
    status: 'ready',
    features: ['四柱排盘', '五行分布', '大运走势'],
  },
  {
    id: 'xingxiu',
    name: '星象观测',
    icon: '⭐',
    description: '甘石星经，二十八宿体系。三垣四象、实时星图、本命星宿查询',
    history: '高辛氏有二子，伯曰阏伯主辰，季曰实沈主参。夜观天象以知人事休咎，占星术之源也',
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.4)',
    path: '/tools/xingxiu',
    status: 'ready',
    features: ['三垣四象', '二十八宿', '本命星宿'],
  },
  {
    id: 'fulu',
    name: '符箓道法',
    icon: '📜',
    description: '祖天师正一符箓，玄门日诵早课。朱砂画符、咒语手决、六十四道灵符绘制',
    history: '张道陵创正一符箓，朱笔画符，诵咒掐诀，可召神遣将，驱邪治病。箓者，录诸天鬼神之名号也',
    color: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.4)',
    path: '/tools/fulu',
    status: 'ready',
    features: ['朱砂画符', '咒语存思', '手决图典'],
  },
  {
    id: 'liandan',
    name: '丹药养生',
    icon: '⚗️',
    description: '周易参同契丹道，九转还丹模拟器。文武火候调控，十二本草灵药炼制',
    history: '魏伯阳著《参同契》，为万古丹经王。以易象喻丹道，火候进退，药物老嫩，皆在其中。修仙之径，不外金丹大道',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    path: '/tools/liandan',
    status: 'ready',
    features: ['九转炼丹', '文武火候', '十二本草'],
  },
  {
    id: 'zhenfa',
    name: '阵法大全',
    icon: '🌀',
    description: '风后握奇经，十大古阵推演。八卦阵图、八门生克、先天阵法发动',
    history: '风后演握奇，经曰：大阵包小阵，大营包小营。四为正，四为奇，余奇为握机。奇门遁甲之源也',
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)',
    path: '/tools/zhenfa',
    status: 'ready',
    features: ['十大古阵', '八卦八门', '阵图发动'],
  },
]

export default function ToolsHall() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  return (
    <div className={styles.hallContainer}>
      <motion.div
        className={styles.hallHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={styles.hallTitle}>
          <span className={styles.titleEmblem}>🏛️</span>
          灵墟法器阁
        </h1>
        <p className={styles.hallSubtitle}>
          九大上古玄门道器，参悟天地乾坤奥秘
        </p>
      </motion.div>

      <div className={styles.toolsGrid}>
        {TOOLS.map((tool, index) => (
          <Link 
            key={tool.id}
            href={tool.status === 'ready' ? tool.path : '#'} 
            style={{ textDecoration: 'none', cursor: tool.status === 'ready' ? 'pointer' : 'default' }}
            aria-label={`${tool.name}：${tool.description}`}
            tabIndex={tool.status === 'ready' ? 0 : -1}
          >
            <motion.div
              className={`${styles.toolCard} ${tool.status === 'coming' ? styles.comingSoon : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredTool(tool.id)}
              onMouseLeave={() => setHoveredTool(null)}
              onFocus={() => setHoveredTool(tool.id)}
              onBlur={() => setHoveredTool(null)}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              whileFocus={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              style={{
                boxShadow: hoveredTool === tool.id 
                  ? `0 0 60px ${tool.glow}, 0 20px 40px rgba(0,0,0,0.4)`
                  : '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            >
            {tool.status === 'coming' && (
              <div className={styles.comingBadge}>即将开放</div>
            )}
            
            {tool.status === 'ready' && (
              <div className={styles.readyBadge}>✨ 已开放</div>
            )}

            <motion.div 
              className={styles.toolIcon}
              animate={hoveredTool === tool.id ? {
                scale: [1, 1.1, 1],
                rotate: [0, 3, -3, 0],
              } : {}}
              transition={{ 
                duration: 2,
                repeat: hoveredTool === tool.id ? Infinity : 0,
              }}
              style={{
                background: `radial-gradient(circle, ${tool.glow} 0%, transparent 70%)`,
              }}
            >
              {tool.icon}
            </motion.div>

            <h3 className={styles.toolName} style={{ color: tool.color }}>
              {tool.name}
            </h3>

            <p className={styles.toolDescription}>
              {tool.description}
            </p>

            <div className={styles.toolHistory}>
              <span className={styles.historyIcon}>📜</span>
              <p className={styles.historyText}>{tool.history}</p>
            </div>

            <div className={styles.features}>
              {tool.features.map((f, i) => (
                <span key={i} className={styles.featureTag}>
                  {f}
                </span>
              ))}
            </div>

            {tool.status === 'ready' && (
              <Link href={tool.path} className={styles.enterButton}>
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  进入法器 →
                </motion.span>
              </Link>
            )}

            {tool.status === 'coming' && (
              <div className={styles.comingButton}>
                敬请期待
              </div>
            )}
          </motion.div>
          </Link>
        ))}
      </div>

      <motion.div
        className={styles.hintBanner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        💡 提示：罗盘支持鼠标拖动旋转，带真实物理惯性阻尼效果
      </motion.div>
    </div>
  )
}
