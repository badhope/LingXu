/**
 * 灵墟 - 历史模块页面
 */

import Layout from '@/components/layout/Layout'
import { MAIN_MODULES } from '@/lib/constants'
import styles from './ModulePage.module.scss'

const module = MAIN_MODULES[3] // 历史 (id: lishi)

export default function LishiPage() {
  const subModules = [
    { id: 'chaodai', name: '朝代', desc: '历史朝代更迭', icon: '👑' },
    { id: 'renwu', name: '人物', desc: '历史名人档案', icon: '👤' },
    { id: 'mixin', name: '秘辛', desc: '历史背后的秘密', icon: '🔐' },
    { id: 'wenxian', name: '文献', desc: '古籍文献资料', icon: '📚' },
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
              href={`/lishi/${sub.id}`}
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
