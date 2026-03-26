/**
 * 灵墟 - 失落模块 - 法宝页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function FabaoPage() {
  const treasures = [
    { name: '轩辕剑', type: '剑', power: '斩妖除魔', owner: '黄帝' },
    { name: '盘古斧', type: '斧', power: '开天辟地', owner: '盘古' },
    { name: '太上拂尘', type: '拂尘', power: '万法不侵', owner: '太上老君' },
    { name: '金刚琢', type: '环', power: '收宝夺物', owner: '太上老君' },
  ]

  return (
    <Layout title="法宝">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>💎</div>
          <h1 className={styles.title}>法宝图鉴</h1>
          <p className={styles.subtitle}>神器法宝</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>上古神器</h2>
          <div className={styles.cardGrid}>
            {treasures.map((t, i) => (
              <div key={t.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{t.name}</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '0.5rem 0' }}>类型：{t.type}</p>
                <p className={styles.cardDesc}>能力：{t.power}</p>
                <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>原主：{t.owner}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
