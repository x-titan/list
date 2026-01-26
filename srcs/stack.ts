import Collection from "./collection"
import { prepare } from "./utils"

export default class Stack<T = any> extends Collection<T> {
  constructor(...items: T[]) {
    super()
    if (items.length > 0)
      this._head = prepare(items).head
  }

  push(...items: T[]) {
    const { head, tail, length } = prepare(items, true)

    if (tail) {
      tail.next = this._head
      this._head = head
    }

    return this._size += length
  }

  pop() {
    if (!this._head)
      return null
    let head = this._head
    this._head = head.next
    return head.data
  }
}