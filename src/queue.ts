import {
  Collection,
  prepare,
} from "./protected"

export default class Queue<T = any> extends Collection<T> {
  enqueue(...items: T[]) {
    const { tail, length } = prepare(items, true)

    if (tail) {
      tail.next = this.tail
      this.tail = tail
    }

    return this.size += length
  }

  dequeue() {
    if (!this.head)
      return null
    const head = this.head

    this.head = head.next
    head.next = null
    return head.data
  }
}
