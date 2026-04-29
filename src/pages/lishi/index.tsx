/**
 * 历史模块 - 华夏文明首页
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
  { id: 'tools', name: '工具', icon: '🔮', desc: '历史时间轴，人物关系图谱', href: '/lishi/tools', color: '#d4af37', isNew: true },
  { id: 'chaodai', name: '朝代', icon: '🏛️', desc: '夏商周秦汉，魏晋南北朝，隋唐宋', href: '/lishi/chaodai', color: '#a16207' },
  { id: 'renwu', name: '人物', icon: '👑', desc: '帝王将相，诸子百家，英雄豪杰', href: '/lishi/renwu', color: '#854d0e' },
  { id: 'wenxian', name: '文献', icon: '📜', desc: '四书五经，二十四史，百家典籍', href: '/lishi/wenxian', color: '#ca8a04' },
  { id: 'mixin', name: '秘辛', icon: '🔍', desc: '历史谜团，宫廷秘闻，未解之谜', href: '/lishi/mixin', color: '#713f12' },
]

export default function LishiIndexPage() {
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
        hue: 40 + Math.random() * 15,
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
        ctx.fillStyle = `hsla(${p.hue}, 70%, 50%, ${alpha})`
        ctx.fill()

        particles.slice(i + 1).forEach((p2) => {
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `hsla(${p.hue}, 60%, 40%, ${alpha * 0.15 * (1 - d / 120)})`
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
    <SubPageTemplate title="历史" colorRgb="212, 175, 55">
      <canvas ref={canvasRef} className={styles.particlesCanvas} />

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              className={styles.heroIcon}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              📜
            </motion.div>
            <h1 className={styles.mainTitle}>历史</h1>
            <p className={styles.subTitle}>
              <span>华夏文明 · 上下五千年 · 以人为镜</span>
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
          青史留名
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
          以史为镜，可以知兴替；以人为镜，可以明得失
        </motion.div>
      </div>
    </SubPageTemplate>
  )
}
