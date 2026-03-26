/**
 * 灵墟 - 主页
 */

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'
import HomePage from '@/components/layout/HeroSection'
import { useAppStore } from '@/stores/appStore'

export default function Home() {
  const router = useRouter()
  const isSplashCompleted = useAppStore(state => state.isSplashCompleted)
  
  // 如果未完成启动，跳转到启动页
  useEffect(() => {
    if (!isSplashCompleted) {
      router.replace('/')
    }
  }, [isSplashCompleted, router])
  
  return (
    <Layout 
      title="首页"
      transparentNav
    >
      <HomePage />
    </Layout>
  )
}
