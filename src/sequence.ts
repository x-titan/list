import type {
  Consumer,
  Mapper,
  Predicate,
  Reducer,
} from "./types"

export function isIterable<T>(obj: unknown): obj is Iterable<T> {
  return (obj != null) && (typeof (obj as any)[Symbol.iterator] === "function")
}

export function* entries<T>(iterable: Iterable<T>) {
  let index = 0
  for (const element of iterable)
    yield [index++, element]
}

export function* values<T>(iterable: Iterable<T>) {
  for (const element of iterable)
    yield element
}

export function* keys<T>(iterable: Iterable<T>) {
  let index = 0
  for (const element of iterable)
    yield index++
}

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

export function some<T>(iterable: Iterable<T>, predicate: Predicate<T>) {
  let index = 0
  for (const element of iterable) {
    if (predicate(element, index++, iterable))
      return true
  }
  return false
}

export function every<T>(iterable: Iterable<T>, predicate: Predicate<T>) {
  let index = 0
  for (const element of iterable) {
    if (!predicate(element, index++, iterable))
      return false
  }
  return true
}

export function find<T>(iterable: Iterable<T>, predicate: Predicate<T>) {
  let index = 0
  for (const element of iterable) {
    if (predicate(element, index++, iterable))
      return element
  }
}

export function findIndex<T>(iterable: Iterable<T>, predicate: Predicate<T>) {
  let index = 0
  for (const element of iterable) {
    if (predicate(element, index++, iterable))
      return index
  }
  return -1
}

export function at<T>(iterable: Iterable<T>, index: number) {
  let i = 0
  for (const element of iterable)
    if (i++ === index)
      return element
}

export function includes<T>(iterable: Iterable<T>, item: T) {
  for (const element of iterable) {
    if (element === item)
      return true
  }
  return false
}

export function indexOf<T>(iterable: Iterable<T>, item: T) {
  let index = -1
  for (const element of iterable) {
    index++
    if (element === item)
      return index
  }
  return -1
}

export function* filter<T>(iterable: Iterable<T>, predicate: Predicate<T>) {
  let index = 0
  for (const element of iterable)
    if (predicate(element, index++, iterable))
      yield element
}

export function* map<T, U>(iterable: Iterable<T>, mapper: Mapper<T, U>) {
  let index = 0
  for (const element of iterable)
    yield mapper(element, index++, iterable) as U
}

export function* slice<T>(iterable: Iterable<T>, start: number, end?: number) {
  let index = 0

  for (const element of iterable) {
    if (++index > start) {
      if (end != null && index >= end)
        break
      yield element
    }
  }
}

export function reduce<T, U = T>(
  iterable: Iterable<T>,
  reducer: Reducer<T, U>,
  initial?: U
): U {
  let accumulator: any
  let index = 0
  const iterator = iterable[Symbol.iterator]()

  if (arguments.length < 3) {
    const { value, done } = iterator.next()
    if (done)
      throw new TypeError("Reduce of empty sequence with no initial value")
    accumulator = value
    index++
  } else
    accumulator = initial

  while (true) {
    const { value, done } = iterator.next()
    if (done)
      return accumulator
    accumulator = reducer(accumulator, value, index++, iterable)
  }
}

export function* take<T>(iterable: Iterable<T>, count: number) {
  let index = 0
  for (const element of iterable) {
    if (++index > count)
      break
    yield element
  }
}