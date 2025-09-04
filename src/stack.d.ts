import Collection from "./collection.js"

declare function Stack<T>(...items: T[]): Stack<T>

declare class Stack<T> extends Collection<T> {
  push(element: T): this

  pop(): T

  static from<U>(items: U[]): Stack<U>

  static of<U>(...items: U[]): Stack<U>
}

export default Stack
