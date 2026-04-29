import { useState, useEffect, useRef, useCallback } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) {
  const timer = useRef<NodeJS.Timeout>()

  const run = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => fn(...args), delay)
    },
    [fn, delay]
  )

  const cancel = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  return { run, cancel }
}
