import { useState, useRef, useEffect } from 'react'

export function useFocus<T extends HTMLElement = HTMLElement>() {
  const [isFocused, setIsFocused] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    const node = ref.current
    if (node) {
      node.addEventListener('focus', handleFocus)
      node.addEventListener('blur', handleBlur)

      return () => {
        node.removeEventListener('focus', handleFocus)
        node.removeEventListener('blur', handleBlur)
      }
    }
  }, [])

  return [ref, isFocused] as const
}
