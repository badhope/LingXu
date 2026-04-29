import { useRef, useEffect, useCallback, useMemo, useState, MutableRefObject } from 'react'
import { usePerformance, useParticleOptimizer } from '@/hooks/usePerformance'

interface Particle {
  x: number
  y: number
  z?: number
  vx: number
  vy: number
  life?: number
}

interface CanvasPoolItem {
  key: string
  ctx: CanvasRenderingContext2D
  particles: Particle[]
  active: boolean
}

export class CanvasPerformanceManager {
  private canvasPool: Map<CanvasRenderingContext2D, CanvasPoolItem> = new Map()
  private animationFrames: Map<string, number> = new Map()
  private targetFps: number = 60

  constructor(targetFps: number = 60) {
    this.targetFps = targetFps
  }

  registerCanvas(key: string, canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    this.canvasPool.set(ctx, {
      key,
      ctx,
      particles: [],
      active: true,
    })
    return ctx
  }

  unregisterCanvas(ctx: CanvasRenderingContext2D) {
    this.canvasPool.delete(ctx)
    const animId = this.animationFrames.get(ctx.canvas.id)
    if (animId) cancelAnimationFrame(animId)
  }

  throttledRAF(
    key: string,
    callback: (delta: number) => void,
    throttleMs: number = 16
  ): number {
    let lastCall = 0

    const animate = () => {
      const now = performance.now()
      if (now - lastCall >= throttleMs) {
        callback(now - lastCall)
        lastCall = now
      }
      const id = requestAnimationFrame(animate)
      this.animationFrames.set(key, id)
    }

    const id = requestAnimationFrame(animate)
    this.animationFrames.set(key, id)
    return id
  }

  clearAll() {
    this.animationFrames.forEach((id) => cancelAnimationFrame(id))
    this.animationFrames.clear()
    this.canvasPool.clear()
  }

  getStats() {
    return {
      activeCanvases: this.canvasPool.size,
      activeAnimations: this.animationFrames.size,
    }
  }
}

const globalManager = new CanvasPerformanceManager(60)

export function useCanvasPerformance() {
  const perf = usePerformance()

  const batchDraw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      particles: Particle[],
      drawFn: (p: Particle, ctx: CanvasRenderingContext2D) => void
    ) => {
        const step = perf.level === 'low' ? 3 : perf.level === 'medium' ? 2 : 1

        for (let i = 0; i < particles.length; i += step) {
          drawFn(particles[i], ctx)
        }
      },
    [perf.level]
  )

  const safeCleanup = useCallback(
    (
      canvasRef: MutableRefObject<HTMLCanvasElement | null>,
      animRef: MutableRefObject<number | null>,
      particlesRef: MutableRefObject<unknown[]>
    ) => {
      return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          globalManager.unregisterCanvas(ctx)
        }
        canvas.width = 1
        canvas.height = 1
      }
      particlesRef.current = []
    }
  }, [])

  return {
    batchDraw,
    safeCleanup,
    particleLimit: perf.particleLimit,
    enableShaders: perf.enableShaders,
    globalManager,
    perfLevel: perf.level,
  }
}

export function useParticleSystem(particleCount: number) {
  const optimizedCount = useParticleOptimizer({ baseCount: particleCount })

  const createParticles = useCallback(
    (width: number, height: number, depth = false): Particle[] => {
      const particles: Particle[] = []

      for (let i = 0; i < optimizedCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: depth ? Math.random() * 100 : undefined,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
        })
      }

      return particles
    },
    [optimizedCount]
  )

  const updateParticles = useCallback(
    (particles: Particle[], width: number, height: number) => {
      const bounds = { w: width, h: height }
      return particles.map((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > bounds.w) p.vx *= -1
        if (p.y < 0 || p.y > bounds.h) p.vy *= -1

        return p
      })
    },
    []
  )

  return {
    particleCount: optimizedCount,
    createParticles,
    updateParticles,
  }
}

export function useSmoothDeltaTime(factor = 0.1) {
  const valueRef = useRef(0)

  return useCallback(
    (targetValue: number) => {
      valueRef.current += (targetValue - valueRef.current) * factor
      return valueRef.current
    },
    [factor]
  )
}

export function useVisibilityCheck(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible] as const
}
