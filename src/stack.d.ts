import Collection from "./collection.js"

export default class Stack<T> extends Collection<T> {
  push(element: T): this

  pop(): T

  static from<U>(collection: U[] | Collection<U>) {
    return new this(collection) as Stack<U>
  }
}
