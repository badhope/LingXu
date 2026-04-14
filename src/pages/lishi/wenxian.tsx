/**
 * 灵墟 - 历史模块 - 古籍文献页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './SubPage.module.scss'

export default function WenxianPage() {
  return (
    <Layout title="古籍文献">
      <PageBackground colorRgb="255, 170, 102">
        <div className={styles.container}>
          
          <motion.header 
            className={`${styles.header} ${styles.animateFadeInUp}`}
          >
            <div className={styles.icon}>📚</div>
            <h1 className={styles.title}>古籍文献</h1>
            <p className={styles.subtitle}>汗牛充栋</p>
            <div className={styles.headerDecor}>
              灵墟档案馆 · 历史
            </div>
          </motion.header>

          <motion.div 
            className={`${styles.poemBox} ${styles.animateFadeInUp} ${styles.animateDelay3}`}
          >
            <p className={styles.poemText}>
              读书破万卷 下笔如有神
            </p>
          </motion.div>

        </div>
      </PageBackground>
    </Layout>
  )
}
