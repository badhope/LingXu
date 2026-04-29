'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SystemInfoBar, CultivationStatusBar } from '@/components/performance'
import { usePerformance, PerformanceGate } from '@/hooks/usePerformance'
import { useCultivationStore } from '@/shared/stores/cultivation'
import { ParchmentCard } from '@/components/layout/PageLayout'
import Link from 'next/link'

const ALL_SYSTEMS = [
  {
    id: 'performance',
    name: '性能检测系统',
    icon: '⚡',
    description: '自动检测设备性能，智能降级渲染',
    color: '#d97706',
    features: ['设备性能分级', '粒子数量自适应', '3D效果自动开关', 'FPS实时监控'],
  },
  {
    id: 'cultivation',
    name: '修行系统',
    icon: '🧘',
    description: '等级、修为、灵根检测、成就',
    color: '#92400e',
    features: ['练气等级', '修为进度', '灵根检测', '每日签到'],
  },
  {
    id: 'vip',
    name: 'VIP会员系统',
    icon: '👑',
    description: '会员特权、付费墙、多端支付',
    color: '#b45309',
    features: ['月/季/年卡', '修行Buff加成', '高级功能解锁', '专属视觉特效'],
    link: '/vip',
  },
  {
    id: 'aura',
    name: '灵气潮汐',
    icon: '🌊',
    description: '十二时辰灵气波动、随机修炼事件',
    color: '#1d4ed8',
    features: ['时辰灵气计算', '子/午时双倍', '走火入魔事件', '顿悟奇遇'],
  },
  {
    id: 'lunhui',
    name: '六道轮回',
    icon: '🎲',
    description: '转生转盘、14种隐藏路线、奇葩结局',
    color: '#be185d',
    features: ['六道转世', '14种隐藏路线', '30%奇葩概率', '业力系统'],
  },
  {
    id: 'karma',
    name: '因果蝴蝶',
    icon: '🦋',
    description: '善恶选择、连锁反应、人生总结',
    color: '#0891b2',
    features: ['7级业力评语', '蝴蝶效应连锁', '涟漪粒子特效'],
  },
  {
    id: 'bazi',
    name: '八字排盘',
    icon: '📅',
    description: '专业八字分析、五行缺补、格局判定',
    color: '#ea580c',
    features: ['四柱八字', '五行分布', '格局判定', '日主强弱'],
  },
  {
    id: 'bagua',
    name: '六爻占卜',
    icon: '☯️',
    description: '铜钱起卦、变卦解析、吉凶建议',
    color: '#7c3aed',
    features: ['铜钱起卦', '本卦变卦', '卦辞解读', '实用建议'],
  },
  {
    id: 'fulu',
    name: '符箓系统',
    icon: '📜',
    description: '五大符箓、朱砂笔画动画、加持效果',
    color: '#dc2626',
    features: ['平安符', '招财符', '健康符', '姻缘符', '事业符'],
  },
  {
    id: 'linggen',
    name: '灵根检测',
    icon: '✨',
    description: '天灵根、混沌道体、天赋判定',
    color: '#0d9488',
    features: ['五档灵根', '天赋能力', '瓶颈提示', '修炼加成'],
    link: '/user',
  },
  {
    id: 'fengshui',
    name: '风水罗盘',
    icon: '🧭',
    description: '二十四山、吉凶方位、阳宅布局',
    color: '#65a30d',
    features: ['在线罗盘', '方位解读', '吉凶判断', '阳宅风水'],
  },
  {
    id: 'longmai',
    name: '中华龙脉',
    icon: '🐉',
    description: '三大干龙、名山大川、灵气分布',
    color: '#ca8a04',
    features: ['龙脉地图', '三大干龙', '灵气分布图', '名山介绍'],
  },
]

export default function SystemOverviewPage() {
  const perf = usePerformance()
  const { login, user } = useCultivationStore()
  const [showDevPanel, setShowDevPanel] = useState(false)

  useEffect(() => {
    if (!user) {
      login({ nickname: '演示用户', level: 5, cultivation: 3650 })
    }
  }, [user, login])

  return (
    <div className="min-h-screen py-8 px-4 relative z-10">
      {/* 开发调试面板 */}
      {showDevPanel && <SystemInfoBar />}
      <CultivationStatusBar />

      {/* 右上角调试开关 */}
      <button
        onClick={() => setShowDevPanel(!showDevPanel)}
        className="fixed top-24 left-4 z-40 px-4 py-2.5 rounded-xl bg-stone-900/80 backdrop-blur-sm text-sm border border-amber-600/20 hover:border-amber-500/50 transition-all shadow-lg"
      >
        {showDevPanel ? '🙈 隐藏' : '🔧 调试'} 面板
      </button>

      <div className="max-w-6xl mx-auto">
        {/* 头部带返回按钮 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800/50 border border-amber-600/20 hover:border-amber-500/40 hover:bg-amber-600/10 transition-all group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>返回首页</span>
            </motion.button>
          </Link>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              灵墟 · 全部系统总览
            </h1>
            <p className="text-amber-200/60 mt-1">
              12大核心系统 · 全端支持H5 + 微信小程序
            </p>
          </div>
        </motion.div>

        {/* 性能状态 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <ParchmentCard className="p-6">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-amber-100">
              📊 当前设备性能状态
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: '性能等级', value: perf.level.toUpperCase(), color: perf.level === 'low' ? 'text-red-400' : perf.level === 'medium' ? 'text-yellow-400' : 'text-green-400' },
                { label: '粒子上限', value: `${perf.particleLimit}`, color: 'text-blue-400' },
                { label: '3D加速', value: perf.enable3D ? '已启用' : '已禁用', color: perf.enable3D ? 'text-green-400' : 'text-stone-400' },
                { label: '设备类型', value: perf.isMobile ? '移动端' : '桌面端', color: 'text-purple-400' },
              ].map((item, i) => (
                <div key={i} className="bg-stone-800/50 rounded-xl p-4 text-center border border-amber-600/10">
                  <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-sm text-amber-200/50">{item.label}</div>
                </div>
              ))}
            </div>
          </ParchmentCard>
        </motion.div>

        {/* 全部功能卡片 */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {ALL_SYSTEMS.map((system, i) => (
            <PerformanceGate key={system.id} minLevel="low">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.02 * i }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Link href={system.link || '#'}>
                  <ParchmentCard className="p-5 h-full group hover:border-amber-500/40 transition-all cursor-pointer">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                      {system.icon}
                    </div>
                    <h3 className="font-bold mb-1" style={{ color: system.color }}>
                      {system.name}
                    </h3>
                    <p className="text-sm text-amber-200/60 mb-3">
                      {system.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {system.features.map((f, j) => (
                        <span key={j} className="px-2 py-0.5 rounded text-xs bg-stone-800/50 text-amber-200/70">
                          {f}
                        </span>
                      ))}
                    </div>
                  </ParchmentCard>
                </Link>
              </motion.div>
            </PerformanceGate>
          ))}
        </div>

        {/* 快速入口 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <ParchmentCard className="p-6">
            <h2 className="text-xl font-bold mb-5 text-amber-100">🚀 快速体验</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/zhou">
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(124, 58, 237, 0.2)' }}
                  className="bg-stone-800/50 rounded-xl p-5 text-center cursor-pointer border border-transparent hover:border-purple-500/30 transition-all"
                >
                  <div className="text-3xl mb-2">⏳</div>
                  <div className="font-bold text-amber-100">宙部总览</div>
                  <div className="text-xs text-amber-200/50">7大特效系统</div>
                </motion.div>
              </Link>

              <Link href="/user">
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(37, 99, 235, 0.2)' }}
                  className="bg-stone-800/50 rounded-xl p-5 text-center cursor-pointer border border-transparent hover:border-blue-500/30 transition-all"
                >
                  <div className="text-3xl mb-2">🧙</div>
                  <div className="font-bold text-amber-100">用户中心</div>
                  <div className="text-xs text-amber-200/50">灵根检测+修行</div>
                </motion.div>
              </Link>

              <Link href="/vip">
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(217, 119, 6, 0.2)' }}
                  className="bg-stone-800/50 rounded-xl p-5 text-center cursor-pointer border border-transparent hover:border-amber-500/30 transition-all"
                >
                  <div className="text-3xl mb-2">👑</div>
                  <div className="font-bold text-amber-100">VIP会员</div>
                  <div className="text-xs text-amber-200/50">商业化演示</div>
                </motion.div>
              </Link>

              <Link href="/tools/bagua">
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(22, 163, 74, 0.2)' }}
                  className="bg-stone-800/50 rounded-xl p-5 text-center cursor-pointer border border-transparent hover:border-green-500/30 transition-all"
                >
                  <div className="text-3xl mb-2">☯️</div>
                  <div className="font-bold text-amber-100">六爻占卜</div>
                  <div className="text-xs text-amber-200/50">在线起卦</div>
                </motion.div>
              </Link>
            </div>
          </ParchmentCard>
        </motion.div>
      </div>
    </div>
  )
}
