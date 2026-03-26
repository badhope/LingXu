/**
 * 灵墟 - 失落模块 - 功法页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/index.module.scss'

export default function GongfaPage() {
  const techniques = [
    { name: '太极拳', desc: '以柔克刚，后发制人' },
    { name: '九阴真经', desc: '天下武学总纲' },
    { name: '易筋经', desc: '强筋健骨，易经换髓' },
  ]

  return (
    <Layout title="功法">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>📖</div>
          <h1 className={styles.title}>失传功法</h1>
          <p className={styles.subtitle}>秘法传承，修炼之道</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>功法大全</h2>
          <div className={styles.cardGrid}>
            {techniques.map((t, i) => (
              <div key={t.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{t.name}</h3>
                <p className={styles.cardDesc}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
