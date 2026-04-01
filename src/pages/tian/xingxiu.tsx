/**
 * 灵墟 - 天时模块 - 星宿页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function XingxiuPage() {
  const constellations = [
    {
      title: '东方苍龙七宿',
      icon: '🐉',
      stars: [
        { name: '角宿', element: '木', animal: '蛟', meaning: '东方第一宿，主苍龙之角' },
        { name: '亢宿', element: '金', animal: '龙', meaning: '第二宿，为苍龙颈项' },
        { name: '氐宿', element: '土', animal: '貉', meaning: '第三宿，为苍龙之胸' },
        { name: '房宿', element: '日', animal: '兔', meaning: '第四宿，为苍龙腹部' },
        { name: '心宿', element: '火', animal: '狐', meaning: '第五宿，为苍龙心脏' },
        { name: '尾宿', element: '火', animal: '虎', meaning: '第六宿，为苍龙之尾' },
        { name: '箕宿', element: '木', animal: '豹', meaning: '第七宿，为苍龙之尾尖' },
      ]
    },
    {
      title: '北方玄武七宿',
      icon: '🐢',
      stars: [
        { name: '斗宿', element: '木', animal: '獬', meaning: '北方第一宿，主玄武之首' },
        { name: '牛宿', element: '金', animal: '牛', meaning: '第二宿，为玄武之颈' },
        { name: '女宿', element: '土', animal: '蝠', meaning: '第三宿，为玄武之胸' },
        { name: '虚宿', element: '日', animal: '鼠', meaning: '第四宿，为玄武之腹' },
        { name: '危宿', element: '火', animal: '燕', meaning: '第五宿，为玄武之心' },
        { name: '室宿', element: '火', animal: '猪', meaning: '第六宿，为玄武之尾' },
        { name: '壁宿', element: '木', animal: '蝓', meaning: '第七宿，为玄武之尾尖' },
      ]
    },
    {
      title: '西方白虎七宿',
      icon: '🐅',
      stars: [
        { name: '奎宿', element: '木', animal: '狼', meaning: '西方第一宿，主白虎之首' },
        { name: '娄宿', element: '金', animal: '狗', meaning: '第二宿，为白虎之颈' },
        { name: '胃宿', element: '土', animal: '雉', meaning: '第三宿，为白虎之胸' },
        { name: '昴宿', element: '日', animal: '鸡', meaning: '第四宿，为白虎之腹' },
        { name: '毕宿', element: '火', animal: '乌', meaning: '第五宿，为白虎之心' },
        { name: '觜宿', element: '火', animal: '猴', meaning: '第六宿，为白虎之尾' },
        { name: '参宿', element: '木', animal: '猿', meaning: '第七宿，为白虎之尾尖' },
      ]
    },
    {
      title: '南方朱雀七宿',
      icon: '🦅',
      stars: [
        { name: '井宿', element: '木', animal: '犴', meaning: '南方第一宿，主朱雀之首' },
        { name: '鬼宿', element: '金', animal: '羊', meaning: '第二宿，为朱雀之颈' },
        { name: '柳宿', element: '土', animal: '獐', meaning: '第三宿，为朱雀之胸' },
        { name: '星宿', element: '日', animal: '马', meaning: '第四宿，为朱雀之腹' },
        { name: '张宿', element: '火', animal: '鹿', meaning: '第五宿，为朱雀之心' },
        { name: '翼宿', element: '火', animal: '蛇', meaning: '第六宿，为朱雀之尾' },
        { name: '轸宿', element: '木', animal: '蚓', meaning: '第七宿，为朱雀之尾尖' },
      ]
    }
  ]

  return (
    <Layout title="星宿">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>⭐</div>
          <h1 className={styles.title}>二十八星宿</h1>
          <p className={styles.subtitle}>三垣四象二十八宿，亘古星辰映射命途</p>
        </header>

        {constellations.map((group, groupIndex) => (
          <section key={group.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span style={{ marginRight: '0.5rem' }}>{group.icon}</span>
              {group.title}
            </h2>
            <div className={styles.cardGrid}>
              {group.stars.map((star, index) => (
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
        ))}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>星宿概论</h2>
          <div className={styles.infoBox}>
            <p>
              二十八星宿是中国古代天文学的重要组成部分，将天球赤道附近的恒星分为二十八个星区，
              每七宿组成一象，共四象：东方苍龙、北方玄武、西方白虎、南方朱雀。
            </p>
            <p style={{ marginTop: '1rem' }}>
              古人认为，天上的星宿与地上的人事相对应，通过观测星宿的变化可以预测吉凶祸福。
              二十八星宿不仅用于天文历法，还广泛应用于风水、命理、占卜等领域。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
