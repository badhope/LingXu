/**
 * 灵墟 - 洪荒模块 - 传说页面
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function ChuanshuoPage() {
  return (
    <Layout title="传说">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>📜</div>
          <h1 className={styles.title}>上古神话</h1>
          <p className={styles.subtitle}>洪荒传说，亘古流传</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>创世神话</h2>
          <div style={{ background: 'rgba(26,26,46,0.4)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              盘古开天辟地，女娲造人补天，后羿射日，嫦娥奔月...
              这些上古神话不仅是故事，更是古人对宇宙起源和人类文明的理解。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
