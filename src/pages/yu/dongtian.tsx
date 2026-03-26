/**
 * 灵墟 - 空间模块 - 洞天页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function DongtianPage() {
  const dongtian = [
    { name: '王屋山', location: '山西', type: '十大洞天', desc: '为王屋山洞，周围三百里' },
    { name: '华山', location: '陕西', type: '十大洞天', desc: '为太华山，周围三百里' },
    { name: '泰山', location: '山东', type: '十大洞天', desc: '为太山洞，周围三百里' },
    { name: '华山', location: '江西', type: '十大洞天', desc: '为西玄山洞，周围三百里' },
    { name: '青城山', location: '四川', type: '十大洞天', desc: '为青城山洞，周围三百里' },
    { name: '武夷山', location: '福建', type: '十大洞天', desc: '为真升洞玄山洞，周围三百里' },
  ]

  return (
    <Layout title="洞天">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🏔️</div>
          <h1 className={styles.title}>洞天福地</h1>
          <p className={styles.subtitle}>仙人所居，灵秀之地</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>十大洞天</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              洞天福地是道教用语，指神仙居住的名山胜境。
              十大洞天为神仙真人的居所，灵气充沛，是修行的绝佳之地。
              除了十大洞天，还有三十六小洞天，七十二福地，共同构成道教的仙境体系。
            </p>
          </div>
          <div className={styles.cardGrid} style={{ marginTop: '1.5rem' }}>
            {dongtian.map((d, i) => (
              <div key={d.name + i} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.cardHeader}>
                  <span className={styles.starName}>{d.name}</span>
                  <span className={styles.starIndex}>{d.type}</span>
                </div>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '0.5rem 0' }}>{d.location}</p>
                <p className={styles.cardDesc}>{d.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
