/**
 * 灵墟 - 空间模块 - 三界诸天页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function SanjiePage() {
  return (
    <Layout title="三界诸天">
      <PageBackground colorRgb="170, 136, 255">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>🌍</div>
            <h1 className={styles.title}>三界诸天</h1>
            <p className={styles.subtitle}>天人地冥</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 空间
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              跳出三界外 不在五行中
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
