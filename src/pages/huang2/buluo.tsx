'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

interface AncientTribe {
  name: string
  totem: string
  population: number
  strength: number
  territory: string
  feature: string
  desc: string
  detail: string
  famousChief: string
  skills: string[]
  color: string
  icon: string
}

const ANCIENT_TRIBES: AncientTribe[] = [
  {
    name: '九黎部落',
    totem: '蚩尤',
    population: 81,
    strength: 95,
    territory: '东方九黎',
    feature: '铜头铁额，食沙石子',
    desc: '蚩尤率领的八十一兄弟部落，勇猛善战，制造兵器。',
    detail: '九黎部落乃是蚩尤所率领，共有八十一个兄弟部落，个个铜头铁额，以沙石为食。九黎部落最早发明了冶炼技术，制造了各种兵器，威震天下。蚩尤与黄帝大战于涿鹿，九战九胜，但最终黄帝请来九天玄女，才打败了蚩尤。九黎部落战败后，一部分融入了华夏，一部分南下成为了苗族的祖先。',
    famousChief: '蚩尤',
    skills: ['冶炼技术', '铜头铁额', '八十一兄弟', '五兵之制'],
    color: '#ef4444',
    icon: '⚔️'
  },
  {
    name: '神农部落',
    totem: '炎帝',
    population: 100,
    strength: 60,
    territory: '姜水流域',
    feature: '尝百草，教农耕',
    desc: '炎帝神农氏部落，发明农业，尝百草，发明医药。',
    detail: '神农部落乃是炎帝神农氏的部落，住在姜水流域。神农氏发明了农业，教人民耕种五谷；尝百草，发明了医药，一日而遇七十毒；又发明了陶器，开辟了集市。神农部落是最早的农业部落，但不擅长战斗，后来被黄帝部落击败，两部融合成为了华夏民族。',
    famousChief: '炎帝、神农氏',
    skills: ['农耕', '医药', '陶器', '集市'],
    color: '#22c55e',
    icon: '🌿'
  },
  {
    name: '轩辕部落',
    totem: '熊',
    population: 100,
    strength: 85,
    territory: '姬水流域',
    feature: '统一华夏，人文始祖',
    desc: '黄帝轩辕氏部落，统一华夏，发明舟车文字。',
    detail: '轩辕部落乃是黄帝轩辕氏的部落，住在姬水流域。黄帝修德振兵，治五气，艺五种，抚万民，度四方。先后击败了炎帝和蚩尤，统一了华夏。黄帝的妻子嫘祖发明了养蚕，仓颉发明了文字，伶伦制造了音律，大挠发明了甲子。黄帝被尊为中华民族的人文始祖。',
    famousChief: '黄帝、轩辕氏',
    skills: ['统一华夏', '舟车', '文字', '音律'],
    color: '#fbbf24',
    icon: '👑'
  },
  {
    name: '夸父部落',
    totem: '巨人',
    population: 50,
    strength: 80,
    territory: '成都载天山',
    feature: '巨人族，夸父逐日',
    desc: '巨人部落，个个身高丈二，力大无穷，夸父逐日的传说。',
    detail: '夸父部落是巨人族，个个身高丈二，力大无穷，住在成都载天山。夸父部落的首领夸父想要追上太阳，抓住太阳。于是夸父拿着手杖，迈开大步追着太阳跑。夸父追了九天九夜，离太阳越来越近，但也越来越渴。夸父喝干了黄河和渭水，还想喝大泽的水，但还没到就渴死了。夸父死后，他的手杖变成了邓林。',
    famousChief: '夸父',
    skills: ['巨人之力', '日行千里', '力大无穷'],
    color: '#f59e0b',
    icon: '🏃'
  },
  {
    name: '刑天部落',
    totem: '战神',
    population: 30,
    strength: 90,
    territory: '常羊之山',
    feature: '以乳为目，以脐为口',
    desc: '战神部落，刑天与帝争神，断头葬于常羊之山。',
    detail: '刑天部落是最善战的部落之一，首领刑天与黄帝争夺神位。黄帝砍掉了刑天的头，葬在常羊之山。但刑天并没有死，他以乳头为眼睛，以肚脐为嘴巴，手里拿着盾牌和大斧，继续挥舞战斗。刑天因此被称为战神，代表着永不屈服的战斗精神。',
    famousChief: '刑天',
    skills: ['不死之身', '永不屈服', '干戚之舞'],
    color: '#7c3aed',
    icon: '💀'
  },
  {
    name: '雨师妾部落',
    totem: '龙',
    population: 40,
    strength: 70,
    territory: '汤谷',
    feature: '人身黑首，各有两龙',
    desc: '上古雨师部落，掌控风雨，人人左耳挂蛇。',
    detail: '雨师妾部落住在汤谷，那里的人都长着黑色的脑袋，人身，每个人的耳朵上都挂着两条蛇，左脚踩着赤蛇，右脚踩着青蛇。雨师妾部落能够呼风唤雨，是上古的雨师部落。他们是蚩尤的盟友，在涿鹿之战中帮助蚩尤布下了大雾，让黄帝的军队迷失了方向。',
    famousChief: '雨师、风伯',
    skills: ['呼风唤雨', '布雾', '祭天'],
    color: '#3b82f6',
    icon: '🌧️'
  }
]

const WAR_STEPS = [
  '厉兵秣马',
  '部落联盟',
  '誓师出征',
  '遭遇敌军',
  '大战爆发',
  '巫师祭天',
  '冲锋陷阵',
  '统一部落'
]

export default function BuLuoPage() {
  const [warring, setWarring] = useState(false)
  const [selectedTribe, setSelectedTribe] = useState<AncientTribe | null>(null)
  const [warStep, setWarStep] = useState(0)
  const [warProgress, setWarProgress] = useState(0)
  const [morale, setMorale] = useState(50)
  const [territory, setTerritory] = useState(10)
  const [warResult, setWarResult] = useState<boolean | null>(null)
  const [expandedTribe, setExpandedTribe] = useState<string | null>(null)

  const startWar = useCallback((tribe: AncientTribe) => {
    setSelectedTribe(tribe)
    setWarring(true)
    setWarStep(0)
    setWarProgress(0)
    setMorale(50)
    setTerritory(10)
    setWarResult(null)

    let step = 0
    let progress = 0
    let mor = 50
    let ter = 10

    const interval = setInterval(() => {
      progress += Math.random() * 2 + 0.3
      mor += tribe.strength / 40 + Math.random() * 2 - 0.5
      ter += tribe.strength / 30

      if (Math.random() > 0.9 && step > 3) {
        mor -= 15
        if (mor <= 0) {
          clearInterval(interval)
          setTimeout(() => {
            setWarResult(false)
            setWarring(false)
          }, 500)
          return
        }
      }

      if (progress >= 100 && step < 7) {
        progress = 0
        step++
        setWarStep(step)
      }
      if (step >= 7 && progress >= 100) {
        clearInterval(interval)
        setWarProgress(100)
        setTimeout(() => {
          setWarResult(true)
          setWarring(false)
        }, 800)
        return
      }
      setWarProgress(Math.min(progress, 100))
      setMorale(Math.min(Math.max(mor, 0), 100))
      setTerritory(Math.min(ter, 100))
    }, 100)
  }, [])

  return (
    <SubPageTemplate
      title="太古部落"
      subtitle="氏族联盟，巫门传承，涿鹿之战，华夏起源"
      icon="🏕️"
      colorRgb="245, 158, 11"
      parentPath="/huang2"
    >
      <SubPageSection title="⚔️ 部落战争模拟器">
        <InfoCard glowIntensity={90} glowColor="245, 158, 11">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!warring && !warResult ? (
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏕️</div>
                <h3 style={{ marginBottom: '1rem', color: '#f59e0b' }}>逐鹿中原，统一部落</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  选择一个太古部落，开始你的征服之路！
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  maxWidth: 600,
                  margin: '0 auto'
                }}>
                  {ANCIENT_TRIBES.map((tribe) => (
                    <motion.div
                      key={tribe.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startWar(tribe)}
                      style={{
                        padding: '1rem 0.75rem',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${tribe.color}20, rgba(40, 40, 50, 0.9))`,
                        border: `1px solid ${tribe.color}50`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{tribe.icon}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: tribe.color, marginBottom: '0.25rem' }}>
                        {tribe.name}
                      </div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>图腾：{tribe.totem}</div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>战力：{tribe.strength}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : warring ? (
              <div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    rotate: [0, 2, -2, 4, -4, 0],
                  }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  ⚔️
                </motion.div>
                <h3 style={{ marginBottom: '0.5rem', color: selectedTribe?.color }}>
                  部落战争：{selectedTribe?.name}
                </h3>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#f59e0b'
                }}>
                  【{WAR_STEPS[warStep]}】
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: 500, margin: '0 auto 1rem' }}>
                  <div>
                    <div style={{ textAlign: 'left', fontSize: '0.8rem', marginBottom: '0.25rem', color: '#ef4444' }}>
                      💪 士气：{Math.round(morale)}%
                    </div>
                    <ProgressBar value={morale} color="#ef4444" />
                  </div>
                  <div>
                    <div style={{ textAlign: 'left', fontSize: '0.8rem', marginBottom: '0.25rem', color: '#22c55e' }}>
                      🗺️ 领地：{Math.round(territory)}%
                    </div>
                    <ProgressBar value={territory} color="#22c55e" />
                  </div>
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  <ProgressBar value={warProgress} color={selectedTribe?.color || '#f59e0b'} />
                </div>
              </div>
            ) : warResult ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ fontSize: '5rem', marginBottom: '1rem' }}
                  >
                    {warResult ? '🏆' : '💀'}
                  </motion.div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    color: warResult ? '#22c55e' : '#ef4444',
                    fontWeight: 700
                  }}>
                    {warResult ? '部落战争胜利！' : '战争失败！部落溃散！'}
                  </h2>
                  <p style={{
                    fontSize: '1.2rem',
                    color: selectedTribe?.color,
                    marginBottom: '0.5rem'
                  }}>
                    {selectedTribe?.name} - 图腾{selectedTribe?.totem}
                  </p>
                  {warResult && (
                    <div style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '1rem' }}>
                      🎖️ 你的部落统一了太古洪荒！成为了华夏始祖！
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: 400, margin: '1rem auto 2rem' }}>
                    {selectedTribe?.skills.map((skill) => (
                      <div key={skill} style={{
                        padding: '0.5rem',
                        borderRadius: '8px',
                        background: `rgba(${selectedTribe.color.replace('#', '')}, 0.1)`,
                        border: `1px solid ${selectedTribe.color}50`,
                        fontSize: '0.8rem'
                      }}>
                        ✨ {skill}
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setWarResult(null)}
                    style={{
                      padding: '0.8rem 2rem',
                      background: 'rgba(245, 158, 11, 0.2)',
                      border: '1px solid #f59e0b',
                      borderRadius: '50px',
                      color: '#f59e0b',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    ⚔️ 再打一次部落战争！
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="📜 太古部落联盟">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ANCIENT_TRIBES.map((tribe, idx) => (
            <motion.div key={tribe.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
              <InfoCard
                glowColor={tribe.color.replace('#', '')}
                glowIntensity={80}
                onClick={() => setExpandedTribe(expandedTribe === tribe.name ? null : tribe.name)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{tribe.icon}</span>
                      <div>
                        <h4 className="font-bold" style={{ color: tribe.color }}>{tribe.name}</h4>
                        <p className="text-xs text-gray-500">🗺️ {tribe.territory}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-amber-400">
                        图腾：{tribe.totem}
                      </div>
                      <div className="text-xs text-red-400">
                        战力：{tribe.strength}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{tribe.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tribe.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `rgba(${tribe.color.replace('#', '')}, 0.15)`, color: tribe.color }}>
                        ✨ {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedTribe === tribe.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedTribe === tribe.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-700/50 space-y-3 mt-3">
                        <p className="text-sm text-gray-300">{tribe.detail}</p>
                        <div className="text-xs">
                          <span style={{ color: tribe.color }}>👑 著名首领：</span>
                          <span className="text-gray-300">{tribe.famousChief}</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => { e.stopPropagation(); startWar(tribe); }}
                          className="w-full py-2 rounded-lg font-bold text-white"
                          style={{ background: `linear-gradient(90deg, ${tribe.color}, ${tribe.color}99)` }}
                        >
                          ⚔️ 选择这个部落开始征服！
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