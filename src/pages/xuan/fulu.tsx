'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

const FU_TYPES = [
  {
    name: '护身符',
    category: '镇邪类',
    icon: '🛡️',
    power: 90,
    difficulty: 40,
    feature: '随身佩带，辟邪驱煞，远避小人，保身安宁。出行入险，居家镇宅，夜路保平安。',
    usage: ['入险地', '走夜路', '住凶宅', '防小人'],
    effect: '百邪不侵，夜无恶梦',
    color: '#a78bfa',
  },
  {
    name: '招财符',
    category: '财运类',
    icon: '💰',
    power: 85,
    difficulty: 35,
    feature: '五路财神，招财进宝。生意兴隆，财源广进，利市三倍。正财偏财，俱来入门。',
    usage: ['开店铺', '谈生意', '求偏财', '追欠款'],
    effect: '财源广进，生意兴隆',
    color: '#f59e0b',
  },
  {
    name: '和合符',
    category: '感情类',
    icon: '💕',
    power: 80,
    difficulty: 50,
    feature: '夫妻和合，感情圆满。冰释前嫌，破镜重圆。恩爱甜蜜，白头偕老。',
    usage: ['夫妻和睦', '感情挽回', '姻缘顺利', '家庭和合'],
    effect: '感情和合，姻缘美满',
    color: '#ec4899',
  },
  {
    name: '文昌符',
    category: '学业类',
    icon: '📚',
    power: 88,
    difficulty: 45,
    feature: '文昌帝君，聪明开智。考试顺利，金榜题名，仕途通达。思路清晰，记忆超群。',
    usage: ['升学考试', '晋升面试', '论文写作', '求官求职'],
    effect: '文思泉涌，金榜题名',
    color: '#3b82f6',
  },
  {
    name: '镇宅符',
    category: '镇邪类',
    icon: '🏠',
    power: 92,
    difficulty: 55,
    feature: '安镇家宅，驱除邪崇。家宅平安，人口康宁。化解煞气，阴阳调和。',
    usage: ['新居入宅', '家宅不宁', '邻舍冲煞', '旧房改造'],
    effect: '家宅安宁，人丁兴旺',
    color: '#ef4444',
  },
  {
    name: '治病符',
    category: '医药类',
    icon: '💊',
    power: 75,
    difficulty: 65,
    feature: '天医加持，药石见效。小病速愈，大病转安。身心康泰，元气恢复。',
    usage: ['久治不愈', '手术顺利', '产后恢复', '强身健体'],
    effect: '身心康泰，药到病除',
    color: '#22c55e',
  },
  {
    name: '破煞符',
    category: '化解类',
    icon: '⚔️',
    power: 95,
    difficulty: 70,
    feature: '破除凶煞，化解灾厄。太岁三煞，五黄二黑，诸般凶神，遇之即散。',
    usage: ['犯太岁', '风水煞', '官非口舌', '意外灾厄'],
    effect: '灾消难解，逢凶化吉',
    color: '#dc2626',
  },
  {
    name: '贵人符',
    category: '人际类',
    icon: '🤝',
    power: 82,
    difficulty: 40,
    feature: '天乙贵人，四面八方来相助。逢凶化吉，遇难呈祥，处处遇贵人。',
    usage: ['求职创业', '开拓人脉', '困境求解', '远行求谋'],
    effect: '贵人扶持，万事顺遂',
    color: '#8b5cf6',
  },
]

const SPELL_MANTRAS = [
  {
    name: '净口神咒',
    purpose: '书符前净口',
    mantra: '丹朱口神，吐秽除氛。舌神正伦，通命养神。罗千齿神，却邪卫真。喉神虎贲，炁神引津。心神丹元，令我通真。思神炼液，道炁常存。',
    times: 3,
    efficacy: 95,
    color: '#22c55e',
  },
  {
    name: '净心神咒',
    purpose: '书符前净心',
    mantra: '太上台星，应变无停。驱邪缚魅，保命护身。智慧明净，心神安宁。三魂永久，魄无丧倾。',
    times: 3,
    efficacy: 98,
    color: '#3b82f6',
  },
  {
    name: '金光神咒',
    purpose: '护身加持',
    mantra: '天地玄宗，万炁本根。广修亿劫，证吾神通。三界内外，惟道独尊。体有金光，覆映吾身。视之不见，听之不闻。包罗天地，养育群生。',
    times: 7,
    efficacy: 100,
    color: '#f59e0b',
  },
  {
    name: '祝香神咒',
    purpose: '上香祝祷',
    mantra: '道由心学，心假香传。香爇玉炉，心存帝前。真灵下盼，仙旆临轩。令臣关告，径达九天。',
    times: 1,
    efficacy: 90,
    color: '#ef4444',
  },
  {
    name: '书符咒',
    purpose: '下笔书符',
    mantra: '天圆地方，律令九章。吾今下笔，万鬼伏藏。急急如律令敕。',
    times: 1,
    efficacy: 92,
    color: '#a78bfa',
  },
  {
    name: '送神咒',
    purpose: '送神归位',
    mantra: '向来诵经，功德回向。愿此功德，普及一切。弟子虔心，恭送圣驾。神归其位，各安其所。',
    times: 1,
    efficacy: 85,
    color: '#8b5cf6',
  },
]

const TEN_PRECEPTS = [
  { rule: '戒秽污', level: '极重', penalty: '符无灵验，反招神谴', desc: '书符必先斋戒沐浴，身心洁净，不可犯秽。妇女经血，尤忌触犯。' },
  { rule: '戒荤酒', level: '重', penalty: '气味腥膻，神灵不享', desc: '书前三日，忌食五辛三厌，戒酒肉荤腥。气味腥膻，神灵不享。' },
  { rule: '戒妄想', level: '重', penalty: '神气不纯，符无灵力', desc: '书时必澄心定虑，一念至诚。杂念纷纭，则神气不纯。' },
  { rule: '戒轻易', level: '极重', penalty: '亵渎灵文，罪罚非轻', desc: '遇急难方可用，不可戏谑轻试。亵渎灵文，罪罚非轻。' },
  { rule: '戒违时', level: '中', penalty: '气场不和，效力减半', desc: '书符当择吉日良时。避太岁三杀，避往亡日，避四离四绝。' },
  { rule: '戒妄传', level: '重', penalty: '泄漏天机，天谴难逃', desc: '非人勿传，非道勿授。得人不传亦受谴，妄传非人亦受殃。' },
  { rule: '戒求财', level: '中', penalty: '贪心不足，神不佑护', desc: '不可借符敛财，不可乘危勒索。有道则援之以符，无道则拒之。' },
  { rule: '戒助恶', level: '极重', penalty: '助纣为虐，神明共殛', desc: '恶人求符不可与，奸人作法不可助。天网恢恢，疏而不漏。' },
  { rule: '戒疑信', level: '中', penalty: '半信半疑，灵应不显', desc: '心诚则灵，疑则不验。信则神聚，疑则神散。' },
  { rule: '戒忘恩', level: '重', penalty: '忘本负恩，福泽立消', desc: '符效当知谢神恩，不可用完即弃。饮水思源，知恩图报。' },
]

const SECRETS = [
  {
    title: '① 一点灵光',
    secret: '符无灵不灵，只在一点灵光。下笔之前，冥心静默，与天地精神相往来。我心即天心，我念即神念。此是画符第一关。',
  },
  {
    title: '② 天人合发',
    secret: '天不得时，日月无光。符不得时，灵应不彰。雷雨天画符最灵，子夜时书符最验。天人合发，万变定基。',
  },
  {
    title: '③ 以我之神',
    secret: '以我之神，合彼之神。以我之气，合彼之气。神气相交，灵应如响。非符之灵，乃我心神之灵。',
  },
  {
    title: '④ 有求必应',
    secret: '符者，契也。我与鬼神立约也。人有诚心，神佛有感。不求则不应，不诚则不灵。',
  },
  {
    title: '⑤ 德为本',
    secret: '德者，符之本也。德厚者其符灵，德薄者其符伪。修德不修符，是谓舍本逐末。',
  },
  {
    title: '⑥ 善用其锋',
    secret: '符之刃，可以救人，亦可以杀人。用之正则正，用之邪则邪。神目如电，可不慎哉。',
  },
]

const FU_STRUCTURE = [
  {
    part: '符头',
    meaning: '召请神灵',
    detail: '三字令：雨渐耳。此为紫微大帝符头，统领百神。三点代表三清，一曲代表万神听令。',
    importance: 95,
  },
  {
    part: '符身',
    meaning: '符之主体',
    detail: '书符之核心内容。或星象，或字形，或秘文。屈曲回环，内含天机。',
    importance: 100,
  },
  {
    part: '符胆',
    meaning: '符之灵魂',
    detail: '符无胆则不灵。多用一个「罡」字，或「敕令」二字。天罡所在，万神听令。',
    importance: 98,
  },
  {
    part: '符脚',
    meaning: '符之根基',
    detail: '多用八卦符号，或二十八宿名。镇守符脚，镇护四方。',
    importance: 80,
  },
  {
    part: '印章',
    meaning: '权力凭证',
    detail: '道经师宝印，九天玄女印，太上老君印。无印之符如人间无印之文书。',
    importance: 90,
  },
]

const FAMOUS_FU = [
  {
    name: '桃符',
    dynasty: '先秦',
    origin: '东海度朔山',
    story: '上古有神荼郁垒兄弟，能执鬼。于是黄帝立桃人于门，画二神与虎于板，百鬼畏之。此乃符之滥觞。',
    efficacy: 85,
  },
  {
    name: '太平青领书符',
    dynasty: '东汉',
    origin: '于吉',
    story: '于吉于曲阳泉水上遇神，授太平青领书百七十卷。符水治病，万无一失。孙策杀于吉，后每独坐辄见吉在左右，未几遂死。',
    efficacy: 95,
  },
  {
    name: '五斗米道符',
    dynasty: '东汉',
    origin: '张道陵',
    story: '张天师创五斗米道，符水治病。病人家出米五斗，故号五斗米师。其后子孙世袭，居龙虎山至今。',
    efficacy: 92,
  },
  {
    name: '武侯八阵图符',
    dynasty: '三国',
    origin: '诸葛亮',
    story: '诸葛武侯推演兵法，作八阵图。聚石垒布，纵横成符。陆逊入阵，狂风大作，飞沙走石，不得出。',
    efficacy: 100,
  },
  {
    name: '上清大洞符',
    dynasty: '东晋',
    origin: '茅山',
    story: '杨羲遇魏夫人降坛，授上清大洞真经三十一卷。符章隐书，备极精妙。茅山宗遂开道教符篆之先河。',
    efficacy: 98,
  },
  {
    name: '雷法五雷符',
    dynasty: '北宋',
    origin: '神霄派',
    story: '林灵素创神霄雷法，能召雷唤雨。徽宗朝，京师大旱，林灵素建坛作法，大雨倾盆。其符能役使雷神，威力无比。',
    efficacy: 99,
  },
]

export default function FuluPage() {
  const [selectedFu, setSelectedFu] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <SubPageTemplate
      title="符箓秘术"
      subtitle="书符秘诀 · 咒语真言 · 天人感应 · 感召鬼神"
      icon="📿"
      colorRgb="167, 139, 250"
    >
      <SubPageSection title="符箓本义">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            夫符箓者，天地之合契，鬼神之信物也。一点灵光，先天之气。以我之神，合彼之神；
            以我之气，合彼之气。神气交感，灵应如响。黄帝受符于玄女，禹王治水得灵宝。
            其来尚矣。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            画符不知窍，反惹鬼神笑。画符若知窍，惊得鬼神叫。无他，诚敬而已矣。
            一点灵光在灵台，下笔如神鬼惊。天圆地方，律令九章。吾今下笔，万鬼伏藏。
          </p>
        </InfoCard>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '1rem',
          flexWrap: 'wrap',
        }}>
          {['道', '经', '师', '宝'].map((word, idx) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, rotate: -10 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'white',
                boxShadow: '0 0 20px rgba(167, 139, 250, 0.5)',
              }}
            >
              {word}
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="符箓八大门类">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {FU_TYPES.map((fu, index) => (
            <motion.div
              key={fu.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setSelectedFu(selectedFu === index ? null : index)}
              style={{
                borderColor: selectedFu === index ? fu.color : 'transparent',
                boxShadow: selectedFu === index ? `0 0 25px ${fu.color}40` : 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{fu.icon}</span>
              </div>
              <h3 style={{
                color: fu.color,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '0.5rem',
              }}>
                {fu.name}
              </h3>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                marginBottom: '0.5rem',
              }}>
                <span style={{
                  padding: '0.1rem 0.4rem',
                  borderRadius: '8px',
                  background: `${fu.color}20`,
                  color: fu.color,
                }}>
                  {fu.category}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <ProgressBar value={fu.power} color={fu.color} height={4} label="灵力" />
              </div>
              {selectedFu === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{
                    marginTop: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <p style={{
                    color: 'rgba(180, 180, 190, 0.8)',
                    fontSize: '0.8rem',
                    lineHeight: 1.6,
                    marginBottom: '0.5rem',
                  }}>
                    {fu.feature}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.5rem' }}>
                    {fu.usage.map((u, i) => (
                      <span key={i} style={{
                        fontSize: '0.7rem',
                        padding: '0.1rem 0.35rem',
                        borderRadius: '8px',
                        background: 'rgba(167, 139, 250, 0.15)',
                        color: '#a78bfa',
                      }}>
                        {u}
                      </span>
                    ))}
                  </div>
                  <p style={{
                    fontSize: '0.8rem',
                    color: '#22c55e',
                    textAlign: 'center',
                    padding: '0.3rem',
                    borderRadius: '6px',
                    background: 'rgba(34, 197, 94, 0.1)',
                  }}>
                    ✨ {fu.effect}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="真言咒语">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {SPELL_MANTRAS.map((spell, index) => (
            <motion.div
              key={spell.name}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: spell.color, fontSize: '1rem' }}>{spell.name}</h3>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '10px',
                  background: `${spell.color}20`,
                  color: spell.color,
                }}>
                  {spell.purpose}
                </span>
              </div>
              <p style={{
                color: 'rgba(245, 158, 11, 0.8)',
                fontSize: '0.8rem',
                lineHeight: 1.8,
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.3)',
                fontFamily: 'serif',
                marginBottom: '0.75rem',
              }}>
                "{spell.mantra}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                  诵念 {spell.times} 遍
                </span>
                <ProgressBar value={spell.efficacy} color={spell.color} height={4} label={`灵验度 ${spell.efficacy}%`} />
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="符箓结构解析">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
          {FU_STRUCTURE.map((part, index) => (
            <motion.div
              key={part.part}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{
                color: '#a78bfa',
                marginBottom: '0.5rem',
                textAlign: 'center',
              }}>
                {part.part}
              </h3>
              <p style={{
                fontSize: '0.8rem',
                color: '#f59e0b',
                textAlign: 'center',
                marginBottom: '0.5rem',
              }}>
                {part.meaning}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.75rem',
                lineHeight: 1.6,
                marginBottom: '0.5rem',
              }}>
                {part.detail}
              </p>
              <ProgressBar value={part.importance} color="#a78bfa" height={4} label={`重要度`} />
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="画符十戒">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
          {TEN_PRECEPTS.map((precept, index) => (
            <motion.div
              key={precept.rule}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#ef4444', fontSize: '0.95rem' }}>{precept.rule}</h3>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '8px',
                  background: precept.level === '极重' ? 'rgba(239, 68, 68, 0.2)' : precept.level === '重' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(167, 139, 250, 0.2)',
                  color: precept.level === '极重' ? '#ef4444' : precept.level === '重' ? '#f59e0b' : '#a78bfa',
                }}>
                  {precept.level}
                </span>
              </div>
              <p style={{
                fontSize: '0.75rem',
                color: '#ef4444',
                marginBottom: '0.5rem',
                padding: '0.3rem',
                borderRadius: '4px',
                background: 'rgba(239, 68, 68, 0.1)',
              }}>
                ⚠️ {precept.penalty}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.75rem',
                lineHeight: 1.6,
              }}>
                {precept.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="历代灵验符录">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {FAMOUS_FU.map((record, index) => (
            <motion.div
              key={record.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#a78bfa' }}>{record.name}</h3>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'rgba(180, 180, 190, 0.5)',
                }}>
                  {record.dynasty} · {record.origin}
                </span>
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.85rem',
                lineHeight: 1.7,
                marginBottom: '0.75rem',
              }}>
                {record.story}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)' }}>史载灵验度</span>
                <ProgressBar value={record.efficacy} color="#a78bfa" height={4} />
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="画符不传之秘">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {SECRETS.map((item, index) => (
            <motion.div
              key={item.title}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{ color: '#f59e0b', marginBottom: '0.75rem' }}>
                🔮 {item.title}
              </h3>
              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                lineHeight: 1.8,
                fontSize: '0.9rem',
                fontStyle: 'italic',
              }}>
                "{item.secret}"
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
