'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

const ELEMENTS = [
  { name: '木', season: '春', direction: '东', color: '#22c55e', desc: '主仁，其性直，其情和。旺者丰姿秀丽，骨骼修长，手足细腻。甲乙寅卯属木，为生生之气。', sheng: '火', ke: '土', woSheng: '火', woKe: '土' },
  { name: '火', season: '夏', direction: '南', color: '#ef4444', desc: '主礼，其性急，其情恭。旺者浓眉小耳，精神闪烁，谦和恭敬。丙丁巳午属火，为炎上之气。', sheng: '土', ke: '金', woSheng: '土', woKe: '金' },
  { name: '土', season: '四季', direction: '中', color: '#f59e0b', desc: '主信，其性重，其情厚。旺者腰阔鼻圆，忠孝至诚，度量宽厚。戊己辰戌丑未属土，为厚重之气。', sheng: '金', ke: '水', woSheng: '金', woKe: '水' },
  { name: '金', season: '秋', direction: '西', color: '#9ca3af', desc: '主义，其性刚，其情烈。旺者骨肉相称，面方白净，刚毅果断。庚辛申酉属金，为肃杀之气。', sheng: '水', ke: '木', woSheng: '水', woKe: '木' },
  { name: '水', season: '冬', direction: '北', color: '#3b82f6', desc: '主智，其性聪，其情善。旺者面黑有采，语言清和，深谋远虑。壬癸亥子属水，为润下之气。', sheng: '木', ke: '火', woSheng: '木', woKe: '火' },
]

const TIAN_GAN = [
  { index: 1, name: '甲', element: '阳木', nature: '栋梁之木', color: '#22c55e', polarity: '阳', feature: '参天大树，高耸挺拔，积极向上，有担当有魄力。得令则栋梁，失令则废材。', strength: 85 },
  { index: 2, name: '乙', element: '阴木', nature: '花果之木', color: '#16a34a', polarity: '阴', feature: '花草藤蔓，柔韧多姿，细腻敏感，善于变通。得令则繁华，失令则枯朽。', strength: 70 },
  { index: 3, name: '丙', element: '阳火', nature: '太阳之火', color: '#ef4444', polarity: '阳', feature: '烈日骄阳，热情奔放，光明磊落，照破幽冥。得令则辉煌，失令则微光。', strength: 95 },
  { index: 4, name: '丁', element: '阴火', nature: '灯烛之火', color: '#dc2626', polarity: '阴', feature: '灯烛星光，温柔含蓄，长明不灭，暗夜指引。得令则炳耀，失令则烟灭。', strength: 65 },
  { index: 5, name: '戊', element: '阳土', nature: '城墙之土', color: '#f59e0b', polarity: '阳', feature: '高城厚土，稳重可靠，包容万物，承载四方。得令则巍峨，失令则崩塌。', strength: 90 },
  { index: 6, name: '己', element: '阴土', nature: '田园之土', color: '#d97706', polarity: '阴', feature: '田园润土，养育滋养，默默耕耘，无私奉献。得令则丰收，失令则荒芜。', strength: 75 },
  { index: 7, name: '庚', element: '阳金', nature: '斧钺之金', color: '#9ca3af', polarity: '阳', feature: '金刚利刃，果断刚毅，锄强扶弱，仗义疏财。得令则成器，失令则生锈。', strength: 88 },
  { index: 8, name: '辛', element: '阴金', nature: '首饰之金', color: '#6b7280', polarity: '阴', feature: '珠宝美玉，精致珍贵，温润光华，惹人喜爱。得令则璀璨，失令则蒙尘。', strength: 68 },
  { index: 9, name: '壬', element: '阳水', nature: '江河之水', color: '#3b82f6', polarity: '阳', feature: '大江大河，奔腾不息，智慧深远，气象万千。得令则浩瀚，失令则干涸。', strength: 92 },
  { index: 10, name: '癸', element: '阴水', nature: '雨露之水', color: '#2563eb', polarity: '阴', feature: '雨露甘霖，润物无声，细腻入微，泽被苍生。得令则润物，失令则冻冰。', strength: 62 },
]

const DI_ZHI = [
  { index: 1, name: '子', animal: '鼠', element: '水', hidden: ['癸水'], month: '11月', direction: '正北', color: '#2563eb', feature: '墨池清华，智巧聪明。女命坐贵，男命坐财。夜半子时，阴阳交替。' },
  { index: 2, name: '丑', animal: '牛', element: '湿土', hidden: ['己土', '辛金', '癸水'], month: '12月', direction: '东北', color: '#78716c', feature: '柳岸湿泥，含蓄深藏。金库所在，辛金得生。寒冬腊月，万物蛰伏。' },
  { index: 3, name: '寅', animal: '虎', element: '木', hidden: ['甲木', '丙火', '戊土'], month: '正月', direction: '东北', color: '#16a34a', feature: '广谷乔木，生机勃发。火之长生，功参造化。孟春正月，阳气始升。' },
  { index: 4, name: '卯', animal: '兔', element: '木', hidden: ['乙木'], month: '2月', direction: '正东', color: '#22c55e', feature: '琼林繁花，文采风流。纯一乙木，清秀可人。仲春二月，百花盛开。' },
  { index: 5, name: '辰', animal: '龙', element: '湿土', hidden: ['戊土', '乙木', '癸水'], month: '3月', direction: '东南', color: '#78716c', feature: '草泽熏风，变化莫测。水库所在，癸水归藏。季春三月，雨泽万物。' },
  { index: 6, name: '巳', animal: '蛇', element: '火', hidden: ['丙火', '庚金', '戊土'], month: '4月', direction: '东南', color: '#dc2626', feature: '大驿炊烟，暗藏金锋。金之长生，火土同宫。孟夏四月，阳气鼎盛。' },
  { index: 7, name: '午', animal: '马', element: '火', hidden: ['丁火', '己土'], month: '5月', direction: '正南', color: '#ef4444', feature: '炎天烈日，热情奔放。丁火禄地，己土得生。仲夏五月，骄阳似火。' },
  { index: 8, name: '未', animal: '羊', element: '干土', hidden: ['己土', '乙木', '丁火'], month: '6月', direction: '西南', color: '#a16207', feature: '花园暖土，木火交辉。木库所在，丁火得余。季夏六月，湿热熏蒸。' },
  { index: 9, name: '申', animal: '猴', element: '金', hidden: ['庚金', '壬水', '戊土'], month: '7月', direction: '西南', color: '#6b7280', feature: '名都剑气，水之长生。金白水清，聪明过人。孟秋七月，金气始肃。' },
  { index: 10, name: '酉', animal: '鸡', element: '金', hidden: ['辛金'], month: '8月', direction: '正西', color: '#9ca3af', feature: '寺钟金鸣，声闻九天。纯金纯粹，文章盖世。仲秋八月，金气鼎盛。' },
  { index: 11, name: '戌', animal: '狗', element: '干土', hidden: ['戊土', '辛金', '丁火'], month: '9月', direction: '西北', color: '#57534e', feature: '烧原烈火，火库所在。丁火余气，辛金得藏。季秋九月，寒气渐生。' },
  { index: 12, name: '亥', animal: '猪', element: '水', hidden: ['壬水', '甲木'], month: '10月', direction: '西北', color: '#3b82f6', feature: '登明天河，木之长生。水绕山环，灵气充盈。孟冬十月，阴气鼎盛。' },
]

const SHI_SHEN = [
  { name: '正官', polarity: '异阴阳', relation: '克我', feature: '官职名誉，责任担当。女命夫星，男命子星。正直端方，循规蹈矩。', effect: 80, color: '#8b5cf6', nature: '约束修身' },
  { name: '七杀', polarity: '同阴阳', relation: '克我', feature: '权威魄力，冒险进取。偏官无情，小人侵害。刚猛果断，不屈不挠。', effect: 75, color: '#dc2626', nature: '威压竞争' },
  { name: '正印', polarity: '异阴阳', relation: '生我', feature: '学业文凭，长辈助力。母性慈悲，包容爱护。学识渊博，品德高尚。', effect: 90, color: '#22c55e', nature: '滋养培育' },
  { name: '偏印', polarity: '同阴阳', relation: '生我', feature: '玄学天赋，旁门左道。枭神夺食，孤独多疑。思维奇特，创造力强。', effect: 65, color: '#059669', nature: '奇思异想' },
  { name: '比肩', polarity: '同阴阳', relation: '同我', feature: '朋友同辈，竞争合作。手足相助，分财夺利。独立自主，自尊心强。', effect: 70, color: '#3b82f6', nature: '平等竞争' },
  { name: '劫财', polarity: '异阴阳', relation: '同我', feature: '异性朋友，合伙分财。败财夺妻，慷慨豪爽。重义轻财，人缘极佳。', effect: 60, color: '#0ea5e9', nature: '互助分享' },
  { name: '食神', polarity: '同阴阳', relation: '我生', feature: '福禄寿元，口福享受。子息后代，聪明智慧。才华横溢，乐观开朗。', effect: 85, color: '#f59e0b', nature: '创造表达' },
  { name: '伤官', polarity: '异阴阳', relation: '我生', feature: '才华智慧，艺术天赋。克官伤夫，恃才傲物。创意无限，突破传统。', effect: 75, color: '#ea580c', nature: '反叛革新' },
  { name: '正财', polarity: '异阴阳', relation: '我克', feature: '正业财富，工资稳定。男命妻星，物质基础。勤俭持家，踏实可靠。', effect: 88, color: '#a855f7', nature: '正当收获' },
  { name: '偏财', polarity: '同阴阳', relation: '我克', feature: '意外之财，投机所得。父缘异性，商业头脑。灵活多变，追求自由。', effect: 82, color: '#c026d3', nature: '机缘收获' },
]

const LIU_QIN = [
  { name: '祖上', position: '年柱', relation: '祖辈荫德', feature: '根基所在，遗传禀赋。年为根，看出身门第，祖宗福德。', importance: 70 },
  { name: '父母', position: '年柱月柱', relation: '养育之恩', feature: '印星为母，财星为父。看亲情厚薄，家庭助力。', importance: 85 },
  { name: '兄弟', position: '月柱比肩', relation: '手足之情', feature: '比劫为兄弟姊妹，看分财分福，互助竞争。', importance: 65 },
  { name: '配偶', position: '日柱夫妻宫', relation: '婚姻缘分', feature: '日支为配偶宫，男财女官。看婚姻质量，夫妻缘分。', importance: 95 },
  { name: '子女', position: '时柱食伤', relation: '后代传承', feature: '食伤为子息，时为归宿。看晚运如何，子孙贤愚。', importance: 90 },
  { name: '朋友', position: '比劫分布', relation: '社会交往', feature: '比劫为朋友同事，看人际关系，事业助力。', importance: 75 },
]

const DA_YUN_STAGES = [
  { stage: '幼年运', age: '0-15岁', feature: '童蒙养正，启蒙教育', importance: 60 },
  { stage: '少年运', age: '15-30岁', feature: '求学立业，成家立命', importance: 85 },
  { stage: '中年运', age: '30-45岁', feature: '事业巅峰，承担责任', importance: 95 },
  { stage: '晚运', age: '45-60岁', feature: '守成保业，颐养天年', importance: 80 },
  { stage: '暮年运', age: '60岁+', feature: '退休养老，功过评说', importance: 70 },
]

const GE_JU = [
  { name: '正官格', level: '上格', feature: '月令正官，清纯粹正。官星得用，仕途顺遂。', difficulty: 60, fame: 85, requirement: '月令官星无破' },
  { name: '七杀格', level: '上格', feature: '月令七杀，制化为权。杀印相生，威权显赫。', difficulty: 80, fame: 90, requirement: '有制化方为贵' },
  { name: '正印格', level: '上格', feature: '月令正印，文星照命。印绶护身，学识过人。', difficulty: 50, fame: 75, requirement: '印星通根得气' },
  { name: '财格', level: '上格', feature: '月令财星，财富丰隆。财官相生，富贵双全。', difficulty: 55, fame: 80, requirement: '身强能任财' },
  { name: '食神格', level: '中格', feature: '月令食神，福禄寿全。食神生财，富贵自天来。', difficulty: 45, fame: 70, requirement: '食神不破枭' },
  { name: '伤官格', level: '中格', feature: '月令伤官，才华横溢。伤官配印，名扬天下。', difficulty: 70, fame: 85, requirement: '配印生财为美' },
  { name: '建禄格', level: '中格', feature: '月令建禄，身强无疑。禄马同乡，富贵非凡。', difficulty: 65, fame: 75, requirement: '有财官方为贵' },
  { name: '羊刃格', level: '破格', feature: '月令羊刃，刚猛过甚。刃杀两停，武将功名。', difficulty: 90, fame: 88, requirement: '制杀为上' },
  { name: '从强格', level: '外格', feature: '一气专旺，从势而行。格真局正，大富大贵。', difficulty: 95, fame: 95, requirement: '满局生扶无克' },
  { name: '从弱格', level: '外格', feature: '弃命从弱，顺势而为。从财从官，皆是贵格。', difficulty: 92, fame: 92, requirement: '无生扶方真' },
]

export default function BaziPage() {
  const [selectedGan, setSelectedGan] = useState<number | null>(null)
  const [selectedZhi, setSelectedZhi] = useState<number | null>(null)

  return (
    <SubPageTemplate
      title="四柱八字"
      subtitle="天干地支 · 五行生克 · 六亲十神 · 命格穷通"
      icon="📜"
      colorRgb="168, 85, 247"
    >
      <SubPageSection title="命理学概要">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            夫命者，禀五行之气质，受天地之精灵。年月日时，四柱八字，定终身之荣枯，决一世之穷通。
            天干主动，地支主静，天干显于外，地支藏于内。八字如天平，五行之轻重在此权衡。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            旺者宜泄，衰者宜扶，中和为贵。偏枯非吉，过犹不及。
            知命然后能改运，修德然后能立命。天定胜人，人定亦能胜天。
          </p>
        </InfoCard>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          {[
            { title: '年柱', subtitle: '祖宗根基', icon: '🌳', desc: '祖上荫德' },
            { title: '月柱', subtitle: '父母兄弟', icon: '👨‍👩‍👧', desc: '家庭事业' },
            { title: '日柱', subtitle: '自己配偶', icon: '💑', desc: '核心命宫' },
            { title: '时柱', subtitle: '子息晚年', icon: '🌅', desc: '最终归宿' },
          ].map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -3 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{pillar.icon}</div>
              <h3 style={{ color: '#b89438', fontSize: '1.1rem' }}>{pillar.title}</h3>
              <p style={{ color: 'rgba(168, 85, 247, 0.6)', fontSize: '0.8rem' }}>{pillar.subtitle}</p>
              <p style={{ color: 'rgba(180, 180, 190, 0.6)', fontSize: '0.75rem', marginTop: '0.5rem' }}>{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="十天干">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
          {TIAN_GAN.map((gan, index) => (
            <motion.div
              key={gan.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedGan(selectedGan === gan.index ? null : gan.index)}
              style={{
                borderColor: selectedGan === gan.index ? gan.color : 'transparent',
                boxShadow: selectedGan === gan.index ? `0 0 20px ${gan.color}40` : 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: gan.color,
                textAlign: 'center',
                marginBottom: '0.5rem',
                textShadow: `0 0 20px ${gan.color}`,
              }}>
                {gan.name}
              </div>
              <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: gan.color, fontSize: '0.85rem' }}>{gan.element}</span>
                <span style={{ color: 'rgba(180, 180, 190, 0.5)', fontSize: '0.75rem', marginLeft: '0.5rem' }}>{gan.nature}</span>
              </div>
              <ProgressBar value={gan.strength} color={gan.color} label={gan.polarity} height={6} />
              {selectedGan === gan.index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{
                    marginTop: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(180, 180, 190, 0.8)',
                    fontSize: '0.8rem',
                    lineHeight: 1.6,
                  }}
                >
                  {gan.feature}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="十二地支">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
          {DI_ZHI.map((zhi, index) => (
            <motion.div
              key={zhi.name}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedZhi(selectedZhi === zhi.index ? null : zhi.index)}
              style={{
                borderColor: selectedZhi === zhi.index ? zhi.color : 'transparent',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: zhi.color }}>{zhi.name}</span>
                <span style={{ fontSize: '1.5rem' }}>{zhi.animal}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)', marginBottom: '0.5rem' }}>
                {zhi.month} · {zhi.direction} · {zhi.element}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.5rem' }}>
                {zhi.hidden.map((h, i) => (
                  <span key={i} style={{
                    fontSize: '0.7rem',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '4px',
                    background: 'rgba(168, 85, 247, 0.2)',
                    color: '#a855f7',
                  }}>
                    {h}
                  </span>
                ))}
              </div>
              {selectedZhi === zhi.index && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    paddingTop: '0.5rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(180, 180, 190, 0.8)',
                    fontSize: '0.75rem',
                    lineHeight: 1.6,
                  }}
                >
                  {zhi.feature}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="五行本性与生克">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {ELEMENTS.map((element, index) => (
            <motion.div
              key={element.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <div style={{
                fontSize: '2rem',
                color: element.color,
                fontWeight: 'bold',
                marginBottom: '0.5rem',
              }}>
                {element.name}
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'rgba(154, 123, 41, 0.5)', marginBottom: '0.75rem' }}>
                <span>{element.season}季</span>
                <span>·</span>
                <span>{element.direction}方</span>
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                marginBottom: '0.75rem',
              }}>
                {element.desc}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)',
                fontSize: '0.75rem',
              }}>
                <span style={{ color: '#22c55e' }}>生→{element.woSheng}</span>
                <span style={{ color: '#ef4444' }}>克→{element.woKe}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="十神详解">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
          {SHI_SHEN.map((shen, index) => (
            <motion.div
              key={shen.name}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
            >
              <div style={{
                textAlign: 'center',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: shen.color,
                marginBottom: '0.5rem',
              }}>
                {shen.name}
              </div>
              <div style={{
                textAlign: 'center',
                fontSize: '0.75rem',
                color: 'rgba(180, 180, 190, 0.5)',
                marginBottom: '0.5rem',
              }}>
                {shen.relation} · {shen.polarity}
              </div>
              <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  background: `${shen.color}20`,
                  color: shen.color,
                }}>
                  {shen.nature}
                </span>
              </div>
              <ProgressBar value={shen.effect} color={shen.color} height={5} />
              <p style={{
                marginTop: '0.75rem',
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.75rem',
                lineHeight: 1.6,
              }}>
                {shen.feature}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="格局分类">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
          {GE_JU.map((ge, index) => (
            <motion.div
              key={ge.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#b89438' }}>{ge.name}</span>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '12px',
                  background: ge.level === '上格' ? 'rgba(34, 197, 94, 0.2)' : ge.level === '中格' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: ge.level === '上格' ? '#22c55e' : ge.level === '中格' ? '#f59e0b' : '#ef4444',
                }}>
                  {ge.level}
                </span>
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                marginBottom: '0.75rem',
              }}>
                {ge.feature}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.7rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'rgba(168, 85, 247, 0.6)' }}>成名: {ge.fame}%</span>
                <span style={{ color: 'rgba(239, 68, 68, 0.6)' }}>难度: {ge.difficulty}%</span>
              </div>
              <p style={{
                fontSize: '0.7rem',
                color: 'rgba(180, 180, 190, 0.5)',
                padding: '0.5rem',
                borderRadius: '6px',
                background: 'rgba(0,0,0,0.2)',
              }}>
                ✅ {ge.requirement}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="六亲与大运">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          <div>
            <h3 style={{ color: '#b89438', marginBottom: '1rem', fontSize: '1.1rem' }}>六亲定位</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {LIU_QIN.map((qin, index) => (
                <motion.div
                  key={qin.name}
                  className="xian-submodule-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{ padding: '0.75rem 1rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ color: '#a855f7', fontWeight: 'bold' }}>{qin.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)' }}>{qin.position}</span>
                  </div>
                  <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.8rem' }}>{qin.feature}</p>
                  <ProgressBar value={qin.importance} color="#a855f7" height={4} label={qin.relation} />
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ color: '#b89438', marginBottom: '1rem', fontSize: '1.1rem' }}>大运阶段</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {DA_YUN_STAGES.map((yun, index) => (
                <motion.div
                  key={yun.stage}
                  className="xian-submodule-card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{ padding: '0.75rem 1rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{yun.stage}</span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)' }}>{yun.age}</span>
                  </div>
                  <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.8rem' }}>{yun.feature}</p>
                  <ProgressBar value={yun.importance} color="#22c55e" height={4} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SubPageSection>

      <SubPageSection title="论命心法要诀">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
          {[
            { title: '日主强弱', desc: '先定日主，次看月令。得时为旺，得地为强，得势为盛。失时者弱，失地者虚。身强能任财官，身弱宜扶宜助。' },
            { title: '用神格局', desc: '月令用神，格局之基。官印财食，顺用为美；杀伤枭刃，逆用为奇。用神不可损伤，病药最为关键。' },
            { title: '大运流转', desc: '命局如舟，大运如水。十年一步运，五年一换境。顺逆之间，荣枯立见。运助用神则吉，运助忌神则凶。' },
            { title: '神煞辅助', desc: '贵人禄马，吉星照命；空亡劫煞，凶曜临身。神煞为辅，格局为主。不可舍本逐末，妄谈吉凶。' },
            { title: '穷通寿夭', desc: '格局定贵贱，运限定荣枯。一字之差，千里之别。有病方为贵，无伤不是奇。格中如去病，财禄两相随。' },
            { title: '改命之法', desc: '一命二运三风水，四积阴德五读书。天命虽定，人定胜天。行善积德，改变气场，命运自会悄然改变。' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{ color: '#b89438', marginBottom: '0.75rem' }}>
                ✦ {item.title}
              </h3>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                lineHeight: 1.7,
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
