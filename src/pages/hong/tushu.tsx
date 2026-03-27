/**
 * 灵墟 - 洪荒模块 - 图腾页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function TushuPage() {
  const totems = [
    { name: '龙', element: '水', meaning: '权势、高贵、吉祥', desc: '龙是中华民族最重要的图腾，象征着权势、高贵和吉祥。在灵墟世界中，龙是鳞虫之长，能呼风唤雨，掌管四海。' },
    { name: '凤', element: '火', meaning: '祥瑞、美丽、和谐', desc: '凤凰是百鸟之王，浴火重生，代表祥瑞、美丽与和谐。修炼至高的凤凰可化为火凤，焚天煮海。' },
    { name: '虎', element: '金', meaning: '威武、勇猛、辟邪', desc: '白虎为西方神兽，象征威武与杀伐。虎啸山林，百兽震悚。' },
    { name: '龟', element: '土', meaning: '长寿、智慧、稳重', desc: '灵龟是长寿的象征，寓意智慧与稳重。玄武为北方神兽，乃龟蛇合体。' },
    { name: '麒麟', element: '木', meaning: '仁德、祥瑞、送子', desc: '麒麟是瑞兽之王，性情温和，寓意吉祥。传说有麒麟送子之说。' },
  ]

  return (
    <Layout title="图腾">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🏛️</div>
          <h1 className={styles.title}>远古图腾</h1>
          <p className={styles.subtitle}>信仰的象征</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>图腾文化</h2>
          <div className={styles.infoBox}>
            <p>
              图腾是原始宗教的重要形式，各民族都有自己崇拜的图腾。
              中华民族的图腾以龙凤最为著名，此外还有虎、龟、麒麟等瑞兽。
              图腾不仅是精神的象征，更蕴含着天地间的灵气。修仙者可以借助图腾之力，
              提升自己的修为。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>五大神兽图腾</h2>
          <div className={styles.cardGrid}>
            {totems.map((t, i) => (
              <div key={t.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{t.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>属{t.element} | 寓意：{t.meaning}</p>
                <p className={styles.cardDesc}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
