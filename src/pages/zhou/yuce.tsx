/**
 * 灵墟 - 时间模块 - 预知未来页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function YucePage() {
  return (
    <Layout title="预知未来">
      <PageBackground colorRgb="255, 136, 204">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>🔮</div>
            <h1 className={styles.title}>预知未来</h1>
            <p className={styles.subtitle}>洞悉先机</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 时间
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              前世今生 未来种种
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
