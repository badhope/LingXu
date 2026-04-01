/**
 * 灵墟 - 失落模块 - 法宝页面
 */

import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function FabaoPage() {
  const shenshen = [
    { name: '盘古斧', owner: '盘古', power: '开天辟地', desc: '上古第一神器，可开天辟地，劈开混沌' },
    { name: '轩辕剑', owner: '黄帝', power: '斩妖除魔', desc: '轩辕黄帝所铸，斩蚩尤，定天下' },
    { name: '东皇钟', owner: '东皇太一', power: '镇压鸿蒙', desc: '先天至宝，可镇压鸿蒙世界' },
    { name: '太极图', owner: '太上老君', power: '包罗万象', desc: '先天至宝，可定地水火风' },
    { name: '盘古幡', owner: '元始天尊', power: '混沌剑气', desc: '先天至宝，可释放混沌剑气' },
    { name: '诛仙四剑', owner: '通天教主', power: '诛仙剑阵', desc: '诛仙剑、戮仙剑、陷仙剑、绝仙剑' },
  ]

  const fabao = [
    { name: '如意金箍棒', owner: '孙悟空', grade: '后天至宝', desc: '重一万三千五百斤，可大可小' },
    { name: '芭蕉扇', owner: '铁扇公主', grade: '先天灵宝', desc: '一扇息火，二扇生风，三扇下雨' },
    { name: '定海神针', owner: '大禹', grade: '后天至宝', desc: '治水时留下的定海神针' },
    { name: '玲珑宝塔', owner: '托塔天王', grade: '后天至宝', desc: '可收妖魔鬼怪' },
    { name: '照妖镜', owner: '二郎神', grade: '中品法宝', desc: '可照出妖魔鬼怪原形' },
    { name: '风火轮', owner: '哪吒', grade: '中品法宝', desc: '可飞天遁地，脚踩而行' },
  ]

  return (
    <Layout title="法宝">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>💎</div>
          <h1 className={styles.title}>神器法宝</h1>
          <p className={styles.subtitle}>上古神器，法力无边</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>法宝概论</h2>
          <div className={styles.infoBox}>
            <p>
              法宝是修仙者的重要辅助手段。一件好的法宝，不仅能提升战斗力，
              更能在关键时刻保命。法宝分为先天法宝和后天法宝两种。先天法宝是天地初开时自然形成，
              后天法宝则是由修仙者后天炼制而成。
            </p>
            <p>
              末法时代，许多天材地宝已经绝迹，许多炼制法宝的秘法也随之失传。
              现在流传下来的法宝，大多是当初的常用法宝，而那些上古神器，
              只在古籍中有记载，早已不知所踪。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>上古神器</h2>
          <div className={styles.cardGrid}>
            {shenshen.map((s, i) => (
              <div key={s.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{s.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{s.owner} · {s.power}</p>
                <p className={styles.cardDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>著名法宝</h2>
          <div className={styles.cardGrid}>
            {fabao.map((f, i) => (
              <div key={f.name} className={styles.card}>
                <h3 style={{ color: '#c9a227', margin: '0 0 0.25rem' }}>{f.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{f.owner} · {f.grade}</p>
                <p className={styles.cardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
