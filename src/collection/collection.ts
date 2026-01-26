import {
  Node,
  prepare,
} from "./node"

export default class Collection<T = any> {
  protected head: Node<T> | null = null
  protected tail: Node<T> | null = null
  protected size = 0

  constructor(...items: T[]) {
    if (items.length > 0) {
      const { head, tail, length } = prepare(items)
      this.head = head
      this.tail = tail
      this.size = length
    }
  }

  get length(): number { return this.size }

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
