import React, { useRef, useEffect } from 'react'
import { COLORS } from '@/styles/tokens'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

interface ParticleFieldProps {
  type?: 'stars' | 'fire' | 'water' | 'gold' | 'spiritual'
  density?: number
  speed?: number
  interactive?: boolean
}

const ParticleField: React.FC<ParticleFieldProps> = ({
  type = 'spiritual',
  density = 1,
  speed = 1,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)

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

    const configs = {
      stars: {
        colors: [COLORS.gray50, COLORS.cyan, COLORS.blue],
        baseSize: [0.5, 2.5],
        baseSpeed: 0.1,
      },
      fire: {
        colors: [COLORS.red, COLORS.orange, COLORS.amber, COLORS.gold],
        baseSize: [2, 6],
        baseSpeed: 0.8,
      },
      water: {
        colors: [COLORS.cyan, COLORS.blue, COLORS.teal],
        baseSize: [1, 4],
        baseSpeed: 0.3,
      },
      gold: {
        colors: [COLORS.gold, COLORS.amber, COLORS.amber],
        baseSize: [1, 3],
        baseSpeed: 0.2,
      },
      spiritual: {
        colors: [COLORS.purple, COLORS.cyan, COLORS.blue, COLORS.gold],
        baseSize: [0.5, 3],
        baseSpeed: 0.15,
      },
    }

    const config = configs[type]

    const createParticle = (): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: config.baseSize[0] + Math.random() * (config.baseSize[1] - config.baseSize[0]),
        speedX: (Math.random() - 0.5) * config.baseSpeed * speed,
        speedY: (Math.random() - 0.5) * config.baseSpeed * speed - config.baseSpeed * speed * 0.3,
        opacity: 0.1 + Math.random() * 0.4,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        life: 0,
        maxLife: 200 + Math.random() * 300,
      }
    }

    const particleCount = Math.floor(80 * density)
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle())
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p, idx) => {
        p.life++
        if (p.life > p.maxLife) {
          particlesRef.current[idx] = createParticle()
          return
        }

        if (interactive) {
          const dx = mouseRef.current.x - p.x
          const dy = mouseRef.current.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const force = (120 - dist) / 120
            p.speedX -= (dx / dist) * force * 0.02
            p.speedY -= (dy / dist) * force * 0.02
          }
        }

        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const lifeRatio = p.life / p.maxLife
        const fadeIn = Math.min(lifeRatio * 5, 1)
        const fadeOut = 1 - Math.max((lifeRatio - 0.7) / 0.3, 0)
        const currentOpacity = p.opacity * fadeIn * fadeOut

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        gradient.addColorStop(0, p.color)
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.globalAlpha = currentOpacity * 0.5
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = currentOpacity
        ctx.fill()

        ctx.globalAlpha = 1
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      cancelAnimationFrame(animationRef.current)
    }
  }, [type, density, speed, interactive])

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
        zIndex: 0,
      }}
    />
  )
}

export const AmbientGlow: React.FC<{ color?: string; position?: string }> = ({
  color = COLORS.purple,
  position = 'top',
}) => {
  const positions: Record<string, React.CSSProperties> = {
    top: { top: 0, left: '50%', transform: 'translateX(-50%)' },
    bottom: { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
    center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  }

  return (
    <div
      style={{
        position: 'fixed',
        width: '150vw',
        height: '80vh',
        background: `radial-gradient(ellipse at center, ${color}15, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
        ...positions[position],
      }}
    />
  )
}

export default ParticleField
