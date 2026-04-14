/**
 * ============================================================================
 *                        灵墟档案馆 - 隐藏式侧边导航组件
 * ============================================================================
 * 
 * 【组件定位】
 * 这是整个网站最酷的导航设计！
 * 藏在页面最左侧，平时只露出一个"道"字按钮
 * 点击后展开 天地玄黄宇宙洪荒 8大模块全部呈现眼前
 * 
 * 【设计理念】
 * ✨ 沉浸式体验：不占用页面空间，保持背景的视觉纯净
 * ✨ 仪式感：点击符文旋转展开，满满的修仙问道的感觉
 * ✨ 智能感知：子页面显示返回键、当前位置一目了然
 * 
 * 【技术栈】
 * ✅ Framer Motion - 所有动画效果都是这个库做的！
 * ✅ useRef - 优化滚动监听，不卡页面
 * ✅ usePathname - 自动识别当前在哪个页面
 * ✅ useCallback - 缓存函数，避免不必要重渲染
 * 
 * 【核心功能：
 * 1. 🔘 符文触发按钮 + 旋转动画
 * 2. 📂 8大模块展开/收起动画
 * 3. ✅ 当前页面高亮 + 脉动圆点标记
 * 4. 🔙 子页面显示"返回上级"按钮
 * 5. 🖱️ 点击链接自动收起菜单
 */

'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from './HiddenNav.module.scss'

/**
 * 📚 整个网站的内容架构！
 * 
 * 天地玄黄，宇宙洪荒
 * 八个字，就是整个中华传统文化的八个维度
 * 每个字下面有4个子页面，共32个页面
 */
const MODULES = [
  // 🌤️ 天部 - 天时天象
  { key: '天', href: '/tian', label: '天 · 天象', sub: [
    { name: '星宿', href: '/tian/xingxiu' },  // 二十八星宿
    { name: '运势', href: '/tian/yunshi' },    // 每日运势
    { name: '节气', href: '/tian/jieqi' },      // 二十四节气
    { name: '占卜', href: '/tian/zhanbu' }        // 在线占卜
  ] },
  // 🌍 地部 - 地理风水
  { key: '地', href: '/di', label: '地 · 地理', sub: [
    { name: '地理', href: '/di/dili' },         // 九州地理
    { name: '罗盘', href: '/di/luopan' },       // 风水罗盘
    { name: '龙脉', href: '/di/longmai' },      // 中华龙脉
    { name: '风水', href: '/di/fengshui' }     // 阴阳宅风水
  ] },
  // 🔮 玄部 - 玄学术数
  { key: '玄', href: '/xuan', label: '玄 · 玄学', sub: [
    { name: '易经', href: '/xuan/yijing' },     // 易经六十四卦
    { name: '八字', href: '/xuan/bazi' },       // 生辰八字算命
    { name: '六爻', href: '/xuan/liuyao' },       // 六爻起卦
    { name: '符箓', href: '/xuan/fulu' }        // 道家符箓
  ] },
  // 📜 黄部 - 历史传承
  { key: '黄', href: '/lishi', label: '黄 · 历史', sub: [
    { name: '朝代', href: '/lishi/chaodai' },   // 历代王朝
    { name: '人物', href: '/lishi/renwu' },      // 历史人物
    { name: '秘辛', href: '/lishi/mixin' },     // 历史秘辛
    { name: '文献', href: '/lishi/wenxian' }      // 古籍文献
  ] },
  // 🌌 宇部 - 空间维度
  { key: '宇', href: '/yu', label: '宇 · 空间', sub: [
    { name: '三界', href: '/yu/sanjie' },       // 天地人三界设定
    { name: '洞天', href: '/yu/dongtian' },     // 洞天福地
    { name: '维度', href: '/yu/weidu' },       // 多维空间
    { name: '秘境', href: '/yu/mijie' }          // 神秘空间
  ] },
  // ⏳ 宙部 - 时间法则
  { key: '宙', href: '/zhou', label: '宙 · 时间', sub: [
    { name: '轮回', href: '/zhou/lunhui' },      // 六道轮回
    { name: '因果', href: '/zhou/yinguo' },      // 因果法则
    { name: '预言', href: '/zhou/yuce' },         // 各种预言
    { name: '时光', href: '/zhou/shiguang' }     // 时间长河
  ] },
  // 🐉 洪部 - 洪荒上古
  { key: '洪', href: '/hong', label: '洪 · 洪荒', sub: [
    { name: '神兽', href: '/hong/shenshou' },    // 山海经神兽
    { name: '妖魔', href: '/hong/yaomo' },      // 妖魔鬼怪
    { name: '传说', href: '/hong/chuanshuo' },   // 洪荒传说
    { name: '图腾', href: '/hong/tushu' }         // 氏族图腾
  ] },
  // 🗝️ 荒部 - 失落传承
  { key: '荒', href: '/huang-lost', label: '荒 · 失落', sub: [
    { name: '功法', href: '/huang-lost/gongfa' },  // 修炼功法
    { name: '丹药', href: '/huang-lost/danyao' }, // 炼丹配方
    { name: '法宝', href: '/huang-lost/fabao' },  // 法宝图鉴
    { name: '秘境', href: '/huang-lost/mishi' }   // 秘境地图
  ] },
]

export default function HiddenNav() {
  // ==================== 状态管理 ====================
  
  //  菜单是否展开
  const [isExpanded, setIsExpanded] = useState(false)
  
  // 🧭 我现在在哪一页？比如：/tian/xingxiu
  const pathname = usePathname()
  // 🔀 跳转工具
  const router = useRouter()

  // ==================== 智能判断 ====================
  
  // 🔍 智能判断：是不是子页面？
  // 是子页面就要显示"返回上级"按钮
  const pathSegments = pathname.split('/').filter(Boolean)
  const isSubPage = pathSegments.length > 1
  const parentPath = isSubPage ? '/' + pathSegments[0] : '/home'

  // ==================== 事件处理函数 ====================
  
  /**
   * 🖱️ 点击导航链接后的动作：自动把菜单收起来
   * 用 useCallback 缓存，不然每次渲染都新建一个函数
   */
  const handleLinkClick = useCallback(() => {
    setIsExpanded(false)
  }, [])

  /**
   * 🔙 返回上级页面，同时收起菜单
   */
  const handleBack = useCallback(() => {
    router.push(parentPath)
    setIsExpanded(false)
  }, [router, parentPath])

  /**
   * 🔄 切换展开/收起状态
   * 用 useCallback 缓存，避免每次重渲染
   */
  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  // ==================== 渲染 - 全是动画！====================
  return (
    /**
     * 🎬 整个导航的入场动画
     * 从左边 -100px 位置滑入
     * 不是瞬移，是优雅地滑进来！
     */
    <motion.nav
      className={styles.nav}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
          {/*
           * ✨ 最核心的触发按钮
           * 上面有"道"字按钮
           * 这个设计的灵魂！
           */}
          <motion.button
            className={`${styles.trigger} ${isExpanded ? styles.active : ''}`}
            onClick={toggleExpand}
            whileHover={{ scale: 1.1 }}    // 悬停放大
            whileTap={{ scale: 0.95 }}     // 按下去缩小
            aria-label="导航菜单"
          >
            {/*
             * 🔄 符文旋转动画
             * 展开的时候转180度！
             */}
            <motion.div
              className={styles.triggerRune}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              ◈
            </motion.div>
            {/*
             * 📝 "道"字渐变消失
             * 展开的时候向左淡出
             */}
            <motion.span
              className={styles.triggerText}
              animate={{ opacity: isExpanded ? 0 : 1, x: isExpanded ? -10 : 0 }}
            >
              道
            </motion.span>
          </motion.button>

          {/*
           * 📂 菜单展开动画
           * 宽度从0开始变宽
           * 就像拉开画卷一样！
           */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className={styles.menu}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {/*
                 * 📋 菜单头部
                 * 如果在子页面，显示返回按钮
                 */}
                <div className={styles.menuHeader}>
                {isSubPage && (
                  <button className={styles.menuBack} onClick={handleBack}>
                    ← 返回上级
                  </button>
                )}
                <span className={styles.menuTitle}>天地玄黄 · 宇宙洪荒</span>
              </div>

              {/*
               * 🌟 8大模块，错峰入场！
               * 每一个模块延迟 0.05 秒
               * 像波浪一样依次出现，满满的仪式感
               */}
              <div className={styles.modules}>
                {MODULES.map((module, i) => (
                  <motion.div
                    key={module.key}
                    // ✅ 如果在这个模块或者子页面，高亮
                    className={`${styles.module} ${pathname === module.href || pathname.startsWith(module.href + '/') ? styles.active : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    // ⏱️ 第1个0秒，第2个0.05秒...依次出来
                    transition={{ delay: i * 0.05 }}
                  >
                    {/* 模块主链接 */}
                    <Link href={module.href} className={styles.moduleLink} onClick={handleLinkClick}>
                      <span className={styles.moduleKey}>{module.key}</span>
                      <span className={styles.moduleLabel}>{module.label}</span>
                    </Link>

                    {/*
                     * 📍 4个子页面按钮
                     * 小点在当前页面有●金色圆点脉动动画
                     */}
                    <div className={styles.subModules}>
                      {module.sub.map((sub) => (
                        <Link 
                          key={sub.name} 
                          href={sub.href} 
                          className={`${styles.subModule} ${pathname === sub.href ? styles.subModuleActive : ''}`}
                          onClick={handleLinkClick}
                        >
                          {/* ✨ 你在这里！金色圆点脉动动画 */}
                          {pathname === sub.href && <span className={styles.subModuleDot}>●</span>}
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 🏠 菜单最底部：返回首页 */}
              <div className={styles.menuFooter}>
                <Link href="/home" className={styles.homeLink} onClick={handleLinkClick}>
                  ↳ 返回灵墟首页
                </Link>
              </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
  )
}