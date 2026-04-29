'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type DeviceType = 'mobile' | 'tablet' | 'desktop'

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  showBack?: boolean
  backTo?: string
  header?: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCard?: boolean
}

export function PageLayout({
  children,
  title,
  subtitle,
  showBack = true,
  backTo = '/home',
  header,
  className = '',
  padding = 'md',
  maxWidth = 'xl',
  showCard = true,
}: PageLayoutProps) {
  const router = useRouter()
  const [device, setDevice] = useState<DeviceType>('desktop')

  useEffect(() => {
    const checkDevice = () => {
      const w = window.innerWidth
      if (w < 768) setDevice('mobile')
      else if (w < 1024) setDevice('tablet')
      else setDevice('desktop')
    }
    checkDevice()
    const handleResize = () => requestAnimationFrame(checkDevice)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleBack = () => {
    if (backTo === 'back') {
      router.back()
    } else {
      router.push(backTo)
    }
  }

  const maxWidthMap = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    full: 'max-w-full',
  }

  const paddingMap = {
    none: 'p-0',
    sm: 'p-4 md:p-5',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-10',
  }

  const fontSizeMap = {
    mobile: 1,
    tablet: 1.1,
    desktop: 1.2,
  }

  return (
    <div 
      className={`min-h-screen relative z-10 ${className}`}
      style={{
        background: 'transparent !important',
        fontSize: `${fontSizeMap[device]}rem`,
        padding: device === 'mobile' ? '3.5rem 1rem 2rem' : device === 'tablet' ? '4rem 1.5rem 2rem' : '5rem 2rem 3rem',
      }}
    >
      <div className={`${maxWidthMap[maxWidth]} mx-auto`}>
        {(showBack || title) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.12 }}
            className="flex items-center gap-4 mb-8"
          >
            {showBack && (
              <motion.button
                whileHover={{ scale: 1.05, x: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border transition-all group"
                style={{ 
                  background: 'rgba(30, 41, 59, 0.7)',
                  borderColor: 'rgba(251, 191, 36, 0.3)',
                  boxShadow: '0 2px 8px rgba(251, 191, 36, 0.12)',
                }}
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="#e2e8f0" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span style={{ color: '#f8fafc', fontWeight: 500, fontSize: device === 'mobile' ? '0.95rem' : '1.1rem' }}>返回</span>
              </motion.button>
            )}

            {(title || subtitle) && (
              <div className="flex-1">
                {title && (
                  <h1 
                    className="font-bold bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent"
                    style={{ fontSize: device === 'mobile' ? '1.5rem' : device === 'tablet' ? '1.8rem' : '2.2rem' }}
                  >
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p 
                    className="mt-1" 
                    style={{ 
                      color: '#94a3b8',
                      fontSize: device === 'mobile' ? '0.9rem' : '1rem',
                    }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
            )}

            {header}
          </motion.div>
        )}

        {showCard ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="rounded-2xl border overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #fdfaf3 0%, #f5f0e1 100%)',
              borderColor: 'rgba(251, 191, 36, 0.3)',
              boxShadow: '0 4px 24px rgba(251, 191, 36, 0.15)',
            }}
          >
            <div className="h-2 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
            
            <div className={paddingMap[padding]} style={{ minHeight: '300px' }}>
              {children}
            </div>

            <div className="h-2 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export function ParchmentCard({ children, className = '', glow = false }: { 
  children: React.ReactNode; 
  className?: string;
  glow?: boolean;
}) {
  return (
    <div 
      className={`rounded-xl border border-amber-700/15 bg-white/50 ${className}`}
      style={{
        boxShadow: glow 
          ? 'inset 0 1px 0 rgba(255,255,255,0.8), 0 0 30px rgba(201, 162, 39, 0.15), 0 4px 15px rgba(92, 82, 69, 0.08)'
          : 'inset 0 1px 0 rgba(255,255,255,0.8), 0 4px 15px rgba(92, 82, 69, 0.08)',
      }}
    >
      {children}
    </div>
  )
}

export function GridCard({ children, className = '', onClick }: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div 
      className={`rounded-xl border border-amber-700/15 bg-white/55 hover:bg-white/70 transition-all cursor-pointer ${className}`}
      style={{
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 12px rgba(92, 82, 69, 0.06)',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function GlobalPageBackground() {
  return null
}

export function createParchementStyle(override: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.45) 100%)',
    border: '1px solid rgba(251, 191, 36, 0.18)',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(92, 82, 69, 0.1)',
    ...override,
  }
}
