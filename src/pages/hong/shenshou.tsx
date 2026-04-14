/**
 * 灵墟 - 洪荒模块 - 神兽瑞兽页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function ShenshouPage() {
  return (
    <Layout title="神兽瑞兽">
      <PageBackground colorRgb="255, 102, 102">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>🐉</div>
            <h1 className={styles.title}>神兽瑞兽</h1>
            <p className={styles.subtitle}>麟凤龟龙</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 洪荒
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              麟凤龟龙 谓之四灵
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
