import Node from "./node.js"

export default class Collection<T> {
  head: Node<T> | null

  readonly tail: Node<T> | null

  readonly length: number

  readonly nodes: { [Symbol.iterator](): Iterator<Node<T>> }

  constructor(options?: T[] | Collection<T>)

  [Symbol.iterator](): Iterator<T>

  isEmpty(): boolean

  peek(): T | null

  clear(): this

  clone(): this

  forEach(callback: (value: T, index: number, thisArg: this) => T, options?: {} | null): this

  toArray(): T[]

  fromArray(array: T[]): this

  log(callback: (value: T, index: number, thisArg: T[]) => T | string): this

  toString(): string
}
