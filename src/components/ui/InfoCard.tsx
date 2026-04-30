'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import styles from '@/components/layout/SubPageTemplate.module.scss'

export interface InfoCardProps {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
  title?: string
  subtitle?: string
  feature?: string
  desc?: string
  detail?: string
  glowIntensity?: number
  glowColor?: string
  colorRgb?: string
  expandable?: boolean
  expandedContent?: React.ReactNode
  tags?: string[]
}

export default function InfoCard({
  children,
  className,
  onClick,
  title,
  subtitle,
  feature,
  desc,
  detail,
  glowIntensity = 50,
  glowColor = '251, 191, 36',
  colorRgb = '251, 191, 36',
  expandable = false,
  expandedContent,
  tags,
}: InfoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const handleClick = onClick || (expandable ? () => setIsExpanded(!isExpanded) : undefined)
  
  return (
    <motion.div
      className={`${styles.infoCard} ${className || ''}`}
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)',
        border: '1px solid transparent',
        backgroundClip: 'padding-box',
        boxShadow: handleClick ? `0 0 ${glowIntensity / 2}px rgba(${glowColor || colorRgb}, ${glowIntensity / 200})` : undefined,
        cursor: handleClick ? 'pointer' : undefined,
      }}
      onMouseEnter={(e) => {
        if (handleClick) {
          e.currentTarget.style.border = `1px solid rgba(${glowColor || colorRgb}, 0.4)`
        }
      }}
      onMouseLeave={(e) => {
        if (handleClick) {
          e.currentTarget.style.border = '1px solid transparent'
        }
      }}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={handleClick ? {
        scale: 1.025,
        y: -6,
        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 ${glowIntensity}px rgba(${glowColor || colorRgb}, ${glowIntensity / 80})`,
        transition: { duration: 0.25, ease: 'easeOut' },
      } : undefined}
      whileTap={handleClick ? { scale: 0.98, transition: { duration: 0.1 } } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {title && (
        <>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: 'rgb(251, 191, 36)',
          }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{
              fontSize: '0.85rem',
              opacity: 0.7,
              marginBottom: '1rem',
            }}>
              {subtitle}
            </p>
          )}
        </>
      )}
      {feature && (
        <p style={{
          fontSize: '0.9rem',
          color: `rgb(${colorRgb})`,
          marginBottom: '0.5rem',
          fontWeight: 500,
        }}>
          ✨ {feature}
        </p>
      )}
      {desc && (
        <p style={{
          fontSize: '0.85rem',
          opacity: 0.8,
          marginBottom: '0.75rem',
          lineHeight: 1.7,
        }}>
          {desc}
        </p>
      )}
      {tags && tags.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '0.75rem',
        }}>
          {tags.map((tag, i) => (
            <span key={i} style={{
              fontSize: '0.7rem',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              background: `rgba(${colorRgb}, 0.15)`,
              color: `rgb(${colorRgb})`,
              border: `1px solid rgba(${colorRgb}, 0.3)`,
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      {detail && (
        <p style={{
          fontSize: '0.8rem',
          opacity: 0.6,
          lineHeight: 1.6,
        }}>
          {detail}
        </p>
      )}
      {children}
      {expandable && isExpanded && expandedContent && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(251, 191, 36, 0.1)' }}
        >
          {expandedContent}
        </motion.div>
      )}
    </motion.div>
  )
}
