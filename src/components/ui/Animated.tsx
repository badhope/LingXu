'use client'

import React, { memo, Children } from 'react'
import { motion } from 'framer-motion'

export interface FadeInProps {
  children: React.ReactNode
  index?: number
  delay?: number
  className?: string
  x?: number
  y?: number
  scale?: number
  duration?: number
  onClick?: () => void
}

export const FadeIn = memo(function FadeIn({
  children,
  index = 0,
  delay = 0.07,
  className = '',
  x = 0,
  y = 20,
  scale = 1,
  duration = 0.4,
  onClick,
}: FadeInProps) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * delay, duration }}
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : undefined }}
    >
      {children}
    </motion.div>
  )
})

export interface AnimatedCardProps {
  children: React.ReactNode
  index?: number
  delay?: number
  className?: string
  color?: string
  hoverScale?: number
  hoverY?: number
  onClick?: () => void
}

export const AnimatedCard = memo(function AnimatedCard({
  children,
  index = 0,
  delay = 0.07,
  className = '',
  color = '#a855f7',
  hoverScale = 1.015,
  hoverY = -3,
  onClick,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * delay, duration: 0.4 }}
      whileHover={onClick ? {
        scale: hoverScale,
        y: hoverY,
        boxShadow: `0 20px 40px ${color}20`,
        transition: { duration: 0.15 },
      } : undefined}
      whileTap={onClick ? { scale: 0.98, transition: { duration: 0.1 } } : undefined}
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : undefined }}
    >
      {children}
    </motion.div>
  )
})

export function withFadeIn<T extends object>(Component: React.ComponentType<T>) {
  return function WrappedComponent(props: T & FadeInProps) {
    const { index, delay, x, y, scale, duration, ...rest } = props
    return (
      <FadeIn index={index} delay={delay} x={x} y={y} scale={scale} duration={duration}>
        <Component {...(rest as T)} />
      </FadeIn>
    )
  }
}

export interface StaggerChildrenProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

export const StaggerChildren = memo(function StaggerChildren({
  children,
  staggerDelay = 0.1,
  className = '',
}: StaggerChildrenProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => (
        <div key={index} style={{ animationDelay: `${index * staggerDelay}s` }}>
          {child}
        </div>
      ))}
    </div>
  )
})

export const AnimationPresets = {
  card: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
  },
  hover: {
    whileHover: { scale: 1.015, y: -3, transition: { duration: 0.15 } },
    whileTap: { scale: 0.98 },
  }
} as const

FadeIn.displayName = 'FadeIn'
AnimatedCard.displayName = 'AnimatedCard'
