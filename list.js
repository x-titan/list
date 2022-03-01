// const corner = "+"
// const horBorder = "—"
// const verBorder = "|"
// const space = " "
// const n = "\n"
// const width = 46
// const LongHorBorder = corner + horBorder.repeat(width) + corner
// const LongSpace = verBorder + space.repeat(width) + verBorder
// function box(value) {
//   value = value.replace(n, "\\n")
//   if (value.length > width) value = value.slice(0, width - 5) + "..."
//   return LongSpace + n + verBorder + space + value +
//     space.repeat(width - value.length - 1) + verBorder + n +
//     LongSpace + n + LongHorBorder
// }
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
   * @param {(node:Node,index:number)=>void} fn
   * @param {boolean} stoppable
   */
  each(fn, stoppable = false) {
    if (this.isEmpty()) return this
    let curr = this.#node, index = 0
    while (curr) {
      if (fn(curr, index++) === false && stoppable) break
      curr = curr.node
    }
    return this
  }
  /** @param {Node} node */
  hasNode(value) {
    let res = false
    this.each(node => !(res = (node === value)))
    return res
  }
  has(value) {
    let res = false
    this.each(node => !(res = (node.value === value)))
    return res
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
    return this;
  }
  toArray() {
    const arr = []
    this.each(node => arr.push(node.value))
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
    const { isNode } = List
    let curr = this.node
    while (isNode(curr)) {
      if (curr.value === value) break
      curr = curr.node
    }
    return curr
  }
  removeFromIndex(index) {
    if (this.isEmpty() || index < 0) return null
    if (index === 0) return this.shift()
    const { isNode } = List
    let curr = this.node, prev, i = 0
    while (isNode(curr)) {
      if (index === i) {
        prev.node = curr.node
        curr.node = null
        return curr
      }
      prev = curr
      curr = curr.node
      i++
    }
    return null
  }
  removeFromValue(value) {
    if (this.isEmpty()) return null
    let curr = this.node, prev
    while (isNode(curr)) {
      if (value === curr.value) {
        prev.node = curr.node
        curr.node = null
        return curr
      }
      prev = curr
      curr = curr.node
    }
    return null
  }
  print() {
    this.each(console.log)
    return this
  }
  // toTable(title = "LinkedList") {
  //   let res = LongHorBorder + n + box(title)
  //   this.each((x, i) => res += n + box(i + " -> " + x.value))
  //   return res
  // }
  toString() { return "[List node:" + this.node.toString() + "]" }
  static isList(list) { return list instanceof List }
  static isNode(node) { return node instanceof Node }
  static newNode(node) {
    if (!List.isNode(node)) node = new Node(node)
    return node
  }
  static toString() { return "class List{ [native code] }" }
  static get Node() { return Node }
}