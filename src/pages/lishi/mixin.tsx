/**
 * 灵墟 - 历史模块 - 秘辛页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function MixinPage() {
  const secrets = [
    { title: '徐福东渡', desc: '秦始皇派徐福率三千童男女出海寻求仙药。徐福最终到达日本，在那里繁衍生息，成为日本文化的开创者。' },
    { title: '老子化胡', desc: '老子骑青牛出函谷关后，西行至印度，化身为佛陀，创立佛教。道教与佛教同源一说由此而来。' },
    { title: '黄帝飞升', desc: '黄帝统一华夏后，在荆山铸鼎，鼎成之日，有龙垂胡须迎黄帝升天。随黄帝升天的还有七十多位大臣。' },
    { title: '封神演义', desc: '商周之际的封神大战，实为阐教与截教之争。众多仙人卷入红尘，姜子牙代天封神，建立天庭秩序。' },
    { title: '建文失踪', desc: '明建文帝朱允炆在靖难之役后失踪。传说他被张三丰救走，入了道门修行。' },
    { title: '张陵创道', desc: '张道陵得太上老君亲授正一盟威符箓，在龙虎山炼成九天神丹，羽化成仙，开创道教正一派。' },
  ]

  return (
    <Layout title="秘辛">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🔐</div>
          <h1 className={styles.title}>历史秘辛</h1>
          <p className={styles.subtitle}>尘封的真相</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>被遗忘的历史</h2>
          <div className={styles.cardGrid}>
            {secrets.map((secret, i) => (
              <div key={secret.title} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>{secret.title}</h3>
                <p className={styles.cardDesc}>{secret.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
