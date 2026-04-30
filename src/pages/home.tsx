'use client'

import { MAIN_MODULES } from '@/lib/constants'
import { useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import XianxiaCard from '@/components/ui/XianxiaCard'
import { SEO } from '@/components/common/SEO'
import { PullToRefresh } from '@/hooks/useTouchGestures'
import { useTheme } from '@/context/ThemeContext'
import styles from './home.module.scss'

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 43758.5453
  return x - Math.floor(x)
}

function generateParticles() {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${seededRandom(i * 7 + 1) * 100}%`,
    top: `${seededRandom(i * 7 + 2) * 100}%`,
    width: 2 + seededRandom(i * 7 + 3) * 2,
    height: 2 + seededRandom(i * 7 + 3) * 2,
    yDist: 20 + seededRandom(i * 7 + 4) * 40,
    duration: 3 + seededRandom(i * 7 + 5) * 3,
    delay: seededRandom(i * 7 + 6) * 2,
  }))
}

const daoDeQuotes = [
  { text: '道生一', delay: 0.3 },
  { text: '一生二', delay: 0.6 },
  { text: '二生三', delay: 0.9 },
  { text: '三生万物', delay: 1.2 },
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('honghuang')
  }, [setTheme])

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -30])

  const particles = useMemo(() => generateParticles(), [])

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  return (
    <Layout showNav={true} transparentNav={true} showFooter={true}>
      <SEO
        title="灵墟档案馆"
        description="末法时代失落修行文明档案馆 - 收录中华玄学、历史、天文、地理等修真文化，探索天地玄黄宇宙洪荒的奥秘"
        keywords={["修仙", "玄学", "易经", "八字", "风水", "星宿", "历史", "修真", "传统文化", "灵墟", "末法时代"]}
      />
      <PullToRefresh onRefresh={() => window.location.reload()}>
        <div ref={containerRef} className={styles.container}>
        {/* Hero */}
        <motion.section className={styles.hero} style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}>
          <div className={styles.heroContent}>
            <motion.div className={styles.heroRune} animate={{ rotate: [0, 360], opacity: [0.5, 1, 0.5] }} transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, opacity: { duration: 3, repeat: Infinity } }}>
              ☯
            </motion.div>

            <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
              靈<span className={styles.titleSeparator}>　　</span>墟
            </motion.h1>

            <motion.div className={styles.heroSubtitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}>
              <span>末法时代 · 失落修行文明档案馆</span>
            </motion.div>

            <motion.div className={styles.scrollIndicator} initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.2, duration: 0.8 }}>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>↓</motion.div>
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
          <motion.div className={styles.philosophyContent} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <motion.blockquote className={styles.quote} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 }}>
              {daoDeQuotes.map((q) => (
                <motion.span key={q.text} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: q.delay, duration: 0.6 }}>
                  {q.text}<br />
                </motion.span>
              ))}
            </motion.blockquote>
            <motion.p className={styles.quoteSource} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.8, duration: 0.8 }}>
              —— 道德经 · 第二十五章
            </motion.p>
          </motion.div>
        </section>

        {/* 八大模块 */}
        <section className={styles.modulesSection}>
          <motion.div className={styles.sectionHeader} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
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
        </section>
        </div>
      </PullToRefresh>
    </Layout>
  )
}
