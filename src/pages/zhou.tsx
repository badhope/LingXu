/**
 * 灵墟 - 时间模块页面
 */

import Layout from '@/components/layout/Layout'
import { MAIN_MODULES } from '@/lib/constants'
import styles from './ModulePage.module.scss'

const module = MAIN_MODULES[5] // 时间

export default function ZhouPage() {
  const subModules = [
    { id: 'lunhui', name: '轮回', desc: '六道轮回，因果循环', icon: '🔄' },
    { id: 'yinguo', name: '因果', desc: '善有善报，恶有恶报', icon: '⚖️' },
    { id: 'shiguang', name: '时光', desc: '时间长河探索', icon: '⏳' },
    { id: 'yuce', name: '预言', desc: '古今预言解读', icon: '📜' },
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
