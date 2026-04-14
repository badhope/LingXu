/**
 * 灵墟 - 空间模块 - 洞天福地页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function DongtianPage() {
  return (
    <Layout title="洞天福地">
      <PageBackground colorRgb="170, 136, 255">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>🏔️</div>
            <h1 className={styles.title}>洞天福地</h1>
            <p className={styles.subtitle}>人间仙境</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 空间
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              别有洞天 豁然开朗
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
