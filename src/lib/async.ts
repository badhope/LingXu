// ============================================
// 异步工具函数
// ============================================

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function timeout<T>(promise: Promise<T>, ms: number, error?: Error): Promise<T> {
  return Promise.race([
    promise,
    delay(ms).then(() => Promise.reject(error || new Error('Timeout')))
  ])
}

export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 1000
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries > 0) {
      await delay(delayMs)
      return retry(fn, retries - 1, delayMs)
    }
    throw error
  }
}

export async function mapSeries<T, U>(
  arr: T[],
  fn: (item: T, index: number) => Promise<U>
): Promise<U[]> {
  const result: U[] = []
  for (let i = 0; i < arr.length; i++) {
    result.push(await fn(arr[i], i))
  }
  return result
}

export async function mapParallel<T, U>(
  arr: T[],
  fn: (item: T, index: number) => Promise<U>,
  concurrency = Infinity
): Promise<U[]> {
  const result: U[] = new Array(arr.length)
  let index = 0
  const workers = Array(Math.min(concurrency, arr.length)).fill(0).map(async () => {
    while (index < arr.length) {
      const i = index++
      result[i] = await fn(arr[i], i)
    }
  })
  await Promise.all(workers)
  return result
}

export async function pAll<T>(promises: Promise<T>[]): Promise<T[]> {
  return Promise.all(promises)
}

export async function pRace<T>(promises: Promise<T>[]): Promise<T> {
  return Promise.race(promises)
}

export async function pAny<T>(promises: Promise<T>[]): Promise<T> {
  return Promise.any(promises)
}

export async function pSettled<T>(promises: Promise<T>[]): Promise<PromiseSettledResult<T>[]> {
  return Promise.allSettled(promises)
}

export function promisify<T>(
  fn: (...args: any[]) => void
): (...args: any[]) => Promise<T> {
  return (...args: any[]) =>
    new Promise((resolve, reject) => {
      fn(...args, (err: Error, result: T) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
}

export function defer<T>(): {
  promise: Promise<T>
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
} {
  let resolve!: (value: T | PromiseLike<T>) => void
  let reject!: (reason?: any) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}
