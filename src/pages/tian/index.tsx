/**
 * 灵墟 - 天时模块首页
 * 包含星宿、运势、节气、占卜四大功能
 */

'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import SubmoduleCard from '@/components/ui/SubmoduleCard'
import { FadeIn } from '@/components/ui/Animated'
import Link from 'next/link'
import styles from './index.module.scss'

const SUB_MODULES = [
  {
    id: 'xingxiu',
    name: '星宿',
    icon: '⭐',
    desc: '二十八星宿，本命查询',
    href: '/tian/xingxiu',
    color: '#66ccff',
  },
  {
    id: 'yunshi',
    name: '运势',
    icon: '🌟',
    desc: '生肖星座，每日详解',
    href: '/tian/yunshi',
    color: '#a78bfa',
  },
  {
    id: 'jieqi',
    name: '节气',
    icon: '🌾',
    desc: '二十四节气，养生民俗',
    href: '/tian/jieqi',
    color: '#22c55e',
  },
  {
    id: 'zhanbu',
    name: '占卜',
    icon: '🎴',
    desc: '观音灵签，关帝灵签',
    href: '/tian/zhanbu',
    color: '#f59e0b',
  },
  {
    id: 'huangdao',
    name: '择日',
    icon: '📅',
    desc: '黄道吉日，吉时查询',
    href: '/tian/huangdao',
    color: '#ec4899',
    isNew: true,
  },
  {
    id: 'yuexiang',
    name: '月相',
    icon: '🌙',
    desc: '月相盈亏，潮汐预报',
    href: '/tian/yuexiang',
    color: '#8b5cf6',
    isNew: true,
  },
  {
    id: 'tools',
    name: '工具',
    icon: '🔧',
    desc: '万年历，阴阳历转换',
    href: '/tian/tools',
    color: '#06b6d4',
    isNew: true,
  },
  {
    id: 'zhouyi',
    name: '周易',
    icon: '🌀',
    desc: '六十四卦，铜钱起卦',
    href: '/tian/zhouyi',
    color: '#8b5cf6',
    isNew: true,
  },
  {
    id: 'taluo',
    name: '塔罗',
    icon: '🎴',
    desc: '七十八张，牌阵占卜',
    href: '/tian/taluo',
    color: '#ec4899',
    isNew: true,
  },
]

export default function TianIndexPage() {
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
        hue: 200 + Math.random() * 60,
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
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${alpha * 0.6})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `hsla(${p.hue}, 60%, 60%, ${0.15 * (1 - d / 120)})`
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
    <SubPageTemplate title="天时" subtitle="天时星宿，择日占卜，二十四节气" colorRgb="59, 130, 246">
      <canvas ref={canvasRef} className={styles.particlesCanvas} />

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              className={styles.heroIcon}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 1, -1, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              🌌
            </motion.div>
            <h1 className={styles.mainTitle}>天时</h1>
            <p className={styles.subTitle}>
              <span>天道运行 · 星辰变化 · 观测天象 · 推演气运</span>
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
          探索天机
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
