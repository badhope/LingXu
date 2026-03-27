/**
 * 灵墟 - 时间模块 - 因果页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function YingguoPage() {
  return (
    <Layout title="因果">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>⚖️</div>
          <h1 className={styles.title}>因果报应</h1>
          <p className={styles.subtitle}>善有善报，恶有恶报</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>因果定律</h2>
          <div style={{ background: 'rgba(26,26,46,0.4)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              因果定律是宇宙的基本法则。种什么因，得什么果。行善积德，来世得福报；作恶多端，来世受苦楚。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
