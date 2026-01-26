import type {
  Consumer,
  Predicate,
} from "../types"

export function some<T = any>(
  this: Iterable<T>,
  predicate: Predicate
) {
  if (typeof predicate !== "function")
    throw new TypeError("predicate must be a function.")

  let index = 0
  for (const element of this) {
    if (predicate(element, index++, this))
      return true
  }
  return false
}

export function every<T = any>(
  this: Iterable<T>,
  predicate: Predicate
) {
  if (typeof predicate !== "function")
    throw new TypeError("predicate must be a function.")

  let index = 0
  for (const element of this) {
    if (!predicate(element, index++, this))
      return false
  }
  return true
}

export function find<T = any>(
  this: Iterable<T>,
  predicate: Predicate
) {
  let index = 0
  for (const element of this) {
    if (predicate(element, index++, this))
      return element
  }
}

export function indexOf<T = any>(
  this: Iterable<T>,
  item: T
) {
  let index = -1
  for (const element of this) {
    index++
    if (element === item)
      return index
  }
  return -1
}

export function forEach<T = any>(
  this: Iterable<T>,
  callback: Consumer<T>
) {
  let index = 0
  for (const element of this) {
    callback(element, index++, this)
  }
}

export function includes<T = any>(
  this: Iterable<T>,
  item: T
) {
  return indexOf.call(this, item) !== -1
}

export function findIndex<T = any>(
  this: Iterable<T>,
  predicate: Predicate
) {
  if (typeof predicate !== "function")
    throw new TypeError("predicate must be a function.")

  let index = -1
  for (const element of this) {
    index++
    if (predicate(element, index, this))
      return index
  }
  return -1
}
