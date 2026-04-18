'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface Karma {
  id: number
  type: string
  level: string
  deed: string
  karmaValue: number
  retribution: string
  example: string
  detail: string
  sutraBasis: string[]
  effects: string[]
  historicalCases: string[]
  color: string
}

interface KarmaBalance {
  id: number
  name: string
  good: number
  bad: number
  net: number
  result: string
  verdict: string
  lifeStory: string
  keyEvents: string[]
  lessons: string[]
  icon: string
}

const KARMA_TYPES: Karma[] = [
  {
    id: 1,
    type: '善',
    level: '大善',
    deed: '舍身救万人',
    karmaValue: 10000,
    retribution: '七世福报，位列仙班',
    example: '佛祖割肉喂鹰',
    detail: '大善之业，其功巍巍。舍己身以救众生，弃私欲而存大爱。此等善行，感天动地，鬼神敬之，诸佛护念。非惟一己之福，实乃万民之赖。经云：「救人一命，胜造七级浮屠。」况救万人者乎！其福报之大，历七世而不衰，其善根之深，历万劫而不坏。生为人天之尊，没为上界之仙。金身不坏，智慧圆明，万民敬仰，千古流芳。此乃无上功德，非世俗之善可比也。',
    sutraBasis: ['《地藏经》：舍一得万报', '《金刚经》：无住相布施', '《易经》：积善之家，必有余庆'],
    effects: ['飞升仙界', '金身不坏', '万民敬仰', '子孙蒙福'],
    historicalCases: ['佛祖割肉喂鹰', '地藏菩萨地狱救母', '关帝忠义成神', '岳武穆精忠报国'],
    color: '#22c55e'
  },
  {
    id: 2,
    type: '善',
    level: '中善',
    deed: '修桥铺路，赈济灾民',
    karmaValue: 1000,
    retribution: '三世富贵，子孙贤孝',
    example: '范仲淹义田',
    detail: '中善之业，其利溥哉。修桥梁以济往来，铺道路以便行旅，设义仓以救饥馑，施汤药以疗疾病。此等善行，利及一方，功在数世。不必舍身，但须尽心；不必倾家，但须尽力。量力而行，随缘而作，持之以恒，历久弥彰。其福报也，不求自得，不求自来。生享康寿之乐，没留余庆之泽。三世富贵，非徒幸然；子孙贤达，岂偶然哉！天理昭昭，报应不爽。',
    sutraBasis: ['《易经》：积善之家，必有余庆', '《太上感应篇》：祸福无门，惟人自召', '《了凡四训》：命由我作，福自己求'],
    effects: ['现世富贵', '子孙贤孝', '身体健康', '家庭和睦'],
    historicalCases: ['范仲淹置义田', '袁了凡改命', '胡雪岩施药', '武训办学'],
    color: '#84cc16'
  },
  {
    id: 3,
    type: '善',
    level: '小善',
    deed: '日行一善，与人为善',
    karmaValue: 10,
    retribution: '一世平安，逢凶化吉',
    example: '路人指路',
    detail: '小善之业，贵在坚持。一日一善，三年千善；一事一善，万事皆善。一言之善，暖人心脾；一行之善，解人急难。不必惊天动地，但求问心无愧；不必人人知晓，但求心安理得。一滴水虽微，渐次成江海；一粒沙虽小，累次成丘山。小善不积，无以成大德；小恶不改，足以丧全身。日积月累，功不唐捐。命蹇者转而为通，运否者变而为泰。平安是福，何须封侯；顺遂是庆，何须富贵。',
    sutraBasis: ['《太上感应篇》：不欺暗室', '《菜根谭》：一念慈祥', '《论语》：勿以善小而不为'],
    effects: ['平安顺遂', '逢凶化吉', '遇贵人助', '心情舒畅'],
    historicalCases: ['路人指路得善报', '赠人玫瑰手有余香', '滴水之恩涌泉相报', '一念之善得救度'],
    color: '#a3e635'
  },
  {
    id: 4,
    type: '恶',
    level: '大恶',
    deed: '杀人盈野，卖国求荣',
    karmaValue: -10000,
    retribution: '永坠地狱，万世不得超生',
    example: '秦桧害岳飞',
    detail: '大恶之业，其祸烈烈。杀人无数，血流成河；残害忠良，卖国求荣。此等恶行，人神共愤，天地不容。生则万民唾骂，死则永坠地狱。上干天怒，下遭民怨。其身虽死，其罪不灭；其形虽灭，其业长存。历万劫而不原，经千生而不释。铜蛇铁狗，昼夜相侵；剑树刀山， moment相逼。呼号之声，震乎地狱；悲泣之泪，溢乎奈河。此乃无间之罪，非寻常之恶可比也。',
    sutraBasis: ['《地藏经》：无间地狱', '《玉历宝钞》：十殿阎罗', '《左传》：多行不义必自毙'],
    effects: ['永坠地狱', '万世苦刑', '遗臭万年', '子孙断绝'],
    historicalCases: ['秦桧害岳飞', '汪精卫卖国', '白起坑赵卒', '董卓乱朝纲'],
    color: '#ef4444'
  },
  {
    id: 5,
    type: '恶',
    level: '中恶',
    deed: '谋财害命，伤天害理',
    karmaValue: -1000,
    retribution: '三世贫病，家破人亡',
    example: '西门庆与潘金莲',
    detail: '中恶之业，其报昭然。谋人之财，害人之命，坏人之名，破人之家。此等恶行，伤天害理，鬼神不容。不必杀人，伤人心者亦是；不必夺命，破人家者亦然。天网恢恢，疏而不漏。报应之来，迟早而已。或报之于己身，或报之于子孙。横死遭凶，皆由前定；绝后灭嗣，岂是无因。家破人亡，妻离子散，疾病缠身，求死不得。世人不知，谓之偶然；智者观之，一一不爽。',
    sutraBasis: ['《太上感应篇》：取非义之财', '《玉历宝钞》：谋财害命', '《易经》：积不善之家，必有余殃'],
    effects: ['横死凶亡', '绝嗣灭门', '恶疾缠身', '家破人亡'],
    historicalCases: ['西门庆潘金莲', '谋财害命案', '欺心破家者', '伤天害理辈'],
    color: '#f97316'
  },
  {
    id: 6,
    type: '恶',
    level: '小恶',
    deed: '损人利己，口角是非',
    karmaValue: -10,
    retribution: '一世坎坷，多灾多难',
    example: '背后谗言',
    detail: '小恶之业，贵在知改。一言之恶，伤人无形；一行之恶，害人不觉。以是为小，放而为之；以是为轻，忽而不改。一言之谗，足以破人之家；一事之倾，足以夺人之命。小恶日积，大恶乃成；小罪月增，重罪乃就。及其报应之来，虽悔何及！运途坎坷，事事不顺；灾病缠身，处处碰壁。小人缠绕，口舌是非；破财耗散，劳而无功。皆由小恶积累，不知悔改故也。戒之慎之，勿以恶小而为之。',
    sutraBasis: ['《论语》：勿以恶小而为之', '《太上感应篇》：口舌是非', '《菜根谭》：慎独'],
    effects: ['运途坎坷', '口舌是非', '破财耗散', '小人缠身'],
    historicalCases: ['背后谗言害人', '损人不利己', '口角起祸端', '小事酿大祸'],
    color: '#ea580c'
  }
]

const KARMA_BALANCES: KarmaBalance[] = [
  {
    id: 1,
    name: '窦娥',
    good: 95,
    bad: 5,
    net: 90,
    result: '沉冤昭雪，后世封神',
    verdict: '善有善报',
    lifeStory: '窦娥，楚州贫女也。父窦天章，入京应举，卖与蔡婆为童养媳。夫早亡，与婆婆相依为命。张驴儿父子欲强占之，窦娥坚执不从。张驴儿欲毒死蔡婆，反误杀己父，遂诬告窦娥。官府酷刑，屈打成招，被判死刑。临刑发三愿：血溅白练、六月飞雪、楚州大旱三年。后一一应验。父天章为官，为之平反。后世尊为孝烈夫人，血冤封神。',
    keyEvents: ['宁死不辱', '三桩誓愿', '六月飞雪', '沉冤昭雪'],
    lessons: ['贞节感天', '孝德动地', '虽冤必伸', '善终有报'],
    icon: '❄️'
  },
  {
    id: 2,
    name: '岳飞',
    good: 100,
    bad: 0,
    net: 100,
    result: '精忠报国，万世流芳',
    verdict: '流芳百世',
    lifeStory: '岳飞，字鹏举，相州汤阴人也。生有神力，未冠，挽弓三百斤，弩八石。学射于周同，尽其术，能左右射。靖康之难，飞应募从军，背刺「尽忠报国」四字。大小数百战，未尝一败。破金兵于郾城，直抵朱仙镇，指日渡河。秦桧主和，一日降十二道金牌召还。飞愤惋泣下，东向再拜曰：「十年之力，废于一旦！」下狱，以「莫须有」罪死于风波亭，年三十九。后世尊为武圣，封神伏魔大帝。',
    keyEvents: ['岳母刺字', '郾城大捷', '十二道金牌', '风波亭就义'],
    lessons: ['精忠贯日', '大义参天', '虽死犹生', '万古流芳'],
    icon: '⚔️'
  },
  {
    id: 3,
    name: '秦桧',
    good: 5,
    bad: 95,
    net: -90,
    result: '遗臭万年，跪像千年',
    verdict: '恶有恶报',
    lifeStory: '秦桧，字会之，江宁人也。政和五年登第。靖康之难，随徽钦二帝北狩，后逃归。力主和议，深得高宗信任，两任宰相，前后执政十九年。杀岳飞，贬张浚，逐赵鼎，罢韩世忠。一时忠臣良将，诛锄略尽。其顽钝无耻者，率为桧用，争以诬陷善类为功。晚年残忍尤甚，数兴大狱，又喜谀佞，不避形迹。死后谥忠献。宋宁宗时追夺王爵，改谥谬丑。铸其夫妇铁像，跪于岳坟前，万民唾骂，至今不替。',
    keyEvents: ['陷害忠良', '莫须有罪名', '绍兴和议', '遗臭万年'],
    lessons: ['卖国求荣', '残害忠良', '天网恢恢', '遗臭万年'],
    icon: '👎'
  },
  {
    id: 4,
    name: '关羽',
    good: 98,
    bad: 2,
    net: 96,
    result: '武圣封神，三界伏魔',
    verdict: '万世尊奉',
    lifeStory: '关羽，字云长，河东解人也。美须髯，人称美髯公。与刘备、张飞桃园结义，誓同生死。白马坡斩颜良，千里走单骑，过五关斩六将，义释曹操于华容道。水淹七军，威震华夏。后吕蒙白衣渡江，败走麦城，父子遇害。死后英灵不散，玉泉山显圣。历代加封，宋徽宗封义勇武安王，明万历封三界伏魔大帝神威远镇天尊关圣帝君。至今武庙供奉，与文圣孔子齐名。',
    keyEvents: ['桃园结义', '千里走单骑', '华容道义释曹操', '玉泉山显圣'],
    lessons: ['义薄云天', '忠信两全', '死后封神', '万世尊奉'],
    icon: '🐉'
  },
  {
    id: 5,
    name: '曹操',
    good: 60,
    bad: 70,
    net: -10,
    result: '虽成霸业，骂名千载',
    verdict: '功过难评',
    lifeStory: '曹操，字孟德，沛国谯人也。少机警，有权数，而任侠放荡，不治行业。举孝廉入仕。黄巾起，讨董卓，迎献帝于许昌，挟天子以令诸侯。破袁绍，灭吕布，平刘表，定北方。赤壁之战败于孙刘，遂成鼎足之势。子曹丕代汉，追尊为魏武帝。然其为人，猜忌多疑，杀伐太重。吕伯奢一家，「宁我负人，毋人负我」；徐州屠戮，鸡犬不留。功首罪魁，非予二人；身后骂名，千载不休。盖棺论定，功过难评。',
    keyEvents: ['挟天子令诸侯', '官渡之战', '赤壁之败', '宁我负人'],
    lessons: ['功首罪魁集一身', '奸雄本色后世评', '功过是非难定论', '留与后人话短长'],
    icon: '⚡'
  },
  {
    id: 6,
    name: '袁了凡',
    good: 100,
    bad: 10,
    net: 90,
    result: '改命延寿，福禄善终',
    verdict: '命由我作',
    lifeStory: '袁黄，字坤仪，号了凡，吴江人也。少时遇孔先生，算定终身功名利禄，谓其无功名，无子，寿五十三。后果一一应验，遂信命有定数，无复求进。后遇云谷禅师，授以功过格，谓「命由我作，福自己求」。于是力行善事，日求己过。求子得子，求寿得寿，求功名得功名。著《了凡四训》，诫其子曰：「务要日日知非，日日改过；一日不知非，即一日安于自是；一日无过可改，即一日无步可进。」寿七十四，福禄善终。',
    keyEvents: ['孔先生算命', '云谷禅师点化', '功过格修行', '写四训教子'],
    lessons: ['命由我作不由天', '行善改过能改命', '一切福田不离方寸', '从心而觅感无不通'],
    icon: '📖'
  }
]

export default function YinguoPage() {
  const [filteredKarma, setFilteredKarma] = useState(KARMA_TYPES)
  const [expandedKarma, setExpandedKarma] = useState<number | null>(null)
  const [filteredBalance, setFilteredBalance] = useState(KARMA_BALANCES)
  const [expandedBalance, setExpandedBalance] = useState<number | null>(null)

  const handleKarmaFilter = useCallback((data: typeof KARMA_TYPES) => {
    setFilteredKarma(data)
  }, [])

  const handleBalanceFilter = useCallback((data: typeof KARMA_BALANCES) => {
    setFilteredBalance(data)
  }, [])

  const karmaFilters = {
    searchKeys: ['type', 'level', 'deed', 'retribution', 'example', 'detail', 'effects'],
    filterKeys: {
      type: [...new Set(KARMA_TYPES.map(k => k.type))],
      level: [...new Set(KARMA_TYPES.map(k => k.level))],
    },
    sortOptions: [
      { key: 'karmaValue', label: '业力值排序' },
      { key: 'level', label: '善恶等级' },
    ],
  }

  const balanceFilters = {
    searchKeys: ['name', 'result', 'verdict', 'lifeStory', 'lessons'],
    filterKeys: {
      verdict: [...new Set(KARMA_BALANCES.map(b => b.verdict))],
    },
    sortOptions: [
      { key: 'net', label: '善恶净值' },
      { key: 'name', label: '人物名称' },
    ],
  }

  return (
    <SubPageTemplate
      title="因果报应"
      subtitle="善有善报 · 恶有恶报 · 不是不报 · 时候未到"
      icon="⚖️"
      colorRgb="236, 72, 153"
    >
      <SubPageSection title="业力天平">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 100px 1fr',
            gap: '1rem',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  margin: '0 auto 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)'
                }}>
                ☀️
              </motion.div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>善业</div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(180, 180, 190, 0.7)' }}>一念之善，吉神随之</div>
            </motion.div>
            
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ fontSize: '3rem' }}
            >
              ⚖️
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  margin: '0 auto 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)'
                }}>
                🌑
              </motion.div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>恶业</div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(180, 180, 190, 0.7)' }}>一念之恶，厉鬼随之</div>
            </motion.div>
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="善恶业报">
        <FilterBar
          data={KARMA_TYPES}
          onFiltered={handleKarmaFilter}
          options={karmaFilters}
          placeholder="搜索善恶业报类型、案例、经文依据..."
        />
        
        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <AnimatePresence>
            {filteredKarma.map((karma, index) => (
              <motion.div key={karma.id} layout>
                <InfoCard
                  title={`${karma.level}之${karma.type}`}
                  subtitle={karma.deed}
                  glowColor={karma.color.replace('#', '')}
                  onClick={() => setExpandedKarma(expandedKarma === karma.id ? null : karma.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: karma.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.75rem',
                      flexShrink: 0
                    }}>
                      {karma.type === '善' ? '✨' : '⚠️'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: karma.color }}>
                          业力值: {karma.karmaValue}
                        </span>
                        <ProgressBar 
                          value={Math.abs(karma.karmaValue) / 100} 
                          color={karma.color} 
                          height={6} 
                        />
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.9)' }}>
                        <strong>果报:</strong> {karma.retribution}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)', marginTop: '0.25rem' }}>
                        <strong>例:</strong> {karma.example}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedKarma === karma.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ 
                          borderTop: `1px solid ${karma.color}33`,
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
                            {karma.detail}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                              <div style={{ color: karma.color, fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                📜 经典依据
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {karma.sutraBasis.map((s, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: `${karma.color}20`,
                                    color: karma.color
                                  }}>
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                🌟 果报显现
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {karma.effects.map((e, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(34, 197, 94, 0.15)',
                                    color: '#22c55e'
                                  }}>
                                    {e}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div style={{ color: '#b89438', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                              📖 历史公案
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {karma.historicalCases.map((c, i) => (
                                <span key={i} style={{
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem',
                                  background: 'rgba(184, 148, 56, 0.15)',
                                  color: '#b89438'
                                }}>
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div style={{ 
                    textAlign: 'center', 
                    marginTop: '0.75rem',
                    color: `${karma.color}99`,
                    fontSize: '0.8rem'
                  }}>
                    {expandedKarma === karma.id ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </div>
                </InfoCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>

      <SubPageSection title="古今公案">
        <FilterBar
          data={KARMA_BALANCES}
          onFiltered={handleBalanceFilter}
          options={balanceFilters}
          placeholder="搜索历史人物、因果案例、教训..."
        />
        
        <div style={{ marginTop: '1.5rem' }}>
          <AnimatePresence>
            {filteredBalance.map((person, index) => (
              <motion.div key={person.id} layout style={{ marginBottom: '1rem' }}>
                <InfoCard
                  title={person.name}
                  subtitle={`${person.verdict} · ${person.result}`}
                  glowColor={person.net >= 0 ? '22c55e' : 'ef4444'}
                  glowIntensity={Math.abs(person.net)}
                  onClick={() => setExpandedBalance(expandedBalance === person.id ? null : person.id)}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <motion.div
                      animate={person.net >= 90 ? {
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          '0 0 15px rgba(34, 197, 94, 0)',
                          '0 0 35px rgba(34, 197, 94, 0.8)',
                          '0 0 15px rgba(34, 197, 94, 0)'
                        ]
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: person.net >= 0 
                          ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                          : 'linear-gradient(135deg, #ef4444, #dc2626)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        flexShrink: 0
                      }}
                    >
                      {person.icon}
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '0.5rem' }}>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>善业</div>
                          <ProgressBar value={person.good} color="#22c55e" height={6} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>恶业</div>
                          <ProgressBar value={person.bad} color="#ef4444" height={6} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>净值</div>
                          <ProgressBar 
                            value={person.net > 0 ? person.net : Math.abs(person.net)} 
                            color={person.net >= 0 ? '#22c55e' : '#ef4444'} 
                            height={6} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedBalance === person.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ 
                          borderTop: `1px solid ${person.net >= 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
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
                            {person.lifeStory}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                              <div style={{ color: '#3b82f6', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                📌 关键事件
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {person.keyEvents.map((e, i) => (
                                  <span key={i} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(59, 130, 246, 0.15)',
                                    color: '#3b82f6'
                                  }}>
                                    {e}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ color: '#b89438', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                💡 因果启示
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {person.lessons.map((l, i) => (
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
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div style={{ 
                    textAlign: 'center', 
                    marginTop: '0.75rem',
                    color: person.net >= 0 ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)',
                    fontSize: '0.8rem'
                  }}>
                    {expandedBalance === person.id ? '▲ 收起详情' : '▼ 点击展开详情'}
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
