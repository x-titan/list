export type Predicate<T = any> = (value: T, index: number, thisArg: any) => boolean
export type MapIterator<T = any, U = T> = (value: T, index: number, thisArg: any) => U
export type Comparator<T = any> = (a: T, b: T) => number
export type Iterator<T = any> = (value: T, index: number, thisArg: any) => void
