/**
 * 灵墟 - 玄学模块 - 符箓页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function FuluPage() {
  const talismans = [
    { name: '平安符', symbol: '☯', desc: '保佑平安，驱邪避煞', usage: '随身携带或挂于门上' },
    { name: '招财符', symbol: '￥', desc: '招揽财气，增加财运', usage: '放置于财位或钱包内' },
    { name: '镇宅符', symbol: '宅', desc: '镇宅辟邪，保家平安', usage: '挂于客厅正中央' },
    { name: '文昌符', symbol: '文', desc: '增进学业，开发智慧', usage: '放置于书房或书桌上' },
    { name: '桃花符', symbol: '桃', desc: '增进姻缘，旺桃花运', usage: '放置于卧室或枕头下' },
    { name: '健康符', symbol: '健', desc: '保佑身体健康，驱除病邪', usage: '随身携带或挂于卧室' },
  ]

  return (
    <Layout title="符箓">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>📜</div>
          <h1 className={styles.title}>道家符箓</h1>
          <p className={styles.subtitle}>驱邪护身，趋吉避凶</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>常用符箓</h2>
          <div className={styles.cardGrid}>
            {talismans.map((talisman, i) => (
              <div key={talisman.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ 
                  fontSize: '3rem', 
                  color: '#c9a227', 
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  {talisman.symbol}
                </div>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem', textAlign: 'center' }}>{talisman.name}</h3>
                <p className={styles.cardDesc} style={{ textAlign: 'center' }}>{talisman.desc}</p>
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  background: 'rgba(201, 162, 39, 0.1)', 
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: '#888',
                  textAlign: 'center'
                }}>
                  使用方法：{talisman.usage}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>符箓文化</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>
              符箓是道教特有的法术之一，相传始于张道陵天师。符箓以符、咒、诀、印结合，
              具有驱邪、治病、镇宅、祈福等功效。道教认为符箓能够调动天地正气，
              形成特殊的能量场，从而达到改变运势的效果。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
