'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

const LUCK_CATEGORIES = [
  { name: '事业运', icon: '💼', desc: '官禄宫位，紫微斗数看职场升迁，流年运势判事业顺逆' },
  { name: '财运', icon: '💰', desc: '财帛宫位，武曲禄存主正财，偏门横财看破军' },
  { name: '感情运', icon: '💕', desc: '夫妻宫位，天相红鸾主姻缘，孤辰寡宿防孤单' },
  { name: '健康运', icon: '🏥', desc: '疾厄宫位，天梁解厄保平安，杀破狼需防重疾' },
  { name: '学业运', icon: '📚', desc: '文昌文曲，主聪明智慧，科星入命主金榜题名' },
  { name: '人际运', icon: '🤝', desc: '奴仆宫位，天同太阴主贵人相助，擎羊陀罗防小人' },
  { name: '出行运', icon: '✈️', desc: '迁移宫位，天马驿马主远游，太阳高照保平安' },
  { name: '家宅运', icon: '🏠', desc: '田宅宫位，天府入库主置业，廉贞入命防火灾' },
]

export default function YunshiPage() {
  return (
    <SubPageTemplate
      title="每日运势"
      subtitle="流年大运 · 五行生克 · 趋吉避凶 · 把握时机"
      icon="🌟"
      colorRgb="232, 121, 249"
    >
      <SubPageSection title="运势概述">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            运势者，天时也。五行生克，天干地支流转，影响着每一个人的生命轨迹。知运则能顺势而为，逆势则能避其锋芒。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            君子知命而不忧。知晓自身运势，并非听天由命，而是在正确的时机做出正确的选择，此为改命之要道。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="八大运势">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
        }}>
          {LUCK_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                {category.icon}
              </div>
              <h3 style={{ color: '#b89438', marginBottom: '0.75rem' }}>
                {category.name}
              </h3>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
              }}>
                {category.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="改运心法">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {[
            { title: '行善积德', desc: '积善之家必有余庆，积不善之家必有余殃。日行一善，气运自改。' },
            { title: '修身养性', desc: '心正则气正，气正则运正。心浮气躁者，好运难留。' },
            { title: '顺势而为', desc: '时来天地皆同力，运去英雄不自由。识时务者为俊杰。' },
            { title: '持之以恒', desc: '否极泰来，泰极否来。坚持正道，终有花开之时。' },
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
