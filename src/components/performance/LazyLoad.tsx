'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LazyLoadProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
  minDisplayTime?: number
  fallback?: React.ReactNode
  fadeIn?: boolean
}

export function LazyLoad({
  children,
  threshold = 0.1,
  rootMargin = '200px',
  minDisplayTime = 300,
  fallback = <DefaultSkeleton />,
  fadeIn = true,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasRendered, setHasRendered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
            setHasRendered(true)
          }, minDisplayTime)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin, minDisplayTime])

  return (
    <div ref={ref}>
      <AnimatePresence mode="wait">
        {isVisible ? (
          fadeIn ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          ) : (
            <>{children}</>
          )
        ) : (
          <motion.div
            key="fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {fallback}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DefaultSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '120px',
        background: 'linear-gradient(90deg, rgba(30,41,59,0.5) 25%, rgba(51,65,85,0.5) 50%, rgba(30,41,59,0.5) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: '12px',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
        ✨ 内容加载中...
      </span>
    </div>
  )
}

interface LazyImportProps<T> {
  importFn: () => Promise<{ default: React.ComponentType<T> }>
  props?: T
  fallback?: React.ReactNode
}

export function LazyImport<T extends object>({
  importFn,
  props,
  fallback = <DefaultSkeleton />,
}: LazyImportProps<T>) {
  const [Component, setComponent] = useState<React.ComponentType<T> | null>(null)

  useEffect(() => {
    let mounted = true

    importFn().then((mod) => {
      if (mounted) {
        setComponent(() => mod.default)
      }
    })

    return () => {
      mounted = false
    }
  }, [importFn])

  if (!Component) {
    return <>{fallback}</>
  }

  return (
    <Suspense fallback={fallback}>
      <Component {...(props as T)} />
    </Suspense>
  )
}

interface DeferredRenderProps {
  children: React.ReactNode
  delay?: number
  untilIdle?: boolean
}

export function DeferredRender({
  children,
  delay = 0,
  untilIdle = true,
}: DeferredRenderProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (untilIdle && 'requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(
        () => {
          setTimeout(() => setShouldRender(true), delay)
        },
        { timeout: 1000 }
      )
      return () => window.cancelIdleCallback(handle)
    } else {
      const timer = setTimeout(() => setShouldRender(true), delay)
      return () => clearTimeout(timer)
    }
  }, [delay, untilIdle])

  return shouldRender ? <>{children}</> : null
}

export function GridLazyWrapper({ children, itemsPerBatch = 4 }: { children: React.ReactNode[]; itemsPerBatch?: number }) {
  const [renderedCount, setRenderedCount] = useState(itemsPerBatch)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRenderedCount((prev) => Math.min(prev + itemsPerBatch, children.length))
        }
      },
      { rootMargin: '400px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [children.length, itemsPerBatch])

  return (
    <>
      {children.slice(0, renderedCount)}
      {renderedCount < children.length && <div ref={ref} style={{ height: '1px' }} />}
    </>
  )
}
