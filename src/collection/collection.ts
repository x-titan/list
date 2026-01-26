import Node from "./node"
import prepare from "./prepare"

export default class Collection<T = any> implements Iterable<T> {
  private _head: Node<T> | null = null

  constructor(...items: T[]) {
    if (items.length > 0)
      this.head = prepare(items).head
  }

  get head() { return this._head }

  set head(node: Node<T> | null) {
    if (!Node.isNode(node) && (node != null))
      throw new TypeError("next must be a Node or null")
    this._head = node
  }

  get tail() {
    let curr = this.head

    if (!curr)
      return null
    while (curr.next)
      curr = curr.next

    return curr
  }

  get length() {
    let curr = this.head
    let index = 0

    while (curr) {
      curr = curr.next
      index++
    }
    return index
  }

  get nodes() {
    const collection = this
    return {
      *[Symbol.iterator]() {
        let curr = collection.head
        while (curr) {
          yield curr
          curr = curr.next
        }
      }
    }
  }

  *[Symbol.iterator]() {
    let curr = this.head
    while (curr) {
      yield curr.data
      curr = curr.next
    }
  }

  isEmpty() { return !this.head }
  peek() { return this.head?.data ?? null }
  clone(): this { return new (this.constructor as any)(...this) }
  toArray() { return [...this] }
  toJSON() { return { ...this } }
  toString() { return `[${this.constructor.name} length:${this.length}]` }

  static from<U>(iterable: Iterable<U>) { return new this(...iterable) }
  static of<U>(...items: U[]) { return new this(...items) }
}
