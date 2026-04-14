/**
 * 灵墟 - 失落模块 - 失落功法页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function GongfaPage() {
  return (
    <Layout title="失落功法">
      <PageBackground colorRgb="170, 153, 136">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>⚔️</div>
            <h1 className={styles.title}>失落功法</h1>
            <p className={styles.subtitle}>上古传承</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 失落
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              上古功法 妙不可言
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
