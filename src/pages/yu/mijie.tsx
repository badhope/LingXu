/**
 * 灵墟 - 空间模块 - 秘界页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function MijiePage() {
  const secrets = [
    { name: '昆仑秘境', desc: '位于昆仑山深处，常人难以进入。内有瑶池仙境，是西王母所居之地。', danger: '高' },
    { name: '瑶池仙境', desc: '昆仑秘境深处，灵气浓度极高。传说有蟠桃树，三千年一熟。', danger: '中' },
    { name: '东海龙宫', desc: '位于东海海底水晶宫，四海龙王管辖。藏有无数海底珍宝。', danger: '中' },
    { name: '蓬莱仙境', desc: '位于渤海之中，方丈、瀛洲、蓬莱三岛并列。仙人居所。', danger: '低' },
    { name: '地府幽冥', desc: '位于地下深处，十殿阎罗管辖。阴阳两界交汇之所。', danger: '高' },
    { name: '归墟之地', desc: '位于大海最深之处，万水归流之所。传说为天地尽头。', danger: '极高' },
  ]

  return (
    <Layout title="秘界">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>✨</div>
          <h1 className={styles.title}>隐秘空间</h1>
          <p className={styles.subtitle}>结界之地，隐秘之界</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>秘境概论</h2>
          <div className={styles.infoBox}>
            <p>
              在灵墟世界中，有许多被强大结界隐藏的空间，普通人终其一生也无法得见。
              这些秘境或由上古大能开辟，或天然形成于灵气汇聚之地，或被后天布置了强大的阵法结界。
              每处秘境都有其独特的规则和危险，进入之前必须做好充分准备。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>著名秘境</h2>
          <div className={styles.cardGrid}>
            {secrets.map((s, i) => (
              <div key={s.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.5rem' }}>{s.name}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
                <p style={{ color: s.danger === '极高' || s.danger === '高' ? '#ef4444' : '#888', fontSize: '0.8rem', marginTop: '0.5rem' }}>危险等级：{s.danger}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
