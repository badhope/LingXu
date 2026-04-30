'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const PATH_NAMES: Record<string, string> = {
  'home': '首页',
  'tian': '天时',
  'di': '地理',
  'xuan': '玄学',
  'huang': '历史',
  'lishi': '历史',
  'yu': '空间',
  'zhou': '时间',
  'hong': '洪荒',
  'tools': '炼丹房',
  'xiuzhen': '修真界',
  'map': '全站地图',
  'about': '关于',
  'user': '修行者',
  'vip': 'VIP',
  'overview': '系统',
}

export function BottomActionBar() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const pathParts = pathname?.split('/').filter(Boolean) || []
  const currentPage = pathParts[0] || 'home'
  const subPage = pathParts[1] || ''

  const breadcrumb = [
    { name: '灵墟', href: '/home' },
    ...(currentPage !== 'home' ? [{ name: PATH_NAMES[currentPage] || currentPage, href: `/${currentPage}` }] : []),
    ...(subPage ? [{ name: PATH_NAMES[subPage] || subPage, href: `/${currentPage}/${subPage}` }] : []),
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        boxShadow: scrolled 
          ? '0 -8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(251, 191, 36, 0.06)'
          : '0 -4px 16px rgba(0, 0, 0, 0.2)',
      }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        backdropFilter: scrolled ? 'blur(24px) saturate(150%)' : 'blur(16px)',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(150%)' : 'blur(16px)',
        background: scrolled 
          ? 'linear-gradient(0deg, rgba(15, 23, 42, 0.96) 0%, rgba(15, 23, 42, 0.88) 100%)'
          : 'linear-gradient(0deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.7) 100%)',
        borderTop: scrolled 
          ? '1px solid rgba(251, 191, 36, 0.25)'
          : '1px solid rgba(251, 191, 36, 0.08)',
        height: '64px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          fontSize: '0.95rem',
          background: 'rgba(251, 191, 36, 0.03)',
          padding: '0.5rem 1rem',
          borderRadius: '10px',
          border: '1px solid rgba(251, 191, 36, 0.08)',
        }}>
          <span style={{ color: '#fbbf24', marginRight: '0.25rem' }}>📍</span>
          {breadcrumb.map((item, index) => (
            <div key={item.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {index > 0 && (
                <motion.span 
                  style={{ color: '#475569', fontSize: '0.8rem' }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ❯
                </motion.span>
              )}
              <motion.span
                onClick={() => router.push(item.href)}
                style={{
                  position: 'relative',
                  color: index === breadcrumb.length - 1 ? '#fbbf24' : '#94a3b8',
                  cursor: 'pointer',
                  fontWeight: index === breadcrumb.length - 1 ? 600 : 500,
                  transition: 'all 0.25s ease',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '6px',
                }}
                whileHover={{ 
                  scale: 1.05,
                  background: 'rgba(251, 191, 36, 0.1)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {index === breadcrumb.length - 1 && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '80%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',
                      borderRadius: '1px',
                    }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <motion.button
            onClick={() => router.back()}
            whileHover={{ 
              scale: 1.03,
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.2)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '12px',
              border: '1px solid rgba(251, 191, 36, 0.25)',
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.12) 0%, rgba(251, 191, 36, 0.05) 100%)',
              color: '#f1f5f9',
              fontSize: '0.95rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <motion.span
              animate={{ x: [-1, 0, -1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ←
            </motion.span>
            返回
          </motion.button>

          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                onClick={scrollToTop}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(124, 58, 237, 0.1) 100%)',
                  color: '#f1f5f9',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ↑
                </motion.span>
                顶部
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => router.push('/map')}
            whileHover={{ 
              scale: 1.03,
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{
              padding: '0.625rem 1rem',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.05) 100%)',
              color: '#f1f5f9',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            🗺️
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
