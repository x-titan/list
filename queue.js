import List from "./list.js"


export default class Queue {
  #list
  constructor() { this.#list = new List() }
  set(value) {
    this.#list.push(value)
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
  get length() { return this.#list.length }
}