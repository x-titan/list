'use strict'
const { iterator, toStringTag } = Symbol
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
    let curr = this.node, i = 0
    while (curr) { curr = curr.node; i++ }
    return i
  }
  isEmpty() { return !this.#node }
  /** @param {Node} node */
  push(node) {
    node = List.newNode(node)
    if (this.isEmpty()) return this.node = node
    let curr = this.node
    while (curr.node) curr = curr.node
    return curr.node = node
  }
  /** @param {Node} node */
  unshift(node) {
    node = List.newNode(node)
    node.node = this.node
    this.node = node
    return node
  }
  shift() {
    if (!this.node) return null
    const head = this.node
    this.node = this.node.node
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
   * @param {(node:Node,index:number,list:List)=>void} fn
   * @param {boolean} stoppable
   */
  each(fn, stoppable = false) {
    if (this.isEmpty()) return this
    let index = 0
    for (const node of this)
      if (fn(node, index++, this) ===
        false && stoppable === true) break
    return this
  }
  /** @param {Node} node */
  hasNode(value) {
    for (const node of this)
      if (node === value) return true
    return false
  }
  has(value) {
    for (const node of this)
      if (node.value === value) return true
    return false
  }
  clear() {
    this.node = null
    return this
  }
  reverse() {
    if (this.isEmpty()) return this
    let curr = this.#node, temp = null, prev = null
    while (curr) {
      temp = curr.node
      curr.node = prev
      prev = curr
      curr = temp
    }
    this.#node = prev
    return this
  }
  toArray() {
    const arr = []
    for (const node of this)
      arr.push(node.value)
    return arr
  }
  fromArray(array) {
    if (!Array.isArray(array)) return this
    this.clear()
    let head = new Node(), last = head
    array.forEach(value => last = last.node = new Node(value))
    this.#node = head.node
    return this
  }
  findByValue(value) {
    if (this.isEmpty()) return
    for (const node of this)
      if (node.value === value) return node
    return null
  }
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
  print() {
    this.each(console.log)
    return this
  }
  [iterator] = function* () {
    if (this.isEmpty()) return
    let curr = this.#node
    while (curr) {
      yield curr
      curr = curr.node
    }
  }
  toString() {
    let value = "empty"
    if (!this.isEmpty()) {
      value = ""
      this.each((node, i) => {
        if (i !== 0) value += ","
        value += node.toString()
        if (i === 2) return false
      }, true)
    }
    return "[" + this.constructor.name + " <" + value + ">]"
  }
  static isList(list) { return list instanceof List }
  static isNode(node) { return node instanceof Node }
  static newNode(node) {
    if (!List.isNode(node)) node = new Node(node)
    return node
  }
  static toString() { return "function " + this.name + " { [native code] }" }
  static get Node() { return Node }
}