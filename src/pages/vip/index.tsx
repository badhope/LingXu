'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VIP_PRODUCTS, PaymentService } from '@/shared/services/payment'
import { useCultivationStore } from '@/shared/stores/cultivation'
import { PageLayout, ParchmentCard } from '@/components/layout/PageLayout'
import type { Product } from '@/shared/types'

export default function VipMembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(null)
  const [showPayModal, setShowPayModal] = useState(false)
  const [processing, setProcessing] = useState(false)
  const { user, activateVip } = useCultivationStore()

  const handlePurchase = async (product: Product) => {
    setProcessing(true)
    
    await new Promise(r => setTimeout(r, 1500))
    
    activateVip(product.duration)
    
    setProcessing(false)
    setShowPayModal(false)
    setSelectedPlan(null)
  }

  return (
    <PageLayout
      title="灵墟 VIP 会员"
      subtitle="解锁全部修行特权，获得专属Buff加成"
      showBack={true}
      backTo="/overview"
    >
      {/* 头部 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="text-6xl mb-4">👑</div>
        <p className="text-amber-200/70 text-lg max-w-2xl mx-auto">
          解锁全部修行特权，获得专属Buff加成，开启你的修仙之路
        </p>
      </motion.div>

      {/* 会员特权 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10"
      >
        {[
          { icon: '⚡', title: '修行加成', desc: '每日签到双倍修为，突破成功率+50%' },
          { icon: '🔮', title: '高级命理', desc: '八字详批、流年运势、独家命理分析' },
          { icon: '🧭', title: '专业罗盘', desc: '风水罗盘专业版、阴阳宅深度分析' },
          { icon: '✨', title: '视觉特权', desc: '专属金光特效、尊贵头像框、无广告' },
        ].map((item, i) => (
          <ParchmentCard key={i} className="p-5">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="font-bold mb-1 text-amber-100">{item.title}</h3>
            <p className="text-sm text-amber-200/60">{item.desc}</p>
          </ParchmentCard>
        ))}
      </motion.div>

      {/* 套餐选择 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="grid md:grid-cols-3 gap-6 mb-8"
      >
        {VIP_PRODUCTS.map((product, i) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => setSelectedPlan(product)}
            className={`relative rounded-xl overflow-hidden cursor-pointer transition-all ${
              selectedPlan?.id === product.id
                ? 'ring-2 ring-amber-500 shadow-lg shadow-amber-500/20'
                : ''
            }`}
          >
            <ParchmentCard className={`p-6 h-full ${selectedPlan?.id === product.id ? 'bg-amber-900/30' : ''}`}>
              {product.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-black text-xs font-bold px-4 py-1 rounded-bl-lg">
                    最受欢迎
                  </div>
                </div>
              )}

              <h3 className="text-xl font-bold mb-2 text-amber-100">{product.name}</h3>
              <p className="text-sm text-amber-200/60 mb-4">{product.description}</p>

              <div className="mb-4">
                <span className="text-4xl font-bold text-amber-400">¥{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-amber-200/50 line-through ml-2 text-lg">
                    ¥{product.originalPrice}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {product.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span>
                    <span className="text-amber-200/80">{f}</span>
                  </div>
                ))}
              </div>
            </ParchmentCard>
          </motion.div>
        ))}
      </motion.div>

      {/* 开通按钮 */}
      <div className="text-center">
        <motion.button
          whileHover={{ scale: selectedPlan ? 1.05 : 1 }}
          whileTap={{ scale: selectedPlan ? 0.95 : 1 }}
          onClick={() => selectedPlan && setShowPayModal(true)}
          disabled={!selectedPlan}
          className={`px-12 py-4 rounded-xl font-bold text-lg transition-all ${
            selectedPlan
              ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black cursor-pointer shadow-lg shadow-amber-500/30'
              : 'bg-stone-700 text-stone-500 cursor-not-allowed'
          }`}
        >
          {selectedPlan ? `立即开通 ${selectedPlan.name}` : '请选择套餐'}
        </motion.button>
      </div>

      {/* 支付弹窗 */}
      <AnimatePresence>
        {showPayModal && selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => !processing && setShowPayModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-stone-900 rounded-2xl w-full max-w-md overflow-hidden border border-amber-600/30"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-center mb-6 text-amber-100">确认开通</h3>

                <ParchmentCard className="p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-amber-200/60">套餐</span>
                    <span className="font-bold text-amber-100">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-amber-200/60">有效期</span>
                    <span className="text-amber-100">{selectedPlan.duration} 天</span>
                  </div>
                  <div className="border-t border-amber-600/20 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-200/60">应付金额</span>
                      <span className="text-2xl font-bold text-amber-400">
                        ¥{selectedPlan.price}
                      </span>
                    </div>
                  </div>
                </ParchmentCard>

                <div className="space-y-3 mb-6">
                  {['微信支付', '支付宝'].map((method, i) => (
                    <ParchmentCard key={i} className="flex items-center gap-3 p-3 hover:border-amber-500/50 cursor-pointer">
                      <div className="text-2xl">{i === 0 ? '💚' : '💙'}</div>
                      <span className="text-amber-100">{method}</span>
                    </ParchmentCard>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePurchase(selectedPlan)}
                  disabled={processing}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span> 支付中...
                    </span>
                  ) : (
                    '确认支付'
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  )
}
