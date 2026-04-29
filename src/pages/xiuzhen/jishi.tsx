import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import { COLORS, SPACING, RADIUS, alpha } from '@/styles/tokens'
import { useInterval, useLocalStorage } from '@/hooks'

const MEDITATION_LEVELS = [
  { name: '散念', bonus: 1, desc: '心猿意马，杂念纷飞' },
  { name: '静心', bonus: 2, desc: '心湖微漾，初窥门径' },
  { name: '入定', bonus: 5, desc: '古井无波，物我两忘' },
  { name: '坐忘', bonus: 10, desc: '天人合一，道心通明' },
  { name: '涅槃', bonus: 20, desc: '涅槃重生，破茧化蝶' },
]

const SHICHEN = [
  { name: '子时', range: '23:00-01:00', element: '水', bonus: 1.5, desc: '灵气最盛，修炼最佳时机' },
  { name: '丑时', range: '01:00-03:00', element: '土', bonus: 1.0, desc: '万籁俱寂' },
  { name: '寅时', range: '03:00-05:00', element: '木', bonus: 1.2, desc: '阳气初升' },
  { name: '卯时', range: '05:00-07:00', element: '木', bonus: 1.3, desc: '旭日东升' },
  { name: '辰时', range: '07:00-09:00', element: '土', bonus: 1.0, desc: '朝食之时' },
  { name: '巳时', range: '09:00-11:00', element: '火', bonus: 1.1, desc: '阳气渐盛' },
  { name: '午时', range: '11:00-13:00', element: '火', bonus: 1.4, desc: '烈日当空，火属性功法翻倍' },
  { name: '未时', range: '13:00-15:00', element: '土', bonus: 1.0, desc: '日昳之时' },
  { name: '申时', range: '15:00-17:00', element: '金', bonus: 1.1, desc: '夕阳西下' },
  { name: '酉时', range: '17:00-19:00', element: '金', bonus: 1.2, desc: '金乌西坠' },
  { name: '戌时', range: '19:00-21:00', element: '土', bonus: 1.0, desc: '黄昏时分' },
  { name: '亥时', range: '21:00-23:00', element: '水', bonus: 1.3, desc: '人定之时' },
]

const JIEQI = [
  '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
  '立夏', '小满', '芒种', '夏至', '小暑', '大暑',
  '立秋', '处暑', '白露', '秋分', '寒露', '霜降',
  '立冬', '小雪', '大雪', '冬至', '小寒', '大寒'
]

const getCurrentShichen = () => {
  const hour = new Date().getHours()
  const idx = (hour + 1) % 24
  return Math.floor(idx / 2)
}

const getMoonPhase = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()
  const lunarDays = (year * 365.25 + month * 30.44 + day) % 29.53
  const phase = Math.floor(lunarDays / 7.38)
  return ['新月🌑', '上弦🌓', '满月🌕', '下弦🌗'][phase]
}

export default function JiShiPage() {
  const [meditationLevel, setMeditationLevel] = useState(0)
  const [cultivationTime, setCultivationTime] = useLocalStorage('xiuzhen-time', 0)
  const [isRunning, setIsRunning] = useState(false)
  const [tianjieDays, setTianjieDays] = useState(99)
  const [realTime, setRealTime] = useState(new Date())
  const [enlightenment, setEnlightenment] = useState(false)
  const [dailyCheckIn, setDailyCheckIn] = useLocalStorage<Record<string, boolean>>('daily-checkin', {})
  const [checkInStreak, setCheckInStreak] = useLocalStorage('checkin-streak', 0)

  const currentShichenIdx = getCurrentShichen()
  const currentShichen = SHICHEN[currentShichenIdx]
  const moonPhase = getMoonPhase()

  useInterval(() => {
    setRealTime(new Date())
  }, 1000)

  useInterval(() => {
    if (isRunning) {
      const timeBonus = currentShichen.bonus
      const levelBonus = MEDITATION_LEVELS[meditationLevel].bonus
      setCultivationTime(prev => prev + Math.floor(timeBonus * levelBonus))
    }
  }, 1000)

  useInterval(() => {
    if (Math.random() < 0.002 && isRunning && meditationLevel >= 2) {
      setEnlightenment(true)
      setCultivationTime(prev => prev + 500)
      setTimeout(() => setEnlightenment(false), 3000)
    }
  }, 1000)

  const today = new Date().toLocaleDateString('zh-CN')
  const todayChecked = dailyCheckIn[today]

  const doCheckIn = () => {
    if (todayChecked) return
    setDailyCheckIn(prev => ({ ...prev, [today]: true }))
    setCheckInStreak(prev => prev + 1)
    setCultivationTime(prev => prev + 100 + checkInStreak * 10)
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const totalDays = Math.floor(cultivationTime / 60) + 1
  const realm = totalDays < 30 ? '炼气' : totalDays < 90 ? '筑基' :
               totalDays < 365 ? '金丹' : totalDays < 1000 ? '元婴' : '化神'

  const startMeditation = () => {
    setIsRunning(true)
  }

  const stopMeditation = () => {
    setIsRunning(false)
  }

  return (
    <SubPageTemplate
      title="修真计时"
      subtitle="洞中方一日，世上已千年"
      colorRgb={COLORS.cyanRgb}
    >
      <AnimatePresence>
        {enlightenment && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              padding: `${SPACING['2xl']} ${SPACING['4xl']}`,
              borderRadius: RADIUS.xl,
              background: `radial-gradient(circle, ${alpha(COLORS.gold, 0.9)}, ${alpha(COLORS.purple, 0.9)})`,
              boxShadow: `0 0 100px ${COLORS.gold}`,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 48, marginBottom: SPACING.md }}>💫</div>
            <div style={{
              fontSize: 32,
              fontWeight: 800,
              color: 'white',
              textShadow: `0 0 20px ${COLORS.gold}`,
            }}>
              顿悟天机！
            </div>
            <div style={{ color: alpha('white', 0.8), marginTop: SPACING.sm }}>
              修为 +500 · {currentShichen.name}灵气加成
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: SPACING.xl,
          borderRadius: RADIUS.xl,
          background: `linear-gradient(90deg, ${alpha(COLORS.cyan, 0.15)}, ${alpha(COLORS.purple, 0.1)})`,
          border: `1px solid ${alpha(COLORS.cyan, 0.2)}`,
          marginBottom: SPACING['3xl'],
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: SPACING.xl,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.cyan }}>
            {realTime.toLocaleTimeString('zh-CN', { hour12: false })}
          </div>
          <div style={{ fontSize: 13, color: COLORS.text.muted }}>
            北京时间 · 现实
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: 20,
            fontWeight: 700,
            color: currentShichen.bonus > 1.2 ? COLORS.gold : COLORS.text.primary,
          }}>
            {currentShichen.name} · {currentShichen.element}
          </div>
          <div style={{ fontSize: 13, color: COLORS.text.muted }}>
            {currentShichen.range} · {currentShichen.desc}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24 }}>{moonPhase}</div>
          <div style={{ fontSize: 13, color: COLORS.text.muted }}>
            修炼加成 ×{currentShichen.bonus}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={doCheckIn}
          disabled={todayChecked}
          style={{
            padding: `${SPACING.md} ${SPACING.xl}`,
            borderRadius: RADIUS.lg,
            background: todayChecked
              ? COLORS.gray800
              : `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.amber})`,
            border: 'none',
            color: todayChecked ? COLORS.text.muted : 'white',
            cursor: todayChecked ? 'not-allowed' : 'pointer',
            fontWeight: 600,
          }}
        >
          {todayChecked ? '✓ 今日已签到' : `🌟 每日签到 (+${100 + checkInStreak * 10})`}
          <div style={{ fontSize: 11, opacity: 0.8 }}>
            连续 {checkInStreak} 天
          </div>
        </motion.button>
      </motion.div>

      <div className="grid-2" style={{ gap: SPACING['3xl'] }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            padding: SPACING['3xl'],
            borderRadius: RADIUS.xl,
            background: `radial-gradient(ellipse at 50% 30%, ${alpha(COLORS.cyan, 0.12)}, ${alpha(COLORS.purple, 0.06)})`,
            border: `1px solid ${alpha(COLORS.cyan, 0.2)}`,
            textAlign: 'center',
          }}
        >
          <h3 style={{
            fontSize: 20,
            color: COLORS.cyan,
            marginBottom: SPACING.xl,
          }}>
            🧘 打坐修炼
          </h3>

          <motion.div
            animate={isRunning ? {
              boxShadow: [
                `0 0 20px ${alpha(COLORS.cyan, 0.3)}`,
                `0 0 60px ${alpha(COLORS.cyan, 0.6)}`,
                `0 0 20px ${alpha(COLORS.cyan, 0.3)}`,
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              padding: SPACING.xl,
              borderRadius: RADIUS.xl,
              background: alpha(COLORS.bg.dark, 0.5),
              border: `1px solid ${alpha(COLORS.cyan, 0.3)}`,
              marginBottom: SPACING.xl,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {isRunning && (
              <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at 50% 50%, ${alpha(COLORS.cyan, 0.2)}, transparent 70%)`,
                  pointerEvents: 'none',
                }}
              />
            )}
            <div style={{
              fontSize: 56,
              fontWeight: 800,
              fontFamily: 'monospace',
              color: isRunning ? COLORS.cyan : COLORS.text.muted,
              letterSpacing: 4,
            }}>
              {formatTime(cultivationTime)}
            </div>
            <div style={{
              marginTop: SPACING.md,
              color: COLORS.text.secondary,
            }}>
              修真 <span style={{ color: COLORS.gold, fontWeight: 600 }}>{totalDays}</span> 日 ·
              已达 <span style={{ color: COLORS.purple, fontWeight: 600 }}>{realm}</span> 境界
            </div>
            {isRunning && (
              <div style={{
                marginTop: SPACING.sm,
                fontSize: 12,
                color: COLORS.gold,
              }}>
                实时加成：时辰 ×{currentShichen.bonus} · 入定 ×{MEDITATION_LEVELS[meditationLevel].bonus}
              </div>
            )}
          </motion.div>

          <div style={{ marginBottom: SPACING.xl }}>
            <div style={{
              color: COLORS.text.muted,
              fontSize: 13,
              marginBottom: SPACING.md,
            }}>
              入定深度
            </div>
            <div style={{
              display: 'flex',
              gap: SPACING.sm,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              {MEDITATION_LEVELS.map((level, idx) => (
                <motion.button
                  key={level.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMeditationLevel(idx)}
                  style={{
                    padding: `${SPACING.sm} ${SPACING.md}`,
                    borderRadius: RADIUS.md,
                    background: meditationLevel === idx
                      ? `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple})`
                      : alpha(COLORS.gray700, 0.5),
                    border: `1px solid ${meditationLevel === idx
                      ? alpha(COLORS.cyan, 0.5)
                      : alpha(COLORS.gray600, 0.2)}`,
                    color: meditationLevel === idx ? 'white' : COLORS.text.secondary,
                    cursor: 'pointer',
                    fontSize: 12,
                  }}
                >
                  {level.name} ×{level.bonus}
                </motion.button>
              ))}
            </div>
            <div style={{
              marginTop: SPACING.md,
              color: COLORS.text.muted,
              fontSize: 12,
            }}>
              {MEDITATION_LEVELS[meditationLevel].desc}
            </div>
          </div>

          <div style={{ display: 'flex', gap: SPACING.lg, justifyContent: 'center' }}>
            {!isRunning ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startMeditation}
                style={{
                  padding: `${SPACING.lg} ${SPACING['3xl']}`,
                  borderRadius: RADIUS.lg,
                  background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.teal})`,
                  border: 'none',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              >
                🕯️ 开始打坐
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopMeditation}
                style={{
                  padding: `${SPACING.lg} ${SPACING['3xl']}`,
                  borderRadius: RADIUS.lg,
                  background: COLORS.gray700,
                  border: 'none',
                  color: COLORS.text.secondary,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              >
                ⏹️ 收功出关
              </motion.button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{
            padding: SPACING.xl,
            borderRadius: RADIUS.lg,
            background: `linear-gradient(135deg, ${alpha(COLORS.red, 0.15)}, ${alpha(COLORS.gold, 0.08)})`,
            border: `1px solid ${alpha(COLORS.red, 0.25)}`,
            marginBottom: SPACING.xl,
          }}>
            <h4 style={{
              fontSize: 18,
              color: COLORS.red,
              marginBottom: SPACING.lg,
              textAlign: 'center',
            }}>
              ⚡ 天劫倒计时
            </h4>
            <div style={{
              textAlign: 'center',
              fontSize: 48,
              fontWeight: 800,
              color: COLORS.red,
              marginBottom: SPACING.md,
            }}>
              {tianjieDays}
              <span style={{ fontSize: 20, color: COLORS.text.muted }}> 天</span>
            </div>
            <div style={{
              height: 8,
              background: alpha(COLORS.gray800, 0.5),
              borderRadius: RADIUS.full,
              overflow: 'hidden',
              marginBottom: SPACING.md,
            }}>
              <div style={{
                width: `${(1 - tianjieDays / 99) * 100}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${COLORS.red}, ${COLORS.gold})`,
                borderRadius: RADIUS.full,
              }} />
            </div>
            <div style={{
              columns: 2,
              fontSize: 13,
              color: COLORS.text.secondary,
              gap: SPACING.lg,
            }}>
              <p>🔮 准备足够的渡劫丹</p>
              <p>🛡️ 炼制护身法宝</p>
              <p>🧘 稳固当前境界</p>
              <p>⚡ 寻找安全渡劫地</p>
            </div>
          </div>

          <h4 style={{
            fontSize: 16,
            color: COLORS.gold,
            marginBottom: SPACING.lg,
          }}>
            📅 十二时辰修炼指南
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: SPACING.md,
          }}>
            {SHICHEN.map((sc, idx) => (
              <div
                key={sc.name}
                style={{
                  padding: SPACING.md,
                  borderRadius: RADIUS.lg,
                  background: idx === currentShichenIdx
                    ? alpha(COLORS.cyan, 0.15)
                    : alpha(COLORS.bg.card, 1),
                  border: `1px solid ${idx === currentShichenIdx
                    ? alpha(COLORS.cyan, 0.4)
                    : alpha(COLORS.gray600, 0.15)}`,
                  textAlign: 'center',
                }}
              >
                <div style={{
                  color: idx === currentShichenIdx ? COLORS.cyan : COLORS.text.primary,
                  fontWeight: idx === currentShichenIdx ? 600 : 400,
                  fontSize: 13,
                }}>
                  {sc.name}
                </div>
                <div style={{ fontSize: 11, color: COLORS.text.muted }}>
                  {sc.range}
                </div>
                {sc.bonus > 1.1 && (
                  <div style={{
                    fontSize: 11,
                    color: COLORS.gold,
                    marginTop: 2,
                  }}>
                    ×{sc.bonus}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: SPACING['4xl'],
          padding: SPACING.xl,
          borderRadius: RADIUS.lg,
          background: alpha(COLORS.bg.glass, 1),
          border: `1px solid ${alpha(COLORS.cyan, 0.15)}`,
          textAlign: 'center',
        }}
      >
        <div style={{
          color: alpha(COLORS.cyan, 0.7),
          fontSize: 14,
          lineHeight: 2,
        }}>
          「人身难得今已得，中土难生今已生，正法难闻今已闻，此身不向今生度，更向何生度此身。」
        </div>
      </motion.div>
    </SubPageTemplate>
  )
}
