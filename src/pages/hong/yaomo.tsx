/**
 * 灵墟 - 洪荒模块 - 妖魔页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function YaomoPage() {
  const demons = [
    { name: '九尾狐', type: '妖狐', desc: '修炼千年的狐妖，可化人形' },
    { name: '白骨精', type: '骷髅', desc: '白骨化形，善于变化' },
    { name: '黑山老妖', type: '树妖', desc: '千年古树成精，法力高强' },
    { name: '牛魔王', type: '魔兽', desc: '妖魔界的霸主之一' },
  ]

  return (
    <Layout title="妖魔">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>👹</div>
          <h1 className={styles.title}>妖魔鬼怪</h1>
          <p className={styles.subtitle}>山精水怪，妖魔档案</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>妖魔图鉴</h2>
          <div className={styles.cardGrid}>
            {demons.map((demon, i) => (
              <div key={demon.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{demon.name}</h3>
                <p style={{ color: '#f87171', fontSize: '0.85rem', margin: '0.5rem 0' }}>类型：{demon.type}</p>
                <p className={styles.cardDesc}>{demon.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
