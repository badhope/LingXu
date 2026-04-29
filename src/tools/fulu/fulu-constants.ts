export const TALISMAN_CATEGORIES = [
  { id: 'protect', name: '护身符', purpose: '辟邪驱凶', count: 36 },
  { id: 'wealth', name: '招财符', purpose: '招财进宝', count: 24 },
  { id: 'marriage', name: '姻缘符', purpose: '和合美满', count: 18 },
  { id: 'health', name: '健康符', purpose: '消灾解厄', count: 27 },
  { id: 'career', name: '事业符', purpose: '官运亨通', count: 15 },
  { id: 'study', name: '文昌符', purpose: '金榜题名', count: 12 },
]

export const TALISMAN_TEMPLATES = [
  {
    id: 'pingan',
    name: '平安符',
    category: 'protect',
    effect: '镇宅平安，百邪不侵',
    difficulty: '初阶',
    incantation: '天地玄宗，万炁本根。广修亿劫，证吾神通。三界内外，惟道独尊。',
    strokes: 12,
  },
  {
    id: 'zhaocai',
    name: '招财符',
    category: 'wealth',
    effect: '五路财神，八方来财',
    difficulty: '中阶',
    incantation: '天灵灵，地灵灵，奉请五路财神临。东方甲乙木，南方丙丁火。',
    strokes: 18,
  },
  {
    id: 'hehe',
    name: '和合符',
    category: 'marriage',
    effect: '姻缘和合，百年好合',
    difficulty: '高阶',
    incantation: '天和合，地和合，人和合，神和合。月下老人牵红绳，千里姻缘一线牵。',
    strokes: 24,
  },
  {
    id: 'jianbing',
    name: '治病符',
    category: 'health',
    effect: '驱邪治病，恢复健康',
    difficulty: '高阶',
    incantation: '天师门下，治病除殃。三百六十病，一符保安康。咄！急急如律令敕。',
    strokes: 27,
  },
  {
    id: 'shengkuan',
    name: '升官符',
    category: 'career',
    effect: '步步高升，官运亨通',
    difficulty: '中阶',
    incantation: '文曲星君降，紫微星光照。贵人来相助，步步上青云。',
    strokes: 21,
  },
  {
    id: 'wenchang',
    name: '文昌符',
    category: 'study',
    effect: '智慧开明，学业有成',
    difficulty: '初阶',
    incantation: '文昌帝君，天聋地哑。魁星点斗，独占鳌头。下笔千言，金榜题名。',
    strokes: 15,
  },
]

export const Cinnabar_COLORS = [
  { depth: 1, color: '#ff6b6b' },
  { depth: 2, color: '#ee5a5a' },
  { depth: 3, color: '#dd4949' },
  { depth: 4, color: '#cc3838' },
  { depth: 5, color: '#bb2727' },
]

export const FULU_MANUAL = {
  title: '玄门日诵早课',
  history: '祖天师张道陵创符箓之术，以朱笔画符，诵咒掐诀，可召神遣将，驱邪治病。箓者，录也，录诸天鬼神之名号也',
  principles: [
    '画符不知窍，反惹鬼神笑',
    '画符若知窍，惊得鬼神叫',
    '朱砂为体，阳气为用',
    '存思运气，一气贯通',
  ],
  classics: [
    '画符容易通神难，无德之人莫妄传',
    '一点灵光便是符，何劳纸上弄工夫',
    '天圆地方，律令九章，吾今下笔，万鬼伏藏',
  ],
}

export const HAND_SEALS = [
  { name: '雷诀', fingers: '三四指曲入掌心，二指五指直指', purpose: '召雷遣将' },
  { name: '剑诀', fingers: '二指直伸，余指曲入掌心', purpose: '驱邪斩妖' },
  { name: '金刀诀', fingers: '大指压四五指，二三指直', purpose: '破煞除秽' },
  { name: '三山诀', fingers: '大指托二指，三四五直', purpose: '捧水奉果' },
]
