import Collection from "./collection/collection"

import {
  clear,
  filter,
  map,
  push,
  removeFirst,
  removeLast,
  reverse,
  unshift,
} from "./collection/linkedlist"

import {
  every,
  find,
  findIndex,
  forEach,
  includes,
  indexOf,
  some,
} from "./collection/iterable"

import type {
  Consumer,
  Mapper,
  Predicate,
} from "./types"

export default class List<T = any> extends Collection<T> {
  push(...items: T[]) { return (push<T>).call(this, ...items) }
  pop() { return (removeLast<T>).call(this) }
  unshift(...items: T[]) { return (unshift<T>).call(this, ...items) }
  shift() { return (removeFirst<T>).call(this) }
  reverse() { return (reverse<T>).call(this) }
  clear() { return (clear<T>).call(this) }

  forEach(iterator: Consumer<T>) { return (forEach<T>).call(this, iterator) }
  find(predicate: Predicate<T>) { return (find<T>).call(this, predicate) }
  some(predicate: Predicate<T>) { return (some<T>).call(this, predicate) }
  every(predicate: Predicate<T>) { return (every<T>).call(this, predicate) }
  filter(predicate: Predicate<T>) { return (filter<T>).call(this, predicate) }
  includes(item: T) { return (includes<T>).call(this, item) }
  indexOf(item: T) { return (indexOf<T>).call(this, item) }
  findIndex(predicate: Predicate<T>) { return (findIndex<T>).call(this, predicate) }
  map<U = T>(iterator: Mapper<T, U>) { return (map<T, U>).call(this, iterator) }
}
