/**
 * 灵墟 - 地理模块 - 龙脉页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function LongmaiPage() {
  return (
    <Layout title="龙脉">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🐉</div>
          <h1 className={styles.title}>中华龙脉</h1>
          <p className={styles.subtitle}>山川地理，风水堪舆</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>四大干龙</h2>
          <div style={{ background: 'rgba(26,26,46,0.4)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              风水学认为，龙脉是山的脉络，如同人体经络一般。
              寻龙之法，首重气势连贯，次观山水环抱，再看明堂开阔。
              真正的龙穴之地，往往藏于深山之中，需要慧眼识珠。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
