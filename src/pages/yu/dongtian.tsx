/**
 * 灵墟 - 空间模块 - 洞天页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function DongtianPage() {
  const dongtians = [
    { name: '王屋山洞', rank: '第一', desc: '位于河南济源，为道教十大洞天之首，轩辕黄帝曾在此问道广成子。' },
    { name: '委羽山洞', rank: '第二', desc: '位于浙江黄岩，相传刘少君于此飞升。' },
    { name: '西城山洞', rank: '第三', desc: '位于甘肃平凉，接引真人所居。' },
    { name: '西玄山洞', rank: '第四', desc: '位于陕西华山，为道家重地。' },
    { name: '青城山洞', rank: '第五', desc: '位于四川成都，张天师创教之处。' },
    { name: '赤城山洞', rank: '第六', desc: '位于浙江天台山，葛玄祖师修炼之地。' },
  ]

  return (
    <Layout title="洞天">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🏔️</div>
          <h1 className={styles.title}>洞天福地</h1>
          <p className={styles.subtitle}>仙人所居，灵秀之地</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>洞天概论</h2>
          <div className={styles.infoBox}>
            <p>
              洞天福地是道教用语，指神仙居住的名山胜境。《道藏》记载天下有"十大洞天"、
              "三十六小洞天"和"七十二福地"。这些地方灵气充沛，是修行的绝佳之地。
              洞天之内，自成一方世界，与外界时间流速不同，正所谓"洞中方一日，世上已千年"。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>十大洞天</h2>
          <div className={styles.cardGrid}>
            {dongtians.map((d, i) => (
              <div key={d.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>{d.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>第{d.rank}洞天</p>
                <p className={styles.cardDesc}>{d.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
