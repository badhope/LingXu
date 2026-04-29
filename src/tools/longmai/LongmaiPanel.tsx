'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DRAGON_VEINS, CAVE_POINTS, VEIN_LEVELS, POINT_TYPES } from './longmai-data'
import styles from './Longmai.module.scss'

export default function LongmaiPanel() {
  const [selectedVein, setSelectedVein] = useState(DRAGON_VEINS[0])
  const [selectedPoint, setSelectedPoint] = useState<typeof CAVE_POINTS[0] | null>(null)
  const [viewMode, setViewMode] = useState<'veins' | 'points' | 'both'>('both')

  const getVeinLineStyle = (vein: typeof DRAGON_VEINS[0]) => {
    const dx = vein.endPoint[0] - vein.startPoint[0]
    const dy = vein.endPoint[1] - vein.startPoint[1]
    const length = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx) * (180 / Math.PI)
    
    return {
      left: `${vein.startPoint[0]}%`,
      top: `${vein.startPoint[1]}%`,
      width: `${length}%`,
      transform: `rotate(${angle}deg)`,
      backgroundColor: vein.color,
      color: vein.color,
    }
  }

  const activeVein = selectedPoint 
    ? DRAGON_VEINS.find(v => v.id === selectedPoint.veinId) 
    : selectedVein

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🐉 龙脉寻龙点穴</h1>
        <p>三大干龙行脉络，千里江山寻龙诀，天星照应辨穴情</p>
      </motion.div>

      <div className={styles.mainGrid}>
        <motion.div 
          className={styles.mapContainer}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.mapControls}>
            <button 
              className={viewMode === 'veins' ? styles.active : ''}
              onClick={() => setViewMode('veins')}
            >
              显示龙脉
            </button>
            <button 
              className={viewMode === 'points' ? styles.active : ''}
              onClick={() => setViewMode('points')}
            >
              显示穴位
            </button>
            <button 
              className={viewMode === 'both' ? styles.active : ''}
              onClick={() => setViewMode('both')}
            >
              全部显示
            </button>
          </div>

          <div className={styles.mapCanvas}>
            {viewMode !== 'points' && DRAGON_VEINS.map((vein) => (
              <motion.div
                key={vein.id}
                className={`${styles.veinLine} ${selectedVein.id === vein.id ? styles.selected : ''}`}
                style={getVeinLineStyle(vein)}
                onClick={() => { setSelectedVein(vein); setSelectedPoint(null); }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scaleY: 1.5 }}
              />
            ))}

            {viewMode !== 'veins' && CAVE_POINTS.map((point) => (
              <motion.div
                key={point.id}
                className={`${styles.cavePoint} ${selectedPoint?.id === point.id ? styles.selected : ''}`}
                style={{
                  left: `${point.position[0]}%`,
                  top: `${point.position[1]}%`,
                  backgroundColor: POINT_TYPES[point.type].color,
                  color: POINT_TYPES[point.type].color,
                }}
                onClick={() => setSelectedPoint(point)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              />
            ))}

            <div className={styles.mapLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendColor} style={{ backgroundColor: '#8b0000' }}></div>
                <span>天脉 - 至尊龙脉</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendColor} style={{ backgroundColor: '#4ade80' }}></div>
                <span>生穴 - 上吉</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendColor} style={{ backgroundColor: '#d4af37' }}></div>
                <span>旺穴 - 吉</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className={styles.sidebar}>
          <motion.div 
            className={styles.detailPanel}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {selectedPoint ? (
              <>
                <h3>📍 {selectedPoint.name}</h3>
                <span 
                  className={styles.levelBadge}
                  style={{ 
                    backgroundColor: `${POINT_TYPES[selectedPoint.type].color}20`,
                    color: POINT_TYPES[selectedPoint.type].color,
                    border: `1px solid ${POINT_TYPES[selectedPoint.type].color}`
                  }}
                >
                  {POINT_TYPES[selectedPoint.type].label} · {POINT_TYPES[selectedPoint.type].name}
                </span>
                
                <div className={styles.energyBar}>
                  <div 
                    className={styles.energyFill} 
                    style={{ 
                      width: `${selectedPoint.quality}%`,
                      backgroundColor: POINT_TYPES[selectedPoint.type].color 
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
                  灵气品质：{selectedPoint.quality}分
                </div>

                <div className={styles.legendText}>
                  <strong>发现者：</strong>{selectedPoint.discovery}<br /><br />
                  <strong>传说：</strong>{selectedPoint.legend}
                </div>
              </>
            ) : (
              <>
                <h3>🐉 {selectedVein.name}</h3>
                <span 
                  className={styles.levelBadge}
                  style={{ 
                    backgroundColor: `${VEIN_LEVELS[selectedVein.level].color}20`,
                    color: VEIN_LEVELS[selectedVein.level].color,
                    border: `1px solid ${VEIN_LEVELS[selectedVein.level].color}`
                  }}
                >
                  {VEIN_LEVELS[selectedVein.level].label}
                </span>
                
                <div className={styles.energyBar}>
                  <div 
                    className={styles.energyFill} 
                    style={{ 
                      width: `${selectedVein.energy}%`,
                      backgroundColor: selectedVein.color 
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
                  龙脉能量：{selectedVein.energy}分
                </div>

                <p className={styles.legendText}>{selectedVein.description}</p>
                
                <div className={styles.blessings}>
                  {selectedVein.blessings.map((b, i) => (
                    <span key={i}>✨ {b}</span>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          <motion.div 
            className={styles.detailPanel}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3>🧭 三大干龙</h3>
            <div className={styles.veinList}>
              {DRAGON_VEINS.map((vein) => (
                <div
                  key={vein.id}
                  className={`${styles.veinListItem} ${activeVein?.id === vein.id ? styles.selected : ''}`}
                  onClick={() => { setSelectedVein(vein); setSelectedPoint(null); }}
                >
                  <div className={styles.name}>
                    <span style={{ color: vein.color }}>●</span> {vein.name}
                  </div>
                  <div className={styles.meta}>
                    {VEIN_LEVELS[vein.level].name} · 灵气 {vein.energy}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
