'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from './Layout'
import PageBackground from './PageBackground'
import SeoHead from '@/components/common/SeoHead'
import styles from './SubPageTemplate.module.scss'

interface SubPageTemplateProps {
  title: string
  subtitle: string
  icon: string
  colorRgb?: string
  children: React.ReactNode
}

export default function SubPageTemplate({
  title,
  subtitle,
  icon,
  colorRgb = '154, 123, 41',
  children,
}: SubPageTemplateProps) {
  return (
    <Layout title={title}>
      <SeoHead title={title} description={subtitle} />
      <PageBackground colorRgb={colorRgb}>
        <div className={styles.container}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
  children: React.ReactNode
  className?: string
  onClick?: () => void
  title?: string
  subtitle?: string
  glowIntensity?: number
  glowColor?: string
}

export function InfoCard({
  children,
  className,
  onClick,
  title,
  subtitle,
  glowIntensity = 50,
  glowColor = '154, 123, 41',
}: InfoCardProps) {
  return (
    <motion.div
      className={`${styles.infoCard} ${className || ''}`}
      style={{
        boxShadow: onClick ? `0 0 ${glowIntensity / 2}px rgba(${glowColor}, ${glowIntensity / 200})` : undefined,
        cursor: onClick ? 'pointer' : undefined,
      }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={onClick ? {
        scale: 1.02,
        boxShadow: `0 0 ${glowIntensity}px rgba(${glowColor}, ${glowIntensity / 100})`,
      } : undefined}
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
