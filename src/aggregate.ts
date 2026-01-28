import type {
  Consumer,
  Reducer,
} from "./types"

export function length<T>(iterable: Iterable<T>) {
  let count = 0
  for (const _ of iterable)
    count++
  return count
}

export function first<T>(iterable: Iterable<T>) {
  for (const element of iterable)
    return element
}

export function last<T>(iterable: Iterable<T>) {
  let last
  for (const element of iterable)
    last = element
  return last
}

export function forEach<T>(iterable: Iterable<T>, callback: Consumer<T>) {
  let index = 0
  for (const element of iterable)
    callback(element, index++, iterable)
}

export function reduce<T, U>(iterable: Iterable<T>, reducer: Reducer<T, U>, initial?: U) {
  let accumulator = initial as U
  let index = 0
  for (const element of iterable)
    accumulator = reducer(accumulator, element, index++, iterable)
  return accumulator
}
