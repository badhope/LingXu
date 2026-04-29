'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface ChaosDemonGod {
  name: string
  rank: number
  dao: string
  power: number
  status: string
  feature: string
  desc: string
  detail: string
  treasure: string
  fate: string
  reincarnation: string
  color: string
  icon: string
}

const CHAOS_DEMON_GODS: ChaosDemonGod[] = [
  {
    name: '盘古',
    rank: 1,
    dao: '力之大道',
    power: 100,
    status: '开天后身陨',
    feature: '三千魔神之首，力证大道',
    desc: '三千混沌魔神之首，执掌力之大道，开天辟地。',
    detail: '盘古大神乃是三千混沌魔神之首，执掌至高无上的力之大道，诞生于混沌青莲之中。盘古手持开天斧，背负造化玉蝶，以力证道，劈开混沌，开辟洪荒天地。开天之后力竭而死，元神三分化为三清，精血化为十二祖巫，身体化为洪荒万物。',
    treasure: '开天斧、造化玉蝶、混沌青莲',
    fate: '开天辟地后身陨，元神化为三清，精血化为十二祖巫',
    reincarnation: '元始天尊、太上老君、通天教主',
    color: '#fbbf24',
    icon: '🪓'
  },
  {
    name: '鸿钧',
    rank: 2,
    dao: '玄黄大道',
    power: 99,
    status: '合道',
    feature: '第一圣人，道祖',
    desc: '三千魔神第二，开天之后成为道祖，合道天道。',
    detail: '鸿钧乃是三千混沌魔神中排名第二，执掌玄黄大道。开天劫中见机得早，没有与盘古硬拼，保住了性命。开天之后得到造化玉蝶残片，成就圣人之位，在紫霄宫讲道三次，分封圣位。最后为了平衡三清，以身合道，成为天道的代言人。',
    treasure: '造化玉蝶残片、鸿蒙珠',
    fate: '以身合道，成为天道代言人，非量劫不出',
    reincarnation: '道祖本身',
    color: '#7c3aed',
    icon: '🧙'
  },
  {
    name: '罗睺',
    rank: 3,
    dao: '毁灭大道',
    power: 98,
    status: '败亡',
    feature: '魔祖，诛仙阵主',
    desc: '魔祖，执掌毁灭大道，龙汉初劫的幕后黑手。',
    detail: '罗睺乃是三千混沌魔神排名第三，执掌毁灭大道，是为魔祖。开天劫中同样保住了性命，在西方建立魔教。龙汉初劫中挑唆龙凤麒麟三族自相残杀，血祭西方灵气，成就魔道。后来被鸿钧联合扬眉、乾坤、阴阳三大魔神击败，临死前立下誓言：道消魔长，道长魔消。',
    treasure: '诛仙四剑、诛仙阵图、十二品灭世黑莲',
    fate: '被鸿钧击败，魔源散于洪荒天地之间',
    reincarnation: '无天魔祖、魔界之主',
    color: '#ef4444',
    icon: '👿'
  },
  {
    name: '扬眉',
    rank: 4,
    dao: '空间大道',
    power: 97,
    status: '逍遥',
    feature: '空间之主，先有鸿钧后有天，我比鸿钧早千年',
    desc: '空间魔神，空心杨柳化形，神通广大。',
    detail: '扬眉魔神乃是混沌之中一株空心杨柳化形，执掌空间大道，比鸿钧诞生还要早千年。龙汉初劫时曾联合鸿钧对付罗睺。扬眉的神通是法力尽吸，任何法宝和法术都能收走，鸿钧也自愧不如。此人情性淡薄，不喜欢争斗，一直逍遥于混沌之中，不履红尘。',
    treasure: '空间神杖、杨柳枝',
    fate: '逍遥混沌之外，不履红尘',
    reincarnation: '菩提老祖、方寸山樵夫',
    color: '#22c55e',
    icon: '🌳'
  },
  {
    name: '乾坤',
    rank: 5,
    dao: '乾坤大道',
    power: 96,
    status: '身陨',
    feature: '乾坤老祖，镇压洪荒',
    desc: '执掌乾坤大道，龙汉初劫陨落。',
    detail: '乾坤魔神执掌乾坤大道，乃是开天之后最古老的存在之一。龙汉初劫时，罗睺血祭西方，乾坤老祖挺身而出，与罗睺大战。虽然最终击败了罗睺，但乾坤老祖也油尽灯枯，身陨道消。留下乾坤鼎为盘古所得，成为开天至宝之一。',
    treasure: '乾坤鼎、乾坤图',
    fate: '龙汉初劫与罗睺同归于尽',
    reincarnation: '镇元子',
    color: '#3b82f6',
    icon: '☯️'
  },
  {
    name: '阴阳',
    rank: 6,
    dao: '阴阳大道',
    power: 95,
    status: '身陨',
    feature: '阴阳老祖，万物本源',
    desc: '执掌阴阳大道，龙汉初劫陨落。',
    detail: '阴阳魔神执掌阴阳大道，是万物的本源。龙汉初劫时与乾坤老祖、扬眉、鸿钧联手对付罗睺。此老精通阴阳变化，生生不息。但罗睺的诛仙剑阵太过厉害，阴阳老祖为了破阵，不惜自爆元神，最终击破了诛仙阵的一角，自己也身陨道消。',
    treasure: '阴阳镜、太极图残片',
    fate: '自爆元神破诛仙阵一角',
    reincarnation: '太阴星君、太阳星君',
    color: '#ec4899',
    icon: '⚫'
  },
  {
    name: '时辰',
    rank: 7,
    dao: '时间大道',
    power: 95,
    status: '失踪',
    feature: '时间之主，掌握过去未来',
    desc: '执掌时间大道，开天后不知所踪。',
    detail: '时辰魔神执掌时间大道，能看见过去未来，穿梭时空。开天劫中见机不妙，直接运用时间大道遁走，消失于时间长河之中，无人知其下落。有人说他去了未来，有人说他改变了过去，还有人说他化作了时间本身。',
    treasure: '时间之沙、时光梭',
    fate: '遁入时间长河，不知所踪',
    reincarnation: '燃灯古佛',
    color: '#06b6d4',
    icon: '⏳'
  },
  {
    name: '命运',
    rank: 8,
    dao: '命运大道',
    power: 94,
    status: '合道',
    feature: '命运之主，万物定数',
    desc: '执掌命运大道，与天道合二为一。',
    detail: '命运魔神执掌命运大道，能定万物生死祸福。盘古开天之后，命运魔神见大势已去，主动与天道合二为一，成为命运规则本身。从此以后万物的命运便由他注定，无人能逃脱命运的安排，除非能跳出三界外，不在五行中。',
    treasure: '命运之轮、定数盘',
    fate: '与天道合二为一，成为命运规则',
    reincarnation: '天庭南斗星君',
    color: '#f59e0b',
    icon: '🎭'
  }
]

const BATTLE_STEPS = [
  '混沌初遇',
  '大道争锋',
  '法宝齐出',
  '魔神大战',
  '道则碰撞',
  '盘古开天',
  '魔神陨落',
  '胜者为王'
]

export default function MoShenPage() {
  const [filteredGods, setFilteredGods] = useState(CHAOS_DEMON_GODS)
  const [expandedGod, setExpandedGod] = useState<string | null>(null)
  const [battling, setBattling] = useState(false)
  const [selectedGod, setSelectedGod] = useState<ChaosDemonGod | null>(null)
  const [battleStep, setBattleStep] = useState(0)
  const [battleProgress, setBattleProgress] = useState(0)
  const [hp, setHp] = useState(100)
  const [battleResult, setBattleResult] = useState<{ win: boolean; msg: string } | null>(null)

  const startBattle = useCallback((god: ChaosDemonGod) => {
    setSelectedGod(god)
    setBattling(true)
    setBattleStep(0)
    setBattleProgress(0)
    setHp(100)
    setBattleResult(null)

    let step = 0
    let progress = 0
    let health = 100

    const interval = setInterval(() => {
      progress += Math.random() * 3 + 0.5
      health -= (100 - god.power) / 10

      if (god.name !== '盘古' && health <= 0) {
        clearInterval(interval)
        setHp(0)
        setTimeout(() => {
          setBattleResult({ win: false, msg: '与盘古对战失败！被开天斧劈成了飞灰...' })
          setBattling(false)
        }, 500)
        return
      }

      if (progress >= 100 && step < 7) {
        progress = 0
        step++
        setBattleStep(step)
      }
      if (step >= 7 && progress >= 100) {
        clearInterval(interval)
        setBattleProgress(100)
        setTimeout(() => {
          setBattleResult({ win: true, msg: god.name === '盘古' ? 
            '盘古开天成功！身化万物，元神三分，精血化祖巫！' :
            `${god.name}成功遁走！成为开天幸存者！`
          })
          setBattling(false)
        }, 800)
        return
      }
      setBattleProgress(Math.min(progress, 100))
      setHp(Math.max(0, health))
    }, 85)
  }, [])

  const handleGodFilter = useCallback((data: typeof CHAOS_DEMON_GODS) => {
    setFilteredGods(data)
  }, [])

  const godFilters = {
    searchKeys: ['name', 'dao', 'feature', 'desc', 'detail', 'treasure', 'fate'],
    filterKeys: {
      status: ['合道', '逍遥', '身陨', '失踪', '败亡'],
    }
  }

  return (
    <SubPageTemplate
      title="混沌魔神"
      subtitle="三千魔神，三千大道，盘古开天，谁主沉浮"
      icon="👿"
      colorRgb="124, 58, 237"
    >
      <SubPageSection title="⚔️ 混沌魔神大战">
        <InfoCard glowIntensity={90} glowColor="124, 58, 237">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!battling && !battleResult ? (
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌀</div>
                <h3 style={{ marginBottom: '1rem', color: '#7c3aed' }}>混沌未开，大道争锋</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  选择一位混沌魔神，重演开天大劫！
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  maxWidth: 700,
                  margin: '0 auto'
                }}>
                  {CHAOS_DEMON_GODS.map((god) => (
                    <motion.div
                      key={god.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startBattle(god)}
                      style={{
                        padding: '1rem 0.75rem',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${god.color}20, rgba(40, 40, 50, 0.9))`,
                        border: `1px solid ${god.color}50`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{god.icon}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: god.color, marginBottom: '0.25rem' }}>
                        第{god.rank}名 {god.name}
                      </div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>{god.dao}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : battling ? (
              <div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    rotate: [0, 5, -5, 10, -10, 0],
                  }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  ⚔️
                </motion.div>
                <h3 style={{ marginBottom: '0.5rem', color: selectedGod?.color }}>
                  混沌大战：{selectedGod?.name} VS 盘古
                </h3>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#7c3aed'
                }}>
                  【{BATTLE_STEPS[battleStep]}】
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1rem' }}>
                  <div style={{ textAlign: 'left', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: hp > 50 ? '#22c55e' : hp > 25 ? '#f59e0b' : '#ef4444' }}>
                      ❤️ {selectedGod?.name}生命值 {Math.round(hp)}%
                    </span>
                  </div>
                  <ProgressBar value={hp} color={hp > 50 ? '#22c55e' : hp > 25 ? '#f59e0b' : '#ef4444'} />
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  <ProgressBar value={battleProgress} color={selectedGod?.color || '#7c3aed'} />
                </div>
              </div>
            ) : battleResult ? (
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
                    {battleResult.win ? '🏆' : '💀'}
                  </motion.div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    color: battleResult.win ? '#22c55e' : '#ef4444',
                    fontWeight: 700
                  }}>
                    {battleResult.win ? '混沌大战结束！' : '对战失败！身死道消！'}
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: selectedGod?.color,
                    marginBottom: '0.5rem'
                  }}>
                    {selectedGod?.name} - {selectedGod?.dao}
                  </p>
                  <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                    {battleResult.msg}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setBattleResult(null)}
                    style={{
                      padding: '0.8rem 2rem',
                      background: 'rgba(124, 58, 237, 0.2)',
                      border: '1px solid #7c3aed',
                      borderRadius: '50px',
                      color: '#7c3aed',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    ⚔️ 再战一次混沌
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="📜 三千魔神榜（前8名）">
        <FilterBar
          data={CHAOS_DEMON_GODS}
          onFiltered={handleGodFilter}
          options={godFilters}
          placeholder="搜索魔神名称、大道、法宝、命运..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGods.map((god, idx) => (
            <motion.div key={god.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                glowColor={god.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedGod(expandedGod === god.name ? null : god.name)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{god.icon}</span>
                      <div>
                        <h4 className="font-bold" style={{ color: god.color }}>第{god.rank}名 {god.name}</h4>
                        <p className="text-xs text-gray-500">{god.dao} · 战力 {god.power}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs" style={{ 
                        color: god.status === '合道' || god.status === '逍遥' ? '#22c55e' : 
                               god.status === '失踪' ? '#f59e0b' : '#ef4444' 
                      }}>
                        {god.status}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{god.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(124, 58, 247, 0.15)', color: '#a78bfa' }}>
                      💎 {god.treasure}
                    </span>
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedGod === god.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedGod === god.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-700/50 space-y-3 mt-3">
                        <p className="text-sm text-gray-300">{god.detail}</p>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-amber-400">💎 至宝：</span>
                            <span className="text-gray-300">{god.treasure}</span>
                          </div>
                          <div>
                            <span className="text-red-400">💀 结局：</span>
                            <span className="text-gray-300">{god.fate}</span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => { e.stopPropagation(); startBattle(god); }}
                          className="w-full py-2 rounded-lg font-bold text-white"
                          style={{ background: `linear-gradient(90deg, ${god.color}, ${god.color}99)` }}
                        >
                          ⚔️ 重演开天大劫
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