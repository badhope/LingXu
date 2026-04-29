import { useEffect, useRef } from 'react'

export function useInterval(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (delay === null) return

    const timer = setInterval(() => callbackRef.current(), delay)
    return () => clearInterval(timer)
  }, [delay])
}
