// ============================================
// 数学工具函数
// ============================================

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

export function normalize(num: number, min: number, max: number): number {
  return (num - min) / (max - min)
}

export function map(
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
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

export function variance(arr: number[]): number {
  const m = mean(arr)
  return mean(arr.map(n => Math.pow(n - m, 2)))
}

export function stdDev(arr: number[]): number {
  return Math.sqrt(variance(arr))
}

export function min(arr: number[]): number {
  return Math.min(...arr)
}

export function max(arr: number[]): number {
  return Math.max(...arr)
}

export function round(num: number, decimals = 0): number {
  const factor = Math.pow(10, decimals)
  return Math.round(num * factor) / factor
}

export function floor(num: number, decimals = 0): number {
  const factor = Math.pow(10, decimals)
  return Math.floor(num * factor) / factor
}

export function ceil(num: number, decimals = 0): number {
  const factor = Math.pow(10, decimals)
  return Math.ceil(num * factor) / factor
}

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b)
}

export function factorial(n: number): number {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}

export function fibonacci(n: number): number[] {
  const result = [0, 1]
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2])
  }
  return result.slice(0, n)
}
