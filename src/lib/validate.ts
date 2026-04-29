// ============================================
// 验证工具函数
// ============================================

export function isEmail(str: string): boolean {
  return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(str)
}

export function isPhone(str: string): boolean {
  return /^1[3-9]\d{9}$/.test(str)
}

export function isUrl(str: string): boolean {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

export function isIdCard(str: string): boolean {
  return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(str)
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !isNaN(val)
}

export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}

export function isArray(val: unknown): val is unknown[] {
  return Array.isArray(val)
}

export function isObject(val: unknown): val is object {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

export function isFunction(val: unknown): val is (...args: unknown[]) => unknown {
  return typeof val === 'function'
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isUndefined(val: unknown): val is undefined {
  return val === undefined
}

export function isNil(val: unknown): val is null | undefined {
  return val === null || val === undefined
}

export function isEmpty(val: unknown): boolean {
  if (isNil(val)) return true
  if (isString(val) || isArray(val)) return (val as string | unknown[]).length === 0
  if (isObject(val)) return Object.keys(val as object).length === 0
  return false
}

export function isHexColor(str: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(str)
}

export function isChinese(str: string): boolean {
  return /^[\u4e00-\u9fa5]+$/.test(str)
}

export function isEmptyOrWhitespace(str: string): boolean {
  return trim(str).length === 0
}

function trim(str: string) {
  return str.trim()
}
