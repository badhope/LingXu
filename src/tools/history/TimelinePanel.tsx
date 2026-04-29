'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DYNASTIES } from './history-data'
import styles from './History.module.scss'

export default function TimelinePanel() {
  const [selectedDynasty, setSelectedDynasty] = useState(DYNASTIES[4])

  const getPosition = (dynasty: typeof DYNASTIES[0]) => {
    const minYear = -2070
    const maxYear = 1912
    const range = maxYear - minYear
    return ((dynasty.startYear - minYear) / range) * 90 + 5
  }

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>⏳ 中华历史时间轴</h1>
        <p>五千年文明史，夏商周秦汉唐宋元明清</p>
      </motion.div>

      <motion.div
        className={styles.timelineContainer}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className={styles.timelineAxis}>
          <div className={styles.timelineLine} />
          
          {DYNASTIES.map((dynasty) => {
            const position = getPosition(dynasty)
            return (
              <motion.div
                key={dynasty.id}
                className={`${styles.dynastyNode} ${selectedDynasty.id === dynasty.id ? styles.selected : ''}`}
                style={{ 
                  left: `${position}%`,
                  color: dynasty.color,
                }}
                onClick={() => setSelectedDynasty(dynasty)}
                whileHover={{ y: -5 }}
              >
                <div 
                  className={styles.dynastyDot}
                  style={{ backgroundColor: dynasty.color }}
                />
                <div className={styles.dynastyLabel}>
                  {dynasty.name}
                </div>
                <div className={styles.dynastyYear}>
                  {dynasty.startYear < 0 ? `前${-dynasty.startYear}` : dynasty.startYear}年
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDynasty.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.dynastyDetail}>
            <div className={styles.dynastyHeader}>
              <div 
                className={styles.dynastyColor}
                style={{ backgroundColor: selectedDynasty.color, color: selectedDynasty.color }}
              />
              <div>
                <h2 className={styles.dynastyName}>{selectedDynasty.name}</h2>
                <div style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {selectedDynasty.startYear < 0 ? `公元前${-selectedDynasty.startYear}` : `公元${selectedDynasty.startYear}`}年 - 
                  {selectedDynasty.endYear < 0 ? ` 公元前${-selectedDynasty.endYear}` : ` 公元${selectedDynasty.endYear}`}年
                  &nbsp;&nbsp;·&nbsp;&nbsp;国祚 {selectedDynasty.duration} 年
                </div>
              </div>
            </div>

            <div className={styles.dynastyMeta}>
              <div className={styles.metaItem}>
                <div className={styles.label}>开国君主</div>
                <div className={styles.value}>{selectedDynasty.founder}</div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.label}>都城</div>
                <div className={styles.value}>{selectedDynasty.capital}</div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.label}>帝王世系</div>
                <div className={styles.value}>{selectedDynasty.emperors} 帝</div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.label}>国祚</div>
                <div className={styles.value}>{selectedDynasty.duration} 年</div>
              </div>
            </div>

            <p className={styles.dynastyDesc}>
              {selectedDynasty.description}
            </p>

            <div style={{ marginBottom: 12, color: '#d4af37', fontWeight: 'bold' }}>
              📜 大事件：
            </div>
            <div className={styles.eventsList}>
              {selectedDynasty.majorEvents.map((event, i) => (
                <motion.div
                  key={i}
                  className={styles.eventTag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  ✨ {event}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
