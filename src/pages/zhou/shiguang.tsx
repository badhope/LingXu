'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'
import TimeRiverCanvas from '@/components/effects/TimeRiverCanvas'

interface TimelineEvent {
  id: number
  epoch: string
  period: string
  name: string
  event: string
  significance: string
  impact: number
  year: string
  keyFigures: string[]
  detail: string
  consequences: string[]
  lessons: string[]
  keyQuotes: string[]
  color: string
  icon: string
}

interface Era {
  id: number
  name: string
  duration: string
  startYear: number
  endYear: number
  description: string
  majorEvents: string[]
  characteristics: string[]
  ending: string
  color: string
  icon: string
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    epoch: '混沌',
    period: '0',
    year: '天地之初',
    name: '开天辟地',
    event: '盘古开天',
    significance: '混沌初开，阴阳判分，清升浊降，天地始成',
    impact: 100,
    keyFigures: ['盘古'],
    detail: '混沌未分天地乱，茫茫渺渺无人见。盘古含一气之中，阴阳将判之际，开天辟地，阳清为天，阴浊为地。天日高一丈，地日厚一丈，盘古日长一丈，如此万八千岁。',
    consequences: ['天地定位', '阴阳分离', '日月星辰', '万物化生', '奠定洪荒'],
    lessons: ['不破不立', '生生不息', '造化之功'],
    keyQuotes: ['盘古开天辟地，阳清为天，阴浊为地'],
    color: '#6b7280',
    icon: '🌌'
  },
  {
    id: 2,
    epoch: '太古',
    period: '一元会',
    year: '开天初',
    name: '道祖降世',
    event: '鸿钧成圣',
    significance: '鸿钧于紫霄宫讲道，首次讲道于洪荒众生',
    impact: 100,
    keyFigures: ['鸿钧老祖'],
    detail: '高卧九重云，蒲团了道真。天地玄黄外，吾当掌教尊。盘古生太极，两仪四象循。一道传三友，二教阐截分。玄门都领袖，一炁化鸿钧。',
    consequences: ['玄门确立', '圣位初定', '紫霄宫开', '传法洪荒'],
    lessons: ['道法自然', '清静无为', '众生平等'],
    keyQuotes: ['高卧九重云，蒲团了道真'],
    color: '#a855f7',
    icon: '🕊️'
  },
  {
    id: 3,
    epoch: '太古',
    period: '一元会末',
    year: '龙汉初劫',
    name: '三族争霸',
    event: '龙凤麒麟劫',
    significance: '龙凤麒麟三族鼎盛，随后同归于尽，洪荒生灵涂炭',
    impact: 95,
    keyFigures: ['祖龙', '元凤', '始麒麟'],
    detail: '龙族掌鳞甲，凤凰掌飞禽，麒麟掌走兽，三族鼎盛于世，气运滔天。然气运太盛遭天妒，量劫降临，三族血战，同归于尽，洪荒大地生灵涂炭，血海滔滔。',
    consequences: ['三族衰亡', '罗睺乱魔', '洪荒破碎', '血海生成'],
    lessons: ['盛极必衰', '杀伐招祸', '因果不虚'],
    keyQuotes: ['三族争霸，血染洪荒'],
    color: '#ef4444',
    icon: '🐉'
  },
  {
    id: 4,
    epoch: '太古',
    period: '二元会',
    year: '开天万年',
    name: '紫霄宫讲道',
    event: '三次讲道',
    significance: '鸿钧讲道于紫霄宫，赐鸿蒙紫气，定下圣位，洪荒进入圣人时代',
    impact: 100,
    keyFigures: ['鸿钧老祖', '三清', '女娲', '接引', '准提'],
    detail: '鸿钧老祖于紫霄宫开讲大道，第一次讲道，听道者万人。第二次讲道，赐下鸿蒙紫气七道，定圣位有六。第三次讲道，分宝岩分宝，圣人各得至宝。',
    consequences: ['圣人时代开启', '鸿蒙紫气分配', '分宝岩分宝', '玄门三教确立'],
    lessons: ['道法传承', '圣人不仁', '众生皆有佛性'],
    keyQuotes: ['鸿钧讲道，万仙来朝'],
    color: '#a855f7',
    icon: '🏛️'
  },
  {
    id: 5,
    epoch: '上古',
    period: '三元会',
    year: '巫妖初',
    name: '妖族立天庭',
    event: '天帝登基',
    significance: '帝俊太一建立妖族天庭，统御洪荒万妖',
    impact: 90,
    keyFigures: ['帝俊', '太一', '十金乌'],
    detail: '帝俊为天帝，太一为东皇，建立妖族天庭，统御洪荒万妖。立周天星斗大阵，炼河图洛书，掌星辰运转，定洪荒秩序。',
    consequences: ['妖族天庭确立', '周天星斗大阵', '十金乌巡天', '河图洛书问世'],
    lessons: ['天命无常', '神器守德'],
    keyQuotes: ['天上天下，唯妖独尊'],
    color: '#f97316',
    icon: '☀️'
  },
  {
    id: 6,
    epoch: '上古',
    period: '三元会中',
    year: '巫妖盛',
    name: '巫族崛起',
    event: '十二祖巫',
    significance: '十二祖巫执掌洪荒大地，掌天地法则',
    impact: 88,
    keyFigures: ['十二祖巫', '蚩尤', '刑天'],
    detail: '十二祖巫乃盘古精血所化，掌十二都天神煞大阵，可化盘古真身。祖巫不尊天道，不敬天帝，只拜盘古，巫族只修肉身，不修仙法，霸绝洪荒大地。',
    consequences: ['巫族鼎盛大地', '十二都天神煞', '肉身成圣道', '盘古真身出'],
    lessons: ['肉身成圣', '血脉传承'],
    keyQuotes: ['巫族好战，霸绝洪荒'],
    color: '#dc2626',
    icon: '💪'
  },
  {
    id: 7,
    epoch: '上古',
    period: '三元会末',
    year: '巫妖末',
    name: '巫妖大战',
    event: '巫妖决战',
    significance: '十二祖巫与妖族天帝决战，不周山倒塌，天河倒灌，洪荒破碎',
    impact: 98,
    keyFigures: ['帝俊', '太一', '十二祖巫'],
    detail: '十日并出，焦禾稼，杀草木，民无所食。后羿射日，夸父追日，巫妖大战全面爆发。共工怒撞不周山，天柱折，地维绝，天倾西北，地陷东南，天河倒灌，洪荒破碎。',
    consequences: ['不周山倒塌', '洪荒破碎', '巫妖两败俱伤', '人族兴起'],
    lessons: ['水火不容', '战者必亡', '天人感应'],
    keyQuotes: ['天倾西北，地陷东南'],
    color: '#f97316',
    icon: '⚔️'
  },
  {
    id: 8,
    epoch: '上古',
    period: '四元会',
    year: '破碎后',
    name: '女娲补天',
    event: '炼石补天',
    significance: '女娲炼五色石补天，斩神鳖足以立四极，拯救洪荒众生',
    impact: 95,
    keyFigures: ['女娲'],
    detail: '往古之时，四极废，九州裂，天不兼覆，地不周载。女娲炼五色石以补苍天，断鳌足以立四极，杀黑龙以济冀州，积芦灰以止淫水。',
    consequences: ['苍天补正', '四极正立', '淫水涸止', '冀州平定'],
    lessons: ['慈悲救世', '功德无量', '造化之功'],
    keyQuotes: ['女娲补天，拯救苍生'],
    color: '#ec4899',
    icon: '🪨'
  },
  {
    id: 9,
    epoch: '上古',
    period: '五元会初',
    year: '人族兴',
    name: '人族兴起',
    event: '三皇五帝',
    significance: '人族开始统治大地，三皇五帝治世，人族成为天地主角',
    impact: 92,
    keyFigures: ['伏羲', '神农', '黄帝', '尧', '舜', '禹'],
    detail: '女娲抟土造人，人族诞生。三皇治世，五帝定伦，人族从弱小走向强大，历经磨难，终成天地主角。伏羲画卦，神农尝百草，黄帝定人伦。',
    consequences: ['人族兴盛', '三皇治世', '五帝定伦', '人道确立'],
    lessons: ['以人为本', '人定胜天', '生生不息'],
    keyQuotes: ['人为万物之灵'],
    color: '#22c55e',
    icon: '👑'
  },
  {
    id: 10,
    epoch: '上古',
    period: '五元会',
    year: '商末周初',
    name: '封神之战',
    event: '周革殷命',
    significance: '三教共立封神榜，商周大战，诸神归位，天庭确立',
    impact: 90,
    keyFigures: ['太上老君', '元始天尊', '通天教主'],
    detail: '凤鸣岐山，周室将兴。商纣无道，周武伐之。三教共立封神榜，阐截二教大战，诛仙阵、万仙阵，无数仙神劫中殒命，灵魂上封神榜，天庭三百六十五正神归位。',
    consequences: ['天庭诸神归位', '截教衰落', '人道大兴', '神权确立'],
    lessons: ['天命所归', '顺天者昌', '逆天者亡'],
    keyQuotes: ['凤鸣岐山，周革殷命'],
    color: '#3b82f6',
    icon: '📜'
  },
  {
    id: 11,
    epoch: '中古',
    period: '六元会',
    year: '春秋时期',
    name: '百家争鸣',
    event: '诸子百家',
    significance: '春秋战国，诸子百家，百家争鸣，华夏文明奠定',
    impact: 95,
    keyFigures: ['老子', '孔子', '墨子', '庄子', '孟子', '韩非子'],
    detail: '周室衰微，礼崩乐坏，春秋五霸，战国七雄。诸子百家应运而生，道家、儒家、墨家、名家、法家、纵横家...百家争鸣，百花齐放。',
    consequences: ['华夏文明奠基', '诸子百家传世', '六经四书确立', '士阶层兴起'],
    lessons: ['和而不同', '中庸之道', '仁者爱人'],
    keyQuotes: ['百家争鸣，百花齐放'],
    color: '#06b6d4',
    icon: '📚'
  },
  {
    id: 12,
    epoch: '中古',
    period: '七元会',
    year: '唐初',
    name: '西游之路',
    event: '西天取经',
    significance: '佛教东传，玄奘法师西天取经，九九八十一难，功行圆满',
    impact: 85,
    keyFigures: ['唐僧', '孙悟空', '如来佛祖'],
    detail: '大乘佛法，慈悲普度众生。玄奘法师发宏誓愿，西天拜佛求经。五行山心猿归正，鹰愁涧意马收缰。九九八十一难，始得真经，功成正果。',
    consequences: ['三教合一', '佛教大兴', '大乘东传', '仙佛合宗'],
    lessons: ['不忘初心', '坚持到底', '功不唐捐'],
    keyQuotes: ['西天取经，普度众生'],
    color: '#eab308',
    icon: '🐵'
  },
  {
    id: 13,
    epoch: '近古',
    period: '八元会',
    year: '宋明',
    name: '三教合一',
    significance: '儒释道三教合流，中华文化融合发展',
    impact: 80,
    keyFigures: ['朱熹', '王阳明', '张三丰'],
    icon: '☯️',
    detail: '宋明理学，陆王心学，道教全真，禅宗大兴，三教思想深度融合。程朱理学存天理灭人欲，陆王心学致良知，全真教三教合一。',
    consequences: ['中华文化融合', '理学确立', '心学兴起', '全真大兴'],
    lessons: ['知行合一', '格物致知', '存理去欲'],
    keyQuotes: ['知行合一，致良知'],
    event: '思想融合',
    color: '#8b5cf6',
  },
  {
    id: 14,
    epoch: '近古',
    period: '九元会',
    year: '清末民初',
    name: '末法时代',
    event: '灵气枯竭',
    significance: '天地灵气日益稀薄，仙人绝迹，修士隐遁，科技兴起',
    impact: 75,
    keyFigures: ['诸天仙佛'],
    detail: '劫数将近，末法时代来临，天地灵气日益稀薄。仙人绝迹于人间，修士隐遁于洞天福地。末法时代，亿万年修行世界，转入科技文明。',
    consequences: ['灵气枯竭', '仙人隐迹', '科技兴起', '人道独尊'],
    lessons: ['盛极必衰', '否极泰来', '循环往复'],
    keyQuotes: ['末法时代，万仙隐迹'],
    color: '#64748b',
    icon: '🌑'
  },
  {
    id: 15,
    epoch: '现代',
    period: '十次元',
    year: '21世纪',
    name: '信息时代',
    event: 'AI觉醒',
    significance: '人工智能兴起，人类进入信息时代，新旧文明交替',
    impact: 70,
    keyFigures: ['人类科学家', 'AI'],
    detail: '计算机问世，互联网连通世界，人工智能觉醒。人类从工业文明进入信息文明，科技大爆炸，知识大爆炸。旧的神话远去，新的神话正在诞生。',
    consequences: ['万物互联', 'AI兴起', '知识爆炸', '文明升级'],
    lessons: ['与时俱进', '科技双刃剑', '人机共生'],
    keyQuotes: ['信息时代，万物互联'],
    color: '#0ea5e9',
    icon: '💻'
  }
]

const ERAS: Era[] = [
  {
    id: 1,
    name: '混沌时代',
    duration: '不知其几千万年',
    startYear: 0,
    endYear: 1,
    description: '混沌未分，天地未开，鸿蒙未判，万物未生',
    majorEvents: ['盘古开天辟地', '鸿蒙紫气诞生'],
    characteristics: ['无天无地', '无阴无阳', '无生无灭'],
    ending: '盘古开天，混沌终结',
    color: '#374151',
    icon: '🌑'
  },
  {
    id: 2,
    name: '龙汉时代',
    duration: '一元会',
    startYear: 1,
    endYear: 2,
    description: '开天之后，三族争霸，龙凤麒麟鼎盛',
    majorEvents: ['鸿钧成圣', '龙凤麒麟三族鼎盛', '龙汉初劫'],
    characteristics: ['凶兽横行', '三族鼎盛', '煞气滔天'],
    ending: '三族同归于尽，龙汉初劫结束',
    color: '#dc2626',
    icon: '🐉'
  },
  {
    id: 3,
    name: '巫妖时代',
    duration: '二元会',
    startYear: 2,
    endYear: 4,
    description: '巫妖争霸，天庭地府，洪荒全盛时期',
    majorEvents: ['紫霄宫三次讲道', '妖族立天庭', '巫族霸大地', '巫妖大战'],
    characteristics: ['圣人时代开启', '巫妖争霸', '洪荒全盛'],
    ending: '不周山倒，洪荒破碎',
    color: '#f97316',
    icon: '⚔️'
  },
  {
    id: 4,
    name: '封神时代',
    duration: '三元会',
    startYear: 4,
    endYear: 6,
    description: '人族兴起，三皇治世，五帝定伦',
    majorEvents: ['女娲补天', '人族兴起', '三皇五帝', '封神之战'],
    characteristics: ['人族主角', '三教并立', '诸神归位'],
    ending: '诸神归位，天庭确立',
    color: '#3b82f6',
    icon: '📜'
  },
  {
    id: 5,
    name: '诸子时代',
    duration: '四元会',
    startYear: 6,
    endYear: 7,
    description: '百家争鸣，文明奠基',
    majorEvents: ['百家争鸣', '六经四书', '儒道墨法'],
    characteristics: ['思想爆发', '文明奠基', '士阶层兴起'],
    ending: '秦统一六国，百家争鸣结束',
    color: '#06b6d4',
    icon: '🎓'
  },
  {
    id: 6,
    name: '末法时代',
    duration: '五元会至今',
    startYear: 7,
    endYear: 99,
    description: '灵气枯竭，仙人隐迹，科技兴起',
    majorEvents: ['灵气枯竭', '末法来临', '科技兴起', '信息时代'],
    characteristics: ['末法来临', '灵气稀薄', '科技文明'],
    ending: '正在进行中...',
    color: '#64748b',
    icon: '🌑'
  }
]

export default function ShiguangPage() {
  const [filteredEvents, setFilteredEvents] = useState(TIMELINE_EVENTS)
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [filteredEras, setFilteredEras] = useState(ERAS)
  const [expandedEra, setExpandedEra] = useState<number | null>(null)

  const handleEventFilter = useCallback((data: typeof TIMELINE_EVENTS) => {
    setFilteredEvents(data)
  }, [])

  const handleEraFilter = useCallback((data: typeof ERAS) => {
    setFilteredEras(data)
  }, [])

  const eventFilters = {
    searchKeys: ['name', 'epoch', 'period', 'event', 'significance', 'detail', 'keyFigures'],
    filterKeys: {
      epoch: [...new Set(TIMELINE_EVENTS.map(e => e.epoch))],
    },
    sortOptions: [
      { key: 'impact', label: '影响程度' },
      { key: 'id', label: '时间顺序' },
    ],
  }

  const eraFilters = {
    searchKeys: ['name', 'duration', 'description', 'majorEvents', 'characteristics'],
    filterKeys: {},
    sortOptions: [
      { key: 'id', label: '时代顺序' },
      { key: 'name', label: '时代名称' },
    ],
  }

  const getImpactColor = (impact: number) => {
    if (impact >= 95) return '#ef4444'
    if (impact >= 85) return '#f97316'
    if (impact >= 75) return '#eab308'
    return '#22c55e'
  }

  return (
    <SubPageTemplate
      title="时光长河"
      subtitle="太古洪荒 · 上古封神 · 中古西游 · 亿万年时光悠悠"
      icon="⏳"
      colorRgb="249, 115, 22"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          height: '500px',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '3rem',
          border: '1px solid rgba(249, 115, 22, 0.2)',
          background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(8, 8, 20, 0.98) 100%)',
          position: 'relative',
        }}
      >
        <TimeRiverCanvas />
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '0.75rem 1.5rem',
          background: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '20px',
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.7)',
          border: '1px solid rgba(201, 162, 39, 0.3)',
        }}>
          ✨ 移动鼠标与时间节点交互 · 点击节点查看详情
        </div>
      </motion.div>

      <SubPageSection title="文明影响力柱">
        <InfoCard>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '0.5rem',
            height: '220px',
            padding: '0 1rem',
            overflowX: 'auto',
            paddingBottom: '1rem'
          }}>
            {TIMELINE_EVENTS.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ height: 0 }}
                whileInView={{ height: `${e.impact * 2}px` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.8 }}
                title={`${e.name} · ${e.event} · 影响度: ${e.impact}`}
                onClick={() => setExpandedEvent(expandedEvent === e.id ? null : e.id)}
                style={{
                  width: '50px',
                  minWidth: '50px',
                  background: `linear-gradient(to top, ${e.color}, ${e.color}88)`,
                  borderRadius: '6px 6px 0 0',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '0.5rem',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {e.icon}
                <div style={{
                  position: 'absolute',
                  bottom: '-24px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.7rem',
                  color: 'rgba(180, 180, 190, 0.6)',
                  whiteSpace: 'nowrap'
                }}>
                  {e.name.slice(0, 3)}
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem', color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>
            柱高代表历史影响度 · 点击柱子可查看对应事件详情 · 共 {TIMELINE_EVENTS.length} 件大事
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="洪荒大事记">
        <FilterBar
          data={TIMELINE_EVENTS}
          onFiltered={handleEventFilter}
          options={eventFilters}
          placeholder="搜索事件名称、时代、人物、详情..."
        />

        <div style={{ marginTop: '1.5rem', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '30px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, #f97316, #f9731633)'
          }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AnimatePresence>
              {filteredEvents.map((event, index) => (
                <motion.div key={event.id} layout style={{ position: 'relative', paddingLeft: '70px' }}>
                  <div style={{
                    position: 'absolute',
                    left: '20px',
                    top: '20px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: event.color,
                    boxShadow: `0 0 15px ${event.color}`,
                    zIndex: 1
                  }} />
                  
                  <InfoCard
                    title={`${event.epoch} · ${event.name}`}
                    subtitle={`${event.event} · ${event.year}`}
                    glowColor={event.color.replace('#', '')}
                    onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${event.color}, ${event.color}88)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        flexShrink: 0
                      }}>
                        {event.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: event.color }}>
                            历史影响度
                          </span>
                          <div style={{ flex: 1 }}>
                            <ProgressBar value={event.impact / 100} color={getImpactColor(event.impact)} height={6} />
                          </div>
                          <span style={{ fontSize: '0.8rem', color: getImpactColor(event.impact), fontWeight: 'bold' }}>
                            {event.impact}%
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.85)', margin: 0 }}>
                          {event.significance}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                          {event.keyFigures.map((f, i) => (
                            <span key={i} style={{
                              fontSize: '0.7rem',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              background: `${event.color}22`,
                              color: event.color
                            }}>
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedEvent === event.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(180, 180, 190, 0.1)' }}>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.85)', lineHeight: 1.8, marginBottom: '1rem' }}>
                              {event.detail}
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                              <div>
                                <div style={{ fontWeight: 'bold', color: event.color, marginBottom: '0.5rem', fontSize: '0.8rem' }}>🌊 历史后果</div>
                                {event.consequences.map((c, i) => (
                                  <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {c}</div>
                                ))}
                              </div>
                              <div>
                                <div style={{ fontWeight: 'bold', color: event.color, marginBottom: '0.5rem', fontSize: '0.8rem' }}>💡 历史教训</div>
                                {event.lessons.map((l, i) => (
                                  <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {l}</div>
                                ))}
                              </div>
                              <div>
                                <div style={{ fontWeight: 'bold', color: event.color, marginBottom: '0.5rem', fontSize: '0.8rem' }}>📜 史家名言</div>
                                {event.keyQuotes.map((q, i) => (
                                  <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)', fontStyle: 'italic' }}>"{q}"</div>
                                ))}
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
        </div>
      </SubPageSection>

      <SubPageSection title="洪荒纪元">
        <FilterBar
          data={ERAS}
          onFiltered={handleEraFilter}
          options={eraFilters}
          placeholder="搜索纪元名称、特点、大事..."
        />

        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <AnimatePresence>
            {filteredEras.map((era, index) => (
              <motion.div key={era.id} layout>
                <InfoCard
                  title={era.name}
                  subtitle={`${era.duration} · ${era.ending}`}
                  glowColor={era.color.replace('#', '')}
                  onClick={() => setExpandedEra(expandedEra === era.id ? null : era.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${era.color}, ${era.color}88)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0
                    }}>
                      {era.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.7)', marginBottom: '0.25rem' }}>
                        第{era.startYear}元会 - 第{era.endYear}元会
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.85)', margin: 0 }}>
                        {era.description}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedEra === era.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(180, 180, 190, 0.1)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                              <div style={{ fontWeight: 'bold', color: era.color, marginBottom: '0.5rem', fontSize: '0.8rem' }}>📌 重大事件</div>
                              {era.majorEvents.map((e, i) => (
                                <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {e}</div>
                              ))}
                            </div>
                            <div>
                              <div style={{ fontWeight: 'bold', color: era.color, marginBottom: '0.5rem', fontSize: '0.8rem' }}>✨ 时代特征</div>
                              {era.characteristics.map((c, i) => (
                                <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.75)' }}>• {c}</div>
                              ))}
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
    </SubPageTemplate>
  )
}
