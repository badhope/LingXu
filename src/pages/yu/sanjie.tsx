'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function SanjiePage() {
  const threeRealms = [
    {
      name: '欲界',
      level: 1,
      days: 6,
      feature: '有饮食、男女、睡眠三欲',
      lifespan: '500万年',
      population: '无量众生',
      ruler: '帝释天',
      color: '#ef4444',
      icon: '❤️'
    },
    {
      name: '色界',
      level: 2,
      days: 18,
      feature: '无欲而有妙色身',
      lifespan: '8万亿年',
      population: '梵天居民',
      ruler: '大梵天王',
      color: '#3b82f6',
      icon: '💎'
    },
    {
      name: '无色界',
      level: 3,
      days: 4,
      feature: '无色无形，唯心识存',
      lifespan: '84000大劫',
      population: '灭尽定者',
      ruler: '空性无为',
      color: '#a855f7',
      icon: '☯️'
    }
  ]

  const desireHeavens = [
    {
      name: '四王天',
      tier: '欲界第一层',
      altitude: '须弥山半腹',
      lifespan: '500岁',
      dayEquiv: '人间50年',
      height: '身长半里',
      inhabitants: '四大天王',
      function: '护持世间',
      desires: '三欲具足',
      color: '#f87171',
      icon: '🏔️'
    },
    {
      name: '忉利天',
      tier: '欲界第二层',
      altitude: '须弥山顶',
      lifespan: '1000岁',
      dayEquiv: '人间100年',
      height: '身长一里',
      inhabitants: '三十三天主',
      function: '统领诸天',
      desires: '三欲具足',
      color: '#fb923c',
      icon: '👑'
    },
    {
      name: '夜摩天',
      tier: '欲界第三层',
      altitude: '虚空之中',
      lifespan: '2000岁',
      dayEquiv: '人间200年',
      height: '身长二里',
      inhabitants: '善时天王',
      function: '受乐无碍',
      desires: '男女形交',
      color: '#fbbf24',
      icon: '🌙'
    },
    {
      name: '兜率天',
      tier: '欲界第四层',
      altitude: '虚空之中',
      lifespan: '4000岁',
      dayEquiv: '人间400年',
      height: '身长四里',
      inhabitants: '弥勒菩萨',
      function: '补处菩萨所居',
      desires: '男女执手',
      color: '#34d399',
      icon: '🏛️'
    },
    {
      name: '化乐天',
      tier: '欲界第五层',
      altitude: '虚空之中',
      lifespan: '8000岁',
      dayEquiv: '人间800年',
      height: '身长八里',
      inhabitants: '化乐天王',
      function: '自化五欲而乐',
      desires: '男女相向而笑',
      color: '#22d3ee',
      icon: '✨'
    },
    {
      name: '他化自在天',
      tier: '欲界第六层',
      altitude: '欲界顶',
      lifespan: '16000岁',
      dayEquiv: '人间1600年',
      height: '身长十六里',
      inhabitants: '波旬魔王',
      function: '夺他化而为乐',
      desires: '男女相视',
      color: '#818cf8',
      icon: '😈'
    }
  ]

  const formHeavens = [
    {
      name: '初禅三天',
      subHeavens: ['梵众天', '梵辅天', '大梵天'],
      feature: '离生喜乐地，无觉有观',
      lifespan: '半劫 - 一劫半',
      dhyana: '初禅',
      purity: 60,
      color: '#60a5fa',
      icon: '🕊️'
    },
    {
      name: '二禅三天',
      subHeavens: ['少光天', '无量光天', '光音天'],
      feature: '定生喜乐地，寂灭清净',
      lifespan: '二劫 - 八劫',
      dhyana: '二禅',
      purity: 75,
      color: '#34d399',
      icon: '☀️'
    },
    {
      name: '三禅三天',
      subHeavens: ['少净天', '无量净天', '遍净天'],
      feature: '离喜妙乐地，清净无染',
      lifespan: '十六劫 - 六十四劫',
      dhyana: '三禅',
      purity: 88,
      color: '#a78bfa',
      icon: '💎'
    },
    {
      name: '四禅九天',
      subHeavens: ['福生天', '福爱天', '广果天', '无想天', '无烦天', '无热天', '善见天', '善现天', '色究竟天'],
      feature: '舍念清净地，不动无为',
      lifespan: '125劫 - 16000劫',
      dhyana: '四禅',
      purity: 95,
      color: '#f472b6',
      icon: '👁️'
    }
  ]

  const formlessHeavens = [
    {
      name: '空无边处天',
      feature: '心缘虚空，与空相应',
      lifespan: '20000大劫',
      attainment: '空无边处定',
      wisdom: 70,
      liberation: 25,
      trap: '堕在无边',
      color: '#0ea5e9',
      icon: '🌌'
    },
    {
      name: '识无边处天',
      feature: '心缘于识，与识相应',
      lifespan: '40000大劫',
      attainment: '识无边处定',
      wisdom: 80,
      liberation: 35,
      trap: '堕在无边识',
      color: '#8b5cf6',
      icon: '💫'
    },
    {
      name: '无所有处天',
      feature: '心泯前境，寂无所有',
      lifespan: '60000大劫',
      attainment: '无所有处定',
      wisdom: 90,
      liberation: 50,
      trap: '堕在枯寂',
      color: '#ec4899',
      icon: '⭕'
    },
    {
      name: '非想非非想处天',
      feature: '泯识存性，微妙难测',
      lifespan: '84000大劫',
      attainment: '非想非非想定',
      wisdom: 95,
      liberation: 99,
      trap: '三界顶无明',
      color: '#f59e0b',
      icon: '🕉️'
    }
  ]

  const samsaraRealms = [
    { name: '天道', feature: '乐多苦少，修十善业', position: '最上', suffering: 5, color: '#fbbf24', icon: '👼' },
    { name: '阿修罗道', feature: '有福无德，嗔恨斗争', position: '天下次之', suffering: 40, color: '#ef4444', icon: '⚔️' },
    { name: '人道', feature: '苦乐参半，修道最易', position: '中洲', suffering: 50, color: '#22c55e', icon: '👤' },
    { name: '畜生道', feature: '愚痴无明，互相吞啖', position: '水陆空行', suffering: 75, color: '#78716c', icon: '🐄' },
    { name: '饿鬼道', feature: '常饥常渴，贪欲所驱', position: '阎罗世界', suffering: 90, color: '#6b7280', icon: '👻' },
    { name: '地狱道', feature: '纯苦无乐，五逆恶业', position: '最下', suffering: 100, color: '#7f1d1d', icon: '🔥' }
  ]

  function getHeavenTier(tier: string) {
    const num = parseInt(tier.match(/\d+/)?.[0] || '0')
    if (num <= 2) return { color: '#ef4444', label: '凡夫天' }
    if (num <= 4) return { color: '#f59e0b', label: '福地天' }
    return { color: '#a855f7', label: '清净天' }
  }

  return (
    <SubPageTemplate
      title="三界诸天"
      subtitle="欲界色界无色界 · 二十八天 · 三十六天 · 层层天界"
      icon="🌌"
      colorRgb="125, 211, 252"
    >
      <SubPageSection title="三界总观">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: '三界', count: '3', color: '#7dd3fc', icon: '🌐', desc: '欲色无色' },
              { label: '二十八天', count: '28', color: '#a855f7', icon: '⭐', desc: '层层递进' },
              { label: '六道轮回', count: '6', color: '#ef4444', icon: '🔄', desc: '凡夫流转' },
              { label: '四禅八定', count: '8', color: '#22c55e', icon: '🧘', desc: '阶位分明' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={i === 1 ? {
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

      <SubPageSection title="三大界域">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem'
        }}>
          {threeRealms.map((realm, index) => (
            <motion.div
              key={realm.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.03 }}
              style={{
                border: `2px solid ${realm.color}40`,
                background: `linear-gradient(135deg, ${realm.color}10, transparent)`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${realm.color}30, transparent)`,
                pointerEvents: 'none'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, index % 2 === 0 ? 5 : -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle at 30% 30%, ${realm.color}, ${realm.color}66)`,
                      margin: '0 auto 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                      boxShadow: `0 0 40px ${realm.color}40`
                    }}
                  >
                    {realm.icon}
                  </motion.div>
                  <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    color: realm.color
                  }}>
                    {realm.name}
                  </h3>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.15rem 0.6rem',
                    borderRadius: '12px',
                    background: realm.color + '20',
                    color: realm.color
                  }}>
                    第{realm.level}界 · {realm.days}天
                  </span>
                </div>

                <p style={{
                  fontSize: '0.85rem',
                  color: 'rgba(180, 180, 190, 0.8)',
                  textAlign: 'center',
                  marginBottom: '1rem',
                  fontStyle: 'italic'
                }}>
                  「{realm.feature}」
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.75rem' }}>
                  <div style={{ textAlign: 'center', padding: '0.5rem', borderRadius: '8px', background: realm.color + '08' }}>
                    <div style={{ color: realm.color, fontWeight: 'bold' }}>⏳ {realm.lifespan}</div>
                    <div style={{ color: 'rgba(180, 180, 190, 0.6)' }}>寿量</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '0.5rem', borderRadius: '8px', background: realm.color + '08' }}>
                    <div style={{ color: realm.color, fontWeight: 'bold' }}>👑 {realm.ruler}</div>
                    <div style={{ color: 'rgba(180, 180, 190, 0.6)' }}>天主</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="六欲诸天">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem'
        }}>
          {desireHeavens.map((heaven, index) => (
            <motion.div
              key={heaven.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5, scale: 1.02 }}
              style={{
                border: `1px solid ${heaven.color}30`,
                borderTop: `3px solid ${heaven.color}`
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <motion.div
                    animate={{
                      y: [0, -3, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${heaven.color}, ${heaven.color}66)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}
                  >
                    {heaven.icon}
                  </motion.div>
                  <div>
                    <h3 style={{
                      fontSize: '1.05rem',
                      fontWeight: 'bold',
                      color: heaven.color
                    }}>
                      {heaven.name}
                    </h3>
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '0.05rem 0.4rem',
                      borderRadius: '10px',
                      background: getHeavenTier(heaven.tier).color + '25',
                      color: getHeavenTier(heaven.tier).color
                    }}>
                      {getHeavenTier(heaven.tier).label}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: heaven.color
                  }}>
                    {heaven.lifespan}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                    天寿
                  </div>
                </div>
              </div>

              <div style={{
                fontSize: '0.7rem',
                color: 'rgba(180, 180, 190, 0.6)',
                marginBottom: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>📍 {heaven.altitude}</span>
                <span>📅 1天 = {heaven.dayEquiv}</span>
              </div>

              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(180, 180, 190, 0.8)',
                marginBottom: '0.75rem',
                padding: '0.5rem',
                background: heaven.color + '08',
                borderRadius: '6px'
              }}>
                💡 {heaven.function}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.7rem' }}>
                <div>
                  <span style={{ color: 'rgba(59, 130, 246, 0.7)' }}>👥</span>
                  <span style={{ color: 'rgba(180, 180, 190, 0.7)', marginLeft: '0.2rem' }}>{heaven.inhabitants}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(236, 72, 153, 0.7)' }}>💕</span>
                  <span style={{ color: 'rgba(180, 180, 190, 0.7)', marginLeft: '0.2rem' }}>{heaven.desires}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="色界十八梵天">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem'
        }}>
          {formHeavens.map((heaven, index) => (
            <motion.div
              key={heaven.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              style={{
                background: `linear-gradient(180deg, ${heaven.color}15, transparent)`,
                border: `1px solid ${heaven.color}30`
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
                <motion.div
                  animate={{
                    boxShadow: [`0 0 10px ${heaven.color}`, `0 0 25px ${heaven.color}`, `0 0 10px ${heaven.color}`]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${heaven.color}, ${heaven.color}66)`,
                    margin: '0 auto 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem'
                  }}
                >
                  {heaven.icon}
                </motion.div>
                <h4 style={{ color: heaven.color, marginBottom: '0.25rem' }}>{heaven.name}</h4>
                <span style={{
                  fontSize: '0.65rem',
                  padding: '0.05rem 0.5rem',
                  borderRadius: '10px',
                  background: heaven.color + '20',
                  color: heaven.color
                }}>
                  {heaven.dhyana} · {heaven.subHeavens.length}天
                </span>
              </div>

              <p style={{
                fontSize: '0.7rem',
                color: 'rgba(180, 180, 190, 0.75)',
                textAlign: 'center',
                marginBottom: '0.5rem'
              }}>
                {heaven.feature}
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.25rem',
                justifyContent: 'center',
                marginBottom: '0.5rem'
              }}>
                {heaven.subHeavens.map(h => (
                  <span key={h} style={{
                    fontSize: '0.65rem',
                    padding: '0.1rem 0.35rem',
                    borderRadius: '4px',
                    background: heaven.color + '10',
                    color: heaven.color
                  }}>
                    {h}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: 'rgba(180, 180, 190, 0.6)' }}>
                  ⏳ {heaven.lifespan}
                </span>
                <div style={{
                  width: '50px',
                  height: '4px',
                  background: 'rgba(180, 180, 190, 0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${heaven.purity}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    style={{ width: `${heaven.purity}%`, height: '100%', background: heaven.color }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="无色界四天">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem'
          }}>
            {formlessHeavens.map((heaven, index) => (
              <motion.div
                key={heaven.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                style={{
                  padding: '1.25rem 1rem',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${heaven.color}20, ${heaven.color}05, transparent)`,
                  border: `1px solid ${heaven.color}30`,
                  textAlign: 'center'
                }}
              >
                <motion.div
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${heaven.color}40, ${heaven.color}10, transparent)`,
                    margin: '0 auto 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    border: `1px solid ${heaven.color}50`
                  }}
                >
                  {heaven.icon}
                </motion.div>
                <h4 style={{ color: heaven.color, marginBottom: '0.3rem', fontSize: '1rem' }}>
                  {heaven.name}
                </h4>
                <p style={{
                  fontSize: '0.7rem',
                  color: 'rgba(180, 180, 190, 0.7)',
                  marginBottom: '0.75rem',
                  fontStyle: 'italic'
                }}>
                  {heaven.feature}
                </p>
                <div style={{
                  fontSize: '0.7rem',
                  color: heaven.color,
                  marginBottom: '0.75rem'
                }}>
                  ⏳ {heaven.lifespan}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#22c55e' }}>{heaven.wisdom}%</div>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(180, 180, 190, 0.5)' }}>智慧</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: heaven.color }}>{heaven.liberation}%</div>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(180, 180, 190, 0.5)' }}>解脱</div>
                  </div>
                </div>
                <div style={{
                  marginTop: '0.75rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(180, 180, 190, 0.1)',
                  fontSize: '0.65rem',
                  color: 'rgba(239, 68, 68, 0.7)'
                }}>
                  ⚠️ {heaven.trap}
                </div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="六道轮回图">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '1rem'
        }}>
          {samsaraRealms.map((realm, index) => (
            <motion.div
              key={realm.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{
                padding: '1rem 0.75rem',
                borderRadius: '12px',
                background: `linear-gradient(180deg, ${realm.color}15, transparent)`,
                borderTop: `3px solid ${realm.color}`,
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: '2rem',
                marginBottom: '0.5rem'
              }}>
                {realm.icon}
              </div>
              <h4 style={{ color: realm.color, marginBottom: '0.3rem', fontSize: '0.9rem' }}>
                {realm.name}
              </h4>
              <p style={{
                fontSize: '0.65rem',
                color: 'rgba(180, 180, 190, 0.7)',
                marginBottom: '0.5rem'
              }}>
                {realm.feature}
              </p>
              <div style={{
                height: '4px',
                background: 'rgba(180, 180, 190, 0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '0.3rem'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${100 - realm.suffering}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1 }}
                  style={{
                    width: `${100 - realm.suffering}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${realm.color}, ${realm.color}66)`
                  }}
                />
              </div>
              <div style={{ fontSize: '0.6rem', color: 'rgba(180, 180, 190, 0.6)' }}>
                痛苦指数 {realm.suffering}%
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="三界火宅警训">
        <div className="xian-submodule-card" style={{
          background: 'linear-gradient(135deg, rgba(125, 211, 252, 0.1), transparent)',
          border: '1px solid rgba(125, 211, 252, 0.3)',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: '1.1rem',
              color: 'rgba(180, 180, 190, 0.85)',
              lineHeight: 2.2,
              fontStyle: 'italic'
            }}
          >
            「三界无安，犹如火宅。众苦充满，甚可怖畏。<br/>
            常有生老病死忧患，如是等火，炽然不息。<br/>
            虽得梵天，寿八万劫，福报受尽，还堕六道。」
          </motion.p>
          <div style={{ marginTop: '1.5rem', color: '#7dd3fc', fontSize: '0.9rem' }}>
            —— 妙法莲华经 · 譬喻品
          </div>
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
