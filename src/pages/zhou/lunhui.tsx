/**
 * 灵墟 - 时间模块 - 轮回页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function LunhuiPage() {
  const realms = [
    { name: '天道', color: '#f0c040', desc: '享福最多，但福尽则坠', karma: '行十善者' },
    { name: '阿修罗道', color: '#f87171', desc: '福报近天，但嗔恨心重', karma: '行善但夹杂嗔恨' },
    { name: '人道', color: '#4ade80', desc: '苦乐参半，最适合修行', karma: '善恶参半' },
    { name: '畜生道', color: '#94a3b8', desc: '愚痴为业，受人驱使', karma: '造作愚痴之业' },
    { name: '饿鬼道', color: '#a855f7', desc: '饥渴常在，求食不得', karma: '贪心为业' },
    { name: '地狱道', color: '#ef4444', desc: '最苦之处，无有出期', karma: '五逆十恶' },
  ]

  return (
    <Layout title="轮回">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🔄</div>
          <h1 className={styles.title}>六道轮回</h1>
          <p className={styles.subtitle}>因果循环，永无止境</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>六道详解</h2>
          <div className={styles.cardGrid}>
            {realms.map((realm, i) => (
              <div key={realm.name} className={styles.card} style={{ 
                animationDelay: `${i * 0.1}s`,
                borderLeft: `4px solid ${realm.color}`
              }}>
                <h3 style={{ color: realm.color, marginBottom: '1rem' }}>{realm.name}</h3>
                <p className={styles.cardDesc}>{realm.desc}</p>
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(201, 162, 39, 0.1)', borderRadius: '8px' }}>
                  <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>投胎条件：{realm.karma}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>轮回的意义</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              轮回是佛教和道教共同的概念，认为灵魂在六道中不断转世轮回。
              只有通过修行，跳出三界五行，才能超脱轮回之苦，达到永恒的解脱。
              在灵墟的世界观中，修仙的最终目标就是超脱轮回，不受生死束缚。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
