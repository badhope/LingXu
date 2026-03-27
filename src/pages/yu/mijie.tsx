/**
 * 灵墟 - 空间模块 - 秘界页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function MijiePage() {
  const secrets = [
    { name: '昆仑秘境', desc: '位于昆仑山深处，神仙居住之地' },
    { name: '瑶池仙境', desc: '西王母所居，灵气充沛' },
    { name: '东海龙宫', desc: '龙族领地，藏有无数珍宝' },
  ]

  return (
    <Layout title="秘界">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>✨</div>
          <h1 className={styles.title}>隐秘空间</h1>
          <p className={styles.subtitle}>结界之地，隐秘之界</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>秘界探幽</h2>
          <div className={styles.cardGrid}>
            {secrets.map((s, i) => (
              <div key={s.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{s.name}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
