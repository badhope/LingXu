'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  EIGHT_GATES,
  FORMATIONS,
  DIRECTIONS,
  ZHENFA_MANUAL,
  TIER_COLORS,
} from './zhenfa-constants'
import styles from './Zhenfa.module.scss'

export default function ZhenfaPanel() {
  const [selectedFormation, setSelectedFormation] = useState<typeof FORMATIONS[0] | null>(null)
  const [activeGate, setActiveGate] = useState<string | null>(null)
  const [isActivated, setIsActivated] = useState(false)
  const [activationProgress, setActivationProgress] = useState(0)
  const [showManual, setShowManual] = useState(false)
  const [rotation, setRotation] = useState(0)

  const activateFormation = useCallback(() => {
    if (!selectedFormation || isActivated) return

    setIsActivated(true)
    setActivationProgress(0)

    let progress = 0
    const interval = setInterval(() => {
      progress += 2
      setActivationProgress(progress)
      setRotation(prev => prev + 4.5)

      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 50)
  }, [selectedFormation, isActivated])

  const resetFormation = () => {
    setSelectedFormation(null)
    setActiveGate(null)
    setIsActivated(false)
    setActivationProgress(0)
    setRotation(0)
  }

  useEffect(() => {
    if (isActivated && activeGate === null) {
      const gateInterval = setInterval(() => {
        const randomGate = EIGHT_GATES[Math.floor(Math.random() * EIGHT_GATES.length)].id
        setActiveGate(randomGate)
      }, 500)
      return () => clearInterval(gateInterval)
    }
  }, [isActivated, activeGate])

  const getGatePosition = (index: number) => {
    const angle = (index * 45 + rotation) * Math.PI / 180
    const radius = 100
    return {
      x: 140 + Math.cos(angle) * radius,
      y: 140 + Math.sin(angle) * radius,
    }
  }

  const getGateColor = (nature: string) => {
    switch (nature) {
      case '大吉': return '#22c55e'
      case '吉': return '#10b981'
      case '小吉': return '#3b82f6'
      case '平': return '#6b7280'
      case '凶': return '#f59e0b'
      case '大凶': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <div className={styles.zhenfaContainer}>
      <motion.div
        className={styles.listPanel}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className={styles.panelTitle}>📜 阵典</h2>

        <div className={styles.formationList}>
          {FORMATIONS.map(formation => (
            <motion.div
              key={formation.id}
              className={`${styles.formationItem} ${selectedFormation?.id === formation.id ? styles.selected : ''}`}
              onClick={() => !isActivated && setSelectedFormation(formation)}
              whileHover={{ x: 8 }}
            >
              <span 
                className={styles.formationName}
                style={{ color: TIER_COLORS[formation.tier] }}
              >
                {formation.name}
              </span>
              <span 
                className={styles.formationTier}
                style={{ 
                  backgroundColor: TIER_COLORS[formation.tier] + '30',
                  color: TIER_COLORS[formation.tier],
                }}
              >
                {formation.tier}
              </span>
              <span className={styles.formationPower}>
                ⚡ {formation.power}
              </span>
            </motion.div>
          ))}
        </div>

        {selectedFormation && (
          <motion.div
            className={styles.formationInfo}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <h4 className={styles.infoTitle}>{selectedFormation.name}</h4>
            <p className={styles.infoFounder}>
              <strong>创立者：</strong>{selectedFormation.founder}
            </p>
            <p className={styles.infoEffect}>
              <strong>阵效：</strong>{selectedFormation.effect}
            </p>
            <p className={styles.infoDesc}>{selectedFormation.description}</p>

            <div className={styles.actionRow}>
              <motion.button
                className={styles.activateButton}
                onClick={activateFormation}
                disabled={isActivated}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🌀 发动阵法
              </motion.button>

              <button
                className={styles.resetButton}
                onClick={resetFormation}
                disabled={isActivated}
              >
                重置
              </button>
            </div>
          </motion.div>
        )}

        <button
          className={styles.manualToggle}
          onClick={() => setShowManual(!showManual)}
        >
          📖 {showManual ? '收起' : '握奇经'}
        </button>

        <AnimatePresence>
          {showManual && (
            <motion.div
              className={styles.manualPanel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <p className={styles.manualHistory}>{ZHENFA_MANUAL.history}</p>
              <div className={styles.classics}>
                {ZHENFA_MANUAL.classics.map((c, i) => (
                  <div key={i} className={styles.classicItem}>"{c}"</div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className={styles.diagramPanel}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className={styles.panelTitle}>🌀 阵图</h2>

        <div className={styles.diagramWrapper}>
          <div className={styles.diagramBody}>
            <svg
              className={styles.baguaSvg}
              viewBox="0 0 280 280"
              style={{
                transform: `rotate(${rotation}deg)`,
                filter: isActivated ? 'drop-shadow(0 0 30px #a855f7)' : undefined,
              }}
            >
              <circle
                cx="140"
                cy="140"
                r="130"
                fill="none"
                stroke={isActivated ? '#a855f7' : '#4b5563'}
                strokeWidth="2"
                strokeDasharray={isActivated ? '10,5' : 'none'}
              />

              {[...Array(8)].map((_, i) => {
                const angle = i * 45 * Math.PI / 180
                return (
                  <line
                    key={i}
                    x1="140"
                    y1="140"
                    x2={140 + Math.cos(angle) * 130}
                    y2={140 + Math.sin(angle) * 130}
                    stroke={isActivated ? '#7c3aed' : '#374151'}
                    strokeWidth="1"
                  />
                )
              })}

              {EIGHT_GATES.map((gate, i) => {
                const pos = getGatePosition(i)
                const isActive = activeGate === gate.id
                return (
                  <g key={gate.id}>
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isActive ? 24 : 18}
                      fill={getGateColor(gate.nature) + (isActive ? '50' : '20')}
                      stroke={getGateColor(gate.nature)}
                      strokeWidth={isActive ? 3 : 1}
                      animate={isActive ? {
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{
                        duration: 0.5,
                        repeat: isActive ? Infinity : 0,
                      }}
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 4}
                      textAnchor="middle"
                      fill={isActive ? getGateColor(gate.nature) : '#9ca3af'}
                      fontSize={isActive ? 11 : 10}
                      fontWeight={isActive ? 'bold' : 'normal'}
                    >
                      {gate.name[0]}
                    </text>
                  </g>
                )
              })}

              <motion.circle
                cx="140"
                cy="140"
                r={isActivated ? 45 : 40}
                fill="url(#centerGradient)"
                animate={isActivated ? {
                  r: [40, 50, 40],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              <text
                x="140"
                y="145"
                textAnchor="middle"
                fill={isActivated ? '#e879f9' : '#a855f7'}
                fontSize="24"
                fontWeight="bold"
              >
                ☯
              </text>

              {DIRECTIONS.map((dir, i) => {
                const angle = (i * 45 + rotation) * Math.PI / 180
                const r = 65
                return (
                  <text
                    key={dir}
                    x={140 + Math.cos(angle) * r}
                    y={145 + Math.sin(angle) * r}
                    textAnchor="middle"
                    fill={isActivated ? '#c084fc' : '#6b7280'}
                    fontSize="10"
                    fontWeight="500"
                  >
                    {dir}
                  </text>
                )
              })}

              <defs>
                <radialGradient id="centerGradient">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" />
                </radialGradient>
              </defs>
            </svg>

            {isActivated && (
              <motion.div
                className={styles.progressBar}
                initial={{ width: 0 }}
                animate={{ width: `${activationProgress}%` }}
              >
                <div className={styles.progressFill} />
              </motion.div>
            )}
          </div>

          <AnimatePresence>
            {isActivated && activationProgress >= 100 && selectedFormation && (
              <motion.div
                className={styles.resultCard}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className={styles.successIcon}>✨</div>
                <h4 className={styles.resultTitle}>阵成！</h4>
                <p 
                  className={styles.resultName}
                  style={{ color: TIER_COLORS[selectedFormation.tier] }}
                >
                  {selectedFormation.name}发动
                </p>
                <p className={styles.resultEffect}>{selectedFormation.effect}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedFormation && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🌀</div>
              <p>选择阵法，发动八门金锁</p>
            </div>
          )}
        </div>

        <div className={styles.gatesLegend}>
          <h4 className={styles.legendTitle}>八门方位</h4>
          <div className={styles.gatesGrid}>
            {EIGHT_GATES.map(gate => (
              <div
                key={gate.id}
                className={styles.gateItem}
                style={{ borderColor: getGateColor(gate.nature) }}
              >
                <span className={styles.gateName}>{gate.name}</span>
                <span 
                  className={styles.gateNature}
                  style={{ 
                    backgroundColor: getGateColor(gate.nature) + '30',
                    color: getGateColor(gate.nature),
                  }}
                >
                  {gate.nature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tipsBox}>
          <p className={styles.tipText}>
            💡 <strong>阵法心法：</strong>四为正，四为奇，余奇为握机。大阵包小阵，大营包小营。奇正相生，循环无端。
          </p>
        </div>
      </motion.div>
    </div>
  )
}
