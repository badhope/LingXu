/**
 * 灵墟 - 地理模块 - 地理页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/index.module.scss'

export default function DiliPage() {
  return (
    <Layout title="地理">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>⛰️</div>
          <h1 className={styles.title}>地理堪舆</h1>
          <p className={styles.subtitle}>一方水土养一方人</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>地理特征</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>中原地区</h3>
              <p className={styles.cardDesc}>地势平坦，气候温和，龙脉汇聚之地</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>江南水乡</h3>
              <p className={styles.cardDesc}>水网密布，人杰地灵，文风鼎盛</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
