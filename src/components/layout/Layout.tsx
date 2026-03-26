/**
 * 灵墟 - 主布局组件
 * LingXu Main Layout
 */

'use client'

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/constants'
import { withBase } from '@/lib/utils'
import styles from './Layout.module.scss'

// 背景组件
import StarsBackground from '@/components/background/StarsBackground'
import OrbitBackground from '@/components/background/OrbitBackground'

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
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // 导航链接
  const navLinks = [
    { href: '/home', label: '首页' },
    { href: '/tian', label: '天时' },
    { href: '/di', label: '地理' },
    { href: '/xuan', label: '玄学' },
    { href: '/lishi', label: '历史' },
    { href: '/yu', label: '空间' },
    { href: '/zhou', label: '时间' },
    { href: '/hong', label: '洪荒' },
    { href: '/huang-lost', label: '失落' },
  ]
  
  const pageTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.name
  const pageDescription = description || SITE_CONFIG.description
  
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={SITE_CONFIG.keywords.join(', ')} />
        <meta name="author" content={SITE_CONFIG.author} />
        <meta name="theme-color" content="#0a0a0f" />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_CONFIG.url} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        {/* Favicon */}
        <link rel="icon" href={withBase('/favicon.ico')} />
        <link rel="apple-touch-icon" href={withBase('/apple-touch-icon.png')} />
        
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      
      {/* 背景层 */}
      <div className={styles.backgroundLayer}>
        <StarsBackground />
        <OrbitBackground />
      </div>
      
      {/* 导航栏 */}
      <AnimatePresence>
        {showNav && (
          <motion.header
            className={`${styles.header} ${isScrolled || !transparentNav ? styles.scrolled : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className={styles.navContainer}>
              {/* Logo */}
              <Link href="/home" className={styles.logo}>
                <span className={styles.logoChar}>灵</span>
                <span className={styles.logoChar}>墟</span>
              </Link>
              
              {/* 桌面导航 */}
              <nav className={styles.desktopNav}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              {/* 移动端菜单按钮 */}
              <button
                className={styles.menuButton}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="菜单"
              >
                <span className={`${styles.menuIcon} ${mobileMenuOpen ? styles.open : ''}`} />
              </button>
              
              {/* 移动端导航 */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.nav
                    className={styles.mobileNav}
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ duration: 0.3 }}
                  >
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`${styles.mobileNavLink} ${pathname === link.href ? styles.active : ''}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.nav>
                )}
              </AnimatePresence>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
      
      {/* 主内容 */}
      <main className={`${styles.main} ${!showNav ? styles.noNav : ''}`}>
        {children}
      </main>
      
      {/* 页脚 */}
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
              <Link href="/changelog">更新日志</Link>
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
