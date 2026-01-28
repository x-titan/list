import type {
  Predicate,
} from "./types"

export function find<T>(iterable: Iterable<T>, predicate: Predicate<T>) {
  let index = 0
  for (const element of iterable) {
    if (predicate(element, index++, iterable))
      return element
  }
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

export function findIndex<T>(iterable: Iterable<T>, predicate: Predicate<T>) {
  let index = -1
  for (const element of iterable) {
    index++
    if (predicate(element, index, iterable))
      return index
  }
  return -1
}

export function at<T>(iterable: Iterable<T>, index: number) {
  let i = 0
  for (const element of iterable) {
    if (i === index)
      return element
    i++
  }
}

export function includes<T>(iterable: Iterable<T>, item: T) {
  let index = -1
  for (const element of iterable) {
    index++
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
