import Collection from "./collection.js"
import Node from "./node.js"

export default class Queue<T> extends Collection<T> {
  enqueue(element: T): this

  dequeue(): T

  static from<U>(collection: U[] | Collection<U>) {
    return new this(collection) as Queue<U>
  }
}
