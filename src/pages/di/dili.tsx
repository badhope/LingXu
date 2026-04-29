import React, { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface SacredMountain {
  name: string
  location: string
  altitude: string
  worship: string
  deity: string
  energy: number
  feature: string
  detail: string
  temples: string[]
  historicSites: string[]
  legends: string[]
  bestTime: string[]
}

const FIVE_SACRED_MOUNTAINS: SacredMountain[] = [
  {
    name: '东岳泰山',
    location: '山东泰安',
    altitude: '1545米',
    worship: '历代帝王封禅',
    deity: '东岳大帝',
    energy: 98,
    feature: '五岳独尊，群山之祖',
    detail: '泰山为五岳之首，历朝历代七十二帝王封禅于此。孔子登东山而小鲁，登泰山而小天下。会当凌绝顶，一览众山小。泰山安，则四海安。自秦始皇开始，先后有13代帝王亲登泰山封禅或祭祀。泰山雄峙于东方，主生发之气，万物之所出，主生、主贵、主权、主寿。',
    temples: ['岱庙', '碧霞祠', '玉皇庙', '王母池'],
    historicSites: ['秦泰山刻石', '经石峪金刚经', '唐摩崖', '五大夫松'],
    legends: ['东岳大帝统摄幽冥', '碧霞元君送子', '石敢当镇宅', '仙人桥吕洞宾'],
    bestTime: ['春季观日出', '夏季避暑', '秋季观云海', '冬季赏雪景'],
  },
  {
    name: '西岳华山',
    location: '陕西华阴',
    altitude: '2155米',
    worship: '少昊白帝镇守',
    deity: '金天顺圣帝',
    energy: 95,
    feature: '奇险天下第一山',
    detail: '华山自古一条路，倚天绝壁，万丈深渊。沉香劈山救母，传说流传千古。华山论剑，高手云集。华山主金，主义、主勇、主战。西岳华山，五帝时称"太华"，夏商时称"西岳"，雅称"华岳"。',
    temples: ['西岳庙', '玉泉院', '镇岳宫', '东道院'],
    historicSites: ['长空栈道', '鹞子翻身', '千尺幢', '百尺峡'],
    legends: ['沉香劈山救母', '陈抟老祖弈棋', '吕洞宾纯阳观', '吹箫引凤'],
    bestTime: ['春季赏花', '夏季登山', '秋季红叶', '冬季雪景'],
  },
  {
    name: '南岳衡山',
    location: '湖南衡阳',
    altitude: '1300米',
    worship: '火神祝融镇守',
    deity: '司天昭圣帝',
    energy: 92,
    feature: '五岳独秀，寿比南山',
    detail: '衡山七十二峰，回雁为首，岳麓为足。祝融峰高，天柱峰秀。衡山主火德星君，主寿、主禄、主文。南岳朱陵之天，朱鸟之墟。衡山佛道共存，香火鼎盛，历代香火不断。',
    temples: ['南岳大庙', '祝圣寺', '福严寺', '南台寺'],
    historicSites: ['祝融殿', '藏经殿', '方广寺', '水帘洞'],
    legends: ['祝融取火', '慧思禅师立誓', '怀让磨砖作镜', '船子和尚度夹山'],
    bestTime: ['春季杜鹃盛开', '夏季避暑胜地', '秋季云海日出', '冬季雾凇奇观'],
  },
  {
    name: '北岳恒山',
    location: '山西浑源',
    altitude: '2016米',
    worship: '北岳真君',
    deity: '安天玄圣帝',
    energy: 90,
    feature: '人天北柱，绝塞名山',
    detail: '恒山横亘塞上，太行之脊。悬空寺千年不倒，建筑奇迹。北岳主水，主智、主寿、主福。恒山为古代中原屏障，兵家必争之地，一夫当关，万夫莫开。',
    temples: ['悬空寺', '北岳庙', '恒宗殿', '九天宫'],
    historicSites: ['恒山十八景', '果老岭', '姑嫂崖', '飞石窟'],
    legends: ['张果老倒骑毛驴', '黑龙治水', '孟姜女哭长城', '穆桂英点将'],
    bestTime: ['春季桃花盛开', '夏季清凉世界', '秋季层林尽染', '冬季北国风光'],
  },
  {
    name: '中岳嵩山',
    location: '河南登封',
    altitude: '1492米',
    worship: '中天崇圣帝',
    deity: '中天王',
    energy: 97,
    feature: '天地之中，三教荟萃',
    detail: '嵩山居天地之中，少林寺名扬天下。嵩阳书院，程朱理学发源地。中岳主土，主信、主厚、主载。嵩山乃三教荟萃之地，佛道儒三家共存共荣。',
    temples: ['少林寺', '中岳庙', '嵩阳书院', '法王寺'],
    historicSites: ['少林寺塔林', '汉三阙', '嵩岳寺塔', '观星台'],
    legends: ['达摩面壁九年', '慧可立雪断臂', '二程讲学', '武则天封禅'],
    bestTime: ['春季百花争艳', '夏季绿树成荫', '秋季银杏金黄', '冬季松柏常青'],
  },
]

interface GreatRiver {
  name: string
  length: string
  origin: string
  destination: string
  drainage: string
  importance: number
  feature: string
  detail: string
  tributaries: string[]
  historicCities: string[]
  culturalSites: string[]
  waterQuality: string
}

const FOUR_GREAT_RIVERS: GreatRiver[] = [
  {
    name: '长江',
    length: '6300公里',
    origin: '青藏高原唐古拉山',
    destination: '东海',
    drainage: '180万平方公里',
    importance: 100,
    feature: '亚洲第一长河，华夏文明母亲河',
    detail: '大江东去，浪淘尽千古风流人物。长江自西向东，孕育了巴蜀文化、荆楚文化、吴越文化。长江天险，南北分界。长江流域，鱼米之乡，物产丰饶，人文荟萃。三峡天险，夔门天下雄。',
    tributaries: ['岷江', '嘉陵江', '乌江', '汉江', '湘江', '赣江'],
    historicCities: ['重庆', '宜昌', '武汉', '南京', '上海', '扬州'],
    culturalSites: ['三峡大坝', '黄鹤楼', '岳阳楼', '滕王阁', '都江堰'],
    waterQuality: '优良',
  },
  {
    name: '黄河',
    length: '5464公里',
    origin: '青藏高原巴颜喀拉山',
    destination: '渤海',
    drainage: '75万平方公里',
    importance: 99,
    feature: '母亲河，中华文明摇篮',
    detail: '黄河九曲，孕育了华夏文明。黄河之水天上来，奔流到海不复回。黄土高原，炎黄故里。中原腹地，帝王之所兴。黄河百害，惟富一套。黄河改道，塑造了华北平原。',
    tributaries: ['渭河', '汾河', '洛河', '沁河'],
    historicCities: ['西安', '洛阳', '开封', '郑州', '济南'],
    culturalSites: ['壶口瀑布', '龙门石窟', '少林寺', '大雁塔', '兵马俑'],
    waterQuality: '良好',
  },
  {
    name: '淮河',
    length: '1000公里',
    origin: '河南桐柏山',
    destination: '长江',
    drainage: '27万平方公里',
    importance: 88,
    feature: '南北地理分界线',
    detail: '淮水汤汤，淮夷之地。橘生淮南则为橘，生于淮北则为枳。淮河两岸，民风淳朴。江淮地区，人杰地灵。淮河两岸，英雄辈出。淮扬文化，独树一帜。',
    tributaries: ['洪河', '颍河', '涡河', '史灌河'],
    historicCities: ['淮安', '扬州', '寿州', '蚌埠'],
    culturalSites: ['明祖陵', '洪泽湖', '八公山', '芍陂'],
    waterQuality: '一般',
  },
  {
    name: '济水',
    length: '850公里',
    origin: '河南济源王屋山',
    destination: '渤海',
    drainage: '5万平方公里',
    importance: 85,
    feature: '四渎之一，隐流千年',
    detail: '济水三伏三现，神奇莫测。济源、济南、济宁、济阳，皆因济水而得名。济水清而廉，圣人出则黄河清，济水常清。济水虽微，位列四渎，与江河淮并列。',
    tributaries: ['汶水', '濮水', '泺水'],
    historicCities: ['济源', '济宁', '济南', '临淄'],
    culturalSites: ['济渎庙', '大明湖', '趵突泉', '王屋山'],
    waterQuality: '清冽',
  },
]

interface AncientState {
  name: string
  scope: string
  capital: string
  culture: string
  characteristic: string
  famousPeople: string[]
  traditions: string[]
  landmarks: string[]
  prosperity: number
  detail: string
}

const NINE_STATES: AncientState[] = [
  {
    name: '冀州',
    scope: '河北、山西、北京',
    capital: '蓟',
    culture: '燕赵文化',
    characteristic: '慷慨悲歌',
    famousPeople: ['荆轲', '廉颇', '蔺相如', '刘备', '赵云'],
    traditions: ['尚武精神', '侠义之风', '厚葬习俗'],
    landmarks: ['燕长城', '赵长城', '中山国遗址', '易水'],
    prosperity: 88,
    detail: '冀为九州之首，帝都所在。燕赵自古多慷慨悲歌之士。风萧萧兮易水寒，壮士一去兮不复还。冀州之地，四战之国，英雄辈出。冀州为古帝王之都，尧舜禹皆在此地。',
  },
  {
    name: '兖州',
    scope: '山东西部、河南东部',
    capital: '定陶',
    culture: '邹鲁文化',
    characteristic: '崇文重教',
    famousPeople: ['孔子', '孟子', '曾子', '颜回', '鲁班'],
    traditions: ['礼乐之邦', '尊师重道', '诗礼传家'],
    landmarks: ['孔庙', '孟庙', '孔林', '峄山'],
    prosperity: 92,
    detail: '兖州为孔孟故里，礼乐之乡。邹鲁遗风，弦歌不绝。天下英才，多出邹鲁。兖州之地，物产丰饶，人文荟萃，圣人辈出。齐鲁大地，礼仪之邦。',
  },
  {
    name: '青州',
    scope: '山东半岛',
    capital: '临淄',
    culture: '齐文化',
    characteristic: '工商发达',
    famousPeople: ['姜太公', '管仲', '孙武', '孙膑', '扁鹊'],
    traditions: ['渔盐之利', '稷下学宫', '百家争鸣'],
    landmarks: ['临淄故城', '稷下学宫', '齐桓公墓', '沂山'],
    prosperity: 95,
    detail: '青州海岱惟青州。齐国富强，管仲九合诸侯，一匡天下。稷下学宫，百家争鸣。临淄七万户，富冠海内。齐人足智，好议论，多辩才。',
  },
  {
    name: '徐州',
    scope: '江苏北部、山东南部',
    capital: '彭城',
    culture: '楚汉文化',
    characteristic: '帝王之乡',
    famousPeople: ['刘邦', '项羽', '韩信', '萧何', '张良'],
    traditions: ['楚歌楚舞', '汉赋汉乐', '尚武之风'],
    landmarks: ['项羽故宫', '刘邦故里', '韩信点将台', '云龙湖'],
    prosperity: 85,
    detail: '徐州四战之地，南北要冲。楚汉相争，英雄逐鹿。至今思项羽，不肯过江东。楚汉相争的主战场就在徐州地区，留下了无数历史传说和古迹。',
  },
  {
    name: '扬州',
    scope: '江苏南部、浙江、安徽',
    capital: '会稽',
    culture: '吴越文化',
    characteristic: '江南水乡',
    famousPeople: ['夫差', '勾践', '范蠡', '西施', '伍子胥'],
    traditions: ['水乡风情', '园林艺术', '丝绸文化'],
    landmarks: ['虎丘', '西湖', '会稽山', '太湖'],
    prosperity: 96,
    detail: '扬州江南佳丽地，金陵帝王州。吴越争霸，卧薪尝胆。三千越甲可吞吴。烟花三月下扬州，春风十里扬州路。江南富庶之地，鱼米之乡。',
  },
  {
    name: '荆州',
    scope: '湖北、湖南',
    capital: '江陵',
    culture: '楚文化',
    characteristic: '浪漫奔放',
    famousPeople: ['屈原', '庄王', '老子', '宋玉', '春申君'],
    traditions: ['楚辞离骚', '巫风盛行', '凤凰图腾'],
    landmarks: ['楚故都纪南城', '屈原故里', '岳阳楼', '黄鹤楼'],
    prosperity: 90,
    detail: '荆州楚文化发源地。惟楚有才，于斯为盛。路漫漫其修远兮，吾将上下而求索。楚人不服周，问鼎中原。楚文化浪漫奔放，富有想象力。',
  },
  {
    name: '豫州',
    scope: '河南大部',
    capital: '洛阳',
    culture: '中原文化',
    characteristic: '天下之中',
    famousPeople: ['伏羲', '女娲', '黄帝', '老子', '墨子'],
    traditions: ['河图洛书', '周易八卦', '少林功夫'],
    landmarks: ['少林寺', '龙门石窟', '白马寺', '嵩山'],
    prosperity: 98,
    detail: '豫州居天下之中，四方辐辏。得中原者得天下。洛阳古都，十三朝都会。中原为华夏文明的核心区域，五千年文明看河南。',
  },
  {
    name: '梁州',
    scope: '四川、重庆、陕西南部',
    capital: '成都',
    culture: '巴蜀文化',
    characteristic: '天府之国',
    famousPeople: ['李冰', '司马相如', '诸葛亮', '李白', '苏轼'],
    traditions: ['蜀锦蜀绣', '川剧变脸', '茶道文化'],
    landmarks: ['都江堰', '武侯祠', '峨眉山', '青城山'],
    prosperity: 93,
    detail: '梁州蜀道难，难于上青天。巴蜀天府之国，沃野千里。丞相祠堂何处寻，锦官城外柏森森。四川盆地，物华天宝，人杰地灵，蜀文化独树一帜。',
  },
  {
    name: '雍州',
    scope: '陕西、甘肃、宁夏',
    capital: '咸阳',
    culture: '秦陇文化',
    characteristic: '帝王基业',
    famousPeople: ['秦始皇', '汉武帝', '白起', '王翦', '司马迁'],
    traditions: ['秦风秦韵', '兵马俑阵', '丝绸之路'],
    landmarks: ['兵马俑', '大雁塔', '华清池', '华山'],
    prosperity: 94,
    detail: '雍州秦中自古帝王州。秦王扫六合，虎视何雄哉。关中形胜，金城千里。十三朝古都长安，丝绸之路起点。秦地民风强悍，勇于公战。',
  },
]

interface BuddhistMountain {
  name: string
  location: string
  altitude: string
  buddha: string
  sect: string
  influence: number
  feature: string
  detail: string
  temples: string[]
  relics: string[]
  festivals: string[]
  practices: string[]
}

const BUDDHIST_MOUNTAINS: BuddhistMountain[] = [
  {
    name: '五台山',
    location: '山西五台',
    altitude: '3061米',
    buddha: '文殊菩萨',
    sect: '汉传佛教',
    influence: 100,
    feature: '金色世界，清凉圣境',
    detail: '五台山为四大佛教名山之首，文殊菩萨道场。五峰耸立，高出云表，山顶无林木，有如垒土之台，故曰五台。五台山始建于东汉，历代皇家道场，香火鼎盛。',
    temples: ['显通寺', '塔院寺', '菩萨顶', '殊像寺', '南山寺'],
    relics: ['释迦牟尼舍利', '文殊菩萨像', '清凉石'],
    festivals: ['六月大法会', '文殊菩萨圣诞', '千僧斋'],
    practices: ['参禅打坐', '诵经念佛', '三步一拜'],
  },
  {
    name: '普陀山',
    location: '浙江舟山',
    altitude: '291米',
    buddha: '观音菩萨',
    sect: '观音法门',
    influence: 98,
    feature: '海天佛国，南海圣境',
    detail: '普陀山为观音菩萨道场，海上有山多圣贤，聚宝所成极清净。华果树林皆遍满，泉流池沼悉具足。普陀山孤悬东海，潮音洞听潮，梵音洞观日。南海观音铜像，慈悲接引。',
    temples: ['普济寺', '法雨寺', '慧济寺', '紫竹林', '不肯去观音院'],
    relics: ['不肯去观音像', '观音脚印', '杨枝观音碑'],
    festivals: ['观音香会节', '普陀山文化节', '莲华灯会'],
    practices: ['观音法会', '放生法会', '朝山进香'],
  },
  {
    name: '峨眉山',
    location: '四川峨眉',
    altitude: '3099米',
    buddha: '普贤菩萨',
    sect: '大乘佛教',
    influence: 95,
    feature: '银色世界，仙山佛国',
    detail: '峨眉山为普贤菩萨道场，峨眉天下秀。蜀国多仙山，峨眉邈难匹。峨眉山金顶佛光，云海日出，虚幻缥缈。普贤骑象，行愿无尽。峨眉山月半轮秋，影入平羌江水流。',
    temples: ['报国寺', '伏虎寺', '清音阁', '万年寺', '金顶华藏寺'],
    relics: ['普贤金像', '佛牙舍利', '贝叶经'],
    festivals: ['普贤菩萨圣诞', '峨眉山佛教文化节', '万盏明灯供普贤'],
    practices: ['普贤行愿', '禅修体验', '抄经祈福'],
  },
  {
    name: '九华山',
    location: '安徽青阳',
    altitude: '1342米',
    buddha: '地藏菩萨',
    sect: '地藏法门',
    influence: 93,
    feature: '莲花佛国，幽冥教主',
    detail: '九华山为地藏菩萨道场，地狱不空，誓不成佛。众生度尽，方证菩提。金地藏肉身不腐，成就菩萨道。九华山九十九座峰，九十九座寺。肉身宝殿，香火千年不绝。',
    temples: ['化城寺', '肉身宝殿', '百岁宫', '祇园寺', '甘露寺'],
    relics: ['金地藏肉身', '无瑕禅师肉身', '大兴和尚肉身'],
    festivals: ['地藏法会', '九华山庙会', '水陆法会'],
    practices: ['地藏忏法', '盂兰盆会', '朝山礼佛'],
  },
]

export default function DiliPage() {
  const [filteredMountains, setFilteredMountains] = useState(FIVE_SACRED_MOUNTAINS)
  const [expandedMountain, setExpandedMountain] = useState<string | null>(null)
  const [filteredRivers, setFilteredRivers] = useState(FOUR_GREAT_RIVERS)
  const [expandedRiver, setExpandedRiver] = useState<string | null>(null)
  const [filteredStates, setFilteredStates] = useState(NINE_STATES)
  const [expandedState, setExpandedState] = useState<string | null>(null)
  const [filteredBuddhist, setFilteredBuddhist] = useState(BUDDHIST_MOUNTAINS)
  const [expandedBuddhist, setExpandedBuddhist] = useState<string | null>(null)

  const handleMountainFilter = useCallback((data: typeof FIVE_SACRED_MOUNTAINS) => {
    setFilteredMountains(data)
  }, [])

  const handleRiverFilter = useCallback((data: typeof FOUR_GREAT_RIVERS) => {
    setFilteredRivers(data)
  }, [])

  const handleStateFilter = useCallback((data: typeof NINE_STATES) => {
    setFilteredStates(data)
  }, [])

  const handleBuddhistFilter = useCallback((data: typeof BUDDHIST_MOUNTAINS) => {
    setFilteredBuddhist(data)
  }, [])

  const mountainFilters = {
    searchKeys: ['name', 'location', 'deity', 'feature', 'detail', 'temples', 'legends'],
    filterKeys: {
      location: [...new Set(FIVE_SACRED_MOUNTAINS.map(m => m.location.split('省')[0]))],
      deity: [...new Set(FIVE_SACRED_MOUNTAINS.map(m => m.deity))],
    },
    sortOptions: [
      { key: 'energy', label: '灵气高低' },
      { key: 'name', label: '山名排序' },
    ],
  }

  const riverFilters = {
    searchKeys: ['name', 'origin', 'destination', 'feature', 'detail', 'tributaries', 'historicCities'],
    filterKeys: {
      waterQuality: [...new Set(FOUR_GREAT_RIVERS.map(r => r.waterQuality))],
    },
    sortOptions: [
      { key: 'importance', label: '重要度排序' },
      { key: 'name', label: '河名排序' },
    ],
  }

  const stateFilters = {
    searchKeys: ['name', 'scope', 'capital', 'culture', 'characteristic', 'detail', 'famousPeople'],
    filterKeys: {
      culture: [...new Set(NINE_STATES.map(s => s.culture))],
    },
    sortOptions: [
      { key: 'prosperity', label: '繁荣度排序' },
      { key: 'name', label: '州名排序' },
    ],
  }

  const buddhistFilters = {
    searchKeys: ['name', 'location', 'buddha', 'sect', 'feature', 'detail', 'temples'],
    filterKeys: {
      buddha: [...new Set(BUDDHIST_MOUNTAINS.map(b => b.buddha))],
      sect: [...new Set(BUDDHIST_MOUNTAINS.map(b => b.sect))],
    },
    sortOptions: [
      { key: 'influence', label: '影响力排序' },
      { key: 'name', label: '山名排序' },
    ],
  }

  return (
    <SubPageTemplate
      title="天下地理"
      subtitle="五岳四渎 · 九州分野 · 山川形胜 · 气运所钟"
      icon="🌏"
      colorRgb="16, 185, 129"
    >
      <SubPageSection title="五岳灵山">
        <FilterBar data={FIVE_SACRED_MOUNTAINS} onFiltered={handleMountainFilter} options={mountainFilters} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredMountains.map((mountain) => (
            <InfoCard
              key={mountain.name}
              title={mountain.name}
              subtitle={`${mountain.location} · ${mountain.altitude}`}
              onClick={() => setExpandedMountain(expandedMountain === mountain.name ? null : mountain.name)}
              glowIntensity={mountain.energy}
              glowColor={mountain.energy > 95 ? '16, 185, 129' : '234, 179, 8'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{mountain.feature}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'rgb(16, 185, 129)' }}>
                  灵气 {mountain.energy}%
                </div>
                {expandedMountain === mountain.name ? '▲' : '▼'}
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                镇守：{mountain.worship} · {mountain.deity}
              </p>

              {expandedMountain === mountain.name && (
                <>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {mountain.detail}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🏛️ 宫观庙宇</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {mountain.temples.map((t, i) => (
                          <span key={i} style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📜 历史遗迹</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {mountain.historicSites.map((h, i) => (
                          <span key={i} style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🏔️ 神话传说</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {mountain.legends.map((l, i) => (
                          <span key={i} style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🌄 最佳时节</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {mountain.bestTime.map((t, i) => (
                          <span key={i} style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="四渎水脉">
        <FilterBar data={FOUR_GREAT_RIVERS} onFiltered={handleRiverFilter} options={riverFilters} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredRivers.map((river) => (
            <InfoCard
              key={river.name}
              title={`${river.name}`}
              subtitle={`${river.length} · 流域 ${river.drainage}`}
              onClick={() => setExpandedRiver(expandedRiver === river.name ? null : river.name)}
              glowIntensity={river.importance}
              glowColor={river.importance > 95 ? '59, 130, 246' : '16, 185, 129'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{river.feature}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'rgb(59, 130, 246)' }}>
                  重要度 {river.importance}%
                </div>
                {expandedRiver === river.name ? '▲' : '▼'}
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                发源：{river.origin} → 入海：{river.destination}
              </p>

              {expandedRiver === river.name && (
                <>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {river.detail}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🌊 支流</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {river.tributaries.map((t, i) => (
                          <span key={i} style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🏙️ 历史名城</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {river.historicCities.map((c, i) => (
                          <span key={i} style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🏛️ 人文胜迹</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {river.culturalSites.map((s, i) => (
                        <span key={i} style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="九州分野">
        <FilterBar data={NINE_STATES} onFiltered={handleStateFilter} options={stateFilters} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredStates.map((state) => (
            <InfoCard
              key={state.name}
              title={state.name}
              subtitle={`${state.scope} · 治所 ${state.capital}`}
              onClick={() => setExpandedState(expandedState === state.name ? null : state.name)}
              glowIntensity={state.prosperity}
              glowColor={state.prosperity > 93 ? '16, 185, 129' : '139, 92, 246'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{state.culture} · {state.characteristic}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'rgb(16, 185, 129)' }}>
                  繁荣度 {state.prosperity}%
                </div>
                {expandedState === state.name ? '▲' : '▼'}
              </div>

              {expandedState === state.name && (
                <>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {state.detail}
                  </p>

                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>👤 历史名人</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {state.famousPeople.map((p, i) => (
                        <span key={i} style={{ background: 'rgba(234, 179, 8, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🎭 民俗传统</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {state.traditions.map((t, i) => (
                          <span key={i} style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🏛️ 名胜古迹</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {state.landmarks.map((l, i) => (
                          <span key={i} style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="四大佛山">
        <FilterBar data={BUDDHIST_MOUNTAINS} onFiltered={handleBuddhistFilter} options={buddhistFilters} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {filteredBuddhist.map((mountain) => (
            <InfoCard
              key={mountain.name}
              title={mountain.name}
              subtitle={`${mountain.location} · ${mountain.altitude}`}
              onClick={() => setExpandedBuddhist(expandedBuddhist === mountain.name ? null : mountain.name)}
              glowIntensity={mountain.influence}
              glowColor="234, 179, 8"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{mountain.buddha}道场 · {mountain.sect}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'rgb(234, 179, 8)' }}>
                  影响力 {mountain.influence}%
                </div>
                {expandedBuddhist === mountain.name ? '▲' : '▼'}
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                {mountain.feature}
              </p>

              {expandedBuddhist === mountain.name && (
                <>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                    {mountain.detail}
                  </p>

                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🏛️ 著名寺院</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {mountain.temples.map((t, i) => (
                        <span key={i} style={{ background: 'rgba(234, 179, 8, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>💎 镇山法宝</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {mountain.relics.map((r, i) => (
                          <span key={i} style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📅 重大法会</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {mountain.festivals.map((f, i) => (
                          <span key={i} style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ color: 'rgb(234, 179, 8)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🧘 修行法门</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {mountain.practices.map((p, i) => (
                        <span key={i} style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </InfoCard>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
