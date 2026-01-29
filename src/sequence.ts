import type {
  Comparator,
  Consumer,
  Mapper,
  Predicate,
  Reducer,
} from "./types"

export function isIterable<T>(
  obj: unknown
): obj is Iterable<T> {
  return (obj != null) && (typeof (obj as any)[Symbol.iterator] === "function")
}

export function* cycleQuard<T extends object>(
  iterable: Iterable<T>
): IterableIterator<T> {
  if (!isIterable(iterable))
    throw new TypeError("The iterable is not iterable.")

  const visited = new Set<T>()
  for (const element of iterable) {
    if (visited.has(element))
      throw new Error(
        "Cycle detected: The iterable contains a circular reference.")
    visited.add(element)
    yield element
  }
}

export function* entries<T>(
  iterable: Iterable<T>
): IterableIterator<[number, T]> {
  let index = 0
  for (const element of iterable)
    yield [index++, element]
}

export function* values<T>(
  iterable: Iterable<T>
): IterableIterator<T> {
  for (const element of iterable)
    yield element
}

export function* keys<T>(
  iterable: Iterable<T>
): IterableIterator<number> {
  let index = 0
  for (const element of iterable)
    yield index++
}

export function length<T>(
  iterable: Iterable<T>
): number {
  let count = 0
  for (const _ of iterable)
    count++
  return count
}

export function first<T>(
  iterable: Iterable<T>
): T | undefined {
  return iterable[Symbol.iterator]().next().value
}

export function last<T>(
  iterable: Iterable<T>
): T | undefined {
  let last
  for (const element of iterable)
    last = element
  return last
}

export function forEach<T>(
  iterable: Iterable<T>,
  callback: Consumer<T>
): void {
  let index = 0
  for (const element of iterable)
    callback(element, index++, iterable)
}

export function some<T>(
  iterable: Iterable<T>,
  predicate: Predicate<T>
): boolean {
  let index = 0
  for (const element of iterable) {
    if (predicate(element, index++, iterable))
      return true
  }
  return false
}

export function every<T>(
  iterable: Iterable<T>,
  predicate: Predicate<T>
): boolean {
  let index = 0
  for (const element of iterable) {
    if (!predicate(element, index++, iterable))
      return false
  }
  return true
}

export function find<T>(
  iterable: Iterable<T>,
  predicate: Predicate<T>
): T | undefined {
  let index = 0
  for (const element of iterable) {
    if (predicate(element, index++, iterable))
      return element
  }
}

export function findIndex<T>(
  iterable: Iterable<T>,
  predicate: Predicate<T>
): number {
  let index = 0
  for (const element of iterable) {
    if (predicate(element, index++, iterable))
      return index
  }
  return -1
}

export function at<T>(
  iterable: Iterable<T>,
  index: number
): T | undefined {
  let i = 0
  for (const element of iterable)
    if (i++ === index)
      return element
}

export function includes<T>(
  iterable: Iterable<T>,
  item: T
): boolean {
  for (const element of iterable) {
    if (element === item)
      return true
  }
  return false
}

export function indexOf<T>(
  iterable: Iterable<T>,
  item: T
): number {
  let index = -1
  for (const element of iterable) {
    index++
    if (element === item)
      return index
  }
  return -1
}

export function* filter<T>(
  iterable: Iterable<T>,
  predicate: Predicate<T>
): IterableIterator<T> {
  let index = 0
  for (const element of iterable)
    if (predicate(element, index++, iterable))
      yield element
}

export function* map<T, U>(
  iterable: Iterable<T>,
  mapper: Mapper<T, U>
): IterableIterator<U> {
  let index = 0
  for (const element of iterable)
    yield mapper(element, index++, iterable)
}

export function* slice<T>(
  iterable: Iterable<T>,
  start: number,
  end?: number
): IterableIterator<T> {
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

export function* take<T>(
  iterable: Iterable<T>,
  count: number
): IterableIterator<T> {
  let index = 0
  for (const element of iterable) {
    if (++index > count)
      break
    yield element
  }
}

export function* zip<T, U>(
  iterable1: Iterable<T>,
  iterable2: Iterable<U>
): IterableIterator<[T, U]> {
  const iterator1 = iterable1[Symbol.iterator]()
  const iterator2 = iterable2[Symbol.iterator]()
  while (true) {
    const { value: value1, done: done1 } = iterator1.next()
    const { value: value2, done: done2 } = iterator2.next()
    if (done1 || done2)
      return
    yield [value1, value2]
  }
}

export function* batch<T>(
  iterable: Iterable<T>,
  size: number
): IterableIterator<T[]> {
  let group: T[] = []
  for (const element of iterable) {
    group.push(element)
    if (group.length === size) {
      yield group
      group = []
    }
  }
  if (group.length > 0)
    yield group
}

export function* flat<T>(
  iterable: Iterable<T | Iterable<T>>,
  depth?: number
): IterableIterator<T> {
  if (depth == null)
    depth = 1

  for (const element of iterable) {
    if (isIterable(element)) {
      if (depth > 1)
        yield* flat(element, depth - 1)
      else
        yield* element
    } else
      yield element
  }
}

const defaultComparator = <T>(a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0)
export function min<T>(
  iterable: Iterable<T>,
  comparator?: Comparator<T>
): T | undefined {
  if (comparator == null)
    comparator = defaultComparator

  let min
  for (const element of iterable) {
    if ((min == null) || comparator(min, element) > 0)
      min = element
  }
  return min
}

export function max<T>(
  iterable: Iterable<T>,
  comparator?: Comparator<T>
): T | undefined {
  if (comparator == null)
    comparator = defaultComparator

  let max
  for (const element of iterable) {
    if ((max == null) || comparator(max, element) < 0)
      max = element
  }
  return max
}
