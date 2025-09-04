import Node from "./node.js"

declare function Collection<T>(...items: T[]): Collection<T>

declare class Collection<T> {
  head: Node<T> | null

  readonly tail: Node<T> | null

  readonly length: number

  readonly nodes: { [Symbol.iterator](): Iterator<Node<T>> }

  constructor(...items?: T[] | Collection<T>)

  [Symbol.iterator](): Iterator<T>

  isEmpty(): boolean

  peek(): T | null

  clear(): this

  clone(): this

  toArray(): T[]

  fromArray(array: T[]): this

  log(callback: (value: T, index: number, thisArg: T[]) => T | string): this

  toString(): string

  static from<U>(items: U[]): Collection<U>

  static of<U>(...items: U[]): Collection<U>
}

export default Collection
