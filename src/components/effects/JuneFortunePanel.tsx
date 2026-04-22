'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ZodiacFortune {
  id: number
  name: string
  icon: string
  overall: number
  career: number
  wealth: number
  love: number
  health: number
  luckyColor: string
  luckyNumber: number
  luckyDirection: string
  auspiciousDays: number[]
  inauspiciousDays: number[]
  advice: string
  nobleMan: string
  warning: string
}

interface DailyYiJi {
  day: number
  yi: string[]
  ji: string[]
  deity: string
  fetusGod: string
  pengZu: string
}

const ZODIAC_FORTUNES: ZodiacFortune[] = [
  {
    id: 1, name: '鼠', icon: '🐀',
    overall: 85, career: 88, wealth: 82, love: 78, health: 85,
    luckyColor: '蓝色', luckyNumber: 3, luckyDirection: '正北',
    auspiciousDays: [3, 7, 12, 18, 24, 29],
    inauspiciousDays: [5, 14, 22, 28],
    advice: '本月贵人运旺盛，事业上有升迁机会，宜主动出击。财运尚可，但需防小人暗算。感情方面已婚者感情稳定，单身者有桃花出现。',
    nobleMan: '属牛、属龙',
    warning: '注意肝胆健康，少熬夜。'
  },
  {
    id: 2, name: '牛', icon: '🐂',
    overall: 78, career: 80, wealth: 75, love: 82, health: 76,
    luckyColor: '红色', luckyNumber: 8, luckyDirection: '正南',
    auspiciousDays: [2, 8, 15, 21, 26, 30],
    inauspiciousDays: [4, 11, 19, 27],
    advice: '本月运势平稳中见上升，工作上有表现机会，但需脚踏实地。正财可期，偏财勿贪。感情方面适合告白求婚。',
    nobleMan: '属鼠、属鸡',
    warning: '注意脾胃消化，饮食规律。'
  },
  {
    id: 3, name: '虎', icon: '🐅',
    overall: 92, career: 95, wealth: 90, love: 88, health: 85,
    luckyColor: '绿色', luckyNumber: 6, luckyDirection: '正东',
    auspiciousDays: [1, 6, 13, 19, 25, 28],
    inauspiciousDays: [7, 15, 23, 29],
    advice: '本月鸿运当头，事业如日中天，有望获得重大突破。财运亨通，可适当投资。桃花运极旺，单身者易遇良缘。',
    nobleMan: '属马、属狗',
    warning: '切勿得意忘形，盛极必衰。'
  },
  {
    id: 4, name: '兔', icon: '🐇',
    overall: 72, career: 70, wealth: 68, love: 80, health: 75,
    luckyColor: '粉色', luckyNumber: 4, luckyDirection: '东南',
    auspiciousDays: [4, 9, 16, 22, 27],
    inauspiciousDays: [2, 10, 18, 26],
    advice: '本月运势平平，工作上宜守不宜攻，保持现状即可。财运一般，不宜大笔投资。感情方面女性桃花运好于男性。',
    nobleMan: '属羊、属猪',
    warning: '防止口舌是非，慎言慎行。'
  },
  {
    id: 5, name: '龙', icon: '🐉',
    overall: 88, career: 90, wealth: 85, love: 86, health: 82,
    luckyColor: '金色', luckyNumber: 5, luckyDirection: '西北',
    auspiciousDays: [5, 10, 17, 23, 29],
    inauspiciousDays: [3, 12, 20, 25],
    advice: '本月贵人运极佳，事业上可得长辈提携，有望更上一层楼。财运兴旺，名利双收。感情方面心想事成。',
    nobleMan: '属鼠、属猴',
    warning: '注意心脑血管健康，控制情绪。'
  },
  {
    id: 6, name: '蛇', icon: '🐍',
    overall: 75, career: 78, wealth: 72, love: 76, health: 70,
    luckyColor: '紫色', luckyNumber: 2, luckyDirection: '西南',
    auspiciousDays: [6, 11, 18, 24, 30],
    inauspiciousDays: [1, 8, 16, 24],
    advice: '本月运势逐步回升，工作上宜韬光养晦，静待时机。财运中等，宜储蓄。感情方面需主动表达，勿错失良机。',
    nobleMan: '属牛、属鸡',
    warning: '注意肾脏健康，节制欲望。'
  },
  {
    id: 7, name: '马', icon: '🐎',
    overall: 82, career: 85, wealth: 80, love: 84, health: 78,
    luckyColor: '橙色', luckyNumber: 9, luckyDirection: '正南',
    auspiciousDays: [3, 8, 14, 20, 26],
    inauspiciousDays: [6, 13, 21, 28],
    advice: '本月事业运旺盛，有外出发展机会，宜主动争取。财运渐入佳境。感情方面热情似火，适合浪漫约会。',
    nobleMan: '属虎、属狗',
    warning: '注意交通安全，出行小心。'
  },
  {
    id: 8, name: '羊', icon: '🐑',
    overall: 70, career: 68, wealth: 72, love: 75, health: 68,
    luckyColor: '白色', luckyNumber: 7, luckyDirection: '正西',
    auspiciousDays: [2, 7, 15, 21, 27],
    inauspiciousDays: [9, 17, 25, 30],
    advice: '本月运势偏弱，工作上压力较大，宜调整心态。财运尚可，但需防破财。感情方面多沟通，避免误会。',
    nobleMan: '属兔、属猪',
    warning: '注意关节疼痛，注意保暖。'
  },
  {
    id: 9, name: '猴', icon: '🐒',
    overall: 80, career: 82, wealth: 78, love: 83, health: 76,
    luckyColor: '银色', luckyNumber: 1, luckyDirection: '正西',
    auspiciousDays: [4, 9, 16, 22, 28],
    inauspiciousDays: [5, 14, 20, 27],
    advice: '本月头脑灵活，创意十足，工作上可有突出表现。财运有波动，见好就收。感情方面桃花朵朵开。',
    nobleMan: '属龙、属鼠',
    warning: '小心上当受骗，擦亮眼睛。'
  },
  {
    id: 10, name: '鸡', icon: '🐓',
    overall: 76, career: 74, wealth: 78, love: 80, health: 72,
    luckyColor: '黄色', luckyNumber: 0, luckyDirection: '西南',
    auspiciousDays: [1, 7, 14, 20, 25],
    inauspiciousDays: [8, 16, 23, 29],
    advice: '本月财运不错，有意外收获。工作上需低调行事，避免与人争执。感情方面已婚者防第三者插足。',
    nobleMan: '属牛、属蛇',
    warning: '注意呼吸系统，少去人多之地。'
  },
  {
    id: 11, name: '狗', icon: '🐕',
    overall: 83, career: 86, wealth: 81, love: 79, health: 80,
    luckyColor: '棕色', luckyNumber: 11, luckyDirection: '东北',
    auspiciousDays: [5, 10, 17, 23, 26],
    inauspiciousDays: [4, 12, 19, 27],
    advice: '本月事业运势上扬，可得朋友相助，事业更上一层楼。财运稳定增长。感情方面忠诚终得回报。',
    nobleMan: '属虎、属马',
    warning: '注意眼睛健康，减少用眼。'
  },
  {
    id: 12, name: '猪', icon: '🐖',
    overall: 74, career: 72, wealth: 76, love: 78, health: 70,
    luckyColor: '黑色', luckyNumber: 12, luckyDirection: '正北',
    auspiciousDays: [3, 8, 15, 21, 29],
    inauspiciousDays: [6, 13, 22, 30],
    advice: '本月运势逐渐好转，工作上渐入佳境。财运有惊喜，可能收到礼物或红包。感情方面甜蜜温馨。',
    nobleMan: '属兔、属羊',
    warning: '控制饮食，防止体重过度增长。'
  },
]

const DAILY_YIJI: DailyYiJi[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1
  const allYi = ['祭祀', '祈福', '求嗣', '开光', '嫁娶', '纳采', '订盟', '安床', '作灶', '入宅', '移徙', '修造', '动土', '开市', '交易', '立券', '纳财', '出行', '安葬', '破土']
  const allJi = ['嫁娶', '入宅', '开市', '安葬', '动土', '破土', '出行', '祈福', '开光']
  const shuffledYi = [...allYi].sort(() => Math.random() - 0.5)
  const shuffledJi = [...allJi].sort(() => Math.random() - 0.5)
  return {
    day,
    yi: shuffledYi.slice(0, 5 + Math.floor(Math.random() * 5)),
    ji: shuffledJi.slice(0, 3 + Math.floor(Math.random() * 4)),
    deity: ['天德', '月德', '玉堂', '青龙', '明堂', '金匮'][Math.floor(Math.random() * 6)],
    fetusGod: ['占房床', '占门碓', '占厨灶', '占大门', '占碓磨'][Math.floor(Math.random() * 5)],
    pengZu: ['甲不开仓', '乙不栽植', '丙不修灶', '丁不剃头', '戊不受田', '己不破券'][Math.floor(Math.random() * 6)],
  }
})

const FORTUNE_COLORS = [
  { score: 90, color: '#22c55e', text: '🔴 大旺' },
  { score: 80, color: '#84cc16', text: '🟢 吉' },
  { score: 70, color: '#eab308', text: '🟡 平' },
  { score: 60, color: '#f97316', text: '🟠 注意' },
  { score: 0, color: '#ef4444', text: '🔴 凶' },
]

export default function JuneFortunePanel() {
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacFortune | null>(null)
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate())
  const [today] = useState(new Date().getDate())

  const getFortuneLevel = (score: number) => {
    return FORTUNE_COLORS.find(f => score >= f.score) || FORTUNE_COLORS[FORTUNE_COLORS.length - 1]
  }

  return (
    <div style={{ width: '100%' }}>
      <h3 style={{
        color: '#eab308',
        fontFamily: '"Noto Serif SC", serif',
        marginBottom: '1.5rem',
        textAlign: 'center',
        fontSize: '1.5rem',
      }}>
        🍀 十二生肖 · 乙巳年午月运程
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {ZODIAC_FORTUNES.map((zodiac) => {
          const fortune = getFortuneLevel(zodiac.overall)
          return (
            <motion.button
              key={zodiac.id}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedZodiac(selectedZodiac?.id === zodiac.id ? null : zodiac)}
              style={{
                padding: '1rem 0.5rem',
                background: selectedZodiac?.id === zodiac.id
                  ? fortune.color + '40'
                  : 'rgba(255, 255, 255, 0.05)',
                border: '2px solid ' + (selectedZodiac?.id === zodiac.id ? fortune.color : 'rgba(255, 255, 255, 0.2)'),
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{zodiac.icon}</div>
              <div style={{ color: fortune.color, fontWeight: 'bold', fontSize: '1rem' }}>
                属{zodiac.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                {fortune.text} {zodiac.overall}分
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedZodiac && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, ' + getFortuneLevel(selectedZodiac.overall).color + '20 0%, rgba(15, 15, 35, 0.95) 100%)',
              borderRadius: '16px',
              border: '2px solid ' + getFortuneLevel(selectedZodiac.overall).color + '80',
              overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr',
              gap: '1.5rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{ textAlign: 'center' }}>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${getFortuneLevel(selectedZodiac.overall).color} 0%, ${getFortuneLevel(selectedZodiac.overall).color}44 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    margin: '0 auto 0.5rem',
                    boxShadow: `0 0 30px ${getFortuneLevel(selectedZodiac.overall).color}60`,
                  }}
                >
                  {selectedZodiac.icon}
                </motion.div>
                <h4 style={{
                  color: getFortuneLevel(selectedZodiac.overall).color,
                  fontSize: '1.25rem',
                }}>
                  属{selectedZodiac.name}
                </h4>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                  综合运势 {getFortuneLevel(selectedZodiac.overall).text}
                </div>
              </div>

              <div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '1rem',
                  marginBottom: '1rem',
                }}>
                  {[
                    { label: '事业', value: selectedZodiac.career },
                    { label: '财运', value: selectedZodiac.wealth },
                    { label: '感情', value: selectedZodiac.love },
                    { label: '健康', value: selectedZodiac.health },
                  ].map(item => {
                    const level = getFortuneLevel(item.value)
                    return (
                      <div key={item.label} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.25rem' }}>
                          {item.label}
                        </div>
                        <div style={{
                          width: '100%',
                          height: '8px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          marginBottom: '0.25rem',
                        }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1 }}
                            style={{
                              height: '100%',
                              background: level.color,
                              borderRadius: '4px',
                            }}
                          />
                        </div>
                        <div style={{ color: level.color, fontWeight: 'bold', fontSize: '0.875rem' }}>
                          {item.value}分
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  fontSize: '0.875rem',
                  marginBottom: '1rem',
                }}>
                  <div style={{
                    padding: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '6px',
                    textAlign: 'center',
                  }}>
                    <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>幸运色</div>
                    <div style={{ color: getFortuneLevel(selectedZodiac.overall).color, fontWeight: 'bold' }}>
                      {selectedZodiac.luckyColor}
                    </div>
                  </div>
                  <div style={{
                    padding: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '6px',
                    textAlign: 'center',
                  }}>
                    <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>幸运数字</div>
                    <div style={{ color: getFortuneLevel(selectedZodiac.overall).color, fontWeight: 'bold' }}>
                      {selectedZodiac.luckyNumber}
                    </div>
                  </div>
                  <div style={{
                    padding: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '6px',
                    textAlign: 'center',
                  }}>
                    <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>贵人属相</div>
                    <div style={{ color: getFortuneLevel(selectedZodiac.overall).color, fontWeight: 'bold' }}>
                      {selectedZodiac.nobleMan}
                    </div>
                  </div>
                </div>

                <p style={{
                  lineHeight: 1.8,
                  color: 'rgba(255, 255, 255, 0.85)',
                }}>
                  💡 {selectedZodiac.advice}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <h4 style={{
        color: '#06b6d4',
        fontFamily: '"Noto Serif SC", serif',
        marginBottom: '1rem',
        fontSize: '1.25rem',
      }}>
        📅 六月每日宜忌
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '0.5rem',
      }}>
        {DAILY_YIJI.map((dayData) => {
          const isToday = dayData.day === today
          const isSelected = dayData.day === selectedDay
          return (
            <motion.button
              key={dayData.day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(dayData.day)}
              style={{
                padding: '0.75rem 0.5rem',
                background: isToday
                  ? 'rgba(6, 182, 212, 0.3)'
                  : isSelected
                    ? 'rgba(6, 182, 212, 0.15)'
                    : 'rgba(255, 255, 255, 0.03)',
                border: '1px solid ' + (isToday || isSelected ? 'rgba(6, 182, 212, 0.6)' : 'rgba(255, 255, 255, 0.1)'),
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontSize: isToday ? '1.5rem' : '1.25rem',
                fontWeight: isToday ? 'bold' : 'normal',
                color: isToday ? '#06b6d4' : 'rgba(255, 255, 255, 0.85)',
                marginBottom: '0.25rem',
              }}>
                {dayData.day}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(34, 197, 94, 0.8)' }}>
                宜: {dayData.yi.length}项
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(239, 68, 68, 0.8)' }}>
                忌: {dayData.ji.length}项
              </div>
              {isToday && (
                <div style={{ fontSize: '0.65rem', color: '#06b6d4' }}>今天</div>
              )}
            </motion.button>
          )
        })}
      </div>

      {selectedDay && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '1rem',
            padding: '1.25rem',
            background: 'rgba(6, 182, 212, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(6, 182, 212, 0.4)',
          }}
        >
          <h5 style={{ color: '#06b6d4', marginBottom: '1rem' }}>
            📅 六月{selectedDay}日黄历
          </h5>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '0.5rem' }}>✅ 宜</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {DAILY_YIJI[selectedDay - 1].yi.map((y, i) => (
                  <span key={i} style={{
                    padding: '0.25rem 0.5rem',
                    background: 'rgba(34, 197, 94, 0.2)',
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    color: '#22c55e',
                  }}>
                    {y}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '0.5rem' }}>❌ 忌</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {DAILY_YIJI[selectedDay - 1].ji.map((j, i) => (
                  <span key={i} style={{
                    padding: '0.25rem 0.5rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    color: '#ef4444',
                  }}>
                    {j}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            gap: '2rem',
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.6)',
          }}>
            <span>🌟 值神: {DAILY_YIJI[selectedDay - 1].deity}</span>
            <span>🏠 胎神: {DAILY_YIJI[selectedDay - 1].fetusGod}</span>
            <span>📜 彭祖百忌: {DAILY_YIJI[selectedDay - 1].pengZu}</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
