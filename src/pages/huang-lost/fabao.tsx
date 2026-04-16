'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function FabaoPage() {
  const artifacts = [
    {
      rank: 1,
      name: '盘古幡',
      owner: '元始天尊',
      tier: '混沌至宝',
      power: 100,
      desc: '盘古斧之斧刃所化，掌混沌之力，撕裂空间，破碎万法。洪荒第一攻击至宝，一出则万道避让。',
      ability: ['撕裂空间', '破碎万法', '开天辟地']
    },
    {
      rank: 2,
      name: '太极图',
      owner: '太上老君',
      tier: '混沌至宝',
      power: 99,
      desc: '盘古斧之斧柄所化，定地水火风，化解万般攻击。化金桥，渡众生，防御无双，包罗万象。',
      ability: ['定地水火风', '金桥渡世', '万法不侵']
    },
    {
      rank: 3,
      name: '混沌钟',
      owner: '东皇太一',
      tier: '混沌至宝',
      power: 98,
      desc: '盘古斧之斧背所化，镇压鸿蒙，防御无双。钟声一响，时空静止，万物归寂，洪荒第一防御至宝。',
      ability: ['镇压鸿蒙', '时空静止', '免疫一切']
    },
    {
      rank: 4,
      name: '诛仙剑阵',
      owner: '通天教主',
      tier: '先天至宝',
      power: 95,
      desc: '诛仙四剑+阵图，非四圣不可破。天道第一杀阵，诛仙戮佛，血染洪荒。',
      ability: ['诛仙戮佛', '杀伐无双', '困圣囚佛']
    },
    {
      rank: 5,
      name: '十二品莲台',
      owner: '接引道人',
      tier: '先天至宝',
      power: 92,
      desc: '混沌青莲莲子所化，业火不侵，万法不染。镇压佛门气运，渡化众生。',
      ability: ['渡化众生', '业火不侵', '镇运灵宝']
    },
    {
      rank: 6,
      name: '山河社稷图',
      owner: '女娲娘娘',
      tier: '先天灵宝',
      power: 88,
      desc: '内有乾坤，可化山川河流，日月星辰。入图者如坠幻境，任人宰割。',
      ability: ['内有乾坤', '幻境囚笼', '演化世界']
    },
    {
      rank: 7,
      name: '河图洛书',
      owner: '伏羲氏',
      tier: '先天灵宝',
      power: 85,
      desc: '天地之数，星斗排布。演算天机，趋吉避凶。妖族天庭镇压气运之宝。',
      ability: ['演算天机', '推衍大道', '趋吉避凶']
    },
    {
      rank: 8,
      name: '定海神针',
      owner: '孙悟空',
      tier: '后天功德至宝',
      power: 80,
      desc: '大禹治水时遗留，重一万三千五百斤。能大能小，随心变化。西游之路大放异彩。',
      ability: ['如意变化', '重逾万斤', '镇海之宝']
    }
  ]

  const getTierColor = (tier: string) => {
    if (tier.includes('混沌')) return {
      bg: 'linear-gradient(135deg, #a855f7, #7c3aed)',
      text: '#a855f7',
      crown: '👑'
    }
    if (tier.includes('先天至')) return {
      bg: 'linear-gradient(135deg, #ef4444, #dc2626)',
      text: '#ef4444',
      crown: '⭐'
    }
    return {
      bg: 'linear-gradient(135deg, #eab308, #ca8a04)',
      text: '#eab308',
      crown: '💎'
    }
  }

  return (
    <SubPageTemplate
      title="先天法宝"
      subtitle="混沌灵宝 · 天生地养 · 法宝通灵 · 神器有灵"
      icon="🏺"
      colorRgb="168, 162, 158"
    >
      <SubPageSection title="法宝排行榜">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { rank: 'TOP 3', name: '盘古三宝', count: '混沌至宝', color: '#a855f7' },
              { rank: 'TOP 4-5', name: '诛仙剑阵+莲台', count: '先天至宝', color: '#ef4444' },
              { rank: 'TOP 6-8', name: '极品灵宝', count: '先天灵宝', color: '#eab308' }
            ].map((stat, i) => (
              <motion.div
                key={stat.rank}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: stat.color,
                  textShadow: `0 0 15px ${stat.color}`
                }}>
                  {stat.rank}
                </div>
                <div style={{ fontSize: '1.1rem', color: '#b89438', marginTop: '0.5rem' }}>
                  {stat.name}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'rgba(180, 180, 190, 0.6)',
                  marginTop: '0.25rem'
                }}>
                  {stat.count}
                </div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="封神榜">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {artifacts.map((item, index) => (
            <motion.div
              key={item.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              {item.rank <= 3 && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    fontSize: '2rem'
                  }}
                >
                  {getTierColor(item.tier).crown}
                </motion.div>
              )}

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ flexShrink: 0 }}>
                  <motion.div
                    animate={{
                      boxShadow: item.rank <= 3 ? [
                        `0 0 20px ${getTierColor(item.tier).text}`,
                        `0 0 40px ${getTierColor(item.tier).text}`,
                        `0 0 20px ${getTierColor(item.tier).text}`
                      ] : 'none'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '12px',
                      background: getTierColor(item.tier).bg,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    <div style={{ fontSize: '0.7rem' }}>NO.</div>
                    <div style={{ fontSize: '2rem' }}>{item.rank}</div>
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
                        fontSize: '1.35rem',
                        fontWeight: 'bold',
                        color: getTierColor(item.tier).text
                      }}>
                        {item.name}
                      </span>
                      <span style={{
                        marginLeft: '0.75rem',
                        fontSize: '0.75rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        background: `rgba(180, 180, 190, 0.1)`,
                        color: getTierColor(item.tier).text
                      }}>
                        {item.tier}
                      </span>
                      <span style={{
                        marginLeft: '0.75rem',
                        fontSize: '0.75rem',
                        color: 'rgba(180, 180, 190, 0.5)'
                      }}>
                        🧙 {item.owner}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '100px',
                        height: '8px',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.power}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          style={{
                            height: '100%',
                            background: getTierColor(item.tier).bg
                          }}
                        />
                      </div>
                      <span style={{
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        color: getTierColor(item.tier).text
                      }}>
                        {item.power}
                      </span>
                    </div>
                  </div>

                  <p style={{
                    color: 'rgba(180, 180, 190, 0.75)',
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                    marginBottom: '0.75rem'
                  }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {item.ability.map((ab, i) => (
                      <span key={i} style={{
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(124, 58, 237, 0.2))`,
                        color: '#c4b5fd',
                        border: '1px solid rgba(168, 85, 247, 0.3)'
                      }}>
                        ✨ {ab}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="灵宝偈语">
        <InfoCard>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                fontSize: '1.35rem',
                color: '#a855f7',
                fontStyle: 'italic',
                lineHeight: 2,
                letterSpacing: '0.05em'
              }}
            >
              混沌初分盘古先，太极两仪四象悬<br />
              子天丑地人寅出，避除兽患有巢贤<br />
              燧人取火免鲜食，伏羲画卦阴阳前<br />
              神农治世尝百草，轩辕礼乐婚姻联
            </motion.div>
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
