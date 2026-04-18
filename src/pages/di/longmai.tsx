'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface DragonVein {
  name: string
  range: string
  coverage: string
  major: string
  feature: string
  quality: string
  grade: string
  cities: string[]
  power: number
  detail: string
  famousTombs: string[]
  geomanticPrinciples: string[]
}

interface DragonType {
  name: string
  pattern: string
  image: string
  grade: string
  example: string
  effect: string
  power: number
  note: string
  category: string
  detail: string
  recognizeTips: string[]
}

interface DragonStage {
  stage: string
  importance: number
  feature: string
  detail: string
  category: string
  checkPoints: string[]
}

interface GuardStar {
  name: string
  position: string
  req: string
  avoid: string
  effect: string
  category: string
  power: number
  detail: string
  classicBasis: string
}

interface XuePoint {
  name: string
  type: string
  shape: string
  wuxing: string
  power: number
  feature: string
  detail: string
  suitable: string[]
  avoid: string[]
}

const THREE_DRY_DRAGONS: DragonVein[] = [
  {
    name: '北干龙',
    range: '阴山 - 太行山 - 燕山',
    coverage: '蒙古、河北、北京、辽宁、吉林、黑龙江',
    major: '北京为尽结',
    feature: '气势雄浑，骨干挺拔，如万马奔腾',
    quality: '帝王之气',
    grade: '极品',
    cities: ['北京', '天津', '沈阳', '太原', '承德'],
    power: 98,
    detail: '北干龙发脉昆仑，经阴山、贺兰山、太行山、燕山，尽结于北京。此龙气势磅礡，如天马行空，万马奔腾，主出帝王公侯。元、明、清三代皆定都于此，可见其龙气之盛。',
    famousTombs: ['明十三陵天寿山', '清东陵马兰峪', '清西陵永宁山', '成吉思汗陵'],
    geomanticPrinciples: ['山环水抱', '背山面水', '明堂开阔', '众水归堂'],
  },
  {
    name: '中干龙',
    range: '秦岭 - 华山 - 嵩山 - 泰山',
    coverage: '陕西、河南、山东、山西南部、湖北北部',
    major: '洛阳、开封为大结',
    feature: '中正平和，龙气浑厚，华夏文明之根',
    quality: '中原王气',
    grade: '极品',
    cities: ['西安', '洛阳', '开封', '济南', '郑州'],
    power: 95,
    detail: '中干龙为华夏正脉，发脉秦岭，经华山、嵩山、泰山，尽结于齐鲁。此龙中正平和，不偏不倚，为中华文明发祥地。周、秦、汉、唐、宋皆以此为都，五千年来文明不绝。',
    famousTombs: ['秦始皇陵骊山', '汉武帝茂陵', '武则天乾陵梁山', '宋陵巩义'],
    geomanticPrinciples: ['龙脉悠长', '砂水环聚', '四象齐全', '三元不败'],
  },
  {
    name: '南干龙',
    range: '岷山 - 大巴山 - 大别山 - 黄山 - 武夷山',
    coverage: '四川、重庆、湖南、江西、安徽、浙江、福建、广东',
    major: '南京、杭州、广州',
    feature: '灵秀多姿，文采风流，富贵长久',
    quality: '江南秀气',
    grade: '上品',
    cities: ['南京', '杭州', '广州', '福州', '成都'],
    power: 92,
    detail: '南干龙发脉岷山，经大巴山、大别山、黄山、武夷山，尽结于东南沿海。此龙灵秀多姿，文采风流，主出文人墨客，富商巨贾。江南富庶，人才辈出，皆此龙气之所钟也。',
    famousTombs: ['明孝陵钟山', '岳飞墓栖霞岭', '中山陵紫金山', '南越王墓'],
    geomanticPrinciples: ['山清水秀', '藏风聚气', '水口紧锁', '文笔峰耸'],
  },
]

const DRAGON_NINE_TYPES: DragonType[] = [
  {
    name: '回龙',
    pattern: '翻身顾祖，回顾巢穴',
    image: '如犬回头，如蛇翘尾',
    grade: '上品',
    example: '明十三陵天寿山',
    effect: '多出异路功名，忠孝传家',
    power: 90,
    note: '顾祖多情，福气悠久',
    category: '贵格龙',
    detail: '回龙者，翻身回顾祖宗山也。其形弯曲回顾，如犬回头，如蛇翘尾。此龙多情重义，主后人忠孝两全，不忘根本。福泽绵长，数世不衰。',
    recognizeTips: ['看龙身是否弯曲回顾', '看是否面朝祖山方向', '看是否有留恋之情', '看砂水是否一同回顾'],
  },
  {
    name: '出洋龙',
    pattern: '奔腾出海，直入平洋',
    image: '如龙飞九天，千里之势',
    grade: '极品',
    example: '上海长江口',
    effect: '大富大贵，威名远播',
    power: 98,
    note: '千里来龙，尽结于此',
    category: '大贵龙',
    detail: '出洋龙者，千里奔腾，直入平洋，一去不回头。此龙气势磅礡，如飞龙在天，势不可挡。主出大人物，威名远播，功业彪炳千秋。',
    recognizeTips: ['看来龙是否千里奔腾', '看是否直入平洋大水', '看是否有山停水聚之处', '看水口是否有关锁'],
  },
  {
    name: '降龙',
    pattern: '自高而下，层叠而降',
    image: '如瀑布飞流，节节败退',
    grade: '中上品',
    example: '峨眉山麓',
    effect: '循序而进，晚运荣华',
    power: 82,
    note: '愈下愈佳，后福无量',
    category: '富格龙',
    detail: '降龙者，自高山而下，层层降落，如阶梯然。此龙愈下愈佳，主后人循序而进，步步高升，晚运尤佳。先贫后富，先贱后贵。',
    recognizeTips: ['看山势是否层层下降', '看是否有平台承接', '看是否一脉穿传', '看融结是否在低处'],
  },
  {
    name: '生龙',
    pattern: '起伏顿跌，生动活泼',
    image: '如蛟蛇走窜，灵活多变',
    grade: '上品',
    example: '黄山山脉',
    effect: '聪明智慧，技艺超群',
    power: 88,
    note: '生气盎然，多出奇才',
    category: '智格龙',
    detail: '生龙者，起伏顿跌，灵活生动，如活蛇走窜。此龙生气盎然，主后人聪明智慧，技艺超群，多出奇才异能之士。',
    recognizeTips: ['看龙身是否起伏多折', '看是否灵活生动不僵硬', '看是否有蜂腰鹤膝', '看是否有起有伏'],
  },
  {
    name: '飞龙',
    pattern: '双翼开张，展翅欲飞',
    image: '如大鹏展翅，鹏程万里',
    grade: '极品',
    example: '北京燕山',
    effect: '王侯将相，位极人臣',
    power: 100,
    note: '帝王龙脉，天下独尊',
    category: '帝王龙',
    detail: '飞龙者，双翼开张，如大鹏展翅，翱翔天宇。此龙最为尊贵，主出帝王公侯，王侯将相，位极人臣，贵不可言。',
    recognizeTips: ['看是否左右开张如翼', '看是否有冲天之势', '看是否众山朝拜', '看是否四兽齐全'],
  },
  {
    name: '卧龙',
    pattern: '盘踞一方，隐而不发',
    image: '如猛虎伏地，蓄势待发',
    grade: '中品',
    example: '南阳卧龙岗',
    effect: '隐士高人，潜龙勿用',
    power: 75,
    note: '大器晚成，厚积薄发',
    category: '隐格龙',
    detail: '卧龙者，盘踞一方，隐而不发，如猛虎伏地，蓄势待发。此龙主人大器晚成，厚积薄发，或为隐士高人，不求闻达于诸侯。',
    recognizeTips: ['看是否平坦宽阔', '看是否隐藏不露', '看是否有忽然兴起', '看是否待时而动'],
  },
  {
    name: '隐龙',
    pattern: '平洋寻龙，隐而不见',
    image: '高一寸为山，低一寸为水',
    grade: '奇品',
    example: '江南水乡',
    effect: '水乡富贵，不露锋芒',
    power: 80,
    note: '平洋一突胜千峰',
    category: '平洋龙',
    detail: '隐龙者，平洋之地，无山可见，惟于水势求之。经云：平洋一突胜千峰。平洋之地，以水为龙，以突为穴。水乡富贵，多出江南。',
    recognizeTips: ['看水势是否环绕', '看地形是否有突', '看高一寸即为山', '看低一寸即为水'],
  },
  {
    name: '腾龙',
    pattern: '突起高峰，拔地而起',
    image: '如天柱独立，孤峰独秀',
    grade: '中上品',
    example: '华山',
    effect: '武贵兵权，独当一面',
    power: 85,
    note: '虽贵但孤，宜有砂护',
    category: '武贵龙',
    detail: '腾龙者，突起高峰，拔地而起，如天柱独立，孤峰独秀。此龙主武贵兵权，独当一面，然未免孤寡，宜有护砂缠绕。',
    recognizeTips: ['看是否孤峰独耸', '看是否拔地而起', '看是否有砂护卫', '看是否清秀不粗顽'],
  },
  {
    name: '群龙',
    pattern: '万峰朝宗，群龙聚会',
    image: '如百官朝见，众星拱月',
    grade: '极品',
    example: '昆仑山',
    effect: '开国立业，子孙绵延',
    power: 100,
    note: '万山之祖，龙脉之源',
    category: '圣祖龙',
    detail: '群龙者，万峰朝宗，群龙聚会，如百官朝见，众星拱月。此龙为龙脉之源，万山之祖。主开国立业，子孙绵延，百世其昌。',
    recognizeTips: ['看是否万山簇拥', '看是否众水朝宗', '看是否居中最贵', '看是否气势恢宏'],
  },
]

const DRAGON_STAGES: DragonStage[] = [
  {
    stage: '太祖山',
    importance: 90,
    feature: '龙脉起源，高大耸拔，万山之祖',
    category: '龙身',
    detail: '太祖山者，龙脉之祖山也。必高大耸拔，跨州连郡，为一方群山之祖。此山关系龙脉之根本，太祖端正，则龙脉纯正。',
    checkPoints: ['是否高大耸拔', '是否为群山之祖', '是否端正秀丽', '是否有分龙出发'],
  },
  {
    stage: '少祖山',
    importance: 95,
    feature: '离穴近祖，起峰秀丽，龙气凝聚',
    category: '龙身',
    detail: '少祖山者，离穴不远处起峰也。此山关系龙气之聚散，少祖秀丽，则穴场融结真确。',
    checkPoints: ['离穴场远近', '是否起峰秀丽', '是否龙气凝聚', '是否分宗立派'],
  },
  {
    stage: '父母山',
    importance: 98,
    feature: '穴山后靠，胎息孕育，直接融结',
    category: '穴场',
    detail: '父母山者，穴场后靠之山也。此山直接融结，如父母孕育胎儿。此山端正，则穴场真气凝聚。',
    checkPoints: ['是否紧接穴场', '是否端正圆满', '是否有胎息孕育', '是否藏风聚气'],
  },
  {
    stage: '过峡',
    importance: 100,
    feature: '两山束气，真龙过脉，细而有力',
    category: '龙身',
    detail: '过峡者，两山之间束气也。真龙过脉必细而有力，蜂腰鹤膝。此处为龙之生死关头，最要护卫周密，不受风吹水劫。',
    checkPoints: ['是否蜂腰鹤膝', '是否护卫周密', '是否不受风吹', '是否有力能脱煞'],
  },
  {
    stage: '束气',
    importance: 95,
    feature: '龙脉收束，聚气入穴，如人呼吸',
    category: '穴场',
    detail: '束气者，龙脉入穴前收束也。如人呼吸，一呼一吸，一放一收。不收则气不聚，气不聚则穴不真。',
    checkPoints: ['是否紧收聚气', '是否如人呼吸', '是否有起有伏', '是否能入穴场'],
  },
  {
    stage: '开帐',
    importance: 85,
    feature: '龙脉展开，如伞如盖，护砂重重',
    category: '龙身',
    detail: '开帐者，龙脉展开如伞如盖也。大开大帐则力大势宏，主大富大贵。不开帐则孤寒，不出大贵人。',
    checkPoints: ['是否大开大帐', '是否如伞如盖', '是否护砂重重', '是否左右均匀'],
  },
  {
    stage: '剥换',
    importance: 90,
    feature: '老龙剥嫩，粗恶变秀，脱胎换骨',
    category: '龙身',
    detail: '剥换者，老龙剥出嫩枝也。粗恶变为秀丽，石山变为土山。如人脱胎换骨，超凡入圣。不剥换则老粗无气，不出贵人。',
    checkPoints: ['是否老剥嫩枝', '是否粗恶变秀', '是否脱胎换骨', '是否愈剥愈秀'],
  },
  {
    stage: '入首',
    importance: 100,
    feature: '龙脉到头，临穴一节，生死攸关',
    category: '穴场',
    detail: '入首者，龙脉到头临穴一节也。此节关系最切，入首龙贵则穴贵，入首龙贱则穴贱。虽有好龙，入首不好，终归无用。',
    checkPoints: ['是否临穴一节', '是否真气融结', '是否形体纯正', '是否符合元运'],
  },
]

const FOUR_GUARDS: GuardStar[] = [
  {
    name: '青龙',
    position: '左方',
    req: '蜿蜒起伏，高耸环抱，过堂逆水',
    avoid: '低陷、断折、反背、高压',
    effect: '长房发达，男丁兴旺',
    category: '左砂',
    power: 90,
    detail: '青龙者，穴场左方之山也。宜蜿蜒起伏，高耸环抱，过堂逆水。左砂秀丽，则长房发达，男丁兴旺。',
    classicBasis: '《葬经》曰：青龙蜿蜒，所以孚毓也。',
  },
  {
    name: '白虎',
    position: '右方',
    req: '驯俯低头，圆净环抱，不宜昂头',
    avoid: '昂头、张口、衔尸、反走',
    effect: '小房富贵，女子贤淑',
    category: '右砂',
    power: 88,
    detail: '白虎者，穴场右方之山也。宜驯俯低头，圆净环抱，最忌昂头张口。右砂驯良，则小房富贵，女子贤淑。',
    classicBasis: '《葬经》曰：白虎驯俯，所以辟不祥也。',
  },
  {
    name: '朱雀',
    position: '前方',
    req: '翔舞平正，朝山秀丽，明堂开阔',
    avoid: '尖射、破碎、反跳、冲心',
    effect: '功名显达，文章盖世',
    category: '前砂',
    power: 92,
    detail: '朱雀者，穴场前方之山也。宜翔舞平正，朝山秀丽，明堂开阔。前砂朝拱，则功名显达，文章盖世。',
    classicBasis: '《葬经》曰：朱雀翔舞，所以文明也。',
  },
  {
    name: '玄武',
    position: '后方',
    req: '垂头端正，靠山镇静，来龙长远',
    avoid: '凹陷、断背、巉岩、空虚',
    effect: '人丁繁盛，福泽悠久',
    category: '后山',
    power: 95,
    detail: '玄武者，穴场后方之山也。宜垂头端正，靠山镇静，来龙长远。后山靠实，则人丁繁盛，福泽悠久。',
    classicBasis: '《葬经》曰：玄武垂头，所以安固也。',
  },
  {
    name: '案山',
    position: '近前',
    req: '齐眉平正，如玉几横琴',
    avoid: '高压、低压、倾斜、破碎',
    effect: '官禄稳厚，财物丰盛',
    category: '近砂',
    power: 85,
    detail: '案山者，穴前近案也。宜齐眉平正，如玉几横琴。近案有情，则官禄稳厚，财物丰盛。',
    classicBasis: '《雪心赋》曰：有案无朝，官职卑微。有朝无案，虽秀不实。',
  },
  {
    name: '朝山',
    position: '远前',
    req: '端严秀丽，朝拱有情',
    avoid: '反背、无情、破碎、枯瘦',
    effect: '大贵极品，声名远播',
    category: '远砂',
    power: 93,
    detail: '朝山者，穴前远朝之山也。宜端严秀丽，朝拱有情。远朝秀丽，则大贵极品，声名远播。',
    classicBasis: '《疑龙经》曰：朝山也要识真形，真形朝穴自分明。',
  },
]

const XUE_TYPES: XuePoint[] = [
  {
    name: '窝穴',
    type: '四象穴',
    shape: '凹窝藏聚',
    wuxing: '土',
    power: 90,
    feature: '藏风聚气，最为上乘',
    detail: '窝穴者，山巅开窝，如盘如盏，凹藏聚气也。此穴最上，藏风聚气，真气融结。然要窝中平正，弦棱明白，不可太深。',
    suitable: ['龙真穴的', '窝中平正', '弦棱明白', '四水归聚'],
    avoid: ['深坑积水', '窝太陡深', '坡陡倾泻', '无唇毡'],
  },
  {
    name: '钳穴',
    type: '四象穴',
    shape: '两股开钳',
    wuxing: '木',
    power: 88,
    feature: '左右环抱，藏风聚气',
    detail: '钳穴者，左右开钳，如人字，如牛角。要钳中藏聚，顶上端正，两峰均匀。此穴左右环抱，藏风有力。',
    suitable: ['两峰均匀', '钳中藏聚', '顶上端正', '乳突分明'],
    avoid: ['两峰长短', '钳中倾泻', '顶上空虚', '反弓反背'],
  },
  {
    name: '乳穴',
    type: '四象穴',
    shape: '垂乳端正',
    wuxing: '金',
    power: 85,
    feature: '真气融结，如乳下垂',
    detail: '乳穴者，自顶垂下，如乳如瓠，端正圆净也。要大小长短适中，界水分明。此穴真气融结，如母哺乳。',
    suitable: ['垂乳端正', '大小适中', '界水分明', '圆净肥满'],
    avoid: ['太长太细', '太粗太臃肿', '界水不明', '乳头破碎'],
  },
  {
    name: '突穴',
    type: '四象穴',
    shape: '突起圆净',
    wuxing: '火',
    power: 82,
    feature: '平中一突，真气凝聚',
    detail: '突穴者，平地突起，如覆釜，如馒头，圆净肥满也。平洋之地，平中一突胜千峰。此穴真气凝聚，最为可贵。',
    suitable: ['突起圆净', '平中一突', '四水环绕', '不高不低'],
    avoid: ['突破歪斜', '孤露受风', '太高太峻', '无界水'],
  },
]

export default function LongmaiPage() {
  const [filteredDragons, setFilteredDragons] = useState(THREE_DRY_DRAGONS)
  const [expandedDragon, setExpandedDragon] = useState<string | null>(null)
  const [filteredTypes, setFilteredTypes] = useState(DRAGON_NINE_TYPES)
  const [expandedType, setExpandedType] = useState<string | null>(null)
  const [filteredStages, setFilteredStages] = useState(DRAGON_STAGES)
  const [expandedStage, setExpandedStage] = useState<string | null>(null)
  const [filteredGuards, setFilteredGuards] = useState(FOUR_GUARDS)
  const [expandedGuard, setExpandedGuard] = useState<string | null>(null)
  const [filteredXue, setFilteredXue] = useState(XUE_TYPES)
  const [expandedXue, setExpandedXue] = useState<string | null>(null)

  const handleDragonFilter = useCallback((data: typeof THREE_DRY_DRAGONS) => {
    setFilteredDragons(data)
  }, [])

  const handleTypeFilter = useCallback((data: typeof DRAGON_NINE_TYPES) => {
    setFilteredTypes(data)
  }, [])

  const handleStageFilter = useCallback((data: typeof DRAGON_STAGES) => {
    setFilteredStages(data)
  }, [])

  const handleGuardFilter = useCallback((data: typeof FOUR_GUARDS) => {
    setFilteredGuards(data)
  }, [])

  const handleXueFilter = useCallback((data: typeof XUE_TYPES) => {
    setFilteredXue(data)
  }, [])

  const getPowerColor = (power: number) => {
    if (power >= 95) return '#8b5cf6'
    if (power >= 85) return '#3b82f6'
    if (power >= 75) return '#22c55e'
    return '#f59e0b'
  }

  const getGradeColor = (grade: string) => {
    if (grade === '极品') return '#8b5cf6'
    if (grade === '上品' || grade === '奇品') return '#3b82f6'
    if (grade === '中上品') return '#22c55e'
    return '#f59e0b'
  }

  return (
    <SubPageTemplate
      title="寻龙点穴"
      subtitle="三年寻龙 · 十年点穴 · 乘生气也 · 得水为上"
      icon="🐉"
      colorRgb="34, 197, 94"
    >
      <SubPageSection title="寻龙宗旨">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            《葬经》曰：气乘风则散，界水则止。古人聚之使不散，行之使有止，故谓之风水。风水之法，得水为上，藏风次之。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            三年寻龙，十年点穴。寻龙为难，点穴尤难。千里来龙，到头融结一席之地。寻龙者，寻其祖宗之起源；点穴者，点其真气之融结。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            覆枣核以指爪，认太极于微茫。乘生气也，得水藏风。葬者，藏也，乘生气也。五气行乎地中，发而生乎万物。人受体于父母，本骸得气，遗体受荫。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title={`三大干龙详解 (${filteredDragons.length}/${THREE_DRY_DRAGONS.length})`}>
        <FilterBar
          data={THREE_DRY_DRAGONS}
          searchKeys={['name', 'range', 'coverage', 'major', 'feature', 'quality', 'cities', 'detail']}
          filterOptions={[
            { key: 'grade', label: '品级', allLabel: '全部品级' },
            { key: 'quality', label: '龙气品质', allLabel: '全部品质' },
          ]}
          onFiltered={handleDragonFilter}
          placeholder="搜索龙脉名称、范围、城市..."
        />
        <div style={{ marginTop: '1rem' }}>
          {filteredDragons.map((dragon, index) => (
            <motion.div
              key={dragon.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedDragon(expandedDragon === dragon.name ? null : dragon.name)}
              style={{ cursor: 'pointer', marginBottom: '1rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ color: '#b89438', marginBottom: '0.25rem' }}>{dragon.name}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                    {dragon.range}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(139, 92, 246, 0.2)', color: getGradeColor(dragon.grade) }}>
                    {dragon.grade}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: getPowerColor(dragon.power), fontWeight: 'bold' }}>
                    龙力 {dragon.power}%
                  </span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)', marginBottom: '0.25rem' }}>覆盖区域</div>
                  <div style={{ color: 'rgba(180, 180, 190, 0.75)', fontSize: '0.85rem' }}>{dragon.coverage}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)', marginBottom: '0.25rem' }}>龙气品质</div>
                  <div style={{ color: 'rgba(180, 180, 190, 0.75)', fontSize: '0.85rem' }}>{dragon.quality}</div>
                </div>
              </div>
              <p style={{ color: 'rgba(180, 180, 190, 0.75)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {dragon.feature}
              </p>
              <AnimatePresence>
                {expandedDragon === dragon.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                        {dragon.detail}
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: '#b89438', marginBottom: '0.4rem' }}>🏛️ 著名陵寝</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                            {dragon.famousTombs.map((tomb, i) => (
                              <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', borderRadius: '4px' }}>
                                {tomb}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: '#b89438', marginBottom: '0.4rem' }}>📍 融结都邑</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                            {dragon.cities.map((city, i) => (
                              <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', borderRadius: '4px' }}>
                                {city}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title={`龙格九种 (${filteredTypes.length}/${DRAGON_NINE_TYPES.length})`}>
        <FilterBar
          data={DRAGON_NINE_TYPES}
          searchKeys={['name', 'pattern', 'image', 'grade', 'example', 'effect', 'note', 'category', 'detail']}
          filterOptions={[
            { key: 'grade', label: '品级', allLabel: '全部品级' },
            { key: 'category', label: '龙格类型', allLabel: '全部类型' },
          ]}
          onFiltered={handleTypeFilter}
          placeholder="搜索龙格名称、品级、特征..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredTypes.map((type, index) => (
            <motion.div
              key={type.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedType(expandedType === type.name ? null : type.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#b89438' }}>{type.name}</h3>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'rgba(139, 92, 246, 0.2)', color: getGradeColor(type.grade) }}>
                    {type.grade}
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}>
                    {type.category}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.75)', marginBottom: '0.5rem' }}>
                {type.pattern}
              </p>
              <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                "{type.image}"
              </div>
              <ProgressBar value={type.power} label="龙力" max={100} color="26, 188, 156" />
              <AnimatePresence>
                {expandedType === type.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                        {type.detail}
                      </p>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.75rem', color: '#b89438', marginBottom: '0.35rem' }}>🔍 识别要点</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {type.recognizeTips.map((tip, i) => (
                            <span key={i} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', borderRadius: '3px' }}>
                              {tip}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                        💡 {type.note}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title={`真龙八段次第 (${filteredStages.length}/${DRAGON_STAGES.length})`}>
        <FilterBar
          data={DRAGON_STAGES}
          searchKeys={['stage', 'feature', 'detail', 'category', 'checkPoints']}
          filterOptions={[
            { key: 'category', label: '部位分类', allLabel: '全部部位' },
          ]}
          onFiltered={handleStageFilter}
          placeholder="搜索真龙次第、要点..."
        />
        <div style={{ marginTop: '1rem' }}>
          {filteredStages.map((stage, index) => (
            <motion.div
              key={stage.stage}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedStage(expandedStage === stage.stage ? null : stage.stage)}
              style={{ cursor: 'pointer', marginBottom: '0.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '50px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stage.importance >= 98 ? '#ef4444' : stage.importance >= 95 ? '#8b5cf6' : '#3b82f6' }}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ color: '#b89438', marginBottom: '0.25rem' }}>{stage.stage}</h3>
                    <span style={{ fontSize: '0.75rem', color: stage.importance >= 98 ? '#ef4444' : stage.importance >= 95 ? '#8b5cf6' : '#3b82f6', fontWeight: 'bold' }}>
                      重要度 {stage.importance}%
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.75)' }}>
                    {stage.feature}
                  </p>
                </div>
              </div>
              <AnimatePresence>
                {expandedStage === stage.stage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem', marginLeft: '60px' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                        {stage.detail}
                      </p>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#b89438', marginBottom: '0.35rem' }}>✅ 勘验要点</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {stage.checkPoints.map((point, i) => (
                            <span key={i} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', borderRadius: '3px' }}>
                              {point}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title={`六神护砂 (${filteredGuards.length}/${FOUR_GUARDS.length})`}>
        <FilterBar
          data={FOUR_GUARDS}
          searchKeys={['name', 'position', 'req', 'avoid', 'effect', 'category', 'detail']}
          filterOptions={[
            { key: 'category', label: '砂位', allLabel: '全部方位' },
          ]}
          onFiltered={handleGuardFilter}
          placeholder="搜索护砂名称、方位、要求..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredGuards.map((guard, index) => (
            <motion.div
              key={guard.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedGuard(expandedGuard === guard.name ? null : guard.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#b89438' }}>{guard.name}</h3>
                <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}>
                  {guard.position}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#22c55e', marginBottom: '0.35rem' }}>
                ✓ 宜：{guard.req}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#ef4444', marginBottom: '0.5rem' }}>
                ✗ 忌：{guard.avoid}
              </div>
              <ProgressBar value={guard.power} label="砂力" max={100} color="251, 191, 36" />
              <AnimatePresence>
                {expandedGuard === guard.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                        {guard.detail}
                      </p>
                      <div style={{ padding: '0.5rem', background: 'rgba(34, 197, 94, 0.08)', borderRadius: '4px', borderLeft: '3px solid #22c55e' }}>
                        <p style={{ color: 'rgba(180, 180, 190, 0.75)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                          {guard.classicBasis}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title={`点穴四法 (${filteredXue.length}/${XUE_TYPES.length})`}>
        <FilterBar
          data={XUE_TYPES}
          searchKeys={['name', 'type', 'shape', 'wuxing', 'feature', 'detail', 'suitable', 'avoid']}
          filterOptions={[
            { key: 'wuxing', label: '五行', allLabel: '全部五行' },
          ]}
          onFiltered={handleXueFilter}
          placeholder="搜索穴法名称、形状、五行..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredXue.map((xue, index) => (
            <motion.div
              key={xue.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedXue(expandedXue === xue.name ? null : xue.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#b89438' }}>{xue.name}</h3>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}>
                    {xue.wuxing}
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}>
                    {xue.type}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.75)', marginBottom: '0.5rem' }}>
                {xue.shape} · {xue.feature}
              </p>
              <ProgressBar value={xue.power} label="穴力" max={100} color="168, 85, 247" />
              <AnimatePresence>
                {expandedXue === xue.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                        {xue.detail}
                      </p>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.75rem', color: '#22c55e', marginBottom: '0.35rem' }}>✓ 合格条件</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {xue.suitable.map((s, i) => (
                            <span key={i} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', borderRadius: '3px' }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#ef4444', marginBottom: '0.35rem' }}>✗ 禁忌条件</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {xue.avoid.map((a, i) => (
                            <span key={i} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderRadius: '3px' }}>
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
