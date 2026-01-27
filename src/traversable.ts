import type {
  Consumer,
  Mapper,
  Predicate,
} from "./types"

export type Traversable<T> = Iterable<T>

export function isTraversable<T>(obj: unknown): obj is Traversable<T> {
  return (obj != null) && (typeof (obj as any)[Symbol.iterator] === "function")
}

export namespace Traversable {
  export function* entries<T>(this: Traversable<T>) {
    let index = 0
    for (const element of this)
      yield [index++, element]
  }

  export function* values<T>(this: Traversable<T>) {
    for (const element of this)
      yield element
  }

  export function* keys<T>(this: Traversable<T>) {
    let index = 0
    for (const element of this)
      yield index++
  }

  export function length<T>(this: Traversable<T>) {
    let count = 0
    for (const _ of this)
      count++
    return count
  }

  export function first<T>(this: Traversable<T>) {
    for (const element of this)
      return element
  }

  export function last<T>(this: Traversable<T>) {
    let last
    for (const element of this)
      last = element
    return last
  }

  export function forEach<T>(this: Traversable<T>, callback: Consumer<T>) {
    let index = 0
    for (const element of this)
      callback(element, index++, this)
  }

  export function some<T>(this: Traversable<T>, predicate: Predicate<T>) {
    let index = 0
    for (const element of this) {
      if (predicate(element, index++, this))
        return true
    }
    return false
  }

  export function every<T>(this: Traversable<T>, predicate: Predicate<T>) {
    let index = 0
    for (const element of this) {
      if (!predicate(element, index++, this))
        return false
    }
    return true
  }

  export function find<T>(this: Traversable<T>, predicate: Predicate<T>) {
    let index = 0
    for (const element of this) {
      if (predicate(element, index++, this))
        return element
    }
  }

  export function findIndex<T>(this: Traversable<T>, predicate: Predicate<T>) {
    let index = -1
    for (const element of this) {
      index++
      if (predicate(element, index, this))
        return index
    }
    return -1
  }

  export function at<T>(this: Traversable<T>, index: number) {
    let i = 0
    for (const element of this) {
      if (i === index)
        return element
      i++
    }
  }

  export function includes<T>(this: Traversable<T>, item: T) {
    let index = -1
    for (const element of this) {
      index++
      if (element === item)
        return true
    }
    return false
  }

  export function indexOf<T>(this: Traversable<T>, item: T) {
    let index = -1
    for (const element of this) {
      index++
      if (element === item)
        return index
    }
    return -1
  }

  export function* filter<T>(this: Traversable<T>, predicate: Predicate<T>) {
    let index = 0
    for (const element of this) {
      if (predicate(element, index++, this))
        yield element
    }
  }

  export function* map<T, U>(this: Traversable<T>, mapper: Mapper<T, U>) {
    let index = 0
    for (const element of this)
      yield mapper(element, index++, this) as U
  }

  export function* slice<T>(this: Traversable<T>, start: number, end?: number) {
    let index = 0

    for (const element of this) {
      if (index >= start) {
        if (end !== undefined && index >= end)
          break
        yield element
      }
      index++
    }
  }
}
