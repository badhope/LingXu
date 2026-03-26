/**
 * 灵墟 - 全局状态管理
 * LingXu Global State Management (Zustand)
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 用户设置
interface UserSettings {
  // 显示设置
  theme: 'dark' | 'light' | 'auto'
  reducedMotion: boolean
  showParticles: boolean
  showWebGL: boolean
  
  // 语言
  language: 'zh-CN' | 'en-US'
  
  // 功能设置
  soundEnabled: boolean
  autoPlayAnimation: boolean
}

// 用户数据
interface UserData {
  // 基本信息
  nickname: string
  avatar: string
  
  // 修行信息
  cultivationLevel: number
  cultivationExp: number
  lingqi: number // 灵气值
  
  // 签到
  lastSignIn: string | null
  signInStreak: number
  totalSignInDays: number
  
  // 收藏
  bookmarks: string[]
  
  // 成就
  achievements: string[]
  
  // 卦象记录
  guaHistory: Array<{
    date: string
    gua: string
    question: string
  }>
}

// 应用状态
interface AppState {
  // 启动页状态
  isSplashCompleted: boolean
  setIsSplashCompleted: (value: boolean) => void
  
  // 当前模块
  currentModule: string | null
  setCurrentModule: (module: string | null) => void
  
  // 用户设置
  settings: UserSettings
  updateSettings: (settings: Partial<UserSettings>) => void
  
  // 用户数据
  user: UserData
  updateUser: (data: Partial<UserData>) => void
  
  // 签到
  signIn: () => { success: boolean; message: string }
  
  // 收藏
  addBookmark: (id: string) => void
  removeBookmark: (id: string) => void
  isBookmarked: (id: string) => boolean
  
  // 成就
  unlockAchievement: (id: string) => void
  hasAchievement: (id: string) => boolean
  
  // 灵气
  addLingqi: (amount: number) => void
  consumeLingqi: (amount: number) => boolean
  
  // 卦象
  addGuaRecord: (gua: string, question: string) => void
  
  // 重置
  resetUser: () => void
}

// 默认设置
const defaultSettings: UserSettings = {
  theme: 'dark',
  reducedMotion: false,
  showParticles: true,
  showWebGL: true,
  language: 'zh-CN',
  soundEnabled: false,
  autoPlayAnimation: true,
}

// 默认用户数据
const defaultUserData: UserData = {
  nickname: '修行者',
  avatar: '',
  cultivationLevel: 1,
  cultivationExp: 0,
  lingqi: 100,
  lastSignIn: null,
  signInStreak: 0,
  totalSignInDays: 0,
  bookmarks: [],
  achievements: [],
  guaHistory: [],
}

// 创建 Store
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 启动页状态
      isSplashCompleted: false,
      setIsSplashCompleted: (value) => set({ isSplashCompleted: value }),
      
      // 当前模块
      currentModule: null,
      setCurrentModule: (module) => set({ currentModule: module }),
      
      // 用户设置
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      
      // 用户数据
      user: defaultUserData,
      updateUser: (data) =>
        set((state) => ({
          user: { ...state.user, ...data },
        })),
      
      // 签到
      signIn: () => {
        const state = get()
        const today = new Date().toDateString()
        
        if (state.user.lastSignIn === today) {
          return { success: false, message: '今日已签到' }
        }
        
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const isStreak = state.user.lastSignIn === yesterday.toDateString()
        
        const newStreak = isStreak ? state.user.signInStreak + 1 : 1
        const bonusLingqi = newStreak >= 7 ? 50 : newStreak >= 3 ? 20 : 10
        
        set((state) => ({
          user: {
            ...state.user,
            lastSignIn: today,
            signInStreak: newStreak,
            totalSignInDays: state.user.totalSignInDays + 1,
            lingqi: state.user.lingqi + bonusLingqi,
          },
        }))
        
        return {
          success: true,
          message: `签到成功！连续签到 ${newStreak} 天，获得 ${bonusLingqi} 灵气`,
        }
      },
      
      // 收藏
      addBookmark: (id) =>
        set((state) => ({
          user: {
            ...state.user,
            bookmarks: [...state.user.bookmarks, id],
          },
        })),
      
      removeBookmark: (id) =>
        set((state) => ({
          user: {
            ...state.user,
            bookmarks: state.user.bookmarks.filter((b) => b !== id),
          },
        })),
      
      isBookmarked: (id) => get().user.bookmarks.includes(id),
      
      // 成就
      unlockAchievement: (id) =>
        set((state) => {
          if (state.user.achievements.includes(id)) return state
          return {
            user: {
              ...state.user,
              achievements: [...state.user.achievements, id],
            },
          }
        }),
      
      hasAchievement: (id) => get().user.achievements.includes(id),
      
      // 灵气
      addLingqi: (amount) =>
        set((state) => ({
          user: {
            ...state.user,
            lingqi: state.user.lingqi + amount,
          },
        })),
      
      consumeLingqi: (amount) => {
        const state = get()
        if (state.user.lingqi < amount) return false
        
        set((state) => ({
          user: {
            ...state.user,
            lingqi: state.user.lingqi - amount,
          },
        }))
        return true
      },
      
      // 卦象记录
      addGuaRecord: (gua, question) =>
        set((state) => ({
          user: {
            ...state.user,
            guaHistory: [
              ...state.user.guaHistory,
              {
                date: new Date().toISOString(),
                gua,
                question,
              },
            ],
          },
        })),
      
      // 重置
      resetUser: () => set({ user: defaultUserData }),
    }),
    {
      name: 'lingxu-storage',
      partialize: (state) => ({
        isSplashCompleted: state.isSplashCompleted,
        settings: state.settings,
        user: state.user,
      }),
    }
  )
)

// 选择器 Hooks
export const useSettings = () => useAppStore((state) => state.settings)
export const useUser = () => useAppStore((state) => state.user)
export const useIsSplashCompleted = () => useAppStore((state) => state.isSplashCompleted)
