import { useEffect, useRef } from 'react'

export function useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList
) {
  const isFirst = useRef(true)
  const effectRef = useRef(effect)
  effectRef.current = effect

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    return effectRef.current()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
