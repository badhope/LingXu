'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function DanyaoPage() {
  const pills = [
    {
      name: '九转金丹',
      grade: '天级',
      effect: '白日飞升',
      successRate: 1,
      time: '九九八十一年',
      desc: '太上老君八卦炉中炼就，九转功成，霞举飞升。服之者立地成仙，与天地同寿，与日月同庚。',
      materials: ['九转还魂草', '先天紫气', '太阳真火精华'],
      icon: '🌟'
    },
    {
      name: '九转还魂丹',
      grade: '天级',
      effect: '起死回生',
      successRate: 5,
      time: '三十六年',
      desc: '生死人而肉白骨，纵是魂飞魄散，只要一息尚存，亦可还魂阳间。真正的逆天之丹。',
      materials: ['幽冥草', '还魂花', '三生石粉'],
      icon: '💫'
    },
    {
      name: '筑基丹',
      grade: '地级',
      effect: '伐毛洗髓',
      successRate: 30,
      time: '三年',
      desc: '修仙第一步，筑基之本。荡尽尘俗杂质，铸就仙骨道胎。一颗下肚，凡胎换仙根。',
      materials: ['筑基草', '灵泉水', '百年朱果'],
      icon: '🔵'
    },
    {
      name: '聚灵丹',
      grade: '地级',
      effect: '灵力倍增',
      successRate: 50,
      time: '三月',
      desc: '修炼辅助圣品，服之可聚天地灵气于一身，修炼速度倍增。宗门批量炼制的标准丹药。',
      materials: ['聚灵草', '凝露花', '月光石粉'],
      icon: '💠'
    },
    {
      name: '大还丹',
      grade: '玄级',
      effect: '功力倍增',
      successRate: 65,
      time: '一月',
      desc: '增功添寿之妙药，一颗可抵十年苦修。武林中人趋之若鹜的续命神丹。',
      materials: ['山参王', '灵芝', '雪莲'],
      icon: '🔴'
    },
    {
      name: '小还丹',
      grade: '黄级',
      effect: '疗伤续命',
      successRate: 85,
      time: '七日',
      desc: '入门级疗伤圣药，内外伤皆可治。行走江湖必备良品。',
      materials: ['当归', '黄芪', '甘草'],
      icon: '🟠'
    }
  ]

  const getGradeStyle = (grade: string) => {
    switch (grade) {
      case '天级': return {
        bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        glow: '0 0 30px rgba(251, 191, 36, 0.6)',
        border: '2px solid #fbbf24'
      }
      case '地级': return {
        bg: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        glow: '0 0 20px rgba(59, 130, 246, 0.5)',
        border: '2px solid #3b82f6'
      }
      case '玄级': return {
        bg: 'linear-gradient(135deg, #ef4444, #dc2626)',
        glow: '0 0 15px rgba(239, 68, 68, 0.4)',
        border: '2px solid #ef4444'
      }
      default: return {
        bg: 'linear-gradient(135deg, #6b7280, #4b5563)',
        glow: 'none',
        border: '2px solid #6b7280'
      }
    }
  }

  return (
    <SubPageTemplate
      title="丹药方术"
      subtitle="九转金丹 · 白日飞升 · 仙丹妙药 · 生死人肉白骨"
      icon="💊"
      colorRgb="168, 162, 158"
    >
      <SubPageSection title="炼丹房">
        <InfoCard>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                fontSize: '6rem',
                marginBottom: '1rem',
                filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.5))'
              }}
            >
              🏮
            </motion.div>
            <div style={{
              fontSize: '1.25rem',
              color: '#b89438',
              fontStyle: 'italic'
            }}>
              金丹火候诀 —— 圣人传下丹方诀，便是凡人也升天
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
              marginTop: '2rem'
            }}>
              {[
                { label: '天级丹方', value: '2', icon: '⭐' },
                { label: '地级丹方', value: '2', icon: '💎' },
                { label: '玄级丹方', value: '1', icon: '🔺' },
                { label: '黄级丹方', value: '1', icon: '📜' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#b89438' }}>{stat.value}</div>
                  <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="丹方大全">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {pills.map((pill, index) => (
            <motion.div
              key={pill.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ scale: 1.01 }}
              style={{
                border: getGradeStyle(pill.grade).border
              }}
            >
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0 }}>
                  <motion.div
                    animate={{
                      boxShadow: ['none', getGradeStyle(pill.grade).glow, 'none']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: getGradeStyle(pill.grade).bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem'
                    }}
                  >
                    {pill.icon}
                  </motion.div>
                  <div style={{
                    textAlign: 'center',
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    background: getGradeStyle(pill.grade).bg,
                    color: 'white'
                  }}>
                    {pill.grade}
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <div>
                      <span style={{ fontSize: '1.35rem', fontWeight: 'bold', color: '#b89438' }}>
                        {pill.name}
                      </span>
                      <span style={{
                        marginLeft: '1rem',
                        fontSize: '0.8rem',
                        color: '#4ade80'
                      }}>
                        ✨ {pill.effect}
                      </span>
                    </div>
                  </div>

                  <p style={{
                    color: 'rgba(180, 180, 190, 0.75)',
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                    marginBottom: '1rem'
                  }}>
                    {pill.desc}
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    fontSize: '0.8rem'
                  }}>
                    <div>
                      <span style={{ color: 'rgba(180, 180, 190, 0.5)' }}>⏱️ 炼制时间: </span>
                      <span style={{ color: '#60a5fa' }}>{pill.time}</span>
                    </div>
                    <div>
                      <span style={{ color: 'rgba(180, 180, 190, 0.5)' }}>🎯 成功率: </span>
                      <span style={{ color: pill.successRate < 10 ? '#f87171' : pill.successRate < 50 ? '#fbbf24' : '#4ade80' }}>
                        {pill.successRate}%
                      </span>
                    </div>
                    <div>
                      <span style={{ color: 'rgba(180, 180, 190, 0.5)' }}>🧪 主药材: </span>
                      <span style={{ color: '#a78bfa' }}>{pill.materials[0]}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {pill.materials.map((m, i) => (
                      <span key={i} style={{
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.5rem',
                        background: 'rgba(168, 162, 158, 0.15)',
                        borderRadius: '12px',
                        color: 'rgba(180, 180, 190, 0.7)'
                      }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="炼丹心诀">
        <InfoCard>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                fontSize: '1.35rem',
                color: '#a8a29e',
                fontStyle: 'italic',
                lineHeight: 2
              }}
            >
              八月十五中秋节，辰子三时直下泄<br />
              温温铅鼎，光透帘帏<br />
              药逢气类方成象，道在虚无合自然<br />
              一粒灵丹吞入腹，始知我命不由天
            </motion.div>
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
