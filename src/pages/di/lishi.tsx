'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

const TWENTY_FOUR_MOUNTAINS = [
  { id: 'zi', name: '子', direction: '正北', trigram: '坎', element: '水', degree: 0, nanGua: '离', isGood: true },
  { id: 'gui', name: '癸', direction: '北偏东', trigram: '坎', element: '水', degree: 15, nanGua: '丁', isGood: true },
  { id: 'chou', name: '丑', direction: '东北偏北', trigram: '艮', element: '土', degree: 30, nanGua: '未', isGood: false },
  { id: 'gen', name: '艮', direction: '东北', trigram: '艮', element: '土', degree: 45, nanGua: '坤', isGood: false },
  { id: 'yin', name: '寅', direction: '东北偏东', trigram: '艮', element: '木', degree: 60, nanGua: '申', isGood: true },
  { id: 'jia', name: '甲', direction: '东偏北', trigram: '震', element: '木', degree: 75, nanGua: '庚', isGood: true },
  { id: 'mao', name: '卯', direction: '正东', trigram: '震', element: '木', degree: 90, nanGua: '酉', isGood: true },
  { id: 'yi', name: '乙', direction: '东偏南', trigram: '震', element: '木', degree: 105, nanGua: '辛', isGood: true },
  { id: 'chen', name: '辰', direction: '东南偏东', trigram: '巽', element: '土', degree: 120, nanGua: '戌', isGood: false },
  { id: 'xun', name: '巽', direction: '东南', trigram: '巽', element: '木', degree: 135, nanGua: '乾', isGood: true },
  { id: 'si', name: '巳', direction: '东南偏南', trigram: '巽', element: '火', degree: 150, nanGua: '亥', isGood: true },
  { id: 'bing', name: '丙', direction: '南偏东', trigram: '离', element: '火', degree: 165, nanGua: '壬', isGood: true },
  { id: 'wu', name: '午', direction: '正南', trigram: '离', element: '火', degree: 180, nanGua: '子', isGood: false },
  { id: 'ding', name: '丁', direction: '南偏西', trigram: '离', element: '火', degree: 195, nanGua: '癸', isGood: true },
  { id: 'wei', name: '未', direction: '西南偏南', trigram: '坤', element: '土', degree: 210, nanGua: '丑', isGood: false },
  { id: 'kun', name: '坤', direction: '西南', trigram: '坤', element: '土', degree: 225, nanGua: '艮', isGood: false },
  { id: 'shen', name: '申', direction: '西南偏西', trigram: '坤', element: '金', degree: 240, nanGua: '寅', isGood: true },
  { id: 'geng', name: '庚', direction: '西偏南', trigram: '兑', element: '金', degree: 255, nanGua: '甲', isGood: false },
  { id: 'you', name: '酉', direction: '正西', trigram: '兑', element: '金', degree: 270, nanGua: '卯', isGood: false },
  { id: 'xin', name: '辛', direction: '西偏北', trigram: '兑', element: '金', degree: 285, nanGua: '乙', isGood: true },
  { id: 'xu', name: '戌', direction: '西北偏西', trigram: '乾', element: '土', degree: 300, nanGua: '辰', isGood: false },
  { id: 'qian', name: '乾', direction: '西北', trigram: '乾', element: '金', degree: 315, nanGua: '巽', isGood: true },
  { id: 'hai', name: '亥', direction: '西北偏北', trigram: '乾', element: '水', degree: 330, nanGua: '巳', isGood: true },
  { id: 'ren', name: '壬', direction: '北偏西', trigram: '坎', element: '水', degree: 345, nanGua: '丙', isGood: true },
]

const FIVE_ELEMENT_COLORS: Record<string, string> = {
  '金': '#f59e0b',
  '木': '#22c55e',
  '水': '#3b82f6',
  '火': '#ef4444',
  '土': '#a855f7',
}

const SAN_HE_COMBINATIONS = [
  { name: '申子辰', element: '水局', desc: '三合水局，源远流长' },
  { name: '亥卯未', element: '木局', desc: '三合木局，枝叶繁茂' },
  { name: '寅午戌', element: '火局', desc: '三合火局，光明显赫' },
  { name: '巳酉丑', element: '金局', desc: '三合金局，刚健中正' },
]

const SAN_YUAN_LUCK = [
  { period: '上元一白运', years: '1864-1883', star: '坎', direction: '北方', color: '#3b82f6' },
  { period: '上元二黑运', years: '1884-1903', star: '坤', direction: '西南', color: '#a855f7' },
  { period: '上元三碧运', years: '1904-1923', star: '震', direction: '东方', color: '#22c55e' },
  { period: '中元四绿运', years: '1924-1943', star: '巽', direction: '东南', color: '#06b6d4' },
  { period: '中元五黄运', years: '1944-1963', star: '中宫', direction: '中央', color: '#f59e0b' },
  { period: '中元六白运', years: '1964-1983', star: '乾', direction: '西北', color: '#8b5cf6' },
  { period: '下元七赤运', years: '1984-2003', star: '兑', direction: '西方', color: '#ec4899' },
  { period: '下元八白运', years: '2004-2023', star: '艮', direction: '东北', color: '#f59e0b' },
  { period: '下元九紫运', years: '2024-2043', star: '离', direction: '南方', color: '#ef4444' },
]

const NINE_STARS = [
  { name: '贪狼', star: '一白', color: '#3b82f6', type: '吉星', effect: '官贵文昌，桃花人缘' },
  { name: '巨门', star: '二黑', color: '#a855f7', type: '病符星', effect: '疾病田产，是非口舌' },
  { name: '禄存', star: '三碧', color: '#22c55e', type: '是非星', effect: '争斗官非，盗贼小人' },
  { name: '文曲', star: '四绿', color: '#06b6d4', type: '吉星', effect: '文昌科甲，名声远扬' },
  { name: '廉贞', star: '五黄', color: '#f59e0b', type: '正煞', effect: '灾煞横祸，大凶极恶' },
  { name: '武曲', star: '六白', color: '#8b5cf6', type: '吉星', effect: '武贵财帛，丁财两旺' },
  { name: '破军', star: '七赤', color: '#ec4899', type: '刑克', effect: '破军损耗，口舌官非' },
  { name: '左辅', star: '八白', color: '#f59e0b', type: '吉星', effect: '当运正财，喜庆田宅' },
  { name: '右弼', star: '九紫', color: '#ef4444', type: '吉星', effect: '离火当运，喜庆姻缘' },
]

export default function LishiPage() {
  const [selectedMountain, setSelectedMountain] = useState<string>('zi')
  const [rotation, setRotation] = useState(0)

  const currentMountain = TWENTY_FOUR_MOUNTAINS.find(m => m.id === selectedMountain)

  const directionMatrix = useMemo(() => {
    const directions: { name: string; degree: number; good: boolean; color: string }[] = []
    TWENTY_FOUR_MOUNTAINS.forEach(m => {
      const diff = Math.abs(m.degree - (currentMountain?.degree || 0))
      const normalizedDiff = diff > 180 ? 360 - diff : diff
      let good = false
      if (normalizedDiff === 0 || normalizedDiff === 180) good = true
      if (normalizedDiff === 90 || normalizedDiff === 270) good = false
      directions.push({
        name: m.name,
        degree: m.degree,
        good: m.isGood,
        color: m.isGood ? '#22c55e' : '#ef4444',
      })
    })
    return directions
  }, [currentMountain])

  return (
    <SubPageTemplate
      title="二十四山"
      subtitle="罗经二十四山 · 三元九运 · 三合四局 · 立向分金"
      icon="🧭"
      colorRgb="245, 158, 11"
    >
      <SubPageSection title="🧭 二十四山罗盘">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', textAlign: 'center' }}>
            《罗经解》：先天为体，后天为用。二十四山分阴阳，七十二龙定吉凶。
          </p>
        </InfoCard>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '2rem 0',
        }}>
          <motion.div
            animate={{ rotate: rotation }}
            style={{
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #ef4444 0deg, #f59e0b 30deg, #22c55e 60deg, #06b6d4 90deg, #3b82f6 120deg, #8b5cf6 150deg, #a855f7 180deg, #ec4899 210deg, #ef4444 240deg, #f59e0b 270deg, #22c55e 300deg, #06b6d4 330deg, #3b82f6 360deg)',
              padding: '4px',
              cursor: 'pointer',
            }}
            onClick={() => setRotation(r => r + 15)}
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'rgba(139, 105, 20, 0.1)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
              }}>
                {TWENTY_FOUR_MOUNTAINS.map((m, i) => (
                  <div
                    key={m.id}
                    onClick={e => { e.stopPropagation(); setSelectedMountain(m.id) }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '2px',
                      height: '140px',
                      transformOrigin: 'center top',
                      transform: `translateX(-50%) rotate(${m.degree + 90}deg)`,
                      cursor: 'pointer',
                      background: m.id === selectedMountain
                        ? FIVE_ELEMENT_COLORS[m.element]
                        : 'rgba(180, 180, 190, 0.3)',
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%) rotate(-90deg)',
                      fontSize: '0.7rem',
                      fontWeight: m.id === selectedMountain ? 'bold' : 'normal',
                      color: m.id === selectedMountain
                        ? FIVE_ELEMENT_COLORS[m.element]
                        : 'rgba(180, 180, 190, 0.8)',
                      whiteSpace: 'nowrap',
                    }}>
                      {m.name}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)',
              }}>
                🧭
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {currentMountain && (
            <motion.div
              key={currentMountain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                padding: '1.5rem',
                background: `linear-gradient(135deg, ${FIVE_ELEMENT_COLORS[currentMountain.element]}20, transparent)`,
                borderRadius: '12px',
                border: `2px solid ${FIVE_ELEMENT_COLORS[currentMountain.element]}50`,
                maxWidth: '500px',
                margin: '0 auto 2rem',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: FIVE_ELEMENT_COLORS[currentMountain.element], margin: 0 }}>
                  ☯️ {currentMountain.name}山 · {currentMountain.direction}
                </h3>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.6)',
                  margin: '0.5rem 0 0 0',
                }}>
                  {currentMountain.trigram}卦 · {currentMountain.element}行 · {currentMountain.degree}°
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}>
                <div style={{
                  padding: '0.75rem',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}>
                  <div style={{ color: 'rgba(180, 180, 190, 0.6)', fontSize: '0.8rem' }}>
                    纳甲
                  </div>
                  <div style={{ color: FIVE_ELEMENT_COLORS[currentMountain.element], fontWeight: 'bold' }}>
                    {currentMountain.nanGua}
                  </div>
                </div>
                <div style={{
                  padding: '0.75rem',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}>
                  <div style={{ color: 'rgba(180, 180, 190, 0.6)', fontSize: '0.8rem' }}>
                    性质
                  </div>
                  <div style={{ color: currentMountain.isGood ? '#22c55e' : '#ef4444', fontWeight: 'bold' }}>
                    {currentMountain.isGood ? '✅ 阳山吉' : '❌ 阴山凶'}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SubPageSection>

      <SubPageSection title="🌟 三元九运">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          {SAN_YUAN_LUCK.map((period, i) => (
            <motion.div
              key={period.period}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              style={{
                padding: '1rem',
                background: `${period.color}20`,
                borderRadius: '10px',
                border: period.period === '下元九紫运'
                  ? `2px solid ${period.color}`
                  : `1px solid ${period.color}50`,
              }}
            >
              <h4 style={{ color: period.color, margin: '0 0 0.5rem 0' }}>
                {period.period.includes('九紫') ? '🔥 ' : ''}{period.period}
              </h4>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.85rem',
                margin: '0 0 0.25rem 0',
              }}>
                {period.years}
              </p>
              <p style={{
                color: period.color,
                fontSize: '0.8rem',
                margin: 0,
              }}>
                {period.star}卦 · {period.direction}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="✨ 九星吉凶">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}>
          {NINE_STARS.map((star, i) => (
            <motion.div
              key={star.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                padding: '1rem',
                background: `${star.color}20`,
                borderRadius: '10px',
                border: `1px solid ${star.color}50`,
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}>
                <h4 style={{ color: star.color, margin: 0 }}>
                  {star.name}
                </h4>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '50px',
                  background: star.type.includes('吉') ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                  color: star.type.includes('吉') ? '#22c55e' : '#ef4444',
                }}>
                  {star.star} · {star.type}
                </span>
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.85rem',
                margin: 0,
              }}>
                {star.effect}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="🔮 三合四局">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
        }}>
          {SAN_HE_COMBINATIONS.map((combo, i) => (
            <motion.div
              key={combo.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '1.5rem',
                background: `${FIVE_ELEMENT_COLORS[combo.element[0]]}20`,
                borderRadius: '10px',
                border: `2px solid ${FIVE_ELEMENT_COLORS[combo.element[0]]}50`,
                textAlign: 'center',
              }}
            >
              <div style={{
                fontSize: '1.5rem',
                color: FIVE_ELEMENT_COLORS[combo.element[0]],
                fontWeight: 'bold',
                letterSpacing: '0.5rem',
                marginBottom: '0.5rem',
              }}>
                {combo.name}
              </div>
              <div style={{
                color: FIVE_ELEMENT_COLORS[combo.element[0]],
                marginBottom: '0.5rem',
              }}>
                ✨ {combo.element}
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.85rem',
                fontStyle: 'italic',
                margin: 0,
              }}>
                {combo.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
