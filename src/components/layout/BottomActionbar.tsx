'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        backdropFilter: 'blur(20px)',
        background: 'rgba(15, 23, 42, 0.9)',
        borderTop: '1px solid rgba(251, 191, 36, 0.15)',
        height: '56px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          {breadcrumb.map((item, index) => (
            <div key={item.href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {index > 0 && <span style={{ color: '#64748b' }}>/</span>}
              <span
                onClick={() => router.push(item.href)}
                style={{
                  color: index === breadcrumb.length - 1 ? '#fbbf24' : '#94a3b8',
                  cursor: 'pointer',
                  fontWeight: index === breadcrumb.length - 1 ? 600 : 500,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fbbf24'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = index === breadcrumb.length - 1 ? '#fbbf24' : '#94a3b8'
                }}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => router.back()}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              background: 'rgba(251, 191, 36, 0.08)',
              color: '#e2e8f0',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(251, 191, 36, 0.15)'
              e.currentTarget.style.color = '#fbbf24'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(251, 191, 36, 0.08)'
              e.currentTarget.style.color = '#e2e8f0'
            }}
          >
            ← 返回
          </button>

          <button
            onClick={scrollToTop}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              background: 'rgba(59, 130, 246, 0.08)',
              color: '#e2e8f0',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)'
              e.currentTarget.style.color = '#60a5fa'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)'
              e.currentTarget.style.color = '#e2e8f0'
            }}
          >
            ↑ 顶部
          </button>
        </div>
      </div>
    </motion.div>
  )
}
