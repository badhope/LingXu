'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface HistoricalFigure {
  id: number
  name: string
  era: string
  category: string
  title: string
  influence: number
  achievement: string
  quote: string
  detail: string
  works: string[]
  disciples: string[]
  anecdotes: string[]
  influenceAreas: string[]
  icon: string
}

const HISTORICAL_FIGURES: HistoricalFigure[] = [
  {
    id: 1,
    name: '伏羲氏',
    era: '上古',
    category: '圣王',
    title: '人文始祖',
    influence: 100,
    achievement: '画八卦，结网罟，定婚嫁',
    quote: '仰观天象，俯察地理',
    detail: '太昊伏羲氏，风姓也。母曰华胥，履大人迹于雷泽，而生伏羲于成纪。蛇身人首，有圣德。仰则观象于天，俯则观法于地，旁观鸟兽之文与地之宜，近取诸身，远取诸物，始作八卦，以通神明之德，以类万物之情。造书契以代结绳之政，于是始制嫁娶，以俪皮为礼。结网罟以教佃渔，故曰宓牺氏。养牺牲以充庖厨，故曰庖牺。有龙瑞，以龙纪官，号曰龙师。作三十五弦之瑟。伏羲之王天下也，德合天地，泽及万物，可谓至德也已矣。',
    works: ['八卦图', '龙纪官制', '嫁娶之礼', '瑟三十五弦'],
    disciples: ['女娲氏', '朱襄氏', '葛天氏'],
    anecdotes: ['龙马负图出河', '始制嫁娶之礼', '造琴瑟以乐'],
    influenceAreas: ['哲学', '婚姻制度', '音乐', '渔猎技术'],
    icon: '☯️'
  },
  {
    id: 2,
    name: '神农氏',
    era: '上古',
    category: '圣王',
    title: '农业始祖',
    influence: 98,
    achievement: '尝百草，种五谷，兴商贸',
    quote: '一日遇七十毒',
    detail: '炎帝神农氏，姜姓也。母曰女登，游于华阳，有神龙首，感女登于常羊，生炎帝。人身牛首，长于姜水，因以姓焉。火德王，故曰炎帝。以火名官。斫木为耜，揉木为耒，耒耨之利，以教天下，故号神农氏。于是始教民播种五谷，相土地宜，燥湿肥墝高下，尝百草之滋味，水泉之甘苦，令民知所辟就。当此之时，一日而遇七十毒。一日而遇七十毒，神而化之，使民宜之。又日中为市，致天下之民，聚天下之货，交易而退，各得其所。神农之治天下也，神不越于堂，政不出于国门，而天下化之。',
    works: ['神农本草经', '耒耜农具', '日中为市', '五谷种植法'],
    disciples: ['赤松子', '雨师赤松子', '诸候'],
    anecdotes: ['鞭百草而知药性', '日中为市始经商', '一日遇七十毒'],
    influenceAreas: ['中医药', '农业', '商业', '经济'],
    icon: '🌿'
  },
  {
    id: 3,
    name: '黄帝',
    era: '上古',
    category: '圣王',
    title: '华夏始祖',
    influence: 100,
    achievement: '统一华夏，创文字，定音律',
    quote: '天下有不顺者，从而征之',
    detail: '黄帝者，少典之子，姓公孙，名曰轩辕。生而神灵，弱而能言，幼而徇齐，长而敦敏，成而聪明。轩辕之时，神农氏世衰。诸侯相侵伐，暴虐百姓，而神农氏弗能征。于是轩辕乃习用干戈，以征不享，诸侯咸来宾从。而蚩尤最为暴，莫能伐。炎帝欲侵陵诸侯，诸侯咸归轩辕。轩辕乃修德振兵，治五气，艺五种，抚万民，度四方，教熊罴貔貅貙虎，以与炎帝战于阪泉之野。三战，然后得其志。蚩尤作乱，不用帝命。于是黄帝乃征师诸侯，与蚩尤战于涿鹿之野，遂禽杀蚩尤。而诸侯咸尊轩辕为天子，代神农氏，是为黄帝。天下有不顺者，黄帝从而征之，平者去之，披山通道，未尝宁居。',
    works: ['黄帝内经', '指南车', '六十甲子', '五音十二律'],
    disciples: ['风后', '力牧', '常先', '大鸿', '仓颉'],
    anecdotes: ['涿鹿之战擒蚩尤', '娶嫘祖教民养蚕', '鼎湖乘龙升天'],
    influenceAreas: ['政治制度', '医学', '文字', '军事'],
    icon: '👑'
  },
  {
    id: 4,
    name: '老子',
    era: '春秋',
    category: '圣贤',
    title: '道祖',
    influence: 100,
    achievement: '著道德经，开创道家',
    quote: '道可道，非常道',
    detail: '老子者，楚苦县厉乡曲仁里人也，姓李氏，名耳，字聃，周守藏室之史也。孔子适周，将问礼于老子。老子曰：「子所言者，其人与骨皆已朽矣，独其言在耳。且君子得其时则驾，不得其时则蓬累而行。吾闻之，良贾深藏若虚，君子盛德容貌若愚。去子之骄气与多欲，态色与淫志，是皆无益于子之身。吾所以告子，若是而已。」老子修道德，其学以自隐无名为务。居周久之，见周之衰，乃遂去。至关，关令尹喜曰：「子将隐矣，强为我著书。」于是老子乃著书上下篇，言道德之意五千余言而去，莫知其所终。盖老子百有六十余岁，或言二百余岁，以其修道而养寿也。',
    works: ['道德经五千言', '道家思想', '无为而治', '辩证法'],
    disciples: ['关尹子', '文子', '列子', '庄子'],
    anecdotes: ['孔子问礼于老子', '骑青牛出函谷关', '尹喜强留著书'],
    influenceAreas: ['哲学', '宗教', '政治', '修身'],
    icon: '🦅'
  },
  {
    id: 5,
    name: '孔子',
    era: '春秋',
    category: '圣贤',
    title: '大成至圣先师',
    influence: 100,
    achievement: '创立儒家，周游列国，删诗书',
    quote: '天不生仲尼，万古如长夜',
    detail: '孔子生鲁昌平乡陬邑。其先宋人也，曰孔防叔。丘生而叔梁纥死，葬于防山。孔子贫且贱。及长，尝为季氏史，料量平；尝为司职吏而畜蕃息。由是为司空。已而去鲁，斥乎齐，逐乎宋、卫，困于陈蔡之间，于是反鲁。孔子长九尺有六寸，人皆谓之「长人」而异之。孔子晚而喜易，序彖、系、象、说卦、文言。读易，韦编三绝。曰：「假我数年，若是，我于易则彬彬矣。」孔子以诗书礼乐教，弟子盖三千焉，身通六艺者七十有二人。如颜浊邹之徒，颇受业者甚众。子曰：「吾十有五而志于学，三十而立，四十而不惑，五十而知天命，六十而耳顺，七十而从心所欲，不逾矩。」',
    works: ['删诗书', '定礼乐', '赞周易', '作春秋'],
    disciples: ['颜回', '子贡', '子路', '曾子', '子夏', '子张'],
    anecdotes: ['周游列国十四年', '韦编三绝读周易', '杏坛讲学三千弟子'],
    influenceAreas: ['教育', '伦理', '政治', '文化'],
    icon: '📖'
  },
  {
    id: 6,
    name: '孙武',
    era: '春秋',
    category: '名将',
    title: '兵圣',
    influence: 95,
    achievement: '著孙子兵法，西破强楚',
    quote: '知己知彼，百战不殆',
    detail: '孙子武者，齐人也。以兵法见于吴王阖庐。阖庐曰：「子之十三篇，吾尽观之矣，可以小试勒兵乎？」对曰：「可。」阖庐曰：「可试以妇人乎？」曰：「可。」于是许之，出宫中美女，得百八十人。孙子分为二队，以王之宠姬二人各为队长，皆令持戟。约束既布，乃设鈇钺，即三令五申之。于是鼓之右，妇人大笑。孙子曰：「约束不明，申令不熟，将之罪也。」复三令五申而鼓之左，妇人复大笑。孙子曰：「约束不明，申令不熟，将之罪也；既已明而不如法者，吏士之罪也。」乃欲斩左右队长。吴王从台上观，见且斩爱姬，大骇。趣使使下令曰：「寡人已知将军能用兵矣。寡人非此二姬，食不甘味，愿勿斩也。」孙子曰：「臣既已受命为将，将在军，君命有所不受。」遂斩队长二人以徇。于是复鼓之，妇人左右前后跪起皆中规矩绳墨，无敢出声。',
    works: ['孙子兵法十三篇', '三十六计雏形'],
    disciples: ['伍子胥', '吴王夫差'],
    anecdotes: ['吴宫教战斩美姬', '西破强楚入郢都', '功成身退隐江湖'],
    influenceAreas: ['军事学', '战略思想', '商业竞争', '管理智慧'],
    icon: '⚔️'
  },
  {
    id: 7,
    name: '秦始皇',
    era: '秦',
    category: '帝王',
    title: '千古一帝',
    influence: 99,
    achievement: '统一六国，书同文，车同轨',
    quote: '朕为始皇帝，后世以计数',
    detail: '秦始皇帝者，秦庄襄王子也。庄襄王为秦质子于赵，见吕不韦姬，悦而取之，生始皇。以秦昭王四十八年正月生于邯郸。及生，名为政，姓赵氏。年十三岁，庄襄王死，政代立为秦王。当是之时，秦地已并巴、蜀、汉中，越宛有郢，置南郡矣；北收上郡以东，有河东、太原、上党郡；东至荥阳，灭二周，置三川郡。吕不韦为相，封十万户，号曰文信侯。招致宾客游士，欲以并天下。李斯为舍人。蒙骜、王齮、麃公等为将军。王年少，初即位，委国事大臣。十七年间，灭六国，一海内，分天下以为三十六郡，郡置守、尉、监。更名民曰「黔首」。一法度衡石丈尺。车同轨。书同文字。地东至海暨朝鲜，西至临洮、羌中，南至北向户，北据河为塞，并阴山至辽东。',
    works: ['皇帝制度', '郡县制', '万里长城', '兵马俑'],
    disciples: ['李斯', '王翦', '蒙恬'],
    anecdotes: ['荆轲刺秦绕柱走', '泰山封禅遇大雨', '遣徐福东渡求仙'],
    influenceAreas: ['政治制度', '大一统', '文字统一', '工程建设'],
    icon: '🏯'
  },
  {
    id: 8,
    name: '汉武帝',
    era: '西汉',
    category: '帝王',
    title: '汉武大帝',
    influence: 97,
    achievement: '罢黜百家，独尊儒术，开疆拓土',
    quote: '寇可往，我亦可往',
    detail: '孝武皇帝者，孝景中子也，母曰王太后。孝景四年，以皇子为胶东王。孝景七年，栗太子废为临江王，以胶东王为太子。孝景十六年崩，太子即位，为孝武皇帝。武帝即位，举贤良文学之士前后百数，而公孙弘以春秋白衣为天子三公，封平津侯。汉家自有制度，本以霸王道杂之。仲舒对策，推明孔氏，抑黜百家。立学校之官，州郡举茂材孝廉，皆自仲舒发之。遣卫青、霍去病将兵北击匈奴，封狼居胥而还。遣张骞通西域，丝绸之路自此始。置五经博士，置博士弟子员，丞相公孙弘请为博士置弟子员，学者益广。汉之得人，于兹为盛，儒雅则公孙弘、董仲舒、儿宽，笃行则石建、石庆，质直则汲黯、卜式，推贤则韩安国、郑当时，定令则赵禹、张汤，文章则司马迁、相如，滑稽则东方朔、枚皋，应对则严助、朱买臣，历数则唐都、洛下闳，协律则李延年，运筹则桑弘羊，奉使则张骞、苏武，将率则卫青、霍去病，受遗则霍光、金日磾，其余不可胜纪。是以兴造功业，制度遗文，后世莫及。',
    works: ['推恩令', '独尊儒术', '丝绸之路', '太学制度'],
    disciples: ['卫青', '霍去病', '董仲舒', '张骞', '司马迁'],
    anecdotes: ['金屋藏娇', '封狼居胥', '巫蛊之祸', '轮台罪己'],
    influenceAreas: ['儒家正统', '疆域开拓', '民族自信', '教育制度'],
    icon: '🏹'
  },
  {
    id: 9,
    name: '诸葛亮',
    era: '三国',
    category: '名臣',
    title: '智圣',
    influence: 95,
    achievement: '三分天下，六出祁山',
    quote: '鞠躬尽瘁，死而后已',
    detail: '诸葛亮字孔明，琅邪阳都人也。汉司隶校尉诸葛丰后也。父珪，字君贡，汉末为太山郡丞。亮早孤，从父玄为袁术所署豫章太守，玄将亮及亮弟均之官。玄卒，亮躬耕陇亩，好为梁父吟。身长八尺，每自比于管仲、乐毅，时人莫之许也。惟博陵崔州平、颍川徐庶元直与亮友善，谓为信然。时先主屯新野。徐庶见先主，先主器之，谓先主曰：「诸葛孔明者，卧龙也，将军岂愿见之乎？」先主遂诣亮，凡三往，乃见。于是与亮情好日密。先主之败于长坂，亮曰：「事急矣，请奉命求救于孙将军。」权大悦，即遣周瑜、程普、鲁肃等水军三万，随亮诣先主，并力拒曹公。曹公败于赤壁，引军归邺。先主遂收江南，以亮为军师中郎将。章武三年春，先主于永安病笃，召亮于成都，属以后事，谓亮曰：「君才十倍曹丕，必能安国，终定大事。若嗣子可辅，辅之；如其不才，君可自取。」亮涕泣曰：「臣敢竭股肱之力，效忠贞之节，继之以死！」',
    works: ['出师表', '隆中对', '八阵图', '木牛流马'],
    disciples: ['姜维', '蒋琬', '费祎', '董允'],
    anecdotes: ['三顾茅庐', '草船借箭', '空城计', '六出祁山'],
    influenceAreas: ['战略', '忠诚精神', '智慧象征', '治理'],
    icon: '🐉'
  },
  {
    id: 10,
    name: '唐太宗',
    era: '唐',
    category: '帝王',
    title: '天可汗',
    influence: 96,
    achievement: '贞观之治，四夷宾服',
    quote: '以铜为镜，可以正衣冠',
    detail: '太宗文武大圣大广孝皇帝讳世民，高祖第二子也。母曰太穆顺圣皇后窦氏。太宗幼聪睿，玄鉴深远，临机果断，不拘小节，时人莫能测也。大业末，高祖镇太原，太宗知隋必亡，阴有安天下之志，倾身下士，散财结客，咸得其欢心。及义兵起，乃率兵略徇西河，克之。武德元年，为尚书令、右武候大将军，进封秦王，加授雍州牧。四年二月，又擒建德，降世充，高祖以自古旧官不称殊功，乃别表徽号，用旌勋德。九年六月庚申，太宗率长孙无忌、尉迟敬德、房玄龄、杜如晦、宇文士及、高士廉、侯君集、程知节、秦叔宝、段志玄、屈突通、张士贵等于玄武门诛之。高祖大惊，乃立太宗为皇太子。八月癸亥，高祖传位于皇太子，太宗即位于东宫显德殿。帝性仁孝，英武有大志。锐于任贤，纳谏如流，孜孜求治，海内升平，路不拾遗，夜不闭户，岁断死刑二十九人，几致刑措。东至于海，南至于岭，皆外户不闭，行旅不赍粮，取给于道路焉。',
    works: ['贞观律', '科举制度完善', '天可汗体系'],
    disciples: ['房玄龄', '杜如晦', '魏征', '李靖', '长孙无忌'],
    anecdotes: ['玄武门之变', '纳谏如流', '凌烟阁二十四功臣', '贞观之治'],
    influenceAreas: ['政治清明', '民族融合', '对外开放', '法治'],
    icon: '🌏'
  }
]

const getEraColor = (era: string) => {
  switch (era) {
    case '上古': return '#a855f7'
    case '春秋': return '#eab308'
    case '三国': return '#ef4444'
    case '秦': return '#1e293b'
    case '西汉': return '#3b82f6'
    case '唐': return '#f59e0b'
    default: return '#6b7280'
  }
}

const getCategoryStyle = (category: string) => {
  switch (category) {
    case '圣王': return { bg: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }
    case '圣贤': return { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }
    case '名将': return { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }
    case '帝王': return { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }
    case '名臣': return { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }
    default: return { bg: 'rgba(107, 114, 128, 0.2)', color: '#6b7280' }
  }
}

export default function RenwuPage() {
  const [filteredFigures, setFilteredFigures] = useState(HISTORICAL_FIGURES)
  const [expandedFigure, setExpandedFigure] = useState<number | null>(null)

  const handleFigureFilter = useCallback((data: typeof HISTORICAL_FIGURES) => {
    setFilteredFigures(data)
  }, [])

  const figureFilters = {
    searchKeys: ['name', 'era', 'category', 'title', 'achievement', 'quote', 'detail', 'works', 'influenceAreas'],
    filterKeys: {
      era: [...new Set(HISTORICAL_FIGURES.map(f => f.era))],
      category: [...new Set(HISTORICAL_FIGURES.map(f => f.category))],
    },
    sortOptions: [
      { key: 'influence', label: '影响力排序' },
      { key: 'name', label: '人物名称' },
    ],
  }

  return (
    <SubPageTemplate
      title="历史人物"
      subtitle="风流人物 · 英雄豪杰 · 圣贤明君 · 千古风流"
      icon="👤"
      colorRgb="255, 170, 102"
    >
      <SubPageSection title="中华圣贤殿">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: '上古圣王', count: '3位', icon: '👑', color: '#a855f7' },
              { label: '先秦圣贤', count: '3位', icon: '📖', color: '#22c55e' },
              { label: '千古帝王', count: '3位', icon: '🏯', color: '#f59e0b' },
              { label: '将相名臣', count: '1位', icon: '⚔️', color: '#ef4444' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: stat.color,
                    margin: '0 auto 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    boxShadow: `0 0 25px ${stat.color}66`
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stat.color }}>{stat.count}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="华夏群英谱">
        <FilterBar
          data={HISTORICAL_FIGURES}
          onFiltered={handleFigureFilter}
          options={figureFilters}
          placeholder="搜索人物名称、时代、称号、名言..."
        />
        
        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <AnimatePresence>
            {filteredFigures.map((figure, index) => (
              <motion.div key={figure.id} layout>
                <InfoCard
                  glowColor={getEraColor(figure.era).replace('#', '')}
                  glowIntensity={figure.influence >= 95 ? 90 : 60}
                  onClick={() => setExpandedFigure(expandedFigure === figure.id ? null : figure.id)}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <motion.div
                      animate={figure.influence >= 98 ? {
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          `0 0 15px ${getEraColor(figure.era)}00`,
                          `0 0 35px ${getEraColor(figure.era)}`,
                          `0 0 15px ${getEraColor(figure.era)}00`
                        ]
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${getEraColor(figure.era)}, ${getEraColor(figure.era)}88)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        flexShrink: 0
                      }}
                    >
                      {figure.icon}
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div>
                          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#b89438' }}>
                            {figure.name}
                          </span>
                          <span style={{
                            marginLeft: '0.5rem',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '10px',
                            fontSize: '0.7rem',
                            background: getCategoryStyle(figure.category).bg,
                            color: getCategoryStyle(figure.category).color
                          }}>
                            {figure.category}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)' }}>
                          {figure.era}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: getEraColor(figure.era), marginBottom: '0.5rem' }}>
                        {figure.title}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <span style={{ flex: 1 }}>
                          <span style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>历史影响力</span>
                          <ProgressBar value={figure.influence} color={getEraColor(figure.era)} height={6} />
                        </span>
                      </div>
                      <p style={{ color: 'rgba(180, 180, 190, 0.9)', fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>
                        「{figure.quote}」
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedFigure === figure.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ 
                          borderTop: `1px solid ${getEraColor(figure.era)}33`,
                          marginTop: '1rem',
                          paddingTop: '1rem'
                        }}>
                          <p style={{ 
                            color: 'rgba(180, 180, 190, 0.9)', 
                            fontSize: '0.9rem',
                            lineHeight: 1.8,
                            marginBottom: '1rem',
                            textIndent: '2em'
                          }}>
                            {figure.detail}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                              <div style={{ color: getEraColor(figure.era), fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                📚 主要著作
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {figure.works.map((w, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: `${getEraColor(figure.era)}20`,
                                    color: getEraColor(figure.era)
                                  }}>
                                    {w}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                👥 弟子门人
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {figure.disciples.map((d, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(34, 197, 94, 0.15)',
                                    color: '#22c55e'
                                  }}>
                                    {d}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                              <div style={{ color: '#b89438', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                💬 历史典故
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {figure.anecdotes.map((a, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(184, 148, 56, 0.15)',
                                    color: '#b89438'
                                  }}>
                                    {a}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ color: '#3b82f6', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                🌍 影响领域
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {figure.influenceAreas.map((area, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(59, 130, 246, 0.15)',
                                    color: '#3b82f6'
                                  }}>
                                    {area}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div style={{ 
                    textAlign: 'center', 
                    marginTop: '0.75rem',
                    color: `${getEraColor(figure.era)}99`,
                    fontSize: '0.8rem'
                  }}>
                    {expandedFigure === figure.id ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </div>
                </InfoCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
