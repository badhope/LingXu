/**
 * 灵墟 - 洪荒模块 - 洪荒传说页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function ChuanshuoPage() {
  return (
    <Layout title="洪荒传说">
      <PageBackground colorRgb="255, 102, 102">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>📖</div>
            <h1 className={styles.title}>洪荒传说</h1>
            <p className={styles.subtitle}>上古神话</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 洪荒
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              天地玄黄 宇宙洪荒
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
