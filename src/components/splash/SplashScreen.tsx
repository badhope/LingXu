/**
 * 灵墟 - 启动页组件
 * LingXu Splash Screen
 */

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE_CONFIG, WORLD_LORE } from '@/lib/constants'
import { useAppStore } from '@/stores/appStore'
import styles from './SplashScreen.module.scss'

interface SplashScreenProps {
  autoRedirect?: boolean
  redirectDelay?: number
}

export default function SplashScreen({
  autoRedirect = true,
  redirectDelay = 5000,
}: SplashScreenProps) {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('正在连接灵墟...')
  const setIsSplashCompleted = useAppStore(state => state.setIsSplashCompleted)
  const [showContent, setShowContent] = useState(false)
  
  // 加载文本序列
  const loadingTexts = [
    '正在连接灵墟...',
    '感应天地灵气...',
    '解锁历史封印...',
    '加载修行档案...',
    '准备进入...',
  ]
  
  // 初始化粒子系统
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
      vx: number
      vy: number
      radius: number
      alpha: number
      color: string
      life: number
      maxLife: number
    }
    
    const particles: Particle[] = []
    const maxParticles = 200
    
    // 颜色配置
    const colors = [
      'rgba(201, 162, 39, 0.8)',   // 金色
      'rgba(240, 192, 64, 0.6)',   // 亮金
      'rgba(168, 132, 30, 0.5)',   // 暗金
      'rgba(255, 255, 255, 0.4)',  // 白色
    ]
    
    // 创建粒子
    const createParticle = (): Particle => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 1 - 0.5,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.8 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 200 + 100,
    })
    
    // 初始化粒子
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle())
    }
    
    // 绘制太极
    const drawTaiji = (cx: number, cy: number, radius: number, rotation: number) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(rotation)
      
      // 外发光
      const gradient = ctx.createRadialGradient(0, 0, radius * 0.8, 0, 0, radius * 1.5)
      gradient.addColorStop(0, 'rgba(201, 162, 39, 0.3)')
      gradient.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(0, 0, radius * 1.5, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
      
      // 太极图
      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(26, 26, 46, 0.8)'
      ctx.fill()
      
      // 白色半圆
      ctx.beginPath()
      ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2)
      ctx.fillStyle = 'rgba(240, 215, 140, 0.9)'
      ctx.fill()
      
      // 小圆
      ctx.beginPath()
      ctx.arc(0, -radius / 2, radius / 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(26, 26, 46, 0.9)'
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(0, radius / 2, radius / 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(240, 215, 140, 0.9)'
      ctx.fill()
      
      // 小点
      ctx.beginPath()
      ctx.arc(0, -radius / 2, radius / 6, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(240, 215, 140, 0.9)'
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(0, radius / 2, radius / 6, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(26, 26, 46, 0.9)'
      ctx.fill()
      
      ctx.restore()
    }
    
    // 动画
    let animationId: number
    let taijiRotation = 0
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // 绘制粒子
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.life++
        
        if (p.life > p.maxLife || p.y < 0) {
          particles[i] = createParticle()
          particles[i].y = window.innerHeight + 10
        }
        
        const alpha = p.alpha * (1 - p.life / p.maxLife)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`)
        ctx.fill()
        
        // 光晕
        const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3)
        glowGradient.addColorStop(0, `rgba(201, 162, 39, ${alpha * 0.3})`)
        glowGradient.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()
      })
      
      // 绘制中心太极
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2 - 50
      taijiRotation += 0.005
      drawTaiji(centerX, centerY, 80, taijiRotation)
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  // 进度更新
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 2
        if (next >= 100) {
          clearInterval(interval)
          return 100
        }
        return next
      })
    }, redirectDelay / 50)
    
    return () => clearInterval(interval)
  }, [redirectDelay])
  
  // 更新加载文本
  useEffect(() => {
    const textIndex = Math.floor(progress / (100 / loadingTexts.length))
    if (textIndex < loadingTexts.length) {
      setLoadingText(loadingTexts[textIndex])
    }
  }, [progress])
  
  // 显示内容
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])
  
  // 自动跳转
  useEffect(() => {
    if (autoRedirect && progress >= 100) {
      const timer = setTimeout(() => {
        handleEnter()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [autoRedirect, progress])
  
  // 手动进入
  const handleEnter = useCallback(() => {
    setIsSplashCompleted(true)
    router.push('/home')
  }, [router, setIsSplashCompleted])
  
  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
      
      <AnimatePresence>
        {showContent && (
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 主标题 */}
            <div className={styles.titleSection}>
              <h1 className={styles.title}>
                <motion.span
                  className={styles.titleChar}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  灵
                </motion.span>
                <motion.span
                  className={styles.titleChar}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  墟
                </motion.span>
              </h1>
              
              <motion.p
                className={styles.subtitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                天地玄黄 · 宇宙洪荒
              </motion.p>
              
              <motion.p
                className={styles.tagline}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {SITE_CONFIG.subtitle}
              </motion.p>
            </div>
            
            {/* 年份 */}
            <motion.div
              className={styles.yearSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <span className={styles.year}>公元 {WORLD_LORE.currentYear} 年</span>
              <span className={styles.era}>{WORLD_LORE.era}</span>
            </motion.div>
            
            {/* 进度条 */}
            <motion.div
              className={styles.progressSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={styles.progressText}>{loadingText}</span>
            </motion.div>
            
            {/* 进入按钮 */}
            <motion.button
              className={styles.enterButton}
              onClick={handleEnter}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.buttonText}>进入灵墟</span>
              <span className={styles.buttonArrow}>→</span>
            </motion.button>
            
            <motion.p
              className={styles.hint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              或等待自动跳转
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 背景渐变 */}
      <div className={styles.bgGradient} />
    </div>
  )
}
