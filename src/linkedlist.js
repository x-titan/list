"use strict"

import Collection from "./collection.js"
import inherit from "./inherit.js"

/**
 * @class
 * @extends Collection<T>
 * 
 * @template T
 * @param {...T} items
 */
export default function LinkedList(...items) {
  if (!(this instanceof LinkedList))
    return new LinkedList(...items)
  Collection.call(this)
  throw new Error("Unsupported class. Class LinkedList not implemented")
}

inherit(LinkedList, Collection, {
  prepend(value) { },
  append(value) { },

  deleteHead() { },
  deleteTail() { },

  insert(value, rawIndex) { },
  delete(value) { },
  reverse() { },
  find() { },
})
