'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

interface TotemSpirit {
  name: string
  level: number
  domain: string
  power: number
  believers: number
  feature: string
  desc: string
  detail: string
  ritual: string
  sacrifice: string
  color: string
  icon: string
}

interface BelieverState {
  faith: number
  spirit: string
  level: number
  blessings: string[]
  visions: number
}

const TOTEM_SPIRITS: TotemSpirit[] = [
  {
    name: '狼神',
    level: 9,
    domain: '草原',
    power: 95,
    believers: 300000,
    feature: '草原之王，战神化身',
    desc: '草原民族至高信仰，勇猛、忠诚、团队精神的象征。',
    detail: '狼神是北方草原民族的至高图腾，代表着勇猛、智慧和团队精神。传说狼神是天狼星下凡，统领着百万狼军，守护着草原的安宁。每一个草原勇士都相信，战死的勇士灵魂会被狼神接引，成为天上的狼星。',
    ritual: '月圆之夜，围篝火学狼嚎，跳战舞',
    sacrifice: '牛羊血酒、敌人首级',
    color: '#6366f1',
    icon: '🐺'
  },
  {
    name: '熊神',
    level: 8,
    domain: '森林',
    power: 92,
    believers: 250000,
    feature: '森林霸主，力量象征',
    desc: '山林民族的守护神，力量、勇气、重生的象征。',
    detail: '熊神是北方山林民族的至高信仰，代表着无穷的力量和勇气。传说熊神每年冬天死去，春天复活，象征着重生和永恒。每一个部落勇士成年时，都必须独自猎熊，获得熊神的祝福。',
    ritual: '冬眠结束时的熊舞大典',
    sacrifice: '蜂蜜、野果、猎获第一熊',
    color: '#78716c',
    icon: '🐻'
  },
  {
    name: '鹰神',
    level: 9,
    domain: '天空',
    power: 94,
    believers: 400000,
    feature: '天神使者，洞察万物',
    desc: '萨满教最高神使，连接天地的桥梁。',
    detail: '鹰神是天神的使者，是萨满能与上天沟通的媒介。传说鹰神的眼睛能看透世间一切虚妄，能看见过去未来。每一代大萨满飞升时，都会有巨鹰从天而降，接引萨满的灵魂前往天界。',
    ritual: '神山之巅的鹰祭大典',
    sacrifice: '白鹿心、高山泉水',
    color: '#f59e0b',
    icon: '🦅'
  },
  {
    name: '蛇神',
    level: 8,
    domain: '大地',
    power: 90,
    believers: 350000,
    feature: '地底之主，生命轮回',
    desc: '远古生殖崇拜，蜕皮象征重生。',
    detail: '蛇神是最古老的图腾之一，象征着生命、智慧和重生。蛇蜕皮的特性被先民视为不死和重生的象征。传说蛇神居住在大地深处，守护着生命之树的树根，掌握着所有生命的秘密。',
    ritual: '春祭蛇舞，祈求子嗣和丰收',
    sacrifice: '五色土、五谷、玉器',
    color: '#22c55e',
    icon: '🐍'
  },
  {
    name: '狐神',
    level: 7,
    domain: '灵异',
    power: 88,
    believers: 200000,
    feature: '通灵妖狐，魅惑神通',
    desc: '妖异之美，通灵之能，千年修行。',
    detail: '狐神是最具灵性的图腾，传说狐每百年修出一尾，千年之后九尾圆满，化为人形。狐神精通幻术和魅惑，能让人看到心中最渴望的景象。它们亦正亦邪，全凭心性行为。',
    ritual: '月圆之夜狐仙庙祈福',
    sacrifice: '鲜果、美酒、胭脂水粉',
    color: '#ec4899',
    icon: '🦊'
  },
  {
    name: '虎神',
    level: 9,
    domain: '山林',
    power: 96,
    believers: 450000,
    feature: '山君至尊，百兽之王',
    desc: '南方山地民族至高战神，辟邪驱凶。',
    detail: '虎神是百兽之王，是南方山地民族的战神和保护神。传说虎神一出，万兽臣服，一切邪祟退避。每一个山地勇士都以纹身为荣，虎纹越深，代表虎神的祝福越强。',
    ritual: '猎虎大典，虎皮战舞',
    sacrifice: '野猪、鹿、敌人左耳',
    color: '#f97316',
    icon: '🐯'
  },
  {
    name: '蛙神',
    level: 6,
    domain: '雨水',
    power: 82,
    believers: 150000,
    feature: '雷神之子，雨水之主',
    desc: '南方稻作民族，祈求风调雨顺。',
    detail: '蛙神是雷神之子，是雨水的主宰。南方稻作民族相信，蛙鸣是在召唤雷神降雨。每年插秧之后，蛙祭是最重要的仪式，蛙声越大，预示着收成越好。',
    ritual: '蛙婆节，唱蛙歌，跳蛙舞',
    sacrifice: '糯米饭、五色蛋',
    color: '#10b981',
    icon: '🐸'
  },
  {
    name: '龟神',
    level: 8,
    domain: '长寿',
    power: 89,
    believers: 280000,
    feature: '水神信使，预知吉凶',
    desc: '长寿象征，承载天地，占卜未来。',
    detail: '龟神是水族之长，是长寿和智慧的象征。传说龟背承载着天地秘密，龟甲上的纹理能预示吉凶。远古先王每有大事，必定灼龟甲占卜，观裂纹而知天命。',
    ritual: '龟甲占卜大典',
    sacrifice: '美玉、朱砂、美酒',
    color: '#3b82f6',
    icon: '🐢'
  }
]

const FAITH_LEVELS = ['凡夫', '信徒', '祭司', '萨满', '大巫']
const BLESSING_TYPES = [
  '狼神之力 · 战力 +20%',
  '熊神之躯 · 体魄 +30%',
  '鹰神之眼 · 洞察 +50%',
  '蛇神之智 · 智慧 +25%',
  '狐神之魅 · 魅力 +40%'
]

export default function JingShenPage() {
  const [selectedDomain, setSelectedDomain] = useState('全部')
  const [selectedSpirit, setSelectedSpirit] = useState<TotemSpirit | null>(null)
  const [believer, setBeliever] = useState<BelieverState>({
    faith: 15,
    spirit: '寻道中...',
    level: 0,
    blessings: [],
    visions: 0
  })

  const domains = ['全部', '草原', '森林', '天空', '大地', '山林', '雨水']

  const filteredSpirits = selectedDomain === '全部' 
    ? TOTEM_SPIRITS 
    : TOTEM_SPIRITS.filter(s => s.domain === selectedDomain)

  const meditate = useCallback(() => {
    const gain = Math.floor(Math.random() * 12) + 5
    const newFaith = Math.min(100, believer.faith + gain)
    const newLevel = Math.min(4, Math.floor(newFaith / 20))
    const hadVision = Math.random() < 0.08
    
    const newBlessings = [...believer.blessings]
    if (Math.random() < 0.15 && believer.blessings.length < 3) {
      const blessing = BLESSING_TYPES[Math.floor(Math.random() * BLESSING_TYPES.length)]
      if (!newBlessings.includes(blessing)) {
        newBlessings.push(blessing)
      }
    }

    setBeliever({
      faith: newFaith,
      spirit: newFaith >= 80 ? '图腾附体！' : newFaith >= 60 ? '神人感应' : newFaith >= 40 ? '心有灵犀' : '凡心未定',
      level: newLevel,
      blessings: newBlessings,
      visions: believer.visions + (hadVision ? 1 : 0)
    })
  }, [believer])

  return (
    <SubPageTemplate
      title="图腾信仰"
      subtitle="万物有灵，自然崇拜，图腾祭祀"
      icon="👁️"
      colorRgb="168, 85, 247"
      parentPath="/huang2"
    >
      <SubPageSection title="🏛️ 信仰修炼模拟器">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="lg:col-span-2"
            style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '16px'
            }}
            whileHover={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)' }}
          >
            <div className="text-center mb-6">
              <motion.div 
                className="text-6xl mb-4"
                animate={{ 
                  scale: [1, 1.1, 1],
                  filter: believer.visions > 0 ? ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] : 'none'
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                👁️‍🗨️
              </motion.div>
              <h3 style={{ color: '#a855f7', marginBottom: '0.5rem' }}>
                {believer.spirit}
              </h3>
              <p className="text-sm opacity-70">
                信仰等级：{FAITH_LEVELS[believer.level]} · 
                天眼洞察 {believer.visions} 次 · 
                获得 {believer.blessings.length} 个神恩
              </p>
            </div>

            <ProgressBar 
              label="虔诚度" 
              value={believer.faith} 
              max={100}
              colorRgb="168, 85, 247" 
            />

            {believer.blessings.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {believer.blessings.map((b, i) => (
                  <motion.span 
                    key={i}
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(168, 85, 247, 0.15)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      color: '#c084fc'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    ✨ {b}
                  </motion.span>
                ))}
              </div>
            )}

            <div className="mt-6 text-center">
              <motion.button
                onClick={meditate}
                style={{
                  padding: '1rem 3rem',
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.1) 100%)',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  borderRadius: '30px',
                  color: '#e9d5ff',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontFamily: 'ZCOOL XiaoWei, serif',
                  letterSpacing: '0.2em'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                🧘 冥想感应
              </motion.button>
              <p className="text-xs opacity-50 mt-3">
                进入冥想状态，尝试与图腾神灵建立感应...
              </p>
            </div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: '当前信仰', value: `${believer.faith}%`, icon: '💫' },
              { label: '等级称号', value: FAITH_LEVELS[believer.level], icon: '🎖️' },
              { label: '神恩数量', value: believer.blessings.length.toString(), icon: '🎁' },
              { label: '天眼次数', value: believer.visions.toString(), icon: '👁️' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                style={{
                  padding: '1rem',
                  background: 'rgba(168, 85, 247, 0.05)',
                  border: '1px solid rgba(168, 85, 247, 0.1)',
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
                <span style={{ color: '#a855f7', fontWeight: 600 }}>{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SubPageSection>

      <SubPageSection title="📋 图腾神灵百科">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedDomain === domain ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedDomain === domain ? '#c084fc' : '#a8a8a8',
                transition: 'all 0.2s ease',
                border: selectedDomain === domain ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid transparent',
              }}
            >
              {domain}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <AnimatePresence>
            {filteredSpirits.map((spirit, i) => (
              <motion.div
                key={spirit.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <InfoCard
                  title={`${spirit.icon} ${spirit.name}`}
                  subtitle={`Lv.${spirit.level} ${spirit.domain}守护神`}
                  feature={spirit.feature}
                  desc={spirit.desc}
                  detail={spirit.detail}
                  colorRgb={spirit.color.slice(4).replace(')', '').split(', ').map(Number).join(', ')}
                  tags={[`神力 ${spirit.power}`, `${spirit.believers.toLocaleString()} 信徒`]}
                  expandable
                  expandedContent={
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                      <p><strong>祭祀仪式：</strong>{spirit.ritual}</p>
                      <p><strong>献祭贡品：</strong>{spirit.sacrifice}</p>
                    </div>
                  }
                  onClick={() => setSelectedSpirit(spirit)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SubPageSection>

      <SubPageSection title="📜 信仰修行境界">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { name: '凡夫', faith: '0-20', feature: '未开灵智', desc: '只知敬畏，不知感应', icon: '👤' },
            { name: '信徒', faith: '20-40', feature: '心有所感', desc: '偶尔能感受到神灵注视', icon: '🙏' },
            { name: '祭司', faith: '40-60', feature: '主持祭祀', desc: '能在仪式中传达神谕', icon: '⛪' },
            { name: '萨满', faith: '60-80', feature: '灵魂出窍', desc: '魂游天界，面见诸神', icon: '🧙' },
            { name: '大巫', faith: '80-100', feature: '图腾附体', desc: '神灵降世，言出法随', icon: '👁️‍🗨️' }
          ].map((level, i) => (
            <motion.div
              key={level.name}
              style={{
                padding: '1.5rem',
                background: believer.level >= i 
                  ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.05) 100%)'
                  : 'rgba(0, 0, 0, 0.1)',
                border: believer.level >= i 
                  ? '1px solid rgba(168, 85, 247, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                textAlign: 'center'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-4xl mb-2">{level.icon}</div>
              <h4 style={{ 
                color: believer.level >= i ? '#a855f7' : 'inherit',
                marginBottom: '0.25rem' 
              }}>
                {level.name}
              </h4>
              <p className="text-xs opacity-50 mb-1">{level.faith} 虔诚度</p>
              <p className="text-sm font-semibold">{level.feature}</p>
              <p className="text-xs opacity-60 mt-1">{level.desc}</p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
