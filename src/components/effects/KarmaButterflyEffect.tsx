'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Ripple {
  id: number
  x: number
  y: number
  karma: 'good' | 'evil'
  strength: number
  age: number
  maxAge: number
}

interface KarmaAction {
  id: number
  name: string
  type: 'good' | 'evil'
  strength: number
  description: string
  consequences: string[]
  icon: string
}

const KARMA_ACTIONS: KarmaAction[] = [
  { id: 1, name: '布施财物', type: 'good', strength: 3, description: '以清净心布施财物，帮助贫苦众生', consequences: ['财富丰饶', '人见欢喜', '善缘增长'], icon: '💰' },
  { id: 2, name: '慈悲放生', type: 'good', strength: 5, description: '救度众生性命，施予无畏', consequences: ['健康长寿', '疾病消除', '心常安乐'], icon: '🐟' },
  { id: 3, name: '赞叹随喜', type: 'good', strength: 2, description: '真心赞叹他人善行功德', consequences: ['名声远扬', '众人爱敬', '相貌端严'], icon: '👏' },
  { id: 4, name: '孝敬父母', type: 'good', strength: 6, description: '孝养父母，奉事师长', consequences: ['诸天护持', '福报深厚', '子孙贤孝'], icon: '👨‍👩‍👧' },
  { id: 5, name: '讲经说法', type: 'good', strength: 8, description: '为人解说佛法，开示正道', consequences: ['智慧深广', '辩才无碍', '天人供养'], icon: '📿' },
  { id: 6, name: '妄语欺人', type: 'evil', strength: 3, description: '以虚言诳惑他人', consequences: ['人不信受', '常被诽谤', '口气臭恶'], icon: '💬' },
  { id: 7, name: '杀生害命', type: 'evil', strength: 7, description: '杀害众生，食其血肉', consequences: ['短命多病', '怨怨相报', '恶梦缠身'], icon: '🗡️' },
  { id: 8, name: '偷盗财物', type: 'evil', strength: 5, description: '盗取他人财物', consequences: ['贫穷困苦', '财物耗散', '王法难容'], icon: '🗄️' },
  { id: 9, name: '邪淫放荡', type: 'evil', strength: 6, description: '行邪淫事，坏梵行', consequences: ['妻不贞良', '眷属不和', '地狱果报'], icon: '💔' },
  { id: 10, name: '嗔恚骂詈', type: 'evil', strength: 4, description: '怒气填胸，恶口伤人', consequences: ['丑陋形貌', '人皆憎恶', '眷属斗争'], icon: '😠' },
]

const KARMA_CHAIN_EVENTS = [
  { threshold: 85, type: 'good', message: '🌈 善神护佑！天降祥瑞！', effect: '全属性增幅' },
  { threshold: 70, type: 'good', message: '✨ 福报成熟！善缘来聚！', effect: '贵人相助' },
  { threshold: 25, type: 'evil', message: '💀 恶业现前！冤亲债主上门！', effect: '诸事不顺' },
  { threshold: 10, type: 'evil', message: '⚡ 天谴降临！报应不爽！', effect: '业力爆发' },
]

const KARMA_MEME_REACTIONS = [
  { karma: 100, message: '🏆 当代活菩萨！请问您是佛祖转世吗？' },
  { karma: 90, message: '⭐ 大善人！您一定是做好事不留名那种！' },
  { karma: 75, message: '😊 好人有好报！继续保持！' },
  { karma: 50, message: '🤷 凡人一个，善恶参半，再接再厉！' },
  { karma: 30, message: '😈 小老弟你不对劲...收手吧！' },
  { karma: 15, message: '👹 大魔王转世？建议立刻开始赎罪！' },
  { karma: 0, message: '🔥 地狱VIP床位已预订！阎王爷亲自接待！' },
]

export default function KarmaButterflyEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripplesRef = useRef<Ripple[]>([])
  const particlesRef = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
    karma: 'good' | 'evil'
    size: number
  }>>([])
  const animationRef = useRef<number>()

  const [totalKarma, setTotalKarma] = useState(50)
  const [goodCount, setGoodCount] = useState(0)
  const [evilCount, setEvilCount] = useState(0)
  const [selectedAction, setSelectedAction] = useState<KarmaAction | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [karmaEvent, setKarmaEvent] = useState<string | null>(null)

  const createRipple = useCallback((x: number, y: number, karma: 'good' | 'evil', strength: number) => {
    const ripple: Ripple = {
      id: Date.now() + Math.random(),
      x, y, karma, strength,
      age: 0,
      maxAge: 120 + strength * 20,
    }
    ripplesRef.current.push(ripple)

    for (let i = 0; i < strength * 8; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 1 + Math.random() * 2
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 80 + Math.random() * 40,
        maxLife: 120,
        karma,
        size: 2 + Math.random() * 3,
      })
    }

    for (let i = 0; i < strength * 2; i++) {
      setTimeout(() => {
        const offsetX = (Math.random() - 0.5) * 100 * strength
        const offsetY = (Math.random() - 0.5) * 100 * strength
        ripplesRef.current.push({
          id: Date.now() + Math.random() + i,
          x: x + offsetX,
          y: y + offsetY,
          karma,
          strength: strength * 0.6,
          age: 0,
          maxAge: 80 + strength * 10,
        })
      }, i * 150)
    }
  }, [])

  const commitAction = useCallback((action: KarmaAction) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    createRipple(centerX, centerY, action.type, action.strength)

    let newKarma: number
    if (action.type === 'good') {
      setGoodCount(c => c + 1)
      newKarma = Math.min(100, totalKarma + action.strength * 3)
    } else {
      setEvilCount(c => c + 1)
      newKarma = Math.max(0, totalKarma - action.strength * 3)
    }
    setTotalKarma(newKarma)

    const chainEvent = KARMA_CHAIN_EVENTS.find(e => 
      e.type === action.type && newKarma >= e.threshold
    )
    if (chainEvent && Math.random() < 0.4) {
      setKarmaEvent(chainEvent.message)
      setTimeout(() => setKarmaEvent(null), 3000)
    }

    setSelectedAction(action)
    setShowResult(true)
    setTimeout(() => setShowResult(false), 4000)
  }, [createRipple, totalKarma])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      ctx.fillStyle = 'rgba(8, 8, 20, 0.15)'
      ctx.fillRect(0, 0, width, height)

      ripplesRef.current = ripplesRef.current.filter(r => {
        r.age++
        if (r.age >= r.maxAge) return false

        const progress = r.age / r.maxAge
        const radius = progress * (80 + r.strength * 30)
        const opacity = (1 - progress) * 0.8

        ctx.beginPath()
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2)
        ctx.strokeStyle = r.karma === 'good'
          ? `rgba(34, 197, 94, ${opacity})`
          : `rgba(239, 68, 68, ${opacity})`
        ctx.lineWidth = 2 + r.strength
        ctx.stroke()

        return true
      })

      particlesRef.current = particlesRef.current.filter(p => {
        p.life--
        if (p.life <= 1) return false

        p.x += p.vx
        p.y += p.vy
        p.vy += 0.02

        const opacity = Math.max(0.01, p.life / p.maxLife)
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.5, p.size * opacity), 0, Math.PI * 2)
        ctx.fillStyle = p.karma === 'good'
          ? `rgba(34, 197, 94, ${opacity})`
          : `rgba(239, 68, 68, ${opacity})`
        ctx.fill()

        return true
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const isGood = Math.random() > 0.5
    createRipple(x, y, isGood ? 'good' : 'evil', 1 + Math.random() * 2)
    
    if (isGood) {
      setGoodCount(c => c + 1)
      setTotalKarma(k => Math.min(100, k + 3))
    } else {
      setEvilCount(c => c + 1)
      setTotalKarma(k => Math.max(0, k - 3))
    }
  }, [createRipple])

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        position: 'relative',
        height: '350px',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '2rem',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        cursor: 'crosshair',
      }}>
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
          style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          }}
        />

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          textAlign: 'center',
        }}>
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: '4rem', marginBottom: '0.5rem' }}
          >
            🦋
          </motion.div>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
            点击画布播下业力种子
          </p>
        </div>

        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          right: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            padding: '0.5rem 1rem',
            background: 'rgba(34, 197, 94, 0.2)',
            borderRadius: '20px',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            color: '#22c55e',
            fontSize: '0.875rem',
          }}>
            ✅ 善业: {goodCount} 件
          </div>
          <div style={{
            padding: '0.5rem 1rem',
            background: totalKarma >= 60 ? 'rgba(34, 197, 94, 0.2)' : totalKarma >= 40 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            borderRadius: '20px',
            border: `1px solid ${totalKarma >= 60 ? 'rgba(34, 197, 94, 0.4)' : totalKarma >= 40 ? 'rgba(234, 179, 8, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
            color: totalKarma >= 60 ? '#22c55e' : totalKarma >= 40 ? '#eab308' : '#ef4444',
            fontSize: '0.875rem',
            fontWeight: 'bold',
          }}>
            🧘 业力总值: {totalKarma}
          </div>
          <div style={{
            padding: '0.5rem 1rem',
            background: 'rgba(239, 68, 68, 0.2)',
            borderRadius: '20px',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#ef4444',
            fontSize: '0.875rem',
          }}>
            ❌ 恶业: {evilCount} 件
          </div>
        </div>

        <motion.div
          key={totalKarma}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0.5rem 1rem',
            background: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '20px',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.875rem',
          }}
        >
          {KARMA_MEME_REACTIONS.find(r => totalKarma >= r.karma)?.message || KARMA_MEME_REACTIONS[KARMA_MEME_REACTIONS.length - 1].message}
        </motion.div>

        <AnimatePresence>
          {karmaEvent && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 180 }}
              transition={{ type: 'spring', bounce: 0.6 }}
              style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '1.5rem 2rem',
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.95), rgba(236, 72, 153, 0.95))',
                borderRadius: '16px',
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                zIndex: 150,
                boxShadow: '0 0 60px rgba(168, 85, 247, 0.6)',
                whiteSpace: 'nowrap',
              }}
            >
              {karmaEvent}
            </motion.div>
          )}

          {showResult && selectedAction && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              style={{
                position: 'absolute',
                bottom: '6rem',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '1rem 1.5rem',
                background: selectedAction.type === 'good' 
                  ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(6, 182, 212, 0.9))'
                  : 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(168, 85, 247, 0.9))',
                borderRadius: '12px',
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                boxShadow: '0 0 40px rgba(0,0,0,0.3)',
                minWidth: '280px',
                zIndex: 100,
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                {selectedAction.icon} {selectedAction.name}
              </div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                {selectedAction.type === 'good' ? '+' : '-'}{selectedAction.strength * 3} 业力
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <h4 style={{
        color: '#8b5cf6',
        marginBottom: '1rem',
        fontFamily: '"Noto Serif SC", serif',
      }}>
        🌱 造作业力
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.75rem',
        marginBottom: '1.5rem',
      }}>
        {KARMA_ACTIONS.filter(a => a.type === 'good').map(action => (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => commitAction(action)}
            style={{
              padding: '1rem 0.5rem',
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              borderRadius: '10px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s',
            }}
          >
            <div style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{action.icon}</div>
            <div style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: 'bold' }}>{action.name}</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.7rem' }}>+{action.strength * 3}</div>
          </motion.button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.75rem',
      }}>
        {KARMA_ACTIONS.filter(a => a.type === 'evil').map(action => (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => commitAction(action)}
            style={{
              padding: '1rem 0.5rem',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '10px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s',
            }}
          >
            <div style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{action.icon}</div>
            <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 'bold' }}>{action.name}</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.7rem' }}>-{action.strength * 3}</div>
          </motion.button>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'rgba(139, 92, 246, 0.1)',
        borderRadius: '12px',
        border: '1px solid rgba(139, 92, 246, 0.3)',
      }}>
        <p style={{
          color: '#8b5cf6',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
        }}>
          🦋 蝴蝶效应原理
        </p>
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: 1.8,
          fontSize: '0.9rem',
        }}>
          一念善心起，百万障门开；一念恶心起，百万障门开。
          每一个起心动念，如同投入湖面的石子，泛起层层涟漪，
          波及无量无边的时空。善业如光，普照万物；恶业如毒，渐染自心。
          莫以善小而不为，莫以恶小而为之。
        </p>
      </div>
    </div>
  )
}
