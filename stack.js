import List from "./list.js"
const { iterator, toStringTag } = Symbol

export default class Stack {
  #list
  constructor() { this.#list = new List() }
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
    this.#list.each((node, index) => {
      fn(node.value, index)
    }, stoppable || true)
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
  [toStringTag] = this.constructor.name;
  [iterator] = function* () {
    for (const { value } of this.#list) yield value
  }
  get length() { return this.#list.length }
  static toString() { return "class Stack { [native code] }" }
}