'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface Formation {
  name: string
  tier: string
  rank: number
  creator: string
  power: number
  requiredPeople: number
  feature: string
  desc: string
  detail: string
  principle: string
  breakingMethods: string[]
  famousBattles: string[]
  category: string
  rarity: string
  icon: string
  color: string
}

const FORMATIONS: Formation[] = [
  {
    name: '诛仙剑阵',
    tier: 'SSS级',
    rank: 1,
    creator: '罗睺魔神',
    power: 100,
    requiredPeople: 1,
    feature: '天道第一杀阵，非四圣不可破',
    category: '杀伐阵',
    desc: '诛仙四剑+阵图，天道第一杀阵。诛仙戮佛，血染洪荒，杀伐无双。',
    detail: '诛仙剑阵乃是天道第一杀阵，由诛仙四剑（诛仙剑、戮仙剑、陷仙剑、绝仙剑）和诛仙阵图组成。此阵由罗睺魔神创造，后为通天教主所得。阵中有无穷杀运，诛仙戮佛，血染洪荒。此阵非四圣联手不可破。封神大战中，通天教主凭此阵单挑老子、元始、接引、准提四圣，虽败犹荣。',
    principle: '截取天道一线生机，化杀运为己用，以力证道之极致',
    breakingMethods: ['四圣联手破阵', '夺取诛仙阵图', '毁去四剑'],
    famousBattles: ['封神大战诛仙阵', '罗睺战鸿钧', '通天战四圣'],
    rarity: 'SSS',
    icon: '⚔️',
    color: '#ef4444'
  },
  {
    name: '周天星斗大阵',
    tier: 'SS级',
    rank: 2,
    creator: '帝俊、太一',
    power: 95,
    requiredPeople: 365,
    feature: '周天星斗之力，化为银河倾泻',
    category: '天星阵',
    desc: '妖族天庭镇运大阵，引365颗太古星辰之力。',
    detail: '周天星斗大阵乃是妖族天庭镇运大阵，由帝俊、太一创立，配合河图洛书，引365颗太古星辰之力，化为周天星河，威力无穷。此阵需要365位大妖共同布置，配合妖师鲲鹏的阵法之道，威力可屠圣人。巫妖大战中，此阵与十二都天神煞大阵对轰，两败俱伤。',
    principle: '人与天合，借星斗之力，我即星辰，星辰即我',
    breakingMethods: ['破去星斗引路灯', '毁去河图洛书', '斩杀阵眼大妖'],
    famousBattles: ['巫妖大战', '妖族天庭建立', '夸父逐日之战'],
    rarity: 'SS',
    icon: '⭐',
    color: '#a855f7'
  },
  {
    name: '十二都天神煞大阵',
    tier: 'SS级',
    rank: 3,
    creator: '十二祖巫',
    power: 95,
    requiredPeople: 12,
    feature: '盘古真身，开天辟地',
    category: '祖巫阵',
    desc: '十二祖巫合力，凝聚盘古真身，开天辟地。',
    detail: '十二都天神煞大阵乃是巫族镇族大阵，由十二祖巫各自的都天神煞旗组成，凝聚盘古真身，拥有开天辟地之能。此阵需要十二祖巫同心协力，缺一不可。巫妖大战中，此阵与周天星斗大阵对轰，祖巫身陨，巫妖俱灭。',
    principle: '以自身精血为引，召唤盘古残魂，以力证道',
    breakingMethods: ['分化十二祖巫', '斩杀任一祖巫', '以圣人之力强行破阵'],
    famousBattles: ['巫妖大战', '盘古开天残韵', '共工怒撞不周山'],
    rarity: 'SS',
    icon: '💀',
    color: '#dc2626'
  },
  {
    name: '九曲黄河阵',
    tier: 'S级',
    rank: 4,
    creator: '三霄娘娘',
    power: 88,
    requiredPeople: 3,
    feature: '消去顶上三花，胸中五气',
    category: '困杀阵',
    desc: '云霄、琼霄、碧霄所创，削去仙根，打落修为。',
    detail: '九曲黄河阵乃是三霄娘娘为报赵公明之仇所布，以混元金斗为阵眼，削去仙人顶上三花，胸中五气，打落境界。此阵困住阐教十二金仙，削去其千年道行，打为凡人。若非老子亲自出手，阐教基业毁于一旦。',
    principle: '人生于胞胎，死于坟墓，以天地为洪炉，造化为工',
    breakingMethods: ['圣人出手镇压', '夺取混元金斗', '斩杀三霄娘娘'],
    famousBattles: ['封神大战黄河阵', '困十二金仙', '老子化胡'],
    rarity: 'S',
    icon: '🌊',
    color: '#3b82f6'
  },
  {
    name: '万仙阵',
    tier: 'S级',
    rank: 5,
    creator: '通天教主',
    power: 85,
    requiredPeople: 10000,
    feature: '万仙来朝，截教气运',
    category: '万仙阵',
    desc: '截教万仙组成，威力无穷，封神大战最终决战。',
    detail: '万仙阵乃是截教最终之阵，由截教万仙组成，配合六魂幡，威力无穷。此阵由通天教主主持，四大亲传弟子坐镇，本欲覆灭阐教。奈何长耳定光仙背叛，盗走六魂幡，导致万仙阵破，截教覆灭。',
    principle: '众生平等，有教无类，万仙来朝，截取一线生机',
    breakingMethods: ['四圣联手破阵', '夺取六魂幡', '分化截教弟子'],
    famousBattles: ['封神大战最终战', '截教覆灭', '鸿钧下凡'],
    rarity: 'S',
    icon: '👥',
    color: '#8b5cf6'
  },
  {
    name: '十绝阵',
    tier: 'A级',
    rank: 6,
    creator: '金鳌岛十天君',
    power: 75,
    requiredPeople: 10,
    feature: '十天绝杀，一一破之',
    category: '绝杀阵',
    desc: '金鳌岛十天君所创，十阵连环，阵阵绝杀。',
    detail: '十绝阵乃是金鳌岛十天君所创，分为：天绝阵、地烈阵、风吼阵、寒冰阵、金光阵、化血阵、烈焰阵、落魂阵、红水阵、红砂阵。十阵连环，阵阵绝杀。封神大战中，燃灯道人主持破阵，死伤惨重。',
    principle: '十绝对应十天干，天地无极，造化杀生',
    breakingMethods: ['以阵破阵', '一一攻破', '牺牲阵前之人'],
    famousBattles: ['封神大战十绝阵', '燃灯破阵', '武王红砂百日灾'],
    rarity: 'A',
    icon: '💫',
    color: '#6366f1'
  },
  {
    name: '两仪微尘阵',
    tier: 'S级',
    rank: 7,
    creator: '太清老子',
    power: 90,
    requiredPeople: 1,
    feature: '芥子须弥，两仪化生',
    category: '太清阵',
    desc: '太清圣人所创，内有乾坤，两仪化生，防御无双。',
    detail: '两仪微尘阵乃是太清圣人老子所创，分生死幻灭四门主，配合太极图，芥子须弥，两仪化生。此阵防御无双，万法不侵。蜀山传中，长眉真人以此阵镇压幽泉血魔。',
    principle: '一粒微尘藏世界，半分山色见天机，两仪化生，生生不息',
    breakingMethods: ['以力破法', '圣人级数攻伐', '破去四象阵眼'],
    famousBattles: ['蜀山镇压幽泉', '太清炼丹护阵', '人教立教大阵'],
    rarity: 'S',
    icon: '☯️',
    color: '#fbbf24'
  },
  {
    name: '太乙分光剑阵',
    tier: 'A级',
    rank: 8,
    creator: '长眉真人',
    power: 70,
    requiredPeople: 8,
    feature: '八剑分光，诛仙戮魔',
    category: '峨眉阵',
    desc: '峨眉镇山剑阵，八口仙剑，分光捉影，诛邪灭魔。',
    detail: '太乙分光剑阵乃是峨眉派镇山剑阵，由长眉真人所创，以紫郢、青索等八口仙剑组成。八剑分光，分光捉影，诛邪灭魔。此阵配合峨眉心法，威力无穷，为蜀山第一剑阵。',
    principle: '太乙分光，八卦显象，剑即是心，心即是剑',
    breakingMethods: ['夺取任一宝剑', '强夺阵眼紫郢剑', '分化八剑持有者'],
    famousBattles: ['蜀山传斗剑', '三次峨眉斗剑', '镇压五台魔教'],
    rarity: 'A',
    icon: '🗡️',
    color: '#06b6d4'
  },
  {
    name: '九天都篆火府阵',
    tier: 'A级',
    rank: 9,
    creator: '火德星君',
    power: 72,
    requiredPeople: 9,
    feature: '九天神火，化为火海',
    category: '火焰阵',
    desc: '火德星君所创，九天神火，化为火海，焚尽万物。',
    detail: '九天都篆火府阵乃是火德星君所创，引九天神火，化为火海，焚尽万物。此阵需要九位火部正神共同主持，配合南方荧惑星火气，威力无穷。封神大战中，罗宣以此阵焚烧西岐。',
    principle: '离火焚天，化为朱雀，九天神火，焚尽苍穹',
    breakingMethods: ['以水克火', '北方壬癸水破之', '斩杀火部正神'],
    famousBattles: ['罗宣焚西岐', '火德星君降世', '火烧摘星楼'],
    rarity: 'A',
    icon: '🔥',
    color: '#f97316'
  },
  {
    name: '弱水迷魂阵',
    tier: 'B级',
    rank: 10,
    creator: '水德星君',
    power: 65,
    requiredPeople: 4,
    feature: '弱水三千，迷魂夺魄',
    category: '水系阵',
    desc: '水德星君所创，弱水三千，迷魂夺魄，鸿毛不浮。',
    detail: '弱水迷魂阵乃是水德星君所创，引天河弱水，迷魂夺魄，鸿毛不浮。此阵配合迷魂香，仙人入内即迷失心智，任人宰割。天庭蟠桃会护阵之一。',
    principle: '上善若水，水利万物而不争，故几于道',
    breakingMethods: ['避水神珠破之', '土系法术镇压', '定海神针定水'],
    famousBattles: ['蟠桃会护阵', '天河水军操练', '卷帘大将被贬'],
    rarity: 'B',
    icon: '💧',
    color: '#0ea5e9'
  }
]

const ARRAY_TYPES = [
  {
    name: '聚灵阵',
    category: '辅助类',
    effect: '聚集灵气，加速修炼',
    layout: '五行方位',
    materials: ['灵玉石', '聚气珠', '五行旗'],
    desc: '最基础的修炼辅助阵法，聚集天地灵气于阵中。',
    icon: '💎',
    rarity: 'C',
    difficulty: 1,
  },
  {
    name: '护山大阵',
    category: '防御类',
    effect: '护佑山门，抵御外敌',
    layout: '八卦方位',
    materials: ['阵盘', '阵旗', '灵石脉'],
    desc: '宗门护山之阵，抵御外敌入侵，守护山门安宁。',
    icon: '🏔️',
    rarity: 'A',
    difficulty: 4,
  },
  {
    name: '传送阵',
    category: '空间类',
    effect: '空间传送，万里一瞬',
    layout: '空间坐标',
    materials: ['空间晶石', '传送阵盘', '坐标石'],
    desc: '空间传送之阵，万里距离一瞬而至。',
    icon: '🌀',
    rarity: 'S',
    difficulty: 5,
  },
  {
    name: '幻阵',
    category: '幻术类',
    effect: '幻境重重，迷失心智',
    layout: '奇门遁甲',
    materials: ['幻石', '迷魂香', '蜃珠'],
    desc: '幻术阵法，制造幻境，迷失敌心智。',
    icon: '🎭',
    rarity: 'B',
    difficulty: 3,
  }
]

export default function ZhenfaPage() {
  const [filteredFormations, setFilteredFormations] = useState(FORMATIONS)
  const [expandedFormation, setExpandedFormation] = useState<string | null>(null)
  const [filteredTypes, setFilteredTypes] = useState(ARRAY_TYPES)
  const [expandedType, setExpandedType] = useState<string | null>(null)

  const handleFormationFilter = useCallback((data: typeof FORMATIONS) => {
    setFilteredFormations(data)
  }, [])

  const handleTypeFilter = useCallback((data: typeof ARRAY_TYPES) => {
    setFilteredTypes(data)
  }, [])

  const formationFilters = {
    searchKeys: ['name', 'creator', 'category', 'feature', 'desc', 'detail', 'principle'],
    filterKeys: {
      category: [...new Set(FORMATIONS.map(f => f.category))],
      rarity: [...new Set(FORMATIONS.map(f => f.rarity))],
      tier: [...new Set(FORMATIONS.map(f => f.tier))],
    },
    sortOptions: [
      { key: 'power', label: '威力排序' },
      { key: 'rank', label: '排名排序' },
      { key: 'name', label: '阵法名称' },
    ],
  }

  const typeFilters = {
    searchKeys: ['name', 'category', 'effect', 'desc', 'materials'],
    filterKeys: {
      category: [...new Set(ARRAY_TYPES.map(t => t.category))],
      rarity: [...new Set(ARRAY_TYPES.map(t => t.rarity))],
    },
    sortOptions: [
      { key: 'name', label: '阵法名称' },
      { key: 'difficulty', label: '难度排序' },
    ],
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'SSS': return { bg: 'linear-gradient(135deg, #a855f7, #7c3aed)', text: '#a855f7' }
      case 'SS': return { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', text: '#ef4444' }
      case 'S': return { bg: 'linear-gradient(135deg, #eab308, #ca8a04)', text: '#eab308' }
      case 'A': return { bg: 'linear-gradient(135deg, #3b82f6, #2563eb)', text: '#3b82f6' }
      case 'B': return { bg: 'linear-gradient(135deg, #10b981, #059669)', text: '#10b981' }
      default: return { bg: 'linear-gradient(135deg, #6b7280, #4b5563)', text: '#6b7280' }
    }
  }

  return (
    <SubPageTemplate
      title="阵法大全"
      subtitle="天地为盘 · 万物为子 · 阴阳运化 · 乾坤在握"
      icon="🔮"
      colorRgb="139, 92, 246"
    >
      <SubPageSection title="阵道总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { name: '杀伐阵', count: 'SSS级', desc: '诛仙戮佛', color: '#ef4444' },
              { name: '防御阵', count: 'S级', desc: '万法不侵', color: '#3b82f6' },
              { name: '困杀阵', count: 'S级', desc: '削仙根', color: '#10b981' },
              { name: '天星阵', count: 'SS级', desc: '星斗之力', color: '#a855f7' }
            ].map((stat, i) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: stat.color,
                  textShadow: `0 0 15px ${stat.color}`
                }}>
                  {stat.name}
                </div>
                <div style={{ fontSize: '0.95rem', color: '#b89438', marginTop: '0.5rem' }}>
                  {stat.count}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(180, 180, 190, 0.6)',
                  marginTop: '0.25rem'
                }}>
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="上古杀阵">
        <FilterBar
          data={FORMATIONS}
          onFiltered={handleFormationFilter}
          options={formationFilters}
          placeholder="搜索阵法名称、创造者、类别..."
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          {filteredFormations.map((formation, index) => (
            <motion.div
              key={formation.name}
              layout
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="xian-submodule-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setExpandedFormation(expandedFormation === formation.name ? null : formation.name)}
            >
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${formation.color}, ${formation.color}88)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <div style={{ fontSize: '1.75rem' }}>{formation.icon}</div>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: formation.color
                      }}>
                        {formation.name}
                      </span>
                      <span style={{
                        marginLeft: '0.75rem',
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        background: `rgba(180, 180, 190, 0.1)`,
                        color: formation.color
                      }}>
                        {formation.tier}
                      </span>
                      <span style={{
                        marginLeft: '0.75rem',
                        fontSize: '0.7rem',
                        color: 'rgba(180, 180, 190, 0.5)'
                      }}>
                        🧙 {formation.creator}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{
                        fontWeight: 'bold',
                        fontSize: '1.15rem',
                        color: formation.color
                      }}>
                        威力 {formation.power}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedFormation === formation.name ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ fontSize: '0.9rem', color: 'rgba(180, 180, 190, 0.5)' }}
                      >
                        ▼
                      </motion.div>
                    </div>
                  </div>

                  <p style={{
                    color: 'rgba(180, 180, 190, 0.75)',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    marginBottom: '0.5rem'
                  }}>
                    {formation.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, rgba(139, 92, 246, 0.2)`,
                      color: '#c4b5fd',
                      border: '1px solid rgba(139, 92, 246, 0.3)'
                    }}>
                      👥 需要{formation.requiredPeople}人
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, rgba(234, 179, 8, 0.2)`,
                      color: '#fbbf24',
                      border: '1px solid rgba(234, 179, 8, 0.3)'
                    }}>
                      {formation.category}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px',
                      background: getRarityColor(formation.rarity).bg,
                      color: 'white'
                    }}>
                      🏆 {formation.rarity}
                    </span>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedFormation === formation.name && (
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
                      borderTop: '1px solid rgba(139, 92, 246, 0.2)'
                    }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{ color: formation.color, marginBottom: '0.5rem', fontSize: '1rem' }}>📜 阵法详解</h4>
                        <p style={{ color: 'rgba(180, 180, 190, 0.7)', lineHeight: 1.8, fontSize: '0.9rem' }}>
                          {formation.detail}
                        </p>
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{ color: '#eab308', marginBottom: '0.5rem', fontSize: '0.9rem' }}>💡 阵道原理</h4>
                        <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontStyle: 'italic', fontSize: '0.85rem' }}>
                          「{formation.principle}」
                        </p>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <h4 style={{ color: '#ef4444', marginBottom: '0.5rem', fontSize: '0.9rem' }}>⚔️ 破阵之法</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            {formation.breakingMethods.map((m, i) => (
                              <span key={i} style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem' }}>
                                • {m}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem', fontSize: '0.9rem' }}>📚 经典战役</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            {formation.famousBattles.map((b, i) => (
                              <span key={i} style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem' }}>
                                • {b}
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

      <SubPageSection title="常用阵法">
        <FilterBar
          data={ARRAY_TYPES}
          onFiltered={handleTypeFilter}
          options={typeFilters}
          placeholder="搜索阵法类型、功用..."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          {filteredTypes.map((type, index) => (
            <motion.div
              key={type.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="xian-submodule-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setExpandedType(expandedType === type.name ? null : type.name)}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  background: getRarityColor(type.rarity).bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem'
                }}>
                  {type.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '1.15rem',
                      fontWeight: 'bold',
                      color: getRarityColor(type.rarity).text
                    }}>
                      {type.name}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedType === type.name ? 180 : 0 }}
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
                      {type.category}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '8px',
                      background: 'rgba(234, 179, 8, 0.15)',
                      color: '#fbbf24'
                    }}>
                      {type.rarity}
                    </span>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {expandedType === type.name && (
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
                      borderTop: '1px solid rgba(139, 92, 246, 0.2)'
                    }}>
                      <p style={{ color: 'rgba(180, 180, 190, 0.7)', lineHeight: 1.7, fontSize: '0.85rem' }}>
                        {type.desc}
                      </p>
                      <div style={{ marginTop: '0.75rem', color: '#3b82f6', fontSize: '0.85rem' }}>
                        ✨ {type.effect}
                      </div>
                      <div style={{ marginTop: '0.75rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'rgba(180, 180, 190, 0.5)' }}>所需材料：</span>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                          {type.materials.map((m, i) => (
                            <span key={i} style={{
                              fontSize: '0.7rem',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '10px',
                              background: 'rgba(16, 185, 129, 0.15)',
                              color: '#34d399'
                            }}>
                              {m}
                            </span>
                          ))}
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

      <SubPageSection title="阵道真言">
        <InfoCard>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                fontSize: '1.25rem',
                color: '#8b5cf6',
                fontStyle: 'italic',
                lineHeight: 2,
                letterSpacing: '0.05em'
              }}
            >
              天地为盘兮万物为子，阴阳运化兮乾坤莫测<br />
              周天星斗兮银河倾泻，十二都天兮盘古真身<br />
              诛仙四剑兮杀伐无双，万仙来朝兮截取生机<br />
              阵道之极兮天人合一，大道无形兮生育天地
            </motion.div>
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
