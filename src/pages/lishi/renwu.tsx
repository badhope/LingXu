'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function RenwuPage() {
  const figures = [
    {
      name: '伏羲氏',
      era: '上古',
      title: '人文始祖',
      achievement: '画八卦，结网罟，定婚嫁',
      influence: 100,
      desc: '仰则观象于天，俯则观法于地，观鸟兽之文与地之宜，近取诸身，远取诸物，始作八卦。',
      icon: '☯️'
    },
    {
      name: '神农氏',
      era: '上古',
      title: '农业始祖',
      achievement: '尝百草，种五谷，兴商贸',
      influence: 98,
      desc: '斫木为耜，揉木为耒，耒耨之利以教天下。尝百草之滋味，一日而遇七十毒，始有医药。',
      icon: '🌿'
    },
    {
      name: '黄帝',
      era: '上古',
      title: '华夏始祖',
      achievement: '统一华夏，创文字，定音律',
      influence: 100,
      desc: '与炎帝战于阪泉之野，与蚩尤战于涿鹿之野。统一华夏部落，服牛乘马，披山通道，未尝宁居。',
      icon: '👑'
    },
    {
      name: '周公',
      era: '西周',
      title: '元圣',
      achievement: '制礼作乐，奠定华夏文明',
      influence: 95,
      desc: '周公吐哺，天下归心。制周礼，作礼乐，建宗法，立嫡长，为华夏文明奠定万世根基。',
      icon: '🏛️'
    },
    {
      name: '孔子',
      era: '春秋',
      title: '大成至圣先师',
      achievement: '创立儒家，周游列国，删诗书',
      influence: 100,
      desc: '天不生仲尼，万古如长夜。祖述尧舜，宪章文武，删述六经，垂宪万世。',
      icon: '📖'
    },
    {
      name: '秦始皇',
      era: '秦',
      title: '千古一帝',
      achievement: '统一六国，书同文，车同轨',
      influence: 99,
      desc: '奋六世之余烈，振长策而御宇内，吞二周而亡诸侯，履至尊而制六合。虽二世而亡，百代都行秦政法。',
      icon: '⚔️'
    },
    {
      name: '汉武帝',
      era: '西汉',
      title: '汉武大帝',
      achievement: '罢黜百家，独尊儒术，开疆拓土',
      influence: 97,
      desc: '寇可往，我亦可往！遣卫青霍去病北击匈奴，遣张骞通西域，奠定汉民族千年自信。',
      icon: '🏹'
    },
    {
      name: '唐太宗',
      era: '唐',
      title: '天可汗',
      achievement: '贞观之治，四夷宾服',
      influence: 96,
      desc: '自古皆贵中华，贱夷狄，朕独爱之如一。开创贞观之治，万国来朝，贞观遗风至今犹存。',
      icon: '🌏'
    }
  ]

  const getEraColor = (era: string) => {
    switch (era) {
      case '上古': return '#a855f7'
      case '西周': return '#22c55e'
      case '春秋': return '#eab308'
      case '秦': return '#ef4444'
      case '西汉': return '#3b82f6'
      case '唐': return '#f97316'
      default: return '#6b7280'
    }
  }

  return (
    <SubPageTemplate
      title="历史人物"
      subtitle="风流人物 · 英雄豪杰 · 圣贤明君 · 千古风流"
      icon="👤"
      colorRgb="255, 170, 102"
    >
      <SubPageSection title="人物排行榜">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            textAlign: 'center'
          }}>
            {[
              { label: '上古圣贤', count: '3', color: '#a855f7' },
              { label: '先秦诸子', count: '1', color: '#eab308' },
              { label: '千古一帝', count: '2', color: '#ef4444' },
              { label: '盛世明君', count: '2', color: '#f97316' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: stat.color,
                  margin: '0 auto 0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  👤
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#b89438' }}>{stat.count}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="华夏群英谱">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem'
        }}>
          {figures.map((person, index) => (
            <motion.div
              key={person.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0 }}>
                  <motion.div
                    animate={{
                      boxShadow: [
                        `0 0 0 ${getEraColor(person.era)}00`,
                        `0 0 20px ${getEraColor(person.era)}80`,
                        `0 0 0 ${getEraColor(person.era)}00`
                      ]
                    }}
                    transition={{ duration: 3, delay: index * 0.2, repeat: Infinity }}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${getEraColor(person.era)}, ${getEraColor(person.era)}88)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem'
                    }}
                  >
                    {person.icon}
                  </motion.div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#b89438'
                      }}>
                        {person.name}
                      </span>
                      <span style={{
                        marginLeft: '0.5rem',
                        fontSize: '0.7rem',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '8px',
                        background: `${getEraColor(person.era)}30`,
                        color: getEraColor(person.era)
                      }}>
                        {person.era}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: 'rgba(180, 180, 190, 0.5)'
                    }}>
                      影响力 <span style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        color: getEraColor(person.era)
                      }}>{person.influence}</span>
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.8rem',
                    color: '#f59e0b',
                    marginBottom: '0.5rem'
                  }}>
                    🌟 {person.title}
                  </div>

                  <p style={{
                    color: 'rgba(180, 180, 190, 0.75)',
                    fontSize: '0.8rem',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem'
                  }}>
                    {person.desc}
                  </p>

                  <div style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 170, 102, 0.1)',
                    color: 'rgba(255, 170, 102, 0.9)',
                    display: 'inline-block'
                  }}>
                    🏆 {person.achievement}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="咏史">
        <InfoCard>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                fontSize: '1.35rem',
                color: '#f59e0b',
                fontStyle: 'italic',
                lineHeight: 2
              }}
            >
              大江东去，浪淘尽，千古风流人物<br />
              江山如此多娇，引无数英雄竞折腰<br />
              俱往矣，数风流人物，还看今朝
            </motion.div>
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
