import { assert, isIterable } from "./utils.js"

export default class Node<T> {
  public data: T
  private _next: Node<T> | null = null

  constructor(data: T, next = null) {
    this.data = data
    this.next = next
  }

  get next() { return this._next }

  set next(node: Node<T> | null) {
    assert(Node.isNode(node) || node == null,
      "next must be a Node or null")
    this._next = (node ?? null)
  }

  static isNode(value: unknown): value is Node<unknown> {
    return value instanceof Node
  }

  static prepare<U>(array: Iterable<U>) {
    assert(isIterable(array),
      "Unexpected argument parameter. Argument must be iterable.")

    let head = null
    let tail = null
    let length = 0

    for (const element of array) {
      const node = new Node(element)

      if (!head)
        head = node
      else
        tail!.next = node

      length++
      tail = node
    }
    return { head, tail, length }
  }
}
