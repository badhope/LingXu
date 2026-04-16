'use client'

import { useEffect, useRef, useCallback } from 'react'

interface ManaParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  angle: number
  angleSpeed: number
}

interface WaveRing {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
  lineWidth: number
}

export function useCardManaEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<ManaParticle[]>([])
  const wavesRef = useRef<WaveRing[]>([])
  const animationRef = useRef<number>(0)
  const isHoveringRef = useRef(false)

  const spawnParticles = useCallback((x: number, y: number) => {
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2
      const speed = 0.6 + Math.random() * 0.8
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 25,
        size: 1.5 + Math.random() * 1.5,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.12,
      })
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      wavesRef.current = wavesRef.current.filter((wave) => {
        wave.radius += 1.2
        wave.alpha -= 0.012
        wave.lineWidth = Math.max(0.3, 1.2 - (wave.radius / wave.maxRadius))

        if (wave.alpha <= 0) return false

        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(35, 25%, 35%, ${wave.alpha})`
        ctx.lineWidth = wave.lineWidth
        ctx.stroke()

        return true
      })

      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.97
        p.vy *= 0.97
        p.life++
        p.angle += p.angleSpeed

        const lifeRatio = p.life / p.maxLife
        const fadeOut = 1 - lifeRatio
        const currentSize = p.size * fadeOut

        const lifeProgress = lifeRatio < 0.25
          ? lifeRatio * 4
          : 1 - (lifeRatio - 0.25) * 1.333

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize * 1.5)
        gradient.addColorStop(0, `hsla(35, 35%, 40%, ${lifeProgress * 0.35})`)
        gradient.addColorStop(0.5, `hsla(35, 25%, 32%, ${lifeProgress * 0.15})`)
        gradient.addColorStop(1, 'hsla(35, 20%, 28%, 0)')

        ctx.beginPath()
        ctx.arc(0, 0, currentSize * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        ctx.restore()

        return p.life < p.maxLife
      })

      animationRef.current = requestAnimationFrame(update)
    }

    update()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHoveringRef.current) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (Math.random() < 0.15) {
      spawnParticles(x, y)
    }
  }, [spawnParticles])

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false
  }, [])

  return {
    canvasRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  }
}

export default function CardManaCanvas() {
  return null
}
