'use client'

import { motion } from 'framer-motion'
import XiuZhenPageTemplate from '@/components/xiuzhen/XiuZhenPageTemplate'
import styles from './liandan.module.scss'

const DAN_FANG = [
  { name: '筑基丹', level: '凡级上品', effect: '突破筑基期必备丹药', ingredients: '凝气草、筑基果、灵泉水', icon: '🔮' },
  { name: '聚灵丹', level: '凡级极品', effect: '加速灵气吸收速度', ingredients: '聚灵花、紫河车、万年冰', icon: '💎' },
  { name: '九转金丹', level: '仙级中品', effect: '九转重生，金丹大道', ingredients: '九转莲、金乌血、补天石', icon: '🌟' },
  { name: '元婴丹', level: '灵级上品', effect: '凝结元婴，破丹成婴', ingredients: '婴粟花、天魂草、地魄石', icon: '👶' },
  { name: '化神丹', level: '仙级下品', effect: '突破化神，神游太虚', ingredients: '化神花、域外星辰、悟道茶', icon: '⚡' },
  { name: '大还丹', level: '灵级中品', effect: '起死回生，肉白骨', ingredients: '还魂草、阎王须、阴阳石', icon: '❤️' },
]

const DAN_YAO_LEVELS = [
  { grade: '凡级', color: '#9ca3af', desc: '普通修士使用' },
  { grade: '灵级', color: '#22c55e', desc: '筑基金丹使用' },
  { grade: '仙级', color: '#a855f7', desc: '元婴化神使用' },
  { grade: '神级', color: '#fbbf24', desc: '传说中的丹药' },
]

export default function LianDanPage() {
  return (
    <XiuZhenPageTemplate
      title="炼丹阁"
      subtitle="丹方大全 · 灵药图鉴 · 炼丹模拟器"
      rune="🔮"
      description="修真界炼丹阁 - 收录天下丹方，解析灵药药性，模拟九转炼丹，助你丹道大成"
      keywords={["炼丹", "丹药", "丹方", "灵药", "筑基丹", "聚灵丹", "九转金丹"]}
    >
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={styles.levelGrid}>
        {DAN_YAO_LEVELS.map((level, i) => (
          <motion.div key={level.grade} className={styles.levelCard} whileHover={{ scale: 1.03, y: -5 }} transition={{ delay: i * 0.05 }}>
            <div className={styles.levelColor} style={{ background: level.color }} />
            <div className={styles.levelName}>{level.grade}</div>
            <div className={styles.levelDesc}>{level.desc}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleRow}>
          <span className={styles.sectionDivider} />
          <h2 className={styles.sectionTitle}>上古丹方</h2>
          <span className={styles.sectionDivider} />
        </div>
        <p className={styles.sectionSubtitle}>收录修真界六大传世丹方</p>
      </div>

      <div className={styles.cardGrid}>
        {DAN_FANG.map((dan, i) => (
          <motion.div key={dan.name} className={styles.card} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.03, y: -8 }}>
            <div className={styles.cardIcon}>{dan.icon}</div>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardName}>{dan.name}</h3>
              <span className={styles.cardLevel}>{dan.level}</span>
            </div>
            <p className={styles.cardEffect}>{dan.effect}</p>
            <p className={styles.cardIngredients}>📦 {dan.ingredients}</p>
          </motion.div>
        ))}
      </div>

      <motion.div className={styles.tipBox} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <span className={styles.tipIcon}>💡</span>
        <p className={styles.tipText}>
          炼丹之道，在乎水火。火候不到，丹药不纯；火候太过，灵气散尽。初学者建议先从凡级丹药开始练习。
        </p>
      </motion.div>
    </XiuZhenPageTemplate>
  )
}
