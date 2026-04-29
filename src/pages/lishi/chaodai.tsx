'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface Dynasty {
  id: number
  name: string
  era: string
  years: number
  kings: number
  founder: string
  capital: string
  territory: string
  population: string
  destiny: number
  achievement: number
  feature: string
  fall: string
  majorEvent: string
  detail: string
  innovations: string[]
  famousPeople: string[]
  legacies: string[]
  crises: string[]
  color: string
  icon: string
}

const DYNASTIES: Dynasty[] = [
  {
    id: 1,
    name: '夏',
    era: '约前2070-前1600',
    years: 470,
    kings: 17,
    founder: '大禹',
    capital: '阳城',
    territory: '黄河中游',
    population: '约200万',
    destiny: 45,
    achievement: 70,
    feature: '治水定九州，世袭制开端',
    fall: '夏桀无道，成汤革命',
    majorEvent: '大禹治水、太康失国、少康中兴',
    detail: '夏，中国历史上第一个世袭制王朝。大禹治水有功，受舜禅让而即位，国号曰夏。禹传子启，家天下自此始。夏后氏十七君，历四百七十年。夏之盛也，禹会诸侯于涂山，执玉帛者万国；夏之衰也，孔甲乱德，诸侯畔之。至于桀，不务德而武伤百姓，百姓弗堪。汤修德，诸侯皆归汤，汤遂率兵以伐夏桀。桀走鸣条，遂放而死。汤乃践天子位，代夏朝天下。夏虽亡，其九州之制，历法之传，子孙之祀，影响深远矣。',
    innovations: ['世袭制代替禅让制', '九州分野制度', '夏历（农历）', '青铜器铸造', '奴隶制国家'],
    famousPeople: ['大禹', '夏启', '后羿', '少康', '夏桀'],
    legacies: ['农历沿用至今', '华夏民族雏形', '国家形态确立', '宗法制萌芽'],
    crises: ['太康失国', '后羿代夏', '寒浞篡位', '夏桀暴政'],
    color: '#78716c',
    icon: '🏔️'
  },
  {
    id: 2,
    name: '商',
    era: '前1600-前1046',
    years: 554,
    kings: 31,
    founder: '成汤',
    capital: '殷',
    territory: '黄河中下游',
    population: '约400万',
    destiny: 55,
    achievement: 80,
    feature: '玄鸟生商，甲骨文、青铜器',
    fall: '纣王暴虐，武王伐纣',
    majorEvent: '景亳之命、盘庚迁殷、武丁中兴',
    detail: '商，天命玄鸟，降而生商。成汤灭夏，定都于亳，国号曰商。后五迁其都，至盘庚迁于殷，后世称殷商。商王三十一世，历五百五十四年。商之盛也，武丁得傅说为相，国大治，鬼方三年乃克，四海来朝。商之亡也，纣资辨捷疾，闻见甚敏，材力过人，手格猛兽，知足以距谏，言足以饰非，矜人臣以能，高天下以声，以为皆出己之下。好酒淫乐，嬖于妇人，以酒为池，悬肉为林，使男女裸相逐其间，为长夜之饮。周武王率诸侯伐纣，战于牧野，纣师皆倒兵以战，纣走入，登鹿台，衣其宝玉衣，赴火而死。',
    innovations: ['甲骨文', '成熟青铜器', '干支纪日', '商业贸易', '内外服制度'],
    famousPeople: ['成汤', '伊尹', '盘庚', '武丁', '傅说', '妇好', '商纣'],
    legacies: ['汉字系统成熟', '青铜文明顶峰', '商人商业传统', '六十甲子纪年'],
    crises: ['九世之乱', '屡次迁都', '东夷叛乱', '纣王暴政'],
    color: '#a8a29e',
    icon: '🀄'
  },
  {
    id: 3,
    name: '周',
    era: '前1046-前256',
    years: 790,
    kings: 36,
    founder: '姬发',
    capital: '镐京、洛邑',
    territory: '华夏全境',
    population: '约1500万',
    destiny: 95,
    achievement: 95,
    feature: '周礼治天下，八百年最长',
    fall: '礼崩乐坏，秦灭西周',
    majorEvent: '武王伐纣、周公制礼、春秋五霸、战国七雄',
    detail: '周，文王姬昌，积善累德，诸侯皆向之。武王姬发，观兵孟津，伐纣克殷，受命而王。周公相成王，制礼作乐，天下大服。周三十六王，历七百九十年，为历代享国最长者。周分西周、东周。西周都镐京，成康之治，刑错四十余年不用。幽王烽火戏诸侯，犬戎杀幽王于骊山之下。平王东迁洛邑，是为东周。王室既卑，诸侯力政，齐桓、晋文、秦穆、宋襄、楚庄迭兴，是为春秋五霸。及韩赵魏分晋，田氏代齐，万乘之国七，千乘之国五，敌侔争权，盖为战国。周赧王五十九年，秦灭西周，九鼎入秦。周虽亡，其礼乐文明，郁郁乎文哉，实为中华文明之根也。',
    innovations: ['封建制（分封制）', '宗法制', '礼乐制度', '井田制', '雅言（官话）'],
    famousPeople: ['周文王', '周武王', '周公旦', '姜太公', '孔子', '老子', '诸子百家'],
    legacies: ['华夏文明主体', '姓氏大发展', '诸子百家思想', '伦理道德体系'],
    crises: ['国人暴动', '幽王亡国', '平王东迁', '礼崩乐坏'],
    color: '#fbbf24',
    icon: '☯️'
  },
  {
    id: 4,
    name: '秦',
    era: '前221-前207',
    years: 14,
    kings: 3,
    founder: '嬴政',
    capital: '咸阳',
    territory: '天下一统',
    population: '约2500万',
    destiny: 20,
    achievement: 100,
    feature: '千古一帝，郡县制大一统',
    fall: '严刑峻法，二世而亡',
    majorEvent: '灭六国、书同文、筑长城、陈胜吴广起义',
    detail: '秦，奋六世之余烈，振长策而御宇内。秦王嬴政，十七年间，灭六国，一海内，自以为德兼三皇，功过五帝，乃更号曰皇帝。废封建，置郡县，书同文，车同轨，度同制，行同伦，天下遂为一统。北击匈奴，筑长城万里；南征百越，置桂林象郡。收天下之兵，聚之咸阳，销以为钟鐻金人十二。然秦以暴虐为天下始，焚百家之言，以愚黔首；隳名城，杀豪杰，收天下之兵。始皇既殁，陈胜吴广斩木为兵，揭竿为旗，天下云集响应，赢粮而景从。楚虽三户，亡秦必楚。项羽破釜沉舟，九战九捷，坑秦卒二十万于新安。刘邦入咸阳，子婴素车白马降于道旁。秦三帝，十四年而亡。其亡也忽焉，然其创制立法，百代皆行秦政法。',
    innovations: ['皇帝制度', '郡县制', '统一文字度量衡', '驰道网络', '重农抑商'],
    famousPeople: ['秦始皇', '李斯', '王翦', '蒙恬', '赵高', '陈胜', '项羽'],
    legacies: ['大一统观念', '中央集权制度', '汉族基本盘', '长城奇迹'],
    crises: ['焚书坑儒', '大兴土木', '沙丘之变', '赵高乱政'],
    color: '#1e293b',
    icon: '⚔️'
  },
  {
    id: 5,
    name: '汉',
    era: '前202-220',
    years: 422,
    kings: 29,
    founder: '刘邦',
    capital: '长安、洛阳',
    territory: '609万平方公里',
    population: '约6500万',
    destiny: 90,
    achievement: 98,
    feature: '汉民族定名，虽远必诛',
    fall: '宦官外戚，黄巾起义',
    majorEvent: '文景之治、汉武盛世、昭宣中兴、光武中兴',
    detail: '汉，高祖刘邦，提三尺剑，入关中，王汉中，五年而成帝业。汉承秦制，惩亡秦孤立之败，郡国并行。文景之治，轻徭薄赋，与民休息，京师之钱累巨万，贯朽而不可校；太仓之粟陈陈相因，充溢露积于外，至腐败不可食。武帝践祚，罢黜百家，独尊儒术；北击匈奴，封狼居胥；南诛两越，东灭朝鲜；西通西域，凿空丝绸之路。汉之威德，远播域外，凡日月所照，江河所至，皆为汉土。明犯强汉者，虽远必诛！昭宣中兴，汉家之治复盛。元成哀平，外戚用事，王莽篡汉，天下大乱。光武起于南阳，诛灭群雄，定都洛阳，是为东汉。明章之治，儒学最盛。桓灵以来，党锢之祸，宦官专政，黄巾既作，豪杰并起。曹丕受禅，汉遂亡。汉四百年，华夏之族，遂称汉人，永世不易。',
    innovations: ['察举制', '丝绸之路', '独尊儒术', '太学制度', '冶铁技术'],
    famousPeople: ['刘邦', '汉武帝', '卫青', '霍去病', '司马迁', '刘秀', '诸葛亮'],
    legacies: ['汉民族得名', '儒家正统地位', '汉人自豪感', '大一统传统'],
    crises: ['七国之乱', '巫蛊之祸', '王莽篡汉', '党锢之祸'],
    color: '#ef4444',
    icon: '🇨🇳'
  },
  {
    id: 6,
    name: '唐',
    era: '618-907',
    years: 289,
    kings: 21,
    founder: '李渊',
    capital: '长安',
    territory: '1237万平方公里',
    population: '约8000万',
    destiny: 85,
    achievement: 100,
    feature: '盛唐气象，万国来朝',
    fall: '安史之乱，藩镇割据',
    majorEvent: '贞观之治、永徽之治、开元盛世、安史之乱',
    detail: '唐，高祖李渊，起于太原，代隋建唐。太宗李世民，济世安民，贞观之治，路不拾遗，夜不闭户，四夷君长请为天可汗。武曌称制，女主天下，贞观遗风。玄宗开元，励精图治，海内富安，行者虽万里不持寸兵。唐三彩流光溢彩，李杜文章光焰万丈，吴带当风，颜筋柳骨，丝绸之路驼铃声声，长安胡姬酒肆林立。九天阊阖开宫殿，万国衣冠拜冕旒。盛唐气象，至今使人神往。渔阳鼙鼓动地来，惊破霓裳羽衣曲。安史八年，大唐由盛转衰。藩镇割据，宦官专权，朋党之争，黄巢起义，唐室遂衰。天祐四年，朱温篡唐，唐遂亡。唐虽亡，盛唐之音，万国之忆，唐人之称，永存世间。',
    innovations: ['科举制度成熟', '均田制', '租庸调制', '对外开放', '诗歌顶峰'],
    famousPeople: ['唐太宗', '武则天', '唐玄宗', '李白', '杜甫', '魏征', '玄奘'],
    legacies: ['唐人街遍天下', '唐诗宝库', '盛世典范', '东亚文化圈'],
    crises: ['玄武门之变', '武后临朝', '安史之乱', '黄巢起义'],
    color: '#f59e0b',
    icon: '🐉'
  },
  {
    id: 7,
    name: '宋',
    era: '960-1279',
    years: 319,
    kings: 18,
    founder: '赵匡胤',
    capital: '开封、临安',
    territory: '280万平方公里',
    population: '约1.2亿',
    destiny: 60,
    achievement: 95,
    feature: '文人治国，文化经济顶峰',
    fall: '崖山蹈海，蒙元灭宋',
    majorEvent: '陈桥兵变、杯酒释兵权、王安石变法、崖山海战',
    detail: '宋，太祖赵匡胤，陈桥兵变，黄袍加身，代周建宋。惩五代藩镇之弊，杯酒释兵权，以文治国，与士大夫共治天下。宋虽武事不振，然文化经济，登峰造极。华夏民族之文化，历数千载之演进，造极于赵宋之世。活字印刷，指南针用于航海，火药用于军事，三大发明改变世界。宋词婉约豪放，山水水墨意境，理学思想精深。东京梦华，商铺林立，夜市直至三更尽，才五更又复开张；临安繁盛，西湖歌舞，暖风熏得游人醉。靖康之耻，二帝北狩，宋室南渡，偏安江南。岳武穆北伐功亏一篑，文天祥留取丹心照汗青。崖山一战，陆秀夫负帝蹈海，十万军民同殉国难。宋虽亡，其文明之光，照耀千古。',
    innovations: ['活字印刷', '指南针航海', '文官制度', '商品经济', '程朱理学'],
    famousPeople: ['宋太祖', '王安石', '苏轼', '岳飞', '朱熹', '文天祥', '毕昇'],
    legacies: ['文官政治传统', '宋词文学宝库', '三大发明西传', '市民文化兴起'],
    crises: ['烛影斧声', '澶渊之盟', '靖康之耻', '崖山海战'],
    color: '#3b82f6',
    icon: '🎋'
  },
  {
    id: 8,
    name: '明',
    era: '1368-1644',
    years: 276,
    kings: 16,
    founder: '朱元璋',
    capital: '南京、北京',
    territory: '997万平方公里',
    population: '约2亿',
    destiny: 75,
    achievement: 90,
    feature: '天子守国门，君王死社稷',
    fall: '李自成进京，崇祯自缢',
    majorEvent: '洪武之治、永乐盛世、郑和下西洋、土木堡之变',
    detail: '明，太祖朱元璋，淮右布衣，驱逐胡虏，恢复中华，立纲陈纪，救济斯民。废丞相，设内阁，皇帝亲掌六部。永乐迁都北京，天子守国门；修永乐大典，集古今图书；郑和下西洋，宣威海外，大小凡三十余国，涉沧溟十万余里。仁宣之治，吏治清明，百姓安居乐业。土木之变，英宗北狩，于谦守北京，社稷转危为安。弘治中兴，万历新政，明之国势，时起时伏。戚继光平倭寇，李时珍修本草，徐霞客游名山大川，阳明心学致良知。崇祯即位，励精图治，然内有流寇，外有满清，加之以天灾连年，臣僚党争，李自成果破京师，崇祯自缢于煤山，君王死社稷。明虽亡，其刚直之风，至今令人起敬。',
    innovations: ['内阁制度', '八股取士', '郑和航海', '阳明心学', '白银货币化'],
    famousPeople: ['朱元璋', '朱棣', '于谦', '王阳明', '戚继光', '李时珍', '崇祯帝'],
    legacies: ['故宫紫禁城', '万里长城', '永乐大典', '气节精神'],
    crises: ['靖难之役', '土木堡之变', '倭寇之患', '李自成起义'],
    color: '#ef4444',
    icon: '🏮'
  }
]

const getDynastyStyle = (name: string) => {
  if (name === '汉' || name === '唐') return { label: '盛世大朝' }
  if (name === '秦' || name === '隋') return { label: '短命而强' }
  return { label: '正统王朝' }
}

export default function ChaodaiPage() {
  const [filteredDynasties, setFilteredDynasties] = useState(DYNASTIES)
  const [expandedDynasty, setExpandedDynasty] = useState<number | null>(null)

  const handleDynastyFilter = useCallback((data: typeof DYNASTIES) => {
    setFilteredDynasties(data)
  }, [])

  const dynastyFilters = {
    searchKeys: ['name', 'founder', 'capital', 'feature', 'fall', 'detail', 'innovations', 'famousPeople'],
    filterKeys: {},
    sortOptions: [
      { key: 'years', label: '国祚长短' },
      { key: 'achievement', label: '历史功绩' },
      { key: 'destiny', label: '气运指数' },
      { key: 'name', label: '朝代名称' },
    ],
  }

  return (
    <SubPageTemplate
      title="历代王朝"
      subtitle="二十四史 · 廿四朝 · 三千年王朝兴替"
      icon="🏯"
      colorRgb="245, 158, 11"
    >
      <SubPageSection title="王朝气运图">
        <InfoCard>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '0.5rem',
            height: '200px',
            padding: '0 1rem'
          }}>
            {DYNASTIES.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ height: 0 }}
                whileInView={{ height: `${d.years / 8}px` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.8 }}
                title={`${d.name} · ${d.years}年`}
                style={{
                  flex: 1,
                  background: d.color,
                  borderRadius: '4px 4px 0 0',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                  minWidth: '40px'
                }}
                onClick={() => setExpandedDynasty(expandedDynasty === d.id ? null : d.id)}
              >
                {d.name}
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem', color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>
            柱高代表享国年数 · 点击可查看对应王朝详情
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="王朝兴衰录">
        <FilterBar
          data={DYNASTIES}
          onFiltered={handleDynastyFilter}
          options={dynastyFilters}
          placeholder="搜索朝代名称、帝王、事件、制度..."
        />
        
        <div style={{ marginTop: '1.5rem' }}>
          <AnimatePresence>
            {filteredDynasties.map((dynasty) => (
              <motion.div key={dynasty.id} layout style={{ marginBottom: '1rem' }}>
                <InfoCard
                  title={`${dynasty.name}朝`}
                  subtitle={`${dynasty.era} · 享国${dynasty.years}年 · ${dynasty.kings}帝`}
                  glowColor={dynasty.color.replace('#', '')}
                  glowIntensity={dynasty.achievement >= 95 ? 90 : 60}
                  onClick={() => setExpandedDynasty(expandedDynasty === dynasty.id ? null : dynasty.id)}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '1rem', alignItems: 'start' }}>
                    <motion.div
                      animate={dynasty.achievement >= 95 ? {
                        scale: [1, 1.1, 1],
                        boxShadow: [`0 0 15px ${dynasty.color}00`, `0 0 35px ${dynasty.color}`, `0 0 15px ${dynasty.color}00`]
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '12px',
                        background: dynasty.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem'
                      }}
                    >
                      {dynasty.icon}
                    </motion.div>
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '0.75rem' }}>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>开朝</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: dynasty.color }}>{dynasty.founder}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>都城</div>
                          <div style={{ fontSize: '0.9rem' }}>{dynasty.capital}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>历史功绩</div>
                          <ProgressBar value={dynasty.achievement} color={dynasty.color} height={6} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>王朝气运</div>
                          <ProgressBar value={dynasty.destiny} color="#22c55e" height={6} />
                        </div>
                      </div>
                      <p style={{ color: 'rgba(180, 180, 190, 0.9)', fontSize: '0.9rem', margin: 0 }}>
                        {dynasty.feature}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedDynasty === dynasty.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ 
                          borderTop: `1px solid ${dynasty.color}33`,
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
                            {dynasty.detail}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                              <div style={{ color: dynasty.color, fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                💡 制度创新
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {dynasty.innovations.map((inno, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: `${dynasty.color}20`,
                                    color: dynasty.color
                                  }}>
                                    {inno}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                🌟 风云人物
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {dynasty.famousPeople.map((p, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(34, 197, 94, 0.15)',
                                    color: '#22c55e'
                                  }}>
                                    {p}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                              <div style={{ color: '#b89438', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                📜 历史遗产
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {dynasty.legacies.map((l, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(184, 148, 56, 0.15)',
                                    color: '#b89438'
                                  }}>
                                    {l}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                ⚠️ 王朝危机
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {dynasty.crises.map((c, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(239, 68, 68, 0.15)',
                                    color: '#ef4444'
                                  }}>
                                    {c}
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
                    color: `${dynasty.color}99`,
                    fontSize: '0.8rem'
                  }}>
                    {expandedDynasty === dynasty.id ? '▲ 收起详情' : '▼ 点击展开详情'}
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
