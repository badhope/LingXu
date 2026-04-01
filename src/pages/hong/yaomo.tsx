/**
 * 灵墟 - 洪荒模块 - 妖魔页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function YaomoPage() {
  const yaoguai = [
    { name: '九尾狐', rank: '妖中王者', desc: '修炼千年的狐妖，可化人形，魅惑众生' },
    { name: '牛魔王', rank: '妖界霸主', desc: '平天大圣，孙悟空结拜兄弟' },
    { name: '金翅大鹏', rank: '飞行极快', desc: '一翅九万里，狮驼岭魔王' },
    { name: '九头虫', rank: '水族妖王', desc: '碧波潭驸马，九头妖神' },
    { name: '黄风怪', rank: '风妖之王', desc: '黄风岭妖王，三昧神风' },
    { name: '红孩儿', rank: '火中之王', desc: '牛魔王之子，三昧真火' },
  ]

  const yaojing = [
    { name: '山魈', desc: '山中精怪，力大无穷' },
    { name: '水鬼', desc: '水中溺死者所化' },
    { name: '树精', desc: '老树成精，木魅山鬼' },
    { name: '狐仙', desc: '狐狸修炼成精' },
    { name: '黄鼠狼', desc: '黄皮子精，善于变化' },
    { name: '白骨精', desc: '白骨夫人，三变戏唐僧' },
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
          <h2 className={styles.sectionTitle}>妖魔概论</h2>
          <div className={styles.infoBox}>
            <p>
              妖族是灵墟世界中一个庞大的种族，凡有灵性的生物，经过长期修炼，
              都有可能化为妖族。妖族中既有善良之辈，也有凶恶之徒。一些大妖，
              往往能移山填海，呼风唤雨，甚至能与天庭分庭抗礼。
            </p>
            <p>
              精怪则是天地间自然形成的灵体，或山精水怪，或草木成精，
              或器物通灵。精怪种类繁多，千奇百怪，有的善良无害，
              有的却会伤人害命。修仙者行走江湖，需要小心应对。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>著名妖王</h2>
          <div className={styles.cardGrid}>
            {yaoguai.map((y, i) => (
              <div key={y.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{y.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{y.rank}</p>
                <p className={styles.cardDesc}>{y.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>山精水怪</h2>
          <div className={styles.cardGrid}>
            {yaojing.map((y, i) => (
              <div key={y.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>{y.name}</h3>
                <p className={styles.cardDesc}>{y.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
