'use client'

import { useEffect, useRef } from 'react'
import styles from './OrbitBackground.module.scss'

export default function OrbitBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    // 创建轨道粒子
    const createParticles = () => {
      const orbits = container.querySelectorAll(`.${styles.orbit}`)
      
      orbits.forEach((orbit, orbitIndex) => {
        const particleCount = 3 + orbitIndex
        const orbitEl = orbit as HTMLElement
        
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div')
          particle.className = styles.particle
          
          const delay = (i / particleCount) * 20
          const size = 3 - orbitIndex * 0.3
          const hue = 45 + orbitIndex * 5 // 金色调
          
          particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            animation-delay: -${delay}s;
            animation-duration: ${15 + orbitIndex * 5}s;
            background: hsl(${hue}, 70%, 60%);
            box-shadow: 0 0 ${size * 2}px hsl(${hue}, 70%, 60%);
          `
          
          orbitEl.appendChild(particle)
        }
      })
    }
    
    createParticles()
    
    // 鼠标交互
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      container.style.transform = `translate(${x}px, ${y}px)`
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.orbitSystem}>
        <div className={`${styles.orbit} ${styles.orbit1}`}>
          <div className={styles.centerDot} />
        </div>
        <div className={`${styles.orbit} ${styles.orbit2}`} />
        <div className={`${styles.orbit} ${styles.orbit3}`} />
        <div className={`${styles.orbit} ${styles.orbit4}`} />
        <div className={`${styles.orbit} ${styles.orbit5}`} />
      </div>
      
      {/* 装饰符号 */}
      <div className={styles.symbols}>
        {['☯', '⚝', '✧', '❂', '⬡', '☆', '✦', '◈', '❃', '⚹', '⟡', '⊛', '✴', '⬢', '❋', '✵'].map((symbol, i) => (
          <span
            key={i}
            className={styles.symbol}
            style={{
              '--delay': `${i * 2}s`,
              '--duration': `${20 + i}s`,
              '--radius': `${100 + i * 30}px`,
            } as React.CSSProperties}
          >
            {symbol}
          </span>
        ))}
      </div>
    </div>
  )
}
