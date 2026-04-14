/**
 * ============================================================================
 *                         灵墟档案馆 - 子页面粒子背景
 * ============================================================================
 * 
 * 【组件定位】
 * 给所有子页面用的轻量级粒子背景
 * 比主页的 EpicBackground 简单，性能更好
 * 
 * 【与 EpicBackground 的区别】
 * 
 *    EpicBackground         PageBackground
 *    ─────────────────      ───────────────
 *    400 颗星星             50 颗粒子
 *    星云 + 暗角 + 胶片      只有飘动粒子
 *    鼠标视差交互            无交互
 *    全屏 Canvas            可嵌入容器
 *    
 *    📍 首页用               📍 所有子页面用
 * 
 * 【技术实现】
 * ✅ 每个模块可以自定义粒子颜色
 * ✅ 粒子数量可配置
 * ✅ 粒子缓慢漂浮，边界循环
 * ✅ 每个粒子有独立的透明度和速度
 */

'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * 【配置参数】
 * @param children      - 页面内容（被包在背景上）
 * @param colorRgb      - 粒子颜色，RGB格式（默认金色：'201, 162, 39'）
 * @param particleCount - 粒子数量（默认50颗）
 */
interface PageBackgroundProps {
  children: ReactNode
  colorRgb?: string
  particleCount?: number
}

export default function PageBackground({
  children,
  colorRgb = '201, 162, 39',
  particleCount = 50,
}: PageBackgroundProps) {
  const particlesRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    ctx.scale(dpr, dpr)

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.4 + 0.15,
      speed: Math.random() * 0.3 + 0.1,
      angle: Math.random() * Math.PI * 2,
    }))

    let time = 0
    let animId: number

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      time += 0.01

      particles.forEach((p) => {
        p.x += Math.cos(p.angle) * p.speed
        p.y += Math.sin(p.angle) * p.speed

        if (p.x < 0) p.x = window.innerWidth
        if (p.x > window.innerWidth) p.x = 0
        if (p.y < 0) p.y = window.innerHeight
        if (p.y > window.innerHeight) p.y = 0

        const pulse = 0.7 + Math.sin(time * 2 + p.x * 0.01) * 0.3

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${colorRgb}, ${p.alpha * pulse})`
        ctx.fill()
      })

      animId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animId)
  }, [colorRgb, particleCount])

  return (
    <>
      <canvas
        ref={particlesRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {children}
    </>
  )
}

export function MotionHeader({ children }: { children: ReactNode }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {children}
    </motion.header>
  )
}

export function MotionSection({ children, delay = 0.3 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}