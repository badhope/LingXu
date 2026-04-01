/**
 * 灵墟 - 失落模块 - 功法页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function GongfaPage() {
  const xiuzhen = [
    { name: '道德经', category: '道家经典', desc: '老子所著，道家修仙的基础经典' },
    { name: '黄庭经', category: '内炼经典', desc: '讲述存思身神的内炼之法' },
    { name: '悟真篇', category: '丹经', desc: '张伯端所著，内丹派的重要经典' },
    { name: '周易参同契', category: '丹经', desc: '万古丹经王，讲述内外丹修炼' },
    { name: '抱朴子', category: '丹道', desc: '葛洪所著，讲述金丹大道' },
    { name: '太乙金华宗旨', category: '内丹', desc: '讲述修炼心性的法门' },
  ]

  const wushu = [
    { name: '太极拳', category: '内家拳', desc: '以柔克刚，后发制人，张三丰所创' },
    { name: '易筋经', category: '内功', desc: '强筋健骨，易经换髓，少林绝学' },
    { name: '洗髓经', category: '内功', desc: '易筋经的姊妹篇，修炼髓海' },
    { name: '九阳神功', category: '内功', desc: '纯阳内功，至刚至阳' },
    { name: '九阴真经', category: '武学总纲', desc: '天下武学总纲，黄裳所著' },
    { name: '乾坤大挪移', category: '轻功', desc: '明教镇教神功，挪移乾坤' },
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
          <h2 className={styles.sectionTitle}>功法概论</h2>
          <div className={styles.infoBox}>
            <p>
              功法是修仙者修炼的根本。从吐纳导引到金丹大道，
              从武术到仙术，功法种类繁多，数不胜数。一部好的功法，
              能让修仙者事半功倍；而一部残缺或错误的功法，
              则可能让人走火入魔，甚至身死道消。
            </p>
            <p>
              末法时代，许多功法已经失传。现在流传下来的，
              大多是当初的基础功法，而那些高深的仙法，
              只在古籍中有记载，早已无人能够修炼。
              灵墟档案馆致力于收集和保护这些珍贵的功法秘籍。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>修真经典</h2>
          <div className={styles.cardGrid}>
            {xiuzhen.map((x, i) => (
              <div key={x.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{x.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{x.category}</p>
                <p className={styles.cardDesc}>{x.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>武学秘籍</h2>
          <div className={styles.cardGrid}>
            {wushu.map((w, i) => (
              <div key={w.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{w.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{w.category}</p>
                <p className={styles.cardDesc}>{w.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
