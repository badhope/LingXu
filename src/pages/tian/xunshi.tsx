/**
 * 灵墟 - 天时模块 - 云师页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function XunshiPage() {
  const zodiacs = [
    { name: '白羊座', element: '火', description: '热情、直接、有冲劲' },
    { name: '金牛座', element: '土', description: '稳重、实际、执着' },
    { name: '双子座', element: '风', description: '灵活、好奇、善变' },
    { name: '巨蟹座', element: '水', description: '敏感、体贴、护短' },
    { name: '狮子座', element: '火', description: '自信、慷慨、爱表现' },
    { name: '处女座', element: '土', description: '细心、分析、完美主义' },
    { name: '天秤座', element: '风', description: '优雅、公正、犹豫' },
    { name: '天蝎座', element: '水', description: '神秘、强烈、多疑' },
    { name: '射手座', element: '火', description: '乐观、自由、冒险' },
    { name: '摩羯座', element: '土', description: '严谨、务实、隐忍' },
    { name: '水瓶座', element: '风', description: '创新、独立、疏离' },
    { name: '双鱼座', element: '水', description: '浪漫、梦幻、依赖' },
  ]

  return (
    <Layout title="云师">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🔮</div>
          <h1 className={styles.title}>十二星座运势</h1>
          <p className={styles.subtitle}>星座命盘，运势指引</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>十二星座详情</h2>
          <div className={styles.cardGrid}>
            {zodiacs.map((z, i) => (
              <div key={z.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.cardHeader}>
                  <span className={styles.starName}>{z.name}</span>
                  <span className={styles.starIndex}>{z.element}</span>
                </div>
                <p className={styles.cardDesc}>{z.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
