/**
 * 灵墟 - 玄学模块 - 符箓页面
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function FuluPage() {
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
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>平安符</h3>
              <p className={styles.cardDesc}>保佑平安，驱邪避煞</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>招财符</h3>
              <p className={styles.cardDesc}>招揽财气，增加财运</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
