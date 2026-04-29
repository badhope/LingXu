'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface AncestralWu {
  name: string
  number: number
  ability: string
  power: number
  status: string
  feature: string
  desc: string
  detail: string
  weapon: string
  appearance: string
  famousSkill: string
  color: string
  icon: string
}

const ANCESTRAL_WU: AncestralWu[] = [
  {
    name: '帝江',
    number: 1,
    ability: '空间',
    power: 100,
    status: '身陨',
    feature: '空间之主，祖巫之首',
    desc: '空间祖巫，祖巫之首，识空间，善极速。',
    detail: '帝江又称混沌，空间祖巫，乃是祖巫之首。其状如黄囊，赤如丹火，六足四翼，浑敦无面目。帝江执掌空间大道，速度天下第一，能瞬间穿梭亿万里，无人能及。巫妖大战时与烛九阴联手对抗妖族东皇太一，最终同归于尽。',
    weapon: '空间之刃',
    appearance: '其状如黄囊，赤如丹火，六足四翼，浑敦无面目',
    famousSkill: '空间切割、维度跳跃',
    color: '#7c3aed',
    icon: '🦅'
  },
  {
    name: '烛九阴',
    number: 2,
    ability: '时间',
    power: 99,
    status: '身陨',
    feature: '时间之主，睁眼为昼闭眼为夜',
    desc: '时间祖巫，掌管昼夜，吹气为冬呼气为夏。',
    detail: '烛九阴又称烛龙，时间祖巫，人面蛇身而赤，身长千里。睁眼为昼，闭眼为夜，吹气为冬，呼气为夏。不饮不食，不寝不息，风雨是谒。烛九阴执掌时间大道，能看见过去未来，是巫族中最有智慧的存在。巫妖大战时燃烧本源，与帝江联手对抗东皇太一的混沌钟。',
    weapon: '时间之烛',
    appearance: '人面蛇身而赤，身长千里',
    famousSkill: '时间停止、岁月流光',
    color: '#06b6d4',
    icon: '🐉'
  },
  {
    name: '共工',
    number: 3,
    ability: '水',
    power: 98,
    status: '身陨',
    feature: '水之祖巫，怒撞不周山',
    desc: '水之祖巫，执掌天下水域，性格暴躁。',
    detail: '共工人面蛇身朱发，水之祖巫，执掌天下所有水域。共工性格暴躁，好勇斗狠，与祝融是死对头。巫妖大战中期，共工与祝融大战于不周山，战败后羞愤之下怒撞不周山，导致天柱崩塌，天破地裂，直接导致了巫妖两族的败亡。',
    weapon: '水神戟',
    appearance: '人面蛇身朱发',
    famousSkill: '万水归宗、怒海狂涛',
    color: '#3b82f6',
    icon: '🌊'
  },
  {
    name: '祝融',
    number: 4,
    ability: '火',
    power: 98,
    status: '身陨',
    feature: '火之祖巫，南方火神',
    desc: '火之祖巫，执掌天下火种，性情刚烈。',
    detail: '祝融兽身人面，乘两龙，火之祖巫，南方火神。祝融性情刚烈，与共工势同水火。巫妖大战时，祝融与共工大战于不周山，虽然胜了共工，但自己也油尽灯枯。临死前点燃了自身本源，与共工同归于尽，火焰烧遍了整个洪荒南部。',
    weapon: '火神鞭',
    appearance: '兽身人面，乘两龙',
    famousSkill: '九天玄火、焚天煮海',
    color: '#ef4444',
    icon: '🔥'
  },
  {
    name: '句芒',
    number: 5,
    ability: '木',
    power: 97,
    status: '身陨',
    feature: '木之祖巫，生命之主',
    desc: '木之祖巫，执掌生命，春神。',
    detail: '句芒鸟身人面，乘两龙，木之祖巫，春神。句芒执掌生命大道，能枯木逢春，万物复苏。句芒性格温和，是祖巫中的治疗者，只要不是魂飞魄散，都能救活。巫妖大战时，句芒为了保护巫族后辈，以身挡下了妖族天帝帝俊的河图洛书全力一击，身陨道消。',
    weapon: '生命权杖',
    appearance: '鸟身人面，乘两龙',
    famousSkill: '枯木逢春、生命绽放',
    color: '#22c55e',
    icon: '🌿'
  },
  {
    name: '蓐收',
    number: 6,
    ability: '金',
    power: 97,
    status: '身陨',
    feature: '金之祖巫，杀戮之神',
    desc: '金之祖巫，执掌兵戈，刑神。',
    detail: '蓐收人面白毛，虎爪，左耳有蛇，乘两龙，金之祖巫，刑神。蓐收执掌金行大道，主兵戈杀伐，是祖巫中攻击力最强的之一。蓐收左耳挂蛇，手中一柄大斧，杀人不眨眼。巫妖大战时，蓐收斩杀了无数妖族大圣，最后被十大妖圣联手围攻而死。',
    weapon: '开天斧残片',
    appearance: '人面白毛，虎爪，左耳有蛇，乘两龙',
    famousSkill: '万剑归宗、金行灭世',
    color: '#fbbf24',
    icon: '⚔️'
  },
  {
    name: '后土',
    number: 7,
    ability: '土',
    power: 99,
    status: '化轮回',
    feature: '土之祖巫，六道轮回之主',
    desc: '土之祖巫，慈悲为怀，化身六道轮回。',
    detail: '后土人身蛇尾，背生七手，胸前双手，土之祖巫。后土是祖巫中唯一的女性，慈悲为怀。巫妖大战后，见天地间亡魂无数，流离失所，不由心生怜悯。于是发下大宏愿，以身化六道轮回，让众生有了归宿。后土因此功德成圣，是巫族唯一的圣人。',
    weapon: '厚土印',
    appearance: '人身蛇尾，背生七手，胸前双手',
    famousSkill: '大地守护、六道轮回',
    color: '#92400e',
    icon: '🌍'
  },
  {
    name: '天吴',
    number: 8,
    ability: '风',
    power: 96,
    status: '身陨',
    feature: '风之祖巫，八首八面',
    desc: '风之祖巫，速度无双，呼风唤雨。',
    detail: '天吴八首八面，八足八尾，皆青黄，风之祖巫。天吴执掌风之大道，速度仅次于帝江，能呼风唤雨。天吴八首八面，能同时观察八个方向，无人能偷袭。巫妖大战时，天吴负责游击骚扰，斩杀了无数妖族，但最后被妖师鲲鹏偷袭而死。',
    weapon: '风刃',
    appearance: '八首八面，八足八尾，皆青黄',
    famousSkill: '风暴之怒、风刃切割',
    color: '#06b6d4',
    icon: '💨'
  },
  {
    name: '强良',
    number: 9,
    ability: '雷',
    power: 96,
    status: '身陨',
    feature: '雷之祖巫，虎首人身',
    desc: '雷之祖巫，执掌天雷，威慑万物。',
    detail: '强良虎首人身，拿两条黄蛇，雷之祖巫。强良执掌雷之大道，一声大吼能引动九天神雷，威慑万物。强良性格暴烈，好战成性，是祖巫中的先锋。巫妖大战时，强良冲在最前面，被妖族十大妖圣联手用周天星斗大阵镇杀。',
    weapon: '雷锤',
    appearance: '虎首人身，拿两条黄蛇',
    famousSkill: '九天神雷、雷罚降临',
    color: '#fbbf24',
    icon: '⚡'
  },
  {
    name: '翕兹',
    number: 10,
    ability: '电',
    power: 95,
    status: '身陨',
    feature: '电之祖巫，人面鸟身',
    desc: '电之祖巫，闪电之主，快如电光。',
    detail: '翕兹人面鸟身，耳挂两蛇，脚踏两蛇，电之祖巫。翕兹执掌电之大道，快如闪电，无人能看清其身影。翕兹与强良配合，雷电交加，威力无穷。巫妖大战时，翕兹为了救强良，被妖师鲲鹏的北冥寒冰冻住了身形，随后被斩杀。',
    weapon: '电鞭',
    appearance: '人面鸟身，耳挂两蛇，脚踏两蛇',
    famousSkill: '电光石火、万雷齐发',
    color: '#fbbf24',
    icon: '🌩️'
  },
  {
    name: '奢比尸',
    number: 11,
    ability: '毒',
    power: 95,
    status: '身陨',
    feature: '毒之祖巫，人面兽身',
    desc: '毒之祖巫，执掌万毒，腐蚀万物。',
    detail: '奢比尸人面兽身，双耳似犬，耳挂两青蛇，毒之祖巫。奢比尸执掌毒之大道，万毒不侵，一口毒气能腐蚀万物。奢比尸是祖巫中最诡异的存在，没人愿意与他为敌。巫妖大战时，奢比尸毒死了无数妖族，最后被陆压道人用斩仙飞刀斩杀。',
    weapon: '毒雾',
    appearance: '人面兽身，双耳似犬，耳挂两青蛇',
    famousSkill: '万毒归宗、腐骨蚀心',
    color: '#22c55e',
    icon: '☠️'
  },
  {
    name: '玄冥',
    number: 12,
    ability: '雨',
    power: 96,
    status: '身陨',
    feature: '雨之祖巫，冰霜之主',
    desc: '雨之祖巫，执掌雨水，冰封万里。',
    detail: '玄冥鸟首人身，脚踏两条黑龙，雨之祖巫。玄冥执掌雨之大道，不仅能呼风唤雨，还能冰封万里。玄冥性格冰冷，沉默寡言。巫妖大战时，玄冥冰封了妖族天庭的南天门，斩杀了无数天兵天将，最后被妖族十大妖圣联手冰封后自爆而死。',
    weapon: '雨师杖',
    appearance: '鸟首人身，脚踏两条黑龙',
    famousSkill: '冰封万里、暴雨倾盆',
    color: '#3b82f6',
    icon: '❄️'
  }
]

const BATTLE_STEPS = [
  '血脉觉醒',
  '肉身强化',
  '神通初现',
  '祖巫传承',
  '法则领悟',
  '大战妖族',
  '以身证道',
  '巫族荣光'
]

export default function ZuQingPage() {
  const [filteredWu, setFilteredWu] = useState(ANCESTRAL_WU)
  const [expandedWu, setExpandedWu] = useState<string | null>(null)
  const [cultivating, setCultivating] = useState(false)
  const [selectedWu, setSelectedWu] = useState<AncestralWu | null>(null)
  const [cultStep, setCultStep] = useState(0)
  const [cultProgress, setCultProgress] = useState(0)
  const [bodyStrength, setBodyStrength] = useState(0)
  const [cultResult, setCultResult] = useState<boolean | null>(null)

  const startCultivation = useCallback((wu: AncestralWu) => {
    setSelectedWu(wu)
    setCultivating(true)
    setCultStep(0)
    setCultProgress(0)
    setBodyStrength(0)
    setCultResult(null)

    let step = 0
    let progress = 0
    let strength = 0

    const interval = setInterval(() => {
      progress += Math.random() * 3 + 0.5
      strength += wu.power / 25

      if (progress >= 100 && step < 7) {
        progress = 0
        step++
        setCultStep(step)
      }
      if (step >= 7 && progress >= 100) {
        clearInterval(interval)
        setCultProgress(100)
        setBodyStrength(wu.power)
        setTimeout(() => {
          setCultResult(true)
          setCultivating(false)
        }, 800)
        return
      }
      setCultProgress(Math.min(progress, 100))
      setBodyStrength(Math.min(strength, wu.power))
    }, 80)
  }, [])

  const handleWuFilter = useCallback((data: typeof ANCESTRAL_WU) => {
    setFilteredWu(data)
  }, [])

  const wuFilters = {
    searchKeys: ['name', 'ability', 'feature', 'desc', 'detail', 'weapon', 'famousSkill'],
    filterKeys: {
      ability: ['空间', '时间', '水', '火', '木', '金', '土', '风', '雷', '电', '毒', '雨'],
    }
  }

  return (
    <SubPageTemplate
      title="十二祖巫"
      subtitle="盘古精血化祖巫，肉身成圣霸洪荒，不尊天道不修德，只尊自身力强"
      icon="💀"
      colorRgb="34, 197, 94"
      parentPath="/huang2"
    >
      <SubPageSection title="💪 祖巫血脉觉醒">
        <InfoCard glowIntensity={90} glowColor="34, 197, 94">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!cultivating && !cultResult ? (
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🦴</div>
                <h3 style={{ marginBottom: '1rem', color: '#22c55e' }}>盘古血脉，祖巫传承</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  选择一位祖巫，觉醒其血脉，肉身成圣！
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.75rem',
                  maxWidth: 700,
                  margin: '0 auto'
                }}>
                  {ANCESTRAL_WU.map((wu) => (
                    <motion.div
                      key={wu.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startCultivation(wu)}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${wu.color}20, rgba(40, 40, 50, 0.9))`,
                        border: `1px solid ${wu.color}50`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{wu.icon}</div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 600, color: wu.color, marginBottom: '0.15rem' }}>
                        {wu.name}
                      </div>
                      <div style={{ fontSize: '0.55rem', opacity: 0.6 }}>{wu.ability}之祖巫</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : cultivating ? (
              <div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 0.9, 1.1, 1],
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  💪
                </motion.div>
                <h3 style={{ marginBottom: '0.5rem', color: selectedWu?.color }}>
                  血脉觉醒：{selectedWu?.name}祖巫
                </h3>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#22c55e'
                }}>
                  【{BATTLE_STEPS[cultStep]}】
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1rem' }}>
                  <div style={{ textAlign: 'left', fontSize: '0.8rem', marginBottom: '0.25rem', color: '#22c55e' }}>
                    💪 肉身强度：{Math.round(bodyStrength)} / {selectedWu?.power}
                  </div>
                  <ProgressBar value={bodyStrength} color="#22c55e" max={selectedWu?.power || 100} />
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  <ProgressBar value={cultProgress} color={selectedWu?.color || '#22c55e'} />
                </div>
              </div>
            ) : cultResult ? (
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
                    💀
                  </motion.div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    color: '#22c55e',
                    fontWeight: 700
                  }}>
                    祖巫血脉觉醒成功！
                  </h2>
                  <p style={{
                    fontSize: '1.2rem',
                    color: selectedWu?.color,
                    marginBottom: '0.5rem'
                  }}>
                    {selectedWu?.name} - {selectedWu?.ability}之祖巫
                  </p>
                  <div style={{ color: '#22c55e', marginBottom: '0.5rem' }}>
                    💪 肉身强度达到 {selectedWu?.power} 点！
                  </div>
                  <div style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                    🎖️ 获得神通：{selectedWu?.famousSkill}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCultResult(null)}
                    style={{
                      padding: '0.8rem 2rem',
                      background: 'rgba(34, 197, 94, 0.2)',
                      border: '1px solid #22c55e',
                      borderRadius: '50px',
                      color: '#22c55e',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    💀 觉醒其他祖巫血脉
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="📜 十二祖巫榜">
        <FilterBar
          data={ANCESTRAL_WU}
          onFiltered={handleWuFilter}
          options={wuFilters}
          placeholder="搜索祖巫名称、能力、法宝、神通..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWu.map((wu, idx) => (
            <motion.div key={wu.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                glowColor={wu.color.replace('#', '')}
                glowIntensity={80}
                onClick={() => setExpandedWu(expandedWu === wu.name ? null : wu.name)}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{wu.icon}</span>
                      <div>
                        <h4 className="font-bold text-sm" style={{ color: wu.color }}>
                          第{wu.number}祖巫 {wu.name}
                        </h4>
                        <p className="text-xs text-gray-500">{wu.ability} · 战力 {wu.power}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs">{wu.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `rgba(${wu.color.replace('#', '')}, 0.15)`, color: wu.color }}>
                      🎖️ {wu.famousSkill.split('、')[0]}
                    </span>
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedWu === wu.name ? '▲ 收起' : '▼ 展开'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedWu === wu.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-gray-700/50 space-y-2 mt-2">
                        <p className="text-xs text-gray-300">{wu.detail}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span style={{ color: wu.color }}>⚔️ 兵器：</span>
                            <span className="text-gray-300">{wu.weapon}</span>
                          </div>
                          <div>
                            <span style={{ color: wu.color }}>📏 形象：</span>
                            <span className="text-gray-300 text-xs">{wu.appearance.slice(0, 10)}...</span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => { e.stopPropagation(); startCultivation(wu); }}
                          className="w-full py-1.5 rounded-lg font-bold text-white text-sm"
                          style={{ background: `linear-gradient(90deg, ${wu.color}, ${wu.color}99)` }}
                        >
                          💪 觉醒血脉
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