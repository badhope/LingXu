/**
 * 灵墟 - 时间模块 - 首页
 */

'use client'

import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function ZhouIndexPage() {
  return (
    <Layout title="时间">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>⏳</div>
          <h1 className={styles.title}>时间模块</h1>
          <p className={styles.subtitle}>时间长河，轮回因果</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>模块概述</h2>
          <div className={styles.infoBox}>
            <p>
              时间模块包含轮回、因果、时光、预言四个子模块。
              时间长河奔流不息，轮回转世因果循环。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>子模块导航</h2>
          <div className={styles.cardGrid}>
            <Link href="/zhou/lunhui" className={styles.card}>🔄 轮回</Link>
            <Link href="/zhou/yinguo" className={styles.card}>⚖️ 因果</Link>
            <Link href="/zhou/shiguang" className={styles.card}>⏰ 时光</Link>
            <Link href="/zhou/yuce" className={styles.card}>🔮 预言</Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}
