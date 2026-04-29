'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  NAJIA_MAP, 
  TRIGRAM_BRANCHES, 
  SHI_POSITIONS, 
  SIX_SPIRITS,
  ELEMENT_GENERATES,
  ELEMENT_RESTRICTS,
  TRIGRAMS,
  LIUYAO_MANUAL,
} from './liuyao-constants'
import styles from './Liuyao.module.scss'

interface CoinState {
  id: number
  value: number
  rotating: boolean
}

interface YaoRecord {
  index: number
  coins: number[]
  yaoType: 'oldYin' | 'youngYin' | 'youngYang' | 'oldYang'
  originalValue: number
  finalValue: number
  branch?: string
  stem?: string
  spirit?: string
  relation?: string
  isShi?: boolean
  isYing?: boolean
}

interface HexagramInfo {
  name: string
  palace: string
  palaceElement: string
  upperTrigram: typeof TRIGRAMS[number]
  lowerTrigram: typeof TRIGRAMS[number]
  shiPosition: number
}

const YAO_TYPES = [
  { key: 'oldYin', name: '老阴', symbol: '×', color: '#60a5fa', changing: true },
  { key: 'youngYin', name: '少阴', symbol: '- -', color: '#60a5fa', changing: false },
  { key: 'youngYang', name: '少阳', symbol: '—', color: '#ef4444', changing: false },
  { key: 'oldYang', name: '老阳', symbol: '○', color: '#ef4444', changing: true },
]

const SPIRIT_COLORS: Record<string, string> = {
  '青龙': '#22c55e',
  '朱雀': '#ef4444',
  '勾陈': '#f59e0b',
  '螣蛇': '#8b5cf6',
  '白虎': '#f1f5f9',
  '玄武': '#3b82f6',
}

const RELATION_COLORS: Record<string, string> = {
  '父母': '#3b82f6',
  '官鬼': '#ef4444',
  '兄弟': '#f59e0b',
  '妻财': '#22c55e',
  '子孙': '#8b5cf6',
}

export default function LiuyaoCast() {
  const [coins, setCoins] = useState<CoinState[]>([
    { id: 1, value: 2, rotating: false },
    { id: 2, value: 2, rotating: false },
    { id: 3, value: 2, rotating: false },
  ])

  const [yaoRecords, setYaoRecords] = useState<YaoRecord[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [hexagram, setHexagram] = useState<HexagramInfo | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [selectedGod, setSelectedGod] = useState('')

  const castingRef = useRef(false)
  const stepRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  const calculateRelation = useCallback((branchElement: string, selfElement: string): string => {
    if (branchElement === selfElement) return '兄弟'
    if (ELEMENT_GENERATES[branchElement] === selfElement) return '父母'
    if (ELEMENT_GENERATES[selfElement] === branchElement) return '子孙'
    if (ELEMENT_RESTRICTS[branchElement] === selfElement) return '官鬼'
    return '妻财'
  }, [])

  const assembleNajia = useCallback((records: YaoRecord[]) => {
    const binary = records.map(r => r.finalValue)
    const upperBinary = binary.slice(3, 6).join('')
    const lowerBinary = binary.slice(0, 3).join('')
    
    const upperTrigram = TRIGRAMS.find(t => t.binary.join('') === upperBinary) || TRIGRAMS[0]
    const lowerTrigram = TRIGRAMS.find(t => t.binary.join('') === lowerBinary) || TRIGRAMS[0]
    
    const palace = lowerTrigram.palace
    const palaceElement = lowerTrigram.element
    
    const shiPosition = SHI_POSITIONS[palace.toLowerCase()] || 0

    const upperStems = NAJIA_MAP[upperTrigram.id] || []
    const lowerStems = NAJIA_MAP[lowerTrigram.id] || []
    const upperBranches = TRIGRAM_BRANCHES[upperTrigram.id] || []
    const lowerBranches = TRIGRAM_BRANCHES[lowerTrigram.id] || []

    const assembledRecords = records.map((record, idx) => {
      const stem = idx < 3 ? lowerStems[idx] : upperStems[idx - 3]
      const branch = idx < 3 ? lowerBranches[idx] : upperBranches[idx - 3]
      
      const branchElement = branch ? ({
        'zi': '水', 'chou': '土', 'yin': '木', 'mao': '木',
        'chen': '土', 'si': '火', 'wu': '火', 'wei': '土',
        'shen': '金', 'you': '金', 'xu': '土', 'hai': '水',
      }[branch] || '土') : '土'

      return {
        ...record,
        stem,
        branch,
        spirit: SIX_SPIRITS[idx],
        relation: calculateRelation(branchElement, palaceElement),
        isShi: idx === shiPosition,
        isYing: idx === (shiPosition + 3) % 6,
      }
    })

    setYaoRecords(assembledRecords)
    setHexagram({
      name: `${upperTrigram.name}${lowerTrigram.name}`,
      palace: `${palace}宫`,
      palaceElement,
      upperTrigram,
      lowerTrigram,
      shiPosition,
    })
  }, [calculateRelation])

  const castCoins = useCallback(() => {
    if (castingRef.current || stepRef.current >= 6) return
    castingRef.current = true

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setCoins(prev => prev.map(c => ({ ...c, rotating: true })))

    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) return

      setCoins((prevCoins) => {
        if (!mountedRef.current) return prevCoins

        const newCoins = prevCoins.map((c) => {
          const isBack = Math.random() > 0.5
          return {
            ...c,
            value: isBack ? 3 : 2,
            rotating: false,
          }
        })

        const sum = newCoins.reduce((acc, c) => acc + c.value, 0)
        const yaoTypeIndex = sum === 6 ? 0 : sum === 8 ? 1 : sum === 9 ? 3 : 2
        const yaoType = YAO_TYPES[yaoTypeIndex].key as YaoRecord['yaoType']
        
        const originalValue = sum === 6 || sum === 8 ? 0 : 1
        const finalValue = sum === 6 ? 1 : sum === 9 ? 0 : originalValue

        const newRecord: YaoRecord = {
          index: stepRef.current,
          coins: newCoins.map(c => c.value),
          yaoType,
          originalValue,
          finalValue,
        }

        setYaoRecords((prevRecords) => {
          if (!mountedRef.current) return prevRecords
          const newRecords = [...prevRecords, newRecord]

          if (newRecords.length === 6) {
            timeoutRef.current = setTimeout(() => {
              if (!mountedRef.current) return
              assembleNajia(newRecords)
              setShowResult(true)
            }, 500)
          }

          return newRecords
        })

        setCurrentStep(s => s + 1)
        stepRef.current += 1
        castingRef.current = false
        timeoutRef.current = null

        return prevCoins.map((c, i) => ({
          ...c,
          value: newCoins[i].value,
          rotating: false,
        }))
      })
    }, 800)
  }, [assembleNajia])

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setYaoRecords([])
    setCurrentStep(0)
    setShowResult(false)
    setHexagram(null)
    setSelectedGod('')
    stepRef.current = 0
    castingRef.current = false
  }, [])

  return (
    <div className={styles.liuyaoContainer}>
      <motion.div 
        className={styles.castingArea}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className={styles.title}>
          ⚡ 火珠林纳甲
        </h2>

        <div className={styles.coinsArea}>
          {coins.map((coin) => (
            <motion.div
              key={coin.id}
              className={`${styles.coin} ${coin.rotating ? styles.rotating : ''}`}
              animate={coin.rotating ? {
                rotateY: [0, 360, 720],
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {coin.value === 3 ? '背' : '字'}
            </motion.div>
          ))}
        </div>

        <motion.button
          className={styles.castButton}
          onClick={castCoins}
          disabled={castingRef.current || currentStep >= 6}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentStep >= 6 ? '✅ 成卦' : `掷钱 (${currentStep}/6)`}
        </motion.button>

        <button 
          className={styles.helpToggle}
          onClick={() => setShowHelp(!showHelp)}
        >
          {showHelp ? '收起帮助' : '📖 火珠林要诀'}
        </button>

        <AnimatePresence>
          {showHelp && (
            <motion.div
              className={styles.helpPanel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className={styles.historyNote}>
                📜 {LIUYAO_MANUAL.history}
              </div>
              
              <div className={styles.principles}>
                <h5>🧿 纳甲四要</h5>
                {LIUYAO_MANUAL.principles.map((p, i) => (
                  <div key={i} className={styles.principleItem}>
                    {p}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className={styles.yaoPanel}>
        <h3>📊 纳甲卦盘</h3>
        
        <div className={styles.hexagramInfo}>
          {hexagram && (
            <>
              <div className={styles.palaceInfo}>
                <span className={styles.palaceName}>{hexagram.palace}</span>
                <span className={styles.elementTag}>{hexagram.palaceElement}</span>
              </div>
              <div className={styles.hexagramName}>
                {hexagram.upperTrigram.name} · {hexagram.lowerTrigram.name}
              </div>
            </>
          )}
        </div>

        <div className={styles.yaoStack}>
          {[5, 4, 3, 2, 1, 0].map((position) => {
            const record = yaoRecords[position]
            return (
              <motion.div
                key={position}
                className={`${styles.yaoLine} ${record?.isShi ? styles.shiLine : ''} ${record?.isYing ? styles.yingLine : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: position * 0.05 }}
              >
                {record && (
                  <>
                    <span 
                      className={styles.spirit}
                      style={{ color: SPIRIT_COLORS[record.spirit || ''] }}
                    >
                      {record.spirit}
                    </span>
                    
                    <span className={styles.stemBranch}>
                      {record.stem}{record.branch}
                    </span>

                    <div 
                      className={styles.yaoSymbol}
                      style={{ color: record.yaoType === 'oldYang' || record.yaoType === 'youngYang' ? '#ef4444' : '#60a5fa' }}
                    >
                      {record.yaoType === 'oldYang' && '○'}
                      {record.yaoType === 'oldYin' && '×'}
                      {record.yaoType === 'youngYang' && '━━━'}
                      {record.yaoType === 'youngYin' && '━ ━'}
                    </div>

                    <span 
                      className={styles.relation}
                      style={{ color: RELATION_COLORS[record.relation || ''] }}
                    >
                      {record.relation}
                    </span>

                    <span className={styles.shiYingMark}>
                      {record.isShi && <span className={styles.shiMark}>世</span>}
                      {record.isYing && <span className={styles.yingMark}>应</span>}
                    </span>
                  </>
                )}

                {!record && (
                  <div className={styles.emptyYao}>━ ━</div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {showResult && hexagram && (
          <motion.div
            className={styles.resultModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.resultContent}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
            >
              <h2>✅ 装卦完成</h2>
              
              <div className={styles.guaPanSummary}>
                <div className={styles.summaryRow}>
                  <span>本宫</span>
                  <strong>{hexagram.palace} {hexagram.palaceElement}</strong>
                </div>
                <div className={styles.summaryRow}>
                  <span>世应</span>
                  <span>世在{['初', '二', '三', '四', '五', '上'][hexagram.shiPosition]}爻</span>
                </div>
              </div>

              <div className={styles.useGodSection}>
                <h4>🎯 选择用神</h4>
                <div className={styles.useGodGrid}>
                  {Object.entries(LIUYAO_MANUAL.useGodMap).map(([matter, god]) => (
                    <button
                      key={matter}
                      className={`${styles.godButton} ${selectedGod === matter ? styles.selected : ''}`}
                      onClick={() => setSelectedGod(matter)}
                    >
                      {matter}
                      <span className={styles.godHint}>({god})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.legendPanel}>
                <div className={styles.legendRow}>
                  <span style={{ color: '#22c55e' }}>● 青龙</span>
                  <span style={{ color: '#ef4444' }}>● 朱雀</span>
                  <span style={{ color: '#f59e0b' }}>● 勾陈</span>
                </div>
                <div className={styles.legendRow}>
                  <span style={{ color: '#8b5cf6' }}>● 螣蛇</span>
                  <span style={{ color: '#f1f5f9' }}>● 白虎</span>
                  <span style={{ color: '#3b82f6' }}>● 玄武</span>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button onClick={reset} className={styles.resetBtn}>
                  🔄 重新起卦
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
