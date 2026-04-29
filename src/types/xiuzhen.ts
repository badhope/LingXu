export interface Cultivator {
  id: string
  name: string
  avatar?: string
  realm: Realm
  spiritualRoot: SpiritualRoot
  cultivationTime: number
  lingqi: number
  createdAt: number
  lastLoginAt: number
  checkinStreak: number
  stats: CultivationStats
}

export type Realm =
  | '炼气'
  | '筑基'
  | '金丹'
  | '元婴'
  | '化神'
  | '炼虚'
  | '合体'
  | '大乘'
  | '渡劫'
  | '地仙'
  | '金仙'

export interface SpiritualRoot {
  type: '金' | '木' | '水' | '火' | '土' | '风雷' | '冰' | '空间' | '混沌'
  quality: '废灵根' | '伪灵根' | '凡灵根' | '地灵根' | '天灵根'
  bonus: number
}

export interface CultivationStats {
  totalDays: number
  pillsMade: number
  weaponsMade: number
  fuluDrawn: number
  enlightenments: number
  enemiesDefeated: number
  completedTasks: string[]
  unlockedAchievements: string[]
}

export interface Item {
  id: string
  name: string
  rarity: Rarity
  type: ItemType
  description: string
  count: number
  effect?: Record<string, number>
}

export type Rarity = '凡品' | '下品' | '中品' | '上品' | '极品' | '灵宝' | '仙器'
export type ItemType = '灵药' | '材料' | '丹药' | '法宝' | '符箓' | '功法' | '杂项'

export interface Pill {
  id: string
  name: string
  grade: '凡级' | '灵级' | '宝级' | '玄级' | '天级'
  quality: '下品' | '中品' | '上品' | '极品'
  herbs: string[]
  effect: string
  rate: number
  difficulty: number
  color: string
  createdAt: number
}

export interface Weapon {
  id?: string
  name: string
  grade: '凡器' | '灵器' | '宝器' | '法器' | '灵宝'
  materials: string[]
  effect: string
  rate: number
  color: string
  createdAt?: number
  time?: number
}

export interface Fulu {
  id: string
  name: string
  grade: '黄符' | '玄符' | '地符' | '天符'
  quality: '下品' | '中品' | '上品' | '完美' | '上乘'
  cost: Record<string, number>
  effect: string
  power: number
  color: string
  createdAt?: number
  time?: number
}

export interface CultivationTechnique {
  id: string
  name: string
  tier: '凡阶' | '灵阶' | '玄阶' | '地阶' | '天阶'
  attribute: string
  maxLevel: number
  currentLevel: number
  description: string
  effect: string
  unlocked: boolean
}

export interface Task {
  id: string
  name: string
  description: string
  type: 'daily' | 'weekly' | 'monthly' | 'achievement'
  reward: Record<string, number>
  condition: string
  completed: boolean
  completedAt?: number
}

export interface CaveHeaven {
  id: string
  name: string
  location: string
  tier: string
  description: string
  secret: string
  lingqiDensity: number
  unlocked: boolean
  discoveredAt?: number
}

export interface HistoricalEvent {
  id: string
  year: string
  title: string
  event: string
  type: 'gold' | 'purple' | 'red' | 'blue' | 'cyan' | 'gray'
  secret: string
  discovered: boolean
}

export interface ModernCultivator {
  id: string
  name: string
  alias: string
  realm: string
  cover: string
  ability: string
  location: string
  secret: string
  active: boolean
}

export interface InventoryItem {
  itemId: string
  count: number
  obtainedAt: number
}

export type GameSave = {
  version: string
  savedAt: number
  cultivator: Cultivator
  inventory: InventoryItem[]
  pills: Pill[]
  weapons: Weapon[]
  fulus: Fulu[]
  techniques: CultivationTechnique[]
  caveHeavens: CaveHeaven[]
}

export const REALM_ORDER: Realm[] = [
  '炼气', '筑基', '金丹', '元婴', '化神',
  '炼虚', '合体', '大乘', '渡劫', '地仙', '金仙'
]

export const RARITY_COLORS: Record<Rarity, string> = {
  '凡品': '#9CA3AF',
  '下品': '#22C55E',
  '中品': '#3B82F6',
  '上品': '#A855F7',
  '极品': '#F59E0B',
  '灵宝': '#EF4444',
  '仙器': '#EC4899',
}

export function calculateRealmProgress(cultivationTime: number): { realm: Realm; progress: number } {
  const thresholds = [
    0, 3600, 18000, 72000, 216000,
    504000, 1008000, 2016000, 4032000, 8064000, 16128000
  ]

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (cultivationTime >= thresholds[i]) {
      const nextThreshold = thresholds[i + 1] || thresholds[i] * 2
      const progress = ((cultivationTime - thresholds[i]) / (nextThreshold - thresholds[i])) * 100
      return { realm: REALM_ORDER[i], progress: Math.min(progress, 100) }
    }
  }

  return { realm: '炼气', progress: 0 }
}

export function getLingqiBonusByHour(hour: number): number {
  if (hour >= 23 || hour < 1) return 1.5
  if (hour >= 11 && hour < 13) return 1.4
  if (hour >= 5 && hour < 7) return 1.3
  if (hour >= 17 && hour < 19) return 1.2
  if (hour >= 3 && hour < 5) return 1.2
  if (hour >= 21 && hour < 23) return 1.3
  return 1.0
}

export function getMoonPhaseBonus(): number {
  const now = new Date()
  const lunarDays = (now.getFullYear() * 365.25 + now.getMonth() * 30.44 + now.getDate()) % 29.53
  if (lunarDays < 2 || lunarDays > 27.5) return 0.7
  if (Math.abs(lunarDays - 14.7) < 2) return 1.3
  if (Math.abs(lunarDays - 14.7) < 4) return 1.15
  return 1.0
}
