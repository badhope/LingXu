/**
 * 灵墟 - 失落模块 - 法宝页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/index.module.scss'

export default function FabaoPage() {
  return (
    <Layout title="法宝">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>💎</div>
          <h1 className={styles.title}>神器法宝</h1>
          <p className={styles.subtitle}>上古神器，法力无边</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>上古神器</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>轩辕剑</h3>
              <p className={styles.cardDesc}>斩妖除魔之剑</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>盘古斧</h3>
              <p className={styles.cardDesc}>开天辟地之宝</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
