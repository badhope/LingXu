/**
 * 灵墟 - 关于页面
 */

import Layout from '@/components/layout/Layout'
import styles from './About.module.scss'

export default function AboutPage() {
  return (
    <Layout title="关于">
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>关于灵墟</h1>
          <p className={styles.subtitle}>末法时代 · 失落修行文明档案馆</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>项目介绍</h2>
          <div className={styles.infoBox}>
            <p>
              灵墟是一个沉浸式的中国玄学文化数字档案，致力于探索中华修行文明的兴衰变迁。
              在这里，你可以了解易经八卦、八字命理、风水堪舆等传统文化的奥秘。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>技术栈</h2>
          <div className={styles.techGrid}>
            <div className={styles.techItem}>
              <h4>Next.js 14</h4>
              <p>React 框架</p>
            </div>
            <div className={styles.techItem}>
              <h4>TypeScript</h4>
              <p>类型安全</p>
            </div>
            <div className={styles.techItem}>
              <h4>Tailwind CSS</h4>
              <p>样式设计</p>
            </div>
            <div className={styles.techItem}>
              <h4>Framer Motion</h4>
              <p>动画效果</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>开源声明</h2>
          <div className={styles.infoBox}>
            <p>
              本项目基于 MIT 许可证开源，你可以自由使用、修改和分发本项目的代码。
              但请注意，玄学相关内容仅供娱乐，不构成任何形式的预测或建议。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>联系方式</h2>
          <div className={styles.contact}>
            <p>GitHub: <a href="https://github.com/badhope/LingXu" target="_blank" rel="noopener noreferrer">badhope/LingXu</a></p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
