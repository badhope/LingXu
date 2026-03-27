/**
 * 灵墟 - 洪荒模块 - 神兽页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function ShenshouPage() {
  const beasts = [
    { name: '龙', desc: '鳞虫之长，能呼风唤雨，掌管四海' },
    { name: '凤凰', desc: '百鸟之王，浴火重生，代表祥瑞' },
    { name: '麒麟', desc: '瑞兽之王，性情温和，寓意吉祥' },
    { name: '白虎', desc: '西方神兽，象征威武与杀伐' },
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
            {beasts.map((b, i) => (
              <div key={b.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{b.name}</h3>
                <p className={styles.cardDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
