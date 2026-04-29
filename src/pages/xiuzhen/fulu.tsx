import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import { COLORS, SPACING, RADIUS, alpha } from '@/styles/tokens'
import { useLocalStorage } from '@/hooks'
import type { Fulu } from '@/types/xiuzhen'

const FULU_TEMPLATES = [
  {
    id: 'pingan',
    name: '平安符',
    grade: '黄符',
    effect: '驱邪避凶，保佑平安',
    cost: { cinnabar: 1, paper: 1 },
    power: 10,
    color: COLORS.amber,
  },
  {
    id: 'jingshen',
    name: '凝神符',
    grade: '黄符',
    effect: '集中精神，心魔不生',
    cost: { cinnabar: 1, paper: 1 },
    power: 15,
    color: COLORS.blue,
  },
  {
    id: 'qingxin',
    name: '清心符',
    grade: '玄符',
    effect: '清心神，破幻境',
    cost: { cinnabar: 2, paper: 1, yanjing: 1 },
    power: 30,
    color: COLORS.cyan,
  },
  {
    id: 'jinji',
    name: '金甲符',
    grade: '玄符',
    effect: '护体金光，减免伤害',
    cost: { cinnabar: 2, paper: 2, yanjing: 1 },
    power: 50,
    color: COLORS.amber,
  },
  {
    id: 'tianlei',
    name: '天雷符',
    grade: '地符',
    effect: '召唤天雷，重创妖邪',
    cost: { cinnabar: 3, paper: 2, yanjing: 2, xuezhu: 1 },
    power: 100,
    color: COLORS.purple,
  },
  {
    id: 'liushen',
    name: '六神符',
    grade: '天符',
    effect: '六神护体，万法不侵',
    cost: { cinnabar: 5, paper: 3, yanjing: 3, xuezhu: 2, longxian: 1 },
    power: 200,
    color: COLORS.gold,
  },
]

const MATERIALS = [
  { id: 'cinnabar', name: '朱砂', count: 50 },
  { id: 'paper', name: '黄符纸', count: 50 },
  { id: 'yanjing', name: '砚京墨', count: 20 },
  { id: 'xuezhu', name: '血朱砂', count: 10 },
  { id: 'longxian', name: '龙涎香', count: 5 },
]

export default function FuLuPage() {
  const [materials, setMaterials] = useLocalStorage('fulu-materials', MATERIALS)
  const [fuluInventory, setFuluInventory] = useLocalStorage<Fulu[]>('fulu-inventory', [])
  const [selectedFulu, setSelectedFulu] = useState(FULU_TEMPLATES[0])
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawProgress, setDrawProgress] = useState(0)
  const [result, setResult] = useState<{ success: boolean; quality: string; msg: string } | null>(null)

  const checkMaterials = (cost: Record<string, number | undefined>) => {
    return Object.entries(cost).every(([mid, amount]) => {
      const mat = materials.find(m => m.id === mid)
      return mat && mat.count >= (amount || 0)
    })
  }

  const consumeMaterials = (cost: Record<string, number | undefined>) => {
    setMaterials(prev => prev.map(m => {
      const used = cost[m.id] || 0
      return { ...m, count: Math.max(0, m.count - used) }
    }))
  }

  const startDrawing = () => {
    if (!checkMaterials(selectedFulu.cost)) return
    if (isDrawing) return

    setIsDrawing(true)
    setDrawProgress(0)
    setResult(null)
    consumeMaterials(selectedFulu.cost)

    const interval = setInterval(() => {
      setDrawProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          finishDrawing()
          return 100
        }
        return prev + Math.floor(Math.random() * 8) + 3
      })
    }, 200)
  }

  const finishDrawing = () => {
    setIsDrawing(false)

    const successRate = 70 + drawProgress * 0.2
    const success = Math.random() * 100 < successRate

    if (success) {
      const qualityRoll = Math.random()
      const quality = qualityRoll < 0.1 ? '完美' :
                       qualityRoll < 0.3 ? '上乘' :
                       qualityRoll < 0.6 ? '中品' : '下品'

      setResult({
        success: true,
        quality,
        msg: `画符成功！获得【${quality}】${selectedFulu.name}`
      })

      setFuluInventory(prev => [...prev, {
        ...selectedFulu,
        quality,
        time: Date.now()
      } as Fulu])
    } else {
      setResult({
        success: false,
        quality: '失败',
        msg: '符纸燃烧...画符失败！'
      })
    }
  }

  const handleUseFulu = (idx: number) => {
    const targetIdx = fuluInventory.length - 1 - idx
    setFuluInventory(prev => prev.filter((_, i: number) => i !== targetIdx))
  }

  return (
    <SubPageTemplate
      title="符箓堂"
      subtitle="朱筆書天篆，黃紙鎮妖魔"
      colorRgb={COLORS.amberRgb}
    >
      <div className="grid-3" style={{ gap: SPACING['2xl'] }}>
        <div style={{ gridColumn: 'span 1' }}>
          <h4 style={{
            fontSize: 18,
            color: COLORS.amber,
            marginBottom: SPACING.lg,
          }}>
            📜 符箓图鉴
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.md,
          }}>
            {FULU_TEMPLATES.map((fulu, idx) => (
              <motion.div
                key={fulu.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedFulu(fulu)}
                style={{
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  background: selectedFulu.id === fulu.id
                    ? `linear-gradient(90deg, ${alpha(fulu.color, 0.25)}, ${alpha(fulu.color, 0.05)})`
                    : alpha(COLORS.bg.card, 1),
                  border: `1px solid ${selectedFulu.id === fulu.id
                    ? alpha(fulu.color, 0.4)
                    : alpha(COLORS.gray600, 0.15)}`,
                  borderLeft: `3px solid ${fulu.color}`,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{
                      color: fulu.color,
                      fontWeight: 600,
                      marginBottom: 2,
                    }}>
                      ✨ {fulu.name}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.text.muted }}>
                      {fulu.grade} · 威力 {fulu.power}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: checkMaterials(fulu.cost) ? COLORS.green : COLORS.red,
                  }}>
                    {checkMaterials(fulu.cost) ? '可画' : '材料不足'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <h4 style={{
            fontSize: 16,
            color: COLORS.amber,
            margin: `${SPACING.xl} 0 ${SPACING.lg}`,
          }}>
            🎨 画符材料
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: SPACING.md,
          }}>
            {materials.map(mat => (
              <div
                key={mat.id}
                style={{
                  padding: SPACING.md,
                  borderRadius: RADIUS.lg,
                  background: alpha(COLORS.bg.card, 1),
                  border: `1px solid ${alpha(COLORS.gray600, 0.2)}`,
                  textAlign: 'center',
                }}
              >
                <div style={{
                  color: COLORS.text.primary,
                  fontWeight: 600,
                  fontSize: 13,
                }}>
                  {mat.name}
                </div>
                <div style={{
                  color: mat.count > 10 ? COLORS.green : COLORS.amber,
                  fontSize: 18,
                  fontWeight: 700,
                }}>
                  {mat.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ gridColumn: 'span 2' }}
        >
          <div style={{
            padding: SPACING['3xl'],
            borderRadius: RADIUS.xl,
            background: `linear-gradient(135deg, ${alpha(selectedFulu.color, 0.12)}, ${alpha(COLORS.bg.dark, 0.9)})`,
            border: `1px solid ${alpha(selectedFulu.color, 0.25)}`,
            marginBottom: SPACING.xl,
            textAlign: 'center',
          }}>
            <h3 style={{
              fontSize: 24,
              color: selectedFulu.color,
              marginBottom: SPACING.lg,
            }}>
              ✦ {selectedFulu.name} ✦
            </h3>

            <AnimatePresence mode="wait">
              <motion.div
                key={isDrawing ? 'drawing' : result ? 'result' : 'idle'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  height: 280,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {isDrawing ? (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 1, -1, 0],
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{ fontSize: 80, marginBottom: SPACING.xl }}
                    >
                      📜
                    </motion.div>
                    <div style={{
                      width: '60%',
                      height: 12,
                      background: alpha(COLORS.gray800, 0.5),
                      borderRadius: RADIUS.full,
                      overflow: 'hidden',
                      marginBottom: SPACING.lg,
                    }}>
                      <motion.div
                        animate={{ width: `${drawProgress}%` }}
                        style={{
                          height: '100%',
                          background: `linear-gradient(90deg, ${selectedFulu.color}, ${COLORS.red})`,
                          borderRadius: RADIUS.full,
                        }}
                      />
                    </div>
                    <div style={{ color: selectedFulu.color, fontSize: 14 }}>
                      执笔绘制中... {drawProgress}%
                    </div>
                    <div style={{ color: COLORS.text.muted, fontSize: 12, marginTop: SPACING.sm }}>
                      天地玄宗，万气本根。广修亿劫，证吾神通！
                    </div>
                  </>
                ) : result ? (
                  <>
                    <div style={{
                      fontSize: 64,
                      marginBottom: SPACING.lg,
                    }}>
                      {result.success ? '✨' : '💨'}
                    </div>
                    <div style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: result.success ? selectedFulu.color : COLORS.gray500,
                    }}>
                      {result.msg}
                    </div>
                    {result.success && (
                      <div style={{
                        marginTop: SPACING.md,
                        color: COLORS.gold,
                        fontSize: 14,
                      }}>
                        威力 +{selectedFulu.power}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      style={{ fontSize: 80, marginBottom: SPACING.lg }}
                    >
                      ✒️
                    </motion.div>
                    <p style={{
                      color: COLORS.text.secondary,
                      maxWidth: 400,
                      lineHeight: 1.8,
                      padding: SPACING.lg,
                      borderRadius: RADIUS.lg,
                      background: alpha(COLORS.bg.glass, 1),
                      borderLeft: `3px solid ${selectedFulu.color}`,
                    }}>
                      「{selectedFulu.effect}」
                    </p>
                    <div style={{
                      marginTop: SPACING.lg,
                      fontSize: 13,
                      color: COLORS.text.muted,
                    }}>
                      需要消耗：
                      {Object.entries(selectedFulu.cost).map(([mid, amount]) => {
                        const mat = materials.find(m => m.id === mid)
                        return ` ${mat?.name}×${amount}`
                      }).join('、')}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startDrawing}
              disabled={isDrawing || !checkMaterials(selectedFulu.cost)}
              style={{
                marginTop: SPACING.xl,
                padding: `${SPACING.lg} ${SPACING['3xl']}`,
                borderRadius: RADIUS.lg,
                background: isDrawing || !checkMaterials(selectedFulu.cost)
                  ? COLORS.gray800
                  : `linear-gradient(135deg, ${selectedFulu.color}, ${COLORS.red})`,
                border: 'none',
                color: isDrawing || !checkMaterials(selectedFulu.cost)
                  ? COLORS.text.muted
                  : 'white',
                fontWeight: 700,
                fontSize: 16,
                cursor: isDrawing || !checkMaterials(selectedFulu.cost)
                  ? 'not-allowed'
                  : 'pointer',
              }}
            >
              ✒️ 开始画符
            </motion.button>
          </div>

          <h4 style={{
            fontSize: 18,
            color: COLORS.amber,
            marginBottom: SPACING.lg,
          }}>
            🎒 已画符箓 ({fuluInventory.length})
          </h4>
          <div style={{
            maxHeight: 280,
            overflow: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: SPACING.md,
          }}>
            {fuluInventory.length === 0 ? (
              <div style={{
                gridColumn: '1 / -1',
                padding: SPACING.xl,
                textAlign: 'center',
                color: COLORS.text.muted,
              }}>
                符箓袋空空如也
              </div>
            ) : (
              fuluInventory.slice().reverse().map((fulu: Fulu, idx: number) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleUseFulu(idx)}
                  style={{
                    padding: SPACING.lg,
                    borderRadius: RADIUS.lg,
                    background: `linear-gradient(135deg, ${alpha(fulu.color, 0.2)}, ${alpha(COLORS.bg.card, 1)})`,
                    border: `1px solid ${alpha(fulu.color, 0.3)}`,
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    fontSize: 24,
                    marginBottom: SPACING.sm,
                  }}>
                    📜
                  </div>
                  <div style={{
                    color: fulu.color,
                    fontWeight: 600,
                    fontSize: 13,
                  }}>
                    {fulu.name}
                  </div>
                  <div style={{
                    fontSize: 11,
                    color: COLORS.gold,
                  }}>
                    {fulu.quality}
                  </div>
                  <div style={{
                    marginTop: SPACING.sm,
                    fontSize: 11,
                    color: COLORS.text.muted,
                  }}>
                    点击使用
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </SubPageTemplate>
  )
}
