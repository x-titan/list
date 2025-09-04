"use strict"

import assert from "./assert.js"
import Collection from "./collection.js"
import inherit from "./inherit.js"
import Node from "./node.js"
import {
  isFunction,
  isIterable,
  isUnsignedInteger,
} from "./types.js"


/**
 * @class
 * @extends Collection<T>
 * 
 * @template T
 * @param {...T} items
 */
export default function List(...items) {
  if (!(this instanceof List))
    return new List(...items)
  Collection.apply(this, items)
}

inherit(List, Collection, {
  /** @param  {...T} items */
  push(...items) {
    var next = Node.prepare(items).head

    if (next)
      if (!this.head)
        this.head = next;
      else
        this.tail.next = next;
    return this
  },

  pop() {
    if (!this.head)
      return null
    var curr = this.head

    if (!curr.next) {
      this.head = null
      return curr.data
    }

    while (curr.next.next)
      curr = curr.next;

    var last = curr.next
    curr.next = null
    return last.data
  },

  /** @param  {...T} items */
  unshift(...items) {
    var { head, tail } = Node.prepare(items)

    if (head) {
      tail.next = this.head
      this.head = head
    }
    return this
  },

  shift() {
    if (!this.head)
      return null
    var head = this.head

    this.head = head.next
    head.next = null
    return head.data
  },

  indexOf(item) {
    var index = -1

    for (let curr of this) {
      index++;
      if (curr === item)
        return index
    }
    return -1
  },

  /**
   * @param {number} index
   */
  at(index) {
    assert(isUnsignedInteger(index),
      "Index must be more than Zero or equal to Zero [0].")
    var i = 0

    for (let item of this)
      if (i++ === index)
        return item
    return null
  },

  /**
   * @param {(value: T, index: number, thisArg: this) => T } callback
   * @param {{ }} [options]
   */
  forEach(callback, options) {
    assert(isFunction(callback),
      "Argument callback must be function")

    var index = 0

    for (let element of this)
      callback(element, index++, this)
    return this
  },

  /**
   * @template U
   * @param {Iterable<U> | Collection<U>} iterable
   * @return {List<T | U>}
   */
  concat(iterable) {
    assert(isIterable(iterable),
      "iterable must be Array or instance of Collection.")
    var next = Node.prepare(iterable).head

    if (this.isEmpty())
      this.head = next
    else
      this.tail.next = next
    return this
  },

  reverse() {
    var node = this.head
    var previous = null

    while (node) {
      var save = node.next
      node.next = previous
      previous = node
      node = save
    }

    this.head = previous
    return this
  },

  /**
   * @param { (value: T, index: number, thisArg: this) => boolean } predicate
   */
  find(predicate) {
    assert(isFunction(predicate),
      "predicate must be a function.")
    var index = 0

    for (let curr of this)
      if (!!predicate(curr, index++, this))
        return curr
    return null
  },

  /**
   * @param { (value: T, index: number, thisArg: this) => boolean } predicate
   */
  some(predicate) {
    assert(isFunction(predicate),
      "predicate must be a function.")
    var index = 0

    for (let curr of this)
      if (predicate(curr, index++, this))
        return true
    return false
  },

  /**
   * @param { (value: T, index: number, thisArg: this) => boolean } predicate
   */
  every(predicate) {
    assert(isFunction(predicate),
      "predicate must be a function.")

    var index = 0
    var pass = false

    for (let curr of this)
      if (!(pass = predicate(curr, index++, this)))
        return false
    return pass
  },

  /**
   * @template U
   * @param { (value: T, index: number) => U } callback
   * @return {List<U>}
   */
  map(callback) {
    assert(isFunction(callback),
      "callback must be a function.")

    var clone = new this.constructor()
    clone.head = Node.prepare(this, callback, clone).head

    return clone
  },

  /**
   * @param { (value: T, nextValue: T) => (-1 | 0 | 1) } comparator
   */
  sort(comparator) {
    assert(isFunction(comparator),
      "comparator must be a function.")

    if (!this.isEmpty())
      bubbleSort(this, comparator)
    return this
  },

  /**
   * @param { (value: T, index: number, thisArg: this) => boolean } predicate
   * @return {List<T>}
   */
  filter(predicate) {
    assert(isFunction(predicate),
      "predicate must be a function.")

    var array = []
    var index = 0

    for (let item of this)
      if (!!predicate(item, index++, this))
        array.push(item)
    return this.constructor.from(array)
  },

  //! Remake
  splice(index, count, ...insertElements) {
    assert(isUnsignedInteger(index) && isUnsignedInteger(count),
      "Unexprected argument. First two arguments must be number. Expect: .splice(number, number, ...insertElements?)")
    var removedElements = []

    if (!this.head) {
      this.unshift(...insertElements)
    } else {
      removedElements.concat(this.removeAt(index, count))
      this.addAt(index, ...insertElements)
    }

    return removedElements
  },

  //! Remake
  addAt(index, ...insertElements) {
    assert(isUnsignedInteger(index),
      "Unexprected argument. The Index must be number.")

    if (insertElements.length == 0)
      return this

    if (!this.head || index == 0)
      return this.unshift(...insertElements)

    var { head, tail } = Collection.toCollectionNodes(insertElements)
    var curr

    for (curr of this.nodes) {
      if (--index === 0) {
        var nextNode = curr.next

        curr.next = head
        tail.next = nextNode
        return this
      }
    }
    curr.next = head
    return this
  },

  //! Remake
  removeAt(index, count) {
    assert(isUnsignedInteger(index) && isUnsignedInteger(count),
      "Out of range. Index must be cant be less Zero [0].")

    var removedElements = []

    if (!this.head || count == 0)
      return removedElements

    if (index === 0) {
      while (count--)
        removedElements.push(this.shift(this))
      return removedElements
    }

    for (let node of this.nodes) {
      if (index-- === 1) {
        var clone = { head: node.next }

        while (count--)
          removedElements.push(proto.shift.call(clone))

        node.next = clone.head
        break
      }
    }
    return new this.constructor(removedElements)
  },
})
