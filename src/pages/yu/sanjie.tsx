/**
 * 灵墟 - 空间模块 - 三界页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function SanjiePage() {
  const realms = [
    { name: '欲界', desc: '有七情六欲的最低层次' },
    { name: '色界', desc: '超越欲望但仍有形体的层次' },
    { name: '无色界', desc: '无形无欲，精神纯化的最高层次' },
  ]

  return (
    <Layout title="三界">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🌌</div>
          <h1 className={styles.title}>三界二十八天</h1>
          <p className={styles.subtitle}>万界苍茫，空间层次</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>三界详解</h2>
          <div className={styles.cardGrid}>
            {realms.map((r, i) => (
              <div key={r.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{r.name}</h3>
                <p className={styles.cardDesc}>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
