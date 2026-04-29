'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCultivationStore } from '@/shared/stores/cultivation'
import { PageLayout, ParchmentCard } from '@/components/layout/PageLayout'
import Link from 'next/link'

interface LinggenResult {
  grade: string
  wuxing: string[]
  quality: string
  bonus: number
  color: string
  abilities: string[]
  bottlenecks: string[]
  detail: string
}

const LINGGEN_DATA: LinggenResult[] = [
  { grade: '天灵根', wuxing: ['金'], quality: '万古奇才', bonus: 200, color: '#d97706', abilities: ['金系功法修炼速度+200%', '庚金剑气自动领悟', '万邪不侵'], bottlenecks: ['渡劫难度增加50%', '五行不全易入魔道'], detail: '万年无一的天灵根！金系灵气亲和度满值，修炼速度一日千里，是传说中的修仙奇才。' },
  { grade: '天灵根', wuxing: ['木'], quality: '万古奇才', bonus: 200, color: '#16a34a', abilities: ['木系功法修炼速度+200%', '万物亲和自动回血', '炼丹天赋满点'], bottlenecks: ['渡劫难度增加50%', '心地太善良易被骗'], detail: '万年无一的天灵根！木系灵气亲和度满值，修炼速度一日千里，是传说中的修仙奇才。' },
  { grade: '天灵根', wuxing: ['水'], quality: '万古奇才', bonus: 200, color: '#2563eb', abilities: ['水系功法修炼速度+200%', '先天道体万法皆通', '阵法天赋异禀'], bottlenecks: ['渡劫难度增加50%', '性格太温和易被欺负'], detail: '万年无一的天灵根！水系灵气亲和度满值，修炼速度一日千里，是传说中的修仙奇才。' },
  { grade: '天灵根', wuxing: ['火'], quality: '万古奇才', bonus: 200, color: '#dc2626', abilities: ['火系功法修炼速度+200%', '丹火纯度天级', '炼器宗师'], bottlenecks: ['渡劫难度增加50%', '脾气暴躁易走火'], detail: '万年无一的天灵根！火系灵气亲和度满值，修炼速度一日千里，是传说中的修仙奇才。' },
  { grade: '天灵根', wuxing: ['土'], quality: '万古奇才', bonus: 200, color: '#92400e', abilities: ['土系功法修炼速度+200%', '防御超凡不死金身', '气运加身'], bottlenecks: ['渡劫难度增加50%', '修炼进度偏慢'], detail: '万年无一的天灵根！土系灵气亲和度满值，修炼速度一日千里，是传说中的修仙奇才。' },
  { grade: '天才', wuxing: ['金', '水'], quality: '千载难逢', bonus: 150, color: '#0891b2', abilities: ['双修功法修炼+150%', '金生水旺法器增幅', '剑气+控水双精通'], bottlenecks: ['双修需平衡，偏科即废'], detail: '千载难逢的双属性灵根！金生水，五行相生，修炼速度远超常人，宗门重点培养对象。' },
  { grade: '天才', wuxing: ['木', '火'], quality: '千载难逢', bonus: 150, color: '#ea580c', abilities: ['双修功法修炼+150%', '木火通明炼丹神手', '控火+催生双精通'], bottlenecks: ['双修需平衡，偏科即废'], detail: '千载难逢的双属性灵根！木生火，五行相生，修炼速度远超常人，宗门重点培养对象。' },
  { grade: '优秀', wuxing: ['金', '木', '水'], quality: '百里挑一', bonus: 100, color: '#7c3aed', abilities: ['三系均衡发展', '博学多才悟道快', '功法兼容性强'], bottlenecks: ['样样通样样松', '难达顶峰'], detail: '百里挑一的三属性灵根！虽然不如天灵根纯净，但胜在均衡发展，未来可期。' },
  { grade: '普通', wuxing: ['金', '木', '水', '火'], quality: '修行中人', bonus: 50, color: '#78716c', abilities: ['四平八稳', '无功无过', '勤能补拙'], bottlenecks: ['突破成功率低', '需要更多资源'], detail: '普通资质，但胜在人定胜天。古往今来，四属性灵根飞升成仙者也不在少数。' },
  { grade: '废柴', wuxing: ['金', '木', '水', '火', '土'], quality: '混沌道体', bonus: 20, color: '#db2777', abilities: ['大器晚成', '越后期越强', '人人都看不起你'], bottlenecks: ['前期修炼极慢', '所有人都看不起你', '需要海量资源'], detail: '传说中的混沌道体！看似废柴五灵根，实则是传说中百万年无一的混沌体质，前期比蜗牛还慢，一旦突破就是同阶无敌！主角模板预定！' },
]

export default function UserProfilePage() {
  const { user, isLoggedIn, login, addCultivation, achievements, setLinggen } = useCultivationStore()
  const [showLinggenTest, setShowLinggenTest] = useState(false)
  const [testResult, setTestResult] = useState<LinggenResult | null>(null)

  const progress = useMemo(() => {
    const level = user?.level || 1
    const cultivation = user?.cultivation || 0
    const nextLevel = level * 1000
    return Math.min((cultivation / nextLevel) * 100, 100)
  }, [user])

  const handleNicknameSave = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const nickname = (form.elements.namedItem('nickname') as HTMLInputElement).value
    if (nickname) {
      login({ nickname })
    }
  }

  const runLinggenTest = () => {
    const rand = Math.random()
    let result: LinggenResult
    
    if (rand < 0.01) {
      result = LINGGEN_DATA[Math.floor(Math.random() * 5)]
    } else if (rand < 0.05) {
      result = LINGGEN_DATA[5 + Math.floor(Math.random() * 2)]
    } else if (rand < 0.15) {
      result = LINGGEN_DATA[7]
    } else if (rand < 0.5) {
      result = LINGGEN_DATA[8]
    } else {
      result = LINGGEN_DATA[9]
    }
    
    setTestResult(result)
    setLinggen(result.grade)
    addCultivation(result.bonus * 10)
  }

  if (!isLoggedIn || !user) {
    return (
      <PageLayout title="开启你的修行之路" showBack={true} backTo="/overview">
        <div className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="text-6xl mb-6">🧘</div>
            <h2 className="text-2xl font-bold mb-3 text-amber-100">输入道号，检测灵根</h2>
            <p className="text-amber-200/60 mb-8">开启你的修仙之路</p>

            <form onSubmit={handleNicknameSave} className="space-y-4">
              <input
                name="nickname"
                type="text"
                placeholder="输入你的道号..."
                className="w-full px-5 py-4 rounded-xl bg-stone-800/50 border border-amber-600/20 focus:border-amber-500 outline-none text-lg"
                defaultValue="无名修士"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 font-bold text-lg shadow-lg shadow-amber-600/20"
              >
                进入灵墟
              </motion.button>
            </form>
          </motion.div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout title="修行档案" showBack={true} backTo="/overview">
      {/* 头部信息 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start gap-6">
          <div className="text-6xl">🧙</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 className="text-2xl font-bold text-amber-100">{user.nickname}</h2>
              {user.vip && (
                <span className="px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded text-sm font-bold text-black">
                  VIP
                </span>
              )}
            </div>

            <div className="text-amber-200/60 mb-4">
              练气 {user.level} 层 · 累计修为 {user.cultivation || 0}
            </div>

            {/* 修为进度条 */}
            <div className="mb-4 max-w-md">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-amber-200/60">修为进度</span>
                <span className="text-amber-400 font-bold">{progress.toFixed(1)}%</span>
              </div>
              <div className="h-4 bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-amber-800 via-amber-600 to-amber-500"
                  style={{ transition: 'width 1s ease-out' }}
                />
              </div>
              <div className="text-xs text-amber-200/50 mt-1">
                下一层需要: {(user.level || 1) * 1000} 修为
              </div>
            </div>

            {/* 灵根显示 */}
            <div className="flex items-center gap-3 flex-wrap">
              {user.linggen ? (
                <>
                  <span className="text-amber-200/60">灵根资质:</span>
                  <span className="px-3 py-1.5 rounded-lg font-bold"
                    style={{ background: `${testResult?.color || '#d97706'}30`, color: testResult?.color || '#d97706', border: `1px solid ${testResult?.color || '#d97706'}50` }}>
                    {user.linggen}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLinggenTest(true)}
                    className="px-3 py-1.5 rounded-lg text-sm border border-amber-600/30 text-amber-300 hover:bg-amber-600/20"
                  >
                    重测
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLinggenTest(true)}
                  className="px-5 py-2.5 rounded-lg bg-amber-600/30 text-amber-300 border border-amber-500/30 font-bold"
                >
                  🔮 检测灵根
                </motion.button>
              )}
            </div>
          </div>

          <Link href="/vip">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold shadow-lg shadow-amber-500/20"
            >
              开通VIP
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* 功能卡片 */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* 每日签到 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <ParchmentCard className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              📅 每日签到
            </h3>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addCultivation(100)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-green-700 to-green-600 font-bold text-lg shadow-lg"
            >
              签到领取 +100 修为
            </motion.button>
          </ParchmentCard>
        </motion.div>

        {/* 灵根重测 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <ParchmentCard className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              ✨ 灵根重测
            </h3>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowLinggenTest(true)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 font-bold text-lg shadow-lg shadow-amber-600/20"
            >
              重新检测灵根
            </motion.button>
          </ParchmentCard>
        </motion.div>

        {/* 成就系统 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="md:col-span-2"
        >
          <ParchmentCard className="p-6">
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2 text-amber-100">
              🏆 成就系统
              <span className="text-sm text-amber-200/60 font-normal">({achievements.length}/12)</span>
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { id: 'first_cultivation', name: '初入仙门', icon: '🌱' },
                { id: 'break_1', name: '突破一层', icon: '⬆️' },
                { id: 'linggen_tested', name: '灵根觉醒', icon: '✨' },
                { id: 'vip_member', name: 'VIP会员', icon: '👑' },
                { id: 'collect_100', name: '百日筑基', icon: '📅' },
                { id: 'dujie_success', name: '渡劫成功', icon: '⚡' },
              ].map(ach => (
                <div key={ach.id}
                  className={`p-4 rounded-xl text-center transition-all ${
                    achievements.includes(ach.id)
                      ? 'bg-amber-600/20 border border-amber-500/40 shadow-lg shadow-amber-500/10'
                      : 'bg-stone-800/50 border border-stone-700/50 opacity-50'
                  }`}>
                  <div className="text-3xl mb-2">{ach.icon}</div>
                  <div className="text-sm font-medium">{ach.name}</div>
                </div>
              ))}
            </div>
          </ParchmentCard>
        </motion.div>
      </div>

      {/* 灵根检测弹窗 */}
      <AnimatePresence>
        {showLinggenTest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={() => !testResult && setShowLinggenTest(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-stone-900 rounded-2xl w-full max-w-lg overflow-hidden border border-amber-600/30 shadow-2xl"
            >
              {!testResult ? (
                <div className="p-8 text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-7xl mb-6"
                  >
                    🔮
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-amber-100">灵根检测中...</h3>
                  <p className="text-amber-200/60 mb-8">先天五行，灵气引动，检测你的灵根资质</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={runLinggenTest}
                    className="px-10 py-4 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 font-bold text-lg shadow-lg shadow-amber-600/30"
                  >
                    开始检测
                  </motion.button>
                </div>
              ) : (
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">🎉</div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                      className="inline-block px-6 py-2 rounded-full text-xl font-bold mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${testResult.color}40, ${testResult.color}20)`,
                        color: testResult.color,
                        border: `2px solid ${testResult.color}`,
                      }}
                    >
                      {testResult.quality}
                    </motion.div>
                    <h3 className="text-2xl font-bold" style={{ color: testResult.color }}>
                      {testResult.grade}
                    </h3>
                  </div>

                  <div className="flex justify-center gap-2 mb-6 flex-wrap">
                    {testResult.wuxing.map((w: string, i: number) => (
                      <span key={i}
                        className="px-4 py-1.5 rounded-lg font-bold"
                        style={{ background: `${testResult.color}30`, color: testResult.color }}>
                        {w}属性
                      </span>
                    ))}
                  </div>

                  <div style={{ color: testResult.color }} className="text-center mb-6 text-lg">
                    修炼速度加成 <span className="font-bold text-2xl">+{testResult.bonus}%</span>
                  </div>

                  <p className="text-amber-100/80 text-center mb-8 leading-relaxed">
                    {testResult.detail}
                  </p>

                  <div className="flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowLinggenTest(false)}
                      className="px-10 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold text-lg shadow-lg shadow-amber-500/30"
                    >
                      确定
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  )
}
