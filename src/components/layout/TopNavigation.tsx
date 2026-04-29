'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

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

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backdropFilter: 'blur(20px)',
        background: 'rgba(15, 23, 42, 0.85)',
        borderBottom: '1px solid rgba(251, 191, 36, 0.15)',
      }}
    >
      <div 
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '56px',
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
            gap: '0.5rem',
            textDecoration: 'none',
            color: '#fbbf24',
            fontFamily: "'Ma Shan Zheng', serif",
            fontSize: '1.5rem',
            fontWeight: 600,
            textShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
          }}
        >
          <span>☯️</span>
          <span>灵墟</span>
        </Link>

        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
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
                  padding: '0.5rem 0.875rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.2s ease',
                  background: isActive ? 'rgba(251, 191, 36, 0.15)' : 'transparent',
                  color: isActive ? '#fbbf24' : '#e2e8f0',
                  border: isActive ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(251, 191, 36, 0.08)'
                    e.currentTarget.style.color = '#fbbf24'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#e2e8f0'
                  }
                }}
              >
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

        <div style={{ width: '60px' }} />
      </div>
    </motion.nav>
  )
}
