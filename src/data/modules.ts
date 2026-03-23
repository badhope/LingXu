export interface ModuleConfig {
  id: string;
  char: string;
  name: string;
  pinyin: string;
  description: string;
  href: string;
  color: string;
  bgGradient: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
    muted: string;
  };
  subModules: SubModule[];
}

export interface SubModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  href: string;
  items?: Array<{
    id: string;
    name: string;
    description?: string;
    tags?: string[];
    content?: string;
  }>;
}

export const MODULES: ModuleConfig[] = [
  {
    id: 'tian',
    char: '天',
    name: '天时',
    pinyin: 'Tiān',
    description: '天道运行之理，星辰变化之机，黄历节气之道',
    href: '/tian',
    color: '#f0c040',
    bgGradient: 'radial-gradient(ellipse at top, #1a1500 0%, #050505 100%)',
    theme: {
      primary: '#f0c040',
      secondary: '#c9a227',
      accent: '#ffe066',
      bg: '#050505',
      text: '#f0e6c8',
      muted: '#888060',
    },
    subModules: [
      {
        id: 'calendar',
        name: '黄历吉凶',
        icon: '📅',
        description: '每日宜忌查询，今日运势解读',
        href: '/tian/calendar',
      },
      {
        id: 'bazi',
        name: '八字排盘',
        icon: '🎴',
        description: '生辰八字，四柱推演，命盘分析',
        href: '/tian/bazi',
      },
      {
        id: 'stars',
        name: '星辰运行',
        icon: '⭐',
        description: '二十八宿，灵气潮汐，星象知识',
        href: '/tian/stars',
      },
      {
        id: 'solar-terms',
        name: '节气养生',
        icon: '🌿',
        description: '节气计算，养生要点，农事指导',
        href: '/tian/solar-terms',
      },
      {
        id: 'daily-quote',
        name: '每日吉言',
        icon: '💫',
        description: '每日箴言，运势提示，古语智慧',
        href: '/tian/daily-quote',
      },
    ],
  },
  {
    id: 'di',
    char: '地',
    name: '地理',
    pinyin: 'Dì',
    description: '天地山川之形，风水龙脉之理，福地洞天之秘',
    href: '/di',
    color: '#40b040',
    bgGradient: 'radial-gradient(ellipse at bottom, #001a0a 0%, #050505 100%)',
    theme: {
      primary: '#40b040',
      secondary: '#2d8a2d',
      accent: '#66d066',
      bg: '#050505',
      text: '#d4f0d4',
      muted: '#608060',
    },
    subModules: [
      {
        id: 'compass',
        name: '罗盘定向',
        icon: '🧭',
        description: '八卦方位，吉凶判断，环境分析',
        href: '/di/compass',
      },
      {
        id: 'caves',
        name: '洞天福地',
        icon: '🏔️',
        description: '三十六洞天，七十二福地，仙山位置',
        href: '/di/caves',
      },
      {
        id: 'fengshui',
        name: '风水堪舆',
        icon: '🌊',
        description: '风水分析，阳宅阴宅，龙脉走向',
        href: '/di/fengshui',
      },
      {
        id: 'geography',
        name: '地理志',
        icon: '🗺️',
        description: '山川地理，疆域沿革，名山大川',
        href: '/di/geography',
      },
      {
        id: 'directions',
        name: '方位吉凶',
        icon: '⬆️',
        description: '方位查询，时辰吉凶，宜忌方位',
        href: '/di/directions',
      },
    ],
  },
  {
    id: 'xuan',
    char: '玄',
    name: '玄学',
    pinyin: 'Xuán',
    description: '易道玄微之机，卦象推演之妙，符箓阵法之秘',
    href: '/xuan',
    color: '#8040f0',
    bgGradient: 'radial-gradient(ellipse at center, #0f0520 0%, #050505 100%)',
    theme: {
      primary: '#8040f0',
      secondary: '#6b2dcc',
      accent: '#a066ff',
      bg: '#050505',
      text: '#e8d8f0',
      muted: '#806090',
    },
    subModules: [
      {
        id: 'yijing',
        name: '易经占卜',
        icon: '☯️',
        description: '铜钱卦，蓍草卦，六十四卦解读',
        href: '/xuan/yijing',
      },
      {
        id: 'destiny',
        name: '命理推演',
        icon: '🎲',
        description: '四柱八字，紫微斗数，命盘解读',
        href: '/xuan/destiny',
      },
      {
        id: 'talismans',
        name: '符箓识别',
        icon: '📜',
        description: '符箓图鉴，用途说明，制作方法',
        href: '/xuan/talismans',
      },
      {
        id: 'formations',
        name: '阵法布局',
        icon: '🔮',
        description: '阵法图鉴，模拟布置，原理说明',
        href: '/xuan/formations',
      },
      {
        id: 'classics',
        name: '玄学典籍',
        icon: '📚',
        description: '经典文献，知识检索，玄学藏书',
        href: '/xuan/classics',
      },
    ],
  },
  {
    id: 'huang',
    char: '黄',
    name: '历史',
    pinyin: 'Huáng',
    description: '千古兴亡之鉴，文明传承之脉，秘辛档案之库',
    href: '/huang',
    color: '#c08040',
    bgGradient: 'radial-gradient(ellipse at center, #1a1000 0%, #050505 100%)',
    theme: {
      primary: '#c08040',
      secondary: '#8b6914',
      accent: '#e0a050',
      bg: '#050505',
      text: '#f0e8d8',
      muted: '#908060',
    },
    subModules: [
      {
        id: 'scrolls',
        name: '历史卷轴',
        icon: '📜',
        description: '朝代浏览，事件查阅，卷轴阅读',
        href: '/huang/scrolls',
      },
      {
        id: 'era-convert',
        name: '纪年转换',
        icon: '🔢',
        description: '公元农历转换，神话纪年互转',
        href: '/huang/era-convert',
      },
      {
        id: 'figures',
        name: '人物谱',
        icon: '👤',
        description: '历史人物，帝王将相，圣贤传说',
        href: '/huang/figures',
      },
      {
        id: 'events',
        name: '大事件',
        icon: '⚔️',
        description: '历史时间线，因果追溯，战争政治',
        href: '/huang/events',
      },
      {
        id: 'secrets',
        name: '秘辛档案',
        icon: '🔒',
        description: '禁毁档案，隐秘记载，野史秘闻',
        href: '/huang/secrets',
      },
    ],
  },
  {
    id: 'yu',
    char: '宇',
    name: '空间',
    pinyin: 'Yǔ',
    description: '天地宇宙之构，多维空间之理，万界苍茫之景',
    href: '/yu',
    color: '#4080f0',
    bgGradient: 'radial-gradient(ellipse at center, #000a1a 0%, #050505 100%)',
    theme: {
      primary: '#4080f0',
      secondary: '#2d5acc',
      accent: '#66a0ff',
      bg: '#050505',
      text: '#d8e8f0',
      muted: '#608090',
    },
    subModules: [
      {
        id: 'world-map',
        name: '世界地图',
        icon: '🗺️',
        description: '地域浏览，势力分布，世界地理',
        href: '/yu/world-map',
      },
      {
        id: 'layers',
        name: '空间层级',
        icon: '🏯',
        description: '仙界冥界人间界，万界结构，空间层次',
        href: '/yu/layers',
      },
      {
        id: 'realms',
        name: '界域详情',
        icon: '🌍',
        description: '各界特色，资源分布，区域介绍',
        href: '/yu/realms',
      },
      {
        id: 'directions-world',
        name: '方位世界',
        icon: '⬆️',
        description: '东西南北中五方，五方世界，方位理论',
        href: '/yu/directions-world',
      },
    ],
  },
  {
    id: 'zhou',
    char: '宙',
    name: '时间',
    pinyin: 'Zhòu',
    description: '时间长河之流，轮回因果之链，纪年更迭之道',
    href: '/zhou',
    color: '#f04080',
    bgGradient: 'radial-gradient(ellipse at center, #1a0010 0%, #050505 100%)',
    theme: {
      primary: '#f04080',
      secondary: '#cc2060',
      accent: '#ff60a0',
      bg: '#050505',
      text: '#f0d8e8',
      muted: '#906070',
    },
    subModules: [
      {
        id: 'reincarnation',
        name: '轮回查询',
        icon: '🔄',
        description: '前世今生，轮回记录，因果律',
        href: '/zhou/reincarnation',
      },
      {
        id: 'calendar-system',
        name: '纪年系统',
        icon: '📅',
        description: '多纪元转换，时间推算，历法知识',
        href: '/zhou/calendar-system',
      },
      {
        id: 'eras',
        name: '时代划分',
        icon: '⏳',
        description: '洪荒上古中古近古末法，各时代浏览',
        href: '/zhou/eras',
      },
      {
        id: 'timeline',
        name: '时间线',
        icon: '📊',
        description: '大事年表，因果追溯，历史脉络',
        href: '/zhou/timeline',
      },
    ],
  },
  {
    id: 'hong',
    char: '洪',
    name: '洪荒',
    pinyin: 'Hóng',
    description: '洪荒神怪之录，异兽珍禽之图，祥瑞凶兆之兆',
    href: '/hong',
    color: '#f06040',
    bgGradient: 'radial-gradient(ellipse at center, #1a0800 0%, #050505 100%)',
    theme: {
      primary: '#f06040',
      secondary: '#cc4010',
      accent: '#ff8060',
      bg: '#050505',
      text: '#f0e8d8',
      muted: '#907060',
    },
    subModules: [
      {
        id: 'divine-beasts',
        name: '神兽录',
        icon: '🐉',
        description: '龙凤麒麟白泽，神兽目录，详情浏览',
        href: '/hong/divine-beasts',
      },
      {
        id: 'evil-beasts',
        name: '异兽图',
        icon: '🦄',
        description: '混沌穷奇梼杌饕餮，异兽图鉴，危险等级',
        href: '/hong/evil-beasts',
      },
      {
        id: 'birth-match',
        name: '出生匹配',
        icon: '🎯',
        description: '出生日期匹配神兽守护灵，缘分测试',
        href: '/hong/birth-match',
      },
      {
        id: 'deity-tree',
        name: '神灵谱系',
        icon: '🌳',
        description: '神系关系，族谱网络，派系介绍',
        href: '/hong/deity-tree',
      },
      {
        id: 'auspicious',
        name: '祥瑞凶兆',
        icon: '✨',
        description: '祥瑞凶兽对照表，吉祥神兽，灾厄之物',
        href: '/hong/auspicious',
      },
    ],
  },
  {
    id: 'huang-lost',
    char: '荒',
    name: '失落',
    pinyin: 'Huāng',
    description: '失落文明之谜，失传秘术之珍，远古遗迹之探',
    href: '/huang-lost',
    color: '#806040',
    bgGradient: 'radial-gradient(ellipse at center, #100a00 0%, #050505 100%)',
    theme: {
      primary: '#806040',
      secondary: '#5a4010',
      accent: '#a08060',
      bg: '#050505',
      text: '#e8e0d0',
      muted: '#807060',
    },
    subModules: [
      {
        id: 'techniques',
        name: '失传功法',
        icon: '⚔️',
        description: '功法查询，能力分析，修炼秘诀',
        href: '/huang-lost/techniques',
      },
      {
        id: 'medicine',
        name: '医道秘术',
        icon: '💊',
        description: '医术方剂，养生之道，炼丹入门',
        href: '/huang-lost/medicine',
      },
      {
        id: 'artifacts',
        name: '炼器之道',
        icon: '🔧',
        description: '神器图纸，法宝介绍，炼器知识',
        href: '/huang-lost/artifacts',
      },
      {
        id: 'charms',
        name: '符咒大全',
        icon: '📋',
        description: '符咒图鉴，制作方法，使用禁忌',
        href: '/huang-lost/charms',
      },
      {
        id: 'ruins',
        name: '遗迹探查',
        icon: '🏛️',
        description: '遗迹位置，历史背景，失落宝藏',
        href: '/huang-lost/ruins',
      },
    ],
  },
];

export function getModuleById(id: string): ModuleConfig | undefined {
  return MODULES.find(m => m.id === id);
}

export function getSubModuleById(moduleId: string, subModuleId: string) {
  const module = getModuleById(moduleId);
  return module?.subModules.find(s => s.id === subModuleId);
}
