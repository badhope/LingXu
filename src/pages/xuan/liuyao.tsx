/**
 * 灵墟 - 玄部模块 - 六爻预测页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function LiuyaoPage() {
  return (
    <Layout title="六爻预测">
      <PageBackground colorRgb="201, 162, 39">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>🪙</div>
            <h1 className={styles.title}>六爻预测</h1>
            <p className={styles.subtitle}>金钱卦</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 玄部
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              八卦定吉凶
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
