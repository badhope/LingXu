'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface SixPath {
  id: number
  name: string
  sanskrit: string
  level: number
  position: string
  suffering: number
  happiness: number
  lifespan: string
  population: string
  rebirthCause: string
  ruler: string
  feature: string
  danger: string
  categories: string[]
  fallReason: string
  detail: string
  livingConditions: string[]
  karmicLinks: string[]
  liberationMethods: string[]
  color: string
  icon: string
}

interface Nidana {
  id: number
  order: number
  name: string
  pali: string
  meaning: string
  condition: string
  result: string
  detail: string
  practices: string[]
  wisdom: string[]
}

const SIX_PATHS: SixPath[] = [
  {
    id: 1,
    name: '天道',
    sanskrit: 'Deva',
    level: 1,
    position: '最上',
    suffering: 5,
    happiness: 95,
    lifespan: '500 - 84000大劫',
    population: '无量诸天',
    rebirthCause: '上品十善，兼修禅定，布施持戒，慈心不杀',
    ruler: '帝释天、大梵天王、忉利天王',
    feature: '乐多苦少，身有光明，衣食自然，神通自在',
    danger: '五衰相现，福报享尽还堕',
    categories: ['欲界六天', '色界十八天', '无色界四天'],
    fallReason: '耽著乐境，不修功德，我慢贡高，不知出离',
    detail: '天道众生因前世修积巨大善业，得生天界享受胜妙安乐。欲界诸天仍有五欲之乐，色界天已离欲染，无色界天则纯精神存在。然天道福报享尽，五衰相现，仍须堕落轮回，故非究竟解脱之处。',
    livingConditions: ['身有光明，飞行自在', '思衣得衣，思食得食', '宫殿庄严，七宝合成', '寿命长远，安乐无极'],
    karmicLinks: ['上品十善业', '四禅八定功', '大布施功德', '持戒清净行'],
    liberationMethods: ['知乐是苦，生厌离心', '依止善知识，修出离道', '发菩提心，回向净土'],
    color: '#fbbf24',
    icon: '👼'
  },
  {
    id: 2,
    name: '阿修罗道',
    sanskrit: 'Asura',
    level: 2,
    position: '须弥山侧',
    suffering: 40,
    happiness: 60,
    lifespan: '1000 - 10000年',
    population: '无数修罗众',
    rebirthCause: '下品十善，多嗔恚，慢心，猜忌，好胜斗狠',
    ruler: '毗摩质多罗、罗睺阿修罗王',
    feature: '有天福无天德，神通自在而多斗争',
    danger: '战争不断，嗔火烧心',
    categories: ['卵生修罗', '胎生修罗', '湿生修罗', '化生修罗'],
    fallReason: '常与诸天战斗，胜者伤，败者死，嗔恨心重',
    detail: '阿修罗道众生福报类似天人，然因前世修行善法时夹杂嗔恚、慢心、猜忌，虽得善果而德性有亏。修罗男多丑陋，女多姝丽，常因嫉妒天人福报而兴兵战，屡战屡败，受苦无量。',
    livingConditions: ['宫殿壮丽，类似诸天', '有神通力，变化自在', '美食丰饶，然多争斗', '眷属众多，妻妾成群'],
    karmicLinks: ['布施而心不均', '持戒而多嗔恨', '修善而怀慢心', '嫉妒他人胜德'],
    liberationMethods: ['修忍辱行，降伏嗔心', '观平等法，除嫉妒心', '忏悔业障，修慈悲观'],
    color: '#ef4444',
    icon: '⚔️'
  },
  {
    id: 3,
    name: '人道',
    sanskrit: 'Manusya',
    level: 3,
    position: '四大部洲',
    suffering: 50,
    happiness: 50,
    lifespan: '10岁 - 84000岁',
    population: '七十亿众生',
    rebirthCause: '中品十善，守五戒，知惭有愧，中庸之道',
    ruler: '人王君主、转轮圣王',
    feature: '苦乐参半，佛出人间，修道最易',
    danger: '八难障道，退转多进少',
    categories: ['东胜神洲', '南赡部洲', '西牛贺洲', '北俱卢洲'],
    fallReason: '五浊恶世，造业容易，修道难成，放逸懈怠',
    detail: '人道为六道中最易修道之处。因苦乐均等，易生出离心；诸佛皆于人间示现成道，故人身最为珍贵。南赡部洲即吾人所居之娑婆世界，虽苦多乐少，然强于北洲无功德之处。',
    livingConditions: ['苦乐参半，冷暖自知', '衣食住行，皆须劳作', '六亲眷属，恩爱情深', '生老病死，人人必经'],
    karmicLinks: ['中品五戒十善', '知惭有愧之心', '中庸善恶之业', '过去修道习气'],
    liberationMethods: ['皈依三宝，受持五戒', '闻思修证，精进修道', '发菩提心，广度众生'],
    color: '#22c55e',
    icon: '👤'
  },
  {
    id: 4,
    name: '畜生道',
    sanskrit: 'Tiryagyoni',
    level: 4,
    position: '水陆空行',
    suffering: 75,
    happiness: 25,
    lifespan: '刹那 - 数百年',
    population: '无量众生',
    rebirthCause: '愚痴邪见，贪欲杀盗，毁犯禁戒，邪淫妄语',
    ruler: '龙、金翅鸟、兽王、海神',
    feature: '披毛戴角，鳞甲羽毛，吞啖为命',
    danger: '弱肉强食，任人宰杀',
    categories: ['水居众生', '陆行众生', '空飞众生', '穴处众生'],
    fallReason: '累劫畜生，难得出离，愚痴颠倒',
    detail: '畜生道众生因前世愚痴、贪欲、杀业、邪淫等恶业，受此身形。畜生之中，有福报如龙凤、麒麟者，然绝大多数皆为愚痴、恐惧、痛苦所逼，互相吞啖，或为人所杀，苦不堪言。',
    livingConditions: ['弱肉强食，物竞天择', '愚痴无智，不知善恶', '或为宠物，或为食材', '恐惧畏死，求生本能'],
    karmicLinks: ['愚痴邪见颠倒', '杀生偷盗邪淫', '毁谤三宝恶业', '贪嗔痴慢疑重'],
    liberationMethods: ['得闻佛号，种下善根', '遇善知识，为其说法', '忏悔业障，发愿往生'],
    color: '#78716c',
    icon: '🐄'
  },
  {
    id: 5,
    name: '饿鬼道',
    sanskrit: 'Preta',
    level: 5,
    position: '阎罗世界',
    suffering: 90,
    happiness: 10,
    lifespan: '数百年 - 数万年',
    population: '恒河沙数',
    rebirthCause: '悭贪不舍，嫉妒谄曲，不施不予，吝啬刻薄',
    ruler: '阎罗王、焰口鬼王、面然鬼王',
    feature: '常饥常渴，不闻浆水之名',
    danger: '腹大如山，咽细如针，昼隐夜显',
    categories: ['无财鬼', '少财鬼', '多财鬼'],
    fallReason: '劫数不尽，难遇救度，饥渴逼恼',
    detail: '饿鬼道众生因前世悭贪吝啬，不肯布施，嫉妒他人福报，故受此极苦之身。饿鬼终年不闻浆水之名，纵得饮食，入口即化为火焰，百千万年，受饥渴苦，无有出期。唯遇三宝慈悲救度，方得解脱。',
    livingConditions: ['昼伏夜出，畏见阳光', '常饥常渴，苦不堪言', '风刀割体，寒暑交逼', '依人聚落，求觅饮食'],
    karmicLinks: ['悭贪吝啬不施', '嫉妒他人富贵', '谄曲欺诳不实', '偷盗常住财物'],
    liberationMethods: ['放焰口施食，慈悲救度', '供养三宝，回向饿鬼', '盂兰盆会，超荐先亡'],
    color: '#6b7280',
    icon: '👻'
  },
  {
    id: 6,
    name: '地狱道',
    sanskrit: 'Naraka',
    level: 6,
    position: '铁围山间',
    suffering: 100,
    happiness: 0,
    lifespan: '1万年 - 无量劫',
    population: '无量众生',
    rebirthCause: '五逆十恶，毁谤三宝，杀父害母，出佛身血',
    ruler: '阎罗天子、八大狱主、无量狱卒',
    feature: '纯苦无乐，果报最烈',
    danger: '万死万生，求出无期',
    categories: ['八大地狱', '八寒地狱', '十八地狱', '孤独地狱'],
    fallReason: '罪业深重，劫数未尽，求出不得',
    detail: '地狱道为六道中最苦之处。造作五逆十恶、毁谤三宝等重罪众生，命终即堕地狱，受极剧之苦，一日之中，万死万生。地狱寿量极长，一劫一劫受苦，无有出期。唯有至诚忏悔，遇佛救度，方能脱离。',
    livingConditions: ['纯苦无乐，昼夜受苦', '刀山剑树，炉炭镬汤', '寒冰冻裂，烊铜灌口', '狱卒拷打，求死不得'],
    karmicLinks: ['五逆十恶重罪', '毁谤三宝正法', '杀盗淫妄无量', '不知因果报应'],
    liberationMethods: ['至诚忏悔，发露罪业', '称佛名号，至心皈依', '供养三宝，修大功德'],
    color: '#dc2626',
    icon: '🔥'
  }
]

const TWELVE_NIDANAS: Nidana[] = [
  { id: 1, order: 1, name: '无明', pali: 'Avijja', meaning: '痴暗无知', condition: '迷惑不觉', result: '行', detail: '无明即是对诸法实相的迷惑无知，不知因果，不知空性，执着有我。这是轮回的根本，十二因缘之始。', practices: ['修般若智慧', '观诸法实相', '破除我法二执'], wisdom: ['无明灭则行灭', '烦恼本空', '一念觉悟'] },
  { id: 2, order: 2, name: '行', pali: 'Sankhara', meaning: '造作诸业', condition: '无明驱动', result: '识', detail: '由无明故，造作身口意三业，善恶无记诸行。此业力习气，牵引神识入于胎卵，受未来生。', practices: ['观行无常', '慎护三业', '忏悔宿业'], wisdom: ['诸行无常', '业力本空', '不作不受'] },
  { id: 3, order: 3, name: '识', pali: 'Vinnana', meaning: '心识了别', condition: '业力牵引', result: '名色', detail: '由行力故，中有神识一念妄动，投于母胎，纳想为胎，是谓名色。此识即是轮回的载体。', practices: ['观识无相', '转识成智', '不住分别'], wisdom: ['识性本空', '唯识无境', '心识本净'] },
  { id: 4, order: 4, name: '名色', pali: 'Namarupa', meaning: '心色和合', condition: '识入胎卵', result: '六入', detail: '名即是受想行识四阴心法，色即是地水火风四大色法。名色和合，身心渐成。', practices: ['观名色虚妄', '身心分离观', '色即是空'], wisdom: ['名色假名', '身心非我', '五蕴皆空'] },
  { id: 5, order: 5, name: '六入', pali: 'Salayatana', meaning: '六根长成', condition: '名色发育', result: '触', detail: '由名色故，眼耳鼻舌身意六根渐渐长成，此为六入。六根为六尘所入之门，故名六入。', practices: ['守护六根门', '观六根性空', '不随尘转'], wisdom: ['六根清净', '根尘本空', '内守幽闲'] },
  { id: 6, order: 6, name: '触', pali: 'Phassa', meaning: '根尘相对', condition: '六入生用', result: '受', detail: '由六入故，根尘识三事和合，即名为触。根尘相对，一念才起，分别未生，是名触位。', practices: ['观触尘空', '于触不动', '了知幻触'], wisdom: ['触本虚妄', '三和合空', '如幻如化'] },
  { id: 7, order: 7, name: '受', pali: 'Vedana', meaning: '领纳苦乐', condition: '触境生受', result: '爱', detail: '由触生受，顺情则乐，违情则苦，非违非顺则不苦不乐。三受领纳，分别心生。', practices: ['观受是苦', '不受诸受', '三受寂灭'], wisdom: ['受即是空', '苦乐本无', '寂灭为乐'] },
  { id: 8, order: 8, name: '爱', pali: 'Tanha', meaning: '贪欲炽盛', condition: '乐受生爱', result: '取', detail: '由受生爱，于顺情境起贪爱心，于违情境起嗔恚心。爱染既生，遂成渴爱，驰求不已。', practices: ['观爱如渴', '修不净观', '断欲去爱'], wisdom: ['爱为苦本', '情生智隔', '歇即菩提'] },
  { id: 9, order: 9, name: '取', pali: 'Upadana', meaning: '执取不舍', condition: '爱而生取', result: '有', detail: '由爱生取，执取不舍，造作诸业。取有四种：欲取、见取、戒取、我语取。取着既固，业果斯成。', practices: ['放下万缘', '无取无舍', '看破放下'], wisdom: ['取即是缚', '本来无得', '法法不住'] },
  { id: 10, order: 10, name: '有', pali: 'Bhava', meaning: '业果已成', condition: '取故成有', result: '生', detail: '由取著故，善恶业种成熟，招感后有，是谓三有：欲有、色有、无色有。此有即来世果报之因。', practices: ['观有非实', '出离三界', '不受后有'], wisdom: ['三界唯心', '妙有真空', '缘起性空'] },
  { id: 11, order: 11, name: '生', pali: 'Jati', meaning: '诞生受生', condition: '有故受生', result: '老死', detail: '由有业因，故有来生。业力牵入胞胎，四大假合，根身具足，出胎诞生，是名为生。', practices: ['了生脱死', '生死涅槃', '无生法忍'], wisdom: ['生本无生', '不来不去', '不生不灭'] },
  { id: 12, order: 12, name: '老死', pali: 'Jaramarana', meaning: '衰朽坏灭', condition: '生故有死', result: '无明再起', detail: '既有生故，必有老死。身体衰败，种种苦恼，命终之时，四大分离。死已复生，轮回不息，无明复起，十二因缘循环不断。', practices: ['了知生死一如', '涅槃寂静', '常住真心'], wisdom: ['无老死亦无老死尽', '本自无生', '何有老死'] }
]

export default function LunhuiPage() {
  const [filteredPaths, setFilteredPaths] = useState(SIX_PATHS)
  const [expandedPath, setExpandedPath] = useState<number | null>(null)
  const [filteredNidanas, setFilteredNidanas] = useState(TWELVE_NIDANAS)
  const [expandedNidana, setExpandedNidana] = useState<number | null>(null)

  const handlePathFilter = useCallback((data: typeof SIX_PATHS) => {
    setFilteredPaths(data)
  }, [])

  const handleNidanaFilter = useCallback((data: typeof TWELVE_NIDANAS) => {
    setFilteredNidanas(data)
  }, [])

  const pathFilters = {
    searchKeys: ['name', 'sanskrit', 'position', 'rebirthCause', 'feature', 'danger', 'detail'],
    filterKeys: {
      name: SIX_PATHS.map(p => p.name),
    },
    sortOptions: [
      { key: 'level', label: '善恶层级' },
      { key: 'happiness', label: '乐受程度' },
      { key: 'suffering', label: '苦受程度' },
    ],
  }

  const nidanaFilters = {
    searchKeys: ['name', 'pali', 'meaning', 'condition', 'detail', 'wisdom'],
    filterKeys: {},
    sortOptions: [
      { key: 'order', label: '因缘次第' },
      { key: 'name', label: '因缘名称' },
    ],
  }

  return (
    <SubPageTemplate
      title="六道轮回"
      subtitle="三世因果 · 六道轮回 · 十二因缘 · 生死流转"
      icon="🔄"
      colorRgb="239, 68, 68"
    >
      <SubPageSection title="六道轮回图">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '1rem',
            textAlign: 'center'
          }}>
            {SIX_PATHS.map((path, i) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
                style={{ cursor: 'pointer' }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, expandedPath === path.id ? 360 : 0]
                  }}
                  transition={{
                    duration: expandedPath === path.id ? 0.5 : 3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${path.color}, ${path.color}88)`,
                    margin: '0 auto 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    boxShadow: `0 0 25px ${path.color}66`
                  }}
                >
                  {path.icon}
                </motion.div>
                <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: path.color }}>{path.name}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.75rem' }}>苦{path.suffering}% · 乐{path.happiness}%</div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem', color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>
            点击图标查看对应道详情 · 六道循还，生死不息
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="六道详解">
        <FilterBar
          data={SIX_PATHS}
          onFiltered={handlePathFilter}
          options={pathFilters}
          placeholder="搜索道名、业因、果报、详情..."
        />

        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <AnimatePresence>
            {filteredPaths.map((path, index) => (
              <motion.div key={path.id} layout>
                <InfoCard
                  title={`${path.name} (${path.sanskrit})`}
                  subtitle={`${path.position} · ${path.feature}`}
                  glowColor={path.color.replace('#', '')}
                  onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${path.color}, ${path.color}88)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      flexShrink: 0,
                      boxShadow: `0 0 30px ${path.color}55`
                    }}>
                      {path.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                        <div><strong style={{ color: path.color }}>层级:</strong> 第{path.level}道</div>
                        <div><strong style={{ color: path.color }}>寿命:</strong> {path.lifespan}</div>
                        <div><strong style={{ color: '#22c55e' }}>乐:</strong> {path.happiness}%</div>
                        <div><strong style={{ color: '#ef4444' }}>苦:</strong> {path.suffering}%</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ flex: 1 }}>
                          <ProgressBar value={path.happiness / 100} color="#22c55e" height={4} />
                          <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)', textAlign: 'center' }}>乐受</div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <ProgressBar value={path.suffering / 100} color="#ef4444" height={4} />
                          <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)', textAlign: 'center' }}>苦受</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.8)' }}>
                        <strong>转生因:</strong> {path.rebirthCause}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedPath === path.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(180, 180, 190, 0.1)' }}>
                          <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.85)', lineHeight: 1.8, marginBottom: '1rem' }}>
                            {path.detail}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                            <div>
                              <div style={{ fontWeight: 'bold', color: path.color, marginBottom: '0.5rem', fontSize: '0.8rem' }}>🏛️ 生存环境</div>
                              {path.livingConditions.map((c, i) => (
                                <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {c}</div>
                              ))}
                            </div>
                            <div>
                              <div style={{ fontWeight: 'bold', color: path.color, marginBottom: '0.5rem', fontSize: '0.8rem' }}>⚖️ 业力因缘</div>
                              {path.karmicLinks.map((k, i) => (
                                <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {k}</div>
                              ))}
                            </div>
                            <div>
                              <div style={{ fontWeight: 'bold', color: path.color, marginBottom: '0.5rem', fontSize: '0.8rem' }}>🛕 解脱方法</div>
                              {path.liberationMethods.map((m, i) => (
                                <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {m}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </InfoCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>

      <SubPageSection title="十二因缘">
        <FilterBar
          data={TWELVE_NIDANAS}
          onFiltered={handleNidanaFilter}
          options={nidanaFilters}
          placeholder="搜索因缘名称、义理、修法、智慧..."
        />

        <div style={{ marginTop: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            padding: '0 1rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem'
          }}>
            {TWELVE_NIDANAS.map((n, i) => (
              <motion.div
                key={n.id}
                onClick={() => setExpandedNidana(expandedNidana === n.id ? null : n.id)}
                style={{
                  flexShrink: 0,
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  background: expandedNidana === n.id ? 'linear-gradient(135deg, #a855f7, #7c3aed)' : 'rgba(168, 85, 247, 0.1)',
                  color: expandedNidana === n.id ? 'white' : '#a855f7',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: expandedNidana === n.id ? 'none' : '1px solid rgba(168, 85, 247, 0.3)'
                }}
                whileHover={{ scale: 1.05 }}
              >
                {n.order}. {n.name}
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <AnimatePresence>
              {filteredNidanas.map((nidana) => (
                <motion.div key={nidana.id} layout>
                  <InfoCard
                    title={`${nidana.order}. ${nidana.name} (${nidana.pali})`}
                    subtitle={nidana.meaning}
                    glowColor="a855f7"
                    onClick={() => setExpandedNidana(expandedNidana === nidana.id ? null : nidana.id)}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                      <div><strong style={{ color: '#a855f7' }}>因:</strong> {nidana.condition}</div>
                      <div><strong style={{ color: '#a855f7' }}>果:</strong> {nidana.result}</div>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.8)' }}>{nidana.detail}</p>

                    <AnimatePresence>
                      {expandedNidana === nidana.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(180, 180, 190, 0.1)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                              <div>
                                <div style={{ fontWeight: 'bold', color: '#a855f7', marginBottom: '0.5rem', fontSize: '0.8rem' }}>🧘 修行法门</div>
                                {nidana.practices.map((p, i) => (
                                  <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {p}</div>
                                ))}
                              </div>
                              <div>
                                <div style={{ fontWeight: 'bold', color: '#a855f7', marginBottom: '0.5rem', fontSize: '0.8rem' }}>💡 般若智慧</div>
                                {nidana.wisdom.map((w, i) => (
                                  <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {w}</div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </InfoCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
