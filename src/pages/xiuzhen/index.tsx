import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import ParticleField, { AmbientGlow } from '@/components/effects/Particles'
import { COLORS, SPACING, RADIUS, alpha, SHADOWS } from '@/styles/tokens'
import { useLocalStorage } from '@/hooks'

interface CultivationStats {
  lingqi: number
  realm: string
  checkinStreak: number
  totalDays: number
}

const XIUZHEN_MODULES = [
  {
    id: 'lishi',
    char: '史',
    title: '末法秘史',
    desc: '洪荒至今的历史真相，仙凡棋局',
    href: '/xiuzhen/lishi',
    color: COLORS.gold,
    gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
  },
  {
    id: 'dongtian',
    char: '境',
    title: '洞天福地',
    desc: '三山五岳，灵脉汇聚，仙山秘境',
    href: '/xiuzhen/dongtian',
    color: COLORS.teal,
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    id: 'qiyu',
    char: '缘',
    title: '修真机缘',
    desc: '叩问天机，随机奇遇，仙人点化',
    href: '/xiuzhen/qiyu',
    color: COLORS.purple,
    gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
  },
  {
    id: 'renwu',
    char: '任',
    title: '日常修行',
    desc: '每日功课，周常任务，成就殿堂',
    href: '/xiuzhen/renwu',
    color: COLORS.green,
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
  },
  {
    id: 'daolu',
    char: '道',
    title: '大道指引',
    desc: '修仙入门指南，灵根检测，境界详解',
    href: '/xiuzhen/daolu',
    color: COLORS.purple,
    gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
  },
  {
    id: 'gongfa',
    char: '法',
    title: '功法宝库',
    desc: '修真功法图鉴，心法秘籍，修炼指引',
    href: '/xiuzhen/gongfa',
    color: COLORS.blue,
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
  },
  {
    id: 'liandan',
    char: '丹',
    title: '炼丹阁',
    desc: '丹方大全，炼丹模拟器，灵药图鉴',
    href: '/xiuzhen/liandan',
    color: COLORS.amber,
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    id: 'lianqi',
    char: '器',
    title: '炼器阁',
    desc: '法宝炼制，装备强化，天工开物',
    href: '/xiuzhen/lianqi',
    color: COLORS.orange,
    gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
  },
  {
    id: 'fulu',
    char: '符',
    title: '符箓堂',
    desc: '符咒绘制，驱邪斗法，雷符镇魔',
    href: '/xiuzhen/fulu',
    color: COLORS.teal,
    gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)',
  },
  {
    id: 'zhenfa',
    char: '阵',
    title: '阵法殿',
    desc: '布阵指南，阵法图鉴，周天星斗',
    href: '/xiuzhen/zhenfa',
    color: COLORS.cyan,
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
  },
  {
    id: 'jishi',
    char: '时',
    title: '修真计时',
    desc: '修炼计时，打坐入定，天劫倒计时',
    href: '/xiuzhen/jishi',
    color: COLORS.blue,
    gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
  },
  {
    id: 'cangbao',
    char: '藏',
    title: '藏宝阁',
    desc: '储物纳戒，法宝收藏，灵药保管',
    href: '/xiuzhen/cangbao',
    color: COLORS.pink,
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
  },
]

const REALM_COLORS: Record<string, string> = {
  '炼气': COLORS.gray400,
  '筑基': COLORS.green,
  '金丹': COLORS.gold,
  '元婴': COLORS.purple,
  '化神': COLORS.red,
}

export default function XiuZhenPage() {
  const [stats] = useLocalStorage<CultivationStats>('cultivation-stats', {
    lingqi: 0,
    realm: '炼气',
    checkinStreak: 0,
    totalDays: 1,
  })
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getShiChen = () => {
    const hour = currentTime.getHours()
    const shichenNames = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
    const idx = Math.floor((hour + 1) / 2) % 12
    return shichenNames[idx] + '时'
  }

  return (
    <>
      <ParticleField type="spiritual" density={1.5} speed={0.6} interactive />
      <AmbientGlow color={COLORS.purple} position="top" />
      <AmbientGlow color={COLORS.cyan} position="bottom" />

      <SubPageTemplate
        title="修真大世界"
        subtitle="漫漫仙途，逆天而行，与天争命"
        colorRgb={COLORS.purpleRgb}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            marginBottom: SPACING['4xl'],
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: SPACING.xl,
          }}>
            <div style={{
              padding: SPACING['2xl'],
              borderRadius: RADIUS.xl,
              background: `
                radial-gradient(ellipse at 20% 0%, ${alpha(COLORS.purple, 0.15)}, transparent 50%),
                radial-gradient(ellipse at 80% 100%, ${alpha(COLORS.cyan, 0.1)}, transparent 50%),
                ${alpha(COLORS.bg.card, 0.9)}
              `,
              border: `1px solid ${alpha(COLORS.purple, 0.2)}`,
              boxShadow: SHADOWS.xl,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${alpha(COLORS.gold, 0.15)}, transparent 70%)`,
              }} />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.xl,
                marginBottom: SPACING.xl,
              }}>
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 20px ${alpha(COLORS.purple, 0.5)}`,
                      `0 0 40px ${alpha(COLORS.purple, 0.3)}`,
                      `0 0 20px ${alpha(COLORS.purple, 0.5)}`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: RADIUS.full,
                    background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.cyan})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 36,
                  }}
                >
                  🧙
                </motion.div>

                <div>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.text.primary,
                    marginBottom: SPACING.xs,
                  }}>
                    道友，别来无恙
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING.lg,
                    flexWrap: 'wrap',
                  }}>
                    <span style={{
                      padding: `${SPACING.xs} ${SPACING.md}`,
                      borderRadius: RADIUS.full,
                      background: alpha(REALM_COLORS[stats.realm] || COLORS.gray400, 0.15),
                      color: REALM_COLORS[stats.realm] || COLORS.gray400,
                      fontSize: 13,
                      fontWeight: 600,
                    }}>
                      🎐 {stats.realm}期
                    </span>
                    <span style={{
                      fontSize: 13,
                      color: COLORS.text.muted,
                    }}>
                      📅 修道第 {stats.totalDays} 天
                    </span>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: SPACING.lg,
              }}>
                <div style={{
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  background: alpha(COLORS.gold, 0.08),
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.gold,
                  }}>
                    {stats.lingqi.toLocaleString()}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: COLORS.text.muted,
                  }}>
                    💎 灵气值
                  </div>
                </div>
                <div style={{
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  background: alpha(COLORS.green, 0.08),
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.green,
                  }}>
                    {stats.checkinStreak}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: COLORS.text.muted,
                  }}>
                    🔥 连续签到
                  </div>
                </div>
                <div style={{
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  background: alpha(COLORS.cyan, 0.08),
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.cyan,
                  }}>
                    {getShiChen()}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: COLORS.text.muted,
                  }}>
                    ⏰ 当前时辰
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              padding: SPACING.xl,
              borderRadius: RADIUS.xl,
              background: `linear-gradient(180deg, ${alpha(COLORS.gold, 0.1)}, ${alpha(COLORS.bg.dark, 0.95)})`,
              border: `1px solid ${alpha(COLORS.gold, 0.2)}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <div style={{
                textAlign: 'center',
                fontSize: 56,
                marginBottom: SPACING.lg,
                filter: `drop-shadow(0 0 20px ${alpha(COLORS.gold, 0.5)})`,
              }}>
                🏔️
              </div>
              <div style={{
                fontSize: 14,
                color: alpha(COLORS.gold, 0.8),
                lineHeight: 2.2,
                fontFamily: 'serif',
                textAlign: 'center',
              }}>
                「道可道，非常道。」
                <br />
                「名可名，非常名。」
                <br />
                「天地不仁，以万物为刍狗。」
              </div>
            </div>
          </div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: SPACING.xl,
        }}>
          {XIUZHEN_MODULES.map((mod, idx) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                y: -12,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={mod.href} passHref legacyBehavior>
                <a style={{ display: 'block', textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{
                      boxShadow: `0 25px 50px -12px ${alpha(mod.color, 0.25)}`,
                    }}
                    style={{
                      padding: SPACING.xl,
                      borderRadius: RADIUS.xl,
                      background: `
                        linear-gradient(180deg, ${alpha(mod.color, 0.12)}, transparent 55%),
                        ${COLORS.bg.card}
                      `,
                      border: `1px solid ${alpha(mod.color, 0.2)}`,
                      textAlign: 'center',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: -50,
                      right: -50,
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: mod.gradient,
                      opacity: 0.08,
                      filter: 'blur(20px)',
                    }} />

                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{ 
                        duration: 3, 
                        delay: idx * 0.2,
                        repeat: Infinity,
                      }}
                      style={{
                        fontSize: 42,
                        marginBottom: SPACING.lg,
                        filter: `drop-shadow(0 4px 15px ${alpha(mod.color, 0.5)})`,
                      }}
                    >
                      {mod.id === 'lishi' && '📜'}
                      {mod.id === 'renwu' && '📋'}
                      {mod.id === 'daolu' && '🧭'}
                      {mod.id === 'gongfa' && '📖'}
                      {mod.id === 'liandan' && '🏺'}
                      {mod.id === 'lianqi' && '⚒️'}
                      {mod.id === 'fulu' && '📜'}
                      {mod.id === 'zhenfa' && '🌀'}
                      {mod.id === 'jishi' && '⏱️'}
                      {mod.id === 'cangbao' && '💎'}
                    </motion.div>

                    <div style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: mod.color,
                      marginBottom: SPACING.sm,
                      letterSpacing: '4px',
                    }}>
                      {mod.char}
                    </div>
                    <div style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: COLORS.text.primary,
                      marginBottom: SPACING.md,
                    }}>
                      {mod.title}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: COLORS.text.muted,
                      lineHeight: 1.7,
                    }}>
                      {mod.desc}
                    </div>
                  </motion.div>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            marginTop: SPACING['4xl'],
            padding: SPACING.xl,
            borderRadius: RADIUS.lg,
            border: `1px solid ${alpha(COLORS.purple, 0.15)}`,
            background: `
              linear-gradient(90deg, 
                transparent, 
                ${alpha(COLORS.purple, 0.05)}, 
                ${alpha(COLORS.cyan, 0.05)}, 
                transparent
              )
            `,
            textAlign: 'center',
          }}
        >
          <div style={{
            fontSize: 13,
            color: alpha(COLORS.purple, 0.7),
            letterSpacing: '2px',
          }}>
            ☯️ 修真无岁月，寒尽不知年 ☯️
          </div>
        </motion.div>
      </SubPageTemplate>
    </>
  )
}
