/**
 * 灵墟 - 空间模块 - 首页
 */

'use client'

import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function YuIndexPage() {
  return (
    <Layout title="空间">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🌌</div>
          <h1 className={styles.title}>空间模块</h1>
          <p className={styles.subtitle}>万界苍茫，空间层次</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>模块概述</h2>
          <div className={styles.infoBox}>
            <p>
              空间模块包含三界、洞天、维度、秘界四个子模块。
              三界二十八天，洞天福地。空间折叠，维度穿越。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>子模块导航</h2>
          <div className={styles.cardGrid}>
            <Link href="/yu/sanjie" className={styles.card}>🌍 三界</Link>
            <Link href="/yu/dongtian" className={styles.card}>⛰️ 洞天</Link>
            <Link href="/yu/weidu" className={styles.card}>🔲 维度</Link>
            <Link href="/yu/mijie" className={styles.card}>🗝️ 秘界</Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}
