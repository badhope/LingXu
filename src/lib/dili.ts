/**
 * 灵墟 - 地理计算核心库
 * LingXu - Geography Calculation Core Library
 * 
 * 包含风水、龙脉、罗盘、地灵等核心计算逻辑
 */

// ==================== 罗盘系统 ====================

export interface LuopanResult {
  direction: string
  degree: number
  gua: string
  wuxing: string
  jiXiong: '吉' | '凶' | '平'
  description: string
  suggestions: string[]
}

export const TWENTY_FOUR_MOUNTAINS = [
  { name: '子', degree: 0, gua: '坎', wuxing: '水', direction: '正北' },
  { name: '癸', degree: 15, gua: '坎', wuxing: '水', direction: '北偏东' },
  { name: '丑', degree: 30, gua: '艮', wuxing: '土', direction: '东北偏北' },
  { name: '艮', degree: 45, gua: '艮', wuxing: '土', direction: '东北' },
  { name: '寅', degree: 60, gua: '艮', wuxing: '木', direction: '东北偏东' },
  { name: '甲', degree: 75, gua: '震', wuxing: '木', direction: '东偏北' },
  { name: '卯', degree: 90, gua: '震', wuxing: '木', direction: '正东' },
  { name: '乙', degree: 105, gua: '震', wuxing: '木', direction: '东偏南' },
  { name: '辰', degree: 120, gua: '巽', wuxing: '土', direction: '东南偏东' },
  { name: '巽', degree: 135, gua: '巽', wuxing: '木', direction: '东南' },
  { name: '巳', degree: 150, gua: '巽', wuxing: '火', direction: '东南偏南' },
  { name: '丙', degree: 165, gua: '离', wuxing: '火', direction: '南偏东' },
  { name: '午', degree: 180, gua: '离', wuxing: '火', direction: '正南' },
  { name: '丁', degree: 195, gua: '离', wuxing: '火', direction: '南偏西' },
  { name: '未', degree: 210, gua: '坤', wuxing: '土', direction: '西南偏南' },
  { name: '坤', degree: 225, gua: '坤', wuxing: '土', direction: '西南' },
  { name: '申', degree: 240, gua: '坤', wuxing: '金', direction: '西南偏西' },
  { name: '庚', degree: 255, gua: '兑', wuxing: '金', direction: '西偏南' },
  { name: '酉', degree: 270, gua: '兑', wuxing: '金', direction: '正西' },
  { name: '辛', degree: 285, gua: '兑', wuxing: '金', direction: '西偏北' },
  { name: '戌', degree: 300, gua: '乾', wuxing: '土', direction: '西北偏西' },
  { name: '乾', degree: 315, gua: '乾', wuxing: '金', direction: '西北' },
  { name: '亥', degree: 330, gua: '乾', wuxing: '水', direction: '西北偏北' },
  { name: '壬', degree: 345, gua: '坎', wuxing: '水', direction: '北偏西' }
] as const

export function calculateLuopan(degree: number): LuopanResult {
  const normalizedDegree = ((degree % 360) + 360) % 360
  
  let closestMountain: typeof TWENTY_FOUR_MOUNTAINS[number] = TWENTY_FOUR_MOUNTAINS[0]
  let minDiff = 360
  
  for (const mountain of TWENTY_FOUR_MOUNTAINS) {
    const diff = Math.min(
      Math.abs(normalizedDegree - mountain.degree),
      360 - Math.abs(normalizedDegree - mountain.degree)
    )
    if (diff < minDiff) {
      minDiff = diff
      closestMountain = mountain
    }
  }
  
  const jiXiong = calculateJiXiong(closestMountain.name, normalizedDegree)
  const description = getDirectionDescription(closestMountain.name, jiXiong)
  const suggestions = getSuggestions(closestMountain.name, jiXiong)
  
  return {
    direction: closestMountain.direction,
    degree: normalizedDegree,
    gua: closestMountain.gua,
    wuxing: closestMountain.wuxing,
    jiXiong,
    description,
    suggestions
  }
}

function calculateJiXiong(mountain: string, degree: number): '吉' | '凶' | '平' {
  const jiMountains = ['乾', '坤', '艮', '巽', '子', '午', '卯', '酉']
  const xiongMountains = ['癸', '丁', '庚', '辛']
  
  if (jiMountains.includes(mountain)) return '吉'
  if (xiongMountains.includes(mountain)) return '凶'
  return '平'
}

function getDirectionDescription(mountain: string, jiXiong: '吉' | '凶' | '平'): string {
  const descriptions: Record<string, Record<string, string>> = {
    '吉': {
      '乾': '乾方为天门，主贵气、权威、事业。适合办公、书房。',
      '坤': '坤方为地户，主财运、稳定、和谐。适合卧室、客厅。',
      '艮': '艮方为山，主文昌、学业、贵人。适合书房、儿童房。',
      '巽': '巽方为风，主财运、人缘、贵人。适合客厅、餐厅。',
      '子': '子方为正北，主事业、贵人。适合办公室、书房。',
      '午': '午方为正南，主名声、事业。适合客厅、办公室。',
      '卯': '卯方为正东，主健康、事业。适合卧室、客厅。',
      '酉': '酉方为正西，主财运、桃花。适合卧室、餐厅。'
    },
    '凶': {
      '癸': '癸方易招是非，需谨慎使用。',
      '丁': '丁方易生口舌，不宜久居。',
      '庚': '庚方易有意外，需化解。',
      '辛': '辛方易破财，需注意。'
    },
    '平': {
      'default': '此方运势平稳，可根据实际情况灵活使用。'
    }
  }
  
  return descriptions[jiXiong][mountain] || descriptions['平']['default']
}

function getSuggestions(mountain: string, jiXiong: '吉' | '凶' | '平'): string[] {
  if (jiXiong === '吉') {
    return [
      '此方位适合长期使用',
      '可在此方位放置风水物品增强运势',
      '适合作为主要活动区域'
    ]
  } else if (jiXiong === '凶') {
    return [
      '建议避免在此方位长期停留',
      '可使用风水物品化解',
      '不宜作为卧室或办公室'
    ]
  } else {
    return [
      '此方位运势平稳',
      '可根据需要灵活使用',
      '适当布置可提升运势'
    ]
  }
}

// ==================== 风水分析 ====================

export interface FengshuiAnalysis {
  overall: number
  aspects: {
    name: string
    score: number
    description: string
    suggestions: string[]
  }[]
  elements: {
    name: string
    strength: number
    balance: string
  }[]
  recommendations: string[]
}

export function analyzeFengshui(
  houseData: {
    facing: number
    builtYear: number
    floors: number
    rooms: {
      type: 'bedroom' | 'living' | 'kitchen' | 'bathroom' | 'study'
      position: { x: number; y: number }
      area: number
    }[]
    surroundings: {
      type: 'mountain' | 'water' | 'road' | 'building' | 'park'
      direction: number
      distance: number
    }[]
  }
): FengshuiAnalysis {
  const aspects: FengshuiAnalysis['aspects'] = []
  
  const facingScore = calculateFacingScore(houseData.facing)
  aspects.push({
    name: '朝向',
    score: facingScore,
    description: getFacingDescription(houseData.facing),
    suggestions: getFacingSuggestions(houseData.facing)
  })
  
  const layoutScore = calculateLayoutScore(houseData.rooms)
  aspects.push({
    name: '格局',
    score: layoutScore,
    description: getLayoutDescription(houseData.rooms),
    suggestions: getLayoutSuggestions(houseData.rooms)
  })
  
  const surroundingsScore = calculateSurroundingsScore(houseData.surroundings)
  aspects.push({
    name: '环境',
    score: surroundingsScore,
    description: getSurroundingsDescription(houseData.surroundings),
    suggestions: getSurroundingsSuggestions(houseData.surroundings)
  })
  
  const elements = analyzeElements(houseData)
  
  const overall = Math.round(
    aspects.reduce((sum, a) => sum + a.score, 0) / aspects.length
  )
  
  const recommendations = generateRecommendations(aspects, elements)
  
  return {
    overall,
    aspects,
    elements,
    recommendations
  }
}

function calculateFacingScore(facing: number): number {
  const goodFacings = [180, 135, 225, 90]
  const badFacings = [0, 45, 315]
  
  const normalizedFacing = ((facing % 360) + 360) % 360
  
  for (const good of goodFacings) {
    if (Math.abs(normalizedFacing - good) < 22.5) return 85
  }
  
  for (const bad of badFacings) {
    if (Math.abs(normalizedFacing - bad) < 22.5) return 45
  }
  
  return 70
}

function getFacingDescription(facing: number): string {
  const descriptions: Record<string, string> = {
    '0': '坐北朝南，传统吉向，冬暖夏凉。',
    '90': '坐西朝东，紫气东来，适合办公。',
    '180': '坐南朝北，采光充足，适合居住。',
    '270': '坐东朝西，下午阳光充足。'
  }
  
  const normalizedFacing = Math.round(facing / 90) * 90
  return descriptions[normalizedFacing.toString()] || '朝向一般，可根据实际情况调整。'
}

function getFacingSuggestions(facing: number): string[] {
  return [
    '可在门口放置绿色植物增强生气',
    '保持门口整洁明亮',
    '避免门口正对电梯或楼梯'
  ]
}

function calculateLayoutScore(rooms: any[]): number {
  if (rooms.length === 0) return 50
  
  let score = 70
  
  const hasBedroom = rooms.some(r => r.type === 'bedroom')
  const hasLiving = rooms.some(r => r.type === 'living')
  const hasKitchen = rooms.some(r => r.type === 'kitchen')
  
  if (hasBedroom && hasLiving && hasKitchen) score += 10
  if (rooms.some(r => r.type === 'study')) score += 5
  
  return Math.min(100, score)
}

function getLayoutDescription(rooms: any[]): string {
  const roomTypes = rooms.map(r => r.type)
  const hasAll = ['bedroom', 'living', 'kitchen'].every(t => roomTypes.includes(t))
  
  if (hasAll) return '格局完整，功能齐全。'
  return '格局有待改善，建议调整房间布局。'
}

function getLayoutSuggestions(rooms: any[]): string[] {
  return [
    '卧室宜安静，远离厨房和卫生间',
    '客厅宜宽敞明亮，便于聚气',
    '书房宜在文昌位，利于学业事业'
  ]
}

function calculateSurroundingsScore(surroundings: any[]): number {
  if (surroundings.length === 0) return 70
  
  let score = 70
  
  for (const s of surroundings) {
    if (s.type === 'water' && s.distance < 500) score += 10
    if (s.type === 'park' && s.distance < 500) score += 8
    if (s.type === 'mountain' && s.distance < 1000) score += 5
    if (s.type === 'road' && s.distance < 50) score -= 5
  }
  
  return Math.min(100, Math.max(0, score))
}

function getSurroundingsDescription(surroundings: any[]): string {
  if (surroundings.length === 0) return '周围环境信息不足。'
  
  const hasWater = surroundings.some(s => s.type === 'water')
  const hasPark = surroundings.some(s => s.type === 'park')
  
  if (hasWater && hasPark) return '周围环境优美，有水有园，风水上佳。'
  if (hasWater) return '周围有水系，财运亨通。'
  if (hasPark) return '周围有公园，环境宜居。'
  
  return '周围环境一般，可通过室内布置改善。'
}

function getSurroundingsSuggestions(surroundings: any[]): string[] {
  return [
    '可在室内摆放水景增强财运',
    '种植绿色植物改善环境',
    '注意避免噪音和污染源'
  ]
}

function analyzeElements(houseData: any): FengshuiAnalysis['elements'] {
  return [
    { name: '木', strength: 70, balance: '适中' },
    { name: '火', strength: 60, balance: '偏弱' },
    { name: '土', strength: 80, balance: '偏旺' },
    { name: '金', strength: 65, balance: '适中' },
    { name: '水', strength: 75, balance: '适中' }
  ]
}

function generateRecommendations(
  aspects: FengshuiAnalysis['aspects'],
  elements: FengshuiAnalysis['elements']
): string[] {
  const recommendations: string[] = []
  
  const weakAspects = aspects.filter(a => a.score < 70)
  for (const aspect of weakAspects) {
    recommendations.push(...aspect.suggestions.slice(0, 2))
  }
  
  const weakElements = elements.filter(e => e.strength < 65)
  for (const element of weakElements) {
    recommendations.push(`建议增强${element.name}元素，如摆放${getElementItem(element.name)}`)
  }
  
  return recommendations.slice(0, 5)
}

function getElementItem(element: string): string {
  const items: Record<string, string> = {
    '木': '绿色植物、木质家具',
    '火': '红色装饰、灯光',
    '土': '陶瓷、黄色装饰',
    '金': '金属装饰、白色物品',
    '水': '鱼缸、水景、蓝色装饰'
  }
  return items[element] || '相应装饰品'
}

// ==================== 龙脉系统 ====================

export interface LongmaiInfo {
  name: string
  type: '主龙' | '支龙' | '潜龙'
  origin: string
  destination: string
  length: number
  spiritPoints: string[]
  description: string
  historicalSites: string[]
}

export const LONGMAI_DATA: LongmaiInfo[] = [
  {
    name: '昆仑龙脉',
    type: '主龙',
    origin: '昆仑山',
    destination: '东海',
    length: 5000,
    spiritPoints: ['昆仑山', '秦岭', '华山', '嵩山', '泰山'],
    description: '中华第一龙脉，万山之祖，龙脉之源。',
    historicalSites: ['昆仑神宫', '秦始皇陵', '华山道观', '嵩山少林', '泰山封禅台']
  },
  {
    name: '南龙',
    type: '主龙',
    origin: '喜马拉雅山',
    destination: '南海',
    length: 4000,
    spiritPoints: ['横断山', '南岭', '武夷山'],
    description: '南方主龙脉，山川秀丽，人杰地灵。',
    historicalSites: ['峨眉山', '武当山', '武夷山', '南岳衡山']
  },
  {
    name: '北龙',
    type: '主龙',
    origin: '阿尔泰山',
    destination: '渤海',
    length: 3500,
    spiritPoints: ['阴山', '燕山', '长白山'],
    description: '北方主龙脉，气势磅礴，帝王之气。',
    historicalSites: ['长城', '北京故宫', '沈阳故宫', '长白山天池']
  },
  {
    name: '中龙',
    type: '支龙',
    origin: '秦岭',
    destination: '长江',
    length: 2000,
    spiritPoints: ['大巴山', '巫山', '武陵山'],
    description: '中部支龙脉，连接南北，贯通东西。',
    historicalSites: ['三峡', '武当山', '神农架', '张家界']
  },
  {
    name: '东海龙脉',
    type: '潜龙',
    origin: '东海海底',
    destination: '沿海诸岛',
    length: 1500,
    spiritPoints: ['舟山群岛', '台湾岛', '海南岛'],
    description: '海底潜龙脉，神秘莫测，灵气充沛。',
    historicalSites: ['普陀山', '阿里山', '五指山']
  }
]

export function getLongmaiByName(name: string): LongmaiInfo | undefined {
  return LONGMAI_DATA.find(l => l.name === name)
}

export function getLongmaiByType(type: '主龙' | '支龙' | '潜龙'): LongmaiInfo[] {
  return LONGMAI_DATA.filter(l => l.type === type)
}

export function findNearestLongmai(latitude: number, longitude: number): LongmaiInfo {
  return LONGMAI_DATA[Math.floor(Math.random() * LONGMAI_DATA.length)]
}

// ==================== 地灵系统 ====================

export interface DiliInfo {
  name: string
  type: '山' | '水' | '洞' | '林' | '城'
  location: {
    province: string
    city: string
    latitude: number
    longitude: number
  }
  lingqi: number
  features: string[]
  legends: string[]
  visiting: {
    bestTime: string
    tips: string[]
  }
}

export const DILI_DATA: DiliInfo[] = [
  {
    name: '泰山',
    type: '山',
    location: {
      province: '山东',
      city: '泰安',
      latitude: 36.25,
      longitude: 117.10
    },
    lingqi: 95,
    features: ['五岳之首', '帝王封禅', '日出奇观'],
    legends: ['碧霞元君', '泰山石敢当', '十八盘传说'],
    visiting: {
      bestTime: '春秋两季',
      tips: ['建议夜爬看日出', '注意保暖', '提前预约门票']
    }
  },
  {
    name: '华山',
    type: '山',
    location: {
      province: '陕西',
      city: '渭南',
      latitude: 34.48,
      longitude: 110.09
    },
    lingqi: 92,
    features: ['奇险天下', '道教圣地', '长空栈道'],
    legends: ['沉香救母', '华山论剑', '陈抟老祖'],
    visiting: {
      bestTime: '春夏秋三季',
      tips: ['注意安全', '量力而行', '带足水和食物']
    }
  },
  {
    name: '峨眉山',
    type: '山',
    location: {
      province: '四川',
      city: '乐山',
      latitude: 29.52,
      longitude: 103.48
    },
    lingqi: 90,
    features: ['佛教圣地', '金顶日出', '峨眉灵猴'],
    legends: ['普贤菩萨道场', '白蛇传', '峨眉派'],
    visiting: {
      bestTime: '春秋两季',
      tips: ['注意猴子', '带雨具', '尊重佛教礼仪']
    }
  },
  {
    name: '西湖',
    type: '水',
    location: {
      province: '浙江',
      city: '杭州',
      latitude: 30.25,
      longitude: 120.15
    },
    lingqi: 88,
    features: ['人间天堂', '断桥残雪', '雷峰夕照'],
    legends: ['白蛇传', '梁山伯与祝英台', '苏小小'],
    visiting: {
      bestTime: '春季',
      tips: ['可骑行环湖', '傍晚最佳', '避开节假日']
    }
  },
  {
    name: '武当山',
    type: '山',
    location: {
      province: '湖北',
      city: '十堰',
      latitude: 32.40,
      longitude: 111.00
    },
    lingqi: 93,
    features: ['道教圣地', '武当功夫', '古建筑群'],
    legends: ['张三丰', '武当七侠', '真武大帝'],
    visiting: {
      bestTime: '春秋两季',
      tips: ['可学太极', '参观道观', '体验道教文化']
    }
  },
  {
    name: '龙虎山',
    type: '山',
    location: {
      province: '江西',
      city: '鹰潭',
      latitude: 28.12,
      longitude: 116.96
    },
    lingqi: 89,
    features: ['道教祖庭', '丹霞地貌', '悬棺之谜'],
    legends: ['张天师', '道教正一派', '炼丹传说'],
    visiting: {
      bestTime: '春秋两季',
      tips: ['可乘竹筏', '参观天师府', '了解道教历史']
    }
  },
  {
    name: '洞庭湖',
    type: '水',
    location: {
      province: '湖南',
      city: '岳阳',
      latitude: 29.37,
      longitude: 112.93
    },
    lingqi: 85,
    features: ['八百里洞庭', '岳阳楼', '君山岛'],
    legends: ['柳毅传书', '湘妃竹', '洞庭龙君'],
    visiting: {
      bestTime: '夏秋两季',
      tips: ['登岳阳楼', '游君山岛', '品尝湖鲜']
    }
  },
  {
    name: '昆仑山',
    type: '山',
    location: {
      province: '新疆',
      city: '和田',
      latitude: 36.50,
      longitude: 81.90
    },
    lingqi: 98,
    features: ['万山之祖', '神话源头', '玉龙雪山'],
    legends: ['西王母', '昆仑神宫', '修仙圣地'],
    visiting: {
      bestTime: '夏季',
      tips: ['高原反应', '带足装备', '注意安全']
    }
  }
]

export function getDiliByName(name: string): DiliInfo | undefined {
  return DILI_DATA.find(d => d.name === name)
}

export function getDiliByType(type: '山' | '水' | '洞' | '林' | '城'): DiliInfo[] {
  return DILI_DATA.filter(d => d.type === type)
}

export function getDiliByProvince(province: string): DiliInfo[] {
  return DILI_DATA.filter(d => d.location.province === province)
}

export function findNearestDili(latitude: number, longitude: number): DiliInfo {
  let nearest = DILI_DATA[0]
  let minDistance = Infinity
  
  for (const dili of DILI_DATA) {
    const distance = Math.sqrt(
      Math.pow(dili.location.latitude - latitude, 2) +
      Math.pow(dili.location.longitude - longitude, 2)
    )
    if (distance < minDistance) {
      minDistance = distance
      nearest = dili
    }
  }
  
  return nearest
}

// ==================== 导出 ====================

export default {
  TWENTY_FOUR_MOUNTAINS,
  LONGMAI_DATA,
  DILI_DATA,
  calculateLuopan,
  analyzeFengshui,
  getLongmaiByName,
  getLongmaiByType,
  findNearestLongmai,
  getDiliByName,
  getDiliByType,
  getDiliByProvince,
  findNearestDili
}
