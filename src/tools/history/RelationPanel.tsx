'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FIGURES, RELATION_COLORS } from './history-data'
import styles from './History.module.scss'

const POSITIONS = [
  [50, 15], [25, 35], [75, 35],
  [15, 65], [50, 55], [85, 65],
  [35, 80], [65, 80],
]

export default function RelationPanel() {
  const [selectedFigure, setSelectedFigure] = useState(FIGURES[0])

  const connections = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; color: string; type: string }[] = []
    
    FIGURES.forEach((figure, index) => {
      figure.relationships.forEach(rel => {
        const targetIndex = FIGURES.findIndex(f => f.id === rel.id)
        if (targetIndex > index) {
          lines.push({
            x1: POSITIONS[index][0],
            y1: POSITIONS[index][1],
            x2: POSITIONS[targetIndex][0],
            y2: POSITIONS[targetIndex][1],
            color: RELATION_COLORS[rel.type],
            type: rel.type,
          })
        }
      })
    })
    
    return lines
  }, [])

  const getLineStyle = (line: typeof connections[0]) => {
    const dx = line.x2 - line.x1
    const dy = line.y2 - line.y1
    const length = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx) * (180 / Math.PI)
    
    return {
      left: `${line.x1}%`,
      top: `${line.y1}%`,
      width: `${length}%`,
      transform: `rotate(${angle}deg)`,
      backgroundColor: line.color,
    }
  }

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🕸️ 历史人物关系图谱</h1>
        <p>穿越千年的师徒、君臣、敌友关系网络</p>
      </motion.div>

      <motion.div
        className={styles.relationGraph}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {connections.map((line, i) => (
          <div
            key={i}
            className={styles.relationLine}
            style={getLineStyle(line)}
          />
        ))}

        {FIGURES.map((figure, index) => (
          <motion.div
            key={figure.id}
            className={`${styles.figureNode} ${selectedFigure.id === figure.id ? styles.selected : ''}`}
            style={{
              left: `${POSITIONS[index][0]}%`,
              top: `${POSITIONS[index][1]}%`,
              color: `hsl(${(index * 45) % 360}, 70%, 60%)`,
            }}
            onClick={() => setSelectedFigure(figure)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <div 
              className={styles.figureAvatar}
              style={{ borderColor: `hsl(${(index * 45) % 360}, 70%, 60%)` }}
            >
              {figure.name[0]}
            </div>
            <div className={styles.figureName}>{figure.name}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        key={selectedFigure.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className={styles.figureDetail}>
          <h3 className={styles.figureTitle}>
            {selectedFigure.name} · {selectedFigure.title}
          </h3>
          <p className={styles.figureSubtitle}>
            {selectedFigure.dynasty} · {selectedFigure.years}
          </p>

          <div className={styles.figureQuote}>
            「 {selectedFigure.quote} 」
          </div>

          <p className={styles.figureAchievement}>
            <strong>历史功绩：</strong>{selectedFigure.achievement}
          </p>

          <div className={styles.figureRelations}>
            {selectedFigure.relationships.map((rel, i) => {
              const target = FIGURES.find(f => f.id === rel.id)
              return (
                <span
                  key={i}
                  className={styles.relationTag}
                  style={{ backgroundColor: `${RELATION_COLORS[rel.type]}30`, border: `1px solid ${RELATION_COLORS[rel.type]}` }}
                >
                  {rel.label}：{target?.name}
                </span>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
