/**
 * 灵墟 - 地理模块 - 罗盘页面
 */

'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function LuopanPage() {
  const [direction, setDirection] = useState(0)
  
  const directions = [
    { name: '正北', degree: 0, element: '水', direction: '坎', luck: '事业、财运' },
    { name: '东北', degree: 45, element: '土', direction: '艮', luck: '学业、人缘' },
    { name: '正东', degree: 90, element: '木', direction: '震', luck: '健康、成长' },
    { name: '东南', degree: 135, element: '木', direction: '巽', luck: '财运、婚姻' },
    { name: '正南', degree: 180, element: '火', direction: '离', luck: '名声、学术' },
    { name: '西南', degree: 225, element: '土', direction: '坤', luck: '感情、人际' },
    { name: '正西', degree: 270, element: '金', direction: '兑', luck: '桃花、财运' },
    { name: '西北', degree: 315, element: '金', direction: '乾', luck: '贵人、事业' },
  ]

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
          <div className={styles.toolBox}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '2rem',
              perspective: '1000px'
            }}>
              <div style={{
                width: '250px',
                height: '250px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #2a2a4e 100%)',
                border: '4px solid #c9a227',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `rotate(${direction}deg)`,
                transition: 'transform 0.5s ease',
                boxShadow: '0 0 30px rgba(201, 162, 39, 0.3)'
              }}>
                <div style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  border: '2px solid rgba(201, 162, 39, 0.3)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingTop: '15px'
                }}>
                  <div style={{
                    width: '4px',
                    height: '90px',
                    background: 'linear-gradient(to bottom, #c9a227, transparent)'
                  }} />
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={direction}
                onChange={(e) => setDirection(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  accentColor: '#c9a227'
                }}
              />
              <p style={{ color: '#888', marginTop: '1rem' }}>
                拖动调整角度：{direction}°
              </p>
            </div>

            <div className={styles.resultBox} style={{ marginTop: '2rem' }}>
              <h3 className={styles.resultTitle}>当前方位分析</h3>
              {directions.filter(d => {
                const diff = Math.abs(d.degree - direction)
                return diff < 25 || diff > 335
              }).map(d => (
                <div key={d.name}>
                  <div className={styles.resultContent}>{d.name}</div>
                  <p className={styles.resultDesc}>
                    {d.direction}宫 | {d.element}属性 | 有利于{d.luck}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>八卦方位</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '1rem' 
          }}>
            {directions.map((d) => (
              <div key={d.name} style={{
                padding: '1.5rem',
                background: 'rgba(26, 26, 46, 0.3)',
                border: `2px solid ${Math.abs(d.degree - direction) < 25 || Math.abs(d.degree - direction) > 335 ? '#c9a227' : 'rgba(201, 162, 39, 0.1)'}`,
                borderRadius: '12px',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#c9a227' }}>{d.direction}</div>
                <div style={{ fontSize: '1.1rem', color: '#e8d48b', marginBottom: '0.5rem' }}>{d.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#888' }}>{d.element}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>罗盘使用指南</h2>
          <div className={styles.infoBox}>
            <h4 style={{ color: '#c9a227', marginBottom: '1rem' }}>如何使用风水罗盘</h4>
            <ul style={{ color: '#888', lineHeight: 2, paddingLeft: '1.5rem', margin: 0 }}>
              <li>手持罗盘，保持水平</li>
              <li>转动罗盘盘面，使天池内的指针与地磁北重合</li>
              <li>读取指针所指的方向即为房屋朝向</li>
              <li>根据朝向对照八卦方位判断吉凶</li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  )
}
