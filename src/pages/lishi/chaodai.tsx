/**
 * 灵墟 - 历史模块 - 朝代更迭页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function ChaodaiPage() {
  return (
    <Layout title="朝代更迭">
      <PageBackground colorRgb="255, 170, 102">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>👑</div>
            <h1 className={styles.title}>朝代更迭</h1>
            <p className={styles.subtitle}>分合之道</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 历史
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              滚滚长江东逝水
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
