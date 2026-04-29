export interface Dynasty {
  id: string
  name: string
  startYear: number
  endYear: number
  duration: number
  capital: string
  founder: string
  color: string
  description: string
  majorEvents: string[]
  emperors: number
}

export interface Figure {
  id: string
  name: string
  dynasty: string
  years: string
  title: string
  importance: number
  relationships: {
    id: string
    type: 'teacher' | 'student' | 'friend' | 'enemy' | 'family' | 'colleague'
    label: string
  }[]
  achievement: string
  quote: string
}

export const DYNASTIES: Dynasty[] = [
  {
    id: 'xia',
    name: '夏朝',
    startYear: -2070,
    endYear: -1600,
    duration: 470,
    capital: '阳城',
    founder: '大禹',
    color: '#8b4513',
    description: '中国历史上第一个世袭制王朝，开启了家天下的历史。',
    majorEvents: ['大禹治水', '启继禹位', '太康失国', '少康中兴', '桀暴无道'],
    emperors: 17,
  },
  {
    id: 'shang',
    name: '商朝',
    startYear: -1600,
    endYear: -1046,
    duration: 554,
    capital: '殷',
    founder: '成汤',
    color: '#cd7f32',
    description: '甲骨文的黄金时代，青铜器文明的巅峰。',
    majorEvents: ['商汤灭夏', '盘庚迁殷', '武丁中兴', '甲骨文出现', '纣王自焚'],
    emperors: 31,
  },
  {
    id: 'zhou',
    name: '周朝',
    startYear: -1046,
    endYear: -256,
    duration: 790,
    capital: '镐京/洛邑',
    founder: '周武王',
    color: '#d4af37',
    description: '礼乐文明的奠基者，春秋战国百家争鸣。',
    majorEvents: ['武王伐纣', '周公制礼', '平王东迁', '春秋五霸', '战国七雄'],
    emperors: 37,
  },
  {
    id: 'qin',
    name: '秦朝',
    startYear: -221,
    endYear: -207,
    duration: 14,
    capital: '咸阳',
    founder: '秦始皇',
    color: '#1a1a2e',
    description: '大一统的开端，书同文车同轨，万世基业的奠基。',
    majorEvents: ['统一六国', '焚书坑儒', '修筑长城', '陈胜吴广起义', '子婴投降'],
    emperors: 3,
  },
  {
    id: 'han',
    name: '汉朝',
    startYear: -202,
    endYear: 220,
    duration: 422,
    capital: '长安/洛阳',
    founder: '刘邦',
    color: '#c53030',
    description: '大汉天威远播西域，汉民族形成的关键时期。',
    majorEvents: ['楚汉争霸', '文景之治', '汉武盛世', '张骞出使', '光武中兴'],
    emperors: 29,
  },
  {
    id: 'three',
    name: '三国',
    startYear: 220,
    endYear: 280,
    duration: 60,
    capital: '洛阳/成都/建业',
    founder: '曹丕/刘备/孙权',
    color: '#6b7280',
    description: '英雄辈出的乱世，忠义智慧的史诗。',
    majorEvents: ['官渡之战', '赤壁之战', '三国鼎立', '六出祁山', '三分归晋'],
    emperors: 11,
  },
  {
    id: 'tang',
    name: '唐朝',
    startYear: 618,
    endYear: 907,
    duration: 289,
    capital: '长安',
    founder: '李渊',
    color: '#f59e0b',
    description: '盛唐气象，万国来朝，诗歌的黄金时代。',
    majorEvents: ['贞观之治', '开元盛世', '安史之乱', '李白杜甫', '黄巢起义'],
    emperors: 21,
  },
  {
    id: 'song',
    name: '宋朝',
    startYear: 960,
    endYear: 1279,
    duration: 319,
    capital: '开封/临安',
    founder: '赵匡胤',
    color: '#3b82f6',
    description: '经济文化的巅峰，宋词与理学的时代。',
    majorEvents: ['陈桥兵变', '王安石变法', '靖康之耻', '岳飞抗金', '崖山之战'],
    emperors: 18,
  },
  {
    id: 'ming',
    name: '明朝',
    startYear: 1368,
    endYear: 1644,
    duration: 276,
    capital: '南京/北京',
    founder: '朱元璋',
    color: '#ef4444',
    description: '天子守国门，君王死社稷，最后的汉人王朝。',
    majorEvents: ['洪武之治', '永乐大典', '郑和下西洋', '土木堡之变', '崇祯自缢'],
    emperors: 16,
  },
  {
    id: 'qing',
    name: '清朝',
    startYear: 1644,
    endYear: 1912,
    duration: 268,
    capital: '北京',
    founder: '皇太极',
    color: '#fbbf24',
    description: '康乾盛世的余晖，末代王朝的悲歌。',
    majorEvents: ['康乾盛世', '鸦片战争', '太平天国', '洋务运动', '宣统退位'],
    emperors: 12,
  },
]

export const FIGURES: Figure[] = [
  {
    id: 'confucius',
    name: '孔子',
    dynasty: '春秋',
    years: '前551-前479',
    title: '至圣先师',
    importance: 100,
    relationships: [
      { id: 'yanzi', type: 'student', label: '弟子' },
      { id: 'laozi', type: 'teacher', label: '问礼于老聃' },
    ],
    achievement: '创立儒家学派，删述六经，弟子三千贤人七十二',
    quote: '己所不欲，勿施于人',
  },
  {
    id: 'laozi',
    name: '老子',
    dynasty: '春秋',
    years: '前571-前471',
    title: '道祖',
    importance: 95,
    relationships: [
      { id: 'confucius', type: 'teacher', label: '孔子问礼' },
      { id: 'zhuangzi', type: 'friend', label: '老庄思想' },
    ],
    achievement: '著《道德经》五千言，道家学派创始人',
    quote: '道可道，非常道',
  },
  {
    id: 'shihuang',
    name: '秦始皇',
    dynasty: '秦',
    years: '前259-前210',
    title: '始皇帝',
    importance: 100,
    relationships: [
      { id: 'lisi', type: 'colleague', label: '丞相' },
      { id: 'liubang', type: 'enemy', label: '灭秦' },
    ],
    achievement: '统一六国，建立帝制，书同文车同轨',
    quote: '朕为始皇帝，后世以计数',
  },
  {
    id: 'liubang',
    name: '刘邦',
    dynasty: '汉',
    years: '前256-前195',
    title: '汉高祖',
    importance: 95,
    relationships: [
      { id: 'xiangyu', type: 'enemy', label: '楚汉争霸' },
      { id: 'hanxin', type: 'colleague', label: '大将军' },
      { id: 'zhangliang', type: 'colleague', label: '谋圣' },
    ],
    achievement: '建立大汉四百年基业，汉民族的奠基者',
    quote: '大风起兮云飞扬',
  },
  {
    id: 'zhugeliang',
    name: '诸葛亮',
    dynasty: '三国',
    years: '181-234',
    title: '武侯',
    importance: 98,
    relationships: [
      { id: 'liubei', type: 'student', label: '三顾茅庐' },
      { id: 'zhouyu', type: 'enemy', label: '既生瑜何生亮' },
      { id: 'sima', type: 'enemy', label: '宿敌' },
    ],
    achievement: '隆中对，出师表，六出祁山，鞠躬尽瘁死而后已',
    quote: '鞠躬尽瘁，死而后已',
  },
  {
    id: 'loshiming',
    name: '李世民',
    dynasty: '唐',
    years: '598-649',
    title: '唐太宗',
    importance: 100,
    relationships: [
      { id: 'weizheng', type: 'colleague', label: '人镜' },
      { id: 'lixubai', type: 'friend', label: '贞观君臣' },
    ],
    achievement: '贞观之治，天可汗，盛唐的奠基者',
    quote: '以铜为镜，可以正衣冠',
  },
  {
    id: 'libai',
    name: '李白',
    dynasty: '唐',
    years: '701-762',
    title: '诗仙',
    importance: 95,
    relationships: [
      { id: 'dufu', type: 'friend', label: '李杜之交' },
      { id: 'hezhizhang', type: 'friend', label: '酒中八仙' },
    ],
    achievement: '诗仙，盛唐气象的代表，唐诗的巅峰',
    quote: '天生我材必有用',
  },
]

export const RELATION_COLORS = {
  teacher: '#d4af37',
  student: '#4ade80',
  friend: '#60a5fa',
  enemy: '#f87171',
  family: '#f472b6',
  colleague: '#a78bfa',
}
