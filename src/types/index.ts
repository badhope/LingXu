// ============================================
// 灵墟 TypeScript 类型工具库 v2.0
// ============================================
// 30+ 泛型 + 高级类型工具
// 参考：ts-toolbelt + type-fest
// ============================================

// =============== 对象工具类型 ===============

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

export type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P]
}

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export type ReadonlyBy<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>

export type MutableBy<T, K extends keyof T> = Omit<T, K> & {
  -readonly [P in K]: T[P]
}

export type Nullable<T> = { [P in keyof T]: T[P] | null }

export type NullableBy<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: T[P] | null
}

export type NonNullableBy<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: NonNullable<T[P]>
}

export type Promisify<T> = { [P in keyof T]: Promise<T[P]> }

export type Awaited<T> = T extends Promise<infer U> ? U : T

export type Overwrite<T, U> = Omit<T, keyof U> & U

export type Assign<T, U> = Omit<T, keyof U> & U

export type Merge<T extends object, U extends object> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never
}

// =============== 函数工具类型 ===============

export type AnyFunction = (...args: any[]) => any

export type AnyAsyncFunction = (...args: any[]) => Promise<any>

export type Parameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never

export type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never

export type PromiseReturnType<T extends AnyAsyncFunction> = Awaited<
  ReturnType<T>
>

export type FirstParameter<T extends AnyFunction> = T extends (
  arg: infer P,
  ...args: any[]
) => any
  ? P
  : never

export type LastParameter<T extends AnyFunction> = T extends (
  ...args: infer P
) => any
  ? P extends [...any[], infer L]
    ? L
    : never
  : never

// =============== 数组工具类型 ===============

export type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never

export type Tail<T extends any[]> = T extends [any, ...infer T_] ? T_ : never

export type Last<T extends any[]> = T extends [...any[], infer L] ? L : never

export type Init<T extends any[]> = T extends [...infer I, any] ? I : never

export type Length<T extends any[]> = T['length']

export type Concat<T extends any[], U extends any[]> = [...T, ...U]

export type Push<T extends any[], U> = [...T, U]

export type Pop<T extends any[]> = T extends [...infer I, any] ? I : never

export type Shift<T extends any[]> = T extends [any, ...infer T_] ? T_ : never

export type Unshift<T extends any[], U> = [U, ...T]

export type Reverse<T extends any[]> = T extends [infer H, ...infer T_]
  ? [...Reverse<T_>, H]
  : []

export type Includes<T extends any[], U> = U extends T[number] ? true : false

export type Join<T extends string[], Separator extends string = ''> = T extends [
  infer H,
  ...infer T_
]
  ? T_['length'] extends 0
    ? H
    : `${H & string}${Separator}${Join<T_ & string[], Separator>}`
  : ''

// =============== 字符串工具类型 ===============

export type Trim<T extends string> = T extends ` ${infer U}`
  ? Trim<U>
  : T extends `${infer U} `
  ? Trim<U>
  : T

export type StartsWith<
  T extends string,
  Prefix extends string
> = T extends `${Prefix}${string}` ? true : false

export type EndsWith<
  T extends string,
  Suffix extends string
> = T extends `${string}${Suffix}` ? true : false

export type Replace<
  T extends string,
  From extends string,
  To extends string
> = T extends `${infer Before}${From}${infer After}`
  ? `${Before}${To}${After}`
  : T

export type ReplaceAll<
  T extends string,
  From extends string,
  To extends string
> = T extends `${infer Before}${From}${infer After}`
  ? `${Before}${To}${ReplaceAll<After, From, To>}`
  : T

export type Split<
  T extends string,
  Separator extends string
> = T extends `${infer H}${Separator}${infer T_}`
  ? [H, ...Split<T_, Separator>]
  : [T]

// =============== 条件工具类型 ===============

export type If<C extends boolean, T, F> = C extends true ? T : F

export type And<C1 extends boolean, C2 extends boolean> = C1 extends true
  ? C2 extends true
    ? true
    : false
  : false

export type Or<C1 extends boolean, C2 extends boolean> = C1 extends true
  ? true
  : C2 extends true
  ? true
  : false

export type Not<C extends boolean> = C extends true ? false : true

export type Xor<C1 extends boolean, C2 extends boolean> = C1 extends C2
  ? false
  : true

export type IsNever<T> = [T] extends [never] ? true : false

export type IsAny<T> = 0 extends 1 & T ? true : false

export type IsUnknown<T> = IsNever<T> extends false
  ? T extends unknown
  ? unknown extends T
  ? IsAny<T> extends false
  ? true
  : false
  : false
  : false
  : false

export type Equals<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false

export type Extends<A, B> = A extends B ? true : false

// =============== 公共工具类型 ===============

export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null

export type Literal = string | number | boolean

export type EmptyObject = Record<PropertyKey, never>

export type AnyObject = Record<PropertyKey, any>

export type UnknownObject = Record<PropertyKey, unknown>

export type Nil = null | undefined

export type Maybe<T> = T | undefined

export type MaybeNull<T> = T | null

export type MaybeNil<T> = T | null | undefined

export type AsyncOrSync<T> = Promise<T> | T

export type List<T> = ArrayLike<T>

export type Builtin =
  | Primitive
  | Function
  | Date
  | Error
  | RegExp
  | { readonly [Symbol.toStringTag]: string }

export type NoInfer<T> = [T][T extends any ? 0 : never]

export type ValueOf<T extends object> = T[keyof T]

export type KeyOf<T extends object> = keyof T

export type EntryOf<T extends object> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]

export type Entries<T extends object> = Array<EntryOf<T>>

export type KeysOfUnion<T> = T extends T ? keyof T : never
