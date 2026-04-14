/**
 * 灵墟 - 玄部模块 - 八字命理页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function BaziPage() {
  return (
    <Layout title="八字命理">
      <PageBackground colorRgb="201, 162, 39">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>📅</div>
            <h1 className={styles.title}>八字命理</h1>
            <p className={styles.subtitle}>生辰八字</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 玄部
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              一命二运三风水
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
