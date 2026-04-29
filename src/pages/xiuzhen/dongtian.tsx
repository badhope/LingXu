import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import ParticleField from '@/components/effects/Particles'
import { COLORS, SPACING, RADIUS, alpha, SHADOWS } from '@/styles/tokens'

const DONGTAIN_FUDI = [
  {
    id: 'wudang',
    name: '武当山',
    alias: '太和山',
    rank: '十大洞天',
    location: '湖北十堰',
    lingqiLevel: 95,
    patriarch: '真武大帝',
    desc: '亘古无双胜境，天下第一仙山',
    secret: '玄天上帝道场，内藏真武升仙台',
    color: COLORS.cyan,
    features: ['太极初祖', '真武道场', '绝壁悬宫'],
  },
  {
    id: 'emei',
    name: '峨眉山',
    alias: '灵觉山',
    rank: '三十六洞天',
    location: '四川峨眉',
    lingqiLevel: 92,
    patriarch: '普贤菩萨',
    desc: '蜀国多仙山，峨眉邈难匹',
    secret: '万年寺地宫藏有普贤愿力金莲',
    color: COLORS.gold,
    features: ['佛道同源', '金顶佛光', '灵猴听经'],
  },
  {
    id: 'shaolin',
    name: '嵩山',
    alias: '嵩高山',
    rank: '五岳之中岳',
    location: '河南登封',
    lingqiLevel: 90,
    patriarch: '达摩祖师',
    desc: '天地之中，禅宗祖庭',
    secret: '少林藏经阁地下，封印着蚩尤骸骨',
    color: COLORS.amber,
    features: ['禅宗祖庭', '武学圣地', '封禅祭坛'],
  },
  {
    id: 'taishan',
    name: '泰山',
    alias: '岱宗',
    rank: '五岳之东岳',
    location: '山东泰安',
    lingqiLevel: 98,
    patriarch: '东岳大帝',
    desc: '岱宗夫如何，齐鲁青未了',
    secret: '泰山封禅台连接地府，历代帝王在此交换人族气运',
    color: COLORS.teal,
    features: ['五岳独尊', '封禅圣地', '阴阳交界'],
  },
  {
    id: 'huashan',
    name: '华山',
    alias: '西岳',
    rank: '五岳之西岳',
    location: '陕西华阴',
    lingqiLevel: 88,
    patriarch: '西岳大帝',
    desc: '奇险天下第一山',
    secret: '华山思过崖后洞，藏有独孤九剑真迹',
    color: COLORS.gray200,
    features: ['论剑圣地', '绝壁天险', '陈抟老祖'],
  },
  {
    id: 'henshan_nan',
    name: '南岳衡山',
    alias: '寿岳',
    rank: '五岳之南岳',
    location: '湖南衡阳',
    lingqiLevel: 85,
    patriarch: '祝融火神',
    desc: '五岳独秀，中华寿岳',
    secret: '祝融峰顶火神殿，连接上古火神火种',
    color: COLORS.red,
    features: ['祝融神火', '黄庭经传', '朱陵洞天'],
  },
  {
    id: 'henshan_bei',
    name: '北岳恒山',
    alias: '玄岳',
    rank: '五岳之北岳',
    location: '山西大同',
    lingqiLevel: 87,
    patriarch: '北岳大帝',
    desc: '人天北柱，绝塞名山',
    secret: '悬空寺下镇压着十万阴兵',
    color: COLORS.gray600,
    features: ['悬空古寺', '三教合一', '幽冥通道'],
  },
  {
    id: 'songshan',
    name: '终南山',
    alias: '太乙山',
    rank: '第一福地',
    location: '陕西西安',
    lingqiLevel: 99,
    patriarch: '太上老君',
    desc: '终南捷径，仙都秘境',
    secret: '楼观台后有活死人墓，墓通昆仑虚',
    color: COLORS.teal,
    features: ['道祖说经', '隐者圣地', '龙脉交汇'],
  },
  {
    id: 'qingcheng',
    name: '青城山',
    alias: '丈人山',
    rank: '第五洞天',
    location: '四川都江堰',
    lingqiLevel: 94,
    patriarch: '太上老君',
    desc: '青城天下幽',
    secret: '天师洞下镇压着六大魔王',
    color: COLORS.green,
    features: ['天师道场', '五斗米教', '鬼城门户'],
  },
  {
    id: 'longhu',
    name: '龙虎山',
    alias: '云锦山',
    rank: '第三十二福地',
    location: '江西鹰潭',
    lingqiLevel: 93,
    patriarch: '张道陵天师',
    desc: '道教祖庭，张天师世居之地',
    secret: '天师府下有伏魔井，镇压着巫妖大劫残魂',
    color: COLORS.purple,
    features: ['正一祖庭', '符箓之源', '斩妖除魔'],
  },
  {
    id: 'maoshan',
    name: '茅山',
    alias: '句曲山',
    rank: '第八洞天',
    location: '江苏句容',
    lingqiLevel: 91,
    patriarch: '三茅真君',
    desc: '秦汉神仙府，梁唐宰相家',
    secret: '抗战期间茅山派燃尽全山灵脉布下诛魔大阵',
    color: COLORS.teal,
    features: ['上清派祖庭', '符箓法术', '驱邪捉鬼'],
  },
  {
    id: 'kunlun',
    name: '昆仑山',
    alias: '昆仑虚',
    rank: '万山之祖',
    location: '青海新疆交界',
    lingqiLevel: 100,
    patriarch: '西王母',
    desc: '天帝之下都，百神之所在',
    secret: '昆仑墟是封神后众仙在人间最后的据点',
    color: COLORS.blue,
    features: ['西王母瑶池', '元始道场', '仙凡入口'],
  },
  {
    id: 'penglai',
    name: '蓬莱仙岛',
    alias: '蓬丘',
    rank: '三仙山之首',
    location: '东海深处',
    lingqiLevel: 99,
    patriarch: '东华帝君',
    desc: '海上有仙山，山在虚无缥缈间',
    secret: '蓬莱是破碎虚空后的飞升中转站',
    color: COLORS.cyan,
    features: ['方丈瀛洲', '不死灵药', '地仙居所'],
  },
  {
    id: 'putuo',
    name: '普陀山',
    alias: '补怛洛迦',
    rank: '海天佛国',
    location: '浙江舟山',
    lingqiLevel: 89,
    patriarch: '观音菩萨',
    desc: '南海圣境，观音道场',
    secret: '紫竹林中藏有观音净瓶甘露',
    color: COLORS.blue,
    features: ['观音道场', '南海莲台', '普渡众生'],
  },
  {
    id: 'jiuhua',
    name: '九华山',
    alias: '九子山',
    rank: '佛国仙城',
    location: '安徽池州',
    lingqiLevel: 86,
    patriarch: '地藏菩萨',
    desc: '东南第一山',
    secret: '地藏殿地狱入口，菩萨常驻度化众生',
    color: COLORS.amber,
    features: ['幽冥教主', '肉身宝殿', '度亡道场'],
  },
  {
    id: 'wuyi',
    name: '武夷山',
    alias: '虎溪山',
    rank: '第十六洞天',
    location: '福建南平',
    lingqiLevel: 84,
    patriarch: '武夷君',
    desc: '三三秀水清如玉，六六奇峰翠插天',
    secret: '水帘洞内藏有彭祖长寿秘诀',
    color: COLORS.teal,
    features: ['大红袍祖', '彭祖修炼', '悬棺仙蜕'],
  },
]

const getLingqiColor = (level: number) => {
  if (level >= 95) return COLORS.gold
  if (level >= 90) return COLORS.purple
  if (level >= 85) return COLORS.blue
  return COLORS.green
}

export default function DongTianPage() {
  const [selected, setSelected] = useState<typeof DONGTAIN_FUDI[0] | null>(null)
  const [unlocked, setUnlocked] = useState<string[]>(['wudang', 'taishan', 'emei'])

  const handleExplore = (dongtian: typeof DONGTAIN_FUDI[0]) => {
    setSelected(dongtian)
    if (!unlocked.includes(dongtian.id)) {
      setUnlocked(prev => [...prev, dongtian.id])
    }
  }

  return (
    <>
      <ParticleField type="spiritual" density={0.8} speed={0.3} interactive />

      <SubPageTemplate
        title="洞天福地"
        subtitle="三山五岳，十洲三岛，灵气汇聚之地"
        colorRgb={COLORS.tealRgb}
      >
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(10px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: SPACING['2xl'],
              }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={e => e.stopPropagation()}
                style={{
                  maxWidth: 550,
                  width: '100%',
                  padding: SPACING['3xl'],
                  borderRadius: RADIUS['2xl'],
                  background: `
                    radial-gradient(ellipse at 0% 0%, ${alpha(selected.color, 0.2)}, transparent 50%),
                    radial-gradient(ellipse at 100% 100%, ${alpha(selected.color, 0.1)}, transparent 50%),
                    ${COLORS.bg.card}
                  `,
                  border: `2px solid ${alpha(selected.color, 0.3)}`,
                  boxShadow: `0 0 60px ${alpha(selected.color, 0.2)}`,
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: SPACING['2xl'] }}>
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${selected.color}, ${alpha(selected.color, 0.3)})`,
                    boxShadow: `0 0 40px ${alpha(selected.color, 0.5)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 36,
                    margin: '0 auto',
                    marginBottom: SPACING.lg,
                  }}>
                    🏔️
                  </div>
                  <div style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: selected.color,
                    marginBottom: SPACING.xs,
                  }}>
                    {selected.name}
                  </div>
                  <div style={{
                    fontSize: 14,
                    color: COLORS.text.muted,
                  }}>
                    「{selected.alias}」· {selected.rank}
                  </div>
                </div>

                <div style={{ marginBottom: SPACING.xl }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: SPACING.sm,
                  }}>
                    <span style={{ color: COLORS.text.secondary }}>灵脉品级</span>
                    <span style={{
                      color: getLingqiColor(selected.lingqiLevel),
                      fontWeight: 700,
                      fontSize: 20,
                    }}>
                      {selected.lingqiLevel}
                    </span>
                  </div>
                  <div style={{
                    height: 8,
                    borderRadius: RADIUS.full,
                    background: alpha(COLORS.gray700, 0.5),
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selected.lingqiLevel}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${getLingqiColor(selected.lingqiLevel)}, ${alpha(getLingqiColor(selected.lingqiLevel), 0.5)})`,
                        boxShadow: `0 0 10px ${getLingqiColor(selected.lingqiLevel)}`,
                      }}
                    />
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: SPACING.md,
                  marginBottom: SPACING['2xl'],
                }}>
                  {selected.features.map(f => (
                    <span key={f} style={{
                      padding: `${SPACING.xs} ${SPACING.lg}`,
                      borderRadius: RADIUS.full,
                      background: alpha(selected.color, 0.15),
                      border: `1px solid ${alpha(selected.color, 0.3)}`,
                      color: selected.color,
                      fontSize: 12,
                    }}>
                      {f}
                    </span>
                  ))}
                </div>

                <div style={{
                  padding: SPACING.xl,
                  borderRadius: RADIUS.lg,
                  background: alpha(COLORS.bg.dark, 0.6),
                  marginBottom: SPACING.xl,
                }}>
                  <div style={{
                    fontSize: 12,
                    color: COLORS.text.muted,
                    marginBottom: SPACING.sm,
                  }}>📍 {selected.location}</div>
                  <div style={{
                    color: COLORS.text.secondary,
                    marginBottom: SPACING.md,
                    lineHeight: 1.8,
                  }}>
                    {selected.desc}
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: selected.color,
                    fontStyle: 'italic',
                    fontFamily: 'serif',
                  }}>
                    🔮 「{selected.secret}」
                  </div>
                </div>

                <div style={{
                  fontSize: 12,
                  color: COLORS.text.muted,
                  textAlign: 'center',
                }}>
                  开山大祖师：{selected.patriarch}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: SPACING['3xl'] }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: SPACING.lg,
          }}>
            {[
              { label: '已探索', value: unlocked.length, total: DONGTAIN_FUDI.length, color: COLORS.green, icon: '🗺️' },
              { label: '灵脉95+', value: DONGTAIN_FUDI.filter(d => d.lingqiLevel >= 95).length, color: COLORS.gold, icon: '💎' },
              { label: '道教洞天', value: DONGTAIN_FUDI.filter(d => d.rank.includes('洞天')).length, color: COLORS.purple, icon: '🏛️' },
              { label: '五岳名山', value: 5, color: COLORS.blue, icon: '⛰️' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                style={{
                  padding: SPACING.xl,
                  borderRadius: RADIUS.xl,
                  background: alpha(stat.color, 0.08),
                  border: `1px solid ${alpha(stat.color, 0.2)}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: SPACING.sm }}>{stat.icon}</div>
                <div style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: stat.color,
                }}>
                  {stat.value}{stat.total ? `/${stat.total}` : ''}
                </div>
                <div style={{
                  fontSize: 12,
                  color: COLORS.text.muted,
                  marginTop: SPACING.xs,
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: SPACING.xl,
        }}>
          {DONGTAIN_FUDI.map((dongtian, idx) => {
            const isUnlocked = unlocked.includes(dongtian.id)
            
            return (
              <motion.div
                key={dongtian.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleExplore(dongtian)}
                style={{
                  padding: SPACING.xl,
                  borderRadius: RADIUS.xl,
                  background: isUnlocked ? `
                    radial-gradient(ellipse at 0% 0%, ${alpha(dongtian.color, 0.15)}, transparent 50%),
                    ${alpha(COLORS.bg.card, 0.9)}
                  ` : alpha(COLORS.gray800, 0.5),
                  border: `1px solid ${isUnlocked ? alpha(dongtian.color, 0.25) : alpha(COLORS.gray600, 0.3)}`,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {!isUnlocked && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: alpha(COLORS.bg.dark, 0.7),
                    backdropFilter: 'blur(4px)',
                    fontSize: 40,
                  }}>
                    🔒
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: SPACING.lg,
                }}>
                  <div style={{
                    width: 50,
                    height: 50,
                    borderRadius: RADIUS.lg,
                    background: `radial-gradient(circle, ${dongtian.color}, ${alpha(dongtian.color, 0.3)})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    boxShadow: `0 8px 24px ${alpha(dongtian.color, 0.3)}`,
                  }}>
                    🏔️
                  </div>
                  <div style={{
                    textAlign: 'right',
                  }}>
                    <div style={{
                      fontSize: 10,
                      color: COLORS.text.muted,
                      marginBottom: 2,
                    }}>
                      灵脉品级
                    </div>
                    <div style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: getLingqiColor(dongtian.lingqiLevel),
                    }}>
                      {dongtian.lingqiLevel}
                    </div>
                  </div>
                </div>

                <div style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: isUnlocked ? dongtian.color : COLORS.text.muted,
                  marginBottom: SPACING.xs,
                }}>
                  {dongtian.name}
                </div>
                <div style={{
                  fontSize: 12,
                  color: COLORS.text.muted,
                  marginBottom: SPACING.md,
                }}>
                  {dongtian.rank} · {dongtian.location}
                </div>
                <div style={{
                  fontSize: 13,
                  color: COLORS.text.secondary,
                  lineHeight: 1.6,
                }}>
                  {dongtian.desc}
                </div>

                <div style={{
                  display: 'flex',
                  gap: SPACING.sm,
                  marginTop: SPACING.lg,
                  flexWrap: 'wrap',
                }}>
                  {dongtian.features.slice(0, 2).map(f => (
                    <span key={f} style={{
                      padding: '2px 10px',
                      borderRadius: RADIUS.full,
                      background: alpha(dongtian.color, 0.12),
                      fontSize: 11,
                      color: dongtian.color,
                    }}>
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </SubPageTemplate>
    </>
  )
}
