/**
 * 灵墟 - 失落模块 - 首页
 */

'use client'

import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './index.module.scss'

export default function HuangLostIndexPage() {
  return (
    <Layout title="失落">
      <PageBackground colorRgb="170, 153, 136">
        <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🗝️</div>
          <h1 className={styles.title}>失落模块</h1>
          <p className={styles.subtitle}>失传秘术，失落文明</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>模块概述</h2>
          <div className={styles.infoBox}>
            <p>
              失落模块包含功法、丹药、法宝、秘室四个子模块。
              失落的传承，遗忘的文明。功法秘籍、丹药配方、法宝图鉴。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>子模块导航</h2>
          <div className={styles.cardGrid}>
            <Link href="/huang-lost/gongfa" className={styles.card}>⚔️ 功法</Link>
            <Link href="/huang-lost/danyao" className={styles.card}>💊 丹药</Link>
            <Link href="/huang-lost/fabao" className={styles.card}>🔮 法宝</Link>
            <Link href="/huang-lost/mishi" className={styles.card}>🚪 秘室</Link>
          </div>
        </section>
        </div>
      </PageBackground>
    </Layout>
  )
}
