'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { PageLayout } from '@/components/layout/PageLayout'
import { ModuleSidebar } from '@/components/layout/ModuleSidebar'
import InfoCard from '@/components/ui/InfoCard'
import { FadeIn } from '@/components/ui/Animated'

const SUB_MODULES = [
  { id: 'linggen', name: '灵根', icon: '🌱', desc: '天赋属性，根骨测试', href: '/huang-lost/linggen', color: '#22c55e', isNew: true },
  { id: 'jindan', name: '金丹', icon: '✨', desc: '九转金丹，大道丹经', href: '/huang-lost/jindan', color: '#eab308', isNew: true },
  { id: 'danyao', name: '丹药', icon: '💊', desc: '百草炼仙丹，药鼎炼丹', href: '/huang-lost/danyao', color: '#ec4899' },
  { id: 'gongfa', name: '功法', icon: '📚', desc: '洪荒功法，修仙秘籍', href: '/huang-lost/gongfa', color: '#3b82f6' },
  { id: 'fabao', name: '法宝', icon: '💎', desc: '先天灵宝，后天至宝', href: '/huang-lost/fabao', color: '#8b5cf6' },
  { id: 'zhenfa', name: '阵法', icon: '🔮', desc: '周天星斗，九曲黄河', href: '/huang-lost/zhenfa', color: '#06b6d4' },
  { id: 'dujie', name: '渡劫', icon: '⚡', desc: '天雷地火，心魔考验', href: '/huang-lost/dujie', color: '#ef4444', isNew: true },
  { id: 'mijing', name: '秘境', icon: '🌀', desc: '上古洞府，遗迹探索', href: '/huang-lost/mijing', color: '#a855f7' },
  { id: 'mishi', name: '秘术', icon: '🔮', desc: '禁术秘法，通天手段', href: '/huang-lost/mishi', color: '#f59e0b' },
  { id: 'yimin', name: '移民', icon: '🚀', desc: '洪荒移民，穿越指南', href: '/huang2/yimin', color: '#06b6d4' },
  { id: 'jingshen', name: '精神', icon: '🧠', desc: '神魂修炼，阴神阳神', href: '/huang2/jingshen', color: '#8b5cf6', isNew: true },
  { id: 'wuwen', name: '巫文', icon: '📜', desc: '巫族文字，符文传承', href: '/huang2/wuwen', color: '#f59e0b', isNew: true },
  { id: 'dazhan', name: '大战', icon: '⚔️', desc: '巫妖大战，封神之战', href: '/huang2/dazhan', color: '#ef4444' },
  { id: 'yishou', name: '异兽', icon: '🐲', desc: '蛮荒异兽，万妖谱', href: '/huang2/yishou', color: '#22c55e' },
  { id: 'buluo', name: '部落', icon: '🏕️', desc: '部落建设，势力发展', href: '/huang2/buluo', color: '#f59e0b' },
  { id: 'zhuqing', name: '竹清', icon: '🎋', desc: '竹林清修，悟道禅心', href: '/huang2/zhuqing', color: '#22c55e' },
  { id: 'tools', name: '工具', icon: '🔧', desc: '修炼辅助工具', href: '/huang2/tools', color: '#d4af37' },
]

export default function Huang2IndexPage() {
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
      title="荒字卷 · 破苍穹"
      subtitle="踏破洪荒，纵横寰宇，傲视三界，独霸九天"
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
        {showSidebar && <ModuleSidebar modules={SUB_MODULES} title="荒字卷" icon="⚔️" />}

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
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(234, 179, 8, 0.1) 50%, rgba(34, 197, 94, 0.1) 100%)',
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
                  background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
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
                color: '#ef4444',
              }}>
                ⚔️ 蛮荒纪元
              </h2>
              <p style={{ opacity: 0.8, lineHeight: 1.8 }}>
                天不生我李淳罡，剑道万古如长夜。天若赐我辉煌，我必比天猖狂。
                我命由我不由天，天欲灭我我灭天。修我战剑，杀上九天，撒我热血，一往无前！
                待到阴阳逆乱时，以我魔血染青天。亿万生灵为兵，百万神魔为将。
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
                              module.color.replace('#', '') === 'eab308' ? '234, 179, 8' : 
                              module.color.replace('#', '') === '22c55e' ? '34, 197, 94' : 
                              '139, 92, 246'}
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
