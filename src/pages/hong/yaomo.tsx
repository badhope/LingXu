/**
 * 灵墟 - 洪荒模块 - 妖魔页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function YaomoPage() {
  return (
    <Layout title="妖魔">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>👹</div>
          <h1 className={styles.title}>妖魔鬼怪</h1>
          <p className={styles.subtitle}>山精水怪，妖魔档案</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>妖族名录</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>九尾狐</h3>
              <p className={styles.cardDesc}>修炼千年的狐妖，可化人形</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>牛魔王</h3>
              <p className={styles.cardDesc}>妖魔界的霸主之一</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
