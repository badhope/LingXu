'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo, useRef } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

const MOON_PHASES = [
  { name: '新月', icon: '🌑', illumination: 0, desc: '日月合朔，月亮隐身不可见', tip: '宜：制定计划，韬光养晦' },
  { name: '蛾眉月', icon: '🌒', illumination: 25, desc: '新月如眉，初见黄昏后', tip: '宜：起步，着手新项目' },
  { name: '上弦月', icon: '🌓', illumination: 50, desc: '月半明，阴阳相半', tip: '宜：积极行动，勇往直前' },
  { name: '盈凸月', icon: '🌔', illumination: 75, desc: '月渐圆满，蓄势待发', tip: '宜：加强推进，接近目标' },
  { name: '满月', icon: '🌕', illumination: 100, desc: '皓月当空，阴阳圆满', tip: '宜：收获圆满，庆祝成果' },
  { name: '亏凸月', icon: '🌖', illumination: 75, desc: '月始亏，盛极而衰', tip: '宜：总结反思，去芜存菁' },
  { name: '下弦月', icon: '🌗', illumination: 50, desc: '月半缺，阴阳消长', tip: '宜：布施，释放，放下' },
  { name: '残月', icon: '🌘', illumination: 25, desc: '残月如钩，黎明前现', tip: '宜：休整，沉淀，准备新生' },
]

const TIDE_INFO = [
  { name: '大潮', icon: '🌊', when: '朔望日', effect: '引力叠加，潮水大涨', notice: '注意海潮，防洪水' },
  { name: '小潮', icon: '💧', when: '上下弦', effect: '引力抵消，潮水平缓', notice: '适合出海垂钓' },
]

const MOON_LEGENDS = [
  {
    title: '嫦娥奔月',
    icon: '👩',
    content: '羿请不死之药于西王母，姮娥窃以奔月，托身于月，是为蟾蜍。',
    source: '《淮南子·览冥训》',
  },
  {
    title: '吴刚伐桂',
    icon: '🪓',
    content: '月桂高五百丈，下有一人常斫之，树创随合。人姓吴名刚，学仙有过，谪令伐树。',
    source: '《酉阳杂俎·天咫》',
  },
  {
    title: '玉兔捣药',
    icon: '🐇',
    content: '月中有兔，持杵捣药，制成蛤蟆丸，服之可成仙。',
    source: '《乐府诗集·董逃行》',
  },
  {
    title: '蟾蜍食月',
    icon: '🐸',
    content: '月中有蟾蜍，为月之精。月蚀者，蟾蜍食月也。',
    source: '《史记·龟策列传》',
  },
]

const ECLIPSE_EVENTS = [
  { date: '2024-04-08', type: '日全食', visible: '北美洲', icon: '☀️' },
  { date: '2024-09-18', type: '月偏食', visible: '欧洲、亚洲', icon: '🌕' },
  { date: '2025-03-14', type: '日全食', visible: '北极地区', icon: '☀️' },
  { date: '2025-09-07', type: '月全食', visible: '太平洋沿岸', icon: '🌕' },
]

const calculateMoonPhase = (year: number, month: number, day: number): number => {
  const lp = 2551443
  const now = new Date(year, month - 1, day, 20, 35, 0).getTime()
  const new_moon = new Date(1970, 0, 7, 20, 35, 0).getTime()
  const phase = ((now - new_moon) / 1000) % lp
  return Math.floor(phase / (24 * 3600)) + 1
}

const MoonCanvas = ({ illumination }: { illumination: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    let animationFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius * 1.5)
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)')
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = 'rgba(200, 200, 220, 0.95)'
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      const shadowWidth = radius * 2 * (1 - illumination / 100)
      const shadowX = centerX - radius + shadowWidth

      ctx.fillStyle = 'rgba(15, 15, 25, 0.95)'
      ctx.beginPath()

      if (illumination < 50) {
        ctx.ellipse(shadowX, centerY, radius - shadowWidth / 2, radius, 0, -Math.PI / 2, Math.PI / 2)
        ctx.ellipse(centerX, centerY, radius, radius, 0, Math.PI / 2, -Math.PI / 2)
      } else {
        ctx.ellipse(shadowX, centerY, radius - shadowWidth / 2, radius, 0, Math.PI / 2, -Math.PI / 2)
      }
      ctx.fill()

      ctx.fillStyle = 'rgba(150, 150, 170, 0.3)'
      ctx.beginPath()
      ctx.arc(centerX - radius * 0.3, centerY - radius * 0.2, radius * 0.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(centerX + radius * 0.25, centerY + radius * 0.3, radius * 0.15, 0, Math.PI * 2)
      ctx.fill()

      animationFrame = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationFrame)
  }, [illumination])

  return <canvas ref={canvasRef} width={200} height={200} />
}

export default function YuexiangPage() {
  const [selectedDate, setSelectedDate] = useState('')
  const [moonPhase, setMoonPhase] = useState<number>(0)

  useEffect(() => {
    const today = new Date()
    setSelectedDate(today.toISOString().split('T')[0])
  }, [])

  useEffect(() => {
    if (!selectedDate) return
    const [year, month, day] = selectedDate.split('-').map(Number)
    const phaseDay = calculateMoonPhase(year, month, day)
    setMoonPhase(Math.floor(phaseDay / 3.69) % 8)
  }, [selectedDate])

  const currentPhase = MOON_PHASES[moonPhase]
  const nextFullMoon = useMemo(() => {
    const daysToFull = ((4 - moonPhase + 8) % 8) * 3.7
    return Math.ceil(daysToFull)
  }, [moonPhase])

  return (
    <SubPageTemplate
      title="月相查询"
      subtitle="阴晴圆缺 · 潮汐引力 · 日月食预报 · 月宫传说"
      icon="🌙"
      colorRgb="139, 92, 246"
    >
      <SubPageSection title="🌕 今日月相">
        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(0,0,0,0.5))',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <MoonCanvas illumination={currentPhase.illumination} />
            <div style={{ fontSize: '4rem', marginTop: '-2rem' }}>{currentPhase.icon}</div>
          </div>

          <div style={{ minWidth: '250px' }}>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                marginBottom: '1.5rem',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '8px',
                color: '#8b5cf6',
                fontSize: '1rem',
              }}
            />

            <motion.div
              key={currentPhase.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 style={{
                color: '#8b5cf6',
                fontSize: '2rem',
                marginBottom: '0.5rem',
              }}>
                {currentPhase.name}
              </h2>

              <div style={{
                width: '100%',
                height: '12px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '6px',
                marginBottom: '0.5rem',
                overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${currentPhase.illumination}%` }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #4c1d95, #8b5cf6, #a78bfa)',
                    borderRadius: '6px',
                  }}
                />
              </div>

              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                marginBottom: '0.5rem',
              }}>
                亮度：{currentPhase.illumination}%
              </p>

              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                marginBottom: '1rem',
              }}>
                "{currentPhase.desc}"
              </p>

              <div style={{
                padding: '0.75rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(139, 92, 246, 0.2)',
              }}>
                <span style={{ color: '#8b5cf6' }}>💫 运势建议：</span>
                <span style={{ color: 'rgba(180, 180, 190, 0.8)' }}> {currentPhase.tip}</span>
              </div>

              <div style={{
                marginTop: '1rem',
                color: nextFullMoon <= 3 ? '#f59e0b' : 'rgba(180, 180, 190, 0.6)',
                fontSize: '0.9rem',
              }}>
                🌕 距离下次满月还有：<strong>{nextFullMoon}</strong> 天
                {nextFullMoon <= 3 && ' 🌟 满月将至！'}
              </div>
            </motion.div>
          </div>
        </div>
      </SubPageSection>

      <SubPageSection title="🌊 潮汐预报">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {TIDE_INFO.map((tide, i) => (
            <motion.div
              key={tide.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '1.5rem',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '12px',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{tide.icon}</div>
              <h3 style={{ color: '#06b6d4', marginBottom: '0.5rem' }}>{tide.name}</h3>
              <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem' }}>
                出现时间：{tide.when}
              </p>
              <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem' }}>
                潮汐效果：{tide.effect}
              </p>
              <p style={{ color: '#f59e0b', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                ⚠️ {tide.notice}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="📜 月宫神话传说">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
        }}>
          {MOON_LEGENDS.map((legend, i) => (
            <motion.div
              key={legend.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '1.25rem',
                background: 'rgba(139, 92, 246, 0.08)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '10px',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}>
                <span style={{ fontSize: '1.5rem' }}>{legend.icon}</span>
                <h3 style={{ color: '#8b5cf6', margin: 0 }}>{legend.title}</h3>
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.85rem',
                lineHeight: 1.7,
                fontStyle: 'italic',
                marginBottom: '0.5rem',
              }}>
                "{legend.content}"
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.5)',
                fontSize: '0.75rem',
                textAlign: 'right',
              }}>
                —— {legend.source}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="🔭 日月食预报">
        <InfoCard>
          <p style={{
            color: 'rgba(180, 180, 190, 0.75)',
            textAlign: 'center',
          }}>
            以下为近年重大日月食天文事件，可观测地区标记
          </p>
        </InfoCard>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {ECLIPSE_EVENTS.map((event, i) => (
            <motion.div
              key={event.date}
              whileHover={{ scale: 1.03 }}
              style={{
                padding: '1rem',
                textAlign: 'center',
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '10px',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{event.icon}</div>
              <div style={{
                color: '#ef4444',
                fontWeight: 'bold',
                marginBottom: '0.25rem',
              }}>
                {event.type}
              </div>
              <div style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.9rem',
              }}>
                {event.date}
              </div>
              <div style={{
                color: 'rgba(180, 180, 190, 0.6)',
                fontSize: '0.8rem',
                marginTop: '0.25rem',
              }}>
                可观测：{event.visible}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="🌘 月相周期速查">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
        }}>
          {MOON_PHASES.map((phase, i) => (
            <motion.div
              key={phase.name}
              whileHover={{ y: -4 }}
              style={{
                padding: '1rem',
                textAlign: 'center',
                background: i === moonPhase ? 'rgba(139, 92, 246, 0.2)' : 'rgba(0,0,0,0.2)',
                border: i === moonPhase ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                transition: 'all 0.3s',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{phase.icon}</div>
              <div style={{
                color: i === moonPhase ? '#8b5cf6' : 'rgba(180, 180, 190, 0.8)',
                fontWeight: i === moonPhase ? 'bold' : 'normal',
              }}>
                {phase.name}
              </div>
              <div style={{
                color: 'rgba(180, 180, 190, 0.5)',
                fontSize: '0.8rem',
              }}>
                {phase.illumination}%
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
