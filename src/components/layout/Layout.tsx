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

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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
  children: React.ReactNode
  title?: string
  description?: string
  showNav?: boolean
  showFooter?: boolean
  transparentNav?: boolean
}

export default function Layout({
  children,
  title,
  description,
  showNav = true,
  showFooter = true,
  transparentNav = false,
}: LayoutProps) {
  // ==================== 路由与状态 ====================
  
  // 🧭 获取当前路径（比如 /tian/xingxiu）
  const pathname = usePathname()
  // 🔀 编程式跳转工具
  const router = useRouter()
  
  // 📜 滚动状态 - 用户是否往下滚动了（暂时没用）
  const [isScrolled, setIsScrolled] = useState(false)
  // 📱 移动端菜单开关（暂时没用）
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // ==================== 智能返回键逻辑 ====================
  
  // 🔍 切割URL路径，判断当前页面层级
  // 比如 /tian/xingxiu → ['tian', 'xingxiu'] → 长度2 → 是子页面
  const pathSegments = pathname.split('/').filter(Boolean)
  // ✅ true = 是子页面（需要显示返回键）
  const isSubPage = pathSegments.length > 1
  // 🎯 智能计算要返回的父级页面
  // 比如在 /tian/xingxiu → 返回 /tian
  const parentPath = isSubPage ? '/' + pathSegments[0] : '/home'
  
  // ==================== 事件监听 ====================
  
  /**
   * 👀 滚动监听 - 检测用户是否滚动了页面
   * 可以用来做滚动时的UI变化（比如导航栏变色）
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
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
    { href: '/huang-lost', label: '失落' }, // 功法、丹药、法宝
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
        <meta name="theme-color" content="#0a0a0f" />
        
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
       * 🔙 子页面返回按钮 - z-index: 90
       * 【智能】只有在子页面才显示！
       * Framer Motion 做的动画：等0.3s后从左边滑入
       * 位置：左侧居中，在导航按钮右边
       */}
      <AnimatePresence>
        {isSubPage && (
          <motion.button
            // 入场动画：从上方-20位置滑入（符合左上角位置）
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className={styles.backButton}
            onClick={() => router.push(parentPath)}
            // 悬停放大效果
            whileHover={{ scale: 1.05 }}
            // 点击缩小反馈
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.backIcon}>↞</span>
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