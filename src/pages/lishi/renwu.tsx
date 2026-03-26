/**
 * 灵墟 - 历史模块 - 人物页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/index.module.scss'

export default function RenwuPage() {
  const figures = [
    { name: '老子', title: '道家始祖', desc: '骑青牛出函谷关，著《道德经》，后得道飞升。' },
    { name: '庄子', title: '南华真人', desc: '梦蝶逍遥，精神自由，传说其修为已至化境。' },
    { name: '列子', title: '冲虚真人', desc: '御风而行，列子御风成为后世修仙典范。' },
    { name: '张道陵', title: '天师', desc: '创正一道，制符捉鬼，开创道教修行体系。' },
  ]

  return (
    <Layout title="人物">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>👤</div>
          <h1 className={styles.title}>历史人物</h1>
          <p className={styles.subtitle}>千古风流人物</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>修仙者名录</h2>
          <div className={styles.cardGrid}>
            {figures.map((f, i) => (
              <div key={f.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{f.name}</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>{f.title}</p>
                <p className={styles.cardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
