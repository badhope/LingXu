'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface SecretRealm {
  name: string
  tier: string
  level: number
  era: string
  location: string
  danger: number
  treasureLevel: number
  feature: string
  desc: string
  detail: string
  boss: string
  treasures: string[]
  trials: string[]
  entryCondition: string
  famousExplorers: string[]
  category: string
  color: string
  icon: string
}

interface Exploration {
  step: number
  event: string
  found: string[]
  hp: number
  completed: boolean
}

const SECRET_REALMS: SecretRealm[] = [
  {
    name: '不周山秘境',
    tier: 'SSS级',
    level: 99,
    era: '太古',
    location: '洪荒中心',
    danger: 95,
    treasureLevel: 100,
    feature: '天柱残骸，盘古遗泽',
    category: '上古遗迹',
    desc: '共工怒撞不周山后遗留的秘境，藏有盘古精血与天柱残骸。',
    detail: '不周山本是洪荒天柱，连接天地。巫妖大战中，共工怒撞不周山，天柱崩塌，天破地裂。残余的山体化为秘境，藏有盘古精血与先天灵宝。秘境入口极其隐蔽，唯有大功德之人方能进入。秘境之内重力是外界的百倍，寻常金仙也寸步难行。',
    boss: '不周山守护神龙',
    treasures: ['盘古精血', '造化玉蝶残片', '不周山残片', '先天壬水', '戊土杏黄旗'],
    trials: ['百倍重力考验', '盘古威压考验', '护山大阵', '龙魂试炼'],
    entryCondition: '大功德加身，圣人之下实力',
    famousExplorers: ['女娲娘娘', '三清', '十二祖巫'],
    color: '#7c3aed',
    icon: '🏔️'
  },
  {
    name: '血海秘境',
    tier: 'SS级',
    level: 90,
    era: '开天之初',
    location: '幽冥深处',
    danger: 90,
    treasureLevel: 88,
    feature: '盘古肚脐所化，冥河老巢',
    category: '幽冥秘境',
    desc: '盘古大神肚脐所化，幽冥血海，藏有冥河教主的全部宝藏。',
    detail: '血海秘境乃是盘古大神肚脐所化，无边无际，孕育了冥河教主。血海之中血神子无穷无尽，更有元屠、阿鼻两大杀剑。秘境深处藏有冥河教主收藏亿万年的宝藏，以及修罗族的传承。想要探索血海秘境，需要抵抗无穷无尽的血神子攻击。',
    boss: '冥河教主分身',
    treasures: ['元屠剑', '阿鼻剑', '修罗血脉', '血神经', '十二品业火红莲'],
    trials: ['血神子潮', '业火焚身', '心魔考验', '冥河分身'],
    entryCondition: '业力深厚，或者功德护体',
    famousExplorers: ['冥河教主', '后土娘娘', '地藏王菩萨'],
    color: '#dc2626',
    icon: '🩸'
  },
  {
    name: '昆仑秘境',
    tier: 'SS级',
    level: 88,
    era: '洪荒初年',
    location: '西昆仑',
    danger: 75,
    treasureLevel: 95,
    feature: '西王母道场，女仙之首',
    category: '仙山洞府',
    desc: '西王母所居之地，蟠桃园所在，女仙朝圣之地。',
    detail: '昆仑秘境是西王母的道场，位于西昆仑之巅，云雾缭绕，凡人难以企及。秘境中有蟠桃园，三千年一开花，三千年一结果，吃了便能长生不老。秘境还有瑶池，饮瑶池之水可增万年道行。西王母掌有仙籍，管制女仙。',
    boss: '西王母',
    treasures: ['蟠桃', '瑶池仙水', '昆仑镜', '白虎玉佩', '素色云界旗'],
    trials: ['昆仑结界', '西王母考验', '女仙朝贺', '蟠桃大会'],
    entryCondition: '女仙，或者有女仙引荐',
    famousExplorers: ['周穆王', '汉武帝', '嫦娥', '七仙女'],
    color: '#f472b6',
    icon: '🏛️'
  },
  {
    name: '蓬莱仙岛',
    tier: 'S级',
    level: 82,
    era: '上古',
    location: '东海深处',
    danger: 60,
    treasureLevel: 90,
    feature: '海外三仙山之首，散仙圣地',
    category: '海外仙山',
    desc: '东海三仙山之首，无数散仙隐居之地，藏有无数仙丹妙药。',
    detail: '蓬莱仙岛是海外三仙山之首，漂浮于东海之上，随波逐流，凡人难以寻觅。岛上住着无数散仙，个个法力高强，逍遥自在。岛上有仙丹妙药，吃了便能得道成仙。还有无数奇花异草，珍禽异兽。',
    boss: '岛主东华帝君',
    treasures: ['九转金丹', '蓬莱仙草', '定海神针', '避水珠', '东华仙法'],
    trials: ['仙山迷阵', '散仙斗法', '东华帝君考验', '仙缘测试'],
    entryCondition: '有仙缘，能找到仙岛位置',
    famousExplorers: ['徐福', '八仙', '东华帝君', '海外散仙'],
    color: '#06b6d4',
    icon: '🏝️'
  },
  {
    name: '方寸山秘境',
    tier: 'S级',
    level: 85,
    era: '混沌开辟',
    location: '西牛贺洲',
    danger: 40,
    treasureLevel: 98,
    feature: '菩提老祖道场，西游源头',
    category: '隐世道场',
    desc: '菩提老祖隐居之地，孙悟空拜师学艺之处，神秘莫测。',
    detail: '方寸山秘境，斜月三星洞，菩提老祖隐居之地。老祖法力通天，知晓前后五百年，教化众生。秘境极其隐蔽，便是圣人也难以推算具体位置。孙悟空在此学得七十二变和筋斗云，成为齐天大圣。',
    boss: '菩提老祖',
    treasures: ['七十二变', '筋斗云', '鸿蒙紫气', '菩提心法', '无字天书'],
    trials: ['十年砍柴', '七年悟道', '三更传道', '出师考验'],
    entryCondition: '灵性非凡，与老祖有缘',
    famousExplorers: ['孙悟空', '樵夫', '方寸山弟子'],
    color: '#fbbf24',
    icon: '⭐'
  },
  {
    name: '火云洞秘境',
    tier: 'A级',
    level: 75,
    era: '人皇时期',
    location: '火云山中',
    danger: 30,
    treasureLevel: 85,
    feature: '三皇道场，人族圣地',
    category: '人族圣地',
    desc: '天地人三皇隐居之地，人族最高圣地，护佑人族气运。',
    detail: '火云洞秘境是人族最高圣地，天地人三皇——伏羲、神农、轩辕在此隐居，护佑人族气运。秘境之中有人族历代先贤的传承，以及人族气运加持。任何人族进入火云洞，修为都会提升。三皇不出火云洞，不干涉世事，但在人族有灭顶之灾时会出手。',
    boss: '三皇',
    treasures: ['人皇气运', '神农百草经', '伏羲八卦', '轩辕剑', '造人鞭'],
    trials: ['人族气运考验', '三皇问答', '先贤试炼', '护族誓言'],
    entryCondition: '人族血脉，为人族立下大功',
    famousExplorers: ['三皇五帝', '孔子', '老子', '诸子百家'],
    color: '#f97316',
    icon: '🔥'
  },
  {
    name: '东海龙宫',
    tier: 'A级',
    level: 65,
    era: '上古',
    location: '东海海底',
    danger: 50,
    treasureLevel: 80,
    feature: '龙王洞府，四海之宝汇聚',
    category: '水底龙宫',
    desc: '东海龙王敖广的宫殿，藏有四海之宝，定海神针在此。',
    detail: '东海龙宫是四海龙宫之首，水晶宫璀璨夺目，藏有四海龙族亿万年来收集的奇珍异宝。定海神针（如意金箍棒）便藏于此，后被孙悟空取走。龙宫还有避水珠、分水叉等水系至宝。龙宫虽不如上古秘境，但胜在宝物极多。',
    boss: '东海龙王敖广',
    treasures: ['定海神针', '避水珠', '龙宫战甲', '分水叉', '夜明珠'],
    trials: ['深海压力', '虾兵蟹将', '龙王考验', '水阵'],
    entryCondition: '避水法宝，或者龙族血脉',
    famousExplorers: ['孙悟空', '哪吒', '八仙', '龙族子弟'],
    color: '#2563eb',
    icon: '🐲'
  },
  {
    name: '九幽黄泉',
    tier: 'B级',
    level: 70,
    era: '巫妖大战后',
    location: '轮回入口',
    danger: 85,
    treasureLevel: 65,
    feature: '轮回入口，鬼魂归宿',
    category: '幽冥秘境',
    desc: '六道轮回的入口，人死后灵魂的归宿，地藏王菩萨道场。',
    detail: '九幽黄泉是幽冥地府的入口，过了鬼门关，踏上黄泉路，便到了奈何桥。孟婆熬制孟婆汤，过了桥便忘却前尘往事，进入轮回。秘境之中有十殿阎罗，审判鬼魂。地藏王菩萨在此发下宏愿：地狱不空，誓不成佛。',
    boss: '十殿阎罗',
    treasures: ['生死簿', '判官笔', '孟婆汤配方', '轮回之力', '地藏心经'],
    trials: ['黄泉路', '奈何桥', '三生石', '十殿审判'],
    entryCondition: '死了自然进去，或者有鬼门关令牌',
    famousExplorers: ['孙悟空', '地藏王', '十殿阎罗', '钟馗'],
    color: '#57534e',
    icon: '💀'
  },
  {
    name: '紫霞洞府',
    tier: 'B级',
    level: 55,
    era: '西游时期',
    location: '花果山',
    danger: 20,
    treasureLevel: 70,
    feature: '齐天大圣故居，猴子猴孙乐园',
    category: '妖王洞府',
    desc: '孙悟空的老家，花果山福地，水帘洞洞天。',
    detail: '紫霞洞府就是花果山的水帘洞，孙悟空的老家。当年孙悟空漂洋过海学得一身本领，回来后在此自立为王，号称齐天大圣。洞府之中有猴子猴孙无数，还有孙悟空当年从龙宫抢来的各种宝物。',
    boss: '美猴王',
    treasures: ['花果山仙酒', '仙桃', '水帘洞结界', '猴王传承', '金箍棒碎片'],
    trials: ['水帘洞瀑布', '猴子猴孙考验', '猴王传承'],
    entryCondition: '花果山猴子，或者孙悟空的朋友',
    famousExplorers: ['孙悟空', '牛魔王', '七十二洞妖王', '猪八戒'],
    color: '#22c55e',
    icon: '🐵'
  },
  {
    name: '灌江口',
    tier: 'C级',
    level: 45,
    era: '封神后',
    location: '人间界',
    danger: 35,
    treasureLevel: 55,
    feature: '二郎显圣真君道场，听调不听宣',
    category: '人间道场',
    desc: '二郎神杨戬的道场，梅山兄弟在此，听调不听宣。',
    detail: '灌江口是二郎神杨戬的道场，杨戬肉身成圣，劈山救母，担山赶日，法力高强。他还有梅山兄弟和一千二百草头神，实力雄厚。杨戬听调不听宣，就算是玉帝的旨意也要看心情接。灌江口虽在人间，但实力不弱于天庭。',
    boss: '二郎神杨戬',
    treasures: ['三尖两刃刀', '八九玄功', '哮天犬', '天眼', '七十三变'],
    trials: ['梅山七圣', '哮天犬', '杨戬考验', '天眼试炼'],
    entryCondition: '杨戬认可，或者有圣旨',
    famousExplorers: ['杨戬', '梅山七圣', '姜子牙', '沉香'],
    color: '#a78bfa',
    icon: '🐺'
  }
]

const EXPLORATION_EVENTS = [
  '踏入秘境入口，古老的气息扑面而来...',
  '沿途发现了前人留下的痕迹...',
  '遭遇秘境守护兽，正在激战！',
  '发现隐藏宝箱！',
  '触发了古老的陷阱！',
  '通过了第一道试炼！',
  '来到了秘境深处...',
  'BOSS出现！最终决战！'
]

export default function MiJingPage() {
  const [filteredRealms, setFilteredRealms] = useState(SECRET_REALMS)
  const [expandedRealm, setExpandedRealm] = useState<string | null>(null)
  const [exploring, setExploring] = useState(false)
  const [selectedRealm, setSelectedRealm] = useState<SecretRealm | null>(null)
  const [exploreStep, setExploreStep] = useState(0)
  const [exploreProgress, setExploreProgress] = useState(0)
  const [hp, setHp] = useState(100)
  const [founds, setFounds] = useState<string[]>([])
  const [exploreResult, setExploreResult] = useState<{ success: boolean; msg: string } | null>(null)

  const startExploration = useCallback((realm: SecretRealm) => {
    setSelectedRealm(realm)
    setExploring(true)
    setExploreStep(0)
    setExploreProgress(0)
    setHp(100)
    setFounds([])
    setExploreResult(null)

    let step = 0
    let progress = 0
    let health = 100
    const foundItems: string[] = []
    const maxStep = Math.min(realm.danger / 12, 8)

    const interval = setInterval(() => {
      progress += Math.random() * 3 + 0.5
      health -= Math.random() * realm.danger / 20

      if (Math.random() > 0.85 && realm.treasures.length > 0) {
        const item = realm.treasures[Math.floor(Math.random() * realm.treasures.length)]
        if (!foundItems.includes(item) && foundItems.length < 3) {
          foundItems.push(item)
          setFounds([...foundItems])
        }
      }

      if (health <= 0) {
        clearInterval(interval)
        setHp(0)
        setTimeout(() => {
          setExploreResult({ success: false, msg: '探索失败，身受重伤，狼狈逃出秘境...' })
          setExploring(false)
        }, 500)
        return
      }

      if (progress >= 100 && step < maxStep - 1) {
        progress = 0
        step++
        setExploreStep(step)
      }
      if (step >= maxStep - 1 && progress >= 100) {
        clearInterval(interval)
        setExploreProgress(100)
        setTimeout(() => {
          setExploreResult({ success: true, msg: `探索成功！成功征服【${realm.name}】，满载而归！` })
          setExploring(false)
        }, 800)
        return
      }
      setExploreProgress(Math.min(progress, 100))
      setHp(Math.max(0, health))
    }, 75)
  }, [])

  const handleRealmFilter = useCallback((data: typeof SECRET_REALMS) => {
    setFilteredRealms(data)
  }, [])

  const realmFilters = {
    searchKeys: ['name', 'category', 'feature', 'desc', 'detail', 'boss', 'location', 'era'],
    filterKeys: {
      tier: ['SSS级', 'SS级', 'S级', 'A级', 'B级', 'C级'],
      category: ['上古遗迹', '幽冥秘境', '仙山洞府', '海外仙山', '隐世道场', '人族圣地', '水底龙宫', '妖王洞府', '人间道场'],
    }
  }

  return (
    <SubPageTemplate
      title="秘境探索"
      subtitle="洪荒秘境，洞天福地，藏有无尽机缘与宝藏"
      icon="🗺️"
      colorRgb="34, 197, 94"
    >
      <SubPageSection title="🗺️ 秘境探索入口">
        <InfoCard glowIntensity={90} glowColor="34, 197, 94">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!exploring && !exploreResult ? (
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🗺️</div>
                <h3 style={{ marginBottom: '1rem', color: '#22c55e' }}>踏入秘境，寻仙觅宝</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  选择一处秘境，开启你的寻宝之旅
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '1rem',
                  maxWidth: 800,
                  margin: '0 auto'
                }}>
                  {SECRET_REALMS.slice(0, 10).map((realm) => (
                    <motion.div
                      key={realm.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startExploration(realm)}
                      style={{
                        padding: '1rem 0.5rem',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${realm.color}20, rgba(40, 40, 50, 0.9))`,
                        border: `1px solid ${realm.color}50`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{realm.icon}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: realm.color, marginBottom: '0.25rem' }}>
                        {realm.name}
                      </div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>危险 {realm.danger}%</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : exploring ? (
              <div>
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  {selectedRealm?.icon}
                </motion.div>
                <h3 style={{ marginBottom: '0.5rem', color: selectedRealm?.color }}>
                  正在探索：{selectedRealm?.name}
                </h3>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#22c55e'
                }}>
                  【{EXPLORATION_EVENTS[exploreStep]}】
                </div>

                {founds.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ color: '#fbbf24', fontSize: '0.9rem' }}>🎁 发现宝物：</span>
                    {founds.map((f, i) => (
                      <span key={i} style={{ color: '#fbbf24', fontSize: '0.8rem', margin: '0 0.3rem' }}>
                        【{f}】
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ maxWidth: 500, margin: '0 auto 1rem' }}>
                  <div style={{ textAlign: 'left', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: hp > 50 ? '#22c55e' : hp > 25 ? '#f59e0b' : '#ef4444' }}>
                      ❤️ 生命值 {Math.round(hp)}%
                    </span>
                  </div>
                  <ProgressBar value={hp} color={hp > 50 ? '#22c55e' : hp > 25 ? '#f59e0b' : '#ef4444'} />
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  <ProgressBar value={exploreProgress} color={selectedRealm?.color || '#22c55e'} />
                </div>
              </div>
            ) : exploreResult ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    animate={exploreResult.success ? {
                      scale: [1, 1.15, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ fontSize: '5rem', marginBottom: '1rem' }}
                  >
                    {exploreResult.success ? '🏆' : '💔'}
                  </motion.div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    color: exploreResult.success ? '#22c55e' : '#ef4444',
                    fontWeight: 700
                  }}>
                    {exploreResult.success ? '探索成功！' : '探索失败...'}
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: selectedRealm?.color,
                    marginBottom: '0.5rem'
                  }}>
                    {selectedRealm?.name}
                  </p>
                  {founds.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ color: '#fbbf24' }}>🎁 获得宝物：</span>
                      {founds.map((f, i) => (
                        <span key={i} style={{ color: '#fbbf24', margin: '0 0.3rem' }}>
                          【{f}】
                        </span>
                      ))}
                    </div>
                  )}
                  <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                    {exploreResult.msg}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setExploreResult(null)}
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
                    🔄 再探一次
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="📜 洪荒秘境大全">
        <FilterBar
          data={SECRET_REALMS}
          onFiltered={handleRealmFilter}
          options={realmFilters}
          placeholder="搜索秘境名称、地点、宝物、BOSS..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRealms.map((realm, idx) => (
            <motion.div key={realm.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                glowColor={realm.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedRealm(expandedRealm === realm.name ? null : realm.name)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{realm.icon}</span>
                      <div>
                        <h4 className="font-bold" style={{ color: realm.color }}>{realm.name}</h4>
                        <p className="text-xs text-gray-500">{realm.tier} · {realm.category} · {realm.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs" style={{ color: realm.danger > 70 ? '#ef4444' : realm.danger > 40 ? '#f59e0b' : '#22c55e' }}>
                        危险度 {realm.danger}%
                      </div>
                      <div className="text-xs text-amber-400">宝物 {realm.treasureLevel}%</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{realm.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {realm.treasures.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }}>
                        💎 {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedRealm === realm.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedRealm === realm.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-700/50 space-y-3 mt-3">
                        <p className="text-sm text-gray-300">{realm.detail}</p>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-red-400">👹 BOSS：</span>
                            <span className="text-gray-300">{realm.boss}</span>
                          </div>
                          <div>
                            <span className="text-cyan-400">🚪 进入条件：</span>
                            <span className="text-gray-300">{realm.entryCondition}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-purple-400 text-xs">📋 试炼关卡：</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {realm.trials.map((t) => (
                              <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => { e.stopPropagation(); startExploration(realm); }}
                          className="w-full py-2 rounded-lg font-bold text-white"
                          style={{ background: `linear-gradient(90deg, ${realm.color}, ${realm.color}99)` }}
                        >
                          🗺️ 立即探索此秘境
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