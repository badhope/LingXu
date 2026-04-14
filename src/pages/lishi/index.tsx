/**
 * 灵墟 - 历史模块 - 首页
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './index.module.scss'

const SUB_MODULES = [
  {
    id: 'chaodai',
    name: '朝代',
    icon: '📜',
    desc: '历史朝代更迭，帝王谱系，盛世兴衰',
    href: '/lishi/chaodai',
    color: '#d97706',
  },
  {
    id: 'renwu',
    name: '人物',
    icon: '👤',
    desc: '历史名人档案，道家先贤，奇人异士',
    href: '/lishi/renwu',
    color: '#7c3aed',
  },
  {
    id: 'mixin',
    name: '秘辛',
    icon: '🔍',
    desc: '历史背后的秘密，未解之谜，尘封真相',
    href: '/lishi/mixin',
    color: '#dc2626',
  },
  {
    id: 'wenxian',
    name: '文献',
    icon: '📚',
    desc: '古籍文献资料，道藏典籍，经典著作',
    href: '/lishi/wenxian',
    color: '#0891b2',
  },
]

export default function LishiIndexPage() {
  return (
    <Layout title="历史">
      <PageBackground colorRgb="255, 170, 102">
        <div className={styles.container}>
        <div className={styles.topDecor}>
          <motion.div className={styles.decorLine} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2 }} />
          <motion.span className={styles.decorSymbol} animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity }}>📜</motion.span>
          <motion.div className={styles.decorLine} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2 }} />
        </div>

        <motion.header className={styles.header} initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div className={styles.icon} animate={{ textShadow: ['0 0 10px rgba(201, 162, 39, 0.5)', '0 0 30px rgba(201, 162, 39, 0.8)', '0 0 10px rgba(201, 162, 39, 0.5)'] }} transition={{ duration: 3, repeat: Infinity }}>📜</motion.div>
          <h1 className={styles.title}>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>历</motion.span>
            <motion.span className={styles.titleDivider} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>·</motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>史</motion.span>
          </h1>
          <motion.p className={styles.subtitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>千古兴亡 · 秘辛档案</motion.p>
        </motion.header>

        <motion.section className={styles.section} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className={styles.sectionTitle}><span className={styles.sectionIcon}>☰</span>模块概述</h2>
          <div className={styles.infoBox}>
            <p>历史模块尘封了五千年乃至上古万年的修行文明，记录那些被遗忘的仙人传说与历史真相。</p>
            <p>老子、庄子、列子……皆是飞升的仙者。历史从不简单，每一个朝代更迭背后，都有修仙者的身影。</p>
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
              读史使人明智，知古方能鉴今
            </motion.p>
          </div>
        </motion.section>
        </div>
      </PageBackground>
    </Layout>
  )
}
