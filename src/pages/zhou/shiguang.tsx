'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function ShiguangPage() {
  const timeline = [
    {
      epoch: '混沌',
      period: '0',
      name: '开天辟地',
      event: '盘古开天',
      significance: '混沌初开，阴阳判分，清升浊降，天地始成',
      impact: 100,
      keyFigures: ['盘古'],
      color: '#6b7280'
    },
    {
      epoch: '太古',
      period: '一元会',
      name: '龙汉初劫',
      event: '三族争霸',
      significance: '龙凤麒麟三族鼎盛，随后同归于尽，洪荒生灵涂炭',
      impact: 95,
      keyFigures: ['祖龙', '元凤', '始麒麟'],
      color: '#ef4444'
    },
    {
      epoch: '太古',
      period: '二元会',
      name: '道祖讲道',
      event: '紫霄宫三次讲道',
      significance: '鸿钧讲道于紫霄宫，赐鸿蒙紫气，定下圣位，洪荒进入圣人时代',
      impact: 100,
      keyFigures: ['鸿钧老祖', '三清', '女娲', '接引', '准提'],
      color: '#a855f7'
    },
    {
      epoch: '上古',
      period: '三元会',
      name: '巫妖大战',
      event: '巫妖决战',
      significance: '十二祖巫与妖族天帝决战，不周山倒塌，天河倒灌，洪荒破碎',
      impact: 98,
      keyFigures: ['帝俊', '太一', '十二祖巫'],
      color: '#f97316'
    },
    {
      epoch: '上古',
      period: '四元会',
      name: '女娲补天',
      event: '炼石补天',
      significance: '女娲炼五色石补天，斩神鳖足以立四极，拯救洪荒众生',
      impact: 95,
      keyFigures: ['女娲'],
      color: '#ec4899'
    },
    {
      epoch: '上古',
      period: '五元会',
      name: '封神之战',
      event: '周革殷命',
      significance: '三教共立封神榜，商周大战，诸神归位，天庭确立',
      impact: 90,
      keyFigures: ['太上老君', '元始天尊', '通天教主'],
      color: '#3b82f6'
    },
    {
      epoch: '中古',
      period: '七元会',
      name: '西游之路',
      event: '西天取经',
      significance: '佛教东传，玄奘法师西天取经，九九八十一难，功行圆满',
      impact: 85,
      keyFigures: ['唐僧', '孙悟空', '如来佛祖'],
      color: '#eab308'
    },
    {
      epoch: '近古',
      period: '九元会',
      name: '末法时代',
      event: '灵气枯竭',
      significance: '天地灵气日益稀薄，仙人绝迹，修士隐遁，科技兴起',
      impact: 75,
      keyFigures: ['诸天仙佛'],
      color: '#64748b'
    }
  ]

  const getImpactColor = (impact: number) => {
    if (impact >= 95) return '#ef4444'
    if (impact >= 85) return '#f97316'
    if (impact >= 75) return '#eab308'
    return '#22c55e'
  }

  return (
    <SubPageTemplate
      title="时光长河"
      subtitle="太古洪荒 · 上古封神 · 中古西游 · 亿万年时光悠悠"
      icon="⏳"
      colorRgb="236, 72, 153"
    >
      <SubPageSection title="时间之河">
        <InfoCard>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            {[
              { label: '混沌', count: '1劫', color: '#6b7280' },
              { label: '太古', count: '3劫', color: '#ef4444' },
              { label: '上古', count: '3劫', color: '#f97316' },
              { label: '中古', count: '1劫', color: '#eab308' },
              { label: '近古', count: '1劫', color: '#64748b' }
            ].map((era, i) => (
              <motion.div
                key={era.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: `conic-gradient(from 45deg, ${era.color}, ${era.color}88, ${era.color}44, transparent)`,
                    margin: '0 auto 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>⏳</span>
                </motion.div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: era.color }}>{era.count}</div>
                <div style={{ color: '#b89438', fontSize: '0.9rem' }}>{era.label}时代</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="历史时间轴">
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 0,
            bottom: 0,
            width: '4px',
            background: 'linear-gradient(180deg, #6b7280 0%, #ef4444 25%, #f97316 50%, #eab308 75%, #64748b 100%)',
            borderRadius: '2px'
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {timeline.map((node, index) => (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                style={{
                  display: 'flex',
                  justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                  position: 'relative'
                }}
              >
                <motion.div
                  animate={{
                    boxShadow: ['none', `0 0 20px ${node.color}`, 'none']
                  }}
                  transition={{ duration: 3, delay: index * 0.3, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '20px',
                    transform: 'translateX(-50%)',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: node.color,
                    border: '4px solid rgba(17, 24, 39, 1)',
                    zIndex: 10
                  }}
                />

                <div style={{
                  width: '45%',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  background: 'rgba(17, 24, 39, 0.7)',
                  border: `2px solid ${node.color}50`,
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '18px',
                    [index % 2 === 0 ? 'right' : 'left']: '-10px',
                    width: 0,
                    height: 0,
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    [index % 2 === 0 ? 'borderLeft' : 'borderRight']: `10px solid ${node.color}50`
                  }} />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '12px',
                        background: `${node.color}30`,
                        color: node.color
                      }}>
                        {node.epoch} · {node.period}
                      </span>
                      <h3 style={{
                        fontSize: '1.35rem',
                        fontWeight: 'bold',
                        color: node.color,
                        marginTop: '0.5rem'
                      }}>
                        {node.name}
                      </h3>
                      <p style={{
                        fontSize: '0.85rem',
                        color: 'rgba(236, 72, 153, 0.9)',
                        marginTop: '0.25rem'
                      }}>
                        📅 {node.event}
                      </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                        历史影响
                      </div>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: getImpactColor(node.impact)
                      }}>
                        {node.impact}%
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
                    "{node.significance}"
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                      👤 关键人物：
                    </span>
                    {node.keyFigures.map((f, i) => (
                      <span key={i} style={{
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '12px',
                        background: `${node.color}20`,
                        color: node.color
                      }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
