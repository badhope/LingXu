/**
 * 灵墟 - 洪荒模块 - 首页
 */

'use client'

import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function HongIndexPage() {
  return (
    <Layout title="洪荒">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🐉</div>
          <h1 className={styles.title}>洪荒模块</h1>
          <p className={styles.subtitle}>神怪异兽，洪荒神话</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>模块概述</h2>
          <div className={styles.infoBox}>
            <p>
              洪荒模块包含神兽、妖魔、传说、图腾四个子模块。
              上古洪荒，神兽妖魔。龙凤麒麟，山精水怪。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>子模块导航</h2>
          <div className={styles.cardGrid}>
            <Link href="/hong/shenshou" className={styles.card}>🐲 神兽</Link>
            <Link href="/hong/yaomo" className={styles.card}>👹 妖魔</Link>
            <Link href="/hong/chuanshuo" className={styles.card}>📖 传说</Link>
            <Link href="/hong/tushu" className={styles.card}>🔱 图腾</Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}
