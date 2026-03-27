/**
 * 灵墟 - 失落模块 - 丹药页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function DanyaoPage() {
  const pills = [
    { name: '筑基丹', grade: '下品', effect: '帮助凡人打通经脉，踏入修仙门槛', rarity: '普通' },
    { name: '结丹丹', grade: '中品', effect: '帮助筑基期修士凝结金丹，突破境界', rarity: '稀有' },
    { name: '化神丹', grade: '上品', effect: '帮助金丹期修士化丹成婴，凝聚元神', rarity: '珍贵' },
    { name: '渡劫丹', grade: '极品', effect: '渡劫时服用，可抵御部分天劫之力', rarity: '稀有' },
    { name: '九转还魂丹', grade: '仙品', effect: '生死人肉白骨，即便只剩一口气也能救活', rarity: '传说' },
    { name: '悟道茶', grade: '仙品', effect: '服用后进入顿悟状态，对道的理解突飞猛进', rarity: '传说' },
  ]

  return (
    <Layout title="丹药">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>💊</div>
          <h1 className={styles.title}>失传丹药</h1>
          <p className={styles.subtitle}>灵丹妙药，仙道辅助</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>丹药概论</h2>
          <div className={styles.infoBox}>
            <p>
              丹药是修仙者修炼的重要辅助手段。通过采集天材地宝，配合灵火炼制，
              可以制成各种功效神奇的丹药。丹药分为下、中、上、极品、仙品五个等级，
              等级越高，效果越好，但炼制难度也越大。
            </p>
            <p>
              末法时代，许多灵药已经绝迹，许多丹方也随之失传。
              现在流传下来的丹药，大多是当初的常用丹方，而那些高阶丹药，
              只在古籍中有记载，已无人能够炼制。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>著名丹药</h2>
          <div className={styles.cardGrid}>
            {pills.map((p, i) => (
              <div key={p.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{p.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{p.grade} | {p.rarity}</p>
                <p className={styles.cardDesc}>{p.effect}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
