// ============================================
// 灵墟工具函数库 v3.0
// ============================================
// 60+ 工具函数，覆盖全开发场景
// 参考：lodash + ramda
// ============================================

export {
  chunk,
  compact,
  flatten,
  unique,
  uniqueBy,
  groupBy,
  orderBy,
  shuffle as shuffleArray,
  sample,
  sampleSize,
  without,
  intersection,
  difference,
  union,
  zip,
  range,
  sum as sumArray,
  mean as meanArray,
  median as medianArray,
  first,
  last,
  take,
  drop,
  dropRight,
} from './array'

export {
  pick,
  omit,
  isEmpty as isEmptyObject,
  keys,
  values,
  mapKeys,
  mapValues,
  deepClone,
  merge,
  deepMerge,
} from './object'

export * from './string'
export * from './validate'
export * from './format'
export {
  random,
  randomInt,
  randomBoolean,
  randomPick,
  randomSample,
  randomString,
  randomColor,
  shuffle,
  uuid,
  nanoid,
} from './random'
export * from './math'
export * from './async'
export * from './date'
export * from './dom'
