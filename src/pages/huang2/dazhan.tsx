'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

interface Battle {
  id: string
  name: string
  era: string
  scale: number
  casualties: string
  result: string
  feature: string
  desc: string
  detail: string
  factions: { name: string; leader: string; power: number; color: string }[]
  color: string
  icon: string
}

interface BattleState {
  selectedFaction: string
  morale: number
  troops: number
  power: number
  wins: number
  losses: number
  battleLog: string[]
  inBattle: boolean
}

const BATTLES: Battle[] = [
  {
    id: 'licha',
    name: '巫妖大战',
    era: '太古',
    scale: 10,
    casualties: '亿万万计',
    result: '两败俱伤',
    feature: '毁天灭地，洪荒破碎',
    desc: '巫族十二祖巫对决妖族天庭，最终同归于尽。',
    detail: '太古第一大战，妖族建立天庭掌天，巫族掌地，矛盾积累无数终于爆发。十二祖巫联手对抗东皇太一与帝俊，祖巫共工怒撞不周山，天柱崩塌，洪荒破碎，天河之水倾泻而下。最终妖族帝俊、太一陨落，祖巫仅余后土化身轮回，两族从此没落。',
    factions: [
      { name: '巫族', leader: '十二祖巫', power: 95, color: '#78716c' },
      { name: '妖族', leader: '东皇太一/帝俊', power: 95, color: '#f59e0b' }
    ],
    color: '#ef4444',
    icon: '🌋'
  },
  {
    id: 'fengshen',
    name: '封神之战',
    era: '上古',
    scale: 9,
    casualties: '万仙来朝',
    result: '周兴商灭',
    feature: '斩将封神，定立周天',
    desc: '阐截斗法，三教共立封神榜，定立天庭神位。',
    detail: '商纣无道，凤鸣岐山，姜子牙奉天承运封神。阐教十二金仙与截教万仙斗法，诛仙阵、万仙阵相继布下，通天教主与太上老君、元始天尊、接引、准提四圣对决。此战之后，天庭众神归位，西方教大兴，截教几乎覆灭。',
    factions: [
      { name: '阐教', leader: '元始天尊', power: 90, color: '#3b82f6' },
      { name: '截教', leader: '通天教主', power: 92, color: '#22c55e' },
      { name: '人道', leader: '周文王/武王', power: 75, color: '#fbbf24' }
    ],
    color: '#7c3aed',
    icon: '⚡'
  },
  {
    id: 'zhulu',
    name: '逐鹿之战',
    era: '远古',
    scale: 8,
    casualties: '百万雄师',
    result: '炎黄一统',
    feature: '人皇定鼎，华夏开端',
    desc: '黄帝轩辕对阵蚩尤九黎，定立华夏正统。',
    detail: '远古时期，蚩尤九黎部落与炎黄部落争夺中原。蚩尤铜头铁额，食沙石子，造立兵仗刀戟大弩，威振天下。黄帝与蚩尤九战九不胜，后得九天玄女传授兵法，于涿鹿之野展开决战，应龙蓄水，风伯雨师纵大风雨，女魃止雨，最终斩杀蚩尤，一统华夏。',
    factions: [
      { name: '炎黄', leader: '黄帝轩辕', power: 85, color: '#fbbf24' },
      { name: '九黎', leader: '蚩尤', power: 88, color: '#ef4444' }
    ],
    color: '#f97316',
    icon: '🏔️'
  },
  {
    id: 'gongrong',
    name: '共工祝融之战',
    era: '太古',
    scale: 9,
    casualties: '天崩地裂',
    result: '天柱崩塌',
    feature: '水火不容，怒撞不周',
    desc: '水火二神大战，共工怒撞不周山。',
    detail: '水神共工与火神祝融本为死对头，终于爆发惊天大战。二人大战于不周山之下，祝融以九天玄火焚烧共工，共工大败，羞愤之下，一头撞向撑天支柱不周山。天柱崩塌，天倾西北，地陷东南，天河之水倒灌人间，引出女娲补天。',
    factions: [
      { name: '水族', leader: '共工', power: 88, color: '#3b82f6' },
      { name: '火族', leader: '祝融', power: 90, color: '#ef4444' }
    ],
    color: '#7c3aed',
    icon: '💥'
  },
  {
    id: 'sanqing',
    name: '三清斗法',
    era: '太古',
    scale: 7,
    casualties: '无众生伤亡',
    result: '胜负未分',
    feature: '圣人对决，大道之争',
    desc: '三清圣人因立教理念之争展开大道对决。',
    detail: '盘古三清，太上老君、元始天尊、通天教主持不同理念。太上主无为，元始主阐微，通天主教无类。因理念之争展开大道级对决，于混沌深处斗法百年，最终被鸿钧道祖出面制止，定下分宝崖分宝之约。',
    factions: [
      { name: '人教', leader: '太上老君', power: 100, color: '#fbbf24' },
      { name: '阐教', leader: '元始天尊', power: 98, color: '#3b82f6' },
      { name: '截教', leader: '通天教主', power: 99, color: '#22c55e' }
    ],
    color: '#a855f7',
    icon: '☯️'
  },
  {
    id: 'hongjun',
    name: '鸿钧讲道',
    era: '开天之初',
    scale: 6,
    casualties: '无伤亡',
    result: '众生听道',
    feature: '大道显化，万仙来朝',
    desc: '鸿钧道祖紫霄宫三次讲道，奠定洪荒格局。',
    detail: '开天辟地后，鸿钧道祖于紫霄宫开讲大道，第一次讲道龙汉初劫刚过，第二次讲道定立圣位，第三次讲道传下鸿蒙紫气。三清、接引、准提、女娲、伏羲等纷纷前往听道，奠定了洪荒万年的格局。',
    factions: [
      { name: '众生', leader: '万灵', power: 50, color: '#78716c' }
    ],
    color: '#06b6d4',
    icon: '📖'
  }
]

const FACTIONS = [
  { name: '巫族', soldiers: 5000, power: 88, color: '#78716c', icon: '🏛️' },
  { name: '妖族', soldiers: 6000, power: 85, color: '#f59e0b', icon: '🦅' },
  { name: '阐教', soldiers: 3000, power: 92, color: '#3b82f6', icon: '⚡' },
  { name: '截教', soldiers: 8000, power: 90, color: '#22c55e', icon: '🗡️' }
]

export default function DaZhanPage() {
  const [selectedEra, setSelectedEra] = useState('全部')
  const [battleState, setBattleState] = useState<BattleState>({
    selectedFaction: '',
    morale: 80,
    troops: 5000,
    power: 85,
    wins: 0,
    losses: 0,
    battleLog: [],
    inBattle: false
  })

  const eras = ['全部', '太古', '远古', '上古']

  const filteredBattles = selectedEra === '全部'
    ? BATTLES
    : BATTLES.filter(b => b.era === selectedEra)

  const selectFaction = useCallback((faction: typeof FACTIONS[0]) => {
    setBattleState({
      ...battleState,
      selectedFaction: faction.name,
      troops: faction.soldiers,
      power: faction.power
    })
  }, [battleState])

  const launchAttack = useCallback(() => {
    if (!battleState.selectedFaction || battleState.inBattle) return

    setBattleState({ ...battleState, inBattle: true })

    setTimeout(() => {
      const damage = Math.floor(Math.random() * 800) + 200
      const enemyDamage = Math.floor(Math.random() * 600) + 100
      const victory = Math.random() > 0.4
      const events = [
        '妖师鲲鹏偷袭得手！',
        '十二都天神煞大阵发动！',
        '周天星斗大阵运转！',
        '祖巫自爆！',
        '东皇钟响！',
        '天降流火！',
        '九天玄雷落下！'
      ]

      setBattleState({
        ...battleState,
        inBattle: false,
        troops: Math.max(0, battleState.troops - enemyDamage),
        morale: Math.max(0, Math.min(100, battleState.morale + (victory ? 15 : -20))),
        wins: battleState.wins + (victory ? 1 : 0),
        losses: battleState.losses + (victory ? 0 : 1),
        battleLog: [
          `⚔️ ${events[Math.floor(Math.random() * events.length)]}`,
          `${victory ? '✅ 大捷！' : '❌ 败退！'} 歼敌 ${damage}，自损 ${enemyDamage}`,
          ...battleState.battleLog
        ].slice(0, 8)
      })
    }, 2000)
  }, [battleState])

  const retreat = useCallback(() => {
    setBattleState({
      ...battleState,
      troops: Math.min(5000, battleState.troops + 1000),
      morale: Math.min(100, battleState.morale + 10),
      battleLog: ['🏳️ 鸣金收兵，休整队伍...', ...battleState.battleLog].slice(0, 8)
    })
  }, [battleState])

  return (
    <SubPageTemplate
      title="洪荒大战"
      subtitle="巫妖大战，逐鹿之战，封神之战"
      icon="⚔️"
      colorRgb="239, 68, 68"
      parentPath="/huang2"
    >
      <SubPageSection title="⚔️ 洪荒战场模拟器">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="lg:col-span-3"
            style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '16px'
            }}
          >
            <h4 style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>选择阵营</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {FACTIONS.map(faction => (
                <motion.button
                  key={faction.name}
                  onClick={() => selectFaction(faction)}
                  style={{
                    padding: '0.875rem',
                    background: battleState.selectedFaction === faction.name
                      ? `linear-gradient(135deg, ${faction.color}33 0%, ${faction.color}11 100%)`
                      : 'rgba(0, 0, 0, 0.15)',
                    border: battleState.selectedFaction === faction.name
                      ? `2px solid ${faction.color}`
                      : '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px',
                    color: 'white',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span style={{ marginRight: '0.5rem' }}>{faction.icon}</span>
                  {faction.name}
                  <span className="float-right opacity-60">⚔️ {faction.power}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-5"
            style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(124, 58, 237, 0.05) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
              borderRadius: '16px',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className="text-center mb-4">
              <motion.div 
                className="text-5xl mb-2"
                animate={battleState.inBattle ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 2, -2, 0]
                } : {}}
                transition={{ duration: 0.5, repeat: battleState.inBattle ? Infinity : 0 }}
              >
                {battleState.inBattle ? '💥' : '⚔️'}
              </motion.div>
              <h4 style={{ color: '#ef4444' }}>
                {battleState.inBattle ? '激战中...' : battleState.selectedFaction || '等待主将出战'}
              </h4>
              <p className="text-xs opacity-60">
                {battleState.wins} 胜 / {battleState.losses} 败
              </p>
            </div>

            <ProgressBar 
              label="军心士气" 
              value={battleState.morale} 
              max={100}
              colorRgb={battleState.morale > 60 ? "34, 197, 94" : battleState.morale > 30 ? "251, 191, 36" : "239, 68, 68"} 
            />

            <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
              <motion.button
                onClick={launchAttack}
                disabled={!battleState.selectedFaction || battleState.inBattle}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  background: battleState.selectedFaction && !battleState.inBattle
                    ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                    : 'rgba(0, 0, 0, 0.2)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  fontWeight: 600,
                  cursor: !battleState.selectedFaction || battleState.inBattle ? 'not-allowed' : 'pointer'
                }}
                whileHover={battleState.selectedFaction && !battleState.inBattle ? { scale: 1.03 } : {}}
                whileTap={battleState.selectedFaction && !battleState.inBattle ? { scale: 0.97 } : {}}
              >
                ⚔️ 全军出击
              </motion.button>
              <motion.button
                onClick={retreat}
                disabled={battleState.inBattle}
                style={{
                  padding: '0.875rem 1.25rem',
                  background: 'rgba(107, 114, 128, 0.3)',
                  border: '1px solid rgba(107, 114, 128, 0.3)',
                  borderRadius: '10px',
                  color: 'white',
                  cursor: battleState.inBattle ? 'not-allowed' : 'pointer'
                }}
                whileHover={!battleState.inBattle ? { scale: 1.05 } : {}}
              >
                🏳️
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-4"
            style={{
              padding: '1.5rem',
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.1)',
              borderRadius: '16px'
            }}
          >
            <h4 style={{ marginBottom: '1rem', opacity: 0.8 }}>📜 战报</h4>
            <div style={{ 
              maxHeight: '220px', 
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.8rem'
            }}>
              {battleState.battleLog.length === 0 ? (
                <p className="opacity-40 text-center py-4">暂无战报...</p>
              ) : (
                battleState.battleLog.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      background: i === 0 ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                      borderLeft: i === 0 ? '2px solid #ef4444' : '2px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '0 6px 6px 0'
                    }}
                  >
                    {log}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      </SubPageSection>

      <SubPageSection title="📋 洪荒战史">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {eras.map((era) => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedEra === era ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedEra === era ? '#fca5a5' : '#a8a8a8',
                transition: 'all 0.2s ease',
                border: selectedEra === era ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid transparent',
              }}
            >
              {era}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <AnimatePresence>
            {filteredBattles.map((battle, i) => (
              <motion.div
                key={battle.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <InfoCard
                  title={`${battle.icon} ${battle.name}`}
                  subtitle={`${battle.era}时期 · ${battle.result}`}
                  feature={battle.feature}
                  desc={battle.desc}
                  detail={battle.detail}
                  colorRgb={battle.color.slice(4).replace(')', '').split(', ').map(Number).join(', ')}
                  tags={[`规模 ${'⭐'.repeat(battle.scale)}`, battle.casualties]}
                  expandable
                  expandedContent={
                    <div>
                      <p className="text-sm opacity-80 mb-2"><strong>参战势力：</strong></p>
                      <div className="flex flex-wrap gap-2">
                        {battle.factions.map((f, fi) => (
                          <span 
                            key={fi} 
                            style={{
                              padding: '0.25rem 0.75rem',
                              background: `${f.color}22`,
                              border: `1px solid ${f.color}55`,
                              borderRadius: '20px',
                              fontSize: '0.75rem'
                            }}
                          >
                            {f.name} · {f.leader}
                          </span>
                        ))}
                      </div>
                    </div>
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
