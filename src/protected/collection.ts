import type { INode } from "./types"
import  prepare  from "./prepare"

export default class Collection<T = any> implements Iterable<T> {
  protected head: INode<T> | null = null
  protected tail: INode<T> | null = null
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

  peek() { return this.head?.data ?? null }
  isEmpty() { return this.length === 0 }
  toArray() { return [...this] }
  toJSON() { return { ...this } }
  toString() { return `[${this.constructor.name} length:${this.length}]` }
  clone(): this { return new (this.constructor as any)(...this) }

  static from<U>(iterable: Iterable<U>) { return new this(...iterable) }
  static of<U>(...items: U[]) { return new this(...items) }
}
