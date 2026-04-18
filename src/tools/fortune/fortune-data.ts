export interface FortuneCard {
  id: string
  level: 'great' | 'good' | 'normal' | 'bad' | 'worse'
  title: string
  subtitle: string
  poem: string
  explanation: string
  fortune: {
    overall: string
    career: string
    wealth: string
    love: string
    health: string
  }
  luckyNumbers: number[]
  luckyDirection: string
  luckyColor: string
}

export interface ShiChen {
  id: number
  name: string
  startHour: number
  endHour: number
  zhi: string
  animal: string
}

export const FORTUNE_CARDS: FortuneCard[] = [
  {
    id: 'fortune_001',
    level: 'great',
    title: '上上签',
    subtitle: '姜太公钓鱼',
    poem: '守旧待时，如镜擦尘。一朝时至，福禄来临。',
    explanation: '此签为天垂吉兆之象，凡事皆有贵人相助，谋望可成。',
    fortune: {
      overall: '大吉大利，百事顺遂',
      career: '贵人提拔，前程似锦',
      wealth: '财源广进，得财如意',
      love: '姻缘美满，琴瑟和鸣',
      health: '身体康泰，百病消除',
    },
    luckyNumbers: [1, 6, 8],
    luckyDirection: '东南',
    luckyColor: '朱红',
  },
  {
    id: 'fortune_002',
    level: 'good',
    title: '上签',
    subtitle: '韩文公遇雪',
    poem: '云开雾散，月在中天。贵人相引，福禄绵绵。',
    explanation: '此签为先难后易之象，凡事坚持到底则终有所成。',
    fortune: {
      overall: '先难后易，苦尽甘来',
      career: '贵人相助，终获成功',
      wealth: '劳而有获，渐入佳境',
      love: '历经波折，终成眷属',
      health: '小病无妨，终得安康',
    },
    luckyNumbers: [3, 7, 9],
    luckyDirection: '正南',
    luckyColor: '金黄',
  },
  {
    id: 'fortune_003',
    level: 'normal',
    title: '中签',
    subtitle: '唐明皇游月',
    poem: '如在梦中，宜守不宜攻。待时方可，妄动则凶。',
    explanation: '此签为梦中得宝之象，宜守旧待时，不可强求。',
    fortune: {
      overall: '守旧待时，不宜妄动',
      career: '按部就班，不宜冒险',
      wealth: '收支平衡，不可贪求',
      love: '貌合神离，需要经营',
      health: '注意调养，劳逸结合',
    },
    luckyNumbers: [2, 5, 7],
    luckyDirection: '正东',
    luckyColor: '月白',
  },
  {
    id: 'fortune_004',
    level: 'bad',
    title: '下签',
    subtitle: '霸王被困',
    poem: '鸟遭笼罗，鱼在网中。百般计较，总是成空。',
    explanation: '此签为进退两难之象，凡事宜忍耐，静待转机。',
    fortune: {
      overall: '诸事不顺，宜静不宜动',
      career: '小人当道，谨防暗算',
      wealth: '破财之虞，守财为上',
      love: '口舌是非，感情破裂',
      health: '疾病缠身，多加保重',
    },
    luckyNumbers: [4, 8],
    luckyDirection: '正西',
    luckyColor: '玄黑',
  },
  {
    id: 'fortune_005',
    level: 'great',
    title: '上上签',
    subtitle: '鲤鱼化龙',
    poem: '鲤鱼跃过龙门去，万万里程从此始。一声雷震洞天开，此时方显男儿志。',
    explanation: '此签为飞黄腾达之象，时来运转，大展宏图。',
    fortune: {
      overall: '时来运转，大展宏图',
      career: '青云直上，步步高升',
      wealth: '大得财利，心想事成',
      love: '天作之合，美满姻缘',
      health: '百病痊愈，身强体健',
    },
    luckyNumbers: [1, 5, 9],
    luckyDirection: '正北',
    luckyColor: '青紫',
  },
  {
    id: 'fortune_006',
    level: 'worse',
    title: '下下签',
    subtitle: '水涸鱼枯',
    poem: '舟行浅水，进退不能。守旧待时，方得安宁。',
    explanation: '此签为山穷水尽之象，宜退守静养，绝不可妄动。',
    fortune: {
      overall: '时运不济，退守为安',
      career: '处处碰壁，宜忍宜静',
      wealth: '大耗财物，破财免灾',
      love: '破镜难圆，各自安好',
      health: '大病缠身，诚心祈福',
    },
    luckyNumbers: [6],
    luckyDirection: '东北',
    luckyColor: '土黄',
  },
]

export const FORTUNE_LEVELS = {
  great: { name: '大吉', color: '#ffd700', bg: 'rgba(255, 215, 0, 0.15)' },
  good: { name: '吉', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.15)' },
  normal: { name: '平', color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.15)' },
  bad: { name: '凶', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.15)' },
  worse: { name: '大凶', color: '#f87171', bg: 'rgba(248, 113, 113, 0.15)' },
}

export const SHICHENS: ShiChen[] = [
  { id: 0, name: '子时', startHour: 23, endHour: 1, zhi: '子', animal: '鼠' },
  { id: 1, name: '丑时', startHour: 1, endHour: 3, zhi: '丑', animal: '牛' },
  { id: 2, name: '寅时', startHour: 3, endHour: 5, zhi: '寅', animal: '虎' },
  { id: 3, name: '卯时', startHour: 5, endHour: 7, zhi: '卯', animal: '兔' },
  { id: 4, name: '辰时', startHour: 7, endHour: 9, zhi: '辰', animal: '龙' },
  { id: 5, name: '巳时', startHour: 9, endHour: 11, zhi: '巳', animal: '蛇' },
  { id: 6, name: '午时', startHour: 11, endHour: 13, zhi: '午', animal: '马' },
  { id: 7, name: '未时', startHour: 13, endHour: 15, zhi: '未', animal: '羊' },
  { id: 8, name: '申时', startHour: 15, endHour: 17, zhi: '申', animal: '猴' },
  { id: 9, name: '酉时', startHour: 17, endHour: 19, zhi: '酉', animal: '鸡' },
  { id: 10, name: '戌时', startHour: 19, endHour: 21, zhi: '戌', animal: '狗' },
  { id: 11, name: '亥时', startHour: 21, endHour: 23, zhi: '亥', animal: '猪' },
]

export const SHICHEN_LUCK = ['吉', '凶', '平', '吉', '凶', '吉', '平', '凶', '吉', '平', '吉', '凶']
