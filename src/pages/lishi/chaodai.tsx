/**
 * 灵墟 - 历史模块 - 朝代页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function ChaodaiPage() {
  const dynasties = [
    { name: '夏', period: '约前2070-前1600', founder: '大禹', capital: '阳城、斟鄩、安邑', feature: '中国第一个世袭制朝代' },
    { name: '商', period: '前1600-前1046', founder: '成汤', capital: '亳、殷', feature: '甲骨文与青铜器文明' },
    { name: '周', period: '前1046-前256', founder: '周武王', capital: '镐京、洛邑', feature: '分封制与礼乐制度' },
    { name: '秦', period: '前221-前207', founder: '秦始皇', capital: '咸阳', feature: '统一六国，书同文' },
    { name: '汉', period: '前202-220', founder: '刘邦', capital: '长安、洛阳', feature: '奠定中华文明基础' },
    { name: '三国', period: '220-280', founder: '曹丕、刘备、孙权', capital: '洛阳、成都、建业', feature: '英雄辈出的时代' },
    { name: '隋', period: '581-618', founder: '杨坚', capital: '大兴、洛阳', feature: '开创科举与大运河' },
    { name: '唐', period: '618-907', founder: '李渊', capital: '长安', feature: '中华文明巅峰' },
    { name: '宋', period: '960-1279', founder: '赵匡胤', capital: '开封、临安', feature: '经济文化繁荣' },
    { name: '元', period: '1271-1368', founder: '忽必烈', capital: '大都', feature: '疆域空前辽阔' },
    { name: '明', period: '1368-1644', founder: '朱元璋', capital: '南京、北京', feature: '郑和下西洋' },
    { name: '清', period: '1644-1912', founder: '皇太极', capital: '北京', feature: '最后一个封建王朝' },
  ]

  return (
    <Layout title="朝代">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>👑</div>
          <h1 className={styles.title}>历史朝代</h1>
          <p className={styles.subtitle}>千古兴亡，朝代更迭</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>中华朝代时间轴</h2>
          <div className={styles.cardGrid}>
            {dynasties.map((dynasty, i) => (
              <div key={dynasty.name} className={styles.card} style={{ animationDelay: `${i * 0.05}s` }}>
                <div className={styles.cardHeader}>
                  <span className={styles.starName}>{dynasty.name}</span>
                  <span className={styles.starIndex}>{dynasty.period}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.attribute}>
                    <span className={styles.label}>开国君主</span>
                    <span className={styles.value}>{dynasty.founder}</span>
                  </div>
                  <div className={styles.attribute}>
                    <span className={styles.label}>都城</span>
                    <span className={styles.value}>{dynasty.capital}</span>
                  </div>
                </div>
                <p className={styles.cardDesc}>{dynasty.feature}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>修仙历史背景</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              在灵墟的世界观中，每一个朝代都有修仙者的身影。
              夏商周时期，修仙文化初兴，众多方士炼丹求仙；
              秦汉之际，徐福东渡寻求仙药；
              魏晋之时，玄学大兴，名士清谈，老庄之道盛行；
              唐代修真者众多，道教鼎盛；
              宋元时期，全真教兴起，内丹术流行；
              明清以后，灵气渐衰，修仙者转入隐秘...
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}
