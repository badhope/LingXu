/**
 * 灵墟 - 地理模块 - 罗盘页面
 */

'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function LuopanPage() {
  const [direction, setDirection] = useState(0)
  
  return (
    <Layout title="罗盘">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🧭</div>
          <h1 className={styles.title}>风水罗盘</h1>
          <p className={styles.subtitle}>定方位，知吉凶</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>在线罗盘</h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '250px', height: '250px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a1a2e 0%, #2a2a4e 100%)',
              border: '4px solid #c9a227', display: 'flex', alignItems: 'center',
              justifyContent: 'center', transform: `rotate(${direction}deg)`,
              transition: 'transform 0.5s ease', boxShadow: '0 0 30px rgba(201, 162, 39, 0.3)'
            }}>
              <div style={{
                width: '200px', height: '200px', borderRadius: '50%',
                border: '2px solid rgba(201, 162, 39, 0.3)',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                paddingTop: '15px'
              }}>
                <div style={{
                  width: '4px', height: '90px',
                  background: 'linear-gradient(to bottom, #c9a227, transparent)'
                }} />
              </div>
            </div>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="360" 
            value={direction}
            onChange={(e) => setDirection(parseInt(e.target.value))}
            style={{ width: '100%', maxWidth: '300px', accentColor: '#c9a227' }}
          />
          <p style={{ color: '#888', marginTop: '1rem', textAlign: 'center' }}>
            拖动调整角度：{direction}°
          </p>
        </section>
      </div>
    </Layout>
  )
}
