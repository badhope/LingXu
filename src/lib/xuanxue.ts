/**
 * 灵墟 - 玄学计算核心库
 * LingXu - Metaphysics Calculation Core Library
 * 
 * 包含八字、六爻、易经、符箓等核心计算逻辑
 */

// ==================== 基础常量 ====================

export const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const
export const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const
export const SHENGXIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'] as const

export const WUXING = {
  JIA: '木', YI: '木', BING: '火', DING: '火', WU: '土',
  JI: '土', GENG: '金', XIN: '金', REN: '水', GUI: '水'
} as const

export const WUXING_NAYIN = [
  '海中金', '炉中火', '大林木', '路旁土', '剑锋金', '山头火',
  '涧下水', '城头土', '白蜡金', '杨柳木', '泉中水', '屋上土',
  '霹雳火', '松柏木', '长流水', '砂中金', '山下火', '平地木',
  '壁上土', '金箔金', '覆灯火', '天河水', '大驿土', '钗钏金',
  '桑柘木', '大溪水', '砂中土', '天上火', '石榴木', '大海水'
] as const

export const SHIER_CHANGSHENG = [
  '长生', '沐浴', '冠带', '临官', '帝旺', '衰',
  '病', '死', '墓', '绝', '胎', '养'
] as const

// ==================== 八字计算 ====================

export interface BaziResult {
  year: { gan: string; zhi: string; nayin: string; xing: string }
  month: { gan: string; zhi: string; nayin: string; xing: string }
  day: { gan: string; zhi: string; nayin: string; xing: string }
  hour: { gan: string; zhi: string; nayin: string; xing: string }
  shengxiao: string
  xingzuo: string
  wuxing: { count: Record<string, number>; missing: string[] }
  nayan: string
  analysis: {
    dayMaster: string
    dayMasterWuxing: string
    strength: string
    pattern: string
  }
}

export function getYearGanZhi(year: number): { gan: string; zhi: string } {
  const ganIndex = ((year - 4) % 10 + 10) % 10
  const zhiIndex = ((year - 4) % 12 + 12) % 12
  return {
    gan: TIANGAN[ganIndex],
    zhi: DIZHI[zhiIndex]
  }
}

export function getMonthGanZhi(year: number, month: number): { gan: string; zhi: string } {
  const yearGan = TIANGAN[((year - 4) % 10 + 10) % 10]
  const monthZhi = DIZHI[(month + 1) % 12]
  
  const ganMap: Record<string, number> = {
    '甲': 2, '己': 2,
    '乙': 4, '庚': 4,
    '丙': 6, '辛': 6,
    '丁': 8, '壬': 8,
    '戊': 0, '癸': 0
  }
  
  const baseGan = ganMap[yearGan] || 2
  const ganIndex = (baseGan + month - 1) % 10
  
  return {
    gan: TIANGAN[ganIndex],
    zhi: monthZhi
  }
}

export function getDayGanZhi(year: number, month: number, day: number): { gan: string; zhi: string } {
  const baseDate = new Date(1900, 0, 31)
  const targetDate = new Date(year, month - 1, day)
  const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))
  
  const ganIndex = ((diffDays % 10) + 10) % 10
  const zhiIndex = ((diffDays % 12) + 12) % 12
  
  return {
    gan: TIANGAN[ganIndex],
    zhi: DIZHI[zhiIndex]
  }
}

export function getHourGanZhi(dayGan: string, hour: number): { gan: string; zhi: string } {
  const zhiIndex = Math.floor((hour + 1) / 2) % 12
  const timeZhi = DIZHI[zhiIndex]
  
  const ganMap: Record<string, number> = {
    '甲': 0, '己': 0,
    '乙': 2, '庚': 2,
    '丙': 4, '辛': 4,
    '丁': 6, '壬': 6,
    '戊': 8, '癸': 8
  }
  
  const baseGan = ganMap[dayGan] || 0
  const ganIndex = (baseGan + zhiIndex) % 10
  
  return {
    gan: TIANGAN[ganIndex],
    zhi: timeZhi
  }
}

export function getNayin(gan: string, zhi: string): string {
  const ganIndex = TIANGAN.indexOf(gan as any)
  const zhiIndex = DIZHI.indexOf(zhi as any)
  const nayanIndex = Math.floor((ganIndex % 10 + zhiIndex) / 2) % 30
  return WUXING_NAYIN[nayanIndex]
}

export function getWuxingFromGan(gan: string): string {
  const index = TIANGAN.indexOf(gan as any)
  if (index === -1) return '土'
  return Object.values(WUXING)[index]
}

export function getWuxingFromZhi(zhi: string): string {
  const zhiWuxing: Record<string, string> = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火',
    '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
  }
  return zhiWuxing[zhi] || '土'
}

export function calculateBazi(
  year: number,
  month: number,
  day: number,
  hour: number
): BaziResult {
  const yearGZ = getYearGanZhi(year)
  const monthGZ = getMonthGanZhi(year, month)
  const dayGZ = getDayGanZhi(year, month, day)
  const hourGZ = getHourGanZhi(dayGZ.gan, hour)
  
  const wuxingCount: Record<string, number> = {
    '金': 0, '木': 0, '水': 0, '火': 0, '土': 0
  }
  
  const allChars = [
    yearGZ.gan, yearGZ.zhi,
    monthGZ.gan, monthGZ.zhi,
    dayGZ.gan, dayGZ.zhi,
    hourGZ.gan, hourGZ.zhi
  ]
  
  allChars.forEach((char, index) => {
    const wuxing = index % 2 === 0 ? getWuxingFromGan(char) : getWuxingFromZhi(char)
    wuxingCount[wuxing]++
  })
  
  const missing = Object.entries(wuxingCount)
    .filter(([_, count]) => count === 0)
    .map(([wuxing]) => wuxing)
  
  const shengxiao = SHENGXIAO[((year - 4) % 12 + 12) % 12]
  
  const xingzuo = getZodiac(month, day)
  
  const dayMasterWuxing = getWuxingFromGan(dayGZ.gan)
  
  const strength = calculateDayMasterStrength(wuxingCount, dayMasterWuxing)
  
  const pattern = analyzePattern(dayGZ, wuxingCount, dayMasterWuxing)
  
  return {
    year: {
      gan: yearGZ.gan,
      zhi: yearGZ.zhi,
      nayin: getNayin(yearGZ.gan, yearGZ.zhi),
      xing: getWuxingFromGan(yearGZ.gan)
    },
    month: {
      gan: monthGZ.gan,
      zhi: monthGZ.zhi,
      nayin: getNayin(monthGZ.gan, monthGZ.zhi),
      xing: getWuxingFromGan(monthGZ.gan)
    },
    day: {
      gan: dayGZ.gan,
      zhi: dayGZ.zhi,
      nayin: getNayin(dayGZ.gan, dayGZ.zhi),
      xing: getWuxingFromGan(dayGZ.gan)
    },
    hour: {
      gan: hourGZ.gan,
      zhi: hourGZ.zhi,
      nayin: getNayin(hourGZ.gan, hourGZ.zhi),
      xing: getWuxingFromGan(hourGZ.gan)
    },
    shengxiao,
    xingzuo,
    wuxing: {
      count: wuxingCount,
      missing
    },
    nayan: getNayin(yearGZ.gan, yearGZ.zhi),
    analysis: {
      dayMaster: dayGZ.gan,
      dayMasterWuxing,
      strength,
      pattern
    }
  }
}

function calculateDayMasterStrength(
  wuxingCount: Record<string, number>,
  dayMasterWuxing: string
): string {
  const wuxingSheng: Record<string, string> = { '木': '水', '火': '木', '土': '火', '金': '土', '水': '金' }
  const wuxingKe: Record<string, string> = { '木': '金', '火': '水', '土': '木', '金': '火', '水': '土' }
  
  const shengWo = wuxingSheng[dayMasterWuxing]
  const woSheng = getWoSheng(dayMasterWuxing)
  const keWo = wuxingKe[dayMasterWuxing]
  const woKe = getWoKe(dayMasterWuxing)
  
  const helpScore = wuxingCount[dayMasterWuxing] + wuxingCount[shengWo] * 0.8
  const attackScore = wuxingCount[keWo] + wuxingCount[woSheng] * 0.3
  
  const ratio = helpScore / (attackScore + 0.1)
  
  if (ratio > 2) return '身旺'
  if (ratio > 1.2) return '偏旺'
  if (ratio > 0.8) return '中和'
  if (ratio > 0.5) return '偏弱'
  return '身弱'
}

function getWoSheng(wuxing: string): string {
  const map: Record<string, string> = {
    '木': '火', '火': '土', '土': '金', '金': '水', '水': '木'
  }
  return map[wuxing]
}

function getWoKe(wuxing: string): string {
  const map: Record<string, string> = {
    '木': '土', '火': '金', '土': '水', '金': '木', '水': '火'
  }
  return map[wuxing]
}

function analyzePattern(
  dayGZ: { gan: string; zhi: string },
  wuxingCount: Record<string, number>,
  dayMasterWuxing: string
): string {
  const maxWuxing = Object.entries(wuxingCount)
    .sort((a, b) => b[1] - a[1])[0][0]
  
  if (maxWuxing === dayMasterWuxing) {
    return '比劫格'
  }
  
  const shengWo: Record<string, string> = { '木': '水', '火': '木', '土': '火', '金': '土', '水': '金' }
  if (maxWuxing === shengWo[dayMasterWuxing]) {
    return '印格'
  }
  
  const woSheng = getWoSheng(dayMasterWuxing)
  if (maxWuxing === woSheng) {
    return '食伤格'
  }
  
  const woKe = getWoKe(dayMasterWuxing)
  if (maxWuxing === woKe) {
    return '财格'
  }
  
  return '官杀格'
}

function getZodiac(month: number, day: number): string {
  const zodiacs = [
    { name: '摩羯座', start: [1, 1], end: [1, 19] },
    { name: '水瓶座', start: [1, 20], end: [2, 18] },
    { name: '双鱼座', start: [2, 19], end: [3, 20] },
    { name: '白羊座', start: [3, 21], end: [4, 19] },
    { name: '金牛座', start: [4, 20], end: [5, 20] },
    { name: '双子座', start: [5, 21], end: [6, 21] },
    { name: '巨蟹座', start: [6, 22], end: [7, 22] },
    { name: '狮子座', start: [7, 23], end: [8, 22] },
    { name: '处女座', start: [8, 23], end: [9, 22] },
    { name: '天秤座', start: [9, 23], end: [10, 23] },
    { name: '天蝎座', start: [10, 24], end: [11, 22] },
    { name: '射手座', start: [11, 23], end: [12, 21] },
    { name: '摩羯座', start: [12, 22], end: [12, 31] },
  ]
  
  for (const z of zodiacs) {
    if (
      (month === z.start[0] && day >= z.start[1]) ||
      (month === z.end[0] && day <= z.end[1])
    ) {
      return z.name
    }
  }
  return '摩羯座'
}

// ==================== 六爻占卜 ====================

export interface LiuyaoResult {
  gua: {
    name: string
    upperGua: string
    lowerGua: string
    yao: number[]
  }
  bianGua?: {
    name: string
    upperGua: string
    lowerGua: string
  }
  analysis: {
    shiYao: number
    yingYao: number
    liuQin: string[]
    wuxing: string[]
  }
  interpretation: string
}

export const BAGUA = {
  QIAN: { name: '乾', symbol: '☰', yao: [1, 1, 1], wuxing: '金' },
  KUN: { name: '坤', symbol: '☷', yao: [0, 0, 0], wuxing: '土' },
  ZHEN: { name: '震', symbol: '☳', yao: [0, 0, 1], wuxing: '木' },
  XUN: { name: '巽', symbol: '☴', yao: [1, 1, 0], wuxing: '木' },
  KAN: { name: '坎', symbol: '☵', yao: [0, 1, 0], wuxing: '水' },
  LI: { name: '离', symbol: '☲', yao: [1, 0, 1], wuxing: '火' },
  GEN: { name: '艮', symbol: '☶', yao: [1, 0, 0], wuxing: '土' },
  DUI: { name: '兑', symbol: '☱', yao: [0, 1, 1], wuxing: '金' }
} as const

export function castLiuyao(): number[] {
  const yao: number[] = []
  for (let i = 0; i < 6; i++) {
    const coins = Array.from({ length: 3 }, () => Math.random() > 0.5 ? 1 : 0)
    const sum = coins.reduce((a: number, b: number) => a + b, 0)
    if (sum === 0) yao.push(6)
    else if (sum === 3) yao.push(9)
    else if (sum === 1) yao.push(7)
    else yao.push(8)
  }
  return yao
}

export function analyzeLiuyao(yao: number[]): LiuyaoResult {
  const lowerYao = yao.slice(0, 3).map(y => y % 2 === 1 ? 1 : 0)
  const upperYao = yao.slice(3, 6).map(y => y % 2 === 1 ? 1 : 0)
  
  const lowerGua = identifyGua(lowerYao)
  const upperGua = identifyGua(upperYao)
  
  const guaName = upperGua.name + lowerGua.name
  
  const bianYao = yao.map(y => {
    if (y === 6) return 1
    if (y === 9) return 0
    return y % 2 === 1 ? 1 : 0
  })
  
  let bianGua = undefined
  if (yao.some(y => y === 6 || y === 9)) {
    const bianLowerYao = bianYao.slice(0, 3)
    const bianUpperYao = bianYao.slice(3, 6)
    bianGua = {
      name: identifyGua(bianUpperYao).name + identifyGua(bianLowerYao).name,
      upperGua: identifyGua(bianUpperYao).name,
      lowerGua: identifyGua(bianLowerYao).name
    }
  }
  
  const shiYao = findShiYao(upperGua.name, lowerGua.name)
  const yingYao = (shiYao + 3) % 6
  
  const interpretation = interpretLiuyao(guaName, yao, bianGua)
  
  return {
    gua: {
      name: guaName,
      upperGua: upperGua.name,
      lowerGua: lowerGua.name,
      yao
    },
    bianGua,
    analysis: {
      shiYao,
      yingYao,
      liuQin: calculateLiuQin(yao, shiYao),
      wuxing: calculateYaoWuxing(yao)
    },
    interpretation
  }
}

function identifyGua(yao: number[]): { name: string; symbol: string; wuxing: string } {
  const guas = Object.values(BAGUA)
  for (const gua of guas) {
    if (JSON.stringify(gua.yao) === JSON.stringify(yao)) {
      return gua
    }
  }
  return BAGUA.QIAN
}

function findShiYao(upperGua: string, lowerGua: string): number {
  const guaPositions: Record<string, number> = {
    '乾乾': 5, '坤坤': 4, '震震': 3, '巽巽': 0,
    '坎坎': 2, '离离': 5, '艮艮': 3, '兑兑': 1
  }
  
  const key = upperGua + lowerGua
  return guaPositions[key] ?? 5
}

function calculateLiuQin(yao: number[], shiYao: number): string[] {
  const liuQin = ['父母', '兄弟', '子孙', '妻财', '官鬼']
  return yao.map((_, i) => {
    const offset = (i - shiYao + 5) % 5
    return liuQin[offset]
  })
}

function calculateYaoWuxing(yao: number[]): string[] {
  const wuxing = ['水', '木', '火', '土', '金']
  return yao.map((_, i) => wuxing[i % 5])
}

function interpretLiuyao(
  guaName: string,
  yao: number[],
  bianGua?: { name: string; upperGua: string; lowerGua: string }
): string {
  const interpretations: Record<string, string> = {
    '乾乾': '天行健，君子以自强不息。此卦主大吉，诸事顺遂。',
    '坤坤': '地势坤，君子以厚德载物。此卦主吉，宜守不宜进。',
    '坎坎': '习坎，有孚维心亨。此卦主险，需谨慎行事。',
    '离离': '明两作离，大人以继明照于四方。此卦主光明，事业有成。'
  }
  
  let result = interpretations[guaName] || '此卦需要综合分析，请参考卦象详解。'
  
  if (bianGua) {
    result += `\n\n变卦为${bianGua.name}，表示事物的发展方向。`
  }
  
  const movingYao = yao.filter(y => y === 6 || y === 9).length
  if (movingYao > 0) {
    result += `\n\n共有${movingYao}个动爻，变化较大。`
  }
  
  return result
}

// ==================== 易经卦象 ====================

export interface YijingGua {
  num: number
  name: string
  upperGua: string
  lowerGua: string
  meaning: string
  xiang: string
  ci: string
  yao: string[]
}

export const LIUSHISI_GUA: YijingGua[] = [
  {
    num: 1,
    name: '乾',
    upperGua: '乾',
    lowerGua: '乾',
    meaning: '元亨利贞',
    xiang: '天行健，君子以自强不息',
    ci: '乾：元，亨，利，贞。',
    yao: [
      '初九：潜龙勿用。',
      '九二：见龙在田，利见大人。',
      '九三：君子终日乾乾，夕惕若，厉无咎。',
      '九四：或跃在渊，无咎。',
      '九五：飞龙在天，利见大人。',
      '上九：亢龙有悔。'
    ]
  },
  {
    num: 2,
    name: '坤',
    upperGua: '坤',
    lowerGua: '坤',
    meaning: '元亨利牝马之贞',
    xiang: '地势坤，君子以厚德载物',
    ci: '坤：元，亨，利牝马之贞。君子有攸往，先迷后得主，利西南得朋，东北丧朋。安贞，吉。',
    yao: [
      '初六：履霜，坚冰至。',
      '六二：直，方，大，不习无不利。',
      '六三：含章可贞。或从王事，无成有终。',
      '六四：括囊，无咎，无誉。',
      '六五：黄裳，元吉。',
      '上六：龙战于野，其血玄黄。'
    ]
  },
  {
    num: 3,
    name: '屯',
    upperGua: '坎',
    lowerGua: '震',
    meaning: '元亨利贞，勿用有攸往',
    xiang: '云雷屯，君子以经纶',
    ci: '屯：元，亨，利，贞，勿用，有攸往，利建侯。',
    yao: [
      '初九：磐桓，利居贞，利建侯。',
      '六二：屯如邅如，乘马班如。匪寇婚媾，女子贞不字，十年乃字。',
      '六三：即鹿无虞，惟入于林中，君子几不如舍，往吝。',
      '六四：乘马班如，求婚媾，往吉，无不利。',
      '九五：屯其膏，小贞吉，大贞凶。',
      '上六：乘马班如，泣血涟如。'
    ]
  },
  {
    num: 4,
    name: '蒙',
    upperGua: '艮',
    lowerGua: '坎',
    meaning: '亨，匪我求童蒙，童蒙求我',
    xiang: '山下出泉，蒙，君子以果行育德',
    ci: '蒙：亨。匪我求童蒙，童蒙求我。初噬告，再三渎，渎则不告。利贞。',
    yao: [
      '初六：发蒙，利用刑人，用说桎梏，以往吝。',
      '九二：包蒙吉，纳妇吉，子克家。',
      '六三：勿用取女，见金夫，不有躬，无攸利。',
      '六四：困蒙，吝。',
      '六五：童蒙，吉。',
      '上九：击蒙，不利为寇，利御寇。'
    ]
  },
  {
    num: 5,
    name: '需',
    upperGua: '坎',
    lowerGua: '乾',
    meaning: '有孚，光亨，贞吉',
    xiang: '云上于天，需，君子以饮食宴乐',
    ci: '需：有孚，光亨，贞吉。利涉大川。',
    yao: [
      '初九：需于郊，利用恒，无咎。',
      '九二：需于沙，小有言，终吉。',
      '九三：需于泥，致寇至。',
      '六四：需于血，出自穴。',
      '九五：需于酒食，贞吉。',
      '上六：入于穴，有不速之客三人来，敬之终吉。'
    ]
  },
  {
    num: 6,
    name: '讼',
    upperGua: '乾',
    lowerGua: '坎',
    meaning: '有孚，窒惕，中吉终凶',
    xiang: '天与水违行，讼，君子以作事谋始',
    ci: '讼：有孚，窒。惕，中吉，终凶。利见大人，不利涉大川。',
    yao: [
      '初六：不永所事，小有言，终吉。',
      '九二：不克讼，归而逋，其邑人三百户，无眚。',
      '六三：食旧德，贞厉，终吉，或从王事，无成。',
      '九四：不克讼，复即命，渝安贞，吉。',
      '九五：讼，元吉。',
      '上九：或锡之鞶带，终朝三褫之。'
    ]
  }
]

export function getRandomGua(): YijingGua {
  return LIUSHISI_GUA[Math.floor(Math.random() * LIUSHISI_GUA.length)]
}

export function getGuaByNum(num: number): YijingGua | undefined {
  return LIUSHISI_GUA.find(g => g.num === num)
}

export function getGuaByName(name: string): YijingGua | undefined {
  return LIUSHISI_GUA.find(g => g.name === name)
}

// ==================== 符箓生成 ====================

export interface FuluDesign {
  name: string
  type: string
  elements: {
    center: string
    top: string
    bottom: string
    left: string
    right: string
  }
  mantra: string
  usage: string
  power: number
}

export const FULU_TYPES = [
  { type: '镇宅', desc: '镇宅辟邪，保家宅平安' },
  { type: '招财', desc: '招财进宝，财运亨通' },
  { type: '护身', desc: '护身保平安，驱邪避凶' },
  { type: '催桃花', desc: '催旺桃花运，增进姻缘' },
  { type: '化煞', desc: '化解煞气，转凶为吉' },
  { type: '祈福', desc: '祈福纳祥，心想事成' }
] as const

export function generateFulu(type: string, intention: string): FuluDesign {
  const centerSymbols = ['☯', '☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷', '符']
  const topSymbols = ['天', '日', '月', '星', '雷', '电', '风', '云']
  const bottomSymbols = ['地', '山', '水', '火', '木', '金', '土', '石']
  const leftSymbols = ['神', '仙', '佛', '圣', '灵', '真', '玄', '妙']
  const rightSymbols = ['令', '敕', '召', '请', '降', '镇', '安', '护']
  
  const mantras = [
    '太上老君急急如律令',
    '天地玄宗万气本根',
    '九天应元雷声普化天尊',
    '太乙救苦天尊',
    '元始安镇普告万灵'
  ]
  
  const power = Math.floor(Math.random() * 100) + 1
  
  return {
    name: `${type}符`,
    type,
    elements: {
      center: centerSymbols[Math.floor(Math.random() * centerSymbols.length)],
      top: topSymbols[Math.floor(Math.random() * topSymbols.length)],
      bottom: bottomSymbols[Math.floor(Math.random() * bottomSymbols.length)],
      left: leftSymbols[Math.floor(Math.random() * leftSymbols.length)],
      right: rightSymbols[Math.floor(Math.random() * rightSymbols.length)]
    },
    mantra: mantras[Math.floor(Math.random() * mantras.length)],
    usage: `此符用于${type}，使用时需心诚专注，配合咒语使用效果更佳。`,
    power
  }
}

// ==================== 大运流年 ====================

export interface DayunResult {
  currentAge: number
  dayun: Array<{
    age: [number, number]
    gan: string
    zhi: string
    wuxing: string
    description: string
  }>
  liunian: Array<{
    year: number
    gan: string
    zhi: string
    wuxing: string
    description: string
  }>
}

export function calculateDayun(
  birthYear: number,
  gender: '男' | '女',
  monthGan: string
): DayunResult {
  const dayunCount = 8
  const dayunYears = 10
  const currentYear = new Date().getFullYear()
  const currentAge = currentYear - birthYear
  
  const dayun = []
  const ganIndex = TIANGAN.indexOf(monthGan as any)
  
  for (let i = 0; i < dayunCount; i++) {
    const startAge = i * dayunYears + 1
    const endAge = (i + 1) * dayunYears
    const gan = TIANGAN[(ganIndex + i + 1) % 10]
    const zhi = DIZHI[(ganIndex + i + 1) % 12]
    const wuxing = getWuxingFromGan(gan)
    
    dayun.push({
      age: [startAge, endAge] as [number, number],
      gan,
      zhi,
      wuxing,
      description: getDayunDescription(gan, zhi)
    })
  }
  
  const liunian = []
  for (let i = 0; i < 10; i++) {
    const year = currentYear + i
    const gan = TIANGAN[(year - 4) % 10]
    const zhi = DIZHI[(year - 4) % 12]
    const wuxing = getWuxingFromGan(gan)
    
    liunian.push({
      year,
      gan,
      zhi,
      wuxing,
      description: getLiunianDescription(gan, zhi)
    })
  }
  
  return {
    currentAge,
    dayun,
    liunian
  }
}

function getDayunDescription(gan: string, zhi: string): string {
  const descriptions: Record<string, string> = {
    '甲子': '文昌运旺，学业事业双丰收',
    '乙丑': '财运亨通，贵人相助',
    '丙寅': '事业有成，名声大振',
    '丁卯': '桃花运旺，感情顺利',
    '戊辰': '财运稳定，积蓄增加'
  }
  
  return descriptions[gan + zhi] || '运势平稳，需把握机遇'
}

function getLiunianDescription(gan: string, zhi: string): string {
  const descriptions: Record<string, string> = {
    '甲子': '今年运势较好，适合开拓新事业',
    '乙丑': '财运不错，投资需谨慎',
    '丙寅': '事业上升期，把握机会',
    '丁卯': '感情运势佳，单身者有望脱单',
    '戊辰': '财运稳定，适合储蓄'
  }
  
  return descriptions[gan + zhi] || '运势平稳，稳中求进'
}

// ==================== 导出 ====================

const XuanxueLib = {
  TIANGAN,
  DIZHI,
  SHENGXIAO,
  WUXING,
  WUXING_NAYIN,
  SHIER_CHANGSHENG,
  BAGUA,
  LIUSHISI_GUA,
  FULU_TYPES,
  calculateBazi,
  getYearGanZhi,
  getMonthGanZhi,
  getDayGanZhi,
  getHourGanZhi,
  getNayin,
  getWuxingFromGan,
  getWuxingFromZhi,
  castLiuyao,
  analyzeLiuyao,
  getRandomGua,
  getGuaByNum,
  getGuaByName,
  generateFulu,
  calculateDayun
}

export default XuanxueLib
