'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TRIGRAMS, HEXAGRAMS } from './meihua-data'
import styles from './Divination.module.scss'

export default function MeihuaPanel() {
  const [upperNum, setUpperNum] = useState(1)
  const [lowerNum, setLowerNum] = useState(1)
  const [casted, setCasted] = useState(false)
  const [result, setResult] = useState<typeof HEXAGRAMS[0] | null>(null)

  const getTrigram = (num: number) => {
    const index = ((num - 1) % 8)
    return TRIGRAMS[index]
  }

  const castHexagram = () => {
    const upper = getTrigram(upperNum)
    const lower = getTrigram(lowerNum)
    const hexNum = ((upper.number - 1) * 8 + lower.number - 1) % 6 + 1
    const hex = HEXAGRAMS.find(h => h.number === hexNum) || HEXAGRAMS[0]
    setResult(hex)
    setCasted(true)
  }

  const renderTrigramLines = (binary: string) => {
    return binary.split('').map((bit, index) => (
      <div key={index} className={`${styles.line} ${bit === '1' ? styles.yang : styles.yin}`} />
    ))
  }

  const upperTrigram = getTrigram(upperNum)
  const lowerTrigram = getTrigram(lowerNum)

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🌸 梅花易数</h1>
        <p>先天八卦，万物类象，随机起卦断吉凶</p>
      </motion.div>

      <div className={styles.inputSection}>
        <div className={styles.numberInput}>
          <div className={styles.inputGroup}>
            <label>上卦数 (1-8)</label>
            <input
              type="number"
              min="1"
              max="8"
              value={upperNum}
              onChange={(e) => setUpperNum(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
            />
          </div>
          <div className={styles.separator}>:</div>
          <div className={styles.inputGroup}>
            <label>下卦数 (1-8)</label>
            <input
              type="number"
              min="1"
              max="8"
              value={lowerNum}
              onChange={(e) => setLowerNum(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
            />
          </div>
        </div>

        <button className={styles.castBtn} onClick={castHexagram}>
          ✨ 起卦占卜
        </button>
      </div>

      <motion.div
        className={styles.hexagramResult}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className={styles.trigram}>
          <div className={styles.trigramName}>{upperTrigram.nature} · {upperTrigram.name}</div>
          <div className={styles.trigramSymbol}>
            {renderTrigramLines(upperTrigram.binary)}
          </div>
          <div className={styles.trigramInfo}>
            {upperTrigram.family} · {upperTrigram.element}
          </div>
        </div>

        <div className={styles.separatorSymbol}>☯</div>

        <div className={styles.trigram}>
          <div className={styles.trigramName}>{lowerTrigram.nature} · {lowerTrigram.name}</div>
          <div className={styles.trigramSymbol}>
            {renderTrigramLines(lowerTrigram.binary)}
          </div>
          <div className={styles.trigramInfo}>
            {lowerTrigram.family} · {lowerTrigram.element}
          </div>
        </div>
      </motion.div>

      {casted && result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={styles.explanationCard}>
            <h2 className={styles.hexagramTitle}>
              第{result.number}卦 · {result.name}
            </h2>
            <p className={styles.hexagramSubtitle}>
              【{result.upper}上{result.lower}下】
            </p>

            <div className={styles.judgment}>
              「 {result.judgment} 」
            </div>

            <div className={styles.imageText}>
              📜 {result.image}
            </div>

            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              lineHeight: 1.8,
              marginBottom: 24,
              padding: '0 20px'
            }}>
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
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
