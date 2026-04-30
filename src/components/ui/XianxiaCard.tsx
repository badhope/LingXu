'use client'

import React, { memo, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCardManaEffect } from '@/components/effects/CardManaCanvas'
import { COLORS, SPACING, RADIUS, alpha } from '@/styles/tokens'

const MODULE_MAP: Record<string, string> = {
  '天': '天',
  '地': '地',
  '玄': '玄',
  '黄': '黄',
  '宇': '宇',
  '宙': '宙',
  '洪': '洪',
  '荒': '荒',
}

interface XianxiaCardProps {
  char: string
  title: string
  description: string
  href: string
  index?: number
}

const XianxiaCard = memo(function XianxiaCard({
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
        data-module={MODULE_MAP[char]}
        initial={{ opacity: 0, y: 30, rotateX: -8 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: index * 0.05,
          ease: 'easeOut',
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
            padding: SPACING['3xl'],
            borderRadius: RADIUS.xl,
            background: 'linear-gradient(145deg, rgba(15, 15, 25, 0.9) 0%, rgba(8, 8, 15, 0.95) 100%)',
            border: `1px solid ${alpha(COLORS.gold, 0.15)}`,
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
              borderRadius: RADIUS.xl,
              zIndex: 1,
            }}
          />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div
              className="xian-rune"
              style={{
                fontSize: '3.5rem',
                fontWeight: 700,
                marginBottom: SPACING.sm,
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
                marginBottom: SPACING.sm,
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
              top: SPACING.lg,
              right: SPACING.lg,
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
})

XianxiaCard.displayName = 'XianxiaCard'

export default XianxiaCard
