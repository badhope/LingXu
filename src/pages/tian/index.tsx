'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PageLayout } from '@/components/layout/PageLayout'
import { ModuleSidebar } from '@/components/layout/ModuleSidebar'
import InfoCard from '@/components/ui/InfoCard'
import { FadeIn, StaggerChildren } from '@/components/ui/Animated'

const SUB_MODULES = [
  {
    id: 'xingxiu',
    name: '星宿',
    icon: '⭐',
    desc: '二十八星宿，本命查询',
    href: '/tian/xingxiu',
    color: '#66ccff',
  },
  {
    id: 'yunshi',
    name: '运势',
    icon: '🌟',
    desc: '生肖星座，每日详解',
    href: '/tian/yunshi',
    color: '#a78bfa',
  },
  {
    id: 'jieqi',
    name: '节气',
    icon: '🌾',
    desc: '二十四节气，养生民俗',
    href: '/tian/jieqi',
    color: '#22c55e',
  },
  {
    id: 'zhanbu',
    name: '占卜',
    icon: '🎴',
    desc: '观音灵签，关帝灵签',
    href: '/tian/zhanbu',
    color: '#f59e0b',
  },
  {
    id: 'huangdao',
    name: '择日',
    icon: '📅',
    desc: '黄道吉日，吉时查询',
    href: '/tian/huangdao',
    color: '#ec4899',
    isNew: true,
  },
  {
    id: 'yuexiang',
    name: '月相',
    icon: '🌙',
    desc: '月相盈亏，潮汐预报',
    href: '/tian/yuexiang',
    color: '#8b5cf6',
    isNew: true,
  },
  {
    id: 'tools',
    name: '工具',
    icon: '🔧',
    desc: '万年历，阴阳历转换',
    href: '/tian/tools',
    color: '#06b6d4',
    isNew: true,
  },
  {
    id: 'zhouyi',
    name: '周易',
    icon: '🌀',
    desc: '六十四卦，铜钱起卦',
    href: '/tian/zhouyi',
    color: '#8b5cf6',
    isNew: true,
  },
  {
    id: 'taluo',
    name: '塔罗',
    icon: '🎴',
    desc: '七十八张，牌阵占卜',
    href: '/tian/taluo',
    color: '#ec4899',
    isNew: true,
  },
]

export default function TianIndexPage() {
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
      title="天字卷 · 观天象"
      subtitle="观天象而知人事，察星宿而明吉凶"
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
        {showSidebar && <ModuleSidebar modules={SUB_MODULES} title="天字卷" icon="☀️" />}

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
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(124, 58, 237, 0.1) 50%, rgba(251, 191, 36, 0.1) 100%)',
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
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☀️</div>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#fbbf24',
                  marginBottom: '0.75rem',
                }}>
                  夫天者，人之始也
                </h2>
                <p style={{
                  color: '#94a3b8',
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  maxWidth: '600px',
                }}>
                  天有四时五行，九候其象。日月运行，一寒一暑。
                  昼明者为日，夜明者为月，周天列宿，各有所主。
                  观天之象，察时之变，以通神明之德，以类万物之情。
                </p>
              </div>
            </div>
          </FadeIn>

          <StaggerChildren staggerDelay={0.08}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: device === 'mobile' ? '1fr' : device === 'tablet' ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '1.25rem',
            }}>
              {SUB_MODULES.map((module) => (
                <InfoCard
                  key={module.id}
                  title={module.name}
                  subtitle={module.desc}
                  feature="点击进入"
                  glowIntensity={30}
                  glowColor={module.color?.replace('#', '') === '66ccff' ? '102, 204, 255' :
                             module.color?.replace('#', '') === 'a78bfa' ? '167, 139, 250' :
                             module.color?.replace('#', '') === '22c55e' ? '34, 197, 94' :
                             '251, 191, 36'}
                  expandable={false}
                  onClick={() => window.location.href = module.href}
                  tags={module.isNew ? ['✨ 新上线'] : []}
                >
                  <div style={{
                    fontSize: '2.5rem',
                    textAlign: 'center',
                    padding: '1rem 0',
                  }}>
                    <motion.span
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {module.icon}
                    </motion.span>
                  </div>
                </InfoCard>
              ))}
            </div>
          </StaggerChildren>

          <FadeIn delay={0.6}>
            <div style={{
              marginTop: '3rem',
              padding: '1.5rem 2rem',
              borderRadius: '16px',
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(251, 191, 36, 0.1)',
              textAlign: 'center',
            }}>
              <p style={{
                color: '#64748b',
                fontSize: '0.9rem',
                fontStyle: 'italic',
              }}>
                「观乎天文，以察时变；观乎人文，以化成天下」
                <br />
                —— 《周易·贲卦》
              </p>
            </div>
          </FadeIn>
        </motion.div>
      </div>
    </PageLayout>
  )
}
