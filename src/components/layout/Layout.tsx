'use client'

import React, { useEffect, useState, ReactNode } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/constants'
import styles from './Layout.module.scss'

import WebGLStarryBackground from '@/components/background/WebGLStarryBackground'
import ImmortalFlowCanvas from '@/components/effects/ImmortalFlowCanvas'
import { TabGroup } from './TabGroup'
import { KeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

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
  parentPath: customParentPath,
}: LayoutProps) {
  const router = useRouter()
  const pathname = router.pathname

  useEffect(() => {
    const { destroyAllCanvasOnPage } = require('@/lib/utils')
    router.events.on('routeChangeStart', destroyAllCanvasOnPage)
    return () => router.events.off('routeChangeStart', destroyAllCanvasOnPage)
  }, [router])

  const [isScrolled, setIsScrolled] = useState(false)

  const ROOT_PAGES = ['', '/', '/home', '/map', '/about', '/user', '/vip', '/overview', '/xiuzhen', '/mofa', '/weilai']
  const MODULE_HOMES = ['/tian', '/di', '/xuan', '/lishi', '/yu', '/zhou', '/hong', '/huang2', '/huang-lost', '/tools']

  const pathSegments = pathname.split('/').filter(Boolean)
  const cleanPath = '/' + pathSegments.join('/')

  const isRootPage = ROOT_PAGES.includes(pathname) || ROOT_PAGES.includes(cleanPath)
  const isModuleHome = MODULE_HOMES.includes('/' + pathSegments[0]) && pathSegments.length === 1
  const isSubPage = !isRootPage && !isModuleHome && pathSegments.length > 0

  const targetModuleHome = '/' + (pathSegments[0] || 'home')
  const parentPath = customParentPath ?? (MODULE_HOMES.includes(targetModuleHome) ? targetModuleHome : '/home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const pageTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.name

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta property="og:title" content={pageTitle} />
        {description && <meta property="og:description" content={description} />}
      </Head>

      <KeyboardShortcuts />

      <div className={styles.layout}>
        <WebGLStarryBackground />
        <ImmortalFlowCanvas />

        <div className={styles.globalNav}>
          <TabGroup />
        </div>

        <AnimatePresence mode="wait">
          {isSubPage && (
            <motion.div
              key="back-button"
              className={styles.backButton}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => router.push(parentPath)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← 返回
            </motion.div>
          )}
        </AnimatePresence>

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  )
}
