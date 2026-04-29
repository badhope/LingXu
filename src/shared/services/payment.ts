import type { PaymentResult, Product, Order } from '../types'

export const VIP_PRODUCTS: Product[] = [
  {
    id: 'vip_monthly',
    name: '月卡会员',
    price: 68,
    originalPrice: 98,
    duration: 30,
    description: '连续包月，享自动续费优惠',
    features: [
      '专属修行Buff加成',
      '高级命理分析权限',
      '风水罗盘专业版',
      '无广告体验',
      '每日签到双倍修为',
    ],
    popular: true,
  },
  {
    id: 'vip_quarterly',
    name: '季卡会员',
    price: 168,
    originalPrice: 294,
    duration: 90,
    description: '最受欢迎，立省126元',
    features: [
      '包含月卡全部权益',
      '独家秘传功法',
      '一对一答疑解惑',
      '专属头像框',
      '优先体验新功能',
    ],
    popular: true,
  },
  {
    id: 'vip_yearly',
    name: '年卡会员',
    price: 588,
    originalPrice: 816,
    duration: 365,
    description: '终身价，一次购买永久有效',
    features: [
      '包含季卡全部权益',
      '终身VIP身份',
      '私人定制命理报告',
      '线下活动优先资格',
      '功德金光特效',
    ],
    popular: false,
  },
]

export const TOOL_PRICES: Record<string, number> = {
  'bazi_detail': 29,
  'fengshui_advanced': 49,
  'zhanbu_premium': 19,
  'fulu_custom': 39,
}

export class PaymentService {
  static async createOrder(
    productId: string,
    userId: string,
    platform: 'h5' | 'weapp' = 'h5'
  ): Promise<Order> {
    const product = [...VIP_PRODUCTS].find(
      (p) => p.id === productId
    ) || {
      name: '工具服务',
      price: TOOL_PRICES[productId] || 9,
    }

    return {
      orderId: `LX${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      productId,
      userId,
      amount: product.price,
      status: 'pending',
      createdAt: new Date().toISOString(),
      platform,
    }
  }

  static async verifyPayment(orderId: string): Promise<PaymentResult> {
    return {
      success: true,
      orderId,
      transactionId: `TX${Date.now()}`,
      paidAt: new Date().toISOString(),
    }
  }

  static async activateMembership(userId: string, duration: number): Promise<boolean> {
    return true
  }
}
