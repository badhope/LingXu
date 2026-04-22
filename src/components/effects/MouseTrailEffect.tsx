'use client'

import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
}

export default function MouseTrailEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)
  const lastEmitRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const dx = e.clientX - mouseRef.current.x
      const dy = e.clientY - mouseRef.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      mouseRef.current = { x: e.clientX, y: e.clientY }

      if (now - lastEmitRef.current > 16 && speed > 2) {
        lastEmitRef.current = now
        
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 10,
            y: e.clientY + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 2 + dx * 0.05,
            vy: (Math.random() - 0.5) * 2 + dy * 0.05,
            life: 1,
            maxLife: 60 + Math.random() * 40,
            size: 2 + Math.random() * 4,
            hue: 35 + Math.random() * 15,
          })
        }

        if (particlesRef.current.length > 100) {
          particlesRef.current = particlesRef.current.slice(-100)
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= 1 / p.maxLife
        if (p.life <= 0.01) return false

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98
        p.vy -= 0.02

        const alpha = Math.max(0, p.life * 0.8)
        const size = Math.max(0.1, p.size * p.life)

        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${alpha})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 50%, ${alpha * 0.3})`
        ctx.fill()

        return p.life > 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

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
