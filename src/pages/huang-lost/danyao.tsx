'use client'

import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface Pill {
  name: string
  grade: string
  effect: string
  successRate: number
  time: string
  desc: string
  detail: string
  materials: string[]
  icon: string
  color: string
  taboo: string[]
  effectValue: number
  recipe: string[]
}

const PILLS: Pill[] = [
  {
    name: '九转金丹',
    grade: '天级',
    effect: '白日飞升',
    successRate: 1,
    time: '九九八十一年',
    desc: '太上老君八卦炉中炼就，九转功成，霞举飞升。服之者立地成仙，与天地同寿，与日月同庚。',
    detail: '九转金丹乃丹道至尊。一转二转洗髓伐毛，三转四转脱胎换骨，五转六转神凝气结，七转八转纯阳不漏，九转功成霞举飞升。此丹需先天一炁为引，太阳真火锻炼，历经九次炼化。每转需九年，九九八十一年方成。丹成之日，天地同贺，万仙来朝。服此丹者，立证金仙，永不轮回。',
    materials: ['九转还魂草', '先天紫气', '太阳真火精华', '九转玉莲', '鸿蒙紫气'],
    icon: '🌟',
    color: '#fbbf24',
    taboo: ['心术不正者', '无德者', '六根不净者'],
    effectValue: 100,
    recipe: ['子时起火', '午时退火', '寅时添柴', '九次封炉'],
  },
  {
    name: '九转还魂丹',
    grade: '天级',
    effect: '起死回生',
    successRate: 5,
    time: '三十六年',
    desc: '生死人而肉白骨，纵是魂飞魄散，只要一息尚存，亦可还魂阳间。真正的逆天之丹。',
    detail: '还魂丹夺天地之造化，侵日月之玄机。阎王要你三更死，此丹留你到五更。哪怕是油尽灯枯，魂魄已入幽冥，只要肉身不腐，此丹便可招魂魄，续生机，死而复生。此丹逆天而行，必有天谴。炼此丹者，损自身阳寿，折自身功德。',
    materials: ['幽冥草', '还魂花', '三生石粉', '孟婆汤引', '彼岸花'],
    icon: '💫',
    color: '#a78bfa',
    taboo: ['不可救恶人', '不可滥用', '不可用于敛财'],
    effectValue: 98,
    recipe: ['子时炼魂', '以自身精血为引', '渡自身功德为祭', '以命换命'],
  },
  {
    name: '筑基丹',
    grade: '地级',
    effect: '伐毛洗髓',
    successRate: 30,
    time: '三年',
    desc: '修仙第一步，筑基之本。荡尽尘俗杂质，铸就仙骨道胎。一颗下肚，凡胎换仙根。',
    detail: '筑基乃修仙之根基。万丈高楼平地起，筑基不牢，一切皆是虚妄。此丹荡尽凡胎杂质，化开周身经脉，铸就先天道体。凡人服之，可延寿五十载，增一甲子功力。筑基成功，则仙途坦荡，大道可期。',
    materials: ['筑基草', '灵泉水', '百年朱果', '洗髓花', '炼体液'],
    icon: '🔵',
    color: '#3b82f6',
    taboo: ['根基深厚者无需', '服丹后需静修百日', '不可与他丹同服'],
    effectValue: 80,
    recipe: ['文武火交替', '七七四十九天', '小火慢熬', '适时开炉'],
  },
  {
    name: '聚灵丹',
    grade: '地级',
    effect: '灵力倍增',
    successRate: 50,
    time: '三月',
    desc: '修炼辅助圣品，服之可聚天地灵气于一身，修炼速度倍增。宗门批量炼制的标准丹药。',
    detail: '聚灵丹为修士日常修炼必备。灵气稀薄之地，灵气匮乏之时，一颗聚灵丹便是一条捷径。服之丹田气海扩充一倍，灵气凝聚速度加倍。修士苦修一日抵得十日之功。大宗门弟子月领十颗，常年服用，日积月累，功力日进千里。',
    materials: ['聚灵草', '凝露花', '月光石粉', '聚气散', '凝神草'],
    icon: '💠',
    color: '#06b6d4',
    effectValue: 70,
    recipe: ['月华之夜炼', '吸收月之精华', '凝练灵气', '凝丹成型'],
    taboo: ['不可过量服用', '丹田充盈者不宜', '瓶颈期慎用'],
  },
  {
    name: '大还丹',
    grade: '地级',
    effect: '功力倍增',
    successRate: 65,
    time: '一月',
    desc: '增功添寿之妙药，一颗可抵十年苦修。武林中人趋之若鹜的续命神丹。',
    detail: '大还丹，还精补气还阳。武林中传说中的续命神丹。重伤垂死，一颗便有起死回生之效；油尽灯枯，一颗便有返老还童之功。江湖恩怨，续命十年。得一颗，延寿二十载。侠客岛主，少林方丈，无人不想得此丹。',
    materials: ['千年山参王', '万年灵芝', '天山雪莲', '何首乌王', '熊胆'],
    icon: '🔴',
    color: '#ef4444',
    taboo: ['未满三十岁者不宜', '女子需减量', '阳盛者忌'],
    effectValue: 65,
    recipe: ['慢火细熬', '九九八十一天', '适时添加药引', '密封存养'],
  },
]

interface FlameLevel {
  name: string
  temp: string
  usage: string
  detail: string
  color: string
  key: string
  effect: string[]
}

const FIRES: FlameLevel[] = [
  {
    name: '凡火',
    temp: '几百度',
    usage: '普通丹药',
    detail: '凡人之火，柴火，炭火，油灯。凡俗丹药炼制所用。',
    color: '#ef4444',
    key: '武火急煎，文火慢熬',
    effect: ['普通药材', '易于掌握', '随手可得'],
  },
  {
    name: '地火',
    temp: '数千度',
    usage: '黄级玄级',
    detail: '地脉之火，地肺之火。玄级以下丹师引地火，温度高，温度稳定。',
    color: '#f97316',
    key: '地肺之火，源源不断',
    effect: ['温度稳定', '火力持久', '不需时时照看'],
  },
  {
    name: '三昧真火',
    temp: '万度',
    usage: '地级丹药',
    detail: '修士体内，精气神，三昧火。',
    color: '#8b5cf6',
    key: '修士精气神三昧火，炼精化气，炼气化神',
    effect: ['炼化杂质', '药力精纯', '丹药品级高'],
  },
]

const ALCHEMY_STEPS = [
  '准备药材',
  '提炼精华',
  '文武火候',
  '凝聚丹种',
  '丹转九转',
  '开炉取丹'
]

export default function DanyaoPage() {
  const [filteredPills, setFilteredPills] = useState(PILLS)
  const [expandedPill, setExpandedPill] = useState<string | null>(null)
  const [filteredFires, setFilteredFires] = useState(FIRES)
  const [expandedFire, setExpandedFire] = useState<string | null>(null)
  const [alchemizing, setAlchemizing] = useState(false)
  const [selectedPill, setSelectedPill] = useState<Pill | null>(null)
  const [alchemyStep, setAlchemyStep] = useState(0)
  const [alchemyProgress, setAlchemyProgress] = useState(0)
  const [result, setResult] = useState<{ success: boolean; quality: string } | null>(null)

  const startAlchemy = useCallback((pill: Pill) => {
    setSelectedPill(pill)
    setAlchemizing(true)
    setAlchemyStep(0)
    setAlchemyProgress(0)
    setResult(null)

    let step = 0
    let progress = 0

    const interval = setInterval(() => {
      progress += Math.random() * 3 + 0.5
      if (progress >= 100 && step < ALCHEMY_STEPS.length - 1) {
        progress = 0
        step++
        setAlchemyStep(step)
      }
      if (step >= ALCHEMY_STEPS.length - 1 && progress >= 100) {
        clearInterval(interval)
        setAlchemyProgress(100)

        setTimeout(() => {
          const roll = Math.random() * 100
          const success = roll < pill.successRate
          const quality = success
            ? (roll > pill.successRate * 0.7 ? '极品' : roll > pill.successRate * 0.4 ? '上品' : '中品')
            : '丹毁'

          setResult({ success, quality })
          setAlchemizing(false)
        }, 800)
        return
      }
      setAlchemyProgress(Math.min(progress, 100))
    }, 70)
  }, [])

  const handlePillFilter = useCallback((data: typeof PILLS) => {
    setFilteredPills(data)
  }, [])

  const handleFireFilter = useCallback((data: typeof FIRES) => {
    setFilteredFires(data)
  }, [])

  const pillFilters = {
    searchKeys: ['name', 'grade', 'effect', 'desc', 'detail', 'materials'],
    filterKeys: {
      grade: [...new Set(PILLS.map(p => p.grade))],
    },
    sortOptions: [
      { key: 'effectValue', label: '药效排序' },
      { key: 'successRate', label: '成功率排序' },
      { key: 'name', label: '丹名排序' },
    ],
  }

  const fireFilters = {
    searchKeys: ['name', 'temp', 'usage', 'detail', 'effect'],
  }

  return (
    <SubPageTemplate
      title="丹药方术"
      subtitle="九转金丹 · 白日飞升"
      icon="💊"
      colorRgb="251, 191, 36"
    >
      <SubPageSection title="🔥 太上老君八卦炼丹炉">
        <InfoCard glowIntensity={100} glowColor="251, 191, 36">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!alchemizing && !result ? (
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚗️</div>
                <h3 style={{ marginBottom: '1rem', color: '#fbbf24' }}>八卦炉中炼九转</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  选择一炉丹药，体验丹道造化
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '0.75rem',
                  maxWidth: 700,
                  margin: '0 auto'
                }}>
                  {PILLS.map((pill) => (
                    <motion.div
                      key={pill.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startAlchemy(pill)}
                      style={{
                        padding: '1rem 0.75rem',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${pill.color}20, rgba(30, 30, 40, 0.9))`,
                        border: `1px solid ${pill.color}50`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{pill.icon}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: pill.color, marginBottom: '0.25rem' }}>
                        {pill.name}
                      </div>
                      <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>成功率 {pill.successRate}%</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : alchemizing ? (
              <div>
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  🔥
                </motion.div>
                <h3 style={{ marginBottom: '0.5rem', color: selectedPill?.color }}>
                  正在炼制：{selectedPill?.name}
                </h3>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#f97316',
                  marginBottom: '1rem'
                }}>
                  【{ALCHEMY_STEPS[alchemyStep]}】
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  <ProgressBar value={alchemyProgress} color={selectedPill?.color || '#fbbf24'} />
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  maxWidth: 600,
                  margin: '0 auto',
                  fontSize: '0.7rem'
                }}>
                  {ALCHEMY_STEPS.map((step, i) => (
                    <div key={step} style={{
                      color: i <= alchemyStep ? '#22c55e' : 'rgba(180, 180, 190, 0.4)',
                      fontWeight: i === alchemyStep ? 700 : 400
                    }}>
                      {i + 1}. {step}
                    </div>
                  ))}
                </div>
              </div>
            ) : result ? (
              <div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring' }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  {result.success ? '✨' : '💨'}
                </motion.div>
                <h2 style={{
                  fontSize: '1.8rem',
                  marginBottom: '0.5rem',
                  color: result.success ? '#22c55e' : '#ef4444',
                  fontWeight: 700
                }}>
                  {result.success ? `炼丹成功！【${result.quality}】` : '炸炉了！丹药化为飞烟...'}
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: selectedPill?.color,
                  marginBottom: '0.5rem'
                }}>
                  {selectedPill?.name}
                </p>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  {result.success
                    ? `恭喜！炼出了${result.quality}${selectedPill?.name}，${selectedPill?.effect}！`
                    : '火候没掌握好，下次加油！'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setResult(null)}
                  style={{
                    padding: '0.8rem 2rem',
                    background: 'rgba(251, 191, 36, 0.2)',
                    border: '1px solid #fbbf24',
                    borderRadius: '50px',
                    color: '#fbbf24',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  🔄 再炼一炉
                </motion.button>
              </div>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="📜 丹方大全">
        <FilterBar
          data={PILLS}
          onFiltered={handlePillFilter}
          options={pillFilters}
          placeholder="搜索丹药名称、品级、功效..."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredPills.map((pill) => (
            <InfoCard
              key={pill.name}
              onClick={() => setExpandedPill(expandedPill === pill.name ? null : pill.name)}
              glowIntensity={85}
              glowColor={pill.color.replace('#', '')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.75rem' }}>{pill.icon}</span>
                  <span style={{ fontWeight: 'bold', color: pill.color, fontSize: '1.1rem' }}>{pill.name}</span>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '999px',
                    background: pill.color + '30',
                    color: pill.color,
                  }}>
                    {pill.grade}
                  </span>
                </div>
                {expandedPill === pill.name ? '▲' : '▼'}
              </div>
            </InfoCard>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
