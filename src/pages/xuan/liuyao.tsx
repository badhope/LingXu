'use client'

import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface NaJia {
  hexagram: string
  trigram: string
  inner: string[]
  outer: string[]
  ruler: string
  palace: string
  feature: string
  detail: string
  application: string[]
}

const NA_JIA: NaJia[] = [
  {
    hexagram: '乾',
    trigram: '☰',
    inner: ['子水', '寅木', '辰土'],
    outer: ['午火', '申金', '戌土'],
    ruler: '壬午',
    palace: '乾宫',
    feature: '纯阳刚健，天行不息。六龙御天，元亨利贞。',
    detail: '乾卦六爻皆阳，为八卦之首。乾为天，为父，为君，为金，为玉。乾宫八卦皆属金，世爻在壬午。初九潜龙，九五飞龙。乾主刚健主动，自强不息。占得乾卦，多主刚健有力，事业有成，但需戒骄戒躁，知进知退。',
    application: ['占事业', '占领导', '占官运', '占长辈'],
  },
  {
    hexagram: '坤',
    trigram: '☷',
    inner: ['未土', '巳火', '卯木'],
    outer: ['丑土', '亥水', '酉金'],
    ruler: '癸丑',
    palace: '坤宫',
    feature: '纯阴柔顺，厚德载物。牝马之贞，利涉大川。',
    detail: '坤卦六爻皆阴，为地道之极。坤为地，为母，为臣，为土，为布。坤宫八卦皆属土，世爻在癸丑。坤主柔顺，厚德载物，包容万物。占得坤卦，多主顺利安稳，有贵人相助，宜守不宜进，宜静不宜动。',
    application: ['占地产', '占母亲', '占仓储', '占民众'],
  },
  {
    hexagram: '震',
    trigram: '☳',
    inner: ['戌土', '申金', '午火'],
    outer: ['辰土', '寅木', '子水'],
    ruler: '庚戌',
    palace: '震宫',
    feature: '震惊百里，迅雷不及。长子主器，作乐崇德。',
    detail: '震卦一阳动于二阴之下，为雷，为动，为长子。震宫八卦皆属木，世爻在庚戌。震主动，主惊，主名声远播。震为长子，继承家业。占得震卦，多主有变动，有惊无险，声名远扬，宜主动出击。',
    application: ['占名声', '占出行', '占长子', '占变动'],
  },
  {
    hexagram: '巽',
    trigram: '☴',
    inner: ['丑土', '亥水', '酉金'],
    outer: ['辛未', '巳火', '卯木'],
    ruler: '辛丑',
    palace: '巽宫',
    feature: '随风巽入，无孔不入。长女随顺，申命行事。',
    detail: '巽卦一阴伏于二阳之下，为风，为入，为长女。巽宫八卦皆属木，世爻在辛丑。巽主入，主随顺，主申命行事。巽为长女，善于随顺。占得巽卦，多主事业顺利，宜随顺时机，不可强为，宜细水长流。',
    application: ['占生意', '占长女', '占书信', '占流通'],
  },
  {
    hexagram: '坎',
    trigram: '☵',
    inner: ['寅木', '辰土', '午火'],
    outer: ['申金', '戌土', '子水'],
    ruler: '戊申',
    palace: '坎宫',
    feature: '坎水险陷，习坎有孚。中男智慧，行险而不失信。',
    detail: '坎卦阳陷阴中，为水，为险，为中男。坎宫八卦皆属水，世爻在戊申。坎主险，主智，主盗，主隐伏。坎为中男，智慧深沉。占得坎卦，多主有艰险，有智慧，需行险而不失信，守正以出险。',
    application: ['占智慧', '占盗贼', '占水中', '占险难'],
  },
  {
    hexagram: '离',
    trigram: '☲',
    inner: ['卯木', '丑土', '亥水'],
    outer: ['酉金', '未土', '巳火'],
    ruler: '己巳',
    palace: '离宫',
    feature: '离火光明，继明照四方。中女文明，化成天下。',
    detail: '离卦阴丽于阳，为火，为明，为中女。离宫八卦皆属火，世爻在己巳。离主明，主文，主火，主文章。离为中女，文明美丽。占得离卦，多主光明，文章显达，事业有成，宜发挥才华，展现自我。',
    application: ['占文章', '占考试', '占文书', '占光明'],
  },
  {
    hexagram: '艮',
    trigram: '☶',
    inner: ['辰土', '午火', '申金'],
    outer: ['戌土', '子水', '寅木'],
    ruler: '丙寅',
    palace: '艮宫',
    feature: '艮山静止，万物之所成终。少男笃实，思不出其位。',
    detail: '艮卦一阳止于二阴之上，为山，为止，为少男。艮宫八卦皆属土，世爻在丙寅。艮主止，主静，主笃实，主思不出其位。艮为少男，忠厚笃实。占得艮卦，多事宜止不宜进，宜静不宜动，守正待时。',
    application: ['占静止', '占少男', '占山陵', '占等待'],
  },
  {
    hexagram: '兑',
    trigram: '☱',
    inner: ['巳火', '卯木', '丑土'],
    outer: ['亥水', '酉金', '未土'],
    ruler: '丁巳',
    palace: '兑宫',
    feature: '兑泽和悦，万物所说。少女丽质，朋友讲习。',
    detail: '兑卦一阴见乎二阳之外，为泽，为悦，为少女。兑宫八卦皆属金，世爻在丁巳。兑主悦，主言，主毁折，主朋友讲习。兑为少女，美丽悦人。占得兑卦，多主喜悦，有口福，有朋友相助，宜讲习讨论，和悦待人。',
    application: ['占喜悦', '占少女', '占口舌', '占朋友'],
  },
]

interface LiuShen {
  name: string
  element: string
  color: string
  feature: string
  effect: number
  day: string
  detail: string
  manifestations: string[]
}

const LIU_SHEN: LiuShen[] = [
  {
    name: '青龙',
    element: '木',
    color: '#22c55e',
    feature: '喜庆吉祥，官禄贵气。',
    effect: 95,
    day: '甲乙日',
    detail: '青龙为吉神之首，属东方木，主喜庆吉祥，官禄贵气。青龙临爻，多有吉庆之事。临财则财源广进，临官则官运亨通，临父则长辈康健。青龙主婚姻喜庆，升官发财，添丁进口。遇吉神则吉庆加倍，遇凶神则化凶为吉。',
    manifestations: ['婚姻喜庆', '升官晋级', '添丁进口', '贵人相助'],
  },
  {
    name: '朱雀',
    element: '火',
    color: '#ef4444',
    feature: '文书口舌，是非争端。',
    effect: 60,
    day: '丙丁日',
    detail: '朱雀属南方火，主文书口舌，是非争端。朱雀临爻，旺则文书得力，考试顺利，信息灵通；衰则口舌是非，诉讼缠身。朱雀主传播，主表达，主文章。占文书考试得朱雀生扶，多主金榜题名。',
    manifestations: ['文书考试', '信息传播', '口舌是非', '诉讼官司'],
  },
  {
    name: '勾陈',
    element: '土',
    color: '#a16207',
    feature: '田地房屋，迟滞牵连。',
    effect: 70,
    day: '戊日',
    detail: '勾陈属中央土，主田地房屋，迟滞牵连。勾陈临爻，主事情拖延，有牵连，有挂碍。主不动产交易，田地房产之事。勾陈稳重可靠但行动迟缓，事情多有阻滞但能持久。',
    manifestations: ['房产交易', '事情拖延', '牵连挂碍', '田地耕种'],
  },
  {
    name: '腾蛇',
    element: '土',
    color: '#78716c',
    feature: '虚惊怪异，梦寐难安。',
    effect: 45,
    day: '己日',
    detail: '腾蛇属中央土，主虚惊怪异，梦寐难安。腾蛇临爻，多梦魇怪梦，惊恐疑虑，虚伪欺诈。主怪力乱神之事，阴柔性灵，变化莫测。占病得腾蛇，多主邪祟缠身，需要禳解。',
    manifestations: ['怪梦异事', '惊恐疑虑', '虚伪欺诈', '邪祟缠身'],
  },
  {
    name: '白虎',
    element: '金',
    color: '#9ca3af',
    feature: '血光刑伤，孝服丧事。',
    effect: 30,
    day: '庚辛日',
    detail: '白虎属西方金，主血光刑伤，孝服丧事。白虎临爻，多主凶灾横祸，疾病死伤，刀兵刑罚。旺则杀伐果断，有威严，有魄力；衰则疾病缠身，孝服临门。占病得白虎，多主凶险。',
    manifestations: ['血光之灾', '疾病死伤', '孝服丧事', '刀兵刑罚'],
  },
  {
    name: '玄武',
    element: '水',
    color: '#3b82f6',
    feature: '盗贼阴私，暧昧不明。',
    effect: 50,
    day: '壬癸日',
    detail: '玄武属北方水，主盗贼阴私，暧昧不明。玄武临爻，主盗窃遗失，私情暧昧，阴谋诡计。旺则智慧深沉，计谋过人；衰则淫邪偷盗，暗昧不明。占失物得玄武，多主被盗。',
    manifestations: ['盗窃遗失', '私情暧昧', '阴谋诡计', '智慧深沉'],
  },
]

interface LiuQin {
  name: string
  relation: string
  color: string
  feature: string
  usage: string[]
  detail: string
  prosperity: number
}

const LIU_QIN_LIUYAO: LiuQin[] = [
  {
    name: '父母爻',
    relation: '生我',
    color: '#3b82f6',
    feature: '主文书、学业、考试、证件、房屋、车辆、长辈、保护。',
    prosperity: 85,
    detail: '父母爻为生我之爻，如天地养育万物。主文书学业，考试证件，房屋车辆，长辈保护。父母旺则学业有成，考试顺利，得长辈庇护，有田宅之福。父母多则克子孙，不宜占子孙。',
    usage: ['占长辈', '占考试', '占房产', '占文书', '占车辆'],
  },
  {
    name: '官鬼爻',
    relation: '克我',
    color: '#dc2626',
    feature: '主官职、事业、疾病、灾祸、丈夫、权威、鬼神。',
    prosperity: 75,
    detail: '官鬼爻为克我之爻，如官府管束万民。主官职事业，疾病灾祸，丈夫权威，妖魔鬼怪。官旺则官运亨通，事业发达；官衰则疾病缠身，灾祸临门。女占婚看官鬼，男占病惧官鬼。',
    usage: ['占仕途', '占疾病', '占丈夫', '占灾祸', '占官司'],
  },
  {
    name: '兄弟爻',
    relation: '同我',
    color: '#22c55e',
    feature: '主兄弟、朋友、同辈、竞争、破财、阻力。',
    prosperity: 60,
    detail: '兄弟爻为同我之爻，如手足之情。主兄弟朋友，同辈竞争，破财阻力。兄旺则朋友相助，有人脉，但也分财夺利，阻碍求财。兄动则破财，占财最忌兄弟发动。但占竞争事宜，兄旺有助力。',
    usage: ['占兄弟', '占竞争', '占合伙', '占朋友'],
  },
  {
    name: '妻财爻',
    relation: '我克',
    color: '#f59e0b',
    feature: '主财富、妻妾、财运、物质、利益、妻子。',
    prosperity: 90,
    detail: '妻财爻为我克之爻，如人支配财物。主财富妻妾，财运物质，利益妻子。财旺则财源广进，婚姻美满，物质丰饶。财动则克父母，占考试长辈忌财动。男占婚看妻财，占求财为用神。',
    usage: ['占财运', '占妻子', '占交易', '占物质', '占婚姻'],
  },
  {
    name: '子孙爻',
    relation: '我生',
    color: '#a855f7',
    feature: '主子孙、晚辈、福气、解灾、娱乐、医药。',
    prosperity: 95,
    detail: '子孙爻为我生之爻，如人养育子孙。主子孙晚辈，福气解灾，娱乐医药。子旺则子孙贤孝，消灾解厄，快乐自在。子孙为福德之神，能克官鬼，占病得子孙动则病愈，占官得子动则失职。',
    usage: ['占子孙', '占医药', '占娱乐', '占解灾', '占养殖'],
  },
]

interface YaoPosition {
  position: string
  yao: string
  level: string
  meaning: string
  importance: number
  detail: string
  representations: string[]
}

const YAO_POSITIONS: YaoPosition[] = [
  {
    position: '上爻',
    yao: '六爻',
    level: '天',
    meaning: '宗庙、远方、结果、晚年、外人、表象。',
    importance: 70,
    detail: '上爻居卦之极，为天位，宗庙之位。主远方之事，最终结果，晚年运势，外人之事，表面现象。事物发展的最终阶段，最外在的表现。物极必反，上爻动多主事情发展到极致而转向。',
    representations: ['远方之事', '最终结果', '晚年运势', '外人', '表面现象'],
  },
  {
    position: '五爻',
    yao: '五爻',
    level: '天',
    meaning: '君位、至尊、领导、核心、事业、名望。',
    importance: 95,
    detail: '五爻为君位，至尊之位。主领导大人物，核心决策，事业发展，名望地位。多为尊位，占事得五爻动，多与领导大人物相关。五爻为天子位，占官得五爻生扶，多主得君王赏识。',
    representations: ['君王领导', '核心决策', '事业名望', '至尊地位', '道路'],
  },
  {
    position: '四爻',
    yao: '四爻',
    level: '人',
    meaning: '大臣、辅佐、门户、过渡、中年、朋友。',
    importance: 80,
    detail: '四爻为大臣之位，辅佐之位。主辅佐之人，门户出入，过渡阶段，中年运势，朋友同事。承上启下的关键位置，多与外部环境相关。四爻近君，为心腹近臣，多与领导接触。',
    representations: ['辅佐大臣', '门户出入', '过渡阶段', '中年运势', '朋友同事'],
  },
  {
    position: '三爻',
    yao: '三爻',
    level: '人',
    meaning: '内臣、自己、家庭、过程、壮年、兄弟。',
    importance: 85,
    detail: '三爻为内卦之极，内臣之位。主自身状态，家庭内部，过程发展，壮年运势，兄弟手足。内卦之极，多与自身及家庭事务相关。三爻为内卦之主，多主自己的想法和行动。',
    representations: ['自身状态', '家庭内部', '过程发展', '壮年运势', '兄弟手足'],
  },
  {
    position: '二爻',
    yao: '二爻',
    level: '地',
    meaning: '臣位、居家、妻子、内心、青年、宅地。',
    importance: 90,
    detail: '二爻为臣位，大夫之位。主居家生活，妻妾情况，内心想法，青年运势，家宅田地。多为家宅之位，妻财之位，与内心世界相关。二爻为宅，占家宅看二爻。二爻为妻位，女占婚看二爻。',
    representations: ['家宅居住', '妻妾情况', '内心想法', '青年运势', '田宅'],
  },
  {
    position: '初爻',
    yao: '初爻',
    meaning: '根基、开始、出身、幼年、内心、大地。',
    level: '地',
    importance: 75,
    detail: '初爻居卦之下，为地位。主根基底蕴，事情开始，出身来历，幼年运势，内心深处，大地根基。事物发展的初始阶段，最内在的根基。初爻动，主事情刚刚开始，根基不稳，需要培育。',
    representations: ['根基底蕴', '事情开始', '出身来历', '幼年运势', '内心深处'],
  },
]

interface DivinationMethod {
  name: string
  accuracy: number
  difficulty: number
  feature: string
  steps: string
  detail: string
  tips: string[]
}

const DIVINATION_METHODS: DivinationMethod[] = [
  {
    name: '铜钱摇卦',
    accuracy: 90,
    difficulty: 30,
    feature: '三枚乾隆通宝，诚心默祷，六次成卦。最为灵验，古今通用。',
    steps: '静心→祝祷→摇钱→六次成卦',
    detail: '铜钱摇卦为六爻正宗之法，最为灵验。取三枚乾隆通宝铜钱，乾隆通宝外圆内方，暗含天圆地方之道。净手静心，焚香祝祷，心中默想所占之事，双手合掌摇动铜钱，掷于桌面，六次而成卦。此法流传千年，应验如神。',
    tips: ['净手静心', '专一不杂', '无事不占', '心诚则灵'],
  },
  {
    name: '时间起卦',
    accuracy: 75,
    difficulty: 20,
    feature: '年月日时起卦，无需道具。梅花易数之法，快捷方便。',
    steps: '年+月+日得上卦，加时得下卦',
    detail: '时间起卦为梅花易数之法，以年月日时数起卦。年地支数加月数加日数，除八余数得上卦；再加时数，除八余数得下卦；总数除六余数得动爻。此法无需道具，随时可用，方便快捷，占即时之事尤为灵验。',
    tips: ['北京时间', '当地真太阳时', '精确到分', '多动爻兼看'],
  },
  {
    name: '报数起卦',
    accuracy: 70,
    difficulty: 15,
    feature: '心中所想随意报三个数字，快捷方便，即时可用。',
    steps: '第一数上卦，第二数下卦，第三数动爻',
    detail: '报数起卦最为简单，让占者随意报三个数字。第一个数字除八余数得上卦，第二个数字除八余数得下卦，第三个数字除六余数得动爻。此法最为方便，即时可用，心定则数准，数定则卦灵。适合大众使用。',
    tips: ['随意报数', '第一念为准', '不刻意不犹豫', '三个数即可'],
  },
  {
    name: '字占',
    accuracy: 80,
    difficulty: 40,
    feature: '观字之形，察字之义。一字一太极，笔画定乾坤。',
    steps: '左阳右阴，上阳下阴，分判八卦',
    detail: '字占为梅花易数高级之法，观字之形，察字之义，知音之律。一字一太极，笔画有阴阳。左为阳右为阴，上为阳下为阴。字之结构暗合卦象，字之义理暗合吉凶。字如其人，心正则字正，字正则卦灵。需有深厚的汉字功底。',
    tips: ['简体繁体均可', '手写最佳', '观形察义', '结合时空'],
  },
  {
    name: '物象占',
    accuracy: 85,
    difficulty: 60,
    feature: '远取诸物，近取诸身。见喜鹊则有喜，闻鸦鸣则有凶。',
    steps: '八卦类万物，观象而知机',
    detail: '物象占为易占最高境界，仰观天文，俯察地理，远取诸物，近取诸身。见喜鹊则有喜庆，闻鸦鸣则有凶灾，遇犬吠则有盗贼，见花开则有喜事。万物皆有征兆，心动则机发，感而遂通。此为易占之极致，需要心物合一。',
    tips: ['第一印象', '反常为妖', '对应时空', '善悟则灵'],
  },
  {
    name: '蓍草揲卦',
    accuracy: 95,
    difficulty: 90,
    feature: '大衍之数五十，其用四十有九。最为古法，最为神圣。',
    steps: '分二→挂一→揲四→归奇，十八变而成卦',
    detail: '蓍草揲卦为周易古法，最为神圣。大衍之数五十，其用四十有九。分而为二以象两，挂一以象三，揲之以四以象四时，归奇于扐以象闰。十有八变而成卦。此法最为隆重神圣，占大事需用此法，心诚则灵，感应道交。',
    tips: ['蓍草为佳', '斋戒沐浴', '洁净处所', '至诚感神'],
  },
]

interface DuanGuaKey {
  name: string
  priority: number
  desc: string
  detail: string
  examples: string[]
}

const DUAN_GUA: DuanGuaKey[] = [
  {
    name: '旺相休囚死',
    priority: 1,
    desc: '春木旺火相土死金囚水休，夏火旺土相金死水囚木休。',
    detail: '旺相休囚死为断卦第一要义，得时者旺，失时者衰。春令木旺火相土死金囚水休，夏令火旺土相金死水囚木休，秋令金旺水相火死木囚土休，冬令水旺木相火死土囚金休。四季土旺金相火死水囚木休。用神得令则有力，失令则无力。',
    examples: ['春占得木爻为旺', '夏占得火爻为相', '秋占得木爻为囚', '冬占得土爻为死'],
  },
  {
    name: '用神为核心',
    priority: 2,
    desc: '万事皆有主，先找用爻。失物看财，寻人看用，考试看父，求官看官，治病看子孙。',
    detail: '用神为断卦核心，万事皆有主，先找用爻。失物看妻财，寻人看用爻，考试看父母，求官看官鬼，治病看子孙，求名看官父，求财看妻财，占病看官鬼。用神旺相则吉，休囚则凶。用神受生则吉，受克则凶。',
    examples: ['失物看妻财爻', '考试看父母爻', '求官看官鬼爻', '治病看子孙爻'],
  },
  {
    name: '动爻为机',
    priority: 3,
    desc: '卦无动爻，事多平静；爻一动，事机已发。动则变，变则化。',
    detail: '动爻为事情发展的关键转折点，卦无动爻事多平静，爻一动则事机已发。动则变，变则化。动爻为事情发展的契机，为吉凶祸福的转机。动变生克为断卦关键，动来生我为福，动来克我为祸。',
    examples: ['父动克子孙', '子动克官鬼', '兄动克妻财', '财动克父母'],
  },
  {
    name: '世应为彼我',
    priority: 4,
    desc: '世爻为我，应爻为彼。世应相生则合作顺利，相克则矛盾重重。',
    detail: '世爻为我，为自己，为我方；应爻为彼，为对方，为他人。世应相生则合作顺利，彼此融洽；相克则矛盾重重，彼此对立。世空我心不实，应空彼意不诚。世应比和则势均力敌，相持不下。',
    examples: ['世生应我助他', '应生世他助我', '世克我胜他', '应克他胜我'],
  },
  {
    name: '日辰月建',
    priority: 5,
    desc: '日辰为六爻之主宰，月建为万卦之提纲。日辰能生克冲合卦中之爻。',
    detail: '日辰为六爻之主宰，月建为万卦之提纲。日辰能生克冲合卦中之爻，能起衰扶弱，能制强扶柔。月建定一月之权司，能扶能克，定旺衰。休囚之爻得日生则起，旺相之爻遭日克亦伤。日破月破为真破，事多不成。',
    examples: ['日生用神有力', '日克用神受伤', '月建定旺衰', '日冲静爻为暗动'],
  },
  {
    name: '刑冲合害',
    priority: 6,
    desc: '六合则合好成事，六冲则冲散不成。三合则多人相助，三刑则灾祸刑伤。',
    detail: '六合则合好成事，感情融洽；六冲则冲散不成，矛盾冲突。三合则多人相助，众志成城；三刑则灾祸刑伤，刑罚疾病。害则暗地相损，小人暗算。生合为真心相合，克合为合中有克。',
    examples: ['子丑合土', '子午相冲', '寅巳申三刑', '子未相害'],
  },
  {
    name: '空亡玄机',
    priority: 7,
    desc: '旺空不为空，衰空真是空。无故空亡必有蹊跷。',
    detail: '空亡玄机最深，不可一概而论。旺空不为真空，待时出空则有用；衰空真是真空，到底虚无。无故空亡必有蹊跷，非虚则诈。空中有实，实中有空。吉空则吉事不成，凶空则凶事消散。此为不传之秘。',
    examples: ['旺空待时', '衰空真无', '无故寻空', '吉空凶空'],
  },
  {
    name: '进退神煞',
    priority: 8,
    desc: '化进神则事业蒸蒸日上，化退神则功力日渐消退。',
    detail: '化进神则事业蒸蒸日上，如寅化卯，巳化午，申化酉，亥化子；化退神则功力日渐消退，如卯化寅，午化巳，酉化申，子化亥。随鬼入墓则凶险万分，逢绝地则事无转机。游魂则心意不定，归魂则心意已决。',
    examples: ['寅化卯进神', '卯化寅退神', '随鬼入墓凶', '游魂卦不定'],
  },
]

export default function LiuyaoPage() {
  const [filteredNajia, setFilteredNajia] = useState(NA_JIA)
  const [expandedNajia, setExpandedNajia] = useState<string | null>(null)
  const [filteredLiuShen, setFilteredLiuShen] = useState(LIU_SHEN)
  const [expandedShen, setExpandedShen] = useState<string | null>(null)
  const [filteredQin, setFilteredQin] = useState(LIU_QIN_LIUYAO)
  const [expandedQin, setExpandedQin] = useState<string | null>(null)
  const [filteredYao, setFilteredYao] = useState(YAO_POSITIONS)
  const [expandedYao, setExpandedYao] = useState<string | null>(null)
  const [filteredMethods, setFilteredMethods] = useState(DIVINATION_METHODS)
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null)
  const [filteredKeys, setFilteredKeys] = useState(DUAN_GUA)
  const [expandedKey, setExpandedKey] = useState<number | null>(null)

  const handleNajiaFilter = useCallback((data: typeof NA_JIA) => {
    setFilteredNajia(data)
  }, [])

  const handleShenFilter = useCallback((data: typeof LIU_SHEN) => {
    setFilteredLiuShen(data)
  }, [])

  const handleQinFilter = useCallback((data: typeof LIU_QIN_LIUYAO) => {
    setFilteredQin(data)
  }, [])

  const handleYaoFilter = useCallback((data: typeof YAO_POSITIONS) => {
    setFilteredYao(data)
  }, [])

  const handleMethodFilter = useCallback((data: typeof DIVINATION_METHODS) => {
    setFilteredMethods(data)
  }, [])

  const handleKeyFilter = useCallback((data: typeof DUAN_GUA) => {
    setFilteredKeys(data)
  }, [])

  const najiaFilters = {
    searchKeys: ['hexagram', 'palace', 'feature', 'detail', 'application'],
    filterKeys: {
      palace: [...new Set(NA_JIA.map(n => n.palace))],
    },
    sortOptions: [
      { key: 'hexagram', label: '卦名排序' },
    ],
  }

  const shenFilters = {
    searchKeys: ['name', 'element', 'feature', 'detail', 'manifestations'],
    filterKeys: {
      element: [...new Set(LIU_SHEN.map(s => s.element))],
    },
    sortOptions: [
      { key: 'effect', label: '灵验度排序' },
      { key: 'name', label: '神煞名排序' },
    ],
  }

  const qinFilters = {
    searchKeys: ['name', 'relation', 'feature', 'detail', 'usage'],
    filterKeys: {
      relation: [...new Set(LIU_QIN_LIUYAO.map(q => q.relation))],
    },
    sortOptions: [
      { key: 'prosperity', label: '吉庆度排序' },
      { key: 'name', label: '六亲名排序' },
    ],
  }

  const yaoFilters = {
    searchKeys: ['position', 'yao', 'level', 'meaning', 'detail', 'representations'],
    filterKeys: {
      level: [...new Set(YAO_POSITIONS.map(y => y.level))],
    },
    sortOptions: [
      { key: 'importance', label: '重要度排序' },
      { key: 'position', label: '爻位排序' },
    ],
  }

  const methodFilters = {
    searchKeys: ['name', 'feature', 'steps', 'detail', 'tips'],
    sortOptions: [
      { key: 'accuracy', label: '准确度排序' },
      { key: 'difficulty', label: '难度排序' },
      { key: 'name', label: '方法名排序' },
    ],
  }

  const keyFilters = {
    searchKeys: ['name', 'desc', 'detail', 'examples'],
    sortOptions: [
      { key: 'priority', label: '优先级排序' },
      { key: 'name', label: '要点名排序' },
    ],
  }

  return (
    <SubPageTemplate
      title="六爻断事"
      subtitle="纳甲装卦 · 六亲定位 · 世应辨明 · 断吉凶悔吝"
      icon="🔮"
      colorRgb="236, 72, 153"
    >
      <SubPageSection title="纳甲装卦">
        <FilterBar
          data={NA_JIA}
          onFiltered={handleNajiaFilter}
          options={najiaFilters}
          placeholder="搜索八宫卦..."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredNajia.map((najia) => (
            <InfoCard
              key={najia.hexagram}
              title={`${najia.trigram} ${najia.hexagram}卦`}
              subtitle={`${najia.palace} · 世持 ${najia.ruler}`}
              onClick={() => setExpandedNajia(expandedNajia === najia.hexagram ? null : najia.hexagram)}
              glowIntensity={90}
              glowColor="236, 72, 153"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{najia.feature}</span>
                {expandedNajia === najia.hexagram ? '▲' : '▼'}
              </div>

              {expandedNajia === najia.hexagram && (
                <>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {najia.detail}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ color: 'rgb(236, 72, 153)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🔮 内卦三爻</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {najia.inner.map((yao, i) => (
                          <span key={i} style={{ background: 'rgba(236, 72, 153, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                            {yao}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 style={{ color: 'rgb(236, 72, 153)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🔮 外卦三爻</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {najia.outer.map((yao, i) => (
                          <span key={i} style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                            {yao}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ color: 'rgb(236, 72, 153)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📋 适用占问</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {najia.application.map((app, i) => (
                        <span key={i} style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="六神临爻">
        <FilterBar
          data={LIU_SHEN}
          onFiltered={handleShenFilter}
          options={shenFilters}
          placeholder="搜索六神..."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredLiuShen.map((shen) => (
            <InfoCard
              key={shen.name}
              title={shen.name}
              subtitle={`${shen.element}行 · ${shen.day}`}
              onClick={() => setExpandedShen(expandedShen === shen.name ? null : shen.name)}
              glowIntensity={shen.effect}
              glowColor={shen.color.replace('#', '')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{shen.feature}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: shen.color }}>
                  灵验度 {shen.effect}%
                </div>
                {expandedShen === shen.name ? '▲' : '▼'}
              </div>

              {expandedShen === shen.name && (
                <>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {shen.detail}
                  </p>

                  <div>
                    <h4 style={{ color: shen.color, fontSize: '0.9rem', marginBottom: '0.5rem' }}>🎭 主要表现</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {shen.manifestations.map((m, i) => (
                        <span key={i} style={{ background: `${shen.color}20`, padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="六亲取用">
        <FilterBar
          data={LIU_QIN_LIUYAO}
          onFiltered={handleQinFilter}
          options={qinFilters}
          placeholder="搜索六亲..."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredQin.map((qin) => (
            <InfoCard
              key={qin.name}
              title={qin.name}
              subtitle={`${qin.relation}者 · ${qin.prosperity}%吉庆`}
              onClick={() => setExpandedQin(expandedQin === qin.name ? null : qin.name)}
              glowIntensity={qin.prosperity}
              glowColor={qin.color.replace('#', '')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{qin.feature}</span>
                {expandedQin === qin.name ? '▲' : '▼'}
              </div>

              {expandedQin === qin.name && (
                <>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {qin.detail}
                  </p>

                  <div>
                    <h4 style={{ color: qin.color, fontSize: '0.9rem', marginBottom: '0.5rem' }}>📋 主要用途</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {qin.usage.map((u, i) => (
                        <span key={i} style={{ background: `${qin.color}20`, padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="爻位精义">
        <FilterBar
          data={YAO_POSITIONS}
          onFiltered={handleYaoFilter}
          options={yaoFilters}
          placeholder="搜索爻位..."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredYao.map((yao) => (
            <InfoCard
              key={yao.position}
              title={yao.position}
              subtitle={`${yao.yao} · ${yao.level}位 · 重要度 ${yao.importance}%`}
              onClick={() => setExpandedYao(expandedYao === yao.position ? null : yao.position)}
              glowIntensity={yao.importance}
              glowColor="234, 179, 8"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{yao.meaning}</span>
                {expandedYao === yao.position ? '▲' : '▼'}
              </div>

              {expandedYao === yao.position && (
                <>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {yao.detail}
                  </p>

                  <div>
                    <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🎯 代表事项</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {yao.representations.map((r, i) => (
                        <span key={i} style={{ background: 'rgba(234, 179, 8, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="起卦方法">
        <FilterBar
          data={DIVINATION_METHODS}
          onFiltered={handleMethodFilter}
          options={methodFilters}
          placeholder="搜索起卦方法..."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredMethods.map((method) => (
            <InfoCard
              key={method.name}
              title={method.name}
              subtitle={`准确度 ${method.accuracy}% · 难度 ${method.difficulty}`}
              onClick={() => setExpandedMethod(expandedMethod === method.name ? null : method.name)}
              glowIntensity={method.accuracy}
              glowColor="16, 185, 129"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{method.feature}</span>
                {expandedMethod === method.name ? '▲' : '▼'}
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                📝 步骤：{method.steps}
              </p>

              {expandedMethod === method.name && (
                <>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {method.detail}
                  </p>

                  <div>
                    <h4 style={{ color: 'rgb(16, 185, 129)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>💡 要点提示</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {method.tips.map((tip, i) => (
                        <span key={i} style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                          {tip}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="断卦要诀">
        <FilterBar
          data={DUAN_GUA}
          onFiltered={handleKeyFilter}
          options={keyFilters}
          placeholder="搜索断卦要诀..."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredKeys.map((key) => (
            <InfoCard
              key={key.name}
              title={`第${key.priority}要 · ${key.name}`}
              onClick={() => setExpandedKey(expandedKey === key.priority ? null : key.priority)}
              glowIntensity={95 - key.priority * 5}
              glowColor="239, 68, 68"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{key.desc}</span>
                {expandedKey === key.priority ? '▲' : '▼'}
              </div>

              {expandedKey === key.priority && (
                <>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {key.detail}
                  </p>

                  <div>
                    <h4 style={{ color: 'rgb(239, 68, 68)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📌 应用示例</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {key.examples.map((ex, i) => (
                        <span key={i} style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
