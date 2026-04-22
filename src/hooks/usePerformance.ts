'use client'

import { useEffect, useRef, useMemo, useCallback } from 'react'

export function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  const timer = useRef<NodeJS.Timeout>()

  return useCallback((...args: Parameters<T>) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => fn(...args), delay)
  }, [fn, delay])
}

export function useThrottle<T extends (...args: any[]) => void>(fn: T, limit: number) {
  const lastRun = useRef(0)
  const timer = useRef<NodeJS.Timeout>()

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastRun.current >= limit) {
      fn(...args)
      lastRun.current = now
    } else {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        fn(...args)
        lastRun.current = Date.now()
      }, limit)
    }
  }, [fn, limit])
}

export function useStableValue<T>(value: T, isEqual?: (a: T, b: T) => boolean) {
  const ref = useRef(value)
  const isEqualRef = useRef(isEqual)
  isEqualRef.current = isEqual

  return useMemo(() => {
    const equal = isEqualRef.current ?? ((a: T, b: T) => a === b)
    if (!equal(ref.current, value)) {
      ref.current = value
    }
    return ref.current
  }, [value])
}

export function useRenderCounter(componentName: string) {
  const count = useRef(0)
  count.current++
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Render] ${componentName}:`, count.current)
    }
  })
}

export function useAnimationFrame(callback: (delta: number) => void) {
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const delta = time - previousTimeRef.current
      callbackRef.current(delta)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animate])
}

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)
  savedCallback.current = callback

  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

export function useMemoWithCompare<T>(factory: () => T, deps: any[], compareFn: (prev: any[], next: any[]) => boolean) {
  const ref = useRef<{ deps: any[]; value: T }>()

  if (!ref.current || !compareFn(ref.current.deps, deps)) {
    ref.current = {
      deps,
      value: factory(),
    }
  }

  return ref.current.value
}
