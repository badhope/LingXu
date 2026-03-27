/**
 * 灵墟 - 增强版首页组件
 * 包含更多动画、特效和交互
 */

'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { MAIN_MODULES, SITE_CONFIG } from '@/lib/constants'
import { withBase } from '@/lib/utils'
import styles from './HomePage.module.scss'

// 装饰符号动画
function FloatingSymbol({ symbol, delay }: { symbol: string; delay: number }) {
  return (
    <motion.span
      className={styles.floatingSymbol}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
        rotate: [0, 15, -15, 0]
      }}
      transition={{ 
        duration: 4, 
        delay, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ 
        position: 'absolute',
        fontSize: '1.5rem',
        color: '#c9a227',
        textShadow: '0 0 10px rgba(201,162,39,0.5)'
      }}
    >
      {symbol}
    </motion.span>
  )
}

// 玄幻标题组件
function FantasyTitle({ text }: { text: string }) {
  return (
    <h1 className={styles.fantasyTitle}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className={styles.titleChar}
          initial={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3 + i * 0.15,
            ease: [0.6, 0.01, -0.05, 0.9]
          }}
          style={{
            display: 'inline-block',
            textShadow: `
              0 0 10px rgba(201,162,39,0.8),
              0 0 20px rgba(201,162,39,0.5),
              0 0 40px rgba(201,162,39,0.3),
              0 0 80px rgba(201,162,39,0.1)
            `
          }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  )
}

// 光粒子组件
function LightParticle({ index }: { index: number }) {
  const particleStyle = useMemo(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
    width: `${1 + Math.random() * 2}px`,
    height: `${1 + Math.random() * 2}px`,
  }), [])

  return <span className={styles.particle} style={particleStyle} />
}

// 模块卡片组件 - 增强版
function ModuleCard({ 
  module, 
  index 
}: { 
  module: typeof MAIN_MODULES[number]
  index: number 
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className={styles.moduleCard}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -15, 
        boxShadow: `
          0 30px 60px rgba(201, 162, 39, 0.3),
          0 0 30px rgba(201, 162, 39, 0.2),
          inset 0 0 30px rgba(201, 162, 39, 0.05)
        `
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={withBase(`/${module.id}`)} className={styles.cardLink}>
        <motion.div 
          className={styles.cardInner}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* 装饰边框 - 悬停时发光 */}
          <motion.div 
            className={styles.cardCorner}
            style={{ color: module.color }}
            animate={isHovered ? { scale: 1.2, opacity: 1 } : { scale: 1, opacity: 0.5 }}
          >
            ◆
          </motion.div>
          
          {/* 字符带光晕效果 */}
          <motion.div 
            className={styles.cardChar}
            style={{ color: module.color }}
            animate={isHovered ? { 
              textShadow: `0 0 20px ${module.color}, 0 0 40px ${module.color}, 0 0 60px ${module.color}`
            } : { 
              textShadow: `0 0 10px ${module.color}` 
            }}
          >
            {module.char}
          </motion.div>
          
          {/* 信息 */}
          <div className={styles.cardInfo}>
            <motion.h3 
              className={styles.cardName}
              style={{ color: module.color }}
              whileHover={{ scale: 1.05 }}
            >
              {module.name}
            </motion.h3>
            <p className={styles.cardPinyin}>{module.pinyin}</p>
          </div>
          
          {/* 描述 */}
          <p className={styles.cardDesc}>{module.description}</p>
          
          {/* 底部装饰 */}
          <div className={styles.cardDecor}>
            <motion.span 
              className={styles.cardLine} 
              style={{ background: module.color }}
              animate={isHovered ? { width: '100%' } : { width: '30%' }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className={styles.cardDot} 
              style={{ background: module.color }}
              animate={isHovered ? { scale: 1.5 } : { scale: 1 }}
            >
              ●
            </motion.span>
            <motion.span 
              className={styles.cardLine} 
              style={{ background: module.color }}
              animate={isHovered ? { width: '100%' } : { width: '30%' }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* 悬停时出现的箭头 */}
          <motion.div
            className={styles.cardArrow}
            initial={{ opacity: 0, x: -10 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

// 彩蛋组件 - 点击出现特效
function EasterEgg({ children }: { children: React.ReactNode }) {
  const [clicks, setClicks] = useState<{x: number, y: number, symbol: string}[]>([])
  
  const symbols = ['✦', '❋', '✧', '◈', '❃', '⚝', '✴', '❂']
  
  const handleClick = (e: React.MouseEvent) => {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)]
    setClicks([...clicks, { x: e.clientX, y: e.clientY, symbol }])
    setTimeout(() => {
      setClicks(prev => prev.slice(1))
    }, 1000)
  }
  
  return (
    <div onClick={handleClick} style={{ position: 'relative' }}>
      {children}
      {clicks.map((click, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 1, scale: 0, x: click.x, y: click.y }}
          animate={{ 
            opacity: 0, 
            scale: 2, 
            y: click.y - 100,
            x: click.x + (Math.random() - 0.5) * 50
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'fixed',
            fontSize: '1.5rem',
            color: '#c9a227',
            pointerEvents: 'none',
            zIndex: 9999
          }}
        >
          {click.symbol}
        </motion.span>
      ))}
    </div>
  )
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  // 弹簧动画
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  // 视差效果
  const y = useTransform(smoothProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  
  // 装饰符号
  const symbols = useMemo(() => 
    ['☯', '⚝', '✧', '❂', '⬡', '☆', '✦', '◈', '❃', '⚹', '⟡', '⊛', '✴', '⬢', '❋', '✵'],
    []
  )
  
  // 玄幻标题
  const fantasyChars = useMemo(() => ['灵', '墟'], [])
  
  return (
    <EasterEgg>
      <div ref={containerRef} className={styles.container}>
        {/* Hero 区域 */}
        <motion.section 
          className={styles.heroSection} 
          style={{ y, opacity }}
        >
          {/* 装饰符号 - 背景动画 */}
          <div className={styles.heroSymbols}>
            {symbols.map((symbol, i) => (
              <motion.span
                key={i}
                className={styles.heroSymbol}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  rotate: [0, 180, 360],
                  scale: [1, 1.5, 1]
                }}
                transition={{ 
                  duration: 10 + i * 2, 
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${0.5 + Math.random() * 1.5}rem`,
                  color: '#c9a227',
                }}
              >
                {symbol}
              </motion.span>
            ))}
          </div>
          
          {/* 光粒子 */}
          <div className={styles.lightParticles}>
            {Array.from({ length: 50 }).map((_, i) => (
              <LightParticle key={i} index={i} />
            ))}
          </div>
          
          {/* 主标题 - 玄幻效果 */}
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h1 className={styles.mainTitle}>
                {fantasyChars.map((char, i) => (
                  <motion.span
                    key={i}
                    className={styles.titleChar}
                    initial={{ opacity: 0, y: -100, filter: 'blur(20px)' }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      filter: 'blur(0px)',
                      textShadow: [
                        '0 0 10px rgba(201,162,39,0.5)',
                        '0 0 30px rgba(201,162,39,0.8)',
                        '0 0 50px rgba(201,162,39,0.5)',
                        '0 0 30px rgba(201,162,39,0.8)'
                      ]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.5 + i * 0.3,
                      textShadow: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      textShadow: '0 0 60px rgba(201,162,39,1)'
                    }}
                    style={{
                      display: 'inline-block',
                      cursor: 'default'
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
            
            <motion.p 
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.span
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  textShadow: ['0 0 5px #c9a227', '0 0 20px #c9a227', '0 0 5px #c9a227']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                天地玄黄
              </motion.span>
              <span className={styles.separator}>·</span>
              <motion.span
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  textShadow: ['0 0 5px #c9a227', '0 0 20px #c9a227', '0 0 5px #c9a227']
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                宇宙洪荒
              </motion.span>
            </motion.p>
            
            <motion.p 
              className={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {SITE_CONFIG.subtitle}
            </motion.p>
          </motion.div>
          
          {/* 滚动提示 - 弹跳动画 */}
          <motion.div
            className={styles.scrollIndicator}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <motion.span 
              className={styles.scrollText}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              向下探索
            </motion.span>
            <motion.div 
              className={styles.scrollIcon}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </motion.div>
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
            <motion.div 
              className={styles.decorOrnament}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
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
              <motion.span 
                className={styles.titlePrefix}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ◇
              </motion.span>
              <span className={styles.titleText}>八大修行模块</span>
              <motion.span 
                className={styles.titleSuffix}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                ◇
              </motion.span>
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
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className={styles.poemText}>
              <motion.span
                animate={{ 
                  textShadow: ['0 0 5px #c9a227', '0 0 15px #c9a227', '0 0 5px #c9a227']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                天行健，君子以自强不息
              </motion.span>
              <span className={styles.poemDivider}>｜</span>
              <motion.span
                animate={{ 
                  textShadow: ['0 0 5px #c9a227', '0 0 15px #c9a227', '0 0 5px #c9a227']
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                地势坤，君子以厚德载物
              </motion.span>
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
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 40px rgba(201,162,39,0.3)'
                }}
              >
                <motion.span 
                  className={styles.featureIcon}
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {feature.icon}
                </motion.span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* 底部快捷导航 */}
        <nav className={styles.quickNav}>
          {[
            { href: '/search', icon: '🔍', text: '搜索' },
            { href: '/bookmarks', icon: '📜', text: '收藏' },
            { href: '/profile', icon: '👤', text: '我的' },
            { href: '/about', icon: 'ℹ️', text: '关于' },
          ].map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={link.href} className={styles.quickLink}>
                <motion.span 
                  className={styles.linkIcon}
                  whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {link.icon}
                </motion.span>
                <span>{link.text}</span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </EasterEgg>
  )
}