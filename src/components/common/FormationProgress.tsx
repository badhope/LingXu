'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from './FormationProgress.module.scss'

/**
 * ⚡「阵法充能」进度条组件
 * 页面跳转时自动显示，修仙主题化的加载指示器
 * 解决客户端水合问题，独立封装
 */
export default function FormationProgress() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    let progressTimer: NodeJS.Timeout | null = null

    const handleStart = () => {
      setIsVisible(true)
      setProgress(0)

      progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev < 90) {
            return prev + Math.random() * 12
          }
          return prev
        })
      }, 120)
    }

    const handleComplete = () => {
      setProgress(100)
      if (progressTimer) clearInterval(progressTimer)

      setTimeout(() => {
        setIsVisible(false)
        setProgress(0)
      }, 400)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      if (progressTimer) clearInterval(progressTimer)
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  if (!isMounted || !isVisible) return null

  return (
    <div className={styles.progressBar} style={{ width: `${Math.min(progress, 100)}%` }} />
  )
}
