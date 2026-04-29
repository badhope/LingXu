'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'


interface AncientCapital {
  name: string
  dynasty: string[]
  years: number
  location: string
  layout: string
  fengshui: string
  merit: number
  features: string[]
  detail: string
  famous: string[]
  direction: string
  color: string
}

interface FamousTomb {
  name: string
  owner: string
  dynasty: string
  location: string
  geomancer: string
  pattern: string
  grade: string
  fengshuiScore: number
  legends: string[]
  status: string
  detail: string
}

interface FamousHouse {
  name: string
  owner: string
  location: string
  pattern: string
  fengshui: string
  achievements: string[]
  generations: number
}

const ANCIENT_CAPITALS: AncientCapital[] = [
  {
    name: '长安',
    dynasty: ['西周', '秦', '西汉', '隋', '唐'],
    years: 1100,
    location: '陕西西安',
    layout: '八水绕长安，九宫格局',
    fengshui: '关中盆地，四塞为固，阻三面而守',
    merit: 98,
    features: ['龙脉秦岭', '八水环绕', '四塞为固', '天府之国'],
    detail: '长安居关中之地，南有秦岭为靠，北有渭水环绕，东有函谷关，西有大散关，南有武关，北有萧关，四塞为固，阻三面而守，独以一面东制诸侯。此为千古第一帝都。',
    famous: ['兵马俑', '未央宫', '大明宫', '大雁塔'],
    direction: '西北',
    color: '#ef4444',
  },
  {
    name: '洛阳',
    dynasty: ['夏商', '东周', '东汉', '曹魏', '西晋', '北魏', '隋唐'],
    years: 1500,
    location: '河南洛阳',
    layout: '洛水贯都，法象紫微',
    fengshui: '天下之中，河山拱戴，四方入贡道里均',
    merit: 99,
    features: ['中岳为靠', '洛水贯都', '伊瀍涧湹', '四水交流'],
    detail: '洛阳居天地之中，北有邙山横亘，南有伊阙对峙，洛水贯其中，四水交流。河山拱戴，形势甲于天下。周公营洛邑，以为天下之中，四方入贡道里均。',
    famous: ['龙门石窟', '白马寺', '邙山古墓群', '隋唐遗址'],
    direction: '中原',
    color: '#f59e0b',
  },
  {
    name: '北京',
    dynasty: ['金', '元', '明', '清'],
    years: 850,
    location: '北京',
    layout: '背山面海，三重城垣',
    fengshui: '北干龙尽结，万里长城横于前',
    merit: 97,
    features: ['燕山为靠', '渤海为照', '长城横栏', '永定水绕'],
    detail: '北京为北干龙尽结之地，西拥太行，北枕燕山，东临渤海，南敞中原。万里长城横亘于前，永定河蜿蜒于内，形胜甲于天下。永乐迁都，六百年帝都。',
    famous: ['紫禁城', '天坛', '颐和园', '明十三陵'],
    direction: '北方',
    color: '#8b5cf6',
  },
  {
    name: '南京',
    dynasty: ['东吴', '东晋', '宋齐梁陈', '明'],
    years: 450,
    location: '江苏南京',
    layout: '钟山龙蟠，石城虎踞',
    fengshui: '诸葛亮称：钟山龙蟠，石头虎踞，此帝王之宅',
    merit: 92,
    features: ['钟山龙蟠', '石城虎踞', '长江天堑', '玄武湖水'],
    detail: '诸葛亮论金陵地形云：钟山龙蟠，石头虎踞，此帝王之宅。长江天堑横于前，玄武湖水聚于后，王气所钟，六朝金粉之地。',
    famous: ['明孝陵', '中山陵', '夫子庙', '紫金山'],
    direction: '东南',
    color: '#06b6d4',
  },
  {
    name: '开封',
    dynasty: ['魏', '后梁', '后晋', '后汉', '后周', '北宋'],
    years: 350,
    location: '河南开封',
    layout: '四水贯都，汴河通漕',
    fengshui: '中原腹地，水运枢纽',
    merit: 88,
    features: ['汴河通漕', '四水贯都', '四通八达', '物阜民丰'],
    detail: '开封居中原腹地，汴河、蔡河、金水河、五丈河四水贯都，为北宋漕运枢纽。虽无山险可守，然水运发达，物阜民丰，《清明上河图》所绘即此。',
    famous: ['铁塔', '龙亭', '相国寺', '清明上河园'],
    direction: '中原',
    color: '#22c55e',
  },
  {
    name: '杭州',
    dynasty: ['吴越', '南宋'],
    years: 200,
    location: '浙江杭州',
    layout: '三面云山一面城',
    fengshui: '天目山为靠，西湖水聚气',
    merit: 90,
    features: ['天目来龙', '西湖聚气', '钱江潮涌', '三面环山'],
    detail: '杭州西接天目山脉，东望钱江大潮，西湖如镜聚气于前，三面云山一面城。南宋偏安于此，暖风熏得游人醉，直把杭州作汴州。',
    famous: ['西湖', '灵隐寺', '雷峰塔', '岳王庙'],
    direction: '东南',
    color: '#ec4899',
  },
]

const FAMOUS_TOMBS: FamousTomb[] = [
  {
    name: '秦始皇陵',
    owner: '始皇帝嬴政',
    dynasty: '秦',
    location: '陕西临潼骊山',
    geomancer: '李斯',
    pattern: '依山为陵，水银为江海',
    grade: '帝陵极品',
    fengshuiScore: 100,
    legends: ['兵马俑阵', '水银江河', '机关弩箭', '人鱼膏灯'],
    status: '未发掘',
    detail: '始皇陵南依骊山，北临渭水，背山面水，为千古第一帝陵。穿三泉，下铜而致椁，宫观百官奇器珍怪徙臧满之。以水银为百川江河大海，机相灌输，上具天文，下具地理。',
  },
  {
    name: '乾陵',
    owner: '唐高宗与武则天',
    dynasty: '唐',
    location: '陕西乾县梁山',
    geomancer: '李淳风、袁天罡',
    pattern: '二圣合葬，奶头山为案',
    grade: '帝陵极品',
    fengshuiScore: 99,
    legends: ['无字碑', '六十一蕃臣', '黄巢盗陵失败', '温韬盗陵遇风雨'],
    status: '未发掘',
    detail: '袁天罡与李淳风二人分头寻地，不谋而合皆指梁山。奶头山为案，双乳对峙，为天地奇观。黄巢发四十万军盗之而不得，为唐陵唯一未被盗者。',
  },
  {
    name: '明十三陵',
    owner: '明代十六帝',
    dynasty: '明',
    location: '北京昌平天寿山',
    geomancer: '廖均卿',
    pattern: '十三陵共一山，万子千孙穴',
    grade: '皇陵极品',
    fengshuiScore: 98,
    legends: ['永乐点穴', '廖均卿卜地', '康老妇人献地'],
    status: '部分开放',
    detail: '江西风水大师廖均卿为永乐卜得天寿山吉地。燕山来龙，十三陵共一主山，如莲花开放，子孙万代穴。十三位皇帝葬于此，绵延二百余年。',
  },
  {
    name: '黄帝陵',
    owner: '人文始祖轩辕黄帝',
    dynasty: '上古',
    location: '陕西黄陵桥山',
    geomancer: '上古圣人',
    pattern: '桥山龙脉，华夏始祖',
    grade: '万陵之祖',
    fengshuiScore: 100,
    legends: ['黄帝乘龙升天', '群臣左彻葬衣冠', '汉武帝祭陵'],
    status: '公祭圣地',
    detail: '黄帝崩，葬桥山。沮水环绕，桥山如龙，为华夏第一陵。历代帝王祭祀不绝，汉武帝率十八万军祭陵，挂甲柏至今犹存。',
  },
  {
    name: '孔林',
    owner: '大成至圣文宣王孔子',
    dynasty: '春秋至今',
    location: '山东曲阜',
    geomancer: '子贡',
    pattern: '携子抱孙，万世不替',
    grade: '文圣之墓',
    fengshuiScore: 97,
    legends: ['子贡守墓六年', '孔林上不落乌鸦，下不生蛇', '三千弟子手植楷树'],
    status: '世界遗产',
    detail: '孔子卒，弟子葬于鲁城北泗上。子贡守墓六年，三千弟子各以其乡土树种之。历两千余年，传七十余代，孔林规模越来越大，真乃万世不替之穴。',
  },
  {
    name: '武侯墓',
    owner: '武乡侯诸葛亮',
    dynasty: '三国蜀汉',
    location: '陕西勉县定军山',
    geomancer: '诸葛亮自卜',
    pattern: '武侯自卜，寿山福海',
    grade: '千古名穴',
    fengshuiScore: 95,
    legends: ['四人抬棺绳断即葬', '定军山下显圣', '一千年无人敢盗'],
    status: '历代祭祀',
    detail: '诸葛亮遗命四人抬棺南行，绳断即葬。至今定军山下，武侯英灵护佑一方。一千年无人敢盗，真乃神人也。',
  },
]

const FAMOUS_HOUSES: FamousHouse[] = [
  {
    name: '孔府',
    owner: '孔子后裔',
    location: '山东曲阜',
    pattern: '圣人之居，与国咸休',
    fengshui: '文曲文昌会，书香传万代',
    achievements: ['衍圣公世袭二千五百余年', '天下第一家'],
    generations: 79,
  },
  {
    name: '天师府',
    owner: '张天师家族',
    location: '江西龙虎山',
    pattern: '丹灶烟浮，仙都气象',
    fengshui: '龙虎环抱，天师正位',
    achievements: ['六十三代天师世袭', '道教祖庭'],
    generations: 63,
  },
  {
    name: '乔家大院',
    owner: '晋商乔氏',
    location: '山西祁县',
    pattern: '喜字布局，藏风聚气',
    fengshui: '院中有院，步步高升',
    achievements: ['汇通天下', '皇家有故宫，民宅看乔家'],
    generations: 7,
  },
  {
    name: '王家大院',
    owner: '晋商王氏',
    location: '山西灵石',
    pattern: '龙蟠虎踞，五巷六堡',
    fengshui: '依山就势，层层递进',
    achievements: ['民间故宫', '王家归来不看院'],
    generations: 8,
  },
]

export default function GuduPage() {
  const [capitalTab, setCapitalTab] = useState('古都')
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const items = {
    '古都': ANCIENT_CAPITALS,
    '名墓': FAMOUS_TOMBS,
    '望族': FAMOUS_HOUSES,
  }[capitalTab] || ANCIENT_CAPITALS

  return (
    <SubPageTemplate
      title="古都名墓"
      subtitle="十三朝都会 · 五百年王气 · 帝王州 · 形胜地"
      icon="🏛️"
      colorRgb="168, 85, 247"
    >
      <SubPageSection title="🏛️ 王气所在">
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap',
        }}>
          {['古都', '名墓', '望族'].map(tab => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCapitalTab(tab)}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                background: capitalTab === tab
                  ? 'linear-gradient(135deg, #a855f7, #8b5cf6)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                transition: 'all 0.3s',
              }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {capitalTab === '古都' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
            marginTop: '1.5rem',
          }}>
            {ANCIENT_CAPITALS.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedItem(city)}
                style={{
                  padding: '1.5rem',
                  background: `linear-gradient(135deg, ${city.color}20, transparent)`,
                  borderRadius: '12px',
                  border: `1px solid ${city.color}50`,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem',
                }}>
                  <div>
                    <h3 style={{ color: city.color, margin: 0 }}>
                      🏛️ {city.name}
                    </h3>
                    <p style={{
                      color: 'rgba(180, 180, 190, 0.6)',
                      fontSize: '0.8rem',
                      margin: '0.25rem 0 0 0',
                    }}>
                      {city.location} · {city.years}年建都史
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '50px',
                    background: `${city.color}30`,
                    color: city.color,
                  }}>
                    {city.direction}
                  </span>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    marginBottom: '0.25rem',
                  }}>
                    <span style={{ color: 'rgba(180, 180, 190, 0.6)' }}>
                      ⚡ 王气指数
                    </span>
                    <span style={{ color: city.color }}>
                      {city.merit}%
                    </span>
                  </div>
                  <ProgressBar value={city.merit} height={6} color={city.color} />
                </div>

                <p style={{
                  color: 'rgba(180, 180, 190, 0.7)',
                  fontSize: '0.8rem',
                  fontStyle: 'italic',
                  margin: 0,
                }}>
                  "{city.fengshui}"
                </p>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginTop: '0.75rem',
                }}>
                  {city.dynasty.slice(0, 4).map(d => (
                    <span key={d} style={{
                      fontSize: '0.7rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      background: `${city.color}20`,
                      color: city.color,
                    }}>
                      {d}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {capitalTab === '名墓' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem',
          }}>
            {FAMOUS_TOMBS.map((tomb, i) => (
              <motion.div
                key={tomb.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedItem(tomb)}
                style={{
                  padding: '1.25rem',
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), transparent)',
                  borderRadius: '10px',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
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
                    <h4 style={{ color: '#a855f7', margin: 0 }}>
                      ⚰️ {tomb.name}
                    </h4>
                    <p style={{
                      color: 'rgba(180, 180, 190, 0.6)',
                      fontSize: '0.75rem',
                      margin: '0.25rem 0 0 0',
                    }}>
                      {tomb.owner} · {tomb.dynasty}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '50px',
                    background: tomb.fengshuiScore >= 98
                      ? 'rgba(251, 191, 36, 0.3)'
                      : 'rgba(168, 85, 247, 0.3)',
                    color: tomb.fengshuiScore >= 98 ? '#fbbf24' : '#a855f7',
                  }}>
                    {tomb.grade}
                  </span>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <ProgressBar value={tomb.fengshuiScore} height={5} color="#a855f7" />
                </div>

                <p style={{
                  color: 'rgba(180, 180, 190, 0.7)',
                  fontSize: '0.75rem',
                  margin: 0,
                }}>
                  📍 {tomb.location}
                </p>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.6)',
                  fontSize: '0.7rem',
                  fontStyle: 'italic',
                  margin: '0.25rem 0 0 0',
                }}>
                  卜地：{tomb.geomancer}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {capitalTab === '望族' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem',
          }}>
            {FAMOUS_HOUSES.map((house, i) => (
              <motion.div
                key={house.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedItem(house)}
                style={{
                  padding: '1.25rem',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), transparent)',
                  borderRadius: '10px',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  cursor: 'pointer',
                }}
              >
                <h4 style={{ color: '#f59e0b', margin: '0 0 0.5rem 0' }}>
                  🏠 {house.name}
                </h4>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.7)',
                  fontSize: '0.8rem',
                  margin: '0 0 0.5rem 0',
                }}>
                  {house.owner} · {house.location}
                </p>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.6)',
                  fontSize: '0.75rem',
                  fontStyle: 'italic',
                  margin: 0,
                }}>
                  传承 {house.generations} 代
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </SubPageSection>

      <AnimatePresence>
        {selectedItem && (
          <SubPageSection title="📜 详细考证">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                padding: '2rem',
                background: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '12px',
                border: '2px solid rgba(168, 85, 247, 0.4)',
              }}
            >
              <h2 style={{ color: '#a855f7', textAlign: 'center', margin: '0 0 1.5rem 0' }}>
                🏛️ {selectedItem.name || selectedItem.owner}
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}>
                {selectedItem.features?.map((f: string) => (
                  <div key={f} style={{
                    padding: '0.75rem',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}>
                    <span style={{ color: '#a855f7' }}>✅</span> {f}
                  </div>
                ))}
                {selectedItem.legends?.map((l: string) => (
                  <div key={l} style={{
                    padding: '0.75rem',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                  }}>
                    <span style={{ color: '#f59e0b' }}>📜</span> {l}
                  </div>
                ))}
                {selectedItem.achievements?.map((a: string) => (
                  <div key={a} style={{
                    padding: '0.75rem',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                  }}>
                    <span style={{ color: '#22c55e' }}>🏆</span> {a}
                  </div>
                ))}
              </div>

              <div style={{
                padding: '1.25rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '10px',
                borderLeft: '4px solid #a855f7',
              }}>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.85)',
                  lineHeight: 1.8,
                  margin: 0,
                }}>
                  {selectedItem.detail}
                </p>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedItem(null)}
                  style={{
                    padding: '0.75rem 2rem',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(168, 85, 247, 0.4)',
                    borderRadius: '50px',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  ← 返回
                </motion.button>
              </div>
            </motion.div>
          </SubPageSection>
        )}
      </AnimatePresence>

      <SubPageSection title="📜 都邑论">
        <InfoCard>
          <div style={{
            columnCount: 2,
            columnGap: '2rem',
            columnRule: '1px solid rgba(168, 85, 247, 0.2)',
  }}>
            <p style={{
              color: 'rgba(180, 180, 190, 0.7)',
              lineHeight: 2,
              margin: 0,
              textIndent: '2em',
              fontStyle: 'italic',
            }}>
              夫建都之要，一形势险固，二漕运便利，三居中而应四方。必三者备，而后可以言建都。
              长安四塞为固，天府之国，漕运稍难；洛阳天下之中，漕运便利，四面受敌；
              北京背山面海，形势雄伟，漕运通达，元明清三代之所都也。
              是故圣王之居，必择天下之形胜，察天地之阴阳，验往古之兴衰，以为万世之计。
            </p>
            <p style={{
              color: 'rgba(180, 180, 190, 0.7)',
              lineHeight: 2,
              margin: 0,
              textIndent: '2em',
              fontStyle: 'italic',
            }}>
              昔者先王之葬也，必于其都之北，丘垄之高，足以望视，
              松柏之茂，足以蔽之，沟防之阻，足以固之。
              葬者，藏也，欲人之不得见也。是故葬不极于高大，不极于众多，
              而极于安固。安固则神灵宁，神灵宁则福祚长。
              故曰：古之葬者，厚衣之以薪，葬之中野，不封不树，后世圣人易之以棺椁。
            </p>
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
