'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Layout from './Layout'
import PageBackground from './PageBackground'
import { SEO } from '@/components/common/SEO'
import { FadeIn } from '@/components/ui/Animated'
import styles from './ComingSoonTemplate.module.scss'

interface ComingSoonTemplateProps {
  title: string
  subtitle?: string
  icon?: string
  colorRgb?: string
  parentPath?: string
  features?: string[]
}

export default function ComingSoonTemplate({
  title,
  subtitle = '此模块正在开发中，敬请期待...',
  icon = '🚧',
  colorRgb = '139, 92, 246',
  parentPath = '/home',
  features = [],
}: ComingSoonTemplateProps) {
  const defaultFeatures = [
    '完整的内容体系设计',
    '丰富的交互体验',
    '沉浸式动画效果',
    '跨页面数据联动',
  ]

  const displayFeatures = features.length > 0 ? features : defaultFeatures

  return (
    <Layout title={title} parentPath={parentPath}>
      <SEO title={title} description={subtitle} />
      <PageBackground colorRgb={colorRgb}>
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.icon}>
              {icon}
            </div>
          </FadeIn>

          <FadeIn index={1}>
            <h1 className={styles.title}>
              {title}
            </h1>
          </FadeIn>

          <FadeIn index={2}>
            <p className={styles.subtitle}>
              {subtitle}
            </p>
          </FadeIn>

          <FadeIn index={3}>
            <div className={styles.progress}>
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  initial={{ width: '0%' }}
                  animate={{ width: '68%' }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </div>
              <span className={styles.progressText}>开发进度 68%</span>
            </div>
          </FadeIn>

          <FadeIn index={4}>
            <div className={styles.features}>
              {displayFeatures.map((feature, i) => (
                <div key={i} className={styles.feature}>
                  <span className={styles.check}>✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn index={5}>
            <Link href={parentPath} className={styles.backBtn}>
              ← 返回导航
            </Link>
          </FadeIn>

          <div className={styles.decor}>
            <span>❖</span>
            <span>灵墟档案馆</span>
            <span>❖</span>
          </div>
        </div>
      </PageBackground>
    </Layout>
  )
}
