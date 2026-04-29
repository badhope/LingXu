'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface StarRegion {
  name: string
  constellation: string
  stars: number
  area: number
  lord: string
  feature: string
  desc: string
  detail: string
  planets: string[]
  spiritBeasts: string[]
  wonders: string[]
  danger: number
  auraLevel: number
  color: string
  icon: string
}

interface StarNavigation {
  from: string
  to: string
  distance: number
  time: number
  danger: number
  completed: boolean
}

const STAR_REGIONS: StarRegion[] = [
  {
    name: '紫微垣',
    constellation: '北天中央',
    stars: 163,
    area: 1000,
    lord: '紫微大帝',
    feature: '天帝居所，万星朝宗',
    desc: '三垣之首，北天中央，天帝之所居，星辰之枢纽。',
    detail: '紫微垣乃是三垣之首，位于北天中央，是天帝的居所，天宫之所在。紫微垣中有星辰163颗，对应人间的帝王将相。紫微垣乃是星象最重要的区域，主帝王兴衰，国祚长短。其中北极星乃是帝星，永恒不动，众星环绕。',
    planets: ['帝星', '太子星', '庶子星', '后宫星', '天枢'],
    spiritBeasts: ['天龙', '凤凰', '麒麟', '玄武'],
    wonders: ['天宫', '南天门', '瑶池', '御花园'],
    danger: 5,
    auraLevel: 100,
    color: '#7c3aed',
    icon: '👑'
  },
  {
    name: '太微垣',
    constellation: '北斗之南',
    stars: 78,
    area: 800,
    lord: '玉皇大帝',
    feature: '天庭朝堂，天官居所',
    desc: '三垣之二，天庭朝堂所在，天官列宿，布列四方。',
    detail: '太微垣乃是三垣之二，位于北斗之南，是天庭朝堂的所在，天官列宿，布列四方。太微垣主文臣武将，三公九卿，对应人间的朝廷百官。其中五帝座乃是五天帝朝会之所，极其尊贵。',
    planets: ['五帝座', '三公星', '九卿星', '五诸侯', '内屏'],
    spiritBeasts: ['仙鹤', '白鹿', '青鸾', '白狐'],
    wonders: ['凌霄宝殿', '兜率宫', '披香殿', '灵霄宝殿'],
    danger: 10,
    auraLevel: 95,
    color: '#06b6d4',
    icon: '🏛️'
  },
  {
    name: '天市垣',
    constellation: '房心东北',
    stars: 87,
    area: 750,
    lord: '天市大帝',
    feature: '天街集市，万物交易',
    desc: '三垣之末，天街集市，万物交易之所，仙凡汇聚。',
    detail: '天市垣乃是三垣之末，位于房心东北，是天街集市所在，天上万物交易之所。天市垣主货殖交易，金玉珠宝，奇珍异宝。天市垣中神仙云集，货物琳琅满目，乃是天界最大的交易市场。',
    planets: ['帝座', '候星', '宦者星', '列肆星', '车肆'],
    spiritBeasts: ['灵鹿', '锦鸡', '孔雀', '灵狐'],
    wonders: ['天街', '宝楼', '仙市', '珍玉阁'],
    danger: 3,
    auraLevel: 85,
    color: '#22c55e',
    icon: '🏪'
  },
  {
    name: '东方青龙',
    constellation: '东宫七宿',
    stars: 342,
    area: 2500,
    lord: '青龙帝君',
    feature: '东方木德，春气生发',
    desc: '四象之首，东宫七宿，角亢氐房心尾箕，化作青龙。',
    detail: '东方青龙乃是四象之首，东宫七宿：角、亢、氐、房、心、尾、箕，化作青龙之形。青龙主东方木德，春气生发，万物生长。青龙星域乃是妖族当年的发源地之一，至今仍有无数妖族在此繁衍生息。',
    planets: ['角木蛟', '亢金龙', '氐土貉', '房日兔', '心月狐', '尾火虎', '箕水豹'],
    spiritBeasts: ['青龙', '蛟龙', '青蛟', '天龙'],
    wonders: ['青龙殿', '龙宫', '东海', '扶桑木'],
    danger: 45,
    auraLevel: 80,
    color: '#22c55e',
    icon: '🐉'
  },
  {
    name: '南方朱雀',
    constellation: '南宫七宿',
    stars: 315,
    area: 2300,
    lord: '朱雀帝君',
    feature: '南方火德，夏气炎炎',
    desc: '四象之二，南宫七宿，井鬼柳星张翼轸，化作朱雀。',
    detail: '南方朱雀乃是四象之二，南宫七宿：井、鬼、柳、星、张、翼、轸，化作朱雀之形。朱雀主南方火德，夏气炎炎，万物繁茂。朱雀星域是火属性修炼者的圣地，火气极其浓郁。',
    planets: ['井木犴', '鬼金羊', '柳土獐', '星日马', '张月鹿', '翼火蛇', '轸水蚓'],
    spiritBeasts: ['朱雀', '凤凰', '三足金乌', '火凤'],
    wonders: ['朱雀殿', '火山', '太阳星', '火德星君宫'],
    danger: 55,
    auraLevel: 75,
    color: '#ef4444',
    icon: '🦅'
  },
  {
    name: '西方白虎',
    constellation: '西宫七宿',
    stars: 298,
    area: 2100,
    lord: '白虎帝君',
    feature: '西方金德，秋气肃杀',
    desc: '四象之三，西宫七宿，奎娄胃昴毕觜参，化作白虎。',
    detail: '西方白虎乃是四象之三，西宫七宿：奎、娄、胃、昴、毕、觜、参，化作白虎之形。白虎主西方金德，秋气肃杀，万物收成。白虎星域杀气极重，是兵家圣地，主兵戈杀伐。',
    planets: ['奎木狼', '娄金狗', '胃土雉', '昴日鸡', '毕月乌', '觜火猴', '参水猿'],
    spiritBeasts: ['白虎', '穷奇', '梼杌', '白泽'],
    wonders: ['白虎殿', '金沙海', '金德星君宫', '战神台'],
    danger: 65,
    auraLevel: 70,
    color: '#f9fafb',
    icon: '🐯'
  },
  {
    name: '北方玄武',
    constellation: '北宫七宿',
    stars: 325,
    area: 2400,
    lord: '玄武帝君',
    feature: '北方水德，冬气凛冽',
    desc: '四象之末，北宫七宿，斗牛女虚危室壁，化作玄武。',
    detail: '北方玄武乃是四象之末，北宫七宿：斗、牛、女、虚、危、室、壁，化作玄武之形。玄武主北方水德，冬气凛冽，万物潜藏。玄武星域水属性灵气极其浓郁，是真武大帝的道场。',
    planets: ['斗木獬', '牛金牛', '女土蝠', '虚日鼠', '危月燕', '室火猪', '壁水貐'],
    spiritBeasts: ['玄武', '龟蛇', '玄冥', '黑水玄蛇'],
    wonders: ['真武殿', '北极宫', '北海', '天河'],
    danger: 40,
    auraLevel: 82,
    color: '#3b82f6',
    icon: '🐢'
  },
  {
    name: '银河星域',
    constellation: '天河',
    stars: 3650,
    area: 10000,
    lord: '星辰之主',
    feature: '星汉灿烂，若出其中',
    desc: '横贯九天的银河，三千星辰，万族林立。',
    detail: '银河星域横贯九天，星辰无数，是诸天万界最大的星域之一。银河星域中有星辰3650颗，对应周天365正神。星域之中万族林立，有无数文明在此繁衍生息。妖族天庭当年便建立于此，帝俊太一在此号令诸天。',
    planets: ['太阳星', '太阴星', '北斗七星', '南斗六星', '启明星', '长庚星'],
    spiritBeasts: ['星兽', '星河巨兽', '虚空鲲', '星辰龙'],
    wonders: ['鹊桥', '牛郎织女', '天河', '星辰海'],
    danger: 70,
    auraLevel: 88,
    color: '#a855f7',
    icon: '🌌'
  }
]

const NAV_STEPS = [
  '选定星域坐标',
  '校准星图',
  '启动星舰',
  '曲速航行',
  '穿越星门',
  '躲避陨石带',
  '抵达目的地',
  '空间锚定'
]

export default function XingTuPage() {
  const [filteredRegions, setFilteredRegions] = useState(STAR_REGIONS)
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null)
  const [navigating, setNavigating] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<StarRegion | null>(null)
  const [navStep, setNavStep] = useState(0)
  const [navProgress, setNavProgress] = useState(0)
  const [navResult, setNavResult] = useState<boolean | null>(null)

  const startNavigation = useCallback((region: StarRegion) => {
    setSelectedRegion(region)
    setNavigating(true)
    setNavStep(0)
    setNavProgress(0)
    setNavResult(null)

    let step = 0
    let progress = 0
    const maxStep = Math.min(region.danger / 10, 8)

    const interval = setInterval(() => {
      progress += Math.random() * 3 + 0.5
      if (progress >= 100 && step < maxStep - 1) {
        progress = 0
        step++
        setNavStep(step)
      }
      if (step >= maxStep - 1 && progress >= 100) {
        clearInterval(interval)
        setNavProgress(100)
        setTimeout(() => {
          setNavResult(true)
          setNavigating(false)
        }, 800)
        return
      }
      setNavProgress(Math.min(progress, 100))
    }, 70)
  }, [])

  const handleRegionFilter = useCallback((data: typeof STAR_REGIONS) => {
    setFilteredRegions(data)
  }, [])

  const regionFilters = {
    searchKeys: ['name', 'lord', 'feature', 'desc', 'detail', 'planets', 'spiritBeasts'],
    filterKeys: {
      danger: ['安全 (<20%)', '中等 (20-50%)', '危险 (50-80%)', '极度危险 (>80%)'],
    }
  }

  return (
    <SubPageTemplate
      title="诸天星图"
      subtitle="周天星斗，星河浩瀚，三千大世界尽在星图之中"
      icon="⭐"
      colorRgb="139, 92, 246"
    >
      <SubPageSection title="🚀 星际航行控制台">
        <InfoCard glowIntensity={90} glowColor="139, 92, 246">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {!navigating && !navResult ? (
              <div>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌌</div>
                <h3 style={{ marginBottom: '1rem', color: '#8b5cf6' }}>星汉灿烂，若出其里</h3>
                <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
                  选择星域目的地，启动星际航行
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  maxWidth: 700,
                  margin: '0 auto'
                }}>
                  {STAR_REGIONS.slice(0, 8).map((region) => (
                    <motion.div
                      key={region.name}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startNavigation(region)}
                      style={{
                        padding: '1rem 0.75rem',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${region.color}20, rgba(40, 40, 50, 0.9))`,
                        border: `1px solid ${region.color}50`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{region.icon}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: region.color, marginBottom: '0.25rem' }}>
                        {region.name}
                      </div>
                      <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>{region.stars}颗星</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : navigating ? (
              <div>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ fontSize: '5rem', marginBottom: '1rem' }}
                >
                  🚀
                </motion.div>
                <h3 style={{ marginBottom: '0.5rem', color: selectedRegion?.color }}>
                  正在航行前往：{selectedRegion?.name}
                </h3>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#8b5cf6'
                }}>
                  【{NAV_STEPS[navStep]}】
                </div>

                <div style={{ maxWidth: 500, margin: '0 auto 1.5rem' }}>
                  <ProgressBar value={navProgress} color={selectedRegion?.color || '#8b5cf6'} />
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  maxWidth: 700,
                  margin: '0 auto',
                  fontSize: '0.65rem'
                }}>
                  {NAV_STEPS.map((s, i) => (
                    <div key={s} style={{
                      color: i <= navStep ? '#8b5cf6' : 'rgba(180, 180, 190, 0.4)',
                      fontWeight: i === navStep ? 700 : 400
                    }}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            ) : navResult ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ fontSize: '5rem', marginBottom: '1rem' }}
                  >
                    {selectedRegion?.icon}
                  </motion.div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    color: selectedRegion?.color,
                    fontWeight: 700
                  }}>
                    航行成功！抵达目的地！
                  </h2>
                  <p style={{
                    fontSize: '1.3rem',
                    color: selectedRegion?.color,
                    marginBottom: '0.5rem',
                    fontWeight: 700
                  }}>
                    {selectedRegion?.name} - {selectedRegion?.feature}
                  </p>
                  <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '1rem' }}>
                    星域灵气浓度：{selectedRegion?.auraLevel}%
                  </p>
                  <div style={{ marginBottom: '2rem' }}>
                    <span style={{ color: '#fbbf24' }}>🌟 发现星体：</span>
                    {selectedRegion?.planets.slice(0, 4).map((p, i) => (
                      <span key={i} style={{ color: '#fbbf24', margin: '0 0.3rem' }}>
                        【{p}】
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setNavResult(null)}
                    style={{
                      padding: '0.8rem 2rem',
                      background: 'rgba(139, 92, 246, 0.2)',
                      border: '1px solid #8b5cf6',
                      borderRadius: '50px',
                      color: '#8b5cf6',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    🚀 继续航行
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="🌌 诸天星域大全">
        <FilterBar
          data={STAR_REGIONS}
          onFiltered={handleRegionFilter}
          options={regionFilters}
          placeholder="搜索星域名称、星主、神兽、奇观..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRegions.map((region, idx) => (
            <motion.div key={region.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <InfoCard
                glowColor={region.color.replace('#', '')}
                glowIntensity={90}
                onClick={() => setExpandedRegion(expandedRegion === region.name ? null : region.name)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{region.icon}</span>
                      <div>
                        <h4 className="font-bold" style={{ color: region.color }}>{region.name}</h4>
                        <p className="text-xs text-gray-500">{region.constellation} · {region.stars}颗星 · 主宰：{region.lord}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs" style={{ color: region.danger > 50 ? '#ef4444' : region.danger > 20 ? '#f59e0b' : '#22c55e' }}>
                        危险度 {region.danger}%
                      </div>
                      <div className="text-xs text-cyan-400">灵气 {region.auraLevel}%</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{region.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {region.planets.slice(0, 4).map((p) => (
                      <span key={p} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>
                        ⭐ {p}
                      </span>
                    ))}
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    {expandedRegion === region.name ? '▲ 收起详情' : '▼ 点击展开详情'}
                  </p>
                </div>
                <AnimatePresence>
                  {expandedRegion === region.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-700/50 space-y-3 mt-3">
                        <p className="text-sm text-gray-300">{region.detail}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-amber-400 text-xs">🐉 守护神兽：</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {region.spiritBeasts.map((b) => (
                                <span key={b} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }}>
                                  {b}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-cyan-400 text-xs">🏛️ 星域奇观：</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {region.wonders.map((w) => (
                                <span key={w} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                                  {w}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => { e.stopPropagation(); startNavigation(region); }}
                          className="w-full py-2 rounded-lg font-bold text-white"
                          style={{ background: `linear-gradient(90deg, ${region.color}, ${region.color}99)` }}
                        >
                          🚀 立即航行前往此星域
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </InfoCard>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}