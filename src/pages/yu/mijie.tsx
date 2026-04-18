'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface SecretRealm {
  id: number
  name: string
  type: string
  dangerLevel: string
  dangerValue: number
  discovered: string
  era: string
  explorers: number
  survivors: number
  survivalRate: number
  feature: string
  rewards: string[]
  boss: string
  desc: string
  detail: string
  mechanisms: string[]
  notableEvents: string[]
  legacyTreasures: string[]
  restrictions: string[]
  color: string
  icon: string
}

interface ForbiddenZone {
  id: number
  name: string
  alias: string
  dangerLevel: string
  dangerValue: number
  existTime: string
  overlord: string
  feature: string
  desc: string
  detail: string
  taboos: string[]
  mysteries: string[]
  survivors: string[]
  color: string
  icon: string
}

const SECRET_REALMS: SecretRealm[] = [
  {
    id: 1,
    name: '神魔陵园',
    type: '古战场',
    dangerLevel: 'SSS',
    dangerValue: 99,
    discovered: '太古年间',
    era: '乱古纪元',
    explorers: 12540,
    survivors: 37,
    survivalRate: 0.29,
    feature: '众神陨落之地，神魔尸骸堆积成山',
    rewards: ['神魔本源', '残破神器', '不朽神格', '轮回道果'],
    boss: '守墓老人',
    desc: '亿万神魔在此陨落，鲜血染红了大地。即使过去无量量劫，依然有神魔残念不散，化作永世诅咒。',
    detail: '神魔陵园，诸天万界第一禁地。传说在那遥远的乱古末年，发生了一场席卷诸天的大战。九天十地的神祇、魔界的魔主、人界的大帝，尽皆战死于此。他们的尸骸堆积成山，他们的鲜血汇聚成河。时至今日，此地依然有不灭的神魔残念，任何闯入者都会听到远古的战歌，看到神魔厮杀的幻影。守墓老人，不知活了多少纪元的存在，默默守护着这片陵园，也守护着一个惊天的秘密。',
    mechanisms: ['神魔禁空大阵', '残念噬魂域', '轮回往生阵', '不灭诅咒'],
    notableEvents: ['乱古末年神魔大战', '太古年间守墓人现世', '中古某大帝陨于此'],
    legacyTreasures: ['天杀战斧', '灭世磨盘', '万物母气瓶', '三生石'],
    restrictions: ['修为超过圣人者不得入', '身怀至尊器者不得入', '心有魔障者立死'],
    color: '#dc2626',
    icon: '💀'
  },
  {
    id: 2,
    name: '龙墓',
    type: '龙族墓地',
    dangerLevel: 'SS',
    dangerValue: 90,
    discovered: '上古年间',
    era: '神话纪元',
    explorers: 8920,
    survivors: 156,
    survivalRate: 1.75,
    feature: '万龙归葬之所，龙骨如山',
    rewards: ['真龙精血', '龙骨法宝', '龙珠本源', '龙道传承'],
    boss: '龙魂始祖',
    desc: '诸天万界的龙族寿元将尽时，都会穿越界壁来到此处。龙魂不灭，镇守着龙族的最终秘密。',
    detail: '龙墓，龙族的最终归宿。无论是什么血脉的龙族，无论是哪一界的龙族，当感知到寿元将尽时，都会感应到龙墓的召唤，穿越无尽虚空来到此地。因此，这里埋葬了从神话时代至今的所有龙族先祖。龙骨堆积成山，龙血浸透了每一寸土地。龙魂始祖，第一条死去的祖龙，其龙魂融合了亿万龙魂，成为龙墓的守护者。',
    mechanisms: ['万龙锁天阵', '龙魂炼心域', '龙气镇压', '血脉禁制'],
    notableEvents: ['神话纪元祖龙归葬', '上古某龙族证道失败', '中古屠龙会战于此'],
    legacyTreasures: ['祖龙珠', '万龙图', '逆龙鳞甲', '龙皇骨杖'],
    restrictions: ['非龙族血脉受压制', '弑龙者立遭龙魂反噬', '心无敬畏者死'],
    color: '#f97316',
    icon: '🐉'
  },
  {
    id: 3,
    name: '幽冥地府',
    type: '冥界入口',
    dangerLevel: 'SS',
    dangerValue: 88,
    discovered: '混沌初开',
    era: '混沌纪元',
    explorers: 15680,
    survivors: 203,
    survivalRate: 1.29,
    feature: '轮回之所，万物归宿',
    rewards: ['轮回之力', '生死簿残页', '幽冥火种', '还阳草'],
    boss: '十殿阎罗',
    desc: '黄泉路上，彼岸花盛开。奈何桥边，孟婆汤一碗。入此地者，九死一生。能走出者，皆已脱胎换骨。',
    detail: '幽冥地府，生与死的交界。这里是所有生灵的最终归宿，也是轮回运转的核心。黄泉路无尽延伸，彼岸花花开彼岸，花叶永不相见。奈何桥横跨忘川河，桥上孟婆端着一碗忘情水，让所有鬼魂忘却前尘往事。十殿阎罗，各司其职，审判每一个灵魂的功过善恶。然而，地府深处，隐藏着轮回的终极秘密，传说参悟者可超脱生死。',
    mechanisms: ['生死轮回大阵', '忘川河水蚀魂', '业火焚心狱', '判官笔判生死'],
    notableEvents: ['混沌初开地府成形', '太古某大帝闯地府', '上古冥府之乱'],
    legacyTreasures: ['生死簿', '判官笔', '孟婆汤配方', '轮回盘'],
    restrictions: ['阳寿未尽者可入', '功德深厚者受优待', '大奸大恶者直接入地狱'],
    color: '#7c3aed',
    icon: '👻'
  },
  {
    id: 4,
    name: '虚空战场',
    type: '界域裂缝',
    dangerLevel: 'S',
    dangerValue: 80,
    discovered: '乱古年间',
    era: '乱古纪元',
    explorers: 25400,
    survivors: 1280,
    survivalRate: 5.04,
    feature: '诸天大战遗迹',
    rewards: ['虚空道则', '战帝残兵', '空间碎片', '界壁本源'],
    boss: '虚空异兽',
    desc: '界壁破碎之处，时空错乱。曾有大帝在此战死，道则残痕至今不灭，误入者神魂俱灭。',
    detail: '虚空战场，诸天大战的遗迹。乱古年间的那场大战，打碎了界壁，造成了这片巨大的空间裂缝。此地时空错乱，法则紊乱，一不小心就会被卷入时空乱流。无数大帝的道则残痕交织，无数战兵的碎片散落各处。虚空异兽在此繁衍，以空间能量为食，成为此地最危险的存在。然而危险与机缘并存，在这里感悟虚空道则，可成就空间大道。',
    mechanisms: ['时空乱流', '道则绞杀', '虚空坍塌', '界壁反噬'],
    notableEvents: ['乱古诸天大战', '某战帝战死于此', '中古虚空道祖证道'],
    legacyTreasures: ['战帝枪', '虚空镜', '界壁之心', '空间道则结晶'],
    restrictions: ['空间感悟不足者死', '肉身不够强被绞杀', '神魂不凝迷失'],
    color: '#0ea5e9',
    icon: '🌀'
  },
  {
    id: 5,
    name: '昆墟秘境',
    type: '上古宗门',
    dangerLevel: 'A',
    dangerValue: 65,
    discovered: '中古年间',
    era: '上古纪元',
    explorers: 18750,
    survivors: 3250,
    survivalRate: 17.33,
    feature: '昆墟圣地遗址',
    rewards: ['上古传承', '仙丹灵药', '圣兵碎片', '阵法心得'],
    boss: '护山圣兽',
    desc: '上古第一宗门昆墟的遗址，宗门大阵依然在运转。虽然危险，但机缘也是最多。',
    detail: '昆墟，上古第一宗门。当年昆墟圣子横压一世，带领昆墟成为天下第一宗门。然而盛极而衰，不知为何，昆墟一夜之间消失，只留下这个秘境。宗门的护山大阵依然在运转，护山圣兽依然在守护。秘境中的仙丹灵药因为无人采摘，已经生长了数十万年，各种传承典籍依然在洞府中等待有缘人。',
    mechanisms: ['昆墟护山大阵', '幻阵迷踪', '试炼古道', '传承考验'],
    notableEvents: ['上古昆墟盛世', '昆墟一夜消失之谜', '中古昆墟传人现世'],
    legacyTreasures: ['昆墟圣典', '天地洪炉', '圣灵仙丹', '昆墟剑'],
    restrictions: ['心性不合格者被驱逐', '天赋不足者无法得传承', '心术不正者遇圣兽'],
    color: '#22c55e',
    icon: '🏛️'
  },
  {
    id: 6,
    name: '妖帝坟冢',
    type: '妖帝陵墓',
    dangerLevel: 'S',
    dangerValue: 82,
    discovered: '太古末年',
    era: '太古纪元',
    explorers: 9870,
    survivors: 421,
    survivalRate: 4.27,
    feature: '妖族大帝葬地',
    rewards: ['妖帝本源', '妖帝兵', '万妖图', '化形草'],
    boss: '妖帝残魂',
    desc: '曾镇压九天十地的妖帝，死后葬于此地。万妖守护，非大机缘者不得入内。',
    detail: '妖帝，太古年间镇压九天十地的存在。作为妖族的第一位大帝，他的一生充满了传奇。从一只普通的青蛇开始，逆天修行，最终证道大帝，万妖来朝。死后，他选择葬于此地，布下万古大局，等待妖族的下一位天命之子。万妖在陵墓外围守护，妖帝残魂在棺椁中沉睡，等待有缘人的到来。',
    mechanisms: ['万妖朝宗阵', '妖帝威压', '血脉试炼', '残魂试心'],
    notableEvents: ['太古妖帝证道', '妖帝葬于此地', '中古妖族大帝诞生'],
    legacyTreasures: ['青帝杖', '万妖图', '妖帝血精', '化形神丹'],
    restrictions: ['非妖族受压制', '无妖族血脉者难深入', '杀妖过多者死'],
    color: '#16a34a',
    icon: '🐍'
  },
  {
    id: 7,
    name: '羽化神朝遗址',
    type: '古朝遗迹',
    dangerLevel: 'A',
    dangerValue: 70,
    discovered: '近古年间',
    era: '近古纪元',
    explorers: 32500,
    survivors: 5680,
    survivalRate: 17.48,
    feature: '羽化神朝皇都',
    rewards: ['皇朝秘藏', '羽化飞升诀', '帝器碎片', '龙气本源'],
    boss: '皇朝守陵卫',
    desc: '曾一统中州的羽化神朝，一夜之间灰飞烟灭。留下的秘藏让无数修士疯狂。',
    detail: '羽化神朝，近古年间最辉煌的皇朝。传国百万年，一统中州，子民亿万。历代皇帝皆是人杰，其中更是有两人证道大帝。然而，就在羽化神朝最鼎盛的时候，一夜之间，整个皇都消失，整个神朝灰飞烟灭，成为千古谜团。留下的遗址中，有着羽化神朝积累了百万年的财富，也有着那个夜晚的真相。',
    mechanisms: ['皇朝龙气镇压', '禁军战魂', '帝陵守护', '羽化飞升阵'],
    notableEvents: ['羽化神朝一统中州', '神朝一夜消失之谜', '近古最大探秘热潮'],
    legacyTreasures: ['羽化飞升诀', '传国玉玺', '真龙天子剑', '皇朝宝库'],
    restrictions: ['皇朝气运压制', '非人族受排斥', '谋反之心者遇天罚'],
    color: '#eab308',
    icon: '👑'
  },
  {
    id: 8,
    name: '紫山',
    type: '古皇山',
    dangerLevel: 'SS',
    dangerValue: 92,
    discovered: '荒古年间',
    era: '荒古纪元',
    explorers: 7650,
    survivors: 127,
    survivalRate: 1.66,
    feature: '无始大帝闭关地',
    rewards: ['无始经残页', '帝血晶', '紫山源石', '极道威压感悟'],
    boss: '源神',
    desc: '无始大帝曾在此闭关数十万年。山中源石无数，但也封印着太古元凶，一旦出世，血洗天下。',
    detail: '紫山，又称古皇山。荒古年间，无始大帝曾在此闭关数十万年，留下了他的道与法。山中有着无数的源石，每一块源石中都可能封印着太古年间的生物。源神，源中之神，在此地诞生，成为紫山的主宰。无数修士来此寻找无始大帝的传承，却大多成为了源神的养料。紫山深处，更是封印着几位太古至尊，一旦出世，就是天下大乱之时。',
    mechanisms: ['无始帝威压', '源石化身', '封印反噬', '帝阵镇杀'],
    notableEvents: ['无始大帝闭关', '源神诞生', '某古皇被封于此'],
    legacyTreasures: ['无始经', '无始钟虚影', '帝血晶', '源神之心'],
    restrictions: ['修为不足被压死', '身怀邪气被镇压', '非人族受极道压制'],
    color: '#7c2d12',
    icon: '⛰️'
  }
]

const FORBIDDEN_ZONES: ForbiddenZone[] = [
  {
    id: 1,
    name: '生命禁区',
    alias: '葬仙地',
    dangerLevel: 'SSS',
    dangerValue: 100,
    existTime: '自开天辟地便存在',
    overlord: '禁区至尊',
    feature: '仙路尽头，至尊蛰伏',
    desc: '宇宙边荒，生命禁区。无数至尊在此蛰伏，等待成仙的机缘。',
    detail: '生命禁区，宇宙中最恐怖的地方。自开天辟地以来，便有禁区存在。每一个禁区中都蛰伏着数位甚至数十位至尊，他们自斩一刀，跌落大帝境界，苟活世间，只为等待成仙路开启的那一天。为了活下去，他们每隔一段时间便会发动黑暗动乱，血洗亿万生灵，掠夺生命本源。禁区，是整个宇宙的噩梦。',
    taboos: ['议论至尊', '窥探禁区深处', '打扰至尊沉眠', '妄谈成仙'],
    mysteries: ['成仙路是否真的在此', '至尊的真实数量', '禁区的由来', '是否真的有仙'],
    survivors: ['禁区行走', '弃徒', '护道者'],
    color: '#1f2937',
    icon: '🌑'
  },
  {
    id: 2,
    name: '不死山',
    alias: '万物不生',
    dangerLevel: 'SSS',
    dangerValue: 98,
    existTime: '神话时代便存在',
    overlord: '石皇',
    feature: '入者必死，唯石长存',
    desc: '万物不生的绝地，石头成精的世界。石皇坐镇，万古不灭。',
    detail: '不死山，万物不生。这里没有任何生灵，只有石头。然而，这里的石头都是活的，它们有生命，有意识，甚至可以修行。石皇，不死山的主人，从一块普通的石头开始修行，最终证道，成为最诡异的大帝。他不允许任何非石头的生灵进入不死山，所有闯入者都会被石化，成为不死山的一部分，永生永世镇压在此。',
    taboos: ['携带活物入内', '破坏山石', '不敬石皇', '妄谈生死'],
    mysteries: ['石皇是否还活着', '石化的人是否还有意识', '不死山深处有什么', '石皇的后手'],
    survivors: ['石人', '半石化修士'],
    color: '#6b7280',
    icon: '🗿'
  },
  {
    id: 3,
    name: '轮回海',
    alias: '往生之海',
    dangerLevel: 'SS',
    dangerValue: 95,
    existTime: '轮回伴生',
    overlord: '轮回之主',
    feature: '前世今生，尽在此海',
    desc: '每一滴海水都是一个人的一生。踏入海中，便可看到自己的无数轮回。',
    detail: '轮回海，往生之海。传说这里是轮回的源头，每一滴海水都倒映着一个生灵的一生。踏入海中，你会看到自己的前世，看到自己的来世，看到自己的无数次轮回。然而，看到的越多，失去的也就越多。太多的修士在此地找回了前世的记忆，却也迷失了今生的自我，最终成为了轮回海的一部分，永远地在轮回中徘徊。',
    taboos: ['呼唤前世之名', '试图改变轮回', '捞取海中之物', '深入海心'],
    mysteries: ['轮回之主是谁', '是否真的有轮回', '海心是什么', '轮回的真相'],
    survivors: ['守海人', '轮回者', '迷失者'],
    color: '#1e3a5f',
    icon: '🌊'
  },
  {
    id: 4,
    name: '仙陵',
    alias: '葬仙之所',
    dangerLevel: 'SS',
    dangerValue: 93,
    existTime: '仙古末年',
    overlord: '仙陵主人',
    feature: '真仙埋骨，道则长存',
    desc: '仙古的真仙葬于此地，他们的道则成为了此地的法则。',
    detail: '仙陵，葬仙之所。仙古末年，仙战爆发，无数真仙战死。他们的尸骨被埋葬于此，形成了这片仙陵。每一座坟墓中都埋葬着一位真仙，他们的道则从坟墓中散发出来，成为了此地的法则。因此，在仙陵中，你的修为再高，也要受真仙道则的压制。而如果能够得到一位真仙的认可，便可继承真仙的道统，一步登天。',
    taboos: ['破坏坟墓', '亵渎真仙', '盗取陪葬品', '惊醒仙魂'],
    mysteries: ['葬了多少真仙', '仙陵主人是谁', '是否有活着的真仙', '仙战的真相'],
    survivors: ['守陵人', '仙之传承者', '仙奴'],
    color: '#f59e0b',
    icon: '⚰️'
  }
]

export default function MijiePage() {
  const [filteredRealms, setFilteredRealms] = useState(SECRET_REALMS)
  const [expandedRealm, setExpandedRealm] = useState<number | null>(null)
  const [filteredZones, setFilteredZones] = useState(FORBIDDEN_ZONES)
  const [expandedZone, setExpandedZone] = useState<number | null>(null)

  const handleRealmFilter = useCallback((data: typeof SECRET_REALMS) => {
    setFilteredRealms(data)
  }, [])

  const handleZoneFilter = useCallback((data: typeof FORBIDDEN_ZONES) => {
    setFilteredZones(data)
  }, [])

  const realmFilters = {
    searchKeys: ['name', 'type', 'boss', 'feature', 'desc', 'detail', 'rewards', 'mechanisms'],
    filterKeys: {
      dangerLevel: [...new Set(SECRET_REALMS.map(r => r.dangerLevel))],
      type: [...new Set(SECRET_REALMS.map(r => r.type))],
      era: [...new Set(SECRET_REALMS.map(r => r.era))],
    },
    sortOptions: [
      { key: 'dangerValue', label: '危险度排序' },
      { key: 'survivalRate', label: '生存率排序' },
      { key: 'name', label: '秘境名称' },
    ],
  }

  const zoneFilters = {
    searchKeys: ['name', 'alias', 'overlord', 'feature', 'desc', 'detail', 'taboos', 'mysteries'],
    filterKeys: {
      dangerLevel: [...new Set(FORBIDDEN_ZONES.map(z => z.dangerLevel))],
    },
    sortOptions: [
      { key: 'dangerValue', label: '危险度排序' },
      { key: 'name', label: '禁地名称' },
    ],
  }

  const getDangerStyle = (level: string) => {
    switch (level) {
      case 'SSS': return { text: '死亡禁地', pulse: true }
      case 'SS': return { text: '极度危险', pulse: true }
      case 'S': return { text: '危险', pulse: false }
      case 'A': return { text: '较危险', pulse: false }
      default: return { text: '安全', pulse: false }
    }
  }

  return (
    <SubPageTemplate
      title="诸天秘界"
      subtitle="上古遗迹 · 秘境探险 · 禁地探索 · 危中有机"
      icon="🗝️"
      colorRgb="170, 136, 255"
    >
      <SubPageSection title="探索数据总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: 'SSS级禁地', count: '5', color: '#ef4444', icon: '💀', desc: '九死无生' },
              { label: 'SS级秘境', count: '4', color: '#f97316', icon: '☠️', desc: '九死一生' },
              { label: 'S级险地', count: '3', color: '#ea580c', icon: '⚠️', desc: '七死三生' },
              { label: 'A级遗迹', count: '5', color: '#eab308', icon: '🗺️', desc: '机缘与危险并存' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={i <= 1 ? {
                    scale: [1, 1.1, 1],
                    boxShadow: [`0 0 20px ${stat.color}00`, `0 0 40px ${stat.color}`, `0 0 20px ${stat.color}00`]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '12px',
                    background: stat.color,
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: stat.color }}>{stat.count}</div>
                <div style={{ fontSize: '1rem', color: '#b89438', margin: '0.25rem 0' }}>{stat.label}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.8rem' }}>{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="八大秘境">
        <FilterBar
          data={SECRET_REALMS}
          onFiltered={handleRealmFilter}
          options={realmFilters}
          placeholder="搜索秘境名称、类型、Boss、奖励..."
        />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          <AnimatePresence>
            {filteredRealms.map((realm) => {
              const style = getDangerStyle(realm.dangerLevel)
              return (
                <motion.div key={realm.id} layout>
                  <InfoCard
                    key={realm.id}
                    title={realm.name}
                    subtitle={`${realm.type} · ${realm.era}`}
                    glowColor={realm.color.replace('#', '')}
                    glowIntensity={80}
                    onClick={() => setExpandedRealm(expandedRealm === realm.id ? null : realm.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <motion.div
                        animate={style.pulse ? {
                          scale: [1, 1.1, 1],
                          boxShadow: [`0 0 15px ${realm.color}00`, `0 0 30px ${realm.color}`, `0 0 15px ${realm.color}00`]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '10px',
                          background: realm.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.75rem',
                          flexShrink: 0
                        }}
                      >
                        {realm.icon}
                      </motion.div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '12px', 
                            fontSize: '0.75rem',
                            background: realm.color,
                            color: 'white',
                            fontWeight: 'bold'
                          }}>
                            {realm.dangerLevel} {style.text}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)' }}>
                            {realm.discovered}发现
                          </span>
                        </div>
                        <p style={{ color: 'rgba(180, 180, 190, 0.9)', fontSize: '0.9rem', margin: '0.5rem 0 1rem' }}>
                          {realm.feature}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                          <div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.6)' }}>危险度</div>
                            <ProgressBar value={realm.dangerValue} color={realm.color} height={6} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.6)' }}>生存率</div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: realm.dangerValue > 80 ? '#ef4444' : '#22c55e' }}>
                              {realm.survivalRate}%
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.6)' }}>镇守者</div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#b89438' }}>
                              {realm.boss}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {realm.rewards.slice(0, 3).map((r, i) => (
                            <span key={i} style={{
                              padding: '0.25rem 0.5rem',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              background: 'rgba(184, 148, 56, 0.15)',
                              color: '#b89438'
                            }}>
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedRealm === realm.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ 
                            borderTop: '1px solid rgba(184, 148, 56, 0.2)',
                            marginTop: '1rem',
                            paddingTop: '1rem'
                          }}>
                            <p style={{ 
                              color: 'rgba(180, 180, 190, 0.9)', 
                              fontSize: '0.9rem',
                              lineHeight: 1.8,
                              marginBottom: '1rem',
                              textIndent: '2em'
                            }}>
                              {realm.detail}
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                              <div>
                                <div style={{ color: '#b89438', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                  🔒 禁制机关
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                  {realm.mechanisms.map((m, i) => (
                                    <span key={i} style={{
                                      padding: '0.25rem 0.5rem',
                                      borderRadius: '6px',
                                      fontSize: '0.75rem',
                                      background: 'rgba(239, 68, 68, 0.15)',
                                      color: '#ef4444'
                                    }}>
                                      {m}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div style={{ color: '#b89438', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                  🏆 传世至宝
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                  {realm.legacyTreasures.map((t, i) => (
                                    <span key={i} style={{
                                      padding: '0.25rem 0.5rem',
                                      borderRadius: '6px',
                                      fontSize: '0.75rem',
                                      background: 'rgba(234, 179, 8, 0.15)',
                                      color: '#eab308'
                                    }}>
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                              <div style={{ color: '#b89438', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                ⚠️ 入内须知
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {realm.restrictions.map((r, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(124, 58, 237, 0.15)',
                                    color: '#a78bfa'
                                  }}>
                                    {r}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div style={{ 
                      textAlign: 'center', 
                      marginTop: '0.75rem',
                      color: 'rgba(184, 148, 56, 0.6)',
                      fontSize: '0.8rem'
                    }}>
                      {expandedRealm === realm.id ? '▲ 收起详情' : '▼ 点击展开详情'}
                    </div>
                  </InfoCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </SubPageSection>

      <SubPageSection title="生命禁地">
        <FilterBar
          data={FORBIDDEN_ZONES}
          onFiltered={handleZoneFilter}
          options={zoneFilters}
          placeholder="搜索禁地名称、霸主、禁忌、秘密..."
        />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          <AnimatePresence>
            {filteredZones.map((zone) => {
              const style = getDangerStyle(zone.dangerLevel)
              return (
                <motion.div key={zone.id} layout>
                  <InfoCard
                    title={zone.name}
                    subtitle={zone.alias}
                    glowColor={zone.color.replace('#', '')}
                    glowIntensity={90}
                    onClick={() => setExpandedZone(expandedZone === zone.id ? null : zone.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                          boxShadow: [`0 0 20px ${zone.color}00`, `0 0 40px ${zone.color}`, `0 0 20px ${zone.color}00`]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                          width: '70px',
                          height: '70px',
                          borderRadius: '12px',
                          background: zone.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem',
                          flexShrink: 0
                        }}
                      >
                        {zone.icon}
                      </motion.div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '12px', 
                            fontSize: '0.75rem',
                            background: '#ef4444',
                            color: 'white',
                            fontWeight: 'bold'
                          }}>
                            {zone.dangerLevel} {style.text}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)' }}>
                            {zone.existTime}
                          </span>
                        </div>
                        <p style={{ color: 'rgba(180, 180, 190, 0.9)', fontSize: '0.9rem', margin: '0.5rem 0 1rem' }}>
                          {zone.feature}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                          <div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.6)' }}>危险度</div>
                            <ProgressBar value={zone.dangerValue} color="#ef4444" height={6} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.6)' }}>禁地之主</div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#ef4444' }}>
                              {zone.overlord}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedZone === zone.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ 
                            borderTop: '1px solid rgba(239, 68, 68, 0.2)',
                            marginTop: '1rem',
                            paddingTop: '1rem'
                          }}>
                            <p style={{ 
                              color: 'rgba(180, 180, 190, 0.9)', 
                              fontSize: '0.9rem',
                              lineHeight: 1.8,
                              marginBottom: '1rem',
                              textIndent: '2em'
                            }}>
                              {zone.detail}
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                              <div>
                                <div style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                  🚫 绝对禁忌
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                  {zone.taboos.map((t, i) => (
                                    <span key={i} style={{
                                      padding: '0.25rem 0.5rem',
                                      borderRadius: '6px',
                                      fontSize: '0.75rem',
                                      background: 'rgba(239, 68, 68, 0.15)',
                                      color: '#ef4444'
                                    }}>
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div style={{ color: '#a78bfa', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                  ❓ 未解之谜
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                  {zone.mysteries.map((m, i) => (
                                    <span key={i} style={{
                                      padding: '0.25rem 0.5rem',
                                      borderRadius: '6px',
                                      fontSize: '0.75rem',
                                      background: 'rgba(124, 58, 237, 0.15)',
                                      color: '#a78bfa'
                                    }}>
                                      {m}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                              <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                🧟 生还者类型
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {zone.survivors.map((s, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(34, 197, 94, 0.15)',
                                    color: '#22c55e'
                                  }}>
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div style={{ 
                      textAlign: 'center', 
                      marginTop: '0.75rem',
                      color: 'rgba(239, 68, 68, 0.6)',
                      fontSize: '0.8rem'
                    }}>
                      {expandedZone === zone.id ? '▲ 收起详情' : '▼ 点击展开详情'}
                    </div>
                  </InfoCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
