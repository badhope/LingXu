export interface Trigram {
  id: number
  name: string
  symbol: string
  binary: string
  element: string
  direction: string
  family: string
  nature: string
  color: string
  meaning: string
}

export interface Hexagram {
  id: number
  name: string
  symbol: string
  upperTrigram: number
  lowerTrigram: number
  kingWenOrder: number
  element: string
  judgment: string
  image: string
  lines: string[]
  category: string
}

export const XIAN_TIAN_TRIGRAMS: Trigram[] = [
  { id: 0, name: '乾', symbol: '☰', binary: '111', element: '金', direction: '南', family: '父', nature: '天', color: '#daa520', meaning: '健也' },
  { id: 1, name: '兑', symbol: '☱', binary: '110', element: '金', direction: '东南', family: '少女', nature: '泽', color: '#87ceeb', meaning: '说也' },
  { id: 2, name: '离', symbol: '☲', binary: '101', element: '火', direction: '东', family: '中女', nature: '火', color: '#ff6347', meaning: '丽也' },
  { id: 3, name: '震', symbol: '☳', binary: '100', element: '木', direction: '东北', family: '长男', nature: '雷', color: '#32cd32', meaning: '动也' },
  { id: 4, name: '巽', symbol: '☴', binary: '011', element: '木', direction: '西南', family: '长女', nature: '风', color: '#90ee90', meaning: '入也' },
  { id: 5, name: '坎', symbol: '☵', binary: '010', element: '水', direction: '西', family: '中男', nature: '水', color: '#4169e1', meaning: '陷也' },
  { id: 6, name: '艮', symbol: '☶', binary: '001', element: '土', direction: '西北', family: '少男', nature: '山', color: '#d2691e', meaning: '止也' },
  { id: 7, name: '坤', symbol: '☷', binary: '000', element: '土', direction: '北', family: '母', nature: '地', color: '#8b4513', meaning: '顺也' },
]

export const HOU_TIAN_TRIGRAMS: Trigram[] = [
  { id: 0, name: '坎', symbol: '☵', binary: '010', element: '水', direction: '北', family: '中男', nature: '水', color: '#4169e1', meaning: '陷也' },
  { id: 1, name: '坤', symbol: '☷', binary: '000', element: '土', direction: '西南', family: '母', nature: '地', color: '#8b4513', meaning: '顺也' },
  { id: 2, name: '震', symbol: '☳', binary: '100', element: '木', direction: '东', family: '长男', nature: '雷', color: '#32cd32', meaning: '动也' },
  { id: 3, name: '巽', symbol: '☴', binary: '011', element: '木', direction: '东南', family: '长女', nature: '风', color: '#90ee90', meaning: '入也' },
  { id: 4, name: '乾', symbol: '☰', binary: '111', element: '金', direction: '西北', family: '父', nature: '天', color: '#daa520', meaning: '健也' },
  { id: 5, name: '兑', symbol: '☱', binary: '110', element: '金', direction: '西', family: '少女', nature: '泽', color: '#87ceeb', meaning: '说也' },
  { id: 6, name: '艮', symbol: '☶', binary: '001', element: '土', direction: '东北', family: '少男', nature: '山', color: '#d2691e', meaning: '止也' },
  { id: 7, name: '离', symbol: '☲', binary: '101', element: '火', direction: '南', family: '中女', nature: '火', color: '#ff6347', meaning: '丽也' },
]

export const HEXAGRAMS: Hexagram[] = [
  { id: 0, name: '乾为天', symbol: '䷀', upperTrigram: 0, lowerTrigram: 0, kingWenOrder: 1, element: '金', judgment: '元亨利贞', image: '天行健，君子以自强不息', lines: ['潜龙勿用', '见龙在田，利见大人', '君子终日乾乾，夕惕若厉，无咎', '或跃在渊，无咎', '飞龙在天，利见大人', '亢龙有悔'], category: '天道' },
  { id: 1, name: '坤为地', symbol: '䷁', upperTrigram: 7, lowerTrigram: 7, kingWenOrder: 2, element: '土', judgment: '元亨，利牝马之贞', image: '地势坤，君子以厚德载物', lines: ['履霜，坚冰至', '直、方、大，不习无不利', '含章可贞，或从王事，无成有终', '括囊，无咎无誉', '黄裳，元吉', '龙战于野，其血玄黄'], category: '地道' },
  { id: 2, name: '水雷屯', symbol: '䷂', upperTrigram: 5, lowerTrigram: 3, kingWenOrder: 3, element: '水木', judgment: '元亨利贞，勿用有攸往，利建侯', image: '云雷屯，君子以经纶', lines: ['磐桓，利居贞，利建侯', '屯如邅如，乘马班如，匪寇婚媾，女子贞不字，十年乃字', '即鹿无虞，惟入于林中，君子几不如舍，往吝', '乘马班如，求婚媾，往吉，无不利', '屯其膏，小贞吉，大贞凶', '乘马班如，泣血涟如'], category: '开创' },
  { id: 3, name: '山水蒙', symbol: '䷃', upperTrigram: 6, lowerTrigram: 5, kingWenOrder: 4, element: '土水', judgment: '亨。匪我求童蒙，童蒙求我', image: '山下出泉，蒙；君子以果行育德', lines: ['发蒙，利用刑人，用说桎梏，以往吝', '包蒙吉，纳妇吉，子克家', '勿用取女，见金夫，不有躬，无攸利', '困蒙，吝', '童蒙，吉', '击蒙，不利为寇，利御寇'], category: '启蒙' },
  { id: 4, name: '水天需', symbol: '䷄', upperTrigram: 5, lowerTrigram: 0, kingWenOrder: 5, element: '水金', judgment: '有孚，光亨贞吉，利涉大川', image: '云上于天，需；君子以饮食宴乐', lines: ['需于郊，利用恒，无咎', '需于沙，小有言，终吉', '需于泥，致寇至', '需于血，出自穴', '需于酒食，贞吉', '入于穴，有不速之客三人来，敬之终吉'], category: '等待' },
  { id: 5, name: '天水讼', symbol: '䷅', upperTrigram: 0, lowerTrigram: 5, kingWenOrder: 6, element: '金水', judgment: '有孚，窒惕，中吉，终凶', image: '天与水违行，讼；君子以作事谋始', lines: ['不永所事，小有言，终吉', '不克讼，归而逋，其邑人三百户无眚', '食旧德，贞厉，终吉，或从王事无成', '不克讼，复即命渝，安贞吉', '讼元吉', '或锡之鞶带，终朝三褫之'], category: '争讼' },
]

export const COIN_SIDES = [
  { name: '字', value: 2, image: '乾隆通宝' },
  { name: '背', value: 3, image: '满文' },
]

export const YAO_TYPES = [
  { id: 0, name: '老阴', symbol: '×', value: 0, changing: true, color: '#666666' },
  { id: 1, name: '少阴', symbol: '- -', value: 2, changing: false, color: '#4a5568' },
  { id: 2, name: '少阳', symbol: '—', value: 3, changing: false, color: '#d4af37' },
  { id: 3, name: '老阳', symbol: '○', value: 1, changing: true, color: '#ffd700' },
]
