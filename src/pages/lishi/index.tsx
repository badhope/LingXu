'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { ModuleSidebar } from '@/components/layout/ModuleSidebar'
import InfoCard from '@/components/ui/InfoCard'
import { FadeIn } from '@/components/ui/Animated'

const SUB_MODULES = [
  { id: 'chaodai', name: '朝代', icon: '🏛️', desc: '华夏五千年，朝代更迭', href: '/lishi/chaodai', color: '#eab308' },
  { id: 'renwu', name: '人物', icon: '👑', desc: '帝王将相，英雄豪杰', href: '/lishi/renwu', color: '#3b82f6' },
  { id: 'wenxian', name: '文献', icon: '📚', desc: '四书五经，诸子百家', href: '/lishi/wenxian', color: '#8b5cf6' },
  { id: 'mixin', name: '谜辛', icon: '🔍', desc: '历史谜团，未解之谜', href: '/lishi/mixin', color: '#f59e0b', isNew: true },
]

export default function LishiIndexPage() {
  const router = useRouter()
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const checkDevice = () => {
      const w = window.innerWidth
      if (w < 768) setDevice('mobile')
      else if (w < 1024) setDevice('tablet')
      else setDevice('desktop')
    }
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  const showSidebar = device === 'desktop'

  return (
    <PageLayout
      title="史字卷 · 知兴替"
      subtitle="以史为镜，可以知兴替；以人为镜，可以明得失"
      showBack={true}
      backTo="/home"
      padding="md"
      maxWidth="full"
    >
      <div style={{
        display: 'flex',
        gap: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {showSidebar && <ModuleSidebar modules={SUB_MODULES} title="史字卷" icon="📜" />}

        <motion.div
          style={{ flex: 1, minWidth: 0 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <FadeIn>
            <div style={{
              padding: '2rem',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(139, 92, 246, 0.1) 100%)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              marginBottom: '2rem',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <motion.div
                style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-20%',
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
                color: '#eab308',
              }}>
                📜 历史长河
              </h2>
              <p style={{ opacity: 0.8, lineHeight: 1.8 }}>
                千古兴亡多少事？悠悠。不尽长江滚滚流。天下大势，分久必合，合久必分。
                古今多少事，都付笑谈中。滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。
                青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}>
              {SUB_MODULES.map((module, index) => (
                <FadeIn key={module.id} index={index}>
                  <InfoCard
                    title={module.icon + ' ' + module.name}
                    subtitle={module.desc}
                    glowColor={module.color.replace('#', '') === 'eab308' ? '234, 179, 8' : 
                              module.color.replace('#', '') === '3b82f6' ? '59, 130, 246' : 
                              module.color.replace('#', '') === '8b5cf6' ? '139, 92, 246' : 
                              '245, 158, 11'}
                    onClick={() => router.push(module.href)}
                    tags={module.isNew ? ['新功能'] : undefined}
                  />
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </motion.div>
      </div>
    </PageLayout>
  )
}
