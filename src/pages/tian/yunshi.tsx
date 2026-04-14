/**
 * 灵墟 - 天部模块 - 气运走势页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function YunshiPage() {
  return (
    <Layout title="气运走势">
      <PageBackground colorRgb="102, 204, 255">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>☁️</div>
            <h1 className={styles.title}>气运走势</h1>
            <p className={styles.subtitle}>气数使然</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 天部
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              气数已尽 天命难违
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
