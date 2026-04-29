'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  FIVE_ELEMENTS,
  STEM_COLORS,
  BAZI_MANUAL,
} from './bazi-constants'
import styles from './Bazi.module.scss'

function getStemBranch(year: number, month: number, day: number, hour: number) {
  const yearStemIndex = (year - 4) % 10
  const yearBranchIndex = (year - 4) % 12
  
  const baseYear = 2024
  const baseDay = 1
  const daysDiff = Math.floor((new Date(year, month - 1, day).getTime() - new Date(baseYear, 0, baseDay).getTime()) / (1000 * 60 * 60 * 24))
  const dayStemIndex = (daysDiff + 9) % 10
  const dayBranchIndex = (daysDiff + 1) % 12

  const hourBranchIndex = Math.floor((hour + 1) / 2) % 12
  const hourStemIndex = (dayStemIndex * 2 + hourBranchIndex) % 10

  return {
    year: {
      stem: HEAVENLY_STEMS[yearStemIndex],
      branch: EARTHLY_BRANCHES[yearBranchIndex],
    },
    month: {
      stem: HEAVENLY_STEMS[(yearStemIndex * 2 + month) % 10],
      branch: EARTHLY_BRANCHES[(month + 1) % 12],
    },
    day: {
      stem: HEAVENLY_STEMS[dayStemIndex],
      branch: EARTHLY_BRANCHES[dayBranchIndex],
    },
    hour: {
      stem: HEAVENLY_STEMS[hourStemIndex],
      branch: EARTHLY_BRANCHES[hourBranchIndex],
    },
  }
}

interface Pillar {
  stem?: { element?: string }
  branch?: { element?: string }
  [key: string]: unknown
}

interface Pillars {
  year?: Pillar
  month?: Pillar
  day?: Pillar
  hour?: Pillar
  [key: string]: Pillar | undefined
}

function calculateTenGods(dayMaster: typeof HEAVENLY_STEMS[number], pillars: Pillars) {
  const gods: Record<string, string> = {
    '同阴阳同元素': '比肩',
    '异阴阳同元素': '劫财',
    '我生同阴阳': '食神',
    '我生异阴阳': '伤官',
    '克我同阴阳': '七杀',
    '克我异阴阳': '正官',
    '我克同阴阳': '偏财',
    '我克异阴阳': '正财',
    '生我同阴阳': '偏印',
    '生我异阴阳': '正印',
  }
  return gods
}

function getElementCounts(pillars: ReturnType<typeof getStemBranch>) {
  const counts: Record<string, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 }
  
  Object.values(pillars).forEach((p: Pillar) => {
    if (p?.stem?.element && counts[p.stem.element] !== undefined) {
      counts[p.stem.element]++
    }
    if (p?.branch?.element && counts[p.branch.element] !== undefined) {
      counts[p.branch.element]++
    }
  })
  
  return counts
}

function calculateDayun(startYear: number, isMale: boolean, yearStemYang: boolean) {
  const direction = (isMale ? 1 : -1) * (yearStemYang ? 1 : -1)
  return Array(8).fill(0).map((_, i) => ({
    index: i,
    startYear: startYear + (i + 1) * 10 * direction,
    name: `${i + 1}运`,
  }))
}

export default function BaziPanel() {
  const [birthInfo, setBirthInfo] = useState({
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    isMale: true,
  })

  const [showManual, setShowManual] = useState(false)
  const [arranged, setArranged] = useState(false)

  const bazi = useMemo(() => {
    const result = getStemBranch(birthInfo.year, birthInfo.month, birthInfo.day, birthInfo.hour)
    return result
  }, [birthInfo])

  const elementCounts = useMemo(() => getElementCounts(bazi), [bazi])
  const dayMaster = bazi.day.stem
  const maxCount = Math.max(...Object.values(elementCounts))

  const pillarNames = [
    { key: 'hour', name: '时柱', note: '晚年' },
    { key: 'day', name: '日柱', note: '自身' },
    { key: 'month', name: '月柱', note: '青年' },
    { key: 'year', name: '年柱', note: '祖上' },
  ]

  return (
    <div className={styles.baziContainer}>
      <motion.div
        className={styles.inputPanel}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className={styles.panelTitle}>📊 排盘</h2>

        <div className={styles.inputGrid}>
          <div className={styles.inputRow}>
            <label>出生年份</label>
            <input
              type="number"
              value={birthInfo.year}
              onChange={e => setBirthInfo({ ...birthInfo, year: parseInt(e.target.value) || 1990 })}
              min={1900}
              max={2100}
            />
          </div>

          <div className={styles.inputRow}>
            <label>月份</label>
            <input
              type="number"
              value={birthInfo.month}
              onChange={e => setBirthInfo({ ...birthInfo, month: Math.min(12, Math.max(1, parseInt(e.target.value) || 1)) })}
              min={1}
              max={12}
            />
          </div>

          <div className={styles.inputRow}>
            <label>日期</label>
            <input
              type="number"
              value={birthInfo.day}
              onChange={e => setBirthInfo({ ...birthInfo, day: Math.min(31, Math.max(1, parseInt(e.target.value) || 1)) })}
              min={1}
              max={31}
            />
          </div>

          <div className={styles.inputRow}>
            <label>时辰 (时)</label>
            <input
              type="number"
              value={birthInfo.hour}
              onChange={e => setBirthInfo({ ...birthInfo, hour: Math.min(23, Math.max(0, parseInt(e.target.value) || 0)) })}
              min={0}
              max={23}
            />
          </div>

          <div className={styles.genderToggle}>
            <button
              className={birthInfo.isMale ? styles.active : ''}
              onClick={() => setBirthInfo({ ...birthInfo, isMale: true })}
            >
              男
            </button>
            <button
              className={!birthInfo.isMale ? styles.active : ''}
              onClick={() => setBirthInfo({ ...birthInfo, isMale: false })}
            >
              女
            </button>
          </div>
        </div>

        <motion.button
          className={styles.arrangeButton}
          onClick={() => setArranged(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✨ 排出八字
        </motion.button>

        <button
          className={styles.manualToggle}
          onClick={() => setShowManual(!showManual)}
        >
          📜 {showManual ? '收起' : '滴天髓真诠'}
        </button>

        <AnimatePresence>
          {showManual && (
            <motion.div
              className={styles.manualPanel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <p className={styles.manualHistory}>
                {BAZI_MANUAL.history}
              </p>
              <div className={styles.principles}>
                {BAZI_MANUAL.principles.map((p, i) => (
                  <div key={i} className={styles.principleItem}>
                    {p}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className={styles.resultPanel}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className={styles.panelTitle}>🧮 命盘</h2>

        <AnimatePresence>
          {arranged && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={styles.dayMasterInfo}>
                <span className={styles.dmLabel}>日主</span>
                <span 
                  className={styles.dmName}
                  style={{ color: STEM_COLORS[dayMaster.name] }}
                >
                  {dayMaster.name}{dayMaster.element}
                </span>
                <span className={styles.dmNote}>
                  {dayMaster.yang ? '阳干' : '阴干'}
                </span>
              </div>

              <div className={styles.fourPillars}>
                {pillarNames.map(({ key, name, note }) => {
                  const pillar = (bazi as any)[key]
                  return (
                    <div key={key} className={styles.pillar}>
                      <div className={styles.pillarMeta}>
                        <span className={styles.pillarName}>{name}</span>
                        <span className={styles.pillarNote}>{note}</span>
                      </div>
                      <div className={styles.pillarContent}>
                        <span 
                          className={styles.stemChar}
                          style={{ color: STEM_COLORS[pillar.stem.name] }}
                        >
                          {pillar.stem.name}
                        </span>
                        <span 
                          className={styles.branchChar}
                          style={{ color: STEM_COLORS[pillar.branch.name] || '#94a3b8' }}
                        >
                          {pillar.branch.name}
                        </span>
                      </div>
                      <div className={styles.pillarElement}>
                        <span>{pillar.stem.element}</span>
                        <span>{pillar.branch.element}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className={styles.elementSection}>
                <h4>⚖️ 五行分布</h4>
                <div className={styles.elementBars}>
                  {FIVE_ELEMENTS.map(elem => {
                    const count = elementCounts[elem.name]
                    const percentage = (count / maxCount) * 100
                    return (
                      <div key={elem.id} className={styles.elementBarRow}>
                        <span 
                          className={styles.elementName}
                          style={{ color: elem.color }}
                        >
                          {elem.name}
                        </span>
                        <div className={styles.elementBar}>
                          <motion.div
                            className={styles.elementFill}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1 }}
                            style={{ backgroundColor: elem.color }}
                          />
                        </div>
                        <span className={styles.elementCount}>{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className={styles.dayunSection}>
                <h4>🚶 大运走势</h4>
                <div className={styles.dayunTrack}>
                  {Array(8).fill(0).map((_, i) => (
                    <motion.div
                      key={i}
                      className={styles.dayunStep}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className={styles.dayunNum}>{i + 1}</span>
                      <span className={styles.dayunYear}>{10 * i}岁</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!arranged && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔮</div>
            <p>输入出生信息，排出您的八字命盘</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
