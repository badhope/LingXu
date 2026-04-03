/**
 * 灵墟首页入口
 */

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './home'
import styles from './index.module.scss'

// 启动画面组件
function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div 
      className={styles.splash}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 中心符文 */}
      <motion.div 
        className={styles.splashRune}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.span
          animate={{ 
            rotate: [0, 360],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            opacity: { duration: 2, repeat: Infinity }
          }}
        >
          ☯
        </motion.span>
      </motion.div>
      
      {/* 标题 */}
      <motion.h1 
        className={styles.splashTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        靈墟
      </motion.h1>
      
      {/* 副标题 */}
      <motion.p 
        className={styles.splashSubtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        末法时代 · 失落修行文明档案馆
      </motion.p>
      
      {/* 加载指示器 */}
      <motion.div 
        className={styles.splashLoader}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.span
          animate={{ 
            width: ['0%', '100%']
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            display: 'block',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #c9a227, transparent)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function IndexPage() {
  const [showSplash, setShowSplash] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    
    // 移动端跳过启动画面以提升体验
    if (window.innerWidth < 768) {
      const timer = setTimeout(() => setShowSplash(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {showSplash && !isMobile ? (
        <SplashScreen 
          key="splash"
          onComplete={() => setShowSplash(false)} 
        />
      ) : (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Home />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
