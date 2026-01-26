export class Node<T = any> {
  public data: T
  public next: Node<T> | null

  constructor(data: T, next = null) {
    this.data = data
    this.next = next
  }
}

export function prepare<T = any>(
  iterable: Iterable<T>,
  reversed = false
) {
  let head: Node<T> | null = null
  let tail: Node<T> | null = null
  let temp: Node<T>
  let length = 0

  for (const element of iterable) {
    temp = new Node(element)

    if (!head) {
      head = temp
      tail = temp
    } else if (!reversed) {
      tail!.next = temp
      tail = temp
    } else {
      temp.next = head
      head = temp
    }

    length++
  }

  return {
    head,
    tail,
    length,
  }
}
