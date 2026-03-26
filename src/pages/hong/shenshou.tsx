/**
 * 灵墟 - 洪荒模块 - 神兽页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function ShenshouPage() {
  const beasts = [
    { name: '龙', element: '水', desc: '鳞虫之长，能呼风唤雨，掌管四海', ability: '腾云驾雾、变化万千' },
    { name: '凤凰', element: '火', desc: '百鸟之王，浴火重生，代表祥瑞', ability: '涅槃重生、引百鸟' },
    { name: '麒麟', element: '土', desc: '瑞兽之王，性情温和，寓意吉祥', ability: '辨忠奸、通人语' },
    { name: '白虎', element: '金', desc: '西方神兽，象征威武与杀伐', ability: '驱邪避煞、守护西方' },
    { name: '玄武', element: '水', desc: '北方神兽，龟蛇合体，寓意长寿', ability: '镇北疆、长生不老' },
    { name: '青龙', element: '木', desc: '东方神兽，掌管生机与春天', ability: '主生机、兴云雨' },
    { name: '鲲鹏', element: '风', desc: '北冥巨鱼，化而为鸟，扶摇直上', ability: '水击三千里、抟扶摇直上' },
    { name: '白泽', element: '智', desc: '神兽之王，通晓万物之事', ability: '言语、辩万事' },
  ]

  return (
    <Layout title="神兽">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🐉</div>
          <h1 className={styles.title}>上古神兽</h1>
          <p className={styles.subtitle}>神兽图鉴，祥瑞之兆</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>四大神兽</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              青龙、白虎、朱雀、玄武合称"四象"，分别镇守东西南北四方。
              青龙主生机，白虎主杀伐，朱雀主祥瑞，玄武主长寿。
              四象之上还有麒麟，为四象之王，统御一切祥瑞之兽。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>神兽大全</h2>
          <div className={styles.cardGrid}>
            {beasts.map((beast, i) => (
              <div key={beast.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.cardHeader}>
                  <span className={styles.starName}>{beast.name}</span>
                  <span className={styles.starIndex}>{beast.element}属性</span>
                </div>
                <p className={styles.cardDesc} style={{ marginTop: '1rem' }}>{beast.desc}</p>
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(201, 162, 39, 0.1)', borderRadius: '8px' }}>
                  <p style={{ color: '#c9a227', fontSize: '0.85rem', margin: 0 }}>能力：{beast.ability}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
