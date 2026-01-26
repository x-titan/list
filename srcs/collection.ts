import type { INode } from "./types"

export default class Collection<T = any> implements Iterable<T> {
  protected _head: INode<T> | null = null
  protected _size = 0

  get length(): number { return this._size }

  *[Symbol.iterator]() {
    let curr = this._head
    while (curr) {
      yield curr.data
      curr = curr.next
    }
  }

  peek() {
    if (!this._head)
      return null
    return this._head.data
  }

  isEmpty() { return this.length === 0 }

  toString() {
    return `[${this.constructor.name} nodes:${this.length}]`
  }

  clone() {
    const ctor = this.constructor as any
    return new ctor(...this)
  }

  toArray() {
    const array = [] as T[]
    for (const element of this)
      array.push(element)
    return array
  }

  toJSON() { return this.toArray() }

  static from<T>(
    iterable: Iterable<T>
  ): Collection<T> {
    return new (this as any)(...iterable)
  }

  static of<T>(
    ...items: T[]
  ): Collection<T> {
    return new (this as any)(...items)
  }
}
