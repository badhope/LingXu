/**
 * 灵墟 - 地理模块 - 首页
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'

const SUB_MODULES = [
  {
    id: 'fengshui',
    name: '风水',
    icon: '🏔️',
    desc: '阴阳宅风水，堪舆布局，寻龙点穴',
    href: '/di/fengshui',
    color: '#22c55e',
  },
  {
    id: 'luopan',
    name: '罗盘',
    icon: '🧭',
    desc: '风水罗盘，定方位知吉凶，辨阴阳',
    href: '/di/luopan',
    color: '#f59e0b',
  },
  {
    id: 'longmai',
    name: '龙脉',
    icon: '🐉',
    desc: '中华龙脉，山水灵气，洞天福地',
    href: '/di/longmai',
    color: '#8b5cf6',
  },
  {
    id: 'dili',
    name: '地理',
    icon: '🗺️',
    desc: '山川地理，地脉走向，人杰地灵',
    href: '/di/dili',
    color: '#06b6d4',
  },
]

export default function DiIndexPage() {
  return (
    <Layout title="地理">
      <div className={styles.container}>
        <div className={styles.topDecor}>
          <motion.div className={styles.decorLine} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2 }} />
          <motion.span className={styles.decorSymbol} animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity }}>🏔️</motion.span>
          <motion.div className={styles.decorLine} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2 }} />
        </div>

        <motion.header className={styles.header} initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div className={styles.icon} animate={{ textShadow: ['0 0 10px rgba(240, 192, 64, 0.5)', '0 0 30px rgba(240, 192, 64, 0.8)', '0 0 10px rgba(240, 192, 64, 0.5)'] }} transition={{ duration: 3, repeat: Infinity }}>🏔️</motion.div>
          <h1 className={styles.title}>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>地</motion.span>
            <motion.span className={styles.titleDivider} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>·</motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>理</motion.span>
          </h1>
          <motion.p className={styles.subtitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>山川地理 · 风水堪舆</motion.p>
        </motion.header>

        <motion.section className={styles.section} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className={styles.sectionTitle}><span className={styles.sectionIcon}>☰</span>模块概述</h2>
          <div className={styles.infoBox}>
            <p>地理模块承载天地山川之灵气，涵盖风水堪舆、罗盘定向、龙脉探寻、福地洞天四大修行路径。</p>
            <p>风水之道，在于藏风聚气得水。寻龙点穴，辨阴阳之势；罗盘定向，知吉凶之机。</p>
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
              地势坤，君子以厚德载物
            </motion.p>
          </div>
        </motion.section>
      </div>
    </Layout>
  )
}
