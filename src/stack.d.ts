import Collection from "./collection.js"

export default class Stack<T> extends Collection<T> {
  constructor(options?: T[] | Collection<T>)

  push(element: T): this

  pop(): T
}
