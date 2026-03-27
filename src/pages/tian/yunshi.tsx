/**
 * 灵墟 - 天时模块 - 运势页面
 */

'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function YunshiPage() {
  const [selected, setSelected] = useState<string | null>(null)
  
  const zodiacs = [
    { name: '白羊', luck: '85', love: '78', career: '92', wealth: '80', color: '红色', number: '7' },
    { name: '金牛', luck: '78', love: '85', career: '75', wealth: '95', color: '金色', number: '4' },
    { name: '双子', luck: '82', love: '70', career: '88', wealth: '72', color: '银色', number: '3' },
    { name: '巨蟹', luck: '75', love: '92', career: '70', wealth: '78', color: '白色', number: '2' },
    { name: '狮子', luck: '90', love: '82', career: '95', wealth: '85', color: '橙色', number: '1' },
    { name: '处女', luck: '72', love: '75', career: '82', wealth: '70', color: '灰色', number: '5' },
    { name: '天秤', luck: '80', love: '88', career: '75', wealth: '82', color: '粉色', number: '6' },
    { name: '天蝎', luck: '88', love: '90', career: '80', wealth: '88', color: '黑色', number: '9' },
    { name: '射手', luck: '82', love: '72', career: '78', wealth: '75', color: '紫色', number: '8' },
    { name: '摩羯', luck: '75', love: '78', career: '90', wealth: '92', color: '棕色', number: '10' },
    { name: '水瓶', luck: '78', love: '80', career: '85', wealth: '70', color: '蓝色', number: '11' },
    { name: '双鱼', luck: '70', love: '95', career: '68', wealth: '75', color: '绿色', number: '12' },
  ]

  return (
    <Layout title="运势">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🔮</div>
          <h1 className={styles.title}>每日运势</h1>
          <p className={styles.subtitle}>星象变化影响命运起伏</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>今日运势</h2>
          <div className={styles.infoBox}>
            <p>点击下方星座查看详细运势</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.cardGrid}>
            {zodiacs.map((z, i) => (
              <div 
                key={z.name} 
                className={styles.card}
                onClick={() => setSelected(selected === z.name ? null : z.name)}
                style={{ cursor: 'pointer', border: selected === z.name ? '2px solid #c9a227' : undefined }}
              >
                <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>{z.name}座</h3>
                <p className={styles.cardDesc}>综合运势: {z.luck}%</p>
                {selected === z.name && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(201,162,39,0.2)' }}>
                    <p>❤️ 爱情: {z.love}%</p>
                    <p>💼 事业: {z.career}%</p>
                    <p>💰 财运: {z.wealth}%</p>
                    <p>🎨 幸运色: {z.color}</p>
                    <p>🔢 幸运数: {z.number}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
