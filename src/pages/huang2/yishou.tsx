'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface StrangeBeast {
  name: string
  location: string
  tier: string
  danger: number
  feature: string
  desc: string
  detail: string
  ability: string
  appearance: string
  legend: string
  color: string
  icon: string
}

const STRANGE_BEASTS: StrangeBeast[] = [
  {
    name: '九尾狐',
    location: '青丘之山',
    tier: '神兽',
    danger: 85,
    feature: '食者不蛊',
    desc: '青丘之山有兽焉，其状如狐而九尾，其音如婴儿，能食人。',
    detail: '九尾狐住在青丘之山，形状像狐狸却长着九条尾巴，叫声如同婴儿啼哭，能吞食人。人若是吃了它的肉就能不中妖邪毒气。九尾狐在传说中代表祥瑞，但也有魅惑人心的能力。传说妲己就是九尾狐化身。',
    ability: '魅惑、祥瑞、食人不蛊',
    appearance: '其状如狐而九尾，其音如婴儿',
    legend: '妲己、涂山氏',
    color: '#ec4899',
    icon: '🦊'
  },
  {
    name: '饕餮',
    location: '钩吾之山',
    tier: '凶兽',
    danger: 95,
    feature: '贪吃无厌',
    desc: '其状如羊身人面，其目在腋下，虎齿人爪，其音如婴儿，名曰狍鸮，是食人。',
    detail: '饕餮又称狍鸮，住在钩吾之山，羊身人面，眼睛长在腋下，老虎的牙齿人的爪子，叫声像婴儿啼哭，吃人。饕餮最大的特点就是贪吃，最后把自己的身体都吃掉了，只剩下一个头，所以也代表了贪婪。',
    ability: '吞噬万物、永生不灭',
    appearance: '羊身人面，目在腋下，虎齿人爪',
    legend: '龙之九子、四凶之一',
    color: '#ef4444',
    icon: '👹'
  },
  {
    name: '凤凰',
    location: '丹穴之山',
    tier: '神兽',
    danger: 30,
    feature: '见则天下安宁',
    desc: '有鸟焉，其状如鸡，五采而文，名曰凤凰，首文曰德，翼文曰义，背文曰礼，膺文曰仁，腹文曰信。',
    detail: '凤凰住在丹穴之山，形状像鸡，披着五彩羽毛。凤凰头上的花纹是德，翅膀上的花纹是义，背上的花纹是礼，胸前的花纹是仁，腹部的花纹是信。凤凰饮食自然，自歌自舞，一出现天下就会太平。',
    ability: '浴火重生、祥瑞降临',
    appearance: '其状如鸡，五采而文',
    legend: '百鸟之王、四灵之一',
    color: '#f59e0b',
    icon: '🦅'
  },
  {
    name: '麒麟',
    location: '钟山',
    tier: '神兽',
    danger: 20,
    feature: '瑞兽，不踏生草',
    desc: '仁兽也，含仁怀义，音中律吕，行步中规，折旋中矩，择土而践，位平然后处。',
    detail: '麒麟是仁兽，含仁怀义，叫的声音符合音律，走路符合规矩。不踩生草，不踏活虫，不群居不旅行，不入罗网。麒麟是瑞兽，只有圣王在位的时候才会出现。孔子出生的时候有麒麟吐玉书于阙里人家。',
    ability: '送子、祥瑞、辟邪',
    appearance: '鹿身马蹄，牛尾狼额，五彩腹，高丈二',
    legend: '孔子出生、瑞兽象征',
    color: '#22c55e',
    icon: '🦌'
  },
  {
    name: '应龙',
    location: '凶犁之山',
    tier: '神龙',
    danger: 90,
    feature: '杀蚩尤与夸父',
    desc: '应龙处南极，杀蚩尤与夸父，不得复上，故下数旱。旱而为应龙之状，乃得大雨。',
    detail: '应龙是有翅膀的龙，住在凶犁土丘的南端。应龙在黄帝与蚩尤的大战中立下大功，杀死了蚩尤和夸父。但是因为消耗太大，再也不能回到天界。应龙留在人间，后来帮助大禹治水，用尾巴画地成江。',
    ability: '呼风唤雨、画地成江、战神',
    appearance: '鳞身脊棘，头大而长，吻尖，有翼',
    legend: '黄帝战蚩尤、大禹治水',
    color: '#3b82f6',
    icon: '🐉'
  },
  {
    name: '毕方',
    location: '章莪之山',
    tier: '异鸟',
    danger: 75,
    feature: '见则其邑有火',
    desc: '有鸟焉，其状如鹤，一足，赤文青质而白喙，名曰毕方，其鸣自叫也，见则其邑有火。',
    detail: '毕方住在章莪之山，形状像鹤，只有一只脚，青色的身子红色的花纹，白色的嘴。毕方的名字来源于竹子燃烧时的噼啪声。毕方在哪里出现，哪里就会发生大火，是火灾的预兆。',
    ability: '引火、纵火、火灾预兆',
    appearance: '其状如鹤，一足，赤文青质而白喙',
    legend: '黄帝车旁、火兆',
    color: '#ea580c',
    icon: '🦩'
  },
  {
    name: '精卫',
    location: '发鸠之山',
    tier: '灵鸟',
    danger: 10,
    feature: '精卫填海',
    desc: '有鸟焉，其状如乌，文首，白喙，赤足，名曰精卫，其鸣自詨。常衔西山之木石，以堙于东海。',
    detail: '精卫是炎帝的小女儿，名叫女娃。女娃在东海游玩，溺水而死，化为精卫鸟。精卫住在发鸠之山，形状像乌鸦，头上有花纹，白色的嘴，红色的脚。精卫常常衔着西山的树枝石子，想要填平东海。',
    ability: '坚持不懈、不屈不挠',
    appearance: '其状如乌，文首，白喙，赤足',
    legend: '精卫填海、不屈精神',
    color: '#78716c',
    icon: '🐦'
  },
  {
    name: '梼杌',
    location: '西荒',
    tier: '凶兽',
    danger: 90,
    feature: '傲狠难训',
    desc: '西方荒中有兽焉，其状如虎而大，毛长两尺，人面虎足，口牙，尾长一丈八尺，扰乱荒中，名梼杌。',
    detail: '梼杌住在西方荒中，形状像老虎却比老虎大，毛长两尺，人面虎足，猪的嘴巴牙齿，尾巴长一丈八尺。梼杌桀骜不驯，难以教化，在荒野中横行霸道。梼杌是四凶之一，代表顽固不化、凶恶无比。',
    ability: '刀枪不入、凶残暴戾',
    appearance: '状如虎而大，毛长两尺，人面虎足，尾长一丈八尺',
    legend: '四凶之一、颛顼之子',
    color: '#7c3aed',
    icon: '🐯'
  }
]

const TAMING_STEPS = [
  '发现踪迹',
  '布置陷阱',
  '喂食诱惑',
  '建立信任',
  '滴血认主',
  '契约签订',
  '心灵感应',
  '降服成功'
]

export default function YiShouPage() {
  const [filteredBeasts, setFilteredBeasts] = useState(STRANGE_BEASTS)
  const [expandedBeast, setExpandedBeast] = useState<string | null>(null)
  const [taming, setTaming] = useState(false)
  const [selectedBeast, setSelectedBeast] = useState<StrangeBeast | null>(null)
  const [tameStep, setTameStep] = useState(0)
  const [tameProgress, setTameProgress] = useState(0)
  const [friendship, setFriendship] = useState(0)
  const [tameResult, setTameResult] = useState<{ success: boolean; msg: string } | null>(null)

  const startTaming = useCallback((beast: StrangeBeast) => {
    setSelectedBeast(beast)
    setTaming(true)
    setTameStep(0)
    setTameProgress(0)
    setFriendship(0)
    setTameResult(null)

    let step = 0
    let progress = 0
    let friend = 0

    const interval = setInterval(() => {
      progress += Math.random() * 3 + 0.5
      friend += (100 - beast.danger) / 20

      if (beast.danger >= 80 && Math.random() > 0.95 && step > 3) {
        clearInterval(interval)
        setTimeout(() => {
          setTameResult({ success: false, msg: `${beast.name}野性难驯！挣脱了束缚逃入了深山...` })
          setTaming(false)
        }, 500)
        return
      }

      if (progress >= 100 && step < 7) {
        progress = 0
        step++
        setTameStep(step)
      }
      if (step >= 7 && progress >= 100) {
        clearInterval(interval)
        setTameProgress(100)
        setFriendship(100)
        setTimeout(() => {
          setTameResult({ success: true, msg: `${beast.name}成功降服！成为了你的本命灵兽！` })
          setTaming(false)
        }, 800)
        return
      }
      setTameProgress(Math.min(progress, 100))
      setFriendship(Math.min(friend, 95))
    }, 90)
  }, [])

  const handleBeastFilter = useCallback((data: typeof STRANGE_BEASTS) => {
    setFilteredBeasts(data)
  }, [])

  const beastFilters = {
    searchKeys: ['name', 'location', 'tier', 'feature', 'desc', 'detail', 'ability', 'legend'],
    filterKeys: {
      tier: ['神兽', '凶兽', '神龙', '异鸟', '灵鸟'],
    }
  }

  return (
    <SubPageTemplate
      title="山海经异兽"
      subtitle="上古异兽，山海精灵，瑞兽呈祥，凶兽乱世"
      icon="🦎"
      colorRgb="132, 204, 22"
      parentPath="/huang2"
    >
      <SubPageSection title="🦁 异兽降服">
        <InfoCard glowIntensity={90} glowColor="132, 204, 22">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!taming && !tameResult ? (
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🦎</div>
                <h3 style={{ marginBottom: '1rem', color: '#84cc16' }}>入山寻异兽，收服为己用</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  选择一只山海经异兽，尝试将其收服！
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.75rem',
                  maxWidth: 700,
                  margin: '0 auto'
                }}>
                  {STRANGE_BEASTS.map((beast) => (
                    <motion.div
                      key={beast.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startTaming(beast)}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${beast.color}20, rgba(40, 40, 50, 0.9))`,
                        border: `1px solid ${beast.color}50`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>{beast.icon}</div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 600, color: beast.color, marginBottom: '0.15rem' }}>
                        {beast.name}
                      </div>
                      <div style={{ fontSize: '0.55rem', opacity: 0.6 }}>{beast.tier} · 危险 {beast.danger}%</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : taming ? (
              <div>
                <motion.div
                  animate={{
                    scale: [1, 1.15, 0.95, 1.1, 1],
                    rotate: [0, 3, -3, 5, -5, 0],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  {selectedBeast?.icon}
                </motion.div>
                <h3 style={{ marginBottom: '0.5rem', color: selectedBeast?.color }}>
                  正在降服：{selectedBeast?.name}
                </h3>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#84cc16'
                }}>
                  【{TAMING_STEPS[tameStep]}】
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1rem' }}>
                  <div style={{ textAlign: 'left', fontSize: '0.8rem', marginBottom: '0.25rem', color: '#84cc16' }}>
                    💖 亲密度：{Math.round(friendship)}%
                  </div>
                  <ProgressBar value={friendship} color="#84cc16" />
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  <ProgressBar value={tameProgress} color={selectedBeast?.color || '#84cc16'} />
                </div>
              </div>
            ) : tameResult ? (
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
                    {tameResult.success ? selectedBeast?.icon : '💨'}
                  </motion.div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    color: tameResult.success ? '#22c55e' : '#ef4444',
                    fontWeight: 700
                  }}>
                    {tameResult.success ? '异兽降服成功！' : '降服失败！异兽逃走！'}
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: selectedBeast?.color,
                    marginBottom: '0.5rem'
                  }}>
                    {selectedBeast?.name} - {selectedBeast?.tier}
                  </p>
                  <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                    {tameResult.msg}
                  </p>
                  {tameResult.success && (
                    <div style={{ color: '#84cc16', marginBottom: '1rem' }}>
                      🎖️ 获得神通：{selectedBeast?.ability}
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTameResult(null)}
                    style={{
                      padding: '0.8rem 2rem',
                      background: 'rgba(132, 204, 22, 0.2)',
                      border: '1px solid #84cc16',
                      borderRadius: '50px',
                      color: '#84cc16',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    🦁 降服另一只异兽
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="📜 山海经异兽录">
        <FilterBar
          data={STRANGE_BEASTS}
          onFiltered={handleBeastFilter}
          options={beastFilters}
          placeholder="搜索异兽名称、地点、等级、能力..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredBeasts.map((beast, idx) => (
            <motion.div key={beast.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                glowColor={beast.color.replace('#', '')}
                glowIntensity={80}
                onClick={() => setExpandedBeast(expandedBeast === beast.name ? null : beast.name)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{beast.icon}</span>
                      <div>
                        <h4 className="font-bold" style={{ color: beast.color }}>{beast.name}</h4>
                        <p className="text-xs text-gray-500">📍 {beast.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs" style={{ 
                        color: beast.tier.includes('神') || beast.tier.includes('灵') ? '#22c55e' : '#ef4444' 
                      }}>
                        {beast.tier}
                      </div>
                      <div className="text-xs text-red-400">
                        危险度 {beast.danger}%
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{beast.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `rgba(${beast.color.replace('#', '')}, 0.15)`, color: beast.color }}>
                      🎖️ {beast.ability.split('、')[0]}
                    </span>
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedBeast === beast.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedBeast === beast.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-700/50 space-y-3 mt-3">
                        <p className="text-sm text-gray-300">{beast.detail}</p>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span style={{ color: beast.color }}>📏 形象：</span>
                            <span className="text-gray-300">{beast.appearance}</span>
                          </div>
                          <div>
                            <span style={{ color: beast.color }}>📜 传说：</span>
                            <span className="text-gray-300">{beast.legend}</span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => { e.stopPropagation(); startTaming(beast); }}
                          className="w-full py-2 rounded-lg font-bold text-white"
                          style={{ background: `linear-gradient(90deg, ${beast.color}, ${beast.color}99)` }}
                        >
                          🦁 尝试降服这只异兽
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