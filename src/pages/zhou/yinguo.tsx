/**
 * 灵墟 - 时间模块 - 因果页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function YingguoPage() {
  return (
    <Layout title="因果">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>⚖️</div>
          <h1 className={styles.title}>因果报应</h1>
          <p className={styles.subtitle}>善有善报，恶有恶报</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>因果定律</h2>
          <div className={styles.infoBox}>
            <p>
              因果定律是宇宙的基本法则。种什么因，得什么果。行善积德，来世得福报；
              作恶多端，来世受苦楚。这不仅是佛道两家的核心理念，更是维系宇宙秩序的基础。
            </p>
            <p>
              在修仙界，因果之力尤为厉害。欠下的因果若不偿还，终将成为修行路上的心魔，
              阻碍境界提升。一些大能甚至能利用因果律来对付敌人，让其自食其果。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>因果报应</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>现世报</h3>
              <p className={styles.cardDesc}>当世所做善恶，当世便得报应。此为最快最直接的因果。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>来世报</h3>
              <p className={styles.cardDesc}>今生善恶，来世得报。或转世为人享福，或堕入畜生道受苦。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>子孙报</h3>
              <p className={styles.cardDesc}>祖先积德，子孙享福；祖先作恶，子孙遭祸。影响家族气运。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>心魔报</h3>
              <p className={styles.cardDesc}>修仙者若做亏心之事，会在渡劫时化为心魔，导致走火入魔。</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
