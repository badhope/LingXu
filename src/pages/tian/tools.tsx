'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const ANIMALS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
const MONTHS = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月']

const HISTORY_TODAY = [
  { date: '4-23', year: -356, event: '亚历山大大帝诞生', icon: '👑' },
  { date: '4-23', year: 1564, event: '莎士比亚诞辰', icon: '✍️' },
  { date: '4-23', year: 1616, event: '塞万提斯逝世', icon: '📚' },
  { date: '4-23', year: 1949, event: '中国人民解放军海军成立', icon: '🚢' },
  { date: '1-1', year: 1912, event: '中华民国成立', icon: '🇨🇳' },
  { date: '1-1', year: 1995, event: '世界贸易组织成立', icon: '🌍' },
  { date: '10-1', year: 1949, event: '中华人民共和国成立', icon: '🇨🇳' },
  { date: '7-1', year: 1921, event: '中国共产党成立', icon: '🔨' },
  { date: '8-1', year: 1927, event: '南昌起义爆发', icon: '⭐' },
  { date: '5-4', year: 1919, event: '五四运动爆发', icon: '🔥' },
  { date: '12-25', year: 1642, event: '牛顿诞辰', icon: '🍎' },
  { date: '3-14', year: 1879, event: '爱因斯坦诞辰', icon: '⚡' },
  { date: '11-24', year: 1642, event: '达尔文诞辰', icon: '🐒' },
  { date: '2-12', year: 1809, event: '达尔文诞辰', icon: '📖' },
  { date: '6-18', year: 1815, event: '滑铁卢战役', icon: '⚔️' },
]

const LUNAR_FESTIVALS = [
  { date: '1-1', name: '春节', icon: '🧧', desc: '新年到，放鞭炮，穿新衣，拜新年' },
  { date: '1-15', name: '元宵节', icon: '🏮', desc: '赏花灯，吃汤圆，猜灯谜' },
  { date: '5-5', name: '端午节', icon: '🐲', desc: '赛龙舟，吃粽子，悬艾草' },
  { date: '7-7', name: '七夕节', icon: '💕', desc: '牛郎织女鹊桥相会' },
  { date: '8-15', name: '中秋节', icon: '🥮', desc: '但愿人长久，千里共婵娟' },
  { date: '9-9', name: '重阳节', icon: '⛰️', desc: '登高望远，遍插茱萸少一人' },
  { date: '12-8', name: '腊八节', icon: '🍲', desc: '腊八节，喝腊八粥' },
  { date: '12-30', name: '除夕', icon: '🎆', desc: '守岁迎新年，万家团圆' },
]

const SOLAR_FESTIVALS = [
  { date: '1-1', name: '元旦', icon: '🎊', desc: '新年伊始，万象更新' },
  { date: '2-14', name: '情人节', icon: '💝', desc: '有情人终成眷属' },
  { date: '3-8', name: '妇女节', icon: '👩', desc: '巾帼不让须眉' },
  { date: '5-1', name: '劳动节', icon: '🛠️', desc: '劳动最光荣' },
  { date: '6-1', name: '儿童节', icon: '🎈', desc: '祖国的花朵' },
  { date: '10-1', name: '国庆节', icon: '🇨🇳', desc: '欢度国庆，举国同庆' },
  { date: '12-25', name: '圣诞节', icon: '🎄', desc: '圣诞快乐！' },
]

const getYearGanZhi = (year: number): string => {
  const offset = year - 1984 + 1200
  return GAN[offset % 10] + ZHI[offset % 12]
}

const getYearAnimal = (year: number): string => {
  const offset = year - 1984 + 1200
  return ANIMALS[offset % 12]
}

const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

export default function ToolsPage() {
  const [solarDate, setSolarDate] = useState('')
  const [weekday, setWeekday] = useState('')
  const [historyEvents, setHistoryEvents] = useState<typeof HISTORY_TODAY>([])

  useEffect(() => {
    const today = new Date()
    setSolarDate(today.toISOString().split('T')[0])
    setWeekday(WEEKDAYS[today.getDay()])
  }, [])

  useEffect(() => {
    if (!solarDate) return
    const [, m, d] = solarDate.split('-').map(Number)
    const key = `${m}-${d}`
    setHistoryEvents(HISTORY_TODAY.filter(e => e.date === key))
  }, [solarDate])

  const [year, month, day] = solarDate.split('-').map(Number)
  const ganzhi = getYearGanZhi(year)
  const animal = getYearAnimal(year)

  return (
    <SubPageTemplate
      title="万年历工具"
      subtitle="阴阳转换 · 干支纪年 · 历史今天 · 节日查询"
      icon="🔧"
      colorRgb="6, 182, 212"
    >
      <SubPageSection title="📅 万年历阴阳历转换">
        <div style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.1))',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          marginBottom: '1rem',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}>
            <input
              type="date"
              value={solarDate}
              onChange={(e) => {
                setSolarDate(e.target.value)
                const d = new Date(e.target.value)
                setWeekday(WEEKDAYS[d.getDay()])
              }}
              style={{
                padding: '1rem 1.5rem',
                fontSize: '1.1rem',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                color: '#06b6d4',
              }}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}>
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              style={{
                padding: '1.25rem',
                textAlign: 'center',
                background: 'rgba(6, 182, 212, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(6, 182, 212, 0.3)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>☀️</div>
              <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem' }}>阳历</div>
              <div style={{ color: '#06b6d4', fontSize: '1.3rem', fontWeight: 'bold' }}>
                {year}年{month}月{day}日
              </div>
              <div style={{ color: '#3b82f6', fontSize: '0.9rem' }}>{weekday}</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              style={{
                padding: '1.25rem',
                textAlign: 'center',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌙</div>
              <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem' }}>农历</div>
              <div style={{ color: '#8b5cf6', fontSize: '1.3rem', fontWeight: 'bold' }}>
                {ganzhi}年
              </div>
              <div style={{ color: '#a78bfa', fontSize: '0.9rem' }}>
                🐾 {animal}年 · {MONTHS[(month + 9) % 12]}{day}日
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              style={{
                padding: '1.25rem',
                textAlign: 'center',
                background: 'rgba(236, 72, 153, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(236, 72, 153, 0.3)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🐉</div>
              <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem' }}>生肖</div>
              <div style={{ color: '#ec4899', fontSize: '1.3rem', fontWeight: 'bold' }}>
                {animal}年
              </div>
              <div style={{ color: '#f472b6', fontSize: '0.9rem' }}>
                {ganzhi}干支纪年
              </div>
            </motion.div>
          </div>
        </div>
      </SubPageSection>

      <SubPageSection title="📜 历史上的今天">
        <InfoCard>
          <p style={{ textAlign: 'center', color: 'rgba(180, 180, 190, 0.75)' }}>
            选择任意日期，查看历史上的今天发生了什么
          </p>
        </InfoCard>

        {historyEvents.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}>
            {historyEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{
                  padding: '1.25rem',
                  background: 'rgba(6, 182, 212, 0.08)',
                  borderRadius: '10px',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{ fontSize: '1.75rem' }}>{event.icon}</span>
                  <span style={{
                    color: '#06b6d4',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                  }}>
                    {event.year > 0 ? `公元 ${event.year}年` : `公元前 ${Math.abs(event.year)}年`}
                  </span>
                </div>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.9)',
                  margin: 0,
                }}>
                  {event.event}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'rgba(180, 180, 190, 0.5)',
          }}>
            📚 暂无记录，试试选择其他日期
          </div>
        )}
      </SubPageSection>

      <SubPageSection title="🎊 传统节日大全">
        <h4 style={{ color: '#f59e0b', marginBottom: '1rem' }}>🏮 农历传统节日</h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          {LUNAR_FESTIVALS.map((festival, i) => (
            <motion.div
              key={festival.name}
              whileHover={{ scale: 1.05, y: -4 }}
              style={{
                padding: '1rem',
                textAlign: 'center',
                background: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{festival.icon}</div>
              <div style={{ color: '#f59e0b', fontWeight: 'bold' }}>{festival.name}</div>
              <div style={{
                color: 'rgba(180, 180, 190, 0.6)',
                fontSize: '0.8rem',
              }}>
                农历{festival.date}
              </div>
              <div style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.75rem',
                marginTop: '0.5rem',
                fontStyle: 'italic',
              }}>
                {festival.desc}
              </div>
            </motion.div>
          ))}
        </div>

        <h4 style={{ color: '#3b82f6', marginBottom: '1rem' }}>🌟 公历重要节日</h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1rem',
        }}>
          {SOLAR_FESTIVALS.map((festival, i) => (
            <motion.div
              key={festival.name}
              whileHover={{ scale: 1.05, y: -4 }}
              style={{
                padding: '1rem',
                textAlign: 'center',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{festival.icon}</div>
              <div style={{ color: '#3b82f6', fontWeight: 'bold' }}>{festival.name}</div>
              <div style={{
                color: 'rgba(180, 180, 190, 0.6)',
                fontSize: '0.8rem',
              }}>
                {festival.date}
              </div>
              <div style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.75rem',
                marginTop: '0.5rem',
                fontStyle: 'italic',
              }}>
                {festival.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="📚 干支纪年速查表">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '0.75rem',
        }}>
          {Array.from({ length: 60 }, (_, i) => {
            const year = 1984 + i
            return (
              <div
                key={i}
                style={{
                  padding: '0.75rem',
                  textAlign: 'center',
                  background: year === new Date().getFullYear()
                    ? 'rgba(6, 182, 212, 0.2)'
                    : 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  border: year === new Date().getFullYear()
                    ? '2px solid #06b6d4'
                    : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{
                  fontSize: '0.9rem',
                  color: year === new Date().getFullYear() ? '#06b6d4' : 'rgba(180, 180, 190, 0.8)',
                  fontWeight: year === new Date().getFullYear() ? 'bold' : 'normal',
                }}>
                  {getYearGanZhi(year)}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(180, 180, 190, 0.6)',
                }}>
                  {year}年 · {getYearAnimal(year)}
                </div>
              </div>
            )
          })}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
