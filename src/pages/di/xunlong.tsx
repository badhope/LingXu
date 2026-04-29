'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard, ProgressBar } from '@/components/layout/SubPageTemplate'

interface MapCell {
  x: number
  y: number
  terrain: 'mountain' | 'water' | 'plain' | 'forest' | 'city'
  height: number
  energy: number
  hasVein: boolean
  hasXue: boolean
  xueType?: string
  discovered: boolean
}

const generateMap = (): MapCell[][] => {
  const map: MapCell[][] = []
  const seed = Date.now()

  for (let y = 0; y < 12; y++) {
    const row: MapCell[] = []
    for (let x = 0; x < 16; x++) {
      const hash = ((x * 7 + y * 13 + seed) % 100) / 100
      let terrain: MapCell['terrain'] = 'plain'
      let height = 0.3
      let energy = 0.3

      if (hash < 0.15) {
        terrain = 'mountain'
        height = 0.8 + hash * 0.2
        energy = 0.7 + hash * 0.2
      } else if (hash < 0.25) {
        terrain = 'water'
        height = 0.1
        energy = 0.6 + hash * 0.2
      } else if (hash < 0.4) {
        terrain = 'forest'
        height = 0.4
        energy = 0.5 + hash * 0.15
      } else if (hash < 0.48) {
        terrain = 'city'
        height = 0.35
        energy = 0.2
      }

      row.push({
        x, y, terrain, height, energy,
        hasVein: false,
        hasXue: false,
        discovered: false,
      })
    }
    map.push(row)
  }

  const veinPath = [
    [2, 1], [3, 2], [4, 2], [5, 3], [6, 4], [7, 5], [8, 5], [9, 6],
    [10, 7], [11, 7], [12, 8], [13, 9],
  ]
  veinPath.forEach(([x, y]) => {
    if (map[y] && map[y][x]) {
      map[y][x].hasVein = true
      map[y][x].energy = Math.min(1, map[y][x].energy + 0.3)
    }
  })

  const xuePoints = [
    { x: 12, y: 8, type: '真龙正穴' },
    { x: 6, y: 5, type: '行龙过峡' },
    { x: 9, y: 6, type: '回龙顾祖' },
  ]
  xuePoints.forEach(({ x, y, type }) => {
    if (map[y] && map[y][x]) {
      map[y][x].hasXue = true
      map[y][x].xueType = type
      map[y][x].energy = 1
    }
  })

  return map
}

const TERRAIN_COLORS: Record<MapCell['terrain'], string> = {
  mountain: '#78716c',
  water: '#0ea5e9',
  plain: '#84cc16',
  forest: '#22c55e',
  city: '#94a3b8',
}

const TERRAIN_ICONS: Record<MapCell['terrain'], string> = {
  mountain: '⛰️',
  water: '💧',
  plain: '🌱',
  forest: '🌲',
  city: '🏘️',
}

const XUE_GRADES = [
  { name: '真龙正穴', grade: '上上吉穴', color: '#fbbf24', effect: '王侯将相，公侯百世' },
  { name: '回龙顾祖', grade: '上吉穴', color: '#f59e0b', effect: '富贵双全，五代荣华' },
  { name: '行龙过峡', grade: '吉穴', color: '#22c55e', effect: '财丁两旺，三代荣昌' },
  { name: '水抱山环', grade: '上吉穴', color: '#06b6d4', effect: '文人辈出，书香传家' },
  { name: '藏风聚气', grade: '吉穴', color: '#8b5cf6', effect: '平安富足，子孙贤孝' },
]

const TIPS = [
  '登山寻水口，入穴看明堂',
  '山管人丁水管财',
  '九曲入明堂，当朝宰相',
  '四山环抱，一水绕堂',
  '玄武垂头，朱雀翔舞',
  '青龙蜿蜒，白虎驯頫',
  '三年寻龙，十年点穴',
  '乘金相水，穴土印木',
]

export default function XunlongPage() {
  const [map, setMap] = useState<MapCell[][]>([])
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 })
  const [energy, setEnergy] = useState(100)
  const [score, setScore] = useState(0)
  const [foundVeins, setFoundVeins] = useState(0)
  const [foundXue, setFoundXue] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const gameStateRef = useRef({ playerPos, gameStarted, map, foundXue })

  useEffect(() => {
    gameStateRef.current = { playerPos, gameStarted, map, foundXue }
  }, [playerPos, gameStarted, map, foundXue])

  useEffect(() => {
    setMap(generateMap())
  }, [])

  const movePlayer = useCallback((dx: number, dy: number) => {
    const state = gameStateRef.current
    if (!state.gameStarted) return

    const newX = Math.max(0, Math.min(15, state.playerPos.x + dx))
    const newY = Math.max(0, Math.min(11, state.playerPos.y + dy))

    if (newX === state.playerPos.x && newY === state.playerPos.y) return

    setPlayerPos({ x: newX, y: newY })
    setEnergy(prev => Math.max(0, prev - 2))

    const cell = state.map[newY]?.[newX]
    if (!cell) return

    if (!cell.discovered) {
      const newMap = [...state.map]
      newMap[newY][newX] = { ...cell, discovered: true }
      setMap(newMap)

      if (cell.hasVein) {
        setFoundVeins(prev => prev + 1)
        setScore(prev => prev + 50)
        setMessage('🐉 发现龙脉分支！+50分')
        setEnergy(prev => Math.min(100, prev + 10))
      }

      if (cell.hasXue && cell.xueType && !state.foundXue.includes(cell.xueType)) {
        setFoundXue(prev => [...prev, cell.xueType!])
        const xueGrade = XUE_GRADES.find(g => g.name === cell.xueType)
        setScore(prev => prev + 200)
        setMessage(`⭐ 发现${cell.xueType}！+200分 - ${xueGrade?.effect}`)
        setEnergy(prev => Math.min(100, prev + 30))
      }
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': movePlayer(0, -1); break
        case 'ArrowDown': case 's': case 'S': movePlayer(0, 1); break
        case 'ArrowLeft': case 'a': case 'A': movePlayer(-1, 0); break
        case 'ArrowRight': case 'd': case 'D': movePlayer(1, 0); break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [movePlayer])

  const resetGame = useCallback(() => {
    setMap(generateMap())
    setPlayerPos({ x: 0, y: 0 })
    setEnergy(100)
    setScore(0)
    setFoundVeins(0)
    setFoundXue([])
    setMessage('')
    setGameStarted(true)
  }, [])

  const currentCell = map[playerPos.y]?.[playerPos.x]

  return (
    <SubPageTemplate
      title="寻龙点穴"
      subtitle="登山寻水口 · 入穴看明堂 · 三年寻龙 · 十年点穴"
      icon="🐉"
      colorRgb="249, 115, 22"
    >
      <SubPageSection title="🎮 寻龙点穴模拟器">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', textAlign: 'center' }}>
            使用 WASD 或方向键移动地师，探索山水，寻找龙脉与吉穴
          </p>
        </InfoCard>

        {!gameStarted ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              style={{ fontSize: '5rem', marginBottom: '1rem' }}
            >
              🐉
            </motion.div>
            <h3 style={{ color: '#f97316', marginBottom: '1rem' }}>
              地师，请开始你的寻龙之旅
            </h3>
            <p style={{ color: 'rgba(180, 180, 190, 0.7)', marginBottom: '2rem' }}>
              寻龙十万看缠山，一重缠是一重关<br />
              关门若有千重锁，定有王侯居此间
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              style={{
                padding: '1rem 3rem',
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #f97316, #fbbf24)',
                border: 'none',
                borderRadius: '50px',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              🧭 出发寻龙
            </motion.button>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}>
              {[
                { label: '气力', value: energy, max: 100, icon: '💪', color: '#22c55e' },
                { label: '道行', value: score, icon: '⭐', color: '#fbbf24' },
                { label: '龙脉', value: `${foundVeins}/5`, icon: '🐉', color: '#f97316' },
                { label: '吉穴', value: `${foundXue.length}/3`, icon: '💎', color: '#a855f7' },
              ].map(stat => (
                <div key={stat.label} style={{
                  padding: '0.75rem',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                  <div style={{ color: stat.color, fontWeight: 'bold' }}>
                    {stat.value}{stat.max ? `/${stat.max}` : ''}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(180, 180, 190, 0.6)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(249, 115, 22, 0.2)',
                    borderRadius: '8px',
                    border: '1px solid rgba(249, 115, 22, 0.4)',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    color: '#fdba74',
                  }}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              overflow: 'auto',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(16, 36px)',
                gap: '2px',
                padding: '1rem',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '12px',
                border: '2px solid rgba(249, 115, 22, 0.4)',
              }}>
                {map.map((row, y) =>
                  row.map((cell, x) => (
                    <motion.div
                      key={`${x}-${y}`}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => {
                        setPlayerPos({ x, y })
                        if (!cell.discovered) {
                          const newMap = [...map]
                          newMap[y][x] = { ...cell, discovered: true }
                          setMap(newMap)
                        }
                      }}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '4px',
                        background: playerPos.x === x && playerPos.y === y
                          ? 'linear-gradient(135deg, #f97316, #fbbf24)'
                          : cell.discovered
                            ? TERRAIN_COLORS[cell.terrain] + (cell.hasVein ? 'dd' : '99')
                            : '#1a1a2e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        border: cell.hasXue && cell.discovered
                          ? '2px solid #fbbf24'
                          : cell.hasVein && cell.discovered
                            ? '1px solid #f97316'
                            : 'none',
                        boxShadow: playerPos.x === x && playerPos.y === y
                          ? '0 0 12px rgba(249, 115, 22, 0.6)'
                          : 'none',
                        transition: 'all 0.2s',
                      }}
                    >
                      {playerPos.x === x && playerPos.y === y ? '🧙' :
                       cell.discovered ? (
                         cell.hasXue ? '💎' :
                         cell.hasVein ? '🐉' :
                         TERRAIN_ICONS[cell.terrain]
                       ) : '❓'}
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {currentCell && (
              <div style={{
                padding: '1rem',
                background: 'rgba(249, 115, 22, 0.1)',
                borderRadius: '10px',
                borderLeft: '3px solid #f97316',
              }}>
                <h4 style={{ color: '#f97316', margin: 0 }}>
                  📍 当前位置
                </h4>
                <p style={{ color: 'rgba(180, 180, 190, 0.8)', margin: '0.5rem 0 0 0' }}>
                  地形: {TERRAIN_ICONS[currentCell.terrain]} {
                    { mountain: '崇山峻岭', water: '江湖水脉', plain: '平原旷野', forest: '密林深处', city: '人烟辐辏' }[currentCell.terrain]
                  }
                  &nbsp;|&nbsp;
                  地气浓度: <ProgressBar value={currentCell.energy * 100} height={8} color="#f97316" />
                </p>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.6)',
                  fontSize: '0.8rem',
                  marginTop: '0.5rem',
                  fontStyle: 'italic',
                }}>
                  💡 "{TIPS[Math.floor((playerPos.x + playerPos.y * 7) % TIPS.length)]}"
                </p>
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(249, 115, 22, 0.4)',
                  borderRadius: '50px',
                  color: '#fff',
                  cursor: 'pointer',
                  marginRight: '1rem',
                }}
              >
                🔄 重新开局
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHelp(!showHelp)}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  borderRadius: '50px',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                ❓ 寻龙秘诀
              </motion.button>
            </div>

            <AnimatePresence>
              {showHelp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    padding: '1.5rem',
                    background: 'rgba(168, 85, 247, 0.1)',
                    borderRadius: '10px',
                    marginTop: '1rem',
                  }}>
                    <h4 style={{ color: '#a855f7', marginBottom: '1rem' }}>📜 《疑龙经》寻龙要诀</h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '0.75rem',
                    }}>
                      {XUE_GRADES.map(grade => (
                        <div key={grade.name} style={{
                          padding: '0.75rem',
                          background: 'rgba(0,0,0,0.2)',
                          borderRadius: '8px',
                          borderLeft: `3px solid ${grade.color}`,
                        }}>
                          <span style={{ color: grade.color, fontWeight: 'bold' }}>
                            {grade.name}
                          </span>
                          <span style={{
                            fontSize: '0.7rem',
                            padding: '0.1rem 0.5rem',
                            borderRadius: '50px',
                            background: `${grade.color}30`,
                            color: grade.color,
                            marginLeft: '0.5rem',
                          }}>
                            {grade.grade}
                          </span>
                          <p style={{
                            color: 'rgba(180, 180, 190, 0.7)',
                            fontSize: '0.8rem',
                            margin: '0.25rem 0 0 0',
                          }}>
                            {grade.effect}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </SubPageSection>

      <SubPageSection title="📚 寻龙名家">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}>
          {[
            { name: '郭璞', dynasty: '东晋', work: '《葬经》', title: '风水鼻祖', desc: '气乘风则散，界水则止。古人聚之使不散，行之使有止。' },
            { name: '杨筠松', dynasty: '唐代', work: '《撼龙经》《疑龙经》', title: '杨救贫', desc: '救贫风水创始人，游走民间，以风水术救人无数。' },
            { name: '赖布衣', dynasty: '宋代', work: '《催官篇》', title: '风水大侠', desc: '名满天下的风水大师，足迹遍布名山大川。' },
            { name: '刘伯温', dynasty: '明代', work: '《堪舆漫兴》', title: '帝王之师', desc: '辅佐朱元璋定天下，寻龙点穴助大明江山。' },
          ].map(master => (
            <motion.div
              key={master.name}
              whileHover={{ y: -4 }}
              style={{
                padding: '1.25rem',
                background: 'rgba(249, 115, 22, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(249, 115, 22, 0.3)',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}>
                <h4 style={{ color: '#f97316', margin: 0 }}>
                  👤 {master.name}
                </h4>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'rgba(180, 180, 190, 0.6)',
                }}>
                  {master.dynasty}
                </span>
              </div>
              <p style={{
                color: '#fdba74',
                fontSize: '0.8rem',
                margin: 0,
              }}>
                🏆 {master.title} · {master.work}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.8rem',
                marginTop: '0.5rem',
                fontStyle: 'italic',
                marginBottom: 0,
              }}>
                "{master.desc}"
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
