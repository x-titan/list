'use strict'
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
  get last() {
    let last = null
    for (const node of this)
      last = node
    return last
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
   * @param {(node:Node,index:number,list:List)=>void} fn
   * @param {boolean} stoppable
   */
  each(fn, stoppable = false) {
    let index = 0
    for (const node of this)
      if (fn(node, index++, this) ===
        false && stoppable === true) break
    return this
  }
  /** @param {Node} node */
  hasNode(value) {
    if (!List.isNode(value)) return false
    for (const node of this)
      if (node === value) return true
    return false
  }
  has(value) {
    for (const node of this)
      if (node.value === value) return true
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
    for (const node of this)
      arr.push(node.value)
    return arr
  }
  fromArray(array) {
    if (!Array.isArray(array)) return this
    this.clear()
    let head = new Node(), last = head
    array.forEach(value => last = last.node = new Node(value))
    this.node = head.node
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
  splice(start, count) {
    const list = new List()
    if (!this.isEmpty()) {
      const end = start + count
      let prev = this.node
      let index = 0
      for (const node of this) {
        if (start === index) list.node = node
        if (start <= index) {
          prev.node = node.node
          if (end === index) {
            node.node = null
            break
          }
        } else prev = node
        index++
      }
    }
    return list
  }
  assign(list) {
    if (!List.isList(list))
      throw new TypeError("First argument is not a List. Reqruire a List object")
    if (!list.isEmpty()) {
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
    }
    return this
  }
  slice(start, end) {
    const list = new List()
    if (!this.isEmpty()) {
      if (typeof end !== "number") end = start
      const { newNode } = List
      let index = 0
      for (const node of this) {
        if (start <= index && index <= end)
          list.push(newNode(node))
        index++
      }
    }
    return list
  }
  filter(fn) {
    if (typeof fn !== "function")
      throw new TypeError("1 argument is not a function")
    const list = new List()
    if (!this.isEmpty()) {
      const { newNode } = List
      let index = 0
      for (const node of this)
        if (fn(node, index++, this))
          list.push(newNode(node))
    }
    return list
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
  *[iterator]() {
    if (this.isEmpty()) return
    let curr = this.node
    while (curr) {
      yield curr
      curr = curr.node
    }
  }
  toString() {
    let value = "empty"
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
  static fromArray(arr) { return new List().fromArray(arr) }
  static assign(list, ...others) {
    if (Array.isArray(list)) list = List.fromArray(list)
    if (!List.isList(list))
      throw new TypeError("Invalid arguments. Reqruired list objects")
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
    return "function " + this.name +
      " { [native code] }"
  }
  static get Node() { return Node }
}