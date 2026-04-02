/**
 * 灵墟 - 天时模块 - 运势页面（增强版）
 * 基于生日的动态运势算法 + 每日运势
 */

'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

// 星座数据
const ZODIACS = [
  { name: '白羊', symbol: '♈', date: '3.21-4.19', element: '火', ruler: '火星' },
  { name: '金牛', symbol: '♉', date: '4.20-5.20', element: '土', ruler: '金星' },
  { name: '双子', symbol: '♊', date: '5.21-6.21', element: '风', ruler: '水星' },
  { name: '巨蟹', symbol: '♋', date: '6.22-7.22', element: '水', ruler: '月亮' },
  { name: '狮子', symbol: '♌', date: '7.23-8.22', element: '火', ruler: '太阳' },
  { name: '处女', symbol: '♍', date: '8.23-9.22', element: '土', ruler: '水星' },
  { name: '天秤', symbol: '♎', date: '9.23-10.23', element: '风', ruler: '金星' },
  { name: '天蝎', symbol: '♏', date: '10.24-11.22', element: '水', ruler: '冥王星' },
  { name: '射手', symbol: '♐', date: '11.23-12.21', element: '火', ruler: '木星' },
  { name: '摩羯', symbol: '♑', date: '12.22-1.19', element: '土', ruler: '土星' },
  { name: '水瓶', symbol: '♒', date: '1.20-2.18', element: '风', ruler: '天王星' },
  { name: '双鱼', symbol: '♓', date: '2.19-3.20', element: '水', ruler: '海王星' },
]

// 运势建议
const LUCK_ADVICE = {
  high: [
    '今日运势极佳，宜大胆行动，把握机遇。',
    '星象吉利，适合开展新计划，贵人相助。',
    '能量充沛，事业财运双丰收之日。',
  ],
  medium: [
    '运势平稳，稳中求进为上策。',
    '今日宜守不宜攻，谨慎行事为佳。',
    '平淡之中藏机遇，细心观察可发现转机。',
  ],
  low: [
    '运势偏低，宜低调行事，避免冲突。',
    '今日不宜重大决策，静待时机。',
    '虽有阻碍，但坚持不懈终能化解。',
  ]
}

// 幸运色
const LUCKY_COLORS = ['红色', '金色', '银色', '白色', '黑色', '蓝色', '绿色', '紫色', '橙色', '粉色', '黄色', '青色']

// 运势关键词
const LUCKY_KEYWORDS = {
  love: ['桃花运旺', '感情稳定', '需要沟通', '单身有望', '宜表白'],
  career: ['事业顺遂', '贵人相助', '需耐心', '有突破', '宜合作'],
  wealth: ['财运亨通', '偏财运佳', '宜理财', '需谨慎投资', '有进账'],
  health: ['精力充沛', '注意休息', '适合运动', '饮食清淡', '心情愉悦']
}

interface FortuneResult {
  zodiac: typeof ZODIACS[0]
  overall: number
  love: number
  career: number
  wealth: number
  health: number
  luckyColor: string
  luckyNumber: number
  luckyDirection: string
  advice: string
  keywords: {
    love: string
    career: string
    wealth: string
    health: string
  }
}

// 基于日期和星座生成运势
function generateFortune(zodiacIndex: number, date: Date): FortuneResult {
  const zodiac = ZODIACS[zodiacIndex]
  
  // 使用日期作为随机种子
  const seed = date.getDate() + date.getMonth() * 31 + zodiacIndex * 100
  
  // 伪随机数生成
  const random = (offset: number) => {
    const x = Math.sin(seed + offset) * 10000
    return Math.floor((x - Math.floor(x)) * 100)
  }
  
  const overall = random(1) % 41 + 60 // 60-100
  const love = random(2) % 41 + 60
  const career = random(3) % 41 + 60
  const wealth = random(4) % 41 + 60
  const health = random(5) % 41 + 60
  
  const luckLevel = overall >= 80 ? 'high' : overall >= 65 ? 'medium' : 'low'
  const adviceList = LUCK_ADVICE[luckLevel]
  
  return {
    zodiac,
    overall,
    love,
    career,
    wealth,
    health,
    luckyColor: LUCKY_COLORS[random(10) % LUCKY_COLORS.length],
    luckyNumber: random(11) % 99 + 1,
    luckyDirection: ['东', '南', '西', '北', '东南', '西南', '东北', '西北'][random(12) % 8],
    advice: adviceList[random(13) % adviceList.length],
    keywords: {
      love: LUCKY_KEYWORDS.love[random(20) % LUCKY_KEYWORDS.love.length],
      career: LUCKY_KEYWORDS.career[random(21) % LUCKY_KEYWORDS.career.length],
      wealth: LUCKY_KEYWORDS.wealth[random(22) % LUCKY_KEYWORDS.wealth.length],
      health: LUCKY_KEYWORDS.health[random(23) % LUCKY_KEYWORDS.health.length],
    }
  }
}

// 根据生日获取星座
function getZodiacByBirthday(month: number, day: number): number {
  const dates = [
    [1, 20], [2, 19], [3, 21], [4, 20], [5, 21], [6, 22],
    [7, 23], [8, 23], [9, 23], [10, 24], [11, 23], [12, 22]
  ]
  
  for (let i = 0; i < 12; i++) {
    const [m, d] = dates[i]
    if (month === m && day < d) return (i + 11) % 12
    if (month === (m === 12 ? 1 : m + 1) && day >= d) return i
  }
  return month - 1
}

export default function YunshiPage() {
  const [selectedZodiac, setSelectedZodiac] = useState<number | null>(null)
  const [birthMonth, setBirthMonth] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [personalFortune, setPersonalFortune] = useState<FortuneResult | null>(null)
  const [todayFortune, setTodayFortune] = useState<FortuneResult | null>(null)
  const [currentDate, setCurrentDate] = useState('')
  
  useEffect(() => {
    const now = new Date()
    setCurrentDate(now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }))
  }, [])
  
  // 查看星座运势
  const handleZodiacClick = (index: number) => {
    if (selectedZodiac === index) {
      setSelectedZodiac(null)
      setTodayFortune(null)
    } else {
      setSelectedZodiac(index)
      setTodayFortune(generateFortune(index, new Date()))
    }
  }
  
  // 根据生日查询运势
  const handleBirthdaySearch = () => {
    const month = parseInt(birthMonth)
    const day = parseInt(birthDay)
    
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      const zodiacIndex = getZodiacByBirthday(month, day)
      setPersonalFortune(generateFortune(zodiacIndex, new Date()))
    }
  }
  
  // 渲染运势条
  const renderFortuneBar = (label: string, value: number, color: string) => (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <span style={{ color: '#888', fontSize: '0.85rem' }}>{label}</span>
        <span style={{ color: color, fontSize: '0.85rem' }}>{value}%</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(201, 162, 39, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${value}%`, 
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            borderRadius: '3px',
            transition: 'width 0.5s ease'
          }} 
        />
      </div>
    </div>
  )
  
  return (
    <Layout title="运势">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🔮</div>
          <h1 className={styles.title}>每日运势</h1>
          <p className={styles.subtitle}>星象变化影响命运起伏</p>
        </header>

        {/* 当前日期 */}
        <section className={styles.section}>
          <div className={styles.infoBox} style={{ textAlign: 'center' }}>
            <p style={{ color: '#c9a227', fontSize: '1.1rem', margin: 0 }}>{currentDate}</p>
          </div>
        </section>

        {/* 生日查询 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>生日运势查询</h2>
          <div className={styles.toolBox}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div className={styles.inputGroup} style={{ minWidth: '100px' }}>
                <label className={styles.inputLabel}>月份</label>
                <select 
                  className={styles.input} 
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                >
                  <option value="">选择</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                    <option key={m} value={m}>{m}月</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup} style={{ minWidth: '100px' }}>
                <label className={styles.inputLabel}>日期</label>
                <select 
                  className={styles.input} 
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                >
                  <option value="">选择</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}日</option>
                  ))}
                </select>
              </div>
              <button className={styles.button} onClick={handleBirthdaySearch} style={{ alignSelf: 'flex-end' }}>
                查运势
              </button>
            </div>
          </div>
          
          {/* 个人运势结果 */}
          {personalFortune && (
            <div className={styles.resultBox} style={{ marginTop: '1.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem' }}>{personalFortune.zodiac.symbol}</span>
                <h3 style={{ color: '#c9a227', margin: '0.5rem 0' }}>{personalFortune.zodiac.name}座</h3>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>{personalFortune.zodiac.date}</span>
              </div>
              
              <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                {renderFortuneBar('综合运势', personalFortune.overall, '#c9a227')}
                {renderFortuneBar('爱情运势', personalFortune.love, '#f472b6')}
                {renderFortuneBar('事业运势', personalFortune.career, '#60a5fa')}
                {renderFortuneBar('财富运势', personalFortune.wealth, '#4ade80')}
                {renderFortuneBar('健康运势', personalFortune.health, '#f97316')}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem', textAlign: 'center' }}>
                <div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>幸运颜色</div>
                  <div style={{ color: '#c9a227' }}>{personalFortune.luckyColor}</div>
                </div>
                <div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>幸运数字</div>
                  <div style={{ color: '#c9a227' }}>{personalFortune.luckyNumber}</div>
                </div>
                <div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>幸运方位</div>
                  <div style={{ color: '#c9a227' }}>{personalFortune.luckyDirection}方</div>
                </div>
              </div>
              
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(201, 162, 39, 0.1)', borderRadius: '8px' }}>
                <p style={{ color: '#e8d48b', margin: 0, textAlign: 'center' }}>{personalFortune.advice}</p>
              </div>
            </div>
          )}
        </section>

        {/* 星座选择 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>十二星座今日运势</h2>
          <div className={styles.cardGrid}>
            {ZODIACS.map((z, i) => (
              <div 
                key={z.name} 
                className={styles.card}
                onClick={() => handleZodiacClick(i)}
                style={{ 
                  cursor: 'pointer', 
                  border: selectedZodiac === i ? '2px solid #c9a227' : undefined,
                  padding: '1rem'
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>{z.symbol}</span>
                  <h3 style={{ color: '#c9a227', margin: '0.5rem 0 0.25rem', fontSize: '1rem' }}>{z.name}座</h3>
                  <p style={{ color: '#888', fontSize: '0.75rem', margin: 0 }}>{z.date}</p>
                </div>
                
                {selectedZodiac === i && todayFortune && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(201,162,39,0.2)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.8rem' }}>
                      <div>❤️ {todayFortune.keywords.love}</div>
                      <div>💼 {todayFortune.keywords.career}</div>
                      <div>💰 {todayFortune.keywords.wealth}</div>
                      <div>💪 {todayFortune.keywords.health}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '0.75rem', fontSize: '0.75rem', color: '#888' }}>
                      <span>幸运色: {todayFortune.luckyColor}</span>
                      <span>数字: {todayFortune.luckyNumber}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 运势说明 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>运势说明</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>
              运势基于星象位置与传统命理学原理生成，每日更新。运势仅供娱乐参考，
              真正的命运掌握在自己手中。积极向上的心态，才是改变命运的关键。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
