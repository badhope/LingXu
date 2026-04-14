/**
 * 灵墟 - App 入口（增强版）
 * 页面过渡动画 + 全局状态
 */

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import '@/styles/globals.css'
import '@/styles/xianxia.scss'

// 页面过渡配置
const pageTransition = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  enter: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.98,
    transition: { 
      duration: 0.3, 
      ease: 'easeInOut' 
    }
  }
}

// 过渡遮罩组件
function TransitionOverlay() {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 1 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
        transformOrigin: 'bottom',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    />
  )
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 页面切换时的处理
  useEffect(() => {
    const handleStart = () => setIsTransitioning(true)
    const handleComplete = () => setIsTransitioning(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageTransition}
      >
        <Component {...pageProps} />
      </motion.div>
      {isTransitioning && <TransitionOverlay />}
    </AnimatePresence>
  )
}
