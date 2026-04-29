import { useState, useEffect, useRef, useCallback } from 'react'

export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRun = useRef(Date.now())

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRun.current >= delay) {
        setThrottledValue(value)
        lastRun.current = Date.now()
      }
    }, delay - (Date.now() - lastRun.current))

    return () => clearTimeout(handler)
  }, [value, delay])

  return throttledValue
}

export function useThrottleFn<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) {
  const lastRun = useRef(0)
  const timer = useRef<NodeJS.Timeout>()

  const run = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastRun.current >= delay) {
        fn(...args)
        lastRun.current = now
      } else {
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => {
          fn(...args)
          lastRun.current = Date.now()
        }, delay)
      }
    },
    [fn, delay]
  )

  return { run }
}
