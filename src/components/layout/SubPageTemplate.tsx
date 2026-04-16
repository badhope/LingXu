'use client'

import { motion } from 'framer-motion'
import Layout from './Layout'
import PageBackground from './PageBackground'
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
      <PageBackground colorRgb={colorRgb}>
        <div className={styles.container}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className={styles.icon}
              animate={{
                rotate: [0, 3, -3, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              {icon}
            </motion.div>
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
            transition={{ duration: 0.8, delay: 0.3 }}
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

export function InfoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`${styles.infoCard} ${className || ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
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
