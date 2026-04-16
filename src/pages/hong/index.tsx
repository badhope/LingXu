/**
 * 洪荒模块 - 神话传说首页
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import SubmoduleCard from '@/components/ui/SubmoduleCard'
import PageBackground from '@/components/layout/PageBackground'
import styles from './index.module.scss'

const SUB_MODULES = [
  { id: 'chuanshuo', name: '传说', icon: '📖', desc: '上古神话，三皇五帝，开天辟地', href: '/hong/chuanshuo' },
  { id: 'shenshou', name: '神兽', icon: '🦅', desc: '青龙白虎，朱雀玄武，瑞兽祥禽', href: '/hong/shenshou' },
  { id: 'yaomo', name: '妖魔', icon: '👹', desc: '妖魔鬼怪，精怪异闻，山海奇谈', href: '/hong/yaomo' },
  { id: 'tushu', name: '图书', icon: '📜', desc: '山海经，搜神记，神仙传', href: '/hong/tushu' },
]

export default function HongIndexPage() {
  return (
    <Layout title="洪荒">
      <PageBackground colorRgb="255, 120, 60">
        <div className={styles.container}>
          <motion.div
            className={styles.hero}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className={styles.heroIcon}
              animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              🔥
            </motion.div>
            <h1 className={`xian-title ${styles.heroTitle}`}>洪荒</h1>
            <p className={styles.heroSubtitle}>开天辟地 · 神话传说 · 山海异兽</p>
          </motion.div>

          <section>
            <h2 className="xian-title" style={{ textAlign: 'center', margin: '3rem 0 2rem' }}>洪荒世界</h2>
            <div className={styles.grid}>
              {SUB_MODULES.map((mod, index) => (
                <SubmoduleCard
                  key={mod.id}
                  title={mod.name}
                  description={mod.desc}
                  href={mod.href}
                  icon={mod.icon}
                  index={index}
                />
              ))}
            </div>
          </section>

          <motion.div
            className="xian-submodule-card"
            style={{ marginTop: '3rem', textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p style={{ color: '#b89438', fontSize: '1.1rem' }}>
              天地玄黄，宇宙洪荒，日月盈昃，辰宿列张
            </p>
          </motion.div>
        </div>
      </PageBackground>
    </Layout>
  )
}
