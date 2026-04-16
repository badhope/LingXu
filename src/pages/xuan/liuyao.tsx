'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

const NA_JIA = [
  { hexagram: '乾', trigram: '☰', inner: ['子水', '寅木', '辰土'], outer: ['午火', '申金', '戌土'], ruler: '壬午', palace: '乾宫', feature: '纯阳刚健，天行不息。六龙御天，元亨利贞。' },
  { hexagram: '坤', trigram: '☷', inner: ['未土', '巳火', '卯木'], outer: ['丑土', '亥水', '酉金'], ruler: '癸丑', palace: '坤宫', feature: '纯阴柔顺，厚德载物。牝马之贞，利涉大川。' },
  { hexagram: '震', trigram: '☳', inner: ['戌土', '申金', '午火'], outer: ['辰土', '寅木', '子水'], ruler: '庚戌', palace: '震宫', feature: '震惊百里，迅雷不及。长子主器，作乐崇德。' },
  { hexagram: '巽', trigram: '☴', inner: ['丑土', '亥水', '酉金'], outer: ['辛未', '巳火', '卯木'], ruler: '辛丑', palace: '巽宫', feature: '随风巽入，无孔不入。长女随顺，申命行事。' },
  { hexagram: '坎', trigram: '☵', inner: ['寅木', '辰土', '午火'], outer: ['申金', '戌土', '子水'], ruler: '戊申', palace: '坎宫', feature: '坎水险陷，习坎有孚。中男智慧，行险而不失信。' },
  { hexagram: '离', trigram: '☲', inner: ['卯木', '丑土', '亥水'], outer: ['酉金', '未土', '巳火'], ruler: '己巳', palace: '离宫', feature: '离火光明，继明照四方。中女文明，化成天下。' },
  { hexagram: '艮', trigram: '☶', inner: ['辰土', '午火', '申金'], outer: ['戌土', '子水', '寅木'], ruler: '丙寅', palace: '艮宫', feature: '艮山静止，万物之所成终。少男笃实，思不出其位。' },
  { hexagram: '兑', trigram: '☱', inner: ['巳火', '卯木', '丑土'], outer: ['亥水', '酉金', '未土'], ruler: '丁巳', palace: '兑宫', feature: '兑泽和悦，万物所说。少女丽质，朋友讲习。' },
]

const LIU_SHEN = [
  { name: '青龙', element: '木', color: '#22c55e', feature: '喜庆吉祥，官禄贵气。主婚姻喜庆，升官发财，添丁进口。遇吉神则吉庆加倍，遇凶神则化凶为吉。', effect: 95, day: '甲乙日' },
  { name: '朱雀', element: '火', color: '#ef4444', feature: '文书口舌，是非争端。主诉讼官司，言语冲突，信息传播。旺则文书得力，衰则口舌是非。', effect: 60, day: '丙丁日' },
  { name: '勾陈', element: '土', color: '#a16207', feature: '田地房屋，迟滞牵连。主不动产交易，事情拖延，牵连连累。稳重可靠但行动迟缓。', effect: 70, day: '戊日' },
  { name: '腾蛇', element: '土', color: '#78716c', feature: '虚惊怪异，梦寐难安。主怪梦异事，惊恐疑虑，虚伪欺诈。阴柔性灵，变化莫测。', effect: 45, day: '己日' },
  { name: '白虎', element: '金', color: '#9ca3af', feature: '血光刑伤，孝服丧事。主凶灾横祸，疾病死伤，刀兵刑罚。旺则杀伐果断，衰则疾病缠身。', effect: 30, day: '庚辛日' },
  { name: '玄武', element: '水', color: '#3b82f6', feature: '盗贼阴私，暧昧不明。主盗窃遗失，私情暧昧，阴谋诡计。旺则智慧深沉，衰则淫邪偷盗。', effect: 50, day: '壬癸日' },
]

const LIU_QIN_LIUYAO = [
  { name: '父母爻', relation: '生我', color: '#3b82f6', feature: '主文书、学业、考试、证件、房屋、车辆、长辈、保护。旺则学业有成，考试顺利；衰则文书不利，考试失败。', usage: ['占长辈', '占考试', '占房产', '占文书'] },
  { name: '官鬼爻', relation: '克我', color: '#dc2626', feature: '主官职、事业、疾病、灾祸、丈夫、权威、鬼神。旺则官运亨通，事业发达；衰则疾病缠身，灾祸临门。', usage: ['占仕途', '占疾病', '占丈夫', '占灾祸'] },
  { name: '兄弟爻', relation: '同我', color: '#22c55e', feature: '主兄弟、朋友、同辈、竞争、破财、阻力。旺则朋友相助，但也分财夺利；衰则孤独无助。', usage: ['占兄弟', '占竞争', '合伙'] },
  { name: '妻财爻', relation: '我克', color: '#f59e0b', feature: '主财富、妻妾、财运、物质、利益、妻子。旺则财源广进，婚姻美满；衰则破财耗散，妻缘浅薄。', usage: ['占财运', '占妻子', '占交易', '占物质'] },
  { name: '子孙爻', relation: '我生', color: '#a855f7', feature: '主子孙、晚辈、福气、解灾、娱乐、医药。旺则子孙贤孝，消灾解厄；衰则子息艰难，福气浅薄。', usage: ['占子孙', '占医药', '占娱乐', '解灾'] },
]

const YAO_POSITIONS = [
  { position: '上爻', yao: '六爻', level: '天', meaning: '宗庙、远方、结果、晚年、外人、表象。事物发展的最终阶段，最外在的表现。', importance: 70 },
  { position: '五爻', yao: '五爻', level: '天', meaning: '君位、至尊、领导、核心、事业、名望。多为尊位，占事得五爻动，多与领导大人物相关。', importance: 95 },
  { position: '四爻', yao: '四爻', level: '人', meaning: '大臣、辅佐、门户、过渡、中年、朋友。承上启下的关键位置，多与外部环境相关。', importance: 80 },
  { position: '三爻', yao: '三爻', level: '人', meaning: '内臣、自己、家庭、过程、壮年、兄弟。内卦之极，多与自身及家庭事务相关。', importance: 85 },
  { position: '二爻', yao: '二爻', level: '地', meaning: '臣位、居家、妻子、内心、青年、宅地。多为家宅之位，妻财之位，与内心世界相关。', importance: 90 },
  { position: '初爻', yao: '初爻', meaning: '根基、开始、出身、幼年、内心、大地。事物发展的初始阶段，最内在的根基。', level: '地', importance: 75 },
]

const DIVINATION_METHODS = [
  { name: '铜钱摇卦', accuracy: 90, difficulty: 30, feature: '三枚乾隆通宝，诚心默祷，六次成卦。最为灵验，古今通用。', steps: '静心→祝祷→摇钱→六次成卦' },
  { name: '时间起卦', accuracy: 75, difficulty: 20, feature: '年月日时起卦，无需道具。梅花易数之法，快捷方便。', steps: '年+月+日得上卦，加时得下卦' },
  { name: '报数起卦', accuracy: 70, difficulty: 15, feature: '心中所想随意报三个数字，快捷方便，即时可用。', steps: '第一数上卦，第二数下卦，第三数动爻' },
  { name: '字占', accuracy: 80, difficulty: 40, feature: '观字之形，察字之义。一字一太极，笔画定乾坤。', steps: '左阳右阴，上阳下阴，分判八卦' },
  { name: '物象占', accuracy: 85, difficulty: 60, feature: '远取诸物，近取诸身。见喜鹊则有喜，闻鸦鸣则有凶。', steps: '八卦类万物，观象而知机' },
  { name: '蓍草揲卦', accuracy: 95, difficulty: 90, feature: '大衍之数五十，其用四十有九。最为古法，最为神圣。', steps: '分二→挂一→揲四→归奇，十八变而成卦' },
]

const DUAN_GUA = [
  { name: '旺相休囚死', priority: 1, desc: '春木旺火相土死金囚水休，夏火旺土相金死水囚木休。得时者旺，失时者衰。此为断卦第一要义。' },
  { name: '用神为核心', priority: 2, desc: '万事皆有主，先找用爻。失物看财，寻人看用，考试看父，求官看官，治病看子孙。' },
  { name: '动爻为机', priority: 3, desc: '卦无动爻，事多平静；爻一动，事机已发。动则变，变则化。动爻是事情发展的关键转折点。' },
  { name: '世应为彼我', priority: 4, desc: '世爻为我，应爻为彼。世应相生则合作顺利，相克则矛盾重重。世空我心不实，应空彼意不诚。' },
  { name: '日辰月建', priority: 5, desc: '日辰为六爻之主宰，月建为万卦之提纲。日辰能生克冲合卦中之爻，能起衰扶弱，能制强扶柔。' },
  { name: '刑冲合害', priority: 6, desc: '六合则合好成事，六冲则冲散不成。三合则多人相助，三刑则灾祸刑伤。害则暗地相损。' },
  { name: '空亡玄机', priority: 7, desc: '旺空不为空，衰空真是空。无故空亡必有蹊跷。空中有实，实中有空，此为不传之秘。' },
  { name: '进退神煞', priority: 8, desc: '化进神则事业蒸蒸日上，化退神则功力日渐消退。随鬼入墓则凶险万分，逢绝地则事无转机。' },
]

const GHOSTS_AND_GODS = [
  { name: '天乙贵人', type: '大吉', effect: 98, feature: '最吉之神，遇难呈祥，逢凶化吉。有贵人相助，得人提拔。' },
  { name: '禄神', type: '吉', effect: 90, feature: '俸禄爵禄，衣食无忧。占官得禄则官职稳，占财得禄则财源厚。' },
  { name: '驿马', type: '平', effect: 75, feature: '主动主远行，主升迁调动。马星带财则动中得财，马星带煞则动而有灾。' },
  { name: '桃花', type: '平', effect: 65, feature: '主姻缘人缘，风流韵事。吉则风情万种，凶则淫乱败家。' },
  { name: '华盖', type: '平', effect: 70, feature: '主艺术玄学，孤独清高。文人得之才华横溢，常人得之孤独寡合。' },
  { name: '劫煞', type: '凶', effect: 35, feature: '主破财争斗，盗贼侵害。吉则智慧过人，凶则谋财害命。' },
  { name: '亡神', type: '凶', effect: 40, feature: '主虚诈不实，计谋多端。吉则深谋远虑，凶则狡诈奸猾。' },
  { name: '空亡', type: '平', effect: 50, feature: '主虚无缥缈，事不落实。吉空则吉事不成，凶空则凶事消散。' },
]

export default function LiuyaoPage() {
  const [selectedShen, setSelectedShen] = useState<number | null>(null)
  const [coinState, setCoinState] = useState<number[][]>([])
  const [isDivining, setIsDivining] = useState(false)

  const tossCoins = () => {
    setIsDivining(true)
    const results: number[][] = []
    for (let i = 0; i < 6; i++) {
      const toss = [Math.random() > 0.5 ? 1 : 0, Math.random() > 0.5 ? 1 : 0, Math.random() > 0.5 ? 1 : 0]
      results.push(toss)
    }
    setTimeout(() => {
      setCoinState(results)
      setIsDivining(false)
    }, 1000)
  }

  const getYaoType = (toss: number[]) => {
    const sum = toss.reduce((a, b) => a + b, 0)
    if (sum === 3) return { type: '老阳', symbol: '○', color: '#ef4444', move: true }
    if (sum === 0) return { type: '老阴', symbol: '×', color: '#3b82f6', move: true }
    if (sum === 2) return { type: '少阳', symbol: '—', color: '#f59e0b', move: false }
    return { type: '少阴', symbol: '- -', color: '#a855f7', move: false }
  }

  return (
    <SubPageTemplate
      title="六爻断事"
      subtitle="纳甲装卦 · 六亲定位 · 世应辨明 · 断吉凶悔吝"
      icon="🔮"
      colorRgb="236, 72, 153"
    >
      <SubPageSection title="六爻精义">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            以钱代蓍，法出京房。三枚铜钱，六次成卦。纳甲以配干支，安六亲以定五行，取世应以明彼我，
            察动变以决吉凶。易无思也，无为也，寂然不动，感而遂通天下之故。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            卦有一动，必有一验。爻有万象，随类而应。善卜者观其大象，不拘于一端；知机者会于一心，
            不泥于字句。至诚之道，可以前知。国家将兴，必有祯祥；国家将亡，必有妖孽。
          </p>
        </InfoCard>

        <div style={{ marginTop: '1.5rem' }}>
          <motion.div
            className="xian-submodule-card"
            whileHover={{ scale: 1.01 }}
            style={{ textAlign: 'center', padding: '2rem' }}
          >
            <h3 style={{ color: '#ec4899', marginBottom: '1.5rem' }}>🎲 在线摇卦</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '1.5rem' }}>
              {coinState.length === 0 ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} style={{
                    width: '40px',
                    height: '60px',
                    border: '2px dashed rgba(236, 72, 153, 0.3)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ color: 'rgba(180, 180, 190, 0.3)' }}>爻{6 - i}</span>
                  </div>
                ))
              ) : (
                [...coinState].reverse().map((toss, i) => {
                  const yao = getYaoType(toss)
                  return (
                    <div key={i} style={{
                      width: '50px',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      background: `${yao.color}20`,
                      border: `2px solid ${yao.color}`,
                    }}>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: yao.color,
                        textAlign: 'center',
                      }}>
                        {yao.symbol}
                      </div>
                      <p style={{
                        fontSize: '0.7rem',
                        color: yao.color,
                        textAlign: 'center',
                        marginTop: '0.25rem',
                      }}>
                        {yao.type}
                      </p>
                      {yao.move && <p style={{ fontSize: '0.6rem', color: '#ef4444', textAlign: 'center' }}>动</p>}
                    </div>
                  )
                })
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={tossCoins}
              disabled={isDivining}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                opacity: isDivining ? 0.5 : 1,
              }}
            >
              {isDivining ? '🎲 至诚感通...' : '🎲 诚心摇卦'}
            </motion.button>
          </motion.div>
        </div>
      </SubPageSection>

      <SubPageSection title="纳甲八卦">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {NA_JIA.map((gua, index) => (
            <motion.div
              key={gua.hexagram}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div style={{
                fontSize: '3rem',
                textAlign: 'center',
                marginBottom: '0.5rem',
              }}>
                {gua.trigram}
              </div>
              <h3 style={{ color: '#ec4899', textAlign: 'center', marginBottom: '0.5rem' }}>
                {gua.hexagram}卦 · {gua.palace}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <p style={{ color: 'rgba(180, 180, 190, 0.5)' }}>内卦</p>
                  {gua.inner.map((y, i) => <p key={i} style={{ color: '#a855f7' }}>{y}</p>)}
                </div>
                <div>
                  <p style={{ color: 'rgba(180, 180, 190, 0.5)' }}>外卦</p>
                  {gua.outer.map((y, i) => <p key={i} style={{ color: '#ec4899' }}>{y}</p>)}
                </div>
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                padding: '0.5rem',
                borderRadius: '6px',
                background: 'rgba(0,0,0,0.2)',
              }}>
                {gua.feature}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="六神临位">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
          {LIU_SHEN.map((shen, index) => (
            <motion.div
              key={shen.name}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedShen(selectedShen === index ? null : index)}
              style={{
                borderColor: selectedShen === index ? shen.color : 'transparent',
                cursor: 'pointer',
              }}
            >
              <h3 style={{
                color: shen.color,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '0.5rem',
              }}>
                {shen.name}
              </h3>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(180, 180, 190, 0.5)',
                textAlign: 'center',
                marginBottom: '0.5rem',
              }}>
                {shen.day} · {shen.element}
              </p>
              <ProgressBar value={shen.effect} color={shen.color} height={5} />
              {selectedShen === index && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    marginTop: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(180, 180, 190, 0.8)',
                    fontSize: '0.75rem',
                    lineHeight: 1.6,
                  }}
                >
                  {shen.feature}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="六亲活用">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
          {LIU_QIN_LIUYAO.map((qin, index) => (
            <motion.div
              key={qin.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <h3 style={{
                color: qin.color,
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
              }}>
                {qin.name}
              </h3>
              <p style={{
                fontSize: '0.8rem',
                color: 'rgba(180, 180, 190, 0.5)',
                marginBottom: '0.75rem',
              }}>
                {qin.relation}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                marginBottom: '0.75rem',
              }}>
                {qin.feature}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                {qin.usage.map((u, i) => (
                  <span key={i} style={{
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '10px',
                    background: `${qin.color}20`,
                    color: qin.color,
                  }}>
                    {u}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="爻位精义">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {YAO_POSITIONS.map((yao, index) => (
            <motion.div
              key={yao.position}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#ec4899' }}>{yao.position}</h3>
                <span style={{
                  padding: '0.15rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  background: yao.level === '天' ? 'rgba(239, 68, 68, 0.2)' : yao.level === '人' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                  color: yao.level === '天' ? '#ef4444' : yao.level === '人' ? '#a855f7' : '#22c55e',
                }}>
                  {yao.level}道
                </span>
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                marginBottom: '0.75rem',
              }}>
                {yao.meaning}
              </p>
              <ProgressBar value={yao.importance} color="#ec4899" height={4} label={`重要度: ${yao.importance}%`} />
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="起卦方法">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {DIVINATION_METHODS.map((method, index) => (
            <motion.div
              key={method.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#b89438' }}>{method.name}</h3>
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#22c55e' }}>准确率: {method.accuracy}%</span>
                <span style={{ color: '#f59e0b' }}>难度: {method.difficulty}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <ProgressBar value={method.accuracy} color="#22c55e" height={4} />
                <ProgressBar value={100 - method.difficulty} color="#f59e0b" height={4} />
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                marginBottom: '0.5rem',
              }}>
                {method.feature}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: '#ec4899',
                padding: '0.5rem',
                borderRadius: '6px',
                background: 'rgba(236, 72, 153, 0.1)',
              }}>
                📝 {method.steps}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="断卦层次与神煞">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          <div>
            <h3 style={{ color: '#b89438', marginBottom: '1rem' }}>断卦八层级</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {DUAN_GUA.map((rule, index) => (
                <motion.div
                  key={rule.name}
                  className="xian-submodule-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{ padding: '0.75rem 1rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#ec4899',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                    }}>
                      {rule.priority}
                    </span>
                    <span style={{ color: '#ec4899', fontWeight: 'bold' }}>{rule.name}</span>
                  </div>
                  <p style={{
                    marginLeft: '32px',
                    color: 'rgba(180, 180, 190, 0.75)',
                    fontSize: '0.8rem',
                    lineHeight: 1.6,
                  }}>
                    {rule.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ color: '#b89438', marginBottom: '1rem' }}>常见神煞</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {GHOSTS_AND_GODS.map((shen, index) => (
                <motion.div
                  key={shen.name}
                  className="xian-submodule-card"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{ padding: '0.75rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{
                      color: shen.type === '大吉' ? '#22c55e' : shen.type === '吉' ? '#22c55e' : shen.type === '凶' ? '#ef4444' : '#f59e0b',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                    }}>
                      {shen.name}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '8px',
                      background: shen.type.includes('吉') ? 'rgba(34, 197, 94, 0.2)' : shen.type.includes('凶') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: shen.type.includes('吉') ? '#22c55e' : shen.type.includes('凶') ? '#ef4444' : '#f59e0b',
                    }}>
                      {shen.type}
                    </span>
                  </div>
                  <ProgressBar value={shen.effect} color={shen.type.includes('吉') ? '#22c55e' : shen.type.includes('凶') ? '#ef4444' : '#f59e0b'} height={3} />
                  <p style={{
                    marginTop: '0.5rem',
                    color: 'rgba(180, 180, 190, 0.7)',
                    fontSize: '0.75rem',
                    lineHeight: 1.5,
                  }}>
                    {shen.feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SubPageSection>

      <SubPageSection title="装卦程序心法">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
          {[
            { title: '① 纳甲口诀', desc: '乾内甲子外壬午，坤内乙未外癸丑。震纳庚戊巽辛丑，坎内戊寅外戊申。离己卯癸酉己巳，艮丙辰外丙寅。兑丁巳外丁亥，八宫纳甲记在心。' },
            { title: '② 安世应歌', desc: '天同二世天变五，地同四世地变初。人同游魂人变归，游世归魂例不虚。一二三六外卦宫，四五游魂内变更。归魂内卦是本宫。' },
            { title: '③ 六亲定位', desc: '生我者父母，我生者子孙。克我者官鬼，我克者妻财。比和者兄弟。八卦俱从此中来，不离五行生克。' },
            { title: '④ 六神排法', desc: '甲乙起青龙，丙丁起朱雀。戊日起勾陈，己日起腾蛇。庚辛起白虎，壬癸起玄武。从初爻依次装上六爻。' },
            { title: '⑤ 寻用神法', desc: '不动不占，无事不占。先看何事，次寻何爻。占父看父，占子看子。无则看伏，飞伏相寻。' },
            { title: '⑥ 应期秘诀', desc: '动而逢合逢值，静而逢冲逢值。近应日时远应年，多在生旺墓绝间。煞逢生旺煞方发，用遇休囚用不成。' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{ color: '#ec4899', marginBottom: '0.75rem' }}>
                ✦ {item.title}
              </h3>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                lineHeight: 1.8,
                fontSize: '0.9rem',
              }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
