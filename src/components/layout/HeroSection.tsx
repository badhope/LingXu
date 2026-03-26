/**
 * 灵墟 - 首页组件
 * LingXu Homepage
 */

'use client'

import { useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MAIN_MODULES, SITE_CONFIG } from '@/lib/constants'
import { withBase } from '@/lib/utils'
import styles from './HomePage.module.scss'

// 模块卡片组件
function ModuleCard({ 
  module, 
  index 
}: { 
  module: typeof MAIN_MODULES[number]
  index: number 
}) {
  return (
    <motion.div
      className={styles.moduleCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(201, 162, 39, 0.3)' }}
    >
      <Link href={withBase(`/${module.id}`)} className={styles.cardLink}>
        <div className={styles.cardInner}>
          {/* 装饰边框 */}
          <div className={styles.cardCorner} style={{ color: module.color }}>◆</div>
          
          {/* 字符 */}
          <div className={styles.cardChar} style={{ color: module.color }}>
            {module.char}
          </div>
          
          {/* 信息 */}
          <div className={styles.cardInfo}>
            <h3 className={styles.cardName}>{module.name}</h3>
            <p className={styles.cardPinyin}>{module.pinyin}</p>
          </div>
          
          {/* 描述 */}
          <p className={styles.cardDesc}>{module.description}</p>
          
          {/* 底部装饰 */}
          <div className={styles.cardDecor}>
            <span className={styles.cardLine} style={{ background: module.color }} />
            <span className={styles.cardDot} style={{ background: module.color }}>●</span>
            <span className={styles.cardLine} style={{ background: module.color }} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  // 视差效果
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  // 装饰符号
  const symbols = useMemo(() => 
    ['☯', '⚝', '✧', '❂', '⬡', '☆', '✦', '◈', '❃', '⚹', '⟡', '⊛', '✴', '⬢', '❋', '✵'],
    []
  )
  
  return (
    <div ref={containerRef} className={styles.container}>
      {/* Hero 区域 */}
      <motion.section className={styles.heroSection} style={{ y, opacity }}>
        {/* 装饰符号 */}
        <div className={styles.heroSymbols}>
          {symbols.map((symbol, i) => (
            <span
              key={i}
              className={styles.heroSymbol}
              style={{
                '--delay': `${i * 2}s`,
                '--duration': `${25 + i * 3}s`,
                '--radius': `${150 + i * 40}px`,
              } as React.CSSProperties}
            >
              {symbol}
            </span>
          ))}
        </div>
        
        {/* 光粒子 */}
        <div className={styles.lightParticles}>
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className={styles.lightParticle}
              style={{
                '--delay': `${i * 0.5}s`,
                '--duration': `${15 + i}s`,
                '--radius': `${100 + i * 30}px`,
                '--size': `${2 + Math.random() * 3}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
        
        {/* 主标题 */}
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className={styles.mainTitle}>
            <span className={styles.titleChar}>灵</span>
            <span className={styles.titleChar}>墟</span>
          </h1>
          
          <p className={styles.subtitle}>
            <span>天地玄黄</span>
            <span className={styles.separator}>·</span>
            <span>宇宙洪荒</span>
          </p>
          
          <p className={styles.tagline}>{SITE_CONFIG.subtitle}</p>
        </motion.div>
        
        {/* 滚动提示 */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className={styles.scrollText}>向下探索</span>
          <div className={styles.scrollIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </div>
        </motion.div>
      </motion.section>
      
      {/* 模块导航区域 */}
      <section className={styles.modulesSection}>
        {/* 装饰线 */}
        <motion.div
          className={styles.sectionDecor}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className={styles.decorLine} />
          <div className={styles.decorOrnament}>✦</div>
          <div className={styles.decorLine} />
        </motion.div>
        
        {/* 标题 */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.sectionTitle}>
            <span className={styles.titlePrefix}>◇</span>
            <span className={styles.titleText}>八大修行模块</span>
            <span className={styles.titleSuffix}>◇</span>
          </h2>
          <p className={styles.sectionSubtitle}>探索失落文明的奥秘</p>
        </motion.div>
        
        {/* 模块网格 */}
        <div className={styles.modulesGrid}>
          {MAIN_MODULES.map((module, index) => (
            <ModuleCard key={module.id} module={module} index={index} />
          ))}
        </div>
        
        {/* 诗句横幅 */}
        <motion.div
          className={styles.poemBanner}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className={styles.poemText}>
            <span>天行健，君子以自强不息</span>
            <span className={styles.poemDivider}>｜</span>
            <span>地势坤，君子以厚德载物</span>
          </p>
        </motion.div>
      </section>
      
      {/* 特色功能区域 */}
      <section className={styles.featuresSection}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>
            <span className={styles.titlePrefix}>◇</span>
            <span className={styles.titleText}>核心功能</span>
            <span className={styles.titleSuffix}>◇</span>
          </h2>
          <p className={styles.sectionSubtitle}>丰富的玄学工具与探索体验</p>
        </motion.div>
        
        <div className={styles.featuresGrid}>
          {[
            { icon: '☰', title: '易经八卦', desc: '六十四卦详解，即时占卜' },
            { icon: '☵', title: '八字命理', desc: '精准命盘分析，大运推演' },
            { icon: '☲', title: '风水堪舆', desc: '罗盘定位，龙脉探查' },
            { icon: '☯', title: '修炼模拟', desc: '境界提升，功法修炼' },
            { icon: '✦', title: '星象观测', desc: '实时星图，星座运势' },
            { icon: '◈', title: '占卜大厅', desc: '多种占卜方式，趋吉避凶' },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <span className={styles.featureIcon}>{feature.icon}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* 底部快捷导航 */}
      <nav className={styles.quickNav}>
        <Link href="/search" className={styles.quickLink}>
          <span className={styles.linkIcon}>🔍</span>
          <span>搜索</span>
        </Link>
        <Link href="/bookmarks" className={styles.quickLink}>
          <span className={styles.linkIcon}>📜</span>
          <span>收藏</span>
        </Link>
        <Link href="/profile" className={styles.quickLink}>
          <span className={styles.linkIcon}>👤</span>
          <span>我的</span>
        </Link>
        <Link href="/about" className={styles.quickLink}>
          <span className={styles.linkIcon}>ℹ️</span>
          <span>关于</span>
        </Link>
      </nav>
    </div>
  )
}
