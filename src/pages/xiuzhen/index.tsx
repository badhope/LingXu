'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import XianxiaCard from '@/components/ui/XianxiaCard'
import { SEO } from '@/components/common/SEO'
import { useTheme } from '@/context/ThemeContext'
import { useLocalStorage } from '@/hooks'
import styles from './index.module.scss'

interface CultivationStats {
  lingqi: number
  realm: string
  checkinStreak: number
  totalDays: number
}

const XIUZHEN_MODULES = [
  {
    id: 'lishi',
    char: '史',
    name: '末法秘史',
    description: '洪荒至今的历史真相，仙凡棋局',
    href: '/xiuzhen/lishi',
  },
  {
    id: 'dongtian',
    char: '境',
    name: '洞天福地',
    description: '三山五岳，灵脉汇聚，仙山秘境',
    href: '/xiuzhen/dongtian',
  },
  {
    id: 'qiyu',
    char: '缘',
    name: '修真机缘',
    description: '叩问天机，随机奇遇，仙人点化',
    href: '/xiuzhen/qiyu',
  },
  {
    id: 'renwu',
    char: '任',
    name: '日常修行',
    description: '每日功课，周常任务，成就殿堂',
    href: '/xiuzhen/renwu',
  },
  {
    id: 'daolu',
    char: '道',
    name: '大道指引',
    description: '修仙入门指南，灵根检测，境界详解',
    href: '/xiuzhen/daolu',
  },
  {
    id: 'gongfa',
    char: '法',
    name: '功法宝库',
    description: '修真功法图鉴，心法秘籍，修炼指引',
    href: '/xiuzhen/gongfa',
  },
  {
    id: 'liandan',
    char: '丹',
    name: '炼丹阁',
    description: '丹方大全，炼丹模拟器，灵药图鉴',
    href: '/xiuzhen/liandan',
  },
  {
    id: 'lianqi',
    char: '器',
    name: '炼器阁',
    description: '法宝炼制，装备强化，天工开物',
    href: '/xiuzhen/lianqi',
  },
  {
    id: 'fulu',
    char: '符',
    name: '符箓堂',
    description: '符咒绘制，驱邪斗法，雷符镇魔',
    href: '/xiuzhen/fulu',
  },
  {
    id: 'zhenfa',
    char: '阵',
    name: '阵法殿',
    description: '布阵指南，阵法图鉴，周天星斗',
    href: '/xiuzhen/zhenfa',
  },
  {
    id: 'jishi',
    char: '时',
    name: '修真计时',
    description: '修炼计时，打坐入定，天劫倒计时',
    href: '/xiuzhen/jishi',
  },
  {
    id: 'cangbao',
    char: '藏',
    name: '藏宝阁',
    description: '储物纳戒，法宝收藏，灵药保管',
    href: '/xiuzhen/cangbao',
  },
]

const xiuZhenQuotes = [
  { text: '逆天而行', delay: 0.3 },
  { text: '与天争命', delay: 0.6 },
  { text: '漫漫仙途', delay: 0.9 },
  { text: '得道成仙', delay: 1.2 },
]

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 43758.5453
  return x - Math.floor(x)
}

function generateParticles() {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${seededRandom(i * 11 + 1) * 100}%`,
    top: `${seededRandom(i * 11 + 2) * 100}%`,
    width: 2 + seededRandom(i * 11 + 3) * 3,
    height: 2 + seededRandom(i * 11 + 3) * 3,
    yDist: 30 + seededRandom(i * 11 + 4) * 50,
    duration: 4 + seededRandom(i * 11 + 5) * 4,
    delay: seededRandom(i * 11 + 6) * 3,
  }))
}

const REALM_LEVELS: Record<string, number> = {
  '炼气': 10,
  '筑基': 20,
  '金丹': 40,
  '元婴': 60,
  '化神': 80,
}

export default function XiuZhenPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const { setTheme } = useTheme()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [stats] = useLocalStorage<CultivationStats>('cultivation-stats', {
    lingqi: 1580,
    realm: '筑基',
    checkinStreak: 7,
    totalDays: 49,
  })

  useEffect(() => {
    setTheme('xiuzhen')
  }, [setTheme])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getShiChen = () => {
    const hour = currentTime.getHours()
    const shichenNames = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
    const idx = Math.floor((hour + 1) / 2) % 12
    return shichenNames[idx] + '时'
  }

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50])

  const particles = useMemo(() => generateParticles(), [])

  return (
    <Layout showNav={true} transparentNav={true} showFooter={true}>
      <SEO
        title="修真大世界 - 灵墟档案馆"
        description="修真大世界 - 漫漫仙途，逆天而行，与天争命。炼丹、炼器、阵法、符箓，探索失落的修真文明"
        keywords={["修真", "修仙", "炼丹", "炼器", "阵法", "符箓", "功法", "洞天福地", "灵墟"]}
      />
      <div ref={containerRef} className={styles.container}>
        <motion.section className={styles.hero} style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}>
          <div className={styles.heroContent}>
            <motion.div className={styles.heroRune} animate={{ rotate: [0, 360], opacity: [0.5, 1, 0.5] }} transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, opacity: { duration: 4, repeat: Infinity } }}>
              ◈
            </motion.div>

            <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
              修<span className={styles.titleSeparator}>　　</span>真
            </motion.h1>

            <motion.div className={styles.heroSubtitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}>
              <span>漫漫仙途 · 逆天而行 · 与天争命</span>
            </motion.div>

            <motion.div className={styles.scrollIndicator} initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.2, duration: 0.8 }}>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>↓</motion.div>
              <span>踏破仙途</span>
            </motion.div>
          </div>

          <div className={styles.particles}>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className={styles.particle}
                style={{ left: p.left, top: p.top, width: p.width, height: p.height }}
                animate={{ y: [0, -p.yDist], opacity: [0, 0.6, 0] }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.section>

        <motion.section className={styles.cultivatorPanel} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className={styles.statusGrid}>
            <motion.div className={styles.statusCard} whileHover={{ scale: 1.02, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
              <div className={styles.statusHeader}>
                <span className={styles.statusIcon}>☯</span>
                <span className={styles.statusShichen}>{getShiChen()}</span>
              </div>
              <div className={styles.statusValue}>{stats.realm}</div>
              <div className={styles.statusLabel}>当前境界</div>
              <div className={styles.statusProgress}>
                <motion.div className={styles.statusProgressBar} initial={{ width: 0 }} animate={{ width: `${REALM_LEVELS[stats.realm] || 15}%` }} transition={{ duration: 2, delay: 0.5 }} />
              </div>
            </motion.div>

            <motion.div className={styles.statusCard} whileHover={{ scale: 1.02, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
              <div className={styles.statusHeader}>
                <span className={styles.statusIcon}>✨</span>
                <span className={styles.statusShichen}>灵气值</span>
              </div>
              <div className={styles.statusValue}>{stats.lingqi.toLocaleString()}</div>
              <div className={styles.statusLabel}>累积灵气</div>
              <div className={styles.statusProgress}>
                <motion.div className={styles.statusProgressBar} initial={{ width: 0 }} animate={{ width: `${Math.min(stats.lingqi / 500, 100)}%` }} transition={{ duration: 2, delay: 0.7 }} />
              </div>
            </motion.div>

            <motion.div className={styles.statusCard} whileHover={{ scale: 1.02, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
              <div className={styles.statusHeader}>
                <span className={styles.statusIcon}>🔥</span>
                <span className={styles.statusShichen}>第 {stats.totalDays} 天</span>
              </div>
              <div className={styles.statusValue}>{stats.checkinStreak}</div>
              <div className={styles.statusLabel}>连续签到</div>
              <div className={styles.statusProgress}>
                <motion.div className={styles.statusProgressBar} initial={{ width: 0 }} animate={{ width: `${Math.min(stats.checkinStreak * 10, 100)}%` }} transition={{ duration: 2, delay: 0.9 }} />
              </div>
            </motion.div>
          </div>
        </motion.section>

        <section className={styles.philosophySection}>
          <motion.div className={styles.philosophyContent} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <motion.blockquote className={styles.quote}>
              {xiuZhenQuotes.map((q) => (
                <motion.span key={q.text} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: q.delay, duration: 0.8 }}>
                  {q.text}<br />
                </motion.span>
              ))}
            </motion.blockquote>
            <motion.p className={styles.quoteSource} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.8, duration: 0.8 }}>
              —— 修真者箴言
            </motion.p>
          </motion.div>
        </section>

        <section className={styles.modulesSection}>
          <motion.div className={styles.sectionHeader} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className={styles.sectionTitleRow}>
              <span className={styles.sectionDivider} />
              <h2 className={styles.sectionTitle}>十二修真法门</h2>
              <span className={styles.sectionDivider} />
            </div>
            <p className={styles.sectionSubtitle}>道法丹器符阵劫藏，探索修真十二支脉</p>
          </motion.div>

          <div className={styles.modulesGrid}>
            {XIUZHEN_MODULES.map((module, index) => (
              <XianxiaCard
                key={module.id}
                char={module.char}
                title={module.name}
                description={module.description}
                href={module.href}
                index={index}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
