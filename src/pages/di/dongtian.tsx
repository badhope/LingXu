'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

interface CaveHeaven {
  id: number
  name: string
  location: string
  title: string
  immortal: string
  realm: string
  energy: number
  description: string
  wonders: string[]
  color: string
}

const TEN_GREAT_CAVE_HEAVENS: CaveHeaven[] = [
  {
    id: 1,
    name: '王屋山洞',
    location: '河南济源王屋山',
    title: '第一小有清虚之天',
    immortal: '西城王君',
    realm: '周回万里',
    energy: 100,
    description: '愚公移山之地，黄帝祭天之所。王母洞深不可测，天坛峰顶可观日出于海。司马承祯修道于此，作《天地宫府图》。',
    wonders: ['王母洞', '天坛峰', '太乙池', '不老泉'],
    color: '#ef4444',
  },
  {
    id: 2,
    name: '委羽山洞',
    location: '浙江黄岩委羽山',
    title: '第二大有空明之天',
    immortal: '青童君',
    realm: '周回一万里',
    energy: 98,
    description: '刘奉林于此控鹤轻举，鹤尝坠翮，委羽覆地，因此得名。洞中有三山，金庭门在其内。',
    wonders: ['鹤林宫', '金庭门', '仙人迹', '炼丹井'],
    color: '#f59e0b',
  },
  {
    id: 3,
    name: '西城山洞',
    location: '陕西终南山',
    title: '第三太玄总真之天',
    immortal: '王方平',
    realm: '周回三千里',
    energy: 97,
    description: '终南为天下之阻，隐士之窟。老子说经，钟馗捉鬼，全真七子创教于此。',
    wonders: ['楼观台', '重阳宫', '金仙洞', '老君犁沟'],
    color: '#8b5cf6',
  },
  {
    id: 4,
    name: '西玄山洞',
    location: '陕西华山西玄洞',
    title: '第四三元极真之天',
    immortal: '赤松子',
    realm: '周回三千里',
    energy: 96,
    description: '华山第四洞天，陈抟老祖睡处。洞在西峰绝壁，非神仙莫能至。',
    wonders: ['西玄洞', '避诏崖', '下棋亭', '犁沟'],
    color: '#ec4899',
  },
  {
    id: 5,
    name: '青城山洞',
    location: '四川都江堰青城山',
    title: '第五宝仙九室之天',
    immortal: '青城丈人',
    realm: '周回二千里',
    energy: 95,
    description: '天师道发源地，张道陵降魔处。三十六峰环拱，状如城郭。',
    wonders: ['天师洞', '上清宫', '朝阳洞', '掷笔槽'],
    color: '#22c55e',
  },
  {
    id: 6,
    name: '赤城山洞',
    location: '浙江天台赤城山',
    title: '第六上清玉平之天',
    immortal: '玄洲仙伯',
    realm: '周回三百里',
    energy: 94,
    description: '赤城霞起而建标，瀑布飞流以界道。济公和尚出家于此，五百罗汉道场。',
    wonders: ['玉京洞', '济公院', '紫云洞', '飞霞寺'],
    color: '#06b6d4',
  },
  {
    id: 7,
    name: '罗浮山洞',
    location: '广东惠州罗浮山',
    title: '第七朱明耀真之天',
    immortal: '葛洪仙翁',
    realm: '周回五百里',
    energy: 93,
    description: '岭南第一山，葛洪炼丹升仙处。蓬莱一山，浮海而至，与罗山并体。',
    wonders: ['冲虚观', '葛洪丹灶', '洗药池', '黄龙洞'],
    color: '#14b8a6',
  },
  {
    id: 8,
    name: '句曲山洞',
    location: '江苏句容茅山',
    title: '第八金坛华阳之天',
    immortal: '陶弘景',
    realm: '周回一百五十里',
    energy: 97,
    description: '上清派发源地，三茅真君得道处。山中洞穴相连，七十二洞直通海底。',
    wonders: ['华阳洞', '九霄万福宫', '元符万宁宫', '喜客泉'],
    color: '#f59e0b',
  },
  {
    id: 9,
    name: '林屋山洞',
    location: '江苏太湖西山林屋洞',
    title: '第九左神幽虚之天',
    immortal: '北岳真人',
    realm: '周回四百里',
    energy: 92,
    description: '太湖包山，洞中有金庭、银房，禹得《灵宝五符》于此。石钟石鼓，扣之有声。',
    wonders: ['雨洞', '阳洞', '丙洞', '肠谷洞'],
    color: '#3b82f6',
  },
  {
    id: 10,
    name: '括苍山洞',
    location: '浙江仙居括苍山',
    title: '第十成德隐玄之天',
    immortal: '北海公涓子',
    realm: '周回三百里',
    energy: 91,
    description: '道教第十洞天，徐来勒真人得道处。主峰米筛浪，为浙东第一高峰。',
    wonders: ['米筛浪', '九台沟', '跑马坪', '剑插岩'],
    color: '#a855f7',
  },
]

const THIRTY_SIX_SMALL_CAVE_HEAVENS: CaveHeaven[] = [
  { id: 1, name: '地肺山', location: '江苏句容', title: '第一肺山', immortal: '高辛真人', realm: '周回一百里', energy: 85, description: '形如肺叶，浮于水上，四时无水旱之灾。', wonders: ['陶公醉石', '桃花源'], color: '#ef4444' },
  { id: 2, name: '盖竹山', location: '浙江黄岩', title: '第二长耀宝光之天', immortal: '郗尊师', realm: '周回八十里', energy: 84, description: '竹盖如伞，竹叶皆青，冬夏常青。', wonders: ['盖竹洞', '炼丹台'], color: '#f59e0b' },
  { id: 3, name: '仙巖山', location: '江西贵溪龙虎山', title: '第三太元法雨之天', immortal: '张真人', realm: '周回五十里', energy: 90, description: '二十四岩，岩岩有仙迹。', wonders: ['仙水岩', '悬棺'], color: '#8b5cf6' },
  { id: 4, name: '玉溜山', location: '浙江台州', title: '第四玉溜', immortal: '杨真人', realm: '周回十里', energy: 83, description: '泉溜如玉，昼夜常鸣。', wonders: ['玉泉', '玉潭'], color: '#ec4899' },
  { id: 5, name: '青城山', location: '四川都江堰', title: '第五青城', immortal: '张道陵', realm: '周回二千里', energy: 95, description: '第五小洞天，天师降魔处。', wonders: ['天师洞', '掷笔槽'], color: '#22c55e' },
  { id: 6, name: '天目山', location: '浙江临安', title: '第六天目', immortal: '王玄甫', realm: '周回一百里', energy: 88, description: '东西二峰，峰顶各有一池，如天之双目。', wonders: ['东天目', '西天目'], color: '#06b6d4' },
  { id: 7, name: '烂柯山', location: '浙江衢州', title: '第七烂柯', immortal: '王质', realm: '周回四十里', energy: 87, description: '王质砍柴遇仙，一局棋罢，斧柯已烂。', wonders: ['烂柯石', '日迟亭'], color: '#14b8a6' },
  { id: 8, name: '龙虎山', location: '江西贵溪', title: '第八龙虎山', immortal: '张道陵', realm: '周回五十里', energy: 92, description: '炼丹成龙虎现，天师府在此。', wonders: ['天师府', '正一观'], color: '#f59e0b' },
  { id: 9, name: '灵墟山', location: '浙江天台', title: '第九灵墟', immortal: '司马承祯', realm: '周回一百里', energy: 89, description: '司马子微得道处，真人名曰灵墟。', wonders: ['灵墟洞', '白云宫'], color: '#3b82f6' },
  { id: 10, name: '沃洲山', location: '浙江新昌', title: '第十沃洲', immortal: '支遁大师', realm: '周回五十里', energy: 86, description: '支公买山而隐，放鹤养马。', wonders: ['放鹤峰', '养马坡'], color: '#a855f7' },
  { id: 11, name: '阳羡山', location: '江苏宜兴', title: '第十一阳羡', immortal: '周处', realm: '周回五十里', energy: 84, description: '善卷洞，张公洞，灵谷洞，天下奇景。', wonders: ['善卷洞', '张公洞'], color: '#ef4444' },
  { id: 12, name: '金华山', location: '浙江金华', title: '第十二金华', immortal: '黄大仙', realm: '周回五十里', energy: 85, description: '黄初平叱石成羊，得道成仙。', wonders: ['朝真洞', '冰壶洞'], color: '#f59e0b' },
]

const SEVENTY_TWO_BLESSINGS_LANDS = [
  { name: '终南山', location: '陕西西安', feature: '隐士之窟' },
  { name: '武当山', location: '湖北十堰', feature: '真武飞升' },
  { name: '峨眉山', location: '四川峨眉', feature: '普贤道场' },
  { name: '庐山', location: '江西九江', feature: '匡庐奇秀' },
  { name: '嵩山', location: '河南登封', feature: '天地之中' },
  { name: '茅山', location: '江苏句容', feature: '上清祖庭' },
  { name: '鸡足山', location: '云南大理', feature: '迦叶守衣' },
  { name: '天台山', location: '浙江天台', feature: '佛宗道源' },
  { name: '昆仑山', location: '青海', feature: '万山之祖' },
  { name: '黄山', location: '安徽黄山', feature: '天下第一奇山' },
  { name: '衡山', location: '湖南衡阳', feature: '五岳独秀' },
  { name: '恒山', location: '山西大同', feature: '人天北柱' },
]

export default function DongtianPage() {
  const [selected, setSelected] = useState<CaveHeaven | null>(null)
  const [tab, setTab] = useState('十大洞天')

  const caves = {
    '十大洞天': TEN_GREAT_CAVE_HEAVENS,
    '三十六小洞天': THIRTY_SIX_SMALL_CAVE_HEAVENS,
  }[tab] || TEN_GREAT_CAVE_HEAVENS

  return (
    <SubPageTemplate
      title="洞天福地"
      subtitle="十大洞天 · 三十六小洞天 · 七十二福地 · 仙真所居"
      icon="🏔️"
      colorRgb="6, 182, 212"
    >
      <SubPageSection title="🌌 太上日：三十六洞天，七十二福地">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', textAlign: 'center' }}>
            《天地宫府图》曰：乾坤既定，山岳清宁。名山洞府，乃上天遣群仙统治之所。
          </p>
        </InfoCard>

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          margin: '1.5rem 0',
          flexWrap: 'wrap',
        }}>
          {['十大洞天', '三十六小洞天', '七十二福地'].map(t => (
            <motion.button
              key={t}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setTab(t); setSelected(null) }}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                background: tab === t
                  ? 'linear-gradient(135deg, #06b6d4, #0ea5e9)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                transition: 'all 0.3s',
              }}
            >
              {t}
            </motion.button>
          ))}
        </div>

        {tab !== '七十二福地' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}>
            {caves.map((cave, i) => (
              <motion.div
                key={cave.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(cave)}
                style={{
                  padding: '1.25rem',
                  background: `linear-gradient(135deg, ${cave.color}20, transparent)`,
                  borderRadius: '10px',
                  border: `1px solid ${cave.color}50`,
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
                    <h4 style={{ color: cave.color, margin: 0 }}>
                      🏔️ 第{cave.id} {cave.name}
                    </h4>
                    <p style={{
                      color: 'rgba(180, 180, 190, 0.6)',
                      fontSize: '0.75rem',
                      margin: '0.25rem 0 0 0',
                    }}>
                      {cave.location}
                    </p>
                  </div>
                </div>

                <p style={{
                  color: 'rgba(180, 180, 190, 0.7)',
                  fontSize: '0.8rem',
                  fontStyle: 'italic',
                  margin: '0 0 0.75rem 0',
                }}>
                  "{cave.title}"
                </p>

                <div style={{ marginBottom: '0.5rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    marginBottom: '0.25rem',
                  }}>
                    <span style={{ color: 'rgba(180, 180, 190, 0.6)' }}>
                      ⚡ 仙灵之气
                    </span>
                    <span style={{ color: cave.color }}>
                      {cave.energy}%
                    </span>
                  </div>
                  <ProgressBar value={cave.energy} height={5} color={cave.color} />
                </div>

                <p style={{
                  color: cave.color,
                  fontSize: '0.75rem',
                  margin: 0,
                }}>
                  🧙 {cave.immortal}治之
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem',
          }}>
            {SEVENTY_TWO_BLESSINGS_LANDS.map((land, i) => (
              <motion.div
                key={land.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  padding: '1rem',
                  background: 'rgba(6, 182, 212, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                }}
              >
                <h4 style={{ color: '#06b6d4', margin: '0 0 0.5rem 0' }}>
                  🏔️ {land.name}
                </h4>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.7)',
                  fontSize: '0.8rem',
                  margin: '0 0 0.25rem 0',
                }}>
                  📍 {land.location}
                </p>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.6)',
                  fontSize: '0.75rem',
                  fontStyle: 'italic',
                  margin: 0,
                }}>
                  ✨ {land.feature}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </SubPageSection>

      <AnimatePresence>
        {selected && (
          <SubPageSection title="📜 洞天志">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                padding: '2rem',
                background: `linear-gradient(135deg, ${selected.color}15, transparent)`,
                borderRadius: '12px',
                border: `2px solid ${selected.color}50`,
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🏔️</div>
                <h2 style={{ color: selected.color, margin: 0 }}>
                  第{selected.id} {selected.name}
                </h2>
                <p style={{ color: 'rgba(180, 180, 190, 0.6)', margin: '0.5rem 0 0 0' }}>
                  {selected.title} · {selected.realm}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  padding: '1rem',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                }}>
                  <h4 style={{ color: selected.color, margin: '0 0 0.5rem 0' }}>
                    🧙 主治仙真
                  </h4>
                  <p style={{ color: 'rgba(180, 180, 190, 0.8)', margin: 0 }}>
                    {selected.immortal}
                  </p>
                </div>
                <div style={{
                  padding: '1rem',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                }}>
                  <h4 style={{ color: selected.color, margin: '0 0 0.5rem 0' }}>
                    📍 仙山胜境
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selected.wonders.map(w => (
                      <span key={w} style={{
                        fontSize: '0.85rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        background: `${selected.color}20`,
                        color: selected.color,
                      }}>
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{
                padding: '1.25rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '10px',
                borderLeft: `4px solid ${selected.color}`,
              }}>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.85)',
                  lineHeight: 1.8,
                  margin: 0,
                }}>
                  {selected.description}
                </p>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelected(null)}
                  style={{
                    padding: '0.75rem 2rem',
                    background: 'rgba(0,0,0,0.3)',
                    border: `1px solid ${selected.color}50`,
                    borderRadius: '50px',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  ← 返回洞天列表
                </motion.button>
              </div>
            </motion.div>
          </SubPageSection>
        )}
      </AnimatePresence>

      <SubPageSection title="📖 洞天论">
        <InfoCard>
          <div style={{ columnCount: 2, columnGap: '2rem', columnRule: '1px solid rgba(6, 182, 212, 0.2)' }}>
            <p style={{
              color: 'rgba(180, 180, 190, 0.7)',
              lineHeight: 2,
              margin: 0,
              textIndent: '2em',
              fontStyle: 'italic',
            }}>
              夫洞天福地者，非惟山水之秀，实天地之灵气所钟，仙灵之所窟宅也。
              入其山者，道心自净，俗念自消。见其洞者，天机自悟，仙骨自成。
              是以古之至人，藏于名山，隐于岩穴，吸风饮露，修心炼形，
              积功累德，以至于神仙。故曰：山不在高，有仙则名；水不在深，有龙则灵。
            </p>
            <p style={{
              color: 'rgba(180, 180, 190, 0.7)',
              lineHeight: 2,
              margin: 0,
              textIndent: '2em',
              fontStyle: 'italic',
            }}>
              洞天者，上天之别馆，神仙之别业也。每洞天皆有仙官主之，
              分司善恶，录人功过。入山修道者，先斋戒，择良日，
              佩符而往，则山神护之，五兵避之，百毒远之，
              然后可以入山，求道于岩穴之间也。
            </p>
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
