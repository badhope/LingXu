/**
 * 灵墟 - 失落模块 - 先天法宝页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function FabaoPage() {
  return (
    <Layout title="先天法宝">
      <PageBackground colorRgb="170, 153, 136">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>🏺</div>
            <h1 className={styles.title}>先天法宝</h1>
            <p className={styles.subtitle}>混沌灵宝</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 失落
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              天生地养 法宝通灵
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
