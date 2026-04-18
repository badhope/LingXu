'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface LuopanEra {
  era: string
  form: string
  material: string
  feature: string
  detail: string
  representative: string
  importance: number
}

interface ThreeNeedles {
  name: string
  usage: string
  purpose: string
  principle: string
  detail: string
  invented: string
  accuracy: number
  dynasty: string
  application: string[]
  classicQuote: string
}

interface LuopanLayer {
  name: string
  layer: string
  category: string
  detail: string
  note: string
  importance: number
  operatingTips: string[]
}

interface TwentyFourMountain {
  mountain: string
  direction: string
  degree: string
  wuxing: string
  category: string
  auspicious: string[]
  avoid: string[]
  note: string
  detail: string
  famousLocations: string[]
}

interface LuopanUsage {
  name: string
  purpose: string
  difficulty: number
  steps: string[]
  notes: string[]
}

const LUOPAN_HISTORY: LuopanEra[] = [
  {
    era: '先秦',
    form: '司南',
    material: '天然磁石',
    feature: '勺形，置于地盘，投之于地，其柢指南',
    detail: '司南为世界上最早的磁性指南工具。以天然磁石琢成勺形，置于刻有二十四方位的青铜地盘上。静止时勺柄指南。其制载于《韩非子》、《鬼谷子》等先秦典籍。',
    representative: '《韩非子·有度篇》：故先王立司南以端朝夕',
    importance: 90,
  },
  {
    era: '汉代',
    form: '六壬式盘',
    material: '栻盘',
    feature: '天盘地盘，十二月将，二十八宿，八干四维',
    detail: '六壬式盘为汉代占卜工具，分天地二盘。天盘刻十二月将、二十八宿，地盘刻八干四维十二支。旋转天盘以加临地盘，占吉凶祸福。后世罗盘即由此发展而来。',
    representative: '出土于武威磨嘴子汉墓、阜阳汝阴侯墓',
    importance: 92,
  },
  {
    era: '唐代',
    form: '水罗盘',
    material: '磁化铁针',
    feature: '浮于水面，磁针指南，用于航海',
    detail: '唐代发明人工磁化技术，将铁针磁化后穿以灯芯，浮于水面，即成水罗盘。此法简便灵验，广泛用于航海，开创了大航海时代之先河。',
    representative: '鉴真东渡、海上丝绸之路导航',
    importance: 95,
  },
  {
    era: '宋代',
    form: '旱罗盘',
    material: '支轴旋转',
    feature: '沈括《梦溪笔谈》记载，指甲旋定法，碗唇旋定法',
    detail: '宋代沈括《梦溪笔谈》记载了四种磁针装置法：水浮、指甲旋定、碗唇旋定、缕悬。其中缕悬法最为精确，为后世旱罗盘之祖形。此时罗盘已用于风水相地。',
    representative: '沈括《梦溪笔谈》卷二十四',
    importance: 98,
  },
  {
    era: '元代',
    form: '罗盘针',
    material: '铜盘',
    feature: '二十四山向确立，用于航海和相地',
    detail: '元代罗盘形制已定，二十四山向确立。磁针支轴旋转，盘面刻方位度数。水旱二法并行，海上罗盘与风水罗盘分流发展。马可波罗游记记载中国罗盘西传欧洲。',
    representative: '《岛夷志略》记载海外贸易航行',
    importance: 88,
  },
  {
    era: '明清',
    form: '综合罗经',
    material: '桃木底座铜盘面',
    feature: '数十圈层，三合三元天星，集大成',
    detail: '明清罗盘集大成，盘面数十层，集三合、三元、天星、择日等于一盘。以安徽休宁万安罗盘、江西兴国罗盘最为著名。材质为桃木底座，铜质盘面，磁针灵验。',
    representative: '万安吴鲁衡罗经、方秀水罗经',
    importance: 100,
  },
]

const THREE_NEEDLES: ThreeNeedles[] = [
  {
    name: '地盘正针',
    usage: '格龙立向',
    purpose: '定二十四山坐向',
    principle: '子午正对，地磁南北',
    detail: '地盘为体，正针为用。子午卯酉正对指南针，地磁南北极。立向定坐山，此为罗经之根本。杨公风水专用。正针所指为地磁南北，非天文南北，有磁偏角之差。然风水家用地盘立向，万古不易之理也。',
    invented: '杨筠松',
    dynasty: '晚唐',
    accuracy: 100,
    application: ['阳宅立向', '阴宅坐山', '格龙定向', '开门放水'],
    classicQuote: '《青囊奥语》：颠颠倒，二十四山有珠宝；倒倒颠，二十四山有火坑。',
  },
  {
    name: '人盘中针',
    usage: '拨砂消砂',
    purpose: '消纳山砂',
    principle: '子位偏壬，逆前半格',
    detail: '人盘为用，中针为砂。其子位在地盘壬子之间，较地盘逆差半格。专论山峰砂头之吉凶。赖布衣传。消砂之法：生我者为贪狼生气，我生者为廉贞泄气，克我者为破军煞曜，我克者为禄掌奴砂，比和者为武曲旺砂。',
    invented: '赖布衣',
    dynasty: '南宋',
    accuracy: 95,
    application: ['消纳山峰', '定砂吉凶', '左邻右舍', '远朝近案'],
    classicQuote: '《催官篇》：天星赖公说，消砂用中针。生旺奴煞泄，吉凶掌中明。',
  },
  {
    name: '天盘缝针',
    usage: '纳水立向',
    purpose: '收纳水法',
    principle: '子位偏癸，顺后半格',
    detail: '天盘为用，缝针为水。其子位在地盘子癸之间，较地盘顺差半格。专论水口去来之吉凶。杨公所传，用于双山五行三合水法。水为财源，亦为血脉。水口关锁，财气凝聚。水口倾泻，财散人离。',
    invented: '杨筠松',
    dynasty: '晚唐',
    accuracy: 98,
    application: ['水口吉凶', '来去水法', '明堂水势', '沟渠道路'],
    classicQuote: '《天玉经》：二十四山双山起，寻龙立向配雌雄。明得山龙与水龙，便是郭璞再世翁。',
  },
]

const LUOPAN_LAYERS: LuopanLayer[] = [
  {
    name: '天池',
    layer: '中心',
    category: '核心层',
    detail: '指南针所在，定南北方位，罗经之灵魂。海底印有红线，与子午线对齐。一动一静之间，天地造化存焉。磁针常偏东约2-5度，此为磁偏角，非磁针之病，乃天地造化之妙也。',
    note: '针定而神凝，万化由此出',
    importance: 100,
    operatingTips: ['持罗经需平正', '远离铁器电线', '待针静止后读数', '海底红线需对齐'],
  },
  {
    name: '先天八卦',
    layer: '第一层',
    category: '卦象层',
    detail: '乾坤坎离震艮巽兑，伏羲八卦。天地定位，山泽通气，雷风相薄，水火不相射。此为先天对待之位，天造地设，不假人为。先天为体，言其本然之位置。',
    note: '对待之位，天造地设',
    importance: 95,
    operatingTips: ['乾南坤北为定位', '离东坎西不相射', '知其体方可用其用', '先天为基后天为用'],
  },
  {
    name: '后天八卦',
    layer: '第二层',
    category: '卦象层',
    detail: '坎离震兑分掌四正，乾巽艮坤分掌四维。文王八卦，人用之位。流行之气，循环无端。后天为用，言其流行之气机。坎一坤二震三巽四，中五乾六兑七艮八离九，洛书九宫之数也。',
    note: '流行之气，循环无端',
    importance: 95,
    operatingTips: ['坎北离南为正位', '洛书九宫相配', '飞星以此为基', '三元九运流行'],
  },
  {
    name: '八煞黄泉',
    layer: '第三层',
    category: '煞曜层',
    detail: '坎龙坤兔震山猴，巽鸡乾马兑蛇头，艮虎离猪为煞曜，宅墓逢之一时休。坐山煞也。如坎山忌辰龙来水，坤山忌卯兔来水。此为大煞，犯之主损丁破财。',
    note: '坐山忌，犯之大凶',
    importance: 90,
    operatingTips: ['先看坐山属何卦', '再看来水是何支', '犯之立见凶灾', '可改向避之'],
  },
  {
    name: '二十四山',
    layer: '地盘正针',
    category: '方位层',
    detail: '八干四维十二支，每山十五度，共计三百六十度。子午卯酉为四正，乾坤艮巽为四维，甲丙庚壬为八干。一山十五度，中间九度为正山，左右三度为兼山。分金差一线，富贵不相见。',
    note: '立向之根本，吉凶由此分',
    importance: 100,
    operatingTips: ['每山十五度分界明', '正山兼山有分寸', '不可大兼大差错', '旺相休囚需辨明'],
  },
  {
    name: '挨星',
    layer: '人盘中针',
    category: '消砂层',
    detail: '内盘天盘，外盘地盘。中针人盘，专论天星挨加。消砂之法，全在于是。生我者生，我生者泄，克我者煞，我克者奴，比和者旺。五行生克，吉凶了然。',
    note: '消砂要诀，生旺奴煞泄',
    importance: 92,
    operatingTips: ['以坐山五行为我', '看砂在何方位', '五行生克定吉凶', '远砂近砂有别'],
  },
  {
    name: '一百二十分金',
    layer: '地盘',
    category: '分金层',
    detail: '每山五分，每分三度。分金差一线，富贵不相见。乘气纳脉，差若毫厘，谬以千里。旺相分金可用，孤虚空亡不可用。一百二十分金，实一百二十分纳音五行也。',
    note: '穿山七十二龙用此',
    importance: 98,
    operatingTips: ['每山五分配干支', '旺相分金取其中', '龟甲空亡切宜忌', '纳音生克制化'],
  },
  {
    name: '七十二龙',
    layer: '中针',
    category: '格龙层',
    detail: '纳音五行，穿山透地。寻龙点穴之要，格龙乘气之法。龙地气脉，贵贱在此分。每支六龙，共计七十二。每龙五度。珠宝火坑，吉凶悬殊。穿山者，穿来山何龙也。',
    note: '格龙乘气，寻龙第一义',
    importance: 96,
    operatingTips: ['于过峡处格龙', '看属何纳音五行', '珠宝火坑宜详审', '乘生气为第一义'],
  },
  {
    name: '透地六十龙',
    layer: '中针',
    category: '点穴层',
    detail: '平冈行龙，入首乘气。每支十分，管三分之一度。穴中气脉，由此而真。透地者，入穴后坐山是何龙也。穿山论来龙，透地论入穴。二者皆真，方为大地。',
    note: '点穴乘气，生死关头',
    importance: 94,
    operatingTips: ['于穴场后八尺格之', '与穿山龙相生', '避出脉出煞', '脉穴合一为贵'],
  },
  {
    name: '二十八宿',
    layer: '天盘缝针',
    category: '天星层',
    detail: '天星度数，消砂纳水，天盘缝针论向。角亢氐房心尾箕，斗牛女虚危室壁，奎娄胃昴毕觜参，井鬼柳星张翼轸。二十八宿管度数，吉凶应验如神。',
    note: '天星对应，吉凶速应',
    importance: 88,
    operatingTips: ['每宿度数有盈缩', '度宿五行生克论', '吉星照临多福祉', '凶星临位主祸殃'],
  },
  {
    name: '三百六十五度',
    layer: '最外层',
    category: '度數層',
    detail: '周天度数，分金宿度，厘定坐向分数。太微垣，天市垣，紫微垣，在天成象，在地成形。每度六十分，每分六十秒。精确至秒，不差毫厘。分金宿度，此为标准。',
    note: '精确分金，不差分毫',
    importance: 90,
    operatingTips: ['周天三百六十五度四分度之一', '二十八宿各管度数', '坐向需精确至分', '兼山兼向有度数'],
  },
  {
    name: '十二长生',
    layer: '天盘',
    category: '水法层',
    detail: '长生沐浴冠带临官帝旺衰病死墓绝胎养，十二宫位。水去宜休囚死绝，水来宜长生帝旺。水法之要，全在十二长生。三合四大局，申子辰合水局，亥卯未合木局，寅午戌合火局，巳酉丑合金局。',
    note: '水法大纲，生旺墓绝',
    importance: 93,
    operatingTips: ['以向起长生论水', '左水倒右右水倒左', '四大局水法分明', '去水宜绝方来宜生'],
  },
]

const TWENTY_FOUR_MOUNTAINS: TwentyFourMountain[] = [
  {
    mountain: '壬',
    direction: '北北西',
    degree: '337.5° - 352.5°',
    wuxing: '水',
    category: '阳干',
    auspicious: ['子', '申', '辰'],
    avoid: ['午', '寅', '巳'],
    note: '阳水，天一生水',
    detail: '壬为阳水，天河之水，天一生水。位居正北之西，洛书数属一白。壬山丙向，北方正气，主聪明智慧，科甲连绵。',
    famousLocations: ['明十三陵壬山丙向', '故宫北墙壬位'],
  },
  {
    mountain: '子',
    direction: '正北',
    degree: '352.5° - 7.5°',
    wuxing: '水',
    category: '阳支',
    auspicious: ['申', '辰', '亥'],
    avoid: ['午', '未', '卯'],
    note: '正北，坎卦，天子之位',
    detail: '子为正北，坎卦之中，天子正位。洛书一白坎水。子山午向，坐北朝南，帝王之向。然纯阳不生，大忌兼壬兼癸，需兼三度以内。',
    famousLocations: ['北京故宫子山午向', '明孝陵子山午向'],
  },
  {
    mountain: '癸',
    direction: '北东北',
    degree: '7.5° - 22.5°',
    wuxing: '水',
    category: '阴干',
    auspicious: ['申', '子', '辰'],
    avoid: ['午', '戌', '未'],
    note: '阴水，雨露之水',
    detail: '癸为阴水，雨露之水，润物无声。位居正北之东，洛书一白。癸山丁向，主女秀，多出美女佳人，文章显达。',
    famousLocations: ['江南民居多用癸山丁向'],
  },
  {
    mountain: '丑',
    direction: '东北北',
    degree: '22.5° - 37.5°',
    wuxing: '土',
    category: '阴支',
    auspicious: ['巳', '酉', '丑'],
    avoid: ['未', '辰', '午'],
    note: '湿土，金库',
    detail: '丑为湿土，位居东北，金库之位。与巳酉三合金局。丑山未向，主田产丰盛，六畜兴旺，多生贵子。',
    famousLocations: ['北方农村阴宅多用丑山'],
  },
  {
    mountain: '艮',
    direction: '东北',
    degree: '37.5° - 52.5°',
    wuxing: '土',
    category: '四维',
    auspicious: ['丙', '午', '戌'],
    avoid: ['坤', '申', '亥'],
    note: '东北，少男，山泽通气',
    detail: '艮为山，东北正位，少男之卦，洛书八白。八白为当元旺星，艮山坤向，主富贵双全，人丁兴旺，三元不败之局。',
    famousLocations: ['艮山坤向为三元不败格'],
  },
  {
    mountain: '寅',
    direction: '东北东',
    degree: '52.5° - 67.5°',
    wuxing: '木',
    category: '阳支',
    auspicious: ['亥', '卯', '未'],
    avoid: ['申', '巳', '酉'],
    note: '阳木，功曹，三阳开泰',
    detail: '寅为阳木，功曹之位，三阳开泰。与亥卯未三合木局。寅山申向，主出武贵，兵权在握，侠肝义胆。',
    famousLocations: ['武宅多用寅山申向'],
  },
  {
    mountain: '甲',
    direction: '东东北',
    degree: '67.5° - 82.5°',
    wuxing: '木',
    category: '阳干',
    auspicious: ['亥', '卯', '未'],
    avoid: ['庚', '酉', '申'],
    note: '阳木，参天大树',
    detail: '甲为阳木，参天之木，栋梁之材。位居正东之北，洛书三碧震木。甲山庚向，主出公卿，栋梁之才，威震一方。',
    famousLocations: ['官宦之家甲山庚向'],
  },
  {
    mountain: '卯',
    direction: '正东',
    degree: '82.5° - 97.5°',
    wuxing: '木',
    category: '阴支',
    auspicious: ['亥', '未', '寅'],
    avoid: ['酉', '辰', '申'],
    note: '正东，震卦，太阳之门',
    detail: '卯为正东，震卦之中，太阳出升之门，紫气东来。洛书三碧。卯山酉向，主长房发达，男丁兴旺，文章盖世。',
    famousLocations: ['孔府卯山酉向'],
  },
  {
    mountain: '乙',
    direction: '东东南',
    degree: '97.5° - 112.5°',
    wuxing: '木',
    category: '阴干',
    auspicious: ['亥', '卯', '未'],
    avoid: ['辛', '酉', '戌'],
    note: '阴木，花草之木',
    detail: '乙为阴木，花草之木，柔美多姿。位居正东之南，洛书三碧。乙山辛向，主秀士文人，医卜星相，技艺超群。',
    famousLocations: ['文人宅乙山辛向'],
  },
  {
    mountain: '辰',
    direction: '东南东',
    degree: '112.5° - 127.5°',
    wuxing: '土',
    category: '阳支',
    auspicious: ['申', '子', '壬'],
    avoid: ['戌', '卯', '酉'],
    note: '湿土，水库，天罡',
    detail: '辰为湿土，位居东南，水库之位，天罡星。与申子三合水局。辰山戌向，主出大将，镇守边疆，功成名就。',
    famousLocations: ['军营多辰山戌向'],
  },
  {
    mountain: '巽',
    direction: '东南',
    degree: '127.5° - 142.5°',
    wuxing: '木',
    category: '四维',
    auspicious: ['艮', '丙', '午'],
    avoid: ['乾', '亥', '子'],
    note: '东南，长女，文笔峰',
    detail: '巽为风，东南正位，长女之卦，洛书四绿。四绿为文昌星，巽山乾向，主文章科甲，金榜题名，书香门第。',
    famousLocations: ['书院巽山乾向'],
  },
  {
    mountain: '巳',
    direction: '东南南',
    degree: '142.5° - 157.5°',
    wuxing: '火',
    category: '阴支',
    auspicious: ['寅', '午', '戌'],
    avoid: ['亥', '申', '子'],
    note: '阴火，太乙，盛阳',
    detail: '巳为阴火，太乙之位，盛阳之极。与寅午戌三合火局。巳山亥向，主聪明绝顶，才华横溢，少年得志。',
    famousLocations: ['少年科甲巳山亥向'],
  },
  {
    mountain: '丙',
    direction: '南东南',
    degree: '157.5° - 172.5°',
    wuxing: '火',
    category: '阳干',
    auspicious: ['寅', '午', '戌'],
    avoid: ['壬', '子', '亥'],
    note: '阳火，太阳之火',
    detail: '丙为阳火，太阳之火，普照万物。位居正南之东，洛书九紫离火。丙山壬向，主大富大贵，福寿双全。',
    famousLocations: ['南方民居丙山壬向'],
  },
  {
    mountain: '午',
    direction: '正南',
    degree: '172.5° - 187.5°',
    wuxing: '火',
    category: '阳支',
    auspicious: ['寅', '戌', '巳'],
    avoid: ['子', '丑', '亥'],
    note: '正南，离卦，天中之位',
    detail: '午为正南，离卦之中，天中之正位，洛书九紫。午山子向，面南背北，帝王之坐，百官朝见，至尊之位。',
    famousLocations: ['故宫正殿午山子向'],
  },
  {
    mountain: '丁',
    direction: '南西南',
    degree: '187.5° - 202.5°',
    wuxing: '火',
    category: '阴干',
    auspicious: ['寅', '午', '戌'],
    avoid: ['癸', '子', '丑'],
    note: '阴火，灯烛之火',
    detail: '丁为阴火，灯烛之火，长明不灭。位居正南之西，洛书九紫。丁山癸向，主人丁兴旺，子孙满堂，香火不绝。',
    famousLocations: ['宗祠丁山癸向'],
  },
  {
    mountain: '未',
    direction: '西南南',
    degree: '202.5° - 217.5°',
    wuxing: '土',
    category: '阴支',
    auspicious: ['亥', '卯', '壬'],
    avoid: ['丑', '子', '辰'],
    note: '燥土，木库',
    detail: '未为燥土，位居西南，木库之位。与亥卯卯三合木局。未山丑向，主仓库丰盈，积蓄良多，百年大计。',
    famousLocations: ['钱庄未山丑向'],
  },
  {
    mountain: '坤',
    direction: '西南',
    degree: '217.5° - 232.5°',
    wuxing: '土',
    category: '四维',
    auspicious: ['艮', '壬', '子'],
    avoid: ['艮', '寅', '午'],
    note: '西南，老母，厚德载物',
    detail: '坤为地，西南正位，老母之卦，洛书二黑。坤山艮向，主母仪天下，厚德载物，多生贵子，贤妻良母。',
    famousLocations: ['坤山艮向为地天泰格'],
  },
  {
    mountain: '申',
    direction: '西南西',
    degree: '232.5° - 247.5°',
    wuxing: '金',
    category: '阳支',
    auspicious: ['子', '辰', '壬'],
    avoid: ['寅', '巳', '午'],
    note: '阳金，传送，白虎',
    detail: '申为阳金，传送之位，白虎星。与子辰三合水局。申山寅向，主武贵兵权，杀伐决断，执法如山。',
    famousLocations: ['官府衙门申山寅向'],
  },
  {
    mountain: '庚',
    direction: '西西南',
    degree: '247.5° - 262.5°',
    wuxing: '金',
    category: '阳干',
    auspicious: ['巳', '酉', '丑'],
    avoid: ['甲', '卯', '寅'],
    note: '阳金，刀剑之金',
    detail: '庚为阳金，刀剑之金，刚健锐利。位居正西之南，洛书七赤兑金。庚山甲向，主武略超群，出将入相，威名远播。',
    famousLocations: ['武将府庚山甲向'],
  },
  {
    mountain: '酉',
    direction: '正西',
    degree: '262.5° - 277.5°',
    wuxing: '金',
    category: '阴支',
    auspicious: ['巳', '丑', '辰'],
    avoid: ['卯', '午', '戌'],
    note: '正西，兑卦，太阴之位',
    detail: '酉为正西，兑卦之中，太阴之正位，洛书七赤。酉山卯向，主小房发达，多出美女，金珠玉帛。',
    famousLocations: ['王府酉山卯向'],
  },
  {
    mountain: '辛',
    direction: '西西北',
    degree: '277.5° - 292.5°',
    wuxing: '金',
    category: '阴干',
    auspicious: ['巳', '酉', '丑'],
    avoid: ['乙', '卯', '辰'],
    note: '阴金，首饰之金',
    detail: '辛为阴金，首饰之金，精美华贵。位居正西之北，洛书七赤。辛山乙向，主清雅富贵，书画琴棋，雅士高人。',
    famousLocations: ['文人雅士辛山乙向'],
  },
  {
    mountain: '戌',
    direction: '西北西',
    degree: '292.5° - 307.5°',
    wuxing: '土',
    category: '阳支',
    auspicious: ['寅', '午', '丙'],
    avoid: ['辰', '卯', '巳'],
    note: '燥土，火库，河魁',
    detail: '戌为燥土，位居西北，火库之位，河魁星。与寅午戌三合火局。戌山辰向，主僧道高人，修仙得道，异路功名。',
    famousLocations: ['寺庙道观戌山辰向'],
  },
  {
    mountain: '乾',
    direction: '西北',
    degree: '307.5° - 322.5°',
    wuxing: '金',
    category: '四维',
    auspicious: ['巽', '壬', '子'],
    avoid: ['巽', '巳', '午'],
    note: '西北，老父，天行健',
    detail: '乾为天，西北正位，老父之卦，洛书六白。六白为武曲星，乾山巽向，主出王侯将相，位极人臣，寿比南山。',
    famousLocations: ['皇宫内院乾山巽向'],
  },
  {
    mountain: '亥',
    direction: '西北北',
    degree: '322.5° - 337.5°',
    wuxing: '水',
    category: '阴支',
    auspicious: ['卯', '未', '寅'],
    avoid: ['巳', '申', '午'],
    note: '阴水，登明，天门',
    detail: '亥为阴水，登明之位，天关地轴，天门所在。与卯未三合木局。亥山巳向，主神仙中人，长生不老，福寿绵绵。',
    famousLocations: ['道观亥山巳向'],
  },
]

const LUOPAN_USAGES: LuopanUsage[] = [
  {
    name: '立向法',
    purpose: '定阳宅阴宅坐向',
    difficulty: 75,
    steps: ['于宅墓中宫下罗经', '平正罗经待针定', '看坐山与朝向何字', '分金立向定兼山'],
    notes: ['需避开铁器电线', '多人复核为准', '阳宅以大门立向', '阴宅以碑立向'],
  },
  {
    name: '格龙法',
    purpose: '格来龙何五行',
    difficulty: 90,
    steps: ['于过峡处下罗经', '看龙入首何字', '查七十二龙纳音', '定龙贵贱吉凶'],
    notes: ['过峡处最真', '避风吹水劫', '与入首龙相生', '珠宝火坑宜审'],
  },
  {
    name: '消砂法',
    purpose: '定山峰吉凶',
    difficulty: 85,
    steps: ['于穴场下罗经', '看山峰在人盘何位', '以坐山五行为我', '生克定吉凶'],
    notes: ['用人盘中针', '远砂近砂有别', '高大者力大', '有情无情为要'],
  },
  {
    name: '纳水法',
    purpose: '定来去水吉凶',
    difficulty: 80,
    steps: ['于穴场下罗经', '看水去来在天盘何位', '双山五行起长生', '生旺墓断定吉凶'],
    notes: ['用天盘缝针', '去水宜绝方', '来水宜生旺', '水口关锁为上'],
  },
]

export default function LuopanPage() {
  const [filteredHistory, setFilteredHistory] = useState(LUOPAN_HISTORY)
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null)
  const [filteredNeedles, setFilteredNeedles] = useState(THREE_NEEDLES)
  const [expandedNeedle, setExpandedNeedle] = useState<string | null>(null)
  const [filteredLayers, setFilteredLayers] = useState(LUOPAN_LAYERS)
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null)
  const [filteredMountains, setFilteredMountains] = useState(TWENTY_FOUR_MOUNTAINS)
  const [expandedMountain, setExpandedMountain] = useState<string | null>(null)
  const [filteredUsages, setFilteredUsages] = useState(LUOPAN_USAGES)
  const [expandedUsage, setExpandedUsage] = useState<string | null>(null)

  const handleHistoryFilter = useCallback((data: typeof LUOPAN_HISTORY) => {
    setFilteredHistory(data)
  }, [])

  const handleNeedleFilter = useCallback((data: typeof THREE_NEEDLES) => {
    setFilteredNeedles(data)
  }, [])

  const handleLayerFilter = useCallback((data: typeof LUOPAN_LAYERS) => {
    setFilteredLayers(data)
  }, [])

  const handleMountainFilter = useCallback((data: typeof TWENTY_FOUR_MOUNTAINS) => {
    setFilteredMountains(data)
  }, [])

  const handleUsageFilter = useCallback((data: typeof LUOPAN_USAGES) => {
    setFilteredUsages(data)
  }, [])

  const getWuxingColor = (wuxing: string) => {
    switch (wuxing) {
      case '金': return '#fbbf24'
      case '木': return '#22c55e'
      case '水': return '#3b82f6'
      case '火': return '#ef4444'
      case '土': return '#a78bfa'
      default: return '#6b7280'
    }
  }

  return (
    <SubPageTemplate
      title="罗经奥义"
      subtitle="天地定位 · 山泽通气 · 罗经指掌 · 万化由心"
      icon="🧭"
      colorRgb="251, 191, 36"
    >
      <SubPageSection title="罗经心法">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            罗经者，经天纬地之法器也。一罗盘在手，二十四山方位了然。天地定位，山泽通气，雷风相薄，水火不相射。八卦相错，数往者顺，知来者逆。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            虚危之间针路明，南方张宿上三乘。坎离正位人难识，差却毫厘断不灵。盘是死盘，针是活针。人是盘主，非盘主人。得之于心，应之于手。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            罗经之用，在于正心诚意。心不正，则针不灵。罗盘不过是工具，真正的罗经在你心中。人心即是天心，我心即是罗盘。不假外求，本自具足。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title={`罗经发展史 (${filteredHistory.length}/${LUOPAN_HISTORY.length})`}>
        <FilterBar
          data={LUOPAN_HISTORY}
          searchKeys={['era', 'form', 'material', 'feature', 'detail', 'representative']}
          filterOptions={[
            { key: 'era', label: '朝代', allLabel: '全部朝代' },
          ]}
          onFiltered={handleHistoryFilter}
          placeholder="搜索发展阶段、形制、特点..."
        />
        <div style={{ marginTop: '1rem' }}>
          {filteredHistory.map((era, index) => (
            <motion.div
              key={era.era}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedHistory(expandedHistory === era.era ? null : era.era)}
              style={{ cursor: 'pointer', marginBottom: '0.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(251, 191, 36, 0.05))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#fbbf24',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                }}>
                  {era.era}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ color: '#b89438', marginBottom: '0.25rem' }}>{era.form}</h3>
                    <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}>
                      {era.material}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.75)' }}>
                    {era.feature}
                  </p>
                </div>
              </div>
              <AnimatePresence>
                {expandedHistory === era.era && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem', marginLeft: '70px' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                        {era.detail}
                      </p>
                      <div style={{ padding: '0.5rem', background: 'rgba(251, 191, 36, 0.08)', borderRadius: '4px', borderLeft: '3px solid #fbbf24' }}>
                        <p style={{ color: 'rgba(180, 180, 190, 0.75)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                          📜 {era.representative}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title={`三针三盘 (${filteredNeedles.length}/${THREE_NEEDLES.length})`}>
        <FilterBar
          data={THREE_NEEDLES}
          searchKeys={['name', 'usage', 'purpose', 'principle', 'detail', 'invented', 'application']}
          filterOptions={[
            { key: 'dynasty', label: '创立年代', allLabel: '全部年代' },
          ]}
          onFiltered={handleNeedleFilter}
          placeholder="搜索三针名称、用法、发明者..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.25rem',
          marginTop: '1rem',
        }}>
          {filteredNeedles.map((needle, index) => (
            <motion.div
              key={needle.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedNeedle(expandedNeedle === needle.name ? null : needle.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#b89438' }}>{needle.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}>
                    {needle.usage}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 'bold' }}>
                    精度 {needle.accuracy}%
                  </span>
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.5)', marginBottom: '0.5rem' }}>
                {needle.invented} 传 · {needle.dynasty}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.75)', marginBottom: '0.5rem' }}>
                <span style={{ color: '#22c55e' }}>原理：</span> {needle.principle}
              </div>
              <ProgressBar value={needle.accuracy} label="精准度" max={100} color="251, 191, 36" />
              <AnimatePresence>
                {expandedNeedle === needle.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                        {needle.detail}
                      </p>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.75rem', color: '#b89438', marginBottom: '0.35rem' }}>📋 适用范围</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {needle.application.map((app, i) => (
                            <span key={i} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', borderRadius: '3px' }}>
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div style={{ padding: '0.5rem', background: 'rgba(139, 92, 246, 0.08)', borderRadius: '4px', borderLeft: '3px solid #8b5cf6' }}>
                        <p style={{ color: 'rgba(180, 180, 190, 0.75)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                          {needle.classicQuote}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title={`罗经十二层解 (${filteredLayers.length}/${LUOPAN_LAYERS.length})`}>
        <FilterBar
          data={LUOPAN_LAYERS}
          searchKeys={['name', 'layer', 'category', 'detail', 'note', 'operatingTips']}
          filterOptions={[
            { key: 'category', label: '层级分类', allLabel: '全部分类' },
          ]}
          onFiltered={handleLayerFilter}
          placeholder="搜索圈层名称、内容、要领..."
        />
        <div style={{ marginTop: '1rem' }}>
          {filteredLayers.map((layer, index) => (
            <motion.div
              key={layer.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedLayer(expandedLayer === layer.name ? null : layer.name)}
              style={{ cursor: 'pointer', marginBottom: '0.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '80px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)', marginBottom: '0.25rem' }}>{layer.layer}</div>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}>
                    {layer.category}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ color: '#b89438', marginBottom: '0.25rem' }}>{layer.name}</h3>
                    <span style={{ fontSize: '0.8rem', color: layer.importance >= 98 ? '#ef4444' : layer.importance >= 95 ? '#8b5cf6' : '#3b82f6', fontWeight: 'bold' }}>
                      重要度 {layer.importance}%
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.75)' }}>
                    {layer.note}
                  </p>
                </div>
              </div>
              <AnimatePresence>
                {expandedLayer === layer.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem', marginLeft: '90px' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                        {layer.detail}
                      </p>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#b89438', marginBottom: '0.35rem' }}>✅ 使用要诀</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {layer.operatingTips.map((tip, i) => (
                            <span key={i} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', borderRadius: '3px' }}>
                              {tip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title={`二十四山全解 (${filteredMountains.length}/${TWENTY_FOUR_MOUNTAINS.length})`}>
        <FilterBar
          data={TWENTY_FOUR_MOUNTAINS}
          searchKeys={['mountain', 'direction', 'degree', 'wuxing', 'note', 'detail', 'category']}
          filterOptions={[
            { key: 'wuxing', label: '五行', allLabel: '全部五行' },
            { key: 'category', label: '类别', allLabel: '全部类别' },
          ]}
          onFiltered={handleMountainFilter}
          placeholder="搜索山向名称、方位、五行..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredMountains.map((m, index) => (
            <motion.div
              key={m.mountain}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedMountain(expandedMountain === m.mountain ? null : m.mountain)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#b89438', fontSize: '1.25rem' }}>{m.mountain}山</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: `rgba(${getWuxingColor(m.wuxing).slice(1)}, 0.2)`, color: getWuxingColor(m.wuxing) }}>
                    {m.wuxing}
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'rgba(255,255,255,0.08)', color: 'rgba(180, 180, 190, 0.7)' }}>
                    {m.category}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)', marginBottom: '0.35rem' }}>
                {m.direction} · {m.degree}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.75)' }}>
                {m.note}
              </p>
              <AnimatePresence>
                {expandedMountain === m.mountain && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                        {m.detail}
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: '#22c55e', marginBottom: '0.25rem' }}>✓ 宜</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                            {m.auspicious.map((a, i) => (
                              <span key={i} style={{ fontSize: '0.7rem', padding: '0.1rem 0.35rem', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', borderRadius: '3px' }}>
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: '#ef4444', marginBottom: '0.25rem' }}>✗ 忌</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                            {m.avoid.map((a, i) => (
                              <span key={i} style={{ fontSize: '0.7rem', padding: '0.1rem 0.35rem', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderRadius: '3px' }}>
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#b89438', marginBottom: '0.25rem' }}>📍 著名实例</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                          {m.famousLocations.map((loc, i) => (
                            <span key={i} style={{ fontSize: '0.7rem', padding: '0.1rem 0.35rem', background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', borderRadius: '3px' }}>
                              {loc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title={`罗经四用 (${filteredUsages.length}/${LUOPAN_USAGES.length})`}>
        <FilterBar
          data={LUOPAN_USAGES}
          searchKeys={['name', 'purpose', 'steps', 'notes']}
          filterOptions={[]}
          onFiltered={handleUsageFilter}
          placeholder="搜索使用方法、操作步骤..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredUsages.map((usage, index) => (
            <motion.div
              key={usage.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedUsage(expandedUsage === usage.name ? null : usage.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#b89438' }}>{usage.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ProgressBar value={usage.difficulty} label="难度" max={100} color="239, 68, 68" />
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.75)', marginBottom: '0.5rem' }}>
                用途：{usage.purpose}
              </p>
              <AnimatePresence>
                {expandedUsage === usage.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.75rem', color: '#b89438', marginBottom: '0.35rem' }}>📋 操作步骤</div>
                        {usage.steps.map((step, i) => (
                          <div key={i} style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)', marginBottom: '0.25rem' }}>
                            {i + 1}. {step}
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#b89438', marginBottom: '0.35rem' }}>⚠️ 注意事项</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                          {usage.notes.map((note, i) => (
                            <span key={i} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderRadius: '3px' }}>
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
