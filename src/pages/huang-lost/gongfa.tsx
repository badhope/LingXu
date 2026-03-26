/**
 * 灵墟 - 失落模块 - 功法页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function GongfaPage() {
  const techniques = [
    { name: '太极拳', type: '内家拳', difficulty: '入门', desc: '以柔克刚，后发制人' },
    { name: '九阴真经', type: '内功心法', difficulty: '进阶', desc: '天下武学总纲' },
    { name: '易筋经', type: '炼体功法', difficulty: '入门', desc: '强筋健骨，易经换髓' },
    { name: '洗髓经', type: '炼体功法', difficulty: '高阶', desc: '伐毛洗髓，蜕凡入圣' },
    { name: '北冥神功', type: '内功心法', difficulty: '高阶', desc: '吸人内力为己用' },
    { name: '小无相功', type: '内功心法', difficulty: '进阶', desc: '无相无名，万法之源' },
  ]

  return (
    <Layout title="功法">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>📖</div>
          <h1 className={styles.title}>失传功法</h1>
          <p className={styles.subtitle}>秘法传承，修炼之道</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>功法大全</h2>
          <div className={styles.cardGrid}>
            {techniques.map((tech, i) => (
              <div key={tech.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.cardHeader}>
                  <span className={styles.starName}>{tech.name}</span>
                  <span className={styles.starIndex}>{tech.difficulty}</span>
                </div>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '0.5rem 0' }}>类型：{tech.type}</p>
                <p className={styles.cardDesc}>{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>修炼境界</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              修炼功法需要循序渐进，一般分为：练气、筑基、金丹、元婴、化神、炼虚、合体、大乘、渡劫九个境界。
              每个境界都需要不同的功法配合，循序渐进方能成功。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
