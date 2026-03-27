/**
 * 灵墟 - 时间模块 - 轮回页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function LunhuiPage() {
  return (
    <Layout title="轮回">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🔄</div>
          <h1 className={styles.title}>六道轮回</h1>
          <p className={styles.subtitle}>因果循环，永无止境</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>轮回之道</h2>
          <div style={{ background: 'rgba(26,26,46,0.4)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              轮回是佛教和道教共同的概念，认为灵魂在六道中不断转世轮回。
              只有通过修行，跳出三界五行，才能超脱轮回之苦，达到永恒的解脱。
              在灵墟的世界观中，修仙的最终目标就是超脱轮回，不受生死束缚。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
