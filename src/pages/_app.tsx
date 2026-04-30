/**
 * 灵墟 - App 入口（超级智能体增强版）
 * 错误边界 + SEO + 性能监控 + 特效 + 全局状态
 */

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import '@/styles/globals.css'
import '@/styles/xianxia.scss'
import '@/styles/xianxia-css3.scss'
import PageTransitionShader from '@/components/effects/PageTransitionShader'
import { PerformanceMonitor } from '@/lib/analytics'
import { SEO } from '@/components/common/SEO'
import { ErrorBoundary, GlobalErrorHandler } from '@/components/common/ErrorBoundary'
import { MouseTrailAdvanced, CardHoverGlow, ParallaxMouse } from '@/components/effects/MouseEffects'
import FormationProgress from '@/components/common/FormationProgress'
import { KeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import Layout from '@/components/layout/Layout'
import { ThemeProvider } from '@/context/ThemeContext'

const pageTransition = {
  initial: { opacity: 0, y: 12, scale: 0.985 },
  enter: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -8, 
    scale: 0.99,
    transition: { duration: 0.2, ease: 'easeInOut' }
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsTransitioning(true)
    const handleComplete = () => setTimeout(() => setIsTransitioning(false), 300)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  const transitionType = useState(() => Math.floor(Math.random() * 4))[0]

  return (
    <ThemeProvider>
      <SEO />
      <GlobalErrorHandler />
      <PerformanceMonitor />
      <KeyboardShortcuts />
      <FormationProgress />
      <MouseTrailAdvanced />
      <CardHoverGlow />
      <ParallaxMouse />
      
      <ErrorBoundary>
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
        </AnimatePresence>
      </ErrorBoundary>
      
      <PageTransitionShader active={isTransitioning} type={transitionType} />
    </ThemeProvider>
  )
}
