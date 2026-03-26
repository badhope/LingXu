/**
 * 灵墟 - 皇陵模块 - 首页
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function HuangLostIndexPage() {
  return (
    <Layout title="皇陵">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🏛️</div>
          <h1 className={styles.title}>失落的皇陵</h1>
          <p className={styles.subtitle}>神秘之地，探寻历史</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>皇陵概览</h2>
          <div style={{ background: 'rgba(26,26,46,0.4)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              皇陵是古代帝王的陵墓，通常埋藏着大量的宝藏和文物。
              许多皇陵因为年代久远而被遗忘，成为考古学家和探险家的目标。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
