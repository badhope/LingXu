// ============================================
// 数组工具函数
// ============================================

export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

export function compact<T>(arr: (T | null | undefined | false | 0 | '')[]): T[] {
  return arr.filter(Boolean) as T[]
}

export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), [])
}

export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

export function uniqueBy<T>(arr: T[], key: keyof T): T[] {
  const seen = new Set()
  return arr.filter(item => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const groupKey = String(item[key])
    if (!acc[groupKey]) acc[groupKey] = []
    acc[groupKey].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

export function orderBy<T>(
  arr: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...arr].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1
    return 0
  })
}

export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function sample<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function sampleSize<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

export function without<T>(arr: T[], ...values: T[]): T[] {
  return arr.filter(item => !values.includes(item))
}

export function intersection<T>(a: T[], b: T[]): T[] {
  return a.filter(item => b.includes(item))
}

export function difference<T>(a: T[], b: T[]): T[] {
  return a.filter(item => !b.includes(item))
}

export function union<T>(...arrs: T[][]): T[] {
  return unique(flatten(arrs))
}

export function zip<T, U>(a: T[], b: U[]): [T, U][] {
  const length = Math.min(a.length, b.length)
  return Array.from({ length }, (_, i) => [a[i], b[i]])
}

export function range(start: number, end?: number, step = 1): number[] {
  const actualStart = end === undefined ? 0 : start
  const actualEnd = end === undefined ? start : end
  const result: number[] = []
  for (let i = actualStart; i < actualEnd; i += step) {
    result.push(i)
  }
  return result
}

export function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0)
}

export function mean(arr: number[]): number {
  return sum(arr) / arr.length
}

export function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

export function first<T>(arr: T[]): T | undefined {
  return arr[0]
}

export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}

export function take<T>(arr: T[], n: number): T[] {
  return arr.slice(0, n)
}

export function drop<T>(arr: T[], n: number): T[] {
  return arr.slice(n)
}

export function dropRight<T>(arr: T[], n: number): T[] {
  return arr.slice(0, -n || undefined)
}
