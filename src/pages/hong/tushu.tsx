'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function TushuPage() {
  const books = [
    {
      name: '河图洛书',
      tier: '上古天书',
      author: '龙马神龟',
      desc: '天地之数，尽在其中。河图以十数合五方五行阴阳天地之象，洛书以九数列九宫八卦之用。',
      rarity: '传说',
      icon: '📜'
    },
    {
      name: '周易',
      tier: '群经之首',
      author: '周文王',
      desc: '仰观天文，俯察地理，中通人事。六十四卦，三百八十四爻，范围天地之化而不过。',
      rarity: '圣典',
      icon: '📗'
    },
    {
      name: '山海经',
      tier: '上古地理',
      author: '伯益',
      desc: '载四海之外，录大荒之中。山经五卷，海经十三卷，藏天下异闻，录海内奇物。',
      rarity: '秘典',
      icon: '📘'
    },
    {
      name: '黄帝内经',
      tier: '医家圣典',
      author: '黄帝',
      desc: '上古医道，养生之源。素问灵枢，阴阳五行，藏象经络，治本于未病。',
      rarity: '圣典',
      icon: '📙'
    },
    {
      name: '道德经',
      tier: '道家至尊',
      author: '老子',
      desc: '道可道非常道，名可名非常名。五千真言，通玄达妙，为万物之宗。',
      rarity: '圣典',
      icon: '📕'
    },
    {
      name: '奇门遁甲',
      tier: '兵家至尊',
      author: '风后',
      desc: '九天玄女所传，黄帝用之以胜蚩尤。三奇六仪，八门九星，藏天地杀机。',
      rarity: '秘典',
      icon: '📔'
    },
    {
      name: '连山易',
      tier: '失传易书',
      author: '神农氏',
      desc: '夏曰连山，以艮为首。象山之出云连连不绝，演万物之终始。',
      rarity: '佚失',
      icon: '📓'
    },
    {
      name: '归藏易',
      tier: '失传易书',
      author: '黄帝',
      desc: '殷曰归藏，以坤为首。象万物莫不归藏于其中，窥阴阳之奥秘。',
      rarity: '佚失',
      icon: '📓'
    }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case '传说': return 'linear-gradient(135deg, #ffd700, #ff8c00)'
      case '圣典': return 'linear-gradient(135deg, #a855f7, #7c3aed)'
      case '秘典': return 'linear-gradient(135deg, #06b6d4, #0891b2)'
      case '佚失': return 'linear-gradient(135deg, #6b7280, #4b5563)'
      default: return 'linear-gradient(135deg, #b89438, #8b7355)'
    }
  }

  return (
    <SubPageTemplate
      title="洪荒图书"
      subtitle="天书玉简 · 上古传承 · 三坟五典 · 八索九丘"
      icon="📕"
      colorRgb="239, 68, 68"
    >
      <SubPageSection title="藏书总览">
        <InfoCard>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
            {[
              { label: '上古天书', value: '3卷', icon: '🌟' },
              { label: '儒家六经', value: '6卷', icon: '📖' },
              { label: '诸子百家', value: '189卷', icon: '📚' },
              { label: '失传秘典', value: '24卷', icon: '❓' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#b89438' }}>{stat.value}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.875rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="藏书阁">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem'
        }}>
          {books.map((book, index) => (
            <motion.div
              key={book.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '0.25rem 1rem',
                background: getRarityColor(book.rarity),
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                borderBottomLeftRadius: '8px'
              }}>
                {book.rarity}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  fontSize: '3rem',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }}>
                  {book.icon}
                </div>
                <div style={{ flex: 1, paddingTop: '0.5rem' }}>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#b89438',
                    marginBottom: '0.25rem'
                  }}>
                    {book.name}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'rgba(180, 180, 190, 0.5)',
                    marginBottom: '0.75rem'
                  }}>
                    {book.tier} · {book.author}
                  </div>
                  <p style={{
                    color: 'rgba(180, 180, 190, 0.75)',
                    fontSize: '0.85rem',
                    lineHeight: 1.6
                  }}>
                    {book.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="读书箴言">
        <InfoCard>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                fontSize: '1.5rem',
                color: '#b89438',
                fontStyle: 'italic',
                lineHeight: 2
              }}
            >
              读书破万卷，下笔如有神<br />
              书山有路勤为径，学海无涯苦作舟<br />
              书中自有黄金屋，书中自有颜如玉
            </motion.div>
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
