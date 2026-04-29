export const HEAVENLY_STEMS = [
  { id: 'jia', name: '甲', element: '木', yang: true, number: 1 },
  { id: 'yi', name: '乙', element: '木', yang: false, number: 2 },
  { id: 'bing', name: '丙', element: '火', yang: true, number: 3 },
  { id: 'ding', name: '丁', element: '火', yang: false, number: 4 },
  { id: 'wu', name: '戊', element: '土', yang: true, number: 5 },
  { id: 'ji', name: '己', element: '土', yang: false, number: 6 },
  { id: 'geng', name: '庚', element: '金', yang: true, number: 7 },
  { id: 'xin', name: '辛', element: '金', yang: false, number: 8 },
  { id: 'ren', name: '壬', element: '水', yang: true, number: 9 },
  { id: 'gui', name: '癸', element: '水', yang: false, number: 10 },
]

export const EARTHLY_BRANCHES = [
  { id: 'zi', name: '子', element: '水', yang: true, number: 1, animal: '鼠' },
  { id: 'chou', name: '丑', element: '土', yang: false, number: 2, animal: '牛' },
  { id: 'yin', name: '寅', element: '木', yang: true, number: 3, animal: '虎' },
  { id: 'mao', name: '卯', element: '木', yang: false, number: 4, animal: '兔' },
  { id: 'chen', name: '辰', element: '土', yang: true, number: 5, animal: '龙' },
  { id: 'si', name: '巳', element: '火', yang: false, number: 6, animal: '蛇' },
  { id: 'wu', name: '午', element: '火', yang: true, number: 7, animal: '马' },
  { id: 'wei', name: '未', element: '土', yang: false, number: 8, animal: '羊' },
  { id: 'shen', name: '申', element: '金', yang: true, number: 9, animal: '猴' },
  { id: 'you', name: '酉', element: '金', yang: false, number: 10, animal: '鸡' },
  { id: 'xu', name: '戌', element: '土', yang: true, number: 11, animal: '狗' },
  { id: 'hai', name: '亥', element: '水', yang: false, number: 12, animal: '猪' },
]

export const NAJIA_MAP: Record<string, string[]> = {
  qian: ['ren', 'wu', 'geng', 'ren', 'wu', 'bing'],
  kun: ['gui', 'ji', 'yi', 'ding', 'ji', 'xin'],
  zhen: ['geng', 'ren', 'wu', 'geng', 'ren', 'wu'],
  xun: ['xin', 'gui', 'ji', 'xin', 'gui', 'ji'],
  kan: ['wu', 'geng', 'ren', 'wu', 'geng', 'ren'],
  li: ['ji', 'xin', 'gui', 'ji', 'xin', 'gui'],
  gen: ['bing', 'wu', 'geng', 'bing', 'wu', 'geng'],
  dui: ['ding', 'ji', 'xin', 'ding', 'ji', 'xin'],
}

export const TRIGRAM_BRANCHES: Record<string, string[]> = {
  qian: ['zi', 'yin', 'chen', 'wu', 'shen', 'xu'],
  kun: ['wei', 'si', 'mao', 'chou', 'hai', 'you'],
  zhen: ['zi', 'yin', 'chen', 'wu', 'shen', 'xu'],
  xun: ['chou', 'hai', 'you', 'wei', 'si', 'mao'],
  kan: ['yin', 'chen', 'wu', 'shen', 'xu', 'zi'],
  li: ['chou', 'hai', 'you', 'wei', 'si', 'mao'],
  gen: ['chen', 'wu', 'shen', 'xu', 'zi', 'yin'],
  dui: ['si', 'mao', 'chou', 'hai', 'you', 'wei'],
}

export const SHI_POSITIONS: Record<string, number> = {
  qian: 5, kun: 2,
  zhen: 2, xun: 3,
  kan: 4, li: 0,
  gen: 0, dui: 1,
}

export const SIX_SPIRITS = ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武']

export const SIX_RELATIONS = ['父母', '官鬼', '兄弟', '妻财', '子孙']

export const ELEMENT_GENERATES: Record<string, string> = {
  '金': '水', '水': '木', '木': '火', '火': '土', '土': '金',
}

export const ELEMENT_RESTRICTS: Record<string, string> = {
  '金': '木', '木': '土', '土': '水', '水': '火', '火': '金',
}

export const TRIGRAMS = [
  {
    id: 'qian',
    name: '乾为天',
    binary: [1, 1, 1],
    element: '金',
    palace: '乾',
    number: 1,
  },
  {
    id: 'dui',
    name: '兑为泽',
    binary: [0, 1, 1],
    element: '金',
    palace: '兑',
    number: 2,
  },
  {
    id: 'li',
    name: '离为火',
    binary: [1, 0, 1],
    element: '火',
    palace: '离',
    number: 3,
  },
  {
    id: 'zhen',
    name: '震为雷',
    binary: [0, 0, 1],
    element: '木',
    palace: '震',
    number: 4,
  },
  {
    id: 'xun',
    name: '巽为风',
    binary: [1, 1, 0],
    element: '木',
    palace: '巽',
    number: 5,
  },
  {
    id: 'kan',
    name: '坎为水',
    binary: [0, 1, 0],
    element: '水',
    palace: '坎',
    number: 6,
  },
  {
    id: 'gen',
    name: '艮为山',
    binary: [1, 0, 0],
    element: '土',
    palace: '艮',
    number: 7,
  },
  {
    id: 'kun',
    name: '坤为地',
    binary: [0, 0, 0],
    element: '土',
    palace: '坤',
    number: 8,
  },
]

export const LIUYAO_MANUAL = {
  title: '火珠林正法',
  history: '汉京房传纳甲筮法，以钱代蓍，后世谓之火珠林。三钱掷六次成卦，装六亲配六神，断天下之事如观火然',
  principles: [
    '卦有八宫，每宫八卦，世应定君臣',
    '爻纳干支，五行生克定六亲',
    '日辰月建司旺衰，动静辨吉凶',
    '占事先看用神，次观原神忌神仇神',
  ],
  useGodMap: {
    '功名官运': '官鬼',
    '财运生意': '妻财',
    '考试升学': '父母',
    '疾病医药': '子孙、官鬼',
    '行人出行': '父母、妻财',
    '失物寻物': '妻财、官鬼',
    '婚姻感情': '妻财、官鬼',
    '官司诉讼': '官鬼、父母',
  },
}
