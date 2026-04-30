'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { ModuleSidebar } from '@/components/layout/ModuleSidebar'
import InfoCard from '@/components/ui/InfoCard'
import { FadeIn } from '@/components/ui/Animated'

const SUB_MODULES = [
  { id: 'qiankun', name: '乾坤', icon: '☯️', desc: '两仪四象，八卦演化', href: '/yu/qiankun', color: '#eab308' },
  { id: 'xingtu', name: '星图', icon: '🌌', desc: '三垣二十八宿，全天星图', href: '/yu/xingtu', color: '#3b82f6', isNew: true },
  { id: 'weidu', name: '维度', icon: '🔲', desc: '十一维空间，弦理论探索', href: '/yu/weidu', color: '#8b5cf6', isNew: true },
  { id: 'sanjie', name: '三界', icon: '🏛️', desc: '天人地三界，六道体系', href: '/yu/sanjie', color: '#ec4899' },
  { id: 'dongtian', name: '洞天', icon: '🏔️', desc: '洞天福地，小世界入口', href: '/yu/dongtian', color: '#22c55e' },
  { id: 'mijie', name: '秘境', icon: '🌀', desc: '空间裂缝，次元通道', href: '/yu/mijie', color: '#06b6d4' },
  { id: 'chuansong', name: '传送', icon: '✨', desc: '跨位面传送阵坐标', href: '/yu/chuansong', color: '#a855f7', isNew: true },
  { id: 'crack', name: '裂缝', icon: '💎', desc: '世界裂隙，虚空入侵', href: '/yu/crack', color: '#ef4444', isNew: true },
]

export default function YuIndexPage() {
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
      title="宇字卷 · 观宇宙"
      subtitle="天地四方曰宇，古往今来曰宙"
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
        {showSidebar && <ModuleSidebar modules={SUB_MODULES} title="宇字卷" icon="🌌" />}

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
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(6, 182, 212, 0.1) 100%)',
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
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
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
                color: '#3b82f6',
              }}>
                🌌 寰宇浩瀚
              </h2>
              <p style={{ opacity: 0.8, lineHeight: 1.8 }}>
                天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。四方上下谓之宇，往古来今谓之宙。
                宇宙之间，一尘不染，湛然常寂。唯有道气，充塞两间。天地与我并生，
                而万物与我为一。既已为一矣，且得有言乎？既已谓之一矣，且得无言乎？
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
                    glowColor={module.color.replace('#', '') === '3b82f6' ? '59, 130, 246' : 
                              module.color.replace('#', '') === '8b5cf6' ? '139, 92, 246' : 
                              module.color.replace('#', '') === '06b6d4' ? '6, 182, 212' : 
                              '234, 179, 8'}
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
