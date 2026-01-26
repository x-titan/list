import Collection from "./collection/collection"
import {
  push,
  removeFirst,
} from "./collection/linkedlist"


export default class Queue<T = any> extends Collection<T> {
  enqueue(...items: T[]) { return (push<T>).call(this, ...items) }
  dequeue() { return (removeFirst<T>).call(this) }
}
