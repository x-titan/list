import { find } from "../../utils/immutate"
import { insertAfter, insertBefore, remove } from "../../utils/mutate"
import Collection from "../collection"
import Node from "../node"
import type { Predicate } from "./types-extended"

export default class LinkedList<T> extends Collection<T> {
  peekFirst() { return this.head?.data ?? null }
  peekLast() { return this.tail?.data ?? null }

  addFirst(value: T) {
    const node = new Node(value)
    node.next = this.head
    this.head = node
  }

  addLast(value: T) {
    const node = new Node(value)
    if (!this.head)
      this.head = node
    else
      this.tail!.next = node
  }

  removeFirst(): T | null {
    if (!this.head)
      return null
    const head = this.head
    this.head = head.next
    head.next = null
    return head.data
  }

  removeLast(): T | null {
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
    return last.data
  }

  insertAfter(value: T, target: T) {
    return insertAfter(this, value, target)
  }

  insertBefore(value: T, target: T) {
    return insertBefore(this, value, target)
  }

  find(predicate: Predicate<T>) { return find(this, predicate) }

  remove(value: T) { return remove(this, value) }

  clear() { this.head = null }
}
