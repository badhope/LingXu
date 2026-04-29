'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

interface CreationStage {
  id: number
  name: string
  desc: string
  duration: string
  event: string
  state: string
  entropy: number
}

const CREATION_STAGES: CreationStage[] = [
  { id: 1, name: '混沌未开', desc: '混沌如鸡子，盘古生其中', duration: '一元会', event: '盘古诞生', state: '混沌', entropy: 100 },
  { id: 2, name: '开天辟地', desc: '盘古执斧，劈开混沌', duration: '一会', event: '开天斧出', state: '分化', entropy: 80 },
  { id: 3, name: '清浊分离', desc: '阳气清轻升而为天，阴气重浊降而为地', duration: '三千年', event: '天地初分', state: '形成', entropy: 60 },
  { id: 4, name: '天柱撑天', desc: '盘古站于天地之间，一日九变', duration: '一万八千年', event: '天柱成型', state: '稳定', entropy: 40 },
  { id: 5, name: '身化万物', desc: '盘古力竭而死，身体化为洪荒万物', duration: '瞬间', event: '万物衍生', state: '新生', entropy: 20 },
  { id: 6, name: '元神三分', desc: '盘古元神化为三清，立地水火风', duration: '瞬间', event: '三清诞生', state: '传承', entropy: 10 },
  { id: 7, name: '精血化巫', desc: '盘古精血化为十二祖巫，称霸大地', duration: '瞬间', event: '巫族诞生', state: '生机', entropy: 5 },
  { id: 8, name: '洪荒初定', desc: '开天功德落下，先天灵宝出世', duration: '千年', event: '洪荒成型', state: '圆满', entropy: 0 }
]

interface CreationParticle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
}

export default function PanguPage() {
  const [creating, setCreating] = useState(false)
  const [createStep, setCreateStep] = useState(0)
  const [createProgress, setCreateProgress] = useState(0)
  const [heavenHeight, setHeavenHeight] = useState(0)
  const [earthDepth, setEarthDepth] = useState(0)
  const [panguHeight, setPanguHeight] = useState(0)
  const [worldStability, setWorldStability] = useState(0)
  const [merit, setMerit] = useState(0)
  const [createResult, setCreateResult] = useState<boolean | null>(null)
  const [particles, setParticles] = useState<CreationParticle[]>([])

  useEffect(() => {
    const newParticles: CreationParticle[] = []
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        color: ['#fbbf24', '#7c3aed', '#ef4444', '#22c55e', '#3b82f6'][Math.floor(Math.random() * 5)],
        speed: Math.random() * 2 + 0.5
      })
    }
    setParticles(newParticles)
  }, [creating])

  const startCreation = useCallback(() => {
    setCreating(true)
    setCreateStep(0)
    setCreateProgress(0)
    setHeavenHeight(0)
    setEarthDepth(0)
    setPanguHeight(0)
    setWorldStability(0)
    setMerit(0)
    setCreateResult(null)

    let step = 0
    let progress = 0

    const interval = setInterval(() => {
      progress += Math.random() * 2 + 0.3

      if (progress >= 100 && step < 7) {
        progress = 0
        step++
        setCreateStep(step)
        setWorldStability(100 - CREATION_STAGES[step].entropy)
      }
      if (step >= 7 && progress >= 100) {
        clearInterval(interval)
        setCreateProgress(100)
        setWorldStability(100)
        setMerit(100)
        setTimeout(() => {
          setCreateResult(true)
          setCreating(false)
        }, 1000)
        return
      }
      setCreateProgress(Math.min(progress, 100))
      setHeavenHeight(Math.min(step * 12.5 + progress / 8, 100))
      setEarthDepth(Math.min(step * 12.5 + progress / 8, 100))
      setPanguHeight(Math.min(step * 12.5 + progress / 8, 100))
      setMerit(Math.min((step / 7) * 100, 95))
    }, 100)
  }, [])

  return (
    <SubPageTemplate
      title="盘古开天"
      subtitle="混沌初开，乾坤始奠，轻清上浮而为天，重浊下凝而为地"
      icon="🪓"
      colorRgb="245, 158, 11"
    >
      <SubPageSection title="🪓 开天辟地模拟器">
        <InfoCard glowIntensity={95} glowColor="245, 158, 11">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!creating && !createResult ? (
              <div>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ fontSize: '6rem', marginBottom: '1rem' }}
                >
                  🥚
                </motion.div>
                <h3 style={{ marginBottom: '1rem', color: '#f59e0b' }}>混沌如鸡子，盘古生其中</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
                  天地混沌如鸡子，盘古生其中。万八千岁，天地开辟，阳清为天，阴浊为地。
                  盘古在其中，一日九变，神于天，圣于地。天日高一丈，地日厚一丈，盘古日长一丈。
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startCreation}
                  style={{
                    padding: '1rem 3rem',
                    fontSize: '1.2rem',
                    background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
                    border: 'none',
                    borderRadius: '50px',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 700,
                    boxShadow: '0 10px 40px rgba(245, 158, 11, 0.4)'
                  }}
                >
                  🪓 执斧开天！
                </motion.button>
              </div>
            ) : creating ? (
              <div>
                <div style={{
                  position: 'relative',
                  height: 300,
                  borderRadius: '15px',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 50%, #78350f 100%)'
                }}>
                  {particles.map((p) => (
                    <motion.div
                      key={p.id}
                      animate={{
                        y: [p.y, p.y - p.speed * 10, p.y],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{ duration: 2 + p.speed, repeat: Infinity, delay: p.id * 0.05 }}
                      style={{
                        position: 'absolute',
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        background: p.color,
                        boxShadow: `0 0 ${p.size * 2}px ${p.color}`
                      }}
                    />
                  ))}

                  <motion.div
                    animate={{ height: `${heavenHeight}%` }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(180deg, #0ea5e9 0%, #38bdf8 50%, rgba(255,255,255,0.1) 100%)',
                      borderBottom: '2px solid rgba(255,255,255,0.5)'
                    }}
                  />

                  <motion.div
                    animate={{ height: `${earthDepth}%` }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(0deg, #78350f 0%, #92400e 50%, rgba(139, 69, 19, 0.5) 100%)',
                      borderTop: '2px solid rgba(139, 69, 19, 0.8)'
                    }}
                  />

                  <motion.div
                    animate={{
                      height: `${panguHeight}%`,
                      top: `${50 - panguHeight / 2}%`
                    }}
                    style={{
                      position: 'absolute',
                      left: '45%',
                      width: '10%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [-15, 15, -15], scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      style={{ fontSize: '3rem' }}
                    >
                      🪓
                    </motion.div>
                  </motion.div>

                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}>
                    ☀️ 天高度：{Math.round(heavenHeight)}万丈
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}>
                    🌍 地厚度：{Math.round(earthDepth)}万丈
                  </div>
                </div>

                <h3 style={{ marginBottom: '0.5rem', color: '#f59e0b' }}>
                  {CREATION_STAGES[createStep].name}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  color: 'rgba(180, 180, 190, 0.8)'
                }}>
                  {CREATION_STAGES[createStep].desc}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#fbbf24', marginBottom: '1rem' }}>
                  📜 事件：{CREATION_STAGES[createStep].event}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: 500, margin: '0 auto 1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', marginBottom: '0.25rem', color: '#0ea5e9' }}>🌏 世界稳定</div>
                    <ProgressBar value={worldStability} color="#0ea5e9" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', marginBottom: '0.25rem', color: '#fbbf24' }}>✨ 开天功德</div>
                    <ProgressBar value={merit} color="#fbbf24" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', marginBottom: '0.25rem', color: '#7c3aed' }}>🔥 混沌熵值</div>
                    <ProgressBar value={100 - worldStability} color="#7c3aed" />
                  </div>
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto' }}>
                  <ProgressBar value={createProgress} color="#f59e0b" />
                </div>
              </div>
            ) : createResult ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ fontSize: '6rem', marginBottom: '1rem' }}
                  >
                    🌌
                  </motion.div>
                  <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '0.5rem',
                    color: '#f59e0b',
                    fontWeight: 700
                  }}>
                    开天辟地成功！
                  </h2>
                  <p style={{
                    fontSize: '1.2rem',
                    color: '#fbbf24',
                    marginBottom: '1rem'
                  }}>
                    天地开辟，乾坤始奠，洪荒世界诞生！🎉
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                    maxWidth: 500,
                    margin: '1rem auto 2rem',
                    textAlign: 'left'
                  }}>
                    <div style={{ padding: '1rem', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                      <div style={{ color: '#22c55e', fontWeight: 600, marginBottom: '0.5rem' }}>🧠 元神三分</div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)' }}>太上老君、元始天尊、通天教主</div>
                    </div>
                    <div style={{ padding: '1rem', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                      <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: '0.5rem' }}>❤️ 精血化巫</div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)' }}>十二祖巫诞生，称霸大地</div>
                    </div>
                    <div style={{ padding: '1rem', borderRadius: '10px', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <div style={{ color: '#fbbf24', fontWeight: 600, marginBottom: '0.5rem' }}>💎 灵宝出世</div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)' }}>开天斧、造化玉蝶、混沌青莲</div>
                    </div>
                    <div style={{ padding: '1rem', borderRadius: '10px', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
                      <div style={{ color: '#0ea5e9', fontWeight: 600, marginBottom: '0.5rem' }}>🏆 开天功德</div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)' }}>无量功德，成就至高道果</div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCreateResult(null)}
                    style={{
                      padding: '0.8rem 2rem',
                      background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
                      border: 'none',
                      borderRadius: '50px',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    🪓 再开一次天！
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="📜 开天八步详解">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CREATION_STAGES.map((stage, idx) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <InfoCard glowIntensity={60} glowColor="245, 158, 11">
                <div className="text-center">
                  <div style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'white'
                  }}>
                    {stage.id}
                  </div>
                  <h4 style={{ color: '#f59e0b', fontWeight: 700, marginBottom: '0.5rem' }}>{stage.name}</h4>
                  <p className="text-sm text-gray-300 mb-2">{stage.desc}</p>
                  <div className="text-xs text-gray-500">⏱️ {stage.duration}</div>
                  <div className="text-xs mt-1" style={{ color: '#fbbf24' }}>📜 {stage.event}</div>
                </div>
              </InfoCard>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}