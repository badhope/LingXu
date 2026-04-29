import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import ParticleField from '@/components/effects/Particles'
import { COLORS, SPACING, RADIUS, alpha } from '@/styles/tokens'
import { useLocalStorage, useMount } from '@/hooks'

const DAILY_TASKS = [
  {
    id: 'dazuo',
    name: '日常打坐',
    desc: '进行一次冥想打坐，持续10分钟',
    reward: { lingqi: 50, exp: 10 },
    type: 'daily',
    icon: '🧘',
  },
  {
    id: 'shu',
    name: '练字静心',
    desc: '练习书法一页，抄写经文',
    reward: { lingqi: 30, exp: 15 },
    type: 'daily',
    icon: '✍️',
  },
  {
    id: 'yangsheng',
    name: '养生功法',
    desc: '八段锦/太极拳一遍',
    reward: { lingqi: 40, exp: 20 },
    type: 'daily',
    icon: '☯️',
  },
  {
    id: 'daoyin',
    name: '吐纳导引',
    desc: '深呼吸一百次，采天地灵气',
    reward: { lingqi: 25, exp: 5 },
    type: 'daily',
    icon: '🌬️',
  },
  {
    id: 'guanchan',
    name: '止观禅定',
    desc: '观想丹田，意守一炷香',
    reward: { lingqi: 80, exp: 30 },
    type: 'daily',
    icon: '🪷',
  },
  {
    id: 'xingshan',
    name: '行善积德',
    desc: '日行一善，积累阴德',
    reward: { lingqi: 100, exp: 50, luck: 1 },
    type: 'daily',
    icon: '🙏',
  },
]

const WEEKLY_TASKS = [
  {
    id: 'fahui',
    name: '共修法会',
    desc: '参与一次集体共修活动',
    reward: { lingqi: 300, exp: 100 },
    type: 'weekly',
    icon: '🔔',
  },
  {
    id: 'shanjing',
    name: '抄经一部',
    desc: '完整抄写一部经典经文',
    reward: { lingqi: 200, exp: 80 },
    type: 'weekly',
    icon: '📿',
  },
  {
    id: 'bigu',
    name: '辟谷一日',
    desc: '断食一日，净化身心',
    reward: { lingqi: 250, exp: 120 },
    type: 'weekly',
    icon: '🍃',
  },
  {
    id: 'mingshan',
    name: '朝拜灵山',
    desc: '登临一座名山大川',
    reward: { lingqi: 500, exp: 200 },
    type: 'weekly',
    icon: '⛰️',
  },
]

const ACHIEVEMENTS = [
  {
    id: 'xiuxing100',
    name: '初入仙门',
    desc: '累计修炼满100天',
    condition: (stats: CultivationStats) => stats.totalDays >= 100,
    reward: { title: '修士' },
    icon: '🌟',
  },
  {
    id: 'qiandao7',
    name: '坚持不懈',
    desc: '连续签到满7天',
    condition: (stats: CultivationStats) => stats.checkinStreak >= 7,
    reward: { lingqi: 500 },
    icon: '📅',
  },
  {
    id: 'liandan10',
    name: '丹师学徒',
    desc: '成功炼丹10次',
    condition: (stats: CultivationStats) => stats.pillsMade >= 10,
    reward: { title: '丹徒' },
    icon: '🏺',
  },
  {
    id: 'lianqi5',
    name: '铸剑大师',
    desc: '成功炼器5次',
    condition: (stats: CultivationStats) => stats.weaponsMade >= 5,
    reward: { title: '器师' },
    icon: '⚒️',
  },
  {
    id: 'enlightenment',
    name: '顿悟天机',
    desc: '触发一次顿悟事件',
    condition: (stats: CultivationStats) => stats.enlightenments >= 1,
    reward: { lingqi: 1000 },
    icon: '💫',
  },
  {
    id: 'yuanying',
    name: '元婴老祖',
    desc: '达到元婴境界',
    condition: (stats: CultivationStats) => stats.realm === '元婴',
    reward: { title: '老祖' },
    icon: '👑',
  },
]

interface CultivationStats {
  totalDays: number
  checkinStreak: number
  pillsMade: number
  weaponsMade: number
  enlightenments: number
  realm: string
  lingqi: number
  completedTasks: string[]
  unlockedAchievements: string[]
}

const getTodayStr = () => new Date().toLocaleDateString('zh-CN')

export default function RenWuPage() {
  const [stats, setStats] = useLocalStorage<CultivationStats>('cultivation-stats', {
    totalDays: 1,
    checkinStreak: 0,
    pillsMade: 0,
    weaponsMade: 0,
    enlightenments: 0,
    realm: '炼气',
    lingqi: 0,
    completedTasks: [],
    unlockedAchievements: [],
  })
  const [todayTasks, setTodayTasks] = useLocalStorage<Record<string, boolean>>('today-tasks', {})
  const [showReward, setShowReward] = useState<{ name: string; reward: string } | null>(null)
  const today = getTodayStr()

  useMount(() => {
    const lastDate = localStorage.getItem('last-task-date')
    if (lastDate !== today) {
      setTodayTasks({})
      localStorage.setItem('last-task-date', today)
    }
  })

  const completeTask = (task: typeof DAILY_TASKS[0]) => {
    if (todayTasks[task.id]) return

    setTodayTasks(prev => ({ ...prev, [task.id]: true }))
    setStats(prev => ({
      ...prev,
      lingqi: prev.lingqi + (task.reward.lingqi || 0),
      completedTasks: [...prev.completedTasks, `${today}-${task.id}`],
    }))

    const rewardText = Object.entries(task.reward)
      .map(([k, v]) => `${k === 'lingqi' ? '灵气' : k === 'exp' ? '修为' : k === 'luck' ? '气运' : k}+${v}`)
      .join('，')

    setShowReward({ name: task.name, reward: rewardText })
    setTimeout(() => setShowReward(null), 2500)
  }

  const isTaskCompleted = (taskId: string) => todayTasks[taskId] === true

  const dailyCompleted = DAILY_TASKS.filter(t => isTaskCompleted(t.id)).length
  const dailyTotal = DAILY_TASKS.length

  const progressColors = [COLORS.red, COLORS.orange, COLORS.amber, COLORS.green, COLORS.cyan, COLORS.purple]

  return (
    <>
      <ParticleField type="spiritual" density={0.5} speed={0.4} interactive />

      <SubPageTemplate
        title="修真任务"
        subtitle="末法时代修行不易，日积跬步以至千里"
        colorRgb={COLORS.greenRgb}
      >
        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.5, y: -50 }}
              style={{
                position: 'fixed',
                top: '40%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9999,
                padding: `${SPACING.xl} ${SPACING['2xl']}`,
                borderRadius: RADIUS.xl,
                background: `radial-gradient(circle, ${alpha(COLORS.green, 0.95)}, ${alpha(COLORS.cyan, 0.9)})`,
                boxShadow: `0 0 60px ${COLORS.green}`,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: SPACING.md }}>✨</div>
              <div style={{
                fontSize: 20,
                fontWeight: 700,
                color: 'white',
                marginBottom: SPACING.sm,
              }}>
                「{showReward.name}」完成！
              </div>
              <div style={{ color: alpha('white', 0.9) }}>
                获得：{showReward.reward}
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
            background: `linear-gradient(135deg, ${alpha(COLORS.green, 0.12)}, ${alpha(COLORS.cyan, 0.08)})`,
            border: `1px solid ${alpha(COLORS.green, 0.2)}`,
            marginBottom: SPACING['3xl'],
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: SPACING.xl,
          }}>
            <div>
              <div style={{
                fontSize: 24,
                fontWeight: 700,
                color: COLORS.green,
                marginBottom: SPACING.sm,
              }}>
                📅 {today}
              </div>
              <div style={{ color: COLORS.text.secondary }}>
                今日修行进度：{dailyCompleted} / {dailyTotal}
              </div>
            </div>
            <div>
              <div style={{
                width: 220,
                height: 16,
                background: alpha(COLORS.gray800, 0.5),
                borderRadius: RADIUS.full,
                overflow: 'hidden',
              }}>
                <motion.div
                  animate={{ width: `${(dailyCompleted / dailyTotal) * 100}%` }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.cyan})`,
                    borderRadius: RADIUS.full,
                  }}
                />
              </div>
              <div style={{
                textAlign: 'right',
                marginTop: SPACING.sm,
                fontSize: 13,
                color: COLORS.text.muted,
              }}>
                💎 灵气余额：{stats.lingqi}
              </div>
            </div>
          </div>
        </motion.div>

        <div style={{ marginBottom: SPACING['4xl'] }}>
          <h3 style={{
            fontSize: 20,
            color: COLORS.green,
            marginBottom: SPACING.xl,
          }}>
            🌅 日常功课
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: SPACING.lg,
          }}>
            {DAILY_TASKS.map((task, idx) => {
              const completed = isTaskCompleted(task.id)
              const color = progressColors[idx % progressColors.length]

              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: idx % 2 ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: completed ? 1 : 1.02 }}
                  onClick={() => !completed && completeTask(task)}
                  style={{
                    padding: SPACING.xl,
                    borderRadius: RADIUS.xl,
                    background: completed
                      ? alpha(COLORS.gray800, 0.3)
                      : `linear-gradient(135deg, ${alpha(color, 0.12)}, ${alpha(COLORS.bg.dark, 0.9)})`,
                    border: `1px solid ${completed
                      ? alpha(COLORS.gray600, 0.2)
                      : alpha(color, 0.25)}`,
                    cursor: completed ? 'default' : 'pointer',
                    opacity: completed ? 0.6 : 1,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {completed && (
                    <div style={{
                      position: 'absolute',
                      top: SPACING.md,
                      right: SPACING.md,
                      fontSize: 24,
                    }}>
                      ✅
                    </div>
                  )}

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING.lg,
                    marginBottom: SPACING.md,
                  }}>
                    <span style={{ fontSize: 36 }}>{task.icon}</span>
                    <div>
                      <div style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: completed ? COLORS.text.muted : COLORS.text.primary,
                      }}>
                        {task.name}
                      </div>
                      <div style={{
                        fontSize: 13,
                        color: COLORS.text.secondary,
                      }}>
                        {task.desc}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: SPACING.md,
                    flexWrap: 'wrap',
                  }}>
                    {Object.entries(task.reward).map(([k, v]) => (
                      <span
                        key={k}
                        style={{
                          padding: `${SPACING.xs} ${SPACING.md}`,
                          borderRadius: RADIUS.full,
                          background: alpha(color, 0.15),
                          color,
                          fontSize: 12,
                        }}
                      >
                        {k === 'lingqi' ? '灵气' : k === 'exp' ? '修为' : '气运'} +{v}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div style={{ marginBottom: SPACING['4xl'] }}>
          <h3 style={{
            fontSize: 18,
            color: COLORS.purple,
            marginBottom: SPACING.xl,
          }}>
            📆 周常使命
          </h3>

          <div className="grid-2" style={{ gap: SPACING.lg }}>
            {WEEKLY_TASKS.map((task, idx) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                style={{
                  padding: SPACING.xl,
                  borderRadius: RADIUS.xl,
                  background: `linear-gradient(135deg, ${alpha(COLORS.purple, 0.1)}, ${alpha(COLORS.bg.dark, 0.9)})`,
                  border: `1px solid ${alpha(COLORS.purple, 0.2)}`,
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.lg,
                }}>
                  <span style={{ fontSize: 40 }}>{task.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.purple,
                    }}>
                      {task.name}
                    </div>
                    <div style={{
                      fontSize: 13,
                      color: COLORS.text.secondary,
                      marginBottom: SPACING.md,
                    }}>
                      {task.desc}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: COLORS.gold,
                    }}>
                      💎 灵气 +{task.reward.lingqi} · 修为 +{task.reward.exp}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{
            fontSize: 18,
            color: COLORS.gold,
            marginBottom: SPACING.xl,
          }}>
            🏆 成就殿堂
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: SPACING.lg,
          }}>
            {ACHIEVEMENTS.map((ach, idx) => {
              const unlocked = stats.unlockedAchievements.includes(ach.id)

              return (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  style={{
                    padding: SPACING.lg,
                    borderRadius: RADIUS.xl,
                    background: unlocked
                      ? alpha(COLORS.gold, 0.12)
                      : alpha(COLORS.gray800, 0.3),
                    border: `1px solid ${unlocked
                      ? alpha(COLORS.gold, 0.4)
                      : alpha(COLORS.gray600, 0.15)}`,
                    textAlign: 'center',
                    filter: unlocked ? 'none' : 'grayscale(1)',
                    opacity: unlocked ? 1 : 0.5,
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: SPACING.sm }}>
                    {ach.icon}
                  </div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: unlocked ? COLORS.gold : COLORS.text.muted,
                  }}>
                    {ach.name}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: COLORS.text.muted,
                    marginTop: SPACING.xs,
                  }}>
                    {ach.desc}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            marginTop: SPACING['4xl'],
            padding: SPACING.xl,
            borderRadius: RADIUS.lg,
            background: alpha(COLORS.green, 0.05),
            border: `1px solid ${alpha(COLORS.green, 0.1)}`,
            textAlign: 'center',
          }}
        >
          <div style={{
            color: alpha(COLORS.green, 0.7),
            fontSize: 15,
            lineHeight: 2,
            fontFamily: 'serif',
          }}>
            「不积跬步，无以至千里；不积小流，无以成江海。」
            <br />
            「骐骥一跃，不能十步；驽马十驾，功在不舍。」
          </div>
        </motion.div>
      </SubPageTemplate>
    </>
  )
}
