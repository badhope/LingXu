'use client'

import { useEffect, useRef, useState } from 'react'
import { useClientSide } from '@/hooks/useClientSide'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
}

export function MouseTrailAdvanced() {
  const isClient = useClientSide(false, true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const animationRef = useRef<number>()
  const idCounter = useRef(0)

  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    if (!isClient || !isEnabled) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.prevX = mouse.current.x
      mouse.current.prevY = mouse.current.y
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      const speed = Math.hypot(
        mouse.current.x - mouse.current.prevX,
        mouse.current.y - mouse.current.prevY
      )

      const particleCount = Math.min(Math.floor(speed / 3), 5)
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const velocity = Math.random() * 2 + 1
        particles.current.push({
          id: idCounter.current++,
          x: mouse.current.x + (Math.random() - 0.5) * 20,
          y: mouse.current.y + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
          maxLife: 60 + Math.random() * 60,
          size: 2 + Math.random() * 3,
          hue: 35 + Math.random() * 15,
        })
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.current = particles.current.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98
        p.vy += 0.02
        p.life -= 1 / p.maxLife

        if (p.life <= 0) return false

        const alpha = p.life
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${alpha * 0.6})`
        ctx.fill()

        return true
      })

      while (particles.current.length > 300) {
        particles.current.shift()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isClient, isEnabled])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className="fixed bottom-24 right-4 z-50 px-3 py-2 rounded-lg bg-slate-800/80 backdrop-blur-sm text-xs border border-amber-500/30 hover:border-amber-500/50 transition-all"
        style={{ display: isClient ? 'block' : 'none' }}
      >
        {isEnabled ? '✨ 特效开' : '🌑 特效关'}
      </button>
    </>
  )
}

export function CardHoverGlow() {
  const isClient = useClientSide(false, true)

  useEffect(() => {
    if (!isClient) return

    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('[data-glow-card]')
      
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height
        
        if (isInside) {
          const element = card as HTMLElement
          element.style.setProperty('--mouse-x', `${x}px`)
          element.style.setProperty('--mouse-y', `${y}px`)
          element.style.setProperty('--glow-opacity', '1')
        } else {
          const element = card as HTMLElement
          element.style.setProperty('--glow-opacity', '0')
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isClient])

  return null
}

export function ParallaxMouse() {
  const isClient = useClientSide(false, true)

  useEffect(() => {
    if (!isClient) return

    const handleMouseMove = (e: MouseEvent) => {
      const elements = document.querySelectorAll('[data-parallax]')
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const mouseX = (e.clientX - centerX) / centerX
      const mouseY = (e.clientY - centerY) / centerY

      elements.forEach((el) => {
        const depth = Number(el.getAttribute('data-parallax-depth')) || 0.05
        const element = el as HTMLElement
        element.style.transform = `translate(${mouseX * depth * 100}%, ${mouseY * depth * 100}%)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isClient])

  return null
}
