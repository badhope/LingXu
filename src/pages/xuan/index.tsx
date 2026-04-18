/**
 * 玄部 - 玄学模块首页
 */

'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

const SUB_MODULES = [
  { id: 'yijing', name: '易经', icon: '☯', desc: '六十四卦，天人合一', href: '/xuan/yijing', color: '#c9a227' },
  { id: 'tools', name: '工具', icon: '🔮', desc: '梅花易数，奇门遁甲', href: '/xuan/tools', color: '#d4af37', isNew: true },
  { id: 'bazi', name: '八字', icon: '❋', desc: '四柱命理，五行生克', href: '/xuan/bazi', color: '#ef4444' },
  { id: 'liuyao', name: '六爻', icon: '☲', desc: '铜钱起卦，预知吉凶', href: '/xuan/liuyao', color: '#8b5cf6' },
  { id: 'fulu', name: '符箓', icon: '⚡', desc: '道教符箓，祝由十三科', href: '/xuan/fulu', color: '#f97316' },
]

const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export default function XuanIndexPage() {
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
        hue: 45 + Math.random() * 20,
      })
    }

    let animId: number
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.life += 1

        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          p.vx -= dx * 0.0008
          p.vy -= dy * 0.0008
        }

        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1

        const alpha = 0.5 * (1 - Math.abs((p.life / p.maxLife - 0.5) * 2))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 50%, ${alpha * 0.6})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `hsla(${p.hue}, 60%, 50%, ${0.15 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animId = requestAnimationFrame(animate)
    }

    let isMounted = true
    animate()

    return () => {
      isMounted = false
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      
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
    <Layout title="玄学" transparentNav>
      <canvas ref={canvasRef} className={styles.particlesCanvas} />

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.div initial={FADE_UP.initial} animate={FADE_UP.animate} transition={FADE_UP.transition}>
            <motion.div
              className={styles.heroIcon}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              ☯
            </motion.div>
            <h1 className={styles.mainTitle}>玄学</h1>
            <p className={styles.subTitle}>
              <span>易经八卦 · 奇门遁甲 · 通神明之德 · 类万物之情</span>
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
          玄学秘术
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
                  <div className={styles.moduleGlow} />
                  <motion.div
                    className={styles.moduleIcon}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                  >
                    {mod.icon}
                  </motion.div>
                  <h3 className={styles.moduleName}>{mod.name}</h3>
                  <p className={styles.moduleDesc}>{mod.desc}</p>
                  <motion.div
                    className={styles.moduleArrow}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
