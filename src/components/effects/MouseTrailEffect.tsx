'use client'

import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'

interface Particle {
  x: number
  y: number
  life: number
  maxLife: number
  size: number
}

export default function MouseTrailEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)
  const lastEmitRef = useRef(0)
  const enabledRef = useRef(true)

  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (!enabled) {
      enabledRef.current = false
      return
    }
    enabledRef.current = true

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })

    const handleMouseMove = (e: MouseEvent) => {
      if (!enabledRef.current) return

      const now = performance.now()
      const dx = e.clientX - mouseRef.current.x
      const dy = e.clientY - mouseRef.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      mouseRef.current = { x: e.clientX, y: e.clientY }

      if (now - lastEmitRef.current > 24 && speed > 5) {
        lastEmitRef.current = now

        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          life: 1,
          maxLife: 25 + Math.random() * 15,
          size: 1.5 + Math.random() * 2,
        })

        if (particlesRef.current.length > 32) {
          particlesRef.current = particlesRef.current.slice(-32)
        }
      }
    }

    let frameCount = 0
    const animate = () => {
      if (!enabledRef.current) return

      frameCount++

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const len = particlesRef.current.length
      for (let i = len - 1; i >= 0; i--) {
        const p = particlesRef.current[i]
        p.life -= 1 / p.maxLife

        if (p.life <= 0.02) {
          particlesRef.current.splice(i, 1)
          continue
        }

        const alpha = p.life * 0.6
        const size = p.size * p.life

        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 162, 39, ${alpha})`
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [enabled])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 't') {
        setEnabled(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }}
    />
  )
}

export function injectMouseTrailEffect() {
  if (typeof window === 'undefined') return

  const existing = document.getElementById('mouse-trail-root')
  if (existing) return

  const root = document.createElement('div')
  root.id = 'mouse-trail-root'
  document.body.appendChild(root)

  createRoot(root).render(<MouseTrailEffect />)
}
