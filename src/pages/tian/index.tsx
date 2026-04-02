/**
 * 灵墟 - 天时模块首页
 * 包含星宿、运势、节气、占卜四大功能
 */

'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

const SUB_MODULES = [
  { 
    id: 'xingxiu', 
    name: '星宿', 
    icon: '⭐', 
    desc: '二十八星宿，三垣四象',
    href: '/tian/xingxiu',
    color: '#f0c040'
  },
  { 
    id: 'yunshi', 
    name: '运势', 
    icon: '🌟', 
    desc: '每日运势，流年推演',
    href: '/tian/yunshi',
    color: '#e879f9'
  },
  { 
    id: 'jieqi', 
    name: '节气', 
    icon: '🌾', 
    desc: '二十四节气，养生之道',
    href: '/tian/jieqi',
    color: '#4ade80'
  },
  { 
    id: 'zhanbu', 
    name: '占卜', 
    icon: '🎴', 
    desc: '铜钱卦象，预知吉凶',
    href: '/tian/zhanbu',
    color: '#818cf8'
  },
]

export default function TianIndexPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 星座连线动画
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = 300 * dpr
    ctx.scale(dpr, dpr)

    interface Star {
      x: number; y: number; size: number; alpha: number
      speedX: number; speedY: number; twinkle: boolean
    }

    const stars: Star[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * 300,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      twinkle: Math.random() > 0.6
    }))

    // 星座连线点
    const constellationPoints = [
      { x: 0.2, y: 0.5 }, { x: 0.3, y: 0.3 }, { x: 0.4, y: 0.4 },
      { x: 0.5, y: 0.2 }, { x: 0.6, y: 0.35 }, { x: 0.7, y: 0.25 },
      { x: 0.8, y: 0.45 }
    ].map(p => ({ x: p.x * window.innerWidth, y: p.y * 300 }))

    let animId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.02

      // 绘制星空
      stars.forEach(star => {
        star.x += star.speedX
        star.y += star.speedY
        if (star.x < 0 || star.x > window.innerWidth) star.speedX *= -1
        if (star.y < 0 || star.y > 300) star.speedY *= -1
        if (star.twinkle) {
          star.alpha = 0.3 + Math.sin(time * 2) * 0.3
        }
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240, 192, 64, ${star.alpha})`
        ctx.fill()
      })

      // 绘制星座连线
      ctx.beginPath()
      ctx.moveTo(constellationPoints[0].x, constellationPoints[0].y)
      constellationPoints.forEach((p, i) => {
        if (i > 0) ctx.lineTo(p.x, p.y)
      })
      ctx.strokeStyle = `rgba(240, 192, 64, ${0.15 + Math.sin(time) * 0.1})`
      ctx.lineWidth = 1
      ctx.stroke()

      // 星座节点发光
      constellationPoints.forEach((p, i) => {
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 8 + Math.sin(time + i) * 3)
        glow.addColorStop(0, `rgba(240, 192, 64, ${0.4 + Math.sin(time + i) * 0.2})`)
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(p.x, p.y, 8 + Math.sin(time + i) * 3, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
      })

      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <Layout title="天时">
      {/* 顶部星空动画 */}
      <div className={styles.heroArea}>
        <canvas ref={canvasRef} className={styles.starCanvas} />
        <div className={styles.heroOverlay}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.mainTitle}>天时</h1>
            <p className={styles.subTitle}>天道运行 · 星辰变化 · 观测天象 · 推演气运</p>
          </motion.div>
        </div>
      </div>

      <div className={styles.container}>
        {/* 模块导航 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>探索天机</h2>
          <div className={styles.cardGrid}>
            {SUB_MODULES.map((mod, i) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link href={mod.href} className={styles.card} style={{ '--accent': mod.color } as React.CSSProperties}>
                  <span className={styles.cardIcon}>{mod.icon}</span>
                  <h3 className={styles.cardName}>{mod.name}</h3>
                  <p className={styles.cardDesc}>{mod.desc}</p>
                  <div className={styles.cardArrow}>→</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 天时文化介绍 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>天时之道</h2>
          <div className={styles.introGrid}>
            <motion.div
              className={styles.introCard}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3>☁️ 天象观测</h3>
              <p>自古以来，中华先民便通过观察天象来预测吉凶、指导农时。二十八星宿、紫微斗数、七政四余，皆是古人智慧的结晶。</p>
            </motion.div>
            <motion.div
              className={styles.introCard}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3>🌟 运势推演</h3>
              <p>根据天干地支、五行生克，配合流年运势，可推演出一生的命运轨迹。知晓运势，方能趋吉避凶，把握时机。</p>
            </motion.div>
            <motion.div
              className={styles.introCard}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3>🌾 节气养生</h3>
              <p>二十四节气是中华农耕文明的瑰宝。顺应节气，调养身心，是古人的养生智慧。不同节气，有不同的养生之道。</p>
            </motion.div>
            <motion.div
              className={styles.introCard}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3>🎴 占卜问卦</h3>
              <p>占卜是人与天沟通的桥梁。通过卦象，可知过去未来，晓吉凶祸福。诚心问卜，自有天意指引。</p>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
