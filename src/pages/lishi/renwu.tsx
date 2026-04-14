/**
 * 灵墟 - 历史模块 - 历史人物页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function RenwuPage() {
  return (
    <Layout title="历史人物">
      <PageBackground colorRgb="255, 170, 102">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>👤</div>
            <h1 className={styles.title}>历史人物</h1>
            <p className={styles.subtitle}>风流人物</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 历史
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              数风流人物 还看今朝
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
