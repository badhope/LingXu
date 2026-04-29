import { useState, useEffect } from 'react'

interface ScrollPosition {
  x: number
  y: number
  direction: 'up' | 'down' | 'left' | 'right' | null
}

export function useScroll(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
  })

  useEffect(() => {
    let lastY = 0
    let lastX = 0

    const handleScroll = () => {
      const currentY = window.scrollY
      const currentX = window.scrollX

      let direction: ScrollPosition['direction'] = null
      if (currentY > lastY) direction = 'down'
      else if (currentY < lastY) direction = 'up'
      else if (currentX > lastX) direction = 'right'
      else if (currentX < lastX) direction = 'left'

      setPosition({ x: currentX, y: currentY, direction })
      lastY = currentY
      lastX = currentX
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return position
}
