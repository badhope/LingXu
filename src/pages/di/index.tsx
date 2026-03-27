/**
 * 灵墟 - 地理模块 - 首页
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function DiIndexPage() {
  return (
    <Layout title="地理">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🏔️</div>
          <h1 className={styles.title}>地理模块</h1>
          <p className={styles.subtitle}>山川河流，风水堪舆</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>模块概述</h2>
          <div className={styles.infoBox}>
            <p>
              地理模块涵盖风水、罗盘、龙脉、地理四大主题。探索中华大地的山川形胜，
              了解风水堪舆的奥妙，掌握罗盘的使用方法，追寻龙脉的走向。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>子模块导航</h2>
          <div className={styles.cardGrid}>
            <a href="/di/fengshui" className={styles.card}>🏠 风水</a>
            <a href="/di/luopan" className={styles.card}>🧭 罗盘</a>
            <a href="/di/longmai" className={styles.card}>🐉 龙脉</a>
            <a href="/di/dili" className={styles.card}>⛰️ 地理</a>
          </div>
        </section>
      </div>
    </Layout>
  )
}
