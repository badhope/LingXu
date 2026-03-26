/**
 * 灵墟 - 玄学模块 - 八字页面
 */

'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function BaziPage() {
  const [birthYear, setBirthYear] = useState('1990')
  const [birthMonth, setBirthMonth] = useState('1')
  const [birthDay, setBirthDay] = useState('1')
  const [birthHour, setBirthHour] = useState('子')
  
  const tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  const dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  const shengxiao = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
  const wuxing = ['木', '火', '土', '金', '水']

  const calculateBazi = () => {
    const year = parseInt(birthYear)
    const month = parseInt(birthMonth)
    const day = parseInt(birthDay)
    
    const yearIndex = (year - 4) % 60
    const yearGan = tiangan[yearIndex % 10]
    const yearZhi = dizhi[yearIndex % 12]
    
    const monthIndex = ((year % 5) * 2 + month) % 10
    const monthGan = tiangan[monthIndex]
    const monthZhi = dizhi[(month + 1) % 12]
    
    const dayIndex = (new Date(year, month - 1, day).getTime() - new Date(1900, 0, 31).getTime()) / 86400000
    const dayGan = tiangan[Math.floor(dayIndex) % 10]
    const dayZhi = dizhi[Math.floor(dayIndex) % 12]
    
    const hourIndex = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'].indexOf(birthHour)
    const hourGan = tiangan[(Math.floor(dayIndex) % 10 + Math.floor(hourIndex / 2)) % 10]
    const hourZhi = birthHour
    
    return {
      year: yearGan + yearZhi,
      month: monthGan + monthZhi,
      day: dayGan + dayZhi,
      hour: hourGan + hourZhi,
      shengxiao: shengxiao[year % 12 < 0 ? (year % 12) + 12 : year % 12],
      yearWuxing: wuxing[Math.floor(yearIndex / 2) % 5],
    }
  }

  const bazi = calculateBazi()

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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>出生年份</label>
                <select className={styles.select} value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
                  {Array.from({ length: 100 }, (_, i) => 1920 + i).reverse().map(y => (
                    <option key={y} value={y}>{y}年</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>出生月份</label>
                <select className={styles.select} value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}月</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>出生日期</label>
                <select className={styles.select} value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}日</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>出生时辰</label>
                <select className={styles.select} value={birthHour} onChange={(e) => setBirthHour(e.target.value)}>
                  {dizhi.map(d => <option key={d} value={d}>{d}时</option>)}
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>八字命盘</h2>
          <div className={styles.toolBox}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: '年柱', value: bazi.year },
                { label: '月柱', value: bazi.month },
                { label: '日柱', value: bazi.day },
                { label: '时柱', value: bazi.hour },
              ].map((col) => (
                <div key={col.label} style={{
                  padding: '1.5rem 1rem',
                  background: 'rgba(201, 162, 39, 0.1)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  minWidth: '80px'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>{col.label}</div>
                  <div style={{ fontSize: '1.5rem', color: '#c9a227', fontWeight: 500 }}>{col.value}</div>
                </div>
              ))}
            </div>
            
            <div className={styles.resultBox}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>生肖</div>
                  <div style={{ fontSize: '1.25rem', color: '#e8d48b' }}>{bazi.shengxiao}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>年柱五行</div>
                  <div style={{ fontSize: '1.25rem', color: '#e8d48b' }}>{bazi.yearWuxing}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>日主</div>
                  <div style={{ fontSize: '1.25rem', color: '#e8d48b' }}>{bazi.day[0]}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>五行与天干地支</h2>
          <div className={styles.infoBox}>
            <h4 style={{ color: '#c9a227', marginBottom: '1rem' }}>天干</h4>
            <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              甲乙丙丁戊己庚辛壬癸，共十天干。甲乙属木，丙丁属火，戊己属土，庚辛属金，壬癸属水。
            </p>
            <h4 style={{ color: '#c9a227', marginBottom: '1rem' }}>地支</h4>
            <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>
              子丑寅卯辰巳午未申酉戌亥，共十二地支。地支与生肖相对应：子鼠、丑牛、寅虎、卯兔、辰龙、巳蛇、午马、未羊、申猴、酉鸡、戌狗、亥猪。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
