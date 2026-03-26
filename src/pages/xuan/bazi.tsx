/**
 * 灵墟 - 玄学模块 - 八字页面
 */

'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function BaziPage() {
  const [birthYear, setBirthYear] = useState('1990')
  
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
          <div style={{ background: 'rgba(26,26,46,0.4)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
            <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem' }}>出生年份</label>
            <select 
              value={birthYear} 
              onChange={(e) => setBirthYear(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', background: '#1a1a2e', border: '1px solid #c9a227', borderRadius: '8px', color: '#e8d48b' }}
            >
              {Array.from({ length: 100 }, (_, i) => 1920 + i).reverse().map(y => (
                <option key={y} value={y}>{y}年</option>
              ))}
            </select>
          </div>
        </section>
      </div>
    </Layout>
  )
}
