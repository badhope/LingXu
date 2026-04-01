/**
 * 灵墟 - 玄学模块 - 八字页面
 */

'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const SHENGXIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

export default function BaziPage() {
  const [birthYear, setBirthYear] = useState('1990')
  const [birthMonth, setBirthMonth] = useState('1')
  const [birthDay, setBirthDay] = useState('1')
  const [birthTime, setBirthTime] = useState('0')
  const [showResult, setShowResult] = useState(false)

  const getYearGanZhi = (year: number) => {
    const ganIndex = (year - 4) % 10
    const zhiIndex = (year - 4) % 12
    return {
      gan: TIANGAN[ganIndex < 0 ? ganIndex + 10 : ganIndex],
      zhi: DIZHI[zhiIndex < 0 ? zhiIndex + 12 : zhiIndex]
    }
  }

  const getMonthGanZhi = (year: number, month: number) => {
    const yearGan = TIANGAN[(year - 4) % 10]
    const monthZhi = DIZHI[(month + 1) % 12]
    
    let monthGan = ''
    if (yearGan === '甲' || yearGan === '己') {
      monthGan = TIANGAN[(month + 1) % 10]
    } else if (yearGan === '乙' || yearGan === '庚') {
      monthGan = TIANGAN[(month + 3) % 10]
    } else if (yearGan === '丙' || yearGan === '辛') {
      monthGan = TIANGAN[(month + 5) % 10]
    } else if (yearGan === '丁' || yearGan === '壬') {
      monthGan = TIANGAN[(month + 7) % 10]
    } else {
      monthGan = TIANGAN[(month + 9) % 10]
    }
    
    return { gan: monthGan, zhi: monthZhi }
  }

  const getDayGanZhi = (year: number, month: number, day: number) => {
    const baseDate = new Date(1900, 0, 31)
    const targetDate = new Date(year, month - 1, day)
    const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))
    const ganIndex = (diffDays % 10 + 10) % 10
    const zhiIndex = (diffDays % 12 + 12) % 12
    return { gan: TIANGAN[ganIndex], zhi: DIZHI[zhiIndex] }
  }

  const getTimeGanZhi = (dayGan: string, timeIndex: number) => {
    const timeZhi = DIZHI[timeIndex]
    let timeGan = ''
    
    const dayGanIndex = TIANGAN.indexOf(dayGan)
    if (dayGanIndex === 0 || dayGanIndex === 5) {
      timeGan = TIANGAN[timeIndex % 10]
    } else if (dayGanIndex === 1 || dayGanIndex === 6) {
      timeGan = TIANGAN[(timeIndex + 2) % 10]
    } else if (dayGanIndex === 2 || dayGanIndex === 7) {
      timeGan = TIANGAN[(timeIndex + 4) % 10]
    } else if (dayGanIndex === 3 || dayGanIndex === 8) {
      timeGan = TIANGAN[(timeIndex + 6) % 10]
    } else {
      timeGan = TIANGAN[(timeIndex + 8) % 10]
    }
    
    return { gan: timeGan, zhi: timeZhi }
  }

  const calculateBazi = () => {
    const year = parseInt(birthYear)
    const month = parseInt(birthMonth)
    const day = parseInt(birthDay)
    const timeIdx = parseInt(birthTime)
    
    const yearGZ = getYearGanZhi(year)
    const monthGZ = getMonthGanZhi(year, month)
    const dayGZ = getDayGanZhi(year, month, day)
    const timeGZ = getTimeGanZhi(dayGZ.gan, timeIdx)
    
    setShowResult(true)
  }

  const yearGZ = getYearGanZhi(parseInt(birthYear))
  const monthGZ = getMonthGanZhi(parseInt(birthYear), parseInt(birthMonth))
  const dayGZ = getDayGanZhi(parseInt(birthYear), parseInt(birthMonth), parseInt(birthDay))
  const timeGZ = getTimeGanZhi(dayGZ.gan, parseInt(birthTime))
  const shengxiao = SHENGXIAO[(parseInt(birthYear) - 4) % 12]

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
                <select 
                  value={birthYear} 
                  onChange={(e) => setBirthYear(e.target.value)}
                  className={styles.input}
                >
                  {Array.from({ length: 100 }, (_, i) => 1924 + i).reverse().map(y => (
                    <option key={y} value={y}>{y}年</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>出生月份</label>
                <select 
                  value={birthMonth} 
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className={styles.input}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                    <option key={m} value={m}>{m}月</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>出生日期</label>
                <select 
                  value={birthDay} 
                  onChange={(e) => setBirthDay(e.target.value)}
                  className={styles.input}
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}日</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>出生时辰</label>
                <select 
                  value={birthTime} 
                  onChange={(e) => setBirthTime(e.target.value)}
                  className={styles.input}
                >
                  {[
                    { idx: 0, name: '子时 (23:00-01:00)' },
                    { idx: 1, name: '丑时 (01:00-03:00)' },
                    { idx: 2, name: '寅时 (03:00-05:00)' },
                    { idx: 3, name: '卯时 (05:00-07:00)' },
                    { idx: 4, name: '辰时 (07:00-09:00)' },
                    { idx: 5, name: '巳时 (09:00-11:00)' },
                    { idx: 6, name: '午时 (11:00-13:00)' },
                    { idx: 7, name: '未时 (13:00-15:00)' },
                    { idx: 8, name: '申时 (15:00-17:00)' },
                    { idx: 9, name: '酉时 (17:00-19:00)' },
                    { idx: 10, name: '戌时 (19:00-21:00)' },
                    { idx: 11, name: '亥时 (21:00-23:00)' },
                  ].map(t => (
                    <option key={t.idx} value={t.idx}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className={styles.button} onClick={calculateBazi} style={{ marginTop: '1.5rem' }}>
              排盘测算
            </button>
          </div>
        </section>

        {showResult && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>八字排盘结果</h2>
            <div className={styles.resultBox}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '1.25rem', color: '#c9a227', marginBottom: '0.5rem' }}>
                  {shengxiao}年生人
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
                <div className={styles.card} style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>年柱</div>
                  <div style={{ fontSize: '2rem', color: '#c9a227' }}>{yearGZ.gan}{yearGZ.zhi}</div>
                </div>
                <div className={styles.card} style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>月柱</div>
                  <div style={{ fontSize: '2rem', color: '#c9a227' }}>{monthGZ.gan}{monthGZ.zhi}</div>
                </div>
                <div className={styles.card} style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>日柱</div>
                  <div style={{ fontSize: '2rem', color: '#c9a227' }}>{dayGZ.gan}{dayGZ.zhi}</div>
                </div>
                <div className={styles.card} style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>时柱</div>
                  <div style={{ fontSize: '2rem', color: '#c9a227' }}>{timeGZ.gan}{timeGZ.zhi}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>八字基础知识</h2>
          <div className={styles.infoBox}>
            <h4 style={{ color: '#c9a227', marginBottom: '1rem' }}>什么是八字？</h4>
            <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>
              八字，又称四柱八字，是根据出生时间的年、月、日、时，
              配合天干地支排列而成的命理系统。每柱由一天干和一地支组成，
              共四柱八字，故称八字。八字命理学认为，通过分析八字中天干地支的组合，
              可以预测一个人的性格、事业、财运、婚姻等运势。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
