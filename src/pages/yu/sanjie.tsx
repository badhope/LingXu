/**
 * 灵墟 - 空间模块 - 三界页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function SanjiePage() {
  const realms = [
    { name: '欲界', desc: '有七情六欲的最低层次，包含六道轮回。众生在此受欲望所困，流转不息。', level: 1 },
    { name: '色界', desc: '超越物质欲望但仍有形体。分为四禅天十八层，修行者可在此获得神通。', level: 2 },
    { name: '无色界', desc: '无形无相，精神纯化的最高境界。包含四层天，修行至此可超脱轮回。', level: 3 },
  ]

  const heavens = [
    { name: '四天王天', desc: '欲界第一天，四大天王各守一方' },
    { name: '忉利天', desc: '帝释天所在，三十三天之主' },
    { name: '夜摩天', desc: '时分天，日夜交替之处' },
    { name: '兜率天', desc: '弥勒菩萨道场，内院为修行圣地' },
    { name: '化乐天', desc: '诸天最快乐之处' },
    { name: '他化自在天', desc: '欲界顶天，魔王居所' },
  ]

  return (
    <Layout title="三界">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🌌</div>
          <h1 className={styles.title}>三界二十八天</h1>
          <p className={styles.subtitle}>万界苍茫，空间层次</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>三界概论</h2>
          <div className={styles.infoBox}>
            <p>
              在灵墟的宇宙观中，宇宙分为欲界、色界、无色界三层空间，合称"三界"。
              欲界最低，众生沉溺于七情六欲；色界已超脱物质，但仍有形体；
              无色界则是精神纯化的最高境界。三界之外，还有无数平行世界和多维空间，
              构成完整的宇宙图景。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>三界详解</h2>
          <div className={styles.cardGrid}>
            {realms.map((r, i) => (
              <div key={r.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>{r.name}</h3>
                <p className={styles.cardDesc}>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>欲界六天</h2>
          <div className={styles.cardGrid}>
            {heavens.map((h, i) => (
              <div key={h.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>{h.name}</h3>
                <p className={styles.cardDesc}>{h.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
