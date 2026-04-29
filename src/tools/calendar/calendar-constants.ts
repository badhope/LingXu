export const LUNAR_MONTHS = [
  '正月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '冬月', '腊月',
]

export const LUNAR_DAYS = [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十',
]

export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

export const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

export const SHENGXIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

export const MOON_PHASES = [
  { id: 'new', name: '朔月', icon: '🌑', light: 0, term: '初一' },
  { id: 'crescent', name: '娥眉月', icon: '🌒', light: 25, term: '初三至初七' },
  { id: 'first', name: '上弦月', icon: '🌓', light: 50, term: '初七、八' },
  { id: 'gibbous', name: '盈凸月', icon: '🌔', light: 75, term: '十一至十四' },
  { id: 'full', name: '满月', icon: '🌕', light: 100, term: '十五、六' },
  { id: 'disseminating', name: '亏凸月', icon: '🌖', light: 75, term: '十八至廿二' },
  { id: 'last', name: '下弦月', icon: '🌗', light: 50, term: '廿二、三' },
  { id: 'balsamic', name: '残月', icon: '🌘', light: 25, term: '廿五至三十' },
]

export const TWENTY_FOUR_JIEQI = [
  { id: 'lichun', name: '立春', solarTerm: 315, jy: '寅节', remark: '春之始' },
  { id: 'yushui', name: '雨水', solarTerm: 330, jy: '寅中', remark: '降雪为雨' },
  { id: 'jingzhe', name: '惊蛰', solarTerm: 345, jy: '卯节', remark: '雷动虫醒' },
  { id: 'chunfen', name: '春分', solarTerm: 0, jy: '卯中', remark: '昼夜均分' },
  { id: 'qingming', name: '清明', solarTerm: 15, jy: '辰节', remark: '气清景明' },
  { id: 'guyu', name: '谷雨', solarTerm: 30, jy: '辰中', remark: '雨生百谷' },
  { id: 'lixia', name: '立夏', solarTerm: 45, jy: '巳节', remark: '夏之始' },
  { id: 'xiaoman', name: '小满', solarTerm: 60, jy: '巳中', remark: '物初盈满' },
  { id: 'mangzhong', name: '芒种', solarTerm: 75, jy: '午节', remark: '麦芒收种' },
  { id: 'xiazhi', name: '夏至', solarTerm: 90, jy: '午中', remark: '日长之极' },
  { id: 'xiaoshu', name: '小暑', solarTerm: 105, jy: '未节', remark: '初入伏天' },
  { id: 'dashu', name: '大暑', solarTerm: 120, jy: '未中', remark: '酷热至极' },
  { id: 'liqiu', name: '立秋', solarTerm: 135, jy: '申节', remark: '秋之始' },
  { id: 'chushu', name: '处暑', solarTerm: 150, jy: '申中', remark: '暑气终止' },
  { id: 'bailu', name: '白露', solarTerm: 165, jy: '酉节', remark: '露凝而白' },
  { id: 'qiufen', name: '秋分', solarTerm: 180, jy: '酉中', remark: '阴阳均分' },
  { id: 'hanlu', name: '寒露', solarTerm: 195, jy: '戌节', remark: '露寒欲霜' },
  { id: 'shuangjiang', name: '霜降', solarTerm: 210, jy: '戌中', remark: '始凝为霜' },
  { id: 'lidong', name: '立冬', solarTerm: 225, jy: '亥节', remark: '冬之始' },
  { id: 'xiaoxue', name: '小雪', solarTerm: 240, jy: '亥中', remark: '初雪将至' },
  { id: 'daxue', name: '大雪', solarTerm: 255, jy: '子节', remark: '雪盛之时' },
  { id: 'dongzhi', name: '冬至', solarTerm: 270, jy: '子中', remark: '一阳来复' },
  { id: 'xiaohan', name: '小寒', solarTerm: 285, jy: '丑节', remark: '初入寒冬' },
  { id: 'dahan', name: '大寒', solarTerm: 300, jy: '丑中', remark: '寒极之时' },
]

export const AUSPICIOUS_CATEGORIES = [
  { id: 'yellow', name: '黄道吉日', color: '#fbbf24', gods: ['青龙', '明堂', '金匮', '天德', '玉堂', '司命'] },
  { id: 'black', name: '黑道凶日', color: '#ef4444', gods: ['天刑', '朱雀', '白虎', '天牢', '玄武', '勾陈'] },
]

export const DAILY_ACTIVITIES = [
  { id: 'marriage', name: '嫁娶', suitable: ['青龙', '明堂', '天德', '玉堂'], note: '婚姻纳采' },
  { id: 'funeral', name: '安葬', suitable: ['明堂', '金匮', '司命'], note: '下葬安葬' },
  { id: 'travel', name: '出行', suitable: ['青龙', '玉堂', '司命'], note: '远行上路' },
  { id: 'business', name: '开市', suitable: ['金匮', '天德', '玉堂'], note: '开业交易' },
  { id: 'move', name: '移徙', suitable: ['天德', '玉堂', '司命'], note: '入宅搬家' },
  { id: 'breakground', name: '动土', suitable: ['青龙', '金匮', '司命'], note: '建筑开工' },
]

export const SHI_ER_SHEN = [
  { id: 'jian', name: '建', note: '健旺之气，宜上官见贵' },
  { id: 'chu', name: '除', note: '除旧布新，宜疗病清洁' },
  { id: 'man', name: '满', note: '圆满之气，宜祈福嫁娶' },
  { id: 'ping', name: '平', note: '平稳之气，宜平治道途' },
  { id: 'ding', name: '定', note: '安定之气，宜宴会协议' },
  { id: 'zhi', name: '执', note: '执持之气，宜捕捉守成' },
  { id: 'po', name: '破', note: '破坏之气，宜破屋坏垣' },
  { id: 'wei', name: '危', note: '危险之气，宜登高望远' },
  { id: 'cheng', name: '成', note: '成就之气，宜百事成就' },
  { id: 'shou', name: '收', note: '收获之气，宜收纳求财' },
  { id: 'kai', name: '开', note: '开启之气，宜开业开市' },
  { id: 'bi', name: '闭', note: '关闭之气，宜闭塞储藏' },
]

export const CALENDAR_MANUAL = {
  title: '董公择日要诀',
  history: '颛顼制历，夏建寅正，商建丑，周建子，秦建亥。汉武太初历复夏正，垂两千余年。择吉之术，所以顺天应人也',
  principles: [
    '年吉不如月吉，月吉不如日吉，日吉不如时吉',
    '黄道主神明，黑道长殃咎',
    '建满平收黑，除危定执黄，成开皆可用，破闭不相当',
    '用事当以事类为纲，神煞为目，不可执一',
  ],
}
