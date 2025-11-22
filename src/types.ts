export type Predicate<T> = (value: T, index: number, thisArg: any) => boolean
export type MapIterator<T> = (value: T, index: number, thisArg: any) => T
export type Comparator<T> = (a: T, b: T) => number
export type ForEachIterator<T> = (value: T, index: number, thisArg: any) => void
