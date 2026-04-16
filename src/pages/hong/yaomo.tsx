'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function YaomoPage() {
  const demons = [
    {
      name: '蚩尤',
      type: '魔神',
      tier: 'S',
      power: 99,
      desc: '上古魔神，铜头铁额，食沙石子。身兼八十一兄弟，创五兵，战黄帝于涿鹿之野。虽败犹荣，为兵主战神。',
      habitat: '九黎',
      weakness: '天道'
    },
    {
      name: '刑天',
      type: '战神',
      tier: 'S',
      power: 95,
      desc: '与帝争神，帝断其首，葬之常羊之山。乃以乳为目，以脐为口，操干戚以舞。永不屈服的斗士象征。',
      habitat: '常羊山',
      weakness: '无首'
    },
    {
      name: '相柳',
      type: '蛇妖',
      tier: 'A',
      power: 88,
      desc: '共工之臣，九首蛇身，自环，食于九土。其所歍所尼，即为源泽，不辛乃苦，百兽莫能处。禹杀相柳，其血腥臭。',
      habitat: '共工台',
      weakness: '大禹'
    },
    {
      name: '夸父',
      type: '巨人',
      tier: 'A',
      power: 85,
      desc: '夸父不量力，欲追日景，逮之于禺谷。将饮河而不足也，将走大泽，未至，死于此。弃其杖，化为邓林。',
      habitat: '成都载天',
      weakness: '口渴'
    },
    {
      name: '精卫',
      type: '灵鸟',
      tier: 'B',
      power: 65,
      desc: '炎帝之少女，名曰女娃。女娃游于东海，溺而不返，故为精卫，常衔西山之木石，以堙于东海。',
      habitat: '东海',
      weakness: '大海'
    },
    {
      name: '魑魅魍魉',
      type: '山精',
      tier: 'C',
      power: 40,
      desc: '山泽之精，木石之怪。人面兽身，四足，好惑人。生于山阜，出于沟壑之间，乘阴侮阳，含邪茹毒。',
      habitat: '山林',
      weakness: '桃木'
    }
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S': return { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', glow: '0 0 20px rgba(239, 68, 68, 0.5)' }
      case 'A': return { bg: 'linear-gradient(135deg, #f97316, #ea580c)', glow: '0 0 15px rgba(249, 115, 22, 0.5)' }
      case 'B': return { bg: 'linear-gradient(135deg, #eab308, #ca8a04)', glow: '0 0 10px rgba(234, 179, 8, 0.5)' }
      case 'C': return { bg: 'linear-gradient(135deg, #6b7280, #4b5563)', glow: 'none' }
      default: return { bg: '#6b7280', glow: 'none' }
    }
  }

  const getDangerLevel = (power: number) => {
    if (power >= 90) return '灭世级'
    if (power >= 80) return '灾难级'
    if (power >= 60) return '危险级'
    return '普通级'
  }

  return (
    <SubPageTemplate
      title="妖魔鬼怪"
      subtitle="魑魅魍魉 · 山精水怪 · 上古魔神 · 六道众生"
      icon="👹"
      colorRgb="239, 68, 68"
    >
      <SubPageSection title="妖魔等级总览">
        <InfoCard>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
            {[
              { tier: 'S级', count: '2', label: '灭世魔神', color: '#ef4444' },
              { tier: 'A级', count: '2', label: '灾难妖灵', color: '#f97316' },
              { tier: 'B级', count: '1', label: '危险精怪', color: '#eab308' },
              { tier: 'C级', count: '1', label: '普通鬼魅', color: '#6b7280' }
            ].map((stat, i) => (
              <motion.div
                key={stat.tier}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: stat.color,
                  textShadow: `0 0 10px ${stat.color}`
                }}>
                  {stat.tier}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#b89438', marginTop: '0.5rem' }}>
                  {stat.count}
                </div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="妖魔图鉴">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {demons.map((demon, index) => (
            <motion.div
              key={demon.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 10 }}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                background: getTierColor(demon.tier).bg,
                boxShadow: getTierColor(demon.tier).glow
              }} />
              
              <div style={{ paddingLeft: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: getTierColor(demon.tier).bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.75rem',
                      fontWeight: 'bold',
                      color: 'white',
                      boxShadow: getTierColor(demon.tier).glow,
                      marginBottom: '0.5rem'
                    }}
                  >
                    {demon.tier}
                  </motion.div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>
                    {getDangerLevel(demon.power)}
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div>
                      <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#b89438' }}>
                        {demon.name}
                      </span>
                      <span style={{ 
                        marginLeft: '0.75rem', 
                        fontSize: '0.75rem', 
                        background: 'rgba(239, 68, 68, 0.2)',
                        color: '#fca5a5',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px'
                      }}>
                        {demon.type}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.6)' }}>战力</span>
                      <div style={{
                        width: '80px',
                        height: '6px',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${demon.power}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          style={{
                            height: '100%',
                            background: getTierColor(demon.tier).bg
                          }}
                        />
                      </div>
                      <span style={{ fontWeight: 'bold', color: '#ef4444' }}>{demon.power}</span>
                    </div>
                  </div>

                  <p style={{
                    color: 'rgba(180, 180, 190, 0.75)',
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                    marginBottom: '0.75rem'
                  }}>
                    {demon.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem' }}>
                    <span style={{ color: 'rgba(180, 180, 190, 0.6)' }}>
                      📍 出没地: <span style={{ color: '#60a5fa' }}>{demon.habitat}</span>
                    </span>
                    <span style={{ color: 'rgba(180, 180, 190, 0.6)' }}>
                      ⚠️ 弱点: <span style={{ color: '#f87171' }}>{demon.weakness}</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="镇魔箴言">
        <InfoCard>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                fontSize: '1.5rem',
                color: '#ef4444',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                lineHeight: 2
              }}
            >
              道高一尺，魔高一丈<br />
              人心生一念，天地尽皆知<br />
              善恶若无报，乾坤必有私
            </motion.div>
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
