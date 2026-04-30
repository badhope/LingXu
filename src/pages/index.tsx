/**
 * 灵墟 - 启动页（splash screen）
 * 包含 splash / gate / main 三阶段动画
 */

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './home'
import { useTheme } from '@/context/ThemeContext'
import styles from './index.module.scss'

// Bagua SVG 组件 - 客户端动态渲染消除 Hydration 警告
const BaguaSVG = () => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <svg viewBox="0 0 200 200" className={styles.baguaSvg} suppressHydrationWarning>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <radialGradient id="centerGradient">
          <stop offset="0%" stopColor="rgba(251, 191, 36, 0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="95" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.4" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="100" r="65" fill="none" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.6" />

      <circle cx="100" cy="100" r="40" fill="url(#centerGradient)" filter="url(#glow)" />

      <g transform="translate(100, 100)">
        <path d="M-40,0 A40,40 0 0,1 0,-40 A20,20 0 0,1 0,0 A20,20 0 0,0 0,40 A40,40 0 0,1 -40,0 Z" fill="#0f172a" />
        <path d="M40,0 A40,40 0 0,1 0,40 A20,20 0 0,1 0,0 A20,20 0 0,0 0,-40 A40,40 0 0,1 40,0 Z" fill="#fbbf24" />
        <circle cx="0" cy="-20" r="8" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
        <circle cx="0" cy="20" r="8" fill="#fbbf24" />
      </g>
    </svg>
  )
}

// 确定性粒子数据（SSR/客户端一致，无 Hydration Mismatch）
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 43758.5453
  return x - Math.floor(x)
}

interface Particle {
  id: number
  x: number
  y: number
  delay: number
  size: number
  isGold: boolean
  yDist: number
  xDist: number
}

function generateParticles(): Particle[] {
  return Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 3 + 1),
    y: seededRandom(i * 3 + 2),
    delay: seededRandom(i * 3 + 3) * 5,
    size: 1 + seededRandom(i * 3 + 4) * 6,
    isGold: seededRandom(i * 3 + 5) > 0.5,
    yDist: 30 + seededRandom(i * 3 + 6) * 80,
    xDist: seededRandom(i * 3 + 7) * 40 - 20,
  }))
}

export default function IndexPage() {
  const [phase, setPhase] = useState<'splash' | 'gate' | 'main'>('splash')
  // 粒子在 useEffect 中初始化（仅客户端），避免 SSR mismatch
  const [particles, setParticles] = useState<Particle[]>([])
  const { themeConfig } = useTheme()

  useEffect(() => {
    setParticles(generateParticles())
  }, [])

  const handleEnter = useCallback(() => {
    setPhase('gate')
    setTimeout(() => setPhase('main'), 2500)
  }, [])

  return (
    <div className={styles.container} style={{ background: themeConfig.bgGradient }}>
      <AnimatePresence mode="wait">
        {phase === 'splash' && (
          <motion.div
            key="splash"
            className={styles.splash}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className={styles.backgroundLayers} style={{ '--theme-primary': themeConfig.primary, '--theme-glow': themeConfig.glowColor } as React.CSSProperties}>
              <div className={styles.layerFar} />
              <div className={styles.layerMid} />
              <div className={styles.layerNear} />
              
              {/* 星云效果 */}
              <div className={styles.nebulaCloud} />
              <div className={styles.nebulaCloud} />
              <div className={styles.nebulaCloud} />
            </div>
            
            {/* 能量线条 */}
            <div className={styles.energyLines}>
              <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor={themeConfig.particleColor} />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path d="M0,200 Q480,100 960,200 T1920,200" />
                <path d="M0,500 Q480,400 960,500 T1920,500" style={{ animationDelay: '-2s' }} />
                <path d="M0,800 Q480,700 960,800 T1920,800" style={{ animationDelay: '-4s' }} />
              </svg>
            </div>

            {/* 粒子动画（延迟挂载，等待 particles 初始化） */}
            {particles.length > 0 && particles.map((p) => (
              <motion.div
                key={p.id}
                className={styles.starParticle}
                style={{
                  left: `${p.x * 100}%`,
                  top: `${p.y * 100}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  background: p.isGold
                    ? `radial-gradient(circle, #fbbf24 0%, rgba(251, 191, 36, 0.5) 50%, transparent 70%)`
                    : `radial-gradient(circle, #f8fafc 0%, rgba(248, 250, 252, 0.4) 50%, transparent 70%)`,
                  boxShadow: p.isGold ? '0 0 12px rgba(251, 191, 36, 0.6)' : 'none',
                }}
                animate={{
                  opacity: [0.1, 0.6, 0.9, 0.6, 0.1],
                  scale: [1, 1.3, 1, 0.7, 1],
                  y: [0, -p.yDist, 0, p.yDist / 2, 0],
                  x: [0, p.xDist, 0, -p.xDist, 0],
                }}
                transition={{
                  duration: 3 + seededRandom(p.id + 100) * 5,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* 八卦旋转环 - 外层高速旋转 */}
            <motion.div
              className={styles.runeContainer}
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* 外环 - 高速顺时针旋转 */}
              <motion.div
                className={styles.runeRing}
                animate={{ rotateZ: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                <BaguaSVG />
              </motion.div>
              
              {/* 内环 - 反向逆时针旋转，营造视觉差 */}
              <motion.div
                className={styles.runeRingInner}
                animate={{ rotateZ: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div className={styles.innerRing} />
              </motion.div>
              
              {/* 中心光环脉动 */}
              <motion.div
                className={styles.centerGlow}
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* 标题 */}
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <span className={styles.titleChar}>靈</span>
              <motion.span className={styles.titleDivider} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
                ✦
              </motion.span>
              <span className={styles.titleChar}>墟</span>
            </motion.h1>

            <motion.div
              className={styles.divider}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
            >
              <div className={styles.dividerLine} />
              <div className={styles.dividerDot}>❖</div>
              <div className={styles.dividerLine} />
            </motion.div>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <span className={styles.subtitleLine}>末 法 时 代 · 失 落 修 行 文 明 档 案 馆</span>
            </motion.p>

            <motion.div
              className={styles.enterWrapper}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <motion.button
                className={styles.enterButton}
                onClick={handleEnter}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(251, 191, 36, 0.5), 0 0 80px rgba(251, 191, 36, 0.3)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                <div className={styles.buttonBorderTop} />
                <div className={styles.buttonBorderBottom} />
                <div className={styles.buttonGlow} />
                <span className={styles.buttonText}>踏入灵墟</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {phase === 'gate' && (
          <motion.div key="gate" className={styles.gate} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className={styles.gateBackground}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
            />

            <motion.div
              className={styles.gateLeft}
              initial={{ x: 0, rotateY: 0 }}
              animate={{ x: '-100%', rotateY: -90 }}
              transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className={styles.gateCarving}>門</div>
            </motion.div>
            <motion.div
              className={styles.gateRight}
              initial={{ x: 0, rotateY: 0 }}
              animate={{ x: '100%', rotateY: 90 }}
              transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className={styles.gateCarving}>道</div>
            </motion.div>

            <motion.div
              className={styles.gateLight}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 15, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2, delay: 0.5, times: [0, 0.3, 0.7, 1] }}
            />

            {/* 开门后浮现旋转八卦太极！ */}
            <motion.div
              className={styles.gateRuneContainer}
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                animate={{ rotateZ: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <BaguaSVG />
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.gateText}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1, duration: 1.2 }}
            >
              {['道生一', '一生二', '二生三', '三生万物'].map((text, i) => (
                <motion.span key={text} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}>
                  {text}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}

        {phase === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <Home />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
