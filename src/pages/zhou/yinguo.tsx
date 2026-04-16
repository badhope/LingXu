'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function YinguoPage() {
  const karmas = [
    {
      type: '善',
      level: '大善',
      deed: '舍身救万人',
      karmaReward: 10000,
      retribution: '七世福报，位列仙班',
      example: '佛祖割肉喂鹰',
      effect: ['飞升', '金身', '万民敬仰'],
      color: '#22c55e'
    },
    {
      type: '善',
      level: '中善',
      deed: '修桥铺路，赈济灾民',
      karmaReward: 1000,
      retribution: '三世富贵，子孙贤孝',
      example: '范仲淹义田',
      effect: ['富贵', '长寿', '康宁'],
      color: '#84cc16'
    },
    {
      type: '善',
      level: '小善',
      deed: '日行一善，与人为善',
      karmaReward: 10,
      retribution: '一世平安，逢凶化吉',
      example: '路人指路',
      effect: ['平安', '顺遂', '遇贵人'],
      color: '#a3e635'
    },
    {
      type: '恶',
      level: '大恶',
      deed: '杀人盈野，卖国求荣',
      karmaReward: -10000,
      retribution: '永坠地狱，万世不得超生',
      example: '秦桧害岳飞',
      effect: ['地狱', '极刑', '遗臭万年'],
      color: '#ef4444'
    },
    {
      type: '恶',
      level: '中恶',
      deed: '谋财害命，伤天害理',
      karmaReward: -1000,
      retribution: '三世贫病，家破人亡',
      example: '西门庆与潘金莲',
      effect: ['横死', '绝后', '恶疾缠身'],
      color: '#f97316'
    },
    {
      type: '恶',
      level: '小恶',
      deed: '损人利己，口角是非',
      karmaReward: -10,
      retribution: '一世坎坷，多灾多难',
      example: '背后谗言',
      effect: ['小人', '口舌', '破财'],
      color: '#ea580c'
    }
  ]

  const balance = [
    { name: '窦娥', good: 95, bad: 5, net: 90, result: '沉冤昭雪，后世封神', verdict: '善有善报' },
    { name: '岳飞', good: 100, bad: 0, net: 100, result: '精忠报国，万世流芳', verdict: '流芳百世' },
    { name: '秦桧', good: 5, bad: 95, net: -90, result: '遗臭万年，跪像千年', verdict: '恶有恶报' },
    { name: '关羽', good: 98, bad: 2, net: 96, result: '武圣封神，三界伏魔', verdict: '万世尊奉' },
    { name: '曹操', good: 60, bad: 70, net: -10, result: '虽成霸业，骂名千载', verdict: '功过难评' },
    { name: '宋江', good: 70, bad: 50, net: 20, result: '虚名忠义，一杯毒酒', verdict: '善恶参半' }
  ]

  return (
    <SubPageTemplate
      title="因果报应"
      subtitle="善有善报 · 恶有恶报 · 不是不报 · 时候未到"
      icon="⚖️"
      colorRgb="236, 72, 153"
    >
      <SubPageSection title="业力天平">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 100px 1fr',
            gap: '1rem',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: ['0 0 20px rgba(34, 197, 94, 0.3)', '0 0 40px rgba(34, 197, 94, 0.6)', '0 0 20px rgba(34, 197, 94, 0.3)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  margin: '0 auto 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <span style={{ fontSize: '2rem' }}>☯️</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>善</span>
              </motion.div>
              <h3 style={{ color: '#22c55e', fontSize: '1.5rem' }}>阳</h3>
              <p style={{ color: 'rgba(34, 197, 94, 0.8)', fontSize: '0.85rem' }}>
                积善之家，必有余庆
              </p>
            </motion.div>

            <motion.div
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ fontSize: '3rem' }}
            >
              ⚖️
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: ['0 0 20px rgba(239, 68, 68, 0.3)', '0 0 40px rgba(239, 68, 68, 0.6)', '0 0 20px rgba(239, 68, 68, 0.3)']
                }}
                transition={{ duration: 3, delay: 1.5, repeat: Infinity }}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  margin: '0 auto 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <span style={{ fontSize: '2rem' }}>💀</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>恶</span>
              </motion.div>
              <h3 style={{ color: '#ef4444', fontSize: '1.5rem' }}>阴</h3>
              <p style={{ color: 'rgba(239, 68, 68, 0.8)', fontSize: '0.85rem' }}>
                积不善之家，必有余殃
              </p>
            </motion.div>
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="业力清算表">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem'
        }}>
          {karmas.map((item, index) => (
            <motion.div
              key={item.deed}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              style={{
                border: `2px solid ${item.color}50`,
                borderLeft: `4px solid ${item.color}`
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div>
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    background: `${item.color}25`,
                    color: item.color,
                    fontWeight: 'bold'
                  }}>
                    {item.type === '善' ? '🌟' : '💀'} {item.level}
                  </span>
                  <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: 'bold',
                    color: item.color,
                    marginTop: '0.5rem'
                  }}>
                    {item.deed}
                  </h3>
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: item.color
                }}>
                  {item.karmaReward > 0 ? '+' : ''}{item.karmaReward}
                  <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)', fontWeight: 'normal' }}>
                    业力值
                  </div>
                </div>
              </div>

              <div style={{
                padding: '0.75rem',
                borderRadius: '8px',
                background: `${item.color}10`,
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '0.75rem', color: item.color }}>
                  ⚖️ 报应：
                </span>
                <span style={{ fontSize: '0.85rem', color: `${item.color}`, marginLeft: '0.25rem' }}>
                  {item.retribution}
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)', marginBottom: '0.75rem' }}>
                📜 历史案例：{item.example}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {item.effect.map((e, i) => (
                  <span key={i} style={{
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '12px',
                    background: `${item.color}15`,
                    color: item.color
                  }}>
                    {e}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="善恶功过榜">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {balance.map((person, index) => (
            <motion.div
              key={person.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: person.net >= 50 ? '#22c55e' : person.net >= 0 ? '#eab308' : '#ef4444'
                }}>
                  {person.name}
                </h3>
                <span style={{
                  fontSize: '0.8rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  background: person.net >= 50 ? 'rgba(34, 197, 94, 0.2)' : person.net >= 0 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: person.net >= 50 ? '#22c55e' : person.net >= 0 ? '#eab308' : '#ef4444',
                  fontWeight: 'bold'
                }}>
                  {person.verdict}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 80px',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <div style={{ textAlign: 'right', color: '#22c55e', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  善 {person.good}%
                </div>
                <div style={{
                  height: '12px',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${person.good}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      background: 'linear-gradient(90deg, #22c55e, #84cc16)'
                    }}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${person.bad}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      height: '100%',
                      background: 'linear-gradient(90deg, #ea580c, #ef4444)'
                    }}
                  />
                </div>
                <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  {person.bad}% 恶
                </div>
              </div>

              <p style={{
                color: 'rgba(236, 72, 153, 0.9)',
                fontSize: '0.85rem',
                fontStyle: 'italic'
              }}>
                🏆 最终结局：{person.result}
                <span style={{
                  marginLeft: '1rem',
                  color: person.net >= 0 ? '#22c55e' : '#ef4444',
                  fontWeight: 'bold'
                }}>
                  净业力：{person.net > 0 ? '+' : ''}{person.net}
                </span>
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
