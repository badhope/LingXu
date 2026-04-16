'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function ChuanshuoPage() {
  const ancientGods = [
    {
      name: '盘古氏',
      era: '混沌时期',
      title: '开天辟地',
      feat: '垂死化身，气成风云，声为雷霆，左眼为日，右眼为月',
      achievement: 100,
      status: '创世神',
      legacy: '天地开辟，阴阳分判',
      artifacts: ['盘古斧', '开天幡'],
      color: '#6b7280',
      icon: '🪓'
    },
    {
      name: '女娲氏',
      era: '洪荒初始',
      title: '大地之母',
      feat: '抟土造人，炼五色石以补苍天，断鳌足以立四极',
      achievement: 99,
      status: '创世神',
      legacy: '人类始祖，万物之母',
      artifacts: ['女娲石', '招妖幡'],
      color: '#ec4899',
      icon: '🌺'
    },
    {
      name: '伏羲氏',
      era: '上古三皇',
      title: '人文始祖',
      feat: '仰观象于天，俯观法于地，始画八卦，造书契',
      achievement: 98,
      status: '人皇',
      legacy: '八卦传承，文明开端',
      artifacts: ['河图', '洛书'],
      color: '#3b82f6',
      icon: '☯️'
    },
    {
      name: '神农氏',
      era: '上古三皇',
      title: '百草先师',
      feat: '尝百草之滋味，一日而遇七十毒，始教民播种五谷',
      achievement: 97,
      status: '人皇',
      legacy: '中医药祖，农业开端',
      artifacts: ['赭鞭', '神农鼎'],
      color: '#22c55e',
      icon: '🌿'
    },
    {
      name: '轩辕氏',
      era: '上古五帝',
      title: '黄帝',
      feat: '与蚩尤战于涿鹿之野，遂禽杀蚩尤，迎日推策',
      achievement: 96,
      status: '五帝之首',
      legacy: '华夏始祖，一统中原',
      artifacts: ['轩辕剑', '指南车'],
      color: '#ca8a04',
      icon: '👑'
    },
    {
      name: '共工氏',
      era: '上古争霸',
      title: '水神',
      feat: '与颛顼争为帝，怒而触不周之山，天柱折，地维绝',
      achievement: 85,
      status: '叛乱神',
      legacy: '天倾西北，地陷东南',
      artifacts: ['水神珠'],
      color: '#0ea5e9',
      icon: '🌊'
    },
    {
      name: '祝融氏',
      era: '上古争霸',
      title: '火神',
      feat: '以火施化，号赤帝，后世尊为火神，与共工大战',
      achievement: 88,
      status: '正神',
      legacy: '火德星君，光明之神',
      artifacts: ['离火珠'],
      color: '#ef4444',
      icon: '🔥'
    },
    {
      name: '仓颉氏',
      era: '黄帝时期',
      title: '造字圣人',
      feat: '仰观奎星环曲走势，俯察龟文鸟羽山川，始创文字',
      achievement: 95,
      status: '字圣',
      legacy: '天雨粟，鬼夜哭，文字出世',
      artifacts: ['仓颉书'],
      color: '#a855f7',
      icon: '📝'
    },
    {
      name: '蚩尤氏',
      era: '上古争霸',
      title: '兵主',
      feat: '兄弟八十一人，并兽身人语，铜头铁额，食沙石子',
      achievement: 90,
      status: '魔神',
      legacy: '战神祭祀，兵主之祭',
      artifacts: ['蚩尤旗', '五兵'],
      color: '#7f1d1d',
      icon: '⚔️'
    },
    {
      name: '颛顼氏',
      era: '上古五帝',
      title: '玄帝',
      feat: '绝地天通，令神民异业，重整天地秩序',
      achievement: 94,
      status: '五帝之二',
      legacy: '人神分离，各归其位',
      artifacts: ['玄天剑'],
      color: '#1e3a8a',
      icon: '🌌'
    }
  ]

  const majorEvents = [
    {
      name: '开天辟地',
      period: '混沌之初',
      duration: '万八千岁',
      significance: '混沌初开，阴阳判分，清升浊降，天地始成',
      impact: 100,
      result: '盘古垂死化身，万物始生',
      color: '#6b7280'
    },
    {
      name: '女娲造人',
      period: '洪荒初始',
      duration: '数百年',
      significance: '抟黄土作人，剧务力不暇供，乃引绳于泥中',
      impact: 100,
      result: '人类诞生，三才确立',
      color: '#ec4899'
    },
    {
      name: '女娲补天',
      period: '洪荒之劫',
      duration: '七七四十九日',
      significance: '四极废，九州裂，天不兼覆，地不周载',
      impact: 99,
      result: '苍天补，四极正，淫水涸，冀州平',
      color: '#f97316'
    },
    {
      name: '共工触山',
      period: '上古神战',
      duration: '一日',
      significance: '与颛顼争为帝，不胜，怒而触不周之山',
      impact: 95,
      result: '天柱折，地维绝，天倾西北，地陷东南',
      color: '#0ea5e9'
    },
    {
      name: '涿鹿之战',
      period: '炎黄时期',
      duration: '三年',
      significance: '黄帝征师诸侯，与蚩尤战于涿鹿之野',
      impact: 90,
      result: '蚩尤被诛，华夏一统，人文开启',
      color: '#ca8a04'
    },
    {
      name: '绝地天通',
      period: '颛顼时期',
      duration: '数载',
      significance: '乃命重黎，绝地天通，罔有降格',
      impact: 85,
      result: '人神分离，民神不杂，天地有序',
      color: '#a855f7'
    }
  ]

  const getGodTierColor = (status: string) => {
    if (status.includes('创世')) return { bg: 'linear-gradient(135deg, #6b7280, #1f2937)', color: '#9ca3af', label: '🌟 创世' }
    if (status.includes('皇') || status.includes('帝')) return { bg: 'linear-gradient(135deg, #ca8a04, #a16207)', color: '#ca8a04', label: '👑 人皇' }
    if (status.includes('魔')) return { bg: 'linear-gradient(135deg, #7f1d1d, #450a0a)', color: '#ef4444', label: '💀 魔神' }
    return { bg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#3b82f6', label: '✨ 神祇' }
  }

  return (
    <SubPageTemplate
      title="上古传说"
      subtitle="盘古开天 · 女娲造人 · 三皇五帝 · 神话源头"
      icon="📖"
      colorRgb="251, 146, 60"
    >
      <SubPageSection title="神话时代总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: '创世之神', count: '2', color: '#6b7280', icon: '🌌', desc: '开天辟地造化' },
              { label: '三皇治世', count: '3', color: '#ca8a04', icon: '👑', desc: '人文初祖传承' },
              { label: '五帝定伦', count: '5', color: '#3b82f6', icon: '⚖️', desc: '天地秩序确立' },
              { label: '太古大战', count: '3', color: '#ef4444', icon: '⚔️', desc: '乾坤重塑劫难' }
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
                  transition={{ duration: 4, repeat: Infinity }}
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

      <SubPageSection title="诸神世系">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem'
        }}>
          {ancientGods.map((god, index) => (
            <motion.div
              key={god.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5, scale: 1.02 }}
              style={{
                border: `2px solid ${god.color}50`,
                borderLeft: `4px solid ${god.color}`
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
                    transition={{ duration: 5, repeat: Infinity, delay: index * 0.2 }}
                    style={{
                      width: '55px',
                      height: '55px',
                      borderRadius: '8px',
                      background: `linear-gradient(135deg, ${god.color}, ${god.color}66)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem'
                    }}
                  >
                    {god.icon}
                  </motion.div>
                  <div>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      color: god.color
                    }}>
                      {god.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        color: 'rgba(180, 180, 190, 0.6)'
                      }}>
                        {god.era}
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '0.1rem 0.5rem',
                        borderRadius: '12px',
                        background: getGodTierColor(god.status).color + '25',
                        color: getGodTierColor(god.status).color
                      }}>
                        {getGodTierColor(god.status).label}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: god.achievement >= 95 ? '#ca8a04' : god.achievement >= 90 ? '#f97316' : '#eab308'
                  }}>
                    {god.achievement}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                    功绩值
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: 'rgba(251, 146, 60, 0.7)', fontSize: '0.8rem' }}>
                  🏆 {god.title}：
                </span>
                <span style={{ color: 'rgba(180, 180, 190, 0.9)', fontSize: '0.85rem' }}>
                  {god.feat}
                </span>
              </div>

              <div style={{
                height: '6px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '0.75rem'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${god.achievement}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.05 }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${god.color}, ${god.color}88)`,
                    borderRadius: '3px'
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {god.artifacts.map((art, i) => (
                    <span key={i} style={{
                      fontSize: '0.7rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '12px',
                      background: `${god.color}15`,
                      color: god.color
                    }}>
                      ✨ {art}
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                  📜 {god.legacy}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="洪荒大事记">
        <InfoCard>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, #fb923c, #f97316, #ea580c, #c2410c)',
              transform: 'translateX(-50%)',
              opacity: 0.5
            }} />

            {majorEvents.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 40px 1fr',
                  gap: '1rem',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                {index % 2 === 0 ? (
                  <>
                    <div className="xian-submodule-card" style={{ textAlign: 'right' }}>
                      <h3 style={{ color: event.color, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                        {event.name}
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)', marginBottom: '0.5rem' }}>
                        {event.significance}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', fontSize: '0.75rem' }}>
                        <span style={{ color: 'rgba(251, 146, 60, 0.6)' }}>⏳ {event.period}</span>
                        <span style={{ color: event.impact >= 95 ? '#ef4444' : '#f97316' }}>💥 影响度 {event.impact}%</span>
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [`0 0 10px ${event.color}`, `0 0 25px ${event.color}`, `0 0 10px ${event.color}`]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: event.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        zIndex: 10
                      }}
                    >
                      {index + 1}
                    </motion.div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [`0 0 10px ${event.color}`, `0 0 25px ${event.color}`, `0 0 10px ${event.color}`]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: event.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        zIndex: 10
                      }}
                    >
                      {index + 1}
                    </motion.div>
                    <div className="xian-submodule-card">
                      <h3 style={{ color: event.color, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                        {event.name}
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)', marginBottom: '0.5rem' }}>
                        {event.significance}
                      </p>
                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem' }}>
                        <span style={{ color: 'rgba(251, 146, 60, 0.6)' }}>⏳ {event.period}</span>
                        <span style={{ color: event.impact >= 95 ? '#ef4444' : '#f97316' }}>💥 影响度 {event.impact}%</span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
