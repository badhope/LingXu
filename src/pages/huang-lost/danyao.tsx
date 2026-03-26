/**
 * 灵墟 - 失落模块 - 丹药页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function DanyaoPage() {
  const pills = [
    { name: '筑基丹', effect: '辅助筑基成功', rarity: '稀有' },
    { name: '培元丹', effect: '补充灵力', rarity: '普通' },
    { name: '结金丹', effect: '辅助结丹', rarity: '珍稀' },
    { name: '洗髓丹', effect: '伐毛洗髓', rarity: '珍稀' },
    { name: '破境丹', effect: '辅助突破境界', rarity: '传说' },
  ]

  return (
    <Layout title="丹药">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>⚗️</div>
          <h1 className={styles.title}>丹药图鉴</h1>
          <p className={styles.subtitle}>灵丹妙药</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>常见丹药</h2>
          <div className={styles.cardGrid}>
            {pills.map((pill, i) => (
              <div key={pill.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.cardHeader}>
                  <span className={styles.starName}>{pill.name}</span>
                  <span className={styles.starIndex}>{pill.rarity}</span>
                </div>
                <p className={styles.cardDesc} style={{ marginTop: '1rem' }}>功效：{pill.effect}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
