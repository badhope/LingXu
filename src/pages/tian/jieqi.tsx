'use client'

import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface Jieqi {
  name: string
  season: string
  month: string
  solar: string
  threeHou: string
  yangsheng: string
  yi: string[]
  ji: string[]
  yinshi: string[]
  detail: string
  wuhou: string
}

interface SeasonHealth {
  title: string
  level: string
  color: string
  principle: string
  advice: string
  yao: string
  meridian: string
}

const SOLAR_TERMS: Jieqi[] = [
  { name: '立春', season: '春', month: '正月', solar: '2月3-5日', threeHou: '东风解冻，蛰虫始振，鱼陟负冰', yangsheng: '养肝为主，戒怒戒躁', yi: ['踏青', '放风筝', '咬春'], ji: ['过早减衣', '大补', '动怒'], yinshi: ['春饼', '萝卜', '韭菜', '春笋'], detail: '立春节气，阳气上升，万物复苏。此时大地回春，阳气开始生发，人体肝气也开始旺盛，养生当顺应阳气生发，条畅肝气。', wuhou: '东风送暖，大地解冻，蛰虫苏醒' },
  { name: '雨水', season: '春', month: '正月', solar: '2月18-20日', threeHou: '獭祭鱼，鸿雁来，草木萌动', yangsheng: '健脾祛湿，调养脾胃', yi: ['灸足三里', '食粥', '散步'], ji: ['暴饮暴食', '生冷', '熬夜'], yinshi: ['蜂蜜', '大枣', '山药', '百合'], detail: '雨水节气，降雨增多，湿气加重，脾胃易受湿邪困扰。此时养生重点在于健脾祛湿，培土生金。', wuhou: '水獭捕鱼，鸿雁北归，草木萌芽' },
  { name: '惊蛰', season: '春', month: '二月', solar: '3月5-7日', threeHou: '桃始华，仓庚鸣，鹰化为鸠', yangsheng: '顺阳养肝，清心降火', yi: ['听音乐', '踏青', '练八段锦'], ji: ['过食酸', '久坐', '郁闷'], yinshi: ['梨', '菠菜', '银耳', '枸杞'], detail: '惊蛰雷动，百虫苏醒，人体肝气也达到鼎盛。此时易肝火旺，需注意平肝潜阳，清热降火。', wuhou: '桃花盛开，黄鹂鸣啼，老鹰化斑鸠' },
  { name: '春分', season: '春', month: '二月', solar: '3月20-22日', threeHou: '玄鸟至，雷乃发声，始电', yangsheng: '阴阳平衡，调和气血', yi: ['放风筝', '春游', '艾灸'], ji: ['过寒过热', '大喜大悲', '过度劳累'], yinshi: ['香椿', '豆芽', '草莓', '蜂蜜'], detail: '春分秋分，昼夜平分，此时阴阳平衡，养生当注意调和阴阳，不可偏寒偏热。', wuhou: '燕子归来，春雷阵阵，闪电初现' },
  { name: '清明', season: '春', month: '三月', solar: '4月4-6日', threeHou: '桐始华，田鼠化为鴽，虹始见', yangsheng: '疏肝理气，清热祛湿', yi: ['扫墓', '踏青', '插柳'], ji: ['悲伤过度', '冒雨出行', '辛辣'], yinshi: ['青团', '螺蛳', '艾粄', '菊花茶'], detail: '清明时节，气清景明，万物皆显。此时降雨增多，湿气加重，需注意疏肝理气，清热除湿。', wuhou: '桐树开花，鹌鹑出现，彩虹出现' },
  { name: '谷雨', season: '春', month: '三月', solar: '4月19-21日', threeHou: '萍始生，鸣鸠拂其羽，戴胜降于桑', yangsheng: '祛湿健脾，补血养肝', yi: ['采茶', '赏牡丹', '洗草药浴'], ji: ['淋雨', '过食燥热', '暴怒'], yinshi: ['谷雨茶', '香椿', '乌米饭', '豌豆'], detail: '雨生百谷，雨水充足，万物生长茂盛。此时脾湿较重，需加强健脾祛湿。', wuhou: '浮萍生长，斑鸠鸣啼，戴胜落桑树' },
  { name: '立夏', season: '夏', month: '四月', solar: '5月5-7日', threeHou: '蝼蝈鸣，蚯蚓出，王瓜生', yangsheng: '养心为主，清热解暑', yi: ['尝新', '秤人', '午睡'], ji: ['大汗后冲凉', '贪凉饮冷', '熬夜'], yinshi: ['立夏蛋', '青梅', '蚕豆', '蒜苔'], detail: '立夏阳气渐盛，心气渐旺，养生重在养心。此时气温升高，注意防暑降温，不可过度贪凉。', wuhou: '蛤蟆鸣叫，蚯蚓出土，王瓜生长' },
  { name: '小满', season: '夏', month: '四月', solar: '5月20-22日', threeHou: '苦菜秀，靡草死，麦秋至', yangsheng: '清热利湿，解毒凉血', yi: ['吃苦菜', '食苦笋', '艾灸'], ji: ['过量饮酒', '厚味油腻', '日晒过久'], yinshi: ['苦菜', '苦瓜', '苦丁茶', '绿豆'], detail: '小满小满，江河渐满。此时阳气旺盛，湿热并重，宜多吃苦味食物清热泻火。', wuhou: '苦菜茂盛，喜阴草死，麦子将熟' },
  { name: '芒种', season: '夏', month: '五月', solar: '6月5-7日', threeHou: '螳螂生，鵙始鸣，反舌无声', yangsheng: '清暑祛湿，养脾胃', yi: ['送花神', '插秧', '青梅煮酒'], ji: ['空腹饮茶', '大汗淋漓', '冷水澡'], yinshi: ['青梅', '桑葚', '杨梅', '薏米'], detail: '芒种忙种，有芒之谷类作物可种。此时梅雨季节来临，湿热熏蒸，需注意祛湿健脾。', wuhou: '螳螂破卵，伯劳鸟鸣，反舌鸟停' },
  { name: '夏至', season: '夏', month: '五月', solar: '6月21-22日', threeHou: '鹿角解，蝉始鸣，半夏生', yangsheng: '养心安神，冬病夏治', yi: ['夏至面', '艾灸', '睡子午觉'], ji: ['冰水直灌', '露天宿夜', '过食生冷'], yinshi: ['夏至面', '苦瓜', '莲子', '百合'], detail: '夏至一阴生，此时阳气达到顶点，阴气开始生发。养生当注意养阳同时兼顾养阴。', wuhou: '鹿角脱落，知了始鸣，半夏生长' },
  { name: '小暑', season: '夏', month: '六月', solar: '7月6-8日', threeHou: '温风至，蟋蟀居壁，鹰始击', yangsheng: '清热解暑，生津止渴', yi: ['食新米', '晒伏', '艾灸'], ji: ['冷水冲头', '空调直吹', '剧烈运动'], yinshi: ['西瓜', '绿豆汤', '酸梅汤', '冬瓜'], detail: '小暑大暑，上蒸下煮。此时天气炎热，注意防暑降温，多补充水分。', wuhou: '热风来袭，蟋蟀进屋，老鹰开始捕食' },
  { name: '大暑', season: '夏', month: '六月', solar: '7月22-24日', threeHou: '腐草为萤，土润溽暑，大雨时行', yangsheng: '清热解暑，益气养阴', yi: ['喝伏茶', '晒姜', '烧香'], ji: ['烈日下暴晒', '冰水澡', '大悲大怒'], yinshi: ['仙草', '凤梨', '荔枝', '老鸭汤'], detail: '大暑乃一年最热之时，湿热达到极致。此时宜清热解暑，同时注意益气生津。', wuhou: '萤火虫出，土地潮湿，大雨倾盆' },
  { name: '立秋', season: '秋', month: '七月', solar: '8月7-9日', threeHou: '凉风至，白露降，寒蝉鸣', yangsheng: '滋阴润肺，少辛增酸', yi: ['贴秋膘', '啃秋', '晒秋'], ji: ['过食辛辣', '过早进补', '受凉'], yinshi: ['西瓜', '桃子', '茄子', '肉贴膘'], detail: '立秋一到，凉风渐至，阳气开始收敛。此时宜开始滋阴润肺，为秋收做准备。', wuhou: '凉风送爽，白露降临，寒蝉悲鸣' },
  { name: '处暑', season: '秋', month: '七月', solar: '8月22-24日', threeHou: '鹰乃祭鸟，天地始肃，禾乃登', yangsheng: '润燥养肺，调理脾胃', yi: ['出游迎秋', '开渔节', '祭祖'], ji: ['秋冻过度', '过食寒凉', '熬夜'], yinshi: ['鸭子', '龙眼', '白木耳', '莲子'], detail: '处暑出伏，秋老虎肆虐。此时昼夜温差大，注意润燥养肺，预防秋燥。', wuhou: '老鹰祭鸟，天地肃杀，五谷丰登' },
  { name: '白露', season: '秋', month: '八月', solar: '9月7-9日', threeHou: '鸿雁来，玄鸟归，群鸟养羞', yangsheng: '补肺益肾，滋阴润燥', yi: ['收清露', '酿白露酒', '祭禹王'], ji: ['赤脚露体', '过食瓜果', '秋冻'], yinshi: ['白露茶', '米酒', '龙眼', '番薯'], detail: '白露秋分夜，一夜凉一夜。此时燥邪当令，需加强滋阴润燥。', wuhou: '鸿雁南飞，燕子归去，百鸟储粮' },
  { name: '秋分', season: '秋', month: '八月', solar: '9月22-24日', threeHou: '雷始收声，蛰虫坏户，水始涸', yangsheng: '阴阳平衡，润肺生津', yi: ['祭月', '竖蛋', '吃秋菜'], ji: ['过劳', '大喜大悲', '过食肥甘'], yinshi: ['月饼', '桂花酒', '螃蟹', '秋梨'], detail: '秋分阴阳相半，昼夜均而寒暑平。此时养生宜注意调和阴阳，不可偏倚。', wuhou: '雷声渐息，蛰虫封户，湖水干涸' },
  { name: '寒露', season: '秋', month: '九月', solar: '10月8-9日', threeHou: '鸿雁来宾，雀入大水为蛤，菊有黄华', yangsheng: '滋肾润肺，防寒保暖', yi: ['登高', '赏菊', '佩茱萸'], ji: ['秋冻过度', '脚踝外露', '过食辛辣'], yinshi: ['螃蟹', '菊花酒', '芝麻', '柿子'], detail: '寒露寒露，遍地冷露。此时寒气渐重，需注意防寒保暖，尤其是脚部。', wuhou: '鸿雁列队，雀变蛤蜊，菊花盛开' },
  { name: '霜降', season: '秋', month: '九月', solar: '10月23-24日', threeHou: '豺乃祭兽，草木黄落，蛰虫咸俯', yangsheng: '健脾养胃，固肾补精', yi: ['赏菊', '吃柿子', '进补'], ji: ['秋冻', '清晨锻炼', '大补'], yinshi: ['柿子', '板栗', '萝卜', '羊肉'], detail: '霜降杀百草，万物凋零。此时寒气更重，宜开始进补，但不可过于滋腻。', wuhou: '豺狼祭兽，草木枯黄，百虫蛰伏' },
  { name: '立冬', season: '冬', month: '十月', solar: '11月7-8日', threeHou: '水始冰，地始冻，雉入大水为蜃', yangsheng: '补肾温阳，培补元气', yi: ['吃饺子', '酿黄酒', '养藏', '早卧晚起'], ji: ['剧烈运动', '大汗淋漓', '房事过度'], yinshi: ['饺子', '羊肉', '人参', '黄酒'], detail: '立冬十月节，冬日来临，万物闭藏。此时养生重在养藏，补肾温阳。', wuhou: '水面结冰，大地冻凝，野鸡化蜃' },
  { name: '小雪', season: '冬', month: '十月', solar: '11月22-23日', threeHou: '虹藏不见，天气上升，闭塞而成冬', yangsheng: '温补肾阳，益精填髓', yi: ['腌菜', '晒鱼干', '泡脚'], ji: ['燥热太过', '情绪抑郁', '晨练太早'], yinshi: ['糍粑', '腊味', '枸杞', '红枣'], detail: '小雪封地，大雪封河。此时天气寒冷，宜温补，但防燥热。', wuhou: '彩虹隐没，阳气上升，天地闭塞' },
  { name: '大雪', season: '冬', month: '十一月', solar: '12月6-8日', threeHou: '鹖鴠不鸣，虎始交，荔挺出', yangsheng: '温肾壮阳，散寒通络', yi: ['进补', '赏雪', '艾灸关元'], ji: ['过食燥热', '熬夜', '着凉'], yinshi: ['腌肉', '羊肉汤', '桂圆', '当归'], detail: '大者盛也，至此而雪盛矣。此时阴气最盛，阳气始萌。', wuhou: '寒号不鸣，老虎交配，兰草抽芽' },
  { name: '冬至', season: '冬', month: '十一月', solar: '12月21-23日', threeHou: '蚯蚓结，麋角解，水泉动', yangsheng: '阴阳并补，培元固本', yi: ['吃汤圆', '祭祖', '数九寒天'], ji: ['过食寒凉', '过劳', '大汗'], yinshi: ['汤圆', '饺子', '冬至酒', '八宝粥'], detail: '冬至一阳生，阴极阳生。此时为进补最佳时机，阴阳并补。', wuhou: '蚯蚓蜷缩，麋角脱落，泉水涌动' },
  { name: '小寒', season: '冬', month: '十二月', solar: '1月5-7日', threeHou: '雁北乡，鹊始巢，雉始雊', yangsheng: '温肾壮阳，养心安神', yi: ['腊祭', '画图数九', '晒太阳'], ji: ['冻伤', '过食肥甘', '久坐'], yinshi: ['腊八粥', '糯米饭', '黄芪', '山药'], detail: '小寒大寒，冻成冰团。此时一年最冷，需注意防寒保暖。', wuhou: '大雁北归，喜鹊筑巢，野鸡鸣叫' },
  { name: '大寒', season: '冬', month: '十二月', solar: '1月20-21日', threeHou: '鸡始乳，征鸟厉疾，水泽腹坚', yangsheng: '健脾温肾，扶正祛邪', yi: ['尾牙祭', '除尘', '备年'], ji: ['操劳过度', '悲伤', '过食油腻'], yinshi: ['年糕', '八宝饭', '鸡汤', '银耳'], detail: '大寒岁末，冬去春来。此时虽寒，但春意已萌动，宜静待春归。', wuhou: '母鸡孵卵，鹰隼猛飞，冰坚至腹' },
]

const SEASON_HEALTH: SeasonHealth[] = [
  { title: '春季养生', level: '基础养生', color: '#22c55e', principle: '春夏养阳，避风邪', advice: '夜卧早起，广步于庭，被发缓形，以使志生', yao: '酸味入肝，宜少酸增甘', meridian: '足厥阴肝经、足少阳胆经' },
  { title: '夏季养生', level: '基础养生', color: '#ef4444', principle: '养心气，防暑湿', advice: '夜卧早起，无厌于日，使志无怒，使气得泄', yao: '苦味入心，宜多苦少辛', meridian: '手少阴心经、手太阳小肠经' },
  { title: '秋季养生', level: '基础养生', color: '#f59e0b', principle: '秋冬养阴，敛肺气', advice: '早卧早起，与鸡俱兴，使志安宁，收敛神气', yao: '辛味入肺，宜少辛增酸', meridian: '手太阴肺经、手阳明大肠经' },
  { title: '冬季养生', level: '基础养生', color: '#3b82f6', principle: '藏肾精，防寒邪', advice: '早卧晚起，必待日光，使志若伏若匿，去寒就温', yao: '咸味入肾，宜减咸增苦', meridian: '足少阴肾经、足太阳膀胱经' },
]

const SEASON_COLORS: Record<string, string> = {
  '春': '#22c55e',
  '夏': '#ef4444',
  '秋': '#f59e0b',
  '冬': '#3b82f6',
}

export default function JieqiPage() {
  const [filteredJieqi, setFilteredJieqi] = useState(SOLAR_TERMS)
  const [expandedJieqi, setExpandedJieqi] = useState<string | null>(null)
  const [filteredHealth, setFilteredHealth] = useState(SEASON_HEALTH)

  const handleJieqiFilter = useCallback((data: typeof SOLAR_TERMS) => {
    setFilteredJieqi(data)
  }, [])

  const handleHealthFilter = useCallback((data: typeof SEASON_HEALTH) => {
    setFilteredHealth(data)
  }, [])

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

      {/* 🌾 二十四节气 - 新增筛选功能 */}
      <SubPageSection title={`二十四节气全解 (${filteredJieqi.length}/${SOLAR_TERMS.length})`}>
        <FilterBar
          data={SOLAR_TERMS}
          searchKeys={['name', 'season', 'threeHou', 'yangsheng', 'yi', 'detail', 'month']}
          filterOptions={[
            { key: 'season', label: '季节', allLabel: '春夏秋冬' },
          ]}
          onFiltered={handleJieqiFilter}
          placeholder="搜索节气名称、季节、养生、三候..."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredJieqi.map((jieqi, index) => (
            <motion.div
              key={jieqi.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.015 }}
              whileHover={{ y: -3 }}
              onClick={() => setExpandedJieqi(expandedJieqi === jieqi.name ? null : jieqi.name)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: SEASON_COLORS[jieqi.season], margin: 0, fontSize: '1.1rem' }}>
                  {jieqi.name}
                </h3>
                <span style={{
                  padding: '0.15rem 0.5rem',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  background: `${SEASON_COLORS[jieqi.season]}15`,
                  color: SEASON_COLORS[jieqi.season],
                }}>
                  {jieqi.season}季 · {jieqi.month}
                </span>
              </div>

              <p style={{
                color: 'rgba(154, 123, 41, 0.6)',
                fontSize: '0.75rem',
                marginBottom: '0.5rem',
              }}>
                📅 {jieqi.solar} | 💊 {jieqi.yangsheng}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.65)',
                fontSize: '0.8rem',
                lineHeight: 1.5,
                fontStyle: 'italic',
                marginBottom: '0.5rem',
              }}>
                {jieqi.threeHou}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
              }}>
                {jieqi.wuhou}
              </p>

              {/* 💫 展开详情 */}
              <motion.div
                initial={false}
                animate={{ height: expandedJieqi === jieqi.name ? 'auto' : 0, opacity: expandedJieqi === jieqi.name ? 1 : 0 }}
                style={{ overflow: 'hidden' }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ paddingTop: '0.75rem', marginTop: '0.75rem', borderTop: '1px solid rgba(74, 222, 128, 0.1)' }}>
                  <p style={{
                    color: 'rgba(180, 180, 190, 0.65)',
                    fontSize: '0.75rem',
                    lineHeight: 1.7,
                    marginBottom: '0.75rem',
                    fontStyle: 'italic',
                  }}>
                    {jieqi.detail}
                  </p>
                  <div style={{ marginBottom: '0.3rem' }}>
                    <span style={{ color: '#22c55e', fontSize: '0.75rem' }}>✅ 宜: </span>
                    {jieqi.yi.map(s => (
                      <span key={s} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', margin: '0 0.2rem', borderRadius: '3px', background: 'rgba(34, 197, 94, 0.1)', color: 'rgba(34, 197, 94, 0.8)' }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ marginBottom: '0.3rem' }}>
                    <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>❌ 忌: </span>
                    {jieqi.ji.map(s => (
                      <span key={s} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', margin: '0 0.2rem', borderRadius: '3px', background: 'rgba(239, 68, 68, 0.1)', color: 'rgba(239, 68, 68, 0.8)' }}>{s}</span>
                    ))}
                  </div>
                  <div>
                    <span style={{ color: '#f59e0b', fontSize: '0.75rem' }}>🍜 饮食: </span>
                    {jieqi.yinshi.map(s => (
                      <span key={s} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', margin: '0 0.2rem', borderRadius: '3px', background: 'rgba(245, 158, 11, 0.1)', color: 'rgba(245, 158, 11, 0.8)' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'rgba(74, 222, 128, 0.4)', fontSize: '0.7rem' }}>
                {expandedJieqi === jieqi.name ? '▲ 收起养生宜忌' : '▼ 点击查看养生宜忌'}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      {/* 四季养生 - 新增筛选功能 */}
      <SubPageSection title={`四季养生大法 (${filteredHealth.length}/${SEASON_HEALTH.length})`}>
        <FilterBar
          data={SEASON_HEALTH}
          searchKeys={['title', 'principle', 'advice', 'meridian', 'yao']}
          filterOptions={[
            { key: 'level', label: '级别', allLabel: '全部级别' },
          ]}
          onFiltered={handleHealthFilter}
          placeholder="搜索养生方法、经络、原则..."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {filteredHealth.map((season, index) => (
            <motion.div
              key={season.title}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <h3 style={{ color: season.color, marginBottom: '0.75rem' }}>
                {season.title}
              </h3>
              <p style={{
                color: 'rgba(154, 123, 41, 0.6)',
                fontSize: '0.8rem',
                marginBottom: '0.5rem',
              }}>
                🧭 原则: {season.principle}
              </p>
              <p style={{
                color: season.color,
                fontSize: '0.8rem',
                marginBottom: '0.5rem',
              }}>
                📍 主养经络: {season.meridian}
              </p>
              <p style={{
                color: 'rgba(239, 68, 68, 0.7)',
                fontSize: '0.8rem',
                marginBottom: '0.5rem',
              }}>
                🍃 五味宜忌: {season.yao}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.85rem',
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
