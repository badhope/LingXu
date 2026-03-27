/**
 * 灵墟 - 失落模块 - 首页
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function HuangLostIndexPage() {
  return (
    <Layout title="失落">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🏛️</div>
          <h1 className={styles.title}>失落模块</h1>
          <p className={styles.subtitle}>失传秘术，遗失宝藏</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>模块概述</h2>
          <div className={styles.infoBox}>
            <p>
              失落模块收录末法时代逐渐消失的修仙遗产。从失传功法到古老丹方，从上古法宝到隐秘之地，
              这些都是修仙文明曾经的辉煌见证。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>子模块导航</h2>
          <div className={styles.cardGrid}>
            <a href="/huang-lost/gongfa" className={styles.card}>📖 功法</a>
            <a href="/huang-lost/danyao" className={styles.card}>💊 丹药</a>
            <a href="/huang-lost/fabao" className={styles.card}>💎 法宝</a>
            <a href="/huang-lost/mishi" className={styles.card}>🗝️ 秘室</a>
          </div>
        </section>
      </div>
    </Layout>
  )
}
