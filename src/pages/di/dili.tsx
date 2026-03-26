/**
 * 灵墟 - 地理模块 - 地理页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function DiliPage() {
  const regions = [
    { name: '中原地区', desc: '华夏文明核心地带', feature: '地势平坦，气候温和，龙脉汇聚之地' },
    { name: '江南地区', desc: '鱼米之乡', feature: '水网密布，人杰地灵，文风鼎盛' },
    { name: '岭南地区', desc: '南疆之地', feature: '山清水秀，灵气充沛，英才辈出' },
    { name: '巴蜀地区', desc: '天府之国', feature: '四面环山，物产丰富，自成一体' },
    { name: '西北地区', desc: '丝路咽喉', feature: '地广人稀，风沙漫天，性格豪放' },
    { name: '东北地区', desc: '白山黑水', feature: '土地肥沃，民风彪悍' },
  ]

  return (
    <Layout title="地理">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>⛰️</div>
          <h1 className={styles.title}>地理堪舆</h1>
          <p className={styles.subtitle}>一方水土养一方人</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>地理特征与风水</h2>
          <div className={styles.cardGrid}>
            {regions.map((region, i) => (
              <div key={region.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{region.name}</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>{region.desc}</p>
                <p className={styles.cardDesc}>{region.feature}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>地理与命理</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>
              风水学认为，人的命运不仅与出生时间有关，还与出生地点的地理环境密切相关。
              不同地区由于山水走向、土质颜色、水流方向的不同，会对居住者产生不同的影响。
              故有"一方水土养一方人"之说。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
