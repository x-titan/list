import Collection from "./collection"
import type { INode } from "./types"
import { prepare } from "./utils"

export default class Queue<T> extends Collection<T> {
  private _tail: INode<T> | null = null

  constructor(...items: T[]) {
    super()
    if (items.length > 0) this.enqueue(...items)
  }

  enqueue(...items: T[]) {
    const { head, tail, length } = prepare(items, true)

    if (tail) {
      tail.next = this._tail
      this._tail = tail
    }

    return this._size += length
  }

  dequeue() {
    if (!this._head)
      return null
    const head = this._head

    this._head = head.next
    head.next = null
    return head.data
  }
}