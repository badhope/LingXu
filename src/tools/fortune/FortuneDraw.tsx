'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FORTUNE_CARDS, FORTUNE_LEVELS } from './fortune-data'
import styles from './Fortune.module.scss'

export default function FortuneDraw() {
  const [drawn, setDrawn] = useState(false)
  const [drawing, setDrawing] = useState(false)
  const [result, setResult] = useState<typeof FORTUNE_CARDS[0] | null>(null)

  const drawFortune = () => {
    if (drawing || drawn) return
    
    setDrawing(true)
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * FORTUNE_CARDS.length)
      setResult(FORTUNE_CARDS[randomIndex])
      setDrawn(true)
      setDrawing(false)
    }, 1500)
  }

  const reset = () => {
    setDrawn(false)
    setResult(null)
  }

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🎋 观音灵签</h1>
        <p>诚心诚意，抽一签可知今日吉凶祸福</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!drawn ? (
          <motion.div
            key="draw"
            className={styles.drawSection}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className={styles.signBucket}
              onClick={drawFortune}
            >
              <div className={styles.bucketBody}>
                <div className={styles.signSticks}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={styles.stick} />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.drawHint}>
              点击签筒或按钮开始抽签
            </div>

            <button
              className={styles.drawBtn}
              onClick={drawFortune}
              disabled={drawing}
            >
              {drawing ? '🎲 正在抽签...' : '✨ 开始抽签'}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50, rotateY: -90 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {result && (
              <div className={styles.resultCard}>
                <div 
                  className={styles.levelBadge}
                  style={{
                    backgroundColor: FORTUNE_LEVELS[result.level].bg,
                    color: FORTUNE_LEVELS[result.level].color,
                    border: `2px solid ${FORTUNE_LEVELS[result.level].color}`,
                  }}
                >
                  {FORTUNE_LEVELS[result.level].name} · {result.title}
                </div>

                <h2 className={styles.resultTitle}>{result.subtitle}</h2>
                <p className={styles.resultSubtitle}>「 签诗 」</p>

                <div className={styles.poem}>
                  {result.poem}
                </div>

                <p className={styles.explanation}>
                  【解曰】{result.explanation}
                </p>

                <div className={styles.fortuneGrid}>
                  <div className={styles.fortuneItem}>
                    <div className={styles.label}>综合运势</div>
                    <div className={styles.value}>{result.fortune.overall}</div>
                  </div>
                  <div className={styles.fortuneItem}>
                    <div className={styles.label}>事业功名</div>
                    <div className={styles.value}>{result.fortune.career}</div>
                  </div>
                  <div className={styles.fortuneItem}>
                    <div className={styles.label}>财运</div>
                    <div className={styles.value}>{result.fortune.wealth}</div>
                  </div>
                  <div className={styles.fortuneItem}>
                    <div className={styles.label}>姻缘感情</div>
                    <div className={styles.value}>{result.fortune.love}</div>
                  </div>
                  <div className={styles.fortuneItem}>
                    <div className={styles.label}>健康</div>
                    <div className={styles.value}>{result.fortune.health}</div>
                  </div>
                </div>

                <div className={styles.luckyInfo}>
                  <div className={styles.luckyItem}>
                    <div className={styles.icon}>🔢</div>
                    <div className={styles.value}>幸运数字 {result.luckyNumbers.join(', ')}</div>
                  </div>
                  <div className={styles.luckyItem}>
                    <div className={styles.icon}>🧭</div>
                    <div className={styles.value}>贵人方位 {result.luckyDirection}</div>
                  </div>
                  <div className={styles.luckyItem}>
                    <div className={styles.icon}>🎨</div>
                    <div className={styles.value}>吉祥色 {result.luckyColor}</div>
                  </div>
                </div>

                <div style={{ marginTop: 32, textAlign: 'center' }}>
                  <button className={styles.drawBtn} onClick={reset}>
                    🔄 再抽一签
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
