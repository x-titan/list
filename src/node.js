import { isDefined } from "./utils"

/**
 * @template T
 */
export default class Node {

  /** @type {Node<T>} */
  _next

  /**
   * @param {T} data
   * @param {Node<T>} node 
   */
  constructor(data, node = null) {
    this.data = data
    this.next = node
  }

  set next(node) {
    if (Node.isNode(node) || !isDefined(node)) {
      return this._next = (node ?? null)
    }

    throw new TypeError("next must be a Node or null")
  }

  get next() { return (this._next ?? null) }

  /**
   * @param {Function} callback
   * @return {string}
   */
  toString(callback) {
    return callback ? callback(this.data) : `${this.data}`
  }

  static toString() {
    return ("[" +
      typeof this + " " +
      (this.prototype?.constructor?.name ?? "Collection") +
      "]")
  }

  static isNode(value) { return value instanceof Node }
}
