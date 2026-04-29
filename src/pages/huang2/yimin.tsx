'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

interface Survivor {
  id: string
  name: string
  bloodline: string
  purity: number
  age: string
  power: number
  location: string
  feature: string
  desc: string
  detail: string
  ability: string
  color: string
  icon: string
}

interface LineageState {
  bloodline: string
  purity: number
  awakened: string[]
  level: number
  exp: number
}

const SURVIVORS: Survivor[] = [
  {
    id: 'kuafu',
    name: '夸父族',
    bloodline: '祖巫血脉',
    purity: 85,
    age: '数万年',
    power: 90,
    location: '幽冥深处',
    feature: '巨人血脉，逐日传承',
    desc: '后土后裔，身形巨大，力能扛山。',
    detail: '夸父族是后土娘娘的嫡系后裔，继承了祖巫的巨人血脉，身形高大无比，力量无穷。传说夸父族的先祖曾追逐太阳，渴死之后化为邓林。巫妖大战后，夸父族隐入幽冥深处，守护着地府的入口。',
    ability: '巨人化身、力量无穷、大地感应',
    color: '#92400e',
    icon: '🗿'
  },
  {
    id: 'xingtian',
    name: '刑天族',
    bloodline: '战神血脉',
    purity: 90,
    age: '太古',
    power: 95,
    location: '常羊之山',
    feature: '无头战神，永不屈服',
    desc: '蓐收后裔，以乳为目，以脐为口。',
    detail: '刑天族是金之祖巫蓐收的后裔，继承了战神血脉，永不屈服。先祖刑天与黄帝争神，被斩去头颅，却以乳为目，以脐为口，操干戚以舞。刑天族人隐居多在常羊之山，是巫族最勇猛的战士。',
    ability: '不死之身、战意不灭、双斧狂战',
    color: '#ef4444',
    icon: '⚔️'
  },
  {
    id: 'jiuying',
    name: '九黎族',
    bloodline: '蚩尤血脉',
    purity: 75,
    age: '远古',
    power: 85,
    location: '南疆十万大山',
    feature: '战神后裔，巫蛊传承',
    desc: '蚩尤后裔，善使巫蛊，铜头铁额。',
    detail: '九黎族是蚩尤的嫡系后裔，继承了铜头铁额的战神血脉，善使巫蛊之术。逐鹿之战后，九黎族退入南疆十万大山，与世隔绝，保留了最纯正的巫门传承。如今苗族、土家族等都是其后裔。',
    ability: '铜头铁额、巫蛊神通、战歌加持',
    color: '#78716c',
    icon: '🏔️'
  },
  {
    id: 'shennong',
    name: '神农族',
    bloodline: '人皇血脉',
    purity: 80,
    age: '太古',
    power: 82,
    location: '百草谷',
    feature: '药道始祖，悬壶济世',
    desc: '神农氏后裔，尝百草，传医术。',
    detail: '神农族是人皇神农氏的后裔，继承了尝百草的药道传承，能识别天下万药。神农族人大多隐世不出，在深山中种植灵药，偶尔出世悬壶济世，救死扶伤。中医便是源自神农族的传承。',
    ability: '百草辨识、炼丹制药、起死回生',
    color: '#22c55e',
    icon: '🌿'
  },
  {
    id: 'gonggong',
    name: '共工族',
    bloodline: '水神血脉',
    purity: 70,
    age: '太古',
    power: 88,
    location: '四海深处',
    feature: '水族之王，翻江倒海',
    desc: '水神共工后裔，执掌天下水域。',
    detail: '共工族是水神共工的后裔，继承了执掌水域的神通。共工怒撞不周山后，族人隐入四海深处，建立了水下龙宫，是水族的真正统治者。如今的龙族，不过是他们的臣属。',
    ability: '翻江倒海、呼风唤雨、水中无敌',
    color: '#0ea5e9',
    icon: '🌊'
  },
  {
    id: 'fengbo',
    name: '风伯族',
    bloodline: '风神血脉',
    purity: 65,
    age: '太古',
    power: 80,
    location: '风穴',
    feature: '风之使者，来去无踪',
    desc: '天吴后裔，掌八风消息，通五运气候。',
    detail: '风伯族是风之祖巫天吴的后裔，继承了来去无踪的风神血脉。他们居住在天下各大风穴之中，掌管天下风信，是最神秘的种族。传说要见风伯族人，必须等风来接引。',
    ability: '御风飞行、消息灵通、无形刺杀',
    color: '#06b6d4',
    icon: '💨'
  },
  {
    id: 'yushi',
    name: '雨师族',
    bloodline: '雨神血脉',
    purity: 65,
    age: '太古',
    power: 78,
    location: '雨师国',
    feature: '雨之主宰，润物无声',
    desc: '玄冥后裔，掌管雨水，冰封万里。',
    detail: '雨师族是雨之祖巫玄冥的后裔，掌管天下雨水。他们在昆仑山下建立了雨师国，四季如冬，冰封万里。雨师族人不仅能兴云布雨，还能冰封千里，是巫族中的控场大师。',
    ability: '兴云布雨、冰封万里、水之治愈',
    color: '#3b82f6',
    icon: '🌧️'
  },
  {
    id: 'nx',
    name: '女魃族',
    bloodline: '旱神血脉',
    purity: 95,
    age: '远古',
    power: 92,
    location: '赤水之北',
    feature: '旱神现世，赤地千里',
    desc: '黄帝之女，所到之处大旱三年。',
    detail: '女魃族是黄帝之女女魃的后裔，继承了恐怖的旱神血脉。传说女魃助黄帝战蚩尤，神力用尽无法回天，所居之地天不下雨，赤地千里。女魃族人因此被视为灾星，不得不隐居赤水之北。',
    ability: '赤地千里、火焰免疫、光芒万丈',
    color: '#f97316',
    icon: '☀️'
  }
]

const BLOODLINES = ['全部', '祖巫血脉', '战神血脉', '人皇血脉', '水神血脉']

export default function YiMinPage() {
  const [selectedBloodline, setSelectedBloodline] = useState('全部')
  const [lineage, setLineage] = useState<LineageState>({
    bloodline: '未知',
    purity: 15,
    awakened: [],
    level: 1,
    exp: 0
  })

  const filtered = selectedBloodline === '全部'
    ? SURVIVORS
    : SURVIVORS.filter(s => s.bloodline === selectedBloodline)

  const awaken = useCallback(() => {
    const gain = Math.floor(Math.random() * 10) + 3
    const newPurity = Math.min(100, lineage.purity + gain)
    const bloodlines = ['夸父族巨人', '刑天战意', '九黎巫蛊', '神农药道', '共工控水']
    const success = Math.random() < 0.3
    
    const newAwakened = [...lineage.awakened]
    if (success && lineage.awakened.length < 3) {
      const bl = bloodlines[Math.floor(Math.random() * bloodlines.length)]
      if (!newAwakened.includes(bl)) {
        newAwakened.push(bl)
      }
    }

    setLineage({
      ...lineage,
      purity: newPurity,
      bloodline: newPurity >= 80 ? '纯血后裔' : newPurity >= 50 ? '混血脉裔' : '凡人之躯',
      awakened: newAwakened,
      exp: lineage.exp + 10
    })
  }, [lineage])

  return (
    <SubPageTemplate
      title="洪荒遗民"
      subtitle="上古血脉，巫门之后，洪荒遗种"
      icon="👤"
      colorRgb="6, 182, 212"
      parentPath="/huang2"
    >
      <SubPageSection title="🧬 血脉觉醒模拟器">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="lg:col-span-2"
            style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '16px'
            }}
            whileHover={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.15)' }}
          >
            <div className="text-center mb-6">
              <motion.div 
                className="text-6xl mb-4"
                animate={{ 
                  scale: [1, 1.05, 1],
                  filter: lineage.purity >= 50 ? ['hue-rotate(0deg)', 'hue-rotate(30deg)', 'hue-rotate(0deg)'] : 'none'
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🧬
              </motion.div>
              <h3 style={{ color: '#06b6d4', marginBottom: '0.5rem' }}>
                {lineage.bloodline}
              </h3>
              <p className="text-sm opacity-70">
                血脉纯度: {lineage.purity}% · 
                已觉醒 {lineage.awakened.length} 种天赋 · 
                Lv.{lineage.level}
              </p>
            </div>

            <ProgressBar 
              label="血脉纯度" 
              value={lineage.purity} 
              max={100}
              colorRgb="6, 182, 212" 
            />

            {lineage.awakened.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {lineage.awakened.map((a, i) => (
                  <motion.span 
                    key={i}
                    style={{
                      padding: '0.4rem 1rem',
                      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(124, 58, 237, 0.15) 100%)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#22d3ee'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    ✨ {a}
                  </motion.span>
                ))}
              </div>
            )}

            <div className="mt-6 text-center">
              <motion.button
                onClick={awaken}
                style={{
                  padding: '1rem 3rem',
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(124, 58, 237, 0.2) 100%)',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  borderRadius: '30px',
                  color: '#a5f3fc',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontFamily: 'ZCOOL XiaoWei, serif',
                  letterSpacing: '0.2em'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(6, 182, 212, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                🧬 激活先祖血脉
              </motion.button>
              <p className="text-xs opacity-50 mt-3">
                沟通先祖沉睡的基因，唤醒洪荒血脉中的力量...
              </p>
            </div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: '血脉纯度', value: `${lineage.purity}%`, icon: '🧬' },
              { label: '血脉等级', value: lineage.bloodline, icon: '🏆' },
              { label: '天赋数量', value: lineage.awakened.length.toString(), icon: '⭐' },
              { label: '觉醒等级', value: `Lv.${lineage.level}`, icon: '📈' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                style={{
                  padding: '1rem',
                  background: 'rgba(6, 182, 212, 0.05)',
                  border: '1px solid rgba(6, 182, 212, 0.1)',
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
                <span style={{ color: '#06b6d4', fontWeight: 600 }}>{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SubPageSection>

      <SubPageSection title="📋 洪荒遗民录">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {BLOODLINES.map((bloodline) => (
            <button
              key={bloodline}
              onClick={() => setSelectedBloodline(bloodline)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedBloodline === bloodline ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedBloodline === bloodline ? '#67e8f9' : '#a8a8a8',
                transition: 'all 0.2s ease',
                border: selectedBloodline === bloodline ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid transparent',
              }}
            >
              {bloodline}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <AnimatePresence>
            {filtered.map((survivor, i) => (
              <motion.div
                key={survivor.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <InfoCard
                  title={`${survivor.icon} ${survivor.name}`}
                  subtitle={`${survivor.bloodline} · ${survivor.age}`}
                  feature={survivor.feature}
                  desc={survivor.desc}
                  detail={survivor.detail}
                  colorRgb={survivor.color.slice(4).replace(')', '').split(', ').map(Number).join(', ')}
                  tags={[`神力 ${survivor.power}`, `纯度 ${survivor.purity}%`]}
                  expandable
                  expandedContent={
                    <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                      <strong>天赋神通：</strong>{survivor.ability}
                      <br />
                      <strong>隐居地点：</strong>{survivor.location}
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
