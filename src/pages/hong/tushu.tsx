'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface AncientBook {
  id: number
  name: string
  tier: string
  author: string
  dynasty: string
  desc: string
  rarity: string
  wisdom: number
  integrity: number
  detail: string
  coreConcepts: string[]
  keyChapters: string[]
  historicalInfluence: string[]
  recommendedFor: string[]
  icon: string
  color: string
}

interface LostBook {
  id: number
  name: string
  tier: string
  author: string
  era: string
  desc: string
  lossDate: string
  lossReason: string
  importance: number
  detail: string
  survivingFragments: string[]
  historicalMentions: string[]
  reconstructionAttempts: string[]
  icon: string
  color: string
}

const ANCIENT_BOOKS: AncientBook[] = [
  {
    id: 1,
    name: '河图洛书',
    tier: '上古天书',
    author: '龙马负图,神龟载书',
    dynasty: '伏羲时代',
    desc: '天地之数，尽在其中。河图以十数合五方五行阴阳天地之象，洛书以九数列九宫八卦之用。',
    rarity: '传说级',
    wisdom: 100,
    integrity: 30,
    detail: '河图洛书，上古天书，天地之大数也。伏羲氏王天下，龙马负图出于河，遂则其文以画八卦；神龟负书出于洛，遂法其文以作九畴。河图之数：一与六共宗居乎北，二与七为朋居乎南，三与八同道居乎东，四与九为友居乎西，五与十相守居乎中。洛书之数：戴九履一，左三右七，二四为肩，六八为足，五居中央。河图主全，洛书主变；河图为体，洛书为用。此二图者，天地自然之易，阴阳五行之祖，八卦九宫之源，中华文化之根也。',
    coreConcepts: ['天地之数', '阴阳五行', '八卦九宫', '体用兼备', '自然之易'],
    keyChapters: ['龙马负图', '神龟载书', '伏羲画卦', '大禹九畴', '五十有五'],
    historicalInfluence: ['周易八卦之源', '阴阳五行之本', '中医运气学说', '风水堪舆之基', '天文历法之准'],
    recommendedFor: ['天地大道参悟者', '阴阳五行研究者', '八卦九宫术者'],
    icon: '📜',
    color: '#ffd700'
  },
  {
    id: 2,
    name: '周易',
    tier: '群经之首',
    author: '伏羲画卦 · 文王系辞 · 孔子作传',
    dynasty: '上古-周-春秋',
    desc: '仰观天文，俯察地理，中通人事。六十四卦，三百八十四爻，范围天地之化而不过。',
    rarity: '圣典级',
    wisdom: 99,
    integrity: 100,
    detail: '周易，群经之首，大道之源。人更三圣，世历三古：伏羲氏仰观俯察，始画八卦；周文王囚于羑里，演六十四卦，作卦爻之辞；孔子晚而喜易，序彖系象说卦文言，作十翼。易之为书也，广大悉备，有天道焉，有人道焉，有地道焉。兼三才而两之，故六；六者非它也，三才之道也。易与天地准，故能弥纶天地之道。范围天地之化而不过，曲成万物而不遗，通乎昼夜之道而知，故神无方而易无体。一阴一阳之谓道，继之者善也，成之者性也。百姓日用而不知，故君子之道鲜矣。',
    coreConcepts: ['一阴一阳谓之道', '变易不易简易', '三才之道', '穷理尽性以至于命', '趋吉避凶'],
    keyChapters: ['乾坤两卦门户', '系辞上下传', '说卦序卦杂卦', '三百八十四爻', '十翼阐微'],
    historicalInfluence: ['儒家六经之首', '道家思想源泉', '诸子百家根基', '东亚文化核心', '五千年智慧结晶'],
    recommendedFor: ['经世致用之儒者', '穷究天人之道士', '修齐治平之士人'],
    icon: '📗',
    color: '#a855f7'
  },
  {
    id: 3,
    name: '山海经',
    tier: '上古地理',
    author: '伯益 · 后人增补',
    dynasty: '夏 - 战国',
    desc: '载四海之外，录大荒之中。山经五卷，海经十三卷，藏天下异闻，录海内奇物。',
    rarity: '秘典级',
    wisdom: 85,
    integrity: 60,
    detail: '山海经，上古地理之奇书也。传为伯益助大禹治水，遍历九州，记录山川地理、草木鸟兽、神灵异人。今本十八卷，山经五，海经八，大荒经四，海内经一。载山五千三百七十，居地五，水出焉，草木金石鸟兽灵怪莫不毕载。其中所载，或为信史，或为神话，或为远方异国传闻，或为古人想象。历代学者，或斥为荒诞不经，或奉为古之信史，或以为地理志，或以为巫书。然其文辞尔雅，记载广博，实为上古文化之渊薮，神话传说之宝库也。',
    coreConcepts: ['天下山川', '异国异人', '奇禽怪兽', '神灵祭祀', '上古博物'],
    keyChapters: ['五藏山经', '海外四经', '海内四经', '大荒四经', '海内经'],
    historicalInfluence: ['神话传说之宗', '古代地理之宝', '小说戏剧素材', '民俗信仰之源', '博物学之祖'],
    recommendedFor: ['神话传说爱好者', '上古历史研究者', '博物洽闻之士'],
    icon: '📘',
    color: '#06b6d4'
  },
  {
    id: 4,
    name: '黄帝内经',
    tier: '医家圣典',
    author: '黄帝与岐伯雷公问答',
    dynasty: '战国 - 汉',
    desc: '上古医道，养生之源。素问灵枢，阴阳五行，藏象经络，治本于未病。',
    rarity: '圣典级',
    wisdom: 95,
    integrity: 95,
    detail: '黄帝内经，医家之宗，养生之祖。分为素问、灵枢两部，各八十一篇。黄帝坐明堂，召岐伯、雷公、伯高、少俞、少师、仲文，问以医道。上穷天纪，下极地理，远取诸物，近取诸身，更相问难，垂法以福万世。其言道生之本，本于阴阳；治病之要，要于标本。不治已病治未病，不治已乱治未乱。恬淡虚无，真气从之，精神内守，病安从来。饮食有节，起居有常，不妄作劳，故能形与神俱，而尽终其天年，度百岁乃去。此非仅医道，实乃养生之大道，处世之良方也。',
    coreConcepts: ['阴阳五行', '藏象经络', '治未病', '天人相应', '形神合一'],
    keyChapters: ['素问上古天真论', '素问四气调神大论', '灵枢经脉篇', '素问阴阳应象大论', '灵枢九针十二原'],
    historicalInfluence: ['中医理论之根基', '养生学之鼻祖', '经络学说之源', '气功导引之祖', '生命科学之典范'],
    recommendedFor: ['医道修行者', '养生健体之士', '天人合一探求者'],
    icon: '📙',
    color: '#f97316'
  },
  {
    id: 5,
    name: '道德经',
    tier: '道家至尊',
    author: '老子李耳',
    dynasty: '春秋',
    desc: '道可道非常道，名可名非常名。五千真言，通玄达妙，为万物之宗。',
    rarity: '圣典级',
    wisdom: 100,
    integrity: 100,
    detail: '道德经，老子西游，函谷关令尹喜强为之著书，言道德之意五千余言而去。道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲以观其妙，常有欲以观其徼。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。上士闻道，勤而行之；中士闻道，若存若亡；下士闻道，大笑之，不笑不足以为道。道生一，一生二，二生三，三生万物。人法地，地法天，天法道，道法自然。治大国若烹小鲜。柔弱胜刚强。祸莫大于不知足，咎莫大于欲得。知止不殆，可以长久。夫唯不争，故天下莫能与之争。五千真言，字字珠玑，道家思想之顶峰，东方智慧之极品也。',
    coreConcepts: ['道法自然', '无为而治', '柔弱胜刚强', '反者道之动', '守雌抱朴'],
    keyChapters: ['道可道章第一', '上善若水章第八', '致虚极章第十六', '道生一章第四十二', '小国寡民章第八十'],
    historicalInfluence: ['道家思想核心', '道教最高经典', '帝王南面之术', '兵家谋略之源', '人生智慧宝典'],
    recommendedFor: ['修道之士', '治国之人', '治身养生者', '寻求智慧者'],
    icon: '📕',
    color: '#ef4444'
  },
  {
    id: 6,
    name: '奇门遁甲',
    tier: '兵家至尊',
    author: '风后',
    dynasty: '黄帝时代',
    desc: '九天玄女所传，黄帝用之以胜蚩尤。三奇六仪，八门九星，藏天地杀机。',
    rarity: '秘典级',
    wisdom: 90,
    integrity: 50,
    detail: '奇门遁甲，古称帝王之学，兵家之秘。黄帝战蚩尤，九战九不胜，乃斋戒祈祷。九天玄女下降，授以遁甲、符印、剑法、秘诀。黄帝命风后演之，为一千零八十局。其法以十干中乙丙丁为三奇，戊己庚辛壬癸为六仪。三奇六仪分置九宫，而以甲统之，观其加临吉凶，以为趋避。天有九星，地有九宫，人有八门。天盘九星转动，地盘九宫不移，人盘八门顺逆。天干化合，五行生克，神煞加临，格局成败。小可以趋吉避凶，中可以行兵打仗，大可以经天纬地。历代军师，如姜太公、张子房、诸葛亮、刘伯温，莫不精通此术，用之以成帝王之业。',
    coreConcepts: ['三奇六仪', '八门九星', '天盘地盘人盘', '格局成败', '趋吉避凶'],
    keyChapters: ['烟波钓叟歌', '十干克应', '八门吉凶', '九星旺衰', '神煞作用'],
    historicalInfluence: ['历代军师秘术', '兵家宝典', '术数巅峰之作', '决策参考工具', '运筹帷幄之法'],
    recommendedFor: ['运筹帷幄之谋士', '行兵布阵之将帅', '决策千里之智者'],
    icon: '📔',
    color: '#22c55e'
  },
  {
    id: 7,
    name: '论语',
    tier: '儒家圣经',
    author: '孔子弟子及再传弟子',
    dynasty: '春秋 - 战国',
    desc: '子曰学而时习之，不亦说乎？二十篇，四百九十二章，集孔子思想之大成。',
    rarity: '圣典级',
    wisdom: 95,
    integrity: 100,
    detail: '论语，孔子应答弟子时人，及弟子相与言而接闻于夫子之语也。当时弟子各有所记，夫子既卒，门人相与辑而论纂，故谓之论语。凡二十篇，四百九十二章。其为人也孝悌，而好犯上者鲜矣；不好犯上，而好作乱者，未之有也。君子务本，本立而道生。学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？吾十有五而志于学，三十而立，四十而不惑，五十而知天命，六十而耳顺，七十而从心所欲，不逾矩。志于道，据于德，依于仁，游于艺。己所不欲，勿施于人。克己复礼为仁。半部论语治天下，此言不虚也。',
    coreConcepts: ['仁礼忠信', '孝悌为本', '修齐治平', '中庸之道', '有教无类'],
    keyChapters: ['学而第一', '为政第二', '八佾第三', '里仁第四', '颜渊第十二'],
    historicalInfluence: ['两千五百年正统思想', '东亚文化之灵魂', '修身齐家之准则', '治国平天下之良方', '为人处世之规范'],
    recommendedFor: ['修身立德之士人', '治国齐家之君子', '为人处世之楷模'],
    icon: '📖',
    color: '#8b5cf6'
  },
  {
    id: 8,
    name: '孙子兵法',
    tier: '兵学圣典',
    author: '孙武',
    dynasty: '春秋',
    desc: '兵者，国之大事，死生之地，存亡之道，不可不察也。十三篇，百世谈兵之祖。',
    rarity: '圣典级',
    wisdom: 95,
    integrity: 95,
    detail: '孙子兵法，兵学圣典，世界第一兵书。齐人孙武，以兵法见于吴王阖庐，卒以为将，西破强楚，北威齐晋，显名诸侯。其书十三篇，字字珠玑，句句真理。兵者，国之大事，死生之地，存亡之道，不可不察也。知己知彼，百战不殆；不知彼而知己，一胜一负；不知彼不知己，每战必殆。上兵伐谋，其次伐交，其次伐兵，其下攻城。不战而屈人之兵，善之善者也。兵无常势，水无常形，能因敌变化而取胜者，谓之神。其言不仅用兵，亦可为经商之法，处世之道，竞争之术，治国之方。古今中外，莫能外也。',
    coreConcepts: ['知己知彼', '不战而屈人之兵', '兵不厌诈', '因敌制胜', '速战速决'],
    keyChapters: ['始计第一', '作战第二', '谋攻第三', '兵势第五', '虚实第六'],
    historicalInfluence: ['世界兵学鼻祖', '商业竞争智慧', '政治斗争谋略', '体育竞技策略', '人生不败法则'],
    recommendedFor: ['将帅之才', '经商智者', '竞争场上之士', '人生运筹者'],
    icon: '⚔️',
    color: '#ec4899'
  }
]

const LOST_BOOKS: LostBook[] = [
  {
    id: 1,
    name: '连山易',
    tier: '三易之首',
    author: '神农氏',
    era: '夏朝',
    desc: '夏曰连山，以艮为首。象山之出云连连不绝，演万物之终始。',
    lossDate: '秦汉之际',
    lossReason: '焚书坑儒 + 战火',
    importance: 95,
    detail: '连山易，夏之易也，三易之首。传为神农氏所作，以艮卦为首，象山之出云连连不绝，故名连山。其法以八纯卦相重，得六十四卦，每卦别为六十四，合四千零九十六卦。连山主占天时，观气象，测灾异，知时节，务农桑。夏后氏用之，以教民耕种，以察天时变化。商汤代夏，连山易藏于史官，不为世人所重。周革殷命，周易兴而连山微。秦焚百家之言，连山首当其祸。汉兴，求遗书于天下，连山已不可得。或有献伪书者，终不能乱真。今唯存桓谭新论之言：连山八万言，藏于兰台。其详不可得闻也。',
    survivingFragments: ['桓谭新论记载', '周礼太卜三易之说', '扬雄太玄疑似传承', '部分汉易引用'],
    historicalMentions: ['周礼·春官·太卜', '桓谭新论', '汉书·艺文志', '孔颖达周易正义'],
    reconstructionAttempts: ['汉儒搜集残篇', '晋代豫章内史发现', '隋代刘炫伪造', '清代马国翰玉函山房辑佚书'],
    icon: '⛰️',
    color: '#6b7280'
  },
  {
    id: 2,
    name: '归藏易',
    tier: '三易之二',
    author: '黄帝',
    era: '商朝',
    desc: '殷曰归藏，以坤为首。象万物莫不归藏于其中，窥阴阳之奥秘。',
    lossDate: '魏晋之后',
    lossReason: '战乱 + 无传人',
    importance: 90,
    detail: '归藏易，殷之易也，三易之二。传为黄帝所作，商人因之。以坤卦为首，象万物莫不归藏于其中，故名归藏。孔子曰：吾欲观殷道，是故之宋，而不足征也，吾得坤乾焉。坤乾即归藏易也。归藏先坤后乾，首重母性，崇阴柔，贵无为，近道家思想。其占法简朴，以贞悔为断，重兆象而不重义理。周兴，归藏藏于卜馆，仅供太卜参考。春秋战国，诸子百家鲜有引之者。秦火之后，或有残篇传世。晋代汲冢竹书中，或有归藏残文。隋书经籍志尚著录归藏十三卷，今唯存初经、齐母经、本蓍篇三篇，其余亡佚。宋以后，此三篇亦不复见，今唯存辑本而已。',
    survivingFragments: ['初经残篇', '齐母经残句', '本蓍篇片段', '王家台秦简归藏'],
    historicalMentions: ['孔子家语', '礼记·礼运', '桓谭新论', '晋书中经簿'],
    reconstructionAttempts: ['汲冢竹书整理', '王应麟辑本', '马国翰玉函山房', '今人秦简研究'],
    icon: '🌙',
    color: '#64748b'
  },
  {
    id: 3,
    name: '三坟五典',
    tier: '上古典籍',
    author: '三皇五帝',
    era: '上古',
    desc: '伏羲、神农、黄帝之书谓之三坟，言大道也。少昊、颛顼、高辛、唐、虞之书谓之五典，言常道也。',
    lossDate: '春秋之前',
    lossReason: '年代久远 + 战乱',
    importance: 100,
    detail: '三坟五典，上古典籍之总称。左传昭公十二年：楚左史倚相能读三坟、五典、八索、九丘。孔安国尚书序：伏羲、神农、黄帝之书，谓之三坟，言大道也。少昊、颛顼、高辛、唐、虞之书，谓之五典，言常道也。三坟者，盖天皇伏羲之坟气，人皇神农之坟形，地皇黄帝之坟质，三才之根源，大道之精髓也。五典者，五帝之常道，修身治国之准则也。孔子删书，断自唐虞，三坟遂不复存。或谓尚书尧典、舜典，即五典之遗；尚书洪范，即三坟之绪。然其详，终不可得而闻也。',
    survivingFragments: ['尚书部分篇章疑似', '左传引述', '诸子百家零星引用', '纬书记载'],
    historicalMentions: ['左传·昭公十二年', '孔安国尚书序', '说文解字', '后汉书·张衡传'],
    reconstructionAttempts: ['孔安国整理尚书', '宋儒拟三坟书', '明人伪作三坟', '清代考据'],
    icon: '📚',
    color: '#78716c'
  },
  {
    id: 4,
    name: '太公阴符经',
    tier: '兵家秘典',
    author: '姜太公',
    era: '西周',
    desc: '观天之道，执天之行，尽矣。三百言，藏天机，通鬼神，圣人得之以成帝业。',
    lossDate: '战国末年',
    lossReason: '秘而不传 + 秦火',
    importance: 95,
    detail: '太公阴符经，亦称黄帝阴符经，兵家秘典，道教圣书。或谓黄帝所作，或谓太公所传，三百言，义理深奥。观天之道，执天之行，尽矣。天有五贼，见之者昌。五贼在心，施行于天，宇宙在乎手，万化生乎身。天性，人也；人心，机也。立天之道，以定人也。天发杀机，移星易宿；地发杀机，龙蛇起陆；人发杀机，天地反复；天人合发，万变定基。姜太公得之，辅周灭商；张子房得之，辅汉灭楚；诸葛亮得之，三分天下。其书历代秘传，秦火之后，唯黄石公持之，三试张良而后授焉。今传世本，或谓非全本，真本早佚矣。',
    survivingFragments: ['今本黄帝阴符经三百字', '黄石公素书疑似续篇', '六韬引述', '群书治要节录'],
    historicalMentions: ['史记·留侯世家', '汉书·艺文志', '抱朴子', '隋书·经籍志'],
    reconstructionAttempts: ['张良传本', '褚遂良写本', '李筌注本', '张果老注本'],
    icon: '🔮',
    color: '#a16207'
  }
]

const getRarityStyle = (rarity: string) => {
  switch (rarity) {
    case '传说级': return { bg: '#ffd700', label: '传说' }
    case '圣典级': return { bg: '#a855f7', label: '圣典' }
    case '秘典级': return { bg: '#06b6d4', label: '秘典' }
    default: return { bg: '#6b7280', label: '普通' }
  }
}

const getImportanceStyle = (value: number) => {
  if (value >= 95) return { color: '#ef4444', label: '无价' }
  if (value >= 90) return { color: '#f97316', label: '国宝' }
  return { color: '#eab308', label: '珍贵' }
}

export default function TushuPage() {
  const [filteredBooks, setFilteredBooks] = useState(ANCIENT_BOOKS)
  const [expandedBook, setExpandedBook] = useState<number | null>(null)
  const [filteredLost, setFilteredLost] = useState(LOST_BOOKS)
  const [expandedLost, setExpandedLost] = useState<number | null>(null)

  const handleBookFilter = useCallback((data: typeof ANCIENT_BOOKS) => {
    setFilteredBooks(data)
  }, [])

  const handleLostFilter = useCallback((data: typeof LOST_BOOKS) => {
    setFilteredLost(data)
  }, [])

  const bookFilters = {
    searchKeys: ['name', 'author', 'tier', 'dynasty', 'desc', 'detail', 'coreConcepts'],
    filterKeys: {
      rarity: [...new Set(ANCIENT_BOOKS.map(b => b.rarity))],
      dynasty: [...new Set(ANCIENT_BOOKS.map(b => b.dynasty))],
    },
    sortOptions: [
      { key: 'wisdom', label: '智慧指数' },
      { key: 'integrity', label: '完整度' },
      { key: 'name', label: '典籍名称' },
    ],
  }

  const lostFilters = {
    searchKeys: ['name', 'author', 'desc', 'detail', 'lossReason', 'survivingFragments'],
    filterKeys: {
      era: [...new Set(LOST_BOOKS.map(b => b.era))],
    },
    sortOptions: [
      { key: 'importance', label: '重要性' },
      { key: 'name', label: '典籍名称' },
    ],
  }

  return (
    <SubPageTemplate
      title="洪荒图书"
      subtitle="天书玉简 · 上古传承 · 三坟五典 · 八索九丘"
      icon="📕"
      colorRgb="168, 85, 247"
    >
      <SubPageSection title="四库总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: '经部', value: '12部', icon: '📿', color: '#ef4444' },
              { label: '史部', value: '24部', icon: '📜', color: '#f97316' },
              { label: '子部', value: '189部', icon: '💡', color: '#22c55e' },
              { label: '集部', value: '36部', icon: '📝', color: '#06b6d4' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    background: stat.color,
                    margin: '0 auto 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    boxShadow: `0 0 25px ${stat.color}66`
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="上古典籍">
        <FilterBar
          data={ANCIENT_BOOKS}
          onFiltered={handleBookFilter}
          options={bookFilters}
          placeholder="搜索典籍名称、作者、核心概念..."
        />
        
        <div style={{ marginTop: '1.5rem' }}>
          <AnimatePresence>
            {filteredBooks.map((book) => (
              <motion.div key={book.id} layout style={{ marginBottom: '1rem' }}>
                <InfoCard
                  title={book.name}
                  subtitle={`${book.tier} · ${book.author}`}
                  glowColor={book.color.replace('#', '')}
                  glowIntensity={book.wisdom >= 95 ? 90 : 60}
                  onClick={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <motion.div
                      animate={{ rotate: [0, 2, -2, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        width: '70px',
                        height: '90px',
                        borderRadius: '6px 12px 12px 6px',
                        background: `linear-gradient(135deg, ${book.color}, ${book.color}99)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        flexShrink: 0,
                        boxShadow: `4px 4px 15px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.1)`,
                        borderLeft: '6px solid rgba(0,0,0,0.3)'
                      }}
                    >
                      {book.icon}
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '12px', 
                          fontSize: '0.7rem',
                          background: getRarityStyle(book.rarity).bg,
                          color: 'white',
                          fontWeight: 'bold'
                        }}>
                          {getRarityStyle(book.rarity).label}
                        </span>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', flex: 1, marginLeft: '1rem' }}>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>智慧指数</div>
                            <ProgressBar value={book.wisdom} color={book.color} height={6} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>完整度</div>
                            <ProgressBar value={book.integrity} color="#22c55e" height={6} />
                          </div>
                        </div>
                      </div>
                      <p style={{ color: 'rgba(180, 180, 190, 0.9)', fontSize: '0.9rem', margin: 0 }}>
                        {book.desc}
                      </p>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)', marginTop: '0.5rem' }}>
                        📍 {book.dynasty}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedBook === book.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ 
                          borderTop: `1px solid ${book.color}33`,
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
                            {book.detail}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                              <div style={{ color: book.color, fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                💡 核心理念
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {book.coreConcepts.map((c, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: `${book.color}20`,
                                    color: book.color
                                  }}>
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                📖 重点篇章
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {book.keyChapters.map((c, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(34, 197, 94, 0.15)',
                                    color: '#22c55e'
                                  }}>
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div style={{ color: '#b89438', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                              🌟 历史影响
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {book.historicalInfluence.map((h, i) => (
                                <span key={i} style={{
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem',
                                  background: 'rgba(184, 148, 56, 0.15)',
                                  color: '#b89438'
                                }}>
                                  {h}
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
                    color: `${book.color}99`,
                    fontSize: '0.8rem'
                  }}>
                    {expandedBook === book.id ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </div>
                </InfoCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>

      <SubPageSection title="失传秘典">
        <FilterBar
          data={LOST_BOOKS}
          onFiltered={handleLostFilter}
          options={lostFilters}
          placeholder="搜索失传典籍名称、作者、失传原因..."
        />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          <AnimatePresence>
            {filteredLost.map((book) => (
              <motion.div key={book.id} layout>
                <InfoCard
                  title={book.name}
                  subtitle={`${book.tier} · ${book.author} · ${book.era}`}
                  glowColor={book.color.replace('#', '')}
                  glowIntensity={70}
                  onClick={() => setExpandedLost(expandedLost === book.id ? null : book.id)}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <motion.div
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        width: '70px',
                        height: '90px',
                        borderRadius: '6px 12px 12px 6px',
                        background: `linear-gradient(135deg, ${book.color}, ${book.color}66)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        flexShrink: 0,
                        boxShadow: `4px 4px 15px rgba(0,0,0,0.2)`,
                        borderLeft: '6px solid rgba(0,0,0,0.2)',
                        filter: 'grayscale(50%)'
                      }}
                    >
                      {book.icon}
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '12px', 
                          fontSize: '0.7rem',
                          background: getImportanceStyle(book.importance).color,
                          color: 'white',
                          fontWeight: 'bold'
                        }}>
                          {getImportanceStyle(book.importance).label}
                        </span>
                        <div style={{ marginLeft: '1rem', flex: 1 }}>
                          <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>历史重要性</div>
                          <ProgressBar value={book.importance} color={getImportanceStyle(book.importance).color} height={6} />
                        </div>
                      </div>
                      <p style={{ color: 'rgba(180, 180, 190, 0.9)', fontSize: '0.9rem', margin: 0 }}>
                        {book.desc}
                      </p>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)', marginTop: '0.5rem' }}>
                        💀 失传于：{book.lossDate} · {book.lossReason}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedLost === book.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ 
                          borderTop: `1px solid ${book.color}33`,
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
                            {book.detail}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                              <div style={{ color: '#f97316', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                📄 现存残篇
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {book.survivingFragments.map((f, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(249, 115, 22, 0.15)',
                                    color: '#f97316'
                                  }}>
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ color: '#06b6d4', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                🔍 复原尝试
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {book.reconstructionAttempts.map((r, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(6, 182, 212, 0.15)',
                                    color: '#06b6d4'
                                  }}>
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

                  <div style={{ 
                    textAlign: 'center', 
                    marginTop: '0.75rem',
                    color: `${book.color}99`,
                    fontSize: '0.8rem'
                  }}>
                    {expandedLost === book.id ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </div>
                </InfoCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
