'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface DivinationMethod {
  name: string
  icon: string
  category: string
  difficulty: number
  accuracy: number
  origin: string
  era: string
  desc: string
  detail: string
  steps: string[]
  notes: string[]
}

interface DivinationMind {
  name: string
  level: string
  importance: number
  desc: string
  detail: string
  classicQuote: string
}

interface GuaXiang {
  name: string
  number: number
  nature: string
  wuxing: string
  meaning: string
  explanation: string
  keywords: string[]
}

const DIVINATION_METHODS: DivinationMethod[] = [
  { name: '铜钱卦', icon: '🪙', category: '周易正统', difficulty: 65, accuracy: 90, origin: '汉代京房', era: '先秦-汉代', desc: '三枚铜钱，六次成卦，最经典的周易起卦方式', detail: '铜钱卜筮源于汉代京房易，以乾隆通宝铜钱为卜具。字为阴，背为阳。三枚铜钱掷六次，得六爻而成一卦。此法简便灵验，为后世卜者所宗。', steps: ['净手静心，焚香祷告', '执钱于掌，默祷其事', '连掷六次，依次记录', '画卦成象，查阅爻辞'], notes: ['每日不宜多卜，三卦为限', '事不诚不卜，疑不诚不卜', '酒后不卜，忿怒不卜'] },
  { name: '梅花易数', icon: '🌸', category: '心易法门', difficulty: 85, accuracy: 95, origin: '邵雍', era: '北宋', desc: '观物取象，随心起卦，邵康节心易之法', detail: '梅花易数为北宋邵雍所创，乃心易之极品。以年月日时起卦，或以动静之物起卦，或以声音言语起卦。其要在于"心"，心动则卦生，万物皆可为卦。此法贵在顿悟，得于心而应于手。', steps: ['澄心涤虑，收视返听', '观物取象，触机而发', '分体析用，辨明五行生克', '察变知机，推断吉凶'], notes: ['无动不占，静则不卜', '触机即占，过时不验', '重在灵机，不可拘泥'] },
  { name: '观音灵签', icon: '🎋', category: '佛道教术', difficulty: 30, accuracy: 85, origin: '观音信仰', era: '唐宋以来', desc: '寺庙求签，吉凶悔吝，一念之间', detail: '签文占卜乃民间最盛行之卜法。一百签，每签配诗一首，吉凶昭然。于佛前焚香礼拜，心中默念所求之事，摇动签筒，待一签落地，即是神明指示。', steps: ['斋戒沐浴，诚心敬意', '佛前焚香，顶礼膜拜', '默祷所求之事', '摇签筒，得签'], notes: ['一事一签，不可重复', '心诚则灵，不诚不验', '得签后还愿谢神'] },
  { name: '灵棋经', icon: '⚪', category: '古易传承', difficulty: 75, accuracy: 88, origin: '黄石公', era: '秦汉', desc: '十二棋子，三百八十四卦，东方灵棋', detail: '灵棋经相传为黄石公传授张良。以十二枚棋子，分刻上中下字，每字四枚。一掷而成卦，共得一百二十五卦，后增至三百八十四卦。其辞古朴，其验如神。', steps: ['清洁案几，放置棋盘', '执十二棋于手中', '焚香念咒，一掷成卦', '查阅灵棋经文'], notes: ['传曰：至诚则灵', '每月朔望后占卜最佳', '切忌亵渎神明'] },
  { name: '龟甲卜', icon: '🐢', category: '上古正统', difficulty: 95, accuracy: 92, origin: '殷商王室', era: '上古三代', desc: '灼烧龟甲，观其裂纹，上古卜法正宗', detail: '龟甲卜为殷商王室占卜之法。取灵龟之腹甲，钻凿其背，以火灼烧，观其裂纹走向，以断吉凶。甲骨文即是其占卜之记录。此法至为神圣，非寻常人可得而用也。', steps: ['择取灵龟，斋戒养之', '杀龟取甲，治削打磨', '钻凿成孔，火候适宜', '观其裂纹，辨吉凶形'], notes: ['国之大事，方可用龟', '非天子诸侯，不敢轻用', '卜后珍藏甲骨，传之后世'] },
  { name: '塔罗牌', icon: '🃏', category: '西方神秘学', difficulty: 70, accuracy: 80, origin: '中世纪欧洲', era: '中世纪', desc: '大阿卡纳，小阿卡纳，揭示潜意识', detail: '塔罗牌共七十八张，大阿卡纳二十二张主命运，小阿卡纳五十六张主细节。洗牌切牌，布阵发牌，依牌意解读。其源或出埃及，或出吉普赛，众说纷纭。然其揭示人心潜意识，确有独到之处。', steps: ['选择牌阵，明确问题', '静心洗牌，意念集中', '切牌抽牌，依序摆放', '结合牌意，深入解读'], notes: ['占卜者需熟悉每张牌意', '注重直觉，不必死记硬背', '同一问题短期内不宜重复'] },
  { name: '蓍草占', icon: '🌿', category: '周易正统', difficulty: 90, accuracy: 93, origin: '周易古制', era: '周', desc: '五十蓍草，四营成变，大衍之数正宗', detail: '蓍草占为周易最古之法。大衍之数五十，其用四十有九。分二挂一，揲之以四，归奇于扐。十有八变而成卦。此法最合易理，然繁琐至极，今人罕用。', steps: ['取蓍草五十茎', '四营而成一变', '三变成一爻', '十八变而成一卦'], notes: ['此法最古最正', '学者当知其理', '今人简化为金钱卦'] },
  { name: '测字', icon: '✍️', category: '杂占法门', difficulty: 80, accuracy: 85, origin: '东汉', era: '汉唐宋明', desc: '观字断事，拆合形意，一字见人心', detail: '测字又称相字，以一字而断吉凶。其法有拆、有合、有会意、有谐音、有象形。字为心画，心动则形现，形现则吉凶见。宋代谢石、明代程省皆为大家。', steps: ['求测者随意书一字', '观察字形结构', '拆合偏旁部首', '结合问事推断'], notes: ['字无定解，存乎一心', '问何事则如何解', '重在触机应变'] },
  { name: '面相手相', icon: '👤', category: '人相术', difficulty: 88, accuracy: 82, origin: '春秋', era: '先秦以来', desc: '相由心生，貌如其人，观面知人', detail: '相法观人五官气色，手纹掌形，以断吉凶贵贱。其要在于神与骨，神清气足者贵，骨正形端者富。气色主近期吉凶，骨骼主一生贵贱。', steps: ['先观神骨，次察五官', '再看气色，后观纹理', '结合部位，流年判断', '综合论断，不可偏执'], notes: ['相由心生，心变相随', '善相者兼观其行', '先天不足，后天可补'] },
  { name: '六壬神课', icon: '🌊', category: '古术正宗', difficulty: 98, accuracy: 97, origin: '九天玄女', era: '上古', desc: '三式之首，大六壬，占卜之王', detail: '六壬为三式之一，与奇门遁甲、太乙神数并称帝王三式。六壬人事最精，号称占卜之王。其法以太乙、天、地三盘，加临十二月将，布四课，发三传，吉凶祸福如在目前。', steps: ['确定占时', '布天盘地盘', '立四课', '发三传', '类神判断'], notes: ['学会大六壬，来人不用问', '三式之中，六壬最验', '需深厚易学基础'] },
  { name: '奇门遁甲', icon: '🌀', category: '三式绝学', difficulty: 98, accuracy: 96, origin: '黄帝战蚩尤', era: '上古', desc: '帝王之学，行军布阵，趋吉避凶', detail: '奇门遁甲为黄帝战蚩尤时，九天玄女所授。以洛书九宫为基础，布三奇六仪，八门九星，值符值使。古时用于行军布阵，后世用于百事占断。其要在于"遁"，知生门则吉，知死门则避。', steps: ['定局数，排地盘', '排天盘九星', '布八门', '排三奇六仪', '找值符值使'], notes: ['学会奇门遁，来人不用问', '重在选方择时', '古代不传之秘'] },
  { name: '扶乩', icon: '📝', category: '通灵术', difficulty: 60, accuracy: 75, origin: '紫姑信仰', era: '晋唐以来', desc: '沙盘乩笔，请神降临，天人沟通', detail: '扶乩又称扶箕，以沙盘为纸，以丁字架为笔，二人扶之，请神降临。神至则笔自动写字，答人所问。历代文人好此道，有请吕祖、请关公、请紫姑者。', steps: ['洁净坛场，设置沙盘', '二人恭立，扶乩请神', '默祷所求，静候神降', '记录乩文，解读神意'], notes: ['心不诚者神不临', '须二人同心', '切忌游戏亵渎'] },
]

const DIVINATION_MINDS: DivinationMind[] = [
  { name: '心诚则灵', level: '基础心法', importance: 100, desc: '凡卜筮之道，必以精诚感格', detail: '诚者，天之道也。不诚无物。心不诚，则神不应，卦不验。故卜筮者，当先正其心，诚其意，如神明在侧，不敢有丝毫怠慢。', classicQuote: '《中庸》曰：至诚之道，可以前知。国家将兴，必有祯祥；国家将亡，必有妖孽。' },
  { name: '无疑不卜', level: '基础心法', importance: 95, desc: '事无可疑，不必卜也', detail: '卜以决疑，不疑何卜？事已昭然，理已明了，当行则行，当止则止，何必问卜？唯于岐路之间，吉凶未判，进退两难，方可卜之。', classicQuote: '《左传》曰：卜以决疑，不疑何卜？' },
  { name: '善易不卜', level: '高级心法', importance: 90, desc: '深明易道者，何须占卜', detail: '知周万物者，不卜而知吉凶。动静语默，无非是易。一言一行，皆合道妙。善易者，观其始而知其终，睹其微而知其著，何必待卦而后知哉？', classicQuote: '《荀子》曰：善为易者不占。' },
  { name: '卜以决疑', level: '实用心法', importance: 92, desc: '既得吉爻，当行正道', detail: '得吉卦而行凶，吉亦变凶；得凶卦而行善，凶可化吉。占卜者，知进退存亡而不失其正者也。', classicQuote: '《周易》曰：积善之家，必有余庆；积不善之家，必有余殃。' },
  { name: '数由前定', level: '高级心法', importance: 85, desc: '命由天定，运由己造', detail: '虽曰天命，岂非人事哉？占卜而知命，非为认命也，实为立命也。知其不足而补之，知其有余而损之，方为智者。', classicQuote: '《了凡四训》曰：命由我作，福自己求。' },
  { name: '慎终如始', level: '基础心法', importance: 88, desc: '得卦之后，当敬慎行之', detail: '既得神示，当信而行之。知吉而不行，等于未卜；知凶而不避，等于自弃。', classicQuote: '《老子》曰：慎终如始，则无败事。' },
]

const GUAXIANG_BASICS: GuaXiang[] = [
  { name: '乾卦', number: 1, nature: '纯阳', wuxing: '金', meaning: '天，健，君子', explanation: '乾为天，六爻皆阳。天行健，君子以自强不息。创始，统领，刚健。', keywords: ['刚健', '开创', '领导', '阳性', '天'] },
  { name: '坤卦', number: 2, nature: '纯阴', wuxing: '土', meaning: '地，顺，厚德', explanation: '坤为地，六爻皆阴。地势坤，君子以厚德载物。包容，承载，柔顺。', keywords: ['包容', '承载', '柔顺', '阴性', '地'] },
  { name: '屯卦', number: 3, nature: '始生', wuxing: '水木', meaning: '云雷，艰难，创始', explanation: '云雷屯，君子以经纶。万事开头难，然生机勃勃。', keywords: ['艰难', '创始', '生机', '蓄力'] },
  { name: '蒙卦', number: 4, nature: '启蒙', wuxing: '山水', meaning: '山泉，蒙昧，教育', explanation: '山下出泉，蒙。君子以果行育德。发蒙启智，童蒙求我。', keywords: ['启蒙', '教育', '幼稚', '待发'] },
  { name: '需卦', number: 5, nature: '等待', wuxing: '水天', meaning: '云上于天，等待', explanation: '云上于天，需。君子以饮食宴乐。待时而动，不冒险进。', keywords: ['等待', '饮食', '时机', '耐心'] },
  { name: '讼卦', number: 6, nature: '争讼', wuxing: '天水', meaning: '天与水违行，争讼', explanation: '天与水违行，讼。君子以作事谋始。防范于未然。', keywords: ['争讼', '矛盾', '是非', '防患'] },
  { name: '师卦', number: 7, nature: '兵众', wuxing: '地水', meaning: '地中有水，师旅', explanation: '地中有水，师。君子以容民畜众。率众，军纪，正义。', keywords: ['军队', '群众', '领导', '正义'] },
  { name: '比卦', number: 8, nature: '亲比', wuxing: '水地', meaning: '地上有水，亲辅', explanation: '地上有水，比。先王以建万国，亲诸侯。亲近，辅佐，团结。', keywords: ['亲辅', '团结', '朋友', '辅助'] },
]

const GUANYIN_LOTS = [
  { number: 1, level: '上上签', title: '钟离成道', poem: '开天辟地作良缘，吉日良时万物全。若得此签非小可，人行忠正帝王宣。', meaning: '始初皆吉，变转甚易，贵人接引，百事皆吉。', wish: '遂', job: '成', wealth: '有', marriage: '成', love: '合', health: '安', lost: '得', lawsuit: '胜', pregnancy: '生男', travel: '利', icon: '👑' },
  { number: 2, level: '上签', title: '苏秦不第', poem: '鲸鱼未变守江河，不可升腾更望高。异日峥嵘身变化，许君一跃跳龙门。', meaning: '得忍且忍，得耐且耐，须待时至，功名还在。', wish: '待时', job: '迟', wealth: '求', marriage: '待', love: '难', health: '慎', lost: '迟', lawsuit: '和', pregnancy: '平安', travel: '待', icon: '🐋' },
  { number: 3, level: '下签', title: '董永卖身', poem: '临风冒雨去还乡，正是其身似燕儿。衔得坭来欲作垒，到头垒坏复须坭。', meaning: '千般用计，晨昏不停，谁知此事，到底劳心。', wish: '空', job: '难', wealth: '耗', marriage: '不合', love: '离', health: '险', lost: '难寻', lawsuit: '凶', pregnancy: '有险', travel: '阻', icon: '💔' },
  { number: 4, level: '上签', title: '玉莲会十朋', poem: '千年古镜复重圆，女再求夫男再婚。自此门庭重改换，更添福禄在儿孙。', meaning: '淘沙见金，骑龙踏虎，虽是劳心，于中有补。', wish: '遂', job: '成', wealth: '迟', marriage: '成', love: '圆', health: '痊', lost: '得', lawsuit: '胜', pregnancy: '生男', travel: '利', icon: '💍' },
  { number: 5, level: '中签', title: '刘晨遇仙', poem: '一锥凿地要求泉，努力求之得最难。无意偶然遇知己，相逢携手上青天。', meaning: '心专做事，可兆团圆，莫信闲语，自有姻缘。', wish: '难', job: '迟', wealth: '有', marriage: '合', love: '遇贵', health: '祈福', lost: '迟得', lawsuit: '求', pregnancy: '安', travel: '宜', icon: '💕' },
  { number: 6, level: '下签', title: '仁贵遇主', poem: '投身岩下饲於菟，须是还他大丈夫。舍己也应难再得，通行天下此人无。', meaning: '安分身无，虽危不危，金鳞入手，得还防失。', wish: '守旧', job: '难', wealth: '无', marriage: '阻', love: '难', health: '祈保', lost: '不见', lawsuit: '和', pregnancy: '有惊', travel: '守', icon: '🏔️' },
  { number: 7, level: '中签', title: '苏小妹难夫', poem: '谁知石藏碧玉，良工剖出得相宜。果是此中藏异宝，更何须用别狐疑。', meaning: '空里得财，守旧则吉，不必劳心，自有消息。', wish: '实', job: '就', wealth: '有', marriage: '平', love: '待', health: '不妨', lost: '得', lawsuit: '终吉', pregnancy: '生男', travel: '平', icon: '💎' },
  { number: 8, level: '上签', title: '姚氏嫁女', poem: '年时此际喜生花，岂料风霜正折芽。幸有阳和相暖热，枝头依旧吐奇葩。', meaning: '逢灾不惊，遇危不危，根基深厚，依旧芳菲。', wish: '遂', job: '成', wealth: '有', marriage: '成', love: '甜', health: '安', lost: '寻得', lawsuit: '吉', pregnancy: '生女', travel: '利', icon: '🌸' },
  { number: 9, level: '中签', title: '孔明点将', poem: '烦君勿作私心事，此意偏宜说向公。一片明心清皎洁，宛如皎月正当中。', meaning: '心中正直，理顺法宽，圣无私语，终有分明。', wish: '公', job: '举', wealth: '守', marriage: '利', love: '正', health: '安', lost: '得', lawsuit: '胜', pregnancy: '安', travel: '公', icon: '🌙' },
  { number: 10, level: '下签', title: '庞涓败马陵', poem: '朝朝恰似采花蜂，飞出西南又走东。春尽花残无觅处，此心不变旧行踪。', meaning: '用尽心力，有财无功，到底凄凄，守旧则通。', wish: '守', job: '难', wealth: '破', marriage: '离', love: '散', health: '祷', lost: '难', lawsuit: '凶', pregnancy: '防', travel: '凶', icon: '🐝' },
  { number: 11, level: '上签', title: '书荐姜维', poem: '欲求胜事可非常，争奈亲姻日暂忙。到头竟必成鹿箭，贵人指引贵人乡。', meaning: '因祸得福，家中大吉，始终皆吉，尽可施为。', wish: '遂', job: '荐', wealth: '有', marriage: '合', love: '贵', health: '安', lost: '遇', lawsuit: '吉', pregnancy: '喜', travel: '遇贵', icon: '🏹' },
  { number: 12, level: '上签', title: '武吉遇师', poem: '否去泰来咫尺间，暂交君子出于山。若逢虎兔佳音信，立志忙中事即闲。', meaning: '换麻得丝，击人双足，要见分明，因灾得福。', wish: '遂', job: '遇师', wealth: '有', marriage: '成', love: '成', health: '安', lost: '得', lawsuit: '吉', pregnancy: '安', travel: '利', icon: '🐯' },
  { number: 13, level: '中签', title: '罗通拜帅', poem: '自小生身富贵家，眼前万物总奢华。蒙君赐紫金腰带，四海声名定可夸。', meaning: '龙门得遇，名达帝都，象过竹桥，一步一步。', wish: '遂', job: '贵', wealth: '足', marriage: '吉', love: '荣', health: '安', lost: '得', lawsuit: '贵', pregnancy: '安', travel: '荣', icon: '🎖️' },
  { number: 14, level: '中签', title: '子牙弃官', poem: '宛如仙鹤出凡笼，脱得凡笼路路通。南北东西无阻隔，任君直上九霄宫。', meaning: '任意无虞，得路亨通，失物得见，命享通仙。', wish: '远', job: '遂', wealth: '宜', marriage: '合', love: '自由', health: '愈', lost: '寻得', lawsuit: '吉', pregnancy: '生男', travel: '通', icon: '🦢' },
  { number: 15, level: '中签', title: '苏秦得志', poem: '行人跘曰偃王师，一日欢娱得好枝。求成谋望皆吉庆，恰如枯木再生枝。', meaning: '名成利遂，谋望皆吉，枯木开花，阖家喜悦。', wish: '遂', job: '遂', wealth: '有', marriage: '成', love: '成', health: '愈', lost: '寻', lawsuit: '和', pregnancy: '生男', travel: '回', icon: '🌳' },
  { number: 16, level: '上签', title: '叶梦熊朝帝', poem: '愁眉思虑暂时开，启出云霄喜自来。宛如粪土中藏玉，良工一荐出尘埃。', meaning: '藏中得宝，喜出望外，转祸为福，皆大欢喜。', wish: '明', job: '成', wealth: '得', marriage: '合', love: '贵', health: '安', lost: '得', lawsuit: '吉', pregnancy: '安', travel: '利', icon: '💎' },
  { number: 17, level: '中签', title: '曹操话梅止渴', poem: '莫听闲言说是非，晨昏只好念阿弥。若将狂话为真实，画饼如何止得饥。', meaning: '心中不定，枉费功夫，守旧安静，得念弥陀。', wish: '空', job: '守', wealth: '谨', marriage: '宁', love: '守', health: '吉', lost: '空', lawsuit: '和', pregnancy: '安', travel: '守', icon: '🍐' },
  { number: 18, level: '上签', title: '曹国舅为仙', poem: '金乌西坠兔东升，日夜循环至古今。僧道得之无不利，士农工商各遂心。', meaning: '阴长阳消，西出东没，凡事得清，无有不利。', wish: '遂', job: '遂', wealth: '有', marriage: '成', love: '吉', health: '愈', lost: '得', lawsuit: '吉', pregnancy: '安', travel: '利', icon: '🌅' },
  { number: 19, level: '中签', title: '子仪封王', poem: '急水滩头放船归，风波作浪欲何为。若要安然求稳静，等待浪静过此危。', meaning: '急水放船，宜守旧过，静处安身，临危不危。', wish: '守', job: '待时', wealth: '平', marriage: '平', love: '待', health: '安', lost: '难', lawsuit: '平', pregnancy: '安', travel: '待', icon: '⛵' },
  { number: 20, level: '中签', title: '姜太公遇文王', poem: '当春久雨喜开晴，玉兔金乌渐渐明。旧事消散新事遂，看看一跳过龙门。', meaning: '久遇之后，遇贵经营，龙门得遇，百事皆吉。', wish: '遂', job: '遇贵', wealth: '利', marriage: '成', love: '遇贵', health: '安', lost: '见', lawsuit: '吉', pregnancy: '安', travel: '遂', icon: '🐉' },
  { number: 21, level: '上签', title: '李旦龙凤配合', poem: '阴阳道合总由天，女嫁男婚喜偎然。但见龙蛇相会合，熊罴入梦乐团圆。', meaning: '从心所欲，百事成就，天作之合，四海扬名。', wish: '遂', job: '成', wealth: '足', marriage: '成', love: '合', health: '安', lost: '得', lawsuit: '吉', pregnancy: '生男', travel: '利', icon: '💑' },
  { number: 22, level: '下签', title: '六郎逢救', poem: '旱时田里皆枯槁，谢天甘雨落淋淋。花果草木皆润泽，始知一雨值千金。', meaning: '田蚕倍熟，命运渐来，幸遇救病，其财莫贷。', wish: '守', job: '待', wealth: '利', marriage: '迟', love: '救', health: '愈', lost: '迟', lawsuit: '平', pregnancy: '平安', travel: '难', icon: '🌧️' },
  { number: 23, level: '中签', title: '怀德招亲', poem: '欲扳仙桂入蟾宫，岂虑天门不任君。忽遇一般音信好，人人皆笑岭顶花。', meaning: '谋望从心，求财十分，遇贵成就，锦上添花。', wish: '遂', job: '遂', wealth: '利', marriage: '成', love: '成', health: '安', lost: '得', lawsuit: '吉', pregnancy: '安', travel: '利', icon: '🌺' },
  { number: 24, level: '下签', title: '殷郊遇师', poem: '不成理论不成家，水性痴人似落花。若问君恩须得力，到头必见事如麻。', meaning: '是非莫说，事如麻乱，痴人说梦，到底成虚。', wish: '难', job: '错', wealth: '破', marriage: '难', love: '痴', health: '祷', lost: '不见', lawsuit: '凶', pregnancy: '防', travel: '凶', icon: '🍂' },
  { number: 25, level: '中签', title: '李广机智', poem: '过了忧危第几重，从今再历永无凶。宽心自有宽心计，得遇高人护圣功。', meaning: '讼终有理，病得安全，出入求谋，古井遇泉。', wish: '遂', job: '遇贵', wealth: '有', marriage: '合', love: '安', health: '安', lost: '得', lawsuit: '有理', pregnancy: '安', travel: '平', icon: '🔱' },
  { number: 26, level: '中签', title: '钟馗得道', poem: '上下传来事转虚，天边接得一封书。书中许我功名遂，直到终时亦是虚。', meaning: '名虚声虚，日下安居，守旧待时，不必踌蹰。', wish: '虚', job: '虚', wealth: '谨', marriage: '慎', love: '幻', health: '平', lost: '空', lawsuit: '和', pregnancy: '安', travel: '勿', icon: '👻' },
  { number: 27, level: '中签', title: '刘基谏主', poem: '一谋一用一番书，虑后思前不敢为。时到贵人相助力，如山墙立可安居。', meaning: '知非莫取，不必劳心，守正待时，贵人相扶。', wish: '待', job: '扶', wealth: '平', marriage: '稳', love: '助', health: '安', lost: '迟', lawsuit: '平', pregnancy: '安', travel: '稳', icon: '🏛️' },
  { number: 28, level: '中签', title: '李后寻包公', poem: '东边月上正蝉娟，顷刻云遮亦暗存。或有圆时还有缺，更言非者亦闲言。', meaning: '浮云遮月，不须疑惑，等待云收，便见分明。', wish: '待明', job: '迟', wealth: '平', marriage: '缺', love: '破镜', health: '祈', lost: '迟', lawsuit: '终明', pregnancy: '安', travel: '待', icon: '🌥️' },
  { number: 29, level: '上上签', title: '三顾茅庐', poem: '宝剑出匣耀光明，匣中全然不惹尘。今得贵人提携去，前程可许步青云。', meaning: '宝剑出匣，光芒四射，贵人提携，凡事通达。', wish: '遂', job: '遂', wealth: '得', marriage: '成', love: '合', health: '安', lost: '得', lawsuit: '胜', pregnancy: '安', travel: '利', icon: '⚔️' },
  { number: 30, level: '中签', title: '棋盘大会', poem: '劝君切莫向他求，似鹤飞来暗箭投。若去采薪蛇在草，恐遭毒口也忧愁。', meaning: '闭口深藏，不可妄动，防小人口，蛇在草中。', wish: '守', job: '防', wealth: '防破', marriage: '慎', love: '防小人', health: '防疾', lost: '不见', lawsuit: '防凶', pregnancy: '防', travel: '防', icon: '🐍' },
]

export default function ZhanbuPage() {
  const [filteredMethods, setFilteredMethods] = useState(DIVINATION_METHODS)
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null)
  const [filteredMinds, setFilteredMinds] = useState(DIVINATION_MINDS)
  const [expandedMind, setExpandedMind] = useState<string | null>(null)
  const [filteredGua, setFilteredGua] = useState(GUAXIANG_BASICS)
  const [expandedGua, setExpandedGua] = useState<string | null>(null)
  const [isShaking, setIsShaking] = useState(false)
  const [currentLot, setCurrentLot] = useState<typeof GUANYIN_LOTS[0] | null>(null)
  const [shakeCount, setShakeCount] = useState(0)

  const drawLot = () => {
    setIsShaking(true)
    setShakeCount(prev => prev + 1)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * GUANYIN_LOTS.length)
      setCurrentLot(GUANYIN_LOTS[randomIndex])
      setIsShaking(false)
    }, 2000)
  }

  const getLevelColor = (level: string) => {
    if (level.includes('上上')) return '#fbbf24'
    if (level.includes('上')) return '#22c55e'
    if (level.includes('中')) return '#66ccff'
    return '#ef4444'
  }

  const handleMethodFilter = useCallback((data: typeof DIVINATION_METHODS) => {
    setFilteredMethods(data)
  }, [])

  const handleMindFilter = useCallback((data: typeof DIVINATION_MINDS) => {
    setFilteredMinds(data)
  }, [])

  const handleGuaFilter = useCallback((data: typeof GUAXIANG_BASICS) => {
    setFilteredGua(data)
  }, [])

  const getDifficultyColor = (diff: number) => {
    if (diff < 50) return '#22c55e'
    if (diff < 75) return '#f59e0b'
    return '#ef4444'
  }

  const getAccuracyColor = (acc: number) => {
    if (acc < 80) return '#f59e0b'
    if (acc < 90) return '#22c55e'
    return '#3b82f6'
  }

  return (
    <SubPageTemplate
      title="占卜问卦"
      subtitle="观音灵签 · 在线求签 · 卜筮之道 · 至诚前知"
      icon="🎴"
      colorRgb="129, 140, 248"
    >
      <SubPageSection title="🎋 观音灵签在线求签">
        <div style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.1))',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          marginBottom: '1rem',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <p style={{ color: 'rgba(180, 180, 190, 0.75)', marginBottom: '1rem' }}>
              🙏 诚心诚意，默念所求之事，点击抽签
            </p>

            <motion.div
              animate={isShaking ? {
                rotate: [0, -10, 10, -10, 10, 0],
                y: [0, -10, 0, -10, 0],
              } : {}}
              transition={{ duration: 1.5, repeat: isShaking ? Infinity : 0 }}
              style={{
                fontSize: '5rem',
                marginBottom: '1rem',
                cursor: 'pointer',
                filter: isShaking ? 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))' : 'none',
              }}
            >
              🎋
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={drawLot}
              disabled={isShaking}
              style={{
                padding: '1rem 3rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                border: 'none',
                borderRadius: '50px',
                color: '#fff',
                cursor: isShaking ? 'not-allowed' : 'pointer',
                opacity: isShaking ? 0.6 : 1,
                marginBottom: '0.5rem',
              }}
            >
              {isShaking ? '🎰 灵签降临中...' : '✨ 诚心抽取灵签'}
            </motion.button>

            {shakeCount > 0 && (
              <div style={{
                color: 'rgba(180, 180, 190, 0.5)',
                fontSize: '0.85rem',
              }}>
                已求签 {shakeCount} 次 {shakeCount >= 3 && '| 💡 事不过三，诚心方灵'}
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {currentLot && !isShaking && (
              <motion.div
                key={currentLot.number}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.3))',
                  borderRadius: '12px',
                  border: `2px solid ${getLevelColor(currentLot.level)}40`,
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px dashed rgba(255,255,255,0.1)',
                }}>
                  <div>
                    <span style={{ fontSize: '2rem' }}>{currentLot.icon}</span>
                    <span style={{
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      marginLeft: '0.5rem',
                      color: getLevelColor(currentLot.level),
                    }}>
                      第 {currentLot.number} 签 · {currentLot.level}
                    </span>
                  </div>
                  <span style={{
                    padding: '0.3rem 1rem',
                    borderRadius: '20px',
                    background: getLevelColor(currentLot.level) + '30',
                    color: getLevelColor(currentLot.level),
                    fontWeight: 'bold',
                  }}>
                    {currentLot.title}
                  </span>
                </div>

                <div style={{
                  padding: '1rem',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  color: 'rgba(180, 180, 190, 0.9)',
                  lineHeight: 2,
                  letterSpacing: '2px',
                }}>
                  "{currentLot.poem}"
                </div>

                <p style={{
                  color: 'rgba(180, 180, 190, 0.75)',
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}>
                  <span style={{ color: '#8b5cf6' }}>💡 解曰：</span> {currentLot.meaning}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                  gap: '0.5rem',
                }}>
                  {[
                    { key: 'wish', label: '心愿', value: currentLot.wish },
                    { key: 'job', label: '事业', value: currentLot.job },
                    { key: 'wealth', label: '财运', value: currentLot.wealth },
                    { key: 'marriage', label: '姻缘', value: currentLot.marriage },
                    { key: 'health', label: '健康', value: currentLot.health },
                    { key: 'lawsuit', label: '官非', value: currentLot.lawsuit },
                    { key: 'pregnancy', label: '六甲', value: currentLot.pregnancy },
                    { key: 'travel', label: '出行', value: currentLot.travel },
                  ].map((item) => (
                    <div key={item.key} style={{
                      padding: '0.5rem',
                      textAlign: 'center',
                      background: 'rgba(139, 92, 246, 0.1)',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                    }}>
                      <div style={{ color: 'rgba(180, 180, 190, 0.6)' }}>{item.label}</div>
                      <div style={{ color: '#8b5cf6', fontWeight: 'bold' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SubPageSection>

      <SubPageSection title="卜筮之道">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            《易》有圣人之道四焉：以言者尚其辞，以动者尚其变，以制器者尚其象，以卜筮者尚其占。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            夫卜者，非决天命也，实问己心也。卦者，挂也。悬挂万象于目前，映照汝心之真伪。至诚之道，可以前知。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            天垂象，见吉凶，圣人象之。河出图，洛出书，圣人则之。探赜索隐，钩深致远，以定天下之吉凶，成天下之亹亹者，莫大乎蓍龟。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title={`十二大占卜法门详解 (${filteredMethods.length}/${DIVINATION_METHODS.length})`}>
        <FilterBar
          data={DIVINATION_METHODS}
          searchKeys={['name', 'category', 'origin', 'era', 'desc', 'detail', 'steps']}
          filterOptions={[
            { key: 'category', label: '法门分类', allLabel: '全部门类' },
            { key: 'era', label: '起源时代', allLabel: '全部时代' },
          ]}
          onFiltered={handleMethodFilter}
          placeholder="搜索占卜法门、起源、年代..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
          marginTop: '1rem',
        }}>
          {filteredMethods.map((method, index) => (
            <motion.div
              key={method.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -3 }}
              onClick={() => setExpandedMethod(expandedMethod === method.name ? null : method.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '2.5rem' }}>{method.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ color: '#b89438', fontSize: '1.1rem' }}>{method.name}</h3>
                    <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(129, 140, 248, 0.2)', color: '#818cf8' }}>
                      {method.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                    {method.origin} · {method.era}
                  </div>
                </div>
              </div>
              <p style={{ color: 'rgba(180, 180, 190, 0.75)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                {method.desc}
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)', marginBottom: '0.25rem' }}>
                    <span>难度</span>
                    <span style={{ color: getDifficultyColor(method.difficulty) }}>{method.difficulty}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${method.difficulty}%`, height: '100%', background: getDifficultyColor(method.difficulty) }} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)', marginBottom: '0.25rem' }}>
                    <span>应验率</span>
                    <span style={{ color: getAccuracyColor(method.accuracy) }}>{method.accuracy}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${method.accuracy}%`, height: '100%', background: getAccuracyColor(method.accuracy) }} />
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {expandedMethod === method.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                        {method.detail}
                      </p>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.8rem', color: '#b89438', marginBottom: '0.4rem' }}>📋 占卜步骤</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {method.steps.map((step, i) => (
                            <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', borderRadius: '4px' }}>
                              {i + 1}. {step}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: '#b89438', marginBottom: '0.4rem' }}>⚠️ 注意事项</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {method.notes.map((note, i) => (
                            <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderRadius: '4px' }}>
                              {note}
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

      <SubPageSection title={`占卜心法六要 (${filteredMinds.length}/${DIVINATION_MINDS.length})`}>
        <FilterBar
          data={DIVINATION_MINDS}
          searchKeys={['name', 'level', 'desc', 'detail', 'classicQuote']}
          filterOptions={[
            { key: 'level', label: '心法层次', allLabel: '全部层次' },
          ]}
          onFiltered={handleMindFilter}
          placeholder="搜索心法名称、内容..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredMinds.map((mind, index) => (
            <motion.div
              key={mind.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedMind(expandedMind === mind.name ? null : mind.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#b89438' }}>{mind.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(184, 148, 56, 0.2)', color: '#b89438' }}>
                    {mind.level}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: mind.importance >= 90 ? '#22c55e' : '#f59e0b' }}>
                    重要度 {mind.importance}%
                  </span>
                </div>
              </div>
              <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                {mind.desc}
              </p>
              <AnimatePresence>
                {expandedMind === mind.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                        {mind.detail}
                      </p>
                      <div style={{ padding: '0.75rem', background: 'rgba(129, 140, 248, 0.1)', borderRadius: '6px', borderLeft: '3px solid #818cf8' }}>
                        <div style={{ fontSize: '0.75rem', color: '#818cf8', marginBottom: '0.25rem' }}>📜 经典依据</div>
                        <p style={{ color: 'rgba(180, 180, 190, 0.8)', fontSize: '0.85rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                          {mind.classicQuote}
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

      <SubPageSection title={`八卦基础 (${filteredGua.length}/${GUAXIANG_BASICS.length})`}>
        <FilterBar
          data={GUAXIANG_BASICS}
          searchKeys={['name', 'nature', 'wuxing', 'meaning', 'explanation', 'keywords']}
          filterOptions={[
            { key: 'nature', label: '阴阳属性', allLabel: '全部属性' },
            { key: 'wuxing', label: '五行', allLabel: '全部五行' },
          ]}
          onFiltered={handleGuaFilter}
          placeholder="搜索卦名、属性、含义..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredGua.map((gua, index) => (
            <motion.div
              key={gua.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedGua(expandedGua === gua.name ? null : gua.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#b89438' }}>第{gua.number}卦 · {gua.name}</h3>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa' }}>
                    {gua.nature}
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}>
                    {gua.wuxing}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'rgba(180, 180, 190, 0.75)', marginBottom: '0.5rem' }}>
                {gua.meaning}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {gua.keywords.map((kw, i) => (
                  <span key={i} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', color: 'rgba(180, 180, 190, 0.6)' }}>
                    {kw}
                  </span>
                ))}
              </div>
              <AnimatePresence>
                {expandedGua === gua.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                        {gua.explanation}
                      </p>
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
