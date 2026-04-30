'use client'

import { useRef, useEffect, ReactNode } from 'react'

interface PageBackgroundProps {
  children: ReactNode
  colorRgb?: string
  particleCount?: number
}

interface Particle {
  x: number
  y: number
  radius: number
  alpha: number
  speed: number
  angle: number
  phase: number
  twinkleSpeed: number
}

interface Nebula {
  x: number
  y: number
  radius: number
  alpha: number
  speed: number
  angle: number
  color: string
  rotation: number
  rotationSpeed: number
}

interface StarDust {
  x: number
  y: number
  size: number
  alpha: number
  speed: number
  angle: number
  color: string
}

interface AuroraWave {
  x: number
  y: number
  width: number
  height: number
  alpha: number
  phase: number
  speed: number
  color: string
}

export default function PageBackground({
  children,
  colorRgb = '201, 162, 39',
  particleCount = 120,
}: PageBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animId: number
    let isMounted = true

    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    const colorPalettes = [
      colorRgb,
      '147, 51, 234',
      '6, 182, 212',
      '59, 130, 246',
      '236, 72, 153',
      '34, 197, 94',
    ]

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.25 + 0.05,
      angle: Math.random() * Math.PI * 2,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 2 + 1,
    }))

    const nebulaParticles: Nebula[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 150 + Math.random() * 350,
      alpha: 0.025 + Math.random() * 0.035,
      speed: 0.012 + Math.random() * 0.025,
      angle: Math.random() * Math.PI * 2,
      color: colorPalettes[Math.floor(Math.random() * colorPalettes.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.0008,
    }))

    const starDust: StarDust[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.35 + 0.08,
      speed: Math.random() * 0.15 + 0.03,
      angle: Math.random() * Math.PI * 2,
      color: colorPalettes[Math.floor(Math.random() * colorPalettes.length)],
    }))

    const auroraWaves: AuroraWave[] = [
      { x: 0, y: 0, width: 0, height: 0, alpha: 0.04, phase: 0, speed: 0.005, color: '147, 51, 234' },
      { x: 0, y: 0, width: 0, height: 0, alpha: 0.035, phase: Math.PI / 2, speed: 0.004, color: '6, 182, 212' },
      { x: 0, y: 0, width: 0, height: 0, alpha: 0.03, phase: Math.PI, speed: 0.0035, color: colorRgb },
    ]

    let time = 0

    const drawVignette = (w: number, h: number) => {
      const gradient = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.15, w / 2, h / 2, Math.max(w, h) * 0.9)
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
      gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.03)')
      gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.08)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.18)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)
    }

    const drawGrid = (w: number, h: number, t: number) => {
      ctx.strokeStyle = `rgba(${colorRgb}, 0.04)`
      ctx.lineWidth = 0.5

      const gridSize = 60
      const offset = (t * 3) % gridSize

      for (let x = -gridSize + offset; x < w + gridSize; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }

      for (let y = -gridSize + offset; y < h + gridSize; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
    }

    const drawSpiralArms = (w: number, h: number, t: number) => {
      const centerX = w / 2
      const centerY = h / 2
      const maxR = Math.max(w, h) * 0.7

      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(t * 0.02)

      for (let arm = 0; arm < 3; arm++) {
        const armAngle = (arm / 3) * Math.PI * 2
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${colorPalettes[arm]}, 0.025)`
        ctx.lineWidth = 80 + arm * 20

        for (let r = 50; r < maxR; r += 3) {
          const angle = armAngle + (r / maxR) * Math.PI * 2.5
          const x = Math.cos(angle) * r
          const y = Math.sin(angle) * r
          if (r === 50) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      ctx.restore()
    }

    const animate = () => {
      if (!isMounted || !canvas || !ctx) return

      const w = window.innerWidth
      const h = window.innerHeight

      try {
        ctx.clearRect(0, 0, w, h)
        time += 0.016

        auroraWaves.forEach((wave) => {
          wave.phase += wave.speed

          const gradient = ctx.createLinearGradient(
            0, h * 0.3 + Math.sin(wave.phase) * h * 0.15,
            w, h * 0.7 + Math.cos(wave.phase) * h * 0.15
          )
          gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
          gradient.addColorStop(0.3, `rgba(${wave.color}, ${wave.alpha * (0.5 + Math.sin(wave.phase) * 0.5)})`)
          gradient.addColorStop(0.5, `rgba(${wave.color}, ${wave.alpha * (0.7 + Math.sin(wave.phase + 1) * 0.3)})`)
          gradient.addColorStop(0.7, `rgba(${wave.color}, ${wave.alpha * (0.5 + Math.sin(wave.phase + 2) * 0.5)})`)
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, w, h)
        })

        drawSpiralArms(w, h, time)

        nebulaParticles.forEach((n) => {
          n.x += Math.cos(n.angle) * n.speed
          n.y += Math.sin(n.angle) * n.speed
          n.rotation += n.rotationSpeed

          if (n.x < -n.radius) n.x = w + n.radius
          if (n.x > w + n.radius) n.x = -n.radius
          if (n.y < -n.radius) n.y = h + n.radius
          if (n.y > h + n.radius) n.y = -n.radius

          const pulse = 0.55 + Math.sin(time * 0.8 + n.angle * 3) * 0.45

          ctx.save()
          ctx.translate(n.x, n.y)
          ctx.rotate(n.rotation)

          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, n.radius)
          gradient.addColorStop(0, `rgba(${n.color}, ${n.alpha * pulse * 1.2})`)
          gradient.addColorStop(0.3, `rgba(${n.color}, ${n.alpha * pulse * 0.7})`)
          gradient.addColorStop(0.6, `rgba(${n.color}, ${n.alpha * pulse * 0.35})`)
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.ellipse(0, 0, n.radius, n.radius * 0.6, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })

        drawGrid(w, h, time)

        starDust.forEach((d) => {
          d.x += Math.cos(d.angle) * d.speed
          d.y += Math.sin(d.angle) * d.speed

          if (d.x < 0) d.x = w
          if (d.x > w) d.x = 0
          if (d.y < 0) d.y = h
          if (d.y > h) d.y = 0

          const pulse = 0.4 + Math.sin(time * 2 + d.x * 0.01 + d.y * 0.01) * 0.6

          ctx.beginPath()
          ctx.arc(d.x, d.y, d.size * pulse, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${d.color}, ${d.alpha * pulse})`
          ctx.fill()
        })

        particles.forEach((p) => {
          p.x += Math.cos(p.angle) * p.speed
          p.y += Math.sin(p.angle) * p.speed

          if (p.x < 0) p.x = w
          if (p.x > w) p.x = 0
          if (p.y < 0) p.y = h
          if (p.y > h) p.y = 0

          const twinkle = 0.35 + Math.sin(time * p.twinkleSpeed + p.phase) * 0.65

          const glowSize = p.radius * twinkle * 5
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize)
          glow.addColorStop(0, `rgba(${colorRgb}, ${p.alpha * twinkle * 0.7})`)
          glow.addColorStop(0.4, `rgba(${colorRgb}, ${p.alpha * twinkle * 0.3})`)
          glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2)
          ctx.fill()

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * twinkle * 1.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${(p.alpha + 0.2) * twinkle})`
          ctx.fill()
        })

        drawVignette(w, h)
      } catch (e) {
        return
      }

      animId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    animate()

    return () => {
      isMounted = false
      cancelAnimationFrame(animId)

      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const gl = canvas.getContext('webgl') || canvas.getContext('webgl2')
        if (gl) {
          gl.clearColor(0, 0, 0, 0)
          gl.clear(gl.COLOR_BUFFER_BIT)
          gl.finish()
        }
        canvas.width = 0
        canvas.height = 0
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.debug('WebGL cleanup skipped:', e)
        }
      }

      window.removeEventListener('resize', resize)
    }
  }, [colorRgb, particleCount])

  return (
    <>
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
          willChange: 'transform',
        }}
      />
      <div style={{ position: 'relative', zIndex: 10, width: '100%', minHeight: '100vh' }}>
        {children}
      </div>
    </>
  )
}
