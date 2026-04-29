import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useMounted } from './useClientSide'

type PerformanceLevel = 'low' | 'medium' | 'high' | 'ultra'

interface PerformanceInfo {
  level: PerformanceLevel
  score: number
  isMobile: boolean
  isLowEnd: boolean
  memory: number
  cpu: number
  gpu: string | null
  particleLimit: number
  enable3D: boolean
  enableShaders: boolean
  animationQuality: 'none' | 'basic' | 'full'
}

const DEFAULTS: PerformanceInfo = {
  level: 'medium',
  score: 50,
  isMobile: false,
  isLowEnd: false,
  memory: 4,
  cpu: 4,
  gpu: null,
  particleLimit: 200,
  enable3D: true,
  enableShaders: true,
  animationQuality: 'full',
}

function detectHardware() {
  if (typeof navigator === 'undefined') return DEFAULTS

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )

  const memory = (navigator as any).deviceMemory || 4
  const cpu = navigator.hardwareConcurrency || 4

  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  const gpu = gl ? (gl as any).getExtension('WEBGL_debug_renderer_info')?.getParameter(
    (gl as any).UNMASKED_RENDERER_WEBGL
  ) : null

  return { isMobile, memory, cpu, gpu }
}

function calculateScore({ isMobile, memory, cpu }: {
  isMobile: boolean
  memory: number
  cpu: number
}): { score: number; level: PerformanceLevel } {
  let score = 50

  if (memory >= 16) score += 25
  else if (memory >= 8) score += 15
  else if (memory >= 6) score += 5
  else if (memory < 4) score -= 20

  if (cpu >= 12) score += 25
  else if (cpu >= 8) score += 15
  else if (cpu >= 6) score += 5
  else if (cpu < 4) score -= 20

  if (isMobile) {
    score = Math.floor(score * 0.7)
  }

  let level: PerformanceLevel
  if (score >= 85) level = 'ultra'
  else if (score >= 65) level = 'high'
  else if (score >= 40) level = 'medium'
  else level = 'low'

  return { score, level }
}

function deriveSettings(info: PerformanceInfo): PerformanceInfo {
  const settings = { ...info }

  switch (info.level) {
    case 'ultra':
      settings.particleLimit = 500
      settings.enable3D = true
      settings.enableShaders = true
      settings.animationQuality = 'full'
      break
    case 'high':
      settings.particleLimit = 300
      settings.enable3D = true
      settings.enableShaders = true
      settings.animationQuality = 'full'
      break
    case 'medium':
      settings.particleLimit = 150
      settings.enable3D = !info.isMobile
      settings.enableShaders = !info.isMobile
      settings.animationQuality = 'basic'
      break
    case 'low':
      settings.particleLimit = 50
      settings.enable3D = false
      settings.enableShaders = false
      settings.animationQuality = 'none'
      break
  }

  return settings
}

export function usePerformance(): PerformanceInfo & {
  overrideLevel: (level: PerformanceLevel) => void
} {
  const mounted = useMounted()
  const [override, setOverride] = useState<PerformanceLevel | null>(null)
  const [perfInfo, setPerfInfo] = useState<PerformanceInfo>(DEFAULTS)

  useEffect(() => {
    const hardware = detectHardware()
    const { score, level } = calculateScore(hardware)
    const isLowEnd = score < 40

    const baseInfo: PerformanceInfo = {
      ...DEFAULTS,
      ...hardware,
      score,
      level,
      isLowEnd,
    }

    setPerfInfo(deriveSettings(baseInfo))
  }, [])

  const overrideLevel = useCallback((level: PerformanceLevel) => {
    setOverride(level)
  }, [])

  const finalInfo = useMemo(() => {
    if (!override) return perfInfo

    return deriveSettings({
      ...perfInfo,
      level: override,
    })
  }, [perfInfo, override])

  return {
    ...finalInfo,
    overrideLevel,
  }
}

export function useFpsCounter(): number {
  const [fps, setFps] = useState(60)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    let animationId: number

    const measure = () => {
      frameCount.current++
      const now = performance.now()

      if (now - lastTime.current >= 1000) {
        setFps(frameCount.current)
        frameCount.current = 0
        lastTime.current = now
      }

      animationId = requestAnimationFrame(measure)
    }

    animationId = requestAnimationFrame(measure)

    return () => cancelAnimationFrame(animationId)
  }, [])

  return fps
}

export function useThrottleByFps<T extends (...args: any[]) => any>(
  callback: T,
  targetFps = 30
): T {
  const lastCall = useRef(0)
  const interval = 1000 / targetFps

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = performance.now()
      if (now - lastCall.current >= interval) {
        lastCall.current = now
        return callback(...args)
      }
    }) as T,
    [callback, interval]
  ) as T
}

export function useRafThrottle<T extends (...args: any[]) => any>(callback: T): T {
  const rafId = useRef<number | null>(null)

  return useCallback(
    ((...args: Parameters<T>) => {
      if (rafId.current !== null) return

      rafId.current = requestAnimationFrame(() => {
        callback(...args)
        rafId.current = null
      })
    }) as T,
    [callback]
  ) as T
}

interface ParticleOptimizerOptions {
  baseCount: number
  maxCount?: number
  minCount?: number
}

export function useParticleOptimizer(options: ParticleOptimizerOptions): number {
  const { baseCount, maxCount = 1000, minCount = 20 } = options
  const perf = usePerformance()

  return useMemo(() => {
    const ratio = {
      ultra: 1.5,
      high: 1.0,
      medium: 0.6,
      low: 0.3,
    }[perf.level]

    const optimized = Math.floor(baseCount * ratio)

    return Math.max(minCount, Math.min(maxCount, optimized))
  }, [baseCount, maxCount, minCount, perf.level])
}

export function useAnimationQuality(): {
  animate: boolean
  transition: boolean
  particles: boolean
  glow: boolean
  parallax: boolean
} {
  const perf = usePerformance()

  return useMemo(() => {
    switch (perf.animationQuality) {
      case 'full':
        return {
          animate: true,
          transition: true,
          particles: true,
          glow: true,
          parallax: true,
        }
      case 'basic':
        return {
          animate: true,
          transition: true,
          particles: perf.score > 50,
          glow: perf.score > 50,
          parallax: false,
        }
      case 'none':
      default:
        return {
          animate: false,
          transition: false,
          particles: false,
          glow: false,
          parallax: false,
        }
    }
  }, [perf])
}

export function PerformanceGate({
  minLevel = 'medium',
  children,
  fallback = null,
}: {
  minLevel?: PerformanceLevel
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const perf = usePerformance()

  const levelOrder = { low: 0, medium: 1, high: 2, ultra: 3 }
  const canRender = levelOrder[perf.level] >= levelOrder[minLevel]

  return canRender ? children : fallback
}
