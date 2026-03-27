/**
 * 灵墟 - 天时模块 - 云师页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function XunshiPage() {
  const zodiacs = [
    { name: '白羊座', element: '火', date: '3.21-4.19', trait: '热情、直接、有冲劲', stone: '红宝石' },
    { name: '金牛座', element: '土', date: '4.20-5.20', trait: '稳重、实际、执着', stone: '祖母绿' },
    { name: '双子座', element: '风', date: '5.21-6.21', trait: '灵活、好奇、善变', stone: '珍珠' },
    { name: '巨蟹座', element: '水', date: '6.22-7.22', trait: '敏感、体贴、护短', stone: '月光石' },
    { name: '狮子座', element: '火', date: '7.23-8.22', trait: '自信、慷慨、爱表现', stone: '红宝石' },
    { name: '处女座', element: '土', date: '8.23-9.22', trait: '细心、分析、完美主义', stone: '蓝宝石' },
    { name: '天秤座', element: '风', date: '9.23-10.23', trait: '优雅、公正、犹豫', stone: '橄榄石' },
    { name: '天蝎座', element: '水', date: '10.24-11.22', trait: '神秘、强烈、多疑', stone: '蛋白石' },
    { name: '射手座', element: '火', date: '11.23-12.21', trait: '乐观、自由、冒险', stone: '黄玉' },
    { name: '摩羯座', element: '土', date: '12.22-1.19', trait: '严谨、务实、隐忍', stone: '黑曜石' },
    { name: '水瓶座', element: '风', date: '1.20-2.18', trait: '创新、独立、疏离', stone: '石榴石' },
    { name: '双鱼座', element: '水', date: '2.19-3.20', trait: '浪漫、梦幻、依赖', stone: '海蓝宝' },
  ]

  return (
    <Layout title="云师">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🔮</div>
          <h1 className={styles.title}>星象云师</h1>
          <p className={styles.subtitle}>观星望气，预测命运</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>云师概论</h2>
          <div className={styles.infoBox}>
            <p>
              云师是灵墟世界中观测星象、推算命运的修行者流派。他们认为，
              天上的星辰与人的命运息息相关。通过观测星辰的运行、亮度的变化、
              流星的划过，可以推断出人间将要发生的吉凶祸福。
            </p>
            <p>
              云师的修行从辨识星辰开始，继而学习星象推演，最终能够"夜观天象，
              预知天下大势"。高深的云师，甚至可以借助星辰之力来施展法术。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>十二星座详情</h2>
          <div className={styles.cardGrid}>
            {zodiacs.map((z, i) => (
              <div key={z.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{z.name}</h3>
                <p style={{ color: '#888', fontSize: '0.75rem', margin: '0 0 0.5rem' }}>{z.date} | {z.element}</p>
                <p className={styles.cardDesc}>{z.trait}</p>
                <p style={{ color: '#c9a227', fontSize: '0.75rem', marginTop: '0.5rem' }}>幸运石：{z.stone}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
