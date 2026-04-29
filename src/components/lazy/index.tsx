import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

export function createLazyComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: {
    loading?: React.ComponentType<any>
    ssr?: boolean
  } = {}
) {
  const { loading: LoadingComponent, ssr = false } = options

  return dynamic<T>(importFn, {
    ssr,
    loading: LoadingComponent
      ? () => <LoadingComponent />
      : () => (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        ),
  })
}

export const LazySixPathsWheel = createLazyComponent(
  () => import('@/components/effects/SixPathsWheel'),
  { ssr: false }
)

export const LazyAuraTideSystem = createLazyComponent(
  () => import('@/components/effects/AuraTideSystem'),
  { ssr: false }
)

export const LazyKarmaButterflyEffect = createLazyComponent(
  () => import('@/components/effects/KarmaButterflyEffect'),
  { ssr: false }
)

export const LazyTimeRiverCanvas = createLazyComponent(
  () => import('@/components/effects/TimeRiverCanvas'),
  { ssr: false }
)

export const LazyJuneFortunePanel = createLazyComponent(
  () => import('@/components/effects/JuneFortunePanel'),
  { ssr: false }
)

export const LazyDragonBoatFestival = createLazyComponent(
  () => import('@/components/effects/DragonBoatFestival'),
  { ssr: false }
)

export const LazyProphecyTimeline = createLazyComponent(
  () => import('@/components/effects/ProphecyTimeline'),
  { ssr: false }
)

export const LazyCardManaCanvas = createLazyComponent(
  () => import('@/components/effects/CardManaCanvas'),
  { ssr: false }
)

export const LazyImmortalFlowCanvas = createLazyComponent(
  () => import('@/components/effects/ImmortalFlowCanvas'),
  { ssr: false }
)

export const LazyPageTransitionShader = createLazyComponent(
  () => import('@/components/effects/PageTransitionShader'),
  { ssr: false }
)

export const LazyWebGLStarryBackground = createLazyComponent(
  () => import('@/components/background/WebGLStarryBackground'),
  { ssr: false }
)

export const LazyEpicBackground = createLazyComponent(
  () => import('@/components/background/EpicBackground'),
  { ssr: false }
)
