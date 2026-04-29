'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

interface DivinationTool {
  id: string
  name: string
  type: string
  level: number
  accuracy: number
  feature: string
  desc: string
  detail: string
  usage: string
  color: string
  icon: string
}

interface DivinationState {
  method: string
  question: string
  result: string | null
  accuracy: number
  totalDiv: number
  correct: number
  history: string[]
}

const TOOLS: DivinationTool[] = [
  {
    id: 'guijia',
    name: '龟甲占卜',
    type: '骨卜',
    level: 9,
    accuracy: 90,
    feature: '灼骨观兆，天命所归',
    desc: '最古老的占卜法，烧龟甲观裂纹断吉凶。',
    detail: '龟甲占卜是太古最正宗的占卜法，取千年神龟之腹甲，祭天之后以炭火灼烧，观其裂纹形状，断天下吉凶。殷商王室每有大事，必定用龟甲占卜，甲骨文便是其记录。传说真正的神龟能通鬼神，所言必中。',
    usage: '取千年龟甲，置炭火上灼之，观其裂纹形状，对照卜辞断吉凶。',
    color: '#78716c',
    icon: '🐢'
  },
  {
    id: 'shicao',
    name: '蓍草占',
    type: '草卜',
    level: 8,
    accuracy: 85,
    feature: '大衍之数，周易正宗',
    desc: '周易标准占卜法，五十根蓍草起卦。',
    detail: '蓍草占是周易的正宗占卜法，取五十根蓍草，按照大衍之数，分二、挂一、揲四、归奇，十八变而成一卦，得六十四卦中之一，对照爻辞断吉凶。孔夫子、周文王都是用此法占卜。',
    usage: '取蓍草五十，其用四十有九，分而为二以象两，挂一以象三，揲之以四以象四时，归奇于扐以象闰。',
    color: '#22c55e',
    icon: '🌿'
  },
  {
    id: 'tongqian',
    name: '金钱卦',
    type: '钱卜',
    level: 6,
    accuracy: 75,
    feature: '简易快捷，六爻预测',
    desc: '三枚铜钱摇六次，成卦断事。',
    detail: '金钱卦相传为鬼谷子所创，用三枚铜钱（一般为乾隆通宝），合于掌心，默念所问之事，摇动后抛下，观其正反，六次而成一卦。此法简单易行，是民间最常用的占卜法。',
    usage: '三枚铜钱放于掌心，集中精神默念所问之事，摇动后抛出，记录正反，共摇六次，自下而上成卦。',
    color: '#fbbf24',
    icon: '🪙'
  },
  {
    id: 'zhanxing',
    name: '星占',
    type: '天文',
    level: 9,
    accuracy: 95,
    feature: '观星望气，知天运',
    desc: '夜观星象，断天下兴亡，人事吉凶。',
    detail: '星占是皇家之学，夜观天象，看日月五星运行，二十八宿变化，断天下兴亡，王朝更替，人事吉凶。古代的太史令、钦天监都是干这个的。诸葛亮借东风、李淳风推背图，都是星占的极致。',
    usage: '于高台之上，夜观天象，察日月五星之运行，二十八宿之变动，对照星经断大事。',
    color: '#3b82f6',
    icon: '⭐'
  },
  {
    id: 'xiangmian',
    name: '相术',
    type: '相人',
    level: 7,
    accuracy: 80,
    feature: '察言观色，知天命',
    desc: '相面、相骨、相手，知人一生吉凶。',
    detail: '相术是通过观察人的面貌、五官、骨骼、气色、体态、手纹等，推测人的吉凶祸福、贵贱夭寿。古代著名的相士如许负、袁天罡、李淳风，都曾准确预言过帝王将相的命运。',
    usage: '观其形貌，察其气色，听其声音，摸其骨相，对照相书，断其吉凶祸福。',
    color: '#a855f7',
    icon: '👁️'
  },
  {
    id: 'fengshui',
    name: '风水堪舆',
    type: '地理',
    level: 8,
    accuracy: 85,
    feature: '寻龙点穴，定阴阳',
    desc: '相地之术，察龙脉，找风水宝地。',
    detail: '风水又称堪舆、青乌术，是相地之术。看山川形势，察龙脉走向，寻龙点穴，选择阴宅阳宅的最佳位置，以达到趋吉避凶、福荫子孙的目的。郭璞、杨筠松都是风水祖师。',
    usage: '用罗盘定方位，察龙脉走向，看山水形势，辨砂水有情，寻最佳风水宝地。',
    color: '#f97316',
    icon: '🧭'
  },
  {
    id: 'mengzhan',
    name: '梦占',
    type: '通灵',
    level: 7,
    accuracy: 70,
    feature: '夜梦通神，预兆吉凶',
    desc: '解析梦境，预知祸福。',
    detail: '梦占是通过解析梦境来预测吉凶的方法。古人认为梦是神灵的启示，是人与鬼神沟通的方式。《周公解梦》便是集梦占之大成的著作。传说周文王梦见飞熊入梦，果然得到姜子牙。',
    usage: '记录梦境详细内容，对照解梦典籍，结合做梦者的身份、时节，断其预兆。',
    color: '#7c3aed',
    icon: '💭'
  },
  {
    id: 'jigu',
    name: '鸡骨卜',
    type: '骨卜',
    level: 5,
    accuracy: 65,
    feature: '蛮夷古法，简易直接',
    desc: '杀雄鸡取胫骨，观裂纹断事。',
    detail: '鸡骨卜是南方蛮族的古法，取健壮雄鸡，祭祀之后杀死，取其两根胫骨，对照其裂纹形状和位置断吉凶。此法虽然简陋，但在蛮族中极为灵验，大事小情都要用鸡骨占卜。',
    usage: '取健壮雄鸡，祭祀后宰杀，煮熟取其胫骨，对照裂纹形状、位置、深浅断吉凶。',
    color: '#ef4444',
    icon: '🐔'
  }
]

const TYPES = ['全部', '骨卜', '草卜', '钱卜', '天文', '相人', '地理', '通灵']

export default function ToolsPage() {
  const [selectedType, setSelectedType] = useState('全部')
  const [divState, setDivState] = useState<DivinationState>({
    method: '等待选择',
    question: '',
    result: null,
    accuracy: 75,
    totalDiv: 0,
    correct: 0,
    history: []
  })
  const [divining, setDivining] = useState(false)

  const filtered = selectedType === '全部'
    ? TOOLS
    : TOOLS.filter(t => t.type === selectedType)

  const divinate = useCallback((tool: DivinationTool) => {
    setDivining(true)
    setDivState({ ...divState, method: tool.name, result: null })

    setTimeout(() => {
      const results = [
        '大吉！元亨利贞，无往不利',
        '吉！所求皆遂，心想事成',
        '平！守旧待时，不宜妄动',
        '凶！小人当道，诸事不宜',
        '大凶！诸事不顺，宜静守'
      ]
      const result = results[Math.floor(Math.random() * results.length)]
      
      setDivState({
        ...divState,
        method: tool.name,
        result,
        totalDiv: divState.totalDiv + 1,
        history: [`🔮 用${tool.name}占卜 - ${result}`, ...divState.history].slice(0, 5)
      })
      setDivining(false)
    }, 2500)
  }, [divState])

  return (
    <SubPageTemplate
      title="巫卜工具"
      subtitle="太古祭祀，巫卜法器，蛮荒工具"
      icon="🛠️"
      colorRgb="120, 113, 108"
      parentPath="/huang2"
    >
      <SubPageSection title="🔮 太古占卜模拟器">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="lg:col-span-2"
            style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(120, 113, 108, 0.15) 0%, rgba(0, 0, 0, 0.2) 100%)',
              border: '1px solid rgba(120, 113, 108, 0.2)',
              borderRadius: '16px',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <div className="text-center mb-6">
              <motion.div 
                className="text-6xl mb-4"
                animate={divining ? {
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                } : {
                  scale: [1, 1.03, 1]
                }}
                transition={{ duration: divining ? 0.5 : 3, repeat: Infinity }}
              >
                {divining ? '✨' : '🔮'}
              </motion.div>
              
              <AnimatePresence>
                {divState.result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4"
                  >
                    <p style={{ 
                      color: divState.result.includes('吉') ? '#fbbf24' : 
                             divState.result.includes('凶') ? '#f87171' : '#a5f3fc',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      textShadow: '0 0 20px currentColor'
                    }}>
                      {divState.result}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 style={{ color: '#a8a29e', marginBottom: '0.5rem' }}>
                {divining ? '正在沟通天地鬼神...' : divState.method}
              </h3>
              <p className="text-sm opacity-70">
                占卜 {divState.totalDiv} 次 · 
                当前准确率 {divState.accuracy}%
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {TOOLS.slice(0, 6).map(tool => (
                <motion.button
                  key={tool.id}
                  onClick={() => divinate(tool)}
                  disabled={divining}
                  style={{
                    padding: '0.6rem 1rem',
                    background: divState.method.includes(tool.name)
                      ? 'linear-gradient(135deg, rgba(120, 113, 108, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)'
                      : 'rgba(0, 0, 0, 0.15)',
                    border: divState.method.includes(tool.name)
                      ? '1px solid rgba(168, 162, 158, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '25px',
                    color: divState.method.includes(tool.name) ? '#e7e5e4' : 'rgba(255,255,255,0.5)',
                    fontSize: '0.875rem',
                    cursor: divining ? 'not-allowed' : 'pointer'
                  }}
                  whileHover={!divining ? { scale: 1.05 } : {}}
                  whileTap={!divining ? { scale: 0.95 } : {}}
                >
                  {tool.icon} {tool.name}
                </motion.button>
              ))}
            </div>

            {divState.history.length > 0 && (
              <div className="mt-6 text-sm opacity-60">
                <p className="mb-2">📜 最近占卜记录：</p>
                {divState.history.map((h, i) => (
                  <p key={i} className="text-xs opacity-70">{h}</p>
                ))}
              </div>
            )}
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: '占卜次数', value: divState.totalDiv.toString(), icon: '🔮' },
              { label: '占卜方法', value: divState.method, icon: '📋' },
              { label: '历史记录', value: `${divState.history.length} 条`, icon: '📜' },
              { label: '灵验度', value: `${divState.accuracy}%`, icon: '🎯' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                style={{
                  padding: '1rem',
                  background: 'rgba(120, 113, 108, 0.05)',
                  border: '1px solid rgba(120, 113, 108, 0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{stat.icon}</span>
                  <span className="opacity-70">{stat.label}</span>
                </span>
                <span style={{ color: '#a8a29e', fontWeight: 600 }}>{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SubPageSection>

      <SubPageSection title="📋 太古巫卜工具大全">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedType === type ? 'rgba(120, 113, 108, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedType === type ? '#a8a29e' : '#a8a8a8',
                transition: 'all 0.2s ease',
                border: selectedType === type ? '1px solid rgba(120, 113, 108, 0.5)' : '1px solid transparent',
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <AnimatePresence>
            {filtered.map((tool, i) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <InfoCard
                  title={`${tool.icon} ${tool.name}`}
                  subtitle={`Lv.${tool.level} ${tool.type}`}
                  feature={tool.feature}
                  desc={tool.desc}
                  detail={tool.detail}
                  colorRgb={tool.color.slice(4).replace(')', '').split(', ').map(Number).join(', ')}
                  tags={[`准确率 ${tool.accuracy}%`]}
                  expandable
                  expandedContent={
                    <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                      <strong>使用方法：</strong>{tool.usage}
                    </p>
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
