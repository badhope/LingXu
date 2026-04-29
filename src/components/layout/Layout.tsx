/**
 * ============================================================================
 *                           灵墟档案馆 - 主布局组件
 * ============================================================================
 * 
 * 【组件定位】
 * 这是整个网站的"外壳"组件，所有页面都必须嵌套在这个组件里面
 * 相当于给每一页套上统一的"包装"：背景 + 导航 + 返回键 + 页脚
 * 
 * 【技术栈】
 * ✅ React + TypeScript       - 基础框架
 * ✅ Next.js Head             - SEO 页面元信息
 * ✅ Framer Motion            - 动画效果（返回键的淡入淡出）
 * ✅ useRouter/usePathname    - 路由判断和页面跳转
 * 
 * 【核心功能】
 * 1. 统一的史诗级星空背景
 * 2. 左侧隐藏式导航目录
 * 3. 子页面自动显示返回按钮
 * 4. 全局统一的页脚
 * 5. 页面 SEO 元标签注入
 */

'use client'

import React, { useEffect, useState, ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/constants'
import { withBase } from '@/lib/utils'
import styles from './Layout.module.scss'

// 🔄 组件依赖 - WebGL史诗级星空背景
import WebGLStarryBackground from '@/components/background/WebGLStarryBackground'
// ✨ 组件依赖 - 仙气流光Canvas效果
import ImmortalFlowCanvas from '@/components/effects/ImmortalFlowCanvas'
// 🧭 组件依赖 - 左侧隐藏式导航菜单
import HiddenNav from './HiddenNav'
// 📍 常驻顶部导航栏
import { TopNavigation } from './TopNavigation'
// 👇 统一底部操作栏
import { BottomActionBar } from './BottomActionbar'
// ⌨️ 全局键盘快捷键
import { KeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

/**
 * 【配置项】布局组件可接收的参数
 * 
 * @param children      - 必填：各个页面自己的内容（被套在中间）
 * @param title         - 可选：页面标题，显示在浏览器标签上
 * @param description   - 可选：页面描述，用于SEO
 * @param showNav       - 可选：是否显示导航，默认true
 * @param showFooter    - 可选：是否显示页脚，默认true
 * @param transparentNav - 可选：导航透明模式（暂时没用）
 */
interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  showNav?: boolean
  showFooter?: boolean
  transparentNav?: boolean
  parentPath?: string
}

export default function Layout({
  children,
  title,
  description,
  showNav = true,
  showFooter = true,
  transparentNav = false,
  parentPath: customParentPath,
}: LayoutProps) {
  // ==================== 路由与状态 ====================
  
  // 🧭 获取当前路径（比如 /tian/xingxiu）
  // 🔀 编程式跳转工具 + 路径获取
  const router = useRouter()
  const pathname = router.pathname

  // ==================== ✅ 终极特效残留清除 - 绝杀！ ====================
  useEffect(() => {
    const { destroyAllCanvasOnPage } = require('@/lib/utils')
    router.events.on('routeChangeStart', destroyAllCanvasOnPage)
    return () => router.events.off('routeChangeStart', destroyAllCanvasOnPage)
  }, [router])
  
  // 📜 滚动状态 - 用户是否往下滚动了（暂时没用）
  const [isScrolled, setIsScrolled] = useState(false)
  // 📱 移动端菜单开关（暂时没用）
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // ==================== 智能返回键逻辑 - 彻底重写！====================
  
  // 🔍 全站结构定义 - 解决核心BUG！
  const ROOT_PAGES = ['', '/', '/home', '/map', '/about', '/user', '/vip', '/overview', '/xiuzhen']  // ✅ 真正的首页，没有上级
  const MODULE_HOMES = ['/tian', '/di', '/xuan', '/lishi', '/yu', '/zhou', '/hong', '/huang2', '/huang-lost', '/tools']  // ✅ 模块首页
  
  const pathSegments = pathname.split('/').filter(Boolean)
  const cleanPath = '/' + pathSegments.join('/')
  
  // ✅ 真正的子页面判断 - 只有深度2的才显示返回键
  const isRootPage = ROOT_PAGES.includes(pathname) || ROOT_PAGES.includes(cleanPath)
  const isModuleHome = MODULE_HOMES.includes('/' + pathSegments[0]) && pathSegments.length === 1
  const isSubPage = !isRootPage && !isModuleHome && pathSegments.length > 0
  
  // 🎯 返回目标：用户指定 > 模块首页 > 首页
  const targetModuleHome = '/' + (pathSegments[0] || 'home')
  const parentPath = customParentPath ?? (MODULE_HOMES.includes(targetModuleHome) ? targetModuleHome : '/home')
  
  // ==================== 事件监听 ====================
  
  /**
   * 👀 滚动监听 - 检测用户是否滚动了页面
   * 可以用来做滚动时的UI变化（比如导航栏变色）
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // ==================== 配置常量 ====================
  
  /**
   * 🧭 8大模块导航链接
   * 天地玄黄，宇宙洪荒 - 对应中华传统文化的八个维度
   */
  const navLinks = [
    { href: '/home', label: '首页' },
    { href: '/tian', label: '天时' },      // 天象、星宿、运势
    { href: '/di', label: '地理' },        // 风水、龙脉、罗盘
    { href: '/xuan', label: '玄学' },      // 易经、八字、六爻
    { href: '/lishi', label: '历史' },     // 朝代、人物、秘辛
    { href: '/yu', label: '空间' },        // 三界、洞天、维度
    { href: '/zhou', label: '时间' },      // 轮回、因果、预言
    { href: '/hong', label: '洪荒' },      // 神兽、妖魔、传说
    { href: '/huang2', label: '太古' }, // 祖巫部落、山海异兽
  ]
  
  // 📄 SEO - 页面标题和描述
  const pageTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.name
  const pageDescription = description || SITE_CONFIG.description
  
  // ==================== 渲染结构 ====================
  return (
    <>
      {/*
       * 📋 HEAD 区域 - 浏览器和搜索引擎需要的元信息
       * 这些不会显示在页面上，但非常重要！
       */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={SITE_CONFIG.keywords.join(', ')} />
        <meta name="author" content={SITE_CONFIG.author} />
        <meta name="theme-color" content="#f0e6d3" />
        
        {/* Facebook/微信分享时显示的卡片信息 */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_CONFIG.url} />
        
        {/* Twitter分享卡片 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        {/* 图标 */}
        <link rel="icon" href={withBase('/favicon.ico')} />
        <link rel="apple-touch-icon" href={withBase('/apple-touch-icon.png')} />
        
        {/* 预连接字体服务器，加速字体加载 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      
      {/*
       * ⌨️ 全局键盘快捷键
       * ESC返回 / 空格炼丹 / 回车悟道 / H首页 / M地图 / T天时 / D地理 / X玄学
       */}
      <KeyboardShortcuts />
      
      {/*
       * 🌌 WebGL背景层 - z-index: 0
       * 整个网站最底层的史诗级星空动画
       * WebGL实时渲染 3000 颗带深度星星 + 3层程序化星云 + 着色器特效
       */}
      <div className={styles.backgroundLayer}>
        <WebGLStarryBackground />
      </div>
      
      {/*
       * ✨ 仙气流光层 - z-index: 1
       * Canvas实时渲染仙气流光粒子
       * 鼠标移动产生法力波纹和仙气粒子
       */}
      <ImmortalFlowCanvas />
      
      {/*
       * 🧭 隐藏式导航目录 - z-index: 1000
       * 在页面最左侧，点击"道"字展开全部导航
       */}
      {showNav && <HiddenNav />}
      
      {/*
       * 📍 常驻顶部导航栏 - z-index: 1000
       * 所有页面统一渲染，首页只是透明，不消失，防止Layout抖动！
       */}
      <div style={{ 
        opacity: router.pathname === '/' ? 0 : 1,
        pointerEvents: router.pathname === '/' ? 'none' : 'auto',
        transition: 'opacity 0.3s ease',
      }}>
        <TopNavigation />
      </div>
      
      {/*
       * 👇 统一底部操作栏 - z-index: 999
       * 同样永远渲染，首页透明隐藏
       */}
      <div style={{ 
        opacity: router.pathname === '/' ? 0 : 1,
        pointerEvents: router.pathname === '/' ? 'none' : 'auto',
        transition: 'opacity 0.3s ease',
      }}>
        <BottomActionBar />
      </div>
      
      {/*
       * 🔙 子页面返回按钮 - z-index: 950
       * ⚠️ 无退场动画！避免与Canvas清理时序冲突造成特效残留！
       * 位置：左上角固定
       */}
      <AnimatePresence>
        {isSubPage && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
            className={styles.backButton}
            onClick={() => {
              if (typeof window !== 'undefined' && window.history.length > 2) {
                router.back()  // ✅ 真正的浏览器后退！
              } else {
                router.push(parentPath)  // 兜底：去模块首页
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.backIcon}>←</span>
            <span className={styles.backText}>返回</span>
          </motion.button>
        )}
      </AnimatePresence>
      
      {/*
       * 📄 主内容区域
       * 各个页面自己的内容都渲染在这里
       * 如果有返回键，自动往左偏移让出空间
       */}
      <main className={`${styles.main} ${!showNav ? styles.noNav : ''} ${isSubPage ? styles.withBackButton : ''}`}>
        {children}
      </main>

      {/*
       * ⬆️ 回到顶部按钮
       * 滚动超过 300px 时自动显示
       */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            className={styles.scrollTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            title="御剑飞升（回到顶部）"
          >
            ↟
          </motion.button>
        )}
      </AnimatePresence>
      
      {/*
       * 🦶 页脚 - 网站最底部
       * 显示版权信息和链接
       */}
      {showFooter && (
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <span className={styles.footerLogoChar}>灵</span>
              <span className={styles.footerLogoChar}>墟</span>
            </div>
            <p className={styles.footerText}>
              末法时代 · 失落修行文明档案馆
            </p>
            <p className={styles.footerSubtext}>
              © 2024-{new Date().getFullYear()} 灵墟档案馆 · 开源免费 · 仅供娱乐
            </p>
            <div className={styles.footerLinks}>
              <Link href="/about">关于</Link>
              <a href="https://github.com/badhope/LingXu" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </footer>
      )}
    </>
  )
}