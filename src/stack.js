import Collection from "./collection.js"
import List from "./list.js"
import Queue from "./queue.js"

/**
 * @class
 * @extends Collection
 * 
 * @template T
 * @param {T[] | List<T> | Queue<T> | Stack<T>} options
 */
export default function Stack(options) {
  if (!(this instanceof Stack)) {
    return new Stack(options)
  }

  Collection.call(this, options)
}

const proto = {
  push: List.prototype.unshift,
  pop: List.prototype.shift,
}

inherit(Stack, Collection, proto)
