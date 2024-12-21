import Collection from "./collection.js"
import List from "./list.js"

/**
 * @extends Collection
 */
export default function Queue(options) {
  if (!(this instanceof Queue)) {
    return new Queue(options)
  }

  Collection.call(this, options)
}

const proto = {
  enqueue: List.prototype.push,
  dequeue: List.prototype.shift,
}

Queue.prototype = Object.create(Collection.prototype)
Object.assign(Queue.prototype, proto)
Queue.prototype.constructor = Queue
Queue.toString = Collection.toString
