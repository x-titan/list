import Collection from "./collection.js"

declare function Queue<T>(...items: T[]): Queue<T>

declare class Queue<T> extends Collection<T> {
  enqueue(element: T): this

  dequeue(): T

  static from<U>(items: U[]): Queue<U>

  static of<U>(...items: U[]): Queue<U>
}

export default Queue
