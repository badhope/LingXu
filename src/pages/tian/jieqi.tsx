'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

const SOLAR_TERMS = [
  { name: '立春', season: '春', desc: '东风解冻，蛰虫始振，鱼陟负冰' },
  { name: '雨水', season: '春', desc: '獭祭鱼，鸿雁来，草木萌动' },
  { name: '惊蛰', season: '春', desc: '桃始华，仓庚鸣，鹰化为鸠' },
  { name: '春分', season: '春', desc: '玄鸟至，雷乃发声，始电' },
  { name: '清明', season: '春', desc: '桐始华，田鼠化为鴽，虹始见' },
  { name: '谷雨', season: '春', desc: '萍始生，鸣鸠拂其羽，戴胜降于桑' },
  { name: '立夏', season: '夏', desc: '蝼蝈鸣，蚯蚓出，王瓜生' },
  { name: '小满', season: '夏', desc: '苦菜秀，靡草死，麦秋至' },
  { name: '芒种', season: '夏', desc: '螳螂生，鵙始鸣，反舌无声' },
  { name: '夏至', season: '夏', desc: '鹿角解，蝉始鸣，半夏生' },
  { name: '小暑', season: '夏', desc: '温风至，蟋蟀居壁，鹰始击' },
  { name: '大暑', season: '夏', desc: '腐草为萤，土润溽暑，大雨时行' },
  { name: '立秋', season: '秋', desc: '凉风至，白露降，寒蝉鸣' },
  { name: '处暑', season: '秋', desc: '鹰乃祭鸟，天地始肃，禾乃登' },
  { name: '白露', season: '秋', desc: '鸿雁来，玄鸟归，群鸟养羞' },
  { name: '秋分', season: '秋', desc: '雷始收声，蛰虫坏户，水始涸' },
  { name: '寒露', season: '秋', desc: '鸿雁来宾，雀入大水为蛤，菊有黄华' },
  { name: '霜降', season: '秋', desc: '豺乃祭兽，草木黄落，蛰虫咸俯' },
  { name: '立冬', season: '冬', desc: '水始冰，地始冻，雉入大水为蜃' },
  { name: '小雪', season: '冬', desc: '虹藏不见，天气上升，闭塞而成冬' },
  { name: '大雪', season: '冬', desc: '鹖鴠不鸣，虎始交，荔挺出' },
  { name: '冬至', season: '冬', desc: '蚯蚓结，麋角解，水泉动' },
  { name: '小寒', season: '冬', desc: '雁北乡，鹊始巢，雉始雊' },
  { name: '大寒', season: '冬', desc: '鸡始乳，征鸟厉疾，水泽腹坚' },
]

const SEASON_COLORS: Record<string, string> = {
  '春': '#22c55e',
  '夏': '#ef4444',
  '秋': '#f59e0b',
  '冬': '#3b82f6',
}

export default function JieqiPage() {
  return (
    <SubPageTemplate
      title="二十四节气"
      subtitle="天地阴阳 · 四时流转 · 节气养生 · 顺势而为"
      icon="🌾"
      colorRgb="74, 222, 128"
    >
      <SubPageSection title="节气之道">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            夫四时阴阳者，万物之根本也。所以圣人春夏养阳，秋冬养阴，以从其根，故与万物沉浮于生长之门。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            二十四节气承载着天地阴阳变化的节律。五日为一候，三候为一气，六气为时，四时为岁。每一个节气都是天地气机转换的节点。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="二十四节气全解">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
        }}>
          {SOLAR_TERMS.map((jieqi, index) => (
            <motion.div
              key={jieqi.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.015 }}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <h3 style={{ color: SEASON_COLORS[jieqi.season], marginBottom: '0.5rem' }}>
                {jieqi.name}
              </h3>
              <p style={{
                color: 'rgba(154, 123, 41, 0.5)',
                fontSize: '0.8rem',
                marginBottom: '0.5rem',
              }}>
                {jieqi.season}季
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.85rem',
                lineHeight: 1.5,
              }}>
                {jieqi.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="四季养生">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
        }}>
          {[
            { title: '春季养生', color: '#22c55e', principle: '春夏养阳，避风邪', advice: '夜卧早起，广步于庭，被发缓形，以使志生' },
            { title: '夏季养生', color: '#ef4444', principle: '养心气，防暑湿', advice: '夜卧早起，无厌于日，使志无怒，使气得泄' },
            { title: '秋季养生', color: '#f59e0b', principle: '秋冬养阴，敛肺气', advice: '早卧早起，与鸡俱兴，使志安宁，收敛神气' },
            { title: '冬季养生', color: '#3b82f6', principle: '藏肾精，防寒邪', advice: '早卧晚起，必待日光，使志若伏若匿，去寒就温' },
          ].map((season, index) => (
            <motion.div
              key={season.title}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{ color: season.color, marginBottom: '0.75rem' }}>
                {season.title}
              </h3>
              <p style={{
                color: 'rgba(154, 123, 41, 0.6)',
                fontSize: '0.9rem',
                marginBottom: '0.5rem',
              }}>
                {season.principle}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                lineHeight: 1.6,
              }}>
                {season.advice}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
