'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

const DIVINATION_METHODS = [
  { name: '铜钱卦', icon: '🪙', desc: '三枚铜钱，六次成卦，最经典的周易起卦方式' },
  { name: '梅花易数', icon: '🌸', desc: '观物取象，随心起卦，邵康节心易之法' },
  { name: '签文', icon: '🎋', desc: '寺庙求签，吉凶悔吝，一念之间' },
  { name: '塔罗牌', icon: '🃏', desc: '大阿卡纳，小阿卡纳，揭示潜意识' },
  { name: '灵棋经', icon: '⚪', desc: '十二棋子，三百八十四卦，东方灵棋' },
  { name: '龟甲卜', icon: '🐢', desc: '灼烧龟甲，观其裂纹，上古卜法正宗' },
]

export default function ZhanbuPage() {
  return (
    <SubPageTemplate
      title="占卜问卦"
      subtitle="探赜索隐 · 钩深致远 · 以断天下之吉凶"
      icon="🎴"
      colorRgb="129, 140, 248"
    >
      <SubPageSection title="卜筮之道">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            《易》有圣人之道四焉：以言者尚其辞，以动者尚其变，以制器者尚其象，以卜筮者尚其占。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            夫卜者，非决天命也，实问己心也。卦者，挂也。悬挂万象于目前，映照汝心之真伪。至诚之道，可以前知。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="占卜法门">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
        }}>
          {DIVINATION_METHODS.map((method, index) => (
            <motion.div
              key={method.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                {method.icon}
              </div>
              <h3 style={{ color: '#b89438', marginBottom: '0.75rem' }}>
                {method.name}
              </h3>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
              }}>
                {method.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="占卜心法">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
        }}>
          {[
            { title: '心诚则灵', desc: '凡卜筮之道，必以精诚感格。心不诚，则卦不验。' },
            { title: '无疑不卜', desc: '事无可疑，不必卜也。卜以决疑，不疑何卜？' },
            { title: '善易不卜', desc: '深明易道者，何须占卜。动静语默，无非是易。' },
            { title: '卜以决疑', desc: '卜者，决疑也。既得吉爻，当行正道。既得凶兆，宜早避之。' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{ color: '#b89438', marginBottom: '0.75rem' }}>
                {item.title}
              </h3>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                lineHeight: 1.7,
              }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
