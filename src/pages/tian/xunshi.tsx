'use client'

import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface ShiChen {
  name: string
  range: string
  wuxing: string
  shengxiao: string
  auspicious: number
  yangqi: number
  yi: string[]
  ji: string[]
  detail: string
  category: string
}

interface JianXing {
  name: string
  goodOrBad: string
  meaning: string
  yi: string[]
  ji: string[]
  principle: string
}

interface HuangDao {
  name: string
  type: string
  meaning: string
  effect: string
  yi: string[]
}

const TWELVE_SHICHEN: ShiChen[] = [
  { name: '子时', range: '23:00-01:00', wuxing: '水', shengxiao: '鼠', auspicious: 85, yangqi: 10, category: '阳气初生', yi: ['打坐', '修行', '睡眠', '养气'], ji: ['剧烈运动', '行房', '暴饮暴食'], detail: '夜半子时，阳气初生，阴气最盛。此时为一日太极之始，宜静养不宜妄动。打坐修行最佳，睡眠则气血归根。' },
  { name: '丑时', range: '01:00-03:00', wuxing: '土', shengxiao: '牛', auspicious: 75, yangqi: 20, category: '阳气渐升', yi: ['深度睡眠', '养肝', '存神'], ji: ['熬夜', '发怒', '进食'], detail: '鸡鸣丑时，肝经当令。此时深度睡眠最养肝血。熬夜最伤肝，怒气最伤魂。' },
  { name: '寅时', range: '03:00-05:00', wuxing: '木', shengxiao: '虎', auspicious: 95, yangqi: 40, category: '修行最佳', yi: ['打坐', '采气', '练功', '诵经'], ji: ['房事', '出汗', '大声喧哗'], detail: '平旦寅时，肺经当令，此时天地阳气始升，阴气渐退，为一日采气修行最佳时辰。万古不传之秘！' },
  { name: '卯时', range: '05:00-07:00', wuxing: '木', shengxiao: '兔', auspicious: 90, yangqi: 60, category: '阳气升发', yi: ['起床', '喝温水', '排便', '散步'], ji: ['赖床', '不吃早饭', '生闷气'], detail: '日出卯时，大肠经当令。此时宜起床喝温水，排宿便，迎朝阳。阳气升发，生机盎然。' },
  { name: '辰时', range: '07:00-09:00', wuxing: '土', shengxiao: '龙', auspicious: 88, yangqi: 70, category: '飞龙在天', yi: ['吃早饭', '读书', '计划', '祀神'], ji: ['空腹', '吵架', '决策'], detail: '食时辰时，胃经当令，群龙行雨之时。此时必须吃早饭，胃气最强，消化最好。一日之计在于晨。' },
  { name: '巳时', range: '09:00-11:00', wuxing: '火', shengxiao: '蛇', auspicious: 92, yangqi: 85, category: '大吉之时', yi: ['工作', '学习', '谈判', '签约'], ji: ['懒惰', '分心', '懈怠'], detail: '隅中巳时，脾经当令。此时阳气鼎盛而不亢，头脑最清醒，精力最充沛。工作学习最佳之时。' },
  { name: '午时', range: '11:00-13:00', wuxing: '火', shengxiao: '马', auspicious: 70, yangqi: 100, category: '阳极生阴', yi: ['小憩', '静养', '心经'], ji: ['剧烈运动', '大怒', '房事'], detail: '日中午时，心经当令，阳气鼎盛，一阴初生。此时宜小憩15-30分钟，不可大汗耗阳。' },
  { name: '未时', range: '13:00-15:00', wuxing: '土', shengxiao: '羊', auspicious: 82, yangqi: 85, category: '阳气渐收', yi: ['工作', '读书', '会客'], ji: ['懒惰', '昏沉'], detail: '日昳未时，小肠经当令。此时精力恢复，适合处理复杂工作，会客交友。' },
  { name: '申时', range: '15:00-17:00', wuxing: '金', shengxiao: '猴', auspicious: 87, yangqi: 70, category: '智慧之时', yi: ['学习', '记忆', '运动', '吐纳'], ji: ['久坐', '憋尿'], detail: '哺时申时，膀胱经当令，此时记忆力最佳，适合读书背诵。也是运动锻炼好时机。' },
  { name: '酉时', range: '17:00-19:00', wuxing: '金', shengxiao: '鸡', auspicious: 80, yangqi: 50, category: '阳气入脏', yi: ['补肾', '静养', '晚餐', '散步'], ji: ['过劳', '房事', '大补'], detail: '日入酉时，肾经当令。此时宜补肾，宜静养。不宜过劳，不宜行房，宜持满。' },
  { name: '戌时', range: '19:00-21:00', wuxing: '土', shengxiao: '狗', auspicious: 78, yangqi: 30, category: '养心安神', yi: ['散步', '谈心', '读经', '放松'], ji: ['争吵', '忧虑', '剧烈运动'], detail: '黄昏戌时，心包经当令。此时宜放松心情，与家人团聚，不宜动怒争执，宜养心安神。' },
  { name: '亥时', range: '21:00-23:00', wuxing: '水', shengxiao: '猪', auspicious: 83, yangqi: 15, category: '养阴之时', yi: ['泡脚', '入睡', '调息', '阴阳交泰'], ji: ['熬夜', '冷饮', '思虑'], detail: '人定亥时，三焦经当令，百脉皆通。此时泡脚入睡最佳，此时行房阴阳合和最宜孕育。' },
]

const TWELVE_JIANXING: JianXing[] = [
  { name: '建', goodOrBad: '平', meaning: '万物建立，宜小不宜大', yi: ['上书', '见贵', '出行'], ji: ['动土', '嫁娶', '开张'], principle: '建日为岁君元帅，建为初，为始，宜小不宜大，忌大举动。' },
  { name: '除', goodOrBad: '吉', meaning: '除旧迎新，宜清洁解除', yi: ['扫除', '解除', '疗病', '捉贼'], ji: ['嫁娶', '上任', '远行'], principle: '除日为除祸、除灾、除邪，宜清洁、治病、破煞。' },
  { name: '满', goodOrBad: '吉', meaning: '圆满充盈，宜修造嫁娶', yi: ['嫁娶', '修造', '祈福', '开市'], ji: ['安葬', '破土', '服药'], principle: '满日为圆满、丰收、喜庆，宜办吉庆之事。' },
  { name: '平', goodOrBad: '平', meaning: '平平稳稳，万事皆可', yi: ['普通事务', '修造', '出行'], ji: ['无大忌'], principle: '平日为平稳，无大凶无大吉，寻常事务皆可用。' },
  { name: '定', goodOrBad: '吉', meaning: '安定稳固，宜定计契约', yi: ['嫁娶', '签约', '安床', '上任'], ji: ['诉讼', '出行', '搬迁'], principle: '定日为安定、固定、确定，宜办需要稳定之事。' },
  { name: '执', goodOrBad: '吉', meaning: '执掌权柄，宜掌权执要', yi: ['捕猎', '收债', '擒拿', '决策'], ji: ['嫁娶', '搬迁', '治病'], principle: '执日为执掌、执行、控制，宜主动出击之事。' },
  { name: '破', goodOrBad: '凶', meaning: '破除毁坏，宜破不宜立', yi: ['破屋', '拆旧', '治病', '破煞'], ji: ['嫁娶', '开张', '出行', '修造'], principle: '破日为破坏、破除、解散，只宜破旧不宜立新。' },
  { name: '危', goodOrBad: '平', meaning: '危险高耸，宜登高望远', yi: ['安床', '装璜', '登高', '建筑'], ji: ['行船', '涉险', '诉讼'], principle: '危日为危险、高耸，宜高处作业，忌涉险。' },
  { name: '成', goodOrBad: '大吉', meaning: '成就圆满，百事皆宜', yi: ['嫁娶', '开张', '出行', '上任', '修造'], ji: ['动土破煞'], principle: '成日为成就、成功、完成，为建星第一大吉日，百事皆宜。' },
  { name: '收', goodOrBad: '吉', meaning: '收敛收藏，宜收纳储藏', yi: ['收货', '讨债', '收藏', '纳财'], ji: ['开张', '出行', '嫁娶'], principle: '收日为收获、收纳、收尾，宜进不宜出。' },
  { name: '开', goodOrBad: '大吉', meaning: '开放舒畅，宜开业出行', yi: ['开张', '出行', '嫁娶', '祈福'], ji: ['安葬', '闭藏', '收敛'], principle: '开日为开放、开启、开展，宜办需要向外发展之事。' },
  { name: '闭', goodOrBad: '凶', meaning: '关闭闭塞，宜闭不宜开', yi: ['安葬', '填埋', '收藏', '结束'], ji: ['开张', '出行', '嫁娶', '上任'], principle: '闭日为关闭、闭塞、结束，只宜收尾不宜开创。' },
]

const SIX_HUANGDAO: HuangDao[] = [
  { name: '青龙', type: '黄道', meaning: '贵人星，百事吉', effect: '主喜庆、贵人、财喜', yi: ['嫁娶', '出行', '上任', '修造'] },
  { name: '明堂', type: '黄道', meaning: '光明星，明明白白', effect: '主光明、正直、智慧', yi: ['考试', '谈判', '决策', '祭祀'] },
  { name: '金匮', type: '黄道', meaning: '财库星，金银满库', effect: '主财富、储藏、丰收', yi: ['经商', '纳财', '置业', '开市'] },
  { name: '天德', type: '黄道', meaning: '天恩星，逢凶化吉', effect: '主天恩、贵人、化解', yi: ['祈福', '解厄', '见贵', '治病'] },
  { name: '玉堂', type: '黄道', meaning: '玉殿星，尊贵吉祥', effect: '主尊贵、华美、圆满', yi: ['嫁娶', '宴会', '装饰', '上任'] },
  { name: '司命', type: '黄道', meaning: '文昌星，文运昌盛', effect: '主文运、智慧、长寿', yi: ['考试', '写作', '拜师', '祈福'] },
]

const SIX_HEIDAO: HuangDao[] = [
  { name: '白虎', type: '黑道', meaning: '凶煞星，血光横祸', effect: '主凶灾、血光、口舌', yi: ['宜回避，宜祭祀化解'] },
  { name: '天刑', type: '黑道', meaning: '刑克星，官非刑罚', effect: '主官非、刑伤、矛盾', yi: ['宜化解，宜低调，戒讼'] },
  { name: '朱雀', type: '黑道', meaning: '是非星，口舌是非', effect: '主口舌、争吵、官司', yi: ['宜沉默，忌争执，慎言'] },
  { name: '天牢', type: '黑道', meaning: '牢狱星，被困受阻', effect: '主牢狱、被困、阻碍', yi: ['宜守旧，忌冒险，忌投资'] },
  { name: '玄武', type: '黑道', meaning: '盗贼星，阴险暗昧', effect: '主盗贼、小人、暗算', yi: ['宜防盗，忌夜行，忌轻信'] },
  { name: '勾陈', type: '黑道', meaning: '牵绊星，纠缠延误', effect: '主牵绊、延误、纠纷', yi: ['宜耐心，忌急躁，忌签约'] },
]

const LEVEL_COLORS: Record<string, string> = {
  '大吉': '#22c55e',
  '吉': '#84cc16',
  '平': '#f59e0b',
  '凶': '#ef4444',
  '黄道': '#22c55e',
  '黑道': '#ef4444',
}

export default function XunshiPage() {
  const [filteredShichen, setFilteredShichen] = useState(TWELVE_SHICHEN)
  const [expandedShichen, setExpandedShichen] = useState<string | null>(null)
  const [filteredJianxing, setFilteredJianxing] = useState(TWELVE_JIANXING)
  const [filteredHuangdao, setFilteredHuangdao] = useState([...SIX_HUANGDAO, ...SIX_HEIDAO])

  const handleShichenFilter = useCallback((data: typeof TWELVE_SHICHEN) => {
    setFilteredShichen(data)
  }, [])

  const handleJianxingFilter = useCallback((data: typeof TWELVE_JIANXING) => {
    setFilteredJianxing(data)
  }, [])

  const handleHuangdaoFilter = useCallback((data: HuangDao[]) => {
    setFilteredHuangdao(data)
  }, [])

  return (
    <SubPageTemplate
      title="择吉寻时"
      subtitle="天时人事 · 日相催迫 · 选吉择时 · 事半功倍"
      icon="⏰"
      colorRgb="251, 191, 36"
    >
      <SubPageSection title="择时之道">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            夫天有四时，地有四方，人有四体。顺天应人，万事可成。故圣人之将有为也，必以吉日良辰，所以顺天地之心，合阴阳之序。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            时也，命也，运也。同一事也，行于吉时则顺，行于凶时则逆。善寻时者，如顺风扬帆，事半而功倍。
          </p>
        </InfoCard>
      </SubPageSection>

      {/* ⏰ 十二时辰 - 新增筛选功能 */}
      <SubPageSection title={`十二时辰吉凶宜忌 (${filteredShichen.length}/${TWELVE_SHICHEN.length})`}>
        <FilterBar
          data={TWELVE_SHICHEN}
          searchKeys={['name', 'wuxing', 'shengxiao', 'yi', 'ji', 'detail', 'category']}
          filterOptions={[
            { key: 'category', label: '分类', allLabel: '全部时辰' },
            { key: 'wuxing', label: '五行', allLabel: '全部五行' },
          ]}
          onFiltered={handleShichenFilter}
          placeholder="搜索时辰、五行、生肖、宜忌..."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredShichen.map((shichen, index) => (
            <motion.div
              key={shichen.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -3 }}
              onClick={() => setExpandedShichen(expandedShichen === shichen.name ? null : shichen.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#fbbf24', margin: 0, fontSize: '1.1rem' }}>
                  {shichen.name}
                </h3>
                <span style={{
                  padding: '0.15rem 0.5rem',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  background: shichen.auspicious >= 90
                    ? 'rgba(34, 197, 94, 0.15)'
                    : shichen.auspicious >= 80
                      ? 'rgba(251, 191, 36, 0.15)'
                      : 'rgba(245, 158, 11, 0.1)',
                  color: shichen.auspicious >= 90
                    ? '#22c55e'
                    : shichen.auspicious >= 80
                      ? '#fbbf24'
                      : '#f59e0b',
                }}>
                  吉度 {shichen.auspicious}%
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                <span>🕐 {shichen.range}</span>
                <span style={{ color: 'rgba(251, 191, 36, 0.7)' }}>五行:{shichen.wuxing} 生肖:{shichen.shengxiao}</span>
              </div>
              <p style={{ color: 'rgba(251, 191, 36, 0.5)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                {shichen.category} | 阳气指数
              </p>
              <ProgressBar value={shichen.yangqi} color="rgba(251, 191, 36)" />

              {/* 💫 展开详情 */}
              <motion.div
                initial={false}
                animate={{ height: expandedShichen === shichen.name ? 'auto' : 0, opacity: expandedShichen === shichen.name ? 1 : 0 }}
                style={{ overflow: 'hidden' }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ paddingTop: '0.75rem', marginTop: '0.75rem', borderTop: '1px solid rgba(251, 191, 36, 0.1)' }}>
                  <p style={{
                    color: 'rgba(180, 180, 190, 0.65)',
                    fontSize: '0.75rem',
                    lineHeight: 1.7,
                    marginBottom: '0.75rem',
                    fontStyle: 'italic',
                  }}>
                    {shichen.detail}
                  </p>
                  <div style={{ marginBottom: '0.3rem' }}>
                    <span style={{ color: '#22c55e', fontSize: '0.75rem' }}>✅ 宜: </span>
                    {shichen.yi.map(s => (
                      <span key={s} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', margin: '0 0.2rem', borderRadius: '3px', background: 'rgba(34, 197, 94, 0.1)', color: 'rgba(34, 197, 94, 0.8)' }}>{s}</span>
                    ))}
                  </div>
                  <div>
                    <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>❌ 忌: </span>
                    {shichen.ji.map(s => (
                      <span key={s} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', margin: '0 0.2rem', borderRadius: '3px', background: 'rgba(239, 68, 68, 0.1)', color: 'rgba(239, 68, 68, 0.8)' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'rgba(251, 191, 36, 0.4)', fontSize: '0.7rem' }}>
                {expandedShichen === shichen.name ? '▲ 收起' : '▼ 点击查看详细宜忌'}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      {/* 🌟 十二建星 - 新增筛选功能 */}
      <SubPageSection title={`十二建星吉凶 (${filteredJianxing.length}/${TWELVE_JIANXING.length})`}>
        <FilterBar
          data={TWELVE_JIANXING}
          searchKeys={['name', 'goodOrBad', 'meaning', 'yi', 'ji', 'principle']}
          filterOptions={[
            { key: 'goodOrBad', label: '吉凶', allLabel: '全部' },
          ]}
          onFiltered={handleJianxingFilter}
          placeholder="搜索建星、吉凶、宜忌..."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredJianxing.map((jx, index) => (
            <motion.div
              key={jx.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -2 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: LEVEL_COLORS[jx.goodOrBad], margin: 0 }}>{jx.name}日</h3>
                <span style={{
                  padding: '0.15rem 0.5rem',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  background: `${LEVEL_COLORS[jx.goodOrBad]}15`,
                  color: LEVEL_COLORS[jx.goodOrBad],
                }}>
                  {jx.goodOrBad}
                </span>
              </div>
              <p style={{ color: 'rgba(251, 191, 36, 0.6)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                {jx.meaning}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.65)',
                fontSize: '0.75rem',
                lineHeight: 1.6,
                fontStyle: 'italic',
                marginBottom: '0.5rem',
              }}>
                {jx.principle}
              </p>
              <div style={{ fontSize: '0.7rem' }}>
                <span style={{ color: '#22c55e' }}>宜: </span>{jx.yi.join('、')}
                <br />
                <span style={{ color: '#ef4444' }}>忌: </span>{jx.ji.join('、')}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      {/* ✨ 黄道黑道十二神 - 新增筛选功能 */}
      <SubPageSection title={`黄道黑道十二神煞 (${filteredHuangdao.length}/12)`}>
        <FilterBar
          data={[...SIX_HUANGDAO, ...SIX_HEIDAO]}
          searchKeys={['name', 'type', 'meaning', 'effect', 'yi']}
          filterOptions={[
            { key: 'type', label: '类型', allLabel: '黄道+黑道' },
          ]}
          onFiltered={handleHuangdaoFilter}
          placeholder="搜索黄道、黑道、神煞..."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredHuangdao.map((hd, index) => (
            <motion.div
              key={hd.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -2 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: LEVEL_COLORS[hd.type], margin: 0 }}>{hd.name}</h3>
                <span style={{
                  padding: '0.15rem 0.5rem',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  background: `${LEVEL_COLORS[hd.type]}15`,
                  color: LEVEL_COLORS[hd.type],
                }}>
                  {hd.type}
                </span>
              </div>
              <p style={{ color: 'rgba(251, 191, 36, 0.6)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                {hd.meaning}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.75rem',
                marginBottom: '0.5rem',
              }}>
                作用: {hd.effect}
              </p>
              <p style={{ fontSize: '0.7rem', color: 'rgba(34, 197, 94, 0.8)' }}>
                ✅ 宜: {hd.yi.join('、')}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
