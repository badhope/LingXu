/**
 * 灵墟 - 空间模块 - 首页
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function YuIndexPage() {
  return (
    <Layout title="空间">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🌌</div>
          <h1 className={styles.title}>空间模块</h1>
          <p className={styles.subtitle}>三界洞天，秘境探幽</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>模块概述</h2>
          <div className={styles.infoBox}>
            <p>
              空间模块探索灵墟世界的地理空间。从三界二十八天到洞天福地，从多维空间到隐秘境界，
              揭开修仙世界的空间奥秘。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>子模块导航</h2>
          <div className={styles.cardGrid}>
            <a href="/yu/sanjie" className={styles.card}>🌌 三界</a>
            <a href="/yu/dongtian" className={styles.card}>🏔️ 洞天</a>
            <a href="/yu/weidu" className={styles.card}>🔮 维度</a>
            <a href="/yu/mijie" className={styles.card}>✨ 秘界</a>
          </div>
        </section>
      </div>
    </Layout>
  )
}
