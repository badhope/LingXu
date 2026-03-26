/**
 * 灵墟 - 玄学模块页面
 */

import Layout from '@/components/layout/Layout'
import { MAIN_MODULES } from '@/lib/constants'
import styles from './ModulePage.module.scss'

const module = MAIN_MODULES[2] // 玄学

export default function XuanPage() {
  const subModules = [
    { id: 'yijing', name: '易经', desc: '周易六十四卦，变易之道', icon: '☰' },
    { id: 'bazi', name: '八字', desc: '生辰八字，命理推算', icon: '⏰' },
    { id: 'liuyao', name: '六爻', desc: '六爻占卜，铜钱卦', icon: '🔮' },
    { id: 'fulu', name: '符箓', desc: '道家符箓，驱邪护身', icon: '📜' },
  ]
  
  return (
    <Layout title={module.name}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.char} style={{ color: module.color }}>
            {module.char}
          </div>
          <h1 className={styles.title}>{module.name}</h1>
          <p className={styles.pinyin}>{module.pinyin}</p>
          <p className={styles.description}>{module.description}</p>
          <p className={styles.fullDesc}>{module.fullDescription}</p>
        </header>
        
        <div className={styles.subModulesGrid}>
          {subModules.map((sub, index) => (
            <a
              key={sub.id}
              href={`/${module.id}/${sub.id}`}
              className={styles.subModuleCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className={styles.subIcon}>{sub.icon}</span>
              <h3 className={styles.subName}>{sub.name}</h3>
              <p className={styles.subDesc}>{sub.desc}</p>
              <span className={styles.subArrow}>→</span>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  )
}
