import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import { COLORS, SPACING, RADIUS, alpha } from '@/styles/tokens'

const ZHENFA_DATA = [
  {
    id: 'zhouyi',
    name: '周易八卦阵',
    grade: '地级',
    type: '困敌阵',
    creator: '伏羲氏',
    desc: '八卦分列，八门启闭。休生伤杜景死惊开，入阵者迷失其中。',
    feature: ['困敌锁魂', '空间折叠', '幻像丛生'],
    difficulty: 3,
    color: COLORS.purple,
  },
  {
    id: 'jiugong',
    name: '九宫迷魂阵',
    grade: '玄级',
    type: '幻阵',
    creator: '鬼谷子',
    desc: '九宫八卦相合，使人神魂颠倒，不识东西南北，困死于幻境内。',
    feature: ['神魂迷惑', '幻象真实', '无差别攻击'],
    difficulty: 2,
    color: COLORS.blue,
  },
  {
    id: 'tianluo',
    name: '天罗地网阵',
    grade: '玄级',
    type: '困阵',
    creator: '九天玄女',
    desc: '天网恢恢，疏而不漏。上布周天星斗，下设地煞罗网，神魔难逃。',
    feature: ['上天无路', '入地无门', '法力封禁'],
    difficulty: 2,
    color: COLORS.gray500,
  },
  {
    id: 'shensha',
    name: '十二都天神煞大阵',
    grade: '天级',
    type: '杀阵',
    creator: '十二祖巫',
    desc: '上古杀阵第一，凝聚十二祖巫煞气，可发盘古虚影，开天辟地。',
    feature: ['祖巫降临', '灭世杀机', '吞噬万物'],
    difficulty: 5,
    color: COLORS.red,
  },
  {
    id: 'zhoutian',
    name: '周天星斗大阵',
    grade: '天级',
    type: '综合阵',
    creator: '东皇太一',
    desc: '三百六十五路正神，合周天星辰之力，可演宇宙洪荒，重开地水火风。',
    feature: ['星辰之力', '周天运转', '生生不息'],
    difficulty: 5,
    color: COLORS.gold,
  },
  {
    id: 'liangyi',
    name: '两仪微尘阵',
    grade: '天级',
    type: '防御阵',
    creator: '长眉真人',
    desc: '一花一世界，一叶一菩提。一微尘中藏三千大世界，防御无双。',
    feature: ['内藏乾坤', '绝对防御', '须弥芥子'],
    difficulty: 4,
    color: COLORS.cyan,
  },
  {
    id: 'fanjiamendi',
    name: '诛仙剑阵',
    grade: '仙级',
    type: '杀阵',
    creator: '通天教主',
    desc: '诛仙利，戮仙亡，陷仙四处起红光，绝仙变化无穷妙，大罗神仙血染裳。',
    feature: ['诛仙四剑', '非圣即死', '天道第一杀阵'],
    difficulty: 5,
    color: COLORS.red,
  },
  {
    id: 'jiuxiao',
    name: '九霄神雷阵',
    grade: '地级',
    type: '攻阵',
    creator: '雷部众神',
    desc: '九霄之上，雷神震怒。引九天神雷轰击，神魔辟易，万邪退散。',
    feature: ['天雷涤荡', '诛邪灭魔', '净化煞气'],
    difficulty: 3,
    color: COLORS.cyan,
  },
]

const DIFFICULTY_STARS = ['入门', '进阶', '精通', '宗师', '天人']

export default function ZhenFaPage() {
  const [selectedZhenfa, setSelectedZhenfa] = useState(ZHENFA_DATA[0])
  const [unlockedZhenfa, setUnlockedZhenfa] = useState(['zhouyi', 'jiugong'])
  const [researchProgress, setResearchProgress] = useState<Record<string, number>>({
    zhouyi: 65,
    jiugong: 40,
  })

  const research = (id: string) => {
    setResearchProgress(prev => ({
      ...prev,
      [id]: Math.min(100, (prev[id] || 0) + Math.floor(Math.random() * 10) + 5)
    }))
  }

  const unlock = (id: string) => {
    if (!unlockedZhenfa.includes(id)) {
      setUnlockedZhenfa(prev => [...prev, id])
      setResearchProgress(prev => ({ ...prev, [id]: 0 }))
    }
  }

  return (
    <SubPageTemplate
      title="阵法殿"
      subtitle="陣起乾坤動，法布鬼神驚"
      colorRgb={COLORS.cyanRgb}
    >
      <div className="grid-3" style={{ gap: SPACING['2xl'] }}>
        <div style={{ gridColumn: 'span 1' }}>
          <h4 style={{
            fontSize: 18,
            color: COLORS.cyan,
            marginBottom: SPACING.lg,
          }}>
            🌀 阵法图鉴
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.md,
          }}>
            {ZHENFA_DATA.map((zhenfa, idx) => (
              <motion.div
                key={zhenfa.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedZhenfa(zhenfa)}
                style={{
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  background: selectedZhenfa.id === zhenfa.id
                    ? `linear-gradient(90deg, ${alpha(zhenfa.color, 0.25)}, ${alpha(zhenfa.color, 0.05)})`
                    : alpha(COLORS.bg.card, 1),
                  border: `1px solid ${selectedZhenfa.id === zhenfa.id
                    ? alpha(zhenfa.color, 0.4)
                    : alpha(COLORS.gray600, 0.15)}`,
                  borderLeft: `3px solid ${zhenfa.color}`,
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
                      color: zhenfa.color,
                      fontWeight: 600,
                      marginBottom: 2,
                    }}>
                      ✧ {zhenfa.name}
                      {unlockedZhenfa.includes(zhenfa.id) && (
                        <span style={{
                          marginLeft: 8,
                          fontSize: 12,
                          color: COLORS.green,
                        }}> ✓</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.text.muted }}>
                      {zhenfa.grade} · {zhenfa.type}
                    </div>
                  </div>
                  {unlockedZhenfa.includes(zhenfa.id) && (
                    <div style={{
                      fontSize: 12,
                      color: COLORS.cyan,
                    }}>
                      {researchProgress[zhenfa.id] || 0}%
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          key={selectedZhenfa.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ gridColumn: 'span 2' }}
        >
          <div style={{
            padding: SPACING['2xl'],
            borderRadius: RADIUS.xl,
            background: `linear-gradient(135deg, ${alpha(selectedZhenfa.color, 0.12)}, ${alpha(COLORS.bg.dark, 0.9)})`,
            border: `1px solid ${alpha(selectedZhenfa.color, 0.25)}`,
            marginBottom: SPACING.xl,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: SPACING.xl,
            }}>
              <div>
                <h2 style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: selectedZhenfa.color,
                  marginBottom: SPACING.sm,
                }}>
                  ✦ {selectedZhenfa.name} ✦
                </h2>
                <div style={{
                  display: 'flex',
                  gap: SPACING.lg,
                  fontSize: 13,
                  color: COLORS.text.secondary,
                }}>
                  <span>品级：{selectedZhenfa.grade}</span>
                  <span>类型：{selectedZhenfa.type}</span>
                  <span>创阵：{selectedZhenfa.creator}</span>
                  <span>难度：{DIFFICULTY_STARS[selectedZhenfa.difficulty - 1]}</span>
                </div>
              </div>
              {unlockedZhenfa.includes(selectedZhenfa.id) && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: COLORS.gold, fontSize: 20, fontWeight: 700 }}>
                    {researchProgress[selectedZhenfa.id] >= 100 ? '融会贯通' :
                     researchProgress[selectedZhenfa.id] >= 60 ? '略有小成' :
                     researchProgress[selectedZhenfa.id] >= 30 ? '初窥门径' : '初学乍练'}
                  </div>
                  <div style={{ color: COLORS.text.muted, fontSize: 12 }}>
                    领悟境界
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
              borderLeft: `3px solid ${selectedZhenfa.color}`,
              fontStyle: 'italic',
            }}>
              「{selectedZhenfa.desc}」
            </p>

            {unlockedZhenfa.includes(selectedZhenfa.id) && (
              <div style={{ marginBottom: SPACING.xl }}>
                <div style={{
                  color: COLORS.text.muted,
                  fontSize: 13,
                  marginBottom: SPACING.md,
                }}>
                  参悟进度
                </div>
                <div style={{
                  height: 10,
                  background: alpha(COLORS.gray800, 0.5),
                  borderRadius: RADIUS.full,
                  overflow: 'hidden',
                }}>
                  <motion.div
                    animate={{ width: `${researchProgress[selectedZhenfa.id] || 0}%` }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${selectedZhenfa.color}, ${COLORS.gold})`,
                      borderRadius: RADIUS.full,
                    }}
                  />
                </div>
                <div style={{
                  textAlign: 'right',
                  marginTop: SPACING.sm,
                  fontSize: 12,
                  color: selectedZhenfa.color,
                }}>
                  {researchProgress[selectedZhenfa.id] || 0}%
                </div>
              </div>
            )}

            <div style={{
              display: 'flex',
              gap: SPACING.lg,
              flexWrap: 'wrap',
              marginBottom: SPACING.xl,
            }}>
              {selectedZhenfa.feature.map(f => (
                <span key={f} style={{
                  padding: `${SPACING.sm} ${SPACING.lg}`,
                  borderRadius: RADIUS.full,
                  background: alpha(selectedZhenfa.color, 0.15),
                  border: `1px solid ${alpha(selectedZhenfa.color, 0.3)}`,
                  color: selectedZhenfa.color,
                  fontSize: 13,
                }}>
                  ✧ {f}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: SPACING.lg }}>
              {!unlockedZhenfa.includes(selectedZhenfa.id) ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => unlock(selectedZhenfa.id)}
                  style={{
                    padding: `${SPACING.lg} ${SPACING['2xl']}`,
                    borderRadius: RADIUS.lg,
                    background: `linear-gradient(135deg, ${selectedZhenfa.color}, ${COLORS.purple})`,
                    border: 'none',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 16,
                  }}
                >
                  📖 参悟阵图
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => research(selectedZhenfa.id)}
                  style={{
                    padding: `${SPACING.lg} ${SPACING['2xl']}`,
                    borderRadius: RADIUS.lg,
                    background: `linear-gradient(135deg, ${COLORS.cyan}, ${selectedZhenfa.color})`,
                    border: 'none',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 16,
                  }}
                >
                  🌀 推演阵法 +8%
                </motion.button>
              )}
            </div>
          </div>

          <h4 style={{
            fontSize: 18,
            color: COLORS.gold,
            marginBottom: SPACING.lg,
          }}>
            📚 布阵要诀
          </h4>
          <div className="grid-2">
            {[
              { title: '寻地', content: '寻天地灵气汇聚之地，取山川走向，脉路汇集之点为阵眼。' },
              { title: '立坛', content: '按五行方位立坛，中央戊土，东方甲乙，南方丙丁，西方庚辛，北方壬癸。' },
              { title: '布阵', content: '依阵图埋法器，嵌灵石，引地脉，布旗门，定方位。' },
              { title: '启阵', content: '踏罡步斗，掐诀念咒，以自身精血为引，勾动地脉灵气发动大阵。' },
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
                  border: `1px solid ${alpha(COLORS.cyan, 0.15)}`,
                }}
              >
                <div style={{
                  color: COLORS.cyan,
                  fontWeight: 600,
                  marginBottom: SPACING.sm,
                }}>
                  【{tip.title}】
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
