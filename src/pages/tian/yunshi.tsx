/**
 * 灵墟 - 天时模块 - 运势页面
 */

'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function YunshiPage() {
  const [birthMonth, setBirthMonth] = useState('3')
  
  return (
    <Layout title="运势">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🔮</div>
          <h1 className={styles.title}>每日运势</h1>
          <p className={styles.subtitle}>星象变化影响命运起伏</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>查询星座运势</h2>
          <div style={{ background: 'rgba(26,26,46,0.4)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
            <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem' }}>出生月份</label>
            <select 
              value={birthMonth} 
              onChange={(e) => setBirthMonth(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', background: '#1a1a2e', border: '1px solid #c9a227', borderRadius: '8px', color: '#e8d48b' }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}月</option>
              ))}
            </select>
          </div>
        </section>
      </div>
    </Layout>
  )
}
