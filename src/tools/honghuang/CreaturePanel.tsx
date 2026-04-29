'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CREATURES, REALMS, LEVELS } from './creature-data'
import styles from './Honghuang.module.scss'

const STAT_COLORS = {
  power: '#ef4444',
  speed: '#22c55e',
  wisdom: '#3b82f6',
  fortune: '#d4af37',
  ferocity: '#f97316',
}

const STAT_LABELS = {
  power: '力量',
  speed: '速度',
  wisdom: '智慧',
  fortune: '气运',
  ferocity: '凶性',
}

export default function CreaturePanel() {
  const [selectedRealm, setSelectedRealm] = useState<string>('all')
  const [selectedCreature, setSelectedCreature] = useState(CREATURES[0])

  const filtered = useMemo(() => {
    if (selectedRealm === 'all') return CREATURES
    return CREATURES.filter(c => c.realm === selectedRealm)
  }, [selectedRealm])

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🐉 山海经异兽图鉴</h1>
        <p>上古洪荒，山海精怪，异兽录</p>
      </motion.div>

      <div className={styles.filterBar}>
        <button
          className={`${styles.filterBtn} ${selectedRealm === 'all' ? styles.active : ''}`}
          onClick={() => setSelectedRealm('all')}
        >
          🌍 全部
        </button>
        {Object.entries(REALMS).map(([key, realm]) => (
          <button
            key={key}
            className={`${styles.filterBtn} ${selectedRealm === key ? styles.active : ''}`}
            onClick={() => setSelectedRealm(key)}
            style={{ borderColor: selectedRealm === key ? realm.color : undefined }}
          >
            {realm.icon} {realm.name}
          </button>
        ))}
      </div>

      <motion.div 
        className={styles.grid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05 }}
      >
        {filtered.map((creature) => (
          <motion.div
            key={creature.id}
            layoutId={`card-${creature.id}`}
            className={`${styles.creatureCard} ${selectedCreature.id === creature.id ? styles.selected : ''}`}
            style={{ color: creature.color }}
            onClick={() => setSelectedCreature(creature)}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={styles.creatureIcon} style={{ borderColor: creature.color }}>
              {creature.image}
            </div>
            <h3 className={styles.creatureName}>{creature.name}</h3>
            <p className={styles.creatureAlias}>{creature.alias}</p>
            <div className={styles.creatureTags}>
              <span 
                className={styles.tag}
                style={{ backgroundColor: `${REALMS[creature.realm].color}30`, border: `1px solid ${REALMS[creature.realm].color}` }}
              >
                {REALMS[creature.realm].name}
              </span>
              <span 
                className={styles.tag}
                style={{ backgroundColor: `${LEVELS[creature.level].color}30`, border: `1px solid ${LEVELS[creature.level].color}` }}
              >
                {LEVELS[creature.level].name}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedCreature && (
          <motion.div
            key={selectedCreature.id}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.detailPanel} style={{ color: selectedCreature.color }}>
              <div className={styles.detailHeader}>
                <div 
                  className={styles.detailIcon}
                  style={{ borderColor: selectedCreature.color }}
                >
                  {selectedCreature.image}
                </div>
                <div className={styles.detailTitle}>
                  <h2>{selectedCreature.name} · {selectedCreature.alias}</h2>
                  <p>
                    {REALMS[selectedCreature.realm].icon} {REALMS[selectedCreature.realm].name} · 
                    {LEVELS[selectedCreature.level].name} · 
                    出没于{selectedCreature.habitat}
                  </p>
                </div>
              </div>

              <div className={styles.statsGrid}>
                {Object.entries(selectedCreature.stats).map(([key, value]) => (
                  <div key={key} className={styles.statItem}>
                    <div className={styles.statLabel}>{STAT_LABELS[key as keyof typeof STAT_LABELS]}</div>
                    <div className={styles.statBar}>
                      <motion.div
                        className={styles.statFill}
                        style={{ backgroundColor: STAT_COLORS[key as keyof typeof STAT_COLORS] }}
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                    <div className={styles.statValue}>{value}</div>
                  </div>
                ))}
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <div className={styles.label}>形相</div>
                  <div className={styles.value}>{selectedCreature.appearance}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.label}>居处</div>
                  <div className={styles.value}>{selectedCreature.habitat}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.label}>异能</div>
                  <div className={styles.value}>{selectedCreature.ability}</div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.label}>征兆</div>
                  <div className={styles.value}>{selectedCreature.omen}</div>
                </div>
              </div>

              <div className={styles.abilityDesc}>
                📜 {selectedCreature.description}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
