import { useState, useCallback } from 'react'

interface UseCounterOptions {
  min?: number
  max?: number
  step?: number
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity, step = 1 } = options
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => {
    setCount(c => Math.min(c + step, max))
  }, [max, step])

  const decrement = useCallback(() => {
    setCount(c => Math.max(c - step, min))
  }, [min, step])

  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])

  const set = useCallback((value: number) => {
    setCount(Math.max(min, Math.min(value, max)))
  }, [min, max])

  return [count, { increment, decrement, reset, set }] as const
}
