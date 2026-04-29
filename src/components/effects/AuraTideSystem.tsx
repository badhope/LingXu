'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useClientTime, useMounted } from '@/hooks/useClientSide'

interface ShiChen {
  name: string
  alias: string
  startHour: number
  endHour: number
  baseAura: number
  fiveElement: string
  direction: string
  organ: string
  practiceTips: string
}

const SHI_CHENS: ShiChen[] = [
  { name: '子时', alias: '夜半', startHour: 23, endHour: 1, baseAura: 100, fiveElement: '水', direction: '正北', organ: '胆', practiceTips: '一阳初生，静坐养神，阳气萌动之时，宜炼精化气' },
  { name: '丑时', alias: '鸡鸣', startHour: 1, endHour: 3, baseAura: 85, fiveElement: '土', direction: '东北', organ: '肝', practiceTips: '养肝血，宜熟睡，魂藏于肝，无梦最妙' },
  { name: '寅时', alias: '平旦', startHour: 3, endHour: 5, baseAura: 90, fiveElement: '木', direction: '东北', organ: '肺', practiceTips: '肺朝百脉，宜深度睡眠，精气运行之时' },
  { name: '卯时', alias: '日出', startHour: 5, endHour: 7, baseAura: 75, fiveElement: '木', direction: '正东', organ: '大肠', practiceTips: '宜起床排便，喝温水，阳气升发' },
  { name: '辰时', alias: '食时', startHour: 7, endHour: 9, baseAura: 70, fiveElement: '土', direction: '东南', organ: '胃', practiceTips: '吃早餐，养胃气，一日之计在于晨' },
  { name: '巳时', alias: '隅中', startHour: 9, endHour: 11, baseAura: 65, fiveElement: '火', direction: '东南', organ: '脾', practiceTips: '脾主运化，宜工作学习，效率最高' },
  { name: '午时', alias: '日中', startHour: 11, endHour: 13, baseAura: 95, fiveElement: '火', direction: '正南', organ: '心', practiceTips: '一阴初生，宜午休片刻，养心气' },
  { name: '未时', alias: '日昳', startHour: 13, endHour: 15, baseAura: 60, fiveElement: '土', direction: '西南', organ: '小肠', practiceTips: '小肠主吸收，营养运化之时' },
  { name: '申时', alias: '哺时', startHour: 15, endHour: 17, baseAura: 70, fiveElement: '金', direction: '西南', organ: '膀胱', practiceTips: '膀胱经旺，宜运动锻炼，排毒最好时机' },
  { name: '酉时', alias: '日入', startHour: 17, endHour: 19, baseAura: 80, fiveElement: '金', direction: '正西', organ: '肾', practiceTips: '肾经旺，宜静养，藏精气之时' },
  { name: '戌时', alias: '黄昏', startHour: 19, endHour: 21, baseAura: 85, fiveElement: '土', direction: '西北', organ: '心包', practiceTips: '心包经旺，宜放松娱乐，喜乐出焉' },
  { name: '亥时', alias: '人定', startHour: 21, endHour: 23, baseAura: 95, fiveElement: '水', direction: '西北', organ: '三焦', practiceTips: '三焦通百脉，宜入睡，百脉皆得休养' },
]

const ELEMENT_COLORS: Record<string, string> = {
  '金': '#fbbf24',
  '木': '#22c55e',
  '水': '#3b82f6',
  '火': '#ef4444',
  '土': '#a855f7',
}

const CULTIVATION_EVENTS = [
  { name: '突破', message: '💥 突破瓶颈！修为大增！', multiplier: 3, chance: 0.08 },
  { name: '顿悟', message: '⚡ 灵光一闪！悟道成功！', multiplier: 4, chance: 0.05 },
  { name: '心魔', message: '👁️ 心魔入侵！险些走火入魔...', multiplier: 0.3, chance: 0.1 },
  { name: '奇遇', message: '✨ 远古传承！获得神秘加持！', multiplier: 5, chance: 0.03 },
  { name: '走火', message: '🔥 灵力反噬！需要闭关调息...', multiplier: 0.1, chance: 0.07 },
]

export default function AuraTideSystem() {
  const { time: currentTime, mounted } = useClientTime()
  const [selectedShiChen, setSelectedShiChen] = useState<ShiChen | null>(null)
  const [practiceBonus, setPracticeBonus] = useState(0)
  const [totalCultivation, setTotalCultivation] = useState(0)

  const currentShiChen = useMemo(() => {
    if (!mounted || !currentTime) return SHI_CHENS[0]
    
    const hour = currentTime.getHours()
    const minute = currentTime.getMinutes()
    const totalMinutes = hour * 60 + minute

    for (let i = 0; i < SHI_CHENS.length; i++) {
      const sc = SHI_CHENS[i]
      const startMinutes = sc.startHour * 60
      const endMinutes = sc.endHour * 60

      if (sc.startHour === 23) {
        if (totalMinutes >= startMinutes || totalMinutes < endMinutes) {
          return sc
        }
      } else {
        if (totalMinutes >= startMinutes && totalMinutes < endMinutes) {
          return sc
        }
      }
    }
    return SHI_CHENS[0]
  }, [mounted, currentTime])

  const auraIntensity = useMemo(() => {
    if (!mounted || !currentTime) return 100
    
    const hour = currentTime.getHours()
    const minute = currentTime.getMinutes()
    const totalMinutes = hour * 60 + minute

    let midHour = (currentShiChen.startHour + currentShiChen.endHour) / 2
    if (currentShiChen.startHour === 23) midHour = 0

    const midMinutes = midHour * 60
    let diff = Math.abs(totalMinutes - midMinutes)
    if (currentShiChen.startHour === 23) {
      diff = Math.min(diff, 1440 - diff)
    }

    const maxDiff = 60
    const intensityFactor = 1 - (diff / maxDiff) * 0.3
    return Math.round(currentShiChen.baseAura * intensityFactor)
  }, [mounted, currentTime, currentShiChen])

  const getAuraLevel = (intensity: number) => {
    if (intensity >= 95) return { level: 'S', text: '极盛', color: '#eab308', desc: '灵气潮汐顶峰！修炼最佳时机！' }
    if (intensity >= 85) return { level: 'A', text: '鼎盛', color: '#22c55e', desc: '灵气充沛，修炼正当时' }
    if (intensity >= 75) return { level: 'B', text: '旺盛', color: '#84cc16', desc: '灵气充足，适合修炼' }
    if (intensity >= 65) return { level: 'C', text: '平稳', color: '#06b6d4', desc: '灵气平稳，普通修炼' }
    return { level: 'D', text: '稀薄', color: '#6b7280', desc: '灵气较薄，适合静养' }
  }

  const auraLevel = getAuraLevel(auraIntensity)
  const isZiShi = currentShiChen.name === '子时' || currentShiChen.name === '亥时'
  const isWuShi = currentShiChen.name === '午时'

  const particlePositions = useMemo(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: 5 + (i * 4.7) % 90,
      top: 10 + (i * 3.7) % 80,
      duration: 3 + (i % 4) * 0.5,
      delay: (i * 0.3) % 3,
    })), []
  )

  const [cultivationEvent, setCultivationEvent] = useState<string | null>(null)

  const startCultivation = useCallback(() => {
    const baseGain = auraIntensity
    const timeBonus = isZiShi ? 2 : isWuShi ? 1.5 : 1
    
    const roll = Math.random()
    let eventMultiplier = 1
    let triggeredEvent = null
    
    for (const event of CULTIVATION_EVENTS) {
      if (roll < event.chance) {
        eventMultiplier = event.multiplier
        triggeredEvent = event.message
        break
      }
    }
    
    const gain = Math.round(baseGain * timeBonus * eventMultiplier)
    setPracticeBonus(gain)
    setTotalCultivation(t => t + gain)
    
    if (triggeredEvent) {
      setCultivationEvent(triggeredEvent)
      setTimeout(() => setCultivationEvent(null), 4000)
    }
    
    setTimeout(() => setPracticeBonus(0), 3000)
  }, [auraIntensity, isZiShi, isWuShi])

  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour12: false })
  }, [])

  if (!mounted) {
    return (
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.5)' }}>加载中...</div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        background: `radial-gradient(ellipse at center, ${auraLevel.color}30 0%, transparent 70%)`,
        borderRadius: '16px',
        padding: '2rem',
        border: '1px solid ' + auraLevel.color + '60',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {particlePositions.map(p => (
          <motion.div
            key={p.id}
            animate={{
              y: ['-10px', '10px'],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: auraLevel.color,
              boxShadow: `0 0 10px ${auraLevel.color}`,
              zIndex: 1,
            }}
          />
        ))}

        <AnimatePresence>
          {cultivationEvent && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: -50 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.95), rgba(236, 72, 153, 0.95))',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                zIndex: 100,
                whiteSpace: 'nowrap',
                boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
              }}
            >
              {cultivationEvent}
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}>
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontFamily: '"Roboto Mono", monospace',
                fontWeight: 'bold',
                color: auraLevel.color,
                textShadow: `0 0 20px ${auraLevel.color}80`,
              }}>
                {currentTime && formatTime(currentTime)}
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
                {currentTime?.toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: auraLevel.color,
                textShadow: `0 0 30px ${auraLevel.color}`,
              }}>
                {auraLevel.level}
              </div>
              <div style={{ color: auraLevel.color, fontWeight: 'bold' }}>
                灵气{auraLevel.text}
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '120px 1fr',
            gap: '1.5rem',
            alignItems: 'center',
          }}>
            <motion.div
              animate={{
                boxShadow: [`0 0 20px ${ELEMENT_COLORS[currentShiChen.fiveElement]}60`, `0 0 40px ${ELEMENT_COLORS[currentShiChen.fiveElement]}`, `0 0 20px ${ELEMENT_COLORS[currentShiChen.fiveElement]}60`],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${ELEMENT_COLORS[currentShiChen.fiveElement]} 0%, ${ELEMENT_COLORS[currentShiChen.fiveElement]}44 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0 0 10px rgba(0,0,0,0.5)',
              }}
            >
              <div>{currentShiChen.name}</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                {currentShiChen.alias}
              </div>
            </motion.div>

            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>灵气强度:</span>
                <div style={{
                  flex: 1,
                  height: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <motion.div
                    animate={{ width: `${auraIntensity}%` }}
                    transition={{ duration: 0.5 }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${auraLevel.color}88, ${auraLevel.color})`,
                      borderRadius: '6px',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '-20px',
                    color: auraLevel.color,
                    fontWeight: 'bold',
                  }}>
                    {auraIntensity}%
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.75rem',
                fontSize: '0.875rem',
                marginBottom: '1rem',
              }}>
                <div style={{
                  padding: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  textAlign: 'center',
                }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>五行</div>
                  <div style={{ color: ELEMENT_COLORS[currentShiChen.fiveElement], fontWeight: 'bold' }}>
                    {currentShiChen.fiveElement}行
                  </div>
                </div>
                <div style={{
                  padding: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  textAlign: 'center',
                }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>方位</div>
                  <div style={{ color: '#06b6d4', fontWeight: 'bold' }}>
                    {currentShiChen.direction}
                  </div>
                </div>
                <div style={{
                  padding: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  textAlign: 'center',
                }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>当令器官</div>
                  <div style={{ color: '#8b5cf6', fontWeight: 'bold' }}>
                    {currentShiChen.organ}经
                  </div>
                </div>
                <div style={{
                  padding: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  textAlign: 'center',
                }}>
                  <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>累计修为</div>
                  <div style={{ color: '#22c55e', fontWeight: 'bold' }}>
                    {totalCultivation}
                  </div>
                </div>
              </div>

              {(isZiShi || isWuShi) && (
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    padding: '0.75rem 1rem',
                    background: isZiShi ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    borderRadius: '8px',
                    border: '1px solid ' + (isZiShi ? 'rgba(59, 130, 246, 0.5)' : 'rgba(239, 68, 68, 0.5)'),
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{isZiShi ? '🌙' : '☀️'}</span>
                  <span style={{ color: isZiShi ? '#60a5fa' : '#f87171', fontWeight: 'bold' }}>
                    {isZiShi ? '子时修炼BUFF激活！获得2倍灵气加成！' : '午时修炼BUFF激活！获得1.5倍灵气加成！'}
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startCultivation}
              style={{
                flex: 1,
                padding: '1rem',
                background: `linear-gradient(135deg, ${auraLevel.color} 0%, ${auraLevel.color}88 100%)`,
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '1.125rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: `0 10px 30px ${auraLevel.color}40`,
              }}
            >
              🧘 开始打坐修炼
            </motion.button>
          </div>

          <AnimatePresence>
            {practiceBonus > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 1.2 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#22c55e',
                  textShadow: '0 0 30px rgba(34, 197, 94, 0.8)',
                  zIndex: 100,
                }}
              >
                +{practiceBonus} 修为
              </motion.div>
            )}
          </AnimatePresence>

          <p style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '8px',
            borderLeft: `4px solid ${ELEMENT_COLORS[currentShiChen.fiveElement]}`,
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: 1.6,
          }}>
            💡 <span style={{ color: ELEMENT_COLORS[currentShiChen.fiveElement], fontWeight: 'bold' }}>修炼提示:</span> {currentShiChen.practiceTips}
          </p>
        </div>
      </div>

      <h4 style={{
        color: '#06b6d4',
        fontFamily: '"Noto Serif SC", serif',
        marginBottom: '1rem',
        fontSize: '1.25rem',
      }}>
        🌌 十二时辰灵气值
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '0.75rem',
      }}>
        {SHI_CHENS.map((sc) => {
          const isCurrent = sc.name === currentShiChen.name
          const level = getAuraLevel(sc.baseAura)
          return (
            <motion.button
              key={sc.name}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedShiChen(selectedShiChen?.name === sc.name ? null : sc)}
              style={{
                padding: '0.75rem 0.5rem',
                background: isCurrent
                  ? level.color + '40'
                  : selectedShiChen?.name === sc.name
                    ? ELEMENT_COLORS[sc.fiveElement] + '25'
                    : 'rgba(255, 255, 255, 0.03)',
                border: '2px solid ' + (isCurrent ? level.color : selectedShiChen?.name === sc.name ? ELEMENT_COLORS[sc.fiveElement] + '80' : 'rgba(255, 255, 255, 0.1)'),
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontSize: isCurrent ? '1.25rem' : '1rem',
                fontWeight: isCurrent ? 'bold' : 'normal',
                color: isCurrent ? level.color : 'rgba(255, 255, 255, 0.85)',
                marginBottom: '0.25rem',
              }}>
                {sc.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                {sc.startHour}:00-{sc.endHour}:00
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: level.color,
                fontWeight: 'bold',
                marginTop: '0.25rem',
              }}>
                {sc.baseAura}% {level.text}
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedShiChen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              marginTop: '1rem',
              padding: '1.25rem',
              background: ELEMENT_COLORS[selectedShiChen.fiveElement] + '15',
              borderRadius: '12px',
              border: '1px solid ' + ELEMENT_COLORS[selectedShiChen.fiveElement] + '60',
            }}
          >
            <h5 style={{ color: ELEMENT_COLORS[selectedShiChen.fiveElement], marginBottom: '1rem' }}>
              🌙 {selectedShiChen.name} · {selectedShiChen.alias}
            </h5>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
              marginBottom: '1rem',
              fontSize: '0.875rem',
            }}>
              <div>
                <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>基础灵气</div>
                <div style={{ color: ELEMENT_COLORS[selectedShiChen.fiveElement], fontWeight: 'bold' }}>
                  {selectedShiChen.baseAura}%
                </div>
              </div>
              <div>
                <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>五行属性</div>
                <div style={{ color: ELEMENT_COLORS[selectedShiChen.fiveElement], fontWeight: 'bold' }}>
                  {selectedShiChen.fiveElement}行
                </div>
              </div>
              <div>
                <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>对应经络</div>
                <div style={{ color: '#8b5cf6', fontWeight: 'bold' }}>
                  {selectedShiChen.organ}经
                </div>
              </div>
              <div>
                <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>有利方位</div>
                <div style={{ color: '#06b6d4', fontWeight: 'bold' }}>
                  {selectedShiChen.direction}
                </div>
              </div>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
              🧘 <span style={{ fontWeight: 'bold' }}>修炼秘法:</span> {selectedShiChen.practiceTips}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
