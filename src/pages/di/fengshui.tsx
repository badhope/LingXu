/**
 * 灵墟 - 地理模块 - 风水页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function FengshuiPage() {
  const items = [
    { title: '阳宅风水', desc: '活人居住之宅，讲究坐北朝南、藏风聚气。门窗朝向、室内布局皆影响运势。' },
    { title: '阴宅风水', desc: '祖先安息之所，选址关乎后代兴衰。讲究龙脉走向、明堂开阔、山水环抱。' },
    { title: '峦头派', desc: '以山水形势论吉凶，观龙脉走势、砂水环抱，形峦之美者吉。' },
    { title: '理气派', desc: '以八卦九星推算气场流转，运用罗盘定向，讲究元运飞星。' },
  ]

  return (
    <Layout title="风水">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🏠</div>
          <h1 className={styles.title}>阴阳宅风水</h1>
          <p className={styles.subtitle}>布局之道，趋吉避凶</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>风水概论</h2>
          <div className={styles.infoBox}>
            <p>
              风水学，古称堪舆术，是中华传统文化的重要组成部分。风水一词最早见于晋代郭璞所著《葬经》：
              "气乘风则散，界水则止，古人聚之使不散，行之使有止，故谓之风水。"
            </p>
            <p>
              风水学认为，天地间存在着一种看不见的"气"，这种气的流动和聚集直接影响着人的运势。
              好的风水布局能够聚集生气，为居住者带来好运；不好的风水则会导致气场紊乱，影响健康和运势。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>风水流派</h2>
          <div className={styles.cardGrid}>
            {items.map((item, i) => (
              <div key={item.title} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>风水基本原则</h2>
          <div className={styles.infoBox}>
            <p>
              <strong style={{ color: '#c9a227' }}>藏风聚气：</strong>好的风水之地，背有靠山，左右有砂手环抱，前方有明堂开阔，气流在此聚集而不散。
            </p>
            <p>
              <strong style={{ color: '#c9a227' }}>山水环抱：</strong>山管人丁水管财，背后有山则人丁兴旺，前方有水则财运亨通。水宜弯曲不宜直射。
            </p>
            <p>
              <strong style={{ color: '#c9a227' }}>阴阳平衡：</strong>宅居讲究阴阳调和，明暗适宜，动静结合。过阳则暴躁，过阴则阴沉。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
