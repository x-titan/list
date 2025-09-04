"use strict"

import Collection from "./collection.js"
import List from "./list.js"
import inherit from "./inherit.js"

/**
 * @class
 * @extends Collection<T>
 * 
 * @template T
 * @param {...T} items
 */
export default function Queue(...items) {
  if (!(this instanceof Queue)) 
    return new Queue(...items)
  Collection.apply(this, items)
}

inherit(Queue, Collection, {
  enqueue: List.prototype.push,
  dequeue: List.prototype.shift,
})
