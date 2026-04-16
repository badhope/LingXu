'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

const FENGSHUI_PRINCIPLES = [
  { name: '藏风聚气', icon: '💨', weight: 95, core: '得水为上，藏风次之', desc: '气乘风则散，界水则止。古人聚之使不散，行之使有止，故谓之风水。水口关拦，真气融聚。' },
  { name: '山环水抱', icon: '⛰️', weight: 90, core: '四神齐备', desc: '环山抱水必有气。玄武垂头，朱雀翔舞，青龙蜿蜒，白虎驯頫。四山环抱，一水绕堂。' },
  { name: '坐北朝南', icon: '🧭', weight: 85, core: '负阴抱阳', desc: '天子当阳而立，向明而治。负阴抱阳，背山面水，此为基本格局。冬暖夏凉，采光充足。' },
  { name: '明堂开阔', icon: '🏛️', weight: 88, core: '容万马', desc: '入山寻水口，登穴看明堂。明堂容万马，富贵传天下。开阔平正，无杂物遮挡。' },
  { name: '曲则有情', icon: '🌊', weight: 92, core: '水忌直冲', desc: '水见三弯，福寿安闲。屈曲来朝，荣华富饶。直来直去，损人丁财。九曲入明堂，当朝宰相。' },
  { name: '阴阳平衡', icon: '☯️', weight: 100, core: '无过无不及', desc: '孤阴不生，独阳不长。一阴一阳之谓道，偏盛偏衰皆为病。山为阴水为阳，阴阳交合方生万物。' },
]

const YANGZHAI_LOCATIONS = [
  {
    position: '坎宅（坐北向南）',
    feature: '北玄武高大，南朱雀开阔，东青龙有水，西白虎有路',
    fortune: '大利丁财，富贵绵远',
    suitable: ['文宦', '书香', '清廉'],
    avoid: ['厨房在南', '厕所在中'],
    score: 95,
  },
  {
    position: '离宅（坐南向北）',
    feature: '前低后高，南山为靠，北水朝迎',
    fortune: '发福迅速，财丁两旺',
    suitable: ['商贾', '军旅', '技艺'],
    avoid: ['北水直冲', '后门大开'],
    score: 85,
  },
  {
    position: '震宅（坐东向西）',
    feature: '东山厚重，西河环绕，南低北高',
    fortune: '长子发达，文章显贵',
    suitable: ['文职', '教育', '医术'],
    avoid: ['西山高压', '道路冲射'],
    score: 88,
  },
  {
    position: '巽宅（坐东南向西北）',
    feature: '东南高大，西北低平，东水西流',
    fortune: '女眷持家，生意兴隆',
    suitable: ['经商', '交际', '服务业'],
    avoid: ['西北缺角', '大树挡门'],
    score: 82,
  },
  {
    position: '乾宅（坐西北向东南）',
    feature: '西北山靠，东南开阔，左水倒右',
    fortune: '老运荣华，官贵显达',
    suitable: ['官宦', '长辈', '修行'],
    avoid: ['东南高压', '污秽临门'],
    score: 90,
  },
  {
    position: '兑宅（坐西向东）',
    feature: '西山为靠，东水朝迎，后高前低',
    fortune: '少女发福，金银满库',
    suitable: ['金融', '娱乐', '艺术'],
    avoid: ['东水直去', '宅形狭长'],
    score: 80,
  },
  {
    position: '艮宅（坐东北向西南）',
    feature: '东北厚重，西南低平，右水倒左',
    fortune: '小子兴家，田产丰盈',
    suitable: ['农业', '地产', '实业'],
    avoid: ['西南深坑', '丑未冲射'],
    score: 86,
  },
  {
    position: '坤宅（坐西南向东北）',
    feature: '西南饱满，东北有水，四平八稳',
    fortune: '主妇贤良，家道和睦',
    suitable: ['家庭', '农业', '慈善'],
    avoid: ['东北缺失', '坤位高起'],
    score: 84,
  },
]

const YANGZHAI_BAD = [
  { name: '路冲煞', severity: '大凶', harm: '车祸、血光、官非', solution: '泰山石敢当、八卦镜、屏风遮挡', example: '大门正对直路，如枪直射，其凶立应。' },
  { name: '天斩煞', severity: '大凶', harm: '重疾、意外、破产', solution: '铜葫芦、五帝钱、麒麟一对', example: '两楼夹缝正对大门，如天劈开，主大凶。' },
  { name: '尖角煞', severity: '凶', harm: '慢性病、是非、破财', solution: '圆形植物、鱼缸、屏风', example: '屋角、墙角、檐角正对门窗，如刀切割。' },
  { name: '反弓煞', severity: '凶', harm: '破财、离乡、血光', solution: '八卦镜、石敢当、种树', example: '道路河流反弓向外，如弓射箭，主人财两散。' },
  { name: '穿堂煞', severity: '凶', harm: '财来财去，不聚气', solution: '屏风、玄关、高大植物', example: '前门直对后门，气直来直去，主不聚财。' },
  { name: '孤阳煞', severity: '中', harm: '脾气暴躁、夫妻不和', solution: '窗帘、水种植物、鱼缸', example: '厨房正对卧室，火气太盛，阴阳失衡。' },
  { name: '独阴煞', severity: '中', harm: '慢性病、抑郁、小人', solution: '长明灯、铜葫芦、红色装饰', example: '卧室紧邻厕所，阴气太重，阳气受损。' },
  { name: '声煞', severity: '中', harm: '心神不宁、失眠、官非', solution: '隔音窗、水幕墙、铜钟', example: '临近工地、马路、市场，噪音不绝。' },
]

const YINZHAI_FIVE = [
  { aspect: '寻龙', importance: 95, secret: '千里来龙，但看到头一截。太祖少祖，父母山，胎息孕育。', key: '剥换分明，过峡束气' },
  { aspect: '点穴', importance: 100, secret: '三年寻龙，十年点穴。差之毫厘，谬以千里。乘金相水，穴土印木。', key: '脉止气聚，界水分明' },
  { aspect: '察砂', importance: 85, secret: '砂者，穴之护卫也。左为青龙，右为白虎，前为朱雀，后为玄武。', key: '四神齐备，八风不动' },
  { aspect: '观水', importance: 90, secret: '未看山，先看水。有山无水休寻地，有水无山亦可裁。', key: '水归堂聚，去口关拦' },
  { aspect: '立向', importance: 80, secret: '分金差一线，富贵不相见。消砂纳水，皆在坐向。', key: '乘生气，避煞气，合元运' },
]

const FAMOUS_GRAVES = [
  {
    name: '秦始皇陵',
    location: '骊山',
    pattern: '依山傍水，背靠骊山，面朝渭水',
    creator: '李斯',
    legend: '穿三泉，下铜而致椁，宫观百官奇器珍怪徙臧满之。上具天文，下具地理。',
    consequence: '秦虽二世而亡，然始皇之名垂千古',
  },
  {
    name: '明十三陵',
    location: '天寿山',
    pattern: '三面环山，一面开口，温榆河蜿蜒其间，十三陵呈扇形分布',
    creator: '廖均卿',
    legend: '永乐五年，皇后徐氏崩。命廖均卿择地，得昌平黄土山，易名天寿山。',
    consequence: '明朝十三代帝王，享国二百七十六年',
  },
  {
    name: '清东陵',
    location: '马兰峪',
    pattern: '昌瑞山为主山，影壁山为朝山，金星山为案山。两水分流，合于龙虎砂外。',
    creator: '钦天监',
    legend: '顺治帝校猎至此，停辔四顾曰：此山王气葱郁，可为朕寿宫。',
    consequence: '清五帝葬于此，享国二百六十八年',
  },
  {
    name: '孔林',
    location: '曲阜',
    pattern: '洙泗环绕，古木参天，二千余年不断脉。',
    creator: '子贡',
    legend: '孔子卒，弟子各以四方奇木来植，故多异树。子贡庐墓六年。',
    consequence: '七十二代世袭公爵，天下第一世家',
  },
  {
    name: '武侯墓',
    location: '定军山',
    pattern: '九山环抱，一水穿堂，天然形胜。',
    creator: '诸葛亮自卜',
    legend: '亮遗命葬汉中定军山，因山为坟，冢足容棺，敛以时服，不须器物。',
    consequence: '千秋万代，血食不绝',
  },
  {
    name: '岳王坟',
    location: '西湖栖霞岭',
    pattern: '背山面湖，正气凛然。虽非龙脉正结，然忠义感天。',
    creator: '宋孝宗',
    legend: '狱卒隗顺负其尸，逾城葬于九曲丛祠。后孝宗诏复其官，以礼改葬。',
    consequence: '忠义之名，炳如日星',
  },
]

const WATER_TYPES = [
  { name: '九曲水', grade: '上吉', quality: '极品', feature: '九曲回环，如带环绕，入明堂', effect: '当朝宰相，世代簪缨', score: 100 },
  { name: '玉带水', grade: '上吉', quality: '上品', feature: '如腰带环绕，不直冲，不反弓', effect: '腰金衣紫，富贵双全', score: 95 },
  { name: '仓板水', grade: '吉', quality: '中上品', feature: '层层递进，如仓板之形', effect: '田产丰盈，富甲一方', score: 90 },
  { name: '回龙水', grade: '吉', quality: '中品', feature: '翻身回顾，眷恋有情', effect: '异路功名，发福悠久', score: 85 },
  { name: '直流水', grade: '凶', quality: '忌', feature: '直来直去，毫无回顾', effect: '财来财去，人丁离散', score: 30 },
  { name: '反弓水', grade: '大凶', quality: '大忌', feature: '向外反弓，如射箭形', effect: '败财伤丁，离乡背井', score: 10 },
  { name: '斜飞水', grade: '凶', quality: '忌', feature: '斜向而去，不顾穴场', effect: '儿女不孝，家财外耗', score: 25 },
  { name: '撞背水', grade: '大凶', quality: '大忌', feature: '从背后直冲而来', effect: '小人暗算，暗箭难防', score: 5 },
]

const MASTERS = [
  { name: '青鸟子', era: '上古', work: '《青鸟经》', achievement: '风水之祖，首创相地之术', legend: '黄帝之臣，始教人民卜宅安葬。' },
  { name: '樗里子', era: '战国', work: '《青鸟经》', achievement: '相地先知', legend: '秦昭王弟，卒葬渭南章台。曰：后百岁，当有天子之宫夹我墓。汉兴果然。' },
  { name: '郭璞', era: '东晋', work: '《葬书》', achievement: '风水学奠基人', legend: '葬者，乘生气也。五气行乎地中，发而生乎万物。人受体于父母，本骸得气，遗体受荫。' },
  { name: '杨筠松', era: '唐', work: '《撼龙经》《疑龙经》', achievement: '杨公风水，救贫先生', legend: '掌灵台地理事，黄巢破京城，断发入昆仑山步龙。后以术传于世。' },
  { name: '曾文辿', era: '唐', work: '《寻龙记》', achievement: '杨公首徒，三僚开基', legend: '筠松徒也。得杨公之术，作曾氏祖地，世代相传。' },
  { name: '赖布衣', era: '宋', work: '《催官篇》', achievement: '天星风水，布衣神相', legend: '名文俊，字太素。宋徽宗国师，后弃官浪迹，自称布衣。所点之地，皆发富贵。' },
]

export default function FengshuiPage() {
  const [activeSha, setActiveSha] = useState<number | null>(null)

  return (
    <SubPageTemplate
      title="堪舆风水"
      subtitle="藏风聚气 · 山环水抱 · 天人合一 · 福泽绵长"
      icon="🗺️"
      colorRgb="34, 197, 94"
    >
      <SubPageSection title="风水本义">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            风水者，地理之学也。气之来，有水以导之；气之止，有水以界之；气之聚，有砂以卫之。是故风水之法，得水为上，藏风次之。
            人因宅而立，宅因人而存。人宅相扶，感通天地。故卜居考卜，皆所以安身立命，非惟求利，亦以避害也。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            上古之世，民择丘陵而处之，下者为营窟，高者为巢居。后世圣人易之以宫室，上栋下宇，以待风雨。
            风水之道，本于自然，合于人情，顺于天理。非怪力乱神，乃生生之大道也。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="风水六大核心原则">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {FENGSHUI_PRINCIPLES.map((p, index) => (
            <motion.div
              key={p.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}>{p.icon}</span>
                <div>
                  <h3 style={{ color: '#22c55e', fontSize: '1.05rem' }}>{p.name}</h3>
                  <p style={{ color: '#f59e0b', fontSize: '0.75rem' }}>{p.core}</p>
                </div>
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                marginBottom: '0.5rem',
              }}>
                {p.desc}
              </p>
              <ProgressBar value={p.weight} color="#22c55e" height={4} label="权重" />
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="八宅方位吉凶">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {YANGZHAI_LOCATIONS.map((zhai, index) => (
            <motion.div
              key={zhai.position}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#22c55e', fontSize: '0.9rem' }}>{zhai.position}</h3>
                <span style={{
                  padding: '0.15rem 0.5rem',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  background: zhai.score >= 90 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                  color: zhai.score >= 90 ? '#22c55e' : '#f59e0b',
                }}>
                  {zhai.fortune}
                </span>
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.75rem',
                lineHeight: 1.5,
                marginBottom: '0.5rem',
              }}>
                格局：{zhai.feature}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.5rem' }}>
                {zhai.suitable.map((s, i) => (
                  <span key={i} style={{
                    fontSize: '0.65rem',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '6px',
                    background: 'rgba(34, 197, 94, 0.15)',
                    color: '#22c55e',
                  }}>✓ {s}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>综合评分</span>
                <ProgressBar value={zhai.score} color="#22c55e" height={3} />
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="阳宅形煞大全">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {YANGZHAI_BAD.map((sha, index) => (
            <motion.div
              key={sha.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setActiveSha(activeSha === index ? null : index)}
              style={{
                borderColor: activeSha === index ? '#ef4444' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#ef4444', fontSize: '0.9rem' }}>⚠️ {sha.name}</h3>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '8px',
                  background: sha.severity === '大凶' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(245, 158, 11, 0.2)',
                  color: sha.severity === '大凶' ? '#ef4444' : '#f59e0b',
                }}>
                  {sha.severity}
                </span>
              </div>
              <p style={{
                color: '#ef4444',
                fontSize: '0.75rem',
                marginBottom: '0.5rem',
              }}>
                危害：{sha.harm}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.75rem',
                lineHeight: 1.5,
              }}>
                {sha.example}
              </p>
              {activeSha === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{
                    marginTop: '0.5rem',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <p style={{
                    color: '#22c55e',
                    fontSize: '0.75rem',
                    lineHeight: 1.5,
                  }}>
                    化解：{sha.solution}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="阴宅风水五要素">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
          {YINZHAI_FIVE.map((item, index) => (
            <motion.div
              key={item.aspect}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{
                color: '#22c55e',
                fontSize: '1.1rem',
                textAlign: 'center',
                marginBottom: '0.5rem',
              }}>
                {item.aspect}
              </h3>
              <p style={{
                color: '#f59e0b',
                fontSize: '0.8rem',
                textAlign: 'center',
                marginBottom: '0.5rem',
              }}>
                🔑 {item.key}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.75rem',
                lineHeight: 1.6,
                marginBottom: '0.5rem',
                fontStyle: 'italic',
              }}>
                "{item.secret}"
              </p>
              <ProgressBar value={item.importance} color="#22c55e" height={4} label="重要度" />
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="水法八格">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {WATER_TYPES.map((water, index) => (
            <motion.div
              key={water.name}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{
                  color: water.score >= 80 ? '#22c55e' : water.score >= 50 ? '#f59e0b' : '#ef4444',
                  fontSize: '1rem',
                }}>
                  {water.name}
                </h3>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '8px',
                  background: water.score >= 80 ? 'rgba(34, 197, 94, 0.2)' : water.score >= 50 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: water.score >= 80 ? '#22c55e' : water.score >= 50 ? '#f59e0b' : '#ef4444',
                }}>
                  {water.grade}
                </span>
              </div>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.8rem',
                marginBottom: '0.5rem',
              }}>
                特征：{water.feature}
              </p>
              <p style={{
                color: water.score >= 80 ? '#22c55e' : '#ef4444',
                fontSize: '0.8rem',
                marginBottom: '0.5rem',
                padding: '0.3rem',
                borderRadius: '4px',
                background: 'rgba(0,0,0,0.2)',
              }}>
                {water.effect}
              </p>
              <ProgressBar value={water.score} color={water.score >= 80 ? '#22c55e' : water.score >= 50 ? '#f59e0b' : '#ef4444'} height={4} />
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="历代风水名墓">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {FAMOUS_GRAVES.map((grave, index) => (
            <motion.div
              key={grave.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#22c55e' }}>{grave.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                  {grave.location} · {grave.creator}
                </span>
              </div>
              <p style={{
                color: '#f59e0b',
                fontSize: '0.8rem',
                marginBottom: '0.5rem',
              }}>
                格局：{grave.pattern}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                marginBottom: '0.5rem',
              }}>
                {grave.legend}
              </p>
              <p style={{
                color: '#22c55e',
                fontSize: '0.8rem',
                padding: '0.3rem',
                borderRadius: '4px',
                background: 'rgba(34, 197, 94, 0.1)',
              }}>
                后世影响：{grave.consequence}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="历代风水宗师">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {MASTERS.map((master, index) => (
            <motion.div
              key={master.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#22c55e', fontSize: '1.1rem' }}>{master.name}</h3>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'rgba(180, 180, 190, 0.5)',
                  padding: '0.1rem 0.5rem',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '10px',
                }}>
                  {master.era}
                </span>
              </div>
              <p style={{
                color: '#f59e0b',
                fontSize: '0.8rem',
                marginBottom: '0.5rem',
              }}>
                著作：{master.work}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.85rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
              }}>
                🏆 {master.achievement}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.8rem',
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
