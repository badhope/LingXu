'use client'

import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  usePerformance,
  useAnimationQuality,
  useParticleOptimizer,
  PerformanceGate,
} from '@/hooks/usePerformance'
import { useVisibilityCheck } from '@/hooks/useCanvasPerformance'
import { useCultivationStore } from '@/shared/stores/cultivation'

interface PerformanceWrapperProps {
  children: React.ReactNode
  name: string
  minLevel?: 'low' | 'medium' | 'high' | 'ultra'
  fallback?: React.ReactNode
}

export function PerformanceWrapper({
  children,
  name,
  minLevel = 'low',
  fallback,
}: PerformanceWrapperProps) {
  const perf = usePerformance()
  const [ref, isVisible] = useVisibilityCheck(0.05)
  const [enabled, setEnabled] = useState(true)

  const levelOrder = { low: 0, medium: 1, high: 2, ultra: 3 }
  const canRender = levelOrder[perf.level] >= levelOrder[minLevel]

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => setEnabled(false), 3000)
      return () => clearTimeout(timer)
    } else {
      setEnabled(true)
    }
  }, [isVisible])

  if (!canRender) {
    return (
      <>{fallback || null}</>
    )
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      {(enabled || isVisible) ? children : (
        <div className="py-8 text-center text-gray-500 text-sm">
          ✨ {name} - 滚动到可视区域自动激活
        </div>
      )}
    </div>
  )
}

export function ParticleCountWrapper({
  baseCount = 200,
  children,
}: {
  baseCount?: number
  children: (optimizedCount: number, perfLevel: string) => React.ReactNode
}) {
  const perf = usePerformance()
  const count = useParticleOptimizer({ baseCount })

  return <>{children(count, perf.level)}</>
}

export function AnimationGate({ children }: { children: React.ReactNode }) {
  const quality = useAnimationQuality()

  if (!quality.animate) {
    return <>{children}</>
  }

  return <>{children}</>
}

export function withVipCheck<T extends object>(
  Component: React.ComponentType<T>,
  requiredVip = false
) {
  return function VipWrappedComponent(props: T) {
    const canAccess = useCultivationStore((state) =>
      requiredVip ? state.user?.vip : true
    )

    if (!canAccess) {
      return (
        <div className="py-12 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2">VIP专属功能</h3>
          <p className="text-gray-500 mb-6">此功能仅限VIP会员使用</p>
        </div>
      )
    }

    return <Component {...props} />
  }
}

export function SystemInfoBar() {
  const perf = usePerformance()
  const fpsRef = useRef<HTMLDivElement>(null)
  const [fps, setFps] = useState(60)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    const measure = () => {
      frameCount.current++
      const now = performance.now()

      if (now - lastTime.current >= 1000) {
        setFps(frameCount.current)
        frameCount.current = 0
        lastTime.current = now
      }
      requestAnimationFrame(measure)
    }

    const id = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(id)
  }, [])

  const levelColors: Record<string, string> = {
    low: 'bg-red-500',
    medium: 'bg-yellow-500',
    high: 'bg-green-500',
    ultra: 'bg-blue-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50 text-xs"
    >
      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 space-y-1 border border-white/10">
        <div className="flex items-center gap-2">
          <span className={`px-1.5 py-0.5 rounded text-white font-bold ${levelColors[perf.level]}`}>
            {perf.level.toUpperCase()}
          </span>
          <span className="text-gray-300">性能等级</span>
        </div>
        <div className="text-gray-400">
          📈 FPS: <span className={fps >= 50 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>{fps}</span>
        </div>
        <div className="text-gray-400">
          ✨ 粒子上限: {perf.particleLimit}
        </div>
        <div className="text-gray-400">
          🎬 3D: {perf.enable3D ? '✅' : '❌'}
        </div>
        <div className="text-gray-400">
          📱 设备: {perf.isMobile ? '移动端' : '桌面端'}
        </div>
      </div>
    </motion.div>
  )
}

export function CultivationStatusBar() {
  const { user, totalCultivation } = useCultivationStore()
  const progress = useCultivationStore((state) => {
    const level = user?.level || 1
    const cultivation = user?.cultivation || 0
    const nextLevel = level * 1000
    return Math.min((cultivation / nextLevel) * 100, 100)
  })

  if (!user) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-20 right-4 z-40"
    >
      <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-gold/20">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🧘</div>
          <div>
            <div className="font-bold text-gold">练气 {user.level} 层</div>
            <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-gold"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {user.cultivation || 0} / {user.level * 1000}
            </div>
          </div>
          {user.vip && (
            <div className="px-2 py-0.5 bg-gradient-to-r from-gold to-yellow-600 rounded text-xs font-bold text-black">
              VIP
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
