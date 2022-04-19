import List from "./list.js"
const { iterator } = Symbol

export default class Stack {
  #list
  constructor() { this.#list = new List() }
  shift() { return this.get() }
  unshift(value) { return this.add(value) }
  add(value) {
    this.#list.unshift(value)
    return this
  }
  get() { return this.#list.shift().value }
  /**
   * @param {Function} fn
   * @param {boolean} [stoppable]
   */
  each(fn, stoppable) {
    let index = 0
    for (const node of this.#list)
      if (fn(node.value, index++, this) ===
        false && stoppable === true) break
    return this
  }
  clear() {
    this.#list.clear()
    return this
  }
  reverse() {
    this.#list.reverse()
    return this
  }
  toArray() { return this.#list.toArray() }
  /** @param {Array} array */
  fromArray(array) {
    this.#list.fromArray(array)
    return this
  }
  isEmpty() { return this.#list.isEmpty() }
  toString() {
    let value = "empty"
    if (!this.isEmpty()) {
      value = ""
      this.#list.each((node, i) => {
        if (i !== 0) value += ","
        value += node.toString()
        if (i === 2) return false
      }, true)
    }
    return "[" + this.constructor.name + " <" + value + ">]"
  }
  *[iterator]() { for (const { value } of this.#list) yield value }
  get length() { return this.#list.length }
  static toString = List.toString
}