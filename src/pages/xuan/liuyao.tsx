/**
 * 灵墟 - 玄学模块 - 六爻页面
 */

'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function LiuyaoPage() {
  const [coins, setCoins] = useState<number[]>([])
  const [lines, setLines] = useState<string[]>([])
  
  const castCoins = () => {
    if (coins.length >= 6) {
      setCoins([])
      setLines([])
      return
    }
    const result = Array.from({ length: 3 }, () => Math.random() > 0.5 ? 3 : 2)
    const sum = result.reduce((a, b) => a + b, 0)
    const yao = sum === 6 ? '老阴' : sum === 7 ? '少阳' : sum === 8 ? '少阴' : '老阳'
    const line = sum >= 6 ? '老阴' : sum === 7 ? '少阳' : sum === 8 ? '少阴' : '老阳'
    setCoins([...coins, sum])
    setLines([...lines, yao])
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
          <h2 className={styles.sectionTitle}>摇卦</h2>
          <div className={styles.toolBox}>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: '1.5rem' }}>
              心中默念问题，然后点击"摇卦"按钮，共摇六次
            </p>
            <button className={styles.button} onClick={castCoins}>
              {coins.length >= 6 ? '重新摇卦' : `第${coins.length + 1}次`}
            </button>
            
            {lines.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#888' }}>卦象</div>
                <div className={styles.yaoList}>
                  {lines.map((line, i) => (
                    <div key={i} className={styles.yaoItem}>
                      <span className={styles.yaoIndex}>{i + 1}</span>
                      <span className={styles.yaoName}>{line}</span>
                      <div className={styles.yaoLine} style={{ background: line.includes('阴') ? '#888' : '#c9a227' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>六爻基础知识</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>少阳</h3>
              <p className={styles.cardDesc}>三枚硬币中两个正面一个背面，阳爻不变</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>少阴</h3>
              <p className={styles.cardDesc}>三枚硬币中两个背面一个正面，阴爻不变</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>老阳</h3>
              <p className={styles.cardDesc}>三枚硬币全正面，阳爻变阴爻</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>老阴</h3>
              <p className={styles.cardDesc}>三枚硬币全背面，阴爻变阳爻</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
