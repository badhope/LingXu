'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { ModuleSidebar } from '@/components/layout/ModuleSidebar'
import InfoCard from '@/components/ui/InfoCard'
import { FadeIn } from '@/components/ui/Animated'

const SUB_MODULES = [
  { id: 'shiguang', name: '时光', icon: '⌛', desc: '过去现在未来，时间轴可视化', href: '/zhou/shiguang', color: '#8b5cf6', isNew: true },
  { id: 'lunhui', name: '轮回', icon: '♾️', desc: '六道轮回，业力转生系统', href: '/zhou/lunhui', color: '#ec4899', isNew: true },
  { id: 'yinguo', name: '因果', icon: '🦋', desc: '善恶业力，蝴蝶效应演示', href: '/zhou/yinguo', color: '#06b6d4', isNew: true },
  { id: 'yuce', name: '预言', icon: '🔮', desc: '古今预言应验度，天机推演', href: '/zhou/yuce', color: '#f59e0b', isNew: true },
]

export default function ZhouIndexPage() {
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
      title="周字卷 · 演时间"
      subtitle="往古来今谓之宙，四方上下谓之宇"
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
        {showSidebar && <ModuleSidebar modules={SUB_MODULES} title="周字卷" icon="⏳" />}

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
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(6, 182, 212, 0.1) 100%)',
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
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
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
                color: '#8b5cf6',
              }}>
                ⏳ 时间之河
              </h2>
              <p style={{ opacity: 0.8, lineHeight: 1.8 }}>
                子在川上曰：逝者如斯夫，不舍昼夜。时间如流水，奔腾不息，无始无终。
                过去现在未来，三世因果，六道轮回。善有善报，恶有恶报，不是不报，时辰未到。
                一饮一啄，莫非前定；一得一失，俱是前缘。
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
                    glowColor={module.color.replace('#', '') === '8b5cf6' ? '139, 92, 246' : 
                              module.color.replace('#', '') === 'ec4899' ? '236, 72, 153' : 
                              module.color.replace('#', '') === '06b6d4' ? '6, 182, 212' : 
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
