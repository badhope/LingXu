'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { ModuleSidebar } from '@/components/layout/ModuleSidebar'
import InfoCard from '@/components/ui/InfoCard'
import { FadeIn } from '@/components/ui/Animated'

const SUB_MODULES = [
  { id: 'xunlong', name: '寻龙', icon: '🎮', desc: '寻龙点穴模拟器，龙脉探索游戏', href: '/di/xunlong', color: '#f97316', isNew: true },
  { id: 'yangzhai', name: '阳宅', icon: '🏠', desc: '阳宅三要，八宅游年配卦', href: '/di/yangzhai', color: '#22c55e', isNew: true },
  { id: 'lishi', name: '立向', icon: '🧭', desc: '二十四山，三元九运', href: '/di/lishi', color: '#f59e0b', isNew: true },
  { id: 'dongtian', name: '洞天', icon: '🏔️', desc: '十大洞天，七十二福地', href: '/di/dongtian', color: '#06b6d4', isNew: true },
  { id: 'shanchuan', name: '山川', icon: '🗻', desc: '五岳四渎，名山大川百科', href: '/di/shanchuan', color: '#22c55e', isNew: true },
  { id: 'gudu', name: '古都', icon: '🏛️', desc: '帝都王气，名墓风水', href: '/di/gudu', color: '#a855f7', isNew: true },
  { id: 'longmai', name: '龙脉', icon: '🐉', desc: '中华龙脉，三干龙尽结', href: '/di/longmai', color: '#f59e0b' },
  { id: 'fengshui', name: '风水', icon: '☯️', desc: '阴阳宅风水，堪舆布局', href: '/di/fengshui', color: '#22c55e' },
  { id: 'luopan', name: '罗盘', icon: '🧭', desc: '风水罗盘，天池指南', href: '/di/luopan', color: '#eab308' },
  { id: 'dili', name: '地理', icon: '🗺️', desc: '山川地理，地脉走向', href: '/di/dili', color: '#06b6d4' },
  { id: 'tools', name: '工具', icon: '🔧', desc: '阳宅风水工具', href: '/di/tools', color: '#d4af37' },
]

export default function DiIndexPage() {
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
      title="地字卷 · 察地理"
      subtitle="仰观天文，俯察地理，通阴阳之理，晓生死之机"
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
        {showSidebar && <ModuleSidebar modules={SUB_MODULES} title="地字卷" icon="🌍" />}

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
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(251, 191, 36, 0.1) 100%)',
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
                  background: 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)',
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
                color: '#22c55e',
              }}>
                🌍 堪舆之道
              </h2>
              <p style={{ opacity: 0.8, lineHeight: 1.8 }}>
                古之葬者，厚衣之以薪，葬之中野，不封不树，丧期无数。后世圣人易之以棺椁，
                盖取诸大过。风水之术，源于商周，成于秦汉，盛于唐宋。寻龙点穴，
                乘生气也。气乘风则散，界水则止。古人聚之使不散，行之使有止，故谓之风水。
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
                    glowColor={module.color.replace('#', '') === 'f97316' ? '249, 115, 22' : 
                              module.color.replace('#', '') === '22c55e' ? '34, 197, 94' : 
                              module.color.replace('#', '') === 'f59e0b' ? '245, 158, 11' : 
                              '6, 182, 212'}
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
