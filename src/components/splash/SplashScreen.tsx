/**
 * 灵墟 - 启动页组件（增强版）
 * 古体字 + 增强粒子 + 3D效果 + 流光动画
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

// 古体字映射（小篆风格）
const ANCIENT_CHARS: Record<string, string> = {
  '灵': '霊',
  '墟': '墲',
  '天': '天',
  '地': '坔',
  '玄': '玄',
  '黄': '黃',
  '宇': '宇',
  '宙': '宆',
  '洪': '洪',
  '荒': '荒'
}

export default function SplashScreen({
  autoRedirect = true,
  redirectDelay = 5000,
}: SplashScreenProps) {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('正在连接灵墟...')
  const [showAncient, setShowAncient] = useState(true)
  const setIsSplashCompleted = useAppStore(state => state.setIsSplashCompleted)
  const [showContent, setShowContent] = useState(false)
  
  const loadingTexts = [
    '正在连接灵墟...',
    '感应天地灵气...',
    '解锁历史封印...',
    '加载修行档案...',
    '准备进入...',
  ]
  
  // 初始化增强粒子系统
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
      type: 'normal' | 'star' | 'glow'
      angle?: number
      orbit?: number
    }
    
    const particles: Particle[] = []
    const maxParticles = 300
    
    const colors = [
      'rgba(201, 162, 39, 0.9)',
      'rgba(240, 192, 64, 0.7)',
      'rgba(168, 132, 30, 0.6)',
      'rgba(255, 255, 255, 0.5)',
      'rgba(232, 212, 139, 0.8)',
    ]
    
    const createParticle = (type: 'normal' | 'star' | 'glow' = 'normal'): Particle => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * (type === 'star' ? 0.2 : 0.5),
      vy: type === 'star' ? (Math.random() - 0.5) * 0.2 : -Math.random() * 1.5 - 0.5,
      radius: type === 'glow' ? Math.random() * 4 + 2 : Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 300 + 150,
      type,
      angle: Math.random() * Math.PI * 2,
      orbit: type === 'star' ? Math.random() * 200 + 100 : 0
    })
    
    // 初始化粒子
    for (let i = 0; i < maxParticles; i++) {
      const type = Math.random() > 0.7 ? (Math.random() > 0.5 ? 'star' : 'glow') : 'normal'
      particles.push(createParticle(type))
    }
    
    // 绘制八卦符号
    const drawBagua = (cx: number, cy: number, radius: number, rotation: number, alpha: number) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(rotation)
      ctx.globalAlpha = alpha * 0.3
      
      // 八卦线
      const bagua = [
        [1, 1, 1], [0, 0, 0], [1, 0, 1], [0, 1, 0],
        [1, 1, 0], [0, 0, 1], [1, 0, 0], [0, 1, 1]
      ]
      
      bagua.forEach((lines, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2
        const x = Math.cos(angle) * radius * 0.7
        const y = Math.sin(angle) * radius * 0.7
        
        ctx.strokeStyle = '#c9a227'
        ctx.lineWidth = 2
        
        lines.forEach((line, j) => {
          const offsetY = (j - 1) * 8
          if (line === 1) {
            ctx.beginPath()
            ctx.moveTo(x - 12, y + offsetY)
            ctx.lineTo(x + 12, y + offsetY)
            ctx.stroke()
          } else {
            ctx.beginPath()
            ctx.moveTo(x - 12, y + offsetY)
            ctx.lineTo(x - 2, y + offsetY)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(x + 2, y + offsetY)
            ctx.lineTo(x + 12, y + offsetY)
            ctx.stroke()
          }
        })
      })
      
      ctx.restore()
    }
    
    // 绘制增强太极
    const drawTaiji = (cx: number, cy: number, radius: number, rotation: number, glowIntensity: number) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(rotation)
      
      // 多层外发光
      for (let i = 3; i >= 1; i--) {
        const gradient = ctx.createRadialGradient(0, 0, radius * 0.5, 0, 0, radius * (1 + i * 0.3))
        gradient.addColorStop(0, `rgba(201, 162, 39, ${0.1 * glowIntensity})`)
        gradient.addColorStop(0.5, `rgba(201, 162, 39, ${0.05 * glowIntensity})`)
        gradient.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(0, 0, radius * (1 + i * 0.3), 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
      
      // 太极主体
      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(20, 20, 35, 0.95)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(201, 162, 39, 0.8)'
      ctx.lineWidth = 2
      ctx.stroke()
      
      // 阴阳鱼
      ctx.beginPath()
      ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2)
      ctx.fillStyle = 'rgba(232, 212, 139, 0.95)'
      ctx.fill()
      
      // 小圆
      ctx.beginPath()
      ctx.arc(0, -radius / 2, radius / 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(20, 20, 35, 0.95)'
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(0, radius / 2, radius / 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(232, 212, 139, 0.95)'
      ctx.fill()
      
      // 鱼眼
      ctx.beginPath()
      ctx.arc(0, -radius / 2, radius / 5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(232, 212, 139, 0.95)'
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(0, radius / 2, radius / 5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(20, 20, 35, 0.95)'
      ctx.fill()
      
      ctx.restore()
    }
    
    // 绘制符文光圈
    const drawRuneRing = (cx: number, cy: number, radius: number, rotation: number) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(rotation)
      ctx.globalAlpha = 0.4
      
      const runes = '乾坎艮震巽离坤兑'
      ctx.font = '12px serif'
      ctx.fillStyle = '#c9a227'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      runes.split('').forEach((rune, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        ctx.fillText(rune, x, y)
      })
      
      ctx.restore()
    }
    
    let animationId: number
    let taijiRotation = 0
    let baguaRotation = 0
    let runeRotation = 0
    let glowPhase = 0
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // 绘制背景星云
      const bgGradient = ctx.createRadialGradient(
        window.innerWidth / 2, window.innerHeight / 2, 0,
        window.innerWidth / 2, window.innerHeight / 2, window.innerWidth
      )
      bgGradient.addColorStop(0, 'rgba(20, 15, 30, 0.1)')
      bgGradient.addColorStop(0.5, 'rgba(10, 10, 20, 0.05)')
      bgGradient.addColorStop(1, 'transparent')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      
      // 绘制粒子
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.life++
        p.angle = (p.angle || 0) + 0.02
        
        if (p.type === 'star' && p.orbit) {
          const centerX = window.innerWidth / 2
          const centerY = window.innerHeight / 2 - 50
          p.x = centerX + Math.cos(p.angle) * p.orbit
          p.y = centerY + Math.sin(p.angle) * p.orbit * 0.6
        }
        
        if (p.life > p.maxLife || p.y < -10) {
          const type = Math.random() > 0.7 ? (Math.random() > 0.5 ? 'star' : 'glow') : 'normal'
          particles[i] = createParticle(type)
          particles[i].y = window.innerHeight + 10
        }
        
        const alpha = p.alpha * (1 - p.life / p.maxLife)
        
        if (p.type === 'glow') {
          // 光晕粒子
          const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4)
          glowGradient.addColorStop(0, `rgba(201, 162, 39, ${alpha * 0.6})`)
          glowGradient.addColorStop(0.5, `rgba(201, 162, 39, ${alpha * 0.2})`)
          glowGradient.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
          ctx.fillStyle = glowGradient
          ctx.fill()
        } else {
          // 普通粒子
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`)
          ctx.fill()
          
          // 粒子光晕
          const particleGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3)
          particleGlow.addColorStop(0, `rgba(201, 162, 39, ${alpha * 0.3})`)
          particleGlow.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
          ctx.fillStyle = particleGlow
          ctx.fill()
        }
      })
      
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2 - 50
      const glowIntensity = (Math.sin(glowPhase) + 1) / 2 * 0.5 + 0.5
      glowPhase += 0.03
      
      // 绘制八卦（慢速旋转）
      baguaRotation -= 0.002
      drawBagua(centerX, centerY, 180, baguaRotation, glowIntensity)
      
      // 绘制符文圈（反向旋转）
      runeRotation += 0.003
      drawRuneRing(centerX, centerY, 150, runeRotation)
      
      // 绘制太极（中速旋转）
      taijiRotation += 0.008
      drawTaiji(centerX, centerY, 80, taijiRotation, glowIntensity)
      
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
  
  // 古体字切换
  useEffect(() => {
    const timer = setInterval(() => {
      setShowAncient(prev => !prev)
    }, 3000)
    return () => clearInterval(timer)
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
  
  const handleEnter = useCallback(() => {
    setIsSplashCompleted(true)
    router.push('/home')
  }, [router, setIsSplashCompleted])
  
  const displayChar = (char: string, delay: number) => {
    const ancientChar = ANCIENT_CHARS[char] || char
    return (
      <motion.span
        key={char}
        className={styles.titleChar}
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, duration: 0.8, ease: 'easeOut' }}
        style={{
          display: 'inline-block',
          fontFamily: showAncient ? '"Ma Shan Zheng", "ZCOOL XiaoWei", serif' : '"Noto Serif SC", serif',
          textShadow: `
            0 0 20px rgba(201, 162, 39, 0.8),
            0 0 40px rgba(201, 162, 39, 0.4),
            0 0 60px rgba(201, 162, 39, 0.2)
          `
        }}
      >
        {showAncient ? char : ancientChar}
      </motion.span>
    )
  }
  
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
            {/* 主标题 - 古体字动画 */}
            <div className={styles.titleSection}>
              <h1 className={styles.title}>
                {displayChar('灵', 0.3)}
                {displayChar('墟', 0.5)}
              </h1>
              
              <motion.div
                className={styles.ancientText}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontFamily: '"ZCOOL XiaoWei", serif',
                  color: 'rgba(201, 162, 39, 0.6)',
                  fontSize: '0.9rem',
                  marginTop: '0.5rem',
                  letterSpacing: '0.3em'
                }}
              >
                {showAncient ? '霊墲' : '灵墟'}
              </motion.div>
              
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
            
            {/* 进度条 - 增强版 */}
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
                {/* 进度条光效 */}
                <motion.div
                  className={styles.progressGlow}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    width: '50%'
                  }}
                />
              </div>
              <span className={styles.progressText}>{loadingText}</span>
            </motion.div>
            
            {/* 进入按钮 - 增强版 */}
            <motion.button
              className={styles.enterButton}
              onClick={handleEnter}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201, 162, 39, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* 按钮光效 */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '50%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                }}
              />
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
