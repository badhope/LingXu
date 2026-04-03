/**
 * 灵墟 - 移动端优化版首页组件
 * 优化：移动端适配、动画性能、古风效果
 */

'use client'

import { useEffect, useRef, useMemo, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { MAIN_MODULES, SITE_CONFIG } from '@/lib/constants'
import { withBase } from '@/lib/utils'
import styles from './HomePage.module.scss'

// 检测设备性能
function useDevicePerformance() {
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  
  useEffect(() => {
    // 检测是否是移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    // 检测设备内存（如果可用）
    const lowMemory = (navigator as any).deviceMemory ? (navigator as any).deviceMemory < 4 : false
    // 检测硬件并发（如果可用）
    const lowCores = (navigator as any).hardwareConcurrency ? (navigator as any).hardwareConcurrency < 4 : false
    
    setIsLowPerformance(isMobile || lowMemory || lowCores)
  }, [])
  
  return isLowPerformance
}

// 检测移动端
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  
  return isMobile
}

// 优化的光粒子组件 - 移动端减少数量
function LightParticle({ index, isLowPerformance }: { index: number; isLowPerformance: boolean }) {
  const particleStyle = useMemo(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
    width: `${1 + Math.random() * 2}px`,
    height: `${1 + Math.random() * 2}px`,
  }), [])

  if (isLowPerformance) return null

  return <span className={styles.particle} style={particleStyle} />
}

// 古风标题组件 - 篆书风格
function AncientTitle({ isMobile }: { isMobile: boolean }) {
  return (
    <div className={styles.ancientTitleWrapper}>
      {/* 环绕光环 */}
      <motion.div 
        className={styles.orbitRing}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {['✦', '✧', '⚝', '❂', '✴', '❃'].map((symbol, i) => (
          <span 
            key={i} 
            className={styles.orbitSymbol}
            style={{ 
              transform: `rotate(${i * 60}deg) translateX(${isMobile ? '120px' : '180px'}) rotate(-${i * 60}deg)` 
            }}
          >
            {symbol}
          </span>
        ))}
      </motion.div>
      
      {/* 朦胧烟雾效果 */}
      <div className={styles.mistEffect}>
        <motion.div 
          className={styles.mistLayer}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className={styles.mistLayer}
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>
      
      {/* 云朵装饰 */}
      <div className={styles.cloudDecor}>
        <motion.div 
          className={styles.cloud}
          animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className={styles.cloud}
          animate={{ x: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>
      
      {/* 主标题 - 古体字风格 */}
      <motion.h1 
        className={styles.ancientTitle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* 篆书风格字体 */}
        <motion.span 
          className={styles.ancientChar}
          initial={{ opacity: 0, y: -50, filter: 'blur(20px)' }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)'
          }}
          transition={{ duration: 1.2, delay: 0.3 }}
          whileHover={{ 
            scale: 1.1,
            textShadow: '0 0 60px rgba(201,162,39,1), 0 0 100px rgba(201,162,39,0.5)'
          }}
        >
          靈
        </motion.span>
        <motion.span 
          className={styles.ancientChar}
          initial={{ opacity: 0, y: -50, filter: 'blur(20px)' }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)'
          }}
          transition={{ duration: 1.2, delay: 0.5 }}
          whileHover={{ 
            scale: 1.1,
            textShadow: '0 0 60px rgba(201,162,39,1), 0 0 100px rgba(201,162,39,0.5)'
          }}
        >
          墟
        </motion.span>
        
        {/* 呼吸光晕 */}
        <motion.div 
          className={styles.breathGlow}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.h1>
      
      {/* 副标题 */}
      <motion.p 
        className={styles.ancientSubtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          天地玄黄
        </motion.span>
        <span className={styles.separator}>·</span>
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          宇宙洪荒
        </motion.span>
      </motion.p>
    </div>
  )
}

// 优化的模块卡片组件
function ModuleCard({ 
  module, 
  index,
  isMobile
}: { 
  module: typeof MAIN_MODULES[number]
  index: number
  isMobile: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className={styles.moduleCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ 
        delay: index * 0.08, 
        duration: 0.5
      }}
      whileHover={!isMobile ? { 
        y: -10, 
        boxShadow: '0 20px 40px rgba(201, 162, 39, 0.2)'
      } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={withBase(`/${module.id}`)} className={styles.cardLink}>
        <div className={styles.cardInner}>
          {/* 字符 */}
          <motion.div 
            className={styles.cardChar}
            style={{ color: module.color }}
            animate={isHovered && !isMobile ? { 
              scale: 1.1,
              textShadow: `0 0 30px ${module.color}`
            } : {}}
          >
            {module.char}
          </motion.div>
          
          {/* 信息 */}
          <div className={styles.cardInfo}>
            <h3 className={styles.cardName} style={{ color: module.color }}>
              {module.name}
            </h3>
            <p className={styles.cardPinyin}>{module.pinyin}</p>
          </div>
          
          {/* 描述 */}
          <p className={styles.cardDesc}>{module.description}</p>
          
          {/* 底部装饰线 */}
          <motion.div 
            className={styles.cardLine}
            style={{ background: module.color }}
            animate={isHovered && !isMobile ? { scaleX: 1 } : { scaleX: 0.3 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    </motion.div>
  )
}

// 墨迹装饰组件
function InkDecor() {
  return (
    <div className={styles.inkDecor}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.inkSpot}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 3 + i,
            delay: i * 0.5,
            repeat: Infinity
          }}
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 3) * 30}%`,
          }}
        />
      ))}
    </div>
  )
}

// 香火烟雾效果
function IncenseSmoke({ isLowPerformance }: { isLowPerformance: boolean }) {
  if (isLowPerformance) return null
  
  return (
    <div className={styles.incenseSmoke}>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.smokeParticle}
          initial={{ 
            y: 0, 
            opacity: 0,
            x: (i - 4) * 30
          }}
          animate={{
            y: -100,
            opacity: [0, 0.3, 0],
            x: (i - 4) * 30 + (Math.random() - 0.5) * 20
          }}
          transition={{
            duration: 3,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

// 烛光摇曳效果
function CandleGlow({ isLowPerformance }: { isLowPerformance: boolean }) {
  if (isLowPerformance) return null
  
  return (
    <motion.div 
      className={styles.candleGlow}
      animate={{
        boxShadow: [
          '0 0 20px rgba(255, 180, 100, 0.3)',
          '0 0 40px rgba(255, 180, 100, 0.5)',
          '0 0 20px rgba(255, 180, 100, 0.3)'
        ],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

// 符文闪烁效果
function RuneFlicker({ isLowPerformance }: { isLowPerformance: boolean }) {
  const runes = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷']
  
  if (isLowPerformance) return null
  
  return (
    <div className={styles.runeFlicker}>
      {runes.map((rune, i) => (
        <motion.span
          key={i}
          className={styles.rune}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            textShadow: [
              '0 0 5px rgba(201,162,39,0.3)',
              '0 0 15px rgba(201,162,39,0.6)',
              '0 0 5px rgba(201,162,39,0.3)'
            ]
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity
          }}
        >
          {rune}
        </motion.span>
      ))}
    </div>
  )
}

// 移动端底部导航
function MobileNav({ isVisible }: { isVisible: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav 
          className={styles.mobileNav}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
        >
          <motion.button
            className={styles.navToggle}
            onClick={() => setIsExpanded(!isExpanded)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ rotate: isExpanded ? 45 : 0 }}
            >
              +
            </motion.span>
          </motion.button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                className={styles.navMenu}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {[
                  { href: '/tian', icon: '☁️', text: '天' },
                  { href: '/di', icon: '🏔️', text: '地' },
                  { href: '/xuan', icon: '☯', text: '玄' },
                  { href: '/huang', icon: '📜', text: '黄' },
                ].map((link, i) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className={styles.navItem}
                    onClick={() => setIsExpanded(false)}
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {link.icon}
                    </motion.span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isLowPerformance = useDevicePerformance()
  const isMobile = useIsMobile()
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  // 移动端禁用视差
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  // 粒子数量根据性能调整
  const particleCount = isLowPerformance ? 0 : (isMobile ? 15 : 30)
  
  return (
    <div ref={containerRef} className={styles.container}>
      {/* Hero 区域 */}
      <motion.section 
        className={styles.heroSection} 
        style={{ y: isMobile ? 0 : y, opacity }}
      >
        {/* 墨迹装饰 */}
        <InkDecor />
        
        {/* 符文闪烁 */}
        <RuneFlicker isLowPerformance={isLowPerformance} />
        
        {/* 香火烟雾 */}
        <IncenseSmoke isLowPerformance={isLowPerformance} />
        
        {/* 烛光 */}
        <CandleGlow isLowPerformance={isLowPerformance} />
        
        {/* 光粒子 - 数量根据性能调整 */}
        <div className={styles.lightParticles}>
          {Array.from({ length: particleCount }).map((_, i) => (
            <LightParticle key={i} index={i} isLowPerformance={isLowPerformance} />
          ))}
        </div>
        
        {/* 古风标题 */}
        <AncientTitle isMobile={isMobile} />
        
        {/* 标语 */}
        <motion.p 
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {SITE_CONFIG.subtitle}
        </motion.p>
        
        {/* 滚动提示 */}
        {!isMobile && (
          <motion.div
            className={styles.scrollIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.span 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </motion.div>
        )}
      </motion.section>
      
      {/* 模块导航区域 */}
      <section className={styles.modulesSection}>
        {/* 标题 */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>
            八大修行模块
          </h2>
          <p className={styles.sectionSubtitle}>探索失落文明的奥秘</p>
        </motion.div>
        
        {/* 模块网格 - 移动端优化 */}
        <div className={styles.modulesGrid}>
          {MAIN_MODULES.map((module, index) => (
            <ModuleCard 
              key={module.id} 
              module={module} 
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>
        
        {/* 诗句横幅 */}
        <motion.div
          className={styles.poemBanner}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className={styles.poemText}>
            天行健，君子以自强不息 ｜ 地势坤，君子以厚德载物
          </p>
        </motion.div>
      </section>
      
      {/* 移动端底部导航 */}
      <MobileNav isVisible={isMobile} />
    </div>
  )
}
