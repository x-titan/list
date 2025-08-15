import Node from "./node.js"
import {
  isDefined,
  isFunction,
  isIterable,
} from "./utils.js"

/**
 * @class
 * 
 * @template T
 * @param {T[] | Collection<T>} options
 */
export default function Collection(options) {
  if (!(this instanceof Collection)) {
    return new Collection(options)
  }

  /** @type {Node} */
  this._head = null

  if (isIterable(options)) {
    this.head = toCollectionNodes(options).head
  }
}

const proto = {
  /** @type {Node} */
  get head() { return (this._head ?? null) },

  set head(node) {
    if (Node.isNode(node) || !isDefined(node)) {
      this._head = (node ?? null);
    } else {
      throw new TypeError("head must be a Node or null")
    }
  },

  /** @type {Node} */
  get tail() {
    var curr = this.head

    if (!curr) return null

    while (curr.next) {
      curr = curr.next
    }

    return curr
  },

  get length() {
    var curr = this.head
    var index = 0

    while (curr) {
      curr = curr.next;
      index++
    }

    return index
  },


  // Get Node iterator
  get nodes() {
    var collection = this

    return {
      *[Symbol.iterator]() {
        var curr = collection.head

        while (curr) {
          yield curr
          curr = curr.next
        }
      }
    }
  },

  *[Symbol.iterator]() {
    var curr = this.head

    while (curr) {
      yield curr.data
      curr = curr.next
    }
  },

  isEmpty() { return !this.head },

  peek() {
    if (!this.head) return null

    return this.head.data
  },

  clear() {
    this.head = null
    return this
  },

  clone(options) {
    var clone = new this.constructor(options || this.options)
    var last = null

    for (var data of this) {
      var newNode = new Node(data);

      if (!clone.head) {
        clone.head = newNode
      } else {
        last.next = newNode
      }

      last = newNode;
    }

    return clone
  },

  /**
   * @param {(value: T, index: number, thisArg: this) => T } callback
   * @param {{ }} [options]
   */
  forEach(callback, options) {
    var index = 0

    for (var element of this) {
      callback(element, index++, this)
    }

    return this
  },

  toArray() {
    var array = []

    for (var element of this) {
      array.push(element)
    }

    return array
  },

  fromArray(array) {
    if (!isIterable(array)) {
      throw new TypeError("Unexpected argument parameter. Argument must be iterable.")
    }

    var { head } = toCollectionNodes(array)

    if (!this.head) {
      this.head = head
    } else {
      this.tail.next = head
    }

    return this
  },

  /**
   * @param {(value: T, index: number, thisArg: T[]) => T | string } callback
   */
  log(callback) {
    var array = this.toArray()

    if (isFunction(callback)) {
      array = array.map(callback)
    }

    console.table(this.toArray())

    return this
  },

  toString() {
    return `[${this.constructor.name} nodes:${this.length}]`
  },

}

function toCollectionNodes(elementList) {
  if (!isIterable(elementList)) {
    throw new TypeError("Unexpected argument. Argument must be Iterable with [Symbol.iterator].")
  }

  var head = null
  var tail = null
  var length = 0

  for (var element of elementList) {
    var node = new Node(element)
    length++

    if (!head) {
      head = node
    } else {
      tail.next = node
    }

    tail = node
  }

  return { head, tail, length }
}

function from(array, options) {
  var collection = new this(options)
  collection.head = this.toCollectionNodes(array).head

  return collection
}

Object.assign(Collection, {
  prototype: proto,
  toString: Node.toString,
  from,
  toCollectionNodes,
  isIterable,
})

Collection.prototype.constructor = Collection
