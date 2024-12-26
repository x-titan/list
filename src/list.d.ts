import Collection from "./collection.js"
import Node from "./node.js"

export default class List<T> extends Collection<T> {
  constructor(options?: T[] | Collection<T>)

  push<T>(element: T): this

  unshift<T>(element: T): this

  pop(): T

  shift(): T

  indexOf(element: T): number

  at(index: number): T | null

  concat<U>(collection: Collection<U> | Array<U>): this

  findNode<T>(options: { element: T; callback: Function; }): Node<T>

  splice(index: number, count: number, ...insertElements: T[]): T[]

  addAt(index: number, ...insertElements: T[]): this

  removeAt(index: number, count: number): T[]

  getNodeByElement(element: T): Node<T>
}
