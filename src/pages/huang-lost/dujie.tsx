'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface HeavenlyTribulation {
  name: string
  tier: string
  difficulty: number
  mortality: number
  reward: string
  feature: string
  desc: string
  detail: string
  waves: string[]
  survivalMethods: string[]
  survivors: string[]
  color: string
  icon: string
}

interface AscensionPath {
  name: string
  rank: number
  difficulty: number
  safety: number
  merit: number
  feature: string
  desc: string
  detail: string
  requirements: string[]
  benefits: string[]
  legendaryFigures: string[]
  color: string
  icon: string
}

const TRIBULATIONS: HeavenlyTribulation[] = [
  {
    name: '九九重劫',
    tier: 'SSS级',
    difficulty: 100,
    mortality: 99.99,
    reward: '直接成仙',
    feature: '九九天劫，不死即成道',
    desc: '传说中最强天劫，渡过即是大罗金仙。',
    detail: '九九重劫，传说中最强的天劫。共分九九八十一波，一波强过一波。每一波都相当于一位大能的全力一击。传说中，盘古开天之后，就渡过了九九重劫。能够渡过此劫者，万中无一。一旦渡过，直接成就大罗金仙道果。',
    waves: ['九重天雷', '九天玄火', '九天弱水', '九天神风', '九天庚金', '心魔劫', '天人五衰', '业火焚身', '九九归一'],
    survivalMethods: ['至宝护体', '大功德在身', '圣人护佑', '以力证道'],
    survivors: ['盘古', '女娲', '三清', '接引', '准提'],
    color: '#7c3aed',
    icon: '⚡'
  },
  {
    name: '三重雷劫',
    tier: 'S级',
    difficulty: 90,
    mortality: 95,
    reward: '大乘可期',
    feature: '三重复合劫，天、地、人',
    desc: '渡劫期标准配置，九死一生。',
    detail: '三重雷劫，渡劫期修士的标准配置。共分三重：天劫、地劫、人劫。每一重劫都能灭杀九成以上的渡劫修士。能够渡过三重雷劫者，百中无一。渡过之后，便是大乘期陆地神仙，等待飞升。',
    waves: ['六九天劫', '心魔劫', '人劫'],
    survivalMethods: ['渡劫法宝', '阵法守护', '宗门护山大阵', '丹药续命'],
    survivors: ['各大宗大乘老祖', '散修巨擘'],
    color: '#ef4444',
    icon: '⛈️'
  },
  {
    name: '化神雷劫',
    tier: 'A级',
    difficulty: 75,
    mortality: 80,
    reward: '化神成功',
    feature: '婴化元神，雷劫洗礼',
    desc: '化神期雷劫，淘汰九成元婴。',
    detail: '化神雷劫，元婴化神的必经之路。天雷洗礼元神，净化元婴之中的杂质。能够渡过化神雷劫的元婴，十不存一。大部分修士，终其一生也无法突破化神。',
    waves: ['三重天雷', '心魔考验', '元神净化'],
    survivalMethods: ['元婴足够强大', '九品元婴', '灵宝护体'],
    survivors: ['化神老祖', '大宗太上长老'],
    color: '#f97316',
    icon: '🌩️'
  },
  {
    name: '四九天劫',
    tier: 'B级',
    difficulty: 60,
    mortality: 65,
    reward: '金丹成就',
    feature: '筑基破金丹，四九小天劫。',
    desc: '筑基修士结金丹的天劫。',
    detail: '四九天劫，筑基修士凝结金丹时降下的小天劫。共分四重，每重九道天雷。虽然不算太强，但也足以灭杀六成以上的筑基修士。也有不少修士借助宗门大阵，可以安稳渡过。',
    waves: ['三十六道天雷', '丹火焚身', '金丹定型'],
    survivalMethods: ['筑基完美', '结金丹药', '护山大阵'],
    survivors: ['宗门金丹长老', '内门精英'],
    color: '#fbbf24',
    icon: '🔥'
  },
  {
    name: '心魔劫',
    tier: 'A级',
    difficulty: 95,
    mortality: 90,
    reward: '道心圆满',
    feature: '看不见的劫，最是致命',
    desc: '每一个大境界都会遭遇的心魔劫。',
    detail: '心魔劫，最致命的天劫。不遭雷，不遭火，只在一念之间。多少大能，多少天骄，没有死在天雷之下，反而陨落在了心魔劫中。道心不坚者，永远无法走到最后。',
    waves: ['七情六欲', '前生今世', '未来幻象', '最在乎的人', '最恐惧的事', '大道诱惑'],
    survivalMethods: ['道心坚定', '清心咒', '大智慧', '斩三尸'],
    survivors: ['所有走到最后的修士'],
    color: '#1f2937',
    icon: '👁️'
  },
  {
    name: '业火劫',
    tier: 'S级',
    difficulty: 98,
    mortality: 99,
    reward: '业力净化',
    feature: '杀业越重，劫数越猛',
    desc: '杀业过重者必会遭遇的劫数。',
    detail: '业火劫，杀业过重者必会遭遇的劫数。杀一人，便有一分业力。杀百万人，业力滔天。业火焚身，从灵魂深处开始燃烧。业力越重者，业火劫越猛烈。多少凶人，多少魔头，最后都死在了业火焚身之下。',
    waves: ['自身业火', '众生怨念', '血债血偿'],
    survivalMethods: ['大功德抵消', '皈依佛门', '发大宏愿', '普渡众生'],
    survivors: ['放下屠刀者', '大功德之人'],
    color: '#dc2626',
    icon: '🔥'
  },
  {
    name: '天人五衰',
    tier: 'SS级',
    difficulty: 99,
    mortality: 99.9,
    reward: '跳出轮回',
    feature: '寿元将尽，天地灭法',
    desc: '大乘期必死之劫，无人可免。',
    detail: '天人五衰，大乘期修士必死之劫。无人可以避免，无人可以逃脱。寿元将尽之时，天地灭法，大道都要寂灭。修士若不能在天人五衰降临之前飞升，便会身死道消，化为黄土。',
    waves: ['衣裳垢腻', '头上花萎', '身体臭秽', '腋下汗出', '不乐本座'],
    survivalMethods: ['立刻飞升', '兵解重修', '夺舍重生', '自封仙源'],
    survivors: ['飞升者', '兵解者'],
    color: '#64748b',
    icon: '💀'
  },
  {
    name: '散仙劫',
    tier: 'A级',
    difficulty: 70,
    mortality: 70,
    reward: '再存千年',
    feature: '每千年一次，永无止境',
    desc: '兵解散仙的千年之劫。',
    detail: '散仙劫，兵解成为散仙之后，每千年一次的劫数。永无止境，直到渡过十二重散仙劫，或者魂飞魄散。散仙，看似逍遥，实则是最苦的一群人。',
    waves: ['千年雷劫', '千年心劫', '千年业劫'],
    survivalMethods: ['积累实力', '寻找洞府', '抱大腿'],
    survivors: ['十二劫散仙', '散仙老怪'],
    color: '#06b6d4',
    icon: '👻'
  }
]

const ASCENSION_PATHS: AscensionPath[] = [
  {
    name: '以力证道',
    rank: 1,
    difficulty: 100,
    safety: 5,
    merit: 100,
    feature: '打破枷锁，我命由我',
    desc: '最强的证道之路，也是最难的路。',
    detail: '以力证道，也是最艰难的证道之路。不靠天，不靠地，不靠功德，不靠气运。只靠自身力量，打碎虚空，强行证道。一旦成功，便是同阶之中最强的存在。盘古开天，便是以力证道。',
    requirements: ['力量突破天际', '打破大道枷锁', '无人能阻你证道', '大毅力大智慧大机缘'],
    benefits: ['同阶最强', '不受天道控制', '最自由的道', '战力天花板'],
    legendaryFigures: ['盘古大神'],
    color: '#7c3aed',
    icon: '💪'
  },
  {
    name: '功德证道',
    rank: 2,
    difficulty: 80,
    safety: 95,
    merit: 95,
    feature: '大功德在身，天道庇佑',
    desc: '最稳妥的证道之路，女娲造人便是。',
    detail: '功德证道，最稳妥的证道之路。立下大功德，天道自然降下气运加持，助你证道。女娲造人，炼石补天，立下无量功德，便直接成圣。此道最安全，几乎没有风险。',
    requirements: ['立下无量功德', '天道认可', '众生拥戴'],
    benefits: ['最安全', '天道庇佑', '气运加持'],
    legendaryFigures: ['女娲', '三清立教', '接引准提'],
    color: '#22c55e',
    icon: '🙏'
  },
  {
    name: '斩三尸证道',
    rank: 3,
    difficulty: 90,
    safety: 50,
    merit: 90,
    feature: '善尸恶尸自我尸，三尸合一',
    desc: '三清的证道之路，艰难而强大。',
    detail: '斩三尸证道，太上老君、元始天尊、通天教主的证道之路。斩去善尸、恶尸、自我尸，三尸合一，便证得大道。此道艰难无比，但成功之后实力也极其强大。',
    requirements: ['斩善尸', '斩恶尸', '斩自我尸', '三尸合一'],
    benefits: ['实力强大', '道心圆满', '心魔不生'],
    legendaryFigures: ['太上老君', '元始天尊', '通天教主'],
    color: '#6366f1',
    icon: '✂️'
  },
  {
    name: '白日飞升',
    rank: 4,
    difficulty: 70,
    safety: 60,
    merit: 70,
    feature: '功行圆满，天门开，仙人接引',
    desc: '最正统的飞升之路，凡人成仙的标准途径。',
    detail: '白日飞升，最正统的飞升之路。修行到功行圆满之时，天门自然开启，仙乐袅袅，异香满室，有仙人前来接引。飞升之后，便是仙界仙人，位列仙班。这也是凡人成仙的标准途径。',
    requirements: ['大乘期圆满', '功行圆满', '没有业力缠身', '等待天门开启'],
    benefits: ['仙界正式编制', '仙人待遇', '长生久视'],
    legendaryFigures: ['各大宗飞升祖师', '人间散仙'],
    color: '#fbbf24',
    icon: '🌟'
  },
  {
    name: '兵解飞升',
    rank: 5,
    difficulty: 50,
    safety: 80,
    merit: 50,
    feature: '舍去肉身，元神飞升',
    desc: '肉身已死，大道无望，兵解求活。',
    detail: '兵解飞升，肉身已死，大道无望之下的无奈选择。舍去肉身，以元神之躯兵解。虽然失去肉身，但至少还能活着。成为散仙，或者转修鬼仙之道。好死不如赖活着。',
    requirements: ['肉身被毁', '元婴/元神完好', '壮士断腕的勇气'],
    benefits: ['至少活着', '还有希望', '散仙逍遥'],
    legendaryFigures: ['兵解散仙', '鬼仙'],
    color: '#64748b',
    icon: '💀'
  },
  {
    name: '肉体成圣',
    rank: 6,
    difficulty: 95,
    safety: 10,
    merit: 95,
    feature: '肉身不朽，万劫不磨',
    desc: '最强的体质之路，肉身成圣。',
    detail: '肉体成圣，炼体士的终极之路。不修真气，不修元神，只修肉身。将肉身修炼到万劫不磨的地步，肉身成圣。此道艰难无比，但一旦成功，同阶之中，徒手便能撕裂一切。',
    requirements: ['肉身恒久远', '每一个境界完美', '无数天材地宝打熬'],
    benefits: ['肉身无敌', '万法不侵', '同阶近战无敌'],
    legendaryFigures: ['孙悟空', '二郎神', '十二祖巫'],
    color: '#ef4444',
    icon: '🦾'
  },
  {
    name: '偷天成道',
    rank: 7,
    difficulty: 85,
    safety: 20,
    merit: 20,
    feature: '盗取天机，逆天而行',
    desc: '魔道捷径，风险与收益并存。',
    detail: '偷天成道，魔道的捷径。盗取天机，逆天而行，掠夺他人道果，成就自身。此道来的最快，但是也最危险。天发杀机，报应不爽。百分之九十九的偷天者，最后都死得很惨。',
    requirements: ['掠夺他人道果', '逆天而行', '不怕报应'],
    benefits: ['进步神速', '力量来得快', '不需要积累'],
    legendaryFigures: ['吞天魔功创造者', '魔道巨擘'],
    color: '#1f2937',
    icon: '🦇'
  },
  {
    name: '香火成神道',
    rank: 8,
    difficulty: 40,
    safety: 90,
    merit: 60,
    feature: '享受人间香火，成神作佛',
    desc: '最容易的道，也是最不自由的道。',
    detail: '香火成神道，最容易，也是最不自由的道。不需要修炼到多么高深的境界，只需要在人间立下信仰，享受众生香火，便可以成为神灵。山神、土地、城隍、龙王，走的都是这条路。',
    requirements: ['人间信仰', '众生香火', '天庭册封'],
    benefits: ['容易成功', '长生久视', '天庭编制'],
    legendaryFigures: ['山神土地', '城隍龙王', '雷公电母'],
    color: '#f97316',
    icon: '🛕'
  }
]

const TRIBULATION_WAVES = [
  '天雷洗体',
  '丹火焚身',
  '九天玄火',
  '九天弱水',
  '心魔考验',
  '业火焚身',
  '天人五衰',
  '大道认可'
]

export default function DujiePage() {
  const [filteredTribs, setFilteredTribs] = useState(TRIBULATIONS)
  const [expandedTrib, setExpandedTrib] = useState<string | null>(null)
  const [filteredPaths, setFilteredPaths] = useState(ASCENSION_PATHS)
  const [expandedPath, setExpandedPath] = useState<string | null>(null)
  const [tribulating, setTribulating] = useState(false)
  const [selectedTrib, setSelectedTrib] = useState<HeavenlyTribulation | null>(null)
  const [tribWave, setTribWave] = useState(0)
  const [tribProgress, setTribProgress] = useState(0)
  const [hp, setHp] = useState(100)
  const [tribResult, setTribResult] = useState<{ success: boolean; msg: string } | null>(null)

  const startTribulation = useCallback((trib: HeavenlyTribulation) => {
    setSelectedTrib(trib)
    setTribulating(true)
    setTribWave(0)
    setTribProgress(0)
    setHp(100)
    setTribResult(null)

    let wave = 0
    let progress = 0
    let health = 100

    const interval = setInterval(() => {
      progress += Math.random() * 4 + 1
      health -= Math.random() * trib.difficulty / 15

      if (health <= 0) {
        clearInterval(interval)
        setHp(0)
        setTimeout(() => {
          setTribResult({ success: false, msg: '未能渡过雷劫，肉身化为飞灰，元神俱灭...' })
          setTribulating(false)
        }, 500)
        return
      }

      if (progress >= 100 && wave < TRIBULATION_WAVES.length - 1) {
        progress = 0
        wave++
        setTribWave(wave)
      }
      if (wave >= TRIBULATION_WAVES.length - 1 && progress >= 100) {
        clearInterval(interval)
        setTribProgress(100)
        setTimeout(() => {
          setTribResult({ success: true, msg: `雷劫渡过！${trib.reward}！大道可期！` })
          setTribulating(false)
        }, 800)
        return
      }
      setTribProgress(Math.min(progress, 100))
      setHp(Math.max(0, health))
    }, 60)
  }, [])

  const handleTribFilter = useCallback((data: typeof TRIBULATIONS) => {
    setFilteredTribs(data)
  }, [])

  const handlePathFilter = useCallback((data: typeof ASCENSION_PATHS) => {
    setFilteredPaths(data)
  }, [])

  const tribFilters = {
    searchKeys: ['name', 'tier', 'feature', 'desc', 'detail', 'waves', 'survivalMethods'],
    filterKeys: {
      tier: [...new Set(TRIBULATIONS.map(t => t.tier))],
    },
    sortOptions: [
      { key: 'difficulty', label: '难度排序' },
      { key: 'mortality', label: '死亡率排序' },
      { key: 'name', label: '天劫名称' },
    ],
  }

  const pathFilters = {
    searchKeys: ['name', 'feature', 'desc', 'detail', 'requirements', 'benefits', 'legendaryFigures'],
    filterKeys: {},
    sortOptions: [
      { key: 'rank', label: '排名排序' },
      { key: 'difficulty', label: '难度排序' },
      { key: 'safety', label: '安全性排序' },
    ],
  }

  return (
    <SubPageTemplate
      title="渡劫飞升"
      subtitle="天地为炉 · 造化为工 · 阴阳为炭 · 万物为铜"
      icon="⚡"
      colorRgb="239, 68, 68"
    >
      <SubPageSection title="⚡ 九霄雷劫渡劫台">
        <InfoCard glowIntensity={100} glowColor="147, 51, 234">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!tribulating && !tribResult ? (
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⛈️</div>
                <h3 style={{ marginBottom: '1rem', color: '#7c3aed' }}>天劫之下，谁人能渡？</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  选择一重雷劫，踏上你的渡劫之路
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  maxWidth: 700,
                  margin: '0 auto'
                }}>
                  {TRIBULATIONS.slice(0, 4).map((trib) => (
                    <motion.div
                      key={trib.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startTribulation(trib)}
                      style={{
                        padding: '1rem 0.75rem',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${trib.color}25, rgba(40, 40, 50, 0.9))`,
                        border: `1px solid ${trib.color}50`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{trib.icon}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: trib.color, marginBottom: '0.25rem' }}>
                        {trib.name}
                      </div>
                      <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>死亡率 {trib.mortality}%</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : tribulating ? (
              <div>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  ⚡
                </motion.div>
                <h3 style={{ marginBottom: '0.5rem', color: selectedTrib?.color }}>
                  正在渡：{selectedTrib?.name}
                </h3>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#ef4444'
                }}>
                  【{TRIBULATION_WAVES[tribWave]}】
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1rem' }}>
                  <div style={{ textAlign: 'left', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: hp > 50 ? '#22c55e' : hp > 25 ? '#f59e0b' : '#ef4444' }}>
                      ❤️ 生命值 {Math.round(hp)}%
                    </span>
                  </div>
                  <ProgressBar value={hp} color={hp > 50 ? '#22c55e' : hp > 25 ? '#f59e0b' : '#ef4444'} />
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  <ProgressBar value={tribProgress} color={selectedTrib?.color || '#7c3aed'} />
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  maxWidth: 700,
                  margin: '0 auto',
                  fontSize: '0.65rem'
                }}>
                  {TRIBULATION_WAVES.map((w, i) => (
                    <div key={w} style={{
                      color: i <= tribWave ? '#7c3aed' : 'rgba(180, 180, 190, 0.4)',
                      fontWeight: i === tribWave ? 700 : 400
                    }}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            ) : tribResult ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    animate={tribResult.success ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ fontSize: '5rem', marginBottom: '1rem' }}
                  >
                    {tribResult.success ? '🎉' : '💀'}
                  </motion.div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    color: tribResult.success ? '#22c55e' : '#ef4444',
                    fontWeight: 700
                  }}>
                    {tribResult.success ? '渡劫成功！大道在望！' : '渡劫失败...身死道消'}
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: selectedTrib?.color,
                    marginBottom: '0.5rem'
                  }}>
                    {selectedTrib?.name}
                  </p>
                  <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                    {tribResult.msg}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTribResult(null)}
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
                    🔄 再来一次
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="🌩️ 雷劫种类">
        <FilterBar
          data={TRIBULATIONS}
          onFiltered={handleTribFilter}
          options={tribFilters}
          placeholder="搜索天劫名称、难度、渡劫方法..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTribs.map((trib, idx) => (
            <motion.div key={trib.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                title={`${trib.icon} ${trib.name}`}
                subtitle={`${trib.tier} ${trib.reward}`}
                glowColor={trib.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedTrib(expandedTrib === trib.name ? null : trib.name)}
              >
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">{trib.desc}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>难度</span>
                      <span>{trib.difficulty}%</span>
                    </div>
                    <ProgressBar value={trib.difficulty} color={trib.color} />
                    <div className="flex justify-between text-xs">
                      <span>死亡率</span>
                      <span>{trib.mortality}%</span>
                    </div>
                    <ProgressBar value={trib.mortality} color="#ef4444" />
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="px-2 py-0.5 text-white rounded text-xs" style={{ backgroundColor: trib.color }}>
                      {trib.feature}
                    </span>
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedTrib === trib.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedTrib === trib.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t space-y-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">详细介绍</h5>
                          <p className="text-sm text-gray-600">{trib.detail}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">劫数波次</h5>
                          <div className="flex flex-wrap gap-2">
                            {trib.waves.map((w, i) => (
                              <span key={i} className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs">
                                {w}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2 text-green-600">生存法门</h5>
                          <div className="flex flex-wrap gap-2">
                            {trib.survivalMethods.map((m, i) => (
                              <span key={i} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">历史幸存者</h5>
                          <div className="flex flex-wrap gap-2">
                            {trib.survivors.map((s, i) => (
                              <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </InfoCard>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="证道八门">
        <FilterBar
          data={ASCENSION_PATHS}
          onFiltered={handlePathFilter}
          options={pathFilters}
          placeholder="搜索证道方法、条件、代表人物..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPaths.map((path, idx) => (
            <motion.div key={path.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                title={`${path.icon} ${path.name}`}
                subtitle={`第${path.rank}名`}
                glowColor={path.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedPath(expandedPath === path.name ? null : path.name)}
              >
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">{path.desc}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ color: path.color }}>{path.difficulty}</div>
                      <div className="text-xs text-gray-500">难度</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{path.safety}</div>
                      <div className="text-xs text-gray-500">安全</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-amber-600">{path.merit}</div>
                      <div className="text-xs text-gray-500">道果</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="px-2 py-0.5 text-white rounded text-xs" style={{ backgroundColor: path.color }}>
                      {path.feature}
                    </span>
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedPath === path.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedPath === path.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t space-y-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">详细介绍</h5>
                          <p className="text-sm text-gray-600">{path.detail}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">证道条件</h5>
                          <div className="flex flex-wrap gap-2">
                            {path.requirements.map((r, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2 text-green-600">证道收益</h5>
                          <div className="flex flex-wrap gap-2">
                            {path.benefits.map((b, i) => (
                              <span key={i} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">传说人物</h5>
                          <div className="flex flex-wrap gap-2">
                            {path.legendaryFigures.map((f, i) => (
                              <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
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
