import Node from "./node"

export default function prepare<U>(iterable: Iterable<U>, reversed = false) {
  if (typeof iterable?.[Symbol.iterator] !== "function")
    throw new TypeError("First argument must be iterable")

  let head = null
  let tail = null
  let length = 0

  for (const element of iterable) {
    const node = new Node(element)

    if (!head) {
      head = node
      tail = node
    } else if (!reversed) {
      tail!.next = node
      tail = node
    } else {
      node.next = head
      head = node
    }

    length++
    tail = node
  }

  return {
    head,
    tail,
    length,
  }
}
