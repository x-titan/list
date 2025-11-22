import Collection from "./collection"
import List from "./list"

export default class Queue<T> extends Collection<T> {
  enqueue = List.prototype.push
  dequeue = List.prototype.shift
}
