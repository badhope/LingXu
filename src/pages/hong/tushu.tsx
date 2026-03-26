/**
 * 灵墟 - 洪荒模块 - 图腾页面
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function TushuPage() {
  return (
    <Layout title="图腾">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🏛️</div>
          <h1 className={styles.title}>远古图腾</h1>
          <p className={styles.subtitle}>信仰的象征</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>图腾文化</h2>
          <div style={{ background: 'rgba(26,26,46,0.4)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              图腾是原始宗教的重要形式，各民族都有自己崇拜的图腾。
              龙、凤、虎、龟是最常见的中华图腾，代表着力量、祥瑞、勇猛和长寿。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
