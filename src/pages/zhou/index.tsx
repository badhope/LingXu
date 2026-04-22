'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import TimeRiverCanvas from '@/components/effects/TimeRiverCanvas'
import SixPathsWheel from '@/components/effects/SixPathsWheel'
import KarmaButterflyEffect from '@/components/effects/KarmaButterflyEffect'
import ProphecyTimeline from '@/components/effects/ProphecyTimeline'
import JuneFortunePanel from '@/components/effects/JuneFortunePanel'
import DragonBoatFestival from '@/components/effects/DragonBoatFestival'
import AuraTideSystem from '@/components/effects/AuraTideSystem'
import styles from './index.module.scss'

const EFFECT_SYSTEMS = [
  {
    id: 'aura',
    name: '灵气潮汐',
    icon: '🌊',
    desc: '每日时辰灵气值，子时修炼buff加成',
    color: '#3b82f6',
    component: 'AuraTideSystem',
    tags: ['实时', '修炼', '十二时辰'],
  },
  {
    id: 'fortune',
    name: '6月运势',
    icon: '⭐',
    desc: '十二生肖月度运程，每日宜忌黄历',
    color: '#eab308',
    component: 'JuneFortunePanel',
    tags: ['运势', '黄历', '生肖'],
  },
  {
    id: 'dragonboat',
    name: '端午驱邪',
    icon: '🐲',
    desc: '艾草符箓小游戏，龙舟水驱邪仪式',
    color: '#22c55e',
    component: 'DragonBoatFestival',
    tags: ['互动', '游戏', '节气'],
  },
  {
    id: 'shiguang',
    name: '时光长河',
    icon: '⌛',
    desc: '过去现在未来，时间轴3D可视化',
    color: '#8b5cf6',
    component: 'TimeRiverCanvas',
    tags: ['Canvas', '粒子', '历史'],
  },
  {
    id: 'lunhui',
    name: '六道轮回',
    icon: '♾️',
    desc: '生死流转，业力计算转生系统',
    color: '#ec4899',
    component: 'SixPathsWheel',
    tags: ['互动', '因果', '转生'],
  },
  {
    id: 'yinguo',
    name: '因果蝴蝶',
    icon: '🦋',
    desc: '善恶业力可视化，蝴蝶效应演示',
    color: '#06b6d4',
    component: 'KarmaButterflyEffect',
    tags: ['Canvas', '涟漪', '业力'],
  },
  {
    id: 'yuce',
    name: '预言时间线',
    icon: '🔮',
    desc: '古今预言应验度，天机推演',
    color: '#f59e0b',
    component: 'ProphecyTimeline',
    tags: ['时间线', '预言', '筛选'],
  },
]

const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
}

const ComponentMap: Record<string, React.ComponentType> = {
  AuraTideSystem,
  JuneFortunePanel,
  DragonBoatFestival,
  TimeRiverCanvas,
  SixPathsWheel,
  KarmaButterflyEffect,
  ProphecyTimeline,
}

export default function ZhouIndexPage() {
  const [activeSystem, setActiveSystem] = useState<string>('aura')

  const ActiveComponent = ComponentMap[activeSystem] || AuraTideSystem

  return (
    <Layout>
      <div className={styles.container}>
        <motion.div
          {...FADE_UP}
          transition={{ delay: 0.1 }}
          className={styles.header}
        >
          <h1 className={styles.title}>
            <span className={styles.titleIcon}>宙</span>
            时间维度
          </h1>
          <p className={styles.subtitle}>
            宙部 · 七大玄奇系统 · 探索时间的奥义
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={styles.systemNav}
        >
          {EFFECT_SYSTEMS.map((system, i) => (
            <motion.button
              key={system.id}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSystem(system.id)}
              className={`${styles.navCard} ${
                activeSystem === system.id ? styles.active : ''
              }`}
              style={{
                borderColor: activeSystem === system.id ? system.color : 'transparent',
              }}
              transition={{ delay: 0.1 * i }}
            >
              <span className={styles.navIcon}>{system.icon}</span>
              <span className={styles.navName}>{system.name}</span>
              <div className={styles.navTags}>
                {system.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSystem}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className={styles.displayArea}
          >
            {EFFECT_SYSTEMS.find(s => s.id === activeSystem) && (
              <div
                className={styles.systemHeader}
                style={{
                  background: `linear-gradient(135deg, ${EFFECT_SYSTEMS.find(s => s.id === activeSystem)!.color}20 0%, transparent 100%)`,
                }}
              >
                <h2 className={styles.systemTitle}>
                  {EFFECT_SYSTEMS.find(s => s.id === activeSystem)!.icon}
                  {EFFECT_SYSTEMS.find(s => s.id === activeSystem)!.name}
                </h2>
                <p className={styles.systemDesc}>
                  {EFFECT_SYSTEMS.find(s => s.id === activeSystem)!.desc}
                </p>
              </div>
            )}
            
            <div className={styles.componentWrapper}>
              <ActiveComponent />
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={styles.statsBar}
        >
          <div className={styles.statItem}>
            <span className={styles.statNumber}>7</span>
            <span className={styles.statLabel}>大特效系统</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>&infin;</span>
            <span className={styles.statLabel}>交互次数</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>修复完成</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>0</span>
            <span className={styles.statLabel}>运行时崩溃</span>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
