'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FOUR_SYMBOLS,
  THREE_ENCLOSURES,
  TWENTY_EIGHT_MANSIONS,
  FORTUNE_JUDGEMENT,
  XINGXIU_MANUAL,
} from './xingxiu-constants'
import styles from './Xingxiu.module.scss'

function getFortuneDate() {
  const today = new Date()
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  const todayIndex = dayOfYear % 28
  return {
    today: TWENTY_EIGHT_MANSIONS[todayIndex],
    index: todayIndex,
  }
}

function getLifeMansion(month: number, day: number) {
  const totalDays = (month - 1) * 30 + day
  const index = totalDays % 28
  return TWENTY_EIGHT_MANSIONS[index]
}

function getStarCoords(mansionId: string) {
  const index = TWENTY_EIGHT_MANSIONS.findIndex(m => m.id === mansionId)
  const angle = (index / 28) * Math.PI * 2
  const radius = 130 + (index % 4) * 15
  return {
    x: 180 + Math.cos(angle) * radius,
    y: 180 + Math.sin(angle) * radius,
  }
}

export default function XingxiuPanel() {
  const [birthInfo, setBirthInfo] = useState({
    month: 1,
    day: 1,
  })
  const [showManual, setShowManual] = useState(false)
  const [selectedMansion, setSelectedMansion] = useState<string | null>(null)
  const [queryLife, setQueryLife] = useState(false)

  const todayFortune = useMemo(() => getFortuneDate(), [])
  const lifeMansion = useMemo(() => getLifeMansion(birthInfo.month, birthInfo.day), [birthInfo])
  const selectedDetail = selectedMansion
    ? TWENTY_EIGHT_MANSIONS.find(m => m.id === selectedMansion)
    : null

  const symbolColors: Record<string, string> = {
    azure: '#22c55e',
    vermilion: '#ef4444',
    white: '#94a3b8',
    black: '#3b82f6',
  }

  return (
    <div className={styles.xingxiuContainer}>
      <motion.div
        className={styles.starmapPanel}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className={styles.panelTitle}>⭐ 星图</h2>

        <div className={styles.starMapWrapper}>
          <svg viewBox="0 0 360 360" className={styles.starMap}>
            {FOUR_SYMBOLS.map((symbol, i) => {
              const startAngle = i * 90 - 45
              return (
                <path
                  key={symbol.id}
                  className={styles.symbolArc}
                  d={`M 180 180 L ${180 + 160 * Math.cos((startAngle * Math.PI) / 180)} ${180 + 160 * Math.sin((startAngle * Math.PI) / 180)} A 160 160 0 0 1 ${180 + 160 * Math.cos(((startAngle + 90) * Math.PI) / 180)} ${180 + 160 * Math.sin(((startAngle + 90) * Math.PI) / 180)} Z`}
                  fill={symbolColors[symbol.id]}
                  fillOpacity="0.1"
                  stroke={symbolColors[symbol.id]}
                  strokeWidth="1"
                />
              )
            })}

            <circle cx="180" cy="180" r="90" className={styles.enclosureCircle} />
            <text x="180" y="175" className={styles.enclosureText}>紫微垣</text>
            <text x="180" y="195" className={styles.enclosureTextSmall}>三垣</text>

            {TWENTY_EIGHT_MANSIONS.map((mansion) => {
              const coords = getStarCoords(mansion.id)
              const isSelected = selectedMansion === mansion.id
              const isToday = mansion.id === todayFortune.today.id
              
              return (
                <g key={mansion.id}>
                  <motion.circle
                    cx={coords.x}
                    cy={coords.y}
                    r={isSelected ? 8 : isToday ? 6 : 4}
                    fill={mansion.lucky ? symbolColors[mansion.symbolId] : '#475569'}
                    className={`${styles.starPoint} ${isSelected ? styles.activeStar : ''} ${isToday ? styles.todayStar : ''}`}
                    onClick={() => setSelectedMansion(mansion.id)}
                    whileHover={{ scale: 1.5 }}
                    animate={{
                      r: isSelected ? 8 : isToday ? 6 : 4,
                    }}
                  />
                  <text
                    x={coords.x}
                    y={coords.y - 12}
                    className={styles.starLabel}
                    fill={symbolColors[mansion.symbolId]}
                  >
                    {mansion.symbol}
                  </text>
                </g>
              )
            })}

            {FOUR_SYMBOLS.map((symbol, i) => {
              const angle = (i * 90) * Math.PI / 180
              return (
                <text
                  key={symbol.id}
                  x={180 + Math.cos(angle) * 180}
                  y={185 + Math.sin(angle) * 180}
                  className={styles.symbolLabel}
                  fill={symbolColors[symbol.id]}
                  textAnchor="middle"
                >
                  {symbol.name}
                </text>
              )
            })}
          </svg>
        </div>

        <div className={styles.legend}>
          {FOUR_SYMBOLS.map(symbol => (
            <div key={symbol.id} className={styles.legendItem}>
              <span 
                className={styles.legendDot}
                style={{ backgroundColor: symbolColors[symbol.id] }}
              />
              <span className={styles.legendText}>{symbol.name}</span>
            </div>
          ))}
        </div>

        <div className={styles.todayFortune}>
          <span className={styles.todayLabel}>今日值宿</span>
          <span 
            className={styles.todayName}
            style={{ color: symbolColors[todayFortune.today.symbolId] }}
          >
            {todayFortune.today.name}
          </span>
          <span className={styles.todayRemark}>
            {todayFortune.today.lucky ? '✨ 吉' : '⚠️ 平'}
          </span>
        </div>
      </motion.div>

      <motion.div
        className={styles.queryPanel}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className={styles.panelTitle}>🔮 本命</h2>

        <div className={styles.inputSection}>
          <div className={styles.inputRow}>
            <label>农历月份</label>
            <input
              type="number"
              value={birthInfo.month}
              onChange={e => setBirthInfo({ ...birthInfo, month: Math.min(12, Math.max(1, parseInt(e.target.value) || 1)) })}
              min={1}
              max={12}
            />
          </div>

          <div className={styles.inputRow}>
            <label>农历日期</label>
            <input
              type="number"
              value={birthInfo.day}
              onChange={e => setBirthInfo({ ...birthInfo, day: Math.min(30, Math.max(1, parseInt(e.target.value) || 1)) })}
              min={1}
              max={30}
            />
          </div>

          <motion.button
            className={styles.queryButton}
            onClick={() => {
              setQueryLife(true)
              setSelectedMansion(lifeMansion.id)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔍 查询本命星宿
          </motion.button>
        </div>

        <AnimatePresence>
          {queryLife && (
            <motion.div
              className={styles.resultCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className={styles.mansionHeader}>
                <span className={styles.mansionIcon}>🌟</span>
                <span 
                  className={styles.mansionName}
                  style={{ color: symbolColors[lifeMansion.symbolId] }}
                >
                  {lifeMansion.name}
                </span>
                <span className={styles.mansionFortune}>
                  {lifeMansion.lucky ? '吉宿' : '平宿'}
                </span>
              </div>

              <div className={styles.mansionMeta}>
                <span className={styles.metaItem}>
                  四象: {FOUR_SYMBOLS.find(s => s.id === lifeMansion.symbolId)?.name}
                </span>
                <span className={styles.metaItem}>
                  方位: {FOUR_SYMBOLS.find(s => s.id === lifeMansion.symbolId)?.direction}方
                </span>
              </div>

              <p className={styles.mansionRemark}>{lifeMansion.remark}</p>

              <div className={styles.judgementBox}>
                <p className={styles.judgementText}>
                  {FORTUNE_JUDGEMENT[lifeMansion.id] || '顺天应人，吉无不利'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedDetail && !queryLife && (
            <motion.div
              className={styles.detailCard}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h4 
                className={styles.detailTitle}
                style={{ color: symbolColors[selectedDetail.symbolId] }}
              >
                {selectedDetail.name}
              </h4>
              <p className={styles.detailText}>{selectedDetail.remark}</p>
              <p className={styles.detailJudgement}>
                {FORTUNE_JUDGEMENT[selectedDetail.id] || '顺天应人，吉无不利'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className={styles.manualToggle}
          onClick={() => setShowManual(!showManual)}
        >
          📜 {showManual ? '收起' : '甘石星经'}
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
                {XINGXIU_MANUAL.history}
              </p>
              <div className={styles.enclosureGrid}>
                {THREE_ENCLOSURES.map(enc => (
                  <div key={enc.id} className={styles.enclosureItem}>
                    <span className={styles.encName}>{enc.name}</span>
                    <span className={styles.encMeaning}>{enc.meaning}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
