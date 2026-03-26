/**
 * 灵墟 - 地理模块 - 风水页面
 */

import Layout from '@/components/layout/Layout'
import styles from '../tian/SubPage.module.scss'

export default function FengshuiPage() {
  const principles = [
    { title: '龙穴', desc: '风水学认为，好的住宅应当坐落于龙脉聚集之处，即所谓的"龙穴"。龙穴之地，气场旺盛，利于居住者的运势。' },
    { title: '砂水', desc: '"砂"指住宅周围的山丘，"水"指河流湖泊。理想的格局是：左有青龙，右有白虎，前有朱雀，后有玄武。' },
    { title: '向法', desc: '住宅的朝向至关重要。坐北朝南被认为是最佳朝向，可以吸纳充足的阳光和正能量。' },
    { title: '气场', desc: '风水学重视气场的流动。气流宜缓不宜急，宜聚不宜散。好的风水应当让气流在住宅周围缓缓流动。' },
  ]

  const tips = [
    { title: '大门', good: '门口开阔，光线充足', bad: '正对墙角、直路' },
    { title: '客厅', good: '位于房屋中央，光线明亮', bad: '位于角落，昏暗狭窄' },
    { title: '卧室', good: '位置安静，窗户朝东', bad: '正对厨房、卫生间' },
    { title: '厨房', good: '位于东方或东南方', bad: '位于房屋正中' },
    { title: '卫生间', good: '位于房屋角落，保持整洁', bad: '位于房屋正中' },
  ]

  return (
    <Layout title="风水">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🏠</div>
          <h1 className={styles.title}>风水堪舆</h1>
          <p className={styles.subtitle}>藏风聚气，得水为上</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>风水基础</h2>
          <div className={styles.cardGrid}>
            {principles.map((p, i) => (
              <div key={p.title} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>住宅风水宜忌</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {tips.map((tip, i) => (
              <div key={tip.title} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 style={{ color: '#c9a227', marginBottom: '1rem', fontSize: '1.1rem' }}>{tip.title}</h3>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ color: '#4ade80', fontSize: '0.85rem' }}>✓ 宜：</span>
                  <span style={{ color: '#888', fontSize: '0.85rem' }}>{tip.good}</span>
                </div>
                <div>
                  <span style={{ color: '#f87171', fontSize: '0.85rem' }}>✗ 忌：</span>
                  <span style={{ color: '#888', fontSize: '0.85rem' }}>{tip.bad}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>五行与方位</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>
              风水学与五行密切相关。东方属木，青龙位；南方属火，朱雀位；
              西方属金，白虎位；北方属水，玄武位；中央属土。
              根据主人的命理五行，可以调整住宅各区域的功能布局。
            </p>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(5, 1fr)', 
            gap: '1rem', 
            marginTop: '1.5rem' 
          }}>
            {[
              { direction: '东', element: '木', color: '#4ade80', virtue: '仁' },
              { direction: '南', element: '火', color: '#f87171', virtue: '礼' },
              { direction: '西', element: '金', color: '#94a3b8', virtue: '义' },
              { direction: '北', element: '水', color: '#60a5fa', virtue: '智' },
              { direction: '中', element: '土', color: '#fbbf24', virtue: '信' },
            ].map((item) => (
              <div key={item.direction} style={{
                padding: '1.5rem',
                background: 'rgba(26, 26, 46, 0.3)',
                border: '1px solid rgba(201, 162, 39, 0.1)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', color: item.color, marginBottom: '0.5rem' }}>{item.direction}</div>
                <div style={{ color: '#c9a227', fontWeight: 500 }}>{item.element}</div>
                <div style={{ color: '#888', fontSize: '0.8rem', marginTop: '0.25rem' }}>五常：{item.virtue}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
