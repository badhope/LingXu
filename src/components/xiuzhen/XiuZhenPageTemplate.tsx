'use client'

import { useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import { SEO } from '@/components/common/SEO'
import { useTheme } from '@/context/ThemeContext'
import styles from './XiuZhenPageTemplate.module.scss'

interface XiuZhenPageTemplateProps {
  title: string
  subtitle: string
  rune: string
  description?: string
  keywords?: string[]
  children: React.ReactNode
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 43758.5453
  return x - Math.floor(x)
}

function generateParticles() {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${seededRandom(i * 13 + 1) * 100}%`,
    top: `${seededRandom(i * 13 + 2) * 100}%`,
    width: 2 + seededRandom(i * 13 + 3) * 2,
    height: 2 + seededRandom(i * 13 + 3) * 2,
    yDist: 25 + seededRandom(i * 13 + 4) * 35,
    duration: 3.5 + seededRandom(i * 13 + 5) * 3.5,
    delay: seededRandom(i * 13 + 6) * 2.5,
  }))
}

export default function XiuZhenPageTemplate({
  title,
  subtitle,
  rune,
  description,
  keywords = [],
  children,
}: XiuZhenPageTemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('xiuzhen')
  }, [setTheme])

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -40])

  const particles = useMemo(() => generateParticles(), [])

  return (
    <Layout showNav={true} transparentNav={true} showFooter={true}>
      <SEO
        title={`${title} - 修真大世界 - 灵墟档案馆`}
        description={description || subtitle}
        keywords={["修真", "修仙", ...keywords]}
      />
      <div ref={containerRef} className={styles.container}>
        <motion.section className={styles.hero} style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}>
          <div className={styles.heroContent}>
            <motion.div className={styles.heroRune} animate={{ rotate: [0, 360], opacity: [0.5, 1, 0.5] }} transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, opacity: { duration: 5, repeat: Infinity } }}>
              {rune}
            </motion.div>

            <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
              {title}
            </motion.h1>

            <motion.div className={styles.heroSubtitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}>
              <span>{subtitle}</span>
            </motion.div>

            <motion.div className={styles.scrollIndicator} initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.2, duration: 0.8 }}>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>↓</motion.div>
              <span>探索仙途</span>
            </motion.div>
          </div>

          <div className={styles.particles}>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className={styles.particle}
                style={{ left: p.left, top: p.top, width: p.width, height: p.height }}
                animate={{ y: [0, -p.yDist], opacity: [0, 0.5, 0] }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.section>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </Layout>
  )
}
