import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import { COLORS, SPACING, RADIUS, alpha } from '@/styles/tokens'
import { useLocalStorage } from '@/hooks'
import type { Pill, Weapon, Fulu, Item } from '@/types/xiuzhen'

const RARITY_CONFIG = {
  '凡品': { color: COLORS.gray500, bg: alpha(COLORS.gray500, 0.1) },
  '下品': { color: COLORS.green, bg: alpha(COLORS.green, 0.1) },
  '中品': { color: COLORS.blue, bg: alpha(COLORS.blue, 0.1) },
  '上品': { color: COLORS.purple, bg: alpha(COLORS.purple, 0.1) },
  '极品': { color: COLORS.gold, bg: alpha(COLORS.gold, 0.1) },
  '仙品': { color: COLORS.red, bg: alpha(COLORS.red, 0.1) },
}

export default function CangBaoPage() {
  const [activeTab, setActiveTab] = useState('yaocai')
  const [selectedItem, setSelectedItem] = useState<Pill | Weapon | Fulu | Item | null>(null)

  const [herbs] = useLocalStorage<Item[]>('liandan-inventory', [])
  const [fabaoList] = useLocalStorage<Weapon[]>('fabao-list', [])
  const [fuluInventory] = useLocalStorage<Fulu[]>('fulu-inventory', [])
  const [lianqiMaterials] = useLocalStorage<Item[]>('lianqi-materials', [])

  const tabs = [
    { id: 'yaocai', name: '灵药', icon: '🌿', count: herbs.reduce((a: number, b: Item) => a + b.count, 0) },
    { id: 'fabao', name: '法宝', icon: '⚔️', count: fabaoList.length },
    { id: 'fulu', name: '符箓', icon: '📜', count: fuluInventory.length },
    { id: 'cailiao', name: '炼器', icon: '💎', count: lianqiMaterials.reduce((a: number, b: Item) => a + b.count, 0) },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'yaocai':
        return (
          <div className="grid-4" style={{ gap: SPACING.md }}>
            {herbs.map((herb: Item, idx: number) => (
              <motion.div
                key={herb.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ scale: 1.03, y: -4 }}
                onClick={() => setSelectedItem(herb)}
                style={{
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  background: alpha(COLORS.bg.card, 1),
                  border: `1px solid ${alpha(COLORS.gray600, 0.2)}`,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: SPACING.sm }}>
                  🌿
                </div>
                <div style={{
                  color: COLORS.text.primary,
                  fontWeight: 600,
                  fontSize: 13,
                  marginBottom: 4,
                }}>
                  {herb.name}
                </div>
                <div style={{
                  fontSize: 12,
                  color: COLORS.text.muted,
                  marginBottom: SPACING.sm,
                }}>
                  {herb.effect && typeof herb.effect === 'object' 
                    ? Object.entries(herb.effect).map(([k, v]) => `${k}+${v}`).join(' ') 
                    : herb.effect || '珍稀药材'}
                </div>
                <div style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: herb.count > 5 ? COLORS.green : COLORS.amber,
                }}>
                  ×{herb.count}
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'fabao':
        return (
          <div className="grid-3" style={{ gap: SPACING.lg }}>
            {fabaoList.slice().reverse().map((fb: Weapon, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y:  0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{
                  padding: SPACING.xl,
                  borderRadius: RADIUS.lg,
                  background: `linear-gradient(135deg, ${alpha(fb.color, 0.15)}, ${alpha(COLORS.bg.card, 1)})`,
                  border: `1px solid ${alpha(fb.color, 0.3)}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 40, marginBottom: SPACING.md }}>
                  ⚔️
                </div>
                <div style={{
                  color: fb.color,
                  fontWeight: 700,
                  fontSize: 16,
                  marginBottom: SPACING.sm,
                }}>
                  {fb.name}
                </div>
                <div style={{
                  fontSize: 12,
                  color: COLORS.text.secondary,
                  marginBottom: SPACING.sm,
                }}>
                  {fb.effect}
                </div>
                <span style={{
                  padding: `${SPACING.sm} ${SPACING.md}`,
                  borderRadius: RADIUS.full,
                  background: alpha(fb.color, 0.15),
                  color: fb.color,
                  fontSize: 11,
                }}>
                  {fb.grade}
                </span>
              </motion.div>
            ))}
          </div>
        )

      case 'fulu':
        return (
          <div className="grid-4" style={{ gap: SPACING.md }}>
            {fuluInventory.slice().reverse().map((fulu: Fulu, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, rotate: -5 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: idx * 0.04 }}
                whileHover={{ scale: 1.05, rotate: 5 }}
                style={{
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  background: `linear-gradient(180deg, ${alpha(fulu.color, 0.2)}, ${alpha(COLORS.bg.card, 1)})`,
                  border: `1px solid ${alpha(fulu.color, 0.3)}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 36, marginBottom: SPACING.sm }}>
                  📜
                </div>
                <div style={{
                  color: fulu.color,
                  fontWeight: 600,
                  fontSize: 14,
                  marginBottom: 4,
                }}>
                  {fulu.name}
                </div>
                <div style={{
                  fontSize: 12,
                  color: COLORS.gold,
                }}>
                  {fulu.quality}
                </div>
                <div style={{
                  fontSize: 11,
                  color: COLORS.text.muted,
                  marginTop: SPACING.sm,
                }}>
                  威力 {fulu.power}
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'cailiao':
        return (
          <div className="grid-4" style={{ gap: SPACING.md }}>
            {lianqiMaterials.map((mat: Item, idx: number) => (
              <motion.div
                key={mat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{
                  padding: SPACING.lg,
                  borderRadius: RADIUS.lg,
                  background: alpha(COLORS.bg.card, 1),
                  border: `1px solid ${alpha(COLORS.gray600, 0.2)}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: SPACING.sm }}>
                  💎
                </div>
                <div style={{
                  color: COLORS.text.primary,
                  fontWeight: 600,
                  fontSize: 13,
                  marginBottom: 4,
                }}>
                  {mat.name}
                </div>
                <div style={{
                  fontSize: 12,
                  color: COLORS.text.muted,
                  marginBottom: SPACING.sm,
                }}>
                  {mat.effect && typeof mat.effect === 'object' 
                    ? Object.entries(mat.effect).map(([k, v]) => `${k}+${v}`).join(' ') 
                    : mat.effect || '炼器材料'}
                </div>
                <div style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: mat.count > 5 ? COLORS.green : COLORS.amber,
                }}>
                  ×{mat.count}
                </div>
              </motion.div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  const totalItems = tabs.reduce((a, b) => a + b.count, 0)

  return (
    <SubPageTemplate
      title="藏宝阁"
      subtitle="納須彌於芥子，藏萬物於一袋"
      colorRgb={COLORS.amberRgb}
    >
      <div style={{
        display: 'flex',
        gap: SPACING.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING['3xl'],
      }}>
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: `${SPACING.md} ${SPACING.xl}`,
              borderRadius: RADIUS.lg,
              background: activeTab === tab.id
                ? `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.gold})`
                : alpha(COLORS.bg.card, 1),
              border: `1px solid ${activeTab === tab.id
                ? alpha(COLORS.amber, 0.5)
                : alpha(COLORS.gray600, 0.2)}`,
              color: activeTab === tab.id ? 'white' : COLORS.text.secondary,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: activeTab === tab.id ? 600 : 400,
            }}
          >
            {tab.icon} {tab.name} ({tab.count})
          </motion.button>
        ))}

        <div style={{
          marginLeft: 'auto',
          padding: `${SPACING.md} ${SPACING.xl}`,
          borderRadius: RADIUS.lg,
          background: alpha(COLORS.bg.glass, 1),
          border: `1px solid ${alpha(COLORS.amber, 0.2)}`,
          color: COLORS.gold,
          fontWeight: 700,
        }}>
          🎒 共 {totalItems} 件
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent() || (
            <div style={{
              padding: SPACING['4xl'],
              textAlign: 'center',
              color: COLORS.text.muted,
            }}>
              <div style={{ fontSize: 48, marginBottom: SPACING.lg }}>
                📦
              </div>
              <div>储物袋空空如也...</div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: SPACING['4xl'],
          padding: SPACING.xl,
          borderRadius: RADIUS.lg,
          background: alpha(COLORS.bg.glass, 1),
          border: `1px solid ${alpha(COLORS.amber, 0.15)}`,
          textAlign: 'center',
        }}
      >
        <div style={{
          color: alpha(COLORS.amber, 0.8),
          fontSize: 14,
          lineHeight: 2,
        }}>
          「须弥芥子纳乾坤，万里江山一掌存。」
          <br />
          「一粒粟中藏世界，半升铛内煮山川。」
        </div>
      </motion.div>
    </SubPageTemplate>
  )
}
