'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface GoldenCore {
  name: string
  grade: string
  rank: number
  purity: number
  power: number
  longevity: number
  feature: string
  desc: string
  detail: string
  phenomena: string[]
  breakthroughMethods: string[]
  famousFigures: string[]
  color: string
  icon: string
}

interface NascentSoul {
  name: string
  tier: string
  rank: number
  power: number
  ability: number
  immortality: number
  feature: string
  desc: string
  detail: string
  divinePowers: string[]
  bottlenecks: string[]
  legendaryCultivators: string[]
  color: string
  icon: string
}

const GOLDEN_CORES: GoldenCore[] = [
  {
    name: '混沌金丹',
    grade: 'SSS级',
    rank: 1,
    purity: 100,
    power: 100,
    longevity: 10000,
    feature: '大道金丹，万法归一',
    desc: '传说中的终极金丹，盘古大神所证。',
    detail: '混沌金丹，传说中的终极金丹。只有盘古大神曾经证得此丹。金丹蕴含混沌之气，内衍一方世界。一粒金丹可化生万物，破丹即可立地成圣。此丹无劫无难，大道坦途。',
    phenomena: ['混沌氤氲', '地水火风', '开天辟地', '万物化生'],
    breakthroughMethods: ['以力证道', '开天辟地', '混沌道果'],
    famousFigures: ['盘古大神'],
    color: '#1f2937',
    icon: '🌌'
  },
  {
    name: '太级金丹',
    grade: 'SS级',
    rank: 2,
    purity: 99,
    power: 95,
    longevity: 5000,
    feature: '太极阴阳，生生不息',
    desc: '太上老君所证金丹，阴阳相济，生生不息。',
    detail: '太极金丹，道德天尊太上老君所证之金丹。金丹分阴阳二气，运转太极，生生不息。金丹一成，万劫不磨，跳出三界外，不在五行中。太极金丹者，道之化身也。',
    phenomena: ['太极图现', '金桥横空', '万法朝宗', '地涌金莲'],
    breakthroughMethods: ['道德经全文', '无为道果', '太上忘情'],
    famousFigures: ['太上老君', '老子'],
    color: '#fbbf24',
    icon: '☯️'
  },
  {
    name: '九转金丹',
    grade: 'S级',
    rank: 3,
    purity: 90,
    power: 85,
    longevity: 2000,
    feature: '九转还丹，九死一生',
    desc: '金丹九转，每转皆是脱胎换骨。',
    detail: '九转金丹，修真界公认的最强金丹大道。每一转都要经历一次生死劫难，九死一生。然而每一转之后，实力都会发生天翻地覆的变化。九转之后，元婴之路一片坦途。',
    phenomena: ['九重天劫', '脱胎换骨', '洗髓伐脉', '金丹放光'],
    breakthroughMethods: ['九转玄功', '生死九劫', '大毅力大智慧'],
    famousFigures: ['孙悟空', '二郎神', '哪咤'],
    color: '#ef4444',
    icon: '🔥'
  },
  {
    name: '丈六金身金丹',
    grade: 'S级',
    rank: 4,
    purity: 88,
    power: 88,
    longevity: 3000,
    feature: '金身不灭，万法不侵',
    desc: '佛门无上金丹，铸就丈六金身。',
    detail: '丈六金身金丹，佛门无上大法。金丹一成，便铸就丈六金身，万法不侵，万劫不灭。金身如金刚，不坏不朽。西方极乐世界诸佛皆证此道。',
    phenomena: ['金光万丈', '天龙环绕', '天花乱坠', '地涌金莲'],
    breakthroughMethods: ['四十八愿', '普渡众生', '菩提道果'],
    famousFigures: ['释迦牟尼', '阿弥陀佛', '药师佛'],
    color: '#fbbf24',
    icon: '🪷'
  },
  {
    name: '一品金丹',
    grade: 'A级',
    rank: 5,
    purity: 80,
    power: 75,
    longevity: 1500,
    feature: '完美无瑕，同阶无敌',
    desc: '修真界标准的顶级金丹。',
    detail: '一品金丹，修真界公认的完美金丹。金丹品质达到极致，无瑕无垢，完美无瑕。结成一品金丹者，同阶之内无敌手，越阶挑战亦非难事。各大宗门圣子圣女的标配。',
    phenomena: ['金丹九色', '天女散花', '龙凤呈祥', '百灵来朝'],
    breakthroughMethods: ['完美筑基', '天材地宝', '宗门秘法'],
    famousFigures: ['各大宗圣子', '圣女', '天骄'],
    color: '#a855f7',
    icon: '💎'
  },
  {
    name: '二品金丹',
    grade: 'B级',
    rank: 6,
    purity: 65,
    power: 60,
    longevity: 1000,
    feature: '中规中矩，稳扎稳打',
    desc: '普通修士的金丹，稳扎稳打。',
    detail: '二品金丹，普通修士能够结成的最好金丹。品质中规中矩，虽然没有一品金丹那样惊艳，但胜在稳扎稳打，根基牢固。元婴之路虽然艰难，但并非没有希望。',
    phenomena: ['金丹五色', '祥云缭绕', '异香满室'],
    breakthroughMethods: ['扎实基础', '步步为营', '厚积薄发'],
    famousFigures: ['宗门长老', '内门精英'],
    color: '#6366f1',
    icon: '⭐'
  },
  {
    name: '三品金丹',
    grade: 'C级',
    rank: 7,
    purity: 45,
    power: 40,
    longevity: 500,
    feature: '瑕疵金丹，元婴无望',
    desc: '道基有瑕，终身难以寸进。',
    detail: '三品金丹，也叫瑕疵金丹。结成金丹的过程中道基受损，金丹有瑕。虽然也算是结成了金丹，寿元也得以增加，但终身元婴无望。大部分散修的最终归宿。',
    phenomena: ['金丹三色', '雷劫减弱', '勉强成道'],
    breakthroughMethods: ['强行突破', '丹药辅助', '血祭之法'],
    famousFigures: ['散修', '小门派门主'],
    color: '#64748b',
    icon: '🔶'
  },
  {
    name: '伪金丹',
    grade: 'D级',
    rank: 8,
    purity: 20,
    power: 20,
    longevity: 300,
    feature: '药力催发，虚有其表',
    desc: '丹药催出来的假金丹，外强中干。',
    detail: '伪金丹，完全依靠金丹药力催发而成的假金丹。空有金丹的名头，实际上金玉其外败絮其中。别说元婴了，能保住金丹境界就不错了。修真界最底层的金丹修士。',
    phenomena: ['金光黯淡', '雷劫全无', '毫无异象'],
    breakthroughMethods: ['九品金丹强行灌顶', '邪道秘法', '毕生积蓄'],
    famousFigures: ['暴发户', '富家翁'],
    color: '#78716c',
    icon: '🔸'
  }
]

const NASCENT_SOULS: NascentSoul[] = [
  {
    name: '元神阳神',
    tier: 'SSS级',
    rank: 1,
    power: 100,
    ability: 100,
    immortality: 100,
    feature: '聚则成形，散则成气',
    desc: '阳神不灭，与道合真。',
    detail: '元神阳神，元婴的终极形态。聚则成形，散则成气。阳神神游太虚，纵横三界，不受肉身束缚。阳神不灭，则修士不死。就算肉身被毁，阳神也能夺舍重生，甚至修炼出更强大的肉身。',
    divinePowers: ['神游太虚', '聚散无形', '夺舍重生', '言出法随', '移山填海'],
    bottlenecks: ['化神之劫', '天人五衰', '业火焚身'],
    legendaryCultivators: ['三清', '女娲', '伏羲'],
    color: '#fbbf24',
    icon: '☀️'
  },
  {
    name: '血神子',
    tier: 'SS级',
    rank: 2,
    power: 95,
    ability: 90,
    immortality: 85,
    feature: '滴血重生，化身亿万',
    desc: '魔道至高元婴，化身亿万，不死不灭。',
    detail: '血神子，魔道至高元婴法门。修成之后可化身亿万，每一滴血都是一个分身。只要还有一滴血存在，就能滴血重生。血海不枯，血神不死。冥河教主凭此法门，纵横洪荒亿万年。',
    divinePowers: ['滴血重生', '化身亿万', '血河大法', '吞噬生灵', '污染元神'],
    bottlenecks: ['杀业太重', '天诛地灭', '净化之力克制'],
    legendaryCultivators: ['冥河教主', '血魔老祖'],
    color: '#dc2626',
    icon: '🩸'
  },
  {
    name: '元婴九品',
    tier: 'S级',
    rank: 3,
    power: 85,
    ability: 80,
    immortality: 80,
    feature: '元婴九品，每品一天堑',
    desc: '正统玄门元婴，每品都是质的飞跃。',
    detail: '元婴九品，玄门正统元婴法门。从一品到九品，每品都是质的飞跃。每提升一品，元婴便会发生蜕变。九品元婴便是化神在望。大宗门的太上长老，基本都是八品、九品元婴。',
    divinePowers: ['元婴出窍', '神游百里', '元婴护体', '御气飞天', '初级言灵'],
    bottlenecks: ['每品皆需积累', '三品小天劫', '六品中天劫', '九品大天劫'],
    legendaryCultivators: ['各大宗掌门', '太上长老'],
    color: '#a855f7',
    icon: '👶'
  },
  {
    name: '鬼仙元婴',
    tier: 'A级',
    rank: 4,
    power: 70,
    ability: 85,
    immortality: 70,
    feature: '阴神出游，鬼仙之道',
    desc: '肉身陨落之后修成的鬼仙元婴。',
    detail: '鬼仙元婴，肉身陨落之后，以阴神之躯修成的元婴。虽然不如正统阳神，但胜在自保能力强，很难被彻底杀死。地府之中的判官、阎王，基本都是鬼仙元婴。',
    divinePowers: ['阴神出游', '入梦杀人', '勾魂夺魄', '隐身遁形', '阴间穿梭'],
    bottlenecks: ['业力缠身', '难证纯阳', '阳光克制'],
    legendaryCultivators: ['十殿阎罗', '判官', '城隍'],
    color: '#6366f1',
    icon: '👻'
  },
  {
    name: '琉璃元婴',
    tier: 'A级',
    rank: 5,
    power: 75,
    ability: 75,
    immortality: 90,
    feature: '元婴如琉璃，内外明澈',
    desc: '佛门元婴，清净无垢，万劫不磨。',
    detail: '琉璃元婴，佛门元婴法门。元婴如琉璃，内外明澈，净无瑕秽。虽然攻击力不如其他元婴，但是胜在万劫不磨，清净无垢，心魔不生。佛门高僧的归宿。',
    divinePowers: ['清净无为', '心魔不生', '佛光护体', '超度众生', '净土接引'],
    bottlenecks: ['红尘历练', '菩提心', '普渡众生愿'],
    legendaryCultivators: ['十八罗汉', '菩萨'],
    color: '#22d3ee',
    icon: '🔮'
  },
  {
    name: '剑元婴',
    tier: 'A级',
    rank: 6,
    power: 90,
    ability: 60,
    immortality: 60,
    feature: '剑婴出鞘，千里斩首',
    desc: '剑修专属元婴，攻击力天下第一。',
    detail: '剑元婴，剑修专属元婴。整个元婴就是一把剑。攻击力天下第一，同阶之内，一剑破万法。但是剑修元婴也有致命缺点：防御力低下，渡劫成功率不高。',
    divinePowers: ['剑婴出鞘', '千里斩首', '一剑破万法', '剑遁神速', '剑气护体'],
    bottlenecks: ['攻击力有余防御力不足', '心剑关', '剑天劫'],
    legendaryCultivators: ['诛仙剑灵', '蜀山剑仙'],
    color: '#06b6d4',
    icon: '⚔️'
  },
  {
    name: '五行元婴',
    tier: 'B级',
    rank: 7,
    power: 65,
    ability: 70,
    immortality: 65,
    feature: '五行俱全，平稳发展',
    desc: '最常见的元婴，平稳发展。',
    detail: '五行元婴，最常见的元婴。金木水火土五行俱全，虽然没有特别突出的优点，但是也没有明显的缺点。平稳发展，一步一个脚印。大部分宗门的中坚力量。',
    divinePowers: ['五行遁法', '五行法术', '基础神通'],
    bottlenecks: ['化神门槛', '五行合一关'],
    legendaryCultivators: ['宗门护法', '长老'],
    color: '#22c55e',
    icon: '🌍'
  },
  {
    name: '残次品元婴',
    tier: 'C级',
    rank: 8,
    power: 40,
    ability: 35,
    immortality: 40,
    feature: '道基受损，终身止步',
    desc: '强行破丹成婴，留下永久损伤。',
    detail: '残次品元婴，金丹有瑕，强行破丹成婴的产物。虽然侥幸成功，但是元婴残缺不全，终身无法再进一步。能保住元婴境界，寿元增加就已经是万幸了。',
    divinePowers: ['元婴出窍', '御空飞行'],
    bottlenecks: ['终身无法化神', '元婴随时可能溃散'],
    legendaryCultivators: ['侥幸成功者', '散修'],
    color: '#64748b',
    icon: '💔'
  }
]

export default function JindanPage() {
  const [filteredCores, setFilteredCores] = useState(GOLDEN_CORES)
  const [expandedCore, setExpandedCore] = useState<string | null>(null)
  const [filteredSouls, setFilteredSouls] = useState(NASCENT_SOULS)
  const [expandedSoul, setExpandedSoul] = useState<string | null>(null)

  const handleCoreFilter = useCallback((data: typeof GOLDEN_CORES) => {
    setFilteredCores(data)
  }, [])

  const handleSoulFilter = useCallback((data: typeof NASCENT_SOULS) => {
    setFilteredSouls(data)
  }, [])

  const coreFilters = {
    searchKeys: ['name', 'grade', 'feature', 'desc', 'detail', 'phenomena', 'famousFigures'],
    filterKeys: {
      grade: [...new Set(GOLDEN_CORES.map(c => c.grade))],
    },
    sortOptions: [
      { key: 'purity', label: '纯度排序' },
      { key: 'power', label: '威力排序' },
      { key: 'rank', label: '排名排序' },
    ],
  }

  const soulFilters = {
    searchKeys: ['name', 'tier', 'feature', 'desc', 'detail', 'divinePowers', 'legendaryCultivators'],
    filterKeys: {
      tier: [...new Set(NASCENT_SOULS.map(s => s.tier))],
    },
    sortOptions: [
      { key: 'power', label: '威力排序' },
      { key: 'immortality', label: '不朽度排序' },
      { key: 'rank', label: '排名排序' },
    ],
  }

  return (
    <SubPageTemplate
      title="金丹元婴"
      subtitle="一粒金丹吞入腹 · 始知我命不由天 · 丹破婴成神游去 · 阳神不灭证天仙"
      icon="✨"
      colorRgb="245, 158, 11"
    >
      <SubPageSection title="金丹九品">
        <FilterBar
          data={GOLDEN_CORES}
          onFiltered={handleCoreFilter}
          options={coreFilters}
          placeholder="搜索金丹名称、品级、特性..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCores.map((core, idx) => (
            <motion.div key={core.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                title={`${core.icon} ${core.name}`}
                subtitle={`${core.grade} 第${core.rank}名`}
                glowColor={core.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedCore(expandedCore === core.name ? null : core.name)}
              >
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">{core.desc}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>金丹纯度</span>
                      <span>{core.purity}%</span>
                    </div>
                    <ProgressBar value={core.purity} color={core.color} />
                    <div className="flex justify-between text-xs">
                      <span>金丹威力</span>
                      <span>{core.power}%</span>
                    </div>
                    <ProgressBar value={core.power} color={core.color} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">+{core.longevity}岁寿元</span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">{core.feature}</span>
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedCore === core.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedCore === core.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t space-y-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">详细介绍</h5>
                          <p className="text-sm text-gray-600">{core.detail}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">结丹异象</h5>
                          <div className="flex flex-wrap gap-2">
                            {core.phenomena.map((p, i) => (
                              <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">结丹法门</h5>
                          <div className="flex flex-wrap gap-2">
                            {core.breakthroughMethods.map((m, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">代表人物</h5>
                          <div className="flex flex-wrap gap-2">
                            {core.famousFigures.map((f, i) => (
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

      <SubPageSection title="元婴万种">
        <FilterBar
          data={NASCENT_SOULS}
          onFiltered={handleSoulFilter}
          options={soulFilters}
          placeholder="搜索元婴名称、等级、神通..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSouls.map((soul, idx) => (
            <motion.div key={soul.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                title={`${soul.icon} ${soul.name}`}
                subtitle={`${soul.tier} 第${soul.rank}名`}
                glowColor={soul.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedSoul(expandedSoul === soul.name ? null : soul.name)}
              >
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">{soul.desc}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ color: soul.color }}>{soul.power}</div>
                      <div className="text-xs text-gray-500">威力</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ color: soul.color }}>{soul.ability}</div>
                      <div className="text-xs text-gray-500">神通</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ color: soul.color }}>{soul.immortality}</div>
                      <div className="text-xs text-gray-500">不朽</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="px-2 py-0.5 text-white rounded text-xs" style={{ backgroundColor: soul.color }}>
                      {soul.feature}
                    </span>
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedSoul === soul.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedSoul === soul.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t space-y-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">详细介绍</h5>
                          <p className="text-sm text-gray-600">{soul.detail}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">天赋神通</h5>
                          <div className="flex flex-wrap gap-2">
                            {soul.divinePowers.map((p, i) => (
                              <span key={i} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2 text-red-600">瓶颈关卡</h5>
                          <div className="flex flex-wrap gap-2">
                            {soul.bottlenecks.map((b, i) => (
                              <span key={i} className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">传说人物</h5>
                          <div className="flex flex-wrap gap-2">
                            {soul.legendaryCultivators.map((c, i) => (
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
    </SubPageTemplate>
  )
}
