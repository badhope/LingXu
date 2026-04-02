/**
 * 灵墟 - 天时模块 - 节气页面（增强版）
 * 节气倒计时 + 实时节气状态 + 养生指南
 */

'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

// 24节气数据
const SOLAR_TERMS = [
  { name: '立春', pinyin: 'Lichun', date: [2, 4], meaning: '春季开始，万物复苏', advice: '宜养肝护肝，多食酸味食物', element: '木', organ: '肝' },
  { name: '雨水', pinyin: 'Yushui', date: [2, 19], meaning: '降雨开始，草木萌动', advice: '宜祛湿健脾，防寒保暖', element: '木', organ: '脾' },
  { name: '惊蛰', pinyin: 'Jingzhe', date: [3, 6], meaning: '春雷惊醒蛰虫', advice: '宜早起运动，振奋阳气', element: '木', organ: '肝' },
  { name: '春分', pinyin: 'Chunfen', date: [3, 21], meaning: '昼夜平分，春天过半', advice: '宜平衡阴阳，疏肝理气', element: '木', organ: '肝' },
  { name: '清明', pinyin: 'Qingming', date: [4, 5], meaning: '天气清朗，春暖花开', advice: '宜踏青扫墓，柔肝养肺', element: '木', organ: '肝' },
  { name: '谷雨', pinyin: 'Guyu', date: [4, 20], meaning: '雨水滋润谷物生长', advice: '宜祛湿防潮，健脾利水', element: '土', organ: '脾' },
  { name: '立夏', pinyin: 'Lixia', date: [5, 6], meaning: '夏季开始，气温升高', advice: '宜养心安神，多食苦味', element: '火', organ: '心' },
  { name: '小满', pinyin: 'Xiaoman', date: [5, 21], meaning: '麦类籽粒开始饱满', advice: '宜清热利湿，健脾和胃', element: '火', organ: '心' },
  { name: '芒种', pinyin: 'Mangzhong', date: [6, 6], meaning: '有芒作物成熟', advice: '宜清热解暑，养护心脏', element: '火', organ: '心' },
  { name: '夏至', pinyin: 'Xiazhi', date: [6, 21], meaning: '一年中白昼最长', advice: '宜养心安神，冬病夏治', element: '火', organ: '心' },
  { name: '小暑', pinyin: 'Xiaoshu', date: [7, 7], meaning: '进入伏天，暑气渐盛', advice: '宜清热解暑，健脾益气', element: '火', organ: '心' },
  { name: '大暑', pinyin: 'Dashu', date: [7, 23], meaning: '一年中最热的时期', advice: '宜防暑降温，养心安神', element: '火', organ: '心' },
  { name: '立秋', pinyin: 'Liqiu', date: [8, 8], meaning: '秋季开始，暑去凉来', advice: '宜润燥养肺，少辛多酸', element: '金', organ: '肺' },
  { name: '处暑', pinyin: 'Chushu', date: [8, 23], meaning: '暑天结束，秋意渐浓', advice: '宜滋阴润燥，健脾和胃', element: '金', organ: '肺' },
  { name: '白露', pinyin: 'Bailu', date: [9, 8], meaning: '天气转凉，露凝而白', advice: '宜养阴润肺，祛燥邪', element: '金', organ: '肺' },
  { name: '秋分', pinyin: 'Qiufen', date: [9, 23], meaning: '昼夜平分，秋天过半', advice: '宜阴阳平衡，收敛神气', element: '金', organ: '肺' },
  { name: '寒露', pinyin: 'Hanlu', date: [10, 8], meaning: '露水寒冷', advice: '宜养阴润燥，防寒保暖', element: '金', organ: '肺' },
  { name: '霜降', pinyin: 'Shuangjiang', date: [10, 23], meaning: '开始降霜', advice: '宜进补养身，防寒护膝', element: '土', organ: '脾' },
  { name: '立冬', pinyin: 'Lidong', date: [11, 7], meaning: '冬季开始，万物收藏', advice: '宜温补肾阳，早卧晚起', element: '水', organ: '肾' },
  { name: '小雪', pinyin: 'Xiaoxue', date: [11, 22], meaning: '开始降雪', advice: '宜温补驱寒，养肾防寒', element: '水', organ: '肾' },
  { name: '大雪', pinyin: 'Daxue', date: [12, 7], meaning: '降雪量大增', advice: '宜温阳散寒，保暖防冻', element: '水', organ: '肾' },
  { name: '冬至', pinyin: 'Dongzhi', date: [12, 22], meaning: '一年中白昼最短', advice: '宜补肾藏精，冬病冬治', element: '水', organ: '肾' },
  { name: '小寒', pinyin: 'Xiaohan', date: [1, 6], meaning: '进入寒冷时期', advice: '宜温补肾阳，防寒保暖', element: '水', organ: '肾' },
  { name: '大寒', pinyin: 'Dahan', date: [1, 20], meaning: '一年中最冷的时期', advice: '宜温补脾肾，驱寒暖身', element: '土', organ: '脾' },
]

const SEASONS = ['春季', '夏季', '秋季', '冬季']
const ELEMENTS: Record<string, { color: string; icon: string }> = {
  '木': { color: '#228B22', icon: '🌳' },
  '火': { color: '#FF4500', icon: '🔥' },
  '土': { color: '#DAA520', icon: '⛰️' },
  '金': { color: '#C0C0C0', icon: '🪙' },
  '水': { color: '#1E90FF', icon: '💧' },
}

interface SolarTermInfo {
  current: typeof SOLAR_TERMS[0]
  next: typeof SOLAR_TERMS[0]
  daysUntilNext: number
  progress: number
}

function getSolarTermInfo(): SolarTermInfo {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const currentDay = now.getDate()
  
  // 找到当前和下一个节气
  let currentTerm = SOLAR_TERMS[0]
  let nextTerm = SOLAR_TERMS[0]
  let daysUntilNext = 0
  
  for (let i = 0; i < SOLAR_TERMS.length; i++) {
    const term = SOLAR_TERMS[i]
    const nextIndex = (i + 1) % SOLAR_TERMS.length
    const next = SOLAR_TERMS[nextIndex]
    
    // 计算节气日期
    let termMonth = term.date[0]
    let termDay = term.date[1]
    let nextMonth = next.date[0]
    let nextDay = next.date[1]
    
    // 判断当前是否在这个节气期间
    if (termMonth <= currentMonth && (termMonth < currentMonth || termDay <= currentDay)) {
      if (nextMonth > currentMonth || (nextMonth === currentMonth && nextDay > currentDay)) {
        currentTerm = term
        nextTerm = next
        
        // 计算距离下一个节气的天数
        const nextDate = new Date(currentYear, nextMonth - 1, nextDay)
        if (nextDate < now) {
          nextDate.setFullYear(nextDate.getFullYear() + 1)
        }
        daysUntilNext = Math.ceil((nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        break
      }
    }
  }
  
  // 计算当前节气进度
  const termDuration = 15 // 每个节气大约15天
  const progress = ((termDuration - daysUntilNext) / termDuration) * 100
  
  return { current: currentTerm, next: nextTerm, daysUntilNext, progress }
}

export default function JieqiPage() {
  const [termInfo, setTermInfo] = useState<SolarTermInfo | null>(null)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [currentDate, setCurrentDate] = useState('')
  
  useEffect(() => {
    setTermInfo(getSolarTermInfo())
    
    const now = new Date()
    setCurrentDate(now.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    }))
    
    // 更新倒计时
    const updateCountdown = () => {
      const now = new Date()
      const nextTerm = getSolarTermInfo().next
      let nextDate = new Date(now.getFullYear(), nextTerm.date[0] - 1, nextTerm.date[1])
      if (nextDate < now) {
        nextDate.setFullYear(nextDate.getFullYear() + 1)
      }
      
      const diff = nextDate.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setCountdown({ days, hours, minutes, seconds })
    }
    
    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  const getSeasonFromMonth = (month: number): string => {
    if (month >= 3 && month <= 5) return '春季'
    if (month >= 6 && month <= 8) return '夏季'
    if (month >= 9 && month <= 11) return '秋季'
    return '冬季'
  }
  
  const currentSeason = getSeasonFromMonth(new Date().getMonth() + 1)
  
  if (!termInfo) return null
  
  const elementInfo = ELEMENTS[termInfo.current.element]
  
  return (
    <Layout title="节气">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🌾</div>
          <h1 className={styles.title}>二十四节气</h1>
          <p className={styles.subtitle}>顺应天时，养生之道</p>
        </header>

        {/* 当前日期 */}
        <section className={styles.section}>
          <div className={styles.infoBox} style={{ textAlign: 'center' }}>
            <p style={{ color: '#888', margin: 0 }}>{currentDate}</p>
          </div>
        </section>

        {/* 当前节气状态 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>当前节气</h2>
          <div className={styles.resultBox}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{elementInfo?.icon}</div>
              <h3 style={{ color: elementInfo?.color || '#c9a227', fontSize: '2.5rem', margin: '0 0 0.5rem' }}>
                {termInfo.current.name}
              </h3>
              <p style={{ color: '#888', margin: '0 0 1rem' }}>{termInfo.current.pinyin}</p>
              <p style={{ color: '#e8d48b', lineHeight: 1.8 }}>{termInfo.current.meaning}</p>
            </div>
            
            {/* 节气进度条 */}
            <div style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>节气进度</span>
                <span style={{ color: '#c9a227', fontSize: '0.85rem' }}>{Math.round(termInfo.progress)}%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(201, 162, 39, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    width: `${termInfo.progress}%`, 
                    background: `linear-gradient(90deg, ${elementInfo?.color || '#c9a227'}, #c9a227)`,
                    borderRadius: '4px',
                    transition: 'width 0.5s ease'
                  }} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* 下一个节气倒计时 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>下一节气：{termInfo.next.name}</h2>
          <div className={styles.resultBox}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
              {[
                { label: '天', value: countdown.days },
                { label: '时', value: countdown.hours },
                { label: '分', value: countdown.minutes },
                { label: '秒', value: countdown.seconds },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    color: '#c9a227',
                    fontWeight: 'bold',
                    textShadow: '0 0 20px rgba(201, 162, 39, 0.5)'
                  }}>
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.25rem' }}>{item.label}</div>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#888', fontSize: '0.85rem' }}>
              {termInfo.next.date[0]}月{termInfo.next.date[1]}日左右
            </div>
          </div>
        </section>

        {/* 当前节气养生指南 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{termInfo.current.name}养生指南</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card} style={{ padding: '1.5rem' }}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>五行属性</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>{elementInfo?.icon}</span>
                <div>
                  <div style={{ color: elementInfo?.color, fontSize: '1.25rem' }}>{termInfo.current.element}</div>
                  <div style={{ color: '#888', fontSize: '0.85rem' }}>对应脏腑：{termInfo.current.organ}</div>
                </div>
              </div>
            </div>
            
            <div className={styles.card} style={{ padding: '1.5rem' }}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>养生建议</h3>
              <p style={{ color: '#e8d48b', lineHeight: 1.8 }}>{termInfo.current.advice}</p>
            </div>
          </div>
        </section>

        {/* 当前季节节气 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>当前季节：{currentSeason}</h2>
          <div className={styles.cardGrid}>
            {SOLAR_TERMS.filter(t => {
              const month = new Date().getMonth() + 1
              const termMonth = t.date[0]
              if (currentSeason === '春季') return termMonth >= 2 && termMonth <= 4
              if (currentSeason === '夏季') return termMonth >= 5 && termMonth <= 7
              if (currentSeason === '秋季') return termMonth >= 8 && termMonth <= 10
              return termMonth >= 11 || termMonth <= 1
            }).map((term, index) => {
              const elem = ELEMENTS[term.element]
              const isCurrent = term.name === termInfo.current.name
              
              return (
                <div 
                  key={term.name} 
                  className={styles.card}
                  style={{ 
                    padding: '1rem',
                    border: isCurrent ? `2px solid ${elem.color}` : undefined,
                    boxShadow: isCurrent ? `0 0 20px ${elem.color}40` : undefined
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '1.5rem' }}>{elem.icon}</span>
                    <h3 style={{ color: elem.color, margin: '0.5rem 0 0.25rem' }}>{term.name}</h3>
                    <p style={{ color: '#888', fontSize: '0.75rem', margin: 0 }}>{term.date[0]}月{term.date[1]}日</p>
                  </div>
                  <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '0.75rem', lineHeight: 1.6, textAlign: 'center' }}>
                    {term.meaning}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* 全部节气 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>二十四节气总览</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', 
            gap: '0.75rem',
            textAlign: 'center'
          }}>
            {SOLAR_TERMS.map((term, i) => {
              const elem = ELEMENTS[term.element]
              return (
                <div 
                  key={term.name}
                  style={{
                    padding: '0.75rem 0.5rem',
                    background: term.name === termInfo.current.name ? `${elem.color}20` : 'rgba(26, 26, 46, 0.4)',
                    border: `1px solid ${term.name === termInfo.current.name ? elem.color : 'rgba(201, 162, 39, 0.2)'}`,
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ color: elem.color, fontWeight: 500 }}>{term.name}</div>
                  <div style={{ color: '#666', fontSize: '0.7rem' }}>{term.date[0]}/{term.date[1]}</div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </Layout>
  )
}
