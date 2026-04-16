'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function WeiduPage() {
  const dimensions = [
    {
      level: 0,
      name: '零维空间',
      alias: '奇点',
      feature: '无长宽高，无限小的点',
      physics: '时空在此收敛，一切法则失效',
      beings: '无生命体存在',
      access: '理论不可达',
      color: '#6b7280',
      icon: '⚫'
    },
    {
      level: 1,
      name: '一维空间',
      alias: '直线世界',
      feature: '只有长度，没有宽度',
      physics: '物体只能前后移动',
      beings: '线段生命，无法感知侧向',
      access: '意识投影可达',
      color: '#22c55e',
      icon: '➖'
    },
    {
      level: 2,
      name: '二维空间',
      alias: '平面世界',
      feature: '只有长宽，没有高度',
      physics: '平面几何，第三个方向不存在',
      beings: '纸片人，眼中一切都是线段',
      access: '意识投影可达',
      color: '#3b82f6',
      icon: '🔲'
    },
    {
      level: 3,
      name: '三维空间',
      alias: '物质世界',
      feature: '长宽高，人类生存的维度',
      physics: '经典物理，牛顿三定律',
      beings: '碳基生命，诸多种族',
      access: '此界就是故乡',
      color: '#a855f7',
      icon: '🎲'
    },
    {
      level: 4,
      name: '四维空间',
      alias: '时间维度',
      feature: '三维+时间轴，一览过去未来',
      physics: '时空一体，相对时空观',
      beings: '时间观察者，跳出时间流',
      access: '大帝级可触及',
      color: '#ef4444',
      icon: '⏳'
    },
    {
      level: 5,
      name: '五维空间',
      alias: '概率维度',
      feature: '所有时间线分支同时存在',
      physics: '因果分叉，无限可能性',
      beings: '命运编织者，选择观测者',
      access: '仙尊级可进入',
      color: '#f97316',
      icon: '🔀'
    },
    {
      level: 6,
      name: '六维空间',
      alias: '维度折叠',
      feature: '所有时间线可以折叠跳转',
      physics: '任意穿越平行宇宙',
      beings: '维度穿梭者，平行干涉者',
      access: '准仙王级可达到',
      color: '#eab308',
      icon: '🔄'
    },
    {
      level: 7,
      name: '七维空间',
      alias: '宇宙起点',
      feature: '包含所有宇宙所有可能性',
      physics: '一即一切，一切即一',
      beings: '宇宙级存在，造物主',
      access: '仙王级可达到',
      color: '#06b6d4',
      icon: '🌌'
    },
    {
      level: 8,
      name: '八维空间',
      alias: '多元宇宙',
      feature: '包含无限个七维宇宙',
      physics: '道则演化，有无相生',
      beings: '多元宇宙管理者',
      access: '不朽仙帝',
      color: '#14b8a6',
      icon: '♾️'
    },
    {
      level: 9,
      name: '九维空间',
      alias: '法则维度',
      feature: '一切法则的本源维度',
      physics: '万道之源，法则生灭',
      beings: '道则化身，法则灵智',
      access: '祭道之上',
      color: '#f43f5e',
      icon: '✨'
    },
    {
      level: 10,
      name: '十维空间',
      alias: '混沌维度',
      feature: '包含无限可能，一切即一',
      physics: '无法则，无概念，无意义',
      beings: '不可说，不可思，不可议',
      access: '不可企及',
      color: '#ec4899',
      icon: '☯️'
    }
  ]

  const getDimensionStyle = (level: number) => {
    if (level >= 9) return {
      border: '2px solid #ec4899',
      glow: '0 0 30px rgba(236, 72, 153, 0.5)',
      special: true
    }
    if (level >= 7) return {
      border: '2px solid #14b8a6',
      glow: '0 0 20px rgba(20, 184, 166, 0.4)',
      special: true
    }
    if (level >= 5) return {
      border: '2px solid #f97316',
      glow: '0 0 15px rgba(249, 115, 22, 0.3)',
      special: false
    }
    return {
      border: '1px solid rgba(184, 148, 56, 0.3)',
      glow: 'none',
      special: false
    }
  }

  return (
    <SubPageTemplate
      title="维度空间"
      subtitle="一维生死 · 二维幻灭 · 三维尘缘 · 四维时间 · 无限维度"
      icon="🔲"
      colorRgb="170, 136, 255"
    >
      <SubPageSection title="维度天梯">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(11, 1fr)',
            gap: '0.5rem',
            textAlign: 'center'
          }}>
            {dimensions.map((dim, i) => (
              <motion.div
                key={dim.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <motion.div
                  animate={dim.level >= 7 ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 2, -2, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: '8px',
                    background: `linear-gradient(135deg, ${dim.color}, ${dim.color}88)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    marginBottom: '0.5rem',
                    fontSize: '1.5rem',
                    boxShadow: getDimensionStyle(dim.level).glow
                  }}
                >
                  <span>{dim.icon}</span>
                  <span style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>{dim.level}D</span>
                </motion.div>
                <div style={{
                  fontSize: '0.7rem',
                  color: dim.color,
                  fontWeight: 'bold'
                }}>
                  {dim.name.replace('空间', '')}
                </div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="维度详解">
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '45px',
            top: 0,
            bottom: 0,
            width: '3px',
            background: 'linear-gradient(180deg, #6b7280 0%, #22c55e 20%, #a855f7 40%, #ef4444 60%, #14b8a6 80%, #ec4899 100%)',
            borderRadius: '2px'
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {dimensions.map((dim, index) => (
              <motion.div
                key={dim.level}
                className="xian-submodule-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                style={{
                  position: 'relative',
                  marginLeft: '70px',
                  ...getDimensionStyle(dim.level)
                }}
              >
                <motion.div
                  animate={getDimensionStyle(dim.level).special ? {
                    boxShadow: ['none', getDimensionStyle(dim.level).glow, 'none']
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    left: '-95px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${dim.color}, ${dim.color}88)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: 'white',
                    zIndex: 10
                  }}
                >
                  {dim.icon}
                </motion.div>

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
                      background: `${dim.color}25`,
                      color: dim.color,
                      fontWeight: 'bold'
                    }}>
                      {dim.level}维
                    </span>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: dim.color,
                      marginTop: '0.5rem'
                    }}>
                      {dim.name}
                      <span style={{
                        fontSize: '0.9rem',
                        color: 'rgba(180, 180, 190, 0.6)',
                        marginLeft: '0.5rem',
                        fontWeight: 'normal'
                      }}>
                        「{dim.alias}」
                      </span>
                    </h3>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    background: dim.color + '25',
                    color: dim.color
                  }}>
                    🔓 {dim.access}
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(170, 136, 255, 0.7)' }}>
                      🌐 维度特征：
                    </span>
                    <p style={{
                      color: 'rgba(170, 136, 255, 1)',
                      fontSize: '0.8rem',
                      marginTop: '0.25rem'
                    }}>
                      {dim.feature}
                    </p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(170, 136, 255, 0.7)' }}>
                      ⚛️ 物理法则：
                    </span>
                    <p style={{
                      color: 'rgba(180, 180, 190, 0.8)',
                      fontSize: '0.8rem',
                      marginTop: '0.25rem'
                    }}>
                      {dim.physics}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(170, 136, 255, 0.7)' }}>
                      👤 维度生命：
                    </span>
                    <p style={{
                      color: 'rgba(34, 197, 94, 0.9)',
                      fontSize: '0.8rem',
                      marginTop: '0.25rem'
                    }}>
                      {dim.beings}
                    </p>
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
