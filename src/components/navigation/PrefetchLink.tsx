'use client'

import { useState, useCallback, useEffect } from 'react'
import NextLink, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

interface PrefetchLinkProps extends Omit<LinkProps, 'prefetch'> {
  children: React.ReactNode
  className?: string
  prefetchOnHover?: boolean
  prefetchDelay?: number
  priority?: 'low' | 'medium' | 'high'
}

const PRIORITY_DELAYS = {
  low: 500,
  medium: 200,
  high: 50,
}

export function PrefetchLink({
  children,
  href,
  className,
  prefetchOnHover = true,
  prefetchDelay,
  priority = 'medium',
  ...props
}: PrefetchLinkProps) {
  const router = useRouter()
  const [hasPrefetched, setHasPrefetched] = useState(false)

  const actualDelay = prefetchDelay ?? PRIORITY_DELAYS[priority]

  const handleMouseEnter = useCallback(() => {
    if (!prefetchOnHover || hasPrefetched) return

    const timer = setTimeout(() => {
      const hrefStr = typeof href === 'string' ? href : href.pathname || ''
      if (hrefStr && hrefStr.startsWith('/')) {
        router.prefetch(hrefStr)
        setHasPrefetched(true)
      }
    }, actualDelay)

    return () => clearTimeout(timer)
  }, [href, router, prefetchOnHover, hasPrefetched, actualDelay])

  const handleMouseLeave = useCallback(() => {
  }, [])

  useEffect(() => {
    if (priority === 'high' && !hasPrefetched) {
      const hrefStr = typeof href === 'string' ? href : href.pathname || ''
      if (hrefStr && hrefStr.startsWith('/')) {
        const idleCallback = window.requestIdleCallback?.(() => {
          router.prefetch(hrefStr)
          setHasPrefetched(true)
        })
        return () => window.cancelIdleCallback?.(idleCallback)
      }
    }
  }, [href, router, priority, hasPrefetched])

  return (
    <NextLink
      href={href}
      className={className}
      prefetch={false}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </NextLink>
  )
}

interface PrefetchCardProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function PrefetchCard({
  href,
  children,
  className,
  onClick,
}: PrefetchCardProps) {
  const router = useRouter()
  const [hasPrefetched, setHasPrefetched] = useState(false)

  const handleMouseEnter = useCallback(() => {
    if (hasPrefetched || !href.startsWith('/')) return

    const timer = setTimeout(() => {
      router.prefetch(href)
      setHasPrefetched(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [href, router, hasPrefetched])

  return (
    <motion.div
      className={className}
      onMouseEnter={handleMouseEnter}
      onClick={() => {
        onClick?.()
        router.push(href)
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}
