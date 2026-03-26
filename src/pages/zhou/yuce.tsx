/**
 * 灵墟 - 时间模块 - 预言页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function YucePage() {
  const prophecies = [
    { name: '推背图', author: '袁天罡、李淳风', period: '唐代', desc: '预言自唐代以后的中国历史，共六十象' },
    { name: '烧饼歌', author: '刘伯温', period: '明代', desc: '预言明代以后数百年国运' },
    { name: '马前课', author: '诸葛亮', period: '三国', desc: '十四课预言，从三国到未来的历史' },
    { name: '梅花诗', author: '邵雍', period: '北宋', desc: '以梅花为象，预言后世之事' },
  ]

  return (
    <Layout title="预言">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>📜</div>
          <h1 className={styles.title}>古今预言</h1>
          <p className={styles.subtitle}>预知未来，趋吉避凶</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>著名预言</h2>
          <div className={styles.cardGrid}>
            {prophecies.map((p, i) => (
              <div key={p.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{p.name}</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '0.5rem 0' }}>{p.author} · {p.period}</p>
                <p className={styles.cardDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
