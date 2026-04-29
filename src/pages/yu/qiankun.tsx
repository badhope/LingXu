'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface StorageItem {
  name: string
  tier: string
  space: number
  creator: string
  timeStop: boolean
  livingCreature: boolean
  feature: string
  desc: string
  detail: string
  materials: string[]
  famousOwners: string[]
  storedItems: string[]
  rarity: string
  color: string
  icon: string
}

const STORAGE_ITEMS: StorageItem[] = [
  {
    name: '乾坤鼎',
    tier: 'SSS级',
    space: Infinity,
    creator: '盘古大神',
    timeStop: true,
    livingCreature: true,
    feature: '开天至宝，炼化万物',
    desc: '盘古开天至宝，可炼化万物，重炼地水火风。',
    detail: '乾坤鼎乃是盘古开天之时就存在的混沌至宝，空间无穷无尽，可容三千大世界。鼎内时间静止，放入的物品永远不会变质。更神奇的是，乾坤鼎可以容纳活物，甚至自成一界。此鼎最强大的功能是炼化万物，返本归元，提升宝物品质。',
    materials: ['混沌之气', '盘古精血', '地水火风', '造化玉蝶残片'],
    famousOwners: ['盘古大神', '鸿钧老祖', '女娲娘娘', '老子'],
    storedItems: ['盘古真身残骸', '混沌魔神尸体', '先天灵宝无数', '三千大道碎片'],
    rarity: '混沌至宝',
    color: '#7c3aed',
    icon: '🏺'
  },
  {
    name: '太极图',
    tier: 'SSS级',
    space: Infinity,
    creator: '盘古大神',
    timeStop: true,
    livingCreature: true,
    feature: '定地水火风，化包罗万象',
    desc: '太清圣人证道至宝，包罗万象，防御无双。',
    detail: '太极图乃是盘古开天斧斧背所化，是太清圣人老子的证道至宝。此图展开便是一方世界，内有金桥，渡万物，镇压气运。图内时间空间由主人掌控，一念之间便可改变。当年老子便是用此图将九曲黄河阵轻松破去。',
    materials: ['开天斧斧背', '混沌之气', '太清仙气', '盘古开天功德'],
    famousOwners: ['盘古大神', '鸿钧老祖', '太上老君'],
    storedItems: ['太清仙丹无数', '八景宫灯', '扁拐', '太极金桥'],
    rarity: '先天至宝',
    color: '#fbbf24',
    icon: '☯️'
  },
  {
    name: '诛仙阵图',
    tier: 'SS级',
    space: 1000000,
    creator: '罗睺魔神',
    timeStop: false,
    livingCreature: true,
    feature: '天道第一杀阵',
    desc: '诛仙四剑之阵图，内含无穷杀运。',
    detail: '诛仙阵图乃是罗睺魔神结合诛仙四剑所创，内含天道第一杀运。阵图之内自成一界，凡是入内者都会被无穷杀气侵蚀。阵图之中可以容纳无数兵马，当年通天教主便是以此图布下诛仙剑阵，单挑四大圣人而不落下风。',
    materials: ['魔神精血', '无穷杀运', '诛仙四剑', '破灭法则'],
    famousOwners: ['罗睺魔神', '鸿钧老祖', '通天教主'],
    storedItems: ['诛仙剑', '戮仙剑', '陷仙剑', '绝仙剑', '截教弟子'],
    rarity: '先天至宝',
    color: '#ef4444',
    icon: '⚔️'
  },
  {
    name: '乾坤袋',
    tier: 'A级',
    space: 1000,
    creator: '弥勒佛',
    timeStop: false,
    livingCreature: true,
    feature: '开口便笑，笑天下可笑之人',
    desc: '弥勒佛的法宝，可装天装地。',
    detail: '乾坤袋乃是弥勒佛的随身法宝，别看只是一个小小的布袋子，里面空间大得惊人。当年黄眉老怪便是用此袋子装走了唐僧师徒和二十八星宿。只要对方不反抗，多大的东西都能装进去。开口便笑，笑世间可笑之人；大肚能容，容天下难容之事。',
    materials: ['西天布帛', '佛光加持', '愿力凝聚', '金钹碎片'],
    famousOwners: ['弥勒佛', '黄眉老怪'],
    storedItems: ['唐僧师徒', '二十八星宿', '金钹', '狼牙棒'],
    rarity: '后天功德至宝',
    color: '#fbbf24',
    icon: '👝'
  },
  {
    name: '芥子袋',
    tier: 'B级',
    space: 100,
    creator: '散仙修士',
    timeStop: false,
    livingCreature: false,
    feature: '须弥藏芥子，芥子纳须弥',
    desc: '修真界最常用的储物袋，容量不大但胜在方便。',
    detail: '芥子袋乃是修真界最常用的储物法宝，每个修士人手一个。制作简单，成本低廉，只要会点空间法术就能制作。容量不大，一般只有百十立方，但胜在方便，挂在腰间谁也看不出。里面时间不静止，放久了东西还是会坏的。',
    materials: ['妖兽皮', '空间晶石', '低级阵法', '修士精血'],
    famousOwners: ['每个修真者', '散仙', '江湖侠客'],
    storedItems: ['丹药', '灵石', '飞剑', '符箓', '干粮'],
    rarity: '普通法器',
    color: '#78716c',
    icon: '👛'
  },
  {
    name: '纳戒',
    tier: 'C级',
    space: 10,
    creator: '炼器师',
    timeStop: false,
    livingCreature: false,
    feature: '戴在手上，无人知晓',
    desc: '最低级的空间戒指，新手村必备。',
    detail: '纳戒乃是最低级的空间装备，新手修士的第一个储物法宝。容量极小，一般也就十来个立方，但胜在隐蔽，戴在手指上谁也看不出。一般只能放点丹药灵石，装不下大件。价格便宜，是个修士就能买得起。',
    materials: ['精铁', '空间碎片', '最低级阵纹', '少量灵力'],
    famousOwners: ['新手修士', '凡人武者', '江湖浪子'],
    storedItems: ['碎银', '金疮药', '兵器', '暗器'],
    rarity: '普通法器',
    color: '#a1a1aa',
    icon: '💍'
  },
  {
    name: '袖里乾坤',
    tier: 'S级',
    space: 10000,
    creator: '镇元子',
    timeStop: false,
    livingCreature: true,
    feature: '袖里乾坤大，壶中日月长',
    desc: '地仙之祖的神通，一袖子卷走万物。',
    detail: '袖里乾坤不是法宝，而是地仙之祖镇元子的独门神通。只要袖子一甩，无论多少人多少法宝，都能被卷进去。当年唐僧师徒路过五庄观，孙悟空请来满天神佛，被镇元子一袖子全部卷走，无人能敌。这就是袖里乾坤的厉害。',
    materials: ['无边法力', '空间法则', '地仙功德'],
    famousOwners: ['镇元子', '菩提老祖', '散仙之祖'],
    storedItems: ['唐僧师徒', '孙悟空', '满天神佛', '人参果树'],
    rarity: '大神通',
    color: '#22c55e',
    icon: '👘'
  },
  {
    name: '掌中佛国',
    tier: 'SS级',
    space: 100000,
    creator: '如来佛祖',
    timeStop: true,
    livingCreature: true,
    feature: '一花一世界，一叶一菩提',
    desc: '佛祖的大神通，手掌便是一整个佛国。',
    detail: '掌中佛国是如来佛祖的大神通，一花一世界，一叶一菩提。当年孙悟空一个筋斗云十万八千里，也没有翻出如来佛祖的手掌心。因为那根本不是手掌，而是一整个佛国世界，无边无际。任你天大的本事，也逃不出佛国的范围。',
    materials: ['无边佛力', '众生愿力', '恒河沙数', '西方功德'],
    famousOwners: ['如来佛祖', '接引道人', '准提道人'],
    storedItems: ['孙悟空', '恒河沙数诸佛', '三千罗汉', '极乐世界'],
    rarity: '无上神通',
    color: '#fbbf24',
    icon: '🖐️'
  }
]

const REFINING_STEPS = [
  '准备材料',
  '刻画空间阵纹',
  '融入空间晶石',
  '开辟内空间',
  '稳定空间壁垒',
  '注入神识印记',
  '炼制器胚',
  '空间成型'
]

export default function QianKunPage() {
  const [filteredItems, setFilteredItems] = useState(STORAGE_ITEMS)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [refining, setRefining] = useState(false)
  const [selectedItem, setSelectedItem] = useState<StorageItem | null>(null)
  const [refineStep, setRefineStep] = useState(0)
  const [refineProgress, setRefineProgress] = useState(0)
  const [capacity, setCapacity] = useState(0)
  const [refineResult, setRefineResult] = useState<boolean | null>(null)

  const startRefining = useCallback((item: StorageItem) => {
    setSelectedItem(item)
    setRefining(true)
    setRefineStep(0)
    setRefineProgress(0)
    setCapacity(0)
    setRefineResult(null)

    let step = 0
    let progress = 0
    const maxStep = Math.min(item.space / 125000, 8)

    const interval = setInterval(() => {
      progress += Math.random() * 3 + 0.5
      if (progress >= 100 && step < maxStep - 1) {
        progress = 0
        step++
        setRefineStep(step)
        setCapacity(Math.floor((step / (maxStep - 1)) * (item.space === Infinity ? 999999 : item.space)))
      }
      if (step >= maxStep - 1 && progress >= 100) {
        clearInterval(interval)
        setRefineProgress(100)
        setCapacity(item.space === Infinity ? 999999 : item.space)
        setTimeout(() => {
          setRefineResult(true)
          setRefining(false)
        }, 800)
        return
      }
      setRefineProgress(Math.min(progress, 100))
    }, 75)
  }, [])

  const handleItemFilter = useCallback((data: typeof STORAGE_ITEMS) => {
    setFilteredItems(data)
  }, [])

  const itemFilters = {
    searchKeys: ['name', 'creator', 'feature', 'desc', 'detail', 'famousOwners', 'storedItems'],
    filterKeys: {
      tier: ['SSS级', 'SS级', 'S级', 'A级', 'B级', 'C级'],
    }
  }

  return (
    <SubPageTemplate
      title="乾坤储物"
      subtitle="须弥藏芥子，芥子纳须弥，空间法宝大全"
      icon="👝"
      colorRgb="245, 158, 11"
    >
      <SubPageSection title="🏺 空间法宝炼制台">
        <InfoCard glowIntensity={90} glowColor="245, 158, 11">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!refining && !refineResult ? (
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏺</div>
                <h3 style={{ marginBottom: '1rem', color: '#f59e0b' }}>须弥藏芥子，芥子纳须弥</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  选择一件空间法宝，模拟炼制过程
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  maxWidth: 700,
                  margin: '0 auto'
                }}>
                  {STORAGE_ITEMS.slice(0, 8).map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startRefining(item)}
                      style={{
                        padding: '1rem 0.75rem',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${item.color}20, rgba(40, 40, 50, 0.9))`,
                        border: `1px solid ${item.color}50`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: item.color, marginBottom: '0.25rem' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>{item.rarity}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : refining ? (
              <div>
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  {selectedItem?.icon}
                </motion.div>
                <h3 style={{ marginBottom: '0.5rem', color: selectedItem?.color }}>
                  正在炼制：{selectedItem?.name}
                </h3>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#f59e0b'
                }}>
                  【{REFINING_STEPS[refineStep]}】
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1rem' }}>
                  <div style={{ textAlign: 'left', fontSize: '0.8rem', marginBottom: '0.25rem', color: '#f59e0b' }}>
                    📦 空间容量：{capacity === 999999 ? '∞ 无限' : capacity + ' 立方'}
                  </div>
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  <ProgressBar value={refineProgress} color={selectedItem?.color || '#f59e0b'} />
                </div>
              </div>
            ) : refineResult ? (
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
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ fontSize: '5rem', marginBottom: '1rem' }}
                  >
                    {selectedItem?.icon}
                  </motion.div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    color: selectedItem?.color,
                    fontWeight: 700
                  }}>
                    炼制成功！空间开辟完成！
                  </h2>
                  <p style={{
                    fontSize: '1.3rem',
                    color: selectedItem?.color,
                    marginBottom: '0.5rem',
                    fontWeight: 700
                  }}>
                    {selectedItem?.name} - {selectedItem?.feature}
                  </p>
                  <div style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>
                    📦 空间容量：{selectedItem?.space === Infinity ? '∞ 无限大' : selectedItem?.space + ' 立方'}
                  </div>
                  <div style={{ color: '#22c55e', marginBottom: '0.5rem' }}>
                    ⏱️ 时间静止：{selectedItem?.timeStop ? '✓ 支持' : '✗ 不支持'}
                  </div>
                  <div style={{ color: '#3b82f6', marginBottom: '2rem' }}>
                    🐉 容纳活物：{selectedItem?.livingCreature ? '✓ 支持' : '✗ 不支持'}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRefineResult(null)}
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
                    🏺 再炼一件
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="👝 空间法宝百科">
        <FilterBar
          data={STORAGE_ITEMS}
          onFiltered={handleItemFilter}
          options={itemFilters}
          placeholder="搜索法宝名称、主人、材料..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                glowColor={item.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedItem(expandedItem === item.name ? null : item.name)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <h4 className="font-bold" style={{ color: item.color }}>{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.tier} · {item.rarity} · {item.creator}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-amber-400">
                        容量：{item.space === Infinity ? '∞' : item.space}
                      </div>
                      <div className="text-xs text-green-400">
                        {item.timeStop && '⏱️时停 '}{item.livingCreature && '🐉活物'}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.famousOwners.slice(0, 4).map((o) => (
                      <span key={o} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                        👤 {o}
                      </span>
                    ))}
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedItem === item.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedItem === item.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-700/50 space-y-3 mt-3">
                        <p className="text-sm text-gray-300">{item.detail}</p>
                        <div>
                          <span className="text-purple-400 text-xs">💎 炼制材料：</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.materials.map((m) => (
                              <span key={m} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => { e.stopPropagation(); startRefining(item); }}
                          className="w-full py-2 rounded-lg font-bold text-white"
                          style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}99)` }}
                        >
                          🏺 模拟炼制此法宝
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