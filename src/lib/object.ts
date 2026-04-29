// ============================================
// 对象工具函数
// ============================================

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key]
    }
    return acc
  }, {} as Pick<T, K>)
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result as Omit<T, K>
}

export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0
}

export function keys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}

export function values<T extends object>(obj: T): T[keyof T][] {
  return Object.values(obj) as T[keyof T][]
}

export function mapKeys<T extends object>(
  obj: T,
  fn: (key: keyof T, value: T[keyof T]) => string
): Record<string, T[keyof T]> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = fn(key as keyof T, value as T[keyof T])
    acc[newKey] = value as T[keyof T]
    return acc
  }, {} as Record<string, T[keyof T]>)
}

export function mapValues<T extends object, U>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => U
): Record<keyof T, U> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key as keyof T] = fn(value as T[keyof T], key as keyof T)
    return acc
  }, {} as Record<keyof T, U>)
}

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key as keyof T] = deepClone(value)
      return acc
    }, {} as T)
  }
  return obj
}

export function merge<T extends object>(target: T, source: Partial<T>): T {
  return { ...target, ...source }
}

export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const result = { ...target }
  Object.keys(source).forEach(key => {
    const targetValue = result[key as keyof T]
    const sourceValue = source[key as keyof T]
    if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue)
    ) {
      result[key as keyof T] = deepMerge(
        targetValue as object,
        sourceValue as object
      ) as unknown as T[keyof T]
    } else {
      result[key as keyof T] = sourceValue as T[keyof T]
    }
  })
  return result
}
