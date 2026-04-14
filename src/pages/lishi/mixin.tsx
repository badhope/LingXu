/**
 * 灵墟 - 历史模块 - 秘闻轶事页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function MixinPage() {
  return (
    <Layout title="秘闻轶事">
      <PageBackground colorRgb="255, 170, 102">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>🎭</div>
            <h1 className={styles.title}>秘闻轶事</h1>
            <p className={styles.subtitle}>不为人知</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 历史
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              六朝旧事随流水
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
