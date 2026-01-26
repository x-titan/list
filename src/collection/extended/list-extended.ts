import { prepare } from ".."
import List from "../list"
import Node from "../node"

import {
  bubbleSort,
} from "../../utils/sorter"

import type {
  Comparator,
  Iterator,
  Predicate,
  MapIterator
} from "./types-extended"

function isUnsignedInteger(value: unknown): value is number {
  return (typeof value === "number") && isFinite(value) && ((value % 1) === 0) && (value >= 0)
}

export default class ListExtended<T = any> extends List<T> {
  indexOf(item: T) {
    let index = -1
    for (const curr of this) {
      index++
      if (curr === item)
        return index
    }
    return -1
  }

  at(index: number) {
    if (!isUnsignedInteger(index))
      throw new TypeError("index must be an unsigned integer.")

    let i = 0
    for (const item of this)
      if (i++ === index)
        return item
    return null
  }

  forEach(iterator: Iterator<T>, options: any) {
    if (typeof iterator !== "function")
      throw new TypeError("iterator must be a function.")

    let index = 0
    for (const element of this)
      iterator(element, index++, this)
    return this
  }

  concat(iterable: Iterable<T>) {
    if (typeof iterable?.[Symbol.iterator] !== "function")
      throw new TypeError("iterable must be Array or instance of Collection.")

    const next = prepare(iterable).head
    if (this.isEmpty())
      this.head = next
    else
      this.tail!.next = next
    return this
  }

  find(predicate: Predicate<T>) {
    if (typeof predicate !== "function")
      throw new TypeError("predicate must be a function.")

    let index = 0
    for (const curr of this)
      if (!!predicate(curr, index++, this))
        return curr
    return null
  }

  some(predicate: Predicate<T>) {
    if (typeof predicate !== "function")
      throw new TypeError("predicate must be a function.")

    let index = 0
    for (const curr of this)
      if (predicate(curr, index++, this))
        return true
    return false
  }

  every(predicate: Predicate<T>) {
    if (typeof predicate !== "function")
      throw new TypeError("predicate must be a function.")

    let index = 0
    let pass = false

    for (let curr of this)
      if (!(pass = predicate(curr, index++, this)))
        return false
    return pass
  }

  map(iterator: MapIterator<T>) {
    if (typeof iterator !== "function")
      throw new TypeError("iterator must be a function.")

    const ctor = this.constructor as typeof List
    const clone = new ctor()
    let head = null
    let tail = null

    for (const element of this) {
      const node = new Node(iterator(element, length, clone))
      if (!head)
        head = node
      else
        tail!.next = node
      tail = node
    }

    clone.head = head
    return clone
  }

  sort(comparator: Comparator<T>) {
    if (typeof comparator !== "function")
      throw new TypeError("comparator must be a function.")

    if (!this.isEmpty())
      bubbleSort(this, comparator)
    return this
  }

  filter(predicate: Predicate<T>) {
    if (typeof predicate !== "function")
      throw new TypeError("predicate must be a function.")

    const array = []
    let index = 0

    for (let item of this)
      if (!!predicate(item, index++, this))
        array.push(item)
    return (this.constructor as typeof List).from(array)
  }
}
