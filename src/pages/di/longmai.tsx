'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

const THREE_DRAGONS = [
  {
    name: '北干龙',
    range: '阴山 - 太行山 - 燕山',
    coverage: '蒙古、河北、北京、辽宁、吉林、黑龙江',
    major: '北京为尽结',
    feature: '气势雄浑，骨干挺拔，如万马奔腾',
    quality: '帝王之气',
    cities: ['北京', '天津', '沈阳', '太原'],
    power: 98,
  },
  {
    name: '中干龙',
    range: '秦岭 - 华山 - 嵩山 - 泰山',
    coverage: '陕西、河南、山东、山西南部、湖北北部',
    major: '洛阳、开封为大结',
    feature: '中正平和，龙气浑厚，华夏文明之根',
    quality: '中原王气',
    cities: ['西安', '洛阳', '开封', '济南'],
    power: 95,
  },
  {
    name: '南干龙',
    range: '岷山 - 大巴山 - 大别山 - 黄山 - 武夷山',
    coverage: '四川、重庆、湖南、江西、安徽、浙江、福建、广东',
    major: '南京、杭州、广州',
    feature: '灵秀多姿，文采风流，富贵长久',
    quality: '江南秀气',
    cities: ['南京', '杭州', '广州', '福州'],
    power: 92,
  },
]

const DRAGON_NINE_TYPES = [
  {
    name: '回龙',
    pattern: '翻身顾祖，回顾巢穴',
    image: '如犬回头，如蛇翘尾',
    grade: '上品',
    example: '明十三陵天寿山',
    effect: '多出异路功名，忠孝传家',
    power: 90,
    note: '顾祖多情，福气悠久',
  },
  {
    name: '出洋龙',
    pattern: '奔腾出海，直入平洋',
    image: '如龙飞九天，千里之势',
    grade: '极品',
    example: '上海长江口',
    effect: '大富大贵，威名远播',
    power: 98,
    note: '千里来龙，尽结于此',
  },
  {
    name: '降龙',
    pattern: '自高而下，层叠而降',
    image: '如瀑布飞流，节节败退',
    grade: '中上品',
    example: '峨眉山麓',
    effect: '循序而进，晚运荣华',
    power: 82,
    note: '愈下愈佳，后福无量',
  },
  {
    name: '生龙',
    pattern: '起伏顿跌，生动活泼',
    image: '如蛟蛇走窜，灵活多变',
    grade: '上品',
    example: '黄山山脉',
    effect: '聪明智慧，技艺超群',
    power: 88,
    note: '生气盎然，多出奇才',
  },
  {
    name: '飞龙',
    pattern: '双翼开张，展翅欲飞',
    image: '如大鹏展翅，鹏程万里',
    grade: '极品',
    example: '北京燕山',
    effect: '王侯将相，位极人臣',
    power: 100,
    note: '帝王龙脉，天下独尊',
  },
  {
    name: '卧龙',
    pattern: '盘踞一方，隐而不发',
    image: '如猛虎伏地，蓄势待发',
    grade: '中品',
    example: '南阳卧龙岗',
    effect: '隐士高人，潜龙勿用',
    power: 75,
    note: '大器晚成，厚积薄发',
  },
  {
    name: '隐龙',
    pattern: '平洋寻龙，隐而不见',
    image: '高一寸为山，低一寸为水',
    grade: '奇品',
    example: '江南水乡',
    effect: '水乡富贵，不露锋芒',
    power: 80,
    note: '平洋一突胜千峰',
  },
  {
    name: '腾龙',
    pattern: '突起高峰，拔地而起',
    image: '如天柱独立，孤峰独秀',
    grade: '中上品',
    example: '华山',
    effect: '武贵兵权，独当一面',
    power: 85,
    note: '虽贵但孤，宜有砂护',
  },
  {
    name: '群龙',
    pattern: '万峰朝宗，群龙聚会',
    image: '如百官朝见，众星拱月',
    grade: '极品',
    example: '昆仑山',
    effect: '开国立业，子孙绵延',
    power: 100,
    note: '万山之祖，龙脉之源',
  },
]

const TRUE_DRAGON = [
  { stage: '太祖山', importance: 90, feature: '龙脉起源，高大耸拔，万山之祖' },
  { stage: '少祖山', importance: 95, feature: '离穴近祖，起峰秀丽，龙气凝聚' },
  { stage: '父母山', importance: 98, feature: '穴山后靠，胎息孕育，直接融结' },
  { stage: '过峡', importance: 100, feature: '两山束气，真龙过脉，细而有力' },
  { stage: '束气', importance: 95, feature: '龙脉收束，聚气入穴，如人呼吸' },
  { stage: '开帐', importance: 85, feature: '龙脉展开，如伞如盖，护砂重重' },
  { stage: '剥换', importance: 90, feature: '老龙剥嫩，粗恶变秀，脱胎换骨' },
  { stage: '入首', importance: 100, feature: '龙脉到头，临穴一节，生死攸关' },
]

const FOUR_GUARDS = [
  {
    name: '青龙',
    position: '左方',
    req: '蜿蜒起伏，高耸环抱，过堂逆水',
    avoid: '低陷、断折、反背、高压',
    effect: '长房发达，男丁兴旺',
    quality: 90,
    tip: '青龙高于白虎，长房不受苦',
  },
  {
    name: '白虎',
    position: '右方',
    req: '驯頫低头，回顾穴场，不可昂头',
    avoid: '高昂、张牙、直射、带煞',
    effect: '小房富贵，女眷贤良',
    quality: 85,
    tip: '宁愿青龙高万丈，不可白虎抬头望',
  },
  {
    name: '朱雀',
    position: '前方',
    req: '翔舞平正，朝山秀美，明堂开阔',
    avoid: '崩塌、破碎、直冲、闭塞',
    effect: '明堂聚气，财源广进',
    quality: 95,
    tip: '朱雀翔舞，贵人接引',
  },
  {
    name: '玄武',
    position: '后方',
    req: '垂头落脉，靠山稳重，层层高起',
    avoid: '空陷、陡峻、崩裂、无靠',
    effect: '人丁绵远，根基牢固',
    quality: 100,
    tip: '玄武垂头，坐实可靠',
  },
]

const XUE_FOUR = [
  {
    type: '窝穴',
    form: '凹形',
    feature: '形如鸡窝，掌心凹陷，四周高起',
    variation: ['深窝', '浅窝', '阔窝', '狭窝'],
    key: '窝中要有突，凹里要生凸',
    suitable: '平地、缓坡',
    famous: '孔子墓 - 马鬣封',
  },
  {
    type: '钳穴',
    form: '叉形',
    feature: '两股开钳，中垂微乳，如人叉手',
    variation: ['直钳', '曲钳', '长钳', '短钳'],
    key: '钳中要藏聚，界水要分明',
    suitable: '山岗、丘陵',
    famous: '明孝陵 - 紫金山',
  },
  {
    type: '乳穴',
    form: '凸形',
    feature: '垂肌吐乳，如人乳头，界水合襟',
    variation: ['长乳', '短乳', '大乳', '小乳'],
    key: '乳头要圆正，界水要清晰',
    suitable: '山腰、山麓',
    famous: '岳王坟 - 栖霞岭',
  },
  {
    type: '突穴',
    form: '泡形',
    feature: '平地起突，如泡如球，周围平坦',
    variation: ['大突', '小突', '方突', '圆突'],
    key: '突面要平正，水绕要四维',
    suitable: '平洋、平地',
    famous: '黄帝陵 - 桥山',
  },
]

const FAMOUS_DRAGONS = [
  {
    name: '昆仑山',
    level: '万山之祖',
    range: '帕米尔高原',
    legend: '河源出昆仑，为天下龙脉之祖。黄帝之所都，西王母之所居。中干北干南干，皆从此发源。',
    effect: '中华文明发源地',
    rank: 'S级龙脉',
  },
  {
    name: '秦岭',
    level: '中国龙脉之脊',
    range: '陕西南部',
    legend: '秦岭为中国之中龙，分南北，界阴阳。周秦汉唐，十三朝古都，皆在秦岭怀抱之中。',
    effect: '十三朝王气所钟',
    rank: 'S级龙脉',
  },
  {
    name: '燕山',
    level: '北干尽结',
    range: '北京北部',
    legend: '燕山为北干龙之尽，太行为白虎，渤海为朱雀。北京之为帝都，燕山之力也。元明清至今。',
    effect: '帝王之都八百年',
    rank: 'S级龙脉',
  },
  {
    name: '紫金山',
    level: '南干奇结',
    range: '南京东郊',
    legend: '诸葛亮曰：钟山龙蟠，石城虎踞，真帝王之宅。孙吴、东晋、宋齐梁陈、明初、民国，十朝都会。',
    effect: '十朝都会王气',
    rank: 'A级龙脉',
  },
  {
    name: '骊山',
    level: '中干异结',
    range: '西安临潼',
    legend: '骊山为秦岭余脉，如骏骊奔跃。秦始皇陵葬此，唐玄宗华清池在此。见证周秦汉唐之盛。',
    effect: '见证中华盛世',
    rank: 'A级龙脉',
  },
  {
    name: '天寿山',
    level: '回龙顾祖',
    range: '北京昌平',
    legend: '廖均卿为永乐卜此。群山环抱，如回龙顾祖。十三帝葬此，明朝二百余年天下。',
    effect: '明朝皇陵所在',
    rank: 'A级龙脉',
  },
]

const GHOSTS = [
  { symptom: '有龙无穴', flaw: '龙脉虽好，到头无融结', result: '虚花假地，枉费心机', level: '致命' },
  { symptom: '有穴无龙', flaw: '小穴精美，后龙无力', result: '发福不久，一代而衰', level: '严重' },
  { symptom: '龙真穴假', flaw: '龙是真龙，点穴偏移', result: '差之毫厘，谬以千里', level: '致命' },
  { symptom: '穴真龙假', flaw: '穴场精美，龙气不至', result: '好看不中用，发福微薄', level: '严重' },
  { symptom: '砂飞水走', flaw: '砂不抱，水不聚', result: '人财两散，流离失所', level: '致命' },
  { symptom: '堂气倾泄', flaw: '明堂倾泻，水口不关', result: '财来财去，毫无蓄积', level: '严重' },
  { symptom: '四神不全', flaw: '青龙断，白虎缺', result: '房分不均，各房退败', level: '中等' },
  { symptom: '坐向不当', flaw: '消纳差错，出卦兼向', result: '吉地变凶，祸福相反', level: '严重' },
]

export default function LongmaiPage() {
  const [activeType, setActiveType] = useState<number | null>(null)

  return (
    <SubPageTemplate
      title="寻龙点穴"
      subtitle="昆仑发脉 · 三龙入中国 · 千里来龙 · 此处结穴"
      icon="🐉"
      colorRgb="59, 130, 246"
    >
      <SubPageSection title="龙脉本义">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            夫龙者，山之脉也。其来有祖，其行有踪，其止有穴。始祖于昆仑，分三龙而入中国。
            北龙结燕云，中龙开河洛，南龙兴吴越。犹人身之有经络，树木之有根本。
            地脉之行止，即气运之盛衰。三年寻龙，十年点穴，得其要者片言可悟，不得其诀万卷茫然。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            龙犹行也，脉犹动也。气随脉行，脉止气聚。千里来龙，但看到头一截。
            入山寻水口，登穴看明堂。砂关水锁，真气融结。是谓真龙真穴。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="中国三大干龙">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {THREE_DRAGONS.map((dragon, index) => (
            <motion.div
              key={dragon.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5, scale: 1.01 }}
            >
              <h3 style={{ color: '#3b82f6', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                🐉 {dragon.name}
              </h3>
              <p style={{ color: '#f59e0b', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                山脉：{dragon.range}
              </p>
              <p style={{ color: 'rgba(180, 180, 190, 0.8)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                覆盖：{dragon.coverage}
              </p>
              <p style={{ color: 'rgba(180, 180, 190, 0.75)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                特征：{dragon.feature}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.5rem' }}>
                {dragon.cities.map((c, i) => (
                  <span key={i} style={{
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '10px',
                    background: 'rgba(59, 130, 246, 0.2)',
                    color: '#3b82f6',
                  }}>{c}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  background: 'rgba(59, 130, 246, 0.25)',
                  color: '#3b82f6',
                }}>{dragon.quality}</span>
                <ProgressBar value={dragon.power} color="#3b82f6" height={4} label="龙气" />
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="龙格九品">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {DRAGON_NINE_TYPES.map((type, index) => (
            <motion.div
              key={type.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setActiveType(activeType === index ? null : index)}
              style={{
                borderColor: activeType === index ? '#3b82f6' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#3b82f6', fontSize: '1rem' }}>{type.name}</h3>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '8px',
                  background: type.grade === '极品' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.15)',
                  color: '#3b82f6',
                }}>{type.grade}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#f59e0b', marginBottom: '0.25rem' }}>
                格局：{type.pattern}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)', marginBottom: '0.5rem' }}>
                形像：{type.image}
              </p>
              {activeType === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{
                    paddingTop: '0.5rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <p style={{ fontSize: '0.75rem', color: '#22c55e', marginBottom: '0.25rem' }}>
                    效验：{type.effect}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>
                    💡 典例：{type.example} | {type.note}
                  </p>
                </motion.div>
              )}
              <ProgressBar value={type.power} color="#3b82f6" height={3} />
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="真龙八证">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {TRUE_DRAGON.map((stage, index) => (
            <motion.div
              key={stage.stage}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{
                color: '#3b82f6',
                textAlign: 'center',
                marginBottom: '0.5rem',
              }}>
                {stage.stage}
              </h3>
              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.8rem',
                lineHeight: 1.5,
                textAlign: 'center',
                marginBottom: '0.5rem',
              }}>
                {stage.feature}
              </p>
              <ProgressBar value={stage.importance} color="#3b82f6" height={4} label="关键度" />
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="四神砂法">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {FOUR_GUARDS.map((guard, index) => (
            <motion.div
              key={guard.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#3b82f6', fontSize: '1.2rem', display: 'inline' }}>{guard.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)', marginLeft: '0.5rem' }}>
                  {guard.position}方
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#22c55e', marginBottom: '0.3rem' }}>
                ✓ 宜：{guard.req}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#ef4444', marginBottom: '0.3rem' }}>
                ✗ 忌：{guard.avoid}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.8)', marginBottom: '0.5rem' }}>
                主：{guard.effect}
              </p>
              <p style={{
                fontSize: '0.7rem',
                color: '#f59e0b',
                padding: '0.3rem',
                borderRadius: '4px',
                background: 'rgba(245, 158, 11, 0.1)',
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
                💡 {guard.tip}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="点穴四象">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {XUE_FOUR.map((xue, index) => (
            <motion.div
              key={xue.type}
              className="xian-submodule-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#3b82f6' }}>{xue.type}</h3>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  color: '#3b82f6',
                }}>{xue.form}</span>
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.8rem',
                marginBottom: '0.5rem',
              }}>
                {xue.feature}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.5rem' }}>
                {xue.variation.map((v, i) => (
                  <span key={i} style={{
                    fontSize: '0.7rem',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '6px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    color: '#3b82f6',
                  }}>{v}</span>
                ))}
              </div>
              <p style={{
                color: '#f59e0b',
                fontSize: '0.75rem',
                marginBottom: '0.3rem',
              }}>
                🔑 {xue.key}
              </p>
              <p style={{
                fontSize: '0.7rem',
                color: 'rgba(180, 180, 190, 0.6)',
              }}>
                🏛️ 名穴：{xue.famous}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="中华六大历史名龙">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {FAMOUS_DRAGONS.map((fd, index) => (
            <motion.div
              key={fd.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#3b82f6' }}>{fd.name}</h3>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '10px',
                  background: fd.rank === 'S级龙脉' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                  color: fd.rank === 'S级龙脉' ? '#ef4444' : '#3b82f6',
                }}>{fd.rank}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#f59e0b', marginBottom: '0.3rem' }}>
                {fd.level} · {fd.range}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                marginBottom: '0.5rem',
                fontStyle: 'italic',
              }}>
                "{fd.legend}"
              </p>
              <p style={{
                color: '#22c55e',
                fontSize: '0.8rem',
                padding: '0.3rem',
                borderRadius: '4px',
                background: 'rgba(34, 197, 94, 0.1)',
                textAlign: 'center',
              }}>
                历史影响：{fd.effect}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="寻龙点穴八大误区">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {GHOSTS.map((err, index) => (
            <motion.div
              key={err.symptom}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{
                color: '#ef4444',
                fontSize: '0.95rem',
                marginBottom: '0.5rem',
              }}>
                ⚠️ {err.symptom}
              </h3>
              <p style={{
                fontSize: '0.8rem',
                color: 'rgba(180, 180, 190, 0.8)',
                marginBottom: '0.3rem',
              }}>
                病根：{err.flaw}
              </p>
              <p style={{
                fontSize: '0.8rem',
                color: '#ef4444',
                marginBottom: '0.5rem',
              }}>
                后果：{err.result}
              </p>
              <span style={{
                fontSize: '0.7rem',
                padding: '0.15rem 0.5rem',
                borderRadius: '10px',
                background: err.level === '致命' ? 'rgba(239, 68, 68, 0.3)' : err.level === '严重' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(167, 139, 250, 0.2)',
                color: err.level === '致命' ? '#ef4444' : err.level === '严重' ? '#f59e0b' : '#a78bfa',
              }}>
                危险等级：{err.level}
              </span>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
