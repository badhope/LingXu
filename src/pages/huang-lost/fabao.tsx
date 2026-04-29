'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface Artifact {
  rank: number
  name: string
  owner: string
  tier: string
  power: number
  desc: string
  ability: string[]
  detail: string
  origin: string
  history: string[]
  icon: string
  rarity: string
}

const ARTIFACTS: Artifact[] = [
  {
    rank: 1,
    name: '盘古幡',
    owner: '元始天尊',
    tier: '混沌至宝',
    power: 100,
    desc: '盘古斧之斧刃所化，掌混沌之力，撕裂空间，破碎万法。洪荒第一攻击至宝，一出则万道避让。',
    ability: ['撕裂空间', '破碎万法', '开天辟地'],
    detail: '盘古幡乃是盘古斧三大分身盘古斧之斧刃所化，承载了盘古全部的开天功德。幡动则天地变色，日月无光，混沌之气翻涌，能撕裂混沌，破碎虚空，粉碎万物。此宝一出，万法避让，圣人之下皆为蝼蚁。即便是圣人，也难以抵挡盘古幡的全力一击。盘古幡挥动之间，便有开天辟地之威，能重新开辟世界，也能毁灭世界。',
    origin: '盘古开天',
    history: ['盘古开天辟地', '盘古斧碎裂分化', '元始天尊掌阐教镇压气运', '封神大战大放异彩', '封神后归于阐教'],
    icon: '🏛️',
    rarity: 'SSS'
  },
  {
    rank: 2,
    name: '太极图',
    owner: '太上老君',
    tier: '混沌至宝',
    power: 99,
    desc: '盘古斧之斧柄所化，定地水火风，化解万般攻击。化金桥，渡众生，防御无双，包罗万象。',
    ability: ['定地水火风', '金桥渡世', '万法不侵'],
    detail: '太极图乃是盘古斧之斧柄所化，承载了盘古的造化功德。图内包罗万象，有地水火风，有阴阳五行，有周天星斗，有天地乾坤。展开太极图，便可定地水火风，化解一切攻击。化出金桥，渡化众生。此宝防御无双，万法不侵，万劫不灭。',
    origin: '盘古开天',
    history: ['盘古开天辟地', '盘古斧碎裂分化', '太上老君得之', '人教立教镇压气运', '老子出函谷关化胡为佛'],
    icon: '☯️',
    rarity: 'SSS'
  },
  {
    rank: 3,
    name: '混沌钟',
    owner: '东皇太一',
    tier: '混沌至宝',
    power: 98,
    desc: '盘古斧之斧背所化，镇压鸿蒙，防御无双。钟声一响，时空静止，万物归寂，洪荒第一防御至宝。',
    ability: ['镇压鸿蒙', '时空静止', '免疫一切'],
    detail: '混沌钟乃是盘古斧之斧背所化，承载了盘古的镇压功德。钟声一响，时空静止，万物归寂。此宝能镇压鸿蒙，防御一切攻击。即便是盘古幡的攻击，也能抵挡。东皇太一持此宝建立妖族天庭，镇压妖族气运。',
    origin: '盘古开天',
    history: ['盘古开天辟地', '盘古斧碎裂分化', '东皇太一掌妖族天庭', '巫妖大战东皇陨落', '钟落于不周山'],
    icon: '🔔',
    rarity: 'SSS'
  },
  {
    rank: 4,
    name: '诛仙剑阵',
    owner: '通天教主',
    tier: '先天至宝',
    power: 95,
    desc: '诛仙四剑+阵图，非四圣不可破。天道第一杀阵，诛仙戮佛，血染洪荒。',
    ability: ['诛仙戮佛', '杀伐无双', '困圣囚佛'],
    detail: '诛仙剑阵乃是天道第一杀阵，由诛仙四剑和诛仙阵图组成。此阵非四圣联手不可破。阵中有无穷杀运，诛仙戮佛，血染洪荒。通天教主凭此阵，在封神大战中单挑四圣，虽败犹荣。',
    origin: '魔神遗物',
    history: ['盘古开天辟地', '罗睺魔神陨落', '通天教主得之', '截教立教镇压气运', '封神大战四圣破阵'],
    icon: '⚔️',
    rarity: 'SS'
  },
  {
    rank: 5,
    name: '十二品莲台',
    owner: '接引道人',
    tier: '先天至宝',
    power: 92,
    desc: '混沌青莲莲子所化，业火不侵，万法不染。镇压佛门气运，渡化众生。',
    ability: ['渡化众生', '业火不侵', '镇运灵宝'],
    detail: '十二品莲台乃是混沌青莲莲子所化，花开十二品，业火不侵，万法不染。接引道人持此宝，建立西方教，镇压佛门气运。此宝能渡化众生，消除业障，增长功德。',
    origin: '混沌青莲',
    history: ['混沌青莲莲子化生', '接引道人得之', '西方教立教镇压气运', '巫妖大战被蚊道人吸食三品', '成为九品莲台'],
    icon: '🪷',
    rarity: 'SS'
  },
  {
    rank: 6,
    name: '山河社稷图',
    owner: '女娲娘娘',
    tier: '先天灵宝',
    power: 88,
    desc: '内有乾坤，可化山川河流，日月星辰。入图者如坠幻境，任人宰割。',
    ability: ['内有乾坤', '幻境囚笼', '演化世界'],
    detail: '山河社稷图乃是女娲娘娘法宝，内有乾坤，可化山川河流，日月星辰。入图者如坠幻境，任人宰割。此宝在封神大战中降服袁洪。',
    origin: '女娲遗宝',
    history: ['女娲娘娘法宝', '女娲造人补天', '山河社稷内有乾坤', '封神大战降服袁洪'],
    icon: '🗺️',
    rarity: 'S'
  },
  {
    rank: 7,
    name: '河图洛书',
    owner: '伏羲氏',
    tier: '先天灵宝',
    power: 85,
    desc: '天地之数，星斗排布。演算天机，趋吉避凶。妖族天庭镇压气运之宝。',
    ability: ['演算天机', '推衍大道', '趋吉避凶'],
    detail: '河图洛书乃是天地之数，星斗排布。此宝可演算天机，推衍大道，趋吉避凶。帝俊太一持此宝，建立妖族天庭，镇压妖族气运。',
    origin: '黄河龙马',
    history: ['龙马负图而出', '伏羲氏得之', '推演八卦', '女娲补天之后传于世间'],
    icon: '📜',
    rarity: 'S'
  },
  {
    rank: 8,
    name: '定海神针',
    owner: '孙悟空',
    tier: '后天功德至宝',
    power: 80,
    desc: '大禹治水时遗留，重一万三千五百斤。能大能小，随心变化。西游之路大放异彩。',
    ability: ['如意变化', '重逾万斤', '镇海之宝'],
    detail: '定海神针乃是太上老君炼制，大禹治水时遗留于东海。重一万三千五百斤。能大能小，随心变化。孙悟空得之，大闹天宫，保护唐僧西天取经。',
    origin: '老君炼制',
    history: ['太上老君八卦炉中炼制', '大禹治水遗留东海', '孙悟空东海得之', '大闹天宫', '西天取经'],
    icon: '🔱',
    rarity: 'A'
  },
  {
    rank: 9,
    name: '金刚琢',
    owner: '太上老君',
    tier: '先天灵宝',
    power: 78,
    desc: '太上老君防身至宝，能收万物。西游路上套走诸神兵器，收尽天下法宝。',
    ability: ['收尽万物', '金刚不坏', '反弹攻击'],
    detail: '金刚琢乃是太上老君防身至宝，锟铻钢炼就，点化而成。能收万物，能套法宝兵器，能反弹攻击。老君过函谷关，化胡为佛。',
    origin: '锟铻钢炼就',
    history: ['太上老君八卦炉中炼制', '老君过函谷关防身', '西游路上青牛精下界'],
    icon: '⭕',
    rarity: 'S'
  },
  {
    rank: 10,
    name: '金箍棒',
    owner: '孙悟空',
    tier: '后天功德至宝',
    power: 78,
    desc: '随心铁杆兵，能大能小，重一万三千五百斤。大闹天宫，西天取经，斩妖除魔。',
    ability: ['如意变化', '重逾万斤', '镇海之宝'],
    detail: '金箍棒乃是太上老君炼制，孙悟空得之。重一万三千五百斤。能大能小，随心变化。',
    origin: '老君炼制',
    history: ['太上老君八卦炉中炼制', '孙悟空得之', '大闹天宫', '西天取经'],
    icon: '💫',
    rarity: 'A'
  },
  {
    rank: 11,
    name: '九齿钉耙',
    owner: '猪八戒',
    tier: '后天灵宝',
    power: 75,
    desc: '太上老君亲手打造，玉帝赏赐天蓬元帅。重五千零四十八斤。',
    ability: ['变化无穷', '神冰淬炼', '天界至宝'],
    detail: '九齿钉耙乃是太上老君亲手打造，六丁六甲锻造完成。重五千零四十八斤。玉帝赏赐天蓬元帅。猪八戒得之，保护唐僧西天取经。',
    origin: '神冰淬炼',
    history: ['太上老君亲手打造', '六丁六甲锻造完成', '玉帝赏赐天蓬元帅', '猪八戒被贬下界', '西天取经路上建功'],
    icon: '🔨',
    rarity: 'A'
  },
  {
    rank: 12,
    name: '降妖宝杖',
    owner: '沙悟净',
    tier: '后天灵宝',
    power: 72,
    desc: '鲁班大师打造，吴刚伐下梭罗仙木。重五千零四十八斤。',
    ability: ['降妖伏魔', '梭罗仙木', '卷帘至宝'],
    detail: '降妖宝杖乃是鲁班大师吴刚伐下一枝梭罗仙木，玉帝赏赐卷帘大将。重五千零四十八斤。沙和尚得之，保护唐僧西天取经。',
    origin: '梭罗仙木',
    history: ['吴刚伐下一枝梭罗仙木', '玉帝赏赐卷帘大将', '沙和尚被贬下界', '流沙河为妖', '西天取经路上建功'],
    icon: '🪓',
    rarity: 'B'
  },
  {
    rank: 13,
    name: '轩辕剑',
    owner: '轩辕黄帝',
    tier: '后天功德至宝',
    power: 90,
    desc: '采首山之铜，铸此剑。剑身一面刻日月星辰，一面刻山川草木。',
    ability: ['人皇至宝', '斩妖除魔', '镇压人族气运'],
    detail: '轩辕剑乃是采首山之铜，铸此剑。剑身一面刻日月星辰，一面刻山川草木。剑柄一面书农耕畜养之术，一面书四海一统之策。',
    origin: '首山之铜',
    history: ['轩辕黄帝采首山之铜', '黄帝大战蚩尤', '黄帝得道飞升'],
    icon: '🗡️',
    rarity: 'S'
  },
  {
    rank: 14,
    name: '神农鼎',
    owner: '神农氏',
    tier: '先天灵宝',
    power: 88,
    desc: '炼仙丹，炼万物。熬炼金丹，九转还丹。',
    ability: ['熬炼金丹', '炼化万物', '不死仙药'],
    detail: '神农鼎乃是神农氏炼制，熬炼金丹，九转还丹。此宝可炼仙丹，炼万物。',
    origin: '先天灵宝',
    history: ['神农氏采五金之英', '神农尝百草', '神农鼎炼制金丹'],
    icon: '🏺',
    rarity: 'S'
  },
  {
    rank: 15,
    name: '崆峒印',
    owner: '人皇',
    tier: '先天灵宝',
    power: 86,
    desc: '崆峒山上，人皇至宝。掌人间气运，护人族安宁。',
    ability: ['人皇至宝', '镇压气运', '护佑人族'],
    detail: '崆峒印乃是崆峒山上，人皇至宝。掌人间气运，护人族安宁。',
    origin: '崆峒山上',
    history: ['崆峒山上出世', '人皇执掌'],
    icon: '🪙',
    rarity: 'S'
  },
  {
    rank: 16,
    name: '炼妖壶',
    owner: '女娲娘娘',
    tier: '先天灵宝',
    power: 84,
    desc: '炼化万妖，收尽天下妖物。内有乾坤，可装乾坤。',
    ability: ['炼化万妖', '收尽妖物', '内有乾坤'],
    detail: '炼妖壶乃是女娲娘娘炼制，炼化万妖，收尽天下妖物。',
    origin: '女娲炼制',
    history: ['女娲娘娘炼制', '女娲造人之后镇压妖物'],
    icon: '🏺',
    rarity: 'S'
  }
]

const SPIRITUAL_TREASURES = [
  {
    name: '乾坤袋',
    category: '空间类',
    effect: '内有乾坤，可装天地。',
    space: '千里',
    desc: '乾坤袋乃是空间至宝，内有乾坤，可装天地。',
    icon: '👜',
    rarity: 'A',
    difficulty: 3,
  },
  {
    name: '风火轮',
    category: '飞行类',
    effect: '足踏风火，日行万里。',
    speed: '万里',
    desc: '风火轮乃是哪吒之宝，足踏风火，日行万里。',
    icon: '🛞',
    rarity: 'A',
    difficulty: 4,
  },
  {
    name: '混天绫',
    category: '束缚类',
    effect: '翻江倒海，束缚万物。',
    power: 70,
    desc: '混天绫乃是哪吒之宝，翻江倒海，束缚万物。',
    icon: '🎀',
    rarity: 'A',
    difficulty: 3,
  },
  {
    name: '打神鞭',
    category: '攻击类',
    effect: '打神罚仙，专打元神。',
    power: 75,
    desc: '打神鞭乃是姜子牙之宝，打神罚仙，专打元神。',
    icon: '🏹',
    rarity: 'S',
    difficulty: 5,
  }
]

const REFINEMENT_TIERS = [
  { name: '凡铁', color: '#78716c' },
  { name: '法器', color: '#64748b' },
  { name: '灵器', color: '#3b82f6' },
  { name: '宝器', color: '#06b6d4' },
  { name: '后天灵宝', color: '#22c55e' },
  { name: '先天灵宝', color: '#a855f7' },
  { name: '先天至宝', color: '#f59e0b' },
  { name: '混沌至宝', color: '#ef4444' },
]

export default function FabaoPage() {
  const [filteredArtifacts, setFilteredArtifacts] = useState(ARTIFACTS)
  const [expandedArtifact, setExpandedArtifact] = useState<string | null>(null)
  const [filteredTreasures, setFilteredTreasures] = useState(SPIRITUAL_TREASURES)
  const [expandedTreasure, setExpandedTreasure] = useState<string | null>(null)
  const [refining, setRefining] = useState(false)
  const [refineTier, setRefineTier] = useState(0)
  const [refineProgress, setRefineProgress] = useState(0)
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null)
  const [finalTier, setFinalTier] = useState<number | null>(null)

  const startRefinement = useCallback((artifact: Artifact) => {
    setSelectedArtifact(artifact)
    setRefining(true)
    setRefineTier(0)
    setRefineProgress(0)
    setFinalTier(null)

    let tier = 0
    let progress = 0
    const maxTier = Math.min(artifact.power / 12.5, 8)

    const interval = setInterval(() => {
      progress += Math.random() * 2 + 0.5
      if (progress >= 100 && tier < maxTier - 1) {
        progress = 0
        tier++
        setRefineTier(tier)
      }
      if (tier >= maxTier - 1 && progress >= 100) {
        clearInterval(interval)
        setRefineProgress(100)
        setTimeout(() => {
          setFinalTier(tier)
          setRefining(false)
        }, 800)
        return
      }
      setRefineProgress(Math.min(progress, 100))
    }, 55)
  }, [])

  const handleArtifactFilter = useCallback((data: typeof ARTIFACTS) => {
    setFilteredArtifacts(data)
  }, [])

  const handleTreasureFilter = useCallback((data: typeof SPIRITUAL_TREASURES) => {
    setFilteredTreasures(data)
  }, [])

  const artifactFilters = {
    searchKeys: ['name', 'owner', 'tier', 'desc', 'detail', 'origin', 'ability'],
    filterKeys: {
      tier: [...new Set(ARTIFACTS.map(a => a.tier))],
      rarity: [...new Set(ARTIFACTS.map(a => a.rarity))].filter(Boolean),
    },
    sortOptions: [
      { key: 'power', label: '威力排序' },
      { key: 'rank', label: '排名排序' },
      { key: 'name', label: '法宝名称' },
    ],
  }

  const treasureFilters = {
    searchKeys: ['name', 'category', 'effect', 'desc'],
    filterKeys: {
      category: [...new Set(SPIRITUAL_TREASURES.map(t => t.category))],
      rarity: [...new Set(SPIRITUAL_TREASURES.map(t => t.rarity))],
    },
    sortOptions: [
      { key: 'name', label: '灵宝名称' },
      { key: 'power', label: '威力排序' },
      { key: 'difficulty', label: '难度排序' },
    ],
  }

  const getTierColor = (tier: string) => {
    if (tier.includes('混沌')) return {
      bg: 'linear-gradient(135deg, #a855f7, #7c3aed)',
      text: '#a855f7',
      crown: '👑'
    }
    if (tier.includes('先天至')) return {
      bg: 'linear-gradient(135deg, #ef4444, #dc2626)',
      text: '#ef4444',
      crown: '⭐'
    }
    return {
      bg: 'linear-gradient(135deg, #eab308, #ca8a04)',
      text: '#eab308',
      crown: '💎'
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'SSS': return { bg: 'linear-gradient(135deg, #a855f7, #7c3aed)', text: '#a855f7' }
      case 'SS': return { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', text: '#ef4444' }
      case 'S': return { bg: 'linear-gradient(135deg, #eab308, #ca8a04)', text: '#eab308' }
      case 'A': return { bg: 'linear-gradient(135deg, #3b82f6, #2563eb)', text: '#3b82f6' }
      default: return { bg: 'linear-gradient(135deg, #6b7280, #4b5563)', text: '#6b7280' }
    }
  }

  return (
    <SubPageTemplate
      title="先天法宝"
      subtitle="混沌灵宝 · 天生地养 · 法宝通灵 · 神器有灵"
      icon="🏺"
      colorRgb="168, 162, 158"
    >
      <SubPageSection title="法宝排行榜">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { rank: 'TOP 3', name: '盘古三宝', count: '混沌至宝', color: '#a855f7' },
              { rank: 'TOP 4-5', name: '诛仙剑阵+莲台', count: '先天至宝', color: '#ef4444' },
              { rank: 'TOP 6-8', name: '极品灵宝', count: '先天灵宝', color: '#eab308' }
            ].map((stat, i) => (
              <motion.div
                key={stat.rank}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: stat.color,
                  textShadow: `0 0 15px ${stat.color}`
                }}>
                  {stat.rank}
                </div>
                <div style={{ fontSize: '1.1rem', color: '#b89438', marginTop: '0.5rem' }}>
                  {stat.name}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'rgba(180, 180, 190, 0.6)',
                  marginTop: '0.25rem'
                }}>
                  {stat.count}
                </div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>
      <SubPageSection title="⚒️ 法宝炼器室">
        <InfoCard glowIntensity={90} glowColor="200, 50, 50">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!refining && !finalTier ? (
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚒️</div>
                <h3 style={{ marginBottom: '1rem', color: '#ef4444' }}>八卦炉中炼至宝</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  选择一件法宝，注入器灵，开启炼化
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  maxWidth: 700,
                  margin: '0 auto'
                }}>
                  {ARTIFACTS.slice(0, 8).map((art) => (
                    <motion.div
                      key={art.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startRefinement(art)}
                      style={{
                        padding: '1rem 0.75rem',
                        borderRadius: '10px',
                        background: 'rgba(50, 50, 60, 0.8)',
                        border: '1px solid rgba(180, 180, 190, 0.2)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{art.icon}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                        {art.name}
                      </div>
                      <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>{art.tier}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : refining ? (
              <div>
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  {selectedArtifact?.icon}
                </motion.div>
                <h3 style={{ marginBottom: '0.5rem', color: REFINEMENT_TIERS[refineTier].color }}>
                  正在炼化：{selectedArtifact?.name}
                </h3>
                <div style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: REFINEMENT_TIERS[refineTier].color,
                  textShadow: `0 0 20px ${REFINEMENT_TIERS[refineTier].color}`
                }}>
                  【{REFINEMENT_TIERS[refineTier].name}】
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  <ProgressBar value={refineProgress} color={REFINEMENT_TIERS[refineTier].color} />
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  maxWidth: 700,
                  margin: '0 auto',
                  fontSize: '0.7rem'
                }}>
                  {REFINEMENT_TIERS.map((t, i) => (
                    <div key={t.name} style={{
                      color: i <= refineTier ? t.color : 'rgba(180, 180, 190, 0.4)',
                      fontWeight: i === refineTier ? 700 : 400
                    }}>
                      {i + 1}. {t.name}
                    </div>
                  ))}
                </div>
              </div>
            ) : finalTier !== null ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ fontSize: '5rem', marginBottom: '1rem' }}
                  >
                    ✨
                  </motion.div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    color: REFINEMENT_TIERS[finalTier].color,
                    fontWeight: 700,
                    textShadow: `0 0 30px ${REFINEMENT_TIERS[finalTier].color}`
                  }}>
                    炼化成功！
                  </h2>
                  <p style={{
                    fontSize: '1.3rem',
                    color: REFINEMENT_TIERS[finalTier].color,
                    marginBottom: '0.5rem',
                    fontWeight: 700
                  }}>
                    {selectedArtifact?.name} - {REFINEMENT_TIERS[finalTier].name}
                  </p>
                  <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                    器灵注入成功，法宝威力全开！
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFinalTier(null)}
                    style={{
                      padding: '0.8rem 2rem',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid #ef4444',
                      borderRadius: '50px',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    🔄 再炼一件
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="🏆 封神至宝榜">
        <FilterBar
          data={ARTIFACTS}
          onFiltered={handleArtifactFilter}
          options={artifactFilters}
          placeholder="搜索法宝名称、主人、品级..."
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          {filteredArtifacts.map((item, index) => (
            <motion.div
              key={item.name}
              layout
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="xian-submodule-card"
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => setExpandedArtifact(expandedArtifact === item.name ? null : item.name)}
            >
              {item.rank <= 3 && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    fontSize: '2rem',
                    zIndex: 10
                  }}
                >
                  {getTierColor(item.tier).crown}
                </motion.div>
              )}

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ flexShrink: 0 }}>
                  <motion.div
                    animate={{
                      boxShadow: item.rank <= 3 ? [
                        `0 0 20px ${getTierColor(item.tier).text}`,
                        `0 0 40px ${getTierColor(item.tier).text}`,
                        `0 0 20px ${getTierColor(item.tier).text}`
                      ] : 'none'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '12px',
                      background: getTierColor(item.tier).bg,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    <div style={{ fontSize: '0.7rem' }}>NO.</div>
                    <div style={{ fontSize: '2rem' }}>{item.rank}</div>
                  </motion.div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '1.35rem',
                        fontWeight: 'bold',
                        color: getTierColor(item.tier).text
                      }}>
                        {item.icon} {item.name}
                      </span>
                      <span style={{
                        marginLeft: '0.75rem',
                        fontSize: '0.75rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        background: `rgba(180, 180, 190, 0.1)`,
                        color: getTierColor(item.tier).text
                      }}>
                        {item.tier}
                      </span>
                      <span style={{
                        marginLeft: '0.75rem',
                        fontSize: '0.75rem',
                        color: 'rgba(180, 180, 190, 0.5)'
                      }}>
                        🧙 {item.owner}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '100px',
                        height: '8px',
                        background: 'rgba(0,0,0, 0.3)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.power}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          style={{
                            height: '100%',
                            background: getTierColor(item.tier).bg
                          }}
                        />
                      </div>
                      <span style={{
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        color: getTierColor(item.tier).text
                      }}>
                        {item.power}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedArtifact === item.name ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ fontSize: '1rem', color: 'rgba(180, 180, 190, 0.5)' }}
                      >
                        ▼
                      </motion.div>
                    </div>
                  </div>

                  <p style={{
                    color: 'rgba(180, 180, 190, 0.75)',
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                    marginBottom: '0.75rem'
                  }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {item.ability.map((ab, i) => (
                      <span key={i} style={{
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, rgba(168, 85, 247, 0.2)`,
                        color: '#c4b5fd',
                        border: '1px solid rgba(168, 85, 247, 0.3)'
                      }}>
                        ✨ {ab}
                      </span>
                    ))}
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, rgba(234, 179, 8, 0.2)`,
                      color: '#fbbf24',
                      border: '1px solid rgba(234, 179, 8, 0.3)'
                    }}>
                      🏆 {item.rarity}
                    </span>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedArtifact === item.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      marginTop: '1.5rem',
                      paddingTop: '1.5rem',
                      borderTop: '1px solid rgba(168, 85, 247, 0.2)'
                    }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{ color: '#a855f7', marginBottom: '0.5rem', fontSize: '1rem' }}>📜 法宝详情</h4>
                        <p style={{ color: 'rgba(180, 180, 190, 0.7)', lineHeight: 1.8, fontSize: '0.9rem' }}>
                          {item.detail}
                        </p>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <h4 style={{ color: '#eab308', marginBottom: '0.5rem', fontSize: '0.9rem' }}>🌍 来历出处</h4>
                          <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem' }}>
                            {item.origin}
                          </p>
                        </div>
                        <div>
                          <h4 style={{ color: '#eab308', marginBottom: '0.5rem', fontSize: '0.9rem' }}>📚 历史传承</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            {item.history?.map((h, i) => (
                              <span key={i} style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem' }}>
                              • {h}
                            </span>
                          ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="后天灵宝">
        <FilterBar
          data={SPIRITUAL_TREASURES}
          onFiltered={handleTreasureFilter}
          options={treasureFilters}
          placeholder="搜索灵宝名称、类别..."
        />
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginTop: '1.5rem' }}
        >
          {filteredTreasures.map((treasure, index) => (
            <motion.div
              key={treasure.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="xian-submodule-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setExpandedTreasure(expandedTreasure === treasure.name ? null : treasure.name)}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  background: getRarityColor(treasure.rarity).bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem'
                }}>
                  {treasure.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '1.15rem',
                      fontWeight: 'bold',
                      color: getRarityColor(treasure.rarity).text
                    }}>
                      {treasure.name}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedTreasure === treasure.name ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)' }}
                    >
                      ▼
                    </motion.div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '8px',
                      background: 'rgba(59, 130, 246, 0.15)',
                      color: '#60a5fa'
                    }}>
                      {treasure.category}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '8px',
                      background: 'rgba(234, 179, 8, 0.15)',
                      color: '#fbbf24'
                    }}>
                      {treasure.rarity}
                    </span>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {expandedTreasure === treasure.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(168, 85, 247, 0.2)'
                    }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', lineHeight: 1.7, fontSize: '0.85rem' }}>
                        {treasure.desc}
                      </p>
                      <div style={{ marginTop: '0.75rem', color: '#3b82f6', fontSize: '0.85rem' }}>
                        ✨ {treasure.effect}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="灵宝偈语">
        <InfoCard>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                fontSize: '1.35rem',
                color: '#a855f7',
                fontStyle: 'italic',
                lineHeight: 2,
                letterSpacing: '0.05em'
              }}
            >
              混沌初分盘古先，太极两仪四象悬<br />
              子天丑地人寅出，避除兽患有巢贤<br />
              燧人取火免鲜食，伏羲画卦阴阳前<br />
              神农治世尝百草，轩辕礼乐婚姻联
            </motion.div>
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
