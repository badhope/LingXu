'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { id: 'home', name: '首页', href: '/home', icon: '🏠' },
  { id: 'tian', name: '天时', href: '/tian', icon: '☀️' },
  { id: 'di', name: '地理', href: '/di', icon: '🏔️' },
  { id: 'xuan', name: '玄学', href: '/xuan', icon: '🔮' },
  { id: 'tools', name: '丹房', href: '/tools', icon: '⚗️' },
  { id: 'xiuzhen', name: '修真', href: '/xiuzhen', icon: '✨' },
  { id: 'map', name: '地图', href: '/map', icon: '🗺️' },
]

export function TopNavigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHomePage = pathname === '/'

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ 
        opacity: isHomePage ? 0.3 : 1, 
        y: 0,
        pointerEvents: isHomePage ? 'none' : 'auto'
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backdropFilter: scrolled ? 'blur(24px) saturate(150%)' : 'blur(16px)',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(150%)' : 'blur(16px)',
        background: scrolled 
          ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(15, 23, 42, 0.88) 100%)'
          : 'linear-gradient(180deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.5) 100%)',
        borderBottom: scrolled 
          ? '1px solid rgba(251, 191, 36, 0.25)'
          : '1px solid rgba(251, 191, 36, 0.08)',
        boxShadow: scrolled 
          ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(251, 191, 36, 0.06)'
          : '0 4px 16px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div 
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <Link 
          href="/home" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: '#fbbf24',
            fontFamily: "'Ma Shan Zheng', serif",
            fontSize: '1.75rem',
            fontWeight: 600,
            textShadow: '0 0 30px rgba(251, 191, 36, 0.6)',
            transition: 'all 0.3s ease',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)'
            e.currentTarget.style.textShadow = '0 0 40px rgba(251, 191, 36, 0.9)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.textShadow = '0 0 30px rgba(251, 191, 36, 0.6)'
          }}
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ fontSize: '1.8rem', display: 'inline-block' }}
          >
            ☯️
          </motion.span>
          <span>灵墟</span>
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-2px',
              left: '50%',
              width: '60%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #fbbf24 50%, transparent 100%)',
              opacity: 0.5,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Link>

        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  position: 'relative',
                  padding: '0.625rem 1.125rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0.08) 100%)'
                    : 'transparent',
                  color: isActive ? '#fbbf24' : '#cbd5e1',
                  border: isActive 
                    ? '1px solid rgba(251, 191, 36, 0.4)'
                    : '1px solid transparent',
                  transform: hoveredItem === item.id && !isActive ? 'translateY(-2px)' : 'translateY(0)',
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      style={{
                        position: 'absolute',
                        inset: '-1px',
                        borderRadius: '12px',
                        boxShadow: '0 0 20px rgba(251, 191, 36, 0.3), inset 0 0 20px rgba(251, 191, 36, 0.05)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                <motion.span 
                  style={{ fontSize: '1.1rem', position: 'relative', zIndex: 1 }}
                  animate={{
                    scale: hoveredItem === item.id || isActive ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {item.icon}
                </motion.span>
                <span style={{ position: 'relative', zIndex: 1 }}>{item.name}</span>
                
                {hoveredItem === item.id && !isActive && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#fbbf24',
                    }}
                    layoutId="navDot"
                  />
                )}
              </Link>
            )
          })}
        </div>

        <motion.div
          style={{
            width: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          whileHover={{ scale: 1.1 }}
        >
          <Link
            href="/user"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              fontSize: '1.2rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(251, 191, 36, 0.2)',
            }}
          >
            👤
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  )
}
