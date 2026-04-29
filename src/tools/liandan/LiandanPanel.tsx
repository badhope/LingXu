'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HERBS,
  ELIXIRS,
  FIRE_LEVELS,
  REFINEMENT_STAGES,
  LIANDAN_MANUAL,
} from './liandan-constants'
import styles from './Liandan.module.scss'

export default function LiandanPanel() {
  const [selectedHerbs, setSelectedHerbs] = useState<string[]>([])
  const [selectedElixir, setSelectedElixir] = useState<typeof ELIXIRS[0] | null>(null)
  const [isRefining, setIsRefining] = useState(false)
  const [refineProgress, setRefineProgress] = useState(0)
  const [currentFire, setCurrentFire] = useState(FIRE_LEVELS[0])
  const [refineStage, setRefineStage] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [refineSuccess, setRefineSuccess] = useState(false)
  const [showManual, setShowManual] = useState(false)
  const [fireIntensity, setFireIntensity] = useState(0)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const toggleHerb = (herbId: string) => {
    setSelectedHerbs(prev => {
      if (prev.includes(herbId)) {
        return prev.filter(h => h !== herbId)
      }
      if (prev.length >= 8) return prev
      return [...prev, herbId]
    })
  }

  const canRefine = selectedElixir && selectedHerbs.length > 0 && !isRefining

  const startRefining = useCallback(() => {
    if (!canRefine || !selectedElixir) return

    setIsRefining(true)
    setRefineProgress(0)
    setRefineStage(1)
    setShowResult(false)

    let progress = 0
    let stage = 1

    timerRef.current = setInterval(() => {
      progress += 1
      setRefineProgress(progress)
      setFireIntensity(prev => (prev + Math.random() * 20) % 100)

      const newStage = Math.min(7, Math.floor((progress / 100) * 7) + 1)
      if (newStage !== stage) {
        stage = newStage
        setRefineStage(stage)
      }

      if (progress >= 100) {
        if (timerRef.current) clearInterval(timerRef.current)
        
        const hasAllHerbs = selectedElixir.requiredHerbs.every(h => selectedHerbs.includes(h))
        setRefineSuccess(hasAllHerbs || Math.random() > 0.3)
        setIsRefining(false)
        setShowResult(true)
        setRefineStage(7)
      }
    }, selectedElixir.fireTime)
  }, [canRefine, selectedElixir, selectedHerbs])

  const resetFurnace = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setSelectedHerbs([])
    setSelectedElixir(null)
    setIsRefining(false)
    setRefineProgress(0)
    setRefineStage(0)
    setShowResult(false)
    setFireIntensity(0)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const currentStageInfo = REFINEMENT_STAGES[refineStage]
  const tierColors: Record<string, string> = {
    '凡丹': '#6b7280',
    '地丹': '#22c55e',
    '天丹': '#3b82f6',
    '仙丹': '#f59e0b',
  }

  return (
    <div className={styles.liandanContainer}>
      <motion.div
        className={styles.herbsPanel}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className={styles.panelTitle}>🌿 采药</h2>

        <div className={styles.herbsGrid}>
          {HERBS.map(herb => (
            <motion.button
              key={herb.id}
              className={`${styles.herbBtn} ${selectedHerbs.includes(herb.id) ? styles.selected : ''}`}
              onClick={() => toggleHerb(herb.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isRefining}
            >
              <span className={styles.herbName}>{herb.name}</span>
              <span className={`${styles.herbTier} ${styles[herb.tier]}`}>{herb.tier}</span>
            </motion.button>
          ))}
        </div>

        <div className={styles.selectedRow}>
          <span className={styles.selectedLabel}>已选药材:</span>
          <span className={styles.selectedCount}>
            {selectedHerbs.length} / 8 味
          </span>
        </div>

        <div className={styles.elixirList}>
          <h4 className={styles.subtitle}>🧪 丹方</h4>
          {ELIXIRS.map(elixir => {
            const matchCount = elixir.requiredHerbs.filter(h => selectedHerbs.includes(h)).length
            return (
              <motion.div
                key={elixir.id}
                className={`${styles.elixirItem} ${selectedElixir?.id === elixir.id ? styles.selected : ''}`}
                onClick={() => !isRefining && setSelectedElixir(elixir)}
                whileHover={{ x: 8 }}
              >
                <span 
                  className={styles.elixirName}
                  style={{ color: tierColors[elixir.tier] }}
                >
                  {elixir.name}
                </span>
                <span className={styles.elixirMatch}>
                  {matchCount}/{elixir.requiredHerbs.length}
                </span>
                <span 
                  className={styles.elixirTier}
                  style={{ backgroundColor: tierColors[elixir.tier] + '30', color: tierColors[elixir.tier] }}
                >
                  {elixir.tier}
                </span>
              </motion.div>
            )
          })}
        </div>

        <div className={styles.actionRow}>
          <motion.button
            className={styles.refineButton}
            onClick={startRefining}
            disabled={!canRefine}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔥 起火炼丹
          </motion.button>

          <button
            className={styles.resetButton}
            onClick={resetFurnace}
            disabled={isRefining}
          >
            重置
          </button>
        </div>

        <button
          className={styles.manualToggle}
          onClick={() => setShowManual(!showManual)}
        >
          📖 {showManual ? '收起' : '参同契'}
        </button>

        <AnimatePresence>
          {showManual && (
            <motion.div
              className={styles.manualPanel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <p className={styles.manualHistory}>{LIANDAN_MANUAL.history}</p>
              <div className={styles.classics}>
                {LIANDAN_MANUAL.classics.map((c, i) => (
                  <div key={i} className={styles.classicItem}>"{c}"</div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className={styles.furnacePanel}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className={styles.panelTitle}>🔥 丹炉</h2>

        <div className={styles.furnaceWrapper}>
          <div className={styles.fireControls}>
            {FIRE_LEVELS.map(level => (
              <button
                key={level.id}
                className={`${styles.fireBtn} ${currentFire.id === level.id ? styles.active : ''}`}
                onClick={() => !isRefining && setCurrentFire(level)}
                disabled={isRefining}
                style={{ 
                  backgroundColor: currentFire.id === level.id ? level.color + '30' : undefined,
                  borderColor: currentFire.id === level.id ? level.color : undefined,
                }}
              >
                {level.name}
              </button>
            ))}
          </div>

          <div className={styles.furnaceBody}>
            <AnimatePresence>
              {isRefining && (
                <motion.div
                  className={styles.furnaceFlames}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={styles.flame}
                      animate={{
                        y: [0, -10 - fireIntensity / 10, 0],
                        scale: [1, 1 + fireIntensity / 200, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 0.5 + Math.random() * 0.5,
                        delay: i * 0.1,
                        repeat: Infinity,
                      }}
                      style={{
                        background: `linear-gradient(to top, ${currentFire.color}, transparent)`,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div 
              className={styles.furnacePot}
              style={{
                boxShadow: isRefining 
                  ? `0 0 60px ${currentFire.color}, inset 0 -20px 40px ${currentFire.color}50`
                  : undefined,
              }}
            >
              <div className={styles.potBody}>
                <span className={styles.potMark}>☯</span>
              </div>
              <div className={styles.potLid} />
            </div>

            <div className={styles.progressSection}>
              <div className={styles.stageBar}>
                {REFINEMENT_STAGES.map((stage, i) => (
                  <div
                    key={i}
                    className={`${styles.stageDot} ${i <= refineStage ? styles.active : ''}`}
                    title={stage.name}
                  />
                ))}
              </div>

              <div className={styles.stageInfo}>
                <span className={styles.stageName}>{currentStageInfo.name}</span>
                <span className={styles.stageNote}>{currentStageInfo.note}</span>
              </div>

              {isRefining && (
                <motion.div 
                  className={styles.progressBar}
                  initial={{ width: 0 }}
                  animate={{ width: `${refineProgress}%` }}
                >
                  <div 
                    className={styles.progressFill}
                    style={{ backgroundColor: currentFire.color }}
                  />
                </motion.div>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div
                className={styles.resultCard}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {refineSuccess ? (
                  <>
                    <div className={styles.successIcon}>✨</div>
                    <h4 className={styles.resultTitle}>丹成！</h4>
                    {selectedElixir && (
                      <>
                        <p 
                          className={styles.resultName}
                          style={{ color: tierColors[selectedElixir.tier] }}
                        >
                          {selectedElixir.name}
                        </p>
                        <p className={styles.resultEffect}>{selectedElixir.effect}</p>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className={styles.failIcon}>💨</div>
                    <h4 className={styles.resultTitle}>丹败...</h4>
                    <p className={styles.resultNote}>火候不均，药材不纯，下次再试</p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedElixir && !isRefining && !showResult && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>⚗️</div>
              <p>选择药材与丹方，起火炼丹</p>
            </div>
          )}
        </div>

        <div className={styles.tipsBox}>
          <p className={styles.tipText}>
            💡 <strong>丹道心法：</strong>圣人传药不传火，从来火候少人知。文火养性以温养，武火炼命以精炼，铅汞交媾，龙虎相吞，九转功成。
          </p>
        </div>
      </motion.div>
    </div>
  )
}
