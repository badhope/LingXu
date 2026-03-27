/**
 * 灵墟 - 地理模块 - 地理页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function DiliPage() {
  const regions = [
    { name: '中原地区', desc: '地势平坦，黄河两岸，华夏文明发源地。洛阳、开封古都所在，龙脉汇聚之地。' },
    { name: '江南水乡', desc: '水网密布，人杰地灵。苏杭一带文风鼎盛，自古出才子佳人。' },
    { name: '巴蜀之地', desc: '天府之国，沃野千里。成都平原四面环山，易守难攻，灵气充沛。' },
    { name: '西北高原', desc: '昆仑所在，万山之源。丝绸之路起点，东西方文明交汇之地。' },
    { name: '岭南地区', desc: '五岭以南，温暖湿润。南龙脉经过之地，商业繁荣。' },
    { name: '东北大地', desc: '白山黑水，物产丰饶。长白山天池为灵气聚集之所。' },
  ]

  return (
    <Layout title="地理">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>⛰️</div>
          <h1 className={styles.title}>灵墟地理</h1>
          <p className={styles.subtitle}>一方水土养一方人</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>天下地理</h2>
          <div className={styles.infoBox}>
            <p>
              在灵墟的世界观中，中华大地的每一处山水都蕴含着不同的灵气。
              地势高低、水流走向、植被覆盖，都影响着当地灵气的浓度和性质。
              修仙者选择修炼之地，需要综合考虑地形、水源、灵气等多方面因素。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>六大灵地</h2>
          <div className={styles.cardGrid}>
            {regions.map((r, i) => (
              <div key={r.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>{r.name}</h3>
                <p className={styles.cardDesc}>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
