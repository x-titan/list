import Collection from "./collection.js"
import List from "./list.js"
import Stack from "./stack.js"
import { inherit } from "./utils.js"

/**
 * @class
 * @extends Collection
 * 
 * @template T
 * @param {T[] | List<T> | Queue<T> | Stack<T>} options
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

inherit(Queue, Collection, proto)
