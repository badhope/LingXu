'use client'

import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface FuTalisman {
  name: string
  category: string
  icon: string
  power: number
  difficulty: number
  feature: string
  usage: string[]
  effect: string
  color: string
  detail: string
  materials: string[]
  timing: string[]
  taboos: string[]
}

const FU_TYPES: FuTalisman[] = [
  {
    name: '护身符',
    category: '镇邪类',
    icon: '🛡️',
    power: 90,
    difficulty: 40,
    feature: '随身佩带，辟邪驱煞，远避小人，保身安宁。出行入险，居家镇宅，夜路保平安。',
    usage: ['入险地', '走夜路', '住凶宅', '防小人'],
    effect: '百邪不侵，夜无恶梦',
    color: '#a78bfa',
    detail: '护身符乃符箓之首，古今修道者必备。此符以朱砂书于黄绢，装入锦囊，随身佩带。善用者，夜宿荒山而不遇鬼魅，独行旷野而不逢歹人。入庙堂则神明呵护，过坟地则阴邪远避。小人见之自生退意，恶人遇之难起歹心。护身符非独护身，亦能护心，令佩带者心神安定，临危不乱。',
    materials: ['黄绢布', '朱砂', '雄黄', '锦囊'],
    timing: ['甲子日', '丙寅日', '戊辰日'],
    taboos: ['妇人经血', '污秽之地', '宰杀之时'],
  },
  {
    name: '招财符',
    category: '财运类',
    icon: '💰',
    power: 85,
    difficulty: 35,
    feature: '五路财神，招财进宝。生意兴隆，财源广进，利市三倍。正财偏财，俱来入门。',
    usage: ['开店铺', '谈生意', '求偏财', '追欠款'],
    effect: '财源广进，生意兴隆',
    color: '#f59e0b',
    detail: '招财符召请五路财神，东西南北中，路路通财源。正财者，俸禄工资，稳定收入；偏财者，意外之财，投资获利。此符令店铺客似云来，生意货如轮转。谈生意时暗藏此符，令对方心生欢喜，合约易成。追欠款者焚化此符，令欠债人良心发现，主动还款。求财有道，取之有方，此符助善不助恶。',
    materials: ['黄纸', '朱砂', '金箔', '香炉'],
    timing: ['丁卯日', '庚午日', '癸酉日'],
    taboos: ['不义之财', '赌博求赢', '欺心牟利'],
  },
  {
    name: '和合符',
    category: '感情类',
    icon: '💕',
    power: 80,
    difficulty: 50,
    feature: '夫妻和合，感情圆满。冰释前嫌，破镜重圆。恩爱甜蜜，白头偕老。',
    usage: ['夫妻和睦', '感情挽回', '姻缘顺利', '家庭和合'],
    effect: '感情和合，姻缘美满',
    color: '#ec4899',
    detail: '和合符奉请和合二仙，月下老人作主。夫妻不和者，矛盾冰释，重归于好；感情破裂者，回心转意，破镜重圆。此符能令伴侣心生眷恋，难舍难分。未婚者佩带，易得佳偶；家庭不和者，合家欢乐。和合之术，贵在真心。符助缘分之力，然心若不诚，虽符难救。',
    materials: ['粉红纸', '朱砂', '鸳鸯羽', '姻缘线'],
    timing: ['月圆之夜', '七夕', '情人节'],
    taboos: ['拆散他人', '第三者插足', '始乱终弃'],
  },
  {
    name: '文昌符',
    category: '学业类',
    icon: '📚',
    power: 88,
    difficulty: 45,
    feature: '文昌帝君，聪明开智。考试顺利，金榜题名，仕途通达。思路清晰，记忆超群。',
    usage: ['升学考试', '晋升面试', '论文写作', '求官求职'],
    effect: '文思泉涌，金榜题名',
    color: '#3b82f6',
    detail: '文昌符奉请文昌帝君，文曲星君加持。学生佩带，聪明睿智，记忆过人。临考之时，文思泉涌，下笔有神。求职面试者，思路清晰，对答如流，易得考官赏识。写作者，灵感迸发，下笔千言。求官者，仕途顺利，步步高升。文昌之道，厚积薄发。符助一时之运，然学须日积月累。',
    materials: ['竹纸', '朱砂', '毛笔', '砚台'],
    timing: ['文昌诞', '二月初三', '考试前三日'],
    taboos: ['作弊舞弊', '投机取巧', '抄袭剽窃'],
  },
  {
    name: '镇宅符',
    category: '镇邪类',
    icon: '🏠',
    power: 92,
    difficulty: 55,
    feature: '安镇家宅，驱除邪崇。家宅平安，人口康宁。化解煞气，阴阳调和。',
    usage: ['新居入宅', '家宅不宁', '邻舍冲煞', '旧房改造'],
    effect: '家宅安宁，人丁兴旺',
    color: '#ef4444',
    detail: '镇宅符奉请太上老君，安镇土地，门丞户尉。新居入宅贴于大门，可保家宅平安，百邪不侵。家宅不宁，常有异响者，贴此符七日之后，自然安宁。邻舍有冲煞者，贴此符化解。旧房改造，先焚化此符，后动土施工。家宅者，人之本也。宅安则人安，人安则家兴。',
    materials: ['黄纸', '朱砂', '鸡血', '糯米'],
    timing: ['立春', '清明', '冬至'],
    taboos: ['贴于污秽处', '贴于卧室', '破损不换'],
  },
  {
    name: '治病符',
    category: '医药类',
    icon: '💊',
    power: 75,
    difficulty: 65,
    feature: '天医加持，药石见效。小病速愈，大病转安。身心康泰，元气恢复。',
    usage: ['久治不愈', '手术顺利', '产后恢复', '强身健体'],
    effect: '身心康泰，药到病除',
    color: '#22c55e',
    detail: '治病符奉请天医星，药王孙思邈加持。此符不是药，能助药之灵。服药前焚化符灰冲服，能令药效倍增。久病不愈者，佩带此符，能令正气渐复，生机回转。手术前带此符，能保手术顺利，平安无事。治病之道，医患同心。符能加持，然不可因此废医。',
    materials: ['药包纸', '朱砂', '艾草', '雄黄'],
    timing: ['天医日', '每月初一日', '药王孙诞'],
    taboos: ['以此代医', '讳疾忌医', '杀生求愈'],
  },
  {
    name: '破煞符',
    category: '化解类',
    icon: '⚔️',
    power: 95,
    difficulty: 70,
    feature: '破除凶煞，化解灾厄。太岁三煞，五黄二黑，诸般凶神，遇之即散。',
    usage: ['犯太岁', '风水煞', '官非口舌', '意外灾厄'],
    effect: '灾消难解，逢凶化吉',
    color: '#dc2626',
    detail: '破煞符乃符箓中至刚至阳者。犯太岁者，流年不利，宜带此符；五黄临门，二黑入宅，宜贴此符；官非口舌缠身，焚此符可化解；意外将至，带此符可避之。此符如利剑，斩妖除魔，破煞消灾。然用煞者，必先自正。心若光明，百煞难侵；心若阴暗，虽符难护。',
    materials: ['桃木板', '朱砂', '公鸡血', '桃木剑'],
    timing: ['立春前一日', '夏至', '冬至'],
    taboos: ['无事乱用', '用以害人', '心术不正'],
  },
  {
    name: '贵人符',
    category: '人际类',
    icon: '🤝',
    power: 82,
    difficulty: 40,
    feature: '天乙贵人，四面八方来相助。逢凶化吉，遇难呈祥，处处遇贵人。',
    usage: ['求职创业', '开拓人脉', '困境求解', '远行求谋'],
    effect: '贵人扶持，万事顺遂',
    color: '#8b5cf6',
    detail: '贵人符奉请天乙贵人，八方贵人来相助。求职创业者，得遇伯乐提携；穷途末路时，自有贵人援手。出门远行，带此符路遇善人；身处异乡，得遇同乡相助。人道是，出门靠朋友，处世靠贵人。然贵人者，自助者天助之。汝若盛开，蝴蝶自来；汝若精彩，天自安排。',
    materials: ['黄纸', '朱砂', '香粉', '名片'],
    timing: ['每月初八', '十八', '廿八'],
    taboos: ['忘恩负义', '过河拆桥', '自私自利'],
  },
  {
    name: '安胎符',
    category: '医药类',
    icon: '🤰',
    power: 88,
    difficulty: 55,
    feature: '安胎保产，母子平安。化解胎煞，顺利生产。婴儿康健，聪明伶俐。',
    usage: ['孕期安胎', '胎位不正', '临产求安', '产后恢复'],
    effect: '母子平安，顺产无忧',
    color: '#f472b6',
    detail: '安胎符奉请送子观音，注生娘娘加持。怀胎不稳者，佩带此符，能令胎气稳固，母子安康。胎位不正者，诚心佩带，多能转正。临产妇人，床头贴此符，能令生产顺利，少受痛苦。产后佩戴，有助于身体恢复，气血调和。生产之道，天意人为参半。符为助力，医为根本。',
    materials: ['红布', '朱砂', '红枣', '桂圆'],
    timing: ['怀胎三月', '临产一月', '观音诞'],
    taboos: ['惊吓孕妇', '入产房', '杀生庆祝'],
  },
  {
    name: '远行符',
    category: '平安类',
    icon: '✈️',
    power: 85,
    difficulty: 40,
    feature: '水陆平安，旅途顺利。逢凶化吉，遇难呈祥。车船保平安，路行遇贵人。',
    usage: ['出差旅行', '留学出国', '长途驾车', '出海航行'],
    effect: '旅途平安，一路顺风',
    color: '#06b6d4',
    detail: '远行符奉请沿路土地，各方神明护佑。乘飞机者，藏此符于行李中，能保飞行平安；长途驾车者，贴此符于车头，能保路路通顺；乘船出海者，贴此符于船桅，能保风平浪静。远行者，离家千里，举目无亲。此符令你路遇善人，处处逢源。平安是福，能回家便是最大的幸福。',
    materials: ['黄纸', '朱砂', '香包', '地图'],
    timing: ['出行前三日', '甲子日', '晴天'],
    taboos: ['酒后驾驶', '冒险犯难', '乐不思蜀'],
  },
  {
    name: '收惊符',
    category: '医药类',
    icon: '😇',
    power: 80,
    difficulty: 35,
    feature: '收惊定神，魂归魄安。小儿夜啼，惊吓失魂，心神不宁，用之即安。',
    usage: ['小儿夜啼', '惊吓失魂', '心神不宁', '失眠多梦'],
    effect: '魂定神安，夜眠安稳',
    color: '#60a5fa',
    detail: '收惊符专治惊吓失魂之症。小儿受惊，夜啼不止，焚此符灰冲水服下，立时安定。大人受惊，心神恍惚，魂不守舍，佩带此符三日，神归魄安。心虚胆怯，失眠多梦者，贴此符于床头，能令心神安定，夜眠安稳。人有三魂七魄，受惊则魂飞魄散。收惊者，收其心，安其神也。',
    materials: ['黄纸', '朱砂', '菖蒲', '桃枝'],
    timing: ['正午时分', '子时', '日落前'],
    taboos: ['大声喧哗', '突然惊吓', '疑神疑鬼'],
  },
  {
    name: '断邪符',
    category: '镇邪类',
    icon: '⛓️',
    power: 98,
    difficulty: 80,
    feature: '斩断邪缘，断绝阴缠。邪术加害，阴魂附体，冤家债主，一概断除。',
    usage: ['邪术加害', '阴魂附体', '冤家债主', '断绝孽缘'],
    effect: '邪缘断绝，阴缠尽除',
    color: '#991b1b',
    detail: '断邪符乃符箓中最刚烈者。遭人邪术加害，用此符可破之；阴魂附体不散，用此符可遣之；前世冤家债主纠缠，用此符可解之。此符如快刀斩乱麻，干净利落，不留后患。然断邪必先断念。心无邪念，则外邪难侵；心无挂碍，则冤孽难缠。断邪者，先断自心之邪也。',
    materials: ['桃木', '朱砂', '黑狗血', '雄黄'],
    timing: ['天狗食日', '雷雨天', '正午阳气最盛时'],
    taboos: ['用以断正当姻缘', '心慈手软', '留下后患'],
  },
]

interface Spell {
  name: string
  purpose: string
  mantra: string
  times: number
  efficacy: number
  color: string
  detail: string
  notes: string[]
  transmission: string
}

const SPELL_MANTRAS: Spell[] = [
  {
    name: '净口神咒',
    purpose: '书符前净口',
    mantra: '丹朱口神，吐秽除氛。舌神正伦，通命养神。罗千齿神，却邪卫真。喉神虎贲，炁神引津。心神丹元，令我通真。思神炼液，道炁常存。',
    times: 3,
    efficacy: 95,
    color: '#22c55e',
    detail: '净口神咒乃书符第一咒。人口为百谷滋味之所入，亦为是非恶语之所出。书符前必先净口，去除污秽，澄清言语。不独口净，亦令心净。此咒念三遍，则口业清净，言语芬芳，神闻则喜。',
    notes: ['漱口后方可持咒', '不可夹杂闲言', '发音清晰有力'],
    transmission: '祖天师张道陵创教时所传',
  },
  {
    name: '净心神咒',
    purpose: '书符前净心',
    mantra: '太上台星，应变无停。驱邪缚魅，保命护身。智慧明净，心神安宁。三魂永久，魄无丧倾。',
    times: 3,
    efficacy: 98,
    color: '#3b82f6',
    detail: '净心神咒为八大神咒之首。人心为一身之主，万念之所聚。书符之本，在于心诚。心若不净，则符不灵。此咒能令心神清净，杂念不生，智慧明朗，魂魄安稳。念此咒时，当闭目冥心，一念不生。',
    notes: ['端坐澄心', '呼吸调匀', '万缘放下'],
    transmission: '上清派秘传，陶弘景祖师弘扬',
  },
  {
    name: '金光神咒',
    purpose: '护身加持',
    mantra: '天地玄宗，万炁本根。广修亿劫，证吾神通。三界内外，惟道独尊。体有金光，覆映吾身。视之不见，听之不闻。包罗天地，养育群生。',
    times: 7,
    efficacy: 100,
    color: '#f59e0b',
    detail: '金光神咒乃道教至尊神咒。持咒者身有金光护体，邪魔不敢近，妖魅不敢侵。功夫深者，金光遍体，照彻十方。此咒须持戒精进，日久功深，自有感应。金光非外求，乃我本性光明。',
    notes: ['每日坚持不辍', '戒行精严', '诚心不退'],
    transmission: '元始天尊所说，收录于《道藏》',
  },
  {
    name: '祝香神咒',
    purpose: '上香祝祷',
    mantra: '道由心学，心假香传。香爇玉炉，心存帝前。真灵下盼，仙旆临轩。令臣关告，径达九天。',
    times: 1,
    efficacy: 90,
    color: '#ef4444',
    detail: '祝香神咒为通神之桥梁。香非世间之香，乃心香也。一念诚敬，心香一炷，直达九天。香烟袅袅，上彻云霄。仙众闻香，悉知下界有所祝告。上香不在多，贵在心诚。',
    notes: ['檀香最佳', '心平气和', '意存恭敬'],
    transmission: '灵宝派科仪必备咒语',
  },
  {
    name: '书符咒',
    purpose: '下笔书符',
    mantra: '天圆地方，律令九章。吾今下笔，万鬼伏藏。急急如律令敕。',
    times: 1,
    efficacy: 92,
    color: '#a78bfa',
    detail: '书符咒乃下笔之号令。天圆地方，效法天地之象；律令九章，申明鬼神之律。念此咒后，笔非笔也，乃神剑也；纸非纸也，乃法坛也。一画之间，风云变色；一点之下，鬼神敬听。',
    notes: ['凝神聚气', '一气呵成', '不可犹豫'],
    transmission: '汉末正一教团通用',
  },
  {
    name: '送神咒',
    purpose: '送神归位',
    mantra: '向来诵经，功德回向。愿此功德，普及一切。弟子虔心，恭送圣驾。神归其位，各安其所。',
    times: 1,
    efficacy: 85,
    color: '#8b5cf6',
    detail: '送神咒为事神之终。有请必有送，礼也。将诵经书符功德，回向法界众生，然后恭送圣驾回銮。神虽无形，理当恭敬。慎终如始，则无败事。',
    notes: ['心存感恩', '回向众生', '再拜而退'],
    transmission: '各宗派通用仪轨',
  },
  {
    name: '安土地咒',
    purpose: '安镇土地',
    mantra: '此间土地，神之最灵。通天达地，出幽入冥。为吾关奏，不得留停。有功之日，名书上清。',
    times: 3,
    efficacy: 88,
    color: '#84cc16',
    detail: '安土地咒召请当境土地神。土地为一方之主，最是亲民。凡有祷祝，先告土地。小庙神明，最是灵验。居家过活，出入平安，多赖此公。敬神如在，不可轻慢。',
    notes: ['先备酒果', '诚心禀告', '日常供养'],
    transmission: '民间家家传诵',
  },
  {
    name: '救苦咒',
    purpose: '拔苦救难',
    mantra: '茫茫酆都中，重重金刚山。灵宝无量光，洞照炎池烦。七祖诸幽魂，身随香云幡。定惠青莲花，上生神永安。',
    times: 49,
    efficacy: 95,
    color: '#06b6d4',
    detail: '救苦咒拔度幽魂，救苦救难。众生沉沦苦海，无有出期。念此咒者，能令地狱清凉，饿鬼饱满，亡者得度，生者获福。此咒慈悲广大，功德无量。',
    notes: ['发大悲心', '满四十九遍', '回向众生'],
    transmission: '太乙救苦天尊法门',
  },
]

interface Precept {
  rule: string
  level: string
  penalty: string
  desc: string
  detail: string
  cases: string[]
}

const TEN_PRECEPTS: Precept[] = [
  {
    rule: '戒秽污',
    level: '极重',
    penalty: '符无灵验，反招神谴',
    desc: '书符必先斋戒沐浴，身心洁净，不可犯秽。妇女经血，尤忌触犯。',
    detail: '秽污为书符第一大戒。身有污秽则神不临，书符何益？非但身要洁净，心也要洁净。心有污秽，虽沐浴斋戒何用？古之真人，书符前必斋戒七日，内外清净，方敢动笔。',
    cases: ['未沐浴书符', '月经期书符', '酒后书符'],
  },
  {
    rule: '戒荤酒',
    level: '重',
    penalty: '气味腥膻，神灵不享',
    desc: '书前三日，忌食五辛三厌，戒酒肉荤腥。气味腥膻，神灵不享。',
    detail: '五辛者，葱蒜韭薤兴渠，生食发恚，熟食发淫。三厌者，天雁地狗水族乌龟。此等食物，气味臭秽，善神远离，邪神喜近。学道之人，必先戒此。',
    cases: ['食五辛书符', '醉酒书符', '食肉后未漱口'],
  },
  {
    rule: '戒妄想',
    level: '重',
    penalty: '神气不纯，符无灵力',
    desc: '书时必澄心定虑，一念至诚。杂念纷纭，则神气不纯。',
    detail: '书符之要，全在一心。一念才动，鬼神皆知。心不纯则神不聚，神不聚则符不灵。是以古之至人，书符如对越上帝，不敢起一念妄心。',
    cases: ['胡思乱想', '计较得失', '心生懈怠'],
  },
  {
    rule: '戒轻易',
    level: '极重',
    penalty: '亵渎灵文，罪罚非轻',
    desc: '遇急难方可用，不可戏谑轻试。亵渎灵文，罪罚非轻。',
    detail: '符箓乃天地灵文，鬼神密旨。岂可轻试？每用一次，消耗神气。滥用则神厌，再用则不灵。救人之急，解人之难，虽用何伤？戏耍轻慢，必遭天谴。',
    cases: ['无事画符玩', '用以炫耀', '随意丢弃'],
  },
  {
    rule: '戒违时',
    level: '中',
    penalty: '气场不和，效力减半',
    desc: '书符当择吉日良时。避太岁三杀，避往亡日，避四离四绝。',
    detail: '时有吉凶，气有旺衰。得天时则事半功倍，失天时则事倍功半。雷雨天书符最灵，乘天地之怒气也。子夜半书符最验，趁阴阳之交会也。',
    cases: ['往亡日书符', '四离日书符', '破日书符'],
  },
  {
    rule: '戒妄传',
    level: '重',
    penalty: '泄漏天机，天谴难逃',
    desc: '非人勿传，非道勿授。得人不传亦受谴，妄传非人亦受殃。',
    detail: '道不虚传，只渡有缘。得人不传，闭塞天道；妄传非人，泄漏天机。两者均有罪谴。传法之时，必察其人。心术不正者不传，品行不端者不传，轻慢不信者不传。',
    cases: ['传与恶人', '卖法求财', '轻泄秘诀'],
  },
  {
    rule: '戒求财',
    level: '中',
    penalty: '贪心不足，神不佑护',
    desc: '不可借符敛财，不可乘危勒索。有道则援之以符，无道则拒之。',
    detail: '符以济世，非以渔利。救人危急，功德无量。乘人之危，勒索钱财，与强盗何异？神道好善而恶贪。贪心重者，神亦不佑。随缘乐助则可，刻意求财则非。',
    cases: ['天价卖符', '乘危勒索', '嫌贫爱富'],
  },
  {
    rule: '戒助恶',
    level: '极重',
    penalty: '助纣为虐，神明共殛',
    desc: '恶人求符不可与，奸人作法不可助。天网恢恢，疏而不漏。',
    detail: '符箓所以助善，非所以济恶。恶人用符，犹如虎添翼。我助其恶，与有过焉。神明在上，岂能容此？与其得金而助恶，不若守道而安贫。',
    cases: ['帮恶人下咒', '助小人害人', '为奸商招财'],
  },
  {
    rule: '戒疑信',
    level: '中',
    penalty: '半信半疑，灵应不显',
    desc: '心诚则灵，疑则不验。信则神聚，疑则神散。',
    detail: '不诚无物。半信半疑，神已去矣。大道无形，信者得度。疑而用之，何如不用？与其疑而不灵，不若先培信心。',
    cases: ['试试而已', '疑神疑鬼', '朝三暮四'],
  },
  {
    rule: '戒忘恩',
    level: '重',
    penalty: '忘本负恩，福泽立消',
    desc: '符效当知谢神恩，不可用完即弃。饮水思源，知恩图报。',
    detail: '人能感恩，神方佑护。符有效验，当知谢神。一炷清香，一杯清酒，聊表寸心。用完即弃，何异于过河拆桥？忘恩负义，鬼神共恶。',
    cases: ['应验不谢神', '用完随便扔', '不知感恩'],
  },
]

interface Secret {
  title: string
  secret: string
  detail: string
  proverb: string
}

const SECRETS: Secret[] = [
  {
    title: '① 一点灵光',
    secret: '符无灵不灵，只在一点灵光。下笔之前，冥心静默，与天地精神相往来。我心即天心，我念即神念。此是画符第一关。',
    detail: '世人画符，只知笔画形似，不知神气是本。一点灵光，才是真符。此光不在纸上，而在我心中。心光发露，则下笔自然有神。千变万化，不离此心。',
    proverb: '画符不知窍，惹得鬼神笑；画符若知窍，惊得鬼神叫。',
  },
  {
    title: '② 天人合发',
    secret: '天不得时，日月无光。符不得时，灵应不彰。雷雨天画符最灵，子夜时书符最验。天人合发，万变定基。',
    detail: '时机一到，天地同力。雷雨天，天地怒气发，借此怒气以破邪；子夜半，阴阳交会时，借此生气以活人。善用天时者，不假修炼，自然功深。',
    proverb: '时来天地皆同力，运去英雄不自由。',
  },
  {
    title: '③ 以我之神',
    secret: '以我之神，合彼之神。以我之气，合彼之气。神气相交，灵应如响。非符之灵，乃我心神之灵。',
    detail: '神在我身，何须外求？我之神，即天地之神。诚于中，形于外。我神一正，则百邪自退；我气一足，则万病自除。符者，神气之载体而已。',
    proverb: '我命由我不由天，仙佛凡人一念间。',
  },
  {
    title: '④ 有求必应',
    secret: '符者，契也。我与鬼神立约也。人有诚心，神佛有感。不求则不应，不诚则不灵。',
    detail: '有感斯通，无求不应。然求须至诚，不诚则不应。千遍万遍，不如心诚一念。人能一念至诚，如子呼母，岂有不应者哉？',
    proverb: '心诚则灵，金石为开。',
  },
  {
    title: '⑤ 德为本',
    secret: '德者，符之本也。德厚者其符灵，德薄者其符伪。修德不修符，是谓舍本逐末。',
    detail: '无德之人，画符不灵。神不享恶人之祭，岂受恶人之意？德如根，符如叶。根深叶自茂，德厚符自灵。不培其根而求叶茂，吾未见其可也。',
    proverb: '道高龙虎伏，德重鬼神钦。',
  },
  {
    title: '⑥ 善用其锋',
    secret: '符之刃，可以救人，亦可以杀人。用之正则正，用之邪则邪。神目如电，可不慎哉。',
    detail: '符箓如利剑。用之救人，功德无量；用之害人，罪孽深重。一剑双刃，祸福自招。天网恢恢，疏而不漏。莫谓符可恃，举头三尺有神明。',
    proverb: '天作孽，犹可违；自作孽，不可活。',
  },
]

interface FuPart {
  part: string
  meaning: string
  detail: string
  importance: number
  technique: string[]
}

const FU_STRUCTURE: FuPart[] = [
  {
    part: '符头',
    meaning: '召请神灵',
    detail: '三字令：雨渐耳。此为紫微大帝符头，统领百神。三点代表三清，一曲代表万神听令。',
    importance: 95,
    technique: ['三点要圆', '竖画要直', '弯钩有力'],
  },
  {
    part: '符身',
    meaning: '符之主体',
    detail: '书符之核心内容。或星象，或字形，或秘文。屈曲回环，内含天机。',
    importance: 100,
    technique: ['一气呵成', '不可断气', '笔画分明'],
  },
  {
    part: '符胆',
    meaning: '符之灵魂',
    detail: '符无胆不灵。一点灵光注入其中，此是活符。无胆即是死符。',
    importance: 100,
    technique: ['凝神聚气', '念力注入', '最后点睛'],
  },
  {
    part: '符脚',
    meaning: '符之结尾',
    detail: '急急如律令。煞字结尾，雷厉风行，不得拖延。',
    importance: 85,
    technique: ['刚劲有力', '如斩钉截铁', '收势果断'],
  },
  {
    part: '印章',
    meaning: '权威认证',
    detail: '道经师宝印，天师印。无印则为白条，鬼神不认。',
    importance: 90,
    technique: ['印泥鲜红', '端正不斜', '用力均匀'],
  },
]

export default function FuluPage() {
  const [filteredFu, setFilteredFu] = useState(FU_TYPES)
  const [expandedFu, setExpandedFu] = useState<string | null>(null)
  const [filteredSpells, setFilteredSpells] = useState(SPELL_MANTRAS)
  const [expandedSpell, setExpandedSpell] = useState<string | null>(null)
  const [filteredPrecepts, setFilteredPrecepts] = useState(TEN_PRECEPTS)
  const [expandedPrecept, setExpandedPrecept] = useState<string | null>(null)
  const [filteredSecrets, setFilteredSecrets] = useState(SECRETS)
  const [expandedSecret, setExpandedSecret] = useState<string | null>(null)
  const [filteredStructure, setFilteredStructure] = useState(FU_STRUCTURE)
  const [expandedPart, setExpandedPart] = useState<string | null>(null)

  const handleFuFilter = useCallback((data: typeof FU_TYPES) => {
    setFilteredFu(data)
  }, [])

  const handleSpellFilter = useCallback((data: typeof SPELL_MANTRAS) => {
    setFilteredSpells(data)
  }, [])

  const handlePreceptFilter = useCallback((data: typeof TEN_PRECEPTS) => {
    setFilteredPrecepts(data)
  }, [])

  const handleSecretFilter = useCallback((data: typeof SECRETS) => {
    setFilteredSecrets(data)
  }, [])

  const handleStructureFilter = useCallback((data: typeof FU_STRUCTURE) => {
    setFilteredStructure(data)
  }, [])

  const fuFilters = {
    searchKeys: ['name', 'category', 'feature', 'detail', 'effect', 'usage'],
    filterKeys: {
      category: [...new Set(FU_TYPES.map(f => f.category))],
    },
    sortOptions: [
      { key: 'power', label: '灵力排序' },
      { key: 'difficulty', label: '难度排序' },
      { key: 'name', label: '符名排序' },
    ],
  }

  const spellFilters = {
    searchKeys: ['name', 'purpose', 'mantra', 'detail', 'transmission'],
    filterKeys: {
      purpose: [...new Set(SPELL_MANTRAS.map(s => s.purpose))],
    },
    sortOptions: [
      { key: 'efficacy', label: '功效排序' },
      { key: 'name', label: '咒名排序' },
    ],
  }

  const preceptFilters = {
    searchKeys: ['rule', 'level', 'penalty', 'desc', 'detail'],
    filterKeys: {
      level: [...new Set(TEN_PRECEPTS.map(p => p.level))],
    },
  }

  const secretFilters = {
    searchKeys: ['title', 'secret', 'detail', 'proverb'],
  }

  const structureFilters = {
    searchKeys: ['part', 'meaning', 'detail', 'technique'],
    sortOptions: [
      { key: 'importance', label: '重要度排序' },
    ],
  }

  return (
    <SubPageTemplate
      title="符箓法术"
      subtitle="朱笔画符 · 金光布炁 · 咒语通灵 · 以济世人"
      icon="📿"
      colorRgb="168, 85, 247"
    >
      <SubPageSection title="灵符图鉴">
        <FilterBar
          data={FU_TYPES}
          onFiltered={handleFuFilter}
          options={fuFilters}
          placeholder="搜索符箓名称、类别、功效..."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredFu.map((fu) => (
            <InfoCard
              key={fu.name}
              onClick={() => setExpandedFu(expandedFu === fu.name ? null : fu.name)}
              glowIntensity={90}
              glowColor={fu.color.replace('#', '')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{fu.icon}</span>
                  <span style={{ fontWeight: 'bold', color: fu.color }}>{fu.name}</span>
                  <span style={{ fontSize: '0.75rem', background: fu.color, padding: '0.125rem 0.5rem', borderRadius: '999px' }}>
                    {fu.category}
                  </span>
                </div>
                {expandedFu === fu.name ? '▲' : '▼'}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '0.25rem' }}>灵力</div>
                  <ProgressBar value={fu.power} color={fu.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '0.25rem' }}>难度</div>
                  <ProgressBar value={fu.difficulty} color="#6b7280" />
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.5rem' }}>{fu.feature}</p>
              <p style={{ fontSize: '0.8rem', color: fu.color, fontWeight: 'bold' }}>✧ {fu.effect}</p>

              {expandedFu === fu.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {fu.detail}
                  </p>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>【适用场景】</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {fu.usage.map(u => (
                        <span key={u} style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>【所需材料】</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {fu.materials.map(m => (
                        <span key={m} style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>【最佳时辰】</div>
                      {fu.timing.map(t => (
                        <div key={t} style={{ fontSize: '0.8rem', opacity: 0.8 }}>✓ {t}</div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#ef4444' }}>【禁忌】</div>
                      {fu.taboos.map(t => (
                        <div key={t} style={{ fontSize: '0.8rem', color: '#ef4444', opacity: 0.9 }}>✗ {t}</div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="咒语真言">
        <FilterBar
          data={SPELL_MANTRAS}
          onFiltered={handleSpellFilter}
          options={spellFilters}
          placeholder="搜索咒语名称、用途、经文..."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredSpells.map((spell) => (
            <InfoCard
              key={spell.name}
              onClick={() => setExpandedSpell(expandedSpell === spell.name ? null : spell.name)}
              glowIntensity={85}
              glowColor={spell.color.replace('#', '')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontWeight: 'bold', color: spell.color, fontSize: '1.1rem' }}>{spell.name}</span>
                  <span style={{ fontSize: '0.75rem', marginLeft: '0.5rem', opacity: 0.7 }}>{spell.purpose}</span>
                </div>
                {expandedSpell === spell.name ? '▲' : '▼'}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem' }}>持诵：<b>{spell.times}</b> 遍</span>
                <div style={{ flex: 1, marginLeft: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '0.25rem', textAlign: 'right' }}>灵验度</div>
                  <ProgressBar value={spell.efficacy} color={spell.color} />
                </div>
              </div>

              <div style={{
                background: `linear-gradient(135deg, ${spell.color}20, transparent)`,
                padding: '1rem',
                borderRadius: '8px',
                fontFamily: 'serif',
                fontSize: '0.9rem',
                lineHeight: 1.8,
                borderLeft: `3px solid ${spell.color}`,
              }}>
                "{spell.mantra}"
              </div>

              {expandedSpell === spell.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {spell.detail}
                  </p>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>【持诵要点】</div>
                    {spell.notes.map((note, i) => (
                      <div key={i} style={{ fontSize: '0.85rem', opacity: 0.8 }}>• {note}</div>
                    ))}
                  </div>

                  <div style={{ fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.7, marginTop: '0.5rem' }}>
                    📜 传承：{spell.transmission}
                  </div>
                </motion.div>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="书符十戒">
        <FilterBar
          data={TEN_PRECEPTS}
          onFiltered={handlePreceptFilter}
          options={preceptFilters}
          placeholder="搜索戒律..."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
          {filteredPrecepts.map((precept) => (
            <InfoCard
              key={precept.rule}
              onClick={() => setExpandedPrecept(expandedPrecept === precept.rule ? null : precept.rule)}
              glowIntensity={80}
              glowColor={precept.level === '极重' ? '220, 38, 38' : precept.level === '重' ? '245, 158, 11' : '59, 130, 246'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold' }}>{precept.rule}</span>
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '999px',
                    background: precept.level === '极重' ? 'rgba(220, 38, 38, 0.3)' : precept.level === '重' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(59, 130, 246, 0.3)',
                    color: precept.level === '极重' ? '#ef4444' : precept.level === '重' ? '#f59e0b' : '#3b82f6',
                  }}>
                    {precept.level}
                  </span>
                </div>
                {expandedPrecept === precept.rule ? '▲' : '▼'}
              </div>

              <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.5rem' }}>{precept.desc}</p>
              <p style={{ fontSize: '0.8rem', color: '#ef4444' }}>⚡ 果报：{precept.penalty}</p>

              {expandedPrecept === precept.rule && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {precept.detail}
                  </p>

                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>【犯戒案例】</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {precept.cases.map(c => (
                        <span key={c} style={{ background: 'rgba(220, 38, 38, 0.15)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="画符秘要">
        <FilterBar
          data={SECRETS}
          onFiltered={handleSecretFilter}
          options={secretFilters}
          placeholder="搜索秘诀..."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredSecrets.map((secret) => (
            <InfoCard
              key={secret.title}
              onClick={() => setExpandedSecret(expandedSecret === secret.title ? null : secret.title)}
              glowIntensity={85}
              glowColor="245, 158, 11"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, color: '#f59e0b' }}>{secret.title}</h4>
                {expandedSecret === secret.title ? '▲' : '▼'}
              </div>

              <p style={{
                marginTop: '1rem',
                fontFamily: 'serif',
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: 'rgba(255, 255, 255, 0.95)',
                fontStyle: 'italic',
              }}>
                "{secret.secret}"
              </p>

              {expandedSecret === secret.title && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {secret.detail}
                  </p>

                  <p style={{
                    fontSize: '0.9rem',
                    color: '#f59e0b',
                    fontFamily: 'serif',
                    textAlign: 'right',
                    borderTop: '1px dashed rgba(245, 158, 11, 0.3)',
                    paddingTop: '0.75rem',
                  }}>
                    古谚云：「{secret.proverb}」
                  </p>
                </motion.div>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="符箓结构">
        <FilterBar
          data={FU_STRUCTURE}
          onFiltered={handleStructureFilter}
          options={structureFilters}
          placeholder="搜索部位..."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
          {filteredStructure.map((part) => (
            <InfoCard
              key={part.part}
              onClick={() => setExpandedPart(expandedPart === part.part ? null : part.part)}
              glowIntensity={75}
              glowColor="168, 85, 247"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold' }}>{part.part}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{part.meaning}</span>
                </div>
                {expandedPart === part.part ? '▲' : '▼'}
              </div>

              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '0.25rem' }}>重要度</div>
                <ProgressBar value={part.importance} color="#a855f7" />
              </div>

              <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>{part.detail}</p>

              {expandedPart === part.part && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>【技法要点】</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {part.technique.map(t => (
                      <span key={t} style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
