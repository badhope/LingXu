import { useEffect, useRef } from 'react'

export function useMount(fn: () => void) {
  const fnRef = useRef(fn)
  fnRef.current = fn

  useEffect(() => {
    fnRef.current()
  }, [])
}
