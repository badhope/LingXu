'use client'

import { useCardManaEffect } from '@/components/effects/CardManaCanvas'
import Link from 'next/link'
import { useRef } from 'react'
import { motion } from 'framer-motion'

interface XianxiaCardProps {
  char: string
  title: string
  description: string
  href: string
  index?: number
}

export default function XianxiaCard({
  char,
  title,
  description,
  href,
  index = 0,
}: XianxiaCardProps) {
  const {
    canvasRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useCardManaEffect()

  const cardRef = useRef<HTMLAnchorElement>(null)

  const handleCardMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleMouseMove(e as unknown as React.MouseEvent<HTMLDivElement>)
    
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      cardRef.current?.style.setProperty('--mouse-x', `${x}%`)
      cardRef.current?.style.setProperty('--mouse-y', `${y}%`)
    }
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        ref={cardRef}
        className="xian-perspective"
        initial={{ opacity: 0, y: 50, rotateX: -15 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.175, 0.885, 0.32, 1.275],
        }}
        onMouseMove={handleCardMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          display: 'block',
          textDecoration: 'none',
        }}
      >
        <div
          className="xian-card xian-card-glow xian-border-animate"
          style={{
            position: 'relative',
            padding: '2rem',
            borderRadius: '16px',
            background: 'linear-gradient(145deg, rgba(15, 15, 25, 0.9) 0%, rgba(8, 8, 15, 0.95) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.15)',
            overflow: 'hidden',
          }}
        >
          <span />

          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              borderRadius: '16px',
              zIndex: 1,
            }}
          />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div
              className="xian-rune"
              style={{
                fontSize: '3.5rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontFamily: '"Noto Serif SC", serif',
              }}
            >
              {char}
            </div>

            <h3
              className="xian-title xian-3d-text"
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
                fontFamily: '"Noto Serif SC", serif',
              }}
            >
              {title}
            </h3>

            <p
              style={{
                color: 'rgba(200, 200, 210, 0.8)',
                fontSize: '0.875rem',
                lineHeight: 1.6,
              }}
            >
              {description}
            </p>
          </div>

          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              fontSize: '1.5rem',
              opacity: 0.3,
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
            className="group-hover:opacity-60 group-hover:translate-x-1"
          >
            →
          </div>
        </div>
      </motion.a>
    </Link>
  )
}
