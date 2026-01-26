import Collection from './collection/collection'
import {
  unshift,
  removeFirst,
} from './collection/linkedlist'

export default class Stack<T = any> extends Collection<T> {
  push(...items: T[]) { return (unshift<T>).call(this, ...items) }
  pop() { return (removeFirst<T>).call(this) }
}
