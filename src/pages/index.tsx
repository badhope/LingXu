/**
 * 灵墟 - 首页入口
 * 自动跳转到启动页或主页
 */

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppStore } from '@/stores/appStore'
import SplashScreen from '@/components/splash/SplashScreen'

export default function IndexPage() {
  const router = useRouter()
  const isSplashCompleted = useAppStore(state => state.isSplashCompleted)
  
  // 如果已完成启动，跳转到主页
  useEffect(() => {
    if (isSplashCompleted) {
      router.replace('/home')
    }
  }, [isSplashCompleted, router])
  
  // 显示启动页
  if (!isSplashCompleted) {
    return <SplashScreen autoRedirect />
  }
  
  // 加载中
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0f',
      color: '#c9a227',
    }}>
      加载中...
    </div>
  )
}
