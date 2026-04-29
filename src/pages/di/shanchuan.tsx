'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'


interface Mountain {
  name: string
  rank: string
  altitude: number
  location: string
  dynasty: string
  mythology: string
  energy: number
  feature: string
  famous: string[]
  temples: string[]
  stories: string
  wuyue?: boolean
  direction?: string
  color?: string
}

interface FamousRiver {
  name: string
  length: number
  source: string
  mouth: string
  provinces: string[]
  culture: string
  sacred: boolean
  legends: string[]
}

const FIVE_MOUNTAINS: Mountain[] = [
  {
    name: '东岳泰山',
    rank: '五岳独尊',
    altitude: 1545,
    location: '山东泰安',
    dynasty: '历代封禅',
    mythology: '盘古开天，头化为东岳',
    energy: 100,
    feature: '雄',
    famous: ['玉皇顶', '十八盘', '南天门', '碧霞祠'],
    temples: ['岱庙', '碧霞祠', '玉皇庙'],
    stories: '秦始皇、汉武帝、唐高宗、唐玄宗、宋真宗等七十二代帝王于此封禅祭天，为天下第一名山。',
    wuyue: true,
    direction: '东',
    color: '#22c55e',
  },
  {
    name: '西岳华山',
    rank: '奇险天下第一',
    altitude: 2154,
    location: '陕西华阴',
    dynasty: '道教圣地',
    mythology: '沉香劈山救母',
    energy: 95,
    feature: '险',
    famous: ['长空栈道', '苍龙岭', '西峰', '下棋亭'],
    temples: ['玉泉院', '镇岳宫', '东道院'],
    stories: '华山为第四洞天，自古华山一条路。陈抟老祖与赵匡胤下棋赢华山，留下千古传奇。',
    wuyue: true,
    direction: '西',
    color: '#ef4444',
  },
  {
    name: '南岳衡山',
    rank: '五岳独秀',
    altitude: 1300,
    location: '湖南衡阳',
    dynasty: '寿岳福地',
    mythology: '火神祝融栖息于此',
    energy: 90,
    feature: '秀',
    famous: ['祝融峰', '藏经殿', '水帘洞', '方广寺'],
    temples: ['南岳大庙', '祝融殿', '福严寺'],
    stories: '衡山主寿，故有"寿比南山"之说。历代香火鼎盛，为南方道教中心。',
    wuyue: true,
    direction: '南',
    color: '#f59e0b',
  },
  {
    name: '北岳恒山',
    rank: '人天北柱',
    altitude: 2016,
    location: '山西大同',
    dynasty: '绝塞名山',
    mythology: '舜帝北巡至此',
    energy: 88,
    feature: '幽',
    famous: ['悬空寺', '恒山十八景', '果老岭'],
    temples: ['悬空寺', '北岳庙', '真武庙'],
    stories: '恒山为道教第五小洞天。悬空寺建于北魏，半插飞梁为基，巧借岩石暗托，千年不倒。',
    wuyue: true,
    direction: '北',
    color: '#06b6d4',
  },
  {
    name: '中岳嵩山',
    rank: '天地之中',
    altitude: 1491,
    location: '河南登封',
    dynasty: '天地中心',
    mythology: '黄帝问道于广成子',
    energy: 98,
    feature: '奥',
    famous: ['少林寺', '嵩岳寺塔', '观星台', '中岳庙'],
    temples: ['少林寺', '中岳庙', '法王寺'],
    stories: '嵩山为天地之中。达摩面壁九年，开创禅宗。周公在此测影，制定历法。',
    wuyue: true,
    direction: '中',
    color: '#a855f7',
  },
]

const FOUR_Buddha_MOUNTAINS: Mountain[] = [
  {
    name: '五台山',
    rank: '文殊菩萨道场',
    altitude: 3061,
    location: '山西五台',
    dynasty: '清凉佛国',
    mythology: '文殊菩萨演教处',
    energy: 97,
    feature: '智',
    famous: ['显通寺', '塔院寺', '菩萨顶', '黛螺顶'],
    temples: ['显通寺', '塔院寺', '菩萨顶', '殊像寺', '罗喉寺'],
    stories: '五台山为中国佛教四大名山之首，五峰耸立，高出云表，山顶无林木，有如垒土之台。',
    color: '#fbbf24',
  },
  {
    name: '普陀山',
    rank: '观音菩萨道场',
    altitude: 291,
    location: '浙江舟山',
    dynasty: '海天佛国',
    mythology: '观音菩萨救苦救难',
    energy: 96,
    feature: '悲',
    famous: ['普济寺', '法雨寺', '慧济寺', '南海观音'],
    temples: ['普济寺', '法雨寺', '慧济寺', '紫竹林'],
    stories: '普陀山为南海圣境，观音菩萨在此显现。"海上有仙山，山在虚无缥缈间"。',
    color: '#3b82f6',
  },
  {
    name: '峨眉山',
    rank: '普贤菩萨道场',
    altitude: 3099,
    location: '四川乐山',
    dynasty: '峨眉天下秀',
    mythology: '普贤菩萨坐骑六牙白象',
    energy: 94,
    feature: '行',
    famous: ['金顶', '万佛顶', '报国寺', '清音阁'],
    temples: ['报国寺', '伏虎寺', '万年寺', '金顶华藏寺'],
    stories: '峨眉高出西极天，罗浮直与南溟连。金顶佛光，千年罕见奇观。',
    color: '#8b5cf6',
  },
  {
    name: '九华山',
    rank: '地藏菩萨道场',
    altitude: 1342,
    location: '安徽青阳',
    dynasty: '莲花佛国',
    mythology: '金乔觉地藏菩萨化身',
    energy: 93,
    feature: '愿',
    famous: ['化城寺', '肉身宝殿', '百岁宫', '天台峰'],
    temples: ['化城寺', '肉身宝殿', '百岁宫', '祇园寺'],
    stories: '九华山九十九峰，新罗王子金乔觉在此苦修七十五年，圆寂后肉身不腐，为地藏化身。',
    color: '#f59e0b',
  },
]

const FAMOUS_MOUNTAINS: Mountain[] = [
  {
    name: '昆仑山',
    rank: '万山之祖',
    altitude: 7649,
    location: '昆仑山脉',
    dynasty: '龙脉之源',
    mythology: '西王母瑶池，黄帝问道处',
    energy: 100,
    feature: '圣',
    famous: ['玉珠峰', '瑶池', '昆仑泉'],
    temples: ['西王母庙'],
    stories: '昆仑为中华龙脉之祖，天帝之下都。西王母居瑶池，周穆王西游见之。',
    color: '#0ea5e9',
  },
  {
    name: '武当山',
    rank: '道教第一名山',
    altitude: 1612,
    location: '湖北十堰',
    dynasty: '太和仙山',
    mythology: '真武大帝得道飞升',
    energy: 98,
    feature: '玄',
    famous: ['金顶', '紫霄宫', '南岩宫', '太子坡'],
    temples: ['太和宫', '紫霄宫', '南岩宫', '复真观'],
    stories: '武当山为太玄紫岳，真武大帝在此修炼四十二年功成飞升。张三丰创太极拳于此。',
    color: '#14b8a6',
  },
  {
    name: '龙虎山',
    rank: '道教祖庭',
    altitude: 247,
    location: '江西鹰潭',
    dynasty: '天师府',
    mythology: '张天师炼丹成龙虎现',
    energy: 95,
    feature: '灵',
    famous: ['天师府', '正一观', '上清古镇', '悬棺'],
    temples: ['嗣汉天师府', '正一观', '大上清宫'],
    stories: '张道陵在此炼九天神丹，丹成而龙虎现。六十三代天师世袭于此，已近二千年。',
    color: '#ef4444',
  },
  {
    name: '青城山',
    rank: '第五洞天',
    altitude: 1260,
    location: '四川都江堰',
    dynasty: '青城天下幽',
    mythology: '张天师降魔处',
    energy: 92,
    feature: '幽',
    famous: ['天师洞', '上清宫', '建福宫', '老君阁'],
    temples: ['天师洞', '上清宫', '建福宫'],
    stories: '青城山为道教发源地之一。"青城天下幽"，张道陵在此创立五斗米道。',
    color: '#22c55e',
  },
]

const GREAT_RIVERS: FamousRiver[] = [
  {
    name: '长江',
    length: 6300,
    source: '唐古拉山脉各拉丹冬峰',
    mouth: '东海',
    provinces: ['青海', '西藏', '四川', '云南', '重庆', '湖北', '湖南', '江西', '安徽', '江苏', '上海'],
    culture: '扬子江文明，江南水乡，楚文化',
    sacred: true,
    legends: ['神女瑶姬', '大禹治水', '诸葛亮借东风'],
  },
  {
    name: '黄河',
    length: 5464,
    source: '巴颜喀拉山脉',
    mouth: '渤海',
    provinces: ['青海', '四川', '甘肃', '宁夏', '内蒙古', '陕西', '山西', '河南', '山东'],
    culture: '华夏文明发源地，中原文化',
    sacred: true,
    legends: ['河伯献图', '大禹治水', '鲤鱼跳龙门'],
  },
  {
    name: '淮河',
    length: 1000,
    source: '桐柏山',
    mouth: '长江',
    provinces: ['河南', '安徽', '江苏'],
    culture: '淮河文化，楚汉文化',
    sacred: true,
    legends: ['无支祁', '大禹锁蛟', '淮河四渎'],
  },
  {
    name: '济水',
    length: 850,
    source: '王屋山太乙池',
    mouth: '渤海',
    provinces: ['河南', '山东'],
    culture: '四渎之一，隐者文化',
    sacred: true,
    legends: ['济水三隐三现', '大禹导济'],
  },
]

const getMountainColor = (m: Mountain) => m.color || '#f97316'

export default function ShanchuanPage() {
  const [selectedMountain, setSelectedMountain] = useState<Mountain | null>(null)
  const [mountainTab, setMountainTab] = useState('五岳')
  const [expandedRiver, setExpandedRiver] = useState<string | null>(null)

  const mountains = {
    '五岳': FIVE_MOUNTAINS,
    '佛教四大名山': FOUR_Buddha_MOUNTAINS,
    '道教仙山': FAMOUS_MOUNTAINS,
  }[mountainTab] || FIVE_MOUNTAINS

  return (
    <SubPageTemplate
      title="名山大川"
      subtitle="五岳四渎 · 洞天福地 · 钟灵毓秀 · 人杰地灵"
      icon="⛰️"
      colorRgb="34, 197, 94"
    >
      <SubPageSection title="🗻 中华山岳">
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap',
        }}>
          {['五岳', '佛教四大名山', '道教仙山'].map(tab => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMountainTab(tab)}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                background: mountainTab === tab
                  ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                transition: 'all 0.3s',
              }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem',
        }}>
          {mountains.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => setSelectedMountain(m)}
              style={{
                padding: '1.25rem',
                background: `linear-gradient(135deg, ${getMountainColor(m)}20, transparent)`,
                borderRadius: '12px',
                border: `1px solid ${getMountainColor(m)}50`,
                cursor: 'pointer',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.75rem',
              }}>
                <div>
                  <h3 style={{ color: getMountainColor(m), margin: 0 }}>
                    🏔️ {m.name}
                  </h3>
                  <p style={{
                    color: 'rgba(180, 180, 190, 0.6)',
                    fontSize: '0.8rem',
                    margin: '0.25rem 0 0 0',
                  }}>
                    {m.rank} · {m.location}
                  </p>
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '50px',
                  background: `${getMountainColor(m)}30`,
                  color: getMountainColor(m),
                }}>
                  {m.altitude}m
                </span>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  marginBottom: '0.25rem',
                }}>
                  <span style={{ color: 'rgba(180, 180, 190, 0.6)' }}>
                    ⚡ 龙脉灵气
                  </span>
                  <span style={{ color: getMountainColor(m) }}>
                    {m.energy}%
                  </span>
                </div>
                <ProgressBar value={m.energy} height={6} color={getMountainColor(m)} />
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
              }}>
                {m.famous.slice(0, 4).map(f => (
                  <span key={f} style={{
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    background: 'rgba(0,0,0,0.2)',
                    color: 'rgba(180, 180, 190, 0.8)',
                  }}>
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <AnimatePresence>
        {selectedMountain && (
          <SubPageSection title="📜 山志详解">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                padding: '2rem',
                background: `linear-gradient(135deg, ${getMountainColor(selectedMountain)}15, transparent)`,
                borderRadius: '12px',
                border: `2px solid ${getMountainColor(selectedMountain)}50`,
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>⛰️</div>
                <h2 style={{ color: getMountainColor(selectedMountain), margin: 0 }}>
                  {selectedMountain.name}
                </h2>
                <p style={{ color: 'rgba(180, 180, 190, 0.6)', margin: '0.25rem 0' }}>
                  {selectedMountain.rank} · {selectedMountain.location} · 海拔{selectedMountain.altitude}米
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  padding: '1rem',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                }}>
                  <h4 style={{ color: getMountainColor(selectedMountain), margin: '0 0 0.5rem 0' }}>
                    📖 神话传说
                  </h4>
                  <p style={{
                    color: 'rgba(180, 180, 190, 0.8)',
                    fontSize: '0.9rem',
                    margin: 0,
                    fontStyle: 'italic',
                  }}>
                    {selectedMountain.mythology}
                  </p>
                </div>
                <div style={{
                  padding: '1rem',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                }}>
                  <h4 style={{ color: getMountainColor(selectedMountain), margin: '0 0 0.5rem 0' }}>
                    🏛️ 著名寺观
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selectedMountain.temples.map(t => (
                      <span key={t} style={{
                        fontSize: '0.85rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        background: `${getMountainColor(selectedMountain)}20`,
                        color: getMountainColor(selectedMountain),
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{
                padding: '1.25rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '10px',
                borderLeft: `4px solid ${getMountainColor(selectedMountain)}`,
              }}>
                <h4 style={{ color: getMountainColor(selectedMountain), margin: '0 0 0.5rem 0' }}>
                  📜 史载典故
                </h4>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.85)',
                  lineHeight: 1.8,
                  margin: 0,
                }}>
                  {selectedMountain.stories}
                </p>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMountain(null)}
                  style={{
                    padding: '0.75rem 2rem',
                    background: 'rgba(0,0,0,0.3)',
                    border: `1px solid ${getMountainColor(selectedMountain)}50`,
                    borderRadius: '50px',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  ← 返回列表
                </motion.button>
              </div>
            </motion.div>
          </SubPageSection>
        )}
      </AnimatePresence>

      <SubPageSection title="🌊 四渎百川">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', textAlign: 'center' }}>
            《尔雅·释水》：江、河、淮、济为四渎。四渎者，发源注海者也。
          </p>
        </InfoCard>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem',
        }}>
          {GREAT_RIVERS.map((river, i) => (
            <motion.div
              key={river.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setExpandedRiver(expandedRiver === river.name ? null : river.name)}
              style={{
                padding: '1.25rem',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), transparent)',
                borderRadius: '12px',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                cursor: 'pointer',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <h3 style={{ color: '#06b6d4', margin: 0 }}>
                    💧 {river.name}
                  </h3>
                  <p style={{
                    color: 'rgba(180, 180, 190, 0.6)',
                    fontSize: '0.8rem',
                    margin: '0.25rem 0 0 0',
                  }}>
                    {river.length}公里 · {river.source}
                  </p>
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '50px',
                  background: river.sacred ? 'rgba(6, 182, 212, 0.2)' : 'rgba(0,0,0,0.2)',
                  color: river.sacred ? '#06b6d4' : 'rgba(180, 180, 190, 0.6)',
                }}>
                  {river.sacred ? '⭐ 圣河' : '大河'}
                </span>
              </div>

              <AnimatePresence>
                {expandedRiver === river.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ overflow: 'hidden', marginTop: '1rem' }}
                  >
                    <p style={{
                      color: 'rgba(180, 180, 190, 0.8)',
                      fontSize: '0.85rem',
                      margin: '0 0 0.75rem 0',
                    }}>
                      🌊 孕育：{river.culture}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {river.legends.map(l => (
                        <span key={l} style={{
                          fontSize: '0.75rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          background: 'rgba(6, 182, 212, 0.15)',
                          color: '#06b6d4',
                        }}>
                          📜 {l}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
