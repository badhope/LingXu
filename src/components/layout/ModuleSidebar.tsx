'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface Submodule {
  id: string
  name: string
  icon: string
  href: string
  desc?: string
  color?: string
  isNew?: boolean
}

interface ModuleSidebarProps {
  modules: Submodule[]
  title?: string
  icon?: string
}

export function ModuleSidebar({ modules, title = '功能导航', icon = '📜' }: ModuleSidebarProps) {
  const pathname = usePathname()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'sticky',
        top: '88px',
        width: '240px',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid rgba(251, 191, 36, 0.15)',
          padding: '1rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(251, 191, 36, 0.05)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 0.875rem',
            marginBottom: '0.5rem',
            borderBottom: '1px solid rgba(251, 191, 36, 0.1)',
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>{icon}</span>
          <span
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#fbbf24',
            }}
          >
            {title}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {modules.map((module, index) => {
            const isActive = pathname === module.href || pathname?.endsWith(module.href)
            
            return (
              <Link
                key={module.id}
                href={module.href}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 0.875rem',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.18) 0%, rgba(251, 191, 36, 0.06) 100%)'
                    : hoveredId === module.id
                      ? 'rgba(251, 191, 36, 0.08)'
                      : 'transparent',
                  border: isActive 
                    ? '1px solid rgba(251, 191, 36, 0.35)'
                    : hoveredId === module.id
                      ? '1px solid rgba(251, 191, 36, 0.15)'
                      : '1px solid transparent',
                  transform: hoveredId === module.id && !isActive ? 'translateX(4px)' : 'translateX(0)',
                }}
                onMouseEnter={() => setHoveredId(module.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarIndicator"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '3px',
                        height: '60%',
                        borderRadius: '0 2px 2px 0',
                        background: 'linear-gradient(180deg, #fbbf24, #f59e0b)',
                        boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
                      }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                <motion.span
                  style={{
                    fontSize: '1.25rem',
                    position: 'relative',
                    zIndex: 1,
                  }}
                  animate={{
                    scale: hoveredId === module.id || isActive ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                >
                  {module.icon}
                </motion.span>

                <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? '#fbbf24' : '#e2e8f0',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {module.name}
                    </span>
                    {module.isNew && (
                      <motion.span
                        style={{
                          fontSize: '0.65rem',
                          padding: '0.15rem 0.4rem',
                          borderRadius: '4px',
                          background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                          color: 'white',
                          fontWeight: 600,
                        }}
                        animate={{ 
                          opacity: [1, 0.7, 1],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        NEW
                      </motion.span>
                    )}
                  </div>
                  {module.desc && (
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        color: '#64748b',
                        marginTop: '1px',
                      }}
                    >
                      {module.desc}
                    </span>
                  )}
                </div>

                <motion.span
                  style={{
                    color: isActive ? '#fbbf24' : '#475569',
                    fontSize: '0.8rem',
                    position: 'relative',
                    zIndex: 1,
                  }}
                  animate={{
                    x: hoveredId === module.id ? [0, 3, 0] : 0,
                    opacity: hoveredId === module.id ? 1 : isActive ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  →
                </motion.span>
              </Link>
            )
          })}
        </div>

        <div
          style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(251, 191, 36, 0.1)',
            textAlign: 'center',
          }}
        >
          <motion.div
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ❖ 共 {modules.length} 个子模块 ❖
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
