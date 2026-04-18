'use client'

import { motion } from 'framer-motion'
import styles from './SkeletonLoader.module.scss'

interface SkeletonProps {
  variant?: 'text' | 'card' | 'circle' | 'image'
  width?: string
  height?: string
  count?: number
  className?: string
}

export function Skeleton({ variant = 'text', width, height, count = 1, className = '' }: SkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  const getVariantClass = () => {
    switch (variant) {
      case 'card': return styles.skeletonCard
      case 'circle': return styles.skeletonCircle
      case 'image': return styles.skeletonImage
      default: return styles.skeletonText
    }
  }

  return (
    <>
      {skeletons.map((i) => (
        <motion.div
          key={i}
          className={`${styles.skeletonBase} ${getVariantClass()} ${className}`}
          style={{
            width: width || (variant === 'circle' ? '40px' : '100%'),
            height: height || (variant === 'text' ? '16px' : variant === 'circle' ? '40px' : '100%'),
            marginBottom: variant === 'text' ? '8px' : 0,
          }}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
        />
      ))}
    </>
  )
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className={styles.cardGrid}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={styles.cardSkeletonContainer}>
          <Skeleton variant="image" height="120px" />
          <div style={{ padding: '16px' }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" count={2} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className={styles.pageSkeleton}>
      <Skeleton variant="text" width="40%" height="32px" />
      <br />
      <Skeleton variant="text" width="70%" height="18px" />
      <br />
      <br />
      <CardSkeleton count={4} />
    </div>
  )
}

export default Skeleton
