export interface LuopanLayer {
  id: string
  name: string
  radius: number
  divisions: number
  type: 'text' | 'degree' | 'trigram' | 'heavenly-stem' | 'earthly-branch' | 'sector'
  items: LuopanItem[]
}

export interface LuopanItem {
  index: number
  name: string
  azimuth: number
  element?: string
  color?: string
  auspicious?: boolean
  note?: string
}

export const TWENTY_FOUR_MOUNTAINS: LuopanItem[] = [
  { index: 0, name: '壬', azimuth: 345, element: '水', color: '#4169e1', note: '阳水' },
  { index: 1, name: '子', azimuth: 352.5, element: '水', color: '#4169e1', note: '正北' },
  { index: 2, name: '癸', azimuth: 7.5, element: '水', color: '#4169e1', note: '阴水' },
  { index: 3, name: '丑', azimuth: 22.5, element: '土', color: '#8b4513', note: '湿土' },
  { index: 4, name: '艮', azimuth: 37.5, element: '土', color: '#d2691e', note: '东北' },
  { index: 5, name: '寅', azimuth: 52.5, element: '木', color: '#32cd32', note: '阳木' },
  { index: 6, name: '甲', azimuth: 67.5, element: '木', color: '#32cd32', note: '阳木' },
  { index: 7, name: '卯', azimuth: 82.5, element: '木', color: '#32cd32', note: '正东' },
  { index: 8, name: '乙', azimuth: 97.5, element: '木', color: '#90ee90', note: '阴木' },
  { index: 9, name: '辰', azimuth: 112.5, element: '土', color: '#8b4513', note: '湿土' },
  { index: 10, name: '巽', azimuth: 127.5, element: '木', color: '#90ee90', note: '东南' },
  { index: 11, name: '巳', azimuth: 142.5, element: '火', color: '#ff6347', note: '阴火' },
  { index: 12, name: '丙', azimuth: 157.5, element: '火', color: '#ff6347', note: '阳火' },
  { index: 13, name: '午', azimuth: 172.5, element: '火', color: '#ff6347', note: '正南' },
  { index: 14, name: '丁', azimuth: 187.5, element: '火', color: '#ff4500', note: '阴火' },
  { index: 15, name: '未', azimuth: 202.5, element: '土', color: '#8b4513', note: '燥土' },
  { index: 16, name: '坤', azimuth: 217.5, element: '土', color: '#8b4513', note: '西南' },
  { index: 17, name: '申', azimuth: 232.5, element: '金', color: '#c0c0c0', note: '阳金' },
  { index: 18, name: '庚', azimuth: 247.5, element: '金', color: '#c0c0c0', note: '阳金' },
  { index: 19, name: '酉', azimuth: 262.5, element: '金', color: '#daa520', note: '正西' },
  { index: 20, name: '辛', azimuth: 277.5, element: '金', color: '#c0c0c0', note: '阴金' },
  { index: 21, name: '戌', azimuth: 292.5, element: '土', color: '#8b4513', note: '燥土' },
  { index: 22, name: '乾', azimuth: 307.5, element: '金', color: '#daa520', note: '西北' },
  { index: 23, name: '亥', azimuth: 322.5, element: '水', color: '#4169e1', note: '阴水' },
]

export const HEAVENLY_STEMS: LuopanItem[] = [
  { index: 0, name: '甲', azimuth: 67.5, element: '阳木', color: '#32cd32' },
  { index: 1, name: '乙', azimuth: 97.5, element: '阴木', color: '#90ee90' },
  { index: 2, name: '丙', azimuth: 157.5, element: '阳火', color: '#ff6347' },
  { index: 3, name: '丁', azimuth: 187.5, element: '阴火', color: '#ff4500' },
  { index: 4, name: '戊', azimuth: 0, element: '阳土', color: '#8b4513' },
  { index: 5, name: '己', azimuth: 180, element: '阴土', color: '#d2691e' },
  { index: 6, name: '庚', azimuth: 247.5, element: '阳金', color: '#c0c0c0' },
  { index: 7, name: '辛', azimuth: 277.5, element: '阴金', color: '#c0c0c0' },
  { index: 8, name: '壬', azimuth: 345, element: '阳水', color: '#4169e1' },
  { index: 9, name: '癸', azimuth: 7.5, element: '阴水', color: '#6495ed' },
]

export const EARTHLY_BRANCHES: LuopanItem[] = [
  { index: 0, name: '子', azimuth: 0, element: '水', color: '#4169e1', note: '鼠' },
  { index: 1, name: '丑', azimuth: 30, element: '土', color: '#8b4513', note: '牛' },
  { index: 2, name: '寅', azimuth: 60, element: '木', color: '#32cd32', note: '虎' },
  { index: 3, name: '卯', azimuth: 90, element: '木', color: '#32cd32', note: '兔' },
  { index: 4, name: '辰', azimuth: 120, element: '土', color: '#8b4513', note: '龙' },
  { index: 5, name: '巳', azimuth: 150, element: '火', color: '#ff6347', note: '蛇' },
  { index: 6, name: '午', azimuth: 180, element: '火', color: '#ff6347', note: '马' },
  { index: 7, name: '未', azimuth: 210, element: '土', color: '#8b4513', note: '羊' },
  { index: 8, name: '申', azimuth: 240, element: '金', color: '#c0c0c0', note: '猴' },
  { index: 9, name: '酉', azimuth: 270, element: '金', color: '#daa520', note: '鸡' },
  { index: 10, name: '戌', azimuth: 300, element: '土', color: '#8b4513', note: '狗' },
  { index: 11, name: '亥', azimuth: 330, element: '水', color: '#4169e1', note: '猪' },
]

export const EIGHT_TRIGRAMS_LATER: LuopanItem[] = [
  { index: 0, name: '坎', azimuth: 0, element: '水', color: '#4169e1', note: '☵ 正北' },
  { index: 1, name: '坤', azimuth: 45, element: '土', color: '#8b4513', note: '☷ 西南' },
  { index: 2, name: '震', azimuth: 90, element: '木', color: '#32cd32', note: '☳ 正东' },
  { index: 3, name: '巽', azimuth: 135, element: '木', color: '#90ee90', note: '☴ 东南' },
  { index: 4, name: '乾', azimuth: 315, element: '金', color: '#daa520', note: '☰ 西北' },
  { index: 5, name: '兑', azimuth: 270, element: '金', color: '#87ceeb', note: '☱ 正西' },
  { index: 6, name: '艮', azimuth: 45, element: '土', color: '#d2691e', note: '☶ 东北' },
  { index: 7, name: '离', azimuth: 180, element: '火', color: '#ff6347', note: '☲ 正南' },
]

export const LUOPAN_LAYERS_CONFIG = [
  { id: 'center', name: '天池', innerRadius: 0, outerRadius: 40, visible: true },
  { id: 'eight-trigrams', name: '先天八卦', innerRadius: 40, outerRadius: 65, visible: true },
  { id: 'earthly-branches', name: '十二地支', innerRadius: 65, outerRadius: 90, visible: true },
  { id: '24-mountains', name: '二十四山', innerRadius: 90, outerRadius: 125, visible: true },
  { id: '120-fenjin', name: '一百二十分金', innerRadius: 125, outerRadius: 150, visible: true },
  { id: '72-dragons', name: '穿山七十二龙', innerRadius: 150, outerRadius: 175, visible: true },
  { id: 'degrees', name: '周天360度', innerRadius: 175, outerRadius: 195, visible: true },
]

export const EIGHT_HOUSES = [
  { name: '伏位', type: '吉', star: '左辅', color: '#4ade80', note: '平安' },
  { name: '生气', type: '吉', star: '贪狼', color: '#22c55e', note: '财丁' },
  { name: '延年', type: '吉', star: '武曲', color: '#16a34a', note: '健康' },
  { name: '天医', type: '吉', star: '巨门', color: '#86efac', note: '贵人' },
  { name: '绝命', type: '凶', star: '破军', color: '#ef4444', note: '灾厄' },
  { name: '五鬼', type: '凶', star: '廉贞', color: '#dc2626', note: '是非' },
  { name: '六煞', type: '凶', star: '文曲', color: '#f87171', note: '桃花' },
  { name: '祸害', type: '凶', star: '禄存', color: '#fca5a5', note: '病痛' },
]
