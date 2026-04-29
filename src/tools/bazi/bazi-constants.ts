export const HEAVENLY_STEMS = [
  { id: 'jia', name: '甲', element: '木', yang: true, number: 1, direction: '东' },
  { id: 'yi', name: '乙', element: '木', yang: false, number: 2, direction: '东' },
  { id: 'bing', name: '丙', element: '火', yang: true, number: 3, direction: '南' },
  { id: 'ding', name: '丁', element: '火', yang: false, number: 4, direction: '南' },
  { id: 'wu', name: '戊', element: '土', yang: true, number: 5, direction: '中' },
  { id: 'ji', name: '己', element: '土', yang: false, number: 6, direction: '中' },
  { id: 'geng', name: '庚', element: '金', yang: true, number: 7, direction: '西' },
  { id: 'xin', name: '辛', element: '金', yang: false, number: 8, direction: '西' },
  { id: 'ren', name: '壬', element: '水', yang: true, number: 9, direction: '北' },
  { id: 'gui', name: '癸', element: '水', yang: false, number: 10, direction: '北' },
]

export const EARTHLY_BRANCHES = [
  { id: 'zi', name: '子', element: '水', yang: true, number: 1, hiddenStems: ['gui'] },
  { id: 'chou', name: '丑', element: '土', yang: false, number: 2, hiddenStems: ['ji', 'gui', 'xin'] },
  { id: 'yin', name: '寅', element: '木', yang: true, number: 3, hiddenStems: ['jia', 'bing', 'wu'] },
  { id: 'mao', name: '卯', element: '木', yang: false, number: 4, hiddenStems: ['yi'] },
  { id: 'chen', name: '辰', element: '土', yang: true, number: 5, hiddenStems: ['wu', 'yi', 'gui'] },
  { id: 'si', name: '巳', element: '火', yang: false, number: 6, hiddenStems: ['bing', 'wu', 'geng'] },
  { id: 'wu', name: '午', element: '火', yang: true, number: 7, hiddenStems: ['ding', 'ji'] },
  { id: 'wei', name: '未', element: '土', yang: false, number: 8, hiddenStems: ['ji', 'yi', 'ding'] },
  { id: 'shen', name: '申', element: '金', yang: true, number: 9, hiddenStems: ['geng', 'ren', 'wu'] },
  { id: 'you', name: '酉', element: '金', yang: false, number: 10, hiddenStems: ['xin'] },
  { id: 'xu', name: '戌', element: '土', yang: true, number: 11, hiddenStems: ['wu', 'xin', 'ding'] },
  { id: 'hai', name: '亥', element: '水', yang: false, number: 12, hiddenStems: ['ren', 'jia'] },
]

export const TEN_GODS = [
  { id: 'bi', name: '比肩', relation: '同我' },
  { id: 'jie', name: '劫财', relation: '同我异阴阳' },
  { id: 'shi', name: '食神', relation: '我生' },
  { id: 'shang', name: '伤官', relation: '我生异阴阳' },
  { id: 'zhengcai', name: '正财', relation: '克我' },
  { id: 'piancai', name: '偏财', relation: '克我异阴阳' },
  { id: 'zhengguan', name: '正官', relation: '我克' },
  { id: 'qisha', name: '七杀', relation: '我克异阴阳' },
  { id: 'zhengyin', name: '正印', relation: '生我' },
  { id: 'pianyin', name: '偏印', relation: '生我异阴阳' },
]

export const DAYUN_SEQUENCE = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8]

export const FIVE_ELEMENTS = [
  { id: 'wood', name: '木', color: '#22c55e', direction: '东', season: '春' },
  { id: 'fire', name: '火', color: '#ef4444', direction: '南', season: '夏' },
  { id: 'earth', name: '土', color: '#f59e0b', direction: '中', season: '四季' },
  { id: 'metal', name: '金', color: '#94a3b8', direction: '西', season: '秋' },
  { id: 'water', name: '水', color: '#3b82f6', direction: '北', season: '冬' },
]

export const ELEMENT_PRODUCTION: Record<string, string> = {
  '木': '火', '火': '土', '土': '金', '金': '水', '水': '木',
}

export const ELEMENT_RESTRICTION: Record<string, string> = {
  '木': '土', '土': '水', '水': '火', '火': '金', '金': '木',
}

export const STEM_COLORS: Record<string, string> = {
  '甲': '#22c55e', '乙': '#16a34a',
  '丙': '#ef4444', '丁': '#dc2626',
  '戊': '#f59e0b', '己': '#d97706',
  '庚': '#94a3b8', '辛': '#cbd5e1',
  '壬': '#3b82f6', '癸': '#2563eb',
}

export const BAZI_MANUAL = {
  title: '滴天髓真诠',
  history: '唐李虚中以年月日三柱论命，宋徐子平加入时柱，遂成四柱八字体系。察五行之衰旺，辨十神之喜忌，推论人一生穷通祸福',
  principles: [
    '以日干为我，定十神六亲',
    '观月令得时，察五行旺相休囚',
    '格局为体，用神为用',
    '大运十年一转，太岁一年一移',
  ],
  patternClassics: [
    '官星怕刑冲害，七杀喜制伏合',
    '财星喜藏不喜露，官星喜露不喜藏',
    '印绶多而聪明，食神多而厚道',
  ],
}
