'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { ModuleSidebar } from '@/components/layout/ModuleSidebar'
import InfoCard from '@/components/ui/InfoCard'
import { FadeIn } from '@/components/ui/Animated'

const SUB_MODULES = [
  { id: 'yijing', name: '易经', icon: '☯', desc: '六十四卦，天人合一', href: '/xuan/yijing', color: '#c9a227' },
  { id: 'tools', name: '工具', icon: '🔮', desc: '梅花易数，奇门遁甲', href: '/xuan/tools', color: '#d4af37', isNew: true },
  { id: 'bazi', name: '八字', icon: '❋', desc: '四柱命理，五行生克', href: '/xuan/bazi', color: '#ef4444' },
  { id: 'liuyao', name: '六爻', icon: '☲', desc: '铜钱起卦，预知吉凶', href: '/xuan/liuyao', color: '#8b5cf6' },
  { id: 'fulu', name: '符箓', icon: '⚡', desc: '道教符箓，祝由十三科', href: '/xuan/fulu', color: '#f97316' },
]

export default function XuanIndexPage() {
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
      title="玄字卷 · 通玄妙"
      subtitle="穷造化之源，通阴阳之妙，洞鬼神之机"
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
        {showSidebar && <ModuleSidebar modules={SUB_MODULES} title="玄字卷" icon="🔮" />}

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
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(239, 68, 68, 0.1) 50%, rgba(251, 191, 36, 0.1) 100%)',
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
                color: '#a855f7',
              }}>
                🔮 玄学之门
              </h2>
              <p style={{ opacity: 0.8, lineHeight: 1.8 }}>
                易有太极，是生两仪，两仪生四象，四象生八卦。八卦定吉凶，吉凶生大业。
                是故法象莫大乎天地，变通莫大乎四时，悬象著明莫大乎日月，崇高莫大乎富贵。
                备物致用，立成器以为天下利，莫大乎圣人。探赜索隐，钩深致远，以定天下之吉凶，
                成天下之亹亹者，莫大乎蓍龟。
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
                    glowColor={module.color.replace('#', '') === 'ef4444' ? '239, 68, 68' : 
                              module.color.replace('#', '') === '8b5cf6' ? '139, 92, 246' : 
                              module.color.replace('#', '') === 'f97316' ? '249, 115, 22' : 
                              '251, 191, 36'}
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
