'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { ModuleSidebar } from '@/components/layout/ModuleSidebar'
import InfoCard from '@/components/ui/InfoCard'
import { FadeIn } from '@/components/ui/Animated'

const SUB_MODULES = [
  { id: 'pangu', name: '盘古', icon: '🪓', desc: '开天辟地，创世神话', href: '/hong/pangu', color: '#eab308', isNew: true },
  { id: 'chuanshuo', name: '传说', icon: '📖', desc: '上古神话，三皇五帝', href: '/hong/chuanshuo', color: '#f59e0b', isNew: true },
  { id: 'shenshou', name: '神兽', icon: '🐉', desc: '山海经神兽图鉴', href: '/hong/shenshou', color: '#22c55e', isNew: false },
  { id: 'yaomo', name: '妖魔', icon: '👹', desc: '洪荒妖族，魔神谱', href: '/hong/yaomo', color: '#ef4444', isNew: false },
  { id: 'moshen', name: '魔神', icon: '😈', desc: '蚩尤刑天，上古魔神', href: '/hong/moshen', color: '#ec4899', isNew: true },
  { id: 'liangjie', name: '量劫', icon: '🌑', desc: '开天量劫，龙汉延康', href: '/hong/liangjie', color: '#6b7280', isNew: true },
  { id: 'tushu', name: '图书', icon: '📚', desc: '洪荒典籍，功法秘录', href: '/hong/tushu', color: '#3b82f6', isNew: false },
]

export default function HongIndexPage() {
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
      title="洪字卷 · 开天地"
      subtitle="混沌初开，乾坤始奠，清浊分判，洪荒始现"
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
        {showSidebar && <ModuleSidebar modules={SUB_MODULES} title="洪字卷" icon="🌋" />}

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
              background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(245, 158, 11, 0.1) 50%, rgba(239, 68, 68, 0.1) 100%)',
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
                  background: 'radial-gradient(circle, rgba(234, 179, 8, 0.2) 0%, transparent 70%)',
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
                🌋 洪荒纪元
              </h2>
              <p style={{ opacity: 0.8, lineHeight: 1.8 }}>
                混沌未分天地乱，茫茫渺渺无人见。自从盘古破鸿蒙，开辟从兹清浊辨。
                覆载群生仰至仁，发明万物皆成善。欲知造化会元功，须看西游释厄传。
                天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。
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
                              module.color.replace('#', '') === 'f59e0b' ? '245, 158, 11' : 
                              module.color.replace('#', '') === 'ef4444' ? '239, 68, 68' : 
                              '34, 197, 94'}
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
