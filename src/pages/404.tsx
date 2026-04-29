'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import styles from './404.module.scss'

export default function NotFound() {
  return (
    <Layout>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/*
           * ✨ 404 符文大阵
           */}
          <motion.div
            className={styles.runeCircle}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <span className={styles.rune}>◈</span>
          </motion.div>

          {/*
           * 💫 主标题 - 修仙风格 404
           */}
          <h1 className={styles.title}>
            <span className={styles.errorCode}>404</span>
            <br />
            <span className={styles.titleText}>时空裂隙</span>
          </h1>

          {/*
           * 📜 修仙风格说明文案
           */}
          <p className={styles.description}>
            你试图穿越的时空坐标不存在于灵墟档案馆。
            <br />
            可能是阵法波动导致了空间折叠，或者这个位面尚未被探索。
          </p>

          {/*
           * 🔮 神秘符文分割线
           */}
          <div className={styles.divider}>
            <span>◇</span>
            <span>◇</span>
            <span>◇</span>
          </div>

          {/*
           * 🧭 返回按钮组
           */}
          <div className={styles.actions}>
            <Link href="/home" className={styles.primaryBtn}>
              <span className={styles.btnIcon}>↞</span>
              返回档案馆大厅
            </Link>
            <button 
              className={styles.secondaryBtn}
              onClick={() => window.history.back()}
            >
              <span className={styles.btnIcon}>↺</span>
              回溯上一个时空
            </button>
          </div>

          {/*
           * ✨ 装饰性小字
           */}
          <div className={styles.footerHint}>
            <small>「大道无形，变化万千。一切有为法，如梦幻泡影。」</small>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
