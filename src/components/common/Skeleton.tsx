import styles from './Skeleton.module.scss'

/**
 * 💀 骨架屏卡片组件
 * 数据加载时显示，减少白屏焦虑
 */
export function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonIcon} />
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLine} style={{ width: '80%' }} />
      <div className={styles.skeletonLine} style={{ width: '60%' }} />
    </div>
  )
}

/**
 * 💀 骨架屏网格
 * 一次性渲染多个卡片骨架
 */
export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export default SkeletonCard
