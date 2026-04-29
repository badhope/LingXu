'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface SpaceCrack {
  name: string
  location: string
  size: string
  stability: number
  age: string
  danger: number
  feature: string
  desc: string
  detail: string
  connectsTo: string[]
  creatures: string[]
  treasures: string[]
  famousEvents: string[]
  color: string
  icon: string
}

const SPACE_CRACKS: SpaceCrack[] = [
  {
    name: '归墟裂缝',
    location: '东海之底',
    size: '方圆万里',
    stability: 70,
    age: '开天即有',
    danger: 85,
    feature: '万水归宗，无底深渊',
    desc: '东海深处的上古裂缝，连接着无尽虚空。',
    detail: '归墟裂缝乃是盘古开天之时就已存在的上古裂缝，位于东海之底，万水最终都流入这里。裂缝深处连接着虚空，里面住着无数上古异种，还有失落的文明遗迹。据说归墟的最深处，便是另一个宇宙的入口。',
    connectsTo: ['虚空', '另一个宇宙', '失落的文明', '龙宫秘境'],
    creatures: ['虚空巨兽', '归墟鲛人', '上古海怪', '时空蜉蝣'],
    treasures: ['归墟之水', '虚空晶石', '上古遗骸', '失落神器'],
    famousEvents: ['共工怒撞不周山', '女娲补天', '精卫填海'],
    color: '#0891b2',
    icon: '🌊'
  },
  {
    name: '不周山裂缝',
    location: '洪荒中心',
    size: '横贯天际',
    stability: 30,
    age: '巫妖大战后',
    danger: 95,
    feature: '天柱崩塌，时空错乱',
    desc: '共工怒撞不周山后留下的巨大裂缝，时空极度混乱。',
    detail: '当年共工怒撞不周山，天柱崩塌，天破地裂，留下了这道横贯天际的巨大裂缝。裂缝之中时空极度混乱，进去的人十死无生。有人说在这里看到了过去，有人说在这里看到了未来，还有人永远地消失在了时间长河之中。',
    connectsTo: ['过去', '未来', '平行世界', '混沌边缘'],
    creatures: ['时空异兽', '盘古残影', '混沌生物', '时间蠕虫'],
    treasures: ['盘古精血', '天柱残骸', '时空碎片', '光阴沙'],
    famousEvents: ['共工怒撞不周山', '女娲补天', '巫妖大战'],
    color: '#7c3aed',
    icon: '🏔️'
  },
  {
    name: '轮回裂缝',
    location: '幽冥深处',
    size: '不可测量',
    stability: 90,
    age: '后土化轮回后',
    danger: 40,
    feature: '生死之间，轮回之路',
    desc: '连接生与死的裂缝，每个灵魂的必经之路。',
    detail: '轮回裂缝位于幽冥深处，是生与死的边界。每个死去的灵魂，都必须通过这道裂缝才能进入轮回。裂缝的另一边，便是奈何桥和孟婆汤。但也有大法力之人，可以逆行裂缝，从冥界返回人间，叫做死而复生。',
    connectsTo: ['人间界', '幽冥界', '轮回', '彼岸'],
    creatures: ['幽魂', '夜叉', '罗刹', '勾魂使者'],
    treasures: ['灵魂碎片', '记忆水晶', '轮回之力', '三生石粉'],
    famousEvents: ['后土化轮回', '孙悟空大闹地府', '沉香救母'],
    color: '#57534e',
    icon: '💀'
  },
  {
    name: '封禅台裂缝',
    location: '泰山之巅',
    size: '祭坛大小',
    stability: 60,
    age: '上古',
    danger: 50,
    feature: '人皇祭天，沟通上天',
    desc: '历代帝王封禅祭天之处，连接人间与天庭。',
    detail: '封禅台裂缝位于泰山之巅，是历代人皇祭天之处。每逢盛世，有德之君便会来此封禅祭天，沟通上天。祭祀之时，裂缝便会打开，天庭降下祥瑞。但若是无道昏君来此，裂缝便会降下天罚。',
    connectsTo: ['天庭', '气运长河', '人间龙脉', '历代人皇英灵'],
    creatures: ['天官', '气运金龙', '历代人皇英灵', '天书使者'],
    treasures: ['气运', '天命', '人皇功德', '天书碎片'],
    famousEvents: ['秦始皇封禅', '汉武帝封禅', '唐太宗封禅'],
    color: '#fbbf24',
    icon: '⛰️'
  },
  {
    name: '封神台裂缝',
    location: '西岐',
    size: '战场大小',
    stability: 50,
    age: '封神之战后',
    danger: 75,
    feature: '榜上山神，打神鞭下',
    desc: '姜子牙封神之处，至今仍有杀伐之气。',
    detail: '封神台裂缝乃是当年姜子牙封神的地方，三百六十五路正神在此归位。至今此处仍有无穷的杀伐之气，还有无数战死的怨魂。每逢阴雨天，便能听到当年战场的厮杀之声，鬼哭神嚎。',
    connectsTo: ['封神榜', '打神鞭空间', '战死怨魂', '天庭'],
    creatures: ['战魂', '天兵', '神将', '榜上诸神'],
    treasures: ['封神榜碎片', '打神鞭残威', '神将战魂', '商周古物'],
    famousEvents: ['姜子牙封神', '武王伐纣', '截教覆灭'],
    color: '#ef4444',
    icon: '📜'
  },
  {
    name: '花果山裂缝',
    location: '东胜神洲',
    size: '山洞大小',
    stability: 80,
    age: '开天辟地时',
    danger: 20,
    feature: '灵石所化，美猴王诞生之地',
    desc: '孙悟空的老家，水帘洞后的神秘裂缝。',
    detail: '花果山裂缝位于水帘洞之后，当年孙悟空就是顺着这条裂缝，漂洋过海去拜师学艺。裂缝之内别有洞天，藏着无数的宝藏和秘密。据说在最深处，还能找到菩提老祖留下的遗迹。',
    connectsTo: ['灵台方寸山', '东海龙宫', '西天灵山', '平行世界'],
    creatures: ['猴子猴孙', '妖王', '七十二洞主', '齐天大圣残影'],
    treasures: ['花果山仙酒', '仙桃', '金箍棒碎片', '七十二变残卷'],
    famousEvents: ['孙悟空出世', '大闹天宫', '西天取经'],
    color: '#22c55e',
    icon: '🐵'
  },
  {
    name: '楼兰古国裂缝',
    location: '西域沙漠',
    size: '一国大小',
    stability: 40,
    age: '汉代',
    danger: 65,
    feature: '一夜消失的古国',
    desc: '楼兰古国一夜消失，留下的神秘裂缝。',
    detail: '楼兰古国曾经是西域最繁华的国度，但一夜之间突然消失，只留下了这道神秘的裂缝。有人说他们搬进了另一个空间，有人说他们被虚空吞噬，还有人说他们被仙人接引升天了。至今无人知道真相。',
    connectsTo: ['异空间', '沙漠深处', '西域三十六国', '未知文明'],
    creatures: ['沙漠死神', '楼兰鬼魂', '西域精怪', '沙虫'],
    treasures: ['楼兰宝藏', '沙漠之心', '古老经文', '时空罗盘'],
    famousEvents: ['楼兰消失之谜', '张骞通西域', '丝绸之路'],
    color: '#f97316',
    icon: '🏜️'
  },
  {
    name: '百慕大裂缝',
    location: '大西洋',
    size: '三角海域',
    stability: 15,
    age: '未知',
    danger: 90,
    feature: '魔鬼三角，有去无回',
    desc: '神秘的魔鬼三角，无数船只飞机在此失踪。',
    detail: '百慕大裂缝是地球上最神秘的裂缝之一，无数的船只和飞机在这里神秘失踪。有人说这里连接着外星人的基地，有人说这里是时间机器的入口，还有人说这里通往亚特兰蒂斯。至今无人能活着回来讲述里面的真相。',
    connectsTo: ['外星人基地', '时间隧道', '亚特兰蒂斯', '平行宇宙'],
    creatures: ['未知生物', '海底人', '外星人', '幽灵船'],
    treasures: ['外星科技', '亚特兰蒂斯遗迹', '时光机器', '神秘能量'],
    famousEvents: ['无数失踪事件', '亚特兰蒂斯传说', 'UFO目击'],
    color: '#1e40af',
    icon: '🔺'
  }
]

const ROAMING_STEPS = [
  '踏入裂缝',
  '空间扭曲',
  '时空乱流',
  '遭遇异兽',
  '发现遗迹',
  '获取宝藏',
  '迷失方向',
  '找到出口'
]

export default function CrackPage() {
  const [filteredCracks, setFilteredCracks] = useState(SPACE_CRACKS)
  const [expandedCrack, setExpandedCrack] = useState<string | null>(null)
  const [roaming, setRoaming] = useState(false)
  const [selectedCrack, setSelectedCrack] = useState<SpaceCrack | null>(null)
  const [roamStep, setRoamStep] = useState(0)
  const [roamProgress, setRoamProgress] = useState(0)
  const [loot, setLoot] = useState<string[]>([])
  const [roamResult, setRoamResult] = useState<{ success: boolean; msg: string } | null>(null)

  const startRoaming = useCallback((crack: SpaceCrack) => {
    setSelectedCrack(crack)
    setRoaming(true)
    setRoamStep(0)
    setRoamProgress(0)
    setLoot([])
    setRoamResult(null)

    let step = 0
    let progress = 0
    const found: string[] = []
    const maxStep = Math.min(crack.danger / 12.5, 8)

    const interval = setInterval(() => {
      progress += Math.random() * 3 + 0.5

      if (Math.random() > crack.stability / 100 + 0.2 && step > 3) {
        clearInterval(interval)
        setTimeout(() => {
          setRoamResult({ success: false, msg: '空间乱流加剧！被抛出了裂缝，掉落在了未知的时间线...' })
          setRoaming(false)
        }, 500)
        return
      }

      if (Math.random() > 0.8) {
        const item = crack.treasures[Math.floor(Math.random() * crack.treasures.length)]
        if (!found.includes(item) && found.length < 3) {
          found.push(item)
          setLoot([...found])
        }
      }

      if (progress >= 100 && step < maxStep - 1) {
        progress = 0
        step++
        setRoamStep(step)
      }
      if (step >= maxStep - 1 && progress >= 100) {
        clearInterval(interval)
        setRoamProgress(100)
        setTimeout(() => {
          setRoamResult({ success: true, msg: `漫游成功！穿越了【${crack.name}】，满载而归！` })
          setRoaming(false)
        }, 800)
        return
      }
      setRoamProgress(Math.min(progress, 100))
    }, 90)
  }, [])

  const handleCrackFilter = useCallback((data: typeof SPACE_CRACKS) => {
    setFilteredCracks(data)
  }, [])

  const crackFilters = {
    searchKeys: ['name', 'location', 'feature', 'desc', 'detail', 'connectsTo', 'famousEvents'],
    filterKeys: {
      danger: ['安全 (<30%)', '中等 (30-60%)', '危险 (60-90%)', '极度危险 (>90%)'],
    }
  }

  return (
    <SubPageTemplate
      title="空间裂缝"
      subtitle="次元裂缝，虚空漫游，穿越未知世界"
      icon="⚡"
      colorRgb="239, 68, 68"
    >
      <SubPageSection title="🌀 虚空漫游入口">
        <InfoCard glowIntensity={90} glowColor="239, 68, 68">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!roaming && !roamResult ? (
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚡</div>
                <h3 style={{ marginBottom: '1rem', color: '#ef4444' }}>空间撕裂，虚空漫游</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  选择一道裂缝，开启你的虚空漫游（危险！九死一生！）
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  maxWidth: 700,
                  margin: '0 auto'
                }}>
                  {SPACE_CRACKS.slice(0, 8).map((crack) => (
                    <motion.div
                      key={crack.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startRoaming(crack)}
                      style={{
                        padding: '1rem 0.75rem',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${crack.color}20, rgba(40, 40, 50, 0.9))`,
                        border: `1px solid ${crack.color}50`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{crack.icon}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: crack.color, marginBottom: '0.25rem' }}>
                        {crack.name}
                      </div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>危险 {crack.danger}%</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : roaming ? (
              <div>
                <motion.div
                  animate={{
                    x: [0, 10, -10, 0],
                    y: [0, 5, -5, 0],
                    rotate: [0, 2, -2, 0],
                    scale: [1, 1.1, 0.9, 1]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  🌀
                </motion.div>
                <h3 style={{ marginBottom: '0.5rem', color: selectedCrack?.color }}>
                  虚空漫游中：{selectedCrack?.name}
                </h3>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#ef4444'
                }}>
                  【{ROAMING_STEPS[roamStep]}】
                </div>

                {loot.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ color: '#fbbf24', fontSize: '0.9rem' }}>💎 意外收获：</span>
                    {loot.map((l, i) => (
                      <span key={i} style={{ color: '#fbbf24', fontSize: '0.8rem', margin: '0 0.3rem' }}>
                        【{l}】
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  <ProgressBar value={roamProgress} color={selectedCrack?.color || '#ef4444'} />
                </div>

                <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                  裂缝稳定度：{selectedCrack?.stability}% · 警告：空间随时可能崩塌！
                </div>
              </div>
            ) : roamResult ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    animate={roamResult.success ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 360],
                    } : {
                      x: [0, 10, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ fontSize: '5rem', marginBottom: '1rem' }}
                  >
                    {roamResult.success ? '✨' : '💫'}
                  </motion.div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    color: roamResult.success ? '#22c55e' : '#f59e0b',
                    fontWeight: 700
                  }}>
                    {roamResult.success ? '漫游成功！' : '空间崩塌！'}
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: selectedCrack?.color,
                    marginBottom: '0.5rem'
                  }}>
                    {selectedCrack?.name}
                  </p>
                  {loot.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ color: '#fbbf24' }}>💎 虚空收获：</span>
                      {loot.map((l, i) => (
                        <span key={i} style={{ color: '#fbbf24', margin: '0 0.3rem' }}>
                          【{l}】
                        </span>
                      ))}
                    </div>
                  )}
                  <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                    {roamResult.msg}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRoamResult(null)}
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
                    ⚡ 再次冒险
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="🌌 空间裂缝档案">
        <FilterBar
          data={SPACE_CRACKS}
          onFiltered={handleCrackFilter}
          options={crackFilters}
          placeholder="搜索裂缝名称、地点、连接世界、历史事件..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCracks.map((crack, idx) => (
            <motion.div key={crack.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                glowColor={crack.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedCrack(expandedCrack === crack.name ? null : crack.name)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{crack.icon}</span>
                      <div>
                        <h4 className="font-bold" style={{ color: crack.color }}>{crack.name}</h4>
                        <p className="text-xs text-gray-500">{crack.location} · {crack.size} · {crack.age}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs" style={{ color: crack.danger > 70 ? '#ef4444' : crack.danger > 40 ? '#f59e0b' : '#22c55e' }}>
                        危险度 {crack.danger}%
                      </div>
                      <div className="text-xs text-cyan-400">稳定 {crack.stability}%</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{crack.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {crack.connectsTo.slice(0, 4).map((c) => (
                      <span key={c} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
                        🔗 {c}
                      </span>
                    ))}
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedCrack === crack.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedCrack === crack.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-700/50 space-y-3 mt-3">
                        <p className="text-sm text-gray-300">{crack.detail}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-red-400 text-xs">👹 栖息生物：</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {crack.creatures.map((cr) => (
                                <span key={cr} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
                                  {cr}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-amber-400 text-xs">💎 可能宝物：</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {crack.treasures.map((t) => (
                                <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => { e.stopPropagation(); startRoaming(crack); }}
                          className="w-full py-2 rounded-lg font-bold text-white"
                          style={{ background: `linear-gradient(90deg, ${crack.color}, ${crack.color}99)` }}
                        >
                          ⚡ 进入裂缝虚空漫游（危险！）
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