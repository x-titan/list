import Collection from "./collection"
import List from "./list"
import Node from "./node"

export default class Stack<T> extends Collection<T> {
  pop = List.prototype.shift

  push(...items: T[]) {
    let { head, tail } = Node.prepare(items.reverse())

    if (head) {
      (tail as Node<any>).next = this.head
      this.head = head
    }
    return this
  }
}