'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function LunhuiPage() {
  const [selectedPath, setSelectedPath] = useState<number | null>(null)
  const [nidanaIndex, setNidanaIndex] = useState(0)

  const sixPaths = [
    {
      name: '天道',
      sanskrit: 'Deva',
      level: 1,
      position: '最上',
      suffering: 5,
      happiness: 95,
      lifespan: '500 - 84000大劫',
      population: '无量诸天',
      rebirthCause: '上品十善，兼修禅定，布施持戒',
      ruler: '帝释天、大梵天王',
      feature: '乐多苦少，身有光明，衣食自然',
      danger: '五衰相现，福报享尽还堕',
      heavenTypes: ['欲界六天', '色界十八天', '无色界四天'],
      fallReason: '耽著乐境，不修功德，我慢贡高',
      color: '#fbbf24',
      icon: '👼'
    },
    {
      name: '阿修罗道',
      sanskrit: 'Asura',
      level: 2,
      position: '须弥山侧',
      suffering: 40,
      happiness: 60,
      lifespan: '1000 - 10000年',
      population: '无数修罗众',
      rebirthCause: '下品十善，多嗔恚，慢心，猜忌',
      ruler: '毗摩质多罗',
      feature: '有天福无天德，神通自在而多斗争',
      danger: '战争不断，嗔火烧心',
      heavenTypes: ['卵生', '胎生', '湿生', '化生'],
      fallReason: '常与诸天战斗，胜者伤，败者死',
      color: '#ef4444',
      icon: '⚔️'
    },
    {
      name: '人道',
      sanskrit: 'Manusya',
      level: 3,
      position: '四大部洲',
      suffering: 50,
      happiness: 50,
      lifespan: '10岁 - 84000岁',
      population: '七十亿众生',
      rebirthCause: '中品十善，守五戒，知惭有愧',
      ruler: '人王君主',
      feature: '苦乐参半，佛出人间，修道最易',
      danger: '八难障道，退转多进少',
      heavenTypes: ['东胜神洲', '南赡部洲', '西牛贺洲', '北俱卢洲'],
      fallReason: '五浊恶世，造业容易，修道难成',
      color: '#22c55e',
      icon: '👤'
    },
    {
      name: '畜生道',
      sanskrit: 'Tiryagyoni',
      level: 4,
      position: '水陆空行',
      suffering: 75,
      happiness: 25,
      lifespan: '刹那 - 数百年',
      population: '无量众生',
      rebirthCause: '愚痴邪见，贪欲杀盗，毁犯禁戒',
      ruler: '龙、金翅鸟、兽王',
      feature: '披毛戴角，鳞甲羽毛，吞啖为命',
      danger: '弱肉强食，任人宰杀',
      heavenTypes: ['水居', '陆行', '空飞', '穴处'],
      fallReason: '累劫畜生，难得出离',
      color: '#78716c',
      icon: '🐄'
    },
    {
      name: '饿鬼道',
      sanskrit: 'Preta',
      level: 5,
      position: '阎罗世界',
      suffering: 90,
      happiness: 10,
      lifespan: '数百年 - 数万年',
      population: '恒河沙数',
      rebirthCause: '悭贪不舍，嫉妒谄曲，不施不予',
      ruler: '阎罗王、焰口鬼王',
      feature: '常饥常渴，不闻浆水之名',
      danger: '腹大如山，咽细如针，昼隐夜显',
      heavenTypes: ['无财鬼', '少财鬼', '多财鬼'],
      fallReason: '劫数不尽，难遇救度',
      color: '#6b7280',
      icon: '👻'
    },
    {
      name: '地狱道',
      sanskrit: 'Naraka',
      level: 6,
      position: '铁围山间',
      suffering: 100,
      happiness: 0,
      lifespan: '1劫 - 无量劫',
      population: '不可称计',
      rebirthCause: '五逆十恶，诽谤三宝，极重罪业',
      ruler: '阎罗天子、地狱诸王',
      feature: '纯苦无乐，昼夜受刑，死而复生',
      danger: '一日万死万生，无有间断',
      heavenTypes: ['八寒地狱', '八热地狱', '孤独地狱', '无间地狱'],
      fallReason: '罪毕乃出，余业复堕',
      color: '#7f1d1d',
      icon: '🔥'
    }
  ]

  const twelveNidanas = [
    {
      name: '无明',
      pali: 'Avijjā',
      position: 1,
      meaning: '痴暗之心，体无慧明',
      effect: '即一切惑业之根本',
      time: '过去因',
      detail: '不了知四谛、十二因缘、因果业报之真理。',
      breakthrough: '智慧光明',
      color: '#374151'
    },
    {
      name: '行',
      pali: 'Saṅkhāra',
      position: 2,
      meaning: '造作之心，依惑造业',
      effect: '即身口意所作之善恶业',
      time: '过去因',
      detail: '由无明故，起诸造作，感召未来之果报。',
      breakthrough: '正行清净',
      color: '#44403c'
    },
    {
      name: '识',
      pali: 'Viññāṇa',
      position: 3,
      meaning: '了别之心，托胎投胎',
      effect: '即业识初入胎时',
      time: '现在果',
      detail: '以过去业因，致心识初托母胎，纳想为胎。',
      breakthrough: '正知正见',
      color: '#78350f'
    },
    {
      name: '名色',
      pali: 'Nāmarūpa',
      position: 4,
      meaning: '心色和合，五蕴初成',
      effect: '即精神与物质结合',
      time: '现在果',
      detail: '识在胎中，五蕴之体渐渐生长之位。',
      breakthrough: '身心自在',
      color: '#7c2d12'
    },
    {
      name: '六入',
      pali: 'Salāyatana',
      position: 5,
      meaning: '六根成就，将出胎时',
      effect: '即眼耳鼻舌身意具足',
      time: '现在果',
      detail: '在胎中成就六根，为出生后接触外境做准备。',
      breakthrough: '六根清净',
      color: '#7f1d1d'
    },
    {
      name: '触',
      pali: 'Phassa',
      position: 6,
      meaning: '根境识合，初生接触',
      effect: '即出胎后接触外境',
      time: '现在果',
      detail: '出胎后六根接触六尘，生起单纯的知觉作用。',
      breakthrough: '触境无心',
      color: '#991b1b'
    },
    {
      name: '受',
      pali: 'Vedanā',
      position: 7,
      meaning: '领纳前境，苦乐感受',
      effect: '即接收外境之感受',
      time: '现在果',
      detail: '领纳顺违等境，于顺情境起乐受，违情境起苦受。',
      breakthrough: '受而无受',
      color: '#b91c1c'
    },
    {
      name: '爱',
      pali: 'Taṇhā',
      position: 8,
      meaning: '耽染前境，贪爱追求',
      effect: '即于乐境起贪爱',
      time: '现在因',
      detail: '对所受之境生起染著贪爱，乃造业之原动力。',
      breakthrough: '离贪爱欲',
      color: '#dc2626'
    },
    {
      name: '取',
      pali: 'Upādāna',
      position: 9,
      meaning: '追求执取，驰求不息',
      effect: '即执取贪欲',
      time: '现在因',
      detail: '由爱增长，于诸境界生取著心，广泛造业。',
      breakthrough: '取舍两忘',
      color: '#ea580c'
    },
    {
      name: '有',
      pali: 'Bhava',
      position: 10,
      meaning: '业力成熟，引后有果',
      effect: '即来世果报已成熟',
      time: '现在因',
      detail: '由驰求故，业力充实，能引未来当来之果。',
      breakthrough: '妙有真空',
      color: '#d97706'
    },
    {
      name: '生',
      pali: 'Jāti',
      position: 11,
      meaning: '还当受生，未来受身',
      effect: '即再来投胎受生',
      time: '未来果',
      detail: '以现在有业为因，招来世于六道中受生。',
      breakthrough: '证无生忍',
      color: '#a16207'
    },
    {
      name: '老死',
      pali: 'Jarāmaraṇa',
      position: 12,
      meaning: '身坏命终，迁流不息',
      effect: '即生已坏灭',
      time: '未来果',
      detail: '既有生，则身衰为老，身坏为死，忧悲苦恼。',
      breakthrough: '了脱生死',
      color: '#854d0e'
    }
  ]

  const liberationMethods = [
    {
      name: '声闻乘',
      root: '观四谛',
      stages: '四向四果',
      goal: '证阿罗汉果',
      time: '三生至六十劫',
      feature: '观苦集灭道，断见思惑',
      liberation: '分段生死',
      color: '#3b82f6',
      icon: '🔔'
    },
    {
      name: '缘觉乘',
      root: '观十二因缘',
      stages: '辟支佛',
      goal: '证独觉菩提',
      time: '百劫至千劫',
      feature: '无师自悟，观因缘性空',
      liberation: '同证无生',
      color: '#8b5cf6',
      icon: '🌸'
    },
    {
      name: '菩萨乘',
      root: '发菩提心',
      stages: '五十二位',
      goal: '成无上佛道',
      time: '三大阿僧祇劫',
      feature: '六度万行，自利利他',
      liberation: '变易生死',
      color: '#ec4899',
      icon: '🌿'
    },
    {
      name: '净土门',
      root: '信愿持名',
      stages: '九品莲花',
      goal: '往生极乐世界',
      time: '一生至十念',
      feature: '仰仗佛力，带业往生',
      liberation: '横超三界',
      color: '#f59e0b',
      icon: '🪷'
    }
  ]

  const karmicSeeds = [
    { name: '杀生', weight: -100, effect: '短命多病', realm: '地狱/畜生', color: '#7f1d1d' },
    { name: '偷盗', weight: -80, effect: '贫穷困苦', realm: '饿鬼/畜生', color: '#991b1b' },
    { name: '邪淫', weight: -70, effect: '眷属不贞', realm: '畜生/饿鬼', color: '#b91c1c' },
    { name: '妄语', weight: -60, effect: '被人诽谤', realm: '三恶道', color: '#dc2626' },
    { name: '两舌', weight: -50, effect: '眷属离散', realm: '三恶道', color: '#ea580c' },
    { name: '恶口', weight: -55, effect: '常闻恶声', realm: '三恶道', color: '#d97706' },
    { name: '绮语', weight: -40, effect: '言无人信', realm: '三恶道', color: '#ca8a04' },
    { name: '悭贪', weight: -75, effect: '所求不遂', realm: '饿鬼道', color: '#a16207' },
    { name: '嗔恚', weight: -85, effect: '常生忿怒', realm: '地狱/修罗', color: '#854d0e' },
    { name: '邪见', weight: -95, effect: '愚痴无明', realm: '畜生道', color: '#78716c' },
    { name: '布施', weight: 80, effect: '大富大贵', realm: '人天善道', color: '#22c55e' },
    { name: '持戒', weight: 90, effect: '容貌端正', realm: '人天善道', color: '#06b6d4' },
    { name: '忍辱', weight: 70, effect: '人见钦敬', realm: '人天善道', color: '#0ea5e9' },
    { name: '精进', weight: 75, effect: '有大威力', realm: '人天善道', color: '#3b82f6' },
    { name: '禅定', weight: 95, effect: '心常安定', realm: '色界诸天', color: '#6366f1' },
    { name: '般若', weight: 100, effect: '智慧光明', realm: '出离三界', color: '#8b5cf6' }
  ]

  return (
    <SubPageTemplate
      title="六道轮回"
      subtitle="因果不虚 · 业力牵引 · 十二因缘 · 流转不息"
      icon="♻️"
      colorRgb="192, 132, 252"
    >
      <InfoCard>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {[
            { value: '6', label: '轮回道途', color: '#c084fc', icon: '🔄' },
            { value: '12', label: '因缘次第', color: '#a78bfa', icon: '⛓️' },
            { value: '4', label: '解脱法门', color: '#8b5cf6', icon: '🛕' },
            { value: '∞', label: '流转劫数', color: '#7c3aed', icon: '⏳' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.9rem', color: 'rgba(180, 180, 190, 0.7)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </InfoCard>

      <SubPageSection title="六道实相">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            三界众生，轮回六趣，如旋火轮。从无明生行，行生识，识生名色，
            名色生六入，六入生触，触生受，受生爱，爱生取，取生有，有生生，生老死忧悲苦恼。
            一切众生，自作自受。为善则升，为恶则堕。如车轮转，无有休息。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            <strong style={{ color: '#a855f7' }}>欲知前世因，今生受者是；欲知来世果，今生作者是。</strong>
            是以圣人设教，令人知因果可畏，修善去恶，求解脱道。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="六道详解">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
          {sixPaths.map((path, index) => (
            <motion.div
              key={path.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -3, scale: 1.01 }}
              onClick={() => setSelectedPath(selectedPath === index ? null : index)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                background: `linear-gradient(90deg, ${path.color}, transparent)`
              }} />
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem', marginRight: '0.75rem' }}>{path.icon}</span>
                <div>
                  <h3 style={{ color: path.color, fontSize: '1.1rem' }}>{path.name}</h3>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                    {path.sanskrit} · {path.position}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#ef4444' }}>苦</span>
                  <span style={{ color: '#22c55e' }}>乐</span>
                </div>
                <div style={{
                  height: '6px', borderRadius: '3px',
                  background: 'linear-gradient(90deg, #ef4444, #22c55e)',
                  position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute', width: '10px', height: '10px',
                    background: 'white', borderRadius: '50%', top: '-2px',
                    left: `${path.suffering}%`, transform: 'translateX(-50%)',
                    boxShadow: '0 0 8px white'
                  }} />
                </div>
              </div>

              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                marginBottom: '0.75rem'
              }}>
                {path.feature}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.7rem' }}>
                <div style={{ background: 'rgba(180, 180, 190, 0.05)', padding: '0.5rem', borderRadius: '4px' }}>
                  <div style={{ color: 'rgba(180, 180, 190, 0.5)' }}>寿量</div>
                  <div style={{ color: path.color }}>{path.lifespan}</div>
                </div>
                <div style={{ background: 'rgba(180, 180, 190, 0.05)', padding: '0.5rem', borderRadius: '4px' }}>
                  <div style={{ color: 'rgba(180, 180, 190, 0.5)' }}>受生因</div>
                  <div style={{ color: path.color, fontSize: '0.65rem' }}>{path.rebirthCause.slice(0, 10)}...</div>
                </div>
              </div>

              {selectedPath === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(180, 180, 190, 0.1)' }}
                >
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)', marginBottom: '0.25rem' }}>分类</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {path.heavenTypes.map((t, i) => (
                        <span key={i} style={{
                          padding: '0.15rem 0.5rem', borderRadius: '10px', fontSize: '0.65rem',
                          background: `${path.color}20`, color: path.color
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)', marginBottom: '0.25rem' }}>堕落险处</div>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(239, 68, 68, 0.8)' }}>{path.danger}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="十二因缘流转">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            十二因缘者，众生三世因果之总相也。过去二因，现在五果；现在三因，未来二果。
            如是展转，十二法相生，故名十二因缘。
          </p>

          <div style={{ position: 'relative', height: '100px', marginBottom: '1.5rem' }}>
            <svg viewBox="0 0 800 100" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="nidanaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#374151" />
                  <stop offset="100%" stopColor="#854d0e" />
                </linearGradient>
              </defs>
              <line x1="50" y1="50" x2="750" y2="50" stroke="url(#nidanaGrad)" strokeWidth="3" opacity="0.3" />
              {twelveNidanas.map((n, i) => (
                <g key={n.name}>
                  <circle
                    cx={50 + i * 63.6}
                    cy="50"
                    r={nidanaIndex >= i ? 16 : 12}
                    fill={n.color}
                    opacity={nidanaIndex >= i ? 1 : 0.3}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setNidanaIndex(i)}
                  />
                  <text
                    x={50 + i * 63.6}
                    y="54"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setNidanaIndex(i)}
                  >{n.position}</text>
                </g>
              ))}
            </svg>
          </div>

          <motion.div
            key={nidanaIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              padding: '1.5rem',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${twelveNidanas[nidanaIndex].color}20, transparent)`,
              border: `1px solid ${twelveNidanas[nidanaIndex].color}30`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ color: twelveNidanas[nidanaIndex].color, marginBottom: '0.25rem' }}>
                  {twelveNidanas[nidanaIndex].name}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                  {twelveNidanas[nidanaIndex].pali}
                </span>
              </div>
              <span style={{
                padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem',
                background: twelveNidanas[nidanaIndex].time.includes('因') ?
                  'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                color: twelveNidanas[nidanaIndex].time.includes('因') ? '#ef4444' : '#22c55e'
              }}>{twelveNidanas[nidanaIndex].time}</span>
            </div>
            <p style={{ color: 'rgba(180, 180, 190, 0.8)', marginBottom: '0.75rem' }}>
              {twelveNidanas[nidanaIndex].meaning} —— {twelveNidanas[nidanaIndex].effect}
            </p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(180, 180, 190, 0.7)' }}>
              {twelveNidanas[nidanaIndex].detail}
            </p>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(180, 180, 190, 0.1)' }}>
              <span style={{ color: '#22c55e', fontSize: '0.85rem' }}>
                🔓 解脱关键：{twelveNidanas[nidanaIndex].breakthrough}
              </span>
            </div>
          </motion.div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="业因种子">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '0.75rem' }}>
          {karmicSeeds.map((seed, index) => (
            <motion.div
              key={seed.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.03 }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  color: seed.color,
                  fontWeight: 500
                }}>{seed.name}</span>
                <span style={{
                  fontSize: '0.8rem',
                  color: seed.weight > 0 ? '#22c55e' : '#ef4444'
                }}>{seed.weight > 0 ? '+' : ''}{seed.weight}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.6)' }}>
                果报：{seed.effect}
              </div>
              <div style={{ fontSize: '0.7rem', color: seed.color + 'cc' }}>
                受生：{seed.realm}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="四圣解脱">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
          {liberationMethods.map((method, index) => (
            <motion.div
              key={method.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                background: `linear-gradient(90deg, ${method.color}, transparent)`
              }} />
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem', marginRight: '1rem' }}>{method.icon}</span>
                <div>
                  <h3 style={{ color: method.color }}>{method.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                    根机：{method.root}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>阶位</div>
                  <div style={{ color: method.color }}>{method.stages}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>修行时间</div>
                  <div style={{ color: method.color }}>{method.time}</div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.6 }}>
                {method.feature}
              </p>

              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                borderRadius: '6px',
                background: `${method.color}15`,
                border: `1px solid ${method.color}25`,
                fontSize: '0.85rem',
                color: method.color,
                textAlign: 'center'
              }}>
                🎯 证果：{method.goal} · {method.liberation}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
