/**
 * 灵墟 - 时间模块 - 预言页面
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function YucePage() {
  return (
    <Layout title="预言">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>📜</div>
          <h1 className={styles.title}>古今预言</h1>
          <p className={styles.subtitle}>预知未来，趋吉避凶</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>著名预言</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>推背图</h3>
              <p className={styles.cardDesc}>袁天罡、李淳风著，预测历代国运</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>烧饼歌</h3>
              <p className={styles.cardDesc}>刘伯温著，预言明朝以后大事</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
