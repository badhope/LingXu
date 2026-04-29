import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface User {
  id: string
  nickname: string
  avatar: string
  level: number
  cultivation: number
  vip: boolean
  vipExpire: string | null
  linggen: string | null
}

interface CultivationState {
  user: User | null
  isLoggedIn: boolean
  totalCultivation: number
  dailyLogin: boolean
  lastLoginDate: string
  achievements: string[]
}

interface CultivationActions {
  login: (userInfo: Partial<User>) => void
  logout: () => void
  addCultivation: (amount: number) => void
  levelUp: () => void
  activateVip: (days: number) => void
  unlockAchievement: (id: string) => void
  setLinggen: (linggen: string) => void
}

const initialState: CultivationState = {
  user: null,
  isLoggedIn: false,
  totalCultivation: 0,
  dailyLogin: false,
  lastLoginDate: '',
  achievements: [],
}

export const useCultivationStore = create<
  CultivationState & CultivationActions
>()(
  persist(
    (set, get) => ({
      ...initialState,

      login: (userInfo) =>
        set((state) => ({
          isLoggedIn: true,
          user: {
            id: userInfo.id || Date.now().toString(),
            nickname: userInfo.nickname || '修行者',
            avatar: userInfo.avatar || '',
            level: userInfo.level || 1,
            cultivation: userInfo.cultivation || 0,
            vip: userInfo.vip || false,
            vipExpire: userInfo.vipExpire || null,
            linggen: userInfo.linggen || null,
          },
        })),

      logout: () => set(() => initialState),

      addCultivation: (amount) =>
        set((state) => ({
          totalCultivation: state.totalCultivation + amount,
          user: state.user
            ? {
                ...state.user,
                cultivation: state.user.cultivation + amount,
              }
            : null,
        })),

      levelUp: () =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                level: state.user.level + 1,
              }
            : null,
        })),

      activateVip: (days) => {
        const expire = new Date()
        expire.setDate(expire.getDate() + days)
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                vip: true,
                vipExpire: expire.toISOString(),
              }
            : null,
        }))
      },

      unlockAchievement: (id) =>
        set((state) => ({
          achievements: state.achievements.includes(id)
            ? state.achievements
            : [...state.achievements, id],
        })),

      setLinggen: (linggen) =>
        set((state) => ({
          user: state.user ? { ...state.user, linggen } : null,
        })),
    }),
    {
      name: 'lingxu-cultivation',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      ),
    }
  )
)

export const selectors = {
  canAccessPremium: (state: CultivationState) => state.user?.vip === true,
  getLevelProgress: (state: CultivationState) => {
    const level = state.user?.level || 1
    const cultivation = state.user?.cultivation || 0
    const nextLevel = level * 1000
    return Math.min((cultivation / nextLevel) * 100, 100)
  },
}
