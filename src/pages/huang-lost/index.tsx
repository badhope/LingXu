/**
 * 荒境模块 - 失落修真文明首页
 */

'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

const SUB_MODULES = [
  { id: 'gongfa', name: '功法', icon: '📚', desc: '修真功法，心法口诀，锻体炼气', href: '/huang-lost/gongfa', color: '#d97706' },
  { id: 'danyao', name: '丹药', icon: '💊', desc: '仙丹灵药，固本培元，突破境界', href: '/huang-lost/danyao', color: '#ea580c' },
  { id: 'fabao', name: '法宝', icon: '⚔️', desc: '仙家法宝，本命法器，通天灵宝', href: '/huang-lost/fabao', color: '#c2410c' },
  { id: 'mishi', name: '秘事', icon: '🔮', desc: '修真秘闻，宗门轶事，远古辛密', href: '/huang-lost/mishi', color: '#9a3412' },
]

const FADE_UP = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export default function HuangLostIndexPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    ctx.scale(dpr, dpr)

    interface Particle {
      x: number
      y: number
      size: number
      vx: number
      vy: number
      life: number
      maxLife: number
      hue: number
    }

    const particles: Particle[] = []
    const particleCount = 120

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        life: Math.random(),
        maxLife: Math.random() * 100 + 100,
        hue: 30 + Math.random() * 20,
      })
    }

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleResize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      particles.forEach((p, i) => {
        p.life += 1
        if (p.life > p.maxLife) {
          p.x = Math.random() * window.innerWidth
          p.y = Math.random() * window.innerHeight
          p.life = 0
        }

        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150
          p.vx -= (dx / dist) * force * 0.02
          p.vy -= (dy / dist) * force * 0.02
        }

        p.x += p.vx
        p.y += p.vy

        p.vx *= 0.99
        p.vy *= 0.99

        const alpha = 0.5 * (1 - Math.abs((p.life / p.maxLife - 0.5) * 2))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${alpha})`
        ctx.fill()

        particles.slice(i + 1).forEach((p2) => {
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `hsla(${p.hue}, 60%, 50%, ${alpha * 0.15 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    let isMounted = true
    animate()

    return () => {
      isMounted = false
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      // ✅ 标准Canvas防泄漏
      try {
        if (canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          canvas.width = 0
          canvas.height = 0
        }
      } catch (e) {}
    }
  }, [])

  return (
    <Layout title="荒境" transparentNav>
      <canvas ref={canvasRef} className={styles.particlesCanvas} />

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.div initial={FADE_UP.initial} animate={FADE_UP.animate} transition={FADE_UP.transition}>
            <motion.div
              className={styles.heroIcon}
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              ✨
            </motion.div>
            <h1 className={styles.mainTitle}>荒境</h1>
            <p className={styles.subTitle}>
              <span>失落文明 · 修真传承 · 上古遗迹</span>
            </p>
          </motion.div>
        </div>
      </div>

      <div className={styles.modulesSection}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          修真传承
        </motion.h2>

        <div className={styles.modulesGrid}>
          {SUB_MODULES.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -8 }}
            >
              <Link href={mod.href} className={styles.moduleLink}>
                <div
                  className={styles.moduleCard}
                  style={{ '--module-color': mod.color } as React.CSSProperties}
                >
                  <div className={styles.cardIcon}>{mod.icon}</div>
                  <h3 className={styles.cardTitle}>{mod.name}</h3>
                  <p className={styles.cardDesc}>{mod.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.footerQuote}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          炼气筑基，金丹元婴，化神渡劫，羽化飞仙
        </motion.div>
      </div>
    </Layout>
  )
}
