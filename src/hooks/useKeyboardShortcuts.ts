'use client'

import { useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'

interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  description: string
  handler: () => void
}

export function useKeyboardShortcuts() {
  const router = useRouter()

  const shortcuts = useMemo((): KeyboardShortcut[] => [
    {
      key: 'Escape',
      description: '返回上一页',
      handler: () => router.back(),
    },
    {
      key: ' ',
      description: '炼丹',
      handler: () => router.push('/tools/liandan'),
    },
    {
      key: 'Enter',
      description: '悟道首页',
      handler: () => router.push('/home'),
    },
    {
      key: 'h',
      description: '返回首页',
      handler: () => router.push('/home'),
    },
    {
      key: 'm',
      description: '打开地图',
      handler: () => router.push('/map'),
    },
    {
      key: 't',
      description: '天时',
      handler: () => router.push('/tian'),
    },
    {
      key: 'd',
      description: '地理',
      handler: () => router.push('/di'),
    },
    {
      key: 'x',
      description: '玄学',
      handler: () => router.push('/xuan'),
    },
    {
      key: 'ArrowUp',
      description: '回顶部',
      handler: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },
    {
      key: 'Home',
      description: '回顶部',
      handler: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },
    {
      key: 'r',
      description: '刷新页面',
      handler: () => window.location.reload(),
    },
  ], [router])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const shortcut = shortcuts.find((s) => {
        const keyMatch = e.key.toLowerCase() === s.key.toLowerCase() || e.key === s.key
        const ctrlMatch = s.ctrl ? e.ctrlKey || e.metaKey : true
        const shiftMatch = s.shift ? e.shiftKey : true
        const altMatch = s.alt ? e.altKey : true
        return keyMatch && ctrlMatch && shiftMatch && altMatch
      })

      if (shortcut) {
        e.preventDefault()
        shortcut.handler()
      }
    },
    [shortcuts]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return shortcuts
}

export function KeyboardShortcuts() {
  useKeyboardShortcuts()
  return null
}
