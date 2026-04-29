/**
 * 灵墟 - 工具函数
 * LingXu Utility Functions
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// 合并 Tailwind 类名
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 获取基础路径（域名根路径）
export function getBasePath(): string {
  return ''
}

// 拼接路径
export function withBase(path: string): string {
  const base = getBasePath()
  if (path.startsWith('/')) {
    return `${base}${path}`
  }
  return `${base}/${path}`
}

// 延迟执行
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 随机整数
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 随机选择数组元素
export function randomChoice<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)]
}

// 随机打乱数组
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/* ==========================================================================
   ✅ 灵墟标准防泄漏工具库 - 解决Canvas特效残留核心问题
   所有Canvas/WebGL/动画组件必须复用此标准！
   ========================================================================== */



/**
 * 暴力全局清理 - 路由跳转前调用
 * 绝杀：清空页面上所有Canvas，不管是谁创建的
 */
export function destroyAllCanvasOnPage(): void {
  document.querySelectorAll('canvas').forEach(canvas => {
    try {
      const ctx2d = canvas.getContext('2d')
      if (ctx2d) ctx2d.clearRect(0, 0, canvas.width, canvas.height)
      const gl = canvas.getContext('webgl') || canvas.getContext('webgl2')
      if (gl) {
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
      }
    } catch (e) {}
  })
}



// 获取农历日期（简化版，完整版需要 lunar-javascript 库）
export function getLunarDate(date: Date = new Date()): { year: number; month: number; day: number; monthName: string } {
  // 这里使用简化计算，实际项目中使用 lunar-javascript 库
  const lunarMonths = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']
  // 返回简化结果，实际需要完整农历算法
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    monthName: lunarMonths[date.getMonth()],
  }
}

// 获取当前节气
export function getCurrentJieqi(date: Date = new Date()): string {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const jieqiDates: [number, number, string][] = [
    [2, 4, '立春'], [2, 19, '雨水'], [3, 6, '惊蛰'], [3, 21, '春分'],
    [4, 5, '清明'], [4, 20, '谷雨'], [5, 6, '立夏'], [5, 21, '小满'],
    [6, 6, '芒种'], [6, 21, '夏至'], [7, 7, '小暑'], [7, 23, '大暑'],
    [8, 8, '立秋'], [8, 23, '处暑'], [9, 8, '白露'], [9, 23, '秋分'],
    [10, 8, '寒露'], [10, 23, '霜降'], [11, 7, '立冬'], [11, 22, '小雪'],
    [12, 7, '大雪'], [12, 22, '冬至'], [1, 6, '小寒'], [1, 20, '大寒'],
  ]
  
  for (let i = jieqiDates.length - 1; i >= 0; i--) {
    const [m, d, name] = jieqiDates[i]
    const mNum = m as number
    const dNum = d as number
    if (month > mNum || (month === mNum && day >= dNum)) {
      return name
    }
  }
  
  return '大寒'
}

// 获取星座
export function getZodiac(month: number, day: number): string {
  const zodiacs = [
    { name: '摩羯座', start: [1, 1], end: [1, 19] },
    { name: '水瓶座', start: [1, 20], end: [2, 18] },
    { name: '双鱼座', start: [2, 19], end: [3, 20] },
    { name: '白羊座', start: [3, 21], end: [4, 19] },
    { name: '金牛座', start: [4, 20], end: [5, 20] },
    { name: '双子座', start: [5, 21], end: [6, 21] },
    { name: '巨蟹座', start: [6, 22], end: [7, 22] },
    { name: '狮子座', start: [7, 23], end: [8, 22] },
    { name: '处女座', start: [8, 23], end: [9, 22] },
    { name: '天秤座', start: [9, 23], end: [10, 23] },
    { name: '天蝎座', start: [10, 24], end: [11, 22] },
    { name: '射手座', start: [11, 23], end: [12, 21] },
    { name: '摩羯座', start: [12, 22], end: [12, 31] },
  ]
  
  for (const zodiac of zodiacs) {
    const [startMonth, startDay] = zodiac.start
    const [endMonth, endDay] = zodiac.end
    
    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    ) {
      return zodiac.name
    }
  }
  
  return '摩羯座'
}

// 获取生肖
export function getShengxiao(year: number): string {
  const shengxiao = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
  const index = (year - 4) % 12
  return shengxiao[index >= 0 ? index : index + 12]
}

// 计算天干地支
export function getGanzhi(year: number, month: number, day: number): {
  yearGanzhi: string
  monthGanzhi: string
  dayGanzhi: string
} {
  const tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  const dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  
  // 年干支（简化计算）
  const yearIndex = (year - 4) % 60
  const yearGanzhi = tiangan[yearIndex % 10] + dizhi[yearIndex % 12]
  
  // 月干支（简化计算）
  const monthIndex = (year * 12 + month + 13) % 60
  const monthGanzhi = tiangan[monthIndex % 10] + dizhi[monthIndex % 12]
  
  // 日干支（简化计算，实际需要完整算法）
  const baseDate = new Date(1900, 0, 31)
  const targetDate = new Date(year, month - 1, day)
  const daysDiff = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))
  const dayIndex = daysDiff % 60
  const dayGanzhi = tiangan[dayIndex % 10] + dizhi[dayIndex % 12]
  
  return { yearGanzhi, monthGanzhi, dayGanzhi }
}

// 生成随机卦象
export function randomGua(): { num: number; name: string; meaning: string } {
  const gua = [
    { num: 1, name: '乾', meaning: '元亨利贞，刚健进取' },
    { num: 2, name: '坤', meaning: '厚德载物，顺势而为' },
    { num: 3, name: '屯', meaning: '刚柔始交，艰难创业' },
    { num: 4, name: '蒙', meaning: '启蒙教化，循序渐进' },
    { num: 5, name: '需', meaning: '等待时机，耐心守候' },
    { num: 6, name: '讼', meaning: '争讼止息，以和为贵' },
    { num: 7, name: '师', meaning: '行军打仗，纪律严明' },
    { num: 8, name: '比', meaning: '亲密团结，携手共进' },
  ]
  return randomChoice(gua)
}

// 平滑滚动到元素
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId)
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

// 复制文本到剪贴板
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (e) {
    console.error('复制失败:', e)
    return false
  }
}

// 本地存储封装
export const storage = {
  get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  
  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('存储失败:', e)
    }
  },
  
  remove(key: string): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  },
}

// 节流函数
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }) as T
}

// 防抖函数
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): T {
  let timeout: NodeJS.Timeout
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}
