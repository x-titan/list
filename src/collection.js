"use strict"

import assert from "./assert.js"
import Node from "./node.js"
import {
  isEmpty,
  isFunction,
} from "./types.js"

/**
 * @class
 * 
 * @template T
 * @param {...T} items
 */
export default function Collection(...items) {
  if (!(this instanceof Collection))
    return new Collection(...items)

  if (items.length > 0)
    this.head = Node.prepare(items).head
}

const prototype = {
  constructor: Collection,

  /** @type {Node<T>} */
  _head: null,

  /** @type {Node<T>} */
  get head() { return this._head },

  set head(node) {
    assert(Node.isNode(node) || isEmpty(node),
      "head must be a Node or null")
    this._head = (node ?? null);
  },

  /** @type {Node<T>} */
  get tail() {
    var curr = this.head

    if (!curr)
      return null
    while (curr.next)
      curr = curr.next;

    return curr
  },

  get length() {
    var curr = this.head
    var index = 0

    while (curr) {
      curr = curr.next;
      index++
    }
    return index
  },

  *[Symbol.iterator]() {
    var curr = this.head

    while (curr) {
      yield curr.data
      curr = curr.next
    }
  },

  get nodes() {
    var collection = this

    return {
      *[Symbol.iterator]() {
        var curr = collection.head

        while (curr) {
          yield curr
          curr = curr.next
        }
      }
    }
  },

  isEmpty() { return !this.head },

  peek() {
    if (!this.head)
      return null
    return this.head.data
  },

  clear() {
    this.head = null
    return this
  },

  /**
   * @return {this}
   */
  clone() {
    var clone = new this.constructor()

    clone.head = Node.prepare(this).head
    return clone
  },

  toArray() {
    var array = []

    for (let element of this)
      array.push(element)
    return array
  },

  fromArray(array) {
    assert(isIterable(array),
      "Unexpected argument parameter. Argument must be iterable.")
    var next = Node.prepare(array).head

    if (!this.head)
      this.head = next
    else
      this.tail.next = next
    return this
  },

  toString() {
    return `[${this.constructor.name} nodes:${this.length}]`
  },

  /**
   * @param {(value: T, index: number, thisArg: T[]) => T | string } callback
   */
  log(callback) {
    var array = this.toArray()

    if (isFunction(callback))
      array = array.map(callback)

    console.table(array)
    return this
  },

}

/**
 * @template T
 * @param {Iterable<T>} items
 * @param { (value: T, index: number, thisArg: thisArg) => T } [callback]
 * @param {*} [thisArg]
 */
function from(items, callback, thisArg) {
  var collection = new this()
  var preparedNodes = Node.prepare.apply(Node, arguments)
  collection.head = preparedNodes.head

  return collection
}

/**
 * @template T
 * @param  {...T} items
 */
function of(...items) {
  var collection = new this()
  var preparedNodes = Node.prepare(items)
  collection.head = preparedNodes.head

  return collection
}

Object.assign(Collection, {
  prototype,
  from,
  of,
})
