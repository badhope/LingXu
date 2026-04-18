'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface SpiritRoot {
  name: string
  tier: string
  rarity: string
  affinity: number
  cultivationSpeed: number
  ceiling: number
  feature: string
  desc: string
  detail: string
  advantages: string[]
  disadvantages: string[]
  famousCultivators: string[]
  color: string
  icon: string
  element: string
}

interface SpecialConstitution {
  name: string
  rank: number
  rarity: string
  affinity: number
  innateAbility: string
  feature: string
  desc: string
  detail: string
  abilities: string[]
  bottlenecks: string[]
  legendaryFigures: string[]
  color: string
  icon: string
}

const SPIRIT_ROOTS: SpiritRoot[] = [
  {
    name: '混沌体',
    tier: 'SSS级',
    rarity: '万古唯一',
    affinity: 100,
    cultivationSpeed: 100,
    ceiling: 100,
    feature: '万法不侵，大道亲和',
    element: '混沌',
    desc: '诸天第一体质，大道之载体，万法之源头。',
    detail: '混沌体乃是诸天万界第一体质，传说中只有盘古大神拥有过。拥有此体质者，万法不侵，大道亲和，修炼任何功法皆可一日千里。不受五行克制，不受法则束缚，天生便是大道之子。混沌体一出，万灵臣服，诸圣避让。',
    advantages: ['万法不侵', '大道亲和', '修炼无瓶颈', '体质自动进化'],
    disadvantages: ['天妒之体，天劫十倍威力', '无', '无'],
    famousCultivators: ['盘古大神', '混沌老祖', '无名'],
    color: '#1f2937',
    icon: '🌌'
  },
  {
    name: '先天道胎',
    tier: 'SS级',
    rarity: '百万年一遇',
    affinity: 98,
    cultivationSpeed: 95,
    ceiling: 98,
    feature: '与道合真，生而知之',
    element: '道',
    desc: '大道之胎，生而悟道，无需修炼便知天地至理。',
    detail: '先天道胎，传说中最接近大道的体质。拥有此体质者，生而知之，无需修炼便懂得许多天地至理。与道合真，任何神通一学便会，任何瓶颈如履平地。道胎者，天地之子也。',
    advantages: ['生而知之', '与道合真', '神通自悟', '心魔不生'],
    disadvantages: ['体质过强，需积累海量资源', '七情六欲淡漠'],
    famousCultivators: ['老子', '元始天尊', '菩提老祖'],
    color: '#6366f1',
    icon: '🕯️'
  },
  {
    name: '先天圣体',
    tier: 'SS级',
    rarity: '十万年一遇',
    affinity: 95,
    cultivationSpeed: 92,
    ceiling: 95,
    feature: '肉身成圣，万邪不侵',
    element: '圣',
    desc: '天生神圣，肉身无匹，同阶无敌。',
    detail: '先天圣体，天生神圣，肉身强大到极致。同阶之内，徒手便能撕裂法宝，万法不沾身。每一个境界都能达到完美无瑕，同阶无敌，越阶挑战如吃饭喝水。圣体一出，血屠百万里。',
    advantages: ['肉身无双', '同阶无敌', '越阶战斗', '自愈神速'],
    disadvantages: ['进阶所需资源十倍于常人', '圣体劫异常凶险'],
    famousCultivators: ['释迦牟尼', '阿弥陀佛', '斗战胜佛'],
    color: '#fbbf24',
    icon: '👑'
  },
  {
    name: '单系天灵根',
    tier: 'S级',
    rarity: '万年一遇',
    affinity: 90,
    cultivationSpeed: 85,
    ceiling: 90,
    feature: '极致纯粹，一日千里',
    element: '纯五行',
    desc: '五行单一灵根达到极致，修炼对应功法速度惊人。',
    detail: '单系天灵根，五行灵根中的极致。只拥有一种五行灵根，且纯度达到九成以上。修炼对应属性功法时，速度是常人的十倍以上。各大宗门抢着要的天才，未来宗主候选人。',
    advantages: ['修炼速度极快', '同属性功法威力倍增', '瓶颈极少'],
    disadvantages: ['被克制属性压制', '难以兼修其他属性功法'],
    famousCultivators: ['祝融', '共工', '后土'],
    color: '#ef4444',
    icon: '🔥'
  },
  {
    name: '双系灵根',
    tier: 'A级',
    rarity: '千年一遇',
    affinity: 75,
    cultivationSpeed: 70,
    ceiling: 80,
    feature: '阴阳相济，相辅相成',
    element: '双五行',
    desc: '两种五行灵根，相生相克，潜力巨大。',
    detail: '双系灵根，拥有两种相辅相成的五行灵根。如水火相济，木火通明，金水生辉等。虽然修炼速度不及单系天灵根，但胜在变化多端，战斗方式灵活，后期潜力更大。',
    advantages: ['战斗方式灵活', '可组合属性神通', '后期潜力大'],
    disadvantages: ['修炼速度略逊天灵根', '需要平衡两种属性'],
    famousCultivators: ['鬼谷子', '姜子牙', '张良'],
    color: '#06b6d4',
    icon: '☯️'
  },
  {
    name: '三系灵根',
    tier: 'B级',
    rarity: '百年一遇',
    affinity: 55,
    cultivationSpeed: 50,
    ceiling: 65,
    feature: '三才格局，基础扎实',
    element: '三五行',
    desc: '三种灵根俱全，筑基最快，基础最牢。',
    detail: '三系灵根，俗称三才格。筑基速度是所有灵根中最快的，而且基础最为扎实。虽然上限不高，但胜在稳扎稳打，步步为营。外门弟子中的佼佼者。',
    advantages: ['筑基极快', '基础扎实', '不易走火入魔'],
    disadvantages: ['金丹之后进步缓慢', '天花板较低'],
    famousCultivators: ['普通宗门长老', '散修高人'],
    color: '#22c55e',
    icon: '🌲'
  },
  {
    name: '四系灵根',
    tier: 'C级',
    rarity: '常见',
    affinity: 35,
    cultivationSpeed: 30,
    ceiling: 40,
    feature: '四象之体，修炼艰难',
    element: '四五行',
    desc: '四种灵根驳杂，修炼困难，难以出头。',
    detail: '四系灵根，俗称杂灵根。四种灵根相互牵扯，修炼速度极慢。大部分人终身止步于炼气期，难以筑基。外门弟子中的大多数。',
    advantages: ['属性均衡', '不易被克制'],
    disadvantages: ['修炼极慢', '资源消耗大', '难以突破金丹'],
    famousCultivators: ['外门执事', '江湖侠客'],
    color: '#64748b',
    icon: '🌿'
  },
  {
    name: '五系伪灵根',
    tier: 'D级',
    rarity: '凡人常见',
    affinity: 15,
    cultivationSpeed: 10,
    ceiling: 20,
    feature: '五行俱全，庸碌之资',
    element: '五五行',
    desc: '五行俱全但皆微弱，难以修仙。',
    detail: '五系伪灵根，也叫凡根。灵根微弱到几乎无法修仙，百年苦修也难达到炼气三层。大部分凡人都是这种体质，与仙无缘。',
    advantages: ['与常人无异', '长寿健康'],
    disadvantages: ['几乎无法修仙', '终身难以筑基'],
    famousCultivators: ['凡间武者', '武林高手'],
    color: '#78716c',
    icon: '🌾'
  }
]

const SPECIAL_CONSTITUTIONS: SpecialConstitution[] = [
  {
    name: '荒古圣体',
    rank: 1,
    rarity: '时代唯一',
    affinity: 99,
    innateAbility: '上苍霸体',
    feature: '大成圣体，可战大帝',
    desc: '荒古时代最强体质，大成可与大帝叫板。',
    detail: '荒古圣体，荒古时代最强的体质。大成圣体可以叫板大帝，镇压世间一切敌。每一代圣体都有着惊天动地的传说，血战黑暗动乱，守护人族。然而圣体有着诅咒，晚年不详，自古艰难唯一死。',
    abilities: ['肉身恒久远', '血拼大帝', '圣体异象', '克制邪祟'],
    bottlenecks: ['四级苦海', '道宫五重天', '化龙九变', '仙台秘境'],
    legendaryFigures: ['无始大帝前身', '太阳圣皇', '太阴人皇'],
    color: '#dc2626',
    icon: '🗿'
  },
  {
    name: '苍天霸体',
    rank: 2,
    rarity: '万古几人',
    affinity: 97,
    innateAbility: '霸绝天地',
    feature: '天生为战，越战越强',
    desc: '圣体的宿命之敌，血脉不相容。',
    detail: '苍天霸体，荒古圣体的宿命之敌。两种体质天生水火不容，相遇必有一战，不死不休。霸体天生为战斗而生，越战越强，遇强则强。霸血沸腾之时，神挡杀神，佛挡杀佛。',
    abilities: ['越战越强', '霸血沸腾', '压制其他体质', '战斗本能'],
    bottlenecks: ['每一大境界都需血战突破'],
    legendaryFigures: ['苍家始祖', '霸血老人'],
    color: '#7c3aed',
    icon: '💀'
  },
  {
    name: '太阴仙体',
    rank: 3,
    rarity: '人族母气',
    affinity: 95,
    innateAbility: '太阴真经',
    feature: '人族母气，万法之源',
    desc: '太阴人皇体质，母仪天下。',
    detail: '太阴仙体，人族母气所钟。拥有此体质者皆是女子，天生便是皇道之尊。太阴仙体的始祖开创太阴真经，为人族最古老的功法之一。太阴之力，净化万物，滋养众生。',
    abilities: ['太阴神则', '净化万物', '不死神药', '庇护人族'],
    bottlenecks: ['情关', '杀劫'],
    legendaryFigures: ['太阴人皇', '广寒宫主'],
    color: '#f472b6',
    icon: '🌙'
  },
  {
    name: '太阳圣体',
    rank: 4,
    rarity: '人族父气',
    affinity: 95,
    innateAbility: '太阳真经',
    feature: '人族父气，刚正不阿',
    desc: '太阳圣皇体质，光明正大。',
    detail: '太阳圣体，人族父气所钟。拥有此体质者皆是男子，天生便是皇道至尊。太阳圣体的始祖开创太阳真经，为人族最古老的功法。太阳之火，焚烧一切邪恶，驱散一切黑暗。',
    abilities: ['太阳真火', '焚烧邪恶', '光明普照', '庇护人族'],
    bottlenecks: ['杀戮过重', '业火焚身'],
    legendaryFigures: ['太阳圣皇', '炎帝'],
    color: '#fb923c',
    icon: '☀️'
  },
  {
    name: '吞天魔体',
    rank: 5,
    rarity: '禁忌体质',
    affinity: 90,
    innateAbility: '吞噬万物',
    feature: '吞噬他人本源，成就自身',
    desc: '最邪恶的体质，吞噬他人道基为己用。',
    detail: '吞天魔体，诸天禁忌体质。可以吞噬他人的本源、道行、道基，化为己用。修行速度快到极致，然而也造下无边杀业。每一个吞天魔体的出现，都是一场血雨腥风，血流成河。',
    abilities: ['吞噬本源', '掠夺道行', '无限潜力', '魔功天成'],
    bottlenecks: ['心魔反噬', '业劫加身', '举世皆敌'],
    legendaryFigures: ['狠人大帝', '吞天老魔'],
    color: '#1f2937',
    icon: '🦇'
  },
  {
    name: '不死仙胎',
    rank: 6,
    rarity: '长生世家',
    affinity: 88,
    innateAbility: '不死神术',
    feature: '九死九生，越战越强',
    desc: '不死山传承，每死一次便强大一分。',
    detail: '不死仙胎，不死山的传承体质。拥有九命，每死一次，涅槃重生，实力便会更上一层楼。九死九生之后，便会成就不死真身。然而每一次死亡，都是一场豪赌，失败便是真的死了。',
    abilities: ['九条命', '涅槃重生', '不死神术', '愈战愈强'],
    bottlenecks: ['九死九生关', '每一次死亡都是考验'],
    legendaryFigures: ['不死天皇', '不死山主'],
    color: '#14b8a6',
    icon: '🔥'
  },
  {
    name: '先天道胎混沌体',
    rank: 7,
    rarity: '传说级',
    affinity: 100,
    innateAbility: '万道归一',
    feature: '两种至强体质合一，古今未来无双',
    desc: '先天道胎与混沌体的结合，史上仅见。',
    detail: '先天道胎混沌体，传说中的最强体质。先天道胎与混沌体合二为一，古今未来仅此一例。拥有者天生便是仙帝之姿，一路横推过去，无敌世间，镇压九天十地，威压古今未来。',
    abilities: ['万道归一', '帝落时代', '他化自在', '万古唯一'],
    bottlenecks: ['仙帝之路'],
    legendaryFigures: ['叶凡', '无始', '狠人'],
    color: '#a855f7',
    icon: '👁️'
  }
]

export default function LinggenPage() {
  const [filteredRoots, setFilteredRoots] = useState(SPIRIT_ROOTS)
  const [expandedRoot, setExpandedRoot] = useState<string | null>(null)
  const [filteredConstitutions, setFilteredConstitutions] = useState(SPECIAL_CONSTITUTIONS)
  const [expandedConstitution, setExpandedConstitution] = useState<string | null>(null)

  const handleRootFilter = useCallback((data: typeof SPIRIT_ROOTS) => {
    setFilteredRoots(data)
  }, [])

  const handleConstitutionFilter = useCallback((data: typeof SPECIAL_CONSTITUTIONS) => {
    setFilteredConstitutions(data)
  }, [])

  const rootFilters = {
    searchKeys: ['name', 'tier', 'rarity', 'feature', 'desc', 'detail', 'element'],
    filterKeys: {
      tier: [...new Set(SPIRIT_ROOTS.map(r => r.tier))],
      element: [...new Set(SPIRIT_ROOTS.map(r => r.element))],
    },
    sortOptions: [
      { key: 'affinity', label: '亲和度排序' },
      { key: 'cultivationSpeed', label: '修炼速度' },
      { key: 'ceiling', label: '潜力上限' },
    ],
  }

  const constitutionFilters = {
    searchKeys: ['name', 'rarity', 'innateAbility', 'feature', 'desc', 'detail', 'abilities'],
    filterKeys: {
      rarity: [...new Set(SPECIAL_CONSTITUTIONS.map(c => c.rarity))],
    },
    sortOptions: [
      { key: 'rank', label: '排名排序' },
      { key: 'affinity', label: '亲和度排序' },
      { key: 'name', label: '体质名称' },
    ],
  }

  return (
    <SubPageTemplate
      title="灵根资质"
      subtitle="灵根天授 · 资质有别 · 大道面前 · 人人不平等"
      icon="🌱"
      colorRgb="34, 197, 94"
    >
      <SubPageSection title="灵根品级">
        <FilterBar
          data={SPIRIT_ROOTS}
          onFiltered={handleRootFilter}
          options={rootFilters}
          placeholder="搜索灵根名称、品级、特性..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRoots.map((root, idx) => (
            <motion.div key={root.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                title={`${root.icon} ${root.name}`}
                subtitle={root.tier}
                glowColor={root.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedRoot(expandedRoot === root.name ? null : root.name)}
              >
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">{root.desc}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>灵根亲和</span>
                      <span>{root.affinity}%</span>
                    </div>
                    <ProgressBar value={root.affinity} color={root.color} />
                    <div className="flex justify-between text-xs">
                      <span>修炼速度</span>
                      <span>{root.cultivationSpeed}%</span>
                    </div>
                    <ProgressBar value={root.cultivationSpeed} color={root.color} />
                    <div className="flex justify-between text-xs">
                      <span>潜力上限</span>
                      <span>{root.ceiling}%</span>
                    </div>
                    <ProgressBar value={root.ceiling} color={root.color} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{root.rarity}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{root.element}属性</span>
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedRoot === root.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedRoot === root.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t space-y-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">详细介绍</h5>
                          <p className="text-sm text-gray-600">{root.detail}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-sm mb-2 text-green-600">优势</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {root.advantages.map((a, i) => (
                                <li key={i}>✓ {a}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-sm mb-2 text-red-600">劣势</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {root.disadvantages.map((d, i) => (
                                <li key={i}>✗ {d}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">代表人物</h5>
                          <div className="flex flex-wrap gap-2">
                            {root.famousCultivators.map((c, i) => (
                              <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                                {c}
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

      <SubPageSection title="洪荒十大特殊体质">
        <FilterBar
          data={SPECIAL_CONSTITUTIONS}
          onFiltered={handleConstitutionFilter}
          options={constitutionFilters}
          placeholder="搜索特殊体质名称、天赋能力..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredConstitutions.map((cons, idx) => (
            <motion.div key={cons.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                title={`${cons.icon} ${cons.name}`}
                subtitle={`第${cons.rank}名`}
                glowColor={cons.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedConstitution(expandedConstitution === cons.name ? null : cons.name)}
              >
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">{cons.desc}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold">天赋：</span>
                    <span className="px-2 py-0.5 text-white rounded text-xs" style={{ backgroundColor: cons.color }}>
                      {cons.innateAbility}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>大道亲和</span>
                    <span>{cons.affinity}%</span>
                  </div>
                  <ProgressBar value={cons.affinity} color={cons.color} />
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">{cons.rarity}</span>
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedConstitution === cons.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedConstitution === cons.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t space-y-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">详细介绍</h5>
                          <p className="text-sm text-gray-600">{cons.detail}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">天赋能力</h5>
                          <div className="flex flex-wrap gap-2">
                            {cons.abilities.map((a, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2 text-orange-600">瓶颈关卡</h5>
                          <div className="flex flex-wrap gap-2">
                            {cons.bottlenecks.map((b, i) => (
                              <span key={i} className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">传说人物</h5>
                          <div className="flex flex-wrap gap-2">
                            {cons.legendaryFigures.map((f, i) => (
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
