/**
 * 灵墟 - 天部模块 - 天师寻事页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function XunshiPage() {
  return (
    <Layout title="天师寻事">
      <PageBackground colorRgb="102, 204, 255">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>🌤️</div>
            <h1 className={styles.title}>天师寻事</h1>
            <p className={styles.subtitle}>云游四方</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 天部
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              贫道云游四方
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
