'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

const LUOPAN_HISTORY = [
  { era: '先秦', form: '司南', material: '天然磁石', feature: '勺形，置于地盘，投之于地，其柢指南' },
  { era: '汉代', form: '六壬式盘', material: '栻盘', feature: '天盘地盘，十二月将，二十八宿，八干四维' },
  { era: '唐代', form: '水罗盘', material: '磁化铁针', feature: '浮于水面，磁针指南，用于航海' },
  { era: '宋代', form: '旱罗盘', material: '支轴旋转', feature: '沈括《梦溪笔谈》记载，指甲旋定法，碗唇旋定法' },
  { era: '元代', form: '罗盘针', material: '铜盘', feature: '二十四山向确立，用于航海和相地' },
  { era: '明清', form: '综合罗经', material: '桃木底座铜盘面', feature: '数十圈层，三合三元天星，集大成' },
]

const THREE_NEEDLES = [
  {
    name: '地盘正针',
    usage: '格龙立向',
    purpose: '定二十四山坐向',
    principle: '子午正对，地磁南北',
    detail: '地盘为体，正针为用。子午卯酉正对指南针，地磁南北极。立向定坐山，此为罗经之根本。杨公风水专用。',
    invented: '杨筠松',
    accuracy: 100,
  },
  {
    name: '人盘中针',
    usage: '拨砂消砂',
    purpose: '消纳山砂',
    principle: '子位偏壬，逆前半格',
    detail: '人盘为用，中针为砂。其子位在地盘壬子之间，较地盘逆差半格。专论山峰砂头之吉凶。赖布衣传。',
    invented: '赖布衣',
    accuracy: 95,
  },
  {
    name: '天盘缝针',
    usage: '纳水立向',
    purpose: '收纳水法',
    principle: '子位偏癸，顺后半格',
    detail: '天盘为用，缝针为水。其子位在地盘子癸之间，较地盘顺差半格。专论水口去来之吉凶。',
    invented: '杨筠松',
    accuracy: 98,
  },
]

const LUOPAN_LAYERS = [
  {
    name: '天池',
    layer: '中心',
    detail: '指南针所在，定南北方位，罗经之灵魂。海底印有红线，与子午线对齐。一动一静之间，天地造化存焉。',
    note: '针定而神凝，万化由此出',
    importance: 100,
  },
  {
    name: '先天八卦',
    layer: '第一层',
    detail: '乾坤坎离震艮巽兑，伏羲八卦。天地定位，山泽通气，雷风相薄，水火不相射。体也。',
    note: '对待之位，天造地设',
    importance: 95,
  },
  {
    name: '后天八卦',
    layer: '第二层',
    detail: '坎离震兑分掌四正，乾巽艮坤分掌四维。文王八卦，人用之位。用也。',
    note: '流行之气，循环无端',
    importance: 95,
  },
  {
    name: '八煞黄泉',
    layer: '第三层',
    detail: '坎龙坤兔震山猴，巽鸡乾马兑蛇头，艮虎离猪为煞曜，宅墓逢之一时休。坐山煞也。',
    note: '坐山忌，犯之大凶',
    importance: 90,
  },
  {
    name: '二十四山',
    layer: '地盘正针',
    detail: '八干四维十二支，每山十五度，共计三百六十度。子午卯酉为四正，乾坤艮巽为四维。',
    note: '立向之根本，吉凶由此分',
    importance: 100,
  },
  {
    name: '挨星',
    layer: '人盘中针',
    detail: '内盘天盘，外盘地盘。中针人盘，专论天星挨加。消砂之法，全在于是。',
    note: '消砂要诀，生旺奴煞泄',
    importance: 92,
  },
  {
    name: '一百二十分金',
    layer: '地盘',
    detail: '每山五分，每分三度。分金差一线，富贵不相见。乘气纳脉，差若毫厘，谬以千里。',
    note: '穿山七十二龙用此',
    importance: 98,
  },
  {
    name: '七十二龙',
    layer: '中针',
    detail: '纳音五行，穿山透地。寻龙点穴之要，格龙乘气之法。龙地气脉，贵贱在此分。',
    note: '格龙乘气，寻龙第一义',
    importance: 96,
  },
  {
    name: '透地六十龙',
    layer: '中针',
    detail: '平冈行龙，入首乘气。每支十分，管三分之一度。穴中气脉，由此而真。',
    note: '点穴乘气，生死关头',
    importance: 94,
  },
  {
    name: '二十八宿',
    layer: '天盘缝针',
    detail: '天星度数，消砂纳水，天盘缝针论向。角亢氐房心尾箕，斗牛女虚危室壁。',
    note: '天星对应，吉凶速应',
    importance: 88,
  },
  {
    name: '三百六十五度',
    layer: '最外层',
    detail: '周天度数，分金宿度，厘定坐向分数。太微垣，天市垣，紫微垣，在天成象，在地成形。',
    note: '精确分金，不差分毫',
    importance: 90,
  },
]

const TWENTY_FOUR = [
  {
    mountain: '壬',
    direction: '北北西',
    degree: '337.5° - 352.5°',
    wuxing: '水',
    auspicious: ['子', '申', '辰'],
    avoid: ['午', '寅', '巳'],
    note: '阳水，天一生水',
  },
  {
    mountain: '子',
    direction: '正北',
    degree: '352.5° - 7.5°',
    wuxing: '水',
    auspicious: ['申', '辰', '亥'],
    avoid: ['午', '未', '卯'],
    note: '正北，坎卦，天子之位',
  },
  {
    mountain: '癸',
    direction: '北东北',
    degree: '7.5° - 22.5°',
    wuxing: '水',
    auspicious: ['申', '子', '辰'],
    avoid: ['午', '戌', '酉'],
    note: '阴水，雨露之水',
  },
  {
    mountain: '丑',
    direction: '东北北',
    degree: '22.5° - 37.5°',
    wuxing: '土',
    auspicious: ['巳', '酉', '丑'],
    avoid: ['未', '辰', '戌'],
    note: '湿土，金库',
  },
  {
    mountain: '艮',
    direction: '东北',
    degree: '37.5° - 52.5°',
    wuxing: '土',
    auspicious: ['午', '戌'],
    avoid: ['坤', '申'],
    note: '四维，山，止也',
  },
  {
    mountain: '寅',
    direction: '东北东',
    degree: '52.5° - 67.5°',
    wuxing: '木',
    auspicious: ['午', '戌'],
    avoid: ['申', '巳', '辰'],
    note: '阳木，参天大树',
  },
  {
    mountain: '甲',
    direction: '东东北',
    degree: '67.5° - 82.5°',
    wuxing: '木',
    auspicious: ['亥', '卯', '未'],
    avoid: ['庚', '酉', '申'],
    note: '阳木，栋梁之材',
  },
  {
    mountain: '卯',
    direction: '正东',
    degree: '82.5° - 97.5°',
    wuxing: '木',
    auspicious: ['亥', '未'],
    avoid: ['酉', '辛', '午'],
    note: '正东，震卦，日出之地',
  },
  {
    mountain: '乙',
    direction: '东东南',
    degree: '97.5° - 112.5°',
    wuxing: '木',
    auspicious: ['亥', '卯', '未'],
    avoid: ['庚', '辛', '酉'],
    note: '阴木，花草之木',
  },
  {
    mountain: '辰',
    direction: '东南东',
    degree: '112.5° - 127.5°',
    wuxing: '土',
    auspicious: ['申', '子'],
    avoid: ['戌', '丑', '卯'],
    note: '湿土，水库',
  },
  {
    mountain: '巽',
    direction: '东南',
    degree: '127.5° - 142.5°',
    wuxing: '木',
    auspicious: ['乾', '亥'],
    avoid: ['乾', '戌'],
    note: '四维，风，入也',
  },
  {
    mountain: '巳',
    direction: '东南南',
    degree: '142.5° - 157.5°',
    wuxing: '火',
    auspicious: ['酉', '丑'],
    avoid: ['亥', '寅', '申'],
    note: '阴火，灯烛之火',
  },
  {
    mountain: '丙',
    direction: '南东南',
    degree: '157.5° - 172.5°',
    wuxing: '火',
    auspicious: ['寅', '午', '戌'],
    avoid: ['壬', '子', '癸'],
    note: '阳火，太阳之火',
  },
  {
    mountain: '午',
    direction: '正南',
    degree: '172.5° - 187.5°',
    wuxing: '火',
    auspicious: ['寅', '戌'],
    avoid: ['子', '壬', '丑'],
    note: '正南，离卦，向明而治',
  },
  {
    mountain: '丁',
    direction: '南西南',
    degree: '187.5° - 202.5°',
    wuxing: '火',
    auspicious: ['寅', '午', '戌'],
    avoid: ['癸', '壬', '子'],
    note: '阴火，灯烛星光',
  },
  {
    mountain: '未',
    direction: '西南南',
    degree: '202.5° - 217.5°',
    wuxing: '土',
    auspicious: ['亥', '卯'],
    avoid: ['丑', '子', '辰'],
    note: '干土，木库',
  },
  {
    mountain: '坤',
    direction: '西南',
    degree: '217.5° - 232.5°',
    wuxing: '土',
    auspicious: ['艮', '寅'],
    avoid: ['艮', '丑'],
    note: '四维，地，顺也',
  },
  {
    mountain: '申',
    direction: '西南西',
    degree: '232.5° - 247.5°',
    wuxing: '金',
    auspicious: ['子', '辰'],
    avoid: ['寅', '巳', '亥'],
    note: '阳金，刀剑之金',
  },
  {
    mountain: '庚',
    direction: '西西南',
    degree: '247.5° - 262.5°',
    wuxing: '金',
    auspicious: ['巳', '酉', '丑'],
    avoid: ['甲', '乙', '卯'],
    note: '阳金，五金之金',
  },
  {
    mountain: '酉',
    direction: '正西',
    degree: '262.5° - 277.5°',
    wuxing: '金',
    auspicious: ['巳', '丑'],
    avoid: ['卯', '甲', '午'],
    note: '正西，兑卦，月出之地',
  },
  {
    mountain: '辛',
    direction: '西西北',
    degree: '277.5° - 292.5°',
    wuxing: '金',
    auspicious: ['巳', '酉', '丑'],
    avoid: ['甲', '乙', '卯'],
    note: '阴金，首饰之金',
  },
  {
    mountain: '戌',
    direction: '西北西',
    degree: '292.5° - 307.5°',
    wuxing: '土',
    auspicious: ['寅', '午'],
    avoid: ['辰', '辰', '未'],
    note: '干土，火库',
  },
  {
    mountain: '乾',
    direction: '西北',
    degree: '307.5° - 322.5°',
    wuxing: '金',
    auspicious: ['巽', '巳'],
    avoid: ['巽', '辰'],
    note: '四维，天，健也',
  },
  {
    mountain: '亥',
    direction: '西北北',
    degree: '322.5° - 337.5°',
    wuxing: '水',
    auspicious: ['卯', '未'],
    avoid: ['巳', '申', '寅'],
    note: '阴水，天河之水',
  },
]

const USE_METHOD = [
  {
    step: '第一步：持罗经法',
    method: '双手平持罗经于胸前，手肘夹紧，罗经水平，与心齐高。静心息虑，神不外驰。',
    note: '心定则针定，心乱则针浮',
  },
  {
    step: '第二步：定中宫',
    method: '立宅则立于宅之天井中心，葬穴则立于穴场太极晕处。为全屋全穴之中心点。',
    note: '中宫差一寸，全盘皆差',
  },
  {
    step: '第三步：拉线定方',
    method: '持线绳过十字线，对准所测方位。拉绳要直，不可歪斜，不可松紧不匀。',
    note: '线正则方正，线歪则方斜',
  },
  {
    step: '第四步：看针定局',
    method: '待针定后，看红线与地盘二十四山对齐。是为坐山，是为朝向。',
    note: '子午一线，坐向分明',
  },
  {
    step: '第五步：消砂纳水',
    method: '用人盘中针看四周山峰，用天盘缝针看四周水口。定其生旺奴煞泄。',
    note: '消砂要高起，纳水要弯环',
  },
  {
    step: '第六步：分金乘气',
    method: '取一百二十分金，避大空亡，避小空亡，乘生旺之气。',
    note: '分金差一线，富贵不相见',
  },
]

const TABOOS = [
  { taboo: '虚惊煞', scene: '持针时针无故震动', level: '大忌', break: '有邪魔干扰，宜暂停，念金光神咒' },
  { taboo: '汰针', scene: '针半沉半浮，不指子午', level: '大忌', break: '此地有古墓骸骨，或有冤气' },
  { taboo: '沉针', scene: '针尖下沉，不上指', level: '凶', break: '此地阴气太重，不宜用' },
  { taboo: '浮针', scene: '针尖上浮，不下沉', level: '凶', break: '此地阳气太盛，煞气重' },
  { taboo: '转针', scene: '针旋转不休，不定', level: '大凶', break: '此地有怪异，速去勿留' },
  { taboo: '侧针', scene: '针斜指，不直指南北', level: '中', break: '此地气场不正，或有金属干扰' },
]

const FAMOUS_MASTERS = [
  {
    name: '杨筠松',
    dynasty: '唐末',
    contribution: '三合罗盘，地盘正针，天盘缝针',
    work: '《青囊奥语》《天玉经》',
    legend: '掌灵台地理事，黄巢破京城，断发入昆仑山步龙。后以术传于世，人称救贫先生。',
  },
  {
    name: '赖布衣',
    dynasty: '宋代',
    contribution: '人盘中针，天星消砂法',
    work: '《催官篇》《理气穴法》',
    legend: '宋徽宗国师，后弃官浪迹江湖，自称布衣子。所点之地，皆发富贵。传人盘消砂之法。',
  },
  {
    name: '廖均卿',
    dynasty: '明代',
    contribution: '十三陵卜择，皇家风水',
    work: '《葬经翼》《雪心赋正解》',
    legend: '永乐五年，为成祖卜天寿山陵。入朝，赐四品职。三僚廖氏，世代相传。',
  },
  {
    name: '蒋大鸿',
    dynasty: '明末清初',
    contribution: '三元玄空，挨星法',
    work: '《地理辨正》《天元五歌》',
    legend: '明亡后，杜门不出，注《地理辨正》，斥伪术，正源流。时人目为地仙。',
  },
]

export default function LuopanPage() {
  const [activeMountain, setActiveMountain] = useState<number | null>(null)

  return (
    <SubPageTemplate
      title="罗盘详解"
      subtitle="天池定针 · 八卦分野 · 二十四山 · 分金定位"
      icon="🧭"
      colorRgb="251, 146, 60"
    >
      <SubPageSection title="罗经本义">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            夫罗经者，天地之缩影也。包罗万象，经纬天地。内盘外方，天圆地方。
            以铜为体，以针定向，以分金度数，以八卦定方。数十圈层，层层有奥义。
            一层不知，即一层差错。立向差一度，祸福千里殊。可不慎欤？
            昔者圣人作易，仰观天文，俯察地理，近取诸身，远取诸物。
            罗经之作，其来尚矣。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            罗盘非仅指南针也。天垂象，圣人则之。在天成象，在地成形。
            二十八宿在天，二十四山在地。天人感应，其理则一。
            士君子操此术，当存济人之心，不可怀欺世之意。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="罗经演化史">
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'stretch' }}>
          {LUOPAN_HISTORY.map((item, index) => (
            <motion.div
              key={item.era}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ flex: 1 }}
            >
              <h3 style={{
                color: '#fb923c',
                fontSize: '1rem',
                marginBottom: '0.5rem',
                textAlign: 'center',
              }}>
                {item.era}
              </h3>
              <p style={{
                fontSize: '0.85rem',
                color: '#f59e0b',
                textAlign: 'center',
                marginBottom: '0.25rem',
              }}>
                {item.form}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(180, 180, 190, 0.6)',
                textAlign: 'center',
                marginBottom: '0.25rem',
              }}>
                材质：{item.material}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(180, 180, 190, 0.8)',
                lineHeight: 1.5,
              }}>
                {item.feature}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="三盘三针秘法">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {THREE_NEEDLES.map((needle, index) => (
            <motion.div
              key={needle.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#fb923c', fontSize: '1.15rem' }}>{needle.name}</h3>
                <span style={{
                  padding: '0.15rem 0.5rem',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  background: 'rgba(251, 146, 60, 0.2)',
                  color: '#fb923c',
                }}>
                  {needle.usage}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#f59e0b', marginBottom: '0.5rem' }}>
                功用：{needle.purpose}
              </p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.75)', marginBottom: '0.5rem' }}>
                原理：{needle.principle}
              </p>
              <p style={{
                fontSize: '0.8rem',
                color: 'rgba(180, 180, 190, 0.85)',
                lineHeight: 1.6,
                marginBottom: '0.5rem',
              }}>
                {needle.detail}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                  创制：{needle.invented}
                </span>
                <ProgressBar value={needle.accuracy} color="#fb923c" height={4} label="精密度" />
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="罗经十一层详解">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {LUOPAN_LAYERS.map((layer, index) => (
            <motion.div
              key={layer.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#fb923c', fontSize: '0.95rem' }}>{layer.name}</h3>
                <span style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                  {layer.layer}
                </span>
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.75rem',
                lineHeight: 1.6,
                marginBottom: '0.5rem',
              }}>
                {layer.detail}
              </p>
              <p style={{
                fontSize: '0.7rem',
                color: '#f59e0b',
                fontStyle: 'italic',
                padding: '0.25rem',
                borderRadius: '4px',
                background: 'rgba(245, 158, 11, 0.1)',
                marginBottom: '0.5rem',
              }}>
                💡 {layer.note}
              </p>
              <ProgressBar value={layer.importance} color="#fb923c" height={3} label="重要度" />
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="二十四山详解">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.75rem' }}>
          {TWENTY_FOUR.map((shan, index) => (
            <motion.div
              key={shan.mountain}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              onClick={() => setActiveMountain(activeMountain === index ? null : index)}
              style={{
                borderColor: activeMountain === index ? '#fb923c' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
                <h3 style={{
                  color: '#fb923c',
                  fontSize: '1.1rem',
                  display: 'inline-block',
                }}>
                  {shan.mountain}
                </h3>
                <span style={{
                  fontSize: '0.7rem',
                  marginLeft: '0.25rem',
                  padding: '0.05rem 0.3rem',
                  borderRadius: '8px',
                  background: shan.wuxing === '金' ? 'rgba(251, 191, 36, 0.2)' : shan.wuxing === '木' ? 'rgba(34, 197, 94, 0.2)' : shan.wuxing === '水' ? 'rgba(59, 130, 246, 0.2)' : shan.wuxing === '火' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(168, 162, 158, 0.3)',
                  color: shan.wuxing === '金' ? '#fbbf24' : shan.wuxing === '木' ? '#22c55e' : shan.wuxing === '水' ? '#3b82f6' : shan.wuxing === '火' ? '#ef4444' : '#a8a29e',
                }}>
                  {shan.wuxing}
                </span>
              </div>
              <p style={{
                fontSize: '0.65rem',
                color: 'rgba(180, 180, 190, 0.6)',
                textAlign: 'center',
              }}>
                {shan.direction} · {shan.degree}
              </p>
              {activeMountain === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{
                    marginTop: '0.5rem',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', justifyContent: 'center' }}>
                    {shan.auspicious.map((g, i) => (
                      <span key={i} style={{
                        fontSize: '0.6rem',
                        padding: '0.05rem 0.25rem',
                        borderRadius: '4px',
                        background: 'rgba(34, 197, 94, 0.2)',
                        color: '#22c55e',
                      }}>✓{g}</span>
                    ))}
                  </div>
                  <p style={{
                    fontSize: '0.65rem',
                    color: 'rgba(180, 180, 190, 0.8)',
                    marginTop: '0.3rem',
                    textAlign: 'center',
                  }}>
                    {shan.note}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="用罗经六步法">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {USE_METHOD.map((step, index) => (
            <motion.div
              key={step.step}
              className="xian-submodule-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{
                color: '#fb923c',
                fontSize: '1rem',
                marginBottom: '0.5rem',
              }}>
                📌 {step.step}
              </h3>
              <p style={{
                color: 'rgba(180, 180, 190, 0.85)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                marginBottom: '0.5rem',
              }}>
                {step.method}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: '#f59e0b',
                padding: '0.3rem',
                borderRadius: '4px',
                background: 'rgba(245, 158, 11, 0.1)',
                fontStyle: 'italic',
              }}>
                💡 {step.note}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="用针六大禁忌">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {TABOOS.map((t, index) => (
            <motion.div
              key={t.taboo}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#ef4444', fontSize: '0.95rem' }}>
                  ⚠️ {t.taboo}
                </h3>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '8px',
                  background: t.level === '大忌' || t.level === '大凶' ? 'rgba(239, 68, 68, 0.3)' : t.level === '凶' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                  color: t.level === '大忌' || t.level === '大凶' || t.level === '凶' ? '#ef4444' : '#f59e0b',
                }}>
                  {t.level}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.8)', marginBottom: '0.3rem' }}>
                征兆：{t.scene}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#22c55e' }}>
                化解：{t.break}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="罗经四大宗师">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {FAMOUS_MASTERS.map((master, index) => (
            <motion.div
              key={master.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#fb923c' }}>{master.name}</h3>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'rgba(180, 180, 190, 0.5)',
                }}>
                  {master.dynasty}
                </span>
              </div>
              <p style={{
                fontSize: '0.8rem',
                color: '#f59e0b',
                marginBottom: '0.3rem',
              }}>
                贡献：{master.contribution}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(180, 180, 190, 0.6)',
                marginBottom: '0.5rem',
              }}>
                著作：{master.work}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.75rem',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}>
                "{master.legend}"
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
