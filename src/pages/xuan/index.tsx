/**
 * 灵墟 - 玄学模块 - 首页
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

const SUB_MODULES = [
  {
    id: 'yijing',
    name: '易经',
    icon: '☰',
    desc: '周易六十四卦，变易之道，万物之源',
    href: '/xuan/yijing',
    color: '#c9a227',
  },
  {
    id: 'bazi',
    name: '八字',
    icon: '⏰',
    desc: '生辰八字，命理推算，运势分析',
    href: '/xuan/bazi',
    color: '#8b5cf6',
  },
  {
    id: 'liuyao',
    name: '六爻',
    icon: '☲',
    desc: '铜钱占卜，蓍草之策，未卜先知',
    href: '/xuan/liuyao',
    color: '#ef4444',
  },
  {
    id: 'fulu',
    name: '符箓',
    icon: '☯',
    desc: '道家符箓，驱邪护身，神明之力',
    href: '/xuan/fulu',
    color: '#f97316',
  },
]

export default function XuanIndexPage() {
  return (
    <Layout title="玄学">
      <div className={styles.container}>
        <div className={styles.topDecor}>
          <motion.div className={styles.decorLine} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2 }} />
          <motion.span className={styles.decorSymbol} animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity }}>🔮</motion.span>
          <motion.div className={styles.decorLine} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2 }} />
        </div>

        <motion.header className={styles.header} initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div className={styles.icon} animate={{ textShadow: ['0 0 10px rgba(201, 162, 39, 0.5)', '0 0 30px rgba(201, 162, 39, 0.8)', '0 0 10px rgba(201, 162, 39, 0.5)'] }} transition={{ duration: 3, repeat: Infinity }}>🔮</motion.div>
          <h1 className={styles.title}>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>玄</motion.span>
            <motion.span className={styles.titleDivider} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>·</motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>学</motion.span>
          </h1>
          <motion.p className={styles.subtitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>易经八卦 · 符箓命理</motion.p>
        </motion.header>

        <motion.section className={styles.section} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className={styles.sectionTitle}><span className={styles.sectionIcon}>☰</span>模块概述</h2>
          <div className={styles.infoBox}>
            <p>玄学模块直指天地大道，涵盖易经六十四卦、八字命理、六爻占卜、符箓秘术四大核心修行路径。</p>
            <p>玄之又玄，众妙之门。易者，变易也；命者，天定也。知命而为，方能趋吉避凶。</p>
          </div>
        </motion.section>

        <motion.section className={styles.section} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className={styles.sectionTitle}><span className={styles.sectionIcon}>◇</span>子模块导航</h2>
          <div className={styles.cardGrid}>
            {SUB_MODULES.map((mod, index) => (
              <motion.div key={mod.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -8, scale: 1.02 }}>
                <Link href={mod.href} className={styles.card} style={{ '--card-color': mod.color } as React.CSSProperties}>
                  <motion.div className={styles.cardIcon} animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}>{mod.icon}</motion.div>
                  <h3 className={styles.cardName}>{mod.name}</h3>
                  <p className={styles.cardDesc}>{mod.desc}</p>
                  <div className={styles.cardArrow}>→</div>
                  <div className={styles.cardGlow} />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className={styles.section} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className={styles.poemBox}>
            <motion.p className={styles.poemText} animate={{ textShadow: ['0 0 5px rgba(201, 162, 39, 0.3)', '0 0 20px rgba(201, 162, 39, 0.6)', '0 0 5px rgba(201, 162, 39, 0.3)'] }} transition={{ duration: 3, repeat: Infinity }}>
              形而上者谓之道，形而下者谓之器
            </motion.p>
          </div>
        </motion.section>
      </div>
    </Layout>
  )
}
