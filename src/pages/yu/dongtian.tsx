/**
 * 灵墟 - 空间模块 - 洞天页面
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function DongtianPage() {
  return (
    <Layout title="洞天">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🏔️</div>
          <h1 className={styles.title}>洞天福地</h1>
          <p className={styles.subtitle}>仙人所居，灵秀之地</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>十大洞天</h2>
          <div style={{ background: 'rgba(26,26,46,0.4)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              洞天福地是道教用语，指神仙居住的名山胜境。
              十大洞天为神仙真人的居所，灵气充沛，是修行的绝佳之地。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
