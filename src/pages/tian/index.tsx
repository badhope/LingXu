/**
 * 灵墟 - 天时模块 - 简介页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function TianIndexPage() {
  return (
    <Layout title="天时">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>☁️</div>
          <h1 className={styles.title}>天时模块</h1>
          <p className={styles.subtitle}>天道运行，星辰变化</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>模块概述</h2>
          <div className={styles.infoBox}>
            <p>
              天时模块包含星宿、运势、节气、占卜四个子模块。
              你可以观测星象、查询运势、了解节气、进行占卜。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>子模块导航</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
            <a href="/tian/xingxiu" className={styles.card}>⭐ 星宿</a>
            <a href="/tian/yunshi" className={styles.card}>🔮 运势</a>
            <a href="/tian/jieqi" className={styles.card}>🌾 节气</a>
            <a href="/tian/zhanbu" className={styles.card}>🎴 占卜</a>
          </div>
        </section>
      </div>
    </Layout>
  )
}
