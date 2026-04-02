/**
 * 灵墟 - 玄学模块 - 八字页面（增强版）
 * 八字排盘 + 五行分析 + 十神解读 + 日主强弱 + 用神喜忌
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const SHENGXIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

// 五行映射
const WUXING_MAP: Record<string, string> = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', '己': '土',
  '庚': '金', '辛': '金', '壬': '水', '癸': '水',
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火',
  '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
}

// 地支藏干
const DIZHI_CANGGAN: Record<string, string[]> = {
  '子': ['癸'], '丑': ['己', '癸', '辛'], '寅': ['甲', '丙', '戊'], '卯': ['乙'],
  '辰': ['戊', '乙', '癸'], '巳': ['丙', '庚', '戊'], '午': ['丁', '己'],
  '未': ['己', '丁', '乙'], '申': ['庚', '壬', '戊'], '酉': ['辛'],
  '戌': ['戊', '辛', '丁'], '亥': ['壬', '甲']
}

// 十神映射
const SHISHEN_MAP: Record<string, Record<string, string>> = {
  '甲': { '甲': '比肩', '乙': '劫财', '丙': '食神', '丁': '伤官', '戊': '偏财', '己': '正财', '庚': '七杀', '辛': '正官', '壬': '偏印', '癸': '正印' },
  '乙': { '甲': '劫财', '乙': '比肩', '丙': '伤官', '丁': '食神', '戊': '正财', '己': '偏财', '庚': '正官', '辛': '七杀', '壬': '正印', '癸': '偏印' },
  '丙': { '甲': '偏印', '乙': '正印', '丙': '比肩', '丁': '劫财', '戊': '食神', '己': '伤官', '庚': '偏财', '辛': '正财', '壬': '七杀', '癸': '正官' },
  '丁': { '甲': '正印', '乙': '偏印', '丙': '劫财', '丁': '比肩', '戊': '伤官', '己': '食神', '庚': '正财', '辛': '偏财', '壬': '正官', '癸': '七杀' },
  '戊': { '甲': '七杀', '乙': '正官', '丙': '偏印', '丁': '正印', '戊': '比肩', '己': '劫财', '庚': '食神', '辛': '伤官', '壬': '偏财', '癸': '正财' },
  '己': { '甲': '正官', '乙': '七杀', '丙': '正印', '丁': '偏印', '戊': '劫财', '己': '比肩', '庚': '伤官', '辛': '食神', '壬': '正财', '癸': '偏财' },
  '庚': { '甲': '偏财', '乙': '正财', '丙': '七杀', '丁': '正官', '戊': '偏印', '己': '正印', '庚': '比肩', '辛': '劫财', '壬': '食神', '癸': '伤官' },
  '辛': { '甲': '正财', '乙': '偏财', '丙': '正官', '丁': '七杀', '戊': '正印', '己': '偏印', '庚': '劫财', '辛': '比肩', '壬': '伤官', '癸': '食神' },
  '壬': { '甲': '食神', '乙': '伤官', '丙': '偏财', '丁': '正财', '戊': '七杀', '己': '正官', '庚': '偏印', '辛': '正印', '壬': '比肩', '癸': '劫财' },
  '癸': { '甲': '伤官', '乙': '食神', '丙': '正财', '丁': '偏财', '戊': '正官', '己': '七杀', '庚': '正印', '辛': '偏印', '壬': '劫财', '癸': '比肩' }
}

const WUXING_COLORS: Record<string, string> = {
  '金': '#C0C0C0', '木': '#228B22', '水': '#1E90FF', '火': '#FF4500', '土': '#DAA520'
}

const SHISHEN_DESC: Record<string, string> = {
  '比肩': '代表兄弟姐妹、朋友同事，利于合作但也易竞争',
  '劫财': '代表竞争、争夺，也代表异性缘分',
  '食神': '代表才华、表达、艺术创作',
  '伤官': '代表创新、技术、聪明但易有口舌',
  '偏财': '代表偏门收入、理财、意外之财',
  '正财': '代表正当收入、工作薪资',
  '七杀': '代表压力、竞争、权威、创业',
  '正官': '代表权力、地位、事业、丈夫',
  '偏印': '代表思考、玄学、灵感、长辈',
  '正印': '代表学业、证书、名誉、母亲'
}

export default function BaziPage() {
  const [birthYear, setBirthYear] = useState('1990')
  const [birthMonth, setBirthMonth] = useState('1')
  const [birthDay, setBirthDay] = useState('1')
  const [birthTime, setBirthTime] = useState('0')
  const [showResult, setShowResult] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 计算年柱
  const getYearGanZhi = (year: number) => {
    const ganIndex = (year - 4) % 10
    const zhiIndex = (year - 4) % 12
    return {
      gan: TIANGAN[ganIndex < 0 ? ganIndex + 10 : ganIndex],
      zhi: DIZHI[zhiIndex < 0 ? zhiIndex + 12 : zhiIndex]
    }
  }

  // 计算月柱
  const getMonthGanZhi = (year: number, month: number) => {
    const yearGan = TIANGAN[(year - 4) % 10]
    const monthZhi = DIZHI[(month + 1) % 12]
    
    let monthGan = ''
    if (yearGan === '甲' || yearGan === '己') monthGan = TIANGAN[(month + 1) % 10]
    else if (yearGan === '乙' || yearGan === '庚') monthGan = TIANGAN[(month + 3) % 10]
    else if (yearGan === '丙' || yearGan === '辛') monthGan = TIANGAN[(month + 5) % 10]
    else if (yearGan === '丁' || yearGan === '壬') monthGan = TIANGAN[(month + 7) % 10]
    else monthGan = TIANGAN[(month + 9) % 10]
    
    return { gan: monthGan, zhi: monthZhi }
  }

  // 计算日柱
  const getDayGanZhi = (year: number, month: number, day: number) => {
    const baseDate = new Date(1900, 0, 31)
    const targetDate = new Date(year, month - 1, day)
    const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))
    return { gan: TIANGAN[(diffDays % 10 + 10) % 10], zhi: DIZHI[(diffDays % 12 + 12) % 12] }
  }

  // 计算时柱
  const getTimeGanZhi = (dayGan: string, timeIndex: number) => {
    const timeZhi = DIZHI[timeIndex]
    const dayGanIndex = TIANGAN.indexOf(dayGan)
    let timeGan = ''
    
    if (dayGanIndex === 0 || dayGanIndex === 5) timeGan = TIANGAN[timeIndex % 10]
    else if (dayGanIndex === 1 || dayGanIndex === 6) timeGan = TIANGAN[(timeIndex + 2) % 10]
    else if (dayGanIndex === 2 || dayGanIndex === 7) timeGan = TIANGAN[(timeIndex + 4) % 10]
    else if (dayGanIndex === 3 || dayGanIndex === 8) timeGan = TIANGAN[(timeIndex + 6) % 10]
    else timeGan = TIANGAN[(timeIndex + 8) % 10]
    
    return { gan: timeGan, zhi: timeZhi }
  }

  // 计算五行分布
  const calculateWuxing = (yearGZ: { gan: string; zhi: string }, monthGZ: { gan: string; zhi: string }, dayGZ: { gan: string; zhi: string }, timeGZ: { gan: string; zhi: string }) => {
    const wuxingCount: Record<string, number> = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 }
    const pillars = [yearGZ, monthGZ, dayGZ, timeGZ]
    
    pillars.forEach(p => {
      wuxingCount[WUXING_MAP[p.gan]] = (wuxingCount[WUXING_MAP[p.gan]] || 0) + 1.0
      wuxingCount[WUXING_MAP[p.zhi]] = (wuxingCount[WUXING_MAP[p.zhi]] || 0) + 0.6
      const canggan = DIZHI_CANGGAN[p.zhi] || []
      canggan.forEach(cg => {
        wuxingCount[WUXING_MAP[cg]] = (wuxingCount[WUXING_MAP[cg]] || 0) + 0.3
      })
    })

    return Object.entries(wuxingCount).map(([name, value]) => ({
      name,
      value: Math.round(value * 10) / 10,
      color: WUXING_COLORS[name]
    }))
  }

  // 计算十神
  const calculateShishen = (dayGan: string, yearGZ: { gan: string }, monthGZ: { gan: string }, timeGZ: { gan: string }) => {
    const pillars = [
      { gan: yearGZ.gan, name: '年干' },
      { gan: monthGZ.gan, name: '月干' },
      { gan: timeGZ.gan, name: '时干' }
    ]
    
    const shishenMap: Record<string, number> = {}
    pillars.forEach(p => {
      const ss = SHISHEN_MAP[dayGan]?.[p.gan] || p.gan
      shishenMap[ss] = (shishenMap[ss] || 0) + 1
    })

    return Object.entries(shishenMap).map(([name, count]) => ({
      name,
      count,
      description: SHISHEN_DESC[name] || '十神之一'
    }))
  }

  // 计算日主强弱
  const calculateDayMasterStrength = (wuxingData: { name: string; value: number }[], dayMaster: string) => {
    const dayWx = WUXING_MAP[dayMaster]
    const selfPower = wuxingData.find(w => w.name === dayWx)?.value || 0
    const totalPower = wuxingData.reduce((sum, w) => sum + w.value, 0)
    const ratio = selfPower / totalPower
    
    let level = ''
    let description = ''
    if (ratio > 0.25) {
      level = '强'
      description = `日主${dayMaster}(${dayWx})得令得地，五行力量充足，性格刚强独立。`
    } else if (ratio > 0.15) {
      level = '中等'
      description = `日主${dayMaster}(${dayWx})五行力量平衡，性格温和可塑。`
    } else {
      level = '弱'
      description = `日主${dayMaster}(${dayWx})偏弱，需靠外部助力，性格相对柔顺。`
    }
    
    return { score: Math.round(ratio * 100), level, description }
  }

  // 计算用神
  const calculateYongShen = (strength: { level: string }, dayMaster: string) => {
    const dayWx = WUXING_MAP[dayMaster]
    let yongshen = ''
    let jishen = ''
    
    if (strength.level === '弱') {
      if (dayWx === '木') { yongshen = '水、木'; jishen = '金' }
      else if (dayWx === '火') { yongshen = '木、火'; jishen = '水' }
      else if (dayWx === '土') { yongshen = '火、土'; jishen = '木' }
      else if (dayWx === '金') { yongshen = '土、金'; jishen = '火' }
      else { yongshen = '金、水'; jishen = '土' }
      return { yongshen, jishen, description: '日主偏弱，宜生扶，用神为印比。' }
    } else {
      if (dayWx === '木') { yongshen = '金、土'; jishen = '水' }
      else if (dayWx === '火') { yongshen = '水、金'; jishen = '木' }
      else if (dayWx === '土') { yongshen = '木、水'; jishen = '火' }
      else if (dayWx === '金') { yongshen = '火、木'; jishen = '土' }
      else { yongshen = '土、火'; jishen = '金' }
      return { yongshen, jishen, description: '日主偏强，宜克泄，用神为官杀食伤财。' }
    }
  }

  const yearGZ = getYearGanZhi(parseInt(birthYear))
  const monthGZ = getMonthGanZhi(parseInt(birthYear), parseInt(birthMonth))
  const dayGZ = getDayGanZhi(parseInt(birthYear), parseInt(birthMonth), parseInt(birthDay))
  const timeGZ = getTimeGanZhi(dayGZ.gan, parseInt(birthTime))
  const shengxiao = SHENGXIAO[(parseInt(birthYear) - 4) % 12]
  const dayMaster = dayGZ.gan

  const wuxingData = calculateWuxing(yearGZ, monthGZ, dayGZ, timeGZ)
  const shishenData = calculateShishen(dayMaster, yearGZ, monthGZ, timeGZ)
  const dayMasterStrength = calculateDayMasterStrength(wuxingData, dayMaster)
  const yongShen = calculateYongShen(dayMasterStrength, dayMaster)

  // 绘制五行图
  useEffect(() => {
    if (!showResult || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const width = 400
    const height = 200
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    ctx.scale(dpr, dpr)

    const maxVal = Math.max(...wuxingData.map(w => w.value))
    const barWidth = 60
    const gap = 15
    const startX = (width - (barWidth * 5 + gap * 4)) / 2

    ctx.clearRect(0, 0, width, height)
    
    wuxingData.forEach((wx, i) => {
      const x = startX + i * (barWidth + gap)
      const barHeight = maxVal > 0 ? (wx.value / maxVal) * 140 : 0
      const y = height - barHeight - 30

      const gradient = ctx.createLinearGradient(x, y + barHeight, x, y)
      gradient.addColorStop(0, wx.color)
      gradient.addColorStop(1, wx.color + 'aa')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, barHeight, 4)
      ctx.fill()

      ctx.fillStyle = '#e8d48b'
      ctx.font = '14px serif'
      ctx.textAlign = 'center'
      ctx.fillText(wx.name, x + barWidth / 2, height - 10)
      ctx.fillText(wx.value.toFixed(1), x + barWidth / 2, y - 8)
    })
  }, [showResult, wuxingData])

  return (
    <Layout title="八字">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>⏰</div>
          <h1 className={styles.title}>八字排盘</h1>
          <p className={styles.subtitle}>生辰八字，命理之源</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>输入出生信息</h2>
          <div className={styles.toolBox}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>出生年份</label>
                <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className={styles.input}>
                  {Array.from({ length: 100 }, (_, i) => 1924 + i).reverse().map(y => (
                    <option key={y} value={y}>{y}年</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>出生月份</label>
                <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} className={styles.input}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                    <option key={m} value={m}>{m}月</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>出生日期</label>
                <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)} className={styles.input}>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}日</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>出生时辰</label>
                <select value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className={styles.input}>
                  {['子时 (23-01)', '丑时 (01-03)', '寅时 (03-05)', '卯时 (05-07)', '辰时 (07-09)', '巳时 (09-11)', '午时 (11-13)', '未时 (13-15)', '申时 (15-17)', '酉时 (17-19)', '戌时 (19-21)', '亥时 (21-23)'].map((t, i) => (
                    <option key={i} value={i}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className={styles.button} onClick={() => setShowResult(true)} style={{ marginTop: '1.5rem' }}>
              排盘测算
            </button>
          </div>
        </section>

        {showResult && (
          <>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>八字排盘结果</h2>
              <div className={styles.resultBox}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.25rem', color: '#c9a227' }}>{shengxiao}年生人</span>
                  <span style={{ color: '#888', marginLeft: '1rem' }}>日主：{dayMaster}（{WUXING_MAP[dayMaster]}）</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
                  {[
                    { label: '年柱', gz: yearGZ },
                    { label: '月柱', gz: monthGZ },
                    { label: '日柱', gz: dayGZ },
                    { label: '时柱', gz: timeGZ }
                  ].map(p => (
                    <div key={p.label} className={styles.card} style={{ padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>{p.label}</div>
                      <div style={{ fontSize: '2rem', color: '#c9a227' }}>{p.gz.gan}{p.gz.zhi}</div>
                      <div style={{ fontSize: '0.75rem', color: WUXING_COLORS[WUXING_MAP[p.gz.gan]], marginTop: '0.25rem' }}>
                        {WUXING_MAP[p.gz.gan]}·{WUXING_MAP[p.gz.zhi]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>五行力量分布</h2>
              <div className={styles.resultBox} style={{ textAlign: 'center' }}>
                <canvas ref={canvasRef} />
                <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '1rem' }}>
                  天干权重 1.0 | 地支权重 0.6 | 藏干权重 0.3
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>十神分析</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                {shishenData.map((ss, i) => (
                  <div key={i} className={styles.card} style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#c9a227', fontSize: '1.1rem' }}>{ss.name}</span>
                      <span style={{ color: '#e8d48b' }}>×{ss.count}</span>
                    </div>
                    <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>{ss.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>日主强弱</h2>
              <div className={styles.resultBox} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', color: dayMasterStrength.level === '强' ? '#4ade80' : dayMasterStrength.level === '弱' ? '#f87171' : '#c9a227' }}>
                  {dayMasterStrength.level}
                </div>
                <p style={{ color: '#e8d48b', marginTop: '1rem' }}>{dayMasterStrength.description}</p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>用神喜忌</h2>
              <div className={styles.resultBox}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', borderRadius: '8px' }}>
                    <div style={{ color: '#888', fontSize: '0.85rem' }}>喜神</div>
                    <div style={{ color: '#4ade80', fontSize: '1.25rem', fontWeight: 500 }}>{yongShen.yongshen}</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(248, 113, 113, 0.1)', borderRadius: '8px' }}>
                    <div style={{ color: '#888', fontSize: '0.85rem' }}>忌神</div>
                    <div style={{ color: '#f87171', fontSize: '1.25rem', fontWeight: 500 }}>{yongShen.jishen}</div>
                  </div>
                </div>
                <p style={{ color: '#888', textAlign: 'center' }}>{yongShen.description}</p>
              </div>
            </section>
          </>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>八字基础知识</h2>
          <div className={styles.infoBox}>
            <h4 style={{ color: '#c9a227', marginBottom: '1rem' }}>什么是八字？</h4>
            <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>
              八字，又称四柱八字，是根据出生时间的年、月、日、时，配合天干地支排列而成的命理系统。
              每柱由一天干和一地支组成，共四柱八字，故称八字。通过分析八字中天干地支的组合，
              可以预测一个人的性格、事业、财运、婚姻等运势。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
