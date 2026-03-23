const BASE_PATH = '/LingXu';

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

const withBase = (path: string) => `${BASE_PATH}${path}`;

export const MODULES: ModuleConfig[] = [
  {
    id: 'tian',
    char: '天',
    name: '天时',
    pinyin: 'Tiān',
    description: '天道运行之理，星辰变化之机，黄历节气之道',
    href: withBase('/tian'),
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
      { id: 'calendar', name: '黄历吉凶', icon: '📅', description: '每日宜忌查询，今日运势解读', href: withBase('/tian/calendar') },
      { id: 'bazi', name: '八字排盘', icon: '🎴', description: '生辰八字，四柱推演，命盘分析', href: withBase('/tian/bazi') },
      { id: 'stars', name: '星辰运行', icon: '⭐', description: '二十八宿，灵气潮汐，星象知识', href: withBase('/tian/stars') },
      { id: 'solar-terms', name: '节气养生', icon: '🌿', description: '节气计算，养生要点，农事指导', href: withBase('/tian/solar-terms') },
      { id: 'daily-quote', name: '每日吉言', icon: '💫', description: '每日箴言，运势提示，古语智慧', href: withBase('/tian/daily-quote') },
    ],
  },
  {
    id: 'di',
    char: '地',
    name: '地理',
    pinyin: 'Dì',
    description: '天地山川之形，风水龙脉之理，福地洞天之秘',
    href: withBase('/di'),
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
      { id: 'compass', name: '罗盘定向', icon: '🧭', description: '八卦方位，吉凶判断，环境分析', href: withBase('/di/compass') },
      { id: 'caves', name: '洞天福地', icon: '🏔️', description: '三十六洞天，七十二福地，仙山位置', href: withBase('/di/caves') },
      { id: 'fengshui', name: '风水堪舆', icon: '🌊', description: '风水分析，阳宅阴宅，龙脉走向', href: withBase('/di/fengshui') },
      { id: 'geography', name: '地理志', icon: '🗺️', description: '山川地理，疆域沿革，名山大川', href: withBase('/di/geography') },
      { id: 'directions', name: '方位吉凶', icon: '⬆️', description: '方位查询，时辰吉凶，宜忌方位', href: withBase('/di/directions') },
    ],
  },
  {
    id: 'xuan',
    char: '玄',
    name: '玄学',
    pinyin: 'Xuán',
    description: '易道玄微之机，卦象推演之妙，符箓阵法之秘',
    href: withBase('/xuan'),
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
      { id: 'yijing', name: '易经占卜', icon: '☯️', description: '铜钱卦，蓍草卦，六十四卦解读', href: withBase('/xuan/yijing') },
      { id: 'destiny', name: '命理推演', icon: '🎲', description: '四柱八字，紫微斗数，命盘解读', href: withBase('/xuan/destiny') },
      { id: 'talismans', name: '符箓识别', icon: '📜', description: '符箓图鉴，用途说明，制作方法', href: withBase('/xuan/talismans') },
      { id: 'formations', name: '阵法布局', icon: '🔮', description: '阵法图鉴，模拟布置，原理说明', href: withBase('/xuan/formations') },
      { id: 'classics', name: '玄学典籍', icon: '📚', description: '经典文献，知识检索，玄学藏书', href: withBase('/xuan/classics') },
    ],
  },
  {
    id: 'huang',
    char: '黄',
    name: '历史',
    pinyin: 'Huáng',
    description: '千古兴亡之鉴，文明传承之脉，秘辛档案之库',
    href: withBase('/huang'),
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
      { id: 'scrolls', name: '历史卷轴', icon: '📜', description: '朝代浏览，事件查阅，卷轴阅读', href: withBase('/huang/scrolls') },
      { id: 'era-convert', name: '纪年转换', icon: '🔢', description: '公元农历转换，神话纪年互转', href: withBase('/huang/era-convert') },
      { id: 'figures', name: '人物谱', icon: '👤', description: '历史人物，帝王将相，圣贤传说', href: withBase('/huang/figures') },
      { id: 'events', name: '大事件', icon: '⚔️', description: '历史时间线，因果追溯，战争政治', href: withBase('/huang/events') },
      { id: 'secrets', name: '秘辛档案', icon: '🔒', description: '禁毁档案，隐秘记载，野史秘闻', href: withBase('/huang/secrets') },
    ],
  },
  {
    id: 'yu',
    char: '宇',
    name: '空间',
    pinyin: 'Yǔ',
    description: '天地宇宙之构，多维空间之理，万界苍茫之景',
    href: withBase('/yu'),
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
      { id: 'world-map', name: '世界地图', icon: '🗺️', description: '地域浏览，势力分布，世界地理', href: withBase('/yu/world-map') },
      { id: 'layers', name: '空间层级', icon: '🏯', description: '仙界冥界人间界，万界结构，空间层次', href: withBase('/yu/layers') },
      { id: 'realms', name: '界域详情', icon: '🌍', description: '各界特色，资源分布，区域介绍', href: withBase('/yu/realms') },
      { id: 'directions-world', name: '方位世界', icon: '⬆️', description: '东西南北中五方，五方世界，方位理论', href: withBase('/yu/directions-world') },
    ],
  },
  {
    id: 'zhou',
    char: '宙',
    name: '时间',
    pinyin: 'Zhòu',
    description: '时间长河之流，轮回因果之链，纪年更迭之道',
    href: withBase('/zhou'),
    color: '#f04080',
    bgGradient: 'radial-gradient(ellipse at center, #1a0010 0%, #050505 100%)',
    theme: {
      primary: '#f04080',
      secondary: '#cc2d66',
      accent: '#ff66a0',
      bg: '#050505',
      text: '#f0d8e8',
      muted: '#906080',
    },
    subModules: [
      { id: 'reincarnation', name: '轮回查询', icon: '🔄', description: '前世今生，因果轮回，六道查询', href: withBase('/zhou/reincarnation') },
      { id: 'calendar-system', name: '纪年系统', icon: '📅', description: '多纪元浏览，时间转换，纪年法', href: withBase('/zhou/calendar-system') },
      { id: 'eras', name: '时代划分', icon: '⏳', description: '各时代浏览，时间线，历史分期', href: withBase('/zhou/eras') },
      { id: 'timeline', name: '时间线', icon: '📊', description: '大事年表，时间轴，因果链', href: withBase('/zhou/timeline') },
    ],
  },
  {
    id: 'hong',
    char: '洪',
    name: '洪荒',
    pinyin: 'Hóng',
    description: '神怪异兽之形，洪荒神话之源，万兽图腾之灵',
    href: withBase('/hong'),
    color: '#f06040',
    bgGradient: 'radial-gradient(ellipse at center, #1a0500 0%, #050505 100%)',
    theme: {
      primary: '#f06040',
      secondary: '#cc422d',
      accent: '#ff8066',
      bg: '#050505',
      text: '#f0e0d8',
      muted: '#907060',
    },
    subModules: [
      { id: 'divine-beasts', name: '神兽图鉴', icon: '🐉', description: '青龙白虎朱雀玄武，上古神兽', href: withBase('/hong/divine-beasts') },
      { id: 'evil-beasts', name: '凶兽异志', icon: '👹', description: '饕餮穷奇梼杌混沌，凶兽图鉴', href: withBase('/hong/evil-beasts') },
      { id: 'birth-match', name: '诞生匹配', icon: '🎂', description: '生辰匹配神兽，守护兽查询', href: withBase('/hong/birth-match') },
      { id: 'deity-tree', name: '神系谱图', icon: '🌳', description: '神系关系，血脉传承，谱系图', href: withBase('/hong/deity-tree') },
      { id: 'auspicious', name: '祥瑞之兽', icon: '🦄', description: '麒麟凤凰，祥瑞象征，吉兆兽', href: withBase('/hong/auspicious') },
    ],
  },
  {
    id: 'huang-lost',
    char: '荒',
    name: '失落',
    pinyin: 'Huāng',
    description: '失传秘术之库，失落文明之迹，远古记忆之痕',
    href: withBase('/huang-lost'),
    color: '#806040',
    bgGradient: 'radial-gradient(ellipse at center, #1a1005 0%, #050505 100%)',
    theme: {
      primary: '#806040',
      secondary: '#6b4d2d',
      accent: '#a08066',
      bg: '#050505',
      text: '#f0e8d8',
      muted: '#807060',
    },
    subModules: [
      { id: 'techniques', name: '失传秘术', icon: '✨', description: '失传功法，秘术典籍，远古传承', href: withBase('/huang-lost/techniques') },
      { id: 'medicine', name: '远古药方', icon: '🌿', description: '失传药方，丹药炼制，药草图鉴', href: withBase('/huang-lost/medicine') },
      { id: 'artifacts', name: '失落神器', icon: '⚔️', description: '上古神器，失落法宝，神器谱', href: withBase('/huang-lost/artifacts') },
      { id: 'charms', name: '古物法器', icon: '📿', description: '古代法器，护身符，古物图鉴', href: withBase('/huang-lost/charms') },
      { id: 'ruins', name: '文明遗迹', icon: '🏛️', description: '远古遗迹，失落文明，古迹位置', href: withBase('/huang-lost/ruins') },
    ],
  },
];

export function getModuleById(id: string): ModuleConfig | undefined {
  return MODULES.find(m => m.id === id);
}

export function getSubModuleById(moduleId: string, subId: string): SubModule | undefined {
  const module = getModuleById(moduleId);
  return module?.subModules.find(s => s.id === subId);
}
