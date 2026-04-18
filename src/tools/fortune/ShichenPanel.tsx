'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SHICHENS, SHICHEN_LUCK } from './fortune-data'
import styles from './Fortune.module.scss'

export default function ShichenPanel() {
  const [currentHour, setCurrentHour] = useState(new Date().getHours())
  const [currentShichen, setCurrentShichen] = useState(0)

  useEffect(() => {
    const getCurrentShichen = () => {
      const hour = new Date().getHours()
      setCurrentHour(hour)
      
      if (hour >= 23 || hour < 1) return 0
      if (hour >= 1 && hour < 3) return 1
      if (hour >= 3 && hour < 5) return 2
      if (hour >= 5 && hour < 7) return 3
      if (hour >= 7 && hour < 9) return 4
      if (hour >= 9 && hour < 11) return 5
      if (hour >= 11 && hour < 13) return 6
      if (hour >= 13 && hour < 15) return 7
      if (hour >= 15 && hour < 17) return 8
      if (hour >= 17 && hour < 19) return 9
      if (hour >= 19 && hour < 21) return 10
      return 11
    }

    setCurrentShichen(getCurrentShichen())
    
    const timer = setInterval(() => {
      setCurrentShichen(getCurrentShichen())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>⏰ 十二时辰吉凶</h1>
        <p>子午流注，按时择吉，一日十二时辰吉凶查询</p>
      </motion.div>

      <motion.div
        className={styles.currentShichen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        当前时间 <span>{currentHour}:{String(new Date().getMinutes()).padStart(2, '0')}</span> · 
        正值 <span>{SHICHENS[currentShichen].name}</span> · 
        <span style={{ 
          color: SHICHEN_LUCK[currentShichen] === '吉' ? '#4ade80' : 
                 SHICHEN_LUCK[currentShichen] === '凶' ? '#f87171' : '#60a5fa'
        }}>
          {SHICHEN_LUCK[currentShichen]}
        </span>
      </motion.div>

      <motion.div
        className={styles.shichenGrid}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, staggerChildren: 0.05 }}
      >
        {SHICHENS.map((shichen, index) => (
          <motion.div
            key={shichen.id}
            className={`${styles.shichenCard} ${currentShichen === index ? styles.current : ''}`}
            data-luck={SHICHEN_LUCK[index]}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={styles.animal}>
              {['🐭', '🐮', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐵', '🐔', '🐶', '🐷'][index]}
            </div>
            <div className={styles.name}>{shichen.name}</div>
            <div className={styles.time}>
              {String(shichen.startHour).padStart(2, '0')}:00 - 
              {String(shichen.endHour).padStart(2, '0')}:00
            </div>
            <div className={styles.luck} data-luck={SHICHEN_LUCK[index]}>
              {SHICHEN_LUCK[index]}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
