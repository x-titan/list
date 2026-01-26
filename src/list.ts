import {
  Collection,
  prepare,
} from "./protected"

export default class List<T = any> extends Collection<T> {
  push(...items: T[]) {
    const { head, tail, length } = prepare(items)

    if (head) {
      if (!this.head)
        this.head = head
      else
        this.tail!.next = head
      this.tail = tail
    }

    return this.size += length
  }

  pop() {
    if (!this.head)
      return null

    let curr = this.head
    if (!curr.next) {
      this.head = null
      return curr.data
    }

    while (curr.next!.next)
      curr = curr.next!

    const last = curr.next!
    curr.next = null
    this.tail = curr
    return last.data
  }

  unshift(...items: T[]) {
    const { head, tail } = prepare(items)

    if (head) {
      tail!.next = this.head
      this.head = head
    }
    return this
  }


  shift() {
    if (!this.head)
      return null
    const head = this.head
    this.head = head.next
    head.next = null
    return head.data
  }

  remove(value: T) {
    let curr = this.head
    let prev = null

    while (curr) {
      if (curr.data === value) {
        if (prev)
          prev.next = curr.next
        else
          this.head = curr.next
        curr.next = null
        return true
      }
      prev = curr
      curr = curr.next
    }
    return false
  }
}
