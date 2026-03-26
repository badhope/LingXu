/**
 * 灵墟 - 洪荒模块 - 传说页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function ChuanshuoPage() {
  const legends = [
    { title: '盘古开天', desc: '混沌之中，盘古沉睡一万八千年。醒来后以巨斧劈开混沌，清气上升为天，浊气下沉为地。' },
    { title: '女娲造人', desc: '天地初成，女娲以黄土捏人造人。后因太过劳累，改用藤条沾泥甩造人形。' },
    { title: '后羿射日', desc: '天上十日并出，炙烤大地。后羿弯弓射落九日，只余一日照耀人间。' },
    { title: '嫦娥奔月', desc: '后羿得不死药，嫦娥偷服后飞升月宫，从此与后羿分隔两地。' },
    { title: '大禹治水', desc: '鲧窃天帝息壤治水，失败被诛。禹承父志，疏导洪水，成功治理水患。' },
    { title: '刑天舞戚', desc: '刑天与天帝争位，被斩首后仍以双乳为眼，肚脐为口，手持干戚，战斗不止。' },
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
          <div className={styles.cardGrid}>
            {legends.map((legend, i) => (
              <div key={legend.title} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>{legend.title}</h3>
                <p className={styles.cardDesc}>{legend.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
