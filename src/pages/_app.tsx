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
import '@/styles/xianxia-css3.scss'
import PageTransitionShader from '@/components/effects/PageTransitionShader'
import FormationProgress from '@/components/common/FormationProgress'

const pageTransition = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  enter: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.98,
    transition: { duration: 0.3, ease: 'easeInOut' }
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
    <>
      <FormationProgress />
      
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
      
      <PageTransitionShader active={isTransitioning} type={transitionType} />
    </>
  )
}
