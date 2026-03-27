/**
 * 灵墟 - 时间模块 - 首页
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function ZhouIndexPage() {
  return (
    <Layout title="时间">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>⏳</div>
          <h1 className={styles.title}>时间模块</h1>
          <p className={styles.subtitle}>轮回因果，时光长河</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>模块概述</h2>
          <div className={styles.infoBox}>
            <p>
              时间模块探讨修仙世界的时间观。从六道轮回到因果报应，从时间长河到古今预言，
              深入理解时间与修行的关系。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>子模块导航</h2>
          <div className={styles.cardGrid}>
            <a href="/zhou/lunhui" className={styles.card}>🔄 轮回</a>
            <a href="/zhou/yinguo" className={styles.card}>⚖️ 因果</a>
            <a href="/zhou/shiguang" className={styles.card}>⏳ 时光</a>
            <a href="/zhou/yuce" className={styles.card}>📜 预言</a>
          </div>
        </section>
      </div>
    </Layout>
  )
}
