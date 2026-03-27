/**
 * 灵墟 - 历史模块 - 朝代页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function ChaodaiPage() {
  const dynasties = [
    { name: '夏商周', period: '公元前2070-256年', feature: '封神之战，诸子百家', power: '人道巅峰' },
    { name: '秦汉', period: '公元前221-公元220年', feature: '修仙王朝，气运鼎盛', power: '大一统' },
    { name: '三国两晋南北朝', period: '220-589年', feature: '群雄并起，功法中兴', power: '百家争鸣' },
    { name: '隋唐', period: '581-907年', feature: '万国来朝，灵道盛世', power: '盛世繁华' },
    { name: '宋元', period: '960-1368年', feature: '文盛武衰，道法自然', power: '文化巅峰' },
    { name: '明清', period: '1368-1911年', feature: '末法初现，灵气衰退', power: '最后的辉煌' },
  ]

  return (
    <Layout title="朝代">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>👑</div>
          <h1 className={styles.title}>修仙朝代</h1>
          <p className={styles.subtitle}>千年文明，兴衰更替</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>朝代概论</h2>
          <div className={styles.infoBox}>
            <p>
              在灵墟的世界观中，每一个历史朝代都有其独特的灵气特征和修仙格局。
              朝代气运与修仙界息息相关——盛世时灵气充沛，修仙者众多；
              乱世时灵气紊乱，但也往往能诞生惊才绝艳的人物。
            </p>
            <p>
              末法时代始于明清之交，灵气逐渐衰退，修仙之路越来越艰难。
              到了现代，灵气已经非常稀薄，修仙成为传说。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>各朝修仙格局</h2>
          <div className={styles.cardGrid}>
            {dynasties.map((d, i) => (
              <div key={d.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{d.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{d.period}</p>
                <p className={styles.cardDesc}>{d.feature}</p>
                <p style={{ color: '#c9a227', fontSize: '0.75rem', marginTop: '0.5rem' }}>{d.power}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
