export interface Trigram {
  id: string
  name: string
  binary: string
  nature: string
  family: string
  number: number
  element: string
  meaning: string
  color: string
}

export interface Hexagram {
  id: string
  name: string
  upper: string
  lower: string
  number: number
  judgment: string
  image: string
  explanation: string
  fortune: {
    overall: string
    career: string
    wealth: string
    love: string
  }
}

export interface QiMenPosition {
  palace: string
  name: string
  star: string
  door: string
  deity: string
  stem: string
  branch: string
}

export const TRIGRAMS: Trigram[] = [
  { id: 'qian', name: '乾', binary: '111', nature: '天', family: '父', number: 1, element: '金', meaning: '刚健中正', color: '#ffd700' },
  { id: 'dui', name: '兑', binary: '110', nature: '泽', family: '少女', number: 2, element: '金', meaning: '喜悦和乐', color: '#60a5fa' },
  { id: 'li', name: '离', binary: '101', nature: '火', family: '中女', number: 3, element: '火', meaning: '光明美丽', color: '#f87171' },
  { id: 'zhen', name: '震', binary: '100', nature: '雷', family: '长男', number: 4, element: '木', meaning: '震动奋起', color: '#4ade80' },
  { id: 'xun', name: '巽', binary: '011', nature: '风', family: '长女', number: 5, element: '木', meaning: '柔顺进入', color: '#22c55e' },
  { id: 'kan', name: '坎', binary: '010', nature: '水', family: '中男', number: 6, element: '水', meaning: '险难重重', color: '#3b82f6' },
  { id: 'gen', name: '艮', binary: '001', nature: '山', family: '少男', number: 7, element: '土', meaning: '静止稳重', color: '#a78bfa' },
  { id: 'kun', name: '坤', binary: '000', nature: '地', family: '母', number: 8, element: '土', meaning: '柔顺包容', color: '#f59e0b' },
]

export const HEXAGRAMS: Hexagram[] = [
  {
    id: '01',
    name: '乾为天',
    upper: '乾',
    lower: '乾',
    number: 1,
    judgment: '元亨利贞',
    image: '天行健，君子以自强不息',
    explanation: '纯阳之卦，六爻皆阳，刚健中正，四德俱全。',
    fortune: {
      overall: '大吉大利，事事亨通',
      career: '青云直上，贵人相助',
      wealth: '财源广进，大利四方',
      love: '阳刚之气，须防过刚',
    },
  },
  {
    id: '02',
    name: '坤为地',
    upper: '坤',
    lower: '坤',
    number: 2,
    judgment: '元亨，利牝马之贞',
    image: '地势坤，君子以厚德载物',
    explanation: '纯阴之卦，柔顺包容，厚德载物，无往不利。',
    fortune: {
      overall: '平顺安稳，以柔克刚',
      career: '厚积薄发，静待时机',
      wealth: '细水长流，积少成多',
      love: '阴柔和顺，姻缘美满',
    },
  },
  {
    id: '03',
    name: '水雷屯',
    upper: '坎',
    lower: '震',
    number: 3,
    judgment: '元亨利贞，勿用有攸往',
    image: '云雷屯，君子以经纶',
    explanation: '万物始生，艰难困苦，然前途光明。',
    fortune: {
      overall: '先难后易，创业维艰',
      career: '起步艰难，终有所成',
      wealth: '初期困顿，后渐转佳',
      love: '好事多磨，终成眷属',
    },
  },
  {
    id: '04',
    name: '山水蒙',
    upper: '艮',
    lower: '坎',
    number: 4,
    judgment: '亨。匪我求童蒙，童蒙求我',
    image: '山下出泉，蒙。君子以果行育德',
    explanation: '启蒙发智，虚心求教，尊师重道。',
    fortune: {
      overall: '启蒙之时，虚心求学',
      career: '学习成长，遇贵人指点',
      wealth: '不宜急进，稳中求进',
      love: '情窦初开，需要引导',
    },
  },
  {
    id: '05',
    name: '水天需',
    upper: '坎',
    lower: '乾',
    number: 5,
    judgment: '有孚，光亨贞吉',
    image: '云上于天，需。君子以饮食宴乐',
    explanation: '待时而动，隐忍待机，终有所获。',
    fortune: {
      overall: '待时守分，终必有成',
      career: '静待时机，厚积薄发',
      wealth: '耐心等待，财运将至',
      love: '好事多磨，耐心可成',
    },
  },
  {
    id: '06',
    name: '天水讼',
    upper: '乾',
    lower: '坎',
    number: 6,
    judgment: '有孚窒。惕中吉，终凶',
    image: '天与水违行，讼。君子以作事谋始',
    explanation: '争讼之象，宜和解不宜争斗。',
    fortune: {
      overall: '口舌是非，以和为贵',
      career: '防范小人，避免争端',
      wealth: '财物纠纷，宜早解决',
      love: '感情不和，需要沟通',
    },
  },
]

export const NINE_STARS = ['天蓬', '天芮', '天冲', '天辅', '天禽', '天心', '天柱', '天任', '天英']
export const EIGHT_DOORS = ['休门', '生门', '伤门', '杜门', '景门', '死门', '惊门', '开门']
export const EIGHT_DEITIES = ['值符', '腾蛇', '太阴', '六合', '白虎', '玄武', '九地', '九天']
export const TEN_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
export const TWELVE_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
export const NINE_PALACES = ['坎一', '坤二', '震三', '巽四', '中五', '乾六', '兑七', '艮八', '离九']
