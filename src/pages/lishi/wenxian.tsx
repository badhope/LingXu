/**
 * 灵墟 - 历史模块 - 文献页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function WenxianPage() {
  const books = [
    { name: '《道藏》', type: '道教经典', desc: '道教经典总集，包含三洞四辅十二类，是修仙者的必修典籍。' },
    { name: '《黄帝内经》', type: '医家经典', desc: '黄帝与岐伯论医之作，包含养生、修炼、治病之道。' },
    { name: '《抱朴子》', type: '修仙指南', desc: '葛洪著，系统阐述了金丹大道的修炼方法。' },
    { name: '《阴符经》', type: '奇书', desc: '字数最少但道理最深奥的奇书，三百字道尽天机。' },
    { name: '《参同契》', type: '丹经', desc: '魏伯阳著，被称为"万古丹经王"，阐述内丹修炼。' },
    { name: '《度人经》', type: '度化经', desc: '灵宝无量度人上品妙经，度化众生之法。' },
  ]

  return (
    <Layout title="文献">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>📚</div>
          <h1 className={styles.title}>历史文献</h1>
          <p className={styles.subtitle}>典籍传承，智慧结晶</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>文献概论</h2>
          <div className={styles.infoBox}>
            <p>
              中华文明五千年来，留下了无数珍贵的文献典籍。这些典籍中，
              既有治国平天下的大学问，也有长生不老修仙的秘法。
              许多功法、丹方、法术都记载在这些典籍中，是修仙文明的重要传承。
            </p>
            <p>
              可惜的是，末法时代，许多典籍已经失传。现存的文献，
              大多是后人整理或抄录的版本，原版已经很难找到。
              灵墟档案馆致力于收集和保护这些珍贵的文献典籍。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>著名典籍</h2>
          <div className={styles.cardGrid}>
            {books.map((b, i) => (
              <div key={b.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{b.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{b.type}</p>
                <p className={styles.cardDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
