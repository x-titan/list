import Collection from "./collection.js"
import Node from "./node.js"
import { inherit, isFunction, isIterable, isNumber } from "./utils.js"

/**
 * @class
 * @extends Collection
 * 
 * @template T
 * @param {T[] | List<T> | Queue<T> | Stack<T>} options
 */
export default function List(options) {
  if (!(this instanceof List)) {
    return new List(options)
  }

  Collection.call(this, options)
}

const proto = {
  push(...elements) {
    var { head, length } = Collection.toCollectionNodes(elements)

    if (length > 0) {
      if (!this.head) {
        this.head = head
      } else {
        this.tail.next = head
      }
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

  unshift(...elements) {
    var { head, tail, length } = Collection.toCollectionNodes(elements)

    if (length > 0) {
      tail.next = this.head || null
      this.head = head
    }

    return this
  },

  shift() {
    if (!this.head) return null

    var head = this.head

    this.head = (head.next ?? null)
    head.next = null

    return head.data
  },

  indexOf(element) {
    var index = 0

    for (var curr of this) {
      if (curr === element) return index
      index++
    }

    return -1
  },

  at(index) {
    if (!isNumber(index)) {
      throw new TypeError("The Index must be number and will more or equal to Zero [0].")
    }

    if (index < 0) {
      throw new RangeError("Out of Range Index. Index must be more more or equal to Zero [0]")
    }

    var i = 0

    for (var element of this) {
      if (i == index) { return element }
      i++
    }

    return null
  },

  concat(collection) {
    if (isIterable(collection)) {
      return this.fromArray(collection)
    }

    throw new TypeError('Unexpexted collection type. Argument must be iterable or "Collection".')
  },

  findNode({ element, callback }) {
    for (var node of this.nodes) {
      if (isFunction(callback) && callback(node.data)) {
        return node
      }

      if (node.data === element) {
        return node
      }
    }

    return null
  },

  splice(index, count, ...insertElements) {
    if (!isNumber(index) || !isNumber(count)) {
      throw new TypeError("Unexprected argument. First two arguments must be number. Expect: .splice(number, number, ...insertElements?)")
    } 

    var removedElements = []

    if (!this.head) {
      this.unshift(...insertElements)

      return removedElements
    }

    removedElements.concat(this.removeAt(index, count))

    this.addAt(index, ...insertElements)

    return removedElements
  },

  addAt(index, ...insertElements) {
    if (!isNumber(index)) {
      throw new TypeError("Unexprected argument. The Index must be number.")
    } 

    if (insertElements.length <= 0) {
      return this
    }

    if (!this.head && insertElements.length > 0) {
      return this.unshift(...insertElements)
    }

    var { head, tail, length } = Collection.toCollectionNodes(insertElements)
    var curr


    if (index === 0 || !this.head) {
      tail.next = this.head
      this.head = head

      return this
    }

    for (curr of this.nodes) {
      if (index-- === 1) {
        var nextNode = curr.next
        curr.next = head
        tail.next = nextNode

        return this
      }
    }

    curr.next = head

    return this
  },

  removeAt(index, count) {
    if (index < 0 || count < 0) {
      throw new RangeError("Out of range. Index must be cant be less Zero [0].")
    }

    var removedElements = []

    if (!this.head || count <= 0) return removedElements

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

    return new this.constructor(removedElements)
  },

  sort(comparator) { throw new Error("sort() method not implemented.") },

  reverse(comparator) { throw new Error("reverse() method not implemented.") },

  filter(comparator) { throw new Error("filter() method not implemented.") },

  /** @return {Node | null} */
  getNodeByElement(element) {
    if (!this.head) return

    for (var curr of this) {
      if (curr === element) return node
    }

    return null
  }
}

inherit(List, Collection, proto)
