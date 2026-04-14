/**
 * 灵墟 - 时间模块 - 因果报应页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function YinguoPage() {
  return (
    <Layout title="因果报应">
      <PageBackground colorRgb="255, 136, 204">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>⚖️</div>
            <h1 className={styles.title}>因果报应</h1>
            <p className={styles.subtitle}>丝毫不差</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 时间
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              善恶终有报 天道好轮回
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
