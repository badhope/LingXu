/**
 * 灵墟 - 时间模块 - 时光页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

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
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              在修仙者的眼中，时间并非线性的流逝，而是一条可以追溯和预见的长河。
              高阶修士可以逆流而上，追溯过去发生的事；
              也可以顺流而下，预见未来的某些片段。
              但改变历史并非易事，因为每一个改变都会引发蝴蝶效应，
              可能带来难以预料的后果。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>时间与灵气</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>上古时期</h3>
              <p className={styles.cardDesc}>灵气充沛，仙人大能层出不穷，修行昌盛。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>中古时期</h3>
              <p className={styles.cardDesc}>灵气开始衰减，修行者逐渐减少。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>近古时期</h3>
              <p className={styles.cardDesc}>灵气稀薄，修行艰难，仙人隐世不出。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>末法时代</h3>
              <p className={styles.cardDesc}>灵气几近枯竭，修行成为传说。</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
