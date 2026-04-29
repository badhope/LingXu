'use client'

import React, { memo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from '@/components/layout/SubPageTemplate.module.scss'

interface SubmoduleCardProps {
  title: string
  description: string
  href: string
  icon?: string
  index?: number
}

const SubmoduleCard = memo(function SubmoduleCard({
  title,
  description,
  href,
  icon = '📜',
  index = 0,
}: SubmoduleCardProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        className={styles.submoduleCard}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.6,
          delay: index * 0.08,
          ease: [0.175, 0.885, 0.32, 1.275],
        }}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.cardIcon}>
            {icon}
          </div>

          <h3 className={styles.cardTitle}>
            {title}
          </h3>

          <p className={styles.cardDesc}>
            {description}
          </p>

          <div className={styles.cardFooter}>
            <span>探索</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
            >
              →
            </motion.span>
          </div>
        </div>
      </motion.a>
    </Link>
  )
})

SubmoduleCard.displayName = 'SubmoduleCard'

export default SubmoduleCard
