import Collection from "./collection.js"
import Node from "./node.js"

export default class List<T> extends Collection<T> {
  push<T>(element: T): this

  unshift<T>(element: T): this

  pop(): T

  shift(): T

  indexOf(element: T): number

  /**
   * Get element by index number. Index must be positive number
   */
  at(index: number): T | null

  concat<U>(collection: Collection<U> | Array<U>): this

  findNode<T>(options: { element: T; callback: Function; }): Node<T>

  /**
   * @returns Return removed elements in the collection.
   */
  splice(index: number, count: number, ...insertElements: T[]): T[]

  addAt(index: number, ...insertElements: T[]): this

  /**
   * @returns Return removed elements in the collection.
   */
  removeAt(index: number, count: number): T[]

  getNodeByElement(element: T): Node<T>

  static from<U>(collection: U[] | Collection<U>) {
    return new this(collection) as List<U>
  }
}
