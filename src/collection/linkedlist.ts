import Collection from "./collection"
import {
  Node,
  prepare,
} from "./node"

import type {
  Mapper,
  Predicate,
} from "../types"

export function addFirst<T>(
  this: Collection<T>,
  value: T
) {
  const node = {
    data: value,
    next: this.head
  }
  node.next = this.head
  this.head = node
  return this.size += 1
}

export function addLast<T>(
  this: Collection<T>,
  value: T
) {
  const node = {
    data: value,
    next: null
  }
  if (!this.head)
    this.head = node

  else
    this.tail!.next = node
  this.tail = node
  return this.size += 1
}

export function removeFirst<T>(
  this: Collection<T>
) {
  if (!this.head)
    return null
  const head = this.head
  this.head = head.next
  head.next = null
  this.size -= 1
  return head.data
}

export function removeLast<T>(
  this: Collection<T>
) {
  if (!this.head)
    return null

  let curr = this.head
  if (!curr.next) {
    this.head = null
    return curr.data
  }

  while (curr.next!.next)
    curr = curr.next!

  const last = curr.next!
  curr.next = null
  this.tail = curr
  this.size -= 1
  return last.data
}

export function remove<T>(
  this: Collection<T>,
  value: T
) {
  let curr = this.head
  let prev = null

  while (curr) {
    if (curr.data === value) {
      this.size -= 1
      if (prev)
        prev.next = curr.next

      else
        this.head = curr.next
      curr.next = null
      return true
    }
    prev = curr
    curr = curr.next
  }

  return false
}

export function insertBefore<T>(
  this: Collection<T>,
  value: T,
  target: T
) {
  const node = new Node(value)
  let curr = this.head
  let prev = null

  while (curr) {
    if (curr.data === target) {
      node.next = curr
      this.size += 1
      if (prev)
        prev.next = node

      else
        this.head = node
      return true
    }
    prev = curr
    curr = curr.next
  }

  return false
}

export function insertAfter<T>(
  this: Collection<T>,
  value: T,
  target: T
) {
  const node = new Node(value)
  let curr = this.head
  while (curr) {
    if (curr.data === target) {
      node.next = curr.next
      curr.next = node
      this.size += 1
      return true
    }
    curr = curr.next
  }
  return false
}

export function replace<T>(
  this: Collection<T>,
  value: T,
  target: T
) {
  let curr = this.head
  while (curr) {
    if (curr.data === target) {
      curr.data = value
      return true
    }
    curr = curr.next
  }
  return false
}

export function reverse<T>(
  this: Collection<T>
) {
  let prev = null
  let curr = this.head
  while (curr) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  this.head = prev
}

export function clear<T>(
  this: Collection<T>
) {
  this.head = null
  this.tail = null
  this.size = 0
}

export function push<T>(
  this: Collection<T>,
  ...items: T[]
) {
  const { head, tail, length } = prepare(items)

  if (head) {
    if (!this.head)
      this.head = head

    else
      this.tail!.next = head
    this.tail = tail
  }

  return this.size += length
}

export function unshift<T>(
  this: Collection<T>,
  ...items: T[]
) {
  const { head, tail, length } = prepare(items, true)
  if (tail) {
    tail.next = this.head
    this.head = head
  }
  return this.size += length
}

export function filter<T>(
  this: Collection<T>,
  predicate: Predicate<T>
) {
  let head = null
  let tail = null
  let index = 0
  let curr = this.head

  while (curr) {
    if (predicate(curr.data, index++, this)) {
      const node = new Node(curr.data)
      if (!head)
        head = node

      else
        tail!.next = node
      tail = node
    }
    curr = curr.next
  }

  const clone = new (this.constructor as typeof Collection)()
  clone.head = head
  clone.tail = tail
  clone.size = index
  return clone
}

export function map<T, U>(
  this: Collection<T>,
  mapper: Mapper<T, U>
) {
  let head = null
  let tail = null
  let index = 0
  let curr = this.head

  while (curr) {
    const node = new Node(mapper(curr.data, index++, this))
    if (!head)
      head = node

    else
      tail!.next = node
    tail = node
    curr = curr.next
  }

  const clone = new (this.constructor as typeof Collection)()
  clone.head = head
  clone.tail = tail
  clone.size = index
  return clone
}
