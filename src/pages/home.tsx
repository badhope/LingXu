/**
 * ============================================================================
 *                           灵墟档案馆 - 首页
 * ============================================================================
 * 
 * 【页面定位】
 * 这是用户进入网站看到的第一个页面！
 * 整个网站的门面，仪式感的入口
 * 
 * 【视觉设计】
 * ✨ 巨型单字设计：靈 + 墟，居中震撼展示
 * ✨ 道德经开篇：道生一，一生二...逐字显现
 * ✨ 八大模块：天地玄黄宇宙洪荒，排成网格
 * ✨ 视差滚动：滚动时Hero区域渐隐消失
 * ✨ 种子随机：SSR和客户端粒子位置一致
 * 
 * 【⚠️ 代码债务 - 待修复】
 * 🐛 MODULES数组与 constants.ts 中的 MAIN_MODULES 重复定义！
 *    应该统一引用 MAIN_MODULES，不要硬编码第二遍
 * 
 * 【核心技术】
 * ✅ Framer Motion useScroll 视差滚动
 * ✅ CSS Grid 响应式模块卡片
 * ✅ seededRandom 种子随机（消除SSR hydration mismatch）
 * ✅ Google Fonts - Noto Serif SC 宋体
 */

'use client'

import { MAIN_MODULES } from '@/lib/constants'
import { useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import XianxiaCard from '@/components/ui/XianxiaCard'
import SeoHead from '@/components/common/SeoHead'
import styles from './home.module.scss'

/** 确定性伪随机（SSR/客户端一致，无 Hydration Mismatch） */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 43758.5453
  return x - Math.floor(x)
}

/** 生成固定粒子数据 */
function generateParticles() {
  return Array.from({ length: 30 }, (_, i) => ({
    left: `${seededRandom(i * 7 + 1) * 100}%`,
    top: `${seededRandom(i * 7 + 2) * 100}%`,
    width: `${2 + seededRandom(i * 7 + 3) * 4}px`,
    height: `${2 + seededRandom(i * 7 + 4) * 4}px`,
    delay: seededRandom(i * 7 + 5) * 3,
    duration: 3 + seededRandom(i * 7 + 6) * 4,
    yDist: 30 + seededRandom(i * 7 + 7) * 50,
    id: i,
  }))
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50])

  const particles = useMemo(() => generateParticles(), [])

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  const daoDeQuotes = [
    { text: '道生一', delay: 0.5 },
    { text: '一生二', delay: 1.2 },
    { text: '二生三', delay: 1.9 },
    { text: '三生万物', delay: 2.6 },
  ]

  return (
    <Layout showNav={true} transparentNav={true} showFooter={true}>
      <SeoHead
        title="灵墟档案馆"
        description="末法时代失落修行文明档案馆 - 收录中华玄学、历史、天文、地理等修真文化，探索天地玄黄宇宙洪荒的奥秘"
        keywords="修仙,玄学,易经,八字,风水,星宿,历史,修真,传统文化,灵墟,末法时代"
      />
      <div ref={containerRef} className={styles.container}>
        {/* Hero */}
        <motion.section className={styles.hero} style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}>
          <div className={styles.heroContent}>
            <motion.div className={styles.heroRune} animate={{ rotate: [0, 360], opacity: [0.5, 1, 0.5] }} transition={{ rotate: { duration: 60, repeat: Infinity, ease: 'linear' }, opacity: { duration: 4, repeat: Infinity } }}>
              ☯
            </motion.div>

            <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
              靈<span className={styles.titleSeparator}>　　</span>墟
            </motion.h1>

            <motion.div className={styles.heroSubtitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
              <span>末法时代 · 失落修行文明档案馆</span>
            </motion.div>

            <motion.div className={styles.scrollIndicator} initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.8, duration: 1 }}>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>↓</motion.div>
              <span>向下探索</span>
            </motion.div>
          </div>

          {/* 固定粒子 */}
          <div className={styles.particles}>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className={styles.particle}
                style={{ left: p.left, top: p.top, width: p.width, height: p.height }}
                animate={{ y: [0, -p.yDist], opacity: [0, 0.8, 0] }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.section>

        {/* 哲学 */}
        <section className={styles.philosophySection}>
          <motion.div className={styles.philosophyContent} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-200px' }} transition={{ duration: 2, ease: 'easeOut' }}>
            <motion.blockquote className={styles.quote} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-200px' }} transition={{ duration: 2.5, delay: 0.3, ease: 'easeOut' }}>
              {daoDeQuotes.map((q) => (
                <motion.span key={q.text} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: q.delay, duration: 1 }}>
                  {q.text}<br />
                </motion.span>
              ))}
            </motion.blockquote>
            <motion.p className={styles.quoteSource} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 3.5, duration: 1.5 }}>
              —— 道德经 · 第二十五章
            </motion.p>
          </motion.div>
        </section>

        {/* 模块 */}
        <section className={styles.modulesSection}>
          <motion.div className={styles.sectionHeader} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}>
            <div className={styles.sectionTitleRow}>
              <span className={styles.sectionDivider} />
              <h2 className={styles.sectionTitle}>天地玄黄 · 宇宙洪荒</h2>
              <span className={styles.sectionDivider} />
            </div>
            <p className={styles.sectionSubtitle}>八字开启灵墟档案馆，探索失落的修行世界</p>
          </motion.div>

          <div 
            className={styles.modulesGrid}
            style={{ 
              perspective: '2000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {MAIN_MODULES.map((module, index) => (
              <XianxiaCard
                key={module.char}
                char={module.char}
                title={module.name}
                description={module.description}
                href={'/' + module.id}
                index={index}
              />
            ))}
          </div>

          {/* 🗺️ 新增: 快速入口区域 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            style={{ marginTop: '3rem' }}
          >
            <div className={styles.quickNavTitle}>⚡ 快速传送阵</div>
            <div className={styles.quickNavGrid}>
              <Link href="/map" className={styles.quickNavItem}>
                <span className={styles.quickNavIcon}>🗺️</span>
                <span>全站地图</span>
                <span className={styles.quickNavDesc}>47 个页面</span>
              </Link>
              <Link href="/about" className={styles.quickNavItem}>
                <span className={styles.quickNavIcon}>📖</span>
                <span>关于灵墟</span>
                <span className={styles.quickNavDesc}>档案馆介绍</span>
              </Link>
              <Link href="/tian/xingxiu" className={styles.quickNavItem}>
                <span className={styles.quickNavIcon}>⭐</span>
                <span>二十八星宿</span>
                <span className={styles.quickNavDesc}>28星宿详解</span>
              </Link>
              <Link href="/di/fengshui" className={styles.quickNavItem}>
                <span className={styles.quickNavIcon}>☯️</span>
                <span>风水绝学</span>
                <span className={styles.quickNavDesc}>15种形煞化解</span>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  )
}
