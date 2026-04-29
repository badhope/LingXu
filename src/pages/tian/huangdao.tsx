'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

const TWELVE_SPIRITS = [
  { name: '青龙', isAuspicious: true, desc: '黄道吉日，诸事皆宜，吉神高照', icon: '🐉', color: '#22c55e' },
  { name: '明堂', isAuspicious: true, desc: '黄道吉日，宜办大事，光明正大', icon: '🏛️', color: '#22c55e' },
  { name: '天刑', isAuspicious: false, desc: '黑道凶日，宜祭祀，余事不宜', icon: '⚔️', color: '#ef4444' },
  { name: '朱雀', isAuspicious: false, desc: '黑道凶日，口舌是非，宜避之', icon: '🐦', color: '#ef4444' },
  { name: '金匮', isAuspicious: true, desc: '黄道吉日，宜嫁娶纳财，金玉满堂', icon: '💰', color: '#22c55e' },
  { name: '天德', isAuspicious: true, desc: '黄道吉日，贵人相助，逢凶化吉', icon: '⭐', color: '#22c55e' },
  { name: '白虎', isAuspicious: false, desc: '黑道凶日，宜血光之事，余事避之', icon: '🐅', color: '#ef4444' },
  { name: '玉堂', isAuspicious: true, desc: '黄道吉日，宜修造安床，富贵荣华', icon: '🏯', color: '#22c55e' },
  { name: '天牢', isAuspicious: false, desc: '黑道凶日，宜安床，忌出行诉讼', icon: '🔒', color: '#ef4444' },
  { name: '玄武', isAuspicious: false, desc: '黑道凶日，小人当道，宜低调行事', icon: '🐢', color: '#ef4444' },
  { name: '司命', isAuspicious: true, desc: '黄道吉日，宜祭祀祈福，寿元绵长', icon: '🙏', color: '#22c55e' },
  { name: '勾陈', isAuspicious: false, desc: '黑道凶日，宜土木，忌嫁娶出行', icon: '🦌', color: '#ef4444' },
]

const HOUR_LUCK = [
  { hour: '23:00-01:00', name: '子时', isGood: true, desc: '贵神临门，百事大吉' },
  { hour: '01:00-03:00', name: '丑时', isGood: true, desc: '明堂星照，贵人接引' },
  { hour: '03:00-05:00', name: '寅时', isGood: false, desc: '天刑主事，宜守不宜攻' },
  { hour: '05:00-07:00', name: '卯时', isGood: false, desc: '朱雀当值，防口舌是非' },
  { hour: '07:00-09:00', name: '辰时', isGood: true, desc: '金匮财星，宜纳财交易' },
  { hour: '09:00-11:00', name: '巳时', isGood: true, desc: '天德贵人，逢凶化吉' },
  { hour: '11:00-13:00', name: '午时', isGood: false, desc: '白虎拦路，宜静不宜动' },
  { hour: '13:00-15:00', name: '未时', isGood: true, desc: '玉堂生辉，宜见贵人' },
  { hour: '15:00-17:00', name: '申时', isGood: false, desc: '天牢关押，忌远行诉讼' },
  { hour: '17:00-19:00', name: '酉时', isGood: false, desc: '玄武入位，防盗贼小人' },
  { hour: '19:00-21:00', name: '戌时', isGood: true, desc: '司命护佑，祈福最灵' },
  { hour: '21:00-23:00', name: '亥时', isGood: false, desc: '勾陈纠缠，宜早睡养生' },
]

const YI_JI = {
  yi: [
    { name: '嫁娶', icon: '💒', desc: '结婚嫁娶，迎亲纳采' },
    { name: '纳财', icon: '💰', desc: '求财纳福，交易买卖' },
    { name: '开市', icon: '🏪', desc: '开业大典，新张利市' },
    { name: '安葬', icon: '⚰️', desc: '下葬安葬，立碑修坟' },
    { name: '祭祀', icon: '🙏', desc: '祭拜祖先，祈福还愿' },
    { name: '出行', icon: '✈️', desc: '远行出差，旅游观光' },
    { name: '动土', icon: '🚜', desc: '破土动工，基础建设' },
    { name: '修造', icon: '🏗️', desc: '修房造屋，装修装潢' },
    { name: '安床', icon: '🛏️', desc: '安床设帐，入宅搬家' },
    { name: '求嗣', icon: '👶', desc: '求子祈福，母子平安' },
  ],
  ji: [
    { name: '词讼', icon: '⚖️', desc: '打官司，上法庭' },
    { name: '动土', icon: '⛏️', desc: '今日土方不利' },
    { name: '嫁娶', icon: '💔', desc: '今日不宜婚嫁' },
    { name: '开市', icon: '📉', desc: '开业破财之象' },
    { name: '出行', icon: '🚫', desc: '远行多阻滞' },
    { name: '针灸', icon: '💉', desc: '经络气血不顺' },
    { name: '纳财', icon: '💸', desc: '求财有破耗' },
    { name: '安葬', icon: '☠️', desc: '阴宅方位不利' },
  ],
}

const FESTIVALS: Record<string, string> = {
  '1-1': '🧨 元旦',
  '2-14': '💕 情人节',
  '3-8': '👩 妇女节',
  '3-12': '🌳 植树节',
  '4-1': '🎭 愚人节',
  '4-5': '🌿 清明节',
  '5-1': '🛠️ 劳动节',
  '5-4': '🎓 青年节',
  '6-1': '🎈 儿童节',
  '7-1': '🎂 建党节',
  '8-1': '🎖️ 建军节',
  '9-10': '🍎 教师节',
  '10-1': '🇨🇳 国庆节',
  '12-25': '🎄 圣诞节',
}

export default function HuangdaoPage() {
  const [selectedDate, setSelectedDate] = useState('')
  const [todayInfo, setTodayInfo] = useState<{
    dayName: string
    dayIndex: number
    festival: string | null
    yiList: typeof YI_JI.yi
    jiList: typeof YI_JI.ji
  } | null>(null)
  const [expandedHour, setExpandedHour] = useState<number | null>(null)

  useEffect(() => {
    const today = new Date()
    setSelectedDate(today.toISOString().split('T')[0])
  }, [])

  useEffect(() => {
    if (!selectedDate) return
    const [, month, day] = selectedDate.split('-').map(Number)
    const dayIndex = (month * 31 + day) % 12
    const key = `${month}-${day}`

    setTodayInfo({
      dayName: TWELVE_SPIRITS[dayIndex].name,
      dayIndex,
      festival: FESTIVALS[key] || null,
      yiList: YI_JI.yi.slice(0, dayIndex % 5 + 4),
      jiList: YI_JI.ji.slice(0, dayIndex % 3 + 3),
    })
  }, [selectedDate])

  const todaySpirit = todayInfo ? TWELVE_SPIRITS[todayInfo.dayIndex] : TWELVE_SPIRITS[0]

  return (
    <SubPageTemplate
      title="黄道吉日"
      subtitle="选择吉日 · 趋吉避凶 · 十二神煞 · 时辰吉凶"
      icon="📅"
      colorRgb="236, 72, 153"
    >
      <SubPageSection title="🔮 今日黄历">
        <div style={{
          background: `linear-gradient(135deg, ${todaySpirit.color}20, rgba(0,0,0,0.3))`,
          borderRadius: '16px',
          padding: '2rem',
          border: `2px solid ${todaySpirit.color}40`,
          marginBottom: '1.5rem',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(236, 72, 153, 0.3)',
                  borderRadius: '8px',
                  color: '#ec4899',
                  fontSize: '1rem',
                }}
              />
              {todayInfo?.festival && (
                <div style={{ marginTop: '0.5rem', color: '#f59e0b' }}>
                  {todayInfo.festival}
                </div>
              )}
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                textAlign: 'center',
                padding: '1rem 2rem',
                borderRadius: '12px',
                background: todaySpirit.color + '20',
                border: `2px solid ${todaySpirit.color}`,
              }}
            >
              <div style={{ fontSize: '2.5rem' }}>{todaySpirit.icon}</div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: todaySpirit.color,
              }}>
                {todaySpirit.name}
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: todaySpirit.isAuspicious ? '#22c55e' : '#ef4444',
              }}>
                {todaySpirit.isAuspicious ? '✅ 黄道吉日' : '⚠️ 黑道值日'}
              </div>
            </motion.div>
          </div>

          <p style={{
            textAlign: 'center',
            color: 'rgba(180, 180, 190, 0.7)',
            fontSize: '0.95rem',
            fontStyle: 'italic',
          }}>
            "{todaySpirit.desc}"
          </p>
        </div>
      </SubPageSection>

      <SubPageSection title="✅ 今日所宜">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '1rem',
        }}>
          {todayInfo?.yiList.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -4 }}
              style={{
                padding: '1rem',
                textAlign: 'center',
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ color: '#22c55e', fontWeight: 'bold' }}>{item.name}</div>
              <div style={{
                fontSize: '0.75rem',
                color: 'rgba(180, 180, 190, 0.6)',
                marginTop: '0.25rem',
              }}>
                {item.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="❌ 今日所忌">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '1rem',
        }}>
          {todayInfo?.jiList.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -4 }}
              style={{
                padding: '1rem',
                textAlign: 'center',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '10px',
                cursor: 'pointer',
                opacity: 0.8,
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ color: '#ef4444', fontWeight: 'bold' }}>{item.name}</div>
              <div style={{
                fontSize: '0.75rem',
                color: 'rgba(180, 180, 190, 0.6)',
                marginTop: '0.25rem',
              }}>
                {item.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="⏰ 十二时辰吉凶详解">
        <InfoCard>
          <p style={{
            color: 'rgba(180, 180, 190, 0.75)',
            marginBottom: '1rem',
            textAlign: 'center',
          }}>
            古时一日分十二时辰，每个时辰都有相应的吉凶神煞主事
          </p>
        </InfoCard>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {HOUR_LUCK.map((hour, index) => (
            <motion.div
              key={hour.name}
              whileHover={{ scale: 1.02 }}
              onClick={() => setExpandedHour(expandedHour === index ? null : index)}
              style={{
                padding: '1rem',
                background: hour.isGood ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                border: `1px solid ${hour.isGood ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: hour.isGood ? '#22c55e' : '#ef4444',
                  }}>
                    {hour.isGood ? '✅ ' : '❌ '}{hour.name}
                  </span>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'rgba(180, 180, 190, 0.6)',
                  }}>
                    {hour.hour}
                  </div>
                </div>
                <span style={{
                  color: hour.isGood ? '#22c55e' : '#ef4444',
                }}>
                  {hour.isGood ? '吉' : '凶'}
                </span>
              </div>

              <AnimatePresence>
                {expandedHour === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      marginTop: '0.75rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px dashed rgba(255, 255, 255, 0.1)',
                      fontSize: '0.85rem',
                      color: 'rgba(180, 180, 190, 0.8)',
                    }}
                  >
                    {hour.desc}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="📜 十二神煞速查表">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '1rem',
        }}>
          {TWELVE_SPIRITS.map((spirit) => (
            <div
              key={spirit.name}
              style={{
                padding: '0.75rem',
                textAlign: 'center',
                background: spirit.isAuspicious ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                border: `1px solid ${spirit.color}40`,
                borderRadius: '8px',
              }}
            >
              <div style={{ fontSize: '1.5rem' }}>{spirit.icon}</div>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: 'bold',
                color: spirit.color,
              }}>
                {spirit.name}
              </div>
              <div style={{
                fontSize: '0.7rem',
                color: spirit.isAuspicious ? '#22c55e' : '#ef4444',
              }}>
                {spirit.isAuspicious ? '黄道' : '黑道'}
              </div>
            </div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
