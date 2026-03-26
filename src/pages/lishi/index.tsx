/**
 * 灵墟 - 历史模块 - 首页
 */

import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

export default function LishiIndexPage() {
  return (
    <Layout title="历史">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>📜</div>
          <h1 className={styles.title}>历史长河</h1>
          <p className={styles.subtitle}>千年文明，古今变迁</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>历史概览</h2>
          <div style={{ background: 'rgba(26,26,46,0.4)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              历史是人类文明的镜子，记录了从古至今的重要事件和人物。
              通过研究历史，我们可以更好地理解过去，把握现在，展望未来。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
