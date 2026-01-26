import type {
  Predicate,
} from "../collection/extended/types-extended"

export function some<T = any>(iterable: Iterable<T>, predicate: Predicate) {
  let index = 0
  for (const element of iterable) {
    if (predicate(element, index++, iterable))
      return true
  }
  return false
}

export function every<T = any>(iterable: Iterable<T>, predicate: Predicate) {
  let index = 0
  for (const element of iterable) {
    if (!predicate(element, index++, iterable))
      return false
  }
  return true
}

export function find<T = any>(
  iterable: Iterable<T>,
  predicate: Predicate
) {
  let index = 0
  for (const element of iterable) {
    if (predicate(element, index++, iterable))
      return element
  }
}
