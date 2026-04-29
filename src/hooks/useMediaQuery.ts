import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '@/styles/tokens'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

export function useBreakpoints() {
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm})`)
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.md})`)
  const isLg = useMediaQuery(`(min-width: ${BREAKPOINTS.lg})`)
  const isXl = useMediaQuery(`(min-width: ${BREAKPOINTS.xl})`)
  const is2xl = useMediaQuery(`(min-width: ${BREAKPOINTS['2xl']})`)

  return { isSm, isMd, isLg, isXl, is2xl, isMobile: !isMd }
}
