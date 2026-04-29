import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import ParticleField from '@/components/effects/Particles'
import { COLORS, SPACING, RADIUS, alpha } from '@/styles/tokens'
import { useLocalStorage } from '@/hooks'

const XIUZHEN_QIYU = [
  {
    id: 'lingcao',
    name: '灵草现世',
    desc: '路边发现一株年份不浅的灵草',
    type: 'good',
    rarity: 'common',
    effect: { lingqi: [20, 100] },
    flavor: '周遭灵气波动，原来是一株',
  },
  {
    id: 'laodao',
    name: '老道传法',
    desc: '路遇无名老道指点一二',
    type: 'good',
    rarity: 'rare',
    effect: { lingqi: [100, 300], exp: [50, 100] },
    flavor: '「年轻人，我看你骨骼清奇...」',
  },
  {
    id: 'tianji',
    name: '顿悟天机',
    desc: '修行瓶颈突然打破',
    type: 'excellent',
    rarity: 'legendary',
    effect: { lingqi: [500, 1000], exp: [200, 500] },
    flavor: '一刹那醍醐灌顶，灵台清明！',
  },
  {
    id: 'yaomo',
    name: '邪祟侵扰',
    desc: '夜间修行遭遇阴邪',
    type: 'bad',
    rarity: 'common',
    effect: { lingqi: [-50, -20] },
    flavor: '走火入魔！真气逆行...',
  },
  {
    id: 'guren',
    name: '古人遗迹',
    desc: '发现前辈修士洞府',
    type: 'good',
    rarity: 'epic',
    effect: { lingqi: [200, 600] },
    flavor: '石室内丹炉犹温，不知是何年代留下...',
  },
  {
    id: 'heaven',
    name: '天降祥瑞',
    desc: '修行之时天降异象',
    type: 'excellent',
    rarity: 'legendary',
    effect: { lingqi: [800, 1500], luck: [1, 3] },
    flavor: '紫电青霜，祥云盖顶！此乃圣人之兆！',
  },
  {
    id: 'shangren',
    name: '行脚商人',
    desc: '神秘商人兜售奇物',
    type: 'neutral',
    rarity: 'rare',
    effect: { lingqi: [-100, 200] },
    flavor: '「客官，要丹药还是功法？」',
  },
  {
    id: 'jieyin',
    name: '接引之光',
    desc: '冥冥中有人呼唤',
    type: 'good',
    rarity: 'epic',
    effect: { lingqi: [300, 700] },
    flavor: '灵台深处，仿佛听到仙乐...',
  },
  {
    id: 'leijie',
    name: '心魔劫',
    desc: '雷劫前兆，心魔丛生',
    type: 'bad',
    rarity: 'rare',
    effect: { lingqi: [-200, -100] },
    flavor: '大道艰难，岂能一帆风顺！',
  },
  {
    id: 'mengzhong',
    name: '梦中授法',
    desc: '梦中得仙人传授',
    type: 'excellent',
    rarity: 'legendary',
    effect: { lingqi: [600, 1200], exp: [300, 600] },
    flavor: '真仙入梦，醒来历历在目！',
  },
  {
    id: 'fengbao',
    name: '灵气风暴',
    desc: '天地灵气潮汐来临',
    type: 'good',
    rarity: 'rare',
    effect: { lingqi: [150, 400] },
    flavor: '四面八方灵气涌聚而来！',
  },
  {
    id: 'suoming',
    name: '前世记忆',
    desc: '突然记起前世碎片',
    type: 'excellent',
    rarity: 'epic',
    effect: { lingqi: [400, 800] },
    flavor: '原来，这已是我第九世修仙...',
  },
  {
    id: 'wugou',
    name: '明镜无垢',
    desc: '心湖澄澈，道心稳固',
    type: 'good',
    rarity: 'rare',
    effect: { exp: [100, 250] },
    flavor: '千般念头，化为一念！',
  },
  {
    id: 'dijiao',
    name: '地底灵脉',
    desc: '感应到地下龙脉震动',
    type: 'good',
    rarity: 'epic',
    effect: { lingqi: [350, 650] },
    flavor: '地肺深处，传来远古龙鸣...',
  },
  {
    id: 'molin',
    name: '魔临人间',
    desc: '域外天魔窥伺',
    type: 'bad',
    rarity: 'epic',
    effect: { lingqi: [-300, -150] },
    flavor: '守住本心！破而后立，否极泰来！',
  },
]

const RARITY_CONFIG: Record<string, { color: string; chance: number; name: string }> = {
  common: { color: COLORS.gray400, chance: 0.45, name: '凡俗' },
  rare: { color: COLORS.green, chance: 0.30, name: '机缘' },
  epic: { color: COLORS.purple, chance: 0.15, name: '奇遇' },
  legendary: { color: COLORS.gold, chance: 0.10, name: '天授' },
}

interface CultivationState {
  lingqi: number
  exp: number
  luck: number
  qiyuHistory: Array<{
    id: string
    name: string
    result: number
    timestamp: number
  }>
  lastQiyuTime: number
}

export default function QiYuPage() {
  const [state, setState] = useLocalStorage<CultivationState>('qiyu-state', {
    lingqi: 0,
    exp: 0,
    luck: 0,
    qiyuHistory: [],
    lastQiyuTime: 0,
  })
  const [currentQiyu, setCurrentQiyu] = useState<typeof XIUZHEN_QIYU[0] | null>(null)
  const [qiyuResult, setQiyuResult] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    const checkCooldown = () => {
      const now = Date.now()
      const elapsed = Math.floor((now - state.lastQiyuTime) / 1000)
      const remaining = Math.max(0, 300 - elapsed)
      setCooldown(remaining)
    }
    
    checkCooldown()
    const timer = setInterval(checkCooldown, 1000)
    return () => clearInterval(timer)
  }, [state.lastQiyuTime])

  const rollQiyu = useCallback(() => {
    if (cooldown > 0 || isAnimating) return

    setIsAnimating(true)

    const roll = Math.random()
    let cumulative = 0
    let selectedRarity = 'common'
    
    for (const [rarity, config] of Object.entries(RARITY_CONFIG)) {
      cumulative += config.chance
      if (roll <= cumulative) {
        selectedRarity = rarity
        break
      }
    }

    const candidates = XIUZHEN_QIYU.filter(q => q.rarity === selectedRarity)
    const selected = candidates[Math.floor(Math.random() * candidates.length)]

    setTimeout(() => {
      setCurrentQiyu(selected)

      const [min, max] = selected.effect.lingqi || [0, 0]
      const result = Math.floor(Math.random() * (max - min + 1)) + min

      setTimeout(() => {
        setQiyuResult(result)
        setState(prev => ({
          ...prev,
          lingqi: prev.lingqi + result,
          exp: prev.exp + (selected.effect.exp 
            ? Math.floor(Math.random() * (selected.effect.exp[1] - selected.effect.exp[0] + 1)) + selected.effect.exp[0]
            : 0),
          luck: prev.luck + (selected.effect.luck
            ? Math.floor(Math.random() * (selected.effect.luck[1] - selected.effect.luck[0] + 1)) + selected.effect.luck[0]
            : 0),
          qiyuHistory: [{
            id: selected.id,
            name: selected.name,
            result,
            timestamp: Date.now(),
          }, ...prev.qiyuHistory].slice(0, 50),
          lastQiyuTime: Date.now(),
        }))

        setTimeout(() => {
          setCurrentQiyu(null)
          setQiyuResult(null)
          setIsAnimating(false)
        }, 2500)
      }, 1500)
    }, 1000)
  }, [cooldown, isAnimating, setState])

  const goodCount = state.qiyuHistory.filter(h => h.result > 0).length
  const badCount = state.qiyuHistory.filter(h => h.result < 0).length
  const totalLingqi = state.qiyuHistory.reduce((sum, h) => sum + h.result, 0)

  return (
    <>
      <ParticleField type="spiritual" density={1.2} speed={0.5} interactive />

      <SubPageTemplate
        title="修真机缘"
        subtitle="大道五十，天衍四九，人遁其一"
        colorRgb={COLORS.purpleRgb}
      >
        <AnimatePresence>
          {currentQiyu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5, y: -100 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                minWidth: 380,
              }}
            >
              <motion.div
                animate={qiyuResult !== null ? {
                  boxShadow: [
                    `0 0 30px ${RARITY_CONFIG[currentQiyu.rarity].color}`,
                    `0 0 60px ${RARITY_CONFIG[currentQiyu.rarity].color}`,
                    `0 0 30px ${RARITY_CONFIG[currentQiyu.rarity].color}`,
                  ],
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  padding: SPACING['2xl'],
                  borderRadius: RADIUS.xl,
                  background: `
                    radial-gradient(ellipse at top, ${alpha(RARITY_CONFIG[currentQiyu.rarity].color, 0.25)}, transparent 55%),
                    linear-gradient(180deg, ${alpha(COLORS.bg.dark, 0.98)}, ${COLORS.bg.dark})
                  `,
                  border: `2px solid ${RARITY_CONFIG[currentQiyu.rarity].color}`,
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: RARITY_CONFIG[currentQiyu.rarity].color,
                  letterSpacing: '4px',
                  marginBottom: SPACING.md,
                }}>
                  【{RARITY_CONFIG[currentQiyu.rarity].name}】
                </div>

                <div style={{
                  fontSize: 56,
                  marginBottom: SPACING.lg,
                  filter: `drop-shadow(0 0 20px ${RARITY_CONFIG[currentQiyu.rarity].color})`,
                }}>
                  {currentQiyu.type === 'excellent' ? '🌟' :
                   currentQiyu.type === 'good' ? '✨' :
                   currentQiyu.type === 'bad' ? '💀' : '❓'}
                </div>

                <div style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: RARITY_CONFIG[currentQiyu.rarity].color,
                  marginBottom: SPACING.md,
                }}>
                  {currentQiyu.name}
                </div>

                <div style={{
                  fontSize: 14,
                  color: alpha(COLORS.text.secondary, 0.9),
                  fontStyle: 'italic',
                  marginBottom: SPACING.xl,
                  fontFamily: 'serif',
                }}>
                  「{currentQiyu.flavor}」
                </div>

                <AnimatePresence>
                  {qiyuResult !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      style={{
                        fontSize: 36,
                        fontWeight: 900,
                        color: qiyuResult >= 0 ? COLORS.green : COLORS.red,
                        textShadow: `0 0 30px ${qiyuResult >= 0 ? COLORS.green : COLORS.red}`,
                      }}
                    >
                      {qiyuResult >= 0 ? '+' : ''}{qiyuResult} 灵气
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: SPACING['4xl'] }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: SPACING.lg,
            marginBottom: SPACING['2xl'],
          }}>
            {[
              { label: '累计灵气', value: totalLingqi, color: COLORS.gold, icon: '💎' },
              { label: '善缘次数', value: goodCount, color: COLORS.green, icon: '🍀' },
              { label: '心魔劫数', value: badCount, color: COLORS.red, icon: '💀' },
              { label: '福缘值', value: state.luck, color: COLORS.purple, icon: '⭐' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                style={{
                  padding: SPACING.xl,
                  borderRadius: RADIUS.xl,
                  background: alpha(stat.color, 0.08),
                  border: `1px solid ${alpha(stat.color, 0.2)}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: SPACING.sm }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: stat.color,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 12,
                  color: COLORS.text.muted,
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            padding: SPACING['2xl'],
            borderRadius: RADIUS.xl,
            background: `
              radial-gradient(ellipse at 50% 0%, ${alpha(COLORS.purple, 0.15)}, transparent 50%),
              radial-gradient(ellipse at 50% 100%, ${alpha(COLORS.gold, 0.1)}, transparent 50%),
              ${alpha(COLORS.bg.card, 0.9)}
            `,
            border: `1px solid ${alpha(COLORS.purple, 0.2)}`,
          }}>
            <motion.button
              whileHover={cooldown === 0 ? { scale: 1.05 } : {}}
              whileTap={cooldown === 0 ? { scale: 0.95 } : {}}
              onClick={rollQiyu}
              disabled={cooldown > 0 || isAnimating}
              style={{
                padding: `${SPACING.xl} ${SPACING['3xl']}`,
                borderRadius: RADIUS.full,
                background: cooldown > 0
                  ? alpha(COLORS.gray600, 0.3)
                  : `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.gold})`,
                border: 'none',
                color: 'white',
                fontSize: 18,
                fontWeight: 700,
                cursor: cooldown > 0 ? 'not-allowed' : 'pointer',
                boxShadow: cooldown === 0
                  ? `0 15px 50px -10px ${alpha(COLORS.purple, 0.5)}`
                  : 'none',
                transition: 'all 0.3s ease',
                minWidth: 260,
              }}
            >
              {cooldown > 0 ? (
                `⏳ 调息中... ${Math.floor(cooldown / 60)}:${(cooldown % 60).toString().padStart(2, '0')}`
              ) : isAnimating ? (
                '🔮 天地感应中...'
              ) : (
                '🎲 叩问天机'
              )}
            </motion.button>

            <div style={{
              marginTop: SPACING.lg,
              fontSize: 13,
              color: COLORS.text.muted,
            }}>
              每5分钟可寻求一次机缘 · 天命难测，心诚则灵
            </div>
          </div>
        </motion.div>

        <div>
          <h3 style={{
            fontSize: 18,
            color: COLORS.purple,
            marginBottom: SPACING.xl,
          }}>
            📜 修仙履历
          </h3>

          {state.qiyuHistory.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                padding: SPACING['3xl'],
                borderRadius: RADIUS.xl,
                background: alpha(COLORS.gray800, 0.3),
                textAlign: 'center',
                color: COLORS.text.muted,
              }}>
              <div style={{ fontSize: 48, marginBottom: SPACING.lg }}>🌌</div>
              <div>道途伊始，尚无际遇...</div>
              <div style={{ fontSize: 12, marginTop: SPACING.md }}>
                上方叩问天机，开启你的修仙奇缘
              </div>
            </motion.div>
          ) : (
            <div style={{
              display: 'grid',
              gap: SPACING.md,
              maxHeight: 450,
              overflowY: 'auto',
              paddingRight: SPACING.md,
            }}>
              {state.qiyuHistory.slice(0, 20).map((record, idx) => {
                const qiyu = XIUZHEN_QIYU.find(q => q.id === record.id)
                const timeStr = new Date(record.timestamp).toLocaleTimeString('zh-CN')
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    style={{
                      padding: SPACING.lg,
                      borderRadius: RADIUS.lg,
                      background: alpha(COLORS.bg.card, 0.6),
                      border: `1px solid ${alpha(
                        record.result > 0 ? COLORS.green : record.result < 0 ? COLORS.red : COLORS.gray500,
                        0.15
                      )}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <span style={{
                        color: qiyu ? RARITY_CONFIG[qiyu.rarity].color : COLORS.text.secondary,
                        fontWeight: 600,
                        marginRight: SPACING.lg,
                      }}>
                        {record.name}
                      </span>
                      <span style={{
                        fontSize: 12,
                        color: COLORS.text.muted,
                      }}>
                        {timeStr}
                      </span>
                    </div>
                    <span style={{
                      fontWeight: 700,
                      color: record.result > 0 ? COLORS.green : record.result < 0 ? COLORS.red : COLORS.text.muted,
                    }}>
                      {record.result >= 0 ? '+' : ''}{record.result}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            marginTop: SPACING['4xl'],
            padding: SPACING.xl,
            borderRadius: RADIUS.lg,
            background: alpha(COLORS.purple, 0.05),
            border: `1px solid ${alpha(COLORS.purple, 0.1)}`,
            textAlign: 'center',
          }}
        >
          <div style={{
            color: alpha(COLORS.purple, 0.7),
            fontSize: 14,
            lineHeight: 2,
            fontFamily: 'serif',
          }}>
            「天道无亲，常与善人。」
            <br />
            「祸兮福之所倚，福兮祸之所伏。」
          </div>
        </motion.div>
      </SubPageTemplate>
    </>
  )
}
