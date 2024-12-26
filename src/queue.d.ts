import Collection from "./collection.js"
import Node from "./node.js"

export default class Queue<T> extends Collection<T> {
  constructor(options?: T[] | Collection<T>)

  enqueue(element: T): this

  dequeue(): T
}
