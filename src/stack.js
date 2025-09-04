"use strict"

import Collection from "./collection.js"
import List from "./list.js"
import Queue from "./queue.js"
import inherit from "./inherit.js"

/**
 * @class
 * @extends Collection<T>
 * 
 * @template T
 * @param {...T} items
 */
export default function Stack(...items) {
  if (!(this instanceof Stack))
    return new Stack(...items)
  Collection.apply(this, items)
}

inherit(Stack, Collection, {
  pop: List.prototype.shift,
  push(...elements) {
    List
      .prototype
      .unshift
      .apply(this, elements.reverse())

    return this
  },
})
