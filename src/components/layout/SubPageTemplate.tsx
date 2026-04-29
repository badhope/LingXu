'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from './Layout'
import PageBackground from './PageBackground'
import { SEO } from '@/components/common/SEO'
import styles from './SubPageTemplate.module.scss'

interface SubPageTemplateProps {
  title: string
  subtitle?: string
  icon?: string
  colorRgb?: string
  parentPath?: string
  children: React.ReactNode
}

export default function SubPageTemplate({
  title,
  subtitle = '',
  icon = '📜',
  colorRgb = '154, 123, 41',
  parentPath,
  children,
}: SubPageTemplateProps) {
  return (
    <Layout title={title} parentPath={parentPath}>
      <SEO title={title} description={subtitle} />
      <PageBackground colorRgb={colorRgb}>
        <div className={styles.container}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className={styles.icon}>
              {icon}
            </div>
            <h1 className={styles.title}>
              {title}
            </h1>
            <p className={styles.subtitle}>
              {subtitle}
            </p>
            <div className={styles.headerDecor}>
              <span>❖</span>
              <span>灵墟档案馆</span>
              <span>❖</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            style={{ willChange: 'transform, opacity' }}
          >
            {children}
          </motion.div>
        </div>
      </PageBackground>
    </Layout>
  )
}

export function SubPageSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {title}
      </h2>
      {children}
    </section>
  )
}

interface InfoCardProps {
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

export function InfoCard({
  children,
  className,
  onClick,
  title,
  subtitle,
  feature,
  desc,
  detail,
  glowIntensity = 50,
  glowColor = '154, 123, 41',
  colorRgb = '154, 123, 41',
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
        boxShadow: handleClick ? `0 0 ${glowIntensity / 2}px rgba(${glowColor || colorRgb}, ${glowIntensity / 200})` : undefined,
        cursor: handleClick ? 'pointer' : undefined,
      }}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={handleClick ? {
        scale: 1.015,
        boxShadow: `0 0 ${glowIntensity}px rgba(${glowColor || colorRgb}, ${glowIntensity / 100})`,
        transition: { duration: 0.15 },
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
          marginTop: '0.5rem',
          marginBottom: detail || expandedContent ? '0.75rem' : 0,
        }}>
          {tags.map((tag, i) => (
            <span key={i} style={{
              padding: '0.25rem 0.75rem',
              fontSize: '0.75rem',
              borderRadius: '4px',
              background: `rgba(${colorRgb}, 0.15)`,
              border: `1px solid rgba(${colorRgb}, 0.3)`,
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      {detail && expandable && isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: `1px solid rgba(${colorRgb}, 0.2)`,
          }}
        >
          <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.8 }}>
            {detail}
          </p>
        </motion.div>
      )}
      {expandedContent && expandable && isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: `1px solid rgba(${colorRgb}, 0.2)`,
          }}
        >
          {expandedContent}
        </motion.div>
      )}
      {children}
    </motion.div>
  )
}

export function ProgressBar({
  value,
  max = 100,
  label,
  color,
  colorRgb = '34, 197, 94',
  showValue = true,
  height = 8,
}: {
  value: number
  max?: number
  label?: string
  color?: string
  colorRgb?: string
  showValue?: boolean
  height?: number | string
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  const actualColor = color || `rgba(${colorRgb}, 1)`

  return (
    <div className={styles.progressBar}>
      {(label || showValue) && (
        <div className={styles.progressLabelRow}>
          {label && <span>{label}</span>}
          {showValue && <span className={styles.progressValue} style={{ color: actualColor }}>{value}</span>}
        </div>
      )}
      <div className={styles.progressTrack}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={styles.progressFill}
          style={{ backgroundColor: actualColor }}
        />
      </div>
    </div>
  )
}

export function CardGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`${styles.cardGrid} ${className || ''}`}>
      {children}
    </div>
  )
}

export { SkeletonCard, SkeletonGrid } from '@/components/common/Skeleton'
