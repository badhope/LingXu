'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface ClassicBook {
  id: number
  category: string
  name: string
  author: string
  era: string
  completeness: number
  importance: number
  versions: string[]
  desc: string
  detail: string
  coreQuotes: string[]
  keyContent: string[]
  historicalInfluence: string[]
  recommendedReading: string[]
  icon: string
}

const CLASSICS: ClassicBook[] = [
  {
    id: 1,
    category: '经',
    name: '易经',
    author: '伏羲·文王·孔子',
    era: '上古-西周-春秋',
    completeness: 100,
    importance: 100,
    versions: ['通行本', '马王堆帛书本', '竹简本'],
    desc: '群经之首，大道之源。仰以观于天文，俯以察于地理，是故知幽明之故。',
    detail: '《易》道深矣！人更三圣，世历三古。伏羲氏仰观象于天，俯观法于地，观鸟兽之文与地之宜，近取诸身，远取诸物，于是始作八卦，以通神明之德，以类万物之情。文王拘于羑里，演六十四卦，作卦辞、爻辞，吉凶悔吝之义著矣。孔子晚而好易，韦编三绝，作十翼以辅之，于是《易》道大明焉。《易》之为书也，广大悉备，有天道焉，有人道焉，有地道焉。兼三才而两之，故六。六者非它也，三才之道也。道有变动，故曰爻；爻有等，故曰物；物相杂，故曰文；文不当，故吉凶生焉。洁静精微，《易》教也。',
    coreQuotes: ['天行健，君子以自强不息', '地势坤，君子以厚德载物', '积善之家，必有余庆', '二人同心，其利断金'],
    keyContent: ['六十四卦系统', '阴阳辩证思维', '象数义理', '变易哲学'],
    historicalInfluence: ['儒家六经之首', '道家思想源头', '中医理论基础', '术数学本源'],
    recommendedReading: ['朱熹《周易本义》', '王弼《周易注》', '孔颖达《周易正义》'],
    icon: '📖'
  },
  {
    id: 2,
    category: '经',
    name: '诗经',
    author: '孔子删定',
    era: '西周-春秋',
    completeness: 95,
    importance: 95,
    versions: ['毛诗', '鲁诗', '齐诗', '韩诗'],
    desc: '诗三百，一言以蔽之，曰思无邪。风雅颂，赋比兴，六经之一。',
    detail: '《诗》三百五篇，孔子皆弦歌之，以求合韶武雅颂之音。上以风化下，下以风刺上，主文而谲谏，言之者无罪，闻之者足以戒，故曰风。至于王道衰，礼义废，政教失，国异政，家殊俗，而变风变雅作矣。国史明乎得失之迹，伤人伦之废，哀刑政之苛，吟咏情性，以风其上，达于事变而怀其旧俗也。故风者，出于民情，好尚政治而作者也。雅者，正也，言王政之所由废兴也。政有小大，故有小雅焉，有大雅焉。颂者，美盛德之形容，以其成功告于神明者也。是谓四始，《诗》之至也。不学诗，无以言。温柔敦厚，《诗》教也。',
    coreQuotes: ['关关雎鸠，在河之洲', '窈窕淑女，君子好逑', '执子之手，与子偕老', '所谓伊人，在水一方'],
    keyContent: ['国风160篇', '小雅74篇', '大雅31篇', '颂40篇'],
    historicalInfluence: ['中国文学源头', '儒家伦理教化', '比兴手法开创', '现实主义传统'],
    recommendedReading: ['《毛诗正义》', '朱熹《诗集传》', '方玉润《诗经原始》'],
    icon: '🎵'
  },
  {
    id: 3,
    category: '史',
    name: '史记',
    author: '司马迁',
    era: '西汉',
    completeness: 90,
    importance: 100,
    versions: ['中华书局点校本', '三家注本', '敦煌残卷'],
    desc: '史家之绝唱，无韵之离骚。究天人之际，通古今之变，成一家之言。',
    detail: '太史公遭李陵之祸，幽于缧绁。乃喟然而叹曰：「是余之罪也夫！是余之罪也夫！身毁不用矣。」退而深惟曰：「夫《诗》《书》隐约者，欲遂其志之思也。昔西伯拘羑里，演《周易》；孔子厄陈蔡，作《春秋》；屈原放逐，著《离骚》；左丘失明，厥有《国语》；孙子膑脚，而论兵法；不韦迁蜀，世传《吕览》；韩非囚秦，《说难》《孤愤》；《诗》三百篇，大抵贤圣发愤之所为作也。此人皆意有所郁结，不得通其道也，故述往事，思来者。」于是卒述陶唐以来，至于麟止。凡百三十篇，五十二万六千五百字，为《太史公书》。序略，以拾遗补艺，成一家之言，厥协六经异传，整齐百家杂语，藏之名山，副在京师，俟后世圣人君子。',
    coreQuotes: ['人固有一死，或重于泰山，或轻于鸿毛', '士为知己者死，女为悦己者容', '燕雀安知鸿鹄之志哉', '运筹帷幄之中，决胜千里之外'],
    keyContent: ['十二本纪', '十表', '八书', '三十世家', '七十列传'],
    historicalInfluence: ['纪传体通史开创者', '二十四史之首', '传记文学典范', '史学独立宣言'],
    recommendedReading: ['三家注本', '《史记会注考证》', '韩兆琦《史记笺证》'],
    icon: '📜'
  },
  {
    id: 4,
    category: '史',
    name: '资治通鉴',
    author: '司马光',
    era: '北宋',
    completeness: 100,
    importance: 98,
    versions: ['胡三省注本', '中华书局点校本'],
    desc: '鉴于往事，有资于治道。十六朝兴衰，一千三百六十二年历史。',
    detail: '初，英宗命光编集历代君臣事迹，神宗以其「鉴于往事，有资于治道」，赐名曰《资治通鉴》。光遂以书局自随，辟官属，得刘恕、刘攽、范祖禹，皆天下之选也。自治平开局，迨元丰成之，凡十有九年，上起周威烈王二十三年，下终五代周世宗显德六年，凡一千三百六十二年，二百九十四卷，三百余万言。遍阅旧史，旁采小说，简牍盈积，浩如烟海，抉擿幽隐，校计豪厘。其用心力亦已劳矣。光自言「臣之精力，尽于此书」。修书分属，汉则刘攽，三国讫于南北朝则刘恕，唐则范祖禹，各因其所长属之，皆天下选也，历十九年而成。故其中一事，或用三四出处纂成，用杂史诸书凡二百二十二家。',
    coreQuotes: ['兼听则明，偏信则暗', '国虽大，好战必亡', '天下熙熙，皆为利来', '丈夫一言许人，千金不易'],
    keyContent: ['周纪五卷', '秦纪三卷', '汉纪六十卷', '唐纪八十一卷'],
    historicalInfluence: ['编年体通史顶峰', '帝王教科书', '治理智慧宝库', '史学双璧之一'],
    recommendedReading: ['胡三省音注本', '《通鉴纪事本末》', '王夫之《读通鉴论》'],
    icon: '🗺️'
  },
  {
    id: 5,
    category: '子',
    name: '道德经',
    author: '老子',
    era: '春秋',
    completeness: 85,
    importance: 100,
    versions: ['王弼注本', '马王堆帛书甲本', '马王堆帛书乙本', '郭店楚简本'],
    desc: '道可道，非常道。玄之又玄，众妙之门。五千真言，道家祖典。',
    detail: '老子修道德，其学以自隐无名为务。居周久之，见周之衰，乃遂去。至关，关令尹喜曰：「子将隐矣，强为我著书。」于是老子乃著书上下篇，言道德之意五千余言而去，莫知其所终。道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲，以观其妙；常有欲，以观其徼。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。道生一，一生二，二生三，三生万物。万物负阴而抱阳，冲气以为和。上善若水。水善利万物而不争，处众人之所恶，故几于道。老子之书，往往以无为为君道，有为为臣道，庄生推而明之，往往散见而不一焉。',
    coreQuotes: ['道可道，非常道', '上善若水', '千里之行，始于足下', '祸兮福之所倚，福兮祸之所伏'],
    keyContent: ['道篇三十七章', '德篇四十四章', '无为思想', '辩证思维'],
    historicalInfluence: ['道家思想源头', '道教圣经', '政治哲学经典', '世界翻译第二多'],
    recommendedReading: ['王弼《老子注》', '河上公章句', '陈鼓应《老子注译及评介》'],
    icon: '☯️'
  },
  {
    id: 6,
    category: '子',
    name: '孙子兵法',
    author: '孙武',
    era: '春秋',
    completeness: 95,
    importance: 98,
    versions: ['十一家注本', '武经七书本', '银雀山汉简本'],
    desc: '兵者，国之大事，死生之地，存亡之道，不可不察也。百世兵家之师。',
    detail: '孙子武者，齐人也。以兵法见于吴王阖庐。阖庐曰：「子之十三篇，吾尽观之矣，可以小试勒兵乎？」对曰：「可。」于是阖庐出宫中美女百八十人，孙子分为二队，以王之宠姬二人各为队长，皆令持戟。约束既布，乃设鈇钺，即三令五申之。鼓之右，妇人大笑。孙子曰：「约束不明，申令不熟，将之罪也。」复三令五申而鼓之左，妇人复大笑。孙子曰：「约束不明，申令不熟，将之罪也；既已明而不如法者，吏士之罪也。」乃欲斩左右队长。吴王从台上观，见且斩爱姬，大骇。趣使使下令曰：「寡人已知将军能用兵矣。」孙子曰：「臣既已受命为将，将在军，君命有所不受。」遂斩队长二人以徇。用其次为队长，于是复鼓之。妇人左右前后跪起皆中规矩绳墨，无敢出声。',
    coreQuotes: ['知彼知己，百战不殆', '不战而屈人之兵，善之善者也', '兵者，诡道也', '攻其无备，出其不意'],
    keyContent: ['始计篇', '作战篇', '谋攻篇', '十三篇完整体系'],
    historicalInfluence: ['兵学圣典', '世界三大兵书之首', '商业竞争圣经', '战略学源头'],
    recommendedReading: ['十一家注孙子', '曹操《孙子略解》', '银雀山汉简本'],
    icon: '⚔️'
  },
  {
    id: 7,
    category: '集',
    name: '楚辞',
    author: '屈原',
    era: '战国',
    completeness: 90,
    importance: 92,
    versions: ['王逸注本', '洪兴祖补注本', '朱熹集注本'],
    desc: '路漫漫其修远兮，吾将上下而求索。楚辞之祖，骚体之宗。',
    detail: '屈原者，名平，楚之同姓也。为楚怀王左徒。博闻强志，明于治乱，娴于辞令。入则与王图议国事，以出号令；出则接遇宾客，应对诸侯。王甚任之。上官大夫与之同列，争宠而心害其能。因谗之，王怒而疏屈平。屈平疾王听之不聪也，谗谄之蔽明也，邪曲之害公也，方正之不容也，故忧愁幽思而作《离骚》。离骚者，犹离忧也。夫天者，人之始也；父母者，人之本也。人穷则反本，故劳苦倦极，未尝不呼天也；疾痛惨怛，未尝不呼父母也。屈平正道直行，竭忠尽智以事其君，谗人间之，可谓穷矣。信而见疑，忠而被谤，能无怨乎？屈平之作《离骚》，盖自怨生也。国风好色而不淫，小雅怨诽而不乱，若《离骚》者，可谓兼之矣。',
    coreQuotes: ['路漫漫其修远兮，吾将上下而求索', '亦余心之所善兮，虽九死其犹未悔', '举世皆浊我独清，众人皆醉我独醒', '惟草木之零落兮，恐美人之迟暮'],
    keyContent: ['离骚', '九歌', '天问', '九章'],
    historicalInfluence: ['浪漫主义源头', '骚体文学开创', '爱国精神典范', '香草美人传统'],
    recommendedReading: ['王逸《楚辞章句》', '洪兴祖《楚辞补注》', '朱熹《楚辞集注》'],
    icon: '🌿'
  },
  {
    id: 8,
    category: '集',
    name: '古文观止',
    author: '吴楚材·吴调侯',
    era: '清',
    completeness: 100,
    importance: 90,
    versions: ['映雪堂原本', '中华书局译注本'],
    desc: '观止矣！若有他乐，吾不敢请已。二百二十二篇千古美文，散文尽览。',
    detail: '古文观止者，康熙年间山阴吴楚材、吴调侯叔侄所选古文读本也。集先秦至明末古文二百二十二篇，分为十二卷，所选皆千古传诵之名篇。观止二字，出《左传》季札观周乐，见舞《韶箾》者，曰：「观止矣！若有他乐，吾不敢请已。」意谓所见已尽善尽美也。是书之选，繁简适中，评注简当，便于初学。数百年来，家弦户诵，盛行不衰。学者熟此，则于古文之体制、义法、辞章，思过半矣。其选虽出于举业，然能不囿于帖括，广搜博采，取青妃白，比事属辞，盖亦卓然可观者也。童而习之，白首不能废，岂偶然哉！',
    coreQuotes: ['不以物喜，不以己悲', '先天下之忧而忧，后天下之乐而乐', '师者，所以传道受业解惑也', '世有伯乐，然后有千里马'],
    keyContent: ['周文', '秦文', '汉文', '唐宋文', '明文'],
    historicalInfluence: ['古文入门第一书', '散文写作范本', '文学启蒙经典', '三百年家弦户诵'],
    recommendedReading: ['映雪堂原本', '中华书局译注本', '言文对照本'],
    icon: '📚'
  }
]

const getCategoryStyle = (category: string) => {
  switch (category) {
    case '经': return { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', label: '经部' }
    case '史': return { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', label: '史部' }
    case '子': return { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', label: '子部' }
    case '集': return { bg: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', label: '集部' }
    default: return { bg: 'rgba(107, 114, 128, 0.2)', color: '#6b7280', label: '其他' }
  }
}

export default function WenxianPage() {
  const [filteredClassics, setFilteredClassics] = useState(CLASSICS)
  const [expandedClassic, setExpandedClassic] = useState<number | null>(null)

  const handleClassicFilter = useCallback((data: typeof CLASSICS) => {
    setFilteredClassics(data)
  }, [])

  const classicFilters = {
    searchKeys: ['name', 'category', 'author', 'era', 'desc', 'detail', 'coreQuotes', 'historicalInfluence'],
    filterKeys: {
      category: [...new Set(CLASSICS.map(c => c.category))],
      era: [...new Set(CLASSICS.map(c => c.era.split('-')[0]))],
    },
    sortOptions: [
      { key: 'importance', label: '重要性排序' },
      { key: 'completeness', label: '完整度排序' },
      { key: 'name', label: '典籍名称' },
    ],
  }

  return (
    <SubPageTemplate
      title="文献典籍"
      subtitle="四库全书 · 经史子集 · 百家争鸣 · 千古文章"
      icon="📚"
      colorRgb="184, 148, 56"
    >
      <SubPageSection title="四库总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: '经部', count: '易诗书礼春秋', icon: '📿', color: '#ef4444' },
              { label: '史部', count: '二十四史通鉴', icon: '📜', color: '#3b82f6' },
              { label: '子部', count: '诸子百家学说', icon: '💡', color: '#22c55e' },
              { label: '集部', count: '诗词文赋总集', icon: '✍️', color: '#a855f7' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
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
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: stat.color }}>{stat.count}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="传世经典">
        <FilterBar
          data={CLASSICS}
          onFiltered={handleClassicFilter}
          options={classicFilters}
          placeholder="搜索典籍名称、作者、名言、内容..."
        />
        
        <div style={{ marginTop: '1.5rem' }}>
          <AnimatePresence>
            {filteredClassics.map((book, index) => (
              <motion.div key={book.id} layout style={{ marginBottom: '1rem' }}>
                <InfoCard
                  title={book.name}
                  subtitle={`${book.author} · ${book.era}`}
                  glowColor={getCategoryStyle(book.category).color.replace('#', '')}
                  glowIntensity={book.importance >= 98 ? 90 : 60}
                  onClick={() => setExpandedClassic(expandedClassic === book.id ? null : book.id)}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <motion.div
                      animate={book.importance >= 98 ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 2, -2, 0],
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      style={{
                        width: '70px',
                        height: '90px',
                        borderRadius: '6px 12px 12px 6px',
                        background: `linear-gradient(135deg, ${getCategoryStyle(book.category).color}, ${getCategoryStyle(book.category).color}99)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        flexShrink: 0,
                        boxShadow: `4px 4px 15px rgba(0,0,0,0.3)`,
                        borderLeft: '6px solid rgba(0,0,0,0.3)'
                      }}
                    >
                      {book.icon}
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '12px', 
                          fontSize: '0.7rem',
                          background: getCategoryStyle(book.category).bg,
                          color: getCategoryStyle(book.category).color,
                          fontWeight: 'bold'
                        }}>
                          {getCategoryStyle(book.category).label}部
                        </span>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', flex: 1, marginLeft: '1rem' }}>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>重要性</div>
                            <ProgressBar value={book.importance} color={getCategoryStyle(book.category).color} height={6} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>完整度</div>
                            <ProgressBar value={book.completeness} color="#22c55e" height={6} />
                          </div>
                        </div>
                      </div>
                      <p style={{ color: 'rgba(180, 180, 190, 0.9)', fontSize: '0.9rem', margin: 0 }}>
                        {book.desc}
                      </p>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)', marginTop: '0.5rem' }}>
                        📄 现存版本: {book.versions.join('、')}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedClassic === book.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ 
                          borderTop: `1px solid ${getCategoryStyle(book.category).color}33`,
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
                            {book.detail}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                              <div style={{ color: getCategoryStyle(book.category).color, fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                💬 传世名言
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {book.coreQuotes.map((q, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: getCategoryStyle(book.category).bg,
                                    color: getCategoryStyle(book.category).color,
                                    fontStyle: 'italic'
                                  }}>
                                    「{q}」
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                📋 内容结构
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {book.keyContent.map((k, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(34, 197, 94, 0.15)',
                                    color: '#22c55e'
                                  }}>
                                    {k}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                              <div style={{ color: '#b89438', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                🌍 历史影响
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {book.historicalInfluence.map((h, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(184, 148, 56, 0.15)',
                                    color: '#b89438'
                                  }}>
                                    {h}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ color: '#3b82f6', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                📖 推荐读本
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {book.recommendedReading.map((r, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(59, 130, 246, 0.15)',
                                    color: '#3b82f6'
                                  }}>
                                    {r}
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
                    color: `${getCategoryStyle(book.category).color}99`,
                    fontSize: '0.8rem'
                  }}>
                    {expandedClassic === book.id ? '▲ 收起详情' : '▼ 点击展开详情'}
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
