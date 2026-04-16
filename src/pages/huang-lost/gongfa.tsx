'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function GongfaPage() {
  const cultivationTiers = [
    {
      name: '炼气',
      level: 1,
      duration: '百日',
      feature: '三花聚顶',
      difficulty: 10,
      mortality: 5,
      breakthrough: '通任督二脉',
      sign: '丹田暖，手足热，百病不侵',
      color: '#22c55e',
      icon: '🌱'
    },
    {
      name: '筑基',
      level: 2,
      duration: '三年',
      feature: '金丹之基',
      difficulty: 25,
      mortality: 15,
      breakthrough: '玉液还丹',
      sign: '精气神足，寒暑不侵，寿至百二十',
      color: '#06b6d4',
      icon: '🏛️'
    },
    {
      name: '金丹',
      level: 3,
      duration: '九载',
      feature: '我命由我',
      difficulty: 45,
      mortality: 35,
      breakthrough: '水火既济',
      sign: '一粒金丹吞入腹，始知我命不由天',
      color: '#f59e0b',
      icon: '✨'
    },
    {
      name: '元婴',
      level: 4,
      duration: '百年',
      feature: '阳神出窍',
      difficulty: 65,
      mortality: 55,
      breakthrough: '丹破婴成',
      sign: '身外有身，神游千里，寿五百岁',
      color: '#ec4899',
      icon: '👶'
    },
    {
      name: '化神',
      level: 5,
      duration: '三百年',
      feature: '炼神还虚',
      difficulty: 80,
      mortality: 75,
      breakthrough: '婴化元神',
      sign: '聚则成形，散则成气，寿至千载',
      color: '#a855f7',
      icon: '⚡'
    },
    {
      name: '渡劫',
      level: 6,
      duration: '无量',
      feature: '天人五衰',
      difficulty: 95,
      mortality: 90,
      breakthrough: '三重雷劫',
      sign: '天地灭法，九死一生，万劫存真',
      color: '#ef4444',
      icon: '⚔️'
    },
    {
      name: '大乘',
      level: 7,
      duration: '永恒',
      feature: '地仙之祖',
      difficulty: 99,
      mortality: 50,
      breakthrough: '万劫不坏',
      sign: '跳出三界，不在五行，陆地神仙',
      color: '#6366f1',
      icon: '🏆'
    },
    {
      name: '飞升',
      level: 8,
      duration: '刹那',
      feature: '霞举飞升',
      difficulty: 100,
      mortality: 99,
      breakthrough: '天门开',
      sign: '仙乐袅袅，异香满室，白日飞升',
      color: '#fbbf24',
      icon: '🚀'
    }
  ]

  const classicTechniques = [
    {
      name: '太上感应篇',
      sect: '太清',
      grade: '天级上品',
      founder: '老子',
      compatibility: 98,
      power: 95,
      speed: 60,
      foundation: 100,
      feature: '无为而治，顺应自然，功德成仙',
      taboo: '逆天而行，强取豪夺',
      disciples: '太上忘情，非无情也',
      color: '#8b5cf6',
      icon: '📿'
    },
    {
      name: '周易参同契',
      sect: '丹鼎',
      grade: '天级上品',
      founder: '魏伯阳',
      compatibility: 85,
      power: 90,
      speed: 45,
      foundation: 95,
      feature: '万古丹经王，铅汞大丹',
      taboo: '外药不真，炉火不纯',
      disciples: '参同契者，大易性情也',
      color: '#f59e0b',
      icon: '⚗️'
    },
    {
      name: '黄庭内景经',
      sect: '上清',
      grade: '天级中品',
      founder: '魏夫人',
      compatibility: 90,
      power: 85,
      speed: 75,
      foundation: 90,
      feature: '存神炼气，八景二十四真',
      taboo: '六欲不除，三尸不灭',
      disciples: '上清玉帝，三素老君',
      color: '#06b6d4',
      icon: '👁️'
    },
    {
      name: '灵宝毕法',
      sect: '灵宝',
      grade: '天级中品',
      founder: '钟离权',
      compatibility: 88,
      power: 88,
      speed: 70,
      foundation: 88,
      feature: '三乘正法，十转成仙',
      taboo: '传匪其人，天律有禁',
      disciples: '八仙过海，各显神通',
      color: '#10b981',
      icon: '📜'
    },
    {
      name: '悟真篇',
      sect: '紫阳',
      grade: '地级上品',
      founder: '张伯端',
      compatibility: 82,
      power: 85,
      speed: 65,
      foundation: 85,
      feature: '南北二宗，性命双修',
      taboo: '独修一物，阴阳偏颇',
      disciples: '道本无为，非执于无',
      color: '#ec4899',
      icon: '💜'
    },
    {
      name: '无根树词',
      sect: '三丰',
      grade: '地级上品',
      founder: '张三丰',
      compatibility: 95,
      power: 80,
      speed: 80,
      foundation: 82,
      feature: '隐仙一脉，太极大道',
      taboo: '执着形相，不知圆通',
      disciples: '顺则生人逆成仙',
      color: '#3b82f6',
      icon: '☯️'
    }
  ]

  const meridians = [
    { name: '任脉', location: '身前正中', points: 24, role: '阴脉之海', opened: 100, color: '#ec4899' },
    { name: '督脉', location: '身后正中', points: 28, role: '阳脉之海', opened: 100, color: '#3b82f6' },
    { name: '冲脉', location: '十二经之海', points: 12, role: '血海', opened: 85, color: '#ef4444' },
    { name: '带脉', location: '腰间环身', points: 4, role: '约束诸经', opened: 70, color: '#f59e0b' },
    { name: '阴跷', location: '足少阴', points: 8, role: '主一身左右之阴', opened: 60, color: '#06b6d4' },
    { name: '阳跷', location: '足太阳', points: 12, role: '主一身左右之阳', opened: 55, color: '#f59e0b' },
    { name: '阴维', location: '足厥阴', points: 8, role: '维络诸阴', opened: 45, color: '#a855f7' },
    { name: '阳维', location: '足少阳', points: 16, role: '维络诸阳', opened: 40, color: '#22c55e' }
  ]

  const danGrades = [
    { name: '下品丹', purity: 30, effect: '延年益寿', color: '#6b7280', rate: 70 },
    { name: '中品丹', purity: 60, effect: '固本培元', color: '#22c55e', rate: 20 },
    { name: '上品丹', purity: 85, effect: '脱胎换骨', color: '#3b82f6', rate: 8 },
    { name: '极品丹', purity: 95, effect: '筑基成道', color: '#a855f7', rate: 1.5 },
    { name: '仙丹', purity: 100, effect: '白日飞升', color: '#fbbf24', rate: 0.5 }
  ]

  function getDifficultyColor(difficulty: number) {
    if (difficulty >= 80) return { color: '#ef4444', label: '地狱级' }
    if (difficulty >= 60) return { color: '#f59e0b', label: '困难级' }
    if (difficulty >= 40) return { color: '#06b6d4', label: '进阶级' }
    return { color: '#22c55e', label: '入门级' }
  }

  return (
    <SubPageTemplate
      title="修真功法"
      subtitle="炼精化气 · 炼气化神 · 炼神还虚 · 炼虚合道"
      icon="⚔️"
      colorRgb="110, 231, 183"
    >
      <SubPageSection title="修真总纲">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: '修真八境', count: '8', color: '#6ee7b7', icon: '🏔️', desc: '从炼气到飞升' },
              { label: '经典功法', count: '6', color: '#a855f7', icon: '📜', desc: '万古传承大法' },
              { label: '奇经八脉', count: '8', color: '#ec4899', icon: '💫', desc: '人身经脉总览' },
              { label: '丹药品级', count: '5', color: '#fbbf24', icon: '💊', desc: '外丹辅助修行' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={i === 0 ? {
                    scale: [1, 1.05, 1],
                    boxShadow: ['none', `0 0 30px ${stat.color}`, 'none']
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}88)`,
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem'
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: stat.color }}>{stat.count}</div>
                <div style={{ fontSize: '1rem', color: '#b89438', margin: '0.25rem 0' }}>{stat.label}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.8rem' }}>{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="修真八境">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem'
        }}>
          {cultivationTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5, scale: 1.02 }}
              style={{
                border: `2px solid ${tier.color}50`,
                borderTop: `3px solid ${tier.color}`,
                background: tier.level === 8 ? `linear-gradient(135deg, ${tier.color}15, transparent)` : undefined
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <motion.div
                    animate={tier.level === 8 ? {
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 6, repeat: Infinity }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: `linear-gradient(135deg, ${tier.color}, ${tier.color}66)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}
                  >
                    {tier.icon}
                  </motion.div>
                  <div>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: tier.color
                    }}>
                      {tier.name}
                    </h3>
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '0.05rem 0.4rem',
                      borderRadius: '10px',
                      background: getDifficultyColor(tier.difficulty).color + '25',
                      color: getDifficultyColor(tier.difficulty).color
                    }}>
                      Lv.{tier.level} · {getDifficultyColor(tier.difficulty).label}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: tier.mortality >= 50 ? '#ef4444' : tier.mortality >= 30 ? '#f59e0b' : '#22c55e'
                  }}>
                    {tier.mortality}%
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                    死亡率
                  </div>
                </div>
              </div>

              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(180, 180, 190, 0.75)',
                lineHeight: 1.6,
                marginBottom: '0.75rem',
                fontStyle: 'italic'
              }}>
                「{tier.sign}」
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.7rem' }}>
                <div>
                  <span style={{ color: 'rgba(110, 231, 183, 0.6)' }}>⏳</span>
                  <span style={{ color: 'rgba(180, 180, 190, 0.7)', marginLeft: '0.25rem' }}>{tier.duration}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(251, 146, 60, 0.6)' }}>⚡</span>
                  <span style={{ color: 'rgba(180, 180, 190, 0.7)', marginLeft: '0.25rem' }}>{tier.breakthrough}</span>
                </div>
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.65rem' }}>
                  <span style={{ color: 'rgba(180, 180, 190, 0.5)' }}>突破进度</span>
                  <span style={{ color: tier.color }}>{tier.difficulty}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '4px',
                  background: 'rgba(180, 180, 190, 0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tier.difficulty}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${tier.color}, ${tier.color}88)`,
                      borderRadius: '2px'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="六大门派镇派神功">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem'
        }}>
          {classicTechniques.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              style={{
                border: `2px solid ${tech.color}40`,
                borderLeft: `4px solid ${tech.color}`
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <motion.div
                    animate={{
                      rotate: index % 2 === 0 ? [0, 5, -5, 0] : [0, -5, 5, 0],
                      scale: [1, 1.08, 1]
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: index * 0.3 }}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '10px',
                      background: `linear-gradient(135deg, ${tech.color}, ${tech.color}66)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      boxShadow: `0 4px 20px ${tech.color}30`
                    }}
                  >
                    {tech.icon}
                  </motion.div>
                  <div>
                    <h3 style={{
                      fontSize: '1.15rem',
                      fontWeight: 'bold',
                      color: tech.color
                    }}>
                      {tech.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        color: 'rgba(180, 180, 190, 0.6)'
                      }}>
                        {tech.sect}派
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '0.1rem 0.5rem',
                        borderRadius: '12px',
                        background: tech.color + '20',
                        color: tech.color
                      }}>
                        {tech.grade}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: tech.compatibility >= 90 ? '#fbbf24' : tech.compatibility >= 85 ? '#a855f7' : '#06b6d4'
                  }}>
                    {tech.compatibility}%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                    灵根契合
                  </div>
                </div>
              </div>

              <p style={{
                fontSize: '0.8rem',
                color: 'rgba(180, 180, 190, 0.8)',
                lineHeight: 1.7,
                marginBottom: '1rem',
                padding: '0.75rem',
                background: tech.color + '08',
                borderRadius: '8px',
                borderLeft: `2px solid ${tech.color}`
              }}>
                💡 {tech.feature}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                {[
                  { label: '威力', value: tech.power },
                  { label: '速度', value: tech.speed },
                  { label: '根基', value: tech.foundation }
                ].map((attr) => (
                  <div key={attr.label} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      color: tech.color
                    }}>{attr.value}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>
                      {attr.label}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '0.75rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ color: 'rgba(239, 68, 68, 0.7)' }}>⚠️ 禁忌：</span>
                  <span style={{ color: 'rgba(180, 180, 190, 0.7)' }}>{tech.taboo}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(168, 85, 247, 0.7)' }}>💬 师训：</span>
                  <span style={{ color: 'rgba(180, 180, 190, 0.7)' }}>{tech.disciples}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="奇经八脉">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem'
          }}>
            {meridians.map((meridian, index) => (
              <motion.div
                key={meridian.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${meridian.color}15, transparent)`,
                  border: `1px solid ${meridian.color}30`,
                  textAlign: 'center'
                }}
              >
                <motion.div
                  animate={meridian.opened === 100 ? {
                    boxShadow: [`0 0 10px ${meridian.color}`, `0 0 25px ${meridian.color}`, `0 0 10px ${meridian.color}`]
                  } : undefined}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: `conic-gradient(${meridian.color} ${meridian.opened * 3.6}deg, rgba(180, 180, 190, 0.1) 0deg)`,
                    margin: '0 auto 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: meridian.opened === 100 ? meridian.color : 'rgba(180, 180, 190, 0.6)',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    {meridian.opened}%
                  </div>
                </motion.div>
                <h4 style={{ color: meridian.color, marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                  {meridian.name}
                </h4>
                <p style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)', marginBottom: '0.5rem' }}>
                  {meridian.role}
                </p>
                <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                  📍 {meridian.location} · {meridian.points}穴
                </div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="九转还丹品阶">
        <InfoCard>
          <div style={{ position: 'relative', minHeight: '280px' }}>
            {danGrades.map((dan, index) => (
              <motion.div
                key={dan.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                style={{
                  position: 'absolute',
                  left: `${index * 18 + 5}%`,
                  top: `${85 - index * 15}%`,
                  textAlign: 'center'
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1 + index * 0.05, 1],
                    y: [0, -5 - index * 2, 0]
                  }}
                  transition={{ duration: 2 + index * 0.3, repeat: Infinity, delay: index * 0.2 }}
                  style={{
                    width: `${50 + index * 10}px`,
                    height: `${50 + index * 10}px`,
                    borderRadius: '50%',
                    background: `radial-gradient(circle at 30% 30%, ${dan.color}, ${dan.color}88, ${dan.color}44)`,
                    boxShadow: `0 0 ${20 + index * 10}px ${dan.color}60`,
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.7rem', textShadow: `0 0 10px ${dan.color}` }}>
                    {dan.purity}%
                  </span>
                </motion.div>
                <div style={{
                  color: dan.color,
                  fontWeight: 'bold',
                  fontSize: '0.8rem'
                }}>
                  {dan.name}
                </div>
                <div style={{
                  fontSize: '0.65rem',
                  color: 'rgba(180, 180, 190, 0.6)'
                }}>
                  {dan.effect}
                </div>
                <div style={{
                  fontSize: '0.6rem',
                  color: dan.color + '90'
                }}>
                  产出率 {dan.rate}%
                </div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="修真心诀">
        <div className="xian-submodule-card" style={{
          background: 'linear-gradient(135deg, rgba(110, 231, 183, 0.1), transparent)',
          border: '1px solid rgba(110, 231, 183, 0.3)',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: '1.1rem',
              color: 'rgba(180, 180, 190, 0.85)',
              lineHeight: 2.2,
              fontStyle: 'italic'
            }}
          >
            「道生一，一生二，二生三，三生万物。<br/>
            人法地，地法天，天法道，道法自然。<br/>
            上士闻道，勤而行之；中士闻道，若存若亡；下士闻道，大笑之。<br/>
            不笑不足以为道。」
          </motion.p>
          <div style={{ marginTop: '1.5rem', color: '#6ee7b7', fontSize: '0.9rem' }}>
            —— 道德经 · 李耳
          </div>
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
