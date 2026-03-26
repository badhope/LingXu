/**
 * 灵墟 - 天时模块 - 节气页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function JieqiPage() {
  const solarTerms = [
    { name: '立春', season: '春季', date: '2月4日左右', meaning: '春季开始，万物复苏', advice: '宜养肝护肝，多食酸味食物' },
    { name: '雨水', season: '春季', date: '2月19日左右', meaning: '降雨开始，草木萌动', advice: '宜祛湿健脾，防寒保暖' },
    { name: '惊蛰', season: '春季', date: '3月6日左右', meaning: '春雷惊醒蛰虫', advice: '宜早起运动，振奋阳气' },
    { name: '春分', season: '春季', date: '3月21日左右', meaning: '昼夜平分，春天过半', advice: '宜平衡阴阳，疏肝理气' },
    { name: '清明', season: '春季', date: '4月5日左右', meaning: '天气清朗，春暖花开', advice: '宜踏青扫墓，柔肝养肺' },
    { name: '谷雨', season: '春季', date: '4月20日左右', meaning: '雨水滋润谷物生长', advice: '宜祛湿防潮，健脾利水' },
    { name: '立夏', season: '夏季', date: '5月6日左右', meaning: '夏季开始，气温升高', advice: '宜养心安神，多食苦味' },
    { name: '小满', season: '夏季', date: '5月21日左右', meaning: '麦类籽粒开始饱满', advice: '宜清热利湿，健脾和胃' },
    { name: '芒种', season: '夏季', date: '6月6日左右', meaning: '有芒作物成熟', advice: '宜清热解暑，养护心脏' },
    { name: '夏至', season: '夏季', date: '6月21日左右', meaning: '一年中白昼最长', advice: '宜养心安神，冬病夏治' },
    { name: '小暑', season: '夏季', date: '7月7日左右', meaning: '进入伏天，暑气渐盛', advice: '宜清热解暑，健脾益气' },
    { name: '大暑', season: '夏季', date: '7月23日左右', meaning: '一年中最热的时期', advice: '宜防暑降温，养心安神' },
    { name: '立秋', season: '秋季', date: '8月8日左右', meaning: '秋季开始，暑去凉来', advice: '宜润燥养肺，少辛多酸' },
    { name: '处暑', season: '秋季', date: '8月23日左右', meaning: '暑天结束，秋意渐浓', advice: '宜滋阴润燥，健脾和胃' },
    { name: '白露', season: '秋季', date: '9月8日左右', meaning: '天气转凉，露凝而白', advice: '宜养阴润肺，祛燥邪' },
    { name: '秋分', season: '秋季', date: '9月23日左右', meaning: '昼夜平分，秋天过半', advice: '宜阴阳平衡，收敛神气' },
    { name: '寒露', season: '秋季', date: '10月8日左右', meaning: '露水寒冷', advice: '宜养阴润燥，防寒保暖' },
    { name: '霜降', season: '秋季', date: '10月23日左右', meaning: '开始降霜', advice: '宜进补养身，防寒护膝' },
    { name: '立冬', season: '冬季', date: '11月7日左右', meaning: '冬季开始，万物收藏', advice: '宜温补肾阳，早卧晚起' },
    { name: '小雪', season: '冬季', date: '11月22日左右', meaning: '开始降雪', advice: '宜温补驱寒，养肾防寒' },
    { name: '大雪', season: '冬季', date: '12月7日左右', meaning: '降雪量大增', advice: '宜温阳散寒，保暖防冻' },
    { name: '冬至', season: '冬季', date: '12月22日左右', meaning: '一年中白昼最短', advice: '宜补肾藏精，冬病冬治' },
    { name: '小寒', season: '冬季', date: '1月6日左右', meaning: '进入寒冷时期', advice: '宜温补肾阳，防寒保暖' },
    { name: '大寒', season: '冬季', date: '1月20日左右', meaning: '一年中最冷的时期', advice: '宜温补脾肾，驱寒暖身' },
  ]

  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1
    if (month >= 3 && month <= 5) return '春季'
    if (month >= 6 && month <= 8) return '夏季'
    if (month >= 9 && month <= 11) return '秋季'
    return '冬季'
  }

  const currentSeason = getCurrentSeason()
  const seasonTerms = solarTerms.filter(t => t.season === currentSeason)

  return (
    <Layout title="节气">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🌾</div>
          <h1 className={styles.title}>二十四节气</h1>
          <p className={styles.subtitle}>顺应天时，养生之道</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>当前季节：{currentSeason}</h2>
          <div className={styles.cardGrid}>
            {seasonTerms.map((term, index) => (
              <div key={term.name} className={styles.card} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={styles.cardHeader}>
                  <span className={styles.starName}>{term.name}</span>
                  <span className={styles.starIndex}>{term.date}</span>
                </div>
                <p className={styles.cardDesc} style={{ marginTop: '1rem' }}>{term.meaning}</p>
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  background: 'rgba(201, 162, 39, 0.1)', 
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: '#c9a227'
                }}>
                  {term.advice}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>节气养生</h2>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>饮食调养</h3>
              <p className={styles.cardDesc}>
                节气养生强调"不时不食"，根据节气特点选择当季食材，
                春多酸、夏多苦，秋多辛、冬多咸，以养五脏。
              </p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>起居调摄</h3>
              <p className={styles.cardDesc}>
                顺应节气调整作息，春夏早卧早起，秋冬早卧晚起，
                保证充足睡眠，与自然规律相协调。
              </p>
            </div>
            <div className={styles.card}>
              <h3 style={{ color: '#c9a227', marginBottom: '1rem' }}>运动锻炼</h3>
              <p className={styles.cardDesc}>
                根据节气选择适合的运动方式，春季宜踏青舒展，
                夏季宜游泳避暑，秋季宜登高养肺，冬季宜太极御寒。
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
