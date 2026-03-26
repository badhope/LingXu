/**
 * 灵墟 - 空间模块 - 维度页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

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
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              在灵墟的世界观中，宇宙并非只有三维空间。
              除了我们肉眼可见的三维世界，还存在着无数更高维度的空间。
              四维空间可以看到时间线上的所有事件；
              五维空间可以看到所有可能性的分支；
              六维空间可以穿越不同可能性...
              修仙者的修炼，实际上就是不断提升感知维度、最终超脱于所有维度之外的过程。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>空间维度一览</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>一维空间</h3>
              <p className={styles.cardDesc}>只有长度的线，只有前后两个方向。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>二维空间</h3>
              <p className={styles.cardDesc}>有长和宽的平面，蚂蚁爬行的世界。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>三维空间</h3>
              <p className={styles.cardDesc}>我们所生存的世界，有长宽高三个维度。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>四维空间</h3>
              <p className={styles.cardDesc}>加入时间维度，可以看到过去和未来。</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
