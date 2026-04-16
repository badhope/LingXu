'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function ShenshouPage() {
  const sacredBeasts = [
    {
      name: '青龙',
      tier: '四灵之首',
      element: '木',
      direction: '东方',
      constellation: '角亢氐房心尾箕',
      power: 100,
      feature: '主春生万物，苍龙之象',
      status: '祥瑞',
      appearance: '角似鹿、头似驼、眼似兔、项似蛇、腹似蜃、鳞似鱼、爪似鹰、掌似虎、耳似牛',
      color: '#22c55e',
      icon: '🐉'
    },
    {
      name: '白虎',
      tier: '四灵之一',
      element: '金',
      direction: '西方',
      constellation: '奎娄胃昴毕觜参',
      power: 98,
      feature: '主秋杀兵戈，白虎之形',
      status: '威猛',
      appearance: '白质黑章，虎啸生风，啸则风兴，威猛无俦',
      color: '#f8fafc',
      icon: '🐅'
    },
    {
      name: '朱雀',
      tier: '四灵之一',
      element: '火',
      direction: '南方',
      constellation: '井鬼柳星张翼轸',
      power: 97,
      feature: '主夏长文明，丹穴采羽',
      status: '祥瑞',
      appearance: '鸡头蛇颈燕颔龟背鱼尾，五色备举，浴火重生',
      color: '#ef4444',
      icon: '🦅'
    },
    {
      name: '玄武',
      tier: '四灵之一',
      element: '水',
      direction: '北方',
      constellation: '斗牛女虚危室壁',
      power: 96,
      feature: '主冬藏智虑，龟蛇合体',
      status: '长寿',
      appearance: '龟蛇合体，玄甲在身，千岁之灵，幽冥之主',
      color: '#3b82f6',
      icon: '🐢'
    },
    {
      name: '麒麟',
      tier: '瑞兽之王',
      element: '土',
      direction: '中央',
      constellation: '轩辕座',
      power: 99,
      feature: '圣王至德则见',
      status: '至瑞',
      appearance: '麇身牛尾马蹄，不刳胎不剖卵，不践生草，不群不侣',
      color: '#eab308',
      icon: '🦄'
    },
    {
      name: '凤凰',
      tier: '瑞鸟之王',
      element: '火',
      direction: '南方',
      constellation: '鹑火',
      power: 98,
      feature: '天下有道则见',
      status: '祥瑞',
      appearance: '非梧桐不栖，非竹实不食，非醴泉不饮。出于东方君子之国',
      color: '#fb923c',
      icon: '🐦‍🔥'
    },
    {
      name: '应龙',
      tier: '神龙',
      element: '土',
      direction: '中央',
      constellation: '黄龙',
      power: 99,
      feature: '有翼黄龙，主雨',
      status: '天雨',
      appearance: '背生双翼，鳞甲坚不可摧。蚩尤之战，应龙蓄水杀蚩尤',
      color: '#ca8a04',
      icon: '🐲'
    },
    {
      name: '毕方',
      tier: '异鸟',
      element: '火',
      direction: '南方',
      constellation: '毕宿',
      power: 85,
      feature: '一足一翼，见则火起',
      status: '灾异',
      appearance: '其状如鹤，一足，赤文青质而白喙，见则其邑有火',
      color: '#f97316',
      icon: '🕊️'
    },
    {
      name: '开明兽',
      tier: '昆仑守护神',
      element: '土',
      direction: '昆仑',
      constellation: '天门',
      power: 95,
      feature: '身大类虎而九首',
      status: '守护',
      appearance: '昆仑山门守护神，身大类虎，九首皆人面，东向立昆仑上',
      color: '#a855f7',
      icon: '🦁'
    },
    {
      name: '陆吾',
      tier: '昆仑山神',
      element: '土',
      direction: '昆仑',
      constellation: '帝宫',
      power: 94,
      feature: '虎身九尾，人面虎爪',
      status: '神职',
      appearance: '是司天之九部及帝之囿时。虎身而九尾，人面而虎爪',
      color: '#78716c',
      icon: '🐯'
    },
    {
      name: '白泽',
      tier: '神兽',
      element: '水',
      direction: '东海',
      constellation: '文昌',
      power: 97,
      feature: '知万物情，通鬼神语',
      status: '智慧',
      appearance: '东望山有兽，名曰白泽，能言语。黄帝巡狩，得白泽图',
      color: '#f0f9ff',
      icon: '🐑'
    },
    {
      name: '梼杌',
      tier: '四凶',
      element: '金',
      direction: '西方',
      constellation: '奎宿',
      power: 90,
      feature: '傲狠难训，不可教训',
      status: '凶煞',
      appearance: '其状如虎而犬毛，人面虎足，口牙，尾长丈八尺',
      color: '#57534e',
      icon: '🐺'
    }
  ]

  const getTierColor = (tier: string) => {
    if (tier.includes('四灵')) return { bg: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#22c55e', label: '🌟 至尊' }
    if (tier.includes('瑞')) return { bg: 'linear-gradient(135deg, #eab308, #ca8a04)', color: '#eab308', label: '✨ 祥瑞' }
    if (tier.includes('神')) return { bg: 'linear-gradient(135deg, #a855f7, #7c3aed)', color: '#a855f7', label: '🔮 神圣' }
    if (tier.includes('凶')) return { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#ef4444', label: '💀 凶煞' }
    return { bg: 'linear-gradient(135deg, #6b7280, #4b5563)', color: '#6b7280', label: '⚡ 异兽' }
  }

  return (
    <SubPageTemplate
      title="山海经神兽"
      subtitle="昆仑仙境 · 山海经异兽 · 祥瑞灵兽 · 洪荒精怪"
      icon="🦄"
      colorRgb="236, 72, 153"
    >
      <SubPageSection title="灵兽总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: '四灵圣兽', count: '4', color: '#22c55e', icon: '🐉', desc: '天地四方守护' },
              { label: '祥瑞神兽', count: '3', color: '#eab308', icon: '🦄', desc: '圣王出世则现' },
              { label: '昆仑神官', count: '3', color: '#a855f7', icon: '🦁', desc: '神山镇守使' },
              { label: '异兽凶煞', count: '2', color: '#ef4444', icon: '💀', desc: '灾异祸乱之兆' }
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

      <SubPageSection title="神兽图鉴">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem'
        }}>
          {sacredBeasts.map((beast, index) => (
            <motion.div
              key={beast.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5, scale: 1.02 }}
              style={{
                border: `2px solid ${beast.color}50`,
                borderTop: `3px solid ${beast.color}`
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
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.15 }}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${beast.color}, ${beast.color}66)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem'
                    }}
                  >
                    {beast.icon}
                  </motion.div>
                  <div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: beast.color
                    }}>
                      {beast.name}
                    </h3>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.1rem 0.5rem',
                      borderRadius: '12px',
                      background: getTierColor(beast.tier).color + '25',
                      color: getTierColor(beast.tier).color
                    }}>
                      {getTierColor(beast.tier).label}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: beast.power >= 95 ? '#ef4444' : beast.power >= 90 ? '#f97316' : '#eab308'
                  }}>
                    {beast.power}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                    灵力值
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                marginBottom: '1rem',
                fontSize: '0.8rem'
              }}>
                <div>
                  <span style={{ color: 'rgba(170, 136, 255, 0.6)' }}>🧭 方位：</span>
                  <span style={{ color: beast.color }}>{beast.direction}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(170, 136, 255, 0.6)' }}>⚡ 五行：</span>
                  <span style={{ color: beast.color }}>{beast.element}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(170, 136, 255, 0.6)' }}>⭐ 星位：</span>
                  <span style={{ color: 'rgba(180, 180, 190, 0.8)' }}>{beast.constellation.slice(0, 4)}..</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(170, 136, 255, 0.6)' }}>📊 状态：</span>
                  <span style={{ color: beast.status === '祥瑞' ? '#22c55e' : beast.status === '凶煞' ? '#ef4444' : '#3b82f6' }}>{beast.status}</span>
                </div>
              </div>

              <div style={{
                height: '6px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '1rem'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${beast.power}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.05 }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${beast.color}, ${beast.color}88)`,
                    borderRadius: '3px'
                  }}
                />
              </div>

              <p style={{
                fontSize: '0.8rem',
                color: 'rgba(180, 180, 190, 0.7)',
                lineHeight: '1.6',
                fontStyle: 'italic'
              }}>
                "{beast.appearance}"
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="四灵方位图">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 200px 1fr',
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
                  boxShadow: ['0 0 20px rgba(34, 197, 94, 0)', '0 0 40px rgba(34, 197, 94, 0.5)', '0 0 20px rgba(34, 197, 94, 0)']
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  margin: '0 auto 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem'
                }}
              >
                🐉
              </motion.div>
              <h3 style={{ color: '#22c55e', fontSize: '1.25rem' }}>青龙</h3>
              <p style={{ color: 'rgba(34, 197, 94, 0.7)', fontSize: '0.85rem' }}>东方甲乙木 · 主春生</p>
            </motion.div>

            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: ['0 0 20px rgba(248, 250, 252, 0)', '0 0 30px rgba(248, 250, 252, 0.3)', '0 0 20px rgba(248, 250, 252, 0)']
                  }}
                  transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f8fafc, #cbd5e1)',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}
                >
                  🐅
                </motion.div>
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: ['0 0 20px rgba(239, 68, 68, 0)', '0 0 30px rgba(239, 68, 68, 0.5)', '0 0 20px rgba(239, 68, 68, 0)']
                  }}
                  transition={{ duration: 3, delay: 1, repeat: Infinity }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}
                >
                  🦅
                </motion.div>
              </div>
              <motion.div
                animate={{
                  rotate: [0, 360]
                }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: '2px solid rgba(184, 148, 56, 0.3)',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, #22c55e, #ef4444, #3b82f6, #f8fafc, #22c55e)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '2rem' }}>☯️</span>
                </div>
              </motion.div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                <h4 style={{ color: '#f8fafc', fontSize: '0.9rem' }}>白虎<br /><span style={{ color: 'rgba(248, 250, 252, 0.6)', fontSize: '0.75rem' }}>西方庚辛金</span></h4>
                <h4 style={{ color: '#ef4444', fontSize: '0.9rem' }}>朱雀<br /><span style={{ color: 'rgba(239, 68, 68, 0.6)', fontSize: '0.75rem' }}>南方丙丁火</span></h4>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: ['0 0 20px rgba(59, 130, 246, 0)', '0 0 40px rgba(59, 130, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0)']
                }}
                transition={{ duration: 4, delay: 1.5, repeat: Infinity }}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  margin: '0 auto 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem'
                }}
              >
                🐢
              </motion.div>
              <h3 style={{ color: '#3b82f6', fontSize: '1.25rem' }}>玄武</h3>
              <p style={{ color: 'rgba(59, 130, 246, 0.7)', fontSize: '0.85rem' }}>北方壬癸水 · 主冬藏</p>
            </motion.div>
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
