'use client'

import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface LuckItem {
  name: string
  icon: string
  category: string
  importance: number
  desc: string
  detail: string
  luckyMethod: string[]
  unluckyThings: string[]
}

interface LuckMethod {
  title: string
  level: string
  effect: string
  days: number
  desc: string
  principle: string
}

const LUCK_CATEGORIES: LuckItem[] = [
  { name: '事业运', icon: '💼', category: '核心运势', importance: 95, desc: '官禄宫位，紫微斗数看职场升迁', detail: '官禄宫主宰人的事业发展、职位升降、领导能力。事业运旺者易得贵人相助，上司赏识，平步青云。弱则多遇小人，职场不顺，有志难伸。', luckyMethod: ['拜文昌', '带紫水晶', '办公桌左高右低'], unluckyThings: ['背后靠窗', '横梁压顶', '工位正对厕所'] },
  { name: '财运', icon: '💰', category: '核心运势', importance: 100, desc: '财帛宫位，武曲禄存主正财偏财', detail: '财帛宫主人一生财运、收入多寡、理财能力。财运旺者正财稳定，偏财常有，常有意外之喜。弱者财来财去，左手进右手出，难以积蓄。', luckyMethod: ['财位放聚宝盆', '随身带五帝钱', '钱包放招财符'], unluckyThings: ['大门正对电梯', '厨房漏水', '财位放杂物'] },
  { name: '感情运', icon: '💕', category: '核心运势', importance: 90, desc: '夫妻宫位，天相红鸾主姻缘婚配', detail: '夫妻宫主宰婚姻、感情、异性缘。感情运旺者桃花运旺盛，易得佳偶，夫妻和睦。弱者孤寡独居，情路坎坷，多遇烂桃花。', luckyMethod: ['卧室放粉水晶', '床头放鸳鸯枕', '西南角摆鲜花'], unluckyThings: ['床头放镜子', '卧室放刀剑', '横梁压床'] },
  { name: '健康运', icon: '🏥', category: '核心运势', importance: 98, desc: '疾厄宫位，天梁解厄保平安', detail: '疾厄宫主人一生健康、疾病、灾厄。健康运旺者体魄强健，百病不侵，逢凶化吉。弱者体弱多病，常有隐疾，意外不断。', luckyMethod: ['常晒后背', '佩戴玉坠', '卧室东南角放葫芦'], unluckyThings: ['卧室放太多植物', '房门正对厕所', '床尾正对镜子'] },
  { name: '学业运', icon: '📚', category: '人际发展', importance: 85, desc: '文昌文曲，主聪明智慧科星入命', detail: '文昌宫主智慧、学业、考试运。学业运旺者过目不忘，考试超常发挥，金榜题名。弱者学习吃力，发挥失常，名落孙山。', luckyMethod: ['书桌摆文昌塔', '随身带毛笔', '房间用绿色系'], unluckyThings: ['书桌背对门', '顶灯压书桌', '窗外有天斩煞'] },
  { name: '人际运', icon: '🤝', category: '人际发展', importance: 80, desc: '奴仆宫位，天同太阴主贵人相助', detail: '奴仆宫主人际关系、朋友助力、下属忠心。人际运旺者四海之内皆兄弟，朋友遍天下，遇事有人帮。弱者孤家寡人，众叛亲离，常遇小人暗算。', luckyMethod: ['客厅挂八骏图', '随身带贵人符', '西北方开阔明亮'], unluckyThings: ['客厅放仙人掌', '玄关堆放杂物', '大门正对墙角'] },
  { name: '出行运', icon: '✈️', category: '人际发展', importance: 75, desc: '迁移宫位，天马驿马主远游平安', detail: '迁移宫主远行、出差、搬家、出国。出行运旺者一路顺风，逢凶化吉，遇贵人提携。弱者旅途多舛，行李丢失，航班延误。', luckyMethod: ['出行前拜路神', '车内挂平安符', '远行带平安扣'], unluckyThings: ['出行前打碎东西', '乌鸦当头叫', '初一十五出远门'] },
  { name: '家宅运', icon: '🏠', category: '人际发展', importance: 88, desc: '田宅宫位，天府入库主置业安居', detail: '田宅宫主家庭和睦、房产运势、居住安稳。家宅运旺者父慈子孝，阖家欢乐，置业顺利。弱者家宅不宁，争吵不断，破财消灾。', luckyMethod: ['客厅放全家福', '玄关设屏风', '厨房保持干净'], unluckyThings: ['开门见灶', '厕所正对厨房', '楼上厕所改卧室'] },
  { name: '官非运', icon: '⚖️', category: '特殊运势', importance: 70, desc: '官非口舌，廉贞七杀主诉讼牢狱', detail: '官非运主人是非、官司、牢狱之灾。官非运旺者易惹是非，小人陷害，官司缠身。平顺者远离是非，逢凶化吉。', luckyMethod: ['办公摆麒麟', '随身带龙龟', '门口放五帝钱'], unluckyThings: ['办公室摆仙人球', '背后有路冲', '白虎位高起'] },
  { name: '子女运', icon: '👶', category: '特殊运势', importance: 82, desc: '子女宫位，破军贪狼主子息昌盛', detail: '子女宫主子嗣、晚辈、生育能力。子女运旺者早生贵子，子女贤孝，光宗耀祖。弱者求子艰难，子女不孝，晚年凄凉。', luckyMethod: ['卧室放麒麟送子', '东北方保持干净', '佩戴送子观音'], unluckyThings: ['卧室放金属物品', '东北方缺角', '卧室颜色太鲜艳'] },
  { name: '父母运', icon: '👴', category: '特殊运势', importance: 78, desc: '父母宫位，太阳太阴主长辈安康', detail: '父母宫主父母健康、长辈助力、家庭背景。父母运旺者父母安康，家境殷实，得长辈庇护。弱者父母多病，家庭贫寒，白手起家。', luckyMethod: ['西北方摆寿桃', '常陪父母吃饭', '佩戴平安扣'], unluckyThings: ['西北方缺角', '西北方放鱼缸', '厨房在西北'] },
  { name: '兄弟运', icon: '👬', category: '特殊运势', importance: 65, desc: '兄弟宫位，天机巨门主手足情深', detail: '兄弟宫主兄弟情谊、朋友助力、同辈竞争。兄弟运旺者手足同心，互帮互助，朋友得力。弱者兄弟阋墙，反目成仇，朋友出卖。', luckyMethod: ['客厅挂桃园结义图', '常与兄弟聚会', '东方摆放绿植'], unluckyThings: ['东方有冲煞', '客厅放利器', '兄弟房间门对门'] },
]

const IMPROVE_METHODS: LuckMethod[] = [
  { title: '行善积德', level: '顶级改运', effect: '质变级', days: 100, desc: '积善之家必有余庆，日行一善，气运自改', principle: '善念生善气，善气结善缘，善缘得善果。持之以恒，天必佑之。' },
  { title: '修身养性', level: '顶级改运', effect: '根本级', days: 180, desc: '心正则气正，气正则运正，心静则百邪不侵', principle: '相由心生，境随心转。心浮气躁好运难留，心平气和福气自来。' },
  { title: '顺势而为', level: '高级改运', effect: '智慧级', days: 30, desc: '时来天地皆同力，运去英雄不自由', principle: '君子藏器于身，待时而动。识时务者为俊杰，逆天而行者必殃。' },
  { title: '持之以恒', level: '高级改运', effect: '厚积薄发', days: 365, desc: '否极泰来，泰极否来，坚持正道终有花开', principle: '天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤。' },
  { title: '读书变化气质', level: '中级改运', effect: '内化级', days: 90, desc: '腹有诗书气自华，读书万卷始通神', principle: '读书改变气质，气质改变命运。三日不读书，便觉面目可憎。' },
  { title: '静坐养气', level: '中级改运', effect: '培补级', days: 100, desc: '每日静坐一炷香，浩然正气自充盈', principle: '静能生定，定能生慧，慧能破迷。元气充足则运势自然好转。' },
  { title: '环境风水', level: '初级改运', effect: '外助级', days: 7, desc: '调整居住办公环境，藏风聚气得地利', principle: '人借地利，地助人力。好的环境可以养人，坏的环境可以害人。' },
  { title: '佩戴吉祥物', level: '初级改运', effect: '助力级', days: 21, desc: '玉石水晶吉祥物，借力改运化煞', principle: '万物皆有灵，吉祥物可以辅助气场，但不能代替自身修行。' },
  { title: '吃素戒杀', level: '中级改运', effect: '慈悲级', days: 49, desc: '上天有好生之德，戒杀放生可延寿', principle: '天道轮回，报应不爽。慈悲心可以化解戾气，增长福报。' },
  { title: '孝敬父母', level: '顶级改运', effect: '福德级', days: 0, desc: '堂上二老就是佛，何须千里拜灵山', principle: '百善孝为先。父母是世间最大的福田，孝敬父母就是最好的改运。' },
  { title: '慎言慎行', level: '高级改运', effect: '积德级', days: 30, desc: '病从口入，祸从口出，谨言慎行避灾祸', principle: '言多必失，行多必过。君子慎独，不欺暗室，自然无灾无祸。' },
  { title: '布施结缘', level: '高级改运', effect: '结缘级', days: 60, desc: '财布施得财富，法布施得智慧，无畏布施得健康', principle: '舍得舍得，有舍才有得。越布施越富有，越吝啬越贫穷。' },
]

export default function YunshiPage() {
  const [filteredLuck, setFilteredLuck] = useState(LUCK_CATEGORIES)
  const [expandedLuck, setExpandedLuck] = useState<string | null>(null)
  const [filteredMethods, setFilteredMethods] = useState(IMPROVE_METHODS)
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null)

  const handleLuckFilter = useCallback((data: typeof LUCK_CATEGORIES) => {
    setFilteredLuck(data)
  }, [])

  const handleMethodFilter = useCallback((data: typeof IMPROVE_METHODS) => {
    setFilteredMethods(data)
  }, [])

  return (
    <SubPageTemplate
      title="每日运势"
      subtitle="流年大运 · 五行生克 · 趋吉避凶 · 把握时机"
      icon="🌟"
      colorRgb="232, 121, 249"
    >
      <SubPageSection title="运势概述">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            运势者，天时也。五行生克，天干地支流转，影响着每一个人的生命轨迹。知运则能顺势而为，逆势则能避其锋芒。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            君子知命而不忧。知晓自身运势，并非听天由命，而是在正确的时机做出正确的选择，此为改命之要道。
          </p>
        </InfoCard>
      </SubPageSection>

      {/* 🌟 十二大运 - 新增筛选功能 */}
      <SubPageSection title={`十二大运详解 (${filteredLuck.length}/${LUCK_CATEGORIES.length})`}>
        <FilterBar
          data={LUCK_CATEGORIES}
          searchKeys={['name', 'category', 'desc', 'detail']}
          filterOptions={[
            { key: 'category', label: '分类', allLabel: '全部运势' },
          ]}
          onFiltered={handleLuckFilter}
          placeholder="搜索运势名称、分类、描述..."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginTop: '1rem',
        }}>
          {filteredLuck.map((luck, index) => (
            <motion.div
              key={luck.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -3 }}
              onClick={() => setExpandedLuck(expandedLuck === luck.name ? null : luck.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.75rem' }}>{luck.icon}</span>
                  <h3 style={{ color: '#e879f9', margin: 0, fontSize: '1.1rem' }}>{luck.name}</h3>
                </div>
                <span style={{
                  padding: '0.15rem 0.5rem',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  background: luck.importance >= 90
                    ? 'rgba(239, 68, 68, 0.15)'
                    : luck.importance >= 80
                      ? 'rgba(201, 162, 39, 0.15)'
                      : 'rgba(232, 121, 249, 0.1)',
                  color: luck.importance >= 90
                    ? '#ef4444'
                    : luck.importance >= 80
                      ? '#c9a227'
                      : '#e879f9',
                }}>
                  权重 {luck.importance}
                </span>
              </div>

              <p style={{ color: 'rgba(232, 121, 249, 0.6)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                {luck.category}
              </p>
              <ProgressBar value={luck.importance} color="rgba(232, 121, 249)" />
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                marginTop: '0.75rem',
              }}>
                {luck.desc}
              </p>

              {/* 💫 展开详情 */}
              <motion.div
                initial={false}
                animate={{ height: expandedLuck === luck.name ? 'auto' : 0, opacity: expandedLuck === luck.name ? 1 : 0 }}
                style={{ overflow: 'hidden' }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ paddingTop: '1rem', marginTop: '0.75rem', borderTop: '1px solid rgba(232, 121, 249, 0.1)' }}>
                  <p style={{
                    color: 'rgba(180, 180, 190, 0.65)',
                    fontSize: '0.8rem',
                    lineHeight: 1.7,
                    marginBottom: '1rem',
                    fontStyle: 'italic',
                  }}>
                    {luck.detail}
                  </p>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ color: '#22c55e', fontSize: '0.8rem' }}>✅ 旺运方法: </span>
                    {luck.luckyMethod.map(s => (
                      <span key={s} style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', margin: '0 0.25rem', borderRadius: '3px', background: 'rgba(34, 197, 94, 0.1)', color: 'rgba(34, 197, 94, 0.8)' }}>{s}</span>
                    ))}
                  </div>
                  <div>
                    <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>❌ 忌讳: </span>
                    {luck.unluckyThings.map(s => (
                      <span key={s} style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', margin: '0 0.25rem', borderRadius: '3px', background: 'rgba(239, 68, 68, 0.1)', color: 'rgba(239, 68, 68, 0.8)' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div style={{ textAlign: 'center', marginTop: '0.75rem', color: 'rgba(232, 121, 249, 0.4)', fontSize: '0.75rem' }}>
                {expandedLuck === luck.name ? '▲ 收起' : '▼ 点击查看宜忌'}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      {/* ✨ 十二种改运心法 - 新增筛选功能 */}
      <SubPageSection title={`改运十二法 (${filteredMethods.length}/${IMPROVE_METHODS.length})`}>
        <FilterBar
          data={IMPROVE_METHODS}
          searchKeys={['title', 'level', 'effect', 'desc', 'principle']}
          filterOptions={[
            { key: 'level', label: '改运级别', allLabel: '全部级别' },
          ]}
          onFiltered={handleMethodFilter}
          placeholder="搜索改运方法、级别、原理..."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginTop: '1rem',
        }}>
          {filteredMethods.map((method, index) => (
            <motion.div
              key={method.title}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -3 }}
              onClick={() => setExpandedMethod(expandedMethod === method.title ? null : method.title)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ color: '#e879f9', margin: 0, fontSize: '1.05rem' }}>{method.title}</h3>
                <span style={{
                  padding: '0.15rem 0.5rem',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  background: method.level === '顶级改运'
                    ? 'rgba(239, 68, 68, 0.15)'
                    : method.level === '高级改运'
                      ? 'rgba(201, 162, 39, 0.15)'
                      : 'rgba(232, 121, 249, 0.1)',
                  color: method.level === '顶级改运'
                    ? '#ef4444'
                    : method.level === '高级改运'
                      ? '#c9a227'
                      : '#e879f9',
                }}>
                  {method.level}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                <span style={{ color: 'rgba(34, 197, 94, 0.7)' }}>效果: {method.effect}</span>
                <span style={{ color: 'rgba(201, 162, 39, 0.7)' }}>周期: {method.days > 0 ? method.days + ' 天' : '即时生效'}</span>
              </div>

              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
              }}>
                {method.desc}
              </p>

              {/* 💫 展开详情 */}
              <motion.div
                initial={false}
                animate={{ height: expandedMethod === method.title ? 'auto' : 0, opacity: expandedMethod === method.title ? 1 : 0 }}
                style={{ overflow: 'hidden' }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ paddingTop: '0.75rem', marginTop: '0.75rem', borderTop: '1px solid rgba(232, 121, 249, 0.1)' }}>
                  <p style={{
                    color: 'rgba(232, 121, 249, 0.7)',
                    fontSize: '0.8rem',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                  }}>
                    💡 {method.principle}
                  </p>
                </div>
              </motion.div>

              <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'rgba(232, 121, 249, 0.4)', fontSize: '0.75rem' }}>
                {expandedMethod === method.title ? '▲ 收起原理' : '▼ 点击查看改运原理'}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
