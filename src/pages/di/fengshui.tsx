/**
 * 灵墟 - 地理模块 - 风水页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function FengshuiPage() {
  return (
    <Layout title="风水">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🏠</div>
          <h1 className={styles.title}>阴阳宅风水</h1>
          <p className={styles.subtitle}>布局之道，趋吉避凶</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>风水基础</h2>
          <div style={{ background: 'rgba(26,26,46,0.4)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              风水学认为，好的住宅应当坐落于龙脉聚集之处，即所谓的"龙穴"。
              龙穴之地，气场旺盛，利于居住者的运势。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
