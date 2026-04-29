'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

const EIGHT_DIRECTIONS = [
  { id: 'kan', name: '坎', trigram: '☵', direction: '正北', element: '水', number: 1, isGood: true },
  { id: 'kun', name: '坤', trigram: '☷', direction: '西南', element: '土', number: 2, isGood: false },
  { id: 'zhen', name: '震', trigram: '☳', direction: '正东', element: '木', number: 3, isGood: true },
  { id: 'xun', name: '巽', trigram: '☴', direction: '东南', element: '木', number: 4, isGood: true },
  { id: 'qian', name: '乾', trigram: '☰', direction: '西北', element: '金', number: 6, isGood: true },
  { id: 'dui', name: '兑', trigram: '☱', direction: '正西', element: '金', number: 7, isGood: false },
  { id: 'gen', name: '艮', trigram: '☶', direction: '东北', element: '土', number: 8, isGood: false },
  { id: 'li', name: '离', trigram: '☲', direction: '正南', element: '火', number: 9, isGood: false },
]

const YOU_NIAN_STARS = [
  { name: '生气', grade: '上吉', color: '#22c55e', effect: '财源广进，人丁兴旺，贵人相助，百事顺遂' },
  { name: '延年', grade: '上吉', color: '#06b6d4', effect: '健康长寿，夫妻和睦，事业有成，消灾解难' },
  { name: '天医', grade: '中吉', color: '#3b82f6', effect: '身体健康，疾病痊愈，贵人扶持，财源稳定' },
  { name: '伏位', grade: '小吉', color: '#8b5cf6', effect: '平安稳定，循序渐进，守成有余，创业不足' },
  { name: '绝命', grade: '大凶', color: '#ef4444', effect: '破财伤身，官司口舌，意外横祸，绝嗣损丁' },
  { name: '五鬼', grade: '凶', color: '#f97316', effect: '火灾盗贼，小人陷害，怪病缠身，是非不断' },
  { name: '六煞', grade: '次凶', color: '#f59e0b', effect: '桃花破财，淫乱是非，精神忧郁，家庭不和' },
  { name: '祸害', grade: '小凶', color: '#a855f7', effect: '疾病缠绵，口角是非，财运不佳，小人暗算' },
]

const CALCULATION_TABLE: Record<string, Record<string, string>> = {
  kan: { kan: '伏位', kun: '绝命', zhen: '天医', xun: '生气', qian: '延年', dui: '五鬼', gen: '六煞', li: '祸害' },
  kun: { kan: '绝命', kun: '伏位', zhen: '祸害', xun: '五鬼', qian: '生气', dui: '延年', gen: '天医', li: '六煞' },
  zhen: { kan: '天医', kun: '祸害', zhen: '伏位', xun: '延年', qian: '五鬼', dui: '绝命', gen: '生气', li: '六煞' },
  xun: { kan: '生气', kun: '五鬼', zhen: '延年', xun: '伏位', qian: '六煞', dui: '祸害', gen: '绝命', li: '天医' },
  qian: { kan: '延年', kun: '生气', zhen: '五鬼', xun: '六煞', qian: '伏位', dui: '天医', gen: '祸害', li: '绝命' },
  dui: { kan: '五鬼', kun: '延年', zhen: '绝命', xun: '祸害', qian: '天医', dui: '伏位', gen: '六煞', li: '生气' },
  gen: { kan: '六煞', kun: '天医', zhen: '生气', xun: '绝命', qian: '祸害', dui: '六煞', gen: '伏位', li: '五鬼' },
  li: { kan: '祸害', kun: '六煞', zhen: '六煞', xun: '天医', qian: '绝命', dui: '生气', gen: '五鬼', li: '伏位' },
}

const HOUSE_TYPES = [
  { id: 'kanzhai', name: '坎宅', direction: '坐北朝南', desc: '北房三间，一正两厢', suit: '水命、木命人' },
  { id: 'kunzhai', name: '坤宅', direction: '坐西南朝东北', desc: '西南为主，东北开门', suit: '土命、金命人' },
  { id: 'zhenzhai', name: '震宅', direction: '坐东朝西', desc: '东四宅之首，阳气充足', suit: '木命、火命人' },
  { id: 'xunzhai', name: '巽宅', direction: '坐东南朝西北', desc: '文昌之地，利读书', suit: '木命、火命人' },
  { id: 'qianzhai', name: '乾宅', direction: '坐西北朝东南', desc: '西四宅之首，官贵之地', suit: '金命、水命人' },
  { id: 'duizhai', name: '兑宅', direction: '坐西朝东', desc: '少女之地，利口舌', suit: '金命、土命人' },
  { id: 'genzhai', name: '艮宅', direction: '坐东北朝西南', desc: '少男之地，利山林', suit: '土命、金命人' },
  { id: 'lizhai', name: '离宅', direction: '坐南朝北', desc: '南房光明，火德星君', suit: '火命、木命人' },
]

const getStarColor = (starName: string) => {
  const star = YOU_NIAN_STARS.find(s => s.name === starName)
  return star?.color || '#666'
}

const getStarGrade = (starName: string) => {
  const star = YOU_NIAN_STARS.find(s => s.name === starName)
  return star?.grade || ''
}

const getStarEffect = (starName: string) => {
  const star = YOU_NIAN_STARS.find(s => s.name === starName)
  return star?.effect || ''
}

const YANGZHAI_FORMULAS = [
  { title: '门', content: '大门为气口，宜开生、延、天三方。向首一星灾祸柄，入门之径管兴衰。' },
  { title: '主', content: '主卧为宅主，宜居伏、生、延方。主人安则全家安，命宫配卦是真机。' },
  { title: '灶', content: '灶为养命之源，宜压凶方，向吉方。灶口向延年，吃饭保平安。' },
  { title: '床', content: '安床须合命，宜天医、延年。床头有靠，脚不宜向门。' },
  { title: '厕', content: '厕所宜压五鬼、绝命凶方。宜藏不宜露，宜静不宜动。' },
  { title: '井', content: '井宜生气方，水清则财旺。不宜在中宫，不宜对大门。' },
]

export default function YangzhaiPage() {
  const [zhaiGua, setZhaiGua] = useState('kan')
  const [menGua, setMenGua] = useState('qian')
  const [zhuGua, setZhuGua] = useState('kan')
  const [zaoGua, setZaoGua] = useState('zhen')

  const menStar = CALCULATION_TABLE[zhaiGua]?.[menGua] || '伏位'
  const zhuStar = CALCULATION_TABLE[zhaiGua]?.[zhuGua] || '伏位'
  const zaoStar = CALCULATION_TABLE[zhaiGua]?.[zaoGua] || '伏位'

  const setZhaiGuaStable = useCallback((val: string) => setZhaiGua(val), [])
  const setMenGuaStable = useCallback((val: string) => setMenGua(val), [])
  const setZhuGuaStable = useCallback((val: string) => setZhuGua(val), [])
  const setZaoGuaStable = useCallback((val: string) => setZaoGua(val), [])

  const totalScore = useMemo(() => {
    const scoreMap: Record<string, number> = {
      '生气': 100, '延年': 90, '天医': 80, '伏位': 70,
      '祸害': 50, '六煞': 40, '五鬼': 30, '绝命': 20,
    }
    return Math.round((scoreMap[menStar] + scoreMap[zhuStar] + scoreMap[zaoStar]) / 3)
  }, [menStar, zhuStar, zaoStar])

  const houseGrade = useMemo(() => {
    if (totalScore >= 90) return { text: '上上吉宅', color: '#22c55e' }
    if (totalScore >= 80) return { text: '上吉宅', color: '#06b6d4' }
    if (totalScore >= 70) return { text: '吉宅', color: '#3b82f6' }
    if (totalScore >= 60) return { text: '平宅', color: '#8b5cf6' }
    if (totalScore >= 50) return { text: '小凶宅', color: '#f59e0b' }
    if (totalScore >= 40) return { text: '凶宅', color: '#f97316' }
    return { text: '大凶宅', color: '#ef4444' }
  }, [totalScore])

  return (
    <SubPageTemplate
      title="阳宅三要"
      subtitle="门主灶相配 · 八宅明镜 · 游年九星 · 吉凶祸福"
      icon="🏠"
      colorRgb="34, 197, 94"
    >
      <SubPageSection title="🧮 阳宅配卦模拟器">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', textAlign: 'center' }}>
            《阳宅三要》：一曰门，二曰主，三曰灶。门乃由入之路，主乃居处之地，灶乃养命之源。
          </p>
        </InfoCard>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {[
            { label: '🏛️ 宅卦', value: zhaiGua, setter: setZhaiGuaStable, desc: '房屋坐向' },
            { label: '🚪 门卦', value: menGua, setter: setMenGuaStable, desc: '大门方位' },
            { label: '🛏️ 主卦', value: zhuGua, setter: setZhuGuaStable, desc: '主卧方位' },
            { label: '🔥 灶卦', value: zaoGua, setter: setZaoGuaStable, desc: '炉灶方位' },
          ].map(item => (
            <div key={item.label} style={{
              padding: '1.25rem',
              background: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '10px',
              border: '1px solid rgba(34, 197, 94, 0.3)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem',
              }}>
                <h4 style={{ color: '#22c55e', margin: 0 }}>{item.label}</h4>
                <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.6)' }}>
                  {item.desc}
                </span>
              </div>
              <select
                value={item.value}
                onChange={e => item.setter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  color: '#fff',
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                {EIGHT_DIRECTIONS.map(dir => (
                  <option key={dir.id} value={dir.id}>
                    {dir.trigram} {dir.name} - {dir.direction}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), transparent)',
            borderRadius: '12px',
            border: `2px solid ${houseGrade.color}50`,
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          <div style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            color: houseGrade.color,
            marginBottom: '0.5rem',
          }}>
            {totalScore}分
          </div>
          <div style={{
            fontSize: '1.5rem',
            color: houseGrade.color,
            marginBottom: '1rem',
          }}>
            ⭐ {houseGrade.text}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            {[
              { name: '门', star: menStar },
              { name: '主', star: zhuStar },
              { name: '灶', star: zaoStar },
            ].map(item => (
              <div key={item.name} style={{
                padding: '0.75rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
              }}>
                <div style={{ color: 'rgba(180, 180, 190, 0.6)' }}>
                  {item.name}
                </div>
                <div style={{
                  color: getStarColor(item.star),
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}>
                  {item.star}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: getStarColor(item.star),
                }}>
                  {getStarGrade(item.star)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {menStar && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem',
              }}
            >
              {YOU_NIAN_STARS.map((star, i) => (
                <motion.div
                  key={star.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    padding: '1rem',
                    background: `${star.color}15`,
                    borderRadius: '8px',
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
                      ✨ {star.name}
                    </h4>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '50px',
                      background: `${star.color}30`,
                      color: star.color,
                    }}>
                      {star.grade}
                    </span>
                  </div>
                  <p style={{
                    color: 'rgba(180, 180, 190, 0.7)',
                    fontSize: '0.8rem',
                    margin: 0,
                  }}>
                    {star.effect}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </SubPageSection>

      <SubPageSection title="📜 阳宅六事">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
        }}>
          {YANGZHAI_FORMULAS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '1.25rem',
                background: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '10px',
                borderLeft: '4px solid #22c55e',
              }}
            >
              <h4 style={{ color: '#22c55e', margin: '0 0 0.5rem 0' }}>
                📖 {item.title}诀
              </h4>
              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                lineHeight: 1.8,
                margin: 0,
              }}>
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="🏛️ 八宅格局">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}>
          {HOUSE_TYPES.map((house, i) => (
            <motion.div
              key={house.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              style={{
                padding: '1.25rem',
                background: 'rgba(6, 182, 212, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                cursor: 'pointer',
              }}
              onClick={() => setZhaiGua(house.id.replace('zhai', ''))}
            >
              <h4 style={{ color: '#06b6d4', margin: '0 0 0.5rem 0' }}>
                🏠 {house.name}
              </h4>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.85rem',
                margin: '0 0 0.5rem 0',
              }}>
                {house.direction}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.6)',
                fontSize: '0.75rem',
                fontStyle: 'italic',
                margin: 0,
              }}>
                {house.desc}
              </p>
              <p style={{
                color: '#22c55e',
                fontSize: '0.75rem',
                margin: '0.5rem 0 0 0',
              }}>
                ✅ {house.suit}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
