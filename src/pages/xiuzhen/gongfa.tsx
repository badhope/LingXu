import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import { COLORS, SPACING, RADIUS, alpha } from '@/styles/tokens'
import { useLocalStorage } from '@/hooks'

const GONGFA_DATA = [
  {
    id: 'taiji',
    name: '太极玄功',
    grade: '天级上品',
    attr: '阴阳',
    creator: '太上老君',
    desc: '太极生两仪，两仪生四象，四象生八卦。此功讲求阴阳调和，刚柔并济，乃道门至尊心法。',
    feature: ['阴阳调和', '生生不息', '大道根基'],
    stages: ['养心', '炼气', '凝神', '化虚', '合道'],
    color: COLORS.purple,
  },
  {
    id: 'jiuyang',
    name: '九阳神功',
    grade: '天级中品',
    attr: '至阳',
    creator: '达摩祖师',
    desc: '天之道，损有余而补不足。九阳之力，至刚至阳，百邪不侵，天下内功之祖。',
    feature: ['至刚至阳', '疗伤圣典', '自生内力'],
    stages: ['通脉', '蕴气', '归元', '纯阳', '归真'],
    color: COLORS.red,
  },
  {
    id: 'shenxiao',
    name: '神霄雷法',
    grade: '天级下品',
    attr: '雷',
    creator: '王文卿',
    desc: '雷乃天地之威，阴阳之声。掌九天雷罚，诛妖灭魔，五雷轰顶，万劫不复。',
    feature: ['天雷之力', '诛邪灭魔', '雷遁极速'],
    stages: ['引雷', '御雷', '化雷', '雷劫', '雷神'],
    color: COLORS.cyan,
  },
  {
    id: 'jiuyin',
    name: '九阴真经',
    grade: '地级上品',
    attr: '阴柔',
    creator: '黄裳',
    desc: '天之道，损有余而补不足，是故虚胜实，不足胜有余。道家武学总纲，藏尽天下武学。',
    feature: ['武学总纲', '摧坚神爪', '摄心大法'],
    stages: ['锻骨', '易筋', '洗髓', '归真', '天人'],
    color: COLORS.blue,
  },
  {
    id: 'bahuang',
    name: '八荒六合唯我独尊功',
    grade: '地级中品',
    attr: '霸道',
    creator: '逍遥子',
    desc: '八荒六合，唯我独尊。此功霸道绝伦，练至化境可返老还童，青春永驻。',
    feature: ['霸道绝伦', '返老还童', '吸人内力'],
    stages: ['筑基', '凝煞', '炼罡', '天人', '长生'],
    color: COLORS.gold,
  },
  {
    id: 'lingbo',
    name: '凌波微步',
    grade: '玄级上品',
    attr: '身法',
    creator: '无崖子',
    desc: '体迅飞凫，飘忽若神，凌波微步，罗袜生尘。踏周易六十四卦，奇门遁甲，天下无双。',
    feature: ['天下极速', '闪避无双', '踏斗步罡'],
    stages: ['入门', '小成', '大成', '宗师', '入圣'],
    color: COLORS.teal,
  },
  {
    id: 'yijin',
    name: '易筋经',
    grade: '玄级中品',
    attr: '炼体',
    creator: '达摩祖师',
    desc: '易筋煅骨，脱胎换骨。此功乃炼体之最，练成之后金刚不坏，万法不侵。',
    feature: ['金刚不坏', '易筋洗髓', '万法不侵'],
    stages: ['筑基', '换血', '易筋', '煅骨', '金身'],
    color: COLORS.amber,
  },
  {
    id: 'zixia',
    name: '紫霞功',
    grade: '玄级下品',
    attr: '纯阳',
    creator: '郝大通',
    desc: '吾善养吾浩然之气。紫霞功乃玄门正宗心法，中正平和，最合道门赤子之心。',
    feature: ['玄门正宗', '浩然正气', '心魔不生'],
    stages: ['炼气', '守一', '筑基', '金液', '还丹'],
    color: COLORS.pink,
  },
]

export default function GongFaPage() {
  const [selectedGongfa, setSelectedGongfa] = useState(GONGFA_DATA[0])
  const [unlocked, setUnlocked] = useLocalStorage('unlocked-gongfa', ['taiji'])
  const [practiceProgress, setPracticeProgress] = useLocalStorage<Record<string, number>>(
    'gongfa-progress',
    { taiji: 15 }
  )

  const unlockGongfa = (id: string) => {
    if (!unlocked.includes(id)) {
      setUnlocked(prev => [...prev, id])
      setPracticeProgress(prev => ({ ...prev, [id]: 0 }))
    }
  }

  const practice = (id: string) => {
    setPracticeProgress(prev => ({
      ...prev,
      [id]: Math.min(100, (prev[id] || 0) + Math.floor(Math.random() * 8) + 3)
    }))
  }

  const getStage = (progress: number) => {
    const stages = selectedGongfa.stages
    if (progress < 20) return stages[0]
    if (progress < 40) return stages[1]
    if (progress < 60) return stages[2]
    if (progress < 80) return stages[3]
    return stages[4]
  }

  return (
    <SubPageTemplate
      title="功法宝库"
      subtitle="功聚三花頂，法凝五氣朝"
      colorRgb={COLORS.blueRgb}
    >
      <div className="grid-3" style={{ gap: SPACING['2xl'] }}>
        <div style={{ gridColumn: 'span 1' }}>
          <h4 style={{
            fontSize: 18,
            color: COLORS.gold,
            marginBottom: SPACING.lg,
          }}>
            📚 功法图鉴
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.md,
          }}>
            {GONGFA_DATA.map((gf, idx) => (
              <motion.div
                key={gf.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedGongfa(gf)}
                whileHover={{ x: 4 }}
                style={{
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  background: selectedGongfa.id === gf.id
                    ? `linear-gradient(90deg, ${alpha(gf.color, 0.25)}, ${alpha(gf.color, 0.05)})`
                    : alpha(COLORS.bg.card, 1),
                  border: `1px solid ${selectedGongfa.id === gf.id
                    ? alpha(gf.color, 0.4)
                    : alpha(COLORS.gray600, 0.15)}`,
                  borderLeft: `3px solid ${gf.color}`,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{
                      color: gf.color,
                      fontWeight: 600,
                      marginBottom: 2,
                    }}>
                      {gf.name}
                      {unlocked.includes(gf.id) && (
                        <span style={{
                          marginLeft: 8,
                          fontSize: 12,
                          color: COLORS.green,
                        }}> ✓</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.text.muted }}>
                      {gf.grade} · {gf.attr}属性
                    </div>
                  </div>
                  {unlocked.includes(gf.id) && (
                    <div style={{
                      fontSize: 12,
                      color: COLORS.cyan,
                    }}>
                      {practiceProgress[gf.id] || 0}%
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          key={selectedGongfa.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ gridColumn: 'span 2' }}
        >
          <div style={{
            padding: SPACING['2xl'],
            borderRadius: RADIUS.xl,
            background: `linear-gradient(135deg, ${alpha(selectedGongfa.color, 0.12)}, ${alpha(COLORS.bg.dark, 0.9)})`,
            border: `1px solid ${alpha(selectedGongfa.color, 0.25)}`,
            marginBottom: SPACING.xl,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: SPACING.lg,
            }}>
              <div>
                <h2 style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: selectedGongfa.color,
                  marginBottom: SPACING.sm,
                }}>
                  {selectedGongfa.name}
                </h2>
                <div style={{
                  display: 'flex',
                  gap: SPACING.md,
                  fontSize: 13,
                  color: COLORS.text.secondary,
                }}>
                  <span>品级：{selectedGongfa.grade}</span>
                  <span>属性：{selectedGongfa.attr}</span>
                  <span>创功：{selectedGongfa.creator}</span>
                </div>
              </div>
              {unlocked.includes(selectedGongfa.id) && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: COLORS.gold, fontSize: 24, fontWeight: 700 }}>
                    {getStage(practiceProgress[selectedGongfa.id] || 0)}
                  </div>
                  <div style={{ color: COLORS.text.muted, fontSize: 12 }}>
                    当前境界
                  </div>
                </div>
              )}
            </div>

            <p style={{
              color: COLORS.text.secondary,
              lineHeight: 1.8,
              marginBottom: SPACING.xl,
              padding: SPACING.lg,
              borderRadius: RADIUS.lg,
              background: alpha(COLORS.bg.glass, 1),
              borderLeft: `3px solid ${selectedGongfa.color}`,
            }}>
              「{selectedGongfa.desc}」
            </p>

            <div style={{ marginBottom: SPACING.xl }}>
              <div style={{
                color: COLORS.text.muted,
                fontSize: 13,
                marginBottom: SPACING.md,
              }}>
                修炼进度
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: SPACING.sm,
              }}>
                {selectedGongfa.stages.map((stage, idx) => {
                  const stageProgress = practiceProgress[selectedGongfa.id] || 0
                  const reached = stageProgress >= idx * 20
                  return (
                    <span key={stage} style={{
                      fontSize: 12,
                      color: reached ? selectedGongfa.color : COLORS.text.muted,
                      fontWeight: reached ? 600 : 400,
                    }}>
                      {stage}
                    </span>
                  )
                })}
              </div>
              <div style={{
                height: 8,
                background: alpha(COLORS.gray800, 0.5),
                borderRadius: RADIUS.full,
                overflow: 'hidden',
              }}>
                <motion.div
                  animate={{ width: `${practiceProgress[selectedGongfa.id] || 0}%` }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${selectedGongfa.color}, ${COLORS.gold})`,
                    borderRadius: RADIUS.full,
                  }}
                />
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: SPACING.lg,
              flexWrap: 'wrap',
              marginBottom: SPACING.xl,
            }}>
              {selectedGongfa.feature.map(f => (
                <span key={f} style={{
                  padding: `${SPACING.sm} ${SPACING.lg}`,
                  borderRadius: RADIUS.full,
                  background: alpha(selectedGongfa.color, 0.15),
                  border: `1px solid ${alpha(selectedGongfa.color, 0.3)}`,
                  color: selectedGongfa.color,
                  fontSize: 13,
                }}>
                  ✨ {f}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: SPACING.lg }}>
              {!unlocked.includes(selectedGongfa.id) ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => unlockGongfa(selectedGongfa.id)}
                  style={{
                    padding: `${SPACING.lg} ${SPACING['2xl']}`,
                    borderRadius: RADIUS.lg,
                    background: `linear-gradient(135deg, ${selectedGongfa.color}, ${COLORS.purple})`,
                    border: 'none',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 16,
                  }}
                >
                  📖 参悟功法
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => practice(selectedGongfa.id)}
                  style={{
                    padding: `${SPACING.lg} ${SPACING['2xl']}`,
                    borderRadius: RADIUS.lg,
                    background: `linear-gradient(135deg, ${COLORS.gold}, ${selectedGongfa.color})`,
                    border: 'none',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 16,
                  }}
                >
                  🛡️ 修炼 +5%
                </motion.button>
              )}
            </div>
          </div>

          <div className="grid-2">
            {[
              { title: '心法总诀', content: '收视返听，一念不起。含眼光，凝耳韵，调鼻息，缄舌气，是为和合四象。' },
              { title: '筑基须知', content: '一戒淫欲，二戒恼怒，三戒忧思，四戒惊恐，五戒饥饿。' },
              { title: '采药时机', content: '亥末子初，一阳来复之时，万物归根之候，此为采药最佳时机。' },
              { title: '炼丹火候', content: '文火温养，武火锻炼。一念不生谓之温，一息不住谓之养。' },
            ].map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                style={{
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  background: alpha(COLORS.bg.card, 1),
                  border: `1px solid ${alpha(COLORS.gold, 0.12)}`,
                }}
              >
                <div style={{
                  color: COLORS.gold,
                  fontWeight: 600,
                  marginBottom: SPACING.sm,
                }}>
                  {tip.title}
                </div>
                <div style={{
                  color: COLORS.text.secondary,
                  fontSize: 13,
                  lineHeight: 1.7,
                }}>
                  {tip.content}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SubPageTemplate>
  )
}
