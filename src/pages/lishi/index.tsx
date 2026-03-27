/**
 * 灵墟 - 历史模块 - 首页
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function LishiIndexPage() {
  return (
    <Layout title="历史">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>📜</div>
          <h1 className={styles.title}>历史模块</h1>
          <p className={styles.subtitle}>千年文明，古今变迁</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>模块概述</h2>
          <div className={styles.infoBox}>
            <p>
              历史模块记录了修仙文明的发展历程。从朝代更替到人物传记，从秘辛档案到文献记载，
              让你全面了解灵墟世界的历史脉络。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>子模块导航</h2>
          <div className={styles.cardGrid}>
            <a href="/lishi/chaodai" className={styles.card}>👑 朝代</a>
            <a href="/lishi/renwu" className={styles.card}>👤 人物</a>
            <a href="/lishi/mixin" className={styles.card}>🔐 秘辛</a>
            <a href="/lishi/wenxian" className={styles.card}>📚 文献</a>
          </div>
        </section>
      </div>
    </Layout>
  )
}
