/**
 * 灵墟 - 关于页面
 */

'use client'

import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import styles from './About.module.scss'

const TECHS = [
  { name: 'Next.js 14', desc: 'React全栈框架', icon: '⚡' },
  { name: 'TypeScript', desc: '类型安全', icon: '📘' },
  { name: 'Framer Motion', desc: '动画库', icon: '✨' },
  { name: 'SCSS Modules', desc: '样式方案', icon: '🎨' },
]

export default function About() {
  return (
    <Layout title="关于">
      <div className={styles.container}>
        {/* 头部 */}
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className={styles.icon}>📜</div>
          <h1 className={styles.title}>关于灵墟</h1>
          <p className={styles.subtitle}>末法时代 · 失落修行文明档案馆</p>
        </motion.header>

        {/* 项目简介 */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <h2 className={styles.sectionTitle}>项目简介</h2>
          <div className={styles.introCard}>
            <p>灵墟是一个融合中华传统文化与现代 Web 技术的综合性文化展示平台。</p>
            <p>
              项目涵盖八大核心模块：天时、地理、玄学、历史、宇宙、时空、洪荒与失落，
              每个模块都包含丰富的子功能和交互式体验。
            </p>
            <p>我们致力于通过现代技术手段，让更多人了解和传承中华优秀传统文化。</p>
          </div>
        </motion.section>

        {/* 技术栈 */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <h2 className={styles.sectionTitle}>技术栈</h2>
          <div className={styles.techGrid}>
            {TECHS.map((tech) => (
              <div key={tech.name} className={styles.techCard}>
                <div className={styles.techIcon}>{tech.icon}</div>
                <h3 className={styles.techName}>{tech.name}</h3>
                <p className={styles.techDesc}>{tech.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 开源协议 */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
        >
          <h2 className={styles.sectionTitle}>开源协议</h2>
          <div className={styles.licenseBox}>
            <p>本项目采用 MIT 开源协议，欢迎贡献代码和建议</p>
          </div>
        </motion.section>
      </div>
    </Layout>
  )
}
