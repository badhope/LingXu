/**
 * 灵墟 - 洪荒模块 - 传说页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function ChuanshuoPage() {
  const myths = [
    { title: '盘古开天', desc: '混沌如鸡子，盘古生其中。万八千岁，天地开辟，阳清为天，阴浊为地。盘古垂死化身，气成风云，声为雷霆，左眼为日，右眼为月，四肢五体为四极五岳。' },
    { title: '女娲造人', desc: '天地开辟，未有人民。女娲抟黄土作人，剧务，力不暇供，乃引绳于泥中，举以为人。故富贵者，黄土人；贫贱凡庸者，絙人也。' },
    { title: '后羿射日', desc: '尧之时，十日并出，焦禾稼，杀草木，而民无所食。羿上射十日，九日去，一日存，故万物得以蕃殖。' },
    { title: '嫦娥奔月', desc: '羿请不死之药于西王母，姮娥窃以奔月，怅然有丧，无以续之。嫦娥遂居于月宫，为月精。' },
    { title: '大禹治水', desc: '禹伤先人父鲧功之不成受诛，乃劳身焦思，居外十三年，过家门不敢入。决九河，距四海，平定水患。' },
  ]

  return (
    <Layout title="传说">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>📜</div>
          <h1 className={styles.title}>上古神话</h1>
          <p className={styles.subtitle}>洪荒传说，亘古流传</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>创世神话</h2>
          <div className={styles.infoBox}>
            <p>
              上古神话不仅是故事，更是古人对宇宙起源和人类文明的理解。
              在灵墟世界观中，这些神话都有其真实的背景——上古时期天地灵气充沛，
              神通广大者在世间留下诸多传说。这些传说经过漫长岁月的演变，
              逐渐成为我们现在听到的神话故事。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>著名神话</h2>
          <div className={styles.cardGrid}>
            {myths.map((m, i) => (
              <div key={m.title} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>{m.title}</h3>
                <p className={styles.cardDesc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
