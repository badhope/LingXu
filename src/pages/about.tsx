'use client'

import { motion } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import styles from './About.module.scss'

const TECHS = [
  { name: 'Next.js 15', desc: 'React全栈框架', icon: '⚡' },
  { name: 'TypeScript', desc: '类型安全', icon: '📘' },
  { name: 'Framer Motion', desc: '动画库', icon: '✨' },
  { name: 'Three.js', desc: '3D渲染引擎', icon: '🌐' },
  { name: 'SCSS Modules', desc: '样式方案', icon: '🎨' },
]

const STATS = [
  { number: '32', label: '修真子系统', icon: '🏛️', suffix: '套' },
  { number: '2,847', label: '收录典籍', icon: '📚', suffix: '部' },
  { number: '896', label: '修真功法', icon: '📜', suffix: '种' },
  { number: '472', label: '秘术传承', icon: '✨', suffix: '门' },
  { number: '1,234', label: '天材地宝', icon: '💎', suffix: '品' },
  { number: '∞', label: '大道无涯', icon: '🌌', suffix: '' },
]

const THEMES = [
  { name: '洪荒灵墟', desc: '开天辟地 · 上古神话', color: '#fbbf24' },
  { name: '修真洞府', desc: '悟道飞升 · 金丹大道', color: '#a855f7' },
  { name: '末法纪元', desc: '灵气消散 · 都市异闻', color: '#06b6d4' },
  { name: '未来长河', desc: '时间穿越 · 星际修真', color: '#22c55e' },
]

export default function About() {
  return (
    <SubPageTemplate title="关于" colorRgb="139, 92, 246">
      <div className={styles.container}>
        {/* 头部 */}
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div 
            className={styles.icon}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >📜</motion.div>
          <h1 className={styles.title}>关于灵墟</h1>
          <p className={styles.subtitle}>末法时代 · 失落修行文明档案馆</p>
        </motion.header>

        {/* 📊 档案馆大数据 */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <h2 className={styles.sectionTitle}>📊 档案馆大数据</h2>
          <p className={styles.sectionDesc}>千年传承，万古修为，尽在此间</p>
          
          <div className={styles.statsGrid}>
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={styles.statItem}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statNumber}>
                  {stat.number}
                  <span className={styles.statSuffix}>{stat.suffix}</span>
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 四大主题空间 */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <h2 className={styles.sectionTitle}>🌌 四大主题空间</h2>
          <p className={styles.sectionDesc}>穿越时空，探索不同的修真世界</p>
          
          <div className={styles.themesGrid}>
            {THEMES.map((theme, i) => (
              <motion.div
                key={theme.name}
                className={styles.themeCard}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                style={{
                  background: `linear-gradient(135deg, ${theme.color}20 0%, transparent 100%)`,
                  borderLeftColor: theme.color,
                }}
              >
                <h3 style={{ color: theme.color }}>{theme.name}</h3>
                <p>{theme.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 项目简介 */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        >
          <h2 className={styles.sectionTitle}>项目简介</h2>
          <div className={styles.introCard}>
            <p>灵墟是一个融合中华传统文化与现代 Web 技术的综合性文化展示平台。</p>
            <p>
              项目以「天地玄黄 · 宇宙洪荒」为核心骨架，延伸出「洪荒/修真/末法/未来」四大主题空间，
              每个世界都拥有独立的世界观和完整的子系统。
            </p>
            <p>我们致力于通过现代技术手段，让更多人了解和传承中华优秀传统文化。</p>
          </div>
        </motion.section>

        {/* 技术栈 */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
        >
          <h2 className={styles.sectionTitle}>技术栈</h2>
          <div className={styles.techGrid}>
            {TECHS.map((tech, i) => (
              <motion.div 
                key={tech.name} 
                className={styles.techCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.08 }}
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <div className={styles.techIcon}>{tech.icon}</div>
                <h3 className={styles.techName}>{tech.name}</h3>
                <p className={styles.techDesc}>{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 开源协议 */}
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: 'easeOut' }}
        >
          <h2 className={styles.sectionTitle}>开源协议</h2>
          <div className={styles.licenseBox}>
            <p>本项目采用 MIT 开源协议，欢迎贡献代码和建议 ✨</p>
          </div>
        </motion.section>
      </div>
    </SubPageTemplate>
  )
}
