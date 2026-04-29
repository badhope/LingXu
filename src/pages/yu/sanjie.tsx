'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface Realm {
  name: string
  level: number
  days: number
  feature: string
  lifespan: string
  population: string
  ruler: string
  desc: string
  detail: string
  characteristics: string[]
  beings: string[]
  color: string
  icon: string
}

interface Heaven {
  name: string
  tier: string
  realm: string
  altitude: string
  lifespan: string
  dayEquiv: string
  ruler: string
  feature: string
  desc: string
  detail: string
  rules: string[]
  notableBeings: string[]
  happinessLevel: number
  color: string
  icon: string
}

interface Hell {
  name: string
  rank: number
  severity: number
  duration: string
  ruler: string
  sinType: string
  feature: string
  desc: string
  detail: string
  punishments: string[]
  redeeming: string[]
  color: string
  icon: string
}

const THREE_REALMS: Realm[] = [
  {
    name: '欲界',
    level: 1,
    days: 6,
    feature: '有饮食、男女、睡眠三欲',
    lifespan: '500万年',
    population: '无量众生',
    ruler: '帝释天',
    desc: '三界之基础，凡夫所居，七情六欲具足。',
    detail: '欲界者，三界之最下也。一切众生，皆有饮食、男女、睡眠三欲。从地狱道、饿鬼道、畜生道、人道、阿修罗道、天道，共六道众生，皆居欲界之中。欲界六天，从下而上，欲望渐减。',
    characteristics: ['七情六欲', '生死轮回', '因果不虚', '善恶有报'],
    beings: ['地狱众生', '饿鬼', '畜生', '人', '阿修罗', '欲界天人'],
    color: '#ef4444',
    icon: '❤️'
  },
  {
    name: '色界',
    level: 2,
    days: 18,
    feature: '无欲而有妙色身',
    lifespan: '8万亿年',
    population: '梵天居民',
    ruler: '大梵天王',
    desc: '已离情欲，尚有微妙色身。',
    detail: '色界者，已离情欲，无男女之相，然尚有微妙色身。分四禅十八天：初禅三天、二禅三天、三禅三天、四禅九天。色界天人，以禅乐为食，不食人间烟火，身放光明，自然化生。',
    characteristics: ['离欲清净', '禅悦为食', '身有光明', '自然化生'],
    beings: ['梵天', '梵辅', '梵众', '光音天', '遍净天', '无想天'],
    color: '#3b82f6',
    icon: '💎'
  },
  {
    name: '无色界',
    level: 3,
    days: 4,
    feature: '无色无形，唯心识存',
    lifespan: '84000大劫',
    population: '灭尽定者',
    ruler: '空性无为',
    desc: '空无边处，识无边处，无所有处，非想非非想处。',
    detail: '无色界者，无有色身，唯有心识。分四天：空无边处、识无边处、无所有处、非想非非想处。寿命长达八万四千大劫，然尚未出轮回，福报尽时，依然堕落。',
    characteristics: ['无色无形', '甚深禅定', '寿命极长', '难出轮回'],
    beings: ['空无边处天', '识无边处天', '无所有处天', '非想非非想处天'],
    color: '#a855f7',
    icon: '☯️'
  }
]

const SIX_HEAVENS: Heaven[] = [
  {
    name: '四王天',
    tier: '欲界第一层',
    realm: '欲界',
    altitude: '须弥山半腹',
    lifespan: '500岁',
    dayEquiv: '人间50年',
    ruler: '四大天王',
    happinessLevel: 60,
    feature: '护持世间，镇守四方',
    desc: '最接近人间的天界，四大天王护持四方。',
    detail: '四王天，为欲界最下层天。位于须弥山半腹，东西南北各有一天王，护持四方。东方持国天王，南方增长天王，西方广目天王，北方多闻天王。四天天人，三欲具足，与人间最为接近。',
    rules: ['不杀生', '不偷盗', '不邪淫', '不妄语', '不饮酒'],
    notableBeings: ['持国天王', '增长天王', '广目天王', '多闻天王', '八部天龙'],
    color: '#f87171',
    icon: '🏔️'
  },
  {
    name: '忉利天',
    tier: '欲界第二层',
    realm: '欲界',
    altitude: '须弥山顶',
    lifespan: '1000岁',
    dayEquiv: '人间100年',
    ruler: '帝释天',
    happinessLevel: 70,
    feature: '三十三天，统领诸天',
    desc: '须弥山顶三十三天，帝释天主坐镇善法堂。',
    detail: '忉利天，又名三十三天。位于须弥山顶，中央为善法堂，帝释天主坐镇。四方各有八天，共三十三天。天人寿命一千岁，一日一夜相当于人间一百年。五欲功德，胜四王天。',
    rules: ['十善业道', '供养三宝', '孝敬父母', '布施持戒'],
    notableBeings: ['帝释天', '善法堂天', '三十三天主', '忉利天人'],
    color: '#fb923c',
    icon: '👑'
  },
  {
    name: '夜摩天',
    tier: '欲界第三层',
    realm: '欲界',
    altitude: '虚空之中',
    lifespan: '2000岁',
    dayEquiv: '人间200年',
    ruler: '善时天王',
    happinessLevel: 80,
    feature: '时时唱快乐',
    desc: '虚空之中，无有日月，天人自身发光，常唱快乐。',
    detail: '夜摩天，位于虚空之中，无有日月，天人自身光明，常唱快乐。无昼夜之别，以花开为昼，花合为夜。寿命二千岁，一日一夜相当于人间二百年。男女形交，即为人道。',
    rules: ['常住快乐', '不生嗔恨', '常行布施', '修禅定'],
    notableBeings: ['善时天王', '夜摩天王', '欢喜天'],
    color: '#fbbf24',
    icon: '🌙'
  },
  {
    name: '兜率天',
    tier: '欲界第四层',
    realm: '欲界',
    altitude: '虚空之中',
    lifespan: '4000岁',
    dayEquiv: '人间400年',
    ruler: '弥勒菩萨',
    happinessLevel: 85,
    feature: '补处菩萨所居',
    desc: '一生补处菩萨所居，弥勒菩萨在此说法。',
    detail: '兜率天，一生补处菩萨所居。分内院外院，外院天人享受五欲，内院为弥勒菩萨净土。天人寿命四千岁，一日一夜相当于人间四百年。男女执手，即为人道。',
    rules: ['一生补处', '慈心不杀', '常念弥勒', '龙华三会'],
    notableBeings: ['弥勒菩萨', '一生补处菩萨', '兜率天子'],
    color: '#34d399',
    icon: '🏛️'
  },
  {
    name: '化乐天',
    tier: '欲界第五层',
    realm: '欲界',
    altitude: '虚空之中',
    lifespan: '8000岁',
    dayEquiv: '人间800年',
    ruler: '化乐天王',
    happinessLevel: 90,
    feature: '随心化现五欲',
    desc: '天人自化五欲而娱乐。',
    detail: '化乐天，天人自化五欲而娱乐。心念一动，即有妙衣美食、宫殿园林随心化现。寿命八千岁，一日一夜相当于人间八百年。男女对视一笑，即为人道。',
    rules: ['随心化乐', '不贪著境', '修善积德', '教化众生'],
    notableBeings: ['化乐天王', '自在天', '变化天'],
    color: '#60a5fa',
    icon: '✨'
  },
  {
    name: '他化自在天',
    tier: '欲界第六层',
    realm: '欲界',
    altitude: '欲界之顶',
    lifespan: '16000岁',
    dayEquiv: '人间1600年',
    ruler: '波旬魔王',
    happinessLevel: 95,
    feature: '他化而为乐',
    desc: '欲界之主，魔王波旬所居，夺他化而为乐。',
    detail: '他化自在天，欲界之顶，天魔波旬所居。夺他人所化妙境，自受快乐。为欲界之主，常与修道人为难。寿命一万六千岁，一日一夜相当于人间一千六百年。男女相视，即为人道。',
    rules: ['他化自在', '天魔眷属', '破坏佛法', '自在神通'],
    notableBeings: ['魔王波旬', '六欲天主', '魔子魔孙'],
    color: '#a78bfa',
    icon: '👿'
  }
]

const EIGHT_HELLS: Hell[] = [
  {
    name: '等活地狱',
    rank: 1,
    severity: 40,
    duration: '500年',
    ruler: '阎罗天子',
    sinType: '杀生',
    feature: '砍斫磨碓，死而复生',
    desc: '最轻的根本地狱，罪业轻生者所居。',
    detail: '等活地狱，又名想地狱。罪人互相嗔恨，手执刀剑，互相砍杀。凉风吹来，死而复生，周而复始。一日一夜，万死万生。杀生之罪，重者下此地狱。',
    punishments: ['刀山剑树', '互相砍杀', '铁碓捣身', '烊铜灌口'],
    redeeming: ['忏悔罪业', '念佛名号', '发菩提心', '供养三宝'],
    color: '#fca5a5',
    icon: '⚔️'
  },
  {
    name: '黑绳地狱',
    rank: 2,
    severity: 50,
    duration: '1000年',
    ruler: '阎罗天子',
    sinType: '偷盗',
    feature: '黑绳量罪，斩截分身',
    desc: '以黑绳量罪，斩截身体。',
    detail: '黑绳地狱，先以黑绳量度罪人之身，然后随绳斩截，或锯或劈。偷盗之罪，侵损常住，得此报应。寿命相当于人间四百万年。',
    punishments: ['黑绳量度', '刀锯分身', '铁斧斫身', '铁钉钉身'],
    redeeming: ['偿还宿债', '布施法界', '持不盗戒', '修忏悔法'],
    color: '#f87171',
    icon: '✂️'
  },
  {
    name: '众合地狱',
    rank: 3,
    severity: 60,
    duration: '2000年',
    ruler: '阎罗天子',
    sinType: '邪淫',
    feature: '两山相合，碾压罪人',
    desc: '铁山相合，碾压其身。',
    detail: '众合地狱，有大石山，两山相合，碾压罪人，骨肉糜烂，如榨甘蔗。邪淫之罪，破人梵行，得此报应。寿命相当于人间八百万年。',
    punishments: ['两山相合', '铁象践踏', '大石压身', '火车相撞'],
    redeeming: ['梵行清净', '劝人戒淫', '造印造经', '永断邪淫'],
    color: '#ef4444',
    icon: '🗻'
  },
  {
    name: '号叫地狱',
    rank: 4,
    severity: 70,
    duration: '4000年',
    ruler: '阎罗天子',
    sinType: '妄语',
    feature: '苦痛逼身，大号叫哭',
    desc: '猛火之中，苦痛逼身，大号叫哭。',
    detail: '号叫地狱，猛火洞然，罪人在中，苦痛逼身，大号叫哭。妄语两舌，恶口绮语，得此报应。寿命相当于人间十六百万年。',
    punishments: ['猛火烧身', '沸汤煎煮', '铁叉刺身', '苦痛号叫'],
    redeeming: ['诚实语', '柔软语', '赞叹人', '不妄语戒'],
    color: '#dc2626',
    icon: '😭'
  },
  {
    name: '大叫地狱',
    rank: 5,
    severity: 80,
    duration: '8000年',
    ruler: '阎罗天子',
    sinType: '饮酒',
    feature: '剧苦之中，甚大啼哭',
    desc: '剧苦之中，发大啼哭之声。',
    detail: '大叫地狱，剧苦之中，倍胜于前，罪人发大啼哭之声。饮酒放逸，造诸恶业，得此报应。寿命相当于人间三十二百万年。',
    punishments: ['铁戟刺腹', '洋铜浇口', '热铁缠身', '万箭穿心'],
    redeeming: ['永断酒肉', '劝人戒酒', '供养持戒', '忏悔前业'],
    color: '#b91c1c',
    icon: '😱'
  },
  {
    name: '炎热地狱',
    rank: 6,
    severity: 90,
    duration: '16000年',
    ruler: '阎罗天子',
    sinType: '五逆十恶',
    feature: '猛火炽盛，烧尽身髓',
    desc: '大火猛盛，烧尽身髓。',
    detail: '炎热地狱，大火猛盛，内外俱燃，烧尽身髓。五逆十恶，罪业深重，得此报应。寿命相当于人间六十四百万年。',
    punishments: ['大火洞燃', '铁镬煎煮', '卧热铁床', '贯铜柱'],
    redeeming: ['至诚忏悔', '发大誓愿', '永不再造', '念佛求生'],
    color: '#991b1b',
    icon: '🔥'
  },
  {
    name: '大热地狱',
    rank: 7,
    severity: 95,
    duration: '半劫',
    ruler: '阎罗天子',
    sinType: '诽谤正法',
    feature: '大火普烧，鬼卒加刑',
    desc: '大火普烧，又有鬼卒更增刑具。',
    detail: '大热地狱，大火普烧，又有鬼卒更增刑具，其苦百千万倍于前。诽谤正法，破佛律仪，得此报应。寿命半中劫，数不尽年。',
    punishments: ['火坑地狱', '刀轮斩身', '犁耕舌地', '剥皮草马'],
    redeeming: ['对佛忏悔', '流通佛法', '印造大乘', '劝人正信'],
    color: '#7f1d1d',
    icon: '💀'
  },
  {
    name: '阿鼻地狱',
    rank: 8,
    severity: 100,
    duration: '无量劫',
    ruler: '地藏王菩萨',
    sinType: '五无间罪',
    feature: '受苦无间，无有间歇',
    desc: '最苦地狱，五无间罪，千万亿劫，求出无期。',
    detail: '阿鼻地狱，又名无间地狱。五无间：时无间、空无间、罪器无间、平等无间、命无间。杀父、杀母、杀阿罗汉、破和合僧、出佛身血，五逆重罪，必堕此狱。千万亿劫，求出无期。地藏王菩萨在此发愿：地狱不空，誓不成佛。',
    punishments: ['千万亿劫', '求出无期', '苦毒无量', '无有间歇'],
    redeeming: ['地藏本愿', '称名得救', '放下屠刀', '立地成佛'],
    color: '#450a0a',
    icon: '🕳️'
  }
]

export default function SanjiePage() {
  const [filteredRealms, setFilteredRealms] = useState(THREE_REALMS)
  const [expandedRealm, setExpandedRealm] = useState<string | null>(null)
  const [filteredHeavens, setFilteredHeavens] = useState(SIX_HEAVENS)
  const [expandedHeaven, setExpandedHeaven] = useState<string | null>(null)
  const [filteredHells, setFilteredHells] = useState(EIGHT_HELLS)
  const [expandedHell, setExpandedHell] = useState<string | null>(null)

  const handleRealmFilter = useCallback((data: typeof THREE_REALMS) => {
    setFilteredRealms(data)
  }, [])

  const handleHeavenFilter = useCallback((data: typeof SIX_HEAVENS) => {
    setFilteredHeavens(data)
  }, [])

  const handleHellFilter = useCallback((data: typeof EIGHT_HELLS) => {
    setFilteredHells(data)
  }, [])

  const realmFilters = {
    searchKeys: ['name', 'feature', 'ruler', 'desc', 'detail', 'characteristics', 'beings'],
    filterKeys: {},
    sortOptions: [
      { key: 'level', label: '层级排序' },
      { key: 'name', label: '名称排序' },
    ],
  }

  const heavenFilters = {
    searchKeys: ['name', 'tier', 'realm', 'ruler', 'feature', 'desc', 'detail', 'notableBeings'],
    filterKeys: {
      realm: [...new Set(SIX_HEAVENS.map(h => h.realm))],
    },
    sortOptions: [
      { key: 'happinessLevel', label: '快乐排序' },
      { key: 'name', label: '天名排序' },
    ],
  }

  const hellFilters = {
    searchKeys: ['name', 'ruler', 'sinType', 'feature', 'desc', 'detail', 'punishments'],
    filterKeys: {},
    sortOptions: [
      { key: 'severity', label: '惨烈度' },
      { key: 'rank', label: '排名排序' },
    ],
  }

  return (
    <SubPageTemplate
      title="三界六道"
      subtitle="欲界 · 色界 · 无色界 · 天道 · 人道 · 阿修罗 · 畜生 · 饿鬼 · 地狱"
      icon="🌌"
      colorRgb="168, 85, 247"
    >
      <SubPageSection title="三界">
        <FilterBar
          data={THREE_REALMS}
          onFiltered={handleRealmFilter}
          options={realmFilters}
          placeholder="搜索三界名称、统治者、特性..."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredRealms.map((realm, idx) => (
            <motion.div key={realm.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <InfoCard
                title={`${realm.icon} ${realm.name}`}
                subtitle={`第${realm.level}界 · ${realm.days}天`}
                glowColor={realm.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedRealm(expandedRealm === realm.name ? null : realm.name)}
              >
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">{realm.desc}</p>
                  <div className="flex justify-between text-xs">
                    <span>👤 {realm.ruler}</span>
                    <span>⏳ {realm.lifespan}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{realm.feature}</span>
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
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t space-y-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">详细介绍</h5>
                          <p className="text-sm text-gray-600">{realm.detail}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-xs mb-2">特性</h5>
                            <div className="flex flex-wrap gap-1">
                              {realm.characteristics.map((c, i) => (
                                <span key={i} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-xs mb-2">含摄众生</h5>
                            <div className="flex flex-wrap gap-1">
                              {realm.beings.map((b, i) => (
                                <span key={i} className="px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded text-xs">
                                  {b}
                                </span>
                              ))}
                            </div>
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

      <SubPageSection title="欲界六天">
        <FilterBar
          data={SIX_HEAVENS}
          onFiltered={handleHeavenFilter}
          options={heavenFilters}
          placeholder="搜索天界名称、天主、特征..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHeavens.map((heaven, idx) => (
            <motion.div key={heaven.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                title={`${heaven.icon} ${heaven.name}`}
                subtitle={heaven.tier}
                glowColor={heaven.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedHeaven(expandedHeaven === heaven.name ? null : heaven.name)}
              >
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">{heaven.desc}</p>
                  <div className="flex justify-between text-xs">
                    <span>📍 {heaven.altitude}</span>
                    <span>👑 {heaven.ruler}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>快乐指数</span>
                      <span>{heaven.happinessLevel}%</span>
                    </div>
                    <ProgressBar value={heaven.happinessLevel} color={heaven.color} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>⏳ 寿命：{heaven.lifespan}</span>
                    <span>📅 1日 = {heaven.dayEquiv}</span>
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedHeaven === heaven.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedHeaven === heaven.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t space-y-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">详细介绍</h5>
                          <p className="text-sm text-gray-600">{heaven.detail}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">生天条件</h5>
                          <div className="flex flex-wrap gap-2">
                            {heaven.rules.map((r, i) => (
                              <span key={i} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">著名天人</h5>
                          <div className="flex flex-wrap gap-2">
                            {heaven.notableBeings.map((b, i) => (
                              <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                                {b}
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

      <SubPageSection title="八大地狱">
        <FilterBar
          data={EIGHT_HELLS}
          onFiltered={handleHellFilter}
          options={hellFilters}
          placeholder="搜索地狱名称、业因、刑罚..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHells.map((hell, idx) => (
            <motion.div key={hell.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                title={`${hell.icon} ${hell.name}`}
                subtitle={`第${hell.rank}狱 · ${hell.sinType}`}
                glowColor={hell.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedHell(expandedHell === hell.name ? null : hell.name)}
              >
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">{hell.desc}</p>
                  <div className="flex justify-between text-xs">
                    <span>👤 {hell.ruler}</span>
                    <span>⏳ {hell.duration}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>惨烈程度</span>
                      <span>{hell.severity}%</span>
                    </div>
                    <ProgressBar value={hell.severity} color={hell.color} />
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="px-2 py-0.5 text-white rounded text-xs" style={{ backgroundColor: hell.color }}>
                      {hell.feature}
                    </span>
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedHell === hell.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedHell === hell.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t space-y-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">详细介绍</h5>
                          <p className="text-sm text-gray-600">{hell.detail}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-xs mb-2 text-red-600">苦报刑罚</h5>
                            <div className="flex flex-wrap gap-1">
                              {hell.punishments.map((p, i) => (
                                <span key={i} className="px-1.5 py-0.5 bg-red-50 text-red-700 rounded text-xs">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-xs mb-2 text-green-600">救赎法门</h5>
                            <div className="flex flex-wrap gap-1">
                              {hell.redeeming.map((r, i) => (
                                <span key={i} className="px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-xs">
                                  {r}
                                </span>
                              ))}
                            </div>
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
