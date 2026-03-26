/**
 * 灵墟 - 洪荒模块页面
 */

import Layout from '@/components/layout/Layout'
import { MAIN_MODULES } from '@/lib/constants'
import styles from './ModulePage.module.scss'

const module = MAIN_MODULES[6] // 洪荒

export default function HongPage() {
  const subModules = [
    { id: 'shenshou', name: '神兽', desc: '上古神兽图鉴', icon: '🐉' },
    { id: 'yaomo', name: '妖魔', desc: '妖魔鬼怪档案', icon: '👹' },
    { id: 'chuanshuo', name: '传说', desc: '上古神话传说', icon: '📜' },
    { id: 'tushu', name: '图腾', desc: '远古图腾文化', icon: '🏛️' },
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
