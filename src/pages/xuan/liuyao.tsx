/**
 * 灵墟 - 玄学模块 - 六爻页面
 */

'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function LiuyaoPage() {
  const [coins, setCoins] = useState<number[]>([])
  
  const castCoins = () => {
    if (coins.length >= 6) {
      setCoins([])
      return
    }
    const result = Array.from({ length: 3 }, () => Math.random() > 0.5 ? 3 : 2)
    const sum = result.reduce((a, b) => a + b, 0)
    setCoins([...coins, sum])
  }

  return (
    <Layout title="六爻">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🔮</div>
          <h1 className={styles.title}>六爻占卜</h1>
          <p className={styles.subtitle}>以钱代蓍，占卜问事</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>摇卦工具</h2>
          <button 
            onClick={castCoins}
            style={{ padding: '1rem 2rem', background: '#c9a227', border: 'none', borderRadius: '8px', color: '#0a0a0f', fontSize: '1rem', cursor: 'pointer', marginBottom: '1rem' }}
          >
            {coins.length >= 6 ? '重新摇卦' : `第${coins.length + 1}次`}
          </button>
          
          {coins.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#888' }}>所得爻象</div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {coins.map((c, i) => (
                  <div key={i} style={{
                    width: '60px', height: '60px',
                    borderRadius: '50%',
                    background: c === 6 || c === 7 ? '#c9a227' : '#4ade80',
                    border: '2px solid #c9a227',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem', fontWeight: 'bold', color: '#fff'
                  }}>
                    {c === 6 ? '老阴' : c === 7 ? '少阳' : c === 8 ? '少阴' : '老阳'}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}
