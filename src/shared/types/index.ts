export interface User {
  id: string
  openid?: string
  nickname: string
  avatar: string
  level: number
  cultivation: number
  vip: boolean
  vipExpire: string | null
  linggen: string | null
}

export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  duration: number
  description: string
  features: string[]
  popular: boolean
}

export interface Order {
  orderId: string
  productId: string
  userId: string
  amount: number
  status: 'pending' | 'paid' | 'cancelled' | 'refunded'
  createdAt: string
  platform: 'h5' | 'weapp' | 'alipay'
  transactionId?: string
}

export interface PaymentResult {
  success: boolean
  orderId: string
  transactionId: string
  paidAt: string
}

export interface FortuneData {
  overall: number
  love: number
  career: number
  wealth: number
  health: number
  luckyColor: string
  luckyNumber: number
  direction: string
  yi: string[]
  ji: string[]
}

export interface BaziResult {
  year: { gan: string; zhi: string }
  month: { gan: string; zhi: string }
  day: { gan: string; zhi: string }
  hour: { gan: string; zhi: string }
  wuxing: Record<string, number>
  wuxingMissing: string[]
  dayMaster: string
  pattern: string
}

export interface BaguaResult {
  gua: string
  guaName: string
  yao: number[]
  originalGua: string
  changedGua: string
  interpretation: string
  advice: string
}

export type LinggenGrade = '废柴' | '普通' | '优秀' | '天才' | '天灵根'

export interface LinggenResult {
  grade: LinggenGrade
  wuxing: string[]
  quality: string
  bonus: number
  color: string
  abilities: string[]
  bottlenecks: string[]
  detail: string
}
