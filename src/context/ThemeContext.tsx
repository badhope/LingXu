'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ThemeSpace = 'honghuang' | 'xiuzhen' | 'mofa' | 'weilai'

interface ThemeConfig {
  name: string
  icon: string
  primary: string
  bgGradient: string
  particleColor: string
  glowColor: string
}

export const THEMES: Record<ThemeSpace, ThemeConfig> = {
  honghuang: {
    name: '洪荒灵墟',
    icon: '◈',
    primary: '#fbbf24',
    bgGradient: 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 50%, #020617 100%)',
    particleColor: 'rgba(251, 191, 36, 0.6)',
    glowColor: 'rgba(251, 191, 36, 0.4)',
  },
  xiuzhen: {
    name: '修真洞府',
    icon: '⚗️',
    primary: '#a855f7',
    bgGradient: 'radial-gradient(ellipse at center, #3b0764 0%, #1e1b4b 50%, #0c0a1d 100%)',
    particleColor: 'rgba(168, 85, 247, 0.6)',
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
  mofa: {
    name: '末法纪元',
    icon: '🔮',
    primary: '#06b6d4',
    bgGradient: 'radial-gradient(ellipse at center, #164e63 0%, #0e3a4a 50%, #071a24 100%)',
    particleColor: 'rgba(6, 182, 212, 0.6)',
    glowColor: 'rgba(6, 182, 212, 0.4)',
  },
  weilai: {
    name: '未来长河',
    icon: '⚡',
    primary: '#22c55e',
    bgGradient: 'radial-gradient(ellipse at center, #14532d 0%, #052e16 50%, #02140a 100%)',
    particleColor: 'rgba(34, 197, 94, 0.6)',
    glowColor: 'rgba(34, 197, 94, 0.4)',
  },
}

interface ThemeContextType {
  currentTheme: ThemeSpace
  setTheme: (theme: ThemeSpace) => void
  themeConfig: ThemeConfig
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'honghuang',
  setTheme: () => {},
  themeConfig: THEMES.honghuang,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeSpace>('honghuang')

  useEffect(() => {
    const root = document.documentElement
    const config = THEMES[currentTheme]
    
    root.style.setProperty('--theme-primary', config.primary)
    root.style.setProperty('--theme-glow', config.glowColor)
    root.style.setProperty('--theme-bg', config.bgGradient)
  }, [currentTheme])

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme: setCurrentTheme,
        themeConfig: THEMES[currentTheme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
