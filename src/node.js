/**
 * @class Node
 * @property {Node} next
 */
export default class Node {

  /** @type {Node} */
  _next

  /** @param {Node} node */
  constructor(data, node = null) {
    this.data = data
    this.next = node
  }

  set next(node) {
    if (Node.isNode(node) || !node) {
      this._next = (node ?? null)
    }
  }

  get next() { return (this._next ?? null) }

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
