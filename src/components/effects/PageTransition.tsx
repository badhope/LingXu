'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ 
          opacity: 0, 
          x: 20,
          filter: 'blur(4px)',
        }}
        animate={{ 
          opacity: 1, 
          x: 0,
          filter: 'blur(0px)',
        }}
        exit={{ 
          opacity: 0, 
          x: -20,
          filter: 'blur(4px)',
        }}
        transition={{
          duration: 0.25,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{
          minHeight: '100%',
          position: 'relative',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.08,
    }
  },
  exit: { opacity: 0, y: -10, scale: 0.98 },
}

export const itemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}
