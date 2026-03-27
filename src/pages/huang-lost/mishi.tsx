/**
 * 灵墟 - 失落模块 - 秘室页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function MishiPage() {
  const chambers = [
    { name: '藏经阁', location: '昆仑山巅', desc: '存放上古功法典籍之地，内有无数失传功法', danger: '高' },
    { name: '灵药库', location: '瑶池仙境', desc: '储存上古灵丹妙药之处，许多药材已绝迹', danger: '中' },
    { name: '炼器室', location: '东海龙宫', desc: '上古炼器大师遗迹，内有神器胚胎', danger: '高' },
    { name: '推演台', location: '天皇山', desc: '可推演天机，预知未来，古卜算子所建', danger: '中' },
    { name: '悟道崖', location: '须弥山', desc: '崖壁上有上古大能留下的道痕，观摩可悟道', danger: '低' },
  ]

  return (
    <Layout title="秘室">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🗝️</div>
          <h1 className={styles.title}>隐秘密室</h1>
          <p className={styles.subtitle}>珍藏之地，遗迹探寻</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>密室概论</h2>
          <div className={styles.infoBox}>
            <p>
              上古时期，无数大能留下了自己的传承。这些传承被封存在各种隐秘的密室中，
              等待有缘人开启。密室通常由强大的阵法守护，只有通过特定的考验才能进入。
              每发现一个密室，都可能获得惊世的传承或宝藏。
            </p>
            <p>
              然而，密室中也往往伴随着危险。许多密室设有致命的机关或守护兽，
              贸然进入可能是有去无回。在灵墟世界中，探寻秘室是许多修士的重要事业。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>著名秘室</h2>
          <div className={styles.cardGrid}>
            {chambers.map((c, i) => (
              <div key={c.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{c.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{c.location}</p>
                <p className={styles.cardDesc}>{c.desc}</p>
                <p style={{ color: c.danger === '高' ? '#ef4444' : '#888', fontSize: '0.75rem', marginTop: '0.5rem' }}>危险等级：{c.danger}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
