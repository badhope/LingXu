'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface TeleportGate {
  name: string
  tier: string
  from: string
  to: string
  distance: string
  energyCost: number
  stability: number
  feature: string
  desc: string
  detail: string
  requiredRealm: string
  sideEffects: string[]
  famousUsers: string[]
  accidents: string[]
  color: string
  icon: string
}

const TELEPORT_GATES: TeleportGate[] = [
  {
    name: '两界通道',
    tier: 'SSS级',
    from: '人界',
    to: '幽冥界',
    distance: '阴阳之隔',
    energyCost: 100,
    stability: 95,
    feature: '阴阳两界，生死轮回',
    desc: '连接人界与幽冥界的永恒通道，生死轮回的枢纽。',
    detail: '两界通道乃是连接人界与幽冥界的永恒通道，是生死轮回的枢纽。此通道由后土娘娘亲手建立，稳定无比，从不曾关闭。凡人死后，灵魂便从此通道进入幽冥，接受十殿阎罗的审判，然后进入轮回。唯有大法力之人，才能逆行通道，从幽冥返回人间。',
    requiredRealm: '鬼仙以上，或者已死之人',
    sideEffects: ['阳气流失', '阴气入体', '记忆模糊'],
    famousUsers: ['地藏王菩萨', '十殿阎罗', '孙悟空', '沉香'],
    accidents: ['孙悟空大闹地府', '沉香劈山救母', '魏征梦斩龙王'],
    color: '#57534e',
    icon: '🚪'
  },
  {
    name: '南天门',
    tier: 'SS级',
    from: '人界',
    to: '天庭',
    distance: '三十三重天',
    energyCost: 80,
    stability: 98,
    feature: '天界入口，天兵把守',
    desc: '天庭正门，凡人成仙必经之路，天兵天将常年把守。',
    detail: '南天门乃是天庭的正门，凡人成仙必须从此门进入，接受天庭册封。南天门有四大天王常年把守，还有十万天兵天将巡逻。想要强行闯入南天门，便是要与整个天庭为敌。当年孙悟空大闹天宫，便是从此门打入凌霄宝殿。',
    requiredRealm: '天仙以上，或者有天庭旨意',
    sideEffects: ['仙气洗礼', '去除凡胎', '获得仙籍'],
    famousUsers: ['孙悟空', '八仙', '姜子牙', '封神榜诸神'],
    accidents: ['孙悟空大闹天宫', '二郎神劈山救母', '七仙女下凡'],
    color: '#fbbf24',
    icon: '⛩️'
  },
  {
    name: '西天灵山',
    tier: 'SS级',
    from: '南瞻部洲',
    to: '西牛贺洲',
    distance: '十万八千里',
    energyCost: 75,
    stability: 90,
    feature: '佛门圣地，真经所在',
    desc: '前往西天灵山的传送阵，取经人必经之路。',
    detail: '西天灵山传送阵是前往佛门圣地的快捷通道，但佛祖有意设置了障碍，取经人必须步行十万八千里，经历九九八十一难方能取得真经。但这传送阵对真正的佛门弟子是敞开的，观音菩萨便常从此阵往返于灵山与东土大唐之间。',
    requiredRealm: '罗汉以上，或者有取经任务',
    sideEffects: ['佛光普照', '业力消除', '慧根提升'],
    famousUsers: ['如来佛祖', '观音菩萨', '唐僧师徒', '十八罗汉'],
    accidents: ['唐僧取无字真经', '真假美猴王', '灵山脚下遇强盗'],
    color: '#fbbf24',
    icon: '🕌'
  },
  {
    name: '东海归墟',
    tier: 'S级',
    from: '四海',
    to: '归墟',
    distance: '无底深渊',
    energyCost: 65,
    stability: 75,
    feature: '四海之水，最终归宿',
    desc: '连接四海与归墟的通道，天下之水的最终归宿。',
    detail: '东海归墟是天下之水的最终归宿，四海之水最终都流入归墟，永远也填不满。归墟之中住着无数上古异种，还有沉没的古国遗迹。归墟深处连接着虚空，是最危险的海域之一。',
    requiredRealm: '能避水，或者有龙族血脉',
    sideEffects: ['水压巨大', '视线模糊', '灵力消耗加倍'],
    famousUsers: ['四海龙王', '孙悟空', '哪吒', '八仙'],
    accidents: ['孙悟空取定海神针', '哪吒闹海', '八仙过海'],
    color: '#2563eb',
    icon: '🌊'
  },
  {
    name: '昆仑结界',
    tier: 'S级',
    from: '人界',
    to: '昆仑秘境',
    distance: '空间折叠',
    energyCost: 70,
    stability: 85,
    feature: '西王母道场，女仙圣地',
    desc: '通往昆仑秘境的结界入口，西王母的道场所在。',
    detail: '昆仑结界是通往西王母道场的唯一入口，设置了重重禁制。没有仙缘的人，就算站在昆仑山脚下，也看不见结界入口。结界之内便是瑶池仙境，蟠桃园便在其中。相传周穆王曾驾八骏西巡，通过此结界见到了西王母。',
    requiredRealm: '女仙，或者有西王母邀请',
    sideEffects: ['青春永驻', '仙气护体', '获得蟠桃机会'],
    famousUsers: ['周穆王', '汉武帝', '嫦娥', '七仙女'],
    accidents: ['嫦娥奔月', '牛郎织女', '董永七仙女'],
    color: '#f472b6',
    icon: '🏔️'
  },
  {
    name: '方寸山传送阵',
    tier: 'A级',
    from: '人界',
    to: '斜月三星洞',
    distance: '不在三界内',
    energyCost: 0,
    stability: 30,
    feature: '菩提老祖设置，有缘者能见',
    desc: '菩提老祖设置的传送阵，只有有缘人方能进入。',
    detail: '方寸山传送阵极其诡异，不在三界内，跳出五行中。就算是圣人也难以推算具体位置。只有与菩提老祖有缘的人，才能在樵夫的指引下找到入口。孙悟空便是凭借天生灵性，找到了此阵，学得七十二变。',
    requiredRealm: '灵性非凡，与老祖有缘',
    sideEffects: ['灵台清明', '顿悟机缘', '老祖点化'],
    famousUsers: ['孙悟空', '方寸山众弟子'],
    accidents: ['孙悟空出师被逐', '樵夫指点迷津'],
    color: '#a78bfa',
    icon: '⭐'
  },
  {
    name: '封神榜',
    tier: 'A级',
    from: '封神台',
    to: '天庭',
    distance: '一步登天',
    energyCost: 50,
    stability: 100,
    feature: '封神之后，肉身成圣',
    desc: '姜子牙封神台，封神之后直接进入天庭就职。',
    detail: '封神榜乃是三教共立，姜子牙手持打神鞭，在封神台上册封三百六十五位正神。凡是榜上有名者，死后真灵便通过此阵直接前往天庭，免去轮回之苦。但封神也是一种束缚，从此失去自由，必须听从天庭号令。',
    requiredRealm: '榜上有名者',
    sideEffects: ['失去肉身', '真灵封神', '听从天条'],
    famousUsers: ['姜子牙', '三百六十五路正神', '哪吒', '杨戬'],
    accidents: ['封神大战', '截教覆灭', '姜子牙未封神'],
    color: '#ef4444',
    icon: '📜'
  },
  {
    name: '虚空裂缝',
    tier: 'C级',
    from: '任意地点',
    to: '未知空间',
    distance: '不可测量',
    energyCost: 0,
    stability: 5,
    feature: '随机传送，九死一生',
    desc: '空间不稳定产生的裂缝，随机传送到未知之地。',
    detail: '虚空裂缝是空间不稳定产生的，没有固定的位置和目的地。进入者九死一生，可能传送到宝藏秘境，也可能直接进入虚空乱流，粉身碎骨。但也有大机缘之人，通过裂缝得到上古传承，一步登天。',
    requiredRealm: '运气够好，或者实力够强',
    sideEffects: ['空间撕裂', '时空错乱', '随机传送'],
    famousUsers: ['某不知名主角', '位面商人', '穿越者'],
    accidents: ['无数人失踪', '上古魔神逃出', '异界入侵'],
    color: '#71717a',
    icon: '⚡'
  }
]

const TELEPORT_STEPS = [
  '激活传送阵',
  '注入灵力',
  '校准坐标',
  '建立空间通道',
  '压缩空间',
  '身体量子化',
  '超空间跳跃',
  '空间重组'
]

export default function ChuanSongPage() {
  const [filteredGates, setFilteredGates] = useState(TELEPORT_GATES)
  const [expandedGate, setExpandedGate] = useState<string | null>(null)
  const [teleporting, setTeleporting] = useState(false)
  const [selectedGate, setSelectedGate] = useState<TeleportGate | null>(null)
  const [teleStep, setTeleStep] = useState(0)
  const [teleProgress, setTeleProgress] = useState(0)
  const [teleResult, setTeleResult] = useState<{ success: boolean; msg: string } | null>(null)

  const startTeleport = useCallback((gate: TeleportGate) => {
    setSelectedGate(gate)
    setTeleporting(true)
    setTeleStep(0)
    setTeleProgress(0)
    setTeleResult(null)

    let step = 0
    let progress = 0
    const maxStep = Math.min(gate.stability / 12.5, 8)

    const interval = setInterval(() => {
      progress += Math.random() * 3 + 0.5

      if (Math.random() > gate.stability / 100 + 0.1) {
        clearInterval(interval)
        setTimeout(() => {
          setTeleResult({ success: false, msg: '传送坐标偏移！空间通道不稳定，被随机抛到了未知空间...' })
          setTeleporting(false)
        }, 500)
        return
      }

      if (progress >= 100 && step < maxStep - 1) {
        progress = 0
        step++
        setTeleStep(step)
      }
      if (step >= maxStep - 1 && progress >= 100) {
        clearInterval(interval)
        setTeleProgress(100)
        setTimeout(() => {
          setTeleResult({ success: true, msg: `传送成功！从【${gate.from}】抵达【${gate.to}】！` })
          setTeleporting(false)
        }, 800)
        return
      }
      setTeleProgress(Math.min(progress, 100))
    }, 80)
  }, [])

  const handleGateFilter = useCallback((data: typeof TELEPORT_GATES) => {
    setFilteredGates(data)
  }, [])

  const gateFilters = {
    searchKeys: ['name', 'from', 'to', 'feature', 'desc', 'detail', 'famousUsers'],
    filterKeys: {
      tier: ['SSS级', 'SS级', 'S级', 'A级', 'B级', 'C级'],
    }
  }

  return (
    <SubPageTemplate
      title="位面传送"
      subtitle="空间跳跃，位面穿梭，万界传送阵系统"
      icon="🚪"
      colorRgb="236, 72, 153"
    >
      <SubPageSection title="🌀 位面传送大阵">
        <InfoCard glowIntensity={90} glowColor="236, 72, 153">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!teleporting && !teleResult ? (
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌀</div>
                <h3 style={{ marginBottom: '1rem', color: '#ec4899' }}>空间折叠，一念万里</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  选择传送阵，开启跨界之旅
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  maxWidth: 700,
                  margin: '0 auto'
                }}>
                  {TELEPORT_GATES.slice(0, 8).map((gate) => (
                    <motion.div
                      key={gate.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startTeleport(gate)}
                      style={{
                        padding: '1rem 0.75rem',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${gate.color}20, rgba(40, 40, 50, 0.9))`,
                        border: `1px solid ${gate.color}50`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{gate.icon}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: gate.color, marginBottom: '0.25rem' }}>
                        {gate.name}
                      </div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>{gate.from} → {gate.to}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : teleporting ? (
              <div>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 0.8, 1.2, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  🌀
                </motion.div>
                <h3 style={{ marginBottom: '0.5rem', color: selectedGate?.color }}>
                  空间跳跃中：{selectedGate?.from} → {selectedGate?.to}
                </h3>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#ec4899'
                }}>
                  【{TELEPORT_STEPS[teleStep]}】
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  <ProgressBar value={teleProgress} color={selectedGate?.color || '#ec4899'} />
                </div>

                <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                  传送阵稳定度：{selectedGate?.stability}% · 距离：{selectedGate?.distance}
                </div>
              </div>
            ) : teleResult ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    animate={teleResult.success ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, -10, 0]
                    } : {
                      x: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ fontSize: '5rem', marginBottom: '1rem' }}
                  >
                    {teleResult.success ? '✨' : '💫'}
                  </motion.div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    color: teleResult.success ? '#22c55e' : '#f59e0b',
                    fontWeight: 700
                  }}>
                    {teleResult.success ? '传送成功！' : '空间波动！'}
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: selectedGate?.color,
                    marginBottom: '0.5rem'
                  }}>
                    {selectedGate?.name}
                  </p>
                  <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                    {teleResult.msg}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTeleResult(null)}
                    style={{
                      padding: '0.8rem 2rem',
                      background: 'rgba(236, 72, 153, 0.2)',
                      border: '1px solid #ec4899',
                      borderRadius: '50px',
                      color: '#ec4899',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    🌀 再次传送
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="🚪 万界传送阵大全">
        <FilterBar
          data={TELEPORT_GATES}
          onFiltered={handleGateFilter}
          options={gateFilters}
          placeholder="搜索传送阵名称、目的地、使用者..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGates.map((gate, idx) => (
            <motion.div key={gate.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                glowColor={gate.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedGate(expandedGate === gate.name ? null : gate.name)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{gate.icon}</span>
                      <div>
                        <h4 className="font-bold" style={{ color: gate.color }}>{gate.name}</h4>
                        <p className="text-xs text-gray-500">{gate.tier} · {gate.from} → {gate.to}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs" style={{ color: gate.stability > 80 ? '#22c55e' : gate.stability > 50 ? '#f59e0b' : '#ef4444' }}>
                        稳定度 {gate.stability}%
                      </div>
                      <div className="text-xs text-purple-400">能耗 {gate.energyCost}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{gate.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {gate.famousUsers.slice(0, 4).map((u) => (
                      <span key={u} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }}>
                        👤 {u}
                      </span>
                    ))}
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedGate === gate.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedGate === gate.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-700/50 space-y-3 mt-3">
                        <p className="text-sm text-gray-300">{gate.detail}</p>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-cyan-400">🎫 进入条件：</span>
                            <span className="text-gray-300">{gate.requiredRealm}</span>
                          </div>
                          <div>
                            <span className="text-orange-400">📏 距离：</span>
                            <span className="text-gray-300">{gate.distance}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-red-400 text-xs">⚠️ 副作用：</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {gate.sideEffects.map((e) => (
                              <span key={e} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
                                {e}
                              </span>
                            ))}
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => { e.stopPropagation(); startTeleport(gate); }}
                          className="w-full py-2 rounded-lg font-bold text-white"
                          style={{ background: `linear-gradient(90deg, ${gate.color}, ${gate.color}99)` }}
                        >
                          🚪 启动此传送阵
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