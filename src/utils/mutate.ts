import Node from "../collection/node"
import type Collection from "../collection/collection"
import { mergeSort } from "./sorter"

export function remove<T>(collection: Collection<T>, value: T) {
  let curr = collection.head
  let prev = null
  while (curr) {
    if (curr.data === value) {
      if (prev)
        prev.next = curr.next
      else
        collection.head = curr.next
      curr.next = null
      return true
    }
    prev = curr
    curr = curr.next
  }
  return false
}

export function insertAfter<T>(collection: Collection<T>, value: T, target: T) {
  const node = new Node(value)
  let curr = collection.head
  while (curr) {
    if (curr.data === target) {
      node.next = curr.next
      curr.next = node
      return true
    }
    curr = curr.next
  }
  return false
}

export function insertBefore<T>(collection: Collection<T>, value: T, target: T) {
  const node = new Node(value)
  let curr = collection.head
  let prev = null
  while (curr) {
    if (curr.data === target) {
      node.next = curr
      if (prev)
        prev.next = node
      else
        collection.head = node
      return true
    }
    prev = curr
    curr = curr.next
  }
  return false
}

export function replace<T>(collection: Collection<T>, value: T, target: T) {
  let curr = collection.head
  while (curr) {
    if (curr.data === target) {
      curr.data = value
      return true
    }
    curr = curr.next
  }
  return false
}

export function reverse<T>(collection: Collection<T>) {
  let prev = null
  let curr = collection.head
  while (curr) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  collection.head = prev
}

export function clear<T>(collection: Collection<T>) {
  collection.head = null
}

export function sort<T>(collection: Collection<T>, comparator: (a: T, b: T) => number) {
  mergeSort(collection, comparator)
}