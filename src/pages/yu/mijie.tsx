'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function MijiePage() {
  const realms = [
    {
      name: '神魔陵园',
      type: '古战场',
      dangerLevel: 'SSS',
      discovered: '太古年间',
      explorers: 12540,
      survivors: 37,
      feature: '众神陨落之地，神魔尸骸堆积成山',
      rewards: ['神魔本源', '残破神器', '不朽神格'],
      boss: '守墓老人',
      desc: '亿万神魔在此陨落，鲜血染红了大地。即使过去无量量劫，依然有神魔残念不散，化作永世诅咒。'
    },
    {
      name: '龙墓',
      type: '龙族墓地',
      dangerLevel: 'SS',
      discovered: '上古年间',
      explorers: 8920,
      survivors: 156,
      feature: '万龙归葬之所，龙骨如山',
      rewards: ['真龙精血', '龙骨法宝', '龙珠本源'],
      boss: '龙魂始祖',
      desc: '诸天万界的龙族寿元将尽时，都会穿越界壁来到此处。龙魂不灭，镇守着龙族的最终秘密。'
    },
    {
      name: '幽冥地府',
      type: '冥界入口',
      dangerLevel: 'SS',
      discovered: '混沌初开',
      explorers: 15680,
      survivors: 203,
      feature: '轮回之所，万物归宿',
      rewards: ['轮回之力', '生死簿残页', '幽冥火种'],
      boss: '十殿阎罗',
      desc: '黄泉路上，彼岸花盛开。奈何桥边，孟婆汤一碗。入此地者，九死一生。能走出者，皆已脱胎换骨。'
    },
    {
      name: '虚空战场',
      type: '界域裂缝',
      dangerLevel: 'S',
      discovered: '乱古年间',
      explorers: 25400,
      survivors: 1280,
      feature: '诸天大战遗迹',
      rewards: ['虚空道则', '战帝残兵', '空间碎片'],
      boss: '虚空异兽',
      desc: '界壁破碎之处，时空错乱。曾有大帝在此战死，道则残痕至今不灭，误入者神魂俱灭。'
    },
    {
      name: '昆墟秘境',
      type: '上古宗门',
      dangerLevel: 'A',
      discovered: '中古年间',
      explorers: 18750,
      survivors: 3250,
      feature: '昆墟圣地遗址',
      rewards: ['上古传承', '仙丹灵药', '圣兵碎片'],
      boss: '护山圣兽',
      desc: '上古第一宗门昆墟的遗址，宗门大阵依然在运转。虽然危险，但机缘也是最多。'
    },
    {
      name: '妖帝坟冢',
      type: '妖帝陵墓',
      dangerLevel: 'S',
      discovered: '太古末年',
      explorers: 9870,
      survivors: 421,
      feature: '妖族大帝葬地',
      rewards: ['妖帝本源', '妖帝兵', '万妖图'],
      boss: '妖帝残魂',
      desc: '曾镇压九天十地的妖帝，死后葬于此地。万妖守护，非大机缘者不得入内。'
    },
    {
      name: '羽化神朝遗址',
      type: '古朝遗迹',
      dangerLevel: 'A',
      discovered: '近古年间',
      explorers: 32500,
      survivors: 5680,
      feature: '羽化神朝皇都',
      rewards: ['皇朝秘藏', '羽化飞升诀', '帝器碎片'],
      boss: '皇朝守陵卫',
      desc: '曾一统中州的羽化神朝，一夜之间灰飞烟灭。留下的秘藏让无数修士疯狂。'
    },
    {
      name: '紫山',
      type: '古皇山',
      dangerLevel: 'SS',
      discovered: '荒古年间',
      explorers: 7650,
      survivors: 127,
      feature: '无始大帝闭关地',
      rewards: ['无始经残页', '帝血晶', '紫山源石'],
      boss: '源神',
      desc: '无始大帝曾在此闭关数十万年。山中源石无数，但也封印着太古元凶，一旦出世，血洗天下。'
    }
  ]

  const getDangerStyle = (level: string) => {
    switch (level) {
      case 'SSS': return {
        bg: 'linear-gradient(135deg, #dc2626, #7f1d1d)',
        color: '#ef4444',
        text: '死亡禁地',
        pulse: true
      }
      case 'SS': return {
        bg: 'linear-gradient(135deg, #f97316, #c2410c)',
        color: '#f97316',
        text: '极度危险',
        pulse: true
      }
      case 'S': return {
        bg: 'linear-gradient(135deg, #ea580c, #9a3412)',
        color: '#ea580c',
        text: '危险',
        pulse: false
      }
      case 'A': return {
        bg: 'linear-gradient(135deg, #eab308, #a16207)',
        color: '#eab308',
        text: '较危险',
        pulse: false
      }
      default: return {
        bg: 'linear-gradient(135deg, #22c55e, #15803d)',
        color: '#22c55e',
        text: '安全',
        pulse: false
      }
    }
  }

  const getSurvivalRate = (explorers: number, survivors: number) => {
    return ((survivors / explorers) * 100).toFixed(2)
  }

  return (
    <SubPageTemplate
      title="秘界探索"
      subtitle="上古遗迹 · 秘境探险 · 古墓寻宝 · 危中有机"
      icon="🗝️"
      colorRgb="170, 136, 255"
    >
      <SubPageSection title="秘境总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: 'SSS级禁地', count: '1', color: '#ef4444', icon: '💀', desc: '九死无生' },
              { label: 'SS级秘境', count: '3', color: '#f97316', icon: '☠️', desc: '九死一生' },
              { label: 'S级险地', count: '2', color: '#ea580c', icon: '⚠️', desc: '七死三生' },
              { label: 'A级遗迹', count: '2', color: '#eab308', icon: '🗺️', desc: '机缘与危险并存' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={i <= 1 ? {
                    scale: [1, 1.1, 1],
                    boxShadow: [`0 0 20px ${stat.color}00`, `0 0 40px ${stat.color}`, `0 0 20px ${stat.color}00`]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '12px',
                    background: stat.color,
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
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

      <SubPageSection title="秘境档案库">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {realms.map((realm, index) => (
            <motion.div
              key={realm.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ scale: 1.01 }}
              style={{
                border: `2px solid ${getDangerStyle(realm.dangerLevel).color}40`
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div>
                  <motion.span
                    animate={getDangerStyle(realm.dangerLevel).pulse ? {
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      background: getDangerStyle(realm.dangerLevel).bg,
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    ⚠️ {realm.dangerLevel}级 · {getDangerStyle(realm.dangerLevel).text}
                  </motion.span>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: getDangerStyle(realm.dangerLevel).color,
                    marginTop: '0.75rem'
                  }}>
                    🗺️ {realm.name}
                  </h3>
                  <span style={{
                    fontSize: '0.8rem',
                    color: 'rgba(180, 180, 190, 0.6)',
                    marginLeft: '0.5rem'
                  }}>
                    {realm.type} · 发现于{realm.discovered}
                  </span>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(239, 68, 68, 0.7)' }}>存活率</div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: parseFloat(getSurvivalRate(realm.explorers, realm.survivors)) < 5 ? '#ef4444' :
                      parseFloat(getSurvivalRate(realm.explorers, realm.survivors)) < 20 ? '#f97316' : '#eab308'
                  }}>
                    {getSurvivalRate(realm.explorers, realm.survivors)}%
                  </div>
                </div>
              </div>

              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.85rem',
                lineHeight: 1.7,
                marginBottom: '1rem',
                fontStyle: 'italic'
              }}>
                📜 {realm.desc}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1rem',
                fontSize: '0.8rem'
              }}>
                <div style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  background: 'rgba(239, 68, 68, 0.08)'
                }}>
                  <span style={{ color: 'rgba(239, 68, 68, 0.7)' }}>👹 镇守BOSS：</span>
                  <span style={{ color: '#ef4444', fontWeight: 'bold', marginLeft: '0.25rem' }}>
                    {realm.boss}
                  </span>
                </div>
                <div style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  background: 'rgba(170, 136, 255, 0.08)'
                }}>
                  <span style={{ color: 'rgba(170, 136, 255, 0.7)' }}>✨ 秘境特色：</span>
                  <span style={{ color: 'rgba(170, 136, 255, 1)', marginLeft: '0.25rem' }}>
                    {realm.feature}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'rgba(34, 197, 94, 0.7)' }}>
                  🏆 可获机缘：
                </span>
                {realm.rewards.map((r, i) => (
                  <span key={i} style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    background: 'rgba(34, 197, 94, 0.15)',
                    color: '#22c55e',
                    border: '1px solid rgba(34, 197, 94, 0.3)'
                  }}>
                    {r}
                  </span>
                ))}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(180, 180, 190, 0.1)',
                fontSize: '0.75rem',
                color: 'rgba(180, 180, 190, 0.5)'
              }}>
                <span>🧭 累计探险者：{realm.explorers.toLocaleString()}人</span>
                <span>🏃 生还者：{realm.survivors.toLocaleString()}人</span>
                <span>💀 陨落：{(realm.explorers - realm.survivors).toLocaleString()}人</span>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
