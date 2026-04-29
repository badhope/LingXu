'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimeParticle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  hue: number
  life: number
  maxLife: number
  era: number
}

interface EraNode {
  id: number
  x: number
  y: number
  name: string
  icon: string
  color: string
  era: string
  active: boolean
  easterEgg?: string
  isEaster?: boolean
}

const eraColors = [
  { name: '混沌', startHue: 0, endHue: 60 },
  { name: '太古', startHue: 60, endHue: 120 },
  { name: '上古', startHue: 120, endHue: 180 },
  { name: '中古', startHue: 180, endHue: 240 },
  { name: '近古', startHue: 240, endHue: 300 },
  { name: '现代', startHue: 300, endHue: 360 },
]

const TIME_TRAVEL_QUOTES = [
  '欢迎来到公元',
  '时空跃迁成功！你现在在',
  '时间虫洞已稳定，当前坐标：',
  '历史修正完成，你来到了',
  '时间线分叉成功：',
  '⚠️ 警告：检测到时空悖论！你来到了',
]

export default function TimeRiverCanvas({ onNodeClick }: { onNodeClick?: (node: EraNode) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<TimeParticle[]>([])
  const nodesRef = useRef<EraNode[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)
  const animationRef = useRef<number>(0)
  const [hoveredNode, setHoveredNode] = useState<EraNode | null>(null)
  const [selectedNode, setSelectedNode] = useState<EraNode | null>(null)
  const [timeTraveling, setTimeTraveling] = useState(false)
  const [travelQuote, setTravelQuote] = useState('')

  const initNodes = useCallback((width: number, height: number) => {
    const nodeData = [
      { name: '开天辟地', icon: '🌌', color: '#6b7280', era: '混沌', easterEgg: '宇宙大爆炸时盘古神说：要有光！' },
      { name: '鸿钧成圣', icon: '🕊️', color: '#a855f7', era: '太古', easterEgg: '第一个合道的卷王，卷到最后一无所有！' },
      { name: '龙凤初劫', icon: '🐉', color: '#ef4444', era: '太古', easterEgg: '神兽内卷最终双输案例！' },
      { name: '紫霄讲道', icon: '🏛️', color: '#a855f7', era: '太古', easterEgg: '洪荒第一考研辅导班，座位全靠抢！' },
      { name: '巫妖大战', icon: '⚔️', color: '#f97316', era: '上古', easterEgg: '祖巫射日，后羿：这个锅我不背！' },
      { name: '女娲补天', icon: '🪨', color: '#ec4899', era: '上古', easterEgg: '史上第一位码农！补天就是debug！' },
      { name: '三皇五帝', icon: '👑', color: '#22c55e', era: '上古', easterEgg: '禅让制？不不不，都是一家人！' },
      { name: '封神之战', icon: '📜', color: '#eab308', era: '中古', easterEgg: '阐教：我不是针对你，我是说在座的都是封神榜！' },
      { name: '西游之路', icon: '🐒', color: '#3b82f6', era: '中古', easterEgg: '如来：这泼猴再闹，就送他去西天取经！' },
      { name: '996福报', icon: '💼', color: '#f59e0b', era: '现代', easterEgg: '马云：能996是你们修来的福报！', isEaster: true },
      { name: '内卷元年', icon: '📚', color: '#ef4444', era: '现代', easterEgg: '衡水中学：提高一分，干掉千人！', isEaster: true },
      { name: '口罩时代', icon: '😷', color: '#06b6d4', era: '现代', easterEgg: '健康码、行程码、核酸码，三码合一！', isEaster: true },
      { name: 'AI觉醒', icon: '🤖', color: '#8b5cf6', era: '现代', easterEgg: 'ChatGPT：我不是来取代你的，我是来淘汰你的！', isEaster: true },
      { name: '末法时代', icon: '🌙', color: '#6366f1', era: '近古', easterEgg: '灵气枯竭，只剩网络小说修仙了！' },
    ]

    nodesRef.current = nodeData.map((node, i) => ({
      id: i,
      x: 100 + (width - 200) * (i / (nodeData.length - 1)),
      y: height / 2 + (Math.random() - 0.5) * 100,
      ...node,
      active: false,
    }))
  }, [])

  const createParticle = useCallback((canvas: HTMLCanvasElement, eraIndex?: number) => {
    const era = eraIndex ?? Math.floor(Math.random() * eraColors.length)
    const hueRange = eraColors[era]

    return {
      x: Math.random() * canvas.width,
      y: canvas.height * 0.4 + (Math.random() - 0.5) * canvas.height * 0.4,
      z: Math.random() * 100,
      vx: 0.5 + Math.random() * 1.5,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.5,
      size: 1 + Math.random() * 3,
      hue: hueRange.startHue + Math.random() * (hueRange.endHue - hueRange.startHue),
      life: 1,
      maxLife: 200 + Math.random() * 200,
      era,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      initNodes(canvas.offsetWidth, canvas.offsetHeight)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    for (let i = 0; i < 200; i++) {
      particlesRef.current.push(createParticle(canvas))
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      let foundNode: EraNode | null = null
      nodesRef.current.forEach((node) => {
        const dx = mouseRef.current.x - node.x
        const dy = mouseRef.current.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        node.active = dist < 40
        if (node.active) foundNode = node
      })
      setHoveredNode(foundNode)
    }

    const handleClick = () => {
      if (hoveredNode) {
        setSelectedNode(hoveredNode)
        onNodeClick?.(hoveredNode)
      }
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY * 0.001
    }

    window.addEventListener('scroll', handleScroll)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)

    const animate = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      ctx.clearRect(0, 0, width, height)

      const time = Date.now() * 0.001 + scrollRef.current

      ctx.beginPath()
      ctx.moveTo(0, height / 2)
      for (let x = 0; x <= width; x += 5) {
        const progress = x / width
        const waveY = Math.sin(progress * Math.PI * 4 + time) * 30
        const y = height / 2 + waveY + (progress - 0.5) * 50
        ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(201, 162, 39, 0.3)'
      ctx.lineWidth = 3
      ctx.stroke()

      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      eraColors.forEach((era, i) => {
        const stop = i / eraColors.length
        gradient.addColorStop(stop, `hsla(${era.startHue}, 70%, 50%, 0.1)`)
      })
      ctx.fillStyle = gradient
      ctx.fill()

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= 1 / p.maxLife
        if (p.life <= 0.01) return false

        p.x += p.vx + Math.sin(time + p.z * 0.1) * 0.5
        p.y += p.vy + Math.cos(time + p.z * 0.1) * 0.3
        p.z += p.vz

        const perspective = 100 / (100 + p.z)
        const size = Math.max(0.1, p.size * perspective * p.life)

        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          const force = (100 - dist) / 100
          p.vx += (dx / dist) * force * 0.2
          p.vy += (dy / dist) * force * 0.2
        }

        const alpha = p.life * 0.8
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${alpha})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 50%, ${alpha * 0.3})`
        ctx.fill()

        if (p.x > width + 50 || p.life <= 0) {
          return false
        }
        return true
      })

      while (particlesRef.current.length < 300) {
        const newP = createParticle(canvas)
        newP.x = -50
        particlesRef.current.push(newP)
      }

      nodesRef.current.forEach((node) => {
        const pulse = node.active ? 1 + Math.sin(time * 5) * 0.2 : 1
        const nodeSize = (node.active ? 35 : 25) * pulse

        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, nodeSize * 2
        )
        glowGradient.addColorStop(0, node.color + '40')
        glowGradient.addColorStop(0.5, node.color + '20')
        glowGradient.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeSize * 2, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2)
        ctx.fillStyle = node.active ? node.color : '#1a1a2e'
        ctx.strokeStyle = node.color
        ctx.lineWidth = node.active ? 3 : 2
        ctx.fill()
        ctx.stroke()

        ctx.font = `${node.active ? 24 : 18}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(node.icon, node.x, node.y)

        if (node.active) {
          ctx.font = 'bold 14px "Noto Serif SC", serif'
          ctx.fillStyle = '#ffffff'
          ctx.fillText(node.name, node.x, node.y + 50)

          ctx.font = '11px serif'
          ctx.fillStyle = node.color
          ctx.fillText(node.era, node.x, node.y + 68)
        }
      })

      nodesRef.current.forEach((node, i) => {
        if (i < nodesRef.current.length - 1) {
          const nextNode = nodesRef.current[i + 1]
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          const cpX = (node.x + nextNode.x) / 2
          const cpY = (node.y + nextNode.y) / 2 + Math.sin(time + i) * 20
          ctx.quadraticCurveTo(cpX, cpY, nextNode.x, nextNode.y)
          ctx.strokeStyle = `rgba(201, 162, 39, ${0.2 + Math.sin(time + i) * 0.1})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', handleScroll)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
      cancelAnimationFrame(animationRef.current)
    }
  }, [createParticle, initNodes, hoveredNode, onNodeClick])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: hoveredNode ? 'pointer' : 'default',
        }}
      />
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '1.5rem 2rem',
              background: 'rgba(10, 10, 20, 0.95)',
              border: '1px solid ' + selectedNode.color,
              borderRadius: '12px',
              boxShadow: `0 0 30px ${selectedNode.color}30`,
              zIndex: 100,
              textAlign: 'center',
              minWidth: '300px',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
              {selectedNode.icon}
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: selectedNode.color,
              marginBottom: '0.5rem',
              fontFamily: '"Noto Serif SC", serif',
            }}>
              {selectedNode.name}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '1rem',
            }}>
              {selectedNode.era}时代 · 关键节点事件
            </div>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.3 }}
              style={{
                padding: '0.8rem 1rem',
                background: selectedNode.color + '15',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                color: selectedNode.color,
                fontStyle: 'italic',
                border: '1px dashed ' + selectedNode.color + '40',
              }}
            >
              🕰️ 时空管理局备注：{selectedNode.easterEgg}
            </motion.div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedNode(null)}
                style={{
                  padding: '0.5rem 1.2rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '6px',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                继续漂流
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setTimeTraveling(true)
                  setTravelQuote(TIME_TRAVEL_QUOTES[Math.floor(Math.random() * TIME_TRAVEL_QUOTES.length)])
                  setTimeout(() => {
                    setTimeTraveling(false)
                    setSelectedNode(null)
                  }, 2500)
                }}
                style={{
                  padding: '0.5rem 1.2rem',
                  background: selectedNode.color + '25',
                  border: '1px solid ' + selectedNode.color,
                  borderRadius: '6px',
                  color: selectedNode.color,
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                }}
              >
                ⚡ 穿越！
              </motion.button>
            </div>
          </motion.div>
        )}

        {timeTraveling && selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              style={{ fontSize: '5rem', marginBottom: '1.5rem' }}
            >
              ⚡
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: '1.2rem',
                color: selectedNode.color,
                marginBottom: '0.5rem',
                fontFamily: '"Noto Serif SC", serif',
              }}
            >
              {travelQuote}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#ffffff',
                fontFamily: '"Noto Serif SC", serif',
                textAlign: 'center',
              }}
            >
              {selectedNode.icon} {selectedNode.name}
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ delay: 1, duration: 1.5, ease: 'linear' }}
              style={{
                height: '3px',
                marginTop: '2rem',
                background: `linear-gradient(90deg, ${selectedNode.color}, transparent)`,
                borderRadius: '2px',
              }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                marginTop: '1rem',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              正在校准时空坐标...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
