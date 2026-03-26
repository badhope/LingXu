/**
 * 灵墟 - 常量配置
 * LingXu Constants
 */

// 网站基础配置
export const SITE_CONFIG = {
  name: '灵墟',
  nameEn: 'LingXu',
  subtitle: '末法时代 · 失落修行文明档案馆',
  description: '探索中华修行文明的兴衰变迁，记录那些被遗忘的仙人传说',
  url: 'https://badhope.github.io/LingXu',
  version: '2.0.0',
  author: '灵墟档案馆',
  keywords: ['灵墟', '修行', '修仙', '玄学', '道家', '易经', '八字', '风水', '玄学文化'],
}

// 世界观设定
export const WORLD_LORE = {
  currentYear: 2026,
  era: '末法时代',
  eraDescription: '灵气衰落万载，历史被封锁，修仙真相湮灭',
  background: `
    中华五千年乃至上古万年前，皆有修仙者存在。
    老子、庄子、列子...皆是飞升的仙者。
    如今世人只当神话，不知曾是真实。
    万年来逐渐灵气衰落，历史封锁，
    后面就逐渐的大家都忘却了这些奇人异事其实是修仙的。
  `,
}

// 八大主模块
export const MAIN_MODULES = [
  {
    id: 'tian',
    char: '天',
    name: '天时',
    pinyin: 'Tiān',
    description: '天道运行，星辰变化',
    fullDescription: '观测天象，推演气运。紫微斗数、七政四余、每日运势、节气养生。',
    color: '#f0c040',
    icon: '☁️',
    subModules: ['xingxiu', 'yunshi', 'jieqi', 'zhanbu'],
  },
  {
    id: 'di',
    char: '地',
    name: '地理',
    pinyin: 'Dì',
    description: '山川地理，风水堪舆',
    fullDescription: '龙脉寻踪，风水布局。罗盘定方位，堪舆选福地。',
    color: '#40b040',
    icon: '🏔️',
    subModules: ['fengshui', 'luopan', 'longmai', 'dili'],
  },
  {
    id: 'xuan',
    char: '玄',
    name: '玄学',
    pinyin: 'Xuán',
    description: '易经八卦，符箓命理',
    fullDescription: '玄之又玄，众妙之门。易经八卦、八字命理、紫微斗数、六爻占卜。',
    color: '#8040f0',
    icon: '🔮',
    subModules: ['yijing', 'bazi', 'liuyao', 'fulu'],
  },
  {
    id: 'lishi',
    char: '黄',
    name: '历史',
    pinyin: 'Huáng',
    description: '千古兴亡，秘辛档案',
    fullDescription: '尘封的历史，隐藏的真相。朝代更迭背后的修仙者传说。',
    color: '#c08040',
    icon: '📜',
    subModules: ['chaodai', 'renwu', 'mixin', 'wenxian'],
  },
  {
    id: 'yu',
    char: '宇',
    name: '空间',
    pinyin: 'Yǔ',
    description: '万界苍茫，空间层次',
    fullDescription: '三界二十八天，洞天福地。空间折叠，维度穿越。',
    color: '#4080f0',
    icon: '🌌',
    subModules: ['sanjie', 'dongtian', 'weidu', 'mijie'],
  },
  {
    id: 'zhou',
    char: '宙',
    name: '时间',
    pinyin: 'Zhòu',
    description: '时间长河，轮回因果',
    fullDescription: '时间长河奔流不息，轮回转世因果循环。推演过去未来。',
    color: '#f04080',
    icon: '⏳',
    subModules: ['lunhui', 'yinguo', 'shiguang', 'yuce'],
  },
  {
    id: 'hong',
    char: '洪',
    name: '洪荒',
    pinyin: 'Hóng',
    description: '神怪异兽，洪荒神话',
    fullDescription: '上古洪荒，神兽妖魔。龙凤麒麟，山精水怪。',
    color: '#f06040',
    icon: '🐉',
    subModules: ['shenshou', 'yaomo', 'chuanshuo', 'tushu'],
  },
  {
    id: 'huang',
    char: '荒',
    name: '失落',
    pinyin: 'Huāng',
    description: '失传秘术，失落文明',
    fullDescription: '失落的传承，遗忘的文明。功法秘籍、丹药配方、法宝图鉴。',
    color: '#806040',
    icon: '🗝️',
    subModules: ['gongfa', 'danyao', 'fabao', 'mishi'],
  },
] as const

// 子模块详细配置
export const SUB_MODULES = {
  // 天时子模块
  xingxiu: {
    name: '星宿',
    description: '二十八星宿，三垣四象',
    features: ['实时星图', '星宿查询', '本命星宿'],
  },
  yunshi: {
    name: '运势',
    description: '每日运势，流年运程',
    features: ['今日运势', '月度运势', '流年分析'],
  },
  jieqi: {
    name: '节气',
    description: '二十四节气，养生之道',
    features: ['节气查询', '养生建议', '时令饮食'],
  },
  zhanbu: {
    name: '占卜',
    description: '吉凶祸福，未卜先知',
    features: ['塔罗占卜', '铜钱卦', '梅花易数'],
  },
  
  // 地理子模块
  fengshui: {
    name: '风水',
    description: '阴阳宅风水，布局之道',
    features: ['风水入门', '户型分析', '布局建议'],
  },
  luopan: {
    name: '罗盘',
    description: '风水罗盘，定方位知吉凶',
    features: ['在线罗盘', '方位解读', '吉凶判断'],
  },
  longmai: {
    name: '龙脉',
    description: '中华龙脉，山水灵气',
    features: ['龙脉地图', '名山介绍', '灵气分布'],
  },
  dili: {
    name: '地理',
    description: '山川地理，地脉走向',
    features: ['名山大川', '地理知识', '堪舆基础'],
  },
  
  // 玄学子模块
  yijing: {
    name: '易经',
    description: '周易六十四卦，变易之道',
    features: ['卦象查询', '卦辞解读', '变卦推演'],
  },
  bazi: {
    name: '八字',
    description: '生辰八字，命理推算',
    features: ['八字排盘', '命理分析', '大运流年'],
  },
  liuyao: {
    name: '六爻',
    description: '六爻占卜，铜钱卦',
    features: ['六爻占卜', '铜钱卦', '蓍草占'],
  },
  fulu: {
    name: '符箓',
    description: '道家符箓，驱邪护身',
    features: ['符箓图鉴', '画符教程', '符箓生成'],
  },
  
  // 历史子模块
  chaodai: {
    name: '朝代',
    description: '历史朝代更迭',
    features: ['朝代时间轴', '帝王谱系', '重大事件'],
  },
  renwu: {
    name: '人物',
    description: '历史名人档案',
    features: ['修仙者名录', '道家人物', '奇人异士'],
  },
  mixin: {
    name: '秘辛',
    description: '历史背后的秘密',
    features: ['未解之谜', '秘闻档案', '历史疑案'],
  },
  wenxian: {
    name: '文献',
    description: '古籍文献资料',
    features: ['经典著作', '道藏目录', '文献解读'],
  },
  
  // 空间子模块
  sanjie: {
    name: '三界',
    description: '欲界色界无色界',
    features: ['三界地图', '天界介绍', '地府探索'],
  },
  dongtian: {
    name: '洞天',
    description: '十大洞天，三十六小洞天',
    features: ['洞天地图', '福地介绍', '灵气指数'],
  },
  weidu: {
    name: '维度',
    description: '多维空间探索',
    features: ['空间理论', '维度解读', '穿越传说'],
  },
  mijie: {
    name: '秘界',
    description: '隐秘空间，结界之地',
    features: ['秘境探索', '结界解析', '空间折叠'],
  },
  
  // 时间子模块
  lunhui: {
    name: '轮回',
    description: '六道轮回，因果循环',
    features: ['轮回图解', '前世探查', '转世传说'],
  },
  yinguo: {
    name: '因果',
    description: '善有善报，恶有恶报',
    features: ['因果分析', '业力计算', '因果故事'],
  },
  shiguang: {
    name: '时光',
    description: '时间长河探索',
    features: ['历史回溯', '未来推演', '时间悖论'],
  },
  yuce: {
    name: '预言',
    description: '古今预言解读',
    features: ['推背图', '烧饼歌', '预言解析'],
  },
  
  // 洪荒子模块
  shenshou: {
    name: '神兽',
    description: '上古神兽图鉴',
    features: ['神兽大全', '龙凤麒麟', '神兽召唤'],
  },
  yaomo: {
    name: '妖魔',
    description: '妖魔鬼怪档案',
    features: ['妖魔图鉴', '山海经', '降妖录'],
  },
  chuanshuo: {
    name: '传说',
    description: '上古神话传说',
    features: ['创世神话', '神魔大战', '仙界传说'],
  },
  tushu: {
    name: '图腾',
    description: '远古图腾文化',
    features: ['图腾大全', '部落信仰', '图腾设计'],
  },
  
  // 失落子模块
  gongfa: {
    name: '功法',
    description: '失传修炼功法',
    features: ['功法大全', '修炼入门', '境界划分'],
  },
  danyao: {
    name: '丹药',
    description: '炼丹制药秘方',
    features: ['丹方大全', '炼丹教程', '丹药图鉴'],
  },
  fabao: {
    name: '法宝',
    description: '法宝炼制图谱',
    features: ['法宝图鉴', '炼器入门', '法宝排行'],
  },
  mishi: {
    name: '秘室',
    description: '隐藏的秘密档案',
    features: ['机密档案', '禁术秘闻', '隐藏传承'],
  },
} as const

// 八卦数据
export const BAGUA = [
  { name: '乾', symbol: '☰', nature: '天', element: '金', direction: '西北', meaning: '刚健进取' },
  { name: '坤', symbol: '☷', nature: '地', element: '土', direction: '西南', meaning: '厚德载物' },
  { name: '震', symbol: '☳', nature: '雷', element: '木', direction: '东', meaning: '动而健' },
  { name: '巽', symbol: '☴', nature: '风', element: '木', direction: '东南', meaning: '顺势而为' },
  { name: '坎', symbol: '☵', nature: '水', element: '水', direction: '北', meaning: '险中求胜' },
  { name: '离', symbol: '☲', nature: '火', element: '火', direction: '南', meaning: '光明正大' },
  { name: '艮', symbol: '☶', nature: '山', element: '土', direction: '东北', meaning: '止而不失' },
  { name: '兑', symbol: '☱', nature: '泽', element: '金', direction: '西', meaning: '喜悦和谐' },
] as const

// 六十四卦（简化版）
export const LIUSHISI_GUA = [
  { num: 1, name: '乾', upper: '乾', lower: '乾', meaning: '元亨利贞' },
  { num: 2, name: '坤', upper: '坤', lower: '坤', meaning: '厚德载物' },
  { num: 3, name: '屯', upper: '坎', lower: '震', meaning: '刚柔始交' },
  { num: 4, name: '蒙', upper: '艮', lower: '坎', meaning: '启蒙教化' },
  { num: 5, name: '需', upper: '坎', lower: '乾', meaning: '等待时机' },
  { num: 6, name: '讼', upper: '乾', lower: '坎', meaning: '争讼止息' },
  // ... 完整64卦数据在后续文件中
] as const

// 五行
export const WUXING = [
  { name: '木', color: '#4ade80', direction: '东', season: '春', organ: '肝', virtue: '仁' },
  { name: '火', color: '#f87171', direction: '南', season: '夏', organ: '心', virtue: '礼' },
  { name: '土', color: '#fbbf24', direction: '中', season: '长夏', organ: '脾', virtue: '信' },
  { name: '金', color: '#94a3b8', direction: '西', season: '秋', organ: '肺', virtue: '义' },
  { name: '水', color: '#60a5fa', direction: '北', season: '冬', organ: '肾', virtue: '智' },
] as const

// 天干
export const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const

// 地支
export const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const

// 生肖
export const SHENGXIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'] as const

// 二十四节气
export const JIEQI = [
  { name: '立春', date: '2月4日左右', meaning: '开始进入春天' },
  { name: '雨水', date: '2月19日左右', meaning: '降雨开始' },
  { name: '惊蛰', date: '3月6日左右', meaning: '春雷惊醒蛰虫' },
  { name: '春分', date: '3月21日左右', meaning: '昼夜平分' },
  { name: '清明', date: '4月5日左右', meaning: '天气清朗' },
  { name: '谷雨', date: '4月20日左右', meaning: '雨水滋润谷物' },
  { name: '立夏', date: '5月6日左右', meaning: '开始进入夏天' },
  { name: '小满', date: '5月21日左右', meaning: '麦类作物籽粒开始饱满' },
  { name: '芒种', date: '6月6日左右', meaning: '有芒作物成熟' },
  { name: '夏至', date: '6月21日左右', meaning: '一年中白昼最长' },
  { name: '小暑', date: '7月7日左右', meaning: '进入伏天' },
  { name: '大暑', date: '7月23日左右', meaning: '一年中最热' },
  { name: '立秋', date: '8月8日左右', meaning: '开始进入秋天' },
  { name: '处暑', date: '8月23日左右', meaning: '暑天结束' },
  { name: '白露', date: '9月8日左右', meaning: '天气转凉' },
  { name: '秋分', date: '9月23日左右', meaning: '昼夜平分' },
  { name: '寒露', date: '10月8日左右', meaning: '露水寒冷' },
  { name: '霜降', date: '10月23日左右', meaning: '开始降霜' },
  { name: '立冬', date: '11月7日左右', meaning: '开始进入冬天' },
  { name: '小雪', date: '11月22日左右', meaning: '开始降雪' },
  { name: '大雪', date: '12月7日左右', meaning: '降雪量大' },
  { name: '冬至', date: '12月22日左右', meaning: '一年中白昼最短' },
  { name: '小寒', date: '1月6日左右', meaning: '开始进入寒冷' },
  { name: '大寒', date: '1月20日左右', meaning: '一年中最冷' },
] as const

// 修炼境界
export const XIULIAN_JINGJIE = [
  { level: 1, name: '凡人', description: '未踏入修行之路' },
  { level: 2, name: '练气', description: '感应天地灵气，引气入体' },
  { level: 3, name: '筑基', description: '铸造仙基，凝练真元' },
  { level: 4, name: '金丹', description: '结成金丹，寿元大增' },
  { level: 5, name: '元婴', description: '破丹成婴，神魂壮大' },
  { level: 6, name: '化神', description: '元神化形，神通大增' },
  { level: 7, name: '炼虚', description: '返虚入道，洞悉法则' },
  { level: 8, name: '合体', description: '精气神合一，天人合一' },
  { level: 9, name: '大乘', description: '功行圆满，待飞升' },
  { level: 10, name: '渡劫', description: '历天劫考验，证道长生' },
  { level: 11, name: '真仙', description: '飞升仙界，长生不老' },
] as const

// API 配置
export const API_CONFIG = {
  // 天文 API
  astronomy: {
    nasa: 'https://api.nasa.gov',
    celestial: 'https://celestial-maps-api.example.com',
  },
  // 天气 API
  weather: {
    qweather: 'https://devapi.qweather.com/v7',
  },
  // 日历 API
  calendar: {
    holiday: 'https://date.nager.at/api/v3',
  },
} as const

// 导出类型
export type Module = typeof MAIN_MODULES[number]
export type SubModule = typeof SUB_MODULES[keyof typeof SUB_MODULES]
export type Bagua = typeof BAGUA[number]
export type Wuxing = typeof WUXING[number]
