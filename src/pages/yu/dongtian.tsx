'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function DongtianPage() {
  const caves = [
    {
      rank: 1,
      name: '王屋山洞',
      alias: '小有清虚之天',
      location: '河南王屋山',
      spiritLevel: 100,
      master: '西城王君',
      feature: '黄帝祭天之所，女娲补天处',
      beasts: ['玄鹤', '白鹿', '灵狐'],
      status: '现世'
    },
    {
      rank: 2,
      name: '委羽山洞',
      alias: '大有空明之天',
      location: '浙江委羽山',
      spiritLevel: 98,
      master: '青童君',
      feature: '仙人藏丹砂秘籍于此',
      beasts: ['青鸾', '火凤', '金雕'],
      status: '半隐'
    },
    {
      rank: 3,
      name: '西城山洞',
      alias: '太玄总真之天',
      location: '四川青城山',
      spiritLevel: 96,
      master: '元始天王',
      feature: '五龙护持，太上老君传道处',
      beasts: ['五龙', '仙鹤', '白猿'],
      status: '现世'
    },
    {
      rank: 4,
      name: '西玄山洞',
      alias: '三元极真之天',
      location: '陕西华山',
      spiritLevel: 95,
      master: '赤松子',
      feature: '三峰对峙，自古修真圣地',
      beasts: ['黑虎', '苍龙', '白帝子'],
      status: '现世'
    },
    {
      rank: 5,
      name: '青城山洞',
      alias: '宝仙九室之天',
      location: '四川青城山',
      spiritLevel: 93,
      master: '宁封子',
      feature: '五岳丈人坐镇，道教第五洞天',
      beasts: ['灵獒', '白蛇', '七彩蝶'],
      status: '现世'
    },
    {
      rank: 6,
      name: '赤城山洞',
      alias: '上清玉平之天',
      location: '浙江天台山',
      spiritLevel: 90,
      master: '玄洲仙伯',
      feature: '赤霞万丈，琼楼玉宇隐现',
      beasts: ['朱雀', '丹凤', '赤鲤'],
      status: '隐世'
    },
    {
      rank: 7,
      name: '罗浮山洞',
      alias: '朱明曜真之天',
      location: '广东罗浮山',
      spiritLevel: 88,
      master: '葛洪仙翁',
      feature: '蓬莱一脉浮海而至',
      beasts: ['蛟龙', '玄武', '千年龟'],
      status: '现世'
    },
    {
      rank: 8,
      name: '句曲山洞',
      alias: '金坛华阳之天',
      location: '江苏茅山',
      spiritLevel: 85,
      master: '三茅真君',
      feature: '华阳洞天，金陵之屏障',
      beasts: ['白犀', '青牛', '灵芝鹿'],
      status: '现世'
    },
    {
      rank: 9,
      name: '林屋山洞',
      alias: '左神幽虚之天',
      location: '江苏太湖',
      spiritLevel: 82,
      master: '龙威丈人',
      feature: '藏大禹治水秘籍金简玉字',
      beasts: ['太湖龙君', '白鱼', '水麒麟'],
      status: '隐世'
    },
    {
      rank: 10,
      name: '括苍山洞',
      alias: '成德隐玄之天',
      location: '浙江括苍山',
      spiritLevel: 80,
      master: '太极真人',
      feature: '徐来勒真人得道处',
      beasts: ['玄豹', '黄熊', '飞廉'],
      status: '半隐'
    }
  ]

  const getSpiritColor = (level: number) => {
    if (level >= 95) return { main: '#22c55e', glow: '0 0 30px rgba(34, 197, 94, 0.6)' }
    if (level >= 85) return { main: '#84cc16', glow: '0 0 20px rgba(132, 204, 22, 0.5)' }
    if (level >= 80) return { main: '#eab308', glow: '0 0 15px rgba(234, 179, 8, 0.4)' }
    return { main: '#f97316', glow: '0 0 10px rgba(249, 115, 22, 0.3)' }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '现世': return { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', icon: '🌞' }
      case '半隐': return { bg: 'rgba(234, 179, 8, 0.15)', color: '#eab308', icon: '🌥️' }
      case '隐世': return { bg: 'rgba(107, 114, 128, 0.15)', color: '#6b7280', icon: '🌙' }
      default: return { bg: 'rgba(107, 114, 128, 0.15)', color: '#6b7280', icon: '❓' }
    }
  }

  return (
    <SubPageTemplate
      title="洞天福地"
      subtitle="十大洞天 · 三十六小洞天 · 七十二福地 · 人间仙境"
      icon="🏔️"
      colorRgb="170, 136, 255"
    >
      <SubPageSection title="灵气分布图">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1rem',
            textAlign: 'center'
          }}>
            {[
              { label: '仙级洞天', count: '3', level: '100-98', color: '#22c55e' },
              { label: '神级洞天', count: '4', level: '96-90', color: '#84cc16' },
              { label: '圣级洞天', count: '2', level: '88-85', color: '#eab308' },
              { label: '灵级洞天', count: '1', level: '82-80', color: '#f97316' },
              { label: '现世开放', count: '6', level: '可入内', color: '#3b82f6' }
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
                  background: `conic-gradient(${stat.color}, ${stat.color}88, ${stat.color}44, transparent)`,
                  margin: '0 auto 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  🏔️
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stat.color }}>{stat.count}</div>
                <div style={{ color: '#b89438', fontSize: '0.9rem' }}>{stat.label}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.6)', fontSize: '0.75rem' }}>{stat.level}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="十大洞天排行榜">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {caves.map((cave, index) => (
            <motion.div
              key={cave.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01, x: 5 }}
            >
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ flexShrink: 0 }}>
                  <motion.div
                    animate={{
                      boxShadow: [getSpiritColor(cave.spiritLevel).glow, 'none', getSpiritColor(cave.spiritLevel).glow]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${getSpiritColor(cave.spiritLevel).main}, ${getSpiritColor(cave.spiritLevel).main}88)`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      position: 'relative'
                    }}
                  >
                    {cave.rank <= 3 && (
                      <span style={{ position: 'absolute', top: '-8px', right: '-8px', fontSize: '1.25rem' }}>
                        {cave.rank === 1 ? '👑' : cave.rank === 2 ? '🥈' : '🥉'}
                      </span>
                    )}
                    <span style={{ fontSize: '0.7rem' }}>NO.{cave.rank}</span>
                    <span style={{ fontSize: '1.75rem' }}>🏔️</span>
                  </motion.div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.5rem'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '1.35rem',
                        fontWeight: 'bold',
                        color: getSpiritColor(cave.spiritLevel).main
                      }}>
                        {cave.name}
                      </span>
                      <span style={{
                        marginLeft: '0.75rem',
                        fontSize: '0.75rem',
                        color: 'rgba(170, 136, 255, 0.9)'
                      }}>
                        「{cave.alias}」
                      </span>
                      <span style={{
                        marginLeft: '0.75rem',
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '12px',
                        ...getStatusStyle(cave.status)
                      }}>
                        {getStatusStyle(cave.status).icon} {cave.status}
                      </span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>灵气值</div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <div style={{
                          width: '80px',
                          height: '8px',
                          background: 'rgba(0,0,0,0.3)',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${cave.spiritLevel}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            style={{
                              height: '100%',
                              background: `linear-gradient(90deg, ${getSpiritColor(cave.spiritLevel).main}, ${getSpiritColor(cave.spiritLevel).main}88)`
                            }}
                          />
                        </div>
                        <span style={{
                          fontWeight: 'bold',
                          fontSize: '1.25rem',
                          color: getSpiritColor(cave.spiritLevel).main
                        }}>
                          {cave.spiritLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                    fontSize: '0.8rem'
                  }}>
                    <div style={{ color: 'rgba(180, 180, 190, 0.7)' }}>
                      📍 {cave.location}
                    </div>
                    <div style={{ color: 'rgba(180, 180, 190, 0.7)' }}>
                      🧙 洞主：{cave.master}
                    </div>
                  </div>

                  <p style={{
                    color: 'rgba(170, 136, 255, 0.9)',
                    fontSize: '0.85rem',
                    fontStyle: 'italic',
                    marginBottom: '0.75rem'
                  }}>
                    ✨ {cave.feature}
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                      🐾 护山灵兽：
                    </span>
                    {cave.beasts.map((b, i) => (
                      <span key={i} style={{
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '12px',
                        background: 'rgba(170, 136, 255, 0.15)',
                        color: 'rgba(170, 136, 255, 0.9)'
                      }}>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
