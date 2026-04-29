import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import { COLORS, SPACING, RADIUS, alpha } from '@/styles/tokens'
import { useToggle, useMount } from '@/hooks'

const LINGGEN = [
  { name: '天灵根', attr: '单属性', quality: '绝世天资', color: COLORS.gold, rate: 0.01, bonus: 300 },
  { name: '地灵根', attr: '双属性', quality: '天之骄子', color: COLORS.purple, rate: 0.05, bonus: 200 },
  { name: '异灵根', attr: '变异属性', quality: '妖孽之资', color: COLORS.red, rate: 0.03, bonus: 250 },
  { name: '真灵根', attr: '三属性', quality: '修仙奇才', color: COLORS.blue, rate: 0.15, bonus: 150 },
  { name: '凡灵根', attr: '四属性', quality: '平庸之资', color: COLORS.green, rate: 0.3, bonus: 100 },
  { name: '伪灵根', attr: '五属性', quality: '艰难前行', color: COLORS.gray500, rate: 0.46, bonus: 50 },
]

const WUXING = ['金', '木', '水', '火', '土']

const JINGJIE_DETAIL = [
  {
    realm: '炼气期',
    years: '1-3层 → 4-6层 → 7-9层',
    feature: '吐纳灵气，强身健体，延年益寿',
    shouyuan: '+50年',
  },
  {
    realm: '筑基期',
    years: '初期 → 中期 → 后期 → 圆满',
    feature: '筑就道基，真气液化，御气飞行',
    shouyuan: '+150年',
  },
  {
    realm: '金丹期',
    years: '虚丹 → 实丹 → 金丹',
    feature: '金丹内蕴，大道初成，三花聚顶',
    shouyuan: '+500年',
  },
  {
    realm: '元婴期',
    years: '元婴 → 出窍 → 化婴',
    feature: '元婴出窍，神游太虚',
    shouyuan: '+1000年',
  },
  {
    realm: '化神期',
    years: '化身 → 炼神 → 合体',
    feature: '法相天地，元神不灭',
    shouyuan: '+3000年',
  },
  {
    realm: '渡劫期',
    years: '散仙 → 地仙 → 金仙',
    feature: '渡九天雷劫，成就仙道',
    shouyuan: '永生',
  },
]

export default function DaoLuPage() {
  const [testResult, setTestResult] = useState<typeof LINGGEN[0] | null>(null)
  const [wuxing, setWuxing] = useState<string[]>([])
  const [isTesting, { toggle: toggleTesting }] = useToggle(false)
  const [showResult, { toggle: toggleShowResult }] = useToggle(false)

  const testLinggen = () => {
    toggleTesting()
    setTestResult(null)
    setWuxing([])
    
    setTimeout(() => {
      const rand = Math.random()
      let cumRate = 0
      let result = LINGGEN[5]
      
      for (const lg of LINGGEN) {
        cumRate += lg.rate
        if (rand < cumRate) {
          result = lg
          break
        }
      }
      
      const attrCount = result.attr.includes('单') ? 1 : result.attr.includes('双') ? 2 :
                       result.attr.includes('三') ? 3 : result.attr.includes('四') ? 4 : 5
      const selectedWuxing = WUXING.sort(() => Math.random() - 0.5).slice(0, attrCount)
      
      setTestResult(result)
      setWuxing(selectedWuxing)
      toggleTesting()
      toggleShowResult()
    }, 2000)
  }

  useMount(() => {
    const saved = localStorage.getItem('linggen-data')
    if (saved) {
      const data = JSON.parse(saved)
      setTestResult(LINGGEN.find(l => l.name === data.name) ?? null)
      setWuxing(data.wuxing || [])
      toggleShowResult()
    }
  })

  return (
    <SubPageTemplate
      title="大道指引"
      subtitle="靈根檢測，境界詳解，入門指南"
      colorRgb={COLORS.purpleRgb}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          padding: SPACING['3xl'],
          borderRadius: RADIUS.xl,
          background: `linear-gradient(135deg, ${alpha(COLORS.purple, 0.12)}, ${alpha(COLORS.gold, 0.06)})`,
          border: `1px solid ${alpha(COLORS.gold, 0.18)}`,
          textAlign: 'center',
          marginBottom: SPACING['4xl'],
        }}
      >
        <h3 style={{
          fontSize: 24,
          marginBottom: SPACING.lg,
          color: COLORS.gold,
        }}>
          ✨ 灵根检测法阵
        </h3>

        {!showResult && !isTesting && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={testLinggen}
            style={{
              padding: `${SPACING.lg} ${SPACING['3xl']}`,
              fontSize: 18,
              fontWeight: 600,
              borderRadius: RADIUS.lg,
              background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.gold})`,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              boxShadow: `0 8px 32px ${alpha(COLORS.purple, 0.3)}`,
            }}
          >
            ⚡ 激活检测灵根
          </motion.button>
        )}

        {isTesting && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{
              width: 80,
              height: 80,
              margin: '0 auto',
              borderRadius: '50%',
              background: `conic-gradient(from 0deg, ${COLORS.gold}, ${COLORS.purple}, ${COLORS.cyan}, ${COLORS.gold})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(139, 105, 20, 0.2)',
            }} />
          </motion.div>
        )}

        {showResult && testResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div style={{
              fontSize: 32,
              fontWeight: 800,
              color: testResult.color,
              marginBottom: SPACING.md,
            }}>
              {testResult.name}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: SPACING.md,
              marginBottom: SPACING.lg,
            }}>
              {wuxing.map(w => (
                <span key={w} style={{
                  padding: `${SPACING.sm} ${SPACING.md}`,
                  borderRadius: RADIUS.md,
                  background: alpha(COLORS.gray800, 0.5),
                  border: `1px solid ${testResult.color}`,
                  color: testResult.color,
                  fontWeight: 600,
                }}>
                  {w}属性
                </span>
              ))}
            </div>
            <div style={{ color: COLORS.text.secondary, marginBottom: SPACING.lg }}>
              <span style={{ color: testResult.color }}>{testResult.quality}</span>
              · 修炼速度加成 <span style={{ color: COLORS.gold }}>+{testResult.bonus}%</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setTestResult(null)
                setWuxing([])
                toggleShowResult()
                localStorage.removeItem('linggen-data')
              }}
              style={{
                padding: `${SPACING.sm} ${SPACING.xl}`,
                borderRadius: RADIUS.md,
                background: alpha(COLORS.gray700, 0.5),
                border: `1px solid ${alpha(COLORS.gray500, 0.3)}`,
                color: COLORS.text.secondary,
                cursor: 'pointer',
              }}
            >
              重新检测
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      <h3 style={{
        fontSize: 22,
        marginBottom: SPACING.xl,
        color: COLORS.gold,
        textAlign: 'center',
      }}>
        📜 境界详解
      </h3>

      <div className="grid-2">
        {JINGJIE_DETAIL.map((detail, idx) => (
          <motion.div
            key={detail.realm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            style={{
              padding: SPACING.xl,
              borderRadius: RADIUS.lg,
              background: alpha(COLORS.bg.card, 1),
              border: `1px solid ${alpha(COLORS.purple, 0.15)}`,
            }}
          >
            <div style={{
              fontSize: 20,
              fontWeight: 700,
              color: COLORS.purple,
              marginBottom: SPACING.md,
            }}>
              {detail.realm}
            </div>
            <div style={{
              color: COLORS.gold,
              fontSize: 13,
              marginBottom: SPACING.sm,
            }}>
              阶段划分：{detail.years}
            </div>
            <div style={{
              color: COLORS.text.secondary,
              marginBottom: SPACING.md,
              fontSize: 14,
            }}>
              {detail.feature}
            </div>
            <div style={{
              display: 'inline-block',
              padding: `${SPACING.xs} ${SPACING.md}`,
              borderRadius: RADIUS.md,
              background: alpha(COLORS.green, 0.15),
              border: `1px solid ${alpha(COLORS.green, 0.3)}`,
              color: COLORS.green,
              fontSize: 12,
            }}>
              🕐 寿元：{detail.shouyuan}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: SPACING['4xl'],
          padding: SPACING.xl,
          borderRadius: RADIUS.lg,
          background: alpha(COLORS.bg.glass, 1),
          border: `1px solid ${alpha(COLORS.gold, 0.15)}`,
        }}
      >
        <h4 style={{
          fontSize: 18,
          color: COLORS.gold,
          marginBottom: SPACING.lg,
        }}>
          📖 修真入门须知
        </h4>
        <div style={{
          columns: 2,
          columnGap: SPACING.xl,
          color: COLORS.text.secondary,
          lineHeight: 1.8,
          fontSize: 14,
        }}>
          <p>❶ <span style={{ color: COLORS.text.primary }}>清心寡欲</span> —— 修炼之道，首重心性，心不静则道不存</p>
          <p>❷ <span style={{ color: COLORS.text.primary }}>循序渐进</span> —— 欲速则不达，筑基最为关键</p>
          <p>❸ <span style={{ color: COLORS.text.primary }}>广结善缘</span> —— 独行虽快，众行方远</p>
          <p>❹ <span style={{ color: COLORS.text.primary }}>谨防身陨</span> —— 修真无岁月，步步杀机藏</p>
          <p>❺ <span style={{ color: COLORS.text.primary }}>道心坚定</span> —— 大道万千，我自独行</p>
          <p>❻ <span style={{ color: COLORS.text.primary }}>顺应天时</span> —— 把握机缘，该争则争</p>
        </div>
      </motion.div>
    </SubPageTemplate>
  )
}
