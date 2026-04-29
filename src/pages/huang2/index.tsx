'use client'

import { motion } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import SubmoduleCard from '@/components/ui/SubmoduleCard'
import { FadeIn } from '@/components/ui/Animated'
import styles from './index.module.scss'

const SUB_MODULES = [
  { id: 'zhuqing', name: '祖巫', icon: '💀', desc: '十二祖巫，肉身成圣，称霸大地', href: '/huang2/zhuqing', color: '#22c55e', isNew: true },
  { id: 'yishou', name: '异兽', icon: '🦎', desc: '山海经异兽，蛮荒精怪', href: '/huang2/yishou', color: '#84cc16', isNew: true },
  { id: 'buluo', name: '部落', icon: '🏕️', desc: '太古部落，氏族联盟，巫门传承', href: '/huang2/buluo', color: '#f59e0b', isNew: true },
  { id: 'jingshen', name: '精神', icon: '👁️', desc: '图腾信仰，自然崇拜，万物有灵', href: '/huang2/jingshen', color: '#a855f7', isNew: true },
  { id: 'wuwen', name: '巫文', icon: '🔮', desc: '巫文咒语，符箓秘典，血祭神通', href: '/huang2/wuwen', color: '#ec4899', isNew: true },
  { id: 'dazhan', name: '大战', icon: '⚔️', desc: '巫妖大战，逐鹿之战，封神之战', href: '/huang2/dazhan', color: '#ef4444', isNew: true },
  { id: 'yimin', name: '遗民', icon: '👤', desc: '洪荒遗民，上古血脉，巫门之后', href: '/huang2/yimin', color: '#06b6d4', isNew: true },
  { id: 'tools', name: '工具', icon: '🛠️', desc: '巫卜工具，祭祀法器', href: '/huang2/tools', color: '#78716c', isNew: true },
]

const WU_REALMS = [
  { realm: '凡巫', level: 1, desc: '初入巫门，强身健体', feature: '气血旺盛，力能扛鼎', color: '#78716c' },
  { realm: '精巫', level: 2, desc: '精血凝练，初通神通', feature: '画符念咒，驱邪治病', color: '#22c55e' },
  { realm: '大巫', level: 3, desc: '肉身大成，滴血重生', feature: '肉身成圣，万法不侵', color: '#3b82f6' },
  { realm: '巫王', level: 4, desc: '执掌一方，部落首领', feature: '统领部落，万民臣服', color: '#a855f7' },
  { realm: '巫尊', level: 5, desc: '法则领悟，纵横洪荒', feature: '移山填海，摘星拿月', color: '#f59e0b' },
  { realm: '祖巫', level: 6, desc: '盘古精血，大道化身', feature: '执掌法则，不死不灭', color: '#ef4444' },
]

const HONGHUANG_HISTORY = [
  { epoch: '开天辟地', year: '无量量劫', event: '盘古开天，身化万物', detail: '盘古大神持开天斧劈开混沌，清气上升为天，浊气下沉为地，盘古身化洪荒万物，精血化十二祖巫，元神化三清' },
  { epoch: '龙汉大劫', year: '第一量劫', event: '三族争霸，洪荒破碎', detail: '龙凤麒麟三族争霸洪荒，杀劫笼罩洪荒世界，三族元气大伤，从此隐退不出，洪荒进入巫妖时代' },
  { epoch: '巫妖争霸', year: '第二量劫', event: '巫妖大战，周天星空', detail: '巫妖二族称霸洪荒，妖族管天，巫族管地，二族征战不休，杀劫再起' },
  { epoch: '不周山崩', year: '巫妖末期', event: '共工怒撞，天破地裂', detail: '共工战败怒撞不周山，天柱崩塌，天河之水倒灌洪荒，女娲炼石补天，后土化轮回' },
  { epoch: '巫妖决战', year: '巫妖终战', event: '巫妖同归于尽', detail: '巫妖决战，东皇太一身陨，十二祖巫皆亡，巫妖两族退出洪荒舞台，人族开始兴起' },
  { epoch: '三皇五帝', year: '人族时代', event: '三皇治世，五帝定伦', detail: '人族崛起，三皇治世，五帝定伦，轩辕黄帝斩蚩尤，人族成为洪荒主角' },
  { epoch: '封神之战', year: '第三量劫', event: '商周大战，诸圣封神', detail: '阐截二教相争，截教覆灭，天庭建立，三百六十五位正神归位' },
  { epoch: '西游之路', year: '佛法东传', event: '西天取经，教化众生', detail: '玄奘法师西天取经，九九八十一难，佛法东传，佛教大兴' },
]

const WU_SACRED_PLACES = [
  { name: '盘古殿', location: '盘古心脏所化', master: '十二祖巫', feature: '巫族圣地，精血存放地', icon: '🏛️', color: '#ef4444' },
  { name: '九幽地府', location: '洪荒大地深处', master: '后土祖巫', feature: '六道轮回之所', icon: '🌑', color: '#78716c' },
  { name: '常羊之山', location: '南方蛮荒', master: '刑天部落', feature: '战神陨落之地', icon: '⛰️', color: '#a855f7' },
  { name: '成都载天', location: '北部荒原', master: '夸父部落', feature: '巨人族圣地', icon: '🌄', color: '#f59e0b' },
  { name: '汤谷扶桑', location: '东海之东', master: '雨师妾部落', feature: '十日升起之地', icon: '☀️', color: '#f97316' },
  { name: '幽冥血海', location: '大地极北', master: '冥河教主', feature: '盘古肚脐污血所化', icon: '🩸', color: '#dc2626' },
]

const WU_ANCESTOR_WEAPONS = [
  { name: '盘古斧', owner: '盘古', power: '开天辟地', level: '混沌至宝', icon: '🪓' },
  { name: '诛仙四剑', owner: '通天教主', power: '非圣不可破', level: '先天至宝', icon: '⚔️' },
  { name: '乾坤鼎', owner: '女娲娘娘', power: '炼石补天', level: '先天至宝', icon: '🏺' },
  { name: '十二都天神煞旗', owner: '十二祖巫', power: '凝聚盘古真身', level: '先天至宝', icon: '🚩' },
  { name: '河图洛书', owner: '伏羲女娲', power: '推衍天机', level: '先天灵宝', icon: '📜' },
  { name: '弑神枪', owner: '罗睺', power: '杀戮无双', level: '先天灵宝', icon: '🔱' },
]

export default function HuangIndexPage() {
  return (
    <SubPageTemplate title="荒" colorRgb="34, 197, 94">
      <div className={styles.container}>
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className={styles.heroIcon}
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            🦁
          </motion.div>
          <h1 className={`xian-title ${styles.heroTitle}`}>荒</h1>
          <p className={styles.heroSubtitle}>太古蛮荒 · 祖巫部落 · 山海异兽</p>
          <p style={{ textAlign: 'center', color: 'rgba(180, 180, 190, 0.7)', maxWidth: 600, margin: '1rem auto 0', lineHeight: 1.8 }}>
            盘古开天，身化万物。精血化十二祖巫，掌天地法则，肉身成圣，称霸洪荒大地！
            不尊天道，不修元神，只尊自身己身大道，以力证道！
          </p>
        </motion.div>

        <section>
          <h2 className="xian-title" style={{ textAlign: 'center', margin: '3rem 0 2rem' }}>蛮荒世界</h2>
          <div className={styles.grid}>
            {SUB_MODULES.map((mod, index) => (
              <SubmoduleCard
                key={mod.id}
                title={mod.name}
                description={mod.desc}
                icon={mod.icon}
                href={mod.href}
                index={index}
              />
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 className="xian-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>📜 巫族修炼境界</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', maxWidth: 1000, margin: '0 auto' }}>
            {WU_REALMS.map((realm, i) => (
              <FadeIn key={realm.realm} y={20} delay={i * 0.1}>
                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${realm.color}15, rgba(30, 30, 40, 0.9))`,
                    border: `1px solid ${realm.color}40`,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: realm.color, marginBottom: '0.5rem' }}>
                    Lv.{realm.level}
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{realm.realm}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.3rem' }}>{realm.desc}</div>
                  <div style={{ fontSize: '0.7rem', color: realm.color }}>{realm.feature}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 className="xian-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>⏳ 洪荒历史时间线</h2>
          <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '30px', top: 0, bottom: 0, width: '3px', background: 'linear-gradient(180deg, #22c55e, #f59e0b, #ef4444)', borderRadius: '2px' }}></div>
            {HONGHUANG_HISTORY.map((epoch, i) => (
              <FadeIn key={epoch.epoch} x={-20} delay={i * 0.12}>
                <div style={{ position: 'relative', paddingLeft: '80px', marginBottom: '2rem', paddingBottom: '1rem' }}>
                  <div style={{
                    position: 'absolute',
                    left: '18px',
                    top: '8px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: i < 3 ? '#22c55e' : i < 5 ? '#f59e0b' : '#ef4444',
                    boxShadow: `0 0 20px ${i < 3 ? '#22c55e' : i < 5 ? '#f59e0b' : '#ef4444'}50`,
                    zIndex: 2,
                  }}></div>
                  <div style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    background: 'rgba(40, 40, 50, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: i < 3 ? '#22c55e' : i < 5 ? '#f59e0b' : '#ef4444' }}>
                        {epoch.epoch}
                      </h3>
                      <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{epoch.year}</span>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>{epoch.event}</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.7 }}>{epoch.detail}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 className="xian-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>🏛️ 巫族六大圣地</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', maxWidth: 1000, margin: '0 auto' }}>
            {WU_SACRED_PLACES.map((place, i) => (
              <FadeIn key={place.name} scale={0.9} delay={i * 0.08}>
                <motion.div
                  style={{
                    padding: '1.5rem',
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${place.color}20, rgba(40, 40, 50, 0.9))`,
                    border: `1px solid ${place.color}40`,
                  }}
                  whileHover={{ y: -5, boxShadow: `0 10px 40px ${place.color}30` }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', textAlign: 'center' }}>{place.icon}</div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: place.color, textAlign: 'center', marginBottom: '0.5rem' }}>{place.name}</h4>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8, textAlign: 'center', marginBottom: '0.3rem' }}>📍 {place.location}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6, textAlign: 'center' }}>执掌者：{place.master}</div>
                  <div style={{ fontSize: '0.75rem', color: place.color, textAlign: 'center', marginTop: '0.5rem' }}>✨ {place.feature}</div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 className="xian-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>🏆 洪荒至宝</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: 1000, margin: '0 auto' }}>
            {WU_ANCESTOR_WEAPONS.map((weapon, i) => (
              <FadeIn key={weapon.name} y={20} delay={i * 0.1}>
                <motion.div
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(40, 40, 50, 0.9))',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    textAlign: 'center',
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{weapon.icon}</div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#a855f7', marginBottom: '0.3rem' }}>{weapon.name}</h4>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.3rem' }}>持有者：{weapon.owner}</div>
                  <div style={{ fontSize: '0.75rem', color: '#f59e0b', marginBottom: '0.3rem' }}>【{weapon.level}】</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>威力：{weapon.power}</div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div style={{ height: '4rem' }}></div>
      </div>
    </SubPageTemplate>
  )
}
