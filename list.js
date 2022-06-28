'use strict';

/** @typedef {(node: Node, index: number, list: List) => boolean} callback */

const { iterator } = Symbol

class Node {
  /** @type {Node} */
  #node
  /** @param {Node} node */
  constructor(value, node = null) {
    this.value = value
    this.node = node
  }
  set node(value) {
    if (value instanceof Node || value === null)
      this.#node = value
  }
  get node() { return this.#node }
  toString() { return "" + this.value }
}
export default class List {
    /** @type {Node} */ #node = null
  set node(node) {
    if (List.isNode(node) || node === null) this.#node = node
  }
  get node() { return this.#node }
  get length() {
    let curr = this.node, index = 0
    while (curr) { curr = curr.node; index++ }
    return index
  }
  /** @return {Node} */
  get last() {
    let last = null
    for (const node of this) last = node
    return last
  }
  *[iterator]() {
    if (!this.node) return
    let curr = this.node
    while (curr) {
      yield curr
      curr = curr.node
    }
  }
  isEmpty() { return !this.node }
  /** @param {Node} node */
  push(node) {
    node = List.toNode(node)
    if (this.isEmpty()) return this.node = node
    let curr = this.node
    while (curr.node) curr = curr.node
    return curr.node = node
  }
  /** @param {Node} node */
  unshift(node) {
    node = List.toNode(node)
    node.node = this.node
    this.node = node
    return node
  }
  shift() {
    if (!this.node) return null
    const head = this.node
    this.node = head.node
    head.node = null
    return head
  }
  pop() {
    if (this.isEmpty()) return null
    let curr = this.node, prev = curr
    if (!curr.node) {
      this.node = null
      return curr
    }
    while (curr.node) {
      prev = curr
      curr = curr.node
    }
    prev.node = null
    return curr
  }
  /**
   * @param {callback} fn
   * @param {boolean} stoppable
   */
  each(fn, stoppable = false) {
    let index = 0
    for (const node of this) {
      if (
        fn(node, index++, this) === false
        && stoppable === true
      ) break
    }
    return this
  }
  /** @param {Node} node */
  hasNode(value) {
    if (!List.isNode(value)) return false
    for (const node of this) if (node === value) return true
    return false
  }
  has(value) {
    for (const node of this) if (node.value === value) return true
    return false
  }
  clear() { this.node = null; return this }
  reverse() {
    if (this.isEmpty()) return this
    let curr = this.node, temp = null, prev = null
    while (curr) {
      temp = curr.node
      curr.node = prev
      prev = curr
      curr = temp
    }
    this.node = prev
    return this
  }
  toArray() {
    const arr = []
    for (const node of this) arr.push(node.value)
    return arr
  }
  /** @param {Array} arr */
  fromArray(arr) {
    if (!Array.isArray(arr)) return this
    this.clear()
    let head = new Node(), last = head
    arr.forEach((value) => (last = last.node = new Node(value)))
    this.node = head.node
    return this
  }
  /** @return {Node | null} */
  findByValue(value) {
    if (this.isEmpty()) return
    for (const node of this) if (node.value === value) return node
    return null
  }
  /**
   * @param {number} index
   * @return {Node | null}
   */
  removeFromIndex(index) {
    if (this.isEmpty() || index < 0) return null
    if (index === 0) return this.shift()
    let i_ = 0
    let prev = this.node
    for (const node of this) {
      if (index === i_++) {
        prev.node = node.node
        node.node = null
        return node
      }
      prev = node
    }
    return null
  }
  /** @return {Node | null} */
  removeFromValue(value) {
    if (this.isEmpty()) return null
    if (this.node.value === value) return this.shift()
    let prev = this.node
    for (const node of this) {
      if (node.value === value) {
        prev.node = node.node
        node.node = null
        return node
      }
      prev = node
    }
    return null
  }
  /**
   * @param {number} start
   * @param {number} count
   */
  splice(start, count) {
    const list = new List()
    if (this.isEmpty()) return list
    if (typeof start !== "number" || typeof count !== "number") {
      throw new TypeError("Unknown arguments")
    }
    start = Math.round(Math.abs(start)) - 1
    count = Math.round(Math.abs(count))
    const end = start + count
    let index = 0
    let curr = this.node
    if (start === 0) {
      list.node = this.node
      while (curr) {
        if (end <= index++) {
          this.node = curr.node
          curr.node = null
          break
        }
        curr = curr.node
      }
    } else {
      let prev = this.node
      for (const node of this) {
        if (start === index) {
          list.node = node.node
          prev = node
        }
        if (end <= index) {
          prev.node = node.node
          node.node = null
          break
        }
        index++
      }
    }
    return list
  }
  /** @param {List} list */
  assign(list) {
    if (!List.isList(list)) {
      throw new TypeError(
        "First argument is not a List. "
        + "Reqruire a List object."
      )
    }
    if (list.isEmpty()) return this
    const { newNode } = List
    let head = null
    let last = null
    for (const node of list) {
      const n = newNode(node)
      if (head) last.node = n
      else head = n
      last = n
    }
    this.push(head)
    return this
  }
  /**
   * @param {number} start
   * @param {number} end
   */
  slice(start, end) {
    const list = new List()
    if (this.isEmpty()) return list
    if (typeof start !== "number") {
      throw new TypeError("Unknown arguments")
    }
    start = Math.round(Math.abs(start))
    if (typeof end === "number") {
      end = Math.round(Math.abs(end))
    } else { end = start }
    const { newNode } = List
    let index = 0
    for (const node of this) {
      if (start <= index && index <= end) {
        list.push(newNode(node))
      }
      if (index >= end) break
      index++
    }
    return list
  }
  /** @param {callback} fn */
  filter(fn) {
    if (typeof fn !== "function") {
      throw new TypeError("First argument is not a function")
    }
    if (this.isEmpty()) return this
    let index = 0
    while (this.node) {
      if (!fn(this.node, index++, this)) {
        this.node = this.node.node
      } else break
    }
    let prev = this.node
    let node = prev.node
    while (node) {
      if (!fn(node, index++, this)) {
        prev.node = node.node
      } else {
        prev = node
      }
      node = node.node
    }
    return this
  }
  trim() {
    if (this.isEmpty()) return this
    return this.filter((node) => (node !== undefined && node !== null))
  }
  clone() {
    const list = new List
    if (this.isEmpty()) return list
    const { newNode } = List
    let head = null
    let last = null
    for (const node of this) {
      const n = newNode(node)
      if (head) last.node = n
      else head = n
      last = n
    }
    list.node = head
    return list
  }
  print() { return this.each(console.log) }
  toString() {
    let value = ""
    if (!this.isEmpty()) {
      value = ""
      let i = 0
      for (const node of this) {
        if (i !== 0) value += ","
        value += node.toString()
        if (i++ === 2) break
      }
    }
    return "[" + this.constructor.name + " <" + value + ">]"
  }
  /** @param {Array} arr */
  static fromArray(arr) { return (new List()).fromArray(arr) }
  /**
   * @param {List | Array} list
   * @param {List | Array} others
   */
  static assign(list, ...others) {
    if (Array.isArray(list)) list = List.fromArray(list)
    if (!List.isList(list)) {
      throw new TypeError("Invalid arguments. Reqruired list objects")
    }
    const { newNode } = List
    let index = others.length
    let head
    while (index--) {
      const other = others[index]
      if (!(List.isList(other) || Array.isArray(other))) continue
      if (other.isEmpty()) continue
      let h = null
      let l = null
      for (const node of other) {
        const n = newNode(node)
        if (h) l.node = n
        else h = n
        l = n
      }
      l.node = head
      head = h
    }
    list.push(head)
    return list
  }
  /** @return {value is List} */
  static isList(value) { return value instanceof List }
  /** @return {value is Node} */
  static isNode(value) { return value instanceof Node }
  /** @return {Node} */
  static toNode(value) {
    if (!List.isNode(value)) value = new Node(value)
    return value
  }
  static newNode(value) {
    return new Node(List.isNode(value) ? value.value : value)
  }
  static toString() {
    return (
      "function "
      + this.name
      + " { [native code] }"
    )
  }
  static get Node() { return Node }
}

globalThis.List = List