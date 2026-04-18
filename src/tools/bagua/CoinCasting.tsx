'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HEXAGRAMS, YAO_TYPES, XIAN_TIAN_TRIGRAMS } from './bagua-data'
import styles from './Bagua.module.scss'

interface CoinState {
  id: number
  value: number
  rotating: boolean
  result: '字' | '背'
}

interface YaoRecord {
  index: number
  coins: number[]
  type: typeof YAO_TYPES[number]
  originalValue: number
  finalValue: number
}

const playCoinSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContext) return
    
    const audioContext = new AudioContext()
    if (audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {})
    }
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.15)
    
    setTimeout(() => audioContext.close().catch(() => {}), 300)
  } catch (e) {
  }
}

export default function CoinCasting() {
  const [coins, setCoins] = useState<CoinState[]>([
    { id: 1, value: 2, rotating: false, result: '字' },
    { id: 2, value: 3, rotating: false, result: '背' },
    { id: 3, value: 2, rotating: false, result: '字' },
  ])
  
  const [yaoRecords, setYaoRecords] = useState<YaoRecord[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [hexagramResult, setHexagramResult] = useState<typeof HEXAGRAMS[number] | null>(null)
  const [showHelp, setShowHelp] = useState(false)
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

  const STEP_HINTS = [
    '💡 静心凝神，点击「第1次掷钱」，开始第一爻',
    '💡 继续掷钱，完成第二爻',
    '💡 已完成初爻，继续进行第三爻',
    '💡 下三爻已完成，现在开始上三爻',
    '💡 还差最后两爻，请继续',
    '💡 最后一爻！马上就要成卦了',
    '✨ 六爻齐备！点击查看卦象详情',
  ]

  const castCoins = useCallback(() => {
    if (castingRef.current || stepRef.current >= 6) return
    castingRef.current = true

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    playCoinSound()

    setCoins(prev => prev.map(c => ({ ...c, rotating: true })))

    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) return

      setCoins((prevCoins) => {
        if (!mountedRef.current) return prevCoins

        const newCoins = prevCoins.map(() => {
          const isBack = Math.random() > 0.5
          return {
            value: isBack ? 3 : 2,
            result: isBack ? '背' : '字' as '字' | '背',
          }
        })

        const sum = newCoins.reduce((acc, c) => acc + c.value, 0)
        const yaoTypeIndex = sum === 6 ? 0 : sum === 8 ? 1 : sum === 9 ? 3 : 2
        const yaoType = YAO_TYPES[yaoTypeIndex]
        
        const originalValue = sum === 6 || sum === 8 ? 0 : 1
        const finalValue = sum === 6 ? 1 : sum === 9 ? 0 : originalValue

        const newRecord: YaoRecord = {
          index: stepRef.current,
          coins: newCoins.map(c => c.value),
          type: yaoType,
          originalValue,
          finalValue,
        }

        setYaoRecords((prevRecords) => {
          if (!mountedRef.current) return prevRecords
          const newRecords = [...prevRecords, newRecord]

          if (newRecords.length === 6) {
            timeoutRef.current = setTimeout(() => {
              if (!mountedRef.current) return
              const upperBinary = newRecords.slice(3, 6).map(r => r.finalValue).join('')
              const lowerBinary = newRecords.slice(0, 3).map(r => r.finalValue).join('')
              const upperId = parseInt(upperBinary, 2)
              const lowerId = parseInt(lowerBinary, 2)
              
              const hexagram = HEXAGRAMS.find(h => 
                h.lowerTrigram === lowerId && h.upperTrigram === upperId
              ) || HEXAGRAMS[0]
              
              setHexagramResult(hexagram)
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
          result: newCoins[i].result,
          rotating: false,
        }))
      })
    }, 800)
  }, [])

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setYaoRecords([])
    setCurrentStep(0)
    setShowResult(false)
    setHexagramResult(null)
    stepRef.current = 0
    castingRef.current = false
  }, [])

  return (
    <div className={styles.baguaContainer}>
      <motion.div 
        className={styles.castingArea}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className={styles.title}>
          <span className={styles.titleIcon}>🪙</span>
          文王金钱卦
        </h2>

        <div className={styles.coinsPlate}>
          <div className={styles.plateInner}>
            {coins.map((coin, i) => (
              <motion.div
                key={coin.id}
                className={styles.coin}
                animate={{
                  rotateX: coin.rotating ? [0, 1080 + i * 120] : 0,
                  rotateY: coin.rotating ? [0, 720 + i * 90] : 0,
                  y: coin.rotating ? [0, -60, 0] : 0,
                  scale: coin.rotating ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                style={{
                  background: coin.result === '字' 
                    ? 'linear-gradient(145deg, #d4af37, #8b6914)'
                    : 'linear-gradient(145deg, #8b6914, #5c4a0d)',
                }}
              >
                <span className={styles.coinChar}>
                  {coin.result === '字' ? '寶' : '滿'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.controlButtons}>
          {!showResult && (
            <motion.button
              className={styles.primaryButton}
              onClick={castCoins}
              disabled={currentStep >= 6}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ 第 {currentStep + 1} 次掷钱
            </motion.button>
          )}
          
          <motion.button
            className={styles.secondaryButton}
            onClick={reset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 重新起卦
          </motion.button>
        </div>

        <div className={styles.progressBar}>
          {[0, 1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`${styles.progressDot} ${step < currentStep ? styles.completed : ''}`}
            />
          ))}
        </div>

        <div className={styles.stepHint}>
          {STEP_HINTS[currentStep]}
        </div>

        <motion.button
          className={styles.helpToggle}
          onClick={() => setShowHelp(!showHelp)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showHelp ? '📕 收起帮助' : '📖 查看帮助'}
        </motion.button>

        <AnimatePresence>
          {showHelp && (
            <motion.div
              className={styles.helpCard}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4>📜 文王金钱卦占卜方法</h4>
              <ol>
                <li><strong>静心：</strong>平心静气，意念集中于所问之事</li>
                <li><strong>起卦：</strong>点击「掷钱」按钮，模拟抛掷三枚铜钱</li>
                <li><strong>记录：</strong>三枚铜钱共掷六次，依次得到六个爻</li>
                <li><strong>装卦：</strong>从下往上排列，初爻在下，上爻在上</li>
                <li><strong>解卦：</strong>成卦后查看卦辞、象辞、爻辞详解</li>
              </ol>
              <div className={styles.yaoLegend}>
                <h5>爻符说明</h5>
                <div className={styles.legendRow}>
                  <span style={{ color: '#666666' }}>× 老阴（变爻）</span>
                  <span style={{ color: '#4a5568' }}>- - 少阴</span>
                  <span style={{ color: '#d4af37' }}>— 少阳</span>
                  <span style={{ color: '#ffd700' }}>○ 老阳（变爻）</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className={styles.yaoDisplay}>
        <h3>📊 卦象记录</h3>
        <div className={styles.yaoStack}>
          {[5, 4, 3, 2, 1, 0].map((position) => {
            const record = yaoRecords[position]
            return (
              <motion.div
                key={position}
                className={styles.yaoLine}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: position * 0.05 }}
              >
                <span className={styles.yaoPosition}>
                  {['初', '二', '三', '四', '五', '上'][position]}
                </span>
                
                {record ? (
                  <div 
                    className={styles.yaoSymbol}
                    style={{ color: record.type.color }}
                  >
                    {record.type.changing && (
                      <span className={styles.changingMark}>⚡</span>
                    )}
                    {record.type.symbol}
                  </div>
                ) : (
                  <div className={styles.yaoEmpty}>— —</div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {showResult && hexagramResult && (
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
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              <div className={styles.hexagramHeader}>
                <div className={styles.hexagramSymbol}>
                  {hexagramResult.symbol}
                </div>
                <div>
                  <h2>{hexagramResult.name}</h2>
                  <p className={styles.hexagramCategory}>
                    {XIAN_TIAN_TRIGRAMS[hexagramResult.upperTrigram]?.name}上
                    {XIAN_TIAN_TRIGRAMS[hexagramResult.lowerTrigram]?.name}下 · 
                    {hexagramResult.element} · 第{hexagramResult.kingWenOrder}卦
                  </p>
                </div>
              </div>

              <div className={styles.hexagramJudgment}>
                <h4>📜 卦辞</h4>
                <p>{hexagramResult.judgment}</p>
              </div>

              <div className={styles.hexagramImage}>
                <h4>🌌 象曰</h4>
                <p>{hexagramResult.image}</p>
              </div>

              <div className={styles.changingAnalysis}>
                <h4>⚡ 变爻解析规则</h4>
                <div className={styles.ruleGrid}>
                  <div className={styles.ruleCard}>
                    <h5>▌无变爻</h5>
                    <p>以本卦卦辞为占，静观其变</p>
                  </div>
                  <div className={styles.ruleCard}>
                    <h5>▌一爻变</h5>
                    <p>以本卦变爻爻辞为主</p>
                  </div>
                  <div className={styles.ruleCard}>
                    <h5>▌二爻变</h5>
                    <p>以两变爻爻辞，上爻为主</p>
                  </div>
                  <div className={styles.ruleCard}>
                    <h5>▌三爻变</h5>
                    <p>本卦为贞，之卦为悔，占其卦辞</p>
                  </div>
                  <div className={styles.ruleCard}>
                    <h5>▌四爻变</h5>
                    <p>以不变两爻爻辞，下爻为主</p>
                  </div>
                  <div className={styles.ruleCard}>
                    <h5>▌五爻变</h5>
                    <p>以之卦不变爻爻辞为占</p>
                  </div>
                  <div className={styles.ruleCard}>
                    <h5>▌六爻全变</h5>
                    <p>乾坤占二用，余占之卦卦辞</p>
                  </div>
                </div>
              </div>

              <div className={styles.methodology}>
                <h4>💡 解卦方法论</h4>
                <div className={styles.methodItem}>
                  <span className={styles.methodNum}>01</span>
                  <div>
                    <h5>明体用</h5>
                    <p>内卦为体，为己；外卦为用，为事。观体用五行生克以定吉凶</p>
                  </div>
                </div>
                <div className={styles.methodItem}>
                  <span className={styles.methodNum}>02</span>
                  <div>
                    <h5>察衰旺</h5>
                    <p>观各爻得位与否、得中与否、乘承比应关系以辨情伪</p>
                  </div>
                </div>
                <div className={styles.methodItem}>
                  <span className={styles.methodNum}>03</span>
                  <div>
                    <h5>通时变</h5>
                    <p>以所问之事类万物之情，活变圆融，不可执着于文字</p>
                  </div>
                </div>
              </div>

              <div className={styles.linesContainer}>
                <h4>🔘 爻辞</h4>
                {hexagramResult.lines.map((line, i) => (
                  <div key={i} className={styles.lineItem}>
                    <span className={styles.lineNumber}>
                      {['初', '二', '三', '四', '五', '上'][i]}
                    </span>
                    <span className={styles.lineText}>{line}</span>
                  </div>
                ))}
              </div>

              <div className={styles.modalButtons}>
                <motion.button
                  className={styles.resetButton}
                  onClick={() => {
                    setShowResult(false)
                    setYaoRecords([])
                    setCurrentStep(0)
                    setHexagramResult(null)
                    stepRef.current = 0
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🔄 重新占卜
                </motion.button>
                <motion.button
                  className={styles.closeButton}
                  onClick={() => setShowResult(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  关闭
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
