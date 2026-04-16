/**
 * 灵墟 - 天时计算核心库
 * LingXu - Celestial Time Calculation Core Library
 * 
 * 包含节气、星宿、运势、占卜等核心计算逻辑
 */

// ==================== 节气计算 ====================

export interface JieqiInfo {
  name: string
  date: Date
  meaning: string
  yangsheng: string
  food: string[]
  taboo: string[]
}

export const JIEQI_DATA = [
  {
    name: '立春',
    month: 2, day: 4,
    meaning: '春季开始，万物复苏',
    yangsheng: '宜养肝护肝，多食酸味食物',
    food: ['春饼', '萝卜', '生姜'],
    taboo: ['忌辛辣', '忌熬夜']
  },
  {
    name: '雨水',
    month: 2, day: 19,
    meaning: '降雨开始，草木萌动',
    yangsheng: '宜祛湿健脾，防寒保暖',
    food: ['山药', '莲子', '薏米'],
    taboo: ['忌生冷', '忌油腻']
  },
  {
    name: '惊蛰',
    month: 3, day: 6,
    meaning: '春雷惊醒蛰虫',
    yangsheng: '宜早起运动，振奋阳气',
    food: ['梨', '银耳', '百合'],
    taboo: ['忌动怒', '忌过度劳累']
  },
  {
    name: '春分',
    month: 3, day: 21,
    meaning: '昼夜平分，春天过半',
    yangsheng: '宜平衡阴阳，疏肝理气',
    food: ['春菜', '鸡蛋', '豆腐'],
    taboo: ['忌偏食', '忌情绪波动']
  },
  {
    name: '清明',
    month: 4, day: 5,
    meaning: '天气清朗，春暖花开',
    yangsheng: '宜踏青扫墓，柔肝养肺',
    food: ['青团', '艾草', '荠菜'],
    taboo: ['忌悲伤过度', '忌食发物']
  },
  {
    name: '谷雨',
    month: 4, day: 20,
    meaning: '雨水滋润谷物生长',
    yangsheng: '宜祛湿防潮，健脾利水',
    food: ['香椿', '茶叶', '鲫鱼'],
    taboo: ['忌寒凉', '忌潮湿环境']
  },
  {
    name: '立夏',
    month: 5, day: 6,
    meaning: '夏季开始，气温升高',
    yangsheng: '宜养心安神，多食苦味',
    food: ['苦瓜', '莲子', '绿豆'],
    taboo: ['忌贪凉', '忌暴饮暴食']
  },
  {
    name: '小满',
    month: 5, day: 21,
    meaning: '麦类籽粒开始饱满',
    yangsheng: '宜清热利湿，健脾和胃',
    food: ['黄瓜', '冬瓜', '丝瓜'],
    taboo: ['忌辛辣', '忌熬夜']
  },
  {
    name: '芒种',
    month: 6, day: 6,
    meaning: '有芒作物成熟',
    yangsheng: '宜清热解暑，养护心脏',
    food: ['杨梅', '桑葚', '薏米'],
    taboo: ['忌过度劳累', '忌情绪激动']
  },
  {
    name: '夏至',
    month: 6, day: 21,
    meaning: '一年中白昼最长',
    yangsheng: '宜养心安神，冬病夏治',
    food: ['面条', '西瓜', '绿豆汤'],
    taboo: ['忌贪凉', '忌剧烈运动']
  },
  {
    name: '小暑',
    month: 7, day: 7,
    meaning: '进入伏天，暑气渐盛',
    yangsheng: '宜清热解暑，健脾益气',
    food: ['藕', '黄鳝', '绿豆'],
    taboo: ['忌暴晒', '忌冷水澡']
  },
  {
    name: '大暑',
    month: 7, day: 23,
    meaning: '一年中最热的时期',
    yangsheng: '宜防暑降温，养心安神',
    food: ['仙草', '凤梨', '姜茶'],
    taboo: ['忌贪凉', '忌油腻']
  },
  {
    name: '立秋',
    month: 8, day: 8,
    meaning: '秋季开始，暑去凉来',
    yangsheng: '宜润燥养肺，少辛多酸',
    food: ['西瓜', '桃子', '秋梨'],
    taboo: ['忌辛辣', '忌熬夜']
  },
  {
    name: '处暑',
    month: 8, day: 23,
    meaning: '暑天结束，秋意渐浓',
    yangsheng: '宜滋阴润燥，健脾和胃',
    food: ['鸭肉', '龙眼', '银耳'],
    taboo: ['忌贪凉', '忌辛辣']
  },
  {
    name: '白露',
    month: 9, day: 8,
    meaning: '天气转凉，露凝而白',
    yangsheng: '宜养阴润肺，祛燥邪',
    food: ['龙眼', '白茶', '红薯'],
    taboo: ['忌生冷', '忌露宿']
  },
  {
    name: '秋分',
    month: 9, day: 23,
    meaning: '昼夜平分，秋天过半',
    yangsheng: '宜阴阳平衡，收敛神气',
    food: ['螃蟹', '桂花', '秋菜'],
    taboo: ['忌过度悲伤', '忌寒凉']
  },
  {
    name: '寒露',
    month: 10, day: 8,
    meaning: '露水寒冷',
    yangsheng: '宜养阴润燥，防寒保暖',
    food: ['芝麻', '螃蟹', '柿子'],
    taboo: ['忌露脚', '忌秋冻过度']
  },
  {
    name: '霜降',
    month: 10, day: 23,
    meaning: '开始降霜',
    yangsheng: '宜进补养身，防寒护膝',
    food: ['柿子', '萝卜', '牛肉'],
    taboo: ['忌寒凉', '忌过度劳累']
  },
  {
    name: '立冬',
    month: 11, day: 7,
    meaning: '冬季开始，万物收藏',
    yangsheng: '宜温补肾阳，早卧晚起',
    food: ['饺子', '羊肉', '萝卜'],
    taboo: ['忌寒凉', '忌熬夜']
  },
  {
    name: '小雪',
    month: 11, day: 22,
    meaning: '开始降雪',
    yangsheng: '宜温补驱寒，养肾防寒',
    food: ['糍粑', '腊肉', '白菜'],
    taboo: ['忌冷饮', '忌过度运动']
  },
  {
    name: '大雪',
    month: 12, day: 7,
    meaning: '降雪量大增',
    yangsheng: '宜温阳散寒，保暖防冻',
    food: ['羊肉', '红枣', '桂圆'],
    taboo: ['忌受寒', '忌情绪低落']
  },
  {
    name: '冬至',
    month: 12, day: 22,
    meaning: '一年中白昼最短',
    yangsheng: '宜补肾藏精，冬病冬治',
    food: ['饺子', '汤圆', '羊肉'],
    taboo: ['忌劳累', '忌房事过度']
  },
  {
    name: '小寒',
    month: 1, day: 6,
    meaning: '进入寒冷时期',
    yangsheng: '宜温补肾阳，防寒保暖',
    food: ['腊八粥', '羊肉', '糯米'],
    taboo: ['忌受寒', '忌过度进补']
  },
  {
    name: '大寒',
    month: 1, day: 20,
    meaning: '一年中最冷的时期',
    yangsheng: '宜温补脾肾，驱寒暖身',
    food: ['八宝饭', '羊肉', '红枣'],
    taboo: ['忌寒凉', '忌过度劳累']
  }
] as const

export function getCurrentJieqi(date: Date = new Date()): JieqiInfo {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  for (let i = JIEQI_DATA.length - 1; i >= 0; i--) {
    const jq = JIEQI_DATA[i]
    if (month > jq.month || (month === jq.month && day >= jq.day)) {
      return {
        name: jq.name,
        date: new Date(date.getFullYear(), jq.month - 1, jq.day),
        meaning: jq.meaning,
        yangsheng: jq.yangsheng,
        food: [...jq.food],
        taboo: [...jq.taboo]
      }
    }
  }
  
  const lastJq = JIEQI_DATA[JIEQI_DATA.length - 1]
  return {
    name: lastJq.name,
    date: new Date(date.getFullYear(), lastJq.month - 1, lastJq.day),
    meaning: lastJq.meaning,
    yangsheng: lastJq.yangsheng,
    food: [...lastJq.food],
    taboo: [...lastJq.taboo]
  }
}

export function getNextJieqi(date: Date = new Date()): JieqiInfo {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  for (let i = 0; i < JIEQI_DATA.length; i++) {
    const jq = JIEQI_DATA[i]
    if (month < jq.month || (month === jq.month && day < jq.day)) {
      return {
        name: jq.name,
        date: new Date(date.getFullYear(), jq.month - 1, jq.day),
        meaning: jq.meaning,
        yangsheng: jq.yangsheng,
        food: [...jq.food],
        taboo: [...jq.taboo]
      }
    }
  }
  
  const firstJq = JIEQI_DATA[0]
  return {
    name: firstJq.name,
    date: new Date(date.getFullYear() + 1, firstJq.month - 1, firstJq.day),
    meaning: firstJq.meaning,
    yangsheng: firstJq.yangsheng,
    food: [...firstJq.food],
    taboo: [...firstJq.taboo]
  }
}

export function getYearJieqi(year: number): JieqiInfo[] {
  return JIEQI_DATA.map(jq => ({
    name: jq.name,
    date: new Date(year, jq.month - 1, jq.day),
    meaning: jq.meaning,
    yangsheng: jq.yangsheng,
    food: [...jq.food],
    taboo: [...jq.taboo]
  }))
}

// ==================== 二十八星宿 ====================

export interface XingxiuInfo {
  name: string
  group: string
  groupIcon: string
  element: string
  animal: string
  meaning: string
  fortune: {
    career: string
    wealth: string
    love: string
    health: string
  }
}

export const XINGXIU_DATA: XingxiuInfo[] = [
  {
    name: '角宿',
    group: '东方苍龙',
    groupIcon: '🐉',
    element: '木',
    animal: '蛟',
    meaning: '东方第一宿，主苍龙之角',
    fortune: {
      career: '事业有成，贵人相助',
      wealth: '财运亨通，投资顺利',
      love: '桃花运旺，感情顺利',
      health: '身体健康，精力充沛'
    }
  },
  {
    name: '亢宿',
    group: '东方苍龙',
    groupIcon: '🐉',
    element: '金',
    animal: '龙',
    meaning: '第二宿，为苍龙颈项',
    fortune: {
      career: '事业平稳，稳中求进',
      wealth: '财运一般，需谨慎投资',
      love: '感情稳定，家庭和睦',
      health: '注意颈椎，预防感冒'
    }
  },
  {
    name: '氐宿',
    group: '东方苍龙',
    groupIcon: '🐉',
    element: '土',
    animal: '貉',
    meaning: '第三宿，为苍龙之胸',
    fortune: {
      career: '事业上升，把握机遇',
      wealth: '财运不错，有意外之财',
      love: '感情甜蜜，婚姻美满',
      health: '注意脾胃，饮食规律'
    }
  },
  {
    name: '房宿',
    group: '东方苍龙',
    groupIcon: '🐉',
    element: '日',
    animal: '兔',
    meaning: '第四宿，为苍龙腹部',
    fortune: {
      career: '事业顺利，升职加薪',
      wealth: '财运旺盛，收入增加',
      love: '感情和谐，家庭幸福',
      health: '身体健康，心情愉快'
    }
  },
  {
    name: '心宿',
    group: '东方苍龙',
    groupIcon: '🐉',
    element: '火',
    animal: '狐',
    meaning: '第五宿，为苍龙心脏',
    fortune: {
      career: '事业有成，名声大振',
      wealth: '财运亨通，富贵可期',
      love: '感情热烈，激情四射',
      health: '注意心脏，保持平和'
    }
  },
  {
    name: '尾宿',
    group: '东方苍龙',
    groupIcon: '🐉',
    element: '火',
    animal: '虎',
    meaning: '第六宿，为苍龙之尾',
    fortune: {
      career: '事业稳定，稳步发展',
      wealth: '财运平稳，积蓄增加',
      love: '感情稳定，相敬如宾',
      health: '注意腰背，适量运动'
    }
  },
  {
    name: '箕宿',
    group: '东方苍龙',
    groupIcon: '🐉',
    element: '木',
    animal: '豹',
    meaning: '第七宿，为苍龙之尾尖',
    fortune: {
      career: '事业有成，前途光明',
      wealth: '财运不错，投资有回报',
      love: '感情顺利，姻缘美满',
      health: '身体健康，精神饱满'
    }
  },
  {
    name: '斗宿',
    group: '北方玄武',
    groupIcon: '🐢',
    element: '木',
    animal: '獬',
    meaning: '北方第一宿，主玄武之首',
    fortune: {
      career: '事业有成，贵人相助',
      wealth: '财运亨通，收入稳定',
      love: '感情稳定，家庭和睦',
      health: '身体健康，精力充沛'
    }
  },
  {
    name: '牛宿',
    group: '北方玄武',
    groupIcon: '🐢',
    element: '金',
    animal: '牛',
    meaning: '第二宿，为玄武之颈',
    fortune: {
      career: '事业勤奋，终有回报',
      wealth: '财运平稳，勤劳致富',
      love: '感情专一，忠诚可靠',
      health: '注意肠胃，饮食健康'
    }
  },
  {
    name: '女宿',
    group: '北方玄武',
    groupIcon: '🐢',
    element: '土',
    animal: '蝠',
    meaning: '第三宿，为玄武之胸',
    fortune: {
      career: '事业顺利，女性贵人多',
      wealth: '财运不错，理财有方',
      love: '感情细腻，温柔体贴',
      health: '注意妇科，定期检查'
    }
  },
  {
    name: '虚宿',
    group: '北方玄武',
    groupIcon: '🐢',
    element: '日',
    animal: '鼠',
    meaning: '第四宿，为玄武之腹',
    fortune: {
      career: '事业空虚，需寻找方向',
      wealth: '财运不佳，需谨慎理财',
      love: '感情迷茫，需明确目标',
      health: '注意休息，避免疲劳'
    }
  },
  {
    name: '危宿',
    group: '北方玄武',
    groupIcon: '🐢',
    element: '火',
    animal: '燕',
    meaning: '第五宿，为玄武之心',
    fortune: {
      career: '事业有危，需谨慎行事',
      wealth: '财运不稳，投资需谨慎',
      love: '感情危机，需沟通化解',
      health: '注意安全，避免意外'
    }
  },
  {
    name: '室宿',
    group: '北方玄武',
    groupIcon: '🐢',
    element: '火',
    animal: '猪',
    meaning: '第六宿，为玄武之尾',
    fortune: {
      career: '事业稳定，家庭事业兼顾',
      wealth: '财运平稳，家庭和睦',
      love: '感情稳定，家庭幸福',
      health: '注意居家安全，预防意外'
    }
  },
  {
    name: '壁宿',
    group: '北方玄武',
    groupIcon: '🐢',
    element: '木',
    animal: '蝓',
    meaning: '第七宿，为玄武之尾尖',
    fortune: {
      career: '事业有成，学业进步',
      wealth: '财运不错，知识致富',
      love: '感情稳定，相互扶持',
      health: '注意用眼，保护视力'
    }
  },
  {
    name: '奎宿',
    group: '西方白虎',
    groupIcon: '🐅',
    element: '木',
    animal: '狼',
    meaning: '西方第一宿，主白虎之首',
    fortune: {
      career: '事业有成，文运亨通',
      wealth: '财运不错，学业有成',
      love: '感情稳定，相互尊重',
      health: '注意皮肤，保持清洁'
    }
  },
  {
    name: '娄宿',
    group: '西方白虎',
    groupIcon: '🐅',
    element: '金',
    animal: '狗',
    meaning: '第二宿，为白虎之颈',
    fortune: {
      career: '事业顺利，团队协作',
      wealth: '财运平稳，合伙有利',
      love: '感情忠诚，相互信任',
      health: '注意关节，适量运动'
    }
  },
  {
    name: '胃宿',
    group: '西方白虎',
    groupIcon: '🐅',
    element: '土',
    animal: '雉',
    meaning: '第三宿，为白虎之胸',
    fortune: {
      career: '事业有成，衣食无忧',
      wealth: '财运亨通，衣食丰足',
      love: '感情稳定，家庭和睦',
      health: '注意胃部，饮食规律'
    }
  },
  {
    name: '昴宿',
    group: '西方白虎',
    groupIcon: '🐅',
    element: '日',
    animal: '鸡',
    meaning: '第四宿，为白虎之腹',
    fortune: {
      career: '事业有成，名声远扬',
      wealth: '财运不错，收入稳定',
      love: '感情专一，忠诚可靠',
      health: '注意呼吸系统，预防感冒'
    }
  },
  {
    name: '毕宿',
    group: '西方白虎',
    groupIcon: '🐅',
    element: '火',
    animal: '乌',
    meaning: '第五宿，为白虎之心',
    fortune: {
      career: '事业有成，功成名就',
      wealth: '财运亨通，事业有成',
      love: '感情稳定，家庭幸福',
      health: '注意心脏，保持平和'
    }
  },
  {
    name: '觜宿',
    group: '西方白虎',
    groupIcon: '🐅',
    element: '火',
    animal: '猴',
    meaning: '第六宿，为白虎之尾',
    fortune: {
      career: '事业顺利，机智灵活',
      wealth: '财运不错，投资有方',
      love: '感情活跃，魅力四射',
      health: '注意口腔，保持卫生'
    }
  },
  {
    name: '参宿',
    group: '西方白虎',
    groupIcon: '🐅',
    element: '木',
    animal: '猿',
    meaning: '第七宿，为白虎之尾尖',
    fortune: {
      career: '事业有成，前途光明',
      wealth: '财运不错，收入增加',
      love: '感情稳定，相互扶持',
      health: '注意四肢，适量运动'
    }
  },
  {
    name: '井宿',
    group: '南方朱雀',
    groupIcon: '🦅',
    element: '木',
    animal: '犴',
    meaning: '南方第一宿，主朱雀之首',
    fortune: {
      career: '事业有成，名声大振',
      wealth: '财运亨通，富贵可期',
      love: '感情顺利，姻缘美满',
      health: '注意饮水，保持清洁'
    }
  },
  {
    name: '鬼宿',
    group: '南方朱雀',
    groupIcon: '🦅',
    element: '金',
    animal: '羊',
    meaning: '第二宿，为朱雀之颈',
    fortune: {
      career: '事业顺利，贵人相助',
      wealth: '财运不错，收入稳定',
      love: '感情稳定，家庭和睦',
      health: '注意神经，保持放松'
    }
  },
  {
    name: '柳宿',
    group: '南方朱雀',
    groupIcon: '🦅',
    element: '土',
    animal: '獐',
    meaning: '第三宿，为朱雀之胸',
    fortune: {
      career: '事业有成，前途光明',
      wealth: '财运不错，投资有回报',
      love: '感情顺利，姻缘美满',
      health: '注意眼睛，保护视力'
    }
  },
  {
    name: '星宿',
    group: '南方朱雀',
    groupIcon: '🦅',
    element: '日',
    animal: '马',
    meaning: '第四宿，为朱雀之腹',
    fortune: {
      career: '事业有成，名声远扬',
      wealth: '财运亨通，富贵可期',
      love: '感情热烈，激情四射',
      health: '注意心脏，保持平和'
    }
  },
  {
    name: '张宿',
    group: '南方朱雀',
    groupIcon: '🦅',
    element: '火',
    animal: '鹿',
    meaning: '第五宿，为朱雀之心',
    fortune: {
      career: '事业有成，大展宏图',
      wealth: '财运亨通，事业有成',
      love: '感情稳定，家庭幸福',
      health: '注意血压，定期检查'
    }
  },
  {
    name: '翼宿',
    group: '南方朱雀',
    groupIcon: '🦅',
    element: '火',
    animal: '蛇',
    meaning: '第六宿，为朱雀之尾',
    fortune: {
      career: '事业顺利，展翅高飞',
      wealth: '财运不错，收入增加',
      love: '感情稳定，相互扶持',
      health: '注意肺部，呼吸新鲜空气'
    }
  },
  {
    name: '轸宿',
    group: '南方朱雀',
    groupIcon: '🦅',
    element: '木',
    animal: '蚓',
    meaning: '第七宿，为朱雀之尾尖',
    fortune: {
      career: '事业有成，前途光明',
      wealth: '财运不错，积蓄增加',
      love: '感情稳定，家庭和睦',
      health: '注意肠胃，饮食规律'
    }
  }
]

export function getBenmingXingxiu(birthMonth: number, birthDay: number): XingxiuInfo {
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let dayOfYear = 0
  for (let i = 0; i < birthMonth - 1; i++) {
    dayOfYear += monthDays[i]
  }
  dayOfYear += birthDay
  
  const xingxiuIndex = Math.floor((dayOfYear - 1) / 13) % 28
  return XINGXIU_DATA[xingxiuIndex]
}

export function getXingxiuByName(name: string): XingxiuInfo | undefined {
  return XINGXIU_DATA.find(x => x.name === name)
}

export function getXingxiuByGroup(group: string): XingxiuInfo[] {
  return XINGXIU_DATA.filter(x => x.group === group)
}

// ==================== 每日运势 ====================

export interface YunshiResult {
  date: Date
  overall: number
  career: number
  wealth: number
  love: number
  health: number
  lucky: {
    color: string
    number: number
    direction: string
    time: string
  }
  advice: string
  warning: string
}

export function calculateDailyYunshi(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  date: Date = new Date()
): YunshiResult {
  const today = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  
  const baseScore = ((birthYear + birthMonth + birthDay + today + month + year) % 100)
  
  const overall = 50 + Math.floor((baseScore * Math.sin(today * 0.1) + 50))
  const career = 50 + Math.floor((baseScore * Math.cos(month * 0.1) + 50))
  const wealth = 50 + Math.floor((baseScore * Math.sin(year * 0.01) + 50))
  const love = 50 + Math.floor((baseScore * Math.cos(today * 0.05) + 50))
  const health = 50 + Math.floor((baseScore * Math.sin(month * 0.05) + 50))
  
  const colors = ['红色', '黄色', '蓝色', '绿色', '紫色', '白色', '黑色', '橙色']
  const directions = ['东方', '南方', '西方', '北方', '东南', '西南', '东北', '西北']
  const times = ['早晨', '上午', '中午', '下午', '傍晚', '晚上', '深夜']
  
  const luckyColor = colors[(birthYear + today) % colors.length]
  const luckyNumber = ((birthMonth + birthDay + today) % 9) + 1
  const luckyDirection = directions[(birthDay + today) % directions.length]
  const luckyTime = times[(birthYear + today) % times.length]
  
  const advices = [
    '今日宜静心思考，不宜冲动行事',
    '今日适合开展新计划，把握机遇',
    '今日宜与人合作，贵人运旺',
    '今日适合学习充电，提升自我',
    '今日宜保持低调，避免争执',
    '今日适合社交活动，拓展人脉'
  ]
  
  const warnings = [
    '注意财务安全，避免大额支出',
    '注意言辞，避免口舌之争',
    '注意休息，避免过度劳累',
    '注意交通安全，出行谨慎',
    '注意情绪管理，保持平和',
    '注意饮食健康，避免暴饮暴食'
  ]
  
  return {
    date,
    overall: Math.min(100, Math.max(0, overall)),
    career: Math.min(100, Math.max(0, career)),
    wealth: Math.min(100, Math.max(0, wealth)),
    love: Math.min(100, Math.max(0, love)),
    health: Math.min(100, Math.max(0, health)),
    lucky: {
      color: luckyColor,
      number: luckyNumber,
      direction: luckyDirection,
      time: luckyTime
    },
    advice: advices[(today + birthDay) % advices.length],
    warning: warnings[(today + birthMonth) % warnings.length]
  }
}

// ==================== 占卜系统 ====================

export interface ZhanbuResult {
  method: string
  question: string
  result: {
    type: string
    content: string
    interpretation: string
  }
  advice: string
  timestamp: Date
}

export function copperCoinZhanbu(question: string): ZhanbuResult {
  const coins = Array.from({ length: 3 }, () => Math.random() > 0.5 ? 1 : 0)
  const yinYang = coins.map(c => c === 1 ? '阳' : '阴')
  
  const interpretations = [
    { type: '大吉', content: '三阳开泰', interpretation: '运势极佳，万事亨通' },
    { type: '吉', content: '二阳一阴', interpretation: '运势不错，把握机遇' },
    { type: '中吉', content: '一阳二阴', interpretation: '运势平稳，稳中求进' },
    { type: '凶', content: '三阴', interpretation: '运势不佳，需谨慎行事' }
  ]
  
  const yangCount = coins.filter(c => c === 1).length
  const resultIndex = yangCount === 3 ? 0 : yangCount === 2 ? 1 : yangCount === 1 ? 2 : 3
  const result = interpretations[resultIndex]
  
  const advices = [
    '宜积极行动，把握机遇',
    '宜稳扎稳打，循序渐进',
    '宜静观其变，等待时机',
    '宜谨慎行事，避免冒险'
  ]
  
  return {
    method: '铜钱占卜',
    question,
    result: {
      type: result.type,
      content: `${yinYang.join('、')} - ${result.content}`,
      interpretation: result.interpretation
    },
    advice: advices[resultIndex],
    timestamp: new Date()
  }
}

export function plumBlossomZhanbu(question: string): ZhanbuResult {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  
  const shangGua = (hour % 8) + 1
  const xiaGua = (minute % 8) + 1
  const bianYao = (hour + minute) % 6
  
  const guaNames = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤']
  const shangGuaName = guaNames[shangGua - 1]
  const xiaGuaName = guaNames[xiaGua - 1]
  
  const interpretations: Record<string, string> = {
    '乾乾': '天行健，君子以自强不息。运势极佳。',
    '坤坤': '地势坤，君子以厚德载物。运势平稳。',
    '坎坎': '习坎，有孚维心亨。需谨慎行事。',
    '离离': '明两作离，大人以继明照于四方。前途光明。'
  }
  
  const guaKey = shangGuaName + xiaGuaName
  const interpretation = interpretations[guaKey] || '此卦需综合分析，请参考卦象详解。'
  
  return {
    method: '梅花易数',
    question,
    result: {
      type: `${shangGuaName}${xiaGuaName}卦`,
      content: `上卦：${shangGuaName}，下卦：${xiaGuaName}，动爻：第${bianYao + 1}爻`,
      interpretation
    },
    advice: '根据卦象变化，审时度势，把握机遇。',
    timestamp: now
  }
}

export function tarotZhanbu(question: string): ZhanbuResult {
  const majorArcana = [
    { num: 0, name: '愚者', meaning: '新的开始，无限可能' },
    { num: 1, name: '魔术师', meaning: '创造力，技能，意志力' },
    { num: 2, name: '女祭司', meaning: '直觉，神秘，潜意识' },
    { num: 3, name: '女皇', meaning: '丰饶，母性，自然' },
    { num: 4, name: '皇帝', meaning: '权威，结构，控制' },
    { num: 5, name: '教皇', meaning: '传统，信仰，教育' },
    { num: 6, name: '恋人', meaning: '爱情，选择，和谐' },
    { num: 7, name: '战车', meaning: '意志力，决心，胜利' },
    { num: 8, name: '力量', meaning: '勇气，耐心，内在力量' },
    { num: 9, name: '隐士', meaning: '内省，寻求，智慧' },
    { num: 10, name: '命运之轮', meaning: '命运，转折，机遇' },
    { num: 11, name: '正义', meaning: '公正，真理，因果' },
    { num: 12, name: '倒吊人', meaning: '牺牲，等待，新视角' },
    { num: 13, name: '死神', meaning: '结束，转变，重生' },
    { num: 14, name: '节制', meaning: '平衡，调和，耐心' },
    { num: 15, name: '恶魔', meaning: '束缚，诱惑，物质' },
    { num: 16, name: '塔', meaning: '突变，灾难，觉醒' },
    { num: 17, name: '星星', meaning: '希望，灵感，平静' },
    { num: 18, name: '月亮', meaning: '幻觉，恐惧，潜意识' },
    { num: 19, name: '太阳', meaning: '成功，活力，快乐' },
    { num: 20, name: '审判', meaning: '觉醒，重生，决定' },
    { num: 21, name: '世界', meaning: '完成，整合，成就' }
  ]
  
  const card = majorArcana[Math.floor(Math.random() * majorArcana.length)]
  
  return {
    method: '塔罗占卜',
    question,
    result: {
      type: `第${card.num}号牌`,
      content: card.name,
      interpretation: card.meaning
    },
    advice: '根据牌面含义，结合自身情况，做出明智选择。',
    timestamp: new Date()
  }
}

// ==================== 巡天系统 ====================

export interface XunshiEvent {
  id: string
  name: string
  type: '天象' | '节气' | '星宿' | '特殊'
  date: Date
  description: string
  significance: string
  relatedModules: string[]
}

export function getUpcomingEvents(days: number = 7): XunshiEvent[] {
  const events: XunshiEvent[] = []
  const now = new Date()
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000)
    
    const nextJq = getNextJieqi(date)
    if (nextJq.date.toDateString() === date.toDateString()) {
      events.push({
        id: `jieqi-${nextJq.name}-${date.getTime()}`,
        name: nextJq.name,
        type: '节气',
        date,
        description: nextJq.meaning,
        significance: nextJq.yangsheng,
        relatedModules: ['tian', 'jieqi']
      })
    }
    
    if (date.getDate() === 1 || date.getDate() === 15) {
      events.push({
        id: `moon-${date.getTime()}`,
        name: date.getDate() === 1 ? '新月' : '满月',
        type: '天象',
        date,
        description: date.getDate() === 1 ? '新月之时，宜许愿祈福' : '满月之时，宜感恩还愿',
        significance: '月亮盈亏影响潮汐与人体',
        relatedModules: ['tian', 'xuan']
      })
    }
  }
  
  return events.sort((a, b) => a.date.getTime() - b.date.getTime())
}

// ==================== 导出 ====================

const TianshiLib = {
  JIEQI_DATA,
  XINGXIU_DATA,
  getCurrentJieqi,
  getNextJieqi,
  getYearJieqi,
  getBenmingXingxiu,
  getXingxiuByName,
  getXingxiuByGroup,
  calculateDailyYunshi,
  copperCoinZhanbu,
  plumBlossomZhanbu,
  tarotZhanbu,
  getUpcomingEvents
}

export default TianshiLib
