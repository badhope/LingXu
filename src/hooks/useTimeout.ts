import { useState, useEffect, useCallback, useRef } from 'react'

export function useTimeout(callback: () => void, delay: number | null) {
  const [isReady, setIsReady] = useState<boolean>(null!)

  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (delay === null) return

    const timer = setTimeout(() => {
      callbackRef.current()
      setIsReady(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return isReady
}
