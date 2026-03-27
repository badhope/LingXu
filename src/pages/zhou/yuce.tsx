/**
 * 灵墟 - 时间模块 - 预言页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function YucePage() {
  const prophecies = [
    { name: '推背图', author: '袁天罡、李淳风', desc: '唐朝预言奇书，预测自唐始历朝国运，共六十象。语言晦涩，需详解才能明白。', type: '国运' },
    { name: '烧饼歌', author: '刘伯温', desc: '明朝国师刘伯温所作，预言明朝以后数百年大事，多已应验。', type: '国运' },
    { name: '马前课', author: '诸葛亮', desc: '三国时期诸葛亮所著，预言三国以后天下大势，共十四课。', type: '天下' },
    { name: '梅花易数', author: '邵雍', desc: '北宋邵雍所创，以先天易数起卦，可预测万事万物。', type: '杂占' },
    { name: '灵棋经', author: '黄大仙', desc: '古代占卜奇书，以棋子卜筮，预言吉凶祸福。', type: '占卜' },
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
          <h2 className={styles.sectionTitle}>预言概论</h2>
          <div className={styles.infoBox}>
            <p>
              预言是指通过特殊方法，预知未来将要发生之事。在中华文化中，
              预言有着悠久的历史，从伏羲画卦到文王演易，从姜子牙到刘伯温，
              历朝历代都有著名的预言家和他们的传世预言。
            </p>
            <p>
              预言可分为三类：一是国运预言，预测朝代兴衰；二是天下预言，预测世界变迁；
              三是个人预言，预测个人命运。修仙者通过修炼，可获得更强的预言能力。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>著名预言</h2>
          <div className={styles.cardGrid}>
            {prophecies.map((p, i) => (
              <div key={p.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{p.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{p.author}</p>
                <p className={styles.cardDesc}>{p.desc}</p>
                <p style={{ color: '#c9a227', fontSize: '0.75rem', marginTop: '0.5rem' }}>类型：{p.type}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
