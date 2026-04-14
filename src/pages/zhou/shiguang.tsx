/**
 * 灵墟 - 时间模块 - 时光长河页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function ShiguangPage() {
  return (
    <Layout title="时光长河">
      <PageBackground colorRgb="255, 136, 204">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>⏳</div>
            <h1 className={styles.title}>时光长河</h1>
            <p className={styles.subtitle}>逝者如斯</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 时间
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              子在川上曰 逝者如斯夫
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
