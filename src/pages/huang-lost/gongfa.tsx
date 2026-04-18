'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface CultivationTier {
  name: string
  level: number
  duration: string
  feature: string
  difficulty: number
  mortality: number
  breakthrough: string
  sign: string
  detail: string
  phenomena: string[]
  color: string
  icon: string
}

interface Technique {
  name: string
  sect: string
  grade: string
  founder: string
  compatibility: number
  power: number
  speed: number
  foundation: number
  feature: string
  taboo: string
  disciples: string
  detail: string
  steps: string[]
  color: string
  icon: string
}

const CULTIVATION_TIERS: CultivationTier[] = [
  {
    name: '炼气',
    level: 1,
    duration: '百日',
    feature: '三花聚顶',
    difficulty: 10,
    mortality: 5,
    breakthrough: '通任督二脉',
    sign: '丹田暖，手足热，百病不侵',
    detail: '炼气期乃是修真之路的起点，百日筑基之始。修士通过吐纳导引，吸收天地灵气入体，打通周身经脉，铸就仙基。此阶段主要是打熬肉身，积蓄灵气，为后续境界打下坚实基础。凡人亦可达到，寿元与常人无异，但百病不侵，身体强健。',
    phenomena: ['丹田发热', '手足温暖', '夜不梦寐', '身轻如燕'],
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
    detail: '筑基期乃是修真之路的第一个重要门槛。修士打通任督二脉，运转小周天，玉液还丹，铸就道基。此阶段修士已寒暑不侵，寿元可达一百二十岁。可御使法器，施展初级法术。正道筑基丹，邪道血祭法，皆可成道。',
    phenomena: ['寒暑不侵', '辟谷不食', '夜见光明', '闻百里外'],
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
    detail: '金丹大道，修真之路上最重要的境界。修士精气神三宝合一，于丹田中凝结金丹，一粒金丹吞入腹，始知我命不由天。此境界寿元可达五百岁，可御空飞行，施展大神通。金丹九转，每转皆有天壤之别。',
    phenomena: ['金丹舍利', '身外有光', '辟谷不食', '预知祸福'],
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
    detail: '元婴期，丹破婴成，于丹田中孕育元婴。此境界修士可阳神出窍，神游千里，肉身亦可重塑。寿元可达千岁，为一派宗主，执掌一方。元婴不灭，修士不死。元婴乃是修士第二生命，可夺舍重生。',
    phenomena: ['阳神出窍', '神游太虚', '元婴显圣', '滴血重生'],
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
    detail: '化神期，炼神还虚，元婴化为元神，聚则成形，散则成气。此境界修士可肉身成圣，飞天遁地，移山填海。寿元可达三千岁，为大陆顶级战力。化神修士出手，天崩地裂，山河变色。',
    phenomena: ['移山填海', '元神不灭', '言出法随', '天地变色'],
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
    detail: '渡劫期，天人五衰降临，三重雷劫加身。此境界修士需渡过重重天劫，洗练道心，净化业障。九死一生，万中无一。渡过则大道可期，失败则魂飞魄散，身死道消。天劫者，天之试炼也。',
    phenomena: ['三重雷劫', '天人五衰', '业火焚身', '心魔考验'],
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
    detail: '大乘期，万劫不坏，跳出三界，不在五行。此境界修士为陆地神仙，与天地同寿，日月同庚。可开宗立派，教化一方。渡劫成仙只差临门一脚，只需等待天门开启，便可霞举飞升。',
    phenomena: ['万劫不坏', '跳出三界', '陆地神仙', '开天辟地'],
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
    detail: '飞升期，天门开启，霞举飞升。此境界修士功行圆满，天地同贺，仙乐袅袅，异香满室。白日飞升，位列仙班。飞升之后，又是一片新天地。然飞升之路凶险，飞升失败则兵解重修。',
    phenomena: ['天门开启', '仙乐袅袅', '异香满室', '白日飞升'],
    color: '#fbbf24',
    icon: '🚀'
  }
]

const CLASSIC_TECHNIQUES: Technique[] = [
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
    detail: '太上感应篇乃是太清道祖老子所传，为道门第一心法。此功法讲求无为而治，顺应自然，积功累德，感应天地。此功法筑基最为稳固，进境虽缓，但根基扎实，几乎无走火入魔之虞。太上忘情，非无情也，而是圣人忘情，最下不及情，情之所钟，正在我辈。',
    steps: ['清净无为', '积功累德', '感应天地', '道合自然', '白日飞升'],
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
    detail: '周易参同契乃是万古丹经王，魏伯阳祖师所著。此功法以大易、黄老、炉火三家相参，修炼金丹大道。为丹鼎派镇派心法。此功法修炼出的金丹最为精纯，威力无穷。参同契者，大易性情也，黄老养性也，炉火服食也，三道由一，俱出径路。',
    steps: ['辨药知音', '进火退符', '沐浴温养', '九转还丹', '丹成飞升'],
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
    detail: '黄庭内景经乃是上清派镇派心法，魏华存夫人所传。此功法讲求存神炼气，八景二十四真，观想身内诸神。此功法进境极快，神通极多，但需心性坚定，否则易为外魔所乘。上清玉帝，三素老君，斋戒沐浴，诚心诵经。',
    steps: ['斋戒沐浴', '存神观想', '三尸斩去', '阳神出窍', '飞升上清'],
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
    detail: '灵宝毕法乃是正阳真人钟离权所传，分为小乘安乐延年法四门、中乘长生不死法三门、大乘超凡入圣法三门，共计十转。此功法最为系统，为八仙所共修。钟离权传吕洞宾，吕洞宾传刘海蟾，一脉相承。',
    steps: ['匹配阴阳', '聚散水火', '交媾龙虎', '烧炼丹药', '超凡入圣'],
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
    detail: '悟真篇乃是紫阳真人张伯端所著，为道教内丹学的重要著作。此功法主张性命双修，先命后性。为道教南宗的祖经。此功法调和龙虎，匹配阴阳，讲求金丹火候，为万古丹经之祖。',
    steps: ['先修命功', '后修性理', '调和龙虎', '金丹圆满', '性命双修'],
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
    detail: '无根树词乃是隐仙派张三丰祖师所传，共二十四首，以词喻道。此功法最为圆通，兼容并包，不执一法。太极拳即为其动功。无根树，花正幽，贪恋荣华谁肯休。浮生事，苦海舟，荡去飘来不自由。',
    steps: ['太极筑基', '阴阳相济', '以柔克刚', '圆通无碍', '羽化登仙'],
    color: '#3b82f6',
    icon: '☯️'
  }
]

export default function GongfaPage() {
  const [filteredTiers, setFilteredTiers] = useState(CULTIVATION_TIERS)
  const [expandedTier, setExpandedTier] = useState<string | null>(null)
  const [filteredTechniques, setFilteredTechniques] = useState(CLASSIC_TECHNIQUES)
  const [expandedTechnique, setExpandedTechnique] = useState<string | null>(null)

  const handleTierFilter = useCallback((data: typeof CULTIVATION_TIERS) => {
    setFilteredTiers(data)
  }, [])

  const handleTechniqueFilter = useCallback((data: typeof CLASSIC_TECHNIQUES) => {
    setFilteredTechniques(data)
  }, [])

  const tierFilters = {
    searchKeys: ['name', 'feature', 'breakthrough', 'sign', 'detail', 'phenomena'],
    filterKeys: {},
    sortOptions: [
      { key: 'level', label: '境界排序' },
      { key: 'difficulty', label: '难度排序' },
      { key: 'mortality', label: '死亡率排序' },
    ],
  }

  const techniqueFilters = {
    searchKeys: ['name', 'sect', 'grade', 'founder', 'feature', 'detail', 'disciples', 'steps'],
    filterKeys: {
      sect: [...new Set(CLASSIC_TECHNIQUES.map(t => t.sect))],
      grade: [...new Set(CLASSIC_TECHNIQUES.map(t => t.grade))],
    },
    sortOptions: [
      { key: 'compatibility', label: '契合度排序' },
      { key: 'power', label: '威力排序' },
      { key: 'name', label: '功法名称' },
    ],
  }

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
        <FilterBar
          data={CULTIVATION_TIERS}
          onFiltered={handleTierFilter}
          options={tierFilters}
          placeholder="搜索境界名称、特征..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem',
          marginTop: '1.5rem'
        }}>
          {filteredTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              layout
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5, scale: 1.02 }}
              style={{
                border: `2px solid ${tier.color}50`,
                borderTop: `3px solid ${tier.color}`,
                background: tier.level === 8 ? `linear-gradient(135deg, ${tier.color}15, transparent)` : undefined,
                cursor: 'pointer'
              }}
              onClick={() => setExpandedTier(expandedTier === tier.name ? null : tier.name)}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                  <motion.div
                    animate={{ rotate: expandedTier === tier.name ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)' }}
                  >
                    ▼
                  </motion.div>
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
                  <span style={{ color: 'rgba(180, 180, 190, 0.5)' }}>突破难度</span>
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

              <AnimatePresence>
                {expandedTier === tier.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: `1px solid ${tier.color}30`
                    }}>
                      <p style={{
                        color: 'rgba(180, 180, 190, 0.75)',
                        lineHeight: 1.7,
                        fontSize: '0.8rem'
                      }}>
                        {tier.detail}
                      </p>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginTop: '0.75rem'
                      }}>
                        {tier.phenomena.map((p, i) => (
                          <span key={i} style={{
                            fontSize: '0.65rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '10px',
                            background: `${tier.color}20`,
                            color: tier.color
                          }}>
                            ✨ {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="六大门派镇派神功">
        <FilterBar
          data={CLASSIC_TECHNIQUES}
          onFiltered={handleTechniqueFilter}
          options={techniqueFilters}
          placeholder="搜索功法名称、门派、创始人..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          {filteredTechniques.map((tech, index) => (
            <motion.div
              key={tech.name}
              layout
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              style={{
                border: `2px solid ${tech.color}40`,
                borderLeft: `4px solid ${tech.color}`,
                cursor: 'pointer'
              }}
              onClick={() => setExpandedTechnique(expandedTechnique === tech.name ? null : tech.name)}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                  <motion.div
                    animate={{ rotate: expandedTechnique === tech.name ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)' }}
                  >
                    ▼
                  </motion.div>
                </div>
              </div>

              <p style={{
                color: tech.color,
                opacity: 0.9,
                fontSize: '0.8rem',
                marginBottom: '0.75rem',
                fontStyle: 'italic'
              }}>
                「{tech.feature}」
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                textAlign: 'center',
                marginBottom: '0.75rem'
              }}>
                {[
                  { label: '威力', value: tech.power },
                  { label: '速度', value: tech.speed },
                  { label: '根基', value: tech.foundation },
                ].map(stat => (
                  <div key={stat.label}>
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: tech.color
                    }}>{stat.value}</div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: 'rgba(180, 180, 190, 0.5)'
                    }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {expandedTechnique === tech.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: `1px solid ${tech.color}30`
                    }}>
                      <p style={{
                        color: 'rgba(180, 180, 190, 0.75)',
                        lineHeight: 1.7,
                        fontSize: '0.8rem',
                        marginBottom: '0.75rem'
                      }}>
                        {tech.detail}
                      </p>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 'bold' }}>⚠️ 禁忌：</span>
                        <span style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.75rem' }}>
                          {tech.taboo}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 'bold' }}>📚 修炼步骤：</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
                          {tech.steps.map((step, i) => (
                            <span key={i} style={{
                              fontSize: '0.7rem',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '10px',
                              background: `${tech.color}20`,
                              color: tech.color
                            }}>
                              {i + 1}. {step}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="修真真言">
        <InfoCard>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                fontSize: '1.25rem',
                color: '#6ee7b7',
                fontStyle: 'italic',
                lineHeight: 2,
                letterSpacing: '0.05em'
              }}
            >
              炼精化气筑基成，炼气化神丹苗生<br />
              炼神还虚元婴显，炼虚合道步虚清<br />
              顺则生人逆成仙，只在其中颠倒颠<br />
              一粒金丹吞入腹，始知我命不由天
            </motion.div>
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
