import Collection from "./collection.js"
import Node from "./node.js"

declare function List<T>(...items: T[] | Collection<T>): List<T>

declare class List<T> extends Collection<T> {
  get self(): this | undefined

  push<T>(element: T): this

  pop(): T

  unshift<T>(element: T): this

  shift(): T

  indexOf(element: T): number

  /**
   * Get element by index number. Index must be positive number
   */
  at(index: number): T | null

  forEach(callback: (value: T, index: number, thisArg: this) => T, options?: {} | null): this

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

  static from<U>(items: U[]): List<U>

  static of<U>(...items: U[]): List<U>
}

export default List
