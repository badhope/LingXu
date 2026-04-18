export interface DragonVein {
  id: string
  name: string
  level: 'tian' | 'di' | 'ren'
  description: string
  startPoint: [number, number]
  endPoint: [number, number]
  branches: string[]
  energy: number
  color: string
  blessings: string[]
}

export interface CavePoint {
  id: string
  name: string
  veinId: string
  position: [number, number]
  type: 'sheng' | 'wang' | 'bai' | 'wang'
  quality: number
  discovery: string
  legend: string
}

export const DRAGON_VEINS: DragonVein[] = [
  {
    id: 'kunlun',
    name: '昆仑主脉',
    level: 'tian',
    description: '万山之祖，龙脉之源，中国三大干龙皆发源于此',
    startPoint: [15, 15],
    endPoint: [30, 30],
    branches: ['北干龙', '中干龙', '南干龙'],
    energy: 100,
    color: '#8b0000',
    blessings: ['帝王之气', '仙家道场', '万世基业']
  },
  {
    id: 'bei_gan',
    name: '北干龙',
    level: 'di',
    description: '阴山-贺兰山-燕山，横贯北方，护佑幽燕大地',
    startPoint: [30, 20],
    endPoint: [75, 15],
    branches: ['太行支脉', '燕山支脉'],
    energy: 85,
    color: '#4a5568',
    blessings: ['霸业根基', '王侯将相', '边塞安宁']
  },
  {
    id: 'zhong_gan',
    name: '中干龙',
    level: 'di',
    description: '秦岭-大巴山-大别山，中华地理南北分界线',
    startPoint: [35, 35],
    endPoint: [70, 45],
    branches: ['终南支脉', '嵩岳支脉'],
    energy: 90,
    color: '#2d3748',
    blessings: ['中原正统', '文化昌盛', '国泰民安']
  },
  {
    id: 'nan_gan',
    name: '南干龙',
    level: 'di',
    description: '南岭-武夷山-天目山，江南锦绣，人文荟萃',
    startPoint: [40, 55],
    endPoint: [80, 60],
    branches: ['黄山支脉', '武夷支脉'],
    energy: 80,
    color: '#276749',
    blessings: ['文人辈出', '商贾云集', '风景秀丽']
  },
  {
    id: 'changbai',
    name: '长白山脉',
    level: 'ren',
    description: '大清龙脉，东北根本，森林苍莽',
    startPoint: [80, 8],
    endPoint: [90, 25],
    branches: ['白头山系'],
    energy: 75,
    color: '#1a365d',
    blessings: ['龙兴之地', '物产丰富', '山林庇佑']
  },
  {
    id: 'tibet',
    name: '喜马拉雅',
    level: 'tian',
    description: '世界屋脊，雪域高原，佛门圣地',
    startPoint: [25, 70],
    endPoint: [50, 85],
    branches: ['冈底斯山脉'],
    energy: 95,
    color: '#e2e8f0',
    blessings: ['佛光普照', '转世传承', '雪域护佑']
  },
]

export const CAVE_POINTS: CavePoint[] = [
  {
    id: 'kunlun_top',
    name: '昆仑虚',
    veinId: 'kunlun',
    position: [22, 22],
    type: 'sheng',
    quality: 100,
    discovery: '上古黄帝',
    legend: '西王母之所居，群仙之洞府'
  },
  {
    id: 'zhongnan',
    name: '终南山',
    veinId: 'zhong_gan',
    position: [45, 38],
    type: 'wang',
    quality: 95,
    discovery: '老子',
    legend: '楼观台说经，全真派祖庭'
  },
  {
    id: 'wudang',
    name: '武当山',
    veinId: 'nan_gan',
    position: [55, 50],
    type: 'sheng',
    quality: 92,
    discovery: '张三丰',
    legend: '真武大帝道场，太极拳发源地'
  },
  {
    id: 'emei',
    name: '峨眉山',
    veinId: 'nan_gan',
    position: [38, 65],
    type: 'bai',
    quality: 90,
    discovery: '普贤菩萨',
    legend: '银色世界，普贤道场'
  },
  {
    id: 'putuo',
    name: '普陀山',
    veinId: 'nan_gan',
    position: [88, 52],
    type: 'wang',
    quality: 88,
    discovery: '观音菩萨',
    legend: '南海观音，普渡众生'
  },
  {
    id: 'shaolin',
    name: '嵩山少林',
    veinId: 'zhong_gan',
    position: [58, 35],
    type: 'wang',
    quality: 85,
    discovery: '达摩祖师',
    legend: '禅宗祖庭，武术发源地'
  },
]

export const VEIN_LEVELS = {
  tian: { name: '天脉', label: '⭐⭐⭐ 至尊龙脉', color: '#ffd700' },
  di: { name: '地脉', label: '⭐⭐ 干龙正脉', color: '#c0c0c0' },
  ren: { name: '人脉', label: '⭐ 支龙余脉', color: '#cd7f32' },
}

export const POINT_TYPES = {
  sheng: { name: '生穴', label: '上吉', color: '#4ade80' },
  wang: { name: '旺穴', label: '吉', color: '#d4af37' },
  bai: { name: '败穴', label: '平', color: '#94a3b8' },
}
