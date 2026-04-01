/**
 * 灵墟 - 事件系统核心库
 * LingXu - Event System Core Library
 * 
 * 包含随机事件、成就系统、用户交互事件等
 */

// ==================== 事件类型定义 ====================

export type EventType = 
  | 'discovery'      // 发现事件
  | 'cultivation'    // 修行事件
  | 'fortune'        // 运势事件
  | 'encounter'      // 遭遇事件
  | 'mystery'        // 神秘事件
  | 'achievement'    // 成就事件
  | 'system'         // 系统事件

export interface GameEvent {
  id: string
  type: EventType
  title: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  effects: EventEffect[]
  conditions?: EventCondition[]
  choices?: EventChoice[]
  timestamp: Date
}

export interface EventEffect {
  type: 'lingqi' | 'exp' | 'achievement' | 'item' | 'knowledge'
  value: number | string
  description: string
}

export interface EventCondition {
  type: 'level' | 'lingqi' | 'achievement' | 'visit' | 'time'
  value: number | string
  description: string
}

export interface EventChoice {
  id: string
  text: string
  effects: EventEffect[]
  successRate?: number
  successMessage?: string
  failMessage?: string
}

// ==================== 随机事件池 ====================

export const RANDOM_EVENTS: Omit<GameEvent, 'id' | 'timestamp'>[] = [
  {
    type: 'discovery',
    title: '古籍残卷',
    description: '你在探索中发现了一本古老的典籍残卷，上面记载着神秘的修行法门。',
    icon: '📜',
    rarity: 'rare',
    effects: [
      { type: 'exp', value: 50, description: '获得修行经验' },
      { type: 'knowledge', value: '古籍知识', description: '解锁古籍知识' }
    ],
    choices: [
      {
        id: 'study',
        text: '研读残卷',
        effects: [
          { type: 'exp', value: 100, description: '深入研读获得更多经验' }
        ],
        successRate: 0.8,
        successMessage: '你成功解读了残卷中的奥秘！',
        failMessage: '残卷太过深奥，你暂时无法理解。'
      },
      {
        id: 'collect',
        text: '收藏起来',
        effects: [
          { type: 'item', value: '古籍残卷', description: '获得物品：古籍残卷' }
        ]
      }
    ]
  },
  {
    type: 'cultivation',
    title: '灵气涌动',
    description: '你感受到周围灵气突然涌动，这是一个难得的修炼时机。',
    icon: '✨',
    rarity: 'epic',
    effects: [
      { type: 'lingqi', value: 30, description: '吸收灵气' }
    ],
    choices: [
      {
        id: 'absorb',
        text: '立即吸收',
        effects: [
          { type: 'lingqi', value: 50, description: '大量吸收灵气' }
        ],
        successRate: 0.7,
        successMessage: '你成功吸收了大量灵气！',
        failMessage: '灵气过于狂暴，你只吸收了一部分。'
      },
      {
        id: 'meditate',
        text: '静心冥想',
        effects: [
          { type: 'exp', value: 80, description: '通过冥想获得经验' },
          { type: 'lingqi', value: 20, description: '稳定吸收灵气' }
        ]
      }
    ]
  },
  {
    type: 'fortune',
    title: '卦象显现',
    description: '天空中隐约显现出神秘的卦象，似乎在预示着什么。',
    icon: '🔮',
    rarity: 'rare',
    effects: [
      { type: 'knowledge', value: '卦象解读', description: '获得卦象知识' }
    ],
    choices: [
      {
        id: 'observe',
        text: '仔细观察',
        effects: [
          { type: 'exp', value: 60, description: '观察卦象获得经验' }
        ]
      },
      {
        id: 'record',
        text: '记录下来',
        effects: [
          { type: 'item', value: '卦象记录', description: '获得物品：卦象记录' }
        ]
      }
    ]
  },
  {
    type: 'encounter',
    title: '神秘老者',
    description: '你遇到了一位神秘的老者，他似乎知道很多关于修行的秘密。',
    icon: '👴',
    rarity: 'legendary',
    effects: [
      { type: 'exp', value: 100, description: '与高人交流获得经验' }
    ],
    conditions: [
      { type: 'level', value: 3, description: '需要达到3级' }
    ],
    choices: [
      {
        id: 'ask',
        text: '请教修行之道',
        effects: [
          { type: 'exp', value: 200, description: '获得指点' },
          { type: 'knowledge', value: '修行心得', description: '获得修行知识' }
        ],
        successRate: 0.6,
        successMessage: '老者欣然指点你修行的奥秘！',
        failMessage: '老者摇了摇头，说你还需更多历练。'
      },
      {
        id: 'gift',
        text: '献上灵气',
        effects: [
          { type: 'lingqi', value: -20, description: '消耗灵气' },
          { type: 'achievement', value: '谦逊求道', description: '获得成就' }
        ]
      }
    ]
  },
  {
    type: 'mystery',
    title: '时空裂缝',
    description: '你发现了一道微弱的时空裂缝，似乎通往另一个维度。',
    icon: '🌀',
    rarity: 'legendary',
    effects: [
      { type: 'knowledge', value: '维度知识', description: '了解维度奥秘' }
    ],
    conditions: [
      { type: 'level', value: 5, description: '需要达到5级' },
      { type: 'lingqi', value: 100, description: '需要100灵气' }
    ],
    choices: [
      {
        id: 'enter',
        text: '进入裂缝',
        effects: [
          { type: 'exp', value: 300, description: '探索异界获得大量经验' },
          { type: 'item', value: '异界宝物', description: '获得异界宝物' }
        ],
        successRate: 0.4,
        successMessage: '你在异界中获得了珍贵的宝物！',
        failMessage: '裂缝突然关闭，你被弹了回来。'
      },
      {
        id: 'observe',
        text: '远观研究',
        effects: [
          { type: 'exp', value: 100, description: '安全观察获得经验' }
        ]
      }
    ]
  },
  {
    type: 'discovery',
    title: '洞天福地',
    description: '你发现了一处隐秘的洞天福地，灵气充沛，适合修炼。',
    icon: '🏔️',
    rarity: 'epic',
    effects: [
      { type: 'lingqi', value: 50, description: '在洞天中修炼' }
    ],
    choices: [
      {
        id: 'cultivate',
        text: '在此修炼',
        effects: [
          { type: 'lingqi', value: 100, description: '深度修炼获得大量灵气' },
          { type: 'exp', value: 150, description: '修炼获得经验' }
        ]
      },
      {
        id: 'explore',
        text: '探索洞天',
        effects: [
          { type: 'item', value: '洞天宝物', description: '发现宝物' },
          { type: 'exp', value: 80, description: '探索获得经验' }
        ],
        successRate: 0.5,
        successMessage: '你在洞天深处发现了珍贵的宝物！',
        failMessage: '洞天深处危险重重，你决定返回。'
      }
    ]
  },
  {
    type: 'cultivation',
    title: '心魔来袭',
    description: '修炼中心魔突然来袭，你需要战胜它才能继续前进。',
    icon: '👹',
    rarity: 'rare',
    effects: [],
    choices: [
      {
        id: 'fight',
        text: '与心魔战斗',
        effects: [
          { type: 'exp', value: 150, description: '战胜心魔获得经验' },
          { type: 'lingqi', value: 30, description: '吸收心魔能量' }
        ],
        successRate: 0.6,
        successMessage: '你成功战胜了心魔，修为更进一步！',
        failMessage: '心魔太过强大，你暂时退却。'
      },
      {
        id: 'meditate',
        text: '静心化解',
        effects: [
          { type: 'exp', value: 80, description: '化解心魔获得经验' }
        ]
      }
    ]
  },
  {
    type: 'fortune',
    title: '星象异变',
    description: '夜空中星象发生异变，似乎预示着重大的变故。',
    icon: '⭐',
    rarity: 'epic',
    effects: [
      { type: 'knowledge', value: '星象知识', description: '获得星象知识' }
    ],
    choices: [
      {
        id: 'observe',
        text: '详细观察',
        effects: [
          { type: 'exp', value: 100, description: '观察星象获得经验' },
          { type: 'knowledge', value: '星象预言', description: '获得预言知识' }
        ]
      },
      {
        id: 'record',
        text: '记录星象',
        effects: [
          { type: 'item', value: '星象图', description: '获得星象图' }
        ]
      }
    ]
  }
]

// ==================== 成就系统 ====================

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: 'exploration' | 'cultivation' | 'knowledge' | 'social' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  conditions: AchievementCondition[]
  rewards: EventEffect[]
  unlockedAt?: Date
}

export interface AchievementCondition {
  type: 'visit' | 'count' | 'level' | 'lingqi' | 'time' | 'item'
  target: string
  value: number
  description: string
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_visit',
    name: '初入灵墟',
    description: '第一次访问灵墟',
    icon: '🌟',
    category: 'exploration',
    rarity: 'common',
    conditions: [
      { type: 'visit', target: 'home', value: 1, description: '访问首页' }
    ],
    rewards: [
      { type: 'lingqi', value: 10, description: '获得灵气' },
      { type: 'exp', value: 10, description: '获得经验' }
    ]
  },
  {
    id: 'explorer_tian',
    name: '天时探索者',
    description: '探索天时模块的所有子模块',
    icon: '☁️',
    category: 'exploration',
    rarity: 'rare',
    conditions: [
      { type: 'visit', target: 'tian', value: 1, description: '访问天时模块' },
      { type: 'visit', target: 'tian/jieqi', value: 1, description: '访问节气页面' },
      { type: 'visit', target: 'tian/xingxiu', value: 1, description: '访问星宿页面' },
      { type: 'visit', target: 'tian/zhanbu', value: 1, description: '访问占卜页面' },
      { type: 'visit', target: 'tian/yunshi', value: 1, description: '访问运势页面' }
    ],
    rewards: [
      { type: 'lingqi', value: 50, description: '获得灵气' },
      { type: 'exp', value: 100, description: '获得经验' }
    ]
  },
  {
    id: 'explorer_xuan',
    name: '玄学探索者',
    description: '探索玄学模块的所有子模块',
    icon: '🔮',
    category: 'exploration',
    rarity: 'rare',
    conditions: [
      { type: 'visit', target: 'xuan', value: 1, description: '访问玄学模块' },
      { type: 'visit', target: 'xuan/yijing', value: 1, description: '访问易经页面' },
      { type: 'visit', target: 'xuan/bazi', value: 1, description: '访问八字页面' },
      { type: 'visit', target: 'xuan/liuyao', value: 1, description: '访问六爻页面' },
      { type: 'visit', target: 'xuan/fulu', value: 1, description: '访问符箓页面' }
    ],
    rewards: [
      { type: 'lingqi', value: 50, description: '获得灵气' },
      { type: 'exp', value: 100, description: '获得经验' }
    ]
  },
  {
    id: 'explorer_all',
    name: '全域探索者',
    description: '探索所有八大模块',
    icon: '🌌',
    category: 'exploration',
    rarity: 'epic',
    conditions: [
      { type: 'visit', target: 'tian', value: 1, description: '访问天时模块' },
      { type: 'visit', target: 'di', value: 1, description: '访问地理模块' },
      { type: 'visit', target: 'xuan', value: 1, description: '访问玄学模块' },
      { type: 'visit', target: 'lishi', value: 1, description: '访问历史模块' },
      { type: 'visit', target: 'yu', value: 1, description: '访问宇模块' },
      { type: 'visit', target: 'zhou', value: 1, description: '访问宙模块' },
      { type: 'visit', target: 'hong', value: 1, description: '访问洪荒模块' },
      { type: 'visit', target: 'huang-lost', value: 1, description: '访问失落模块' }
    ],
    rewards: [
      { type: 'lingqi', value: 200, description: '获得大量灵气' },
      { type: 'exp', value: 500, description: '获得大量经验' },
      { type: 'achievement', value: '全域探索者', description: '解锁称号' }
    ]
  },
  {
    id: 'bazi_master',
    name: '八字大师',
    description: '完成100次八字排盘',
    icon: '⏰',
    category: 'knowledge',
    rarity: 'epic',
    conditions: [
      { type: 'count', target: 'bazi_calculation', value: 100, description: '八字排盘100次' }
    ],
    rewards: [
      { type: 'lingqi', value: 100, description: '获得灵气' },
      { type: 'knowledge', value: '八字精通', description: '解锁八字精通' }
    ]
  },
  {
    id: 'liuyao_master',
    name: '六爻大师',
    description: '完成100次六爻占卜',
    icon: '🔮',
    category: 'knowledge',
    rarity: 'epic',
    conditions: [
      { type: 'count', target: 'liuyao_divination', value: 100, description: '六爻占卜100次' }
    ],
    rewards: [
      { type: 'lingqi', value: 100, description: '获得灵气' },
      { type: 'knowledge', value: '六爻精通', description: '解锁六爻精通' }
    ]
  },
  {
    id: 'cultivation_novice',
    name: '修行入门',
    description: '达到5级',
    icon: '🌱',
    category: 'cultivation',
    rarity: 'common',
    conditions: [
      { type: 'level', target: 'user', value: 5, description: '达到5级' }
    ],
    rewards: [
      { type: 'lingqi', value: 30, description: '获得灵气' }
    ]
  },
  {
    id: 'cultivation_master',
    name: '修行有成',
    description: '达到10级',
    icon: '⭐',
    category: 'cultivation',
    rarity: 'rare',
    conditions: [
      { type: 'level', target: 'user', value: 10, description: '达到10级' }
    ],
    rewards: [
      { type: 'lingqi', value: 100, description: '获得灵气' },
      { type: 'achievement', value: '修行有成', description: '解锁称号' }
    ]
  },
  {
    id: 'lingqi_collector',
    name: '灵气收集者',
    description: '累计获得1000灵气',
    icon: '💫',
    category: 'cultivation',
    rarity: 'rare',
    conditions: [
      { type: 'lingqi', target: 'total', value: 1000, description: '累计获得1000灵气' }
    ],
    rewards: [
      { type: 'exp', value: 200, description: '获得经验' }
    ]
  },
  {
    id: 'daily_dedication',
    name: '持之以恒',
    description: '连续签到30天',
    icon: '📅',
    category: 'special',
    rarity: 'epic',
    conditions: [
      { type: 'count', target: 'consecutive_signin', value: 30, description: '连续签到30天' }
    ],
    rewards: [
      { type: 'lingqi', value: 300, description: '获得大量灵气' },
      { type: 'achievement', value: '持之以恒', description: '解锁称号' }
    ]
  },
  {
    id: 'night_owl',
    name: '夜猫子',
    description: '在凌晨0点-4点访问网站',
    icon: '🦉',
    category: 'special',
    rarity: 'rare',
    conditions: [
      { type: 'time', target: 'hour', value: 0, description: '在凌晨访问' }
    ],
    rewards: [
      { type: 'lingqi', value: 20, description: '获得灵气' }
    ]
  },
  {
    id: 'early_bird',
    name: '早起鸟儿',
    description: '在早上5点-7点访问网站',
    icon: '🐦',
    category: 'special',
    rarity: 'rare',
    conditions: [
      { type: 'time', target: 'hour', value: 5, description: '在清晨访问' }
    ],
    rewards: [
      { type: 'lingqi', value: 20, description: '获得灵气' }
    ]
  }
]

// ==================== 事件生成器 ====================

export function generateRandomEvent(): GameEvent {
  const event = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)]
  
  return {
    ...event,
    id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date()
  }
}

export function generateEventByType(type: EventType): GameEvent {
  const filteredEvents = RANDOM_EVENTS.filter(e => e.type === type)
  if (filteredEvents.length === 0) {
    return generateRandomEvent()
  }
  
  const event = filteredEvents[Math.floor(Math.random() * filteredEvents.length)]
  
  return {
    ...event,
    id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date()
  }
}

export function generateEventByRarity(rarity: 'common' | 'rare' | 'epic' | 'legendary'): GameEvent {
  const filteredEvents = RANDOM_EVENTS.filter(e => e.rarity === rarity)
  if (filteredEvents.length === 0) {
    return generateRandomEvent()
  }
  
  const event = filteredEvents[Math.floor(Math.random() * filteredEvents.length)]
  
  return {
    ...event,
    id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date()
  }
}

// ==================== 成就检查器 ====================

export function checkAchievement(
  achievement: Achievement,
  userStats: {
    level: number
    lingqi: number
    totalLingqi: number
    visitedPages: string[]
    counts: Record<string, number>
    items: string[]
  }
): boolean {
  return achievement.conditions.every(condition => {
    switch (condition.type) {
      case 'visit':
        return userStats.visitedPages.includes(condition.target)
      case 'count':
        return (userStats.counts[condition.target] || 0) >= condition.value
      case 'level':
        return userStats.level >= condition.value
      case 'lingqi':
        return condition.target === 'total'
          ? userStats.totalLingqi >= condition.value
          : userStats.lingqi >= condition.value
      case 'item':
        return userStats.items.includes(condition.target)
      case 'time':
        const hour = new Date().getHours()
        if (condition.target === 'hour') {
          return hour >= condition.value && hour < condition.value + 2
        }
        return false
      default:
        return false
    }
  })
}

export function checkAllAchievements(
  userStats: {
    level: number
    lingqi: number
    totalLingqi: number
    visitedPages: string[]
    counts: Record<string, number>
    items: string[]
    unlockedAchievements: string[]
  }
): Achievement[] {
  return ACHIEVEMENTS.filter(achievement => 
    !userStats.unlockedAchievements.includes(achievement.id) &&
    checkAchievement(achievement, userStats)
  )
}

// ==================== 事件处理器 ====================

export function processEventChoice(
  event: GameEvent,
  choiceId: string
): {
  success: boolean
  effects: EventEffect[]
  message: string
} {
  const choice = event.choices?.find(c => c.id === choiceId)
  
  if (!choice) {
    return {
      success: false,
      effects: [],
      message: '无效的选择'
    }
  }
  
  if (choice.successRate !== undefined) {
    const roll = Math.random()
    const success = roll < choice.successRate
    
    return {
      success,
      effects: success ? choice.effects : [],
      message: success ? choice.successMessage || '成功！' : choice.failMessage || '失败...'
    }
  }
  
  return {
    success: true,
    effects: choice.effects,
    message: '你做出了选择。'
  }
}

// ==================== 导出 ====================

export default {
  RANDOM_EVENTS,
  ACHIEVEMENTS,
  generateRandomEvent,
  generateEventByType,
  generateEventByRarity,
  checkAchievement,
  checkAllAchievements,
  processEventChoice
}
