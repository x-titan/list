import {
  Collection,
  prepare,
} from "./protected"

export default class Stack<T = any> extends Collection<T> {
  constructor(...items: T[]) {
    super()
    if (items.length > 0)
      this.head = prepare(items).head
  }

  push(...items: T[]) {
    const { head, tail, length } = prepare(items, true)

    if (tail) {
      tail.next = this.head
      this.head = head
    }

    return this.size += length
  }

  pop() {
    if (!this.head)
      return null
    let head = this.head
    this.head = head.next
    return head.data
  }
}
