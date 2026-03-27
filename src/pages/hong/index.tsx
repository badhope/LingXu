/**
 * 灵墟 - 洪荒模块 - 首页
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function HongIndexPage() {
  return (
    <Layout title="洪荒">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🐉</div>
          <h1 className={styles.title}>洪荒模块</h1>
          <p className={styles.subtitle}>上古洪荒，神兽传说</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>模块概述</h2>
          <div className={styles.infoBox}>
            <p>
              洪荒模块记录上古时代的神话传说。从上古神兽到妖魔鬼怪，从远古传说到图腾文化，
              一窥洪荒时代的壮丽画卷。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>子模块导航</h2>
          <div className={styles.cardGrid}>
            <a href="/hong/shenshou" className={styles.card}>🐉 神兽</a>
            <a href="/hong/yaomo" className={styles.card}>👹 妖魔</a>
            <a href="/hong/chuanshuo" className={styles.card}>📜 传说</a>
            <a href="/hong/tushu" className={styles.card}>🏛️ 图腾</a>
          </div>
        </section>
      </div>
    </Layout>
  )
}
