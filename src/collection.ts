import Node from "./node"
import {
  assert,
  isFunction,
  isIterable,
} from "./utils"

export default class Collection<T> implements Iterable<T> {
  private _head: Node<T> | null = null

  constructor(...items: T[]) {
    if (items.length > 0)
      this.head = Node.prepare(items).head
  }

  get head() { return this._head }

  set head(node: Node<T> | null) {
    assert(Node.isNode(node) || node == null,
      "head must be a Node or null")
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

  *[Symbol.iterator]() {
    let curr = this.head

    while (curr) {
      yield curr.data
      curr = curr.next
    }
  }

  get nodes() {
    let collection = this

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

  isEmpty() { return !this.head }

  peek() {
    if (!this.head)
      return null
    return this.head.data
  }

  clone(): this {
    const ctor = this.constructor as typeof Collection
    const clone = new ctor()

    clone.head = Node.prepare(this).head
    return clone as this
  }

  toArray() {
    let array = []

    for (const element of this)
      array.push(element)
    return array
  }

  fromArray(array: Iterable<T>) {
    assert(isIterable(array),
      "Unexpected argument parameter. Argument must be iterable.")
    let next = Node.prepare(array).head

    if (!this.head)
      this.head = next
    else
      this.tail!.next = next
    return this
  }

  toString() {
    return `[${this.constructor.name} nodes:${this.length}]`
  }

  log(callback: (value: T, index: number, thisArg: T[]) => T | string) {
    let array = this.toArray() as Array<any>

    if (isFunction(callback))
      array = array.map(callback)

    console.table(array)
    return this
  }

  static from<U>(array: Iterable<U>) {
    let collection = new this() as Collection<U>
    let prepared = Node.prepare(array)
    collection.head = prepared.head

    return collection
  }

  static of<U>(...items: U[]) {
    let collection = new this() as Collection<U>
    let prepared = Node.prepare(items)
    collection.head = prepared.head

    return collection
  }
}
