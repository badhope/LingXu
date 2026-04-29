/**
 * 域界模块 - 空间维度首页
 */

'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import SubmoduleCard from '@/components/ui/SubmoduleCard'
import { FadeIn } from '@/components/ui/Animated'
import styles from './index.module.scss'

const SUB_MODULES = [
  { id: 'sanjie', name: '三界', icon: '🌌', desc: '天地人三界，六道轮回，十方世界', href: '/yu/sanjie', color: '#06b6d4' },
  { id: 'dongtian', name: '洞天', icon: '🏔️', desc: '三十六洞天，七十二福地，灵脉汇聚', href: '/yu/dongtian', color: '#22c55e' },
  { id: 'weidu', name: '维度', icon: '🔷', desc: '高维空间，平行世界，位面穿梭', href: '/yu/weidu', color: '#3b82f6' },
  { id: 'mijie', name: '密界', icon: '🌀', desc: '上古秘境，小千世界，遗迹探索', href: '/yu/mijie', color: '#a855f7' },
  { id: 'xingtu', name: '星图', icon: '⭐', desc: '周天星斗，诸天星域，星河地图', href: '/yu/xingtu', color: '#8b5cf6' },
  { id: 'chuansong', name: '传送', icon: '🚪', desc: '位面传送阵，跨界传送，空间跳跃', href: '/yu/chuansong', color: '#ec4899' },
  { id: 'qiankun', name: '乾坤', icon: '👝', desc: '储物空间，乾坤袋，须弥芥子', href: '/yu/qiankun', color: '#f59e0b' },
  { id: 'crack', name: '裂缝', icon: '⚡', desc: '空间裂缝，次元乱流，虚空漫游', href: '/yu/crack', color: '#ef4444' },
]

export default function YuIndexPage() {
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
        hue: 180 + Math.random() * 30,
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
        ctx.fillStyle = `hsla(${p.hue}, 80%, 50%, ${alpha * 0.6})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `hsla(${p.hue}, 70%, 50%, ${0.15 * (1 - d / 120)})`
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
    <SubPageTemplate title="域界" colorRgb="6, 182, 212">
      <canvas ref={canvasRef} className={styles.particlesCanvas} />

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              className={styles.heroIcon}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              🌌
            </motion.div>
            <h1 className={styles.mainTitle}>域界</h1>
            <p className={styles.subTitle}>
              <span>三界六道 · 洞天福地 · 多维宇宙 · 须弥芥子</span>
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
          空间奥秘
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
    </SubPageTemplate>
  )
}
