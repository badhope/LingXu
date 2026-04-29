import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import { COLORS, SPACING, RADIUS, alpha } from '@/styles/tokens'
import { useLocalStorage } from '@/hooks'
import type { Weapon } from '@/types/xiuzhen'

const MATERIALS = [
  { id: 'tiejing', name: '玄铁精', rarity: '蓝', effect: '增加基础攻击', count: 15 },
  { id: 'hanbing', name: '寒冰晶', rarity: '蓝', effect: '附加冰属性', count: 8 },
  { id: 'lihuo', name: '离火砂', rarity: '蓝', effect: '附加火属性', count: 10 },
  { id: 'xuanjing', name: '玄晶', rarity: '紫', effect: '提升品质', count: 5 },
  { id: 'longxue', name: '龙血石', rarity: '金', effect: '神器主材', count: 2 },
  { id: 'fengyu', name: '凤羽', rarity: '金', effect: '涅槃重生', count: 1 },
  { id: 'guicai', name: '鬼才木', rarity: '紫', effect: '灵魂绑定', count: 3 },
  { id: 'tianhe', name: '天河沙', rarity: '蓝', effect: '星光加持', count: 12 },
]

const FABAO_RECIPES = [
  {
    name: '青钢剑',
    grade: '凡器',
    materials: ['玄铁精'],
    effect: '基础攻击+10',
    rate: 95,
    color: COLORS.gray500,
  },
  {
    name: '寒冰盾',
    grade: '灵器',
    materials: ['玄铁精', '寒冰晶'],
    effect: '防御+50，冰抗+30%',
    rate: 80,
    color: COLORS.cyan,
  },
  {
    name: '离火扇',
    grade: '灵器',
    materials: ['玄铁精', '离火砂'],
    effect: '火攻+80，灼烧效果',
    rate: 80,
    color: COLORS.red,
  },
  {
    name: '玄晶甲',
    grade: '宝器',
    materials: ['玄铁精', '玄晶', '天河沙'],
    effect: '全属性+30，免伤15%',
    rate: 60,
    color: COLORS.purple,
  },
  {
    name: '龙血剑',
    grade: '灵器',
    materials: ['玄铁精', '龙血石'],
    effect: '攻击吸血，龙威震慑',
    rate: 45,
    color: COLORS.red,
  },
  {
    name: '涅槃凤羽钗',
    grade: '仙器',
    materials: ['龙血石', '凤羽', '玄晶'],
    effect: '死亡复活一次，全属性+100',
    rate: 25,
    color: COLORS.gold,
  },
]

const RARITY_COLOR: Record<string, string> = {
  '绿': COLORS.green,
  '蓝': COLORS.blue,
  '紫': COLORS.purple,
  '金': COLORS.gold,
  '红': COLORS.red,
}

export default function LianQiPage() {
  const [inventory, setInventory] = useLocalStorage('lianqi-materials', MATERIALS)
  const [fabaoList, setFabaoList] = useLocalStorage<Weapon[]>('fabao-list', [])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [isForging, setIsForging] = useState(false)
  const [result, setResult] = useState<{ success: boolean; name: string; msg: string } | null>(null)
  const [selectedFang, setSelectedFang] = useState<typeof FABAO_RECIPES[0] | null>(null)

  const toggleMaterial = (id: string) => {
    setSelectedMaterials(prev =>
      prev.includes(id)
        ? prev.filter(m => m !== id)
        : [...prev, id]
    )
  }

  const startForging = () => {
    if (selectedMaterials.length === 0) return

    setIsForging(true)
    setResult(null)

    selectedMaterials.forEach(mid => {
      setInventory(prev => prev.map(m =>
        m.id === mid ? { ...m, count: Math.max(0, m.count - 1) } : m
      ))
    })

    setTimeout(() => {
      setIsForging(false)

      const matchFang = FABAO_RECIPES.find(fang => {
        const fangIds = fang.materials.map(name =>
          inventory.find(m => m.name === name)?.id
        ).filter(Boolean) as string[]
        return fangIds.every(id => selectedMaterials.includes(id)) &&
               selectedMaterials.every(id => fangIds.includes(id))
      })

      if (matchFang) {
        const success = Math.random() * 100 < matchFang.rate
        setResult({
          success,
          name: matchFang.name,
          msg: success ? '锵锵作响，法宝已成！' : '锻造失败，材料化为铁水...'
        })
        if (success) {
          setFabaoList(prev => [...prev, { ...matchFang, time: Date.now() } as Weapon])
        }
      } else if (selectedMaterials.length >= 2) {
        setResult({
          success: false,
          name: '废铁',
          msg: '材料不兼容，炼出一堆废铁...'
        })
      } else {
        setResult({
          success: false,
          name: '残渣',
          msg: '材料不足，化为灰烬...'
        })
      }

      setSelectedMaterials([])
      localStorage.setItem('lianqi-data', JSON.stringify(inventory))
    }, 3500)
  }

  return (
    <SubPageTemplate
      title="炼器阁"
      subtitle="千錘百煉成神鋒，寶器出世動乾坤"
      colorRgb={COLORS.amberRgb}
    >
      <div className="grid-2" style={{ gap: SPACING['3xl'] }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 style={{
            fontSize: 20,
            color: COLORS.amber,
            marginBottom: SPACING.xl,
          }}>
            🔥 九鼎炼炉
          </h3>

          <AnimatePresence mode="wait">
            <motion.div
              animate={isForging ? {
                boxShadow: [
                  `0 0 30px ${alpha(COLORS.amber, 0.4)}`,
                  `0 0 80px ${alpha(COLORS.red, 0.6)}`,
                  `0 0 30px ${alpha(COLORS.amber, 0.4)}`,
                ]
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                padding: SPACING['3xl'],
                borderRadius: RADIUS.xl,
                background: `radial-gradient(circle at 50% 30%, ${alpha(isForging ? COLORS.red : COLORS.amber, 0.2)}, ${alpha(COLORS.bg.dark, 0.9)})`,
                border: `2px solid ${alpha(isForging ? COLORS.red : COLORS.amber, 0.3)}`,
                textAlign: 'center',
                marginBottom: SPACING.xl,
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <motion.div
                animate={isForging ? {
                  scale: [1, 1.1, 1],
                  rotate: [0, 2, -2, 0],
                } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{ fontSize: 64, marginBottom: SPACING.lg }}
              >
                ⚒️
              </motion.div>

              {isForging ? (
                <div>
                  <div style={{
                    color: COLORS.amber,
                    fontSize: 18,
                    fontWeight: 600,
                  }}>
                    🔥 锻造中...
                  </div>
                  <div style={{
                    color: COLORS.text.muted,
                    fontSize: 13,
                    marginTop: SPACING.sm,
                  }}>
                    千锤百炼，匠心独运
                  </div>
                </div>
              ) : result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div style={{
                    color: result.success ? COLORS.gold : COLORS.gray500,
                    fontSize: 20,
                    fontWeight: 700,
                  }}>
                    {result.success ? '✨' : '💨'} {result.name}
                  </div>
                  <div style={{
                    color: COLORS.text.secondary,
                    fontSize: 13,
                    marginTop: SPACING.sm,
                  }}>
                    {result.msg}
                  </div>
                </motion.div>
              ) : (
                <div style={{
                  color: COLORS.text.muted,
                  fontSize: 14,
                }}>
                  选择材料开始锻造
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startForging}
            disabled={isForging || selectedMaterials.length === 0}
            style={{
              width: '100%',
              padding: SPACING.xl,
              borderRadius: RADIUS.lg,
              background: isForging || selectedMaterials.length === 0
                ? COLORS.gray800
                : `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.red})`,
              border: 'none',
              color: isForging || selectedMaterials.length === 0
                ? COLORS.text.muted
                : 'white',
              fontWeight: 700,
              fontSize: 16,
              cursor: isForging || selectedMaterials.length === 0
                ? 'not-allowed'
                : 'pointer',
            }}
          >
            {selectedMaterials.length > 0
              ? `开始锻造 (已选 ${selectedMaterials.length} 种材料)`
              : '请选择锻造材料'}
          </motion.button>

          <h4 style={{
            fontSize: 16,
            color: COLORS.gold,
            margin: `${SPACING.xl} 0 ${SPACING.lg}`,
          }}>
            📦 炼器材料
          </h4>
          <div className="grid-2" style={{ gap: SPACING.md }}>
            {inventory.map(mat => (
              <motion.div
                key={mat.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => mat.count > 0 && toggleMaterial(mat.id)}
                style={{
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  background: selectedMaterials.includes(mat.id)
                    ? alpha(RARITY_COLOR[mat.rarity], 0.2)
                    : alpha(COLORS.bg.card, 1),
                  border: `1px solid ${selectedMaterials.includes(mat.id)
                    ? alpha(RARITY_COLOR[mat.rarity], 0.5)
                    : alpha(COLORS.gray600, 0.2)}`,
                  cursor: mat.count > 0 ? 'pointer' : 'not-allowed',
                  opacity: mat.count > 0 ? 1 : 0.4,
                }}
              >
                <div style={{
                  color: RARITY_COLOR[mat.rarity],
                  fontWeight: 600,
                  marginBottom: 4,
                }}>
                  {mat.name}
                </div>
                <div style={{ fontSize: 12, color: COLORS.text.muted }}>
                  {mat.effect}
                </div>
                <div style={{
                  fontSize: 12,
                  color: mat.count > 5 ? COLORS.green : COLORS.red,
                  marginTop: 4,
                }}>
                  剩余 {mat.count} 份
                </div>
              </motion.div>
            ))}
          </div>
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
            📜 炼器图谱
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.md,
            marginBottom: SPACING['3xl'],
          }}>
            {FABAO_RECIPES.map((fang, idx) => (
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
                  需要：{fang.materials.join(' + ')}
                </div>
              </motion.div>
            ))}
          </div>

          <h4 style={{
            fontSize: 16,
            color: COLORS.purple,
            marginBottom: SPACING.lg,
          }}>
            🛡️ 已炼法宝 ({fabaoList.length})
          </h4>
          <div style={{
            maxHeight: 300,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.sm,
          }}>
            {fabaoList.length === 0 ? (
              <div style={{
                padding: SPACING.xl,
                textAlign: 'center',
                color: COLORS.text.muted,
                fontSize: 13,
              }}>
                还没有法宝，快去炼器吧！
              </div>
            ) : (
              fabaoList.slice().reverse().map((fb: Weapon, idx: number) => (
                <div
                  key={idx}
                  style={{
                    padding: SPACING.md,
                    borderRadius: RADIUS.lg,
                    background: alpha(fb.color, 0.1),
                    border: `1px solid ${alpha(fb.color, 0.3)}`,
                  }}
                >
                  <span style={{ color: fb.color, fontWeight: 600 }}>
                    {fb.name}
                  </span>
                  <span style={{
                    marginLeft: SPACING.md,
                    fontSize: 12,
                    color: COLORS.text.muted,
                  }}>
                    {fb.effect}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </SubPageTemplate>
  )
}
