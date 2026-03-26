/**
 * 灵墟 - 空间模块 - 三界页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function SanjiePage() {
  const realms = [
    { name: '欲界', level: 1, desc: '最低层次的界，有七情六欲', inhabitants: '凡人、鬼魂、小妖', feature: '灵气稀薄，修行困难' },
    { name: '色界', level: 2, desc: '超越欲望但仍有形体', inhabitants: '修士、地仙', feature: '灵气充沛，适合修炼' },
    { name: '无色界', level: 3, desc: '无形无欲，精神纯化', inhabitants: '天仙、真仙', feature: '纯阳之地，超脱生死' },
    { name: '天界', level: 4, desc: '仙人居住之所', inhabitants: '神仙、圣人', feature: '灵气浓郁，法则清晰' },
    { name: '地府', level: -1, desc: '亡魂归宿之地', inhabitants: '鬼魂、阎罗', feature: '掌管生死轮回' },
    { name: '妖界', level: 0, desc: '妖族聚居之地', inhabitants: '妖修、魔兽', feature: '弱肉强食' },
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
          <h2 className={styles.sectionTitle}>三界概述</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              三界指欲界、色界、无色界，是佛教和道教对宇宙空间层次的基本划分。
              除此之外，还有天界、地府、妖界等附属空间，共同构成完整的宇宙体系。
              在灵墟的世界观中，三界只是广袤宇宙的一小部分，还有无数其他维度的空间存在。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>各界详解</h2>
          <div className={styles.cardGrid}>
            {realms.map((realm, i) => (
              <div key={realm.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.cardHeader}>
                  <span className={styles.starName}>{realm.name}</span>
                  <span className={styles.starIndex}>层级 {realm.level > 0 ? '+' : ''}{realm.level}</span>
                </div>
                <p className={styles.cardDesc} style={{ marginTop: '1rem' }}>{realm.desc}</p>
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(201, 162, 39, 0.1)', borderRadius: '8px' }}>
                  <p style={{ color: '#c9a227', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>居民：{realm.inhabitants}</p>
                  <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>特点：{realm.feature}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
