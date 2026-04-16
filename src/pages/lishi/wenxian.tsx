'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

export default function WenxianPage() {
  const classics = [
    {
      category: '经',
      name: '易经',
      author: '伏羲·文王·孔子',
      era: '上古-西周-春秋',
      completeness: 100,
      versions: ['通行本', '马王堆帛书本', '竹简本'],
      desc: '群经之首，大道之源。仰以观于天文，俯以察于地理，是故知幽明之故。',
      icon: '📖'
    },
    {
      category: '经',
      name: '诗经',
      author: '孔子删定',
      era: '西周-春秋',
      completeness: 95,
      versions: ['毛诗', '鲁诗', '齐诗', '韩诗'],
      desc: '诗三百，一言以蔽之，曰思无邪。风雅颂，赋比兴，六经之一。',
      icon: '🎵'
    },
    {
      category: '史',
      name: '史记',
      author: '司马迁',
      era: '西汉',
      completeness: 90,
      versions: ['中华书局点校本', '三家注本', '敦煌残卷'],
      desc: '史家之绝唱，无韵之离骚。究天人之际，通古今之变，成一家之言。',
      icon: '📜'
    },
    {
      category: '史',
      name: '资治通鉴',
      author: '司马光',
      era: '北宋',
      completeness: 100,
      versions: ['胡三省注本', '中华书局点校本'],
      desc: '鉴于往事，有资于治道。十六朝兴衰，一千三百六十二年历史。',
      icon: '🗺️'
    },
    {
      category: '子',
      name: '道德经',
      author: '老子',
      era: '春秋',
      completeness: 85,
      versions: ['王弼注本', '马王堆帛书甲本', '马王堆帛书乙本', '郭店楚简本'],
      desc: '道可道，非常道。玄之又玄，众妙之门。五千真言，道家祖典。',
      icon: '☯️'
    },
    {
      category: '子',
      name: '孙子兵法',
      author: '孙武',
      era: '春秋',
      completeness: 95,
      versions: ['十一家注本', '武经七书本', '银雀山汉简本'],
      desc: '兵者，国之大事，死生之地，存亡之道，不可不察也。百世兵家之师。',
      icon: '⚔️'
    },
    {
      category: '集',
      name: '楚辞',
      author: '屈原',
      era: '战国',
      completeness: 90,
      versions: ['王逸注本', '洪兴祖补注本', '朱熹集注本'],
      desc: '路漫漫其修远兮，吾将上下而求索。楚辞之祖，骚体之宗。',
      icon: '🌿'
    },
    {
      category: '集',
      name: '古文观止',
      author: '吴楚材·吴调侯',
      era: '清',
      completeness: 100,
      versions: ['映雪堂原本', '中华书局译注本'],
      desc: '观止矣！若有他乐，吾不敢请已。二百二十二篇千古美文，散文尽览。',
      icon: '📚'
    }
  ]

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case '经': return {
        bg: 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: '#ef4444',
        label: '经部 · 万世经典'
      }
      case '史': return {
        bg: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: '#3b82f6',
        label: '史部 · 千秋青史'
      }
      case '子': return {
        bg: 'linear-gradient(135deg, #22c55e, #16a34a)',
        color: '#22c55e',
        label: '子部 · 百家争鸣'
      }
      case '集': return {
        bg: 'linear-gradient(135deg, #a855f7, #7c3aed)',
        color: '#a855f7',
        label: '集部 · 文采斐然'
      }
      default: return {
        bg: 'linear-gradient(135deg, #6b7280, #4b5563)',
        color: '#6b7280',
        label: '其他'
      }
    }
  }

  return (
    <SubPageTemplate
      title="古籍文献"
      subtitle="三坟五典 · 八索九丘 · 经史子集 · 汗牛充栋"
      icon="📚"
      colorRgb="255, 170, 102"
    >
      <SubPageSection title="四库总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {[
              { category: '经部', count: '13部', color: '#ef4444', icon: '📖', desc: '万世不易之典' },
              { category: '史部', count: '26部', color: '#3b82f6', icon: '📜', desc: '历代兴衰之鉴' },
              { category: '子部', count: '38部', color: '#22c55e', icon: '🎯', desc: '百家思想之汇' },
              { category: '集部', count: '55部', color: '#a855f7', icon: '✨', desc: '辞章文采之美' }
            ].map((stat, i) => (
              <motion.div
                key={stat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={{
                    boxShadow: ['none', `0 0 30px ${stat.color}`, 'none']
                  }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '12px',
                    background: stat.color,
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: stat.color }}>{stat.count}</div>
                <div style={{ fontSize: '1.1rem', color: '#b89438', margin: '0.25rem 0' }}>{stat.category}</div>
                <div style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.8rem' }}>{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="经史子集精选">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem'
        }}>
          {classics.map((book, index) => (
            <motion.div
              key={book.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              style={{
                borderLeft: `4px solid ${getCategoryStyle(book.category).color}`
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0 }}>
                  <motion.div
                    animate={{
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ duration: 4, delay: index * 0.3, repeat: Infinity }}
                    style={{
                      width: '60px',
                      height: '80px',
                      borderRadius: '4px 8px 8px 4px',
                      background: getCategoryStyle(book.category).bg,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: '4px 4px 12px rgba(0,0,0,0.3)'
                    }}
                  >
                    <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>{book.category}</span>
                    <span style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>{book.icon}</span>
                  </motion.div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: getCategoryStyle(book.category).color
                      }}>
                        {book.name}
                      </span>
                      <span style={{
                        marginLeft: '0.5rem',
                        fontSize: '0.7rem',
                        color: 'rgba(180, 180, 190, 0.5)'
                      }}>
                        {book.era}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>完整度</div>
                      <div style={{
                        width: '60px',
                        height: '6px',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        marginTop: '2px'
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${book.completeness}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          style={{
                            height: '100%',
                            background: getCategoryStyle(book.category).bg
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.8rem',
                    color: 'rgba(180, 180, 190, 0.6)',
                    marginBottom: '0.5rem'
                  }}>
                    ✍️ {book.author}
                  </div>

                  <p style={{
                    color: 'rgba(180, 180, 190, 0.75)',
                    fontSize: '0.8rem',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem',
                    fontStyle: 'italic'
                  }}>
                    "{book.desc}"
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(180, 180, 190, 0.5)' }}>
                      📚 传世版本：
                    </span>
                    {book.versions.map((v, i) => (
                      <span key={i} style={{
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '12px',
                        background: `${getCategoryStyle(book.category).color}20`,
                        color: getCategoryStyle(book.category).color
                      }}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
