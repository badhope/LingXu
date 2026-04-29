'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Karma {
  good: number
  evil: number
  donation: number
  precepts: number
  anger: number
  ignorance: number
  generosity: number
}

interface RebirthResult {
  path: typeof SIX_PATHS[number]
  karmaScore: number
  explanation: string
  advice: string
}

const SIX_PATHS = [
  { name: '天道', color: '#fbbf24', icon: '👼', threshold: 90, description: '上品十善，禅定功德' },
  { name: '阿修罗道', color: '#ef4444', icon: '⚔️', threshold: 70, description: '善业夹杂嗔恚' },
  { name: '人道', color: '#22c55e', icon: '👤', threshold: 50, description: '中品五戒，中庸之道' },
  { name: '畜生道', color: '#78716c', icon: '🐄', threshold: 30, description: '愚痴邪见' },
  { name: '饿鬼道', color: '#6b7280', icon: '👻', threshold: 15, description: '悭贪吝啬' },
  { name: '地狱道', color: '#dc2626', icon: '🔥', threshold: 0, description: '五逆十恶' },
]

const EASTER_EGG_PATHS = [
  { name: '键盘侠道', icon: '⌨️', color: '#64748b', condition: (s: number) => s > 45 && s < 55, description: '嘴炮无敌，现实唯唯诺诺，网络重拳出击' },
  { name: '社畜道', icon: '💼', color: '#3b82f6', condition: (s: number) => s > 40 && s < 50, description: '996福报，老板画饼，内卷至死' },
  { name: '肥宅快乐道', icon: '🍕', color: '#f97316', condition: (s: number) => s > 35 && s < 45, description: '可乐薯片游戏机，外卖wifi葛优躺' },
  { name: '猫主子道', icon: '🐱', color: '#ec4899', condition: (s: number) => s > 60 && s < 70, description: '前世救过人，今生当主子，铲屎官伺候' },
  { name: '单身狗道', icon: '🐕', color: '#a855f7', condition: (s: number) => s > 50 && s < 60, description: '注孤生，狗粮管饱，柠檬树下你和我' },
  { name: '程序猿道', icon: '🦍', color: '#06b6d4', condition: (s: number) => s > 55 && s < 65, description: '头发掉光，debug到天亮，产品经理天敌' },
  { name: '干饭人道', icon: '🍜', color: '#84cc16', condition: (s: number) => s > 48 && s < 58, description: '干啥啥不行，干饭第一名' },
  { name: '躺平道', icon: '🛌', color: '#7c3aed', condition: (s: number) => s > 52 && s < 57, description: '不婚不育不买房，佛系人生赢家' },
  { name: '柠檬精道', icon: '🍋', color: '#eab308', condition: (s: number) => s > 25 && s < 35, description: '酸！都可以酸！凭啥他比我好' },
  { name: '鸽子道', icon: '🕊️', color: '#0ea5e9', condition: (s: number) => s > 58 && s < 63, description: '咕咕咕，下次一定！' },
  { name: '摸鱼道', icon: '🐟', color: '#14b8a6', condition: (s: number) => s > 42 && s < 52, description: '上班8小时，7小时在厕所' },
  { name: '修真小说主角道', icon: '⚡', color: '#f43f5e', condition: (s: number) => s === 69, description: '莫欺少年穷！三天之后杀你全家！' },
  { name: '氪金玩家道', icon: '💎', color: '#06b6d4', condition: (s: number) => s > 80 && s < 85, description: '首充6元吊打全区，VIP15为所欲为' },
  { name: '韭菜道', icon: '🌱', color: '#22c55e', condition: (s: number) => s > 20 && s < 30, description: '追涨杀跌，接盘侠，镰刀最爱' },
]

const KARMA_QUESTIONS = [
  { key: 'generosity', question: '经常布施帮助他人吗？', weight: 15 },
  { key: 'precepts', question: '能持守基本戒律（杀盗淫妄）吗？', weight: 15 },
  { key: 'anger', question: '容易生气发怒吗？', weight: -10 },
  { key: 'ignorance', question: '固执己见不信因果吗？', weight: -12 },
  { key: 'donation', question: '乐善好施吗？', weight: 12 },
  { key: 'charity', question: '做过慈善公益吗？', weight: 10 },
  { key: 'filial', question: '孝顺父母长辈吗？', weight: 15 },
  { key: 'kindness', question: '仁慈不杀生灵吗？', weight: 12 },
]

export default function SixPathsWheel() {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showKarmaTest, setShowKarmaTest] = useState(false)
  const [karma, setKarma] = useState<Karma>({
    good: 50, evil: 50, donation: 3, precepts: 3, anger: 3, ignorance: 3, generosity: 3,
  })
  const [result, setResult] = useState<RebirthResult | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const wheelRef = useRef<HTMLDivElement>(null)

  const calculateKarmaScore = useCallback(() => {
    let score = 50
    score += (karma.generosity - 3) * 5
    score += (karma.precepts - 3) * 5
    score -= (karma.anger - 3) * 4
    score -= (karma.ignorance - 3) * 5
    score += (karma.donation - 3) * 4
    return Math.max(0, Math.min(100, score))
  }, [karma])

  const determinePath = useCallback((score: number): RebirthResult => {
    const isEasterEgg = Math.random() < 0.3
    const matchedEasterEgg = EASTER_EGG_PATHS.find(p => p.condition(score))
    
    if (isEasterEgg && matchedEasterEgg) {
      return {
        path: { ...SIX_PATHS[2], ...matchedEasterEgg } as any,
        karmaScore: score,
        explanation: `【特殊转生】${matchedEasterEgg.description}`,
        advice: '🎉 恭喜触发隐藏结局！你是懂当代人生存状态的！',
      }
    }

    const path = SIX_PATHS.find(p => score >= p.threshold) || SIX_PATHS[SIX_PATHS.length - 1]
    
    const explanations: Record<string, string> = {
      '天道': '你前世积累了深厚的善业福德，广行布施，严持禁戒，修习禅定，故得生天道享受胜妙安乐。',
      '阿修罗道': '你前世虽行善业，但多怀嗔恚、嫉妒、傲慢，虽得福报而德性有亏，生于修罗道中。',
      '人道': '你前世善恶参半，守持五戒，行中庸之道，得生人道，是为修道最佳之器。',
      '畜生道': '你前世多造愚痴邪见之业，不信因果，邪淫放荡，故堕畜生道中。',
      '饿鬼道': '你前世悭贪吝啬，不肯布施，嫉妒他人富有，故堕饿鬼道受饥渴苦。',
      '地狱道': '你前世造作五逆十恶重罪，不知忏悔，故堕地狱受无量苦。',
    }

    const advices: Record<string, string> = {
      '天道': '虽生天道，慎勿放逸！天福享尽还堕，当勤修出离之道。',
      '阿修罗道': '当修忍辱行，降伏嗔心，广修慈悲喜舍四无量心。',
      '人道': '人身难得今已得，佛法难闻今已闻。此身不向今生度，更向何生度此身！',
      '畜生道': '至诚忏悔宿世愚痴邪见业障，勤修般若智慧。',
      '饿鬼道': '忏悔悭贪吝惜罪，广行布施，放焰口施食救度饿鬼众生。',
      '地狱道': '至诚发露忏悔五逆十恶重罪，皈依三宝，发菩提心，修大功德。',
    }

    return {
      path,
      karmaScore: score,
      explanation: explanations[path.name] || '',
      advice: advices[path.name] || '',
    }
  }, [])

  const startSpin = useCallback(() => {
    if (isSpinning) return
    setIsSpinning(true)
    setResult(null)

    const karmaScore = calculateKarmaScore()
    const targetPath = SIX_PATHS.findIndex(p => karmaScore >= p.threshold)
    const pathAngle = (targetPath / 6) * 360 + 30
    const fullRotations = 5 + Math.random() * 3
    const finalRotation = rotation + fullRotations * 360 + (360 - pathAngle)

    setRotation(finalRotation)

    setTimeout(() => {
      setIsSpinning(false)
      setResult(determinePath(karmaScore))
    }, 4000)
  }, [isSpinning, calculateKarmaScore, determinePath, rotation])

  const renderWheel = () => {
    const radius = 160
    const centerX = 200
    const centerY = 200

    return (
      <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }}>
        <defs>
          {SIX_PATHS.map((path, i) => (
            <radialGradient key={i} id={`grad-${i}`}>
              <stop offset="0%" stopColor={path.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={path.color} stopOpacity="0.4" />
            </radialGradient>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {SIX_PATHS.map((path, i) => {
          const startAngle = (i / 6) * Math.PI * 2 - Math.PI / 2
          const endAngle = ((i + 1) / 6) * Math.PI * 2 - Math.PI / 2
          const x1 = centerX + radius * Math.cos(startAngle)
          const y1 = centerY + radius * Math.sin(startAngle)
          const x2 = centerX + radius * Math.cos(endAngle)
          const y2 = centerY + radius * Math.sin(endAngle)
          const largeArcFlag = 0

          return (
            <g key={i}>
              <path
                d={`M${centerX},${centerY} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`}
                fill={`url(#grad-${i})`}
                stroke={path.color}
                strokeWidth="2"
                style={{ filter: 'url(#glow)' }}
              />
              <text
                x={centerX + (radius * 0.65) * Math.cos((startAngle + endAngle) / 2)}
                y={centerY + (radius * 0.65) * Math.sin((startAngle + endAngle) / 2)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="24"
              >
                {path.icon}
              </text>
              <text
                x={centerX + (radius * 0.4) * Math.cos((startAngle + endAngle) / 2)}
                y={centerY + (radius * 0.4) * Math.sin((startAngle + endAngle) / 2) + 12}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
                fontSize="11"
                fontWeight="bold"
              >
                {path.name}
              </text>
            </g>
          )
        })}

        <circle cx={centerX} cy={centerY} r="45" fill="#0f0f1a" stroke="#c9a227" strokeWidth="3" />
        <text x={centerX} y={centerY - 8} textAnchor="middle" fontSize="28">☸</text>
        <text x={centerX} y={centerY + 18} textAnchor="middle" fill="#c9a227" fontSize="10" fontWeight="bold">
          六道
        </text>
      </svg>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        alignItems: 'center',
      }}>
        <div style={{ position: 'relative' }}>
          <motion.div
            ref={wheelRef}
            style={{
              width: '100%',
              maxWidth: '400px',
              margin: '0 auto',
              rotate: `${rotation}deg`,
            }}
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.17, 0.67, 0.12, 0.99] }}
          >
            {renderWheel()}
          </motion.div>

          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2rem',
            zIndex: 10,
            filter: 'drop-shadow(0 0 10px rgba(201, 162, 39, 0.8))',
          }}>
            ▼
          </div>
        </div>

        <div>
          <h3 style={{
            fontSize: '1.5rem',
            color: '#c9a227',
            marginBottom: '1.5rem',
            fontFamily: '"Noto Serif SC", serif',
          }}>
            🏵️ 六道轮回占卜
          </h3>

          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '1.5rem',
            lineHeight: 1.8,
          }}>
            欲知前世因，今生受者是。欲知来世果，今生作者是。
            <br />
            根据你今生的善恶业力，看看你来世会转生哪一道？
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowKarmaTest(true)}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid #3b82f6',
                borderRadius: '8px',
                color: '#60a5fa',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              📊 填写业力问卷
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startSpin}
              disabled={isSpinning}
              style={{
                padding: '0.75rem 1.5rem',
                background: isSpinning ? 'rgba(107, 114, 128, 0.2)' : 'rgba(201, 162, 39, 0.2)',
                border: '1px solid ' + (isSpinning ? '#6b7280' : '#c9a227'),
                borderRadius: '8px',
                color: isSpinning ? '#9ca3af' : '#c9a227',
                cursor: isSpinning ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
              }}
            >
              {isSpinning ? '⏳ 转生中...' : '🎡 开始转世'}
            </motion.button>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
            }}>
              <span style={{ color: '#22c55e' }}>善业</span>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>当前业力值: {calculateKarmaScore()}</span>
              <span style={{ color: '#ef4444' }}>恶业</span>
            </div>
            <div style={{
              height: '8px',
              background: 'linear-gradient(to right, #22c55e, #eab308, #ef4444)',
              borderRadius: '4px',
              position: 'relative',
            }}>
              <motion.div
                animate={{ left: `${calculateKarmaScore()}%` }}
                style={{
                  position: 'absolute',
                  top: '-6px',
                  width: '20px',
                  height: '20px',
                  background: '#ffffff',
                  borderRadius: '50%',
                  marginLeft: '-10px',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              marginTop: '2rem',
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(15, 15, 30, 0.95) 0%, rgba(8, 8, 20, 0.98) 100%)',
              border: '2px solid ' + result.path.color,
              borderRadius: '16px',
              boxShadow: `0 0 40px ${result.path.color}30`,
              textAlign: 'center',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ fontSize: '4rem', marginBottom: '1rem' }}
            >
              {result.path.icon}
            </motion.div>

            <h3 style={{
              fontSize: '2rem',
              color: result.path.color,
              fontFamily: '"Noto Serif SC", serif',
              marginBottom: '0.5rem',
            }}>
              {result.path.name}
            </h3>

            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '1rem' }}>
              {result.path.description} · 业力分数: {result.karmaScore}
            </p>

            <p style={{
              lineHeight: 1.8,
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: '1rem',
            }}>
              {result.explanation}
            </p>

            <div style={{
              padding: '1rem',
              background: result.path.color + '15',
              borderRadius: '8px',
              border: '1px solid ' + result.path.color + '40',
              marginTop: '1rem',
            }}>
              <p style={{ color: result.path.color, fontWeight: 'bold' }}>
                🧘 修行建议
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', marginTop: '0.5rem' }}>
                {result.advice}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showKarmaTest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1rem',
            }}
            onClick={() => setShowKarmaTest(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              onClick={e => e.stopPropagation()}
              style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)',
                borderRadius: '16px',
                border: '1px solid rgba(201, 162, 39, 0.3)',
                maxWidth: '500px',
                width: '100%',
              }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                color: '#c9a227',
                marginBottom: '1.5rem',
                textAlign: 'center',
                fontFamily: '"Noto Serif SC", serif',
              }}>
                📊 业力评估问卷
              </h3>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                }}>
                  <span>问题 {currentQuestion + 1} / {KARMA_QUESTIONS.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / KARMA_QUESTIONS.length) * 100)}%</span>
                </div>
                <div style={{
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    animate={{ width: `${((currentQuestion + 1) / KARMA_QUESTIONS.length) * 100}%` }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #22c55e, #c9a227)',
                      borderRadius: '3px',
                    }}
                  />
                </div>
              </div>

              <p style={{
                fontSize: '1.125rem',
                marginBottom: '1.5rem',
                textAlign: 'center',
                lineHeight: 1.6,
              }}>
                {KARMA_QUESTIONS[currentQuestion].question}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '0.5rem',
                marginBottom: '1.5rem',
              }}>
                {[1, 2, 3, 4, 5].map(value => (
                  <motion.button
                    key={value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const key = KARMA_QUESTIONS[currentQuestion].key as keyof typeof karma
                      setKarma(k => ({ ...k, [key]: value }))
                      if (currentQuestion < KARMA_QUESTIONS.length - 1) {
                        setCurrentQuestion(c => c + 1)
                      } else {
                        setShowKarmaTest(false)
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: 'rgba(201, 162, 39, 0.1)',
                      border: '1px solid rgba(201, 162, 39, 0.3)',
                      borderRadius: '8px',
                      color: '#c9a227',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    {value === 1 ? '从不' : value === 2 ? '偶尔' : value === 3 ? '一般' : value === 4 ? '经常' : '总是'}
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => setShowKarmaTest(false)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                }}
              >
                稍后再填
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
