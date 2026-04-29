'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TALISMAN_CATEGORIES,
  TALISMAN_TEMPLATES,
  FULU_MANUAL,
  HAND_SEALS,
} from './fulu-constants'
import styles from './Fulu.module.scss'

function drawTalisman(canvas: HTMLCanvasElement, template: typeof TALISMAN_TEMPLATES[0]) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  
  ctx.shadowColor = '#ff4444'
  ctx.shadowBlur = 10
  
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  ctx.strokeStyle = 'rgba(255, 68, 68, 0.1)'
  ctx.lineWidth = 0.5
  for (let i = 0; i < 8; i++) {
    const angle = (i * 45) * Math.PI / 180
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(
      centerX + Math.cos(angle) * 140,
      centerY + Math.sin(angle) * 140
    )
    ctx.stroke()
  }
  
  ctx.beginPath()
  ctx.arc(centerX, centerY, 120, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(255, 68, 68, 0.2)'
  ctx.stroke()
  
  const character = template.name[0]
  ctx.font = 'bold 80px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#cc3838'
  ctx.shadowBlur = 20
  ctx.fillText(character, centerX, centerY - 10)
  
  ctx.font = '12px Georgia, serif'
  ctx.fillStyle = '#ee5a5a'
  ctx.shadowBlur = 5
  ctx.fillText('敕', centerX, centerY + 45)
  ctx.fillText('令', centerX, centerY + 65)
  
  for (let i = 0; i < 4; i++) {
    const angle = (i * 90 + 45) * Math.PI / 180
    const r = 95
    ctx.beginPath()
    ctx.arc(
      centerX + Math.cos(angle) * r,
      centerY + Math.sin(angle) * r,
      8, 0, Math.PI * 2
    )
    ctx.fillStyle = '#ff6b6b'
    ctx.fill()
  }
}

export default function FuluPanel() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TALISMAN_TEMPLATES[0] | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawProgress, setDrawProgress] = useState(0)
  const [showManual, setShowManual] = useState(false)
  const [showSeals, setShowSeals] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)

  const filteredTemplates = selectedCategory
    ? TALISMAN_TEMPLATES.filter(t => t.category === selectedCategory)
    : TALISMAN_TEMPLATES

  const handleDraw = useCallback(() => {
    if (!selectedTemplate) return
    
    setIsDrawing(true)
    setDrawProgress(0)
    
    const interval = setInterval(() => {
      setDrawProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDrawing(false)
          setCanvasReady(true)
          return 100
        }
        return prev + 2
      })
    }, 50)
  }, [selectedTemplate])

  useEffect(() => {
    if (canvasReady && selectedTemplate) {
      const canvas = document.getElementById('fulu-canvas') as HTMLCanvasElement
      if (canvas) {
        setTimeout(() => drawTalisman(canvas, selectedTemplate), 100)
      }
    }
  }, [canvasReady, selectedTemplate])

  const resetTalisman = () => {
    setSelectedTemplate(null)
    setCanvasReady(false)
    setDrawProgress(0)
  }

  return (
    <div className={styles.fuluContainer}>
      <motion.div
        className={styles.selectionPanel}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className={styles.panelTitle}>📜 请符</h2>

        <div className={styles.categoryGrid}>
          {TALISMAN_CATEGORIES.map(cat => (
            <motion.button
              key={cat.id}
              className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.catName}>{cat.name}</span>
              <span className={styles.catCount}>{cat.count}道</span>
            </motion.button>
          ))}
        </div>

        <div className={styles.templateList}>
          {filteredTemplates.map(tpl => (
            <motion.div
              key={tpl.id}
              className={`${styles.templateItem} ${selectedTemplate?.id === tpl.id ? styles.selected : ''}`}
              onClick={() => {
                setSelectedTemplate(tpl)
                setCanvasReady(false)
                setDrawProgress(0)
              }}
              whileHover={{ x: 8 }}
            >
              <span className={styles.tplName}>{tpl.name}</span>
              <span className={styles.tplEffect}>{tpl.effect}</span>
              <span className={`${styles.tplDiff} ${styles[tpl.difficulty]}`}>
                {tpl.difficulty}
              </span>
            </motion.div>
          ))}
        </div>

        <div className={styles.actionRow}>
          <motion.button
            className={styles.drawButton}
            onClick={handleDraw}
            disabled={!selectedTemplate || isDrawing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✨ 朱砂画符
          </motion.button>

          <button
            className={styles.resetButton}
            onClick={resetTalisman}
          >
            重置
          </button>
        </div>

        <div className={styles.toggleRow}>
          <button
            className={styles.toggleBtn}
            onClick={() => setShowManual(!showManual)}
          >
            📖 {showManual ? '收起' : '玄门早课'}
          </button>
          <button
            className={styles.toggleBtn}
            onClick={() => setShowSeals(!showSeals)}
          >
            🤲 {showSeals ? '收起' : '手决图'}
          </button>
        </div>

        <AnimatePresence>
          {showManual && (
            <motion.div
              className={styles.manualPanel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <p className={styles.manualHistory}>{FULU_MANUAL.history}</p>
              <div className={styles.classics}>
                {FULU_MANUAL.classics.map((c, i) => (
                  <div key={i} className={styles.classicItem}>"{c}"</div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSeals && (
            <motion.div
              className={styles.sealsPanel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {HAND_SEALS.map((seal, i) => (
                <div key={i} className={styles.sealItem}>
                  <span className={styles.sealName}>{seal.name}</span>
                  <span className={styles.sealPurpose}>{seal.purpose}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className={styles.canvasPanel}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className={styles.panelTitle}>🔴 法坛</h2>

        <div className={styles.canvasWrapper}>
          {selectedTemplate ? (
            <>
              <canvas
                id="fulu-canvas"
                width={360}
                height={360}
                className={styles.fuluCanvas}
              />
              
              <AnimatePresence>
                {isDrawing && (
                  <motion.div
                    className={styles.drawingOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className={styles.drawProgressRing}
                      style={{
                        background: `conic-gradient(#cc3838 ${drawProgress * 3.6}deg, transparent 0deg)`,
                      }}
                    />
                    <span className={styles.drawText}>
                      行符中... {drawProgress}%
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {canvasReady && (
                <motion.div
                  className={styles.talismanInfo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className={styles.fuluName}>{selectedTemplate.name}</h4>
                  <p className={styles.fuluEffect}>⚡ {selectedTemplate.effect}</p>
                  
                  <div className={styles.incantationBox}>
                    <p className={styles.incantationLabel}>☯️ 咒曰</p>
                    <p className={styles.incantationText}>
                      {selectedTemplate.incantation}
                    </p>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📜</div>
              <p>选择符箓模板，开始朱砂画符</p>
            </div>
          )}
        </div>

        <div className={styles.tipsBox}>
          <p className={styles.tipText}>
            💡 <strong>画符心法：</strong>存思运气，一气贯通。朱砂为体，阳气为用。一点灵光便是符，何劳纸上弄工夫。
          </p>
        </div>
      </motion.div>
    </div>
  )
}
