/**
 * 灵墟 - 天时模块页面
 */

import Layout from '@/components/layout/Layout'
import { MAIN_MODULES } from '@/lib/constants'
import styles from './ModulePage.module.scss'

const module = MAIN_MODULES[0] // 天时

export default function TianPage() {
  const subModules = [
    { id: 'xingxiu', name: '星宿', desc: '二十八星宿，三垣四象', icon: '⭐' },
    { id: 'yunshi', name: '运势', desc: '每日运势，流年运程', icon: '🔮' },
    { id: 'jieqi', name: '节气', desc: '二十四节气，养生之道', icon: '🌾' },
    { id: 'zhanbu', name: '占卜', desc: '吉凶祸福，未卜先知', icon: '🎴' },
  ]
  
  return (
    <Layout title={module.name}>
      <div className={styles.container}>
        {/* 模块头部 */}
        <header className={styles.header}>
          <div className={styles.char} style={{ color: module.color }}>
            {module.char}
          </div>
          <h1 className={styles.title}>{module.name}</h1>
          <p className={styles.pinyin}>{module.pinyin}</p>
          <p className={styles.description}>{module.description}</p>
          <p className={styles.fullDesc}>{module.fullDescription}</p>
        </header>
        
        {/* 子模块网格 */}
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
        
        {/* 功能预览 */}
        <section className={styles.previewSection}>
          <h2 className={styles.sectionTitle}>今日天象</h2>
          <div className={styles.previewGrid}>
            <div className={styles.previewCard}>
              <span className={styles.previewLabel}>当前节气</span>
              <span className={styles.previewValue}>春分</span>
            </div>
            <div className={styles.previewCard}>
              <span className={styles.previewLabel}>农历</span>
              <span className={styles.previewValue}>二月十七</span>
            </div>
            <div className={styles.previewCard}>
              <span className={styles.previewLabel}>星宿</span>
              <span className={styles.previewValue}>角木蛟</span>
            </div>
            <div className={styles.previewCard}>
              <span className={styles.previewLabel}>宜</span>
              <span className={styles.previewValue}>祭祀 出行</span>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
