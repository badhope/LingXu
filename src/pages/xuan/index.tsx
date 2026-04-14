/**
 * ============================================================================
 *                             玄 部 - 玄学模块首页
 * ============================================================================
 * 
 * 【模块定位】
 * 玄部 - 玄学秘术，探赜索隐，钩深致远
 * 这是整个网站8大模块的第三个，对应"天地玄黄"的"玄"
 * 
 * 【核心内容】
 * ✨ 易经 - 六十四卦，天人合一
 * ✨ 八字 - 四柱命理，五行生克
 * ✨ 六爻 - 铜钱起卦，预知吉凶
 * ✨ 符箓 - 道教符箓，祝由十三科
 * 
 * 【⚠️ BUG发现！】
 * 🐛 这个页面的 Canvas 粒子代码完全重复了 PageBackground！
 *    应该：<PageBackground colorRgb="201, 162, 39">{children}</PageBackground>
 *    不应该：自己把 PageBackground 的源码又抄了一遍
 * 
 * 【代码债务】
 * 其他7个模块首页都用 PageBackground 组件，只有这个自己写了
 * 需要统一重构！
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import PageBackground from '@/components/layout/PageBackground'
import styles from './ModuleIndex.module.scss'

/**
 * ⚠️ 同样重复！应该从 constants.ts 导入 SUB_MODULES
 */
const SUB_MODULES = [
  { 
    id: 'yijing', 
    name: '易经', 
    icon: '☯', 
    desc: '六十四卦，天人合一',
    href: '/xuan/yijing',
    color: '#c9a227'
  },
  { 
    id: 'bazi', 
    name: '八字', 
    icon: '❋', 
    desc: '四柱命理，五行生克',
    href: '/xuan/bazi',
    color: '#ffaa66'
  },
  { 
    id: 'liuyao', 
    name: '六爻', 
    icon: '☲', 
    desc: '铜钱起卦，预知吉凶',
    href: '/xuan/liuyao',
    color: '#ff6666'
  },
  { 
    id: 'fulu', 
    name: '符箓', 
    icon: '⚡', 
    desc: '道教符箓，祝由十三科',
    href: '/xuan/fulu',
    color: '#cc66ff'
  },
]

export default function XuanIndexPage() {
  return (
    <Layout title="玄学">
      <PageBackground colorRgb="201, 162, 39">
        <div className={styles.container}>

        <section className={styles.heroSection}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <motion.div 
              className={styles.heroIcon}
              animate={{ 
                rotate: [0, 360],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                opacity: { duration: 4, repeat: Infinity }
              }}
            >
              ☯
            </motion.div>
            
            <h1 className={styles.mainTitle}>玄</h1>
            
            <motion.p 
              className={styles.subTitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <span>易经八卦 · 奇门遁甲 · 通神明之德</span>
            </motion.p>
          </motion.div>
        </section>

        <section className={styles.modulesSection}>
          <div className={styles.modulesGrid}>
            {SUB_MODULES.map((module, index) => (
              <motion.div
                key={module.id}
                className={styles.moduleCard}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1 + index * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.4 }
                }}
              >
                <Link href={module.href} className={styles.moduleLink}>
                  <div 
                    className={styles.moduleGlow}
                    style={{ 
                      background: `radial-gradient(circle at center, ${module.color}40 0%, transparent 70%)` 
                    }}
                  />
                  
                  <motion.div 
                    className={styles.moduleIcon}
                    animate={{ 
                      textShadow: [
                        `0 0 10px ${module.color}`,
                        `0 0 30px ${module.color}`,
                        `0 0 10px ${module.color}`
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      delay: index * 0.2,
                      repeat: Infinity 
                    }}
                  >
                    {module.icon}
                  </motion.div>

                  <h3 className={styles.moduleName}>{module.name}</h3>
                  
                  <p className={styles.moduleDesc}>
                    {module.desc}
                  </p>

                  <motion.div 
                    className={styles.moduleArrow}
                    animate={{ x: [0, 8, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.15
                    }}
                  >
                    →
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
        </div>
      </PageBackground>
    </Layout>
  )
}
