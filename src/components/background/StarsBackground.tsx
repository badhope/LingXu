'use client'

import { useEffect, useRef } from 'react'
import styles from './StarsBackground.module.scss'

interface Star {
  x: number
  y: number
  radius: number
  alpha: number
  alphaDirection: number
  speed: number
  twinkle: boolean
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  alpha: number
}

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const starsRef = useRef<Star[]>([])
  const shootingStarsRef = useRef<ShootingStar[]>([])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const initStars = () => {
      starsRef.current = Array.from({ length: 150 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        alphaDirection: Math.random() > 0.5 ? 1 : -1,
        speed: Math.random() * 0.005 + 0.002,
        twinkle: Math.random() > 0.7,
      }))
    }
    
    initStars()
    
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      
      starsRef.current.forEach(star => {
        star.x = Math.random() * window.innerWidth
        star.y = Math.random() * window.innerHeight
      })
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    let lastShootingStarTime = 0
    
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      starsRef.current.forEach(star => {
        if (star.twinkle) {
          star.alpha += star.speed * star.alphaDirection
          if (star.alpha >= 1 || star.alpha <= 0.2) {
            star.alphaDirection *= -1
          }
        }
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
        ctx.fill()
        
        if (star.radius > 1) {
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 3
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha * 0.3})`)
          gradient.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })
      
      if (timestamp - lastShootingStarTime > 3000 && Math.random() > 0.7) {
        shootingStarsRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 0.5,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 4,
          angle: Math.PI / 4 + Math.random() * Math.PI / 6,
          alpha: 1,
        })
        lastShootingStarTime = timestamp
      }
      
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const star = shootingStarsRef.current[i]
        
        const endX = star.x + Math.cos(star.angle) * star.length
        const endY = star.y + Math.sin(star.angle) * star.length
        
        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()
        
        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed
        star.alpha -= 0.02
        
        if (star.alpha <= 0) {
          shootingStarsRef.current.splice(i, 1)
        }
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate(0)
    
    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  return <canvas ref={canvasRef} className={styles.canvas} />
}
