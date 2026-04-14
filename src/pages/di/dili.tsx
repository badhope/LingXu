/**
 * 灵墟 - 地部模块 - 灵墟地理页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function DiliPage() {
  return (
    <Layout title="灵墟地理">
      <PageBackground colorRgb="102, 255, 153">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>⛰️</div>
            <h1 className={styles.title}>灵墟地理</h1>
            <p className={styles.subtitle}>一方水土</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 地部
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              人杰地灵 物华天宝
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
