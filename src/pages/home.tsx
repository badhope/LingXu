/**
 * ============================================================================
 *                           灵墟档案馆 - 首页
 * ============================================================================
 * 
 * 【页面定位】
 * 这是用户进入网站看到的第一个页面！
 * 整个网站的门面，仪式感的入口
 * 
 * 【视觉设计】
 * ✨ 巨型单字设计：靈 + 墟，居中震撼展示
 * ✨ 道德经开篇：道生一，一生二...逐字显现
 * ✨ 八大模块：天地玄黄宇宙洪荒，排成网格
 * ✨ 视差滚动：滚动时Hero区域渐隐消失
 * ✨ 种子随机：SSR和客户端粒子位置一致
 * 
 * 【⚠️ 代码债务 - 待修复】
 * 🐛 MODULES数组与 constants.ts 中的 MAIN_MODULES 重复定义！
 *    应该统一引用 MAIN_MODULES，不要硬编码第二遍
 * 
 * 【核心技术】
 * ✅ Framer Motion useScroll 视差滚动
 * ✅ CSS Grid 响应式模块卡片
 * ✅ seededRandom 种子随机（消除SSR hydration mismatch）
 * ✅ Google Fonts - Noto Serif SC 宋体
 */

'use client'

import { MAIN_MODULES } from '@/lib/constants'
import { useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import XianxiaCard from '@/components/ui/XianxiaCard'
import { SEO } from '@/components/common/SEO'
import { PullToRefresh } from '@/hooks/useTouchGestures'
import styles from './home.module.scss'

/** 确定性伪随机（SSR/客户端一致，无 Hydration Mismatch） */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 43758.5453
  return x - Math.floor(x)
}

/** 生成固定粒子数据 */
function generateParticles() {
  return Array.from({ length: 30 }, (_, i) => ({
    left: `${seededRandom(i * 7 + 1) * 100}%`,
    top: `${seededRandom(i * 7 + 2) * 100}%`,
    width: `${2 + seededRandom(i * 7 + 3) * 4}px`,
    height: `${2 + seededRandom(i * 7 + 4) * 4}px`,
    delay: seededRandom(i * 7 + 5) * 3,
    duration: 3 + seededRandom(i * 7 + 6) * 4,
    yDist: 30 + seededRandom(i * 7 + 7) * 50,
    id: i,
  }))
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50])

  const particles = useMemo(() => generateParticles(), [])

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  const daoDeQuotes = [
    { text: '道生一', delay: 0.5 },
    { text: '一生二', delay: 1.2 },
    { text: '二生三', delay: 1.9 },
    { text: '三生万物', delay: 2.6 },
  ]

  return (
    <Layout showNav={true} transparentNav={true} showFooter={true}>
      <SEO
        title="灵墟档案馆"
        description="末法时代失落修行文明档案馆 - 收录中华玄学、历史、天文、地理等修真文化，探索天地玄黄宇宙洪荒的奥秘"
        keywords={["修仙", "玄学", "易经", "八字", "风水", "星宿", "历史", "修真", "传统文化", "灵墟", "末法时代"]}
      />
      <PullToRefresh onRefresh={() => window.location.reload()}>
        <div ref={containerRef} className={styles.container}>
        {/* Hero */}
        <motion.section className={styles.hero} style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}>
          <div className={styles.heroContent}>
            <motion.div className={styles.heroRune} animate={{ rotate: [0, 360], opacity: [0.5, 1, 0.5] }} transition={{ rotate: { duration: 60, repeat: Infinity, ease: 'linear' }, opacity: { duration: 4, repeat: Infinity } }}>
              ☯
            </motion.div>

            <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
              靈<span className={styles.titleSeparator}>　　</span>墟
            </motion.h1>

            <motion.div className={styles.heroSubtitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
              <span>末法时代 · 失落修行文明档案馆</span>
            </motion.div>

            <motion.div className={styles.scrollIndicator} initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.8, duration: 1 }}>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>↓</motion.div>
              <span>向下探索</span>
            </motion.div>
          </div>

          {/* 固定粒子 */}
          <div className={styles.particles}>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className={styles.particle}
                style={{ left: p.left, top: p.top, width: p.width, height: p.height }}
                animate={{ y: [0, -p.yDist], opacity: [0, 0.8, 0] }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.section>

        {/* 哲学 */}
        <section className={styles.philosophySection}>
          <motion.div className={styles.philosophyContent} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-200px' }} transition={{ duration: 2, ease: 'easeOut' }}>
            <motion.blockquote className={styles.quote} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-200px' }} transition={{ duration: 2.5, delay: 0.3, ease: 'easeOut' }}>
              {daoDeQuotes.map((q) => (
                <motion.span key={q.text} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: q.delay, duration: 1 }}>
                  {q.text}<br />
                </motion.span>
              ))}
            </motion.blockquote>
            <motion.p className={styles.quoteSource} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 3.5, duration: 1.5 }}>
              —— 道德经 · 第二十五章
            </motion.p>
          </motion.div>
        </section>

        {/* 模块 */}
        <section className={styles.modulesSection}>
          <motion.div className={styles.sectionHeader} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}>
            <div className={styles.sectionTitleRow}>
              <span className={styles.sectionDivider} />
              <h2 className={styles.sectionTitle}>天地玄黄 · 宇宙洪荒</h2>
              <span className={styles.sectionDivider} />
            </div>
            <p className={styles.sectionSubtitle}>八字开启灵墟档案馆，探索失落的修行世界</p>
          </motion.div>

          <div 
            className={styles.modulesGrid}
            style={{ 
              perspective: '2000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {MAIN_MODULES.map((module, index) => (
              <XianxiaCard
                key={module.char}
                char={module.char}
                title={module.name}
                description={module.description}
                href={'/' + module.id}
                index={index}
              />
            ))}
          </div>

          {/* 🗺️ 新增: 快速入口区域 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            style={{ marginTop: '3rem' }}
          >
            <div className={styles.quickNavTitle}>⚡ 快速传送阵</div>
            <div className={styles.quickNavGrid}>
              <Link href="/map" className={styles.quickNavItem}>
                <span className={styles.quickNavIcon}>🗺️</span>
                <span>全站地图</span>
                <span className={styles.quickNavDesc}>47 个页面</span>
              </Link>
              <Link href="/about" className={styles.quickNavItem}>
                <span className={styles.quickNavIcon}>📖</span>
                <span>关于灵墟</span>
                <span className={styles.quickNavDesc}>档案馆介绍</span>
              </Link>
              <Link href="/tian/xingxiu" className={styles.quickNavItem}>
                <span className={styles.quickNavIcon}>⭐</span>
                <span>二十八星宿</span>
                <span className={styles.quickNavDesc}>28星宿详解</span>
              </Link>
              <Link href="/di/fengshui" className={styles.quickNavItem}>
                <span className={styles.quickNavIcon}>☯️</span>
                <span>风水绝学</span>
                <span className={styles.quickNavDesc}>15种形煞化解</span>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* 📊 档案馆大数据 */}
        <section className={styles.statsSection}>
          <motion.div 
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.sectionTitleRow}>
              <span className={styles.sectionDivider} />
              <h2 className={styles.sectionTitle}>📊 档案馆大数据</h2>
              <span className={styles.sectionDivider} />
            </div>
            <p className={styles.sectionSubtitle}>千年传承，万古修为，尽在此间</p>
          </motion.div>

          <div className={styles.statsGrid}>
            {[
              { number: '32', label: '修真子系统', icon: '🏛️', suffix: '套' },
              { number: '2,847', label: '收录典籍', icon: '📚', suffix: '部' },
              { number: '896', label: '修真功法', icon: '📜', suffix: '种' },
              { number: '472', label: '秘术传承', icon: '✨', suffix: '门' },
              { number: '1,234', label: '天材地宝', icon: '💎', suffix: '品' },
              { number: '∞', label: '大道无涯', icon: '🌌', suffix: '' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className={styles.statItem}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statNumber}>
                  {stat.number}
                  <span className={styles.statSuffix}>{stat.suffix}</span>
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🌟 今日悟道 */}
        <section className={styles.enlightenSection}>
          <motion.div
            className={styles.enlightenCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className={styles.enlightenTitle}>🌟 今日悟道偈语</div>
            <motion.blockquote 
              className={styles.enlightenQuote}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              "道可道，非常道。名可名，非常名。<br/>
              无名天地之始，有名万物之母。"
            </motion.blockquote>
            <div className={styles.enlightenAuthor}>—— 道德经 · 第一章</div>
            
            <motion.button 
              className={styles.enlightenBtn}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201, 162, 39, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              ✨ 随机悟道
            </motion.button>
          </motion.div>
        </section>

        {/* 🚀 最近飞升记录 */}
        <section className={styles.updatesSection}>
          <motion.div 
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.sectionTitleRow}>
              <span className={styles.sectionDivider} />
              <h2 className={styles.sectionTitle}>🚀 最近飞升记录</h2>
              <span className={styles.sectionDivider} />
            </div>
            <p className={styles.sectionSubtitle}>灵墟档案馆功德榜</p>
          </motion.div>

          <div className={styles.updatesTimeline}>
            {[
              { date: '甲辰年戊辰月', title: '宇宙洪荒四部曲 · 圆满', desc: '宇·宙·洪·荒 32大系统全部上线', type: 'feat' },
              { date: '甲辰年丁卯月', title: '荒部 · 太古蛮荒', desc: '十二祖巫、山海经异兽、太古部落 现世', type: 'feat' },
              { date: '甲辰年丙寅月', title: '洪部 · 开天辟地', desc: '盘古开天、混沌魔神、无量量劫 降临', type: 'feat' },
              { date: '甲辰年乙丑月', title: '宙部 · 时光长河', desc: '穿越时空，扭转因果，轮回往生', type: 'feat' },
              { date: '甲辰年甲子月', title: '宇部 · 三千大世界', desc: '三界六道，洞天福地，维度攀升', type: 'feat' },
            ].map((update, i) => (
              <motion.div
                key={update.title}
                className={styles.updateItem}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ x: 10 }}
              >
                <div className={styles.updateBadge}>
                  {update.type === 'feat' ? '✨' : '🔧'}
                </div>
                <div className={styles.updateContent}>
                  <div className={styles.updateDate}>{update.date}</div>
                  <div className={styles.updateTitle}>{update.title}</div>
                  <div className={styles.updateDesc}>{update.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 💫 修真者寄语 */}
        <section className={styles.epilogueSection}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <div className={styles.epilogueContent}>
              <motion.div 
                className={styles.epilogueBigChar}
                animate={{ 
                  textShadow: [
                    '0 0 30px rgba(201, 162, 39, 0.5)',
                    '0 0 60px rgba(201, 162, 39, 0.8)',
                    '0 0 30px rgba(201, 162, 39, 0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                道
              </motion.div>
              <p className={styles.epilogueText}>
                修真之路，漫漫其修远兮。<br/>
                愿尔等在此间，寻得真我，证得大道。<br/><br/>
                —— 灵墟阁主 手札
              </p>
              <motion.div 
                className={styles.epilogueSignature}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚯
              </motion.div>
            </div>
          </motion.div>
        </section>
        </div>
      </PullToRefresh>
    </Layout>
  )
}
