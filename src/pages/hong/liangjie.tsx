'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface GreatCalamity {
  name: string
  era: string
  victims: string
  survivors: string
  casualty: number
  feature: string
  desc: string
  detail: string
  cause: string
  winners: string[]
  losers: string[]
  consequences: string[]
  color: string
  icon: string
}

const GREAT_CALAMITIES: GreatCalamity[] = [
  {
    name: '开天劫',
    era: '混沌时期',
    victims: '三千混沌魔神',
    survivors: '盘古、鸿钧、罗睺',
    casualty: 99,
    feature: '盘古开天，魔神陨落',
    desc: '盘古手持开天斧劈开混沌，三千魔神阻挡，几乎全部身陨。',
    detail: '开天劫是洪荒第一劫，盘古大神在混沌中醒来，手持开天斧劈开混沌，开辟天地。三千混沌魔神不愿被开天波及，联手阻挡盘古。最终盘古力斩三千魔神，以自身陨落为代价开天辟地。此劫过后，混沌破灭，洪荒诞生。三千魔神几乎全部身陨，只有鸿钧、罗睺等寥寥数人活了下来。',
    cause: '盘古开天，大道考验',
    winners: ['盘古', '鸿钧', '罗睺'],
    losers: ['三千混沌魔神'],
    consequences: ['混沌破灭', '洪荒诞生', '盘古身陨', '先天灵宝出世'],
    color: '#7c3aed',
    icon: '🪓'
  },
  {
    name: '龙汉初劫',
    era: '洪荒初年',
    victims: '龙凤麒麟三族',
    survivors: '少数龙族血脉',
    casualty: 95,
    feature: '三族争霸，同归于尽',
    desc: '龙凤麒麟三族称霸洪荒，爆发灭族大战，三族俱灭。',
    detail: '龙汉初劫是洪荒第二劫，龙凤麒麟三族称霸洪荒万载，气运鼎盛。但盛极而衰，三族摩擦不断，在魔祖罗睺的挑唆下，爆发了灭族大战。战场之上，三族高层个个状若疯魔，毫不惜命。战后三族精锐尽丧，族长失踪，退出洪荒舞台。',
    cause: '罗睺挑唆，气运耗尽，盛极而衰',
    winners: ['罗睺', '鸿钧'],
    losers: ['祖龙', '元凤', '始麒麟', '三族全族'],
    consequences: ['三族退出洪荒', '罗睺血祭西方', '鸿钧成为道祖', '西方灵气枯竭'],
    color: '#dc2626',
    icon: '🐉'
  },
  {
    name: '巫妖大战',
    era: '太古时期',
    victims: '巫妖两族',
    survivors: '少数大巫与妖圣',
    casualty: 98,
    feature: '不周山倒，天破地裂',
    desc: '妖族天庭与巫族部落决战，两败俱伤，双双灭族。',
    detail: '巫妖大战是洪荒第三劫，妖族帝俊太一号令诸天，建立妖族天庭；巫族十二祖巫称霸大地，建立巫门。两族积怨已久，终于爆发决战。共工怒撞不周山，天柱崩塌，天破地裂。女娲娘娘炼石补天，巫妖两族同归于尽。此战后洪荒破碎，三界分立。',
    cause: '十日同出，夸父逐日，后羿射日，仇恨积累',
    winners: ['女娲', '三清', '西方二圣'],
    losers: ['帝俊', '太一', '十二祖巫', '巫妖两族'],
    consequences: ['不周山倒塌', '女娲补天', '后土化轮回', '人族兴起'],
    color: '#ea580c',
    icon: '☀️'
  },
  {
    name: '封神大战',
    era: '商末周初',
    victims: '截教全教',
    survivors: '少数散仙',
    casualty: 90,
    feature: '三教共立封神榜，截教覆灭',
    desc: '阐截两教决战，四圣联手破诛仙阵，截教覆灭。',
    detail: '封神大战是洪荒第四劫，商朝气数已尽，凤鸣岐山，周室当兴。三教共立封神榜，阐截两教大战爆发。通天教主摆下诛仙剑阵，非四圣不可破。但老子、元始、接引、准提四大圣人联手，破了诛仙剑阵。万仙阵后，截教几乎全军覆没，通天教主被鸿钧带回紫霄宫。',
    cause: '商纣无道，凤鸣岐山，三教共立封神榜',
    winners: ['阐教', '西方教', '姜子牙', '周武王'],
    losers: ['通天教主', '截教万仙', '商纣王', '闻仲'],
    consequences: ['截教覆灭', '天庭三百六十五正神归位', '西方教大兴', '人族定鼎中原'],
    color: '#7c3aed',
    icon: '⚔️'
  },
  {
    name: '西游之劫',
    era: '唐初',
    victims: '妖族妖王',
    survivors: '有后台的妖王',
    casualty: 70,
    feature: '西天取经，佛教大兴',
    desc: '唐僧师徒西天取经，一路降妖除魔，佛教传入东土。',
    detail: '西游之劫是量劫的余波，也是佛教大兴的关键。如来佛祖策划了西天取经，观音菩萨具体执行，唐僧师徒历经九九八十一难，终于取得真经。一路上无数妖族妖王被打杀，有后台的被神仙带走，没后台的死于金箍棒下。此劫后佛教大兴于中土。',
    cause: '佛法东传，普渡众生，如来策划',
    winners: ['如来佛祖', '观音菩萨', '唐僧师徒', '佛教'],
    losers: ['无后台的妖王', '花果山群猴', '截教残余'],
    consequences: ['佛教大兴', '真经传入东土', '孙悟空成斗战胜佛', '三界格局稳定'],
    color: '#ca8a04',
    icon: '🐒'
  },
  {
    name: '末法之劫',
    era: '近代',
    victims: '所有修行者',
    survivors: '转世之人',
    casualty: 99.9,
    feature: '灵气枯竭，神仙消失',
    desc: '灵气突然枯竭，所有神仙消失，末法时代降临。',
    detail: '末法之劫是目前人类经历的最后一劫，大约在明末清初，地球上的灵气突然枯竭，所有的洞天福地相继关闭，飞升通道断绝。神仙要么举界飞升离开了地球，要么躲进了洞天福地，要么兵解转世。地球上再也不见神迹，科技开始兴起。',
    cause: '天道结界，灵气封印，防止凡人接触修真',
    winners: ['天道', '人类科技'],
    losers: ['修真者', '妖魔鬼怪', '神仙'],
    consequences: ['灵气枯竭', '洞天福地关闭', '科技兴起', '唯物主义盛行'],
    color: '#0891b2',
    icon: '🌌'
  }
]

const CALAMITY_STEPS = [
  '劫运初现',
  '杀机暗藏',
  '矛盾激化',
  '全面开战',
  '血染洪荒',
  '圣人出手',
  '劫运落幕',
  '天地重启'
]

export default function LiangJiePage() {
  const [filteredCalamities, setFilteredCalamities] = useState(GREAT_CALAMITIES)
  const [expandedCalamity, setExpandedCalamity] = useState<string | null>(null)
  const [simulating, setSimulating] = useState(false)
  const [selectedCalamity, setSelectedCalamity] = useState<GreatCalamity | null>(null)
  const [simStep, setSimStep] = useState(0)
  const [simProgress, setSimProgress] = useState(0)
  const [deathToll, setDeathToll] = useState(0)
  const [simResult, setSimResult] = useState<boolean | null>(null)

  const startSimulation = useCallback((calamity: GreatCalamity) => {
    setSelectedCalamity(calamity)
    setSimulating(true)
    setSimStep(0)
    setSimProgress(0)
    setDeathToll(0)
    setSimResult(null)

    let step = 0
    let progress = 0
    let deaths = 0

    const interval = setInterval(() => {
      progress += Math.random() * 3 + 0.5
      deaths += Math.random() * calamity.casualty / 15

      if (progress >= 100 && step < 7) {
        progress = 0
        step++
        setSimStep(step)
      }
      if (step >= 7 && progress >= 100) {
        clearInterval(interval)
        setSimProgress(100)
        setDeathToll(calamity.casualty)
        setTimeout(() => {
          setSimResult(true)
          setSimulating(false)
        }, 800)
        return
      }
      setSimProgress(Math.min(progress, 100))
      setDeathToll(Math.min(deaths, calamity.casualty))
    }, 80)
  }, [])

  const handleCalamityFilter = useCallback((data: typeof GREAT_CALAMITIES) => {
    setFilteredCalamities(data)
  }, [])

  const calamityFilters = {
    searchKeys: ['name', 'era', 'feature', 'desc', 'detail', 'cause', 'winners', 'losers'],
    filterKeys: {
      era: ['混沌时期', '洪荒初年', '太古时期', '商末周初', '唐初', '近代'],
    }
  }

  return (
    <SubPageTemplate
      title="无量量劫"
      subtitle="五劫轮回，天地灭而我不灭，天地朽而我不朽"
      icon="💥"
      colorRgb="239, 68, 68"
    >
      <SubPageSection title="🌋 量劫模拟器">
        <InfoCard glowIntensity={90} glowColor="239, 68, 68">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!simulating && !simResult ? (
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💥</div>
                <h3 style={{ marginBottom: '1rem', color: '#ef4444' }}>天地为棋盘，众生为棋子</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  选择一次无量量劫，模拟天道轮回
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  maxWidth: 600,
                  margin: '0 auto'
                }}>
                  {GREAT_CALAMITIES.map((calamity) => (
                    <motion.div
                      key={calamity.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startSimulation(calamity)}
                      style={{
                        padding: '1rem 0.75rem',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${calamity.color}20, rgba(40, 40, 50, 0.9))`,
                        border: `1px solid ${calamity.color}50`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{calamity.icon}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: calamity.color, marginBottom: '0.25rem' }}>
                        {calamity.name}
                      </div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>死亡率 {calamity.casualty}%</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : simulating ? (
              <div>
                <motion.div
                  animate={{
                    scale: [1, 1.3, 0.9, 1.2, 1],
                    rotate: [0, 10, -10, 15, -15, 0],
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  💥
                </motion.div>
                <h3 style={{ marginBottom: '0.5rem', color: selectedCalamity?.color }}>
                  量劫进行中：{selectedCalamity?.name}
                </h3>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#ef4444'
                }}>
                  【{CALAMITY_STEPS[simStep]}】
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1rem' }}>
                  <div style={{ textAlign: 'left', fontSize: '0.8rem', marginBottom: '0.25rem', color: '#ef4444' }}>
                    💀 死亡人数：{Math.round(deathToll)}%
                  </div>
                  <ProgressBar value={deathToll} color="#ef4444" />
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  <ProgressBar value={simProgress} color={selectedCalamity?.color || '#ef4444'} />
                </div>
              </div>
            ) : simResult ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ fontSize: '5rem', marginBottom: '1rem' }}
                  >
                    🌋
                  </motion.div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    color: selectedCalamity?.color,
                    fontWeight: 700
                  }}>
                    量劫落幕！天地重置！
                  </h2>
                  <p style={{
                    fontSize: '1.3rem',
                    color: selectedCalamity?.color,
                    marginBottom: '0.5rem',
                    fontWeight: 700
                  }}>
                    {selectedCalamity?.name} - {selectedCalamity?.era}
                  </p>
                  <div style={{ color: '#ef4444', marginBottom: '0.5rem' }}>
                    💀 最终死亡率：{selectedCalamity?.casualty}%
                  </div>
                  <div style={{ color: '#22c55e', marginBottom: '0.5rem' }}>
                    🏆 胜利者：{selectedCalamity?.winners.join('、')}
                  </div>
                  <div style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                    📜 {selectedCalamity?.feature}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSimResult(null)}
                    style={{
                      padding: '0.8rem 2rem',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid #ef4444',
                      borderRadius: '50px',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    💥 再演一次量劫
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="📜 洪荒五劫档案">
        <FilterBar
          data={GREAT_CALAMITIES}
          onFiltered={handleCalamityFilter}
          options={calamityFilters}
          placeholder="搜索量劫名称、时代、起因、胜负..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCalamities.map((calamity, idx) => (
            <motion.div key={calamity.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                glowColor={calamity.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedCalamity(expandedCalamity === calamity.name ? null : calamity.name)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{calamity.icon}</span>
                      <div>
                        <h4 className="font-bold" style={{ color: calamity.color }}>{calamity.name}</h4>
                        <p className="text-xs text-gray-500">{calamity.era} · 死亡率 {calamity.casualty}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-red-400">
                        死者：{calamity.victims}
                      </div>
                      <div className="text-xs text-green-400">
                        生者：{calamity.survivors}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{calamity.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {calamity.consequences.slice(0, 4).map((c) => (
                      <span key={c} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
                        💥 {c}
                      </span>
                    ))}
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedCalamity === calamity.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedCalamity === calamity.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-700/50 space-y-3 mt-3">
                        <p className="text-sm text-gray-300">{calamity.detail}</p>
                        <div className="text-xs">
                          <span className="text-orange-400">⚠️ 起因：</span>
                          <span className="text-gray-300">{calamity.cause}</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => { e.stopPropagation(); startSimulation(calamity); }}
                          className="w-full py-2 rounded-lg font-bold text-white"
                          style={{ background: `linear-gradient(90deg, ${calamity.color}, ${calamity.color}99)` }}
                        >
                          💥 模拟演这次量劫
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </InfoCard>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}