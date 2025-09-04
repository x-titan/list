"use strict"

import assert from "./assert.js"
import {
  isEmpty,
  isFunction,
  isIterable,
} from "./types.js"

/**
 * @template T
 */
export default class Node {
  /** @type {Node<T>} */
  _next = null

  /**
   * @param {T} data
   * @param {Node<T>} node 
   */
  constructor(data, node = null) {
    this.data = data
    this.next = node
  }

  get next() { return this._next }

  set next(node) {
    assert(Node.isNode(node) || isEmpty(node),
      "next must be a Node or null")
    return this._next = (node ?? null)
  }

  /** @return {value is Node<unknown>} */
  static isNode(value) { return value instanceof Node }

  /**
   * @template U
   * @param {Iterable<U>} target
   * @param { (value: U, index: number, thisArg: thisArg) => U } [callback]
   * @param {*} [thisArg]
   */
  static prepare(target, callback, thisArg) {
    assert(isIterable(target),
      "Unexpected argument. Argument target must be Iterable with [Symbol.iterator].")

    if (arguments.length === 1)
      return prepare(target)
    return prepareWithCallback(target, callback, thisArg)
  }
}

/**
 * @template T
 * @param {Iterable<T>} target
 */
function prepare(target) {
  var head = null
  var tail = null
  var length = 0

  for (const element of target) {
    var node = new Node(element)

    if (!head)
      head = node;
    else
      tail.next = node;

    length++;
    tail = node
  }
  return { head, tail, length }
}

/**
 * @template T
 * @param {Iterable<T>} target
 * @param { (value: T, index: number, thisArg: thisArg) => T } [callback]
 * @param {*} [thisArg]
 */
function prepareWithCallback(target, callback, thisArg) {
  assert(isFunction(callback),
    "Unexpected argument. Argument callback must be function")

  var head = null
  var tail = null
  var length = 0

  for (const element of target) {
    var node = new Node(callback(element, length, thisArg))

    if (!head)
      head = node;
    else
      tail.next = node;

    length++;
    tail = node
  }
  return { head, tail, length }
}
