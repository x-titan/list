import type {
  Predicate,
  Mapper,
} from "./types"

export function* map<T, U>(iterable: Iterable<T>, mapper: Mapper<T, U>) {
  let index = 0
  for (const element of iterable)
    yield mapper(element, index++, iterable) as U
}

export function* filter<T>(iterable: Iterable<T>, predicate: Predicate<T>) {
  let index = 0
  for (const element of iterable) {
    if (predicate(element, index++, iterable))
      yield element
  }
}

export function* slice<T>(iterable: Iterable<T>, start: number, end?: number) {
  let index = 0

  for (const element of iterable) {
    if (index >= start) {
      if (end !== undefined && index >= end)
        break
      yield element
    }
    index++
  }
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
