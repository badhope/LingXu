/**
 * 灵墟 - 天时模块 - 运势页面
 */

'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function YunshiPage() {
  const [birthMonth, setBirthMonth] = useState('3')
  const [birthDay, setBirthDay] = useState('21')
  
  const getZodiacSign = (month: number, day: number) => {
    const signs = [
      { name: '白羊座', start: [3, 21], end: [4, 19], element: '火', planet: '火星' },
      { name: '金牛座', start: [4, 20], end: [5, 20], element: '土', planet: '金星' },
      { name: '双子座', start: [5, 21], end: [6, 21], element: '风', planet: '水星' },
      { name: '巨蟹座', start: [6, 22], end: [7, 22], element: '水', planet: '月亮' },
      { name: '狮子座', start: [7, 23], end: [8, 22], element: '火', planet: '太阳' },
      { name: '处女座', start: [8, 23], end: [9, 22], element: '土', planet: '水星' },
      { name: '天秤座', start: [9, 23], end: [10, 23], element: '风', planet: '金星' },
      { name: '天蝎座', start: [10, 24], end: [11, 22], element: '水', planet: '冥王星' },
      { name: '射手座', start: [11, 23], end: [12, 21], element: '火', planet: '木星' },
      { name: '摩羯座', start: [12, 22], end: [1, 19], element: '土', planet: '土星' },
      { name: '水瓶座', start: [1, 20], end: [2, 18], element: '风', planet: '天王星' },
      { name: '双鱼座', start: [2, 19], end: [3, 20], element: '水', planet: '海王星' },
    ]
    
    for (const sign of signs) {
      if ((month === sign.start[0] && day >= sign.start[1]) ||
          (month === sign.end[0] && day <= sign.end[1])) {
        return sign
      }
    }
    return signs[9] // 摩羯座
  }

  const zodiac = getZodiacSign(parseInt(birthMonth), parseInt(birthDay))
  
  const fortunes = [
    { title: '今日运势', rating: 4, content: '今日贵人运旺盛，适合与他人合作。工作中可能会有意外收获，注意把握机会。' },
    { title: '爱情运势', rating: 3, content: '单身者今日有机会遇到心仪之人，已婚者需注意沟通方式，避免误会。' },
    { title: '事业运势', rating: 4, content: '事业上有新的突破，与同事配合默契。工作上会有意外的好消息传来。' },
    { title: '财运运势', rating: 3, content: '财运平稳，不宜进行大额投资。小额消费需谨慎，避免冲动购物。' },
    { title: '健康运势', rating: 4, content: '健康运势良好，适合进行体育锻炼。注意休息，避免过度劳累。' },
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
          <h2 className={styles.sectionTitle}>查询你的星座运势</h2>
          <div className={styles.toolBox}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>出生日期</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <select 
                  className={styles.select} 
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} 月</option>
                  ))}
                </select>
                <select 
                  className={styles.select}
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} 日</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className={styles.resultBox}>
              <h3 className={styles.resultTitle}>您的星座</h3>
              <div className={styles.resultContent}>{zodiac.name}</div>
              <p className={styles.resultDesc}>
                守护星：{zodiac.planet} | 元素：{zodiac.element}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>今日综合运势</h2>
          <div className={styles.cardGrid}>
            {fortunes.map((fortune, index) => (
              <div key={fortune.title} className={styles.card} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={styles.cardHeader}>
                  <span className={styles.starName}>{fortune.title}</span>
                </div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} style={{ 
                      fontSize: '1.25rem',
                      opacity: i < fortune.rating ? 1 : 0.3
                    }}>⭐</span>
                  ))}
                </div>
                <p className={styles.cardDesc}>{fortune.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>本月运势预测</h2>
          <div className={styles.infoBox}>
            <p>
              本月整体运势较为平稳，在中旬时期可能会有一些变动。
              木星与太阳的相位将为你带来好运，尤其是在人际关系方面。
              下旬需注意财务支出，避免不必要的花费。
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ color: '#c9a227', marginBottom: '0.75rem' }}>本月幸运方位</h4>
              <p style={{ color: '#888', margin: 0 }}>东北方</p>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ color: '#c9a227', marginBottom: '0.75rem' }}>本月幸运数字</h4>
              <p style={{ color: '#888', margin: 0 }}>3、7、9</p>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ color: '#c9a227', marginBottom: '0.75rem' }}>本月幸运色</h4>
              <p style={{ color: '#888', margin: 0 }}>金色、白色</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
