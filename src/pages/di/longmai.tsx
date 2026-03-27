/**
 * 灵墟 - 地理模块 - 龙脉页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function LongmaiPage() {
  const dragons = [
    { name: '昆仑祖龙', desc: '万山之祖，龙脉之源。昆仑山横亘西北，气势磅礴，为中华龙脉的总源头。' },
    { name: '北龙山脉', desc: '从昆仑山向东延伸，经太行山、燕山，至辽东半岛。北龙主武贵，出将入相。' },
    { name: '中龙山脉', desc: '从昆仑山向东南延伸，经秦岭、大别山，至长江三角洲。中龙主文贵，人杰辈出。' },
    { name: '南龙山脉', desc: '从昆仑山向南延伸，经云贵高原、南岭，至东南沿海。南龙主财富，商贾云集。' },
  ]

  return (
    <Layout title="龙脉">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🐉</div>
          <h1 className={styles.title}>中华龙脉</h1>
          <p className={styles.subtitle}>山川地理，风水堪舆</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>龙脉概论</h2>
          <div className={styles.infoBox}>
            <p>
              风水学认为，龙脉是山脉的脉络，如同人体的经络一般，承载着天地间的生气。
              中华大地上有三条主要的龙脉，皆发源于昆仑山，分别向东南、东、东北三个方向延伸，
              遍布神州大地。
            </p>
            <p>
              寻龙之法，首重气势连贯，山脉起伏如龙行，故称"龙脉"。
              次观山水环抱，有情之水环绕，方为真龙之地。
              再看明堂开阔，前面视野开阔，才能纳气聚财。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>三大干龙</h2>
          <div className={styles.cardGrid}>
            {dragons.map((d, i) => (
              <div key={d.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>{d.name}</h3>
                <p className={styles.cardDesc}>{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>寻龙口诀</h2>
          <div className={styles.infoBox}>
            <p>
              <strong style={{ color: '#c9a227' }}>寻龙千万看缠山，一重缠是一重关。</strong>
              寻龙首看山脉走势，缠山越多，龙气越旺。
            </p>
            <p>
              <strong style={{ color: '#c9a227' }}>龙怕孤，穴怕寒。</strong>
              真龙必有众多支脉环绕，穴场要温暖向阳，忌讳孤高或低洼寒冷之地。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
