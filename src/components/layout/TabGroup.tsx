'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useTheme, ThemeSpace, THEMES } from '@/context/ThemeContext'
import styles from './TabGroup.module.scss'

const THEME_ROUTES: Record<ThemeSpace, string> = {
  honghuang: '/home',
  xiuzhen: '/xiuzhen',
  mofa: '/mofa',
  weilai: '/weilai',
}

export function TabGroup() {
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()
  const { setTheme, themeConfig } = useTheme()

  const handleThemeSelect = (theme: ThemeSpace) => {
    setTheme(theme)
    setIsExpanded(false)
    router.push(THEME_ROUTES[theme])
  }

  return (
    <div className={styles.tabGroup}>
      <motion.button
        className={styles.triggerButton}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          borderColor: themeConfig.glowColor,
          color: themeConfig.primary,
        }}
      >
        {themeConfig.icon}
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.panel}
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              borderColor: themeConfig.glowColor,
            }}
          >
            <div className={styles.section}>
              <div className={styles.sectionTitle}>主题空间</div>
              {(Object.entries(THEMES) as [ThemeSpace, typeof THEMES.honghuang][]).map(([key, config], i) => {
                const isActive = router.pathname === THEME_ROUTES[key] || router.pathname.startsWith(THEME_ROUTES[key] + '/')
                return (
                  <motion.div
                    key={key}
                    className={`${styles.item} ${isActive ? styles.active : ''}`}
                    onClick={() => handleThemeSelect(key)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={isActive ? {
                      background: `linear-gradient(90deg, ${config.glowColor} 0%, transparent 100%)`,
                      borderLeftColor: config.primary,
                    } : {}}
                  >
                    <span className={styles.itemIcon} style={{ color: config.primary }}>{config.icon}</span>
                    <span>{config.name}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
