/**
 * 灵墟 - 时间模块 - 轮回页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function LunhuiPage() {
  const liudao = [
    { name: '天道', rank: '善道', desc: '天人所居，福报最大，但仍在轮回中' },
    { name: '人道', rank: '善道', desc: '人类所居，苦乐参半，最易修行' },
    { name: '阿修罗道', rank: '善道', desc: '好勇斗狠，福报大但嗔心重' },
    { name: '畜生道', rank: '恶道', desc: '愚痴无明，互相残杀，受苦最多' },
    { name: '饿鬼道', rank: '恶道', desc: '饥饿干渴，求食不得，贪心最重' },
    { name: '地狱道', rank: '恶道', desc: '最苦之处，罪人所居，受无量苦' },
  ]

  const fangshi = [
    { name: '持戒', desc: '守戒不犯，能保人身' },
    { name: '修善', desc: '积德行善，能升天道' },
    { name: '忏悔', desc: '忏悔罪业，能消恶业' },
    { name: '布施', desc: '广行布施，能积福报' },
    { name: '忍辱', desc: '修持忍辱，能消嗔心' },
    { name: '精进', desc: '勇猛精进，能断烦恼' },
    { name: '禅定', desc: '修持禅定，能得神通' },
    { name: '智慧', desc: '修持智慧，能断无明' },
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
          <h2 className={styles.sectionTitle}>轮回之道</h2>
          <div className={styles.infoBox}>
            <p>
              轮回是佛教和道教共同的概念，认为灵魂在六道中不断转世轮回。
              只有通过修行，跳出三界五行，才能超脱轮回之苦，达到永恒的解脱。
              在灵墟的世界观中，修仙的最终目标就是超脱轮回，不受生死束缚。
            </p>
            <p>
              轮回中的众生，根据前世的善恶业力，投生到不同的道中。
              善业多者，投生天道、人道、阿修罗道三善道；
              恶业多者，投生畜生道、饿鬼道、地狱道三恶道。
              只有通过修行，才能超脱轮回。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>六道详解</h2>
          <div className={styles.cardGrid}>
            {liudao.map((d, i) => (
              <div key={d.name} className={styles.card}>
                <h3 style={{ color: d.rank === '善道' ? '#22c55e' : '#ef4444', margin: '0 0 0.25rem' }}>{d.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{d.rank}</p>
                <p className={styles.cardDesc}>{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>超脱轮回的方法</h2>
          <div className={styles.cardGrid}>
            {fangshi.map((f, i) => (
              <div key={f.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>{f.name}</h3>
                <p className={styles.cardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
