'use client'

import { useEffect, useRef, useState } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPullRefresh?: () => void | Promise<void>
  minDistance?: number
}

interface TouchState {
  startX: number
  startY: number
  currentX: number
  currentY: number
  isPulling: boolean
  pullDistance: number
}

export function useTouchGestures(
  ref: React.RefObject<HTMLElement>,
  handlers: SwipeHandlers
) {
  const touchState = useRef<TouchState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    isPulling: false,
    pullDistance: 0,
  })

  const [pullProgress, setPullProgress] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    minDistance = 50,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPullRefresh,
  } = handlers

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchState.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        currentY: touch.clientY,
        isPulling: window.scrollY <= 0 && touch.clientY < 100,
        pullDistance: 0,
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchState.current.currentX = touch.clientX
      touchState.current.currentY = touch.clientY

      if (touchState.current.isPulling && onPullRefresh) {
        const deltaY = touch.clientY - touchState.current.startY
        if (deltaY > 0 && window.scrollY <= 0) {
          const pullDistance = Math.min(deltaY * 0.5, 100)
          touchState.current.pullDistance = pullDistance
          setPullProgress(pullDistance / 100)
        }
      }
    }

    const handleTouchEnd = () => {
      const { startX, startY, currentX, currentY, pullDistance } = touchState.current

      const deltaX = currentX - startX
      const deltaY = currentY - startY

      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      if (pullDistance > 60 && onPullRefresh) {
        setIsRefreshing(true)
        Promise.resolve(onPullRefresh()).then(() => {
          setIsRefreshing(false)
          setPullProgress(0)
        })
        touchState.current.isPulling = false
        return
      }

      setPullProgress(0)
      touchState.current.isPulling = false

      if (Math.max(absX, absY) < minDistance) return

      if (absX > absY) {
        if (deltaX > 0) onSwipeRight?.()
        else onSwipeLeft?.()
      } else {
        if (deltaY > 0) onSwipeDown?.()
        else onSwipeUp?.()
      }
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [ref, minDistance, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPullRefresh])

  return { pullProgress, isRefreshing }
}

interface PullToRefreshProps {
  onRefresh: () => void | Promise<void>
  children: React.ReactNode
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { pullProgress, isRefreshing } = useTouchGestures(containerRef, {
    onPullRefresh: onRefresh,
    minDistance: 60,
  })

  return (
    <div ref={containerRef} className="relative">
      <div
        style={{
          height: `${pullProgress * 80}px`,
          opacity: pullProgress,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          transition: isRefreshing ? 'none' : 'all 0.3s ease',
        }}
      >
        <div className="text-amber-400 text-center">
          {isRefreshing ? (
            <div className="animate-spin text-2xl">☯️</div>
          ) : pullProgress > 0.6 ? (
            <span className="text-sm">🙏 释放刷新</span>
          ) : pullProgress > 0 ? (
            <span className="text-sm">👇 下拉刷新</span>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  )
}

export function useSwipeNavigation(
  ref: React.RefObject<HTMLElement>,
  routes: { left?: string; right?: string; up?: string; down?: string }
) {
  const isClient = typeof window !== 'undefined'
  
  return useTouchGestures(ref, {
    onSwipeLeft: isClient && routes.left ? () => { if(routes.left) window.location.href = routes.left } : undefined,
    onSwipeRight: isClient && routes.right ? () => { if(routes.right) window.location.href = routes.right } : undefined,
    onSwipeUp: isClient && routes.up ? () => { if(routes.up) window.location.href = routes.up } : undefined,
    onSwipeDown: isClient && routes.down ? () => { if(routes.down) window.location.href = routes.down } : undefined,
  })
}
