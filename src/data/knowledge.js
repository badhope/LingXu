export const knowledgeCategories = [
  { id: 'tiangan', name: '天干', icon: '☀️' },
  { id: 'dizhi', name: '地支', icon: '🌙' },
  { id: 'wuxing', name: '五行', icon: '🔄' },
  { id: 'bagua', name: '八卦', icon: '☯️' },
  { id: 'shengxiao', name: '生肖', icon: '🐲' },
  { id: 'terms', name: '术语', icon: '📖' }
]

export const knowledgeData = {
  tiangan: {
    title: '天干',
    description: '天干是中国古代用来纪年、纪月、纪日、纪时的一种符号系统，共有十个。',
    items: [
      {
        name: '甲',
        alias: '阳木',
        property: '五行属木，阳木',
        direction: '东方',
        season: '春季',
        description: '甲为十天干之首，象征万物破土而出，代表开始、新生、成长。甲木参天，脱胎要火。',
        characteristics: '刚健、正直、向上、仁慈',
        relations: '甲己合化土，甲木生火，甲木克土'
      },
      {
        name: '乙',
        alias: '阴木',
        property: '五行属木，阴木',
        direction: '东方',
        season: '春季',
        description: '乙为十天干第二，象征草木初生，柔顺而有生机。乙木为花草之木，柔弱而坚韧。',
        characteristics: '柔和、灵活、适应性强、善变',
        relations: '乙庚合化金，乙木生火，乙木克土'
      },
      {
        name: '丙',
        alias: '阳火',
        property: '五行属火，阳火',
        direction: '南方',
        season: '夏季',
        description: '丙为十天干第三，象征太阳普照，光明磊落。丙火为太阳之火，照耀万物。',
        characteristics: '热情、光明、积极、外向',
        relations: '丙辛合化水，丙火生土，丙火克金'
      },
      {
        name: '丁',
        alias: '阴火',
        property: '五行属火，阴火',
        direction: '南方',
        season: '夏季',
        description: '丁为十天干第四，象征灯火烛光，温暖而柔和。丁火为灯烛之火，照亮黑暗。',
        characteristics: '温和、细腻、内敛、智慧',
        relations: '丁壬合化木，丁火生土，丁火克金'
      },
      {
        name: '戊',
        alias: '阳土',
        property: '五行属土，阳土',
        direction: '中央',
        season: '四季末',
        description: '戊为十天干第五，象征大地厚土，承载万物。戊土为高山之土，厚重稳固。',
        characteristics: '稳重、厚实、可靠、包容',
        relations: '戊癸合化火，戊土生金，戊土克水'
      },
      {
        name: '己',
        alias: '阴土',
        property: '五行属土，阴土',
        direction: '中央',
        season: '四季末',
        description: '己为十天干第六，象征田园之土，滋养万物。己土为湿土，善于培育。',
        characteristics: '温和、包容、务实、细心',
        relations: '己甲合化土，己土生金，己土克水'
      },
      {
        name: '庚',
        alias: '阳金',
        property: '五行属金，阳金',
        direction: '西方',
        season: '秋季',
        description: '庚为十天干第七，象征金属刀剑，刚强锋利。庚金为顽铁，需要锻炼成器。',
        characteristics: '刚强、果断、正义、锐利',
        relations: '庚乙合化金，庚金生水，庚金克木'
      },
      {
        name: '辛',
        alias: '阴金',
        property: '五行属金，阴金',
        direction: '西方',
        season: '秋季',
        description: '辛为十天干第八，象征珠宝首饰，精致华美。辛金为首饰之金，珍贵而脆弱。',
        characteristics: '精致、敏感、追求完美、有艺术天赋',
        relations: '辛丙合化水，辛金生水，辛金克木'
      },
      {
        name: '壬',
        alias: '阳水',
        property: '五行属水，阳水',
        direction: '北方',
        season: '冬季',
        description: '壬为十天干第九，象征江河湖海，浩瀚无垠。壬水为大水，奔流不息。',
        characteristics: '智慧、流动、变通、胸怀宽广',
        relations: '壬丁合化木，壬水生木，壬水克火'
      },
      {
        name: '癸',
        alias: '阴水',
        property: '五行属水，阴水',
        direction: '北方',
        season: '冬季',
        description: '癸为十天干第十，象征雨露霜雪，滋润万物。癸水为小水，细腻柔和。',
        characteristics: '聪明、细腻、敏感、善于观察',
        relations: '癸戊合化火，癸水生木，癸水克火'
      }
    ]
  },
  dizhi: {
    title: '地支',
    description: '地支是中国古代用来纪年、纪月、纪日、纪时的另一种符号系统，共有十二个。',
    items: [
      {
        name: '子',
        alias: '子鼠',
        property: '五行属水，阳水',
        time: '23:00-01:00',
        month: '农历十一月',
        season: '冬季',
        description: '子为十二地支之首，象征万物萌生。子时为夜半，阴极阳生之时。',
        characteristics: '智慧、机敏、灵活、善于思考',
        relations: '子丑合土，子午冲，子未害'
      },
      {
        name: '丑',
        alias: '丑牛',
        property: '五行属土，阴土',
        time: '01:00-03:00',
        month: '农历十二月',
        season: '冬季',
        description: '丑为十二地支第二，象征万物扎根。丑时为鸡鸣，黎明前的黑暗。',
        characteristics: '勤劳、踏实、稳重、有耐心',
        relations: '丑子合土，丑未冲，丑午害'
      },
      {
        name: '寅',
        alias: '寅虎',
        property: '五行属木，阳木',
        time: '03:00-05:00',
        month: '农历正月',
        season: '春季',
        description: '寅为十二地支第三，象征万物生长。寅时为平旦，黎明初现。',
        characteristics: '勇敢、自信、热情、有领导力',
        relations: '寅亥合木，寅申冲，寅巳害'
      },
      {
        name: '卯',
        alias: '卯兔',
        property: '五行属木，阴木',
        time: '05:00-07:00',
        month: '农历二月',
        season: '春季',
        description: '卯为十二地支第四，象征万物繁茂。卯时为日出，旭日东升。',
        characteristics: '温和、善良、优雅、有艺术天赋',
        relations: '卯戌合火，卯酉冲，卯辰害'
      },
      {
        name: '辰',
        alias: '辰龙',
        property: '五行属土，阳土',
        time: '07:00-09:00',
        month: '农历三月',
        season: '春季',
        description: '辰为十二地支第五，象征万物震起。辰时为食时，早餐时分。',
        characteristics: '威严、自信、有抱负、追求完美',
        relations: '辰酉合金，辰戌冲，辰卯害'
      },
      {
        name: '巳',
        alias: '巳蛇',
        property: '五行属火，阴火',
        time: '09:00-11:00',
        month: '农历四月',
        season: '夏季',
        description: '巳为十二地支第六，象征万物盛长。巳时为隅中，上午时分。',
        characteristics: '智慧、神秘、深沉、有洞察力',
        relations: '巳申合水，巳亥冲，巳寅害'
      },
      {
        name: '午',
        alias: '午马',
        property: '五行属火，阳火',
        time: '11:00-13:00',
        month: '农历五月',
        season: '夏季',
        description: '午为十二地支第七，象征万物盛大。午时为日中，正午时分。',
        characteristics: '热情、奔放、自由、有活力',
        relations: '午未合火，午子冲，午丑害'
      },
      {
        name: '未',
        alias: '未羊',
        property: '五行属土，阴土',
        time: '13:00-15:00',
        month: '农历六月',
        season: '夏季',
        description: '未为十二地支第八，象征万物成熟。未时为日昳，下午时分。',
        characteristics: '温和、善良、有同情心、富有艺术气质',
        relations: '未午合火，未丑冲，未子害'
      },
      {
        name: '申',
        alias: '申猴',
        property: '五行属金，阳金',
        time: '15:00-17:00',
        month: '农历七月',
        season: '秋季',
        description: '申为十二地支第九，象征万物收敛。申时为哺时，傍晚时分。',
        characteristics: '聪明、灵活、机智、善于应变',
        relations: '申巳合水，申寅冲，申亥害'
      },
      {
        name: '酉',
        alias: '酉鸡',
        property: '五行属金，阴金',
        time: '17:00-19:00',
        month: '农历八月',
        season: '秋季',
        description: '酉为十二地支第十，象征万物老成。酉时为日入，日落时分。',
        characteristics: '勤奋、守时、有责任感、追求完美',
        relations: '酉辰合金，酉卯冲，酉戌害'
      },
      {
        name: '戌',
        alias: '戌狗',
        property: '五行属土，阳土',
        time: '19:00-21:00',
        month: '农历九月',
        season: '秋季',
        description: '戌为十二地支第十一，象征万物归藏。戌时为黄昏，天黑时分。',
        characteristics: '忠诚、正直、勇敢、有正义感',
        relations: '戌卯合火，戌辰冲，戌酉害'
      },
      {
        name: '亥',
        alias: '亥猪',
        property: '五行属水，阴水',
        time: '21:00-23:00',
        month: '农历十月',
        season: '冬季',
        description: '亥为十二地支第十二，象征万物收藏。亥时为人定，夜深时分。',
        characteristics: '善良、宽容、乐观、享受生活',
        relations: '亥寅合木，亥巳冲，亥申害'
      }
    ]
  },
  wuxing: {
    title: '五行',
    description: '五行是中国古代哲学的重要概念，指金、木、水、火、土五种基本元素。',
    items: [
      {
        name: '金',
        property: '五行之一',
        direction: '西方',
        season: '秋季',
        color: '白色',
        organ: '肺、大肠',
        emotion: '悲',
        description: '金曰从革，代表收敛、肃杀、变革。金性刚强，主杀伐决断。',
        characteristics: '刚强、果断、正义、锐利',
        relations: '金生水，金克木，火克金，土生金'
      },
      {
        name: '木',
        property: '五行之一',
        direction: '东方',
        season: '春季',
        color: '青色',
        organ: '肝、胆',
        emotion: '怒',
        description: '木曰曲直，代表生长、条达、舒展。木性柔和，主生发向上。',
        characteristics: '仁慈、温和、向上、有生机',
        relations: '木生火，木克土，金克木，水生木'
      },
      {
        name: '水',
        property: '五行之一',
        direction: '北方',
        season: '冬季',
        color: '黑色',
        organ: '肾、膀胱',
        emotion: '恐',
        description: '水曰润下，代表滋润、向下、流动。水性柔和，主智慧变通。',
        characteristics: '智慧、灵活、包容、善于变通',
        relations: '水生木，水克火，土克水，金生水'
      },
      {
        name: '火',
        property: '五行之一',
        direction: '南方',
        season: '夏季',
        color: '红色',
        organ: '心、小肠',
        emotion: '喜',
        description: '火曰炎上，代表炎热、向上、光明。火性热烈，主礼仪热情。',
        characteristics: '热情、积极、光明、有活力',
        relations: '火生土，火克金，水克火，木生火'
      },
      {
        name: '土',
        property: '五行之一',
        direction: '中央',
        season: '四季末',
        color: '黄色',
        organ: '脾、胃',
        emotion: '思',
        description: '土曰稼穑，代表承载、化育、稳定。土性厚重，主信义包容。',
        characteristics: '稳重、包容、可靠、有信用',
        relations: '土生金，土克水，木克土，火生土'
      }
    ]
  },
  bagua: {
    title: '八卦',
    description: '八卦是中国古代哲学的重要符号，由阴爻和阳爻组成，代表天地万物的基本状态。',
    items: [
      {
        name: '乾',
        symbol: '☰',
        property: '三阳爻',
        nature: '天',
        direction: '西北',
        family: '父',
        animal: '马',
        description: '乾为天，代表刚健、进取、创造。乾卦纯阳，象征天行健，君子以自强不息。',
        characteristics: '刚健、进取、领导、创造',
        meaning: '事业有成、功名显达、贵人相助'
      },
      {
        name: '坤',
        symbol: '☷',
        property: '三阴爻',
        nature: '地',
        direction: '西南',
        family: '母',
        animal: '牛',
        description: '坤为地，代表柔顺、包容、承载。坤卦纯阴，象征地势坤，君子以厚德载物。',
        characteristics: '柔顺、包容、稳重、承载',
        meaning: '家庭和睦、事业稳定、贵人扶持'
      },
      {
        name: '震',
        symbol: '☳',
        property: '一阳二阴',
        nature: '雷',
        direction: '东方',
        family: '长男',
        animal: '龙',
        description: '震为雷，代表震动、行动、创新。震卦象征春雷乍动，万物复苏。',
        characteristics: '行动、创新、活力、进取',
        meaning: '事业起步、改革创新、突破发展'
      },
      {
        name: '巽',
        symbol: '☴',
        property: '一阴二阳',
        nature: '风',
        direction: '东南',
        family: '长女',
        animal: '鸡',
        description: '巽为风，代表顺从、渗透、传播。巽卦象征风行天下，无孔不入。',
        characteristics: '灵活、顺从、传播、渗透',
        meaning: '事业顺利、人际关系好、名声传播'
      },
      {
        name: '坎',
        symbol: '☵',
        property: '一阳二阴',
        nature: '水',
        direction: '北方',
        family: '中男',
        animal: '猪',
        description: '坎为水，代表险阻、智慧、流动。坎卦象征水流不息，险中求胜。',
        characteristics: '智慧、深沉、流动、险阻',
        meaning: '需要谨慎、以智取胜、化险为夷'
      },
      {
        name: '离',
        symbol: '☲',
        property: '一阴二阳',
        nature: '火',
        direction: '南方',
        family: '中女',
        animal: '雉',
        description: '离为火，代表光明、热情、依附。离卦象征火光闪耀，照亮黑暗。',
        characteristics: '光明、热情、美丽、依附',
        meaning: '事业光明、名声显赫、贵人相助'
      },
      {
        name: '艮',
        symbol: '☶',
        property: '一阳二阴',
        nature: '山',
        direction: '东北',
        family: '少男',
        animal: '狗',
        description: '艮为山，代表静止、稳重、阻止。艮卦象征山岳巍峨，稳重如山。',
        characteristics: '稳重、静止、阻止、坚守',
        meaning: '事业稳定、守成有功、不宜妄动'
      },
      {
        name: '兑',
        symbol: '☱',
        property: '一阴二阳',
        nature: '泽',
        direction: '西方',
        family: '少女',
        animal: '羊',
        description: '兑为泽，代表喜悦、和谐、口舌。兑卦象征泽水相连，和悦相处。',
        characteristics: '喜悦、和谐、口才、交际',
        meaning: '人际和谐、口才出众、喜事临门'
      }
    ]
  },
  shengxiao: {
    title: '生肖',
    description: '生肖是中国传统文化中用来纪年的十二种动物，每种动物代表一个年份。',
    items: [
      { name: '鼠', order: 1, time: '23:00-01:00', element: '水', description: '机敏灵活，善于应变，智慧过人' },
      { name: '牛', order: 2, time: '01:00-03:00', element: '土', description: '勤劳踏实，稳重可靠，有耐心' },
      { name: '虎', order: 3, time: '03:00-05:00', element: '木', description: '勇敢自信，热情奔放，有领导力' },
      { name: '兔', order: 4, time: '05:00-07:00', element: '木', description: '温和善良，优雅细腻，有艺术天赋' },
      { name: '龙', order: 5, time: '07:00-09:00', element: '土', description: '威严自信，有抱负，追求完美' },
      { name: '蛇', order: 6, time: '09:00-11:00', element: '火', description: '智慧深沉，神秘内敛，有洞察力' },
      { name: '马', order: 7, time: '11:00-13:00', element: '火', description: '热情奔放，自由洒脱，有活力' },
      { name: '羊', order: 8, time: '13:00-15:00', element: '土', description: '温和善良，有同情心，富有艺术气质' },
      { name: '猴', order: 9, time: '15:00-17:00', element: '金', description: '聪明灵活，机智过人，善于应变' },
      { name: '鸡', order: 10, time: '17:00-19:00', element: '金', description: '勤奋守时，有责任感，追求完美' },
      { name: '狗', order: 11, time: '19:00-21:00', element: '土', description: '忠诚正直，勇敢无畏，有正义感' },
      { name: '猪', order: 12, time: '21:00-23:00', element: '水', description: '善良宽容，乐观豁达，享受生活' }
    ]
  },
  terms: {
    title: '术语',
    description: '命理学常用术语解释，帮助理解八字命理的基本概念。',
    items: [
      { name: '八字', description: '又称四柱，指人出生的年、月、日、时四个时间点的天干地支组合，共八个字。' },
      { name: '四柱', description: '即年柱、月柱、日柱、时柱，每柱由一个天干和一个地支组成。' },
      { name: '日主', description: '又称日元、命主，指日柱的天干，代表命主本人。' },
      { name: '十神', description: '根据五行生克关系，以日主为中心定义的十种关系：正官、偏官、正印、偏印、比肩、劫财、食神、伤官、正财、偏财。' },
      { name: '正官', description: '克我者为官杀，异性相克为正官，代表权威、地位、名誉。' },
      { name: '偏官', description: '又称七杀，同性相克为偏官，代表魄力、决断、竞争。' },
      { name: '正印', description: '生我者为印星，异性相生为正印，代表学业、贵人、名誉。' },
      { name: '偏印', description: '又称枭神，同性相生为偏印，代表才华、偏门学问。' },
      { name: '比肩', description: '与我同阴阳同五行为比肩，代表兄弟、朋友、同辈。' },
      { name: '劫财', description: '与我同五行异阴阳为劫财，代表竞争、花费、合作。' },
      { name: '食神', description: '我生者为食伤，同性为食神，代表才华、口福、享受。' },
      { name: '伤官', description: '我生者为食伤，异性为伤官，代表才华、叛逆、创新。' },
      { name: '正财', description: '我克者为财星，异性为正财，代表正当收入、稳定财富。' },
      { name: '偏财', description: '我克者为财星，同性为偏财，代表意外之财、投资收益。' },
      { name: '大运', description: '以月柱为基准，按阳男阴女顺行、阴男阳女逆行的原则排列的十年一运。' },
      { name: '流年', description: '又称太岁，指每年的干支，用于预测当年的运势。' },
      { name: '神煞', description: '命理学中的特殊星宿，如天乙贵人、文昌星、桃花星等，用于辅助判断。' },
      { name: '格局', description: '八字中五行力量的组合形态，如正官格、偏财格、食神格等。' },
      { name: '用神', description: '八字中对命主最有利的五行，能够平衡命局、改善运势。' },
      { name: '忌神', description: '八字中对命主最不利的五行，会加重命局失衡、影响运势。' }
    ]
  }
}

export const getKnowledgeByCategory = (categoryId) => {
  return knowledgeData[categoryId] || null
}
