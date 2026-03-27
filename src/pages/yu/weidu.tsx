/**
 * 灵墟 - 空间模块 - 维度页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function WeiduPage() {
  return (
    <Layout title="维度">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🔮</div>
          <h1 className={styles.title}>多维空间</h1>
          <p className={styles.subtitle}>探索更高维度</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>维度理论</h2>
          <div style={{ background: 'rgba(26,26,46,0.4)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              在灵墟的世界观中，宇宙并非只有三维空间。除了我们肉眼可见的三维世界，还存在着无数更高维度的空间。
              四维空间可以看到时间线上的所有事件；五维空间可以看到所有可能性的分支...
              修仙者的修炼，实际上就是不断提升感知维度、最终超脱于所有维度之外的过程。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
