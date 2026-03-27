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
          <div className={styles.infoBox}>
            <p>
              在灵墟的世界观中，宇宙并非只有三维空间。除了我们肉眼可见的三维世界，
              还存在着无数更高维度的空间。修仙者的修炼，实际上就是不断提升感知维度、
              最终超脱于所有维度之外的过程。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>各维度特征</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>一维空间</h3>
              <p className={styles.cardDesc}>只有长度，没有宽度和高度。如同一条线，只有前后两个方向。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>二维空间</h3>
              <p className={styles.cardDesc}>只有长和宽，如同平面国。生命只能在一个平面上活动。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>三维空间</h3>
              <p className={styles.cardDesc}>我们所存在的世界，有长、宽、高三维。可以上下前后左右移动。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>四维空间</h3>
              <p className={styles.cardDesc}>在三维基础上增加时间维度。可以看到一个人一生的所有时间线。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>五维空间</h3>
              <p className={styles.cardDesc}>可以看到所有可能性的分支。每一个人做出的不同选择产生的平行世界。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>高维空间</h3>
              <p className={styles.cardDesc}>修仙的最高境界，是超脱于所有维度之外，不再受时空束缚。</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
