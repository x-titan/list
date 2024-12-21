import Collection from "./collection.js"
import Node from "./node.js"

/**
 * @extends Collection
 */
export default function List(options) {
  if (!(this instanceof List)) {
    return new List(options)
  }

  Collection.call(this, options)
}

function forEachCall(array, method, thisArg) {
  for (let i = 0; i < array.length; i++) {
    method.call(thisArg, array[i])
  }
  return thisArg
}

const proto = {
  push(element) {
    if (arguments.length > 1) {
      element = Collection.arrayToNodes(arguments).head
    } else {
      element = new Node(element)
    }

    if (!this.head) {
      this.head = element
    } else {
      this.tail.next = element
    }

    return this
  },

  pop() {
    if (!this.head) return null

    var curr = this.head

    if (!curr.next) {
      this.head = null
      return curr.data
    }

    while (curr.next.next) {
      curr = curr.next
    }

    var last = curr.next
    curr.next = null

    return last.data
  },

  unshift(element) {
    this.head = new Node(element, this.head)
    return this
  },

  shift() {
    if (!this.head) return null

    var head = this.head

    this.head = (head.next ?? null)
    head.next = null

    return head.data
  },

  concat(collection) {
    if (collection instanceof Collection) {
      this.tail.next = collection.head
      return this
    }

    if (typeof collection[Symbol.iterator] === "function") {
      return this.fromArray(collection)
    }

    throw new TypeError('Unexpexted collection type. Argument must be iterable or "Collection".')
  },

  find({ element, callback }) {
    for (var node of this.nodes) {
      if (callback && callback(node.data)) {
        return node
      }

      if (node.data === element) {
        return node
      }
    }

    return null
  },

  indexOf(element) {
    var index = 0

    for (var curr of this) {
      if (curr === element) return index
      index++
    }

    return -1
  },

  /**
   * Get element by index number. Index must be positive number
   * @param {number} index
   */
  at(index) {
    if (index < 0) {
      throw new RangeError("Out of Range index")
    }

    var i = 0

    for (var element of this) {
      if (i == index) { return element }
      i++
    }

    return null
  },

  splice(index, count, ...insertElements) {
    var removedElements = []

    if (!this.head) {
      if (insertElements.length > 0) {
        this.fromArray(call, insertElements)
      }

      return removedElements
    }

    if (count > 0) {
      removedElements.push(...this.removeAt(index, count))
    }

    if (insertElements.length > 0) {
      this.addAt(index, ...insertElements)
    }

    return removedElements
  },

  addAt(index, ...elements) {
    if (!this.head && insertElements.length > 0) {
      return this.fromArray(insertElements)
    }

    var arrayToNodes = Collection.arrayToNodes(elements)
    var curr

    if (index === 0 || !this.head) {
      arrayToNodes.tail.next = this.head
      this.head = arrayToNodes.head

      return this
    }

    for (curr of this.nodes) {
      if (index-- === 1) {
        var nextNode = curr.next
        curr.next = arrayToNodes.head
        arrayToNodes.tail.next = nextNode

        return this
      }
    }

    curr.next = arrayToNodes.head

    return this
  },

  removeAt(index, count) {
    var removedElements = []

    if (!this.head) return removedElements

    if (index === 0) {
      while (count--) removedElements.push(this.shift(this))
      return removedElements
    }

    var node

    for (node of this.nodes) {
      if (index-- === 1) {
        var clone = { head: node.next }

        while (count--) {
          removedElements.push(proto.shift.call(clone))
        }

        node.next = clone.head

        break
      }
    }

    return removedElements
  },

  sort(comparator) { },

  reverse(comparator) { },

  filter(comparator) { },

  /** @return {Node | null} */
  getNodeByElement(element) {
    if (!this.head) return

    for (var curr of this) {
      if (curr === element) return node
    }

    return null
  }
}

List.prototype = Object.create(Collection.prototype)
Object.assign(List.prototype, proto)
List.prototype.constructor = List
List.toString = Collection.toString
