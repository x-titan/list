import Collection from "./collection.js"
import List from "./list.js"

/**
 * @extends Collection
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

Stack.prototype = Object.create(Collection.prototype)
Object.assign(Stack.prototype, proto)
Stack.prototype.constructor = Stack
Stack.toString = Collection.toString
