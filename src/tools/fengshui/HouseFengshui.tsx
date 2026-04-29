'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { HOUSE_TEMPLATES, FENGSHUI_RULES } from './house-data'
import styles from './HouseFengshui.module.scss'

export default function HouseFengshui() {
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  const currentHouse = HOUSE_TEMPLATES[selectedTemplate]

  const fengshuiResult = useMemo(() => {
    let totalScore = 60
    const triggered = FENGSHUI_RULES.slice(0, 3 + selectedTemplate)
    
    triggered.forEach(rule => {
      totalScore += rule.points
    })
    
    return {
      score: Math.max(0, Math.min(100, totalScore)),
      rules: triggered,
      level: totalScore >= 85 ? 'excellent' : totalScore >= 70 ? 'good' : totalScore >= 55 ? 'average' : 'poor',
      label: totalScore >= 85 ? '上佳风水' : totalScore >= 70 ? '良好风水' : totalScore >= 55 ? '一般风水' : '风水不佳',
      advice: totalScore >= 85 
        ? '此户型风水上佳，福禄双全，建议保持'
        : totalScore >= 70
        ? '风水格局良好，小细节可优化'
        : totalScore >= 55
        ? '格局尚可，有改进空间较大'
        : '问题较多，建议针对性化解'
    }
  }, [selectedTemplate])

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🏠 阳宅风水布局模拟器</h1>
        <p>八宅明镜阳宅三要，现代户型风水专业分析</p>
      </motion.div>

      <div className={styles.toolbar}>
        {HOUSE_TEMPLATES.map((template, index) => (
          <button
            key={template.id}
            className={`${styles.templateBtn} ${selectedTemplate === index ? styles.active : ''}`}
            onClick={() => setSelectedTemplate(index)}
          >
            {template.name}
          </button>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <motion.div 
          className={styles.houseCanvas}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.compassRose}>🧭</div>
          
          <div className={styles.floorPlan}>
            {currentHouse.baseRooms.map((room) => (
              <motion.div
                key={room.id}
                className={`${styles.room} ${selectedRoom === room.id ? styles.selected : ''}`}
                data-type={room.type}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  left: `${room.x}%`,
                  top: `${room.y}%`,
                  width: `${room.width}%`,
                  height: `${room.height}%`,
                }}
                onClick={() => setSelectedRoom(room.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {room.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className={styles.sidebar}>
          <motion.div 
            className={styles.scorePanel}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.scoreCircle} data-score={fengshuiResult.level}>
              <span>{fengshuiResult.score}</span>
            </div>
            <div className={styles.scoreLabel}>{fengshuiResult.label}</div>
            <div className={styles.scoreDesc}>{fengshuiResult.advice}</div>
          </motion.div>

          <motion.div 
            className={styles.rulesPanel}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3>⚖️ 风水判词</h3>
            {fengshuiResult.rules.map((rule) => (
              <div
                key={rule.id}
                className={`${styles.ruleItem} ${styles[rule.severity]}`}
              >
                <div className={`${styles.points} ${styles[rule.severity]}`}>
                  {rule.points > 0 ? '+' : ''}{rule.points}分
                </div>
                <div className={styles.content}>
                  <div className={styles.name}>{rule.name}</div>
                  <div className={styles.desc}>{rule.description}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
