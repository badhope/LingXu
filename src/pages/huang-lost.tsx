/**
 * 灵墟 - 失落模块页面
 */

import Layout from '@/components/layout/Layout'
import { MAIN_MODULES } from '@/lib/constants'
import styles from './ModulePage.module.scss'

const module = MAIN_MODULES[7] // 失落

export default function HuangLostPage() {
  const subModules = [
    { id: 'gongfa', name: '功法', desc: '失传修炼功法', icon: '📖' },
    { id: 'danyao', name: '丹药', desc: '炼丹制药秘方', icon: '⚗️' },
    { id: 'fabao', name: '法宝', desc: '法宝炼制图谱', icon: '💎' },
    { id: 'mishi', name: '秘室', desc: '隐藏的秘密档案', icon: '🔮' },
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
