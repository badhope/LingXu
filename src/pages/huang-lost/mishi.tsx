'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface Mystery {
  id: number
  era: string
  year: string
  title: string
  mystery: string
  desc: string
  theories: string[]
  credibility: number
  category: string
  keyEvidence: string[]
  detail: string
  opposingViews: string[]
  breakthroughPoints: string[]
  relatedEvents: string[]
  color: string
  icon: string
}

interface UnsolvedCase {
  id: number
  name: string
  era: string
  location: string
  difficulty: number
  reward: string
  clueCount: number
  status: string
  desc: string
  detail: string
  clues: string[]
  witnesses: string[]
  suspects: string[]
  color: string
}

const MYSTERIES: Mystery[] = [
  {
    id: 1,
    era: '混沌时期',
    year: '无量量劫前',
    title: '盘古开天真相',
    mystery: '为何盘古要开天？',
    desc: '混沌之中，盘古为何要手持盘古斧劈开混沌？是使命使然，还是另有隐情？开天之后身化万物，是自愿还是被迫？三千魔神为何要阻止开天？',
    theories: ['大道阴谋论', '魔神内战说', '轮回转世论', '外域入侵说'],
    credibility: 15,
    category: '创世之谜',
    keyEvidence: ['盘古斧来历不明', '三千魔神实力悬殊', '开天功德分配诡异', '元神三分疑云'],
    detail: '混沌未开之时，三千魔神共存于世。盘古凭借造化玉蝶和盘古斧成为最强魔神，但他并未选择魔神统治，而是毅然开天辟地。这个选择的背后，可能隐藏着混沌即将崩塌的秘密。有传说称，外域强敌即将入侵混沌，盘古以开天为盾，布下周天星斗大阵守护新生世界。',
    opposingViews: ['盘古只是顺应大道', '开天乃是必然', '魔神本就该毁灭'],
    breakthroughPoints: ['造化玉蝶残片', '盘古元神印记', '混沌珠下落'],
    relatedEvents: ['龙汉初劫', '鸿钧成道', '三清立教'],
    color: '#1e40af',
    icon: '🪓'
  },
  {
    id: 2,
    era: '龙汉初劫',
    year: '开天第一劫',
    title: '三族覆灭之谜',
    mystery: '龙凤麒麟三族为何同归于尽？',
    desc: '洪荒初年，三族称霸。为何鼎盛之时突然爆发灭族大战？是魔祖罗睺挑唆，还是天道平衡使然？三族始祖最终结局如何？',
    theories: ['罗睺算计说', '气运耗尽论', '域外天魔入侵', '鸿钧幕后操纵'],
    credibility: 35,
    category: '种族之谜',
    keyEvidence: ['三族高层同时发疯', '罗睺血祭西方', '鸿钧突然现身', '三族始祖同时失踪'],
    detail: '龙凤麒麟三族本是洪荒主宰，互不侵犯。但在短短万年间，三族摩擦不断，最终爆发全面战争。战场之上，三族高层个个状若疯魔，毫不惜命。战后三族精锐尽丧，退出洪荒舞台。有人说三族始祖并未身死，而是被鸿钧封印于轮回深处，为末法时代留后手。',
    opposingViews: ['三族气数已尽', '盛极而衰乃天道', '罗睺一人之力足以'],
    breakthroughPoints: ['诛仙剑阵来历', '罗睺残魂', '祖龙龙珠', '凤族不灭真火'],
    relatedEvents: ['鸿钧讲道', '罗睺败亡', '西方灵气枯竭'],
    color: '#dc2626',
    icon: '🐉'
  },
  {
    id: 3,
    era: '巫妖大战',
    year: '太古',
    title: '后羿射日真相',
    mystery: '十只金乌为何同时出现在人间？',
    desc: '帝俊十子本该轮流巡天，为何十日同出？是疏忽大意，还是有人暗中算计？大巫后羿为何能射杀天神？妖族为何不阻止？',
    theories: ['准提道人算计', '十二祖巫阴谋', '后土轮回后手', '帝俊自毁长城'],
    credibility: 45,
    category: '战争之谜',
    keyEvidence: ['十太子同时失控', '后羿箭矢来历', '女娲不出手', '夸父逐日路线诡异'],
    detail: '十日同出，生灵涂炭。大巫后羿怒射九日，射杀九只金乌。但疑点重重：十只金乌为何同时失控？后羿的射日弓为何能破妖族天帝的血脉防护？女娲娘娘为何眼睁睁看着侄子们被杀而不阻止？有观点认为，这是后土娘娘为了轮回圆满，与妖族达成的秘密协议。',
    opposingViews: ['帝俊教子无方', '纯属意外事件', '后羿天赋异禀'],
    breakthroughPoints: ['射日弓', '最后一只金乌', '后土平心殿', '夸父精血'],
    relatedEvents: ['后土化轮回', '共工怒触不周山', '巫妖决战'],
    color: '#ea580c',
    icon: '☀️'
  },
  {
    id: 4,
    era: '封神之战',
    year: '商末',
    title: '通天教主的愤怒',
    mystery: '为何只有截教损失惨重？',
    desc: '封神榜三教共立，为何最后只有截教弟子死伤无数？四大圣人为何联手对付通天？鸿钧老祖为何偏袒太上老君和元始天尊？',
    theories: ['天道偏心论', '截教教义太左', '通天是试验品', '为西方教让路'],
    credibility: 60,
    category: '教派之谜',
    keyEvidence: ['鸿钧偏袒明显', '四圣围殴通天', '截教弟子全部上榜', '封神榜名额分配'],
    detail: '封神之战，截教几乎全军覆没。通天教主摆下诛仙剑阵，非四圣不可破。但为何是四位圣人联手对付一个师弟？鸿钧老祖最后赐下红丸，看似公平，实则是限制通天。更可疑的是，截教覆灭后，西方教趁机渡走三千红尘客，大兴于中土。这一切，会不会是鸿钧为了平衡东西方气运而下的一盘大棋？',
    opposingViews: ['通天咎由自取', '截教有教无类太过', '元始只是清理门户'],
    breakthroughPoints: ['诛仙四剑', '封神榜原件', '鸿钧红丸', '分宝岩法宝分配'],
    relatedEvents: ['三教共立封神榜', '万仙阵', '三清分家'],
    color: '#7c3aed',
    icon: '⚔️'
  },
  {
    id: 5,
    era: '西游之路',
    year: '唐初',
    title: '真假美猴王',
    mystery: '被打死的究竟是谁？',
    desc: '六耳猕猴与孙悟空一般无二，无人能分辨。如来指认的六耳猕猴真的是冒牌货吗？为何被一棒打死之后，如来说"善哉善哉"？',
    theories: ['真悟空被打死', '二心分裂说', '悟空自导自演', '菩提老祖出手'],
    credibility: 80,
    category: '取经之谜',
    keyEvidence: ['谛听不敢说', '观音分辨不出', '紧箍咒同时生效', '悟空之后性情大变'],
    detail: '真假美猴王一案，疑点重重。若真是六耳猕猴，为何能知前后？若真悟空被打死，那保唐僧西天取经的是谁？有人翻遍《西游记》发现，真假猴王之后，孙悟空再也没有叫过"菩提老祖"，而且对唐僧言听计从，再无反心。更有传闻，真正的孙悟空被如来封印于五行山下，永世不得翻身。',
    opposingViews: ['就是二心而已', '六耳猕猴确实存在', '如来没必要骗人'],
    breakthroughPoints: ['紧箍咒', '谛听真相', '如来金钵', '菩提灵台方寸山'],
    relatedEvents: ['大闹天宫', '五行山脱困', '取得真经'],
    color: '#ca8a04',
    icon: '🐒'
  },
  {
    id: 6,
    era: '近代',
    year: '未知',
    title: '末法时代之谜',
    mystery: '神仙为何都消失了？',
    desc: '为何近代再也不见神仙踪影？是举界飞升离开了地球，还是躲进了洞天福地？灵气为何突然枯竭？',
    theories: ['灵气枯竭论', '多维宇宙迁移', '我们被遗弃了', '神仙化身凡人'],
    credibility: 25,
    category: '时代之谜',
    keyEvidence: ['灵气浓度骤降', '洞天福地关闭', '飞升通道断绝', '神迹不再显现'],
    detail: '大约在明末清初，世上再无白日飞升的记载。所有的洞天福地相继关闭，昆仑山、蓬莱仙山人间蒸发。修真者要么随界飞升，要么兵解转世。有人提出"结界论"：地球被大能设下结界，限制灵气出入，防止凡人接触修真。也有"剧本论"：这一切只是天道给我们凡人安排的历史剧本，神仙都在更高维度看戏。',
    opposingViews: ['神仙本就不存在', '都是封建迷信', '科技发展取代修仙'],
    breakthroughPoints: ['昆仑山结界', '蓬莱仙岛坐标', '最后一个飞升者', '灵气复苏征兆'],
    relatedEvents: ['明朝灭亡', '工业革命', '科技兴起'],
    color: '#0891b2',
    icon: '🌌'
  },
  {
    id: 7,
    era: '上古',
    year: '黄帝时期',
    title: '女娲补天真相',
    mystery: '天为何会破？',
    desc: '共工怒触不周山真的是天破的原因吗？女娲为何要炼石补天？补天剩下的石头去了哪里？',
    theories: ['外星战舰撞击', '祖巫自爆', '为封印某存在', '女娲造人赎罪'],
    credibility: 50,
    category: '上古之谜',
    keyEvidence: ['天柱断裂位置', '五色石材质', '补天剩余石去向', '女娲消失'],
    detail: '水神共工与火神祝融大战，怒触不周山导致天塌地陷。但区区一个祖巫真有能力撞破天道？而且天破之后，各种域外天魔、洪荒巨兽从天裂缝中涌出。女娲炼石补天，更像是在封印某个缺口。更可怕的是，传说中天裂缝中曾经探出一只眼睛，仅仅是目光就让数位祖巫化为飞灰。',
    opposingViews: ['神话传说而已', '共工确实神力惊人', '古人想象的自然灾害'],
    breakthroughPoints: ['不周山遗址', '五色石成分', '红楼梦宝玉来历'],
    relatedEvents: ['女娲造人', '涿鹿之战', '绝地天通'],
    color: '#059669',
    icon: '🪨'
  },
  {
    id: 8,
    era: '春秋',
    year: '公元前500年',
    title: '老子化胡真相',
    mystery: '老子西出函谷关去了哪里？',
    desc: '老子骑青牛西出函谷关，留下《道德经》五千言，从此消失。他真的是去印度化胡为佛吗？还是去了更遥远的地方？',
    theories: ['创立佛教说', '寻找昆仑秘境', '破界飞升', '化为历代隐士'],
    credibility: 70,
    category: '圣人之谜',
    keyEvidence: ['函谷关消失', '佛教突然兴起', '道德经与佛经相似', '尹喜追踪记录'],
    detail: '周敬王四年，老子见周室衰微，遂辞官西行。过函谷关时，守关令尹喜见有紫气东来，知是圣人来临。老子留下《道德经》后继续西行，从此杳无音讯。数百年后，佛教在印度兴起，佛经中许多思想与道德经不谋而合。更有史学家考证，佛陀释迦牟尼悟道之年，正是老子西出百年之后。',
    opposingViews: ['两人毫无关系', '佛教独立发展', '只是传说'],
    breakthroughPoints: ['函谷关西向古道', '老子出关路线图', '早期梵文佛经'],
    relatedEvents: ['孔子问道', '百家争鸣', '佛教东传'],
    color: '#4b5563',
    icon: '🐂'
  }
]

const UNSOLVED_CASES: UnsolvedCase[] = [
  {
    id: 1,
    name: '龙骨天书案',
    era: '西周',
    location: '九鼎',
    difficulty: 95,
    reward: '昆仑秘境钥匙',
    clueCount: 3,
    status: '悬案',
    desc: '周鼎之上的龙骨图案，据说包含着昆仑仙界的入口坐标',
    detail: '大禹铸九鼎，每一鼎上都刻有神秘的龙骨文。这些文字据说并非人间所有，而是得自洛书河图。秦灭周后，九鼎失踪，龙骨文从此失传。但有传闻，始皇帝将其中一鼎带入了骊山皇陵，作为自己的陪葬。',
    clues: ['泗水捞鼎真相', '始皇密令', '帛书残卷'],
    witnesses: ['徐福', '李斯'],
    suspects: ['秦始皇', '儒家', '方仙道'],
    color: '#dc2626'
  },
  {
    id: 2,
    name: '徐福东渡谜案',
    era: '秦朝',
    location: '东海',
    difficulty: 85,
    reward: '长生不死药秘方',
    clueCount: 5,
    status: '调查中',
    desc: '徐福带领三千童男童女东渡，真的去了日本吗？',
    detail: '秦始皇二十八年，徐福上书说海中有蓬莱、方丈、瀛洲三座仙山，有神仙居住。始皇遂派徐福率童男童女数千人，入海求仙。然而徐福一去不复返，成为千古之谜。他真的找到了仙山，还是自立为王了？',
    clues: ['东海岛屿遗迹', '日本神武天皇', '秦代船舰技术'],
    witnesses: ['秦始皇', '卢生'],
    suspects: ['徐福自立', '遇海难', '找到仙界'],
    color: '#0891b2'
  },
  {
    id: 3,
    name: '武侯续命案',
    era: '三国',
    location: '五丈原',
    difficulty: 75,
    reward: '七星续命灯法门',
    clueCount: 7,
    status: '有新线索',
    desc: '诸葛亮七星灯续命真的被魏延撞破了吗？还是另有隐情？',
    detail: '建兴十二年，诸葛亮病重，于帐中设七星灯续命之法。不料魏延闯入，踏灭主灯。但这真的是意外吗？诸葛亮精通周易，难道算不到有人闯入？七星灯真的是用来续命的，还是另有作用？',
    clues: ['主灯熄灭时机', '魏延死状', '姜维后续行动'],
    witnesses: ['姜维', '魏延', '司马懿'],
    suspects: ['魏延', '司马懿', '诸葛亮自己'],
    color: '#f97316'
  },
  {
    id: 4,
    name: '推背图终局',
    era: '现代',
    location: '人间',
    difficulty: 99,
    reward: '未来真相',
    clueCount: 1,
    status: '等待验证',
    desc: '推背图最后一象究竟预言了什么？',
    detail: '推背图第六十象："一阴一阳，无终无始。终者自终，始者自始。" 这究竟是世界的终结，还是新的开始？茫茫天数此中求，世道兴衰不自由。万万千千说不尽，不如推背去归休。',
    clues: ['第六十象谶语'],
    witnesses: ['李淳风', '袁天罡'],
    suspects: ['天道', '人类自己'],
    color: '#7c3aed'
  }
]

export default function MishiPage() {
  const [filteredMysteries, setFilteredMysteries] = useState(MYSTERIES)
  const [expandedMystery, setExpandedMystery] = useState<number | null>(null)
  const [filteredCases, setFilteredCases] = useState(UNSOLVED_CASES)
  const [expandedCase, setExpandedCase] = useState<number | null>(null)

  const handleMysteryFilter = useCallback((data: typeof MYSTERIES) => {
    setFilteredMysteries(data)
  }, [])

  const handleCaseFilter = useCallback((data: typeof UNSOLVED_CASES) => {
    setFilteredCases(data)
  }, [])

  const mysteryFilters = {
    searchKeys: ['title', 'era', 'mystery', 'desc', 'theories', 'detail', 'keyEvidence'],
    filterKeys: {
      era: [...new Set(MYSTERIES.map(m => m.era))],
      category: [...new Set(MYSTERIES.map(m => m.category))],
    },
    sortOptions: [
      { key: 'credibility', label: '可信度' },
      { key: 'id', label: '时间顺序' },
      { key: 'title', label: '谜团名称' },
    ],
  }

  const caseFilters = {
    searchKeys: ['name', 'era', 'location', 'desc', 'detail', 'clues'],
    filterKeys: {
      status: [...new Set(UNSOLVED_CASES.map(c => c.status))],
    },
    sortOptions: [
      { key: 'difficulty', label: '难度等级' },
      { key: 'clueCount', label: '线索数量' },
    ],
  }

  const getCredibilityColor = (cred: number) => {
    if (cred >= 70) return '#22c55e'
    if (cred >= 40) return '#eab308'
    return '#ef4444'
  }

  const getDifficultyColor = (diff: number) => {
    if (diff >= 90) return '#ef4444'
    if (diff >= 80) return '#f97316'
    if (diff >= 70) return '#eab308'
    return '#22c55e'
  }

  return (
    <SubPageTemplate
      title="失落秘史"
      subtitle="上古秘辛 · 鲜为人知 · 历史迷雾 · 真相何在"
      icon="🗿"
      colorRgb="168, 162, 158"
    >
      <SubPageSection title="迷雾总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { label: '未解之谜', value: '8大悬案', icon: '❓', color: '#a8a29e' },
              { label: '假说猜想', value: '32种', icon: '💭', color: '#f97316' },
              { label: '历史断层', value: '7处', icon: '🕳️', color: '#ef4444' },
              { label: '待解案件', value: '4桩', icon: '🔍', color: '#3b82f6' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}88)`,
                    margin: '0 auto 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    boxShadow: `0 0 25px ${stat.color}66`
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title={`洪荒八大谜案 (${filteredMysteries.length}/${MYSTERIES.length})`}>
        <FilterBar
          data={MYSTERIES}
          onFiltered={handleMysteryFilter}
          options={mysteryFilters}
          placeholder="搜索谜团名称、时代、内容、假说..."
        />

        <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }}>
          <AnimatePresence>
            {filteredMysteries.map((mystery) => (
              <motion.div key={mystery.id} layout>
                <InfoCard
                  glowColor={mystery.color.replace('#', '')}
                  onClick={() => setExpandedMystery(expandedMystery === mystery.id ? null : mystery.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${mystery.color}, ${mystery.color}88)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0,
                      boxShadow: `0 0 20px ${mystery.color}44`
                    }}>
                      {mystery.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{mystery.title}</span>
                        <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', background: `${mystery.color}22`, color: mystery.color }}>
                          {mystery.era}
                        </span>
                        <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', background: 'rgba(168, 162, 158, 0.2)', color: '#a8a29e' }}>
                          {mystery.category}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                        <div style={{ flex: 1, maxWidth: '200px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.6)' }}>
                            <span>可信度</span>
                            <span style={{ color: getCredibilityColor(mystery.credibility), fontWeight: 'bold' }}>{mystery.credibility}%</span>
                          </div>
                          <ProgressBar value={mystery.credibility / 100} color={getCredibilityColor(mystery.credibility)} height={4} />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.7)' }}>{mystery.theories.length}种假说</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.75)', margin: 0 }}>
                        {mystery.mystery}
                      </p>
                    </div>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(168, 162, 158, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: expandedMystery === mystery.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                      fontSize: '0.8rem',
                      color: '#a8a29e'
                    }}>
                      ▼
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedMystery === mystery.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px dashed rgba(168, 162, 158, 0.2)' }}>
                          <p style={{ color: 'rgba(180, 180, 190, 0.85)', lineHeight: 1.8, marginBottom: '1rem' }}>
                            {mystery.detail}
                          </p>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#a8a29e', marginBottom: '0.5rem' }}>📜 核心疑点</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {mystery.keyEvidence.map((e, i) => (
                                  <span key={i} style={{
                                    fontSize: '0.75rem',
                                    padding: '3px 10px',
                                    borderRadius: '12px',
                                    background: 'rgba(239, 68, 68, 0.15)',
                                    color: '#ef4444'
                                  }}>{e}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#a8a29e', marginBottom: '0.5rem' }}>💡 主流假说</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {mystery.theories.map((t, i) => (
                                  <span key={i} style={{
                                    fontSize: '0.75rem',
                                    padding: '3px 10px',
                                    borderRadius: '12px',
                                    background: 'rgba(59, 130, 246, 0.15)',
                                    color: '#3b82f6'
                                  }}>{t}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#a8a29e', marginBottom: '0.5rem' }}>🎯 突破口</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {mystery.breakthroughPoints.map((p, i) => (
                                  <span key={i} style={{
                                    fontSize: '0.75rem',
                                    padding: '3px 10px',
                                    borderRadius: '12px',
                                    background: 'rgba(34, 197, 94, 0.15)',
                                    color: '#22c55e'
                                  }}>{p}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#a8a29e', marginBottom: '0.5rem' }}>🔗 关联事件</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {mystery.relatedEvents.map((e, i) => (
                                  <span key={i} style={{
                                    fontSize: '0.75rem',
                                    padding: '3px 10px',
                                    borderRadius: '12px',
                                    background: 'rgba(168, 162, 158, 0.2)',
                                    color: '#a8a29e'
                                  }}>{e}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </InfoCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>

      <SubPageSection title={`千古悬案 (${filteredCases.length}/${UNSOLVED_CASES.length})`}>
        <FilterBar
          data={UNSOLVED_CASES}
          onFiltered={handleCaseFilter}
          options={caseFilters}
          placeholder="搜索案件名称、时代、地点、线索..."
        />

        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <AnimatePresence>
            {filteredCases.map((case_) => (
              <motion.div key={case_.id} layout>
                <InfoCard
                  glowColor={case_.color.replace('#', '')}
                  onClick={() => setExpandedCase(expandedCase === case_.id ? null : case_.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${case_.color}, ${case_.color}88)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0,
                      boxShadow: `0 0 20px ${case_.color}44`
                    }}>
                      🔍
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 'bold' }}>{case_.name}</span>
                        <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '8px', background: `${case_.color}22`, color: case_.color }}>
                          {case_.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.7)' }}>
                        <span>{case_.era}</span>
                        <span>·</span>
                        <span>{case_.location}</span>
                        <span>·</span>
                        <span style={{ color: getDifficultyColor(case_.difficulty) }}>难度 {case_.difficulty}%</span>
                        <span>·</span>
                        <span>{case_.clueCount}条线索</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.75)', margin: '0.25rem 0 0 0' }}>
                        {case_.desc}
                      </p>
                    </div>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: `${case_.color}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: expandedCase === case_.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                      fontSize: '0.8rem',
                      color: case_.color
                    }}>
                      ▼
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedCase === case_.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed rgba(168, 162, 158, 0.2)' }}>
                          <p style={{ color: 'rgba(180, 180, 190, 0.85)', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.85rem' }}>
                            {case_.detail}
                          </p>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                            <div>
                              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: case_.color, marginBottom: '0.5rem' }}>📌 关键线索</div>
                              {case_.clues.map((c, i) => (
                                <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.7)', padding: '4px 0' }}>• {c}</div>
                              ))}
                            </div>
                            <div>
                              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: case_.color, marginBottom: '0.5rem' }}>👁️ 目击者</div>
                              {case_.witnesses.map((w, i) => (
                                <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.7)', padding: '4px 0' }}>• {w}</div>
                              ))}
                            </div>
                            <div>
                              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: case_.color, marginBottom: '0.5rem' }}>🕵️ 嫌疑人</div>
                              {case_.suspects.map((s, i) => (
                                <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.7)', padding: '4px 0' }}>• {s}</div>
                              ))}
                            </div>
                          </div>

                          <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: '#22c55e' }}>
                            🎁 破案奖励: {case_.reward}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </InfoCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
