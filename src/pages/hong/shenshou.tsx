/**
 * 灵墟 - 洪荒模块 - 神兽页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function ShenshouPage() {
  const fourBeasts = [
    { name: '青龙', element: '木', direction: '东', desc: '东方神兽，主春主生，草木之精' },
    { name: '白虎', element: '金', direction: '西', desc: '西方神兽，主秋主杀，威武不屈' },
    { name: '朱雀', element: '火', direction: '南', desc: '南方神兽，主夏主长，浴火重生' },
    { name: '玄武', element: '水', direction: '北', desc: '北方神兽，主冬主藏，龟蛇合体' },
  ]

  const luckyBeasts = [
    { name: '龙', rank: '鳞虫之长', desc: '能呼风唤雨，掌管四海，帝王象征' },
    { name: '凤凰', rank: '百鸟之王', desc: '浴火重生，代表祥瑞，非梧桐不栖' },
    { name: '麒麟', rank: '瑞兽之王', desc: '性情温和，寓意吉祥，圣人出世' },
    { name: '白泽', rank: '上古瑞兽', desc: '知万鬼之名，驱邪避凶，黄帝曾问之' },
    { name: '毕方', rank: '鸟中奇物', desc: '一只脚，见则有火灾，曾出现在黄帝身边' },
    { name: '饕餮', rank: '贪吃之兽', desc: '有首无身，好饮食，钟鼎彝器多刻其像' },
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
          <div className={styles.cardGrid}>
            {fourBeasts.map((b, i) => (
              <div key={b.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{b.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>属{b.element} · {b.direction}方</p>
                <p className={styles.cardDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>著名神兽</h2>
          <div className={styles.cardGrid}>
            {luckyBeasts.map((b, i) => (
              <div key={b.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{b.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{b.rank}</p>
                <p className={styles.cardDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
