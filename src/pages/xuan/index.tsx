/**
 * 灵墟 - 玄学模块 - 简介页面
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function XuanIndexPage() {
  return (
    <Layout title="玄学">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>☯️</div>
          <h1 className={styles.title}>玄学模块</h1>
          <p className={styles.subtitle}>易经八卦，符箓命理</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>子模块导航</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
            <a href="/xuan/yijing" className={styles.card}>☰ 易经</a>
            <a href="/xuan/bazi" className={styles.card}>⏰ 八字</a>
            <a href="/xuan/liuyao" className={styles.card}>🔮 六爻</a>
            <a href="/xuan/fulu" className={styles.card}>📜 符箓</a>
          </div>
        </section>
      </div>
    </Layout>
  )
}
