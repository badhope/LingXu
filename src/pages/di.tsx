/**
 * 灵墟 - 地理模块页面
 */

import Layout from '@/components/layout/Layout'
import { MAIN_MODULES } from '@/lib/constants'
import styles from './ModulePage.module.scss'

const module = MAIN_MODULES[1] // 地理

export default function DiPage() {
  const subModules = [
    { id: 'fengshui', name: '风水', desc: '阴阳宅风水，布局之道', icon: '🏠' },
    { id: 'luopan', name: '罗盘', desc: '风水罗盘，定方位知吉凶', icon: '🧭' },
    { id: 'longmai', name: '龙脉', desc: '中华龙脉，山水灵气', icon: '🐉' },
    { id: 'dili', name: '地理', desc: '山川地理，地脉走向', icon: '⛰️' },
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
