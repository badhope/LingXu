/**
 * 灵墟 - 时间模块 - 因果页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

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
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              因果定律是宇宙的基本法则。种什么因，得什么果。
              行善积德，来世得福报；作恶多端，来世受苦楚。
              修行者深谙因果之道，谨言慎行，积德行善，
              因为他们知道，每一个念头、每一句话、每一个行为，
              都会在因果的长河中留下痕迹。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>因果故事</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>善人转世</h3>
              <p className={styles.cardDesc}>一介布衣一生行善，积累功德无数。死后转世成为富贵人家，世代荣昌。</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>恶霸报应</h3>
              <p className={styles.cardDesc}>一乡恶霸欺压百姓，最终家道中落，子孙不肖，晚年凄凉。</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
