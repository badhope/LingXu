'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard, CardGrid, ProgressBar } from '@/components/layout/SubPageTemplate'
import styles from './SubPage.module.scss'

export default function YucePage() {
  const prophecies = [
    {
      name: '推背图',
      author: '李淳风、袁天罡',
      era: '唐朝',
      fulfillment: 98,
      status: '已应验',
      totalPredictions: 60,
      fulfilled: 59,
      famous: ['武则天称帝', '安史之乱', '太平天国', '抗日战争'],
      desc: '中华预言第一奇书，共六十图像，以卦分系之。推算出大唐以后中国两千多年的国运盛衰。',
      color: '#ef4444',
      icon: '📜'
    },
    {
      name: '烧饼歌',
      author: '刘伯温',
      era: '明朝',
      fulfillment: 95,
      status: '已应验',
      totalPredictions: 40,
      fulfilled: 38,
      famous: ['土木堡之变', '魏忠贤乱政', '满清入关', '辛亥革命'],
      desc: '明太祖朱元璋在内殿吃烧饼，刚咬一口，刘伯温入见。帝问之，刘一语成谶，后世一一应验。',
      color: '#f97316',
      icon: '🥞'
    },
    {
      name: '梅花诗',
      author: '邵雍',
      era: '北宋',
      fulfillment: 92,
      status: '已应验',
      totalPredictions: 10,
      fulfilled: 9,
      famous: ['靖康之耻', '南宋偏安', '朱元璋建国', '文革浩劫'],
      desc: '十首梅花诗预言了从宋到今日的中国历史演变，每一首对应一个朝代。',
      color: '#eab308',
      icon: '🌸'
    },
    {
      name: '金陵塔碑文',
      author: '刘伯温',
      era: '明朝',
      fulfillment: 88,
      status: '已应验',
      totalPredictions: 30,
      fulfilled: 26,
      famous: ['日本侵华', '国共内战', '文化大革命', '改革开放'],
      desc: '民国十六年拆除金陵塔时发现，预言了二十世纪以后中国的重大变故。',
      color: '#22c55e',
      icon: '🗼'
    },
    {
      name: '武侯百年乩',
      author: '诸葛亮',
      era: '三国',
      fulfillment: 85,
      status: '进行中',
      totalPredictions: 50,
      fulfilled: 42,
      famous: ['甲午战争', '民国建立', '日军投降', '待：天下大同'],
      desc: '诸葛亮在军中所作乩文，预言了此后百年间的天下大势，最后的预言正在进行中。',
      color: '#3b82f6',
      icon: '⚔️'
    },
    {
      name: '马前课',
      author: '诸葛亮',
      era: '三国',
      fulfillment: 82,
      status: '进行中',
      totalPredictions: 14,
      fulfilled: 11,
      famous: ['魏灭蜀', '司马篡魏', '隋统一', '待：拯患救难，圣人出现'],
      desc: '诸葛亮于军中闲暇时所写，共十四课，每一课预言一个朝代，从三国直至未来。',
      color: '#a855f7',
      icon: '🐴'
    },
    {
      name: '黄蘖禅师诗',
      author: '黄蘖禅师',
      era: '唐朝',
      fulfillment: 78,
      status: '进行中',
      totalPredictions: 16,
      fulfilled: 12,
      famous: ['满清入关', '太平天国', '光绪', '待：日月落时江海闭'],
      desc: '唐朝高僧黄蘖禅师所作十四首七言诗，预言了唐至近代的国运兴衰。',
      color: '#ec4899',
      icon: '🛕'
    },
    {
      name: '乾坤万年歌',
      author: '姜子牙',
      era: '西周',
      fulfillment: 75,
      status: '进行中',
      totalPredictions: 77,
      fulfilled: 57,
      famous: ['秦灭六国', '汉四百秋', '唐统天下', '待：圣人治世'],
      desc: '齐太公姜子牙所作，凡一百一十句，预言自周至今日一万年世事。',
      color: '#14b8a6',
      icon: '🗡️'
    }
  ]

  const upcomingEvents = [
    {
      year: '2025-2030',
      event: '人工智能革命',
      probability: 95,
      source: '多国预言交叉印证',
      impact: '🌟🌟🌟🌟🌟',
      desc: '强人工智能涌现，人类社会结构发生根本性变革'
    },
    {
      year: '2030-2040',
      event: '能源突破',
      probability: 85,
      source: '推背图·五十九象',
      impact: '🌟🌟🌟🌟',
      desc: '可控核聚变实现，人类彻底解决能源危机'
    },
    {
      year: '2040-2050',
      event: '圣人出世',
      probability: 75,
      source: '推背图·马前课',
      impact: '🌟🌟🌟🌟🌟',
      desc: '东方有圣人出，天下归心，万邦来朝'
    },
    {
      year: '2050-2100',
      event: '天下大同',
      probability: 65,
      source: '诸多预言共同指向',
      impact: '🌟🌟🌟🌟🌟',
      desc: '无城无府，无尔无我，天下一家，治臻大化'
    }
  ]

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '已应验':
        return styles.statusCompleted
      case '进行中':
        return styles.statusOngoing
      default:
        return ''
    }
  }

  const stats = [
    { label: '预言总数', count: '337', color: '#ef4444', icon: '📜', desc: '八大奇书总计' },
    { label: '已应验', count: '240+', color: '#22c55e', icon: '✅', desc: '历史一一对应' },
    { label: '应验率', count: '87%', color: '#3b82f6', icon: '🎯', desc: '平均准确率' },
    { label: '待验证', count: '97', color: '#a855f7', icon: '⏳', desc: '未来正在发生' }
  ]

  return (
    <SubPageTemplate
      title="预知未来"
      subtitle="推背图 · 烧饼歌 · 梅花诗 · 万年歌 · 洞悉天机"
      icon="🔮"
      colorRgb="255, 136, 204"
    >
      <SubPageSection title="预言总览">
        <InfoCard>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'var(--gap-card)',
            textAlign: 'center'
          }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={i === 3 ? {
                    scale: [1, 1.05, 1],
                    boxShadow: ['none', `0 0 30px ${stat.color}`, 'none']
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    width: 'clamp(50px, 12vw, 70px)',
                    height: 'clamp(50px, 12vw, 70px)',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}88)`,
                    margin: '0 auto var(--space-4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--fs-2-clamp)'
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div style={{ 
                  fontSize: 'var(--fs-2-clamp)', 
                  fontWeight: 'bold', 
                  color: stat.color,
                  lineHeight: 'var(--lh-tight)',
                  marginBottom: 'var(--space-2)'
                }}>
                  {stat.count}
                </div>
                <div style={{ 
                  fontSize: 'var(--fs-base)', 
                  color: '#b89438', 
                  marginBottom: 'var(--space-1)',
                  fontFamily: 'var(--font-display)'
                }}>
                  {stat.label}
                </div>
                <div style={{ 
                  color: 'var(--text-muted)', 
                  fontSize: 'var(--fs-small)',
                  lineHeight: 'var(--lh-body)'
                }}>
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="八大预言奇书">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--gap-card)'
        }}>
          {prophecies.map((book, index) => (
            <motion.div
              key={book.name}
              className={styles.prophecyCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              style={{
                borderColor: `${book.color}50`,
                borderLeft: `4px solid ${book.color}`
              }}
            >
              <div className={styles.prophecyHeader}>
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                  className={styles.prophecyIcon}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '8px',
                    background: `linear-gradient(135deg, ${book.color}, ${book.color}88)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {book.icon}
                </motion.div>
                <div className={styles.prophecyTitle}>
                  <div className={styles.prophecyName} style={{ color: book.color }}>
                    {book.name}
                  </div>
                  <div className={styles.prophecyMeta}>
                    <span className={styles.prophecyAuthor}>👤 {book.author}</span>
                    <span className={styles.prophecyEra}>📅 {book.era}</span>
                  </div>
                </div>
                <span className={`${styles.prophecyStatus} ${getStatusStyle(book.status)}`}>
                  {book.status}
                </span>
              </div>

              <ProgressBar
                value={book.fulfillment}
                label={`🎯 应验率 ${book.fulfilled}/${book.totalPredictions}`}
                color={book.color}
              />

              <p className={styles.prophecyDesc}>
                "{book.desc}"
              </p>

              <div className={styles.prophecyFamous}>
                <div className={styles.prophecyFamousLabel}>
                  著名预言
                </div>
                <div className={styles.prophecyFamousItems}>
                  {book.famous.map((f, i) => (
                    <span key={i} className={styles.famousItem} style={{
                      background: `${book.color}15`,
                      borderColor: `${book.color}30`,
                      color: book.color
                    }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="正在发生的未来">
        <InfoCard>
          <div className={styles.eventTimeline}>
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.year}
                className={styles.eventItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className={styles.eventYear}>
                  {event.year}
                </div>
                <div className={styles.eventTitle}>
                  {event.event}
                </div>
                <div className={styles.eventMeta}>
                  <span>🎯 概率 {event.probability}%</span>
                  <span>{event.impact}</span>
                  <span className={styles.eventSource}>📜 {event.source}</span>
                </div>
                <div className={styles.eventDesc}>
                  {event.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </InfoCard>
      </SubPageSection>
    </SubPageTemplate>
  )
}
