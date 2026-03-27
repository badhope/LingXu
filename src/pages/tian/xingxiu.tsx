/**
 * 灵墟 - 天时模块 - 星宿页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function XingxiuPage() {
  const stars = [
    { name: '角宿', element: '木', animal: '蛟', meaning: '东方第一宿，主苍龙之角' },
    { name: '亢宿', element: '金', animal: '龙', meaning: '第二宿，为苍龙颈项' },
    { name: '氐宿', element: '土', animal: '貉', meaning: '第三宿，为苍龙之胸' },
    { name: '房宿', element: '日', animal: '兔', meaning: '第四宿，为苍龙腹部' },
    { name: '心宿', element: '火', animal: '狐', meaning: '第五宿，为苍龙心脏' },
    { name: '尾宿', element: '火', animal: '虎', meaning: '第六宿，为苍龙之尾' },
    { name: '箕宿', element: '木', animal: '豹', meaning: '第七宿，为苍龙之尾尖' },
  ]

  return (
    <Layout title="星宿">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>⭐</div>
          <h1 className={styles.title}>二十八星宿</h1>
          <p className={styles.subtitle}>三垣四象二十八宿，亘古星辰映射命途</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>东方苍龙七宿</h2>
          <div className={styles.cardGrid}>
            {stars.map((star, index) => (
              <div key={star.name} className={styles.card} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={styles.cardHeader}>
                  <span className={styles.starName}>{star.name}</span>
                  <span className={styles.starIndex}>#{index + 1}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.attribute}>
                    <span className={styles.label}>五行</span>
                    <span className={styles.value}>{star.element}</span>
                  </div>
                  <div className={styles.attribute}>
                    <span className={styles.label}>对应的动物</span>
                    <span className={styles.value}>{star.animal}</span>
                  </div>
                </div>
                <p className={styles.cardDesc}>{star.meaning}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
