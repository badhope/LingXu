'use client'

import { motion } from 'framer-motion'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import SubmoduleCard from '@/components/ui/SubmoduleCard'
import { FadeIn } from '@/components/ui/Animated'
import { COLORS } from '@/styles/tokens'
import styles from './index.module.scss'

const SUB_MODULES = [
  { id: 'liangjie', name: '量劫', icon: '💥', desc: '无量量劫，开天辟地，五劫轮回', href: '/hong/liangjie', color: '#ef4444', isNew: true },
  { id: 'moshen', name: '魔神', icon: '👿', desc: '混沌魔神，三千大道，盘古开天', href: '/hong/moshen', color: '#7c3aed', isNew: true },
  { id: 'pangu', name: '开天', icon: '🪓', desc: '盘古开天，混沌演化', href: '/hong/pangu', color: '#f59e0b', isNew: true },
  { id: 'chuanshuo', name: '传说', icon: '📖', desc: '上古神话，三皇五帝', href: '/hong/chuanshuo' },
  { id: 'shenshou', name: '神兽', icon: '🦅', desc: '青龙白虎，朱雀玄武', href: '/hong/shenshou' },
  { id: 'yaomo', name: '妖魔', icon: '👹', desc: '妖魔鬼怪，山海奇谈', href: '/hong/yaomo' },
  { id: 'tushu', name: '图书', icon: '📜', desc: '山海经，搜神记', href: '/hong/tushu' },
  { id: 'tools', name: '工具', icon: '🔮', desc: '山海经异兽图鉴', href: '/hong/tools' },
]

const CHAOS_DEMONS = [
  { name: '盘古', dao: '力之大道', rank: 1, feature: '开天辟地，力证大道', icon: '🪓', status: '身化万物' },
  { name: '扬眉', dao: '空间大道', rank: 2, feature: '先盘古而生，空心杨柳', icon: '🌳', status: '逍遥混沌外' },
  { name: '罗睺', dao: '杀戮大道', rank: 3, feature: '魔道始祖，诛仙阵主', icon: '🔱', status: '道消身死' },
  { name: '鸿钧', dao: '仙道', rank: 4, feature: '道祖，合道天道', icon: '👴', status: '合道天道' },
  { name: '时辰', dao: '时间大道', rank: 5, feature: '时间之主，岁月如梭', icon: '⏰', status: '开天黑莲' },
  { name: '乾坤', dao: '空间大道', rank: 6, feature: '乾坤鼎主，炼就至宝', icon: '🏺', status: '开天陨落' },
  { name: '苍穹', dao: '天之道', rank: 7, feature: '执掌苍天，俯瞰众生', icon: '🌌', status: '开天陨落' },
  { name: '混沌', dao: '混沌大道', rank: 8, feature: '混沌本源，万物之始', icon: '🌑', status: '身殒道消' },
]

const HONGHUANG_SAINTS = [
  { name: '太上老君', position: '大师兄', dao: '道德天尊', feature: '无为而治，人教教主', icon: '☯️', palace: '八景宫' },
  { name: '元始天尊', position: '二师兄', dao: '阐教教主', feature: '顺天应人，斩将封神', icon: '⚡', palace: '玉虚宫' },
  { name: '通天教主', position: '三师弟', dao: '截教教主', feature: '有教无类，万仙来朝', icon: '🗡️', palace: '碧游宫' },
  { name: '女娲娘娘', position: '师妹', dao: '娲皇', feature: '抟土造人，炼石补天', icon: '💃', palace: '娲皇宫' },
  { name: '接引道人', position: '西方教主', dao: '阿弥陀佛', feature: '金莲渡世，佛门大兴', icon: '🌼', palace: '极乐世界' },
  { name: '准提道人', position: '西方副教主', dao: '菩提祖师', feature: '七宝妙树，度化有缘', icon: '🌳', palace: '灵台方寸山' },
]

const HONGHUANG_FORCES = [
  { name: '天庭', leader: '玉皇大帝', location: '九天之上', members: '亿万天兵天将', feature: '统御三界，执掌天条', icon: '🏛️', color: '#3b82f6' },
  { name: '阐教', leader: '元始天尊', location: '昆仑山玉虚宫', members: '十二金仙', feature: '顺天应人，斩将封神', icon: '⚡', color: '#f59e0b' },
  { name: '截教', leader: '通天教主', location: '金鳌岛碧游宫', members: '万仙来朝', feature: '有教无类，万仙大阵', icon: '🗡️', color: '#22c55e' },
  { name: '人教', leader: '太上老君', location: '首阳山八景宫', members: '玄都大法师', feature: '无为而治，教化人族', icon: '☯️', color: '#78716c' },
  { name: '佛门', leader: '接引准提', location: '西方极乐', members: '三千佛陀', feature: '慈悲为怀，普度众生', icon: '🙏', color: '#fbbf24' },
  { name: '巫族', leader: '十二祖巫', location: '盘古殿', members: '亿万巫民', feature: '肉身成圣，以力证道', icon: '💀', color: '#a855f7' },
  { name: '妖族', leader: '帝俊太一', location: '上古天庭', members: '亿万妖众', feature: '周天星斗，屠戮众生', icon: '🦅', color: '#ec4899' },
  { name: '人族', leader: '三皇五帝', location: '九州大地', members: '万万亿人', feature: '天地主角，自强不息', icon: '👤', color: '#06b6d4' },
]

const FIVE_CALAMITIES = [
  { name: '开天劫', era: '混沌末期', result: '盘古开天，魔神陨落', desc: '盘古持开天斧劈开混沌，三千魔神死伤殆尽，盘古身化万物', color: '#7c3aed' },
  { name: '龙汉初劫', era: '太古初期', result: '三族衰落，隐退不出', desc: '龙凤麒麟三族争霸洪荒，杀劫笼罩，三族元气大伤从此隐退', color: '#3b82f6' },
  { name: '巫妖大战', era: '太古中期', result: '巫妖同归于尽', desc: '巫妖二族征战不休，决战于不周山，两败俱伤退出洪荒舞台', color: '#ef4444' },
  { name: '封神大劫', era: '上古末期', result: '截教覆灭，诸神归位', desc: '阐截二教相争，诛仙阵破，三百六十五位正神归位天庭', color: '#f59e0b' },
  { name: '西游量劫', era: '中古时期', result: '佛法东传，佛教大兴', desc: '玄奘西天取经，九九八十一难，佛法传遍东土，佛门大兴', color: '#22c55e' },
]

const XIANTIAN_LINGBAO = [
  { name: '太极图', owner: '太上老君', level: '先天至宝', power: '定地水火风', icon: '☯️' },
  { name: '盘古幡', owner: '元始天尊', level: '先天至宝', power: '撕裂混沌', icon: '🚩' },
  { name: '混沌钟', owner: '东皇太一', level: '先天至宝', power: '镇压时空', icon: '🔔' },
  { name: '诛仙四剑', owner: '通天教主', level: '先天至宝', power: '非圣不可破', icon: '⚔️' },
  { name: '乾坤鼎', owner: '女娲娘娘', level: '先天至宝', power: '炼石补天', icon: '🏺' },
  { name: '十二品莲台', owner: '接引道人', level: '先天至宝', power: '防御无双', icon: '🪷' },
  { name: '山河社稷图', owner: '女娲娘娘', level: '先天灵宝', power: '内有乾坤', icon: '🗺️' },
  { name: '河图洛书', owner: '伏羲', level: '先天灵宝', power: '推衍天机', icon: '📜' },
]

export default function HongIndexPage() {
  return (
    <SubPageTemplate title="洪荒" colorRgb="255, 120, 60">
      <div className={styles.container}>
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className={styles.heroIcon}
            animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            🔥
          </motion.div>
          <h1 className={`xian-title ${styles.heroTitle}`}>洪荒</h1>
          <p className={styles.heroSubtitle}>开天辟地 · 神话传说 · 山海异兽</p>
          <p style={{ textAlign: 'center', color: 'rgba(180, 180, 190, 0.7)', maxWidth: 600, margin: '1rem auto 0', lineHeight: 1.8 }}>
            天地玄黄，宇宙洪荒。盘古开天，身化万物。
            三大量劫，诸圣争雄。人族崛起，成为天地主角！
          </p>
        </motion.div>

        <section>
          <h2 className="xian-title" style={{ textAlign: 'center', margin: '3rem 0 2rem' }}>洪荒世界</h2>
          <div className={styles.grid}>
            {SUB_MODULES.map((mod, index) => (
              <SubmoduleCard
                key={mod.id}
                title={mod.name}
                description={mod.desc}
                href={mod.href}
                icon={mod.icon}
                index={index}
              />
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 className="xian-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>🌑 混沌八大魔神</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', maxWidth: 1000, margin: '0 auto' }}>
            {CHAOS_DEMONS.map((demon, i) => (
              <FadeIn key={demon.name} scale={0.9} delay={i * 0.08}>
                <motion.div
                  style={{
                    padding: '1.25rem',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(40, 40, 50, 0.9))',
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                  }}
                  whileHover={{ y: -3 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2rem' }}>{demon.icon}</span>
                    <div>
                      <h4 style={{ fontWeight: 700, color: COLORS.purple }}>{demon.name}</h4>
                      <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>No.{demon.rank} 魔神</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                    <span style={{ color: '#7c3aed' }}>执掌：</span>{demon.dao}
                  </div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '0.3rem' }}>✨ {demon.feature}</div>
                  <div style={{ fontSize: '0.7rem', color: demon.status.includes('陨落') ? COLORS.red : COLORS.green }}>
                    📍 {demon.status}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 className="xian-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>🌟 洪荒六大圣人</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: 1000, margin: '0 auto' }}>
            {HONGHUANG_SAINTS.map((saint, i) => (
              <FadeIn key={saint.name} y={20} delay={i * 0.1}>
                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(40, 40, 50, 0.9))',
                    border: '1px solid rgba(251, 191, 36, 0.25)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{saint.icon}</div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: COLORS.gold, marginBottom: '0.3rem' }}>{saint.name}</h4>
                  <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '0.3rem' }}>{saint.position} · {saint.dao}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '0.3rem' }}>🏛️ {saint.palace}</div>
                  <div style={{ fontSize: '0.7rem', color: COLORS.gold }}>✨ {saint.feature}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 className="xian-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>⚔️ 五大量劫</h2>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {FIVE_CALAMITIES.map((calamity, i) => (
              <FadeIn key={calamity.name} x={-10} delay={i * 0.12}>
                <div style={{
                  position: 'relative',
                  padding: '1.25rem',
                  marginBottom: '1rem',
                  borderRadius: '12px',
                  background: `linear-gradient(90deg, ${calamity.color}15, rgba(40, 40, 50, 0.9))`,
                  borderLeft: `4px solid ${calamity.color}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontWeight: 700, color: calamity.color }}>{calamity.name}</h4>
                    <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{calamity.era}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem', color: calamity.color }}>
                    💥 {calamity.result}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8, lineHeight: 1.7 }}>{calamity.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 className="xian-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>🏛️ 洪荒八大势力</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', maxWidth: 1000, margin: '0 auto' }}>
            {HONGHUANG_FORCES.map((force, i) => (
              <FadeIn key={force.name} scale={0.95} delay={i * 0.08}>
                <motion.div
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${force.color}15, rgba(40, 40, 50, 0.9))`,
                    border: `1px solid ${force.color}40`,
                    textAlign: 'center',
                  }}
                  whileHover={{ y: -3 }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{force.icon}</div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: force.color, marginBottom: '0.5rem' }}>{force.name}</h4>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '0.3rem' }}>👑 {force.leader}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.3rem' }}>📍 {force.location}</div>
                  <div style={{ fontSize: '0.75rem', color: force.color }}>✨ {force.feature}</div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 className="xian-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>🏆 先天至宝</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', maxWidth: 1000, margin: '0 auto' }}>
            {XIANTIAN_LINGBAO.map((bao, i) => (
              <FadeIn key={bao.name} y={15} delay={i * 0.08}>
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(40, 40, 50, 0.9))',
                    border: '1px solid rgba(168, 85, 247, 0.25)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{bao.icon}</div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: COLORS.purple, marginBottom: '0.25rem' }}>{bao.name}</h4>
                  <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '0.25rem' }}>持有者：{bao.owner}</div>
                  <div style={{ fontSize: '0.7rem', color: COLORS.gold, marginBottom: '0.25rem' }}>【{bao.level}】</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>威力：{bao.power}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div style={{ height: '4rem' }}></div>
      </div>
    </SubPageTemplate>
  )
}
