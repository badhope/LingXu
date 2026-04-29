'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

interface Rune {
  name: string
  script: string
  level: number
  type: string
  power: number
  cost: number
  feature: string
  desc: string
  detail: string
  effect: string
  color: string
  icon: string
}

interface CasterState {
  mana: number
  maxMana: number
  level: number
  exp: number
  knownRunes: string[]
  curses: number
  blessings: number
  successRate: number
}

const RUNES: Rune[] = [
  {
    name: '临',
    script: '臨',
    level: 1,
    type: '护身',
    power: 30,
    cost: 10,
    feature: '身心稳定',
    desc: '临事不动容，保持不动不惑的意志。',
    detail: '九字真言第一字，代表临事不动容，保持不动不惑的意志，表现坚强的体魄。此咒能稳定心神，不受外邪侵扰，是一切咒术的基础。',
    effect: '心神稳定，百邪不侵',
    color: '#ec4899',
    icon: '🛡️'
  },
  {
    name: '兵',
    script: '兵',
    level: 2,
    type: '攻击',
    power: 50,
    cost: 15,
    feature: '能量延寿',
    desc: '延寿和返童的生命力，勇猛果敢。',
    detail: '九字真言第二字，代表延寿和返童的生命力。此咒能激发生命潜能，获得超凡的力量和速度，战斗中爆发力惊人。',
    effect: '力量倍增，速度暴涨',
    color: '#ef4444',
    icon: '⚔️'
  },
  {
    name: '斗',
    script: '鬥',
    level: 3,
    type: '战意',
    power: 45,
    cost: 12,
    feature: '勇猛果敢',
    desc: '勇猛果敢，遭遇困难反涌出斗志。',
    detail: '九字真言第三字，代表勇猛果敢，遭遇困难反而涌出无穷斗志。此咒能激发心中的战意，越挫越勇，永不言败。',
    effect: '战意高昂，愈战愈勇',
    color: '#f97316',
    icon: '💪'
  },
  {
    name: '者',
    script: '者',
    level: 4,
    type: '治愈',
    power: 40,
    cost: 18,
    feature: '万物之灵力',
    desc: '自由支配自己躯体和别人躯体的力量。',
    detail: '九字真言第四字，代表自由支配自己和别人躯体的力量。此咒能接引天地灵气，治愈伤病，甚至能起死回生。',
    effect: '治愈伤病，接引灵气',
    color: '#22c55e',
    icon: '💚'
  },
  {
    name: '皆',
    script: '皆',
    level: 5,
    type: '感应',
    power: 55,
    cost: 20,
    feature: '危机感应',
    desc: '知人心、操纵人心的能力。',
    detail: '九字真言第五字，代表知人心、操纵人心的能力。此咒能感应他人的心思，甚至能在一定程度上影响他人的意志。',
    effect: '他心通，心灵感应',
    color: '#3b82f6',
    icon: '🧠'
  },
  {
    name: '阵',
    script: '陣',
    level: 6,
    type: '布阵',
    power: 65,
    cost: 25,
    feature: '隐形集气',
    desc: '集富庶与敬爱于一身的能力，召唤法阵。',
    detail: '九字真言第六字，代表集富庶与敬爱于一身的能力。此咒能召唤各种法阵，集天地之气，化为己用，甚至能布下隐形结界。',
    effect: '召唤法阵，布下结界',
    color: '#7c3aed',
    icon: '🔮'
  },
  {
    name: '列',
    script: '列',
    level: 7,
    type: '时空',
    power: 75,
    cost: 30,
    feature: '分裂控制',
    desc: '救济他人的心，操纵时间和空间。',
    detail: '九字真言第七字，代表救济他人的心，操纵时间和空间的能力。此咒能在一定范围内扭曲时空，甚至短暂停止时间。',
    effect: '扭曲时空，时间停止',
    color: '#a855f7',
    icon: '⏳'
  },
  {
    name: '前',
    script: '前',
    level: 8,
    type: '元素',
    power: 85,
    cost: 35,
    feature: '五元素控制',
    desc: '更能自由自在地使用超能力。',
    detail: '九字真言第八字，代表能更自由自在地使用超能力。此咒能完全掌控五大元素，翻云覆雨，移山倒海，无所不能。',
    effect: '掌控五行，翻天覆地',
    color: '#06b6d4',
    icon: '🌊'
  },
  {
    name: '行',
    script: '行',
    level: 9,
    type: '超凡',
    power: 100,
    cost: 50,
    feature: '超凡人圣',
    desc: '超凡人圣之境，我即天地。',
    detail: '九字真言第九字，代表超凡人圣之境。此咒一出，我即天地，天地即我，万法归宗，神通自生，已达仙人之境。',
    effect: '万法归宗，我即天地',
    color: '#fbbf24',
    icon: '🌟'
  },
  {
    name: '血咒',
    script: '血',
    level: 5,
    type: '诅咒',
    power: 70,
    cost: 40,
    feature: '血祭诅咒',
    desc: '以自身精血为引，下恶毒诅咒。',
    detail: '上古巫门最恶毒的咒术之一，以自身精血为引，向天地立誓，降下恶毒诅咒。中咒者厄运缠身，生不如死，除非施咒者解除或死亡，否则永无宁日。',
    effect: '厄运缠身，生不如死',
    color: '#dc2626',
    icon: '🩸'
  },
  {
    name: '焚天符',
    script: '焚',
    level: 7,
    type: '火符',
    power: 80,
    cost: 45,
    feature: '焚尽万物',
    desc: '召唤九天玄火，焚尽一切。',
    detail: '符箓中攻击最强的火符，以朱砂写就，灵力催动下能召唤九天玄火，焚尽一切邪祟，甚至能烧尽人的三魂七魄，灰飞烟灭。',
    effect: '九天玄火，焚尽万物',
    color: '#ea580c',
    icon: '🔥'
  },
  {
    name: '镇魂符',
    script: '鎮',
    level: 6,
    type: '镇邪',
    power: 60,
    cost: 28,
    feature: '镇压邪祟',
    desc: '镇压一切阴邪鬼魅，使其魂飞魄散。',
    detail: '道家最常用的镇邪符箓，以黄纸朱砂画就，贴于鬼门之上，能镇压一切阴邪鬼魅。威力强大者甚至能直接打散阴魂，使其永不超生。',
    effect: '镇压邪祟，驱散阴魂',
    color: '#fbbf24',
    icon: '📜'
  }
]

const RUNE_TYPES = ['全部', '护身', '攻击', '战意', '治愈', '诅咒', '镇邪', '元素']

export default function WuWenPage() {
  const [selectedType, setSelectedType] = useState('全部')
  const [caster, setCaster] = useState<CasterState>({
    mana: 60,
    maxMana: 100,
    level: 2,
    exp: 15,
    knownRunes: ['临', '兵'],
    curses: 0,
    blessings: 2,
    successRate: 65
  })

  const [casting, setCasting] = useState<string | null>(null)
  const [castResult, setCastResult] = useState<{success: boolean; msg: string} | null>(null)

  const filteredRunes = selectedType === '全部'
    ? RUNES
    : RUNES.filter(r => r.type === selectedType)

  const castRune = useCallback((rune: Rune) => {
    if (caster.mana < rune.cost) {
      setCastResult({ success: false, msg: '灵力不足！' })
      return
    }

    setCasting(rune.name)
    setCastResult(null)

    setTimeout(() => {
      const success = Math.random() * 100 < caster.successRate
      
      if (success) {
        const newKnown = caster.knownRunes.includes(rune.name)
          ? caster.knownRunes
          : [...caster.knownRunes, rune.name]
        
        setCaster({
          ...caster,
          mana: Math.max(0, caster.mana - rune.cost),
          exp: caster.exp + rune.power,
          knownRunes: newKnown,
          blessings: caster.blessings + (rune.type === '诅咒' ? 0 : 1),
          curses: caster.curses + (rune.type === '诅咒' ? 1 : 0)
        })
        setCastResult({ success: true, msg: `${rune.script} 咒成功！${rune.effect}` })
      } else {
        setCaster({
          ...caster,
          mana: Math.max(0, caster.mana - Math.floor(rune.cost / 2)),
          successRate: Math.min(95, caster.successRate + 1)
        })
        setCastResult({ success: false, msg: '咒语反噬！灵力紊乱...' })
      }
      
      setCasting(null)
    }, 1500)
  }, [caster])

  const meditate = useCallback(() => {
    setCaster({
      ...caster,
      mana: Math.min(caster.maxMana, caster.mana + 25 + Math.floor(Math.random() * 10))
    })
  }, [caster])

  return (
    <SubPageTemplate
      title="巫文咒语"
      subtitle="巫文秘典，符箓咒语，血祭神通"
      icon="🔮"
      colorRgb="236, 72, 153"
      parentPath="/huang2"
    >
      <SubPageSection title="🧙 咒语施法模拟器">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="lg:col-span-2"
            style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%)',
              border: '1px solid rgba(236, 72, 153, 0.2)',
              borderRadius: '16px',
              minHeight: '320px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <div className="text-center mb-6">
              <motion.div 
                className="text-7xl mb-4"
                animate={casting ? {
                  scale: [1, 1.3, 1],
                  rotate: [0, 5, -5, 0],
                  filter: ['brightness(1)', 'brightness(2)', 'brightness(1)']
                } : {
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {casting ? '✨' : '🔮'}
              </motion.div>
              
              <AnimatePresence>
                {castResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4"
                  >
                    <p style={{ 
                      color: castResult.success ? '#4ade80' : '#f87171',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textShadow: castResult.success ? '0 0 20px rgba(74, 222, 128, 0.5)' : 'none'
                    }}>
                      {castResult.success ? '✅' : '❌'} {castResult.msg}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 style={{ color: '#ec4899', marginBottom: '0.5rem' }}>
                {casting ? `正在施展「${casting}」字咒...` : `咒术师 Lv.${caster.level}`}
              </h3>
              <p className="text-sm opacity-70">
                已掌握 {caster.knownRunes.length} 种巫文 · 
                施法成功率 {caster.successRate}% · 
                获得 {caster.blessings} 次神佑
              </p>
            </div>

            <ProgressBar 
              label="灵力值" 
              value={caster.mana} 
              max={caster.maxMana}
              colorRgb="236, 72, 153" 
            />

            <ProgressBar 
              label="经验值" 
              value={caster.exp % 100} 
              max={100}
              colorRgb="168, 85, 247" 
            />

            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              {RUNES.slice(0, 6).map(rune => (
                <motion.button
                  key={rune.name}
                  onClick={() => castRune(rune)}
                  disabled={casting !== null || caster.mana < rune.cost}
                  style={{
                    width: '56px',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: caster.knownRunes.includes(rune.name)
                      ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.3) 0%, rgba(168, 85, 247, 0.2) 100%)'
                      : 'rgba(0, 0, 0, 0.2)',
                    border: caster.knownRunes.includes(rune.name)
                      ? '2px solid rgba(236, 72, 153, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: caster.knownRunes.includes(rune.name) ? '#f472b6' : 'rgba(255,255,255,0.4)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    cursor: casting || caster.mana < rune.cost ? 'not-allowed' : 'pointer',
                    fontFamily: 'ZCOOL XiaoWei, serif'
                  }}
                  whileHover={!casting && caster.mana >= rune.cost ? { scale: 1.1, boxShadow: '0 0 15px rgba(236, 72, 153, 0.4)' } : {}}
                  whileTap={!casting && caster.mana >= rune.cost ? { scale: 0.95 } : {}}
                  title={`${rune.name} - 消耗 ${rune.cost} 灵力`}
                >
                  {rune.script}
                </motion.button>
              ))}
            </div>

            <div className="mt-6 text-center">
              <motion.button
                onClick={meditate}
                disabled={casting !== null}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(236, 72, 153, 0.15) 100%)',
                  border: '1px solid rgba(236, 72, 153, 0.3)',
                  borderRadius: '25px',
                  color: '#e9d5ff',
                  cursor: casting ? 'not-allowed' : 'pointer'
                }}
                whileHover={!casting ? { scale: 1.05 } : {}}
                whileTap={!casting ? { scale: 0.95 } : {}}
              >
                🧘 打坐恢复灵力
              </motion.button>
            </div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: '当前灵力', value: `${caster.mana}/${caster.maxMana}`, icon: '💜' },
              { label: '施法等级', value: `Lv.${caster.level}`, icon: '🎖️' },
              { label: '已掌握', value: `${caster.knownRunes.length} 种`, icon: '📜' },
              { label: '成功率', value: `${caster.successRate}%`, icon: '🎯' },
              { label: '神佑/反噬', value: `${caster.blessings}/${caster.curses}`, icon: '⚖️' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                style={{
                  padding: '1rem',
                  background: 'rgba(236, 72, 153, 0.05)',
                  border: '1px solid rgba(236, 72, 153, 0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{stat.icon}</span>
                  <span className="opacity-70">{stat.label}</span>
                </span>
                <span style={{ color: '#ec4899', fontWeight: 600 }}>{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SubPageSection>

      <SubPageSection title="📋 上古巫文百科">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {RUNE_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedType === type ? 'rgba(236, 72, 153, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedType === type ? '#f9a8d4' : '#a8a8a8',
                transition: 'all 0.2s ease',
                border: selectedType === type ? '1px solid rgba(236, 72, 153, 0.5)' : '1px solid transparent',
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <AnimatePresence>
            {filteredRunes.map((rune, i) => (
              <motion.div
                key={rune.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <InfoCard
                  title={`${rune.icon} ${rune.script} · ${rune.name}`}
                  subtitle={`Lv.${rune.level} ${rune.type}咒`}
                  feature={rune.feature}
                  desc={rune.desc}
                  detail={rune.detail}
                  colorRgb={rune.color.slice(4).replace(')', '').split(', ').map(Number).join(', ')}
                  tags={[`威力 ${rune.power}`, `消耗 ${rune.cost}灵力`]}
                  expandable
                  expandedContent={
                    <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                      <strong>施法效果：</strong>{rune.effect}
                    </p>
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>

      <SubPageSection title="📜 九字真言手印">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-3">
          {RUNES.slice(0, 9).map((rune, i) => (
            <motion.div
              key={rune.name}
              style={{
                padding: '1.5rem 1rem',
                background: caster.knownRunes.includes(rune.name)
                  ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(168, 85, 247, 0.1) 100%)'
                  : 'rgba(0, 0, 0, 0.1)',
                border: caster.knownRunes.includes(rune.name)
                  ? '1px solid rgba(236, 72, 153, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                textAlign: 'center'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div 
                className="text-4xl mb-2"
                style={{ 
                  fontFamily: 'ZCOOL XiaoWei, serif',
                  fontWeight: 700,
                  color: caster.knownRunes.includes(rune.name) ? '#ec4899' : 'inherit'
                }}
              >
                {rune.script}
              </div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{rune.name}</h4>
              <p className="text-xs opacity-60">{rune.feature}</p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
