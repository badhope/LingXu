'use client'

import { motion } from 'framer-motion'
import { forwardRef, ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'gold'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  glow?: boolean
  icon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = 'primary', size = 'md', fullWidth = false, glow = true, icon, className = '', style, onClick, disabled, ...rest },
  ref
) {
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(124, 58, 237, 0.95) 100%)',
      border: '1px solid rgba(124, 58, 237, 0.5)',
      color: '#ffffff',
      hoverGlow: 'rgba(124, 58, 237, 0.4)',
    },
    secondary: {
      background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%)',
      border: '1px solid rgba(100, 116, 139, 0.3)',
      color: '#e2e8f0',
      hoverGlow: 'rgba(100, 116, 139, 0.3)',
    },
    ghost: {
      background: 'transparent',
      border: '1px solid transparent',
      color: 'rgb(251, 191, 36)',
      hoverGlow: 'rgba(251, 191, 36, 0.2)',
    },
    gradient: {
      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.9) 0%, rgba(245, 158, 11, 0.95) 50%, rgba(239, 68, 68, 0.9) 100%)',
      border: '1px solid rgba(251, 191, 36, 0.5)',
      color: '#1e1b4b',
      hoverGlow: 'rgba(251, 191, 36, 0.5)',
    },
    gold: {
      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%)',
      border: '1px solid rgba(251, 191, 36, 0.3)',
      color: 'rgb(251, 191, 36)',
      hoverGlow: 'rgba(251, 191, 36, 0.3)',
    },
  }

  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: '10px' },
    md: { padding: '0.75rem 1.5rem', fontSize: '0.95rem', borderRadius: '12px' },
    lg: { padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '14px' },
    xl: { padding: '1.25rem 2.5rem', fontSize: '1.25rem', borderRadius: '16px' },
  }

  const config = variants[variant]
  const sizeConfig = sizes[size]

  const motionProps = {
    ref,
    disabled,
    onClick,
    ...rest,
    initial: { opacity: 0.9, scale: 1 },
    whileHover: !disabled ? {
      scale: 1.02,
      y: -2,
      boxShadow: glow ? `0 10px 30px ${config.hoverGlow}, 0 0 20px ${config.hoverGlow}` : '0 8px 24px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.2, ease: 'easeOut' },
    } : undefined,
    whileTap: !disabled ? {
      scale: 0.98,
      y: 0,
      boxShadow: glow ? `0 4px 12px ${config.hoverGlow}` : '0 4px 12px rgba(0, 0, 0, 0.15)',
      transition: { duration: 0.1 },
    } : undefined,
    whileFocus: {
      outline: 'none',
      boxShadow: `0 0 0 3px ${config.hoverGlow}`,
    },
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontWeight: 600,
      background: config.background,
      border: config.border,
      color: config.color,
      borderRadius: sizeConfig.borderRadius,
      padding: sizeConfig.padding,
      fontSize: sizeConfig.fontSize,
      width: fullWidth ? '100%' : 'auto',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      boxShadow: glow ? `0 4px 16px ${config.hoverGlow}` : '0 4px 12px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      ...style,
    },
    className,
  }

  return (
    <motion.button {...(motionProps as any)}>
      {variant === 'gold' && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.15) 50%, transparent 100%)',
          }}
          animate={{
            left: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.button>
  )
})

export default Button
