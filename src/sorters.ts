import type Collection from "./collection"
import Node from "./node"
import type { Comparator } from "./types"

export function bubbleSort<T>(
  collection: Collection<T>,
  comparator: Comparator<T>
) {
  if (!collection.head || !collection.head.next) return
  let swapped: boolean

  do {
    swapped = false
    let current = collection.head

    while (current && current.next) {
      if (comparator(current.data, current.next.data) > 0) {
        const tmp = current.data
        current.data = current.next.data
        current.next.data = tmp
        swapped = true
      }
      current = current.next
    }

  } while (swapped)

  return collection
}

export function mergeSort<T>(
  collection: Collection<T>,
  comparator: Comparator<T>
) {
  collection.head = _mergeSort(collection.head, comparator)
  return collection
}


function _mergeSort<T>(
  head: Node<T> | null,
  cmp: (a: T, b: T) => number
): Node<T> | null {
  if (head === null || head.next === null) return head

  const middle = split(head)
  const left = _mergeSort(head, cmp)
  const right = _mergeSort(middle, cmp)
  return merge(left, right, cmp)
}

/** Разделяет список пополам и возвращает начало второй части */
function split<T>(head: Node<T>): Node<T> {
  let slow: Node<T> = head
  let fast: Node<T> | null = head

  while (fast?.next && fast.next.next) {
    slow = slow.next!
    fast = fast.next.next
  }

  const middle = slow.next!
  slow.next = null
  return middle
}

/** Слияние двух отсортированных списков */
function merge<T>(
  a: Node<T> | null,
  b: Node<T> | null,
  cmp: (a: T, b: T) => number
): Node<T> | null {
  const dummy = new Node<T>(null as any);
  let tail = dummy

  while (a && b) {
    if (cmp(a.data, b.data) <= 0) {
      tail.next = a
      a = a.next
    } else {
      tail.next = b
      b = b.next
    }
    tail = tail.next
  }

  tail.next = a ?? b
  return dummy.next
}