import Collection from "./collection"
import Node from "./node"
import {
  bubbleSort,
} from "./sorters"
import {
  assert,
  isFunction,
  isIterable,
  isUnsignedInteger,
} from "./utils"

import type {
  Comparator,
  ForEachIterator,
  Predicate,
} from "./types"

export default class List<T> extends Collection<T> {
  push(...items: T[]) {
    const next = Node.prepare(items).head

    if (next)
      if (!this.head)
        this.head = next
      else
        this.tail!.next = next
    return this
  }

  pop() {
    if (!this.head)
      return null

    let curr = this.head
    if (!curr.next) {
      this.head = null
      return curr.data
    }

    while (curr.next!.next)
      curr = curr.next!

    const last = curr.next!
    curr.next = null
    return last.data
  }

  unshift(...items: T[]) {
    const { head, tail } = Node.prepare(items)

    if (head) {
      (tail as Node<any>).next = this.head
      this.head = head
    }
    return this
  }

  shift() {
    if (!this.head)
      return null
    const head = this.head
    this.head = head.next
    head.next = null
    return head.data
  }

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
    assert(isUnsignedInteger(index),
      "Index must be more than Zero or equal to Zero [0].")
    let i = 0

    for (const item of this)
      if (i++ === index)
        return item
    return null
  }

  forEach(callback: ForEachIterator<T>, options: any) {
    assert(isFunction(callback),
      "Argument callback must be function")

    let index = 0

    for (const element of this)
      callback(element, index++, this)
    return this
  }

  concat(iterable: Iterable<T>) {
    assert(isIterable(iterable),
      "iterable must be Array or instance of Collection.")

    const next = Node.prepare(iterable).head

    if (this.isEmpty())
      this.head = next
    else
      this.tail!.next = next
    return this
  }

  reverse() {
    let node = this.head
    let previous = null

    while (node) {
      let save = node.next
      node.next = previous
      previous = node
      node = save
    }

    this.head = previous
    return this
  }

  find(predicate: Predicate<T>) {
    assert(isFunction(predicate),
      "predicate must be a function.")
    let index = 0

    for (const curr of this)
      if (!!predicate(curr, index++, this))
        return curr
    return null
  }

  some(predicate: Predicate<T>) {
    assert(isFunction(predicate),
      "predicate must be a function.")
    let index = 0

    for (const curr of this)
      if (predicate(curr, index++, this))
        return true
    return false
  }

  every(predicate: Predicate<T>) {
    assert(isFunction(predicate),
      "predicate must be a function.")

    let index = 0
    let pass = false

    for (let curr of this)
      if (!(pass = predicate(curr, index++, this)))
        return false
    return pass
  }

  map(callback: MapIterator<T>) {
    assert(isFunction(callback),
      "callback must be a function.")

    const ctor = this.constructor as typeof List
    const clone = new ctor()
    let head = null
    let tail = null

    for (const element of this) {
      let node = new Node(callback(element, length, clone))

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
    assert(isFunction(comparator),
      "comparator must be a function.")

    if (!this.isEmpty())
      bubbleSort(this, comparator)
    return this
  }

  filter(predicate: Predicate<T>) {
    assert(isFunction(predicate),
      "predicate must be a function.")

    const array = []
    let index = 0

    for (let item of this)
      if (!!predicate(item, index++, this))
        array.push(item)
    return (this.constructor as typeof List).from(array)
  }
}
