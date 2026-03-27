/**
 * 灵墟 - 历史模块 - 秘辛页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function MixinPage() {
  const secrets = [
    { title: '封神内幕', desc: '封神之战并非简单的王朝更替，而是仙界重新划分势力范围的重大事件。三清与西方二圣博弈，最终定下天庭格局。' },
    { title: '秦始皇之死', desc: '秦始皇并非病死，而是被修仙者刺杀。因为秦始皇追求长生不老，得罪了太多修仙势力。' },
    { title: '黄巾起义真相', desc: '黄巾起义背后有太平道支持，张角实为金丹期修士，起义是修仙势力与王朝气运的对抗。' },
    { title: '安史之乱源头', desc: '安禄山体内被种下魔种，这是魔道修仙者干预历史走向的阴谋。' },
    { title: '刘伯温斩龙脉', desc: '刘伯温奉命斩断天下龙脉，并非只是传说。朱元璋确实命令他削弱各地修仙势力的根基。' },
  ]

  return (
    <Layout title="秘辛">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🔐</div>
          <h1 className={styles.title}>历史秘辛</h1>
          <p className={styles.subtitle}>不为人知的真相</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>秘辛概论</h2>
          <div className={styles.infoBox}>
            <p>
              史书所载，往往是帝王将相的历史。但在正史之外，
              还有许多不为人知的秘辛。这些秘辛涉及到修仙界与凡间的纠葛，
              神仙与帝王的对弈，以及那些被刻意隐藏的真相。
            </p>
            <p>
              灵墟档案馆收藏了大量这样的秘辛档案，记录着那些被尘封的历史真相。
              这些真相往往颠覆常识，让人重新审视历史。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>著名秘辛</h2>
          <div className={styles.cardGrid}>
            {secrets.map((s, i) => (
              <div key={s.title} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
