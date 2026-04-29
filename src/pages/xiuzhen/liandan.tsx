import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import { COLORS, SPACING, RADIUS, alpha } from '@/styles/tokens'
import { useLocalStorage } from '@/hooks'

const HERBS = [
  { id: 'lingzhi', name: '千年灵芝', rarity: '蓝', effect: '固本培元', count: 10 },
  { id: 'xucao', name: '洗髓草', rarity: '紫', effect: '易经洗髓', count: 5 },
  { id: 'zhuguo', name: '朱果', rarity: '蓝', effect: '增进修为', count: 8 },
  { id: 'huanglian', name: '黄莲', rarity: '绿', effect: '清热解毒', count: 20 },
  { id: 'renshen', name: '万年人参', rarity: '金', effect: '生死人肉白骨', count: 2 },
  { id: 'xuecan', name: '血蚕', rarity: '紫', effect: '精血大补', count: 3 },
  { id: 'shexiang', name: '麝香', rarity: '蓝', effect: '开窍醒神', count: 6 },
  { id: 'huagu', name: '花菇', rarity: '绿', effect: '温和滋补', count: 30 },
]

const DANFANG = [
  {
    name: '聚气丹',
    grade: '凡级',
    herbs: ['千年灵芝', '花菇'],
    effect: '快速聚集天地灵气',
    rate: 90,
    difficulty: 1,
    color: COLORS.green,
  },
  {
    name: '筑基丹',
    grade: '凡级',
    herbs: ['朱果', '千年灵芝', '黄莲'],
    effect: '筑基必用，提升成功率',
    rate: 70,
    difficulty: 2,
    color: COLORS.blue,
  },
  {
    name: '洗髓丹',
    grade: '灵级',
    herbs: ['洗髓草', '血蚕'],
    effect: '易经洗髓，脱胎换骨',
    rate: 55,
    difficulty: 3,
    color: COLORS.purple,
  },
  {
    name: '大还丹',
    grade: '灵级',
    herbs: ['万年人参', '麝香'],
    effect: '起死回生，功力大增',
    rate: 40,
    difficulty: 4,
    color: COLORS.gold,
  },
  {
    name: '渡劫丹',
    grade: '宝级',
    herbs: ['万年人参', '血蚕', '朱果'],
    effect: '抵御雷劫，心魔不侵',
    rate: 25,
    difficulty: 5,
    color: COLORS.red,
  },
]

const HUOHOU = [
  { name: '文火', desc: '低温慢炼，不易炸炉', rateBonus: 15, qualityBonus: -10 },
  { name: '中火', desc: '阴阳调和，中正平和', rateBonus: 0, qualityBonus: 0 },
  { name: '武火', desc: '高温速成，风险较高', rateBonus: -15, qualityBonus: 15 },
]

const RARITY_COLOR: Record<string, string> = {
  '绿': COLORS.green,
  '蓝': COLORS.blue,
  '紫': COLORS.purple,
  '金': COLORS.gold,
  '红': COLORS.red,
}

const getCurrentTimeBonus = () => {
  const hour = new Date().getHours()
  if (hour >= 23 || hour < 1) return 1.3
  if (hour >= 11 && hour < 13) return 1.2
  return 1.0
}

export default function LianDanPage() {
  const [inventory, setInventory] = useLocalStorage('liandan-inventory', HERBS)
  const [selectedHerbs, setSelectedHerbs] = useState<string[]>([])
  const [selectedFang, setSelectedFang] = useState<typeof DANFANG[0] | null>(null)
  const [huohou, setHuohou] = useState(1)
  const [isRefining, setIsRefining] = useState(false)
  const [refineStep, setRefineStep] = useState(0)
  const [result, setResult] = useState<{ success: boolean; name: string; msg: string; quality: string } | null>(null)

  const timeBonus = getCurrentTimeBonus()

  const toggleHerb = (id: string) => {
    setSelectedHerbs(prev =>
      prev.includes(id)
        ? prev.filter(h => h !== id)
        : [...prev, id]
    )
  }

  const startRefining = () => {
    if (selectedHerbs.length === 0) return

    setIsRefining(true)
    setRefineStep(1)
    setResult(null)

    selectedHerbs.forEach(hid => {
      setInventory(prev => prev.map(h =>
        h.id === hid ? { ...h, count: Math.max(0, h.count - 1) } : h
      ))
    })

    setTimeout(() => setRefineStep(2), 1000)
    setTimeout(() => setRefineStep(3), 2000)
    setTimeout(() => {
      setIsRefining(false)
      setRefineStep(0)

      const matchFang = DANFANG.find(fang => {
        const fangIds = fang.herbs.map(name =>
          inventory.find(h => h.name === name)?.id
        ).filter(Boolean) as string[]
        return fangIds.every(id => selectedHerbs.includes(id)) &&
               selectedHerbs.every(id => fangIds.includes(id))
      })

      if (matchFang) {
        const finalRate = (matchFang.rate + HUOHOU[huohou].rateBonus) * timeBonus
        const success = Math.random() * 100 < finalRate

        const qualityRoll = Math.random() * 100 + HUOHOU[huohou].qualityBonus
        const quality = qualityRoll > 85 ? '极品' :
                       qualityRoll > 60 ? '上品' :
                       qualityRoll > 35 ? '中品' : '下品'

        setResult({
          success,
          name: matchFang.name,
          quality,
          msg: success
            ? `丹香四溢！练成【${quality}】${matchFang.name}！`
            : '轰隆...炸炉了！杂质太多火候失控...'
        })
      } else if (selectedHerbs.length >= 2) {
        setResult({
          success: false,
          name: '毒丹',
          quality: '废丹',
          msg: '胡乱搭配，炼成毒丹...'
        })
      } else {
        setResult({
          success: false,
          name: '药渣',
          quality: '-',
          msg: '材料不足，化为灰烬...'
        })
      }

      setSelectedHerbs([])
      localStorage.setItem('liandan-data', JSON.stringify(inventory))
    }, 3500)
  }

  return (
    <SubPageTemplate
      title="炼丹阁"
      subtitle="九鼎丹炉煉金丹，一粒吞入腹，我命由我不由天"
      colorRgb={COLORS.goldRgb}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: SPACING.lg,
          borderRadius: RADIUS.lg,
          background: alpha(COLORS.gold, 0.1),
          border: `1px solid ${alpha(COLORS.gold, 0.2)}`,
          marginBottom: SPACING['2xl'],
          textAlign: 'center',
        }}
      >
        <span style={{ color: COLORS.gold, fontWeight: 600 }}>
          🕐 时辰加成：×{timeBonus}
        </span>
        <span style={{ color: COLORS.text.muted, marginLeft: SPACING.lg, fontSize: 13 }}>
          {timeBonus > 1.1 ? '(炼丹吉时！子时/午时炼丹更佳)' : '(寻常时刻)'}
        </span>
      </motion.div>

      <div className="grid-2" style={{ gap: SPACING['3xl'] }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 style={{
            fontSize: 20,
            color: COLORS.gold,
            marginBottom: SPACING.xl,
          }}>
            🔥 九转丹炉
          </h3>

          <AnimatePresence mode="wait">
            <motion.div
              animate={isRefining ? {
                boxShadow: [
                  `0 0 40px ${alpha(COLORS.gold, 0.3)}`,
                  `0 0 80px ${alpha(COLORS.red, 0.5)}`,
                  `0 0 40px ${alpha(COLORS.gold, 0.3)}`,
                ]
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                padding: SPACING['3xl'],
                borderRadius: RADIUS.xl,
                background: `radial-gradient(circle at 50% 30%, ${alpha(isRefining ? COLORS.red : COLORS.amber, 0.2)}, ${alpha(COLORS.bg.dark, 0.9)})`,
                border: `2px solid ${alpha(isRefining ? COLORS.red : COLORS.amber, 0.3)}`,
                textAlign: 'center',
                marginBottom: SPACING.xl,
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {isRefining && refineStep >= 1 && (
                <motion.div
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    width: '80%',
                    height: 40,
                    background: `radial-gradient(ellipse at 50% 100%, ${alpha(COLORS.red, 0.6)}, transparent 70%)`,
                    borderRadius: '50%',
                  }}
                />
              )}

              <motion.div
                animate={isRefining ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 1, -1, 0],
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ fontSize: 72, marginBottom: SPACING.lg, zIndex: 1 }}
              >
                🏺
              </motion.div>

              {isRefining ? (
                <div>
                  <div style={{
                    color: COLORS.amber,
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: SPACING.sm,
                  }}>
                    {refineStep === 1 && '投药入炉...'}
                    {refineStep === 2 && '文武之火，萃取精华...'}
                    {refineStep === 3 && '凝丹成丸，即将出炉！'}
                  </div>
                  <div style={{
                    width: 200,
                    height: 6,
                    background: alpha(COLORS.gray800, 0.5),
                    borderRadius: RADIUS.full,
                    overflow: 'hidden',
                    margin: '0 auto',
                  }}>
                    <motion.div
                      animate={{ width: `${(refineStep / 3) * 100}%` }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${COLORS.amber}, ${COLORS.red})`,
                        borderRadius: RADIUS.full,
                      }}
                    />
                  </div>
                </div>
              ) : result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div style={{
                    color: result.success ? COLORS.gold : COLORS.gray500,
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: SPACING.sm,
                  }}>
                    {result.success ? '✨' : '💨'} {result.name}
                    {result.success && (
                      <span style={{
                        marginLeft: SPACING.sm,
                        fontSize: 16,
                        color: COLORS.purple,
                      }}>
                        【{result.quality}】
                      </span>
                    )}
                  </div>
                  <div style={{
                    color: COLORS.text.secondary,
                    fontSize: 14,
                  }}>
                    {result.msg}
                  </div>
                </motion.div>
              ) : (
                <div style={{
                  color: COLORS.text.muted,
                  fontSize: 14,
                }}>
                  选择药材与火候，开始炼丹
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div style={{ marginBottom: SPACING.xl }}>
            <div style={{
              color: COLORS.text.muted,
              fontSize: 13,
              marginBottom: SPACING.md,
            }}>
              🔥 火候控制
            </div>
            <div style={{
              display: 'flex',
              gap: SPACING.md,
              justifyContent: 'center',
            }}>
              {HUOHOU.map((h, idx) => (
                <motion.button
                  key={h.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setHuohou(idx)}
                  disabled={isRefining}
                  style={{
                    flex: 1,
                    padding: SPACING.md,
                    borderRadius: RADIUS.lg,
                    background: huohou === idx
                      ? `linear-gradient(135deg, ${COLORS.red}, ${COLORS.amber})`
                      : alpha(COLORS.gray800, 0.5),
                    border: `1px solid ${huohou === idx
                      ? alpha(COLORS.amber, 0.5)
                      : alpha(COLORS.gray600, 0.2)}`,
                    color: huohou === idx ? 'white' : COLORS.text.secondary,
                    cursor: isRefining ? 'not-allowed' : 'pointer',
                    fontSize: 13,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{h.name}</div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>{h.desc}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startRefining}
            disabled={isRefining || selectedHerbs.length === 0}
            style={{
              width: '100%',
              padding: SPACING.xl,
              borderRadius: RADIUS.lg,
              background: isRefining || selectedHerbs.length === 0
                ? COLORS.gray800
                : `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.red})`,
              border: 'none',
              color: isRefining || selectedHerbs.length === 0
                ? COLORS.text.muted
                : 'white',
              fontWeight: 700,
              fontSize: 16,
              cursor: isRefining || selectedHerbs.length === 0
                ? 'not-allowed'
                : 'pointer',
            }}
          >
            {selectedHerbs.length > 0
              ? `🔥 开始炼丹 (已选 ${selectedHerbs.length} 味药材)`
              : '请选择炼丹药材'}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 style={{
            fontSize: 18,
            color: COLORS.gold,
            marginBottom: SPACING.lg,
          }}>
            📜 丹方大全
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.md,
            marginBottom: SPACING['3xl'],
          }}>
            {DANFANG.map((fang, idx) => (
              <motion.div
                key={fang.name}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedFang(fang)}
                style={{
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  background: selectedFang?.name === fang.name
                    ? alpha(fang.color, 0.15)
                    : alpha(COLORS.bg.card, 1),
                  border: `1px solid ${selectedFang?.name === fang.name
                    ? alpha(fang.color, 0.4)
                    : alpha(COLORS.gray600, 0.2)}`,
                  borderLeft: `3px solid ${fang.color}`,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: SPACING.sm,
                }}>
                  <span style={{
                    color: fang.color,
                    fontWeight: 600,
                    fontSize: 16,
                  }}>
                    {fang.name}
                  </span>
                  <span style={{
                    padding: `${SPACING.sm} ${SPACING.md}`,
                    borderRadius: RADIUS.full,
                    background: alpha(fang.color, 0.15),
                    color: fang.color,
                    fontSize: 11,
                  }}>
                    {fang.grade} · 成功率{fang.rate}%
                  </span>
                </div>
                <div style={{ fontSize: 12, color: COLORS.text.secondary }}>
                  {fang.effect}
                </div>
                <div style={{
                  marginTop: SPACING.sm,
                  fontSize: 12,
                  color: COLORS.text.muted,
                }}>
                  配方：{fang.herbs.join(' + ')}
                </div>
                <div style={{
                  display: 'flex',
                  gap: 2,
                  marginTop: SPACING.sm,
                }}>
                  {Array(5).fill(0).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color: i < fang.difficulty ? COLORS.red : COLORS.gray700,
                        fontSize: 12,
                      }}
                    >
                      ★
                    </span>
                  ))}
                  <span style={{ color: COLORS.text.muted, marginLeft: SPACING.sm, fontSize: 11 }}>
                    难度
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <h4 style={{
            fontSize: 16,
            color: COLORS.green,
            marginBottom: SPACING.lg,
          }}>
            🌿 药材库
          </h4>
          <div className="grid-2" style={{ gap: SPACING.md }}>
            {inventory.map(herb => (
              <motion.div
                key={herb.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => herb.count > 0 && toggleHerb(herb.id)}
                style={{
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  background: selectedHerbs.includes(herb.id)
                    ? alpha(RARITY_COLOR[herb.rarity], 0.2)
                    : alpha(COLORS.bg.card, 1),
                  border: `1px solid ${selectedHerbs.includes(herb.id)
                    ? alpha(RARITY_COLOR[herb.rarity], 0.5)
                    : alpha(COLORS.gray600, 0.2)}`,
                  cursor: herb.count > 0 ? 'pointer' : 'not-allowed',
                  opacity: herb.count > 0 ? 1 : 0.4,
                }}
              >
                <div style={{
                  color: RARITY_COLOR[herb.rarity],
                  fontWeight: 600,
                  marginBottom: 4,
                }}>
                  {herb.name}
                </div>
                <div style={{ fontSize: 12, color: COLORS.text.muted }}>
                  {herb.effect}
                </div>
                <div style={{
                  fontSize: 12,
                  color: herb.count > 5 ? COLORS.green : COLORS.amber,
                  marginTop: 4,
                }}>
                  剩余 {herb.count} 份
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SubPageTemplate>
  )
}
