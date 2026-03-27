/**
 * 灵墟 - 历史模块 - 文献页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function WenxianPage() {
  const classics = [
    { name: '道德经', author: '老子', period: '春秋', desc: '道家第一经典，阐述"道"与"德"的哲学思想' },
    { name: '南华真经', author: '庄子', period: '战国', desc: '道家经典，想象奇特，意境深远' },
    { name: '周易', author: '周文王', period: '商末周初', desc: '群经之首，设教之书' },
    { name: '抱朴子', author: '葛洪', period: '东晋', desc: '修仙理论集大成之作' },
    { name: '太平经', author: '于吉', period: '东汉', desc: '道教最早的理论著作' },
    { name: '度人经', author: '元始天尊', period: '上古', desc: '道教重要经典' },
  ]

  return (
    <Layout title="文献">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>📚</div>
          <h1 className={styles.title}>古籍文献</h1>
          <p className={styles.subtitle}>典籍传承</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>经典著作</h2>
          <div className={styles.cardGrid}>
            {classics.map((classic, i) => (
              <div key={classic.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{classic.name}</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '0.5rem 0' }}>{classic.author} · {classic.period}</p>
                <p className={styles.cardDesc}>{classic.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
