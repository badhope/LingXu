/**
 * 灵墟 - 时间模块 - 时光页面
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function ShiguangPage() {
  return (
    <Layout title="时光">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>⏳</div>
          <h1 className={styles.title}>时间长河</h1>
          <p className={styles.subtitle}>追溯过去，展望未来</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>时间与修行</h2>
          <div style={{ background: 'rgba(26,26,46,0.4)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              在修仙者的眼中，时间并非线性的流逝，而是一条可以追溯和预见的长河。
              高阶修士可以逆流而上，追溯过去发生的事；也可以顺流而下，预见未来的某些片段。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
