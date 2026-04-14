/**
 * 灵墟 - 启动页（splash screen）
 * 包含 splash / gate / main 三阶段动画
 */

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './home'
import styles from './index.module.scss'

// Bagua SVG 组件（确定性渲染，无 Hydration 问题）
const BaguaSVG = () => (
  <svg viewBox="0 0 200 200" className={styles.baguaSvg}>
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f4e4a6" />
        <stop offset="50%" stopColor="#c9a227" />
        <stop offset="100%" stopColor="#8b7355" />
      </linearGradient>
      <radialGradient id="centerGradient">
        <stop offset="0%" stopColor="rgba(201, 162, 39, 0.3)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    <circle cx="100" cy="100" r="95" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.3" />
    <circle cx="100" cy="100" r="80" fill="none" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.4" />
    <circle cx="100" cy="100" r="65" fill="none" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.5" />

    <g stroke="url(#goldGradient)" strokeWidth="2" filter="url(#glow)">
      <text x="100" y="18" fill="#c9a227" fontSize="14" textAnchor="middle">☰</text>
      <text x="162" y="42" fill="#c9a227" fontSize="14" textAnchor="middle">☴</text>
      <text x="182" y="105" fill="#c9a227" fontSize="14" textAnchor="middle">☲</text>
      <text x="162" y="168" fill="#c9a227" fontSize="14" textAnchor="middle">☶</text>
      <text x="100" y="190" fill="#c9a227" fontSize="14" textAnchor="middle">☷</text>
      <text x="38" y="168" fill="#c9a227" fontSize="14" textAnchor="middle">☳</text>
      <text x="18" y="105" fill="#c9a227" fontSize="14" textAnchor="middle">☵</text>
      <text x="38" y="42" fill="#c9a227" fontSize="14" textAnchor="middle">☱</text>
    </g>

    <circle cx="100" cy="100" r="40" fill="url(#centerGradient)" filter="url(#glow)" />

    <g transform="translate(100, 100)">
      <path d="M-40,0 A40,40 0 0,1 0,-40 A20,20 0 0,1 0,0 A20,20 0 0,0 0,40 A40,40 0 0,1 -40,0 Z" fill="#0a0a0f" />
      <path d="M40,0 A40,40 0 0,1 0,40 A20,20 0 0,1 0,0 A20,20 0 0,0 0,-40 A40,40 0 0,1 40,0 Z" fill="#c9a227" />
      <circle cx="0" cy="-20" r="8" fill="#0a0a0f" />
      <circle cx="0" cy="20" r="8" fill="#c9a227" />
    </g>
  </svg>
)

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
}

function generateParticles(): Particle[] {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 3 + 1),
    y: seededRandom(i * 3 + 2),
    delay: seededRandom(i * 3 + 3) * 3,
    size: 1 + seededRandom(i * 3 + 4) * 5,
    isGold: seededRandom(i * 3 + 5) > 0.4,
    yDist: 50 + seededRandom(i * 3 + 6) * 50,
  }))
}

export default function IndexPage() {
  const [phase, setPhase] = useState<'splash' | 'gate' | 'main'>('splash')
  // 粒子在 useEffect 中初始化（仅客户端），避免 SSR mismatch
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(generateParticles())
  }, [])

  const handleEnter = useCallback(() => {
    setPhase('gate')
    setTimeout(() => setPhase('main'), 2500)
  }, [])

  // 地支标签（确定性渲染）
  const dizhiLabels = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {phase === 'splash' && (
          <motion.div
            key="splash"
            className={styles.splash}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className={styles.backgroundLayers}>
              <div className={styles.layerFar} />
              <div className={styles.layerMid} />
              <div className={styles.layerNear} />
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
                    ? `radial-gradient(circle, #c9a227 0%, rgba(201, 162, 39, 0.4) 50%, transparent 70%)`
                    : `radial-gradient(circle, #ffffff 0%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)`,
                  boxShadow: p.isGold ? '0 0 10px rgba(201, 162, 39, 0.5)' : 'none',
                }}
                animate={{
                  opacity: [0.1, 0.6, 0.9, 0.6, 0.1],
                  scale: [1, 1.2, 1, 0.8, 1],
                  y: [0, -p.yDist, 0, p.yDist / 2, 0],
                }}
                transition={{
                  duration: 4 + seededRandom(p.id + 100) * 6,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* 八卦旋转环 */}
            <motion.div
              className={styles.runeContainer}
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className={styles.runeRing}
                animate={{ rotateZ: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              >
                <BaguaSVG />
              </motion.div>

              <motion.div
                className={styles.runeRing}
                style={{ scale: 1.15 }}
                animate={{ rotateZ: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 200 200" className={styles.baguaSvg} style={{ opacity: 0.4 }}>
                  {dizhiLabels.map((item, i) => {
                    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
                    const x = 100 + Math.cos(angle) * 90
                    const y = 100 + Math.sin(angle) * 90
                    return (
                      <text key={i} x={x} y={y} fill="#c9a227" fontSize="8" textAnchor="middle" dominantBaseline="middle">
                        {item}
                      </text>
                    )
                  })}
                </svg>
              </motion.div>

              <motion.div
                className={styles.runeInnerRing}
                animate={{ rotateZ: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              >
                <div className={styles.runeTextCircle}>✧ 天 地 玄 黄 宇 宙 洪 荒 ✧</div>
              </motion.div>
            </motion.div>

            {/* 标题 */}
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
            >
              <span className={styles.titleChar}>靈</span>
              <motion.span className={styles.titleDivider} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>
                ✦
              </motion.span>
              <span className={styles.titleChar}>墟</span>
            </motion.h1>

            <motion.div
              className={styles.divider}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.8, duration: 1.2, ease: 'easeOut' }}
            >
              <div className={styles.dividerLine} />
              <div className={styles.dividerDot}>❖</div>
              <div className={styles.dividerLine} />
            </motion.div>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 1 }}
            >
              <span className={styles.subtitleLine}>末 法 时 代 · 失 落 修 行 文 明 档 案 馆</span>
            </motion.p>

            <motion.div
              className={styles.enterWrapper}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 1 }}
            >
              <motion.button
                className={styles.enterButton}
                onClick={handleEnter}
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 0 60px rgba(201, 162, 39, 0.6), 0 0 120px rgba(201, 162, 39, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.buttonBorderTop} />
                <div className={styles.buttonBorderBottom} />
                <div className={styles.buttonGlow} />
                <span className={styles.buttonText}>一 踏 入 灵 墟 一</span>
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

            <motion.div
              className={styles.gateText}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2 }}
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
