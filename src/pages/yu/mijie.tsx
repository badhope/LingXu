/**
 * 灵墟 - 空间模块 - 秘界探索页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function MijiePage() {
  return (
    <Layout title="秘界探索">
      <PageBackground colorRgb="170, 136, 255">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>🗝️</div>
            <h1 className={styles.title}>秘界探索</h1>
            <p className={styles.subtitle}>上古遗迹</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 空间
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              山重水复疑无路
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
