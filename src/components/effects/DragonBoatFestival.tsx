'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Talismans {
  wormwood: number
  calamus: number
  realgar: number
  dragonBoat: number
  zongzi: number
}

interface EvilSpirit {
  id: number
  x: number
  y: number
  type: string
  health: number
  maxHealth: number
}

const EVIL_TYPES = [
  { type: '瘟神', icon: '🦠', health: 60, points: 10 },
  { type: '厉鬼', icon: '👻', health: 80, points: 15 },
  { type: '妖精', icon: '🧝', health: 50, points: 8 },
  { type: '煞星', icon: '💀', health: 100, points: 20 },
  { type: '孽障', icon: '🔥', health: 70, points: 12 },
]

const TALISMAN_INFO: Record<string, { name: string, icon: string, power: number, color: string, desc: string }> = {
  wormwood: { name: '艾草', icon: '🌿', power: 30, color: '#22c55e', desc: '驱邪避疫，招纳百福' },
  calamus: { name: '菖蒲', icon: '🗡️', power: 50, color: '#06b6d4', desc: '形如利剑，斩妖除魔' },
  realgar: { name: '雄黄酒', icon: '🍶', power: 80, color: '#f97316', desc: '克制五毒，净化邪祟' },
  dragonBoat: { name: '龙舟', icon: '🛶', power: 100, color: '#eab308', desc: '龙王加持，大威神力' },
  zongzi: { name: '粽子', icon: '🫔', power: 20, color: '#84cc16', desc: '祭祀祖先，补充能量' },
}

export default function DragonBoatFestival() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const [phase, setPhase] = useState<'intro' | 'game' | 'result'>('intro')
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [talismans, setTalismans] = useState<Talismans>({
    wormwood: 3, calamus: 2, realgar: 1, dragonBoat: 0, zongzi: 5
  })
  const [evilSpirits, setEvilSpirits] = useState<EvilSpirit[]>([])
  const [selectedTalisman, setSelectedTalisman] = useState<string>('wormwood')
  const [message, setMessage] = useState<string>('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [timeLeft, setTimeLeft] = useState(60)
  const [effects, setEffects] = useState<Array<{ id: number, x: number, y: number, type: string }>>([])

  useEffect(() => {
    if (phase !== 'game') return

    const spawnInterval = setInterval(() => {
      if (evilSpirits.length < 5 + level) {
        const typeInfo = EVIL_TYPES[Math.floor(Math.random() * EVIL_TYPES.length)]
        setEvilSpirits(spirits => [...spirits, {
          id: Date.now() + Math.random(),
          x: 50 + Math.random() * 400,
          y: 50 + Math.random() * 200,
          type: typeInfo.type,
          health: typeInfo.health * (1 + level * 0.1),
          maxHealth: typeInfo.health * (1 + level * 0.1),
        }])
      }
    }, 2000 - level * 100)

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setPhase('result')
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => {
      clearInterval(spawnInterval)
      clearInterval(timer)
    }
  }, [phase, level, evilSpirits.length])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || phase !== 'game') return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)'
      ctx.fillRect(0, 0, width, height)

      setEvilSpirits(spirits => spirits.map(s => ({
        ...s,
        x: s.x + (Math.random() - 0.5) * 2,
        y: s.y + (Math.random() - 0.5) * 2,
      })))

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [phase])

  const attackEvil = (evil: EvilSpirit, e: React.MouseEvent) => {
    e.stopPropagation()
    const talisman = TALISMAN_INFO[selectedTalisman]
    
    if (talismans[selectedTalisman as keyof Talismans] <= 0) {
      setMessage('❌ 符箓不足！请换用其他法宝')
      setTimeout(() => setMessage(''), 2000)
      return
    }

    setTalismans(t => ({
      ...t,
      [selectedTalisman]: t[selectedTalisman as keyof Talismans] - 1
    }))

    const damage = talisman.power * (0.8 + Math.random() * 0.4)
    const newHealth = evil.health - damage

    setEffects(e => [...e, { id: Date.now(), x: evil.x, y: evil.y, type: selectedTalisman }])
    setTimeout(() => {
      setEffects(e => e.filter(ef => ef.id !== Date.now()))
    }, 500)

    if (newHealth <= 0) {
      const points = EVIL_TYPES.find(t => t.type === evil.type)?.points || 10
      setScore(s => s + points * level)
      setEvilSpirits(spirits => spirits.filter(s => s.id !== evil.id))
      setMessage(`✨ ${talisman.icon} 击退${evil.type}！+${points * level}功德`)
      
      if (Math.random() > 0.5) {
        const drops = ['wormwood', 'calamus', 'zongzi']
        const drop = drops[Math.floor(Math.random() * drops.length)]
        setTalismans(t => ({
          ...t,
          [drop]: t[drop as keyof Talismans] + 1
        }))
        setMessage(m => m + ` 获得${TALISMAN_INFO[drop].icon}`)
      }
    } else {
      setEvilSpirits(spirits => spirits.map(s =>
        s.id === evil.id ? { ...s, health: newHealth } : s
      ))
      setMessage(`💥 ${talisman.icon} 造成${Math.round(damage)}点伤害！`)
    }

    setTimeout(() => setMessage(''), 2500)

    if (score > 0 && score % 100 === 0) {
      setLevel(l => Math.min(5, l + 1))
      setMessage(`🎉 升级！当前等级 ${level + 1}`)
    }
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (phase !== 'game') return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const startGame = () => {
    setPhase('game')
    setScore(0)
    setLevel(1)
    setTimeLeft(60)
    setEvilSpirits([])
    setTalismans({ wormwood: 3, calamus: 2, realgar: 1, dragonBoat: 0, zongzi: 5 })
  }

  const getEvaluation = () => {
    if (score >= 300) return { title: '驱邪大师', icon: '🏆', color: '#eab308', desc: '百邪不侵，万神护佑！你是真正的驱邪法师！' }
    if (score >= 200) return { title: '正一道士', icon: '🥇', color: '#f97316', desc: '道法精深，邪祟退散！非常优秀！' }
    if (score >= 100) return { title: '修行居士', icon: '🥈', color: '#84cc16', desc: '心诚则灵，善有善报！继续加油！' }
    return { title: '普通信众', icon: '🥉', color: '#06b6d4', desc: '诚心敬拜，百福骈臻！多行善事积累功德！' }
  }

  return (
    <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            style={{ textAlign: 'center', padding: '2rem 1rem' }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '5rem', marginBottom: '1.5rem' }}
            >
              🐲
            </motion.div>

            <h2 style={{
              fontSize: '2rem',
              color: '#eab308',
              fontFamily: '"Noto Serif SC", serif',
              marginBottom: '1rem',
            }}>
              端午驱邪大法会
            </h2>

            <p style={{
              lineHeight: 1.8,
              color: 'rgba(255, 255, 255, 0.75)',
              marginBottom: '2rem',
            }}>
              五月初五，正阳之月，毒气盛行，百虫出动。<br />
              请挥动你的艾草菖蒲，洒下雄黄酒，驱赶邪祟瘟神！<br />
              守护人间清净，积累无上功德！
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.75rem',
              marginBottom: '2rem',
            }}>
              {Object.entries(TALISMAN_INFO).map(([key, info]) => (
                <div
                  key={key}
                  style={{
                    padding: '0.75rem 0.5rem',
                    background: info.color + '20',
                    borderRadius: '8px',
                    border: '1px solid ' + info.color + '60',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '1.75rem' }}>{info.icon}</div>
                  <div style={{ color: info.color, fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {info.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                    威力{info.power}
                  </div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              style={{
                padding: '1rem 3rem',
                background: 'linear-gradient(135deg, #eab308 0%, #f97316 100%)',
                border: 'none',
                borderRadius: '30px',
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(234, 179, 8, 0.4)',
              }}
            >
              🛶 开始驱邪仪式
            </motion.button>
          </motion.div>
        )}

        {phase === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px 12px 0 0',
              borderBottom: '1px solid rgba(234, 179, 8, 0.3)',
            }}>
              <div>
                <span style={{ color: '#eab308', fontWeight: 'bold' }}>🌟 功德: {score}</span>
                <span style={{ margin: '0 1rem', color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
                <span style={{ color: '#22c55e' }}>等级 {level}</span>
              </div>
              <div style={{
                color: timeLeft <= 10 ? '#ef4444' : '#06b6d4',
                fontWeight: 'bold',
                animation: timeLeft <= 10 ? 'pulse 0.5s infinite' : 'none',
              }}>
                ⏱️ {timeLeft}秒
              </div>
            </div>

            <div style={{
              position: 'relative',
              height: '350px',
              background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 50%, #1e3a5f 100%)',
              overflow: 'hidden',
              cursor: 'crosshair',
            }}>
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                }}
              />

              {evilSpirits.map((evil) => {
                const typeInfo = EVIL_TYPES.find(t => t.type === evil.type)
                return (
                  <motion.div
                    key={evil.id}
                    animate={{
                      x: evil.x,
                      y: evil.y,
                      transition: { type: 'spring', stiffness: 50 }
                    }}
                    onClick={(e) => attackEvil(evil, e)}
                    style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      zIndex: 10,
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{
                        fontSize: '2.5rem',
                        textAlign: 'center',
                        filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.6))',
                      }}
                    >
                      {typeInfo?.icon || '👻'}
                    </motion.div>
                    <div style={{
                      width: '50px',
                      height: '6px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      marginTop: '0.25rem',
                    }}>
                      <div style={{
                        width: `${(evil.health / evil.maxHealth) * 100}%`,
                        height: '100%',
                        background: evil.health / evil.maxHealth > 0.5 ? '#22c55e' : evil.health / evil.maxHealth > 0.25 ? '#eab308' : '#ef4444',
                        transition: 'width 0.3s',
                      }} />
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: '#ef4444',
                      textAlign: 'center',
                      marginTop: '0.25rem',
                    }}>
                      {evil.type}
                    </div>
                  </motion.div>
                )
              })}

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '20px',
                    border: '1px solid rgba(234, 179, 8, 0.5)',
                    color: 'white',
                    fontWeight: 'bold',
                    zIndex: 100,
                  }}
                >
                  {message}
                </motion.div>
              )}

              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '60px',
                background: 'linear-gradient(transparent, rgba(6, 182, 212, 0.3))',
              }}>
                <motion.div
                  animate={{ x: ['10%', '80%', '10%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', bottom: '10px', fontSize: '2.5rem' }}
                >
                  🛶
                </motion.div>
              </div>
            </div>

            <div style={{
              padding: '1rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '0 0 12px 12px',
              borderTop: '1px solid rgba(234, 179, 8, 0.3)',
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '0.75rem',
              }}>
                选择法宝点击邪祟进行攻击：
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.75rem',
              }}>
                {Object.entries(TALISMAN_INFO).map(([key, info]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTalisman(key)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      background: selectedTalisman === key
                        ? info.color + '40'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: '2px solid ' + (selectedTalisman === key ? info.color : 'rgba(255, 255, 255, 0.2)'),
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      minWidth: '70px',
                    }}
                  >
                    <div style={{ fontSize: '1.5rem' }}>{info.icon}</div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: talismans[key as keyof Talismans] > 0 ? info.color : '#6b7280',
                      fontWeight: 'bold',
                    }}>
                      {info.name} ×{talismans[key as keyof Talismans]}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '2rem 1rem' }}
          >
            {(() => {
              const evalData = getEvaluation()
              return (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1.5 }}
                    style={{ fontSize: '6rem', marginBottom: '1rem' }}
                  >
                    {evalData.icon}
                  </motion.div>

                  <h2 style={{
                    fontSize: '2rem',
                    color: evalData.color,
                    fontFamily: '"Noto Serif SC", serif',
                    marginBottom: '0.5rem',
                  }}>
                    {evalData.title}
                  </h2>

                  <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                    🌟 累计功德: <span style={{ color: '#eab308', fontWeight: 'bold' }}>{score}</span> 分
                  </p>

                  <p style={{
                    lineHeight: 1.8,
                    color: 'rgba(255, 255, 255, 0.75)',
                    marginBottom: '2rem',
                  }}>
                    {evalData.desc}
                  </p>

                  <div style={{
                    padding: '1.5rem',
                    background: 'rgba(34, 197, 94, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    marginBottom: '2rem',
                  }}>
                    <p style={{ color: '#22c55e', fontWeight: 'bold' }}>🙏 回向偈</p>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginTop: '0.5rem',
                      fontFamily: 'serif',
                      fontStyle: 'italic',
                    }}>
                      愿以此功德，普及于一切。<br />
                      我等与众生，皆共成佛道。
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      style={{
                        padding: '0.875rem 2rem',
                        background: 'linear-gradient(135deg, #eab308 0%, #f97316 100%)',
                        border: 'none',
                        borderRadius: '25px',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 10px 30px rgba(234, 179, 8, 0.4)',
                      }}
                    >
                      🔄 再次驱邪
                    </motion.button>
                  </div>
                </>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
