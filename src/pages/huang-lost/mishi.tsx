/**
 * 灵墟 - 失落模块 - 秘室页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function MishiPage() {
  return (
    <Layout title="秘室">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🔮</div>
          <h1 className={styles.title}>隐藏档案</h1>
          <p className={styles.subtitle}>尘封的秘密</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>机密档案</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              在灵墟的深处，藏着无数被遗忘的秘密。
              这些档案记载着上古修仙界的秘辛，
              只有真正有缘之人才能窥见一二...
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>绝密内容</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>灵气复苏计划</h3>
              <p className={styles.cardDesc}>上古大能留下的后手，计划在灵气枯竭之际重启天地灵气...</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>仙界坐标</h3>
              <p className={styles.cardDesc}>通往仙界的隐秘通道，据说只有找到三把钥匙才能开启...</p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>末法真相</h3>
              <p className={styles.cardDesc}>末法时代的真正原因，远比想象中更加复杂...</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
