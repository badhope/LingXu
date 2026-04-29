// ============================================
// 字符串工具函数
// ============================================

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, '')
}

export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\s+/g, '_')
    .toLowerCase()
}

export function truncate(str: string, length: number, ellipsis = '...'): string {
  if (str.length <= length) return str
  return str.slice(0, length - ellipsis.length) + ellipsis
}

export function padStart(str: string, length: number, char = ' '): string {
  return str.padStart(length, char)
}

export function padEnd(str: string, length: number, char = ' '): string {
  return str.padEnd(length, char)
}

export function trim(str: string): string {
  return str.trim()
}

export function trimStart(str: string): string {
  return str.trimStart()
}

export function trimEnd(str: string): string {
  return str.trimEnd()
}

export function startsWith(str: string, prefix: string): boolean {
  return str.startsWith(prefix)
}

export function endsWith(str: string, suffix: string): boolean {
  return str.endsWith(suffix)
}

export function contains(str: string, substring: string): boolean {
  return str.includes(substring)
}

export function replaceAll(str: string, search: string, replace: string): string {
  return str.split(search).join(replace)
}

export function reverse(str: string): string {
  return str.split('').reverse().join('')
}

export function words(str: string): string[] {
  return str.match(/\w+/g) || []
}

export function repeat(str: string, n: number): string {
  return str.repeat(n)
}
