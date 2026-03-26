/**
 * 灵墟 - 地理模块 - 龙脉页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function LongmaiPage() {
  const dragonVeins = [
    { name: '昆仑山系', desc: '万山之祖，龙脉之源', range: '青藏高原', features: '发源于昆仑山脉，向东西南北四方延伸，是天下龙脉的总根。' },
    { name: '北干龙脉', desc: '经黄河至燕京', range: '陕西-山西-河北', features: '从昆仑山发脉，经秦岭过华山、抵黄河、达燕京，护卫中原。' },
    { name: '中干龙脉', desc: '经长江至大海', range: '四川-湖北-江苏', features: '从岷山发脉，渡江入湖广，至江浙入海，钟灵毓秀。' },
    { name: '南干龙脉', desc: '经珠江至南海', range: '云南-贵州-广东', features: '从云贵高原发脉，经两广入南海，人杰地灵。' },
  ]

  const famousMountains = [
    { name: '泰山', location: '山东', element: '木', desc: '五岳之首，帝王封禅之地，气势磅礴' },
    { name: '华山', location: '陕西', element: '金', desc: '奇险天下第一，护佑关中' },
    { name: '衡山', location: '湖南', element: '火', desc: '南岳巍峨，火德之精' },
    { name: '恒山', location: '山西', element: '水', desc: '北岳恒山，阴阳转换' },
    { name: '嵩山', location: '河南', element: '土', desc: '中岳嵩山，天地之中' },
  ]

  return (
    <Layout title="龙脉">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🐉</div>
          <h1 className={styles.title}>中华龙脉</h1>
          <p className={styles.subtitle}>山环水抱，气脉绵长</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>四大干龙</h2>
          <div className={styles.cardGrid}>
            {dragonVeins.map((vein, i) => (
              <div key={vein.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{vein.name}</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>{vein.desc}</p>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ color: '#666', fontSize: '0.8rem' }}>走向：{vein.range}</span>
                </div>
                <p className={styles.cardDesc}>{vein.features}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>五岳名山</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {famousMountains.map((m, i) => (
              <div key={m.name} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ color: '#c9a227', marginBottom: '0.5rem' }}>{m.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{m.location} | {m.element}属性</p>
                <p className={styles.cardDesc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>龙脉寻踪</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>
              风水学认为，龙脉是山的脉络，如同人体经络一般。
              寻龙之法，首重气势连贯，次观山水环抱，再看明堂开阔。
              真正的龙穴之地，往往藏于深山之中，需要慧眼识珠。
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
