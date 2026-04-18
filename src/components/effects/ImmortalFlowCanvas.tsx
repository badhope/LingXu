'use client'

import { useEffect, useRef } from 'react'

interface FlowParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  alpha: number
  hue: number
  trail: { x: number; y: number }[]
}

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
  hue: number
}

export default function ImmortalFlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<FlowParticle[]>([])
  const ripplesRef = useRef<Ripple[]>([])
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const createParticle = (x?: number, y?: number): FlowParticle => {
      const actualX = x ?? Math.random() * canvas.width
      const actualY = y ?? canvas.height + 50
      return {
        x: actualX,
        y: actualY,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.5 - Math.random() * 0.8,
        life: 0,
        maxLife: 180 + Math.random() * 120,
        size: 1.5 + Math.random() * 2,
        alpha: 0.25 + Math.random() * 0.15,
        hue: 210 + Math.random() * 50,
        trail: [],
      }
    }

    const createRipple = (x: number, y: number): Ripple => ({
      x,
      y,
      radius: 3,
      maxRadius: 50 + Math.random() * 30,
      alpha: 0.25,
      hue: 220 + Math.random() * 30,
    })

    for (let i = 0; i < 25; i++) {
      particlesRef.current.push(createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ))
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      
      const dx = e.clientX - mouseRef.current.lastX
      const dy = e.clientY - mouseRef.current.lastY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance > 50) {
        ripplesRef.current.push(createRipple(e.clientX, e.clientY))
        mouseRef.current.lastX = e.clientX
        mouseRef.current.lastY = e.clientY
        
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push(createParticle(
            e.clientX + (Math.random() - 0.5) * 20,
            e.clientY + (Math.random() - 0.5) * 20
          ))
        }
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    const update = () => {
      time += 0.016

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.globalCompositeOperation = 'screen'

      particlesRef.current = particlesRef.current.filter((p) => {
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 8) p.trail.shift()

        p.x += p.vx + Math.sin(time * 1.5 + p.y * 0.008) * 0.25
        p.y += p.vy
        p.life++

        const lifeRatio = p.life / p.maxLife
        const fadeIn = Math.min(lifeRatio * 6, 1)
        const fadeOut = 1 - Math.pow(lifeRatio, 3)
        const currentAlpha = p.alpha * fadeIn * fadeOut

        if (p.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(p.trail[0].x, p.trail[0].y)
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y)
          }
          ctx.strokeStyle = `hsla(${p.hue}, 35%, 45%, ${currentAlpha * 0.2})`
          ctx.lineWidth = p.size * 0.35
          ctx.stroke()
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        gradient.addColorStop(0, `hsla(${p.hue}, 50%, 55%, ${currentAlpha})`)
        gradient.addColorStop(0.5, `hsla(${p.hue}, 40%, 45%, ${currentAlpha * 0.35})`)
        gradient.addColorStop(1, `hsla(${p.hue}, 30%, 35%, 0)`)
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        return p.life < p.maxLife
      })

      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.radius += 1.2
        r.alpha -= 0.008

        if (r.alpha <= 0) return false

        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${r.hue}, 40%, 45%, ${r.alpha})`
        ctx.lineWidth = 1 + (1 - r.radius / r.maxRadius) * 1.5
        ctx.stroke()

        return true
      })

      while (particlesRef.current.length < 35 && Math.random() < 0.05) {
        particlesRef.current.push(createParticle())
      }

      animationId = requestAnimationFrame(update)
    }

    update()

    return () => {
      cancelAnimationFrame(animationId)
      
      // ✅ 强制彻底清空Canvas - 解决"一半格子卡住"核心bug！
      try {
        const canvas = canvasRef.current
        if (canvas) {
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.globalCompositeOperation = 'source-over'
            ctx.clearRect(0, 0, canvas.width, canvas.height)
          }
          canvas.width = 0
          canvas.height = 0
        }
      } catch (e) {}
      
      window.removeEventListener('resize', resize)
      canvas?.removeEventListener('mousemove', handleMouseMove)
      particlesRef.current = []
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        mixBlendMode: 'screen',
        opacity: 0.6,
      }}
    />
  )
}
