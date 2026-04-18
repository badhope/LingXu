'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { NINE_STARS, EIGHT_DOORS, EIGHT_DEITIES, NINE_PALACES } from './meihua-data'
import styles from './Divination.module.scss'

export default function QimenPanel() {
  const [selectedJu, setSelectedJu] = useState(1)
  const [selectedPalace, setSelectedPalace] = useState<number | null>(null)

  const palaceData = useMemo(() => {
    return NINE_PALACES.map((palace, index) => ({
      palace,
      star: NINE_STARS[(index + selectedJu) % 9],
      door: EIGHT_DOORS[(index + selectedJu * 2) % 8],
      deity: EIGHT_DEITIES[(index + selectedJu * 3) % 8],
    }))
  }, [selectedJu])

  const selectedData = selectedPalace !== null ? palaceData[selectedPalace] : null

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🌀 奇门遁甲</h1>
        <p>九天玄女奇门术，三奇六仪布九宫</p>
      </motion.div>

      <div className={styles.qimenControls}>
        <select value={selectedJu} onChange={(e) => setSelectedJu(parseInt(e.target.value))}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(ju => (
            <option key={ju} value={ju}>阳遁 {ju} 局</option>
          ))}
        </select>
      </div>

      <motion.div
        className={styles.qimenGrid}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, staggerChildren: 0.05 }}
      >
        {palaceData.map((data, index) => (
          <motion.div
            key={index}
            className={styles.palaceCell}
            onClick={() => setSelectedPalace(index)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.palaceName}>{data.palace}</div>
            <div className={styles.star}>⭐ {data.star}</div>
            <div className={styles.door}>🚪 {data.door}</div>
            <div className={styles.deity}>👁 {data.deity}</div>
          </motion.div>
        ))}
      </motion.div>

      {selectedData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.palaceDetail}
        >
          <h4>📍 {selectedData.palace}宫详情</h4>
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <div className={styles.label}>天盘九星</div>
              <div className={styles.value} style={{ color: '#4ade80' }}>{selectedData.star}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.label}>人盘八门</div>
              <div className={styles.value} style={{ color: '#60a5fa' }}>{selectedData.door}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.label}>神盘八神</div>
              <div className={styles.value} style={{ color: '#f472b6' }}>{selectedData.deity}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.label}>吉凶</div>
              <div className={styles.value} style={{ color: '#d4af37' }}>
                {selectedData.door.includes('休') || selectedData.door.includes('生') || selectedData.door.includes('开') 
                  ? '吉门' : '平门/凶门'}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div style={{ marginTop: 32, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
        💡 点击任意宫位查看详细信息 · 三吉门：休门、生门、开门
      </div>
    </div>
  )
}
