'use client'

import { useEffect, useRef, useMemo } from 'react'
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
  
  // 初始化星星
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 150 }, () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      alphaDirection: Math.random() > 0.5 ? 1 : -1,
      speed: Math.random() * 0.005 + 0.002,
      twinkle: Math.random() > 0.7,
    }))
  }, [])
  
  // 流星
  const shootingStars = useMemo<ShootingStar[]>(() => [], [])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // 设置画布
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      
      // 重新初始化星星位置
      stars.forEach(star => {
        star.x = Math.random() * window.innerWidth
        star.y = Math.random() * window.innerHeight
      })
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    // 动画
    let lastShootingStarTime = 0
    
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // 绘制星星
      stars.forEach(star => {
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
        
        // 添加光晕
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
      
      // 生成流星
      if (timestamp - lastShootingStarTime > 3000 && Math.random() > 0.7) {
        shootingStars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 0.5,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 4,
          angle: Math.PI / 4 + Math.random() * Math.PI / 6,
          alpha: 1,
        })
        lastShootingStarTime = timestamp
      }
      
      // 绘制流星
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i]
        
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
        
        // 移动流星
        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed
        star.alpha -= 0.02
        
        // 移除消失的流星
        if (star.alpha <= 0) {
          shootingStars.splice(i, 1)
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
  }, [stars, shootingStars])
  
  return <canvas ref={canvasRef} className={styles.canvas} />
}
