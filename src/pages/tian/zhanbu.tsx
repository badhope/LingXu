'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface DivinationMethod {
  name: string
  icon: string
  category: string
  difficulty: number
  accuracy: number
  origin: string
  era: string
  desc: string
  detail: string
  steps: string[]
  notes: string[]
}

interface DivinationMind {
  name: string
  level: string
  importance: number
  desc: string
  detail: string
  classicQuote: string
}

interface GuaXiang {
  name: string
  number: number
  nature: string
  wuxing: string
  meaning: string
  explanation: string
  keywords: string[]
}

const DIVINATION_METHODS: DivinationMethod[] = [
  { name: '铜钱卦', icon: '🪙', category: '周易正统', difficulty: 65, accuracy: 90, origin: '汉代京房', era: '先秦-汉代', desc: '三枚铜钱，六次成卦，最经典的周易起卦方式', detail: '铜钱卜筮源于汉代京房易，以乾隆通宝铜钱为卜具。字为阴，背为阳。三枚铜钱掷六次，得六爻而成一卦。此法简便灵验，为后世卜者所宗。', steps: ['净手静心，焚香祷告', '执钱于掌，默祷其事', '连掷六次，依次记录', '画卦成象，查阅爻辞'], notes: ['每日不宜多卜，三卦为限', '事不诚不卜，疑不诚不卜', '酒后不卜，忿怒不卜'] },
  { name: '梅花易数', icon: '🌸', category: '心易法门', difficulty: 85, accuracy: 95, origin: '邵雍', era: '北宋', desc: '观物取象，随心起卦，邵康节心易之法', detail: '梅花易数为北宋邵雍所创，乃心易之极品。以年月日时起卦，或以动静之物起卦，或以声音言语起卦。其要在于"心"，心动则卦生，万物皆可为卦。此法贵在顿悟，得于心而应于手。', steps: ['澄心涤虑，收视返听', '观物取象，触机而发', '分体析用，辨明五行生克', '察变知机，推断吉凶'], notes: ['无动不占，静则不卜', '触机即占，过时不验', '重在灵机，不可拘泥'] },
  { name: '观音灵签', icon: '🎋', category: '佛道教术', difficulty: 30, accuracy: 85, origin: '观音信仰', era: '唐宋以来', desc: '寺庙求签，吉凶悔吝，一念之间', detail: '签文占卜乃民间最盛行之卜法。一百签，每签配诗一首，吉凶昭然。于佛前焚香礼拜，心中默念所求之事，摇动签筒，待一签落地，即是神明指示。', steps: ['斋戒沐浴，诚心敬意', '佛前焚香，顶礼膜拜', '默祷所求之事', '摇签筒，得签'], notes: ['一事一签，不可重复', '心诚则灵，不诚不验', '得签后还愿谢神'] },
  { name: '灵棋经', icon: '⚪', category: '古易传承', difficulty: 75, accuracy: 88, origin: '黄石公', era: '秦汉', desc: '十二棋子，三百八十四卦，东方灵棋', detail: '灵棋经相传为黄石公传授张良。以十二枚棋子，分刻上中下字，每字四枚。一掷而成卦，共得一百二十五卦，后增至三百八十四卦。其辞古朴，其验如神。', steps: ['清洁案几，放置棋盘', '执十二棋于手中', '焚香念咒，一掷成卦', '查阅灵棋经文'], notes: ['传曰：至诚则灵', '每月朔望后占卜最佳', '切忌亵渎神明'] },
  { name: '龟甲卜', icon: '🐢', category: '上古正统', difficulty: 95, accuracy: 92, origin: '殷商王室', era: '上古三代', desc: '灼烧龟甲，观其裂纹，上古卜法正宗', detail: '龟甲卜为殷商王室占卜之法。取灵龟之腹甲，钻凿其背，以火灼烧，观其裂纹走向，以断吉凶。甲骨文即是其占卜之记录。此法至为神圣，非寻常人可得而用也。', steps: ['择取灵龟，斋戒养之', '杀龟取甲，治削打磨', '钻凿成孔，火候适宜', '观其裂纹，辨吉凶形'], notes: ['国之大事，方可用龟', '非天子诸侯，不敢轻用', '卜后珍藏甲骨，传之后世'] },
  { name: '塔罗牌', icon: '🃏', category: '西方神秘学', difficulty: 70, accuracy: 80, origin: '中世纪欧洲', era: '中世纪', desc: '大阿卡纳，小阿卡纳，揭示潜意识', detail: '塔罗牌共七十八张，大阿卡纳二十二张主命运，小阿卡纳五十六张主细节。洗牌切牌，布阵发牌，依牌意解读。其源或出埃及，或出吉普赛，众说纷纭。然其揭示人心潜意识，确有独到之处。', steps: ['选择牌阵，明确问题', '静心洗牌，意念集中', '切牌抽牌，依序摆放', '结合牌意，深入解读'], notes: ['占卜者需熟悉每张牌意', '注重直觉，不必死记硬背', '同一问题短期内不宜重复'] },
  { name: '蓍草占', icon: '🌿', category: '周易正统', difficulty: 90, accuracy: 93, origin: '周易古制', era: '周', desc: '五十蓍草，四营成变，大衍之数正宗', detail: '蓍草占为周易最古之法。大衍之数五十，其用四十有九。分二挂一，揲之以四，归奇于扐。十有八变而成卦。此法最合易理，然繁琐至极，今人罕用。', steps: ['取蓍草五十茎', '四营而成一变', '三变成一爻', '十八变而成一卦'], notes: ['此法最古最正', '学者当知其理', '今人简化为金钱卦'] },
  { name: '测字', icon: '✍️', category: '杂占法门', difficulty: 80, accuracy: 85, origin: '东汉', era: '汉唐宋明', desc: '观字断事，拆合形意，一字见人心', detail: '测字又称相字，以一字而断吉凶。其法有拆、有合、有会意、有谐音、有象形。字为心画，心动则形现，形现则吉凶见。宋代谢石、明代程省皆为大家。', steps: ['求测者随意书一字', '观察字形结构', '拆合偏旁部首', '结合问事推断'], notes: ['字无定解，存乎一心', '问何事则如何解', '重在触机应变'] },
  { name: '面相手相', icon: '👤', category: '人相术', difficulty: 88, accuracy: 82, origin: '春秋', era: '先秦以来', desc: '相由心生，貌如其人，观面知人', detail: '相法观人五官气色，手纹掌形，以断吉凶贵贱。其要在于神与骨，神清气足者贵，骨正形端者富。气色主近期吉凶，骨骼主一生贵贱。', steps: ['先观神骨，次察五官', '再看气色，后观纹理', '结合部位，流年判断', '综合论断，不可偏执'], notes: ['相由心生，心变相随', '善相者兼观其行', '先天不足，后天可补'] },
  { name: '六壬神课', icon: '🌊', category: '古术正宗', difficulty: 98, accuracy: 97, origin: '九天玄女', era: '上古', desc: '三式之首，大六壬，占卜之王', detail: '六壬为三式之一，与奇门遁甲、太乙神数并称帝王三式。六壬人事最精，号称占卜之王。其法以太乙、天、地三盘，加临十二月将，布四课，发三传，吉凶祸福如在目前。', steps: ['确定占时', '布天盘地盘', '立四课', '发三传', '类神判断'], notes: ['学会大六壬，来人不用问', '三式之中，六壬最验', '需深厚易学基础'] },
  { name: '奇门遁甲', icon: '🌀', category: '三式绝学', difficulty: 98, accuracy: 96, origin: '黄帝战蚩尤', era: '上古', desc: '帝王之学，行军布阵，趋吉避凶', detail: '奇门遁甲为黄帝战蚩尤时，九天玄女所授。以洛书九宫为基础，布三奇六仪，八门九星，值符值使。古时用于行军布阵，后世用于百事占断。其要在于"遁"，知生门则吉，知死门则避。', steps: ['定局数，排地盘', '排天盘九星', '布八门', '排三奇六仪', '找值符值使'], notes: ['学会奇门遁，来人不用问', '重在选方择时', '古代不传之秘'] },
  { name: '扶乩', icon: '📝', category: '通灵术', difficulty: 60, accuracy: 75, origin: '紫姑信仰', era: '晋唐以来', desc: '沙盘乩笔，请神降临，天人沟通', detail: '扶乩又称扶箕，以沙盘为纸，以丁字架为笔，二人扶之，请神降临。神至则笔自动写字，答人所问。历代文人好此道，有请吕祖、请关公、请紫姑者。', steps: ['洁净坛场，设置沙盘', '二人恭立，扶乩请神', '默祷所求，静候神降', '记录乩文，解读神意'], notes: ['心不诚者神不临', '须二人同心', '切忌游戏亵渎'] },
]

const DIVINATION_MINDS: DivinationMind[] = [
  { name: '心诚则灵', level: '基础心法', importance: 100, desc: '凡卜筮之道，必以精诚感格', detail: '诚者，天之道也。不诚无物。心不诚，则神不应，卦不验。故卜筮者，当先正其心，诚其意，如神明在侧，不敢有丝毫怠慢。', classicQuote: '《中庸》曰：至诚之道，可以前知。国家将兴，必有祯祥；国家将亡，必有妖孽。' },
  { name: '无疑不卜', level: '基础心法', importance: 95, desc: '事无可疑，不必卜也', detail: '卜以决疑，不疑何卜？事已昭然，理已明了，当行则行，当止则止，何必问卜？唯于岐路之间，吉凶未判，进退两难，方可卜之。', classicQuote: '《左传》曰：卜以决疑，不疑何卜？' },
  { name: '善易不卜', level: '高级心法', importance: 90, desc: '深明易道者，何须占卜', detail: '知周万物者，不卜而知吉凶。动静语默，无非是易。一言一行，皆合道妙。善易者，观其始而知其终，睹其微而知其著，何必待卦而后知哉？', classicQuote: '《荀子》曰：善为易者不占。' },
  { name: '卜以决疑', level: '实用心法', importance: 92, desc: '既得吉爻，当行正道', detail: '得吉卦而行凶，吉亦变凶；得凶卦而行善，凶可化吉。占卜者，知进退存亡而不失其正者也。', classicQuote: '《周易》曰：积善之家，必有余庆；积不善之家，必有余殃。' },
  { name: '数由前定', level: '高级心法', importance: 85, desc: '命由天定，运由己造', detail: '虽曰天命，岂非人事哉？占卜而知命，非为认命也，实为立命也。知其不足而补之，知其有余而损之，方为智者。', classicQuote: '《了凡四训》曰：命由我作，福自己求。' },
  { name: '慎终如始', level: '基础心法', importance: 88, desc: '得卦之后，当敬慎行之', detail: '既得神示，当信而行之。知吉而不行，等于未卜；知凶而不避，等于自弃。', classicQuote: '《老子》曰：慎终如始，则无败事。' },
]

const GUAXIANG_BASICS: GuaXiang[] = [
  { name: '乾卦', number: 1, nature: '纯阳', wuxing: '金', meaning: '天，健，君子', explanation: '乾为天，六爻皆阳。天行健，君子以自强不息。创始，统领，刚健。', keywords: ['刚健', '开创', '领导', '阳性', '天'] },
  { name: '坤卦', number: 2, nature: '纯阴', wuxing: '土', meaning: '地，顺，厚德', explanation: '坤为地，六爻皆阴。地势坤，君子以厚德载物。包容，承载，柔顺。', keywords: ['包容', '承载', '柔顺', '阴性', '地'] },
  { name: '屯卦', number: 3, nature: '始生', wuxing: '水木', meaning: '云雷，艰难，创始', explanation: '云雷屯，君子以经纶。万事开头难，然生机勃勃。', keywords: ['艰难', '创始', '生机', '蓄力'] },
  { name: '蒙卦', number: 4, nature: '启蒙', wuxing: '山水', meaning: '山泉，蒙昧，教育', explanation: '山下出泉，蒙。君子以果行育德。发蒙启智，童蒙求我。', keywords: ['启蒙', '教育', '幼稚', '待发'] },
  { name: '需卦', number: 5, nature: '等待', wuxing: '水天', meaning: '云上于天，等待', explanation: '云上于天，需。君子以饮食宴乐。待时而动，不冒险进。', keywords: ['等待', '饮食', '时机', '耐心'] },
  { name: '讼卦', number: 6, nature: '争讼', wuxing: '天水', meaning: '天与水违行，争讼', explanation: '天与水违行，讼。君子以作事谋始。防范于未然。', keywords: ['争讼', '矛盾', '是非', '防患'] },
  { name: '师卦', number: 7, nature: '兵众', wuxing: '地水', meaning: '地中有水，师旅', explanation: '地中有水，师。君子以容民畜众。率众，军纪，正义。', keywords: ['军队', '群众', '领导', '正义'] },
  { name: '比卦', number: 8, nature: '亲比', wuxing: '水地', meaning: '地上有水，亲辅', explanation: '地上有水，比。先王以建万国，亲诸侯。亲近，辅佐，团结。', keywords: ['亲辅', '团结', '朋友', '辅助'] },
]

export default function ZhanbuPage() {
  const [filteredMethods, setFilteredMethods] = useState(DIVINATION_METHODS)
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null)
  const [filteredMinds, setFilteredMinds] = useState(DIVINATION_MINDS)
  const [expandedMind, setExpandedMind] = useState<string | null>(null)
  const [filteredGua, setFilteredGua] = useState(GUAXIANG_BASICS)
  const [expandedGua, setExpandedGua] = useState<string | null>(null)

  const handleMethodFilter = useCallback((data: typeof DIVINATION_METHODS) => {
    setFilteredMethods(data)
  }, [])

  const handleMindFilter = useCallback((data: typeof DIVINATION_MINDS) => {
    setFilteredMinds(data)
  }, [])

  const handleGuaFilter = useCallback((data: typeof GUAXIANG_BASICS) => {
    setFilteredGua(data)
  }, [])

  const getDifficultyColor = (diff: number) => {
    if (diff < 50) return '#22c55e'
    if (diff < 75) return '#f59e0b'
    return '#ef4444'
  }

  const getAccuracyColor = (acc: number) => {
    if (acc < 80) return '#f59e0b'
    if (acc < 90) return '#22c55e'
    return '#3b82f6'
  }

  return (
    <SubPageTemplate
      title="占卜问卦"
      subtitle="探赜索隐 · 钩深致远 · 以断天下之吉凶 · 以定天下之业"
      icon="🎴"
      colorRgb="129, 140, 248"
    >
      <SubPageSection title="卜筮之道">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            《易》有圣人之道四焉：以言者尚其辞，以动者尚其变，以制器者尚其象，以卜筮者尚其占。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            夫卜者，非决天命也，实问己心也。卦者，挂也。悬挂万象于目前，映照汝心之真伪。至诚之道，可以前知。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            天垂象，见吉凶，圣人象之。河出图，洛出书，圣人则之。探赜索隐，钩深致远，以定天下之吉凶，成天下之亹亹者，莫大乎蓍龟。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title={`十二大占卜法门详解 (${filteredMethods.length}/${DIVINATION_METHODS.length})`}>
        <FilterBar
          data={DIVINATION_METHODS}
          searchKeys={['name', 'category', 'origin', 'era', 'desc', 'detail', 'steps']}
          filterOptions={[
            { key: 'category', label: '法门分类', allLabel: '全部门类' },
            { key: 'era', label: '起源时代', allLabel: '全部时代' },
          ]}
          onFiltered={handleMethodFilter}
          placeholder="搜索占卜法门、起源、年代..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
          marginTop: '1rem',
        }}>
          {filteredMethods.map((method, index) => (
            <motion.div
              key={method.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -3 }}
              onClick={() => setExpandedMethod(expandedMethod === method.name ? null : method.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '2.5rem' }}>{method.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ color: '#b89438', fontSize: '1.1rem' }}>{method.name}</h3>
                    <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(129, 140, 248, 0.2)', color: '#818cf8' }}>
                      {method.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                    {method.origin} · {method.era}
                  </div>
                </div>
              </div>
              <p style={{ color: 'rgba(180, 180, 190, 0.75)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                {method.desc}
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)', marginBottom: '0.25rem' }}>
                    <span>难度</span>
                    <span style={{ color: getDifficultyColor(method.difficulty) }}>{method.difficulty}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${method.difficulty}%`, height: '100%', background: getDifficultyColor(method.difficulty) }} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)', marginBottom: '0.25rem' }}>
                    <span>应验率</span>
                    <span style={{ color: getAccuracyColor(method.accuracy) }}>{method.accuracy}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${method.accuracy}%`, height: '100%', background: getAccuracyColor(method.accuracy) }} />
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {expandedMethod === method.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                        {method.detail}
                      </p>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.8rem', color: '#b89438', marginBottom: '0.4rem' }}>📋 占卜步骤</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {method.steps.map((step, i) => (
                            <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', borderRadius: '4px' }}>
                              {i + 1}. {step}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: '#b89438', marginBottom: '0.4rem' }}>⚠️ 注意事项</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {method.notes.map((note, i) => (
                            <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderRadius: '4px' }}>
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

      <SubPageSection title={`占卜心法六要 (${filteredMinds.length}/${DIVINATION_MINDS.length})`}>
        <FilterBar
          data={DIVINATION_MINDS}
          searchKeys={['name', 'level', 'desc', 'detail', 'classicQuote']}
          filterOptions={[
            { key: 'level', label: '心法层次', allLabel: '全部层次' },
          ]}
          onFiltered={handleMindFilter}
          placeholder="搜索心法名称、内容..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredMinds.map((mind, index) => (
            <motion.div
              key={mind.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedMind(expandedMind === mind.name ? null : mind.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#b89438' }}>{mind.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(184, 148, 56, 0.2)', color: '#b89438' }}>
                    {mind.level}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: mind.importance >= 90 ? '#22c55e' : '#f59e0b' }}>
                    重要度 {mind.importance}%
                  </span>
                </div>
              </div>
              <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                {mind.desc}
              </p>
              <AnimatePresence>
                {expandedMind === mind.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                        {mind.detail}
                      </p>
                      <div style={{ padding: '0.75rem', background: 'rgba(129, 140, 248, 0.1)', borderRadius: '6px', borderLeft: '3px solid #818cf8' }}>
                        <div style={{ fontSize: '0.75rem', color: '#818cf8', marginBottom: '0.25rem' }}>📜 经典依据</div>
                        <p style={{ color: 'rgba(180, 180, 190, 0.8)', fontSize: '0.85rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                          {mind.classicQuote}
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

      <SubPageSection title={`八卦基础 (${filteredGua.length}/${GUAXIANG_BASICS.length})`}>
        <FilterBar
          data={GUAXIANG_BASICS}
          searchKeys={['name', 'nature', 'wuxing', 'meaning', 'explanation', 'keywords']}
          filterOptions={[
            { key: 'nature', label: '阴阳属性', allLabel: '全部属性' },
            { key: 'wuxing', label: '五行', allLabel: '全部五行' },
          ]}
          onFiltered={handleGuaFilter}
          placeholder="搜索卦名、属性、含义..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredGua.map((gua, index) => (
            <motion.div
              key={gua.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedGua(expandedGua === gua.name ? null : gua.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#b89438' }}>第{gua.number}卦 · {gua.name}</h3>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa' }}>
                    {gua.nature}
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}>
                    {gua.wuxing}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'rgba(180, 180, 190, 0.75)', marginBottom: '0.5rem' }}>
                {gua.meaning}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {gua.keywords.map((kw, i) => (
                  <span key={i} style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', color: 'rgba(180, 180, 190, 0.6)' }}>
                    {kw}
                  </span>
                ))}
              </div>
              <AnimatePresence>
                {expandedGua === gua.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                        {gua.explanation}
                      </p>
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
