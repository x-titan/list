import Collection from "./collection"

export default class LinkedList<T> extends Collection<T> {
  constructor(...items: T[]) {
    super(...items)
    throw new Error("Unsupported class. Class LinkedList not implemented")
  }

  prepend(value: T) { }
  append(value: T) { }

  deleteHead() { }
  deleteTail() { }

  insert(value: T, rawIndex: number) { }
  delete(value: T) { }
  reverse() { }
  find() { }
}
