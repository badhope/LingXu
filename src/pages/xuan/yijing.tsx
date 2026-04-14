/**
 * 灵墟 - 玄部模块 - 易经页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function YijingPage() {
  return (
    <Layout title="易经">
      <PageBackground colorRgb="201, 162, 39">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>☯️</div>
            <h1 className={styles.title}>易经</h1>
            <p className={styles.subtitle}>群经之首</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 玄部
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              一阴一阳之谓道
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
