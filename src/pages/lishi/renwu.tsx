/**
 * 灵墟 - 历史模块 - 人物页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function RenwuPage() {
  const figures = [
    { name: '老子', title: '道家始祖', period: '春秋', desc: '道家学派创始人，骑青牛出函谷关，著《道德经》。传说后来西出化胡，得道飞升。', level: '真仙' },
    { name: '庄子', title: '南华真人', period: '战国', desc: '道家代表人物，著《庄子》。梦蝶逍遥，精神自由，传说其修为已至化境。', level: '大乘' },
    { name: '列子', title: '冲虚真人', period: '战国', desc: '道家重要人物，御风而行，列子御风成为后世修仙者的典范。', level: '渡劫' },
    { name: '张道陵', title: '天师', period: '东汉', desc: '道教创始人，创正一道，制符捉鬼，开创道教修行体系。', level: '真仙' },
    { name: '张三丰', title: '武当祖师', period: '元末明初', desc: '太极拳创始人，内丹修炼大家。传说活了两百多岁，后不知所踪。', level: '渡劫' },
    { name: '葛洪', title: '抱朴子', period: '东晋', desc: '炼丹家、医学家，著《抱朴子》，系统整理修仙理论。', level: '大乘' },
    { name: '吕洞宾', title: '纯阳子', period: '唐代', desc: '八仙之一，全真教奉为纯阳祖师，剑术通神，内丹大家。', level: '真仙' },
    { name: '济公', title: '活佛', period: '南宋', desc: '高僧大德，法力高深，游戏人间，惩恶扬善。', level: '化神' },
  ]

  return (
    <Layout title="人物">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>👤</div>
          <h1 className={styles.title}>历史人物</h1>
          <p className={styles.subtitle}>千古风流人物</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>修仙者名录</h2>
          <div className={styles.cardGrid}>
            {figures.map((figure, i) => (
              <div key={figure.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.cardHeader}>
                  <span className={styles.starName}>{figure.name}</span>
                  <span className={styles.starIndex}>{figure.level}</span>
                </div>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '0.5rem 0' }}>{figure.title} · {figure.period}</p>
                <p className={styles.cardDesc}>{figure.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>修仙境界</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>
              修仙者境界分为：练气 → 筑基 → 金丹 → 元婴 → 化神 → 炼虚 → 合体 → 大乘 → 渡劫 → 真仙。
              传说中，真仙已超脱轮回，长生不死。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
