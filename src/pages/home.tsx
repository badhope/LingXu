/**
 * 灵墟首页 - 移动端优化版
 */

import { useEffect } from 'react'
import HeroSection from '@/components/layout/HeroSection'
import styles from './home.module.scss'

export default function HomePage() {
  // 预加载字体
  useEffect(() => {
    // 预加载楷体字体
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  return (
    <main className={styles.main}>
      <HeroSection />
    </main>
  )
}
