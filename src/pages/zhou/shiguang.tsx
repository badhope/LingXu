/**
 * 灵墟 - 时间模块 - 时光页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function ShiguangPage() {
  return (
    <Layout title="时光">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>⏳</div>
          <h1 className={styles.title}>时间长河</h1>
          <p className={styles.subtitle}>追溯过去，展望未来</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>时间与修行</h2>
          <div className={styles.infoBox}>
            <p>
              在修仙者的眼中，时间并非线性的流逝，而是一条可以追溯和预见的长河。
              高阶修士可以逆流而上，追溯过去发生的事；也可以顺流而下，预见未来的某些片段。
              这种能力被称为"回溯"和"预言"，是时间法则的初步运用。
            </p>
            <p>
              更进一步的大能，可以在上游或下游制造"时间漩涡"，让特定区域的时间流速改变。
              洞天福地之所以"洞中方一日，世上已千年"，正是因为内部时间流速与外界不同。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>时间法则</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>时间回溯</h3>
              <p className={styles.cardDesc}>逆流时间，查看过去发生的事。需要消耗大量灵气，且无法改变历史。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>时间预言</h3>
              <p className={styles.cardDesc}>顺流而下，预见未来的片段。预言有无数可能，越遥远的未来越模糊。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>时间静止</h3>
              <p className={styles.cardDesc}>在一定范围内停止时间流动。此法消耗极大，不可持久。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>时间加速</h3>
              <p className={styles.cardDesc}>区域内时间流速加快。洞天福地多采用此法加速灵草生长。</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
